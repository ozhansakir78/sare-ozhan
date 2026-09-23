import { NextRequest, NextResponse } from 'next/server';
import { LGS_TOPICS_BY_COURSE } from '@/lib/lgs-topics';
import type { LgsCourseKey } from '@/types/exam';
import { callGeminiApi } from '@/lib/gemini';

interface ClassifyRequestBody {
  questionImage: string;
}

interface ClassifyResponse {
  courseKey: LgsCourseKey;
  courseName: string;
  topicName: string;
  confidence?: number;
  isAiDetected: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ClassifyRequestBody;
    const { questionImage } = body;

    if (!questionImage) {
      return NextResponse.json({ error: 'Görsel sağlanmadı.' }, { status: 400 });
    }

    // Görseli hazırla
    let inlineData: { mimeType: string; data: string } | null = null;

    if (questionImage.startsWith('data:image/')) {
      const matches = questionImage.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        inlineData = {
          mimeType: matches[1],
          data: matches[2],
        };
      }
    } else if (questionImage.startsWith('http://') || questionImage.startsWith('https://')) {
      try {
        const imgRes = await fetch(questionImage);
        if (imgRes.ok) {
          const mimeType = (imgRes.headers.get('content-type') || 'image/jpeg').split(';')[0];
          const arrayBuffer = await imgRes.arrayBuffer();
          inlineData = {
            mimeType,
            data: Buffer.from(arrayBuffer).toString('base64'),
          };
        }
      } catch (err) {
        console.warn('Görsel getirme hatası:', err);
      }
    }

    if (inlineData) {
      const systemPrompt = `Sen Türkiye MEB 8. Sınıf LGS müfredatında uzmanlaşmış bir soru analiz öğretmenisin.
Görseldeki soruyu incele. Bu sorunun hangi derse ve hangi LGS alt konusuna ait olduğunu tespit et.

Geçerli ders anahtarları (courseKey):
- "matematik" (Matematik)
- "fen" (Fen Bilimleri)
- "turkce" (Türkçe)
- "inkilap" (T.C. İnkılap Tarihi ve Atatürkçülük)
- "din" (Din Kültürü ve Ahlak Bilgisi)
- "ingilizce" (Yabancı Dil (İngilizce))

Müfredat Konuları Listesi:
${JSON.stringify(LGS_TOPICS_BY_COURSE, null, 2)}

Yanıtını SADECE aşağıdaki JSON formatında döndür:
{
  "courseKey": "matematik",
  "courseName": "Matematik",
  "topicName": "Çarpanlar ve Katlar (EBOB - EKOK)"
}`;

      const geminiRes = await callGeminiApi({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }, { inlineData }],
          },
        ],
        responseMimeType: 'application/json',
        temperature: 0.1,
      });

      if (geminiRes.text) {
        try {
          const cleanText = geminiRes.text.replace(/```json\n?|\n?```/g, '').trim();
          const parsed = JSON.parse(cleanText) as {
            courseKey: LgsCourseKey;
            courseName: string;
            topicName: string;
          };

          if (parsed.courseKey && parsed.topicName) {
            const result: ClassifyResponse = {
              courseKey: parsed.courseKey,
              courseName: parsed.courseName || 'Matematik',
              topicName: parsed.topicName,
              isAiDetected: true,
            };
            return NextResponse.json(result);
          }
        } catch (parseErr) {
          console.warn('Gemini classification parse uyarısı:', parseErr, geminiRes.text);
        }
      }
    }

    // Fallback: Varsayılan değer
    return NextResponse.json({
      courseKey: 'matematik',
      courseName: 'Matematik',
      topicName: 'Çarpanlar ve Katlar (EBOB - EKOK)',
      isAiDetected: false,
    });
  } catch (error) {
    console.error('Soru sınıflandırma servisi hatası:', error);
    return NextResponse.json(
      { error: 'Soru analizi yapılamadı.' },
      { status: 500 }
    );
  }
}
