import { NextRequest, NextResponse } from 'next/server';
import type { OnlineExamQuestion, ExamQuestionOptionKey } from '@/types/online-exam';
import type { LgsCourseKey } from '@/types/exam';
import { getCourseName } from '@/lib/lgs-topics';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

interface ParseRequestBody {
  rawText: string;
  courseKey: LgsCourseKey;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ParseRequestBody;
    const { rawText, courseKey } = body;

    if (!rawText || rawText.trim().length < 20) {
      return NextResponse.json(
        { error: 'Lütfen ayrıştırılacak en az bir soru metni girin.' },
        { status: 400 }
      );
    }

    const courseName = getCourseName(courseKey);

    const systemPrompt = `Sen Milli Eğitim Bakanlığı (MEB) 8. sınıf LGS sınav kitapçıklarını ve sorularını dijital deneme formatına dönüştüren uzman bir veri ayrıştırıcısısın.

GÖREVİN:
Sana verilen ham metin veya kitapçık içeriğinden soruları tespit et. Varsa metnin sonundaki veya soru altındaki resmi cevap anahtarını eşleştir.

Her soru için şu JSON şemasını üret:
{
  "questions": [
    {
      "questionNumber": 1,
      "topicName": "Sorunun ait olduğu LGS konusu (Örn: Çarpanlar ve Katlar, Fiilimsiler, Mevsimler vb.)",
      "questionText": "Sorunun açık, net ve eksiksiz metni",
      "options": {
        "A": "A şıkkı metni",
        "B": "B şıkkı metni",
        "C": "C şıkkı metni",
        "D": "D şıkkı metni"
      },
      "correctAnswer": "A veya B veya C veya D",
      "explanation": "Resmi MEB pedagojik çözümü ve açıklaması",
      "hintForSocratic": "Öğrenciye cevabı vermeden düşündürecek ilk yönlendirici soru"
    }
  ]
}

KURALLAR:
- Yalnızca saf JSON nesnesi döndür (markdown backtick'leri veya ek açıklama yazma).
- Soru metinlerini ve şıkları asla kısaltma, tam metin olarak aktar.
- Ders: ${courseName} (${courseKey}).`;

    const payload = {
      contents: [
        {
          parts: [
            { text: systemPrompt },
            { text: `AYRIŞTIRILACAK HAM MEB METNİ:\n\n${rawText}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini MEB ayrıştırma API hatası:', errorText);
      return NextResponse.json(
        { error: 'MEB metni ayrıştırılırken yapay zekâ servisi yanıt vermedi.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    // JSON parse
    const cleanJson = candidateText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanJson) as {
      questions: Array<{
        questionNumber: number;
        topicName: string;
        questionText: string;
        options: Record<ExamQuestionOptionKey, string>;
        correctAnswer: ExamQuestionOptionKey;
        explanation: string;
        hintForSocratic?: string;
      }>;
    };

    const formattedQuestions: OnlineExamQuestion[] = parsed.questions.map((q, idx) => ({
      id: `custom-q-${Date.now()}-${idx + 1}`,
      courseKey,
      courseName,
      topicName: q.topicName || 'Genel Kazanım',
      questionNumber: idx + 1,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || 'Resmi MEB çözümü.',
      hintForSocratic: q.hintForSocratic || 'Soru kökünde senden ilk olarak ne istendiğine dikkat et.',
    }));

    return NextResponse.json({
      success: true,
      questions: formattedQuestions,
    });
  } catch (error) {
    console.error('MEB Soru Ayrıştırma Hatası:', error);
    return NextResponse.json(
      { error: 'Sorular ayrıştırılamadı. Lütfen metin formatını kontrol edin.' },
      { status: 500 }
    );
  }
}
