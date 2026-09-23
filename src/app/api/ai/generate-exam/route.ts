import { NextRequest, NextResponse } from 'next/server';
import type { OnlineExam, OnlineExamQuestion, ExamQuestionOptionKey, OnlineExamTier } from '@/types/online-exam';
import type { LgsCourseKey } from '@/types/exam';
import { getCourseName } from '@/lib/lgs-topics';
import { getLise1CourseName, Lise1CourseKey } from '@/lib/lise1-topics';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'models/gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

interface GenerateExamRequest {
  examTitle?: string;
  tier?: OnlineExamTier;
  courseKey?: string;
  topicName?: string;
  questionCount?: number;
  difficulty?: 'Kolay' | 'Orta' | 'LGS Düzeyi' | 'MEB Yazılı Düzeyi' | 'Zorlayıcı' | 'YKS (TYT) Düzeyi';
  examType?: 'branch' | 'full' | 'mini' | 'yazili' | 'tyt';
}

function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    I: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  };

  return text
    .split('')
    .map((c) => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
      difficulty = tier === 'lise1' ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi',
      examType = tier === 'lise1' ? 'yazili' : 'branch',
    } = body;

    const count = Math.min(Math.max(Number(questionCount) || 5, 2), 20);
    const isFullExam = examType === 'full' || courseKey === 'all';
    const isLise1 = tier === 'lise1';

    let mainCourseName = 'Matematik';
    if (isFullExam) {
      mainCourseName = isLise1 ? 'Genel 9. Sınıf Karma' : 'Tüm Dersler (Genel LGS)';
    } else {
      mainCourseName = isLise1
        ? getLise1CourseName(courseKey as Lise1CourseKey)
        : getCourseName(courseKey as LgsCourseKey);
    }

    const systemPrompt = isLise1
      ? `Sen Türkiye MEB 9. Sınıf (Lise 1) ve YKS (TYT) soru yazım komisyonunda yer alan kıdemli bir ölçme ve değerlendirme uzmanısın.
Görevin, MEB 9. Sınıf Ortak Yazılı senaryolarına ve YKS Temel Yeterlilik Testi (TYT) kazanımlarına %100 uygun, özgün bir sınav üretmektir.

İSTENEN SINAV ÖZELLİKLERİ:
- Sınav Türü: ${examType === 'yazili' ? 'MEB 1. Dönem Ortak Yazılı Sınavı Provası' : '9. Sınıf TYT Tarama Denemesi'} (${mainCourseName})
- Konu / Kapsam: ${topicName || '9. Sınıf Genel Müfredat'}
- Soru Sayısı: ${count} adet
- Zorluk Derecesi: ${difficulty}
- Her soru için 5 seçenek (A, B, C, D, E), doğrulanmış doğru cevap şıkkı, adım adım detaylı çözüm açıklaması ve Sokratik yönlendirici ipucu üretilmelidir.`
      : `Sen Türkiye Milli Eğitim Bakanlığı (MEB) 8. Sınıf Liselere Geçiş Sistemi (LGS) soru yazım komisyonunda yer alan kıdemli bir ölçme ve değerlendirme uzmanısın.
Görevin, LGS formatına %100 uygun, yeni nesil, beceri temelli, grafik/deney/tablo/paragraf kurgulu, çeldiricileri mantıklı ve güçlü olan özgün bir deneme sınavı üretmektir.

İSTENEN SINAV ÖZELLİKLERİ:
- Sınav Türü: ${isFullExam ? 'Genel LGS Karma Deneme' : `Branş Denemesi (${mainCourseName})`}
- Konu / Kapsam: ${topicName || 'Genel Müfredat / Karma'}
- Soru Sayısı: ${count} adet
- Zorluk Derecesi: ${difficulty}
- Her soru için 4 seçenek (A, B, C, D), doğrulanmış doğru cevap şıkkı, adım adım detaylı pedagojik çözüm ve Sokratik yönlendirme cümlesi üretilmelidir.`;

    const jsonSchemaInstruction = `
ŞU JSON FORMATINDA ÇIKTI VER:
{
  "title": "Denemenin çarpıcı, kurumsal başlığı",
  "description": "Denemenin hedefini ve kapsadığı kazanımları anlatan açıklama",
  "difficulty": "${difficulty}",
  "durationMinutes": ${Math.round(count * 2.5)},
  "questions": [
    {
      "questionNumber": 1,
      "courseKey": "${courseKey}",
      "courseName": "${mainCourseName}",
      "topicName": "MEB Kazanım Konusu",
      "questionText": "Sorunun eksiksiz ve anlaşılır metni",
      "options": {
        "A": "A şıkkı",
        "B": "B şıkkı",
        "C": "C şıkkı",
        "D": "D şıkkı"${isLise1 ? ',\n        "E": "E şıkkı"' : ''}
      },
      "correctAnswer": "A",
      "explanation": "Adım adım net çözüm açıklaması",
      "hintForSocratic": "Öğrenciyi kuralı hatırlamaya yönlendiren soru"
    }
  ]
}

ÖNEMLİ KURALLAR:
1. Sadece saf JSON üret, markdown blokları (\`\`\`json) ekleme.
2. Sayısal ve mantıksal tutarlılığı kontrol et.
3. Asla Türkçe karakter hatası yapma.`;

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
      },
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Generate Exam API Error:', errorText);
      return NextResponse.json(
        { error: 'Yapay zekâ deneme üretim servisi şu an meşgul. Lütfen tekrar deneyin.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    const cleanJson = candidateText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

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
    };

    try {
      parsedResult = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('Gemini JSON Parse Error:', parseErr, cleanJson);
      return NextResponse.json(
        { error: 'Üretilen sınav verisi JSON formatına dönüştürülemedi.' },
        { status: 500 }
      );
    }

    if (!parsedResult.questions || parsedResult.questions.length === 0) {
      return NextResponse.json(
        { error: 'Yapay zekâ geçerli bir soru üretemedi.' },
        { status: 422 }
      );
    }

    const finalTitle = examTitle || parsedResult.title || `${mainCourseName} Özel Denemesi`;
    const finalSlug = `ai-${slugify(finalTitle)}-${Date.now().toString().slice(-5)}`;
    const finalId = `ai-exam-${Date.now()}`;

    const formattedQuestions: OnlineExamQuestion[] = parsedResult.questions.map(
      (q, idx) => ({
        id: `ai-q-${Date.now()}-${idx + 1}`,
        questionNumber: idx + 1,
        courseKey: q.courseKey || courseKey,
        courseName: q.courseName || mainCourseName,
        topicName: q.topicName || topicName || 'Genel Konu',
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer || 'A',
        explanation: q.explanation || 'Çözüm açıklaması hazırlanıyor.',
        hintForSocratic: q.hintForSocratic || 'Soru kökündeki anahtar kelimeleri incele.',
      })
    );

    const generatedExam: OnlineExam = {
      id: finalId,
      slug: finalSlug,
      title: finalTitle,
      tier: tier,
      description:
        parsedResult.description ||
        `${count} sorudan oluşan yapay zekâ destekli yeni nesil ${mainCourseName} sınavı.`,
      type: isFullExam ? 'full' : isLise1 ? 'yazili' : 'branch',
      courseKey: isFullExam ? undefined : courseKey,
      courseName: isFullExam ? (isLise1 ? '9. Sınıf Karma' : 'Tüm Dersler (Genel LGS)') : mainCourseName,
      questionCount: formattedQuestions.length,
      durationMinutes: parsedResult.durationMinutes || Math.round(formattedQuestions.length * 2.5),
      difficulty: (difficulty as any) || (isLise1 ? 'MEB Yazılı Düzeyi' : 'LGS Düzeyi'),
      isPro: false,
      badgeText: isLise1 ? '📝 AI YAZILI' : '🤖 AI ÜRETİMİ',
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
