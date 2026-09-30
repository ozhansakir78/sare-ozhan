import { NextRequest, NextResponse } from 'next/server';
import type { OnlineExam, OnlineExamQuestion, ExamQuestionOptionKey, OnlineExamTier } from '@/types/online-exam';
import type { LgsCourseKey } from '@/types/exam';
import { getCourseName } from '@/lib/lgs-topics';
import { getLise1CourseName, Lise1CourseKey } from '@/lib/lise1-topics';
import { ONLINE_EXAMS } from '@/lib/online-exams-data';
import { formatMathText } from '@/lib/math-formatter';

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

function validateAndHealQuestion(
  q: any,
  isLise1: boolean,
  fallbackCourseKey: string,
  fallbackCourseName: string,
  fallbackTopicName: string,
  index: number
): OnlineExamQuestion {
  let qText = formatMathText(q.questionText || '');
  // Ham LaTeX kalıntılarını temizle ve okunabilir formata dönüştür
  qText = qText
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\$/g, '');

  let explanation = formatMathText(q.explanation || 'Çözüm adımları inceleniyor.');
  explanation = explanation
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\$/g, '');

  const validKeys: ExamQuestionOptionKey[] = isLise1
    ? ['A', 'B', 'C', 'D', 'E']
    : ['A', 'B', 'C', 'D'];

  const options: Record<ExamQuestionOptionKey, string> = {} as any;
  for (const k of validKeys) {
    if (q.options && q.options[k] !== undefined && q.options[k] !== null) {
      let optText = formatMathText(String(q.options[k]).trim());
      optText = optText
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
        .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
        .replace(/\\cdot/g, '·')
        .replace(/\\times/g, '×')
        .replace(/\$/g, '');
      options[k] = optText;
    } else {
      options[k] = '-';
    }
  }

  let correctAnswer: ExamQuestionOptionKey = (q.correctAnswer || 'A').toUpperCase().trim() as ExamQuestionOptionKey;
  if (!validKeys.includes(correctAnswer)) {
    correctAnswer = 'A';
  }

  // Çift Katmanlı Sağlama (Explanation vs CorrectAnswer):
  // Eğer yapay zekâ açıklamada net olarak "Doğru cevap X" veya "Seçenek X" demişse fakat correctAnswer alanına farklı harf yazmışsa otomatik hizala!
  const answerMatch =
    explanation.match(/(?:doğru\s+(?:cevap|seçenek)|seçenek)\s+([A-E])\b/i) ||
    explanation.match(/cevap\s+([A-E])\s*(?:dir|tir|dır|dur|'dir|'tir|'dır|:)/i);

  if (answerMatch && answerMatch[1]) {
    const deducedKey = answerMatch[1].toUpperCase() as ExamQuestionOptionKey;
    if (validKeys.includes(deducedKey) && deducedKey !== correctAnswer) {
      correctAnswer = deducedKey;
    }
  }

  return {
    id: `ai-q-${Date.now()}-${index + 1}-${Math.random().toString(36).slice(2, 6)}`,
    questionNumber: index + 1,
    courseKey: q.courseKey || fallbackCourseKey,
    courseName: q.courseName || fallbackCourseName,
    topicName: q.topicName || fallbackTopicName,
    questionText: qText,
    options,
    correctAnswer,
    explanation,
    hintForSocratic: q.hintForSocratic || 'Soru kökündeki temel kuralı ve verilenleri adım adım incele.',
  };
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
      "explanation": "Adım adım net çözüm açıklaması ve en sonda 'Doğru cevap X seçeneğidir.' cümlesi",
      "hintForSocratic": "Öğrenciyi kuralı hatırlamaya yönlendiren Sokratik ipucu sorusu"
    }
  ]
}

