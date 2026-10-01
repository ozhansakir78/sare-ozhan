import { NextRequest, NextResponse } from 'next/server';
import type { SolveApiRequest, SolveApiResponse } from '@/types/ai';
import { callGeminiApi } from '@/lib/gemini';
import { formatMathText } from '@/lib/math-formatter';
import {
  buildTierSpecificSystemPrompt,
  generateMockSocraticResponse,
} from '@/lib/socratic-tier-adapter';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SolveApiRequest;
    const { questionImage, courseName, topicName, studentNote, userMessage, mode, tier, gradeLevel, scoreType, conversationHistory } = body;

    if (!courseName || !topicName) {
      return NextResponse.json(
        { error: 'Ders ve konu bilgisi zorunludur.' },
        { status: 400 }
      );
    }

    const { systemPrompt, personaTitle } = buildTierSpecificSystemPrompt(tier, gradeLevel, scoreType, courseName);

    const isTopicCoaching = !questionImage;
    const isFullSolve = mode === 'full_solve' || userMessage?.toLowerCase().includes('tamamen çöz') || userMessage?.toLowerCase().includes('soruyu çöz');

    const userQuery =
      userMessage ||
      studentNote ||
      (conversationHistory && conversationHistory.length > 0
        ? conversationHistory[conversationHistory.length - 1]?.content
        : '');

    let promptText = '';
    if (isTopicCoaching) {
      promptText = `Sen ${personaTitle} olarak öğrencine rehberlik ediyorsun.
Ders: ${courseName}
Konu: ${topicName}
Kademe: ${tier || gradeLevel || 'Belirtilmedi'}

ÖĞRENCİNİN TALEBİ / SORUSU:
"${userQuery || `${topicName} konusu hakkında önemli püf noktaları ve sınav taktiği ver.`}"

GÖREVİN:
1. Öğrencinin sorusunu veya isteğini pedagojik, sıcak ve akılda kalıcı bir dille yanıtla.
2. Sınavlarda en çok sorulan soru kalıplarını, çeldiricileri ve yeni nesil / ÖSYM soru mantığını açıkla.
3. Asla LaTeX ($ işareti) kullanma. Sade, doğal matematik dili kullan.
4. Cevabı 2-3 akıcı paragraf veya net maddeler halinde sun.`;
    } else {
      promptText = `${systemPrompt}

Ders: ${courseName}
Konu: ${topicName}
Kademe / Rol: ${personaTitle}
Öğrenci Notu: ${studentNote || 'Yok'}
Öğrencinin Talebi: "${userQuery || (isFullSolve ? 'Lütfen bu sorunun tüm adımlarını ve nihai cevabını eksiksiz çöz.' : 'Bu sorunun çözümünde bana adım adım ipucu verir misin?')}"
MOD: ${isFullSolve ? 'TAM ÇÖZÜM MODU (Tüm adımları çöz ve nihai cevabı açıkça yaz)' : 'İPUCU MODU (Sokratik yönlendirme yap)'}

Görselde öğrencinin sorusu yer alıyor. Lütfen soruyu incele ve ${isFullSolve ? 'bütün çözüm adımlarını göstererek nihai cevabı net şekilde açıkla.' : 'öğrenciye adım adım Sokratik ipucu vererek rehberlik et.'}`;
    }

    // Görsel verisini işle (base64 veya remote url)
    let imagePart: { inlineData: { mimeType: string; data: string } } | null = null;
    if (questionImage) {
      if (questionImage.startsWith('data:image/')) {
        const matches = questionImage.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          imagePart = {
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          };
        }
      } else if (questionImage.startsWith('http://') || questionImage.startsWith('https://')) {
        try {
          const imgRes = await fetch(questionImage);
          if (imgRes.ok) {
            const mimeType = (imgRes.headers.get('content-type') || 'image/jpeg').split(';')[0];
            const arrayBuffer = await imgRes.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');
            imagePart = {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            };
          }
        } catch (imgFetchErr) {
          console.warn('Uzak görsel fetch hatası:', imgFetchErr);
        }
      }
    }

    // Gemini payload hazırla
    const contents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>;
    }> = [];

    if (!conversationHistory || conversationHistory.length <= 1) {
      const parts: any[] = [{ text: promptText }];
      if (imagePart) parts.push(imagePart);
      contents.push({ role: 'user', parts });
    } else {
      let isFirstUserAdded = false;
      for (const msg of conversationHistory) {
        if (!isFirstUserAdded && msg.role === 'assistant') {
          continue;
        }

        const role = msg.role === 'assistant' ? 'model' : 'user';
        const parts: any[] = [{ text: msg.content }];

        if (!isFirstUserAdded && role === 'user') {
          parts.unshift({ text: promptText });
          if (imagePart) parts.push(imagePart);
          isFirstUserAdded = true;
        }

        if (contents.length > 0 && contents[contents.length - 1].role === role) {
          contents[contents.length - 1].parts.push(...parts);
        } else {
          contents.push({ role, parts });
        }
      }

      if (contents.length === 0 || !isFirstUserAdded) {
        const parts: any[] = [{ text: `${promptText}\n\nÖğrencinin Talebi: "${userQuery || 'Yardım eder misin?'}"` }];
        if (imagePart) parts.push(imagePart);
        contents.push({ role: 'user', parts });
      }
    }

    const geminiResult = await callGeminiApi({
      contents,
      systemInstruction: systemPrompt,
      temperature: isFullSolve ? 0.1 : 0.3,
      maxOutputTokens: 1400,
    });

    if (geminiResult.text) {
      const cleanReply = formatMathText(geminiResult.text);
      const result: SolveApiResponse = {
        reply: cleanReply,
        message: cleanReply,
        isMock: false,
        suggestedAction: isFullSolve || cleanReply.includes('Nihai Cevap') ? 'resolve' : 'continue',
      };
      return NextResponse.json(result);
    }

    // Fallback Mock Yanıt
    const lastUserMsg =
      userMessage ||
      studentNote ||
      (conversationHistory && conversationHistory.length > 0
        ? conversationHistory[conversationHistory.length - 1]?.content
        : '');

    const mockReply = formatMathText(
      generateMockSocraticResponse(
        courseName,
        topicName,
        lastUserMsg,
        isFullSolve ? 'full_solve' : 'hint',
        tier
      )
    );

    const result: SolveApiResponse = {
      reply: mockReply,
      message: mockReply,
      isMock: true,
      suggestedAction: isFullSolve ? 'resolve' : 'continue',
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI Solve route genel hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
