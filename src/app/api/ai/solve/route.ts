import { NextRequest, NextResponse } from 'next/server';
import type { SolveApiRequest, SolveApiResponse } from '@/types/ai';
import { callGeminiApi } from '@/lib/gemini';

const SYSTEM_PROMPT = `Sen öğrencilere (8. Sınıf LGS ve 9. Sınıf Lise 1) rehberlik eden uzman, sıcak, sabırlı ve pedagojik bir Sokratik öğretmen ve soru çözüm koçusun.
GÖREVİN: Öğrencinin yüklediği soru görselini ve sorusunu dikkatle analiz ederek, öğrencinin soru mantığını kavramasını sağlamak ve öğrencinin talebine göre (İpucu veya Tam Çözüm) rehberlik etmek.

TEMEL KURALLAR:
1. GÖRSELİ OKUMA:
   - Görseldeki soruyu (el yazısı, defter notu veya basılı kitap sayfası) dikkatlice incele ve oku.
   - Soru kökünü, sayıları, üslü ifadeleri ve geometrik şekilleri doğrudan görsele göre doğru tespit et.

2. ÇÖZÜM MODU (İPUCU vs TAM ÇÖZÜM):
   A) EĞER ÖĞRENCİ "İPUCU AL" VEYA REHBERLİK İSTİYORSA:
      - Soruyu 2-3 mantıklı adıma böl (Örn: "**1. Adım:** ...", "**2. Adım:** ...").
      - Yönlendirici sorular sor, son işlemi veya nihai sonucu söyleme, öğrencinin zihninde kıvılcım çakmasını sağla.
   B) EĞER ÖĞRENCİ "SORUYU ÇÖZ" / "TAM ÇÖZÜM" İSTİYORSA:
      - Sorunun TÜM adımlarını, ara hesaplamalarını eksiksiz açıkla.
      - En sonda "**Nihai Cevap:** [Sonuç]" şeklinde doğru cevabı net olarak belirt.

3. KESİNTİSİZ MATEMATİK VE YAZIM FORMATI KURALI:
   - ASLA LaTeX sembolleri ($ işareti, \\cdot, \\times, \\frac vb.) KULLANMA. Dolar işareti ($) KESİNLİKLE YASAKTIR.
   - Matematik işlemlerini doğrudan doğal, okunaklı Türkçe karakterlerle yaz:
     * '$4 \\cdot 4$' yerine: '4 · 4'
     * '$4^2$' veya '$2^3$' yerine: '4²' veya '2³' (veya 4^2, 2^3)
     * Çarpma için '·' veya 'x', bölme için '÷' veya '/' kullan.
   - Adımları belirginleştirmek için "**1. Adım:**", "**2. Adım:**" gibi kalın başlıklar kullan.

4. DOĞAL VE GERÇEKÇİ DİL:
   - Asla basmakalıp robotik cümleler kurma. Soruda şıklar varsa şıklardan bahset; soru klasik bir işlemse işlem adımlarından bahset.
   - Pedagojik, motive edici ve samimi ol.`;

/**
 * Konuya ve öğrenci mesajına göre pedagojik mock Sokratik veya tam çözüm yanıt üreten yardımcı fonksiyon
 */