ÖNEMLİ MATEMATİK VE PEDAGOJİ KURALLARI:
1. Sadece saf JSON üret, markdown blokları (\`\`\`json) ekleme.
2. ÖNCE ÇÖZ, SONRA ŞIKKA KOY: Sayısal veya mantıksal sorularda önce çözümü adım adım yap. Çıkan kesin sonucu seçeneklerden BİRİNE yaz. 'correctAnswer' alanına KESİNLİKLE o şıkkın harfini yaz. Asla çözümde bir sayı bulup şıklara başka bir harf yazma!
3. TUTARLILIK ŞARTI: 'explanation' metninin son cümlesi mutlaka 'Doğru cevap [A/B/C/D/E] seçeneğidir.' şeklinde bitmeli ve buradaki harf 'correctAnswer' ile %100 aynı olmalıdır.
4. ASLA UYDURMA DENKLEM KURMA: Çözümleri tam sayı veya temiz kesir çıkan, MEB müfredatına uygun gerçekçi sorular yaz.
5. YAZIM KURALI: Bilgisayar programlama üs işareti '^' KESİNLİKLE KULLANMA! Üsleri Unicode üst simge olarak yaz: ⁰, ¹, ², ³, ⁴, ⁵, ⁶, ⁷, ⁸, ⁹, ⁺, ⁻, ⁿ, ˣ. Bölme için '/' veya kesir çizgisi, kök için '√', çarpma için '·' kullan. ASLA LaTeX kodu (\\frac, \\sqrt, $) KULLANMA!`;

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

    // Soruların matematiksel ifadelerini ve üslü sayılarını temizle ve formatla
    if (parsedResult && parsedResult.questions && Array.isArray(parsedResult.questions)) {
      parsedResult.questions = parsedResult.questions.map((q) => ({
        ...q,
        questionText: formatMathText(q.questionText || ''),
        options: Object.fromEntries(
          Object.entries(q.options || {}).map(([k, v]) => [k, formatMathText(String(v || ''))])
        ) as Record<'A' | 'B' | 'C' | 'D', string> & { E?: string },
        explanation: formatMathText(q.explanation || ''),
        hintForSocratic: q.hintForSocratic ? formatMathText(q.hintForSocratic) : undefined,
      }));
    }

    // Pedagojik Yedek Motor: Eğer yapay zekâ servisi geçici olarak yanıt vermezse,
    // öğrenciyi asla hatayla karşılaştırma; soru havuzundan konuya uygun pedagojik test derle!
    if (!parsedResult || !parsedResult.questions || parsedResult.questions.length === 0) {
      console.info('Yapay zekâ yanıt vermediği için pedagojik havuz motoru devreye giriyor...');
      
      const relevantExams = ONLINE_EXAMS.filter((e) => {
        if (isLise1) return e.tier === 'lise1';
        return !e.tier || e.tier === 'lgs';
      });

      let candidateQuestions: OnlineExamQuestion[] = [];
      for (const ex of relevantExams) {
        for (const q of ex.questions) {
          if (!courseKey || q.courseKey === courseKey) {
            candidateQuestions.push(q);
          }
        }
      }

      // Eğer derse ait soru bulunamazsa tüm kademeden al
      if (candidateQuestions.length === 0) {
        for (const ex of relevantExams) {
          candidateQuestions.push(...ex.questions);
        }
      }

      // Eğer soru adedi istenen sayıdan azsa, kademenin diğer sorularıyla tamamla
      if (candidateQuestions.length < count) {
        const otherPool = relevantExams
          .flatMap((e) => e.questions)
          .filter((q) => !candidateQuestions.some((cq) => cq.id === q.id));
        candidateQuestions.push(...otherPool);
      }

      // Hâlâ yetersizse havuzdaki soruları çoğaltarak asla öğrenciyi eksik soruyla bırakma!
      let safetyCounter = 0;
      while (candidateQuestions.length < count && candidateQuestions.length > 0 && safetyCounter < 5) {
        safetyCounter++;
        const cloned = candidateQuestions.map((q, cIdx) => ({
          ...q,
          id: `${q.id}-dup-${safetyCounter}-${cIdx}`,
        }));
        candidateQuestions.push(...cloned);
      }

      // Rastgele karıştır ve istenen adet kadar al
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count);

      parsedResult = {
        title: examTitle || `${mainCourseName} Pekiştirme Testi`,
        description: `${count} soruluk ${mainCourseName} MEB kazanım pekiştirme ve tarama testi.`,
        durationMinutes: Math.round(count * 2.5),
        questions: selected.map((q, idx) => ({
          questionNumber: idx + 1,
          courseKey: q.courseKey,
          courseName: q.courseName,
          topicName: topicName || q.topicName,
          questionText: q.questionText,
          options: q.options as any,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'Çözüm adımları ve kural açıklaması inceleniyor.',
          hintForSocratic: q.hintForSocratic || 'Soru kökündeki temel kuralı hatırla.',
        })),
      };
    }

    const finalTitle = examTitle || parsedResult.title || `${mainCourseName} Özel Denemesi`;
    const finalSlug = `ai-${slugify(finalTitle)}-${Date.now().toString().slice(-5)}`;
    const finalId = `ai-exam-${Date.now()}`;

    const finalQuestionsList = parsedResult?.questions || [];
    const formattedQuestions: OnlineExamQuestion[] = finalQuestionsList.map(
      (q, idx) =>
        validateAndHealQuestion(
          q,
          isLise1,
          courseKey,
          mainCourseName,
          topicName || 'Genel Konu',
          idx
        )
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
