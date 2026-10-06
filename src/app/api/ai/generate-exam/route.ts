import { NextRequest, NextResponse } from 'next/server';
import type { OnlineExam, OnlineExamQuestion, ExamQuestionOptionKey, OnlineExamTier } from '@/types/online-exam';
import { formatMathText } from '@/lib/math-formatter';
import {
  slugify,
  resolveTierCourseName,
  validateAndHealQuestion,
  buildExamGenerationPrompt,
  getFallbackQuestions,
} from '@/lib/exam-generator-engine';
import { ONLINE_EXAMS } from '@/lib/online-exams-data';

const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
];

interface GenerateExamRequest {
  examTitle?: string;
  tier?: OnlineExamTier;
  courseKey?: string;
  topicName?: string;
  questionCount?: number;
  difficulty?: 'Kolay' | 'Orta' | 'LGS Düzeyi' | 'MEB Yazılı Düzeyi' | 'Zorlayıcı' | 'YKS (TYT) Düzeyi' | 'YKS (AYT) Düzeyi';
  examType?: 'branch' | 'full' | 'mini' | 'yazili' | 'tyt' | 'ayt' | 'ydt';
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateExamRequest;
    const {
      examTitle,
      tier = 'lgs',
      courseKey = 'matematik',
      topicName,
      questionCount = 5,
      difficulty = tier === 'yks' ? 'YKS (TYT) Düzeyi' : tier === 'lise1' ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi',
      examType = tier === 'yks' ? 'tyt' : tier === 'lise1' ? 'yazili' : 'branch',
    } = body;

    const count = Math.min(Math.max(Number(questionCount) || 5, 2), 20);
    const isFullExam = examType === 'full' || courseKey === 'all';
    const mainCourseName = isFullExam
      ? (tier === 'yks' ? 'YKS Genel Karma Deneme' : tier === 'lise1' ? '9. Sınıf Karma' : 'Tüm Dersler (Genel LGS)')
      : resolveTierCourseName(tier, courseKey);

    const { systemPrompt, jsonSchemaInstruction } = buildExamGenerationPrompt(
      tier,
      courseKey,
      mainCourseName,
      topicName,
      count,
      difficulty,
      examType
    );

    const userPrompt = examTitle
      ? `Lütfen başlığı "${examTitle}" olan sınavı üret.`
      : `Lütfen ${count} soruluk ${mainCourseName} sınavını hemen üret.`;

    const payload = {
      contents: [
        {
          parts: [{ text: `${systemPrompt}\n${jsonSchemaInstruction}` }, { text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json',
        maxOutputTokens: 8192,
      },
    };

    const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';
    let candidateText = '';

    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          if (candidateText) {
            break;
          }
        } else {
          const errorText = await response.text();
          console.warn(`Gemini Generate Exam (${model}) failed [${response.status}]:`, errorText);
        }
      } catch (err) {
        console.warn(`Gemini (${model}) connection error:`, err);
      }
    }

    let parsedResult: {
      title?: string;
      description?: string;
      difficulty?: string;
      durationMinutes?: number;
      questions?: Array<{
        questionNumber?: number;
        courseKey?: string;
        courseName?: string;
        topicName?: string;
        questionText: string;
        options: Record<'A' | 'B' | 'C' | 'D', string> & { E?: string };
        correctAnswer: ExamQuestionOptionKey;
        explanation: string;
        hintForSocratic?: string;
      }>;
    } | null = null;

    if (candidateText) {
      const cleanJson = candidateText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      try {
        parsedResult = JSON.parse(cleanJson);
      } catch (parseErr) {
        console.error('Gemini JSON Parse Error:', parseErr, cleanJson);
      }
    }

    // Soruları temizle ve çift katmanlı doğrulamaya tabi tut
    let formattedQuestions: OnlineExamQuestion[] = [];

    if (parsedResult && parsedResult.questions && Array.isArray(parsedResult.questions) && parsedResult.questions.length > 0) {
      formattedQuestions = parsedResult.questions.map((q, idx) =>
        validateAndHealQuestion(
          q,
          tier,
          courseKey,
          mainCourseName,
          topicName || 'Genel Konu',
          idx
        )
      );
    }

    // Pedagojik Yedek Motor: Eğer yapay zekâ yanıt vermezse veya çıktı yetersizse havuzdan güvenli sınav derle!
    if (formattedQuestions.length === 0) {
      console.info(`Yapay zekâ yanıt vermediği için ${tier} pedagojik havuz motoru devreye giriyor...`);
      const fallbackList = getFallbackQuestions(tier, courseKey, count, topicName, ONLINE_EXAMS);
      formattedQuestions = fallbackList.map((q, idx) => ({
        ...q,
        id: `fb-q-${Date.now()}-${idx + 1}-${Math.random().toString(36).slice(2, 6)}`,
        questionNumber: idx + 1,
      }));
    }

    const finalTitle = examTitle || parsedResult?.title || `${mainCourseName} Özel Denemesi`;
    const finalSlug = `ai-${slugify(finalTitle)}-${Date.now().toString().slice(-5)}`;
    const finalId = `ai-exam-${Date.now()}`;

    const isHighSchoolOrYks = tier === 'lise1' || tier === 'lise2' || tier === 'lise3' || tier === 'yks';
    let badgeText = '🤖 AI ÜRETİMİ';
    if (tier === 'yks') badgeText = '🏆 AI ÖSYM PROVA';
    else if (tier === 'lise3') badgeText = '🎯 AI 11. SINIF ALAN';
    else if (tier === 'lise2') badgeText = '🧭 AI 10. SINIF PROVA';
    else if (tier === 'lise1') badgeText = '📝 AI MEB YAZILI';

    const generatedExam: OnlineExam = {
      id: finalId,
      slug: finalSlug,
      title: finalTitle,
      tier: tier,
      description:
        parsedResult?.description ||
        `${formattedQuestions.length} sorudan oluşan yapay zekâ destekli ${mainCourseName} prova sınavı.`,
      type: isFullExam ? 'full' : tier === 'yks' ? 'tyt' : tier === 'lise1' ? 'yazili' : 'branch',
      courseKey: isFullExam ? undefined : courseKey,
      courseName: isFullExam ? (tier === 'yks' ? 'YKS Karma' : tier === 'lise1' ? '9. Sınıf Karma' : 'Tüm Dersler (Genel LGS)') : mainCourseName,
      questionCount: formattedQuestions.length,
      durationMinutes: parsedResult?.durationMinutes || Math.round(formattedQuestions.length * (isHighSchoolOrYks ? 2.5 : 2.0)),
      difficulty: (difficulty as any) || (tier === 'yks' ? 'YKS (TYT) Düzeyi' : tier === 'lise1' ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi'),
      isPro: false,
      badgeText,
      questions: formattedQuestions,
    };

    return NextResponse.json(generatedExam);
  } catch (error) {
    console.error('Deneme oluşturma sunucu hatası:', error);
    return NextResponse.json(
      { error: 'Deneme üretilirken beklenmeyen bir hata oluştu.' },
      { status: 500 }
    );
  }
}