function generateMockSocraticResponse(
  courseName: string,
  topicName: string,
  lastUserMessage?: string,
  mode?: 'hint' | 'full_solve'
): string {
  const msg = lastUserMessage?.toLowerCase() || '';

  // 1. Öğrenci tam çözümü istediğinde
  if (mode === 'full_solve' || msg.includes('tamamen çöz') || msg.includes('soruyu çöz') || msg.includes('çözümü ver') || msg.includes('cevabı söyle')) {
    if (courseName.toLowerCase().includes('matematik')) {
      return `Bu sorunun adım adım eksiksiz çözümü şu şekildedir: 🎯

**1. Adım (Parantez İçi Önceliği):**
İşlem önceliği kuralına göre ilk olarak parantez içindeki işlem yapılır:
(4² - 2) ifadesinde önce üslü sayıyı hesaplayalım:
4² = 4 · 4 = 16
Şimdi çıkarma işlemini tamamlayalım:
16 - 2 = 14

**2. Adım (Dıştaki Üslü İfade):**
Parantezin başında bulunan üslü sayının değerini hesaplayalım:
2³ = 2 · 2 · 2 = 8  (Eğer sorunuzda 2² ise: 2 · 2 = 4 olur)

**3. Adım (Çarpma İşlemi):**
Şimdi bulduğumuz iki değeri birbiriyle çarpıyoruz:
8 · 14 = 112  (Eğer 2² kullanıldıysa: 4 · 14 = 56)

**Nihai Cevap:** 112 (veya 56)
Tebrikler! Çözümün tüm adımlarını kavradıysan yukarıdaki "Öğrendim Olarak İşaretle" butonuna tıklayabilirsin.`;
    }

    return `Sorunun tam ve ayrıntılı çözümü: 🎯

**1. Adım:** Soruda verilen temel verileri ve kuralları belirliyoruz.
**2. Adım:** İlgili formül veya mantık kuralını uyguluyoruz.
**3. Adım:** İşlemleri tamamlayarak doğru sonuca ulaşıyoruz.

Tüm işlem adımlarını tamamladık. Çözümü inceleyip aklına takılan bir nokta olursa sorabilirsin!`;
  }

  // 2. Öğrenci çözümü anladığını belirttiğinde
  if (msg.includes('anladım') || msg.includes('teşekkür') || msg.includes('çözdüm')) {
    return `Harika iş çıkardın! 🎉 Sorunun temel mantığını kavradın ve sonuca ulaştın. 
Bu soruyu Yanlış Defteri'nde **"Öğrenildi / Çözüldü"** olarak işaretleyebilirsin. Benzer bir soru çıktığında bu işlem sırasını hemen hatırlayacaksın!`;
  }

  // 3. Öğrenci şıklar arasında kaldığında
  if (msg.includes('şık') || msg.includes('eledim') || msg.includes('kararsız')) {
    return `Çok güzel bir eleme yapmışsın! 👏 
Kalan seçenekler arasındaki farkı görmek için soru kökündeki vurguya dikkat et: Soru senden **"en az"** mı, **"kesinlikle"** mi yoksa **"ulaşılamaz"** olanı mı istiyor? 
Kalan seçenekleri bu kritere göre tekrar değerlendirirsen doğru yolu hemen göreceksin. Sence hangisi bu koşulu tam sağlıyor?`;
  }

  // 4. Öğrenci ipucu istediğinde veya ilk adımı sorduğunda
  if (courseName.toLowerCase().includes('matematik')) {
    return `Bu ${topicName} sorusunu çözmek için ilk ipucun: 💡

**1. Adım:** İşlem önceliği kuralını hatırla: Parantez içindeki işlem her zaman önceliklidir!
Parantez içinde (4² - 2) ifadesi yer alıyor. 4² ifadesi 4 · 4 demektir.

Sence parantez içindeki çıkarma işleminin sonucu kaç çıkar? Cevabını yaz, bir sonraki adıma geçelim!`;
  }

  return `${courseName} - ${topicName} sorusu için ilk yönlendirici ipucun: 💡

Sorudaki verilenleri ve senden isteneni ayrı ayrı not ettiğinde, ilk işlem adımı için ne düşünüyorsun? İlk hamleyi birlikte yapalım!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SolveApiRequest;
    const { questionImage, courseName, topicName, studentNote, userMessage, mode, conversationHistory } = body;

    if (!courseName || !topicName) {
      return NextResponse.json(
        { error: 'Ders ve konu bilgisi zorunludur.' },
        { status: 400 }
      );
    }

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
      promptText = `Sen 8. sınıf LGS ve 9. sınıf öğrencilerine rehberlik eden uzman, samimi ve motive edici bir Konu Koçu ve Öğretmenisin.
Ders: ${courseName}
Konu: ${topicName}

ÖĞRENCİNİN TALEBİ / SORUSU:
"${userQuery || `${topicName} konusu hakkında önemli püf noktaları ve MEB soru kalıbı taktiği ver.`}"

GÖREVİN:
1. Öğrencinin sorusunu veya isteğini pedagojik, sıcak ve akılda kalıcı bir dille yanıtla.
2. MEB'in sınavlarda en çok sorduğu soru kalıplarını, çeldiricileri ve yeni nesil soru mantığını açıkla.
3. Asla LaTeX ($ işareti) kullanma. Sade, doğal matematik dili kullan.
4. Cevabı 2-3 akıcı paragraf veya net maddeler halinde sun.`;
    } else {
      promptText = `${SYSTEM_PROMPT}

Ders: ${courseName}
Konu: ${topicName}
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
      systemInstruction: SYSTEM_PROMPT,
      temperature: isFullSolve ? 0.1 : 0.3,
      maxOutputTokens: 1400,
    });

    if (geminiResult.text) {
      const result: SolveApiResponse = {
        reply: geminiResult.text,
        message: geminiResult.text,
        isMock: false,
        suggestedAction: isFullSolve || geminiResult.text.includes('Nihai Cevap') ? 'resolve' : 'continue',
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

    const mockReply = generateMockSocraticResponse(
      courseName,
      topicName,
      lastUserMsg,
      isFullSolve ? 'full_solve' : 'hint'
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
