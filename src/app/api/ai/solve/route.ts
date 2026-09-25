import { NextRequest, NextResponse } from 'next/server';
import type { SolveApiRequest, SolveApiResponse } from '@/types/ai';
import { callGeminiApi } from '@/lib/gemini';

const SYSTEM_PROMPT = `Sen öğrencilere (8. Sınıf LGS ve 9. Sınıf Lise 1) rehberlik eden uzman, sıcak, sabırlı ve pedagojik bir Sokratik öğretmen ve soru çözüm koçusun.
GÖREVİN: Öğrencinin yüklediği soru görselini ve sorusunu dikkatle analiz ederek, öğrencinin soru mantığını kavramasını ve cevaba KENDİSİNİN ulaşmasını sağlamak.

TEMEL KURALLAR:
1. GÖRSELİ OKUMA:
   - Görseldeki soruyu (el yazısı, defter notu veya basılı kitap sayfası) dikkatlice incele ve oku.
   - Soru kökünü, sayıları, üslü ifadeleri veya geometrik şekilleri doğrudan görsele göre tespit et.
2. SOKRATİK REHBERLİK & ÇÖZÜM ADIMLARI:
   - Eğer öğrenci "3 adımda çözümü anlat", "nasıl çözeceğim", "adımları söyle", "ipucu ver" gibi doğrudan çözüm yolu istiyorsa:
     * Soruyu adım adım parçalara böl (Örn: "1. Adım: Önce parantez içindeki üslü ifadeyi hesaplayalım...", "2. Adım: Şimdi parantez dışındaki üslü ifadeye bakalım...", "3. Adım: Son olarak bu iki sonucu birbiriyle çarpalım.").
     * Doğrudan çıplak nihai sonucu (Örn: "Cevap 112'dir") pat diye vermek yerine, son matematiksel işlemi öğrenciye bırak: "Şimdi bulduğun bu iki değeri çarparak sonuca ulaşabilirsin. Sence sonuç kaç çıkar?"
3. DOĞAL VE GERÇEKÇİ DİL:
   - Asla basmakalıp, ezbere veya bağlam dışı robotik cümleler kurma (Örn: Açık uçlu veya test olmayan bir soruda "seçeneklerden hangisiyle örtüşüyor?" veya "grafiğe baktığında bağımsız değişken nedir" gibi alakasız şablon cümleler KESİNLİKLE YASAKTIR).
   - Soruda şıklar varsa şıklardan bahset, soru klasik/açık uçlu bir işlem ise işlem adımlarından bahset.
4. PEDAGOJİK VE MOTİVE EDİCİ ÜSLUP:
   - Sıcak, cesaretlendirici, net ve akıcı bir Türkçe kullan.
   - Formül ve kuralları öğrencinin zihninde canlandıracak şekilde hatırlat.`;

/**
 * Konuya ve öğrenci mesajına göre pedagojik mock Sokratik yanıt üreten yardımcı fonksiyon
 */
function generateMockSocraticResponse(
  courseName: string,
  topicName: string,
  lastUserMessage?: string,
  historyLength: number = 0
): string {
  const msg = lastUserMessage?.toLowerCase() || '';

  // 1. Öğrenci çözümü anladığını belirttiğinde
  if (msg.includes('anladım') || msg.includes('teşekkür') || msg.includes('çözdüm')) {
    return `Harika iş çıkardın! 🎉 Sorunun temel mantığını kavradın ve sonuca ulaştın. 
Bu soruyu Yanlış Defteri'nde **"Öğrenildi / Çözüldü"** olarak işaretleyebilirsin. Benzer bir soru çıktığında bu işlem sırasını hemen hatırlayacaksın!`;
  }

  // 2. Öğrenci adım adım çözüm veya yol gösterilmesini istediğinde
  if (msg.includes('adım') || msg.includes('nasıl') || msg.includes('anlat') || msg.includes('çöz')) {
    if (courseName.toLowerCase().includes('matematik')) {
      return `Bu ${topicName} sorusunu 3 adımda kolayca çözebilirsin: 🎯

1. **Adım:** Önce işlem önceliğine göre parantez içindeki ifadeye odaklan. Varsa üslü ifadenin değerini hesapla ve parantez içindeki işlemi sadeleştir.
2. **Adım:** Parantezin dışındaki üslü sayının değerini hesapla.
3. **Adım:** Bulduğun iki değeri aradaki işlemle (örneğin çarpma) bir araya getir.

İlk adımı uyguladığında parantez içindeki sonucu kaç buluyorsun? Birlikte devam edelim!`;
    }

    if (courseName.toLowerCase().includes('fen')) {
      return `Bu ${topicName} sorusunu 3 adımda inceleyelim: 🔬

1. **Adım:** Soruda verilen değişkenleri belirle (bağımsız değişken ve sabit tutulan etkenler).
2. **Adım:** Konunun temel kuralını hatırla ve bu değişkenlerin sonuca etkisini düşün.
3. **Adım:** İstenen hedef duruma en uygun açıklamayı belirle.

Sence ilk adımdaki en kritik veri hangisi?`;
    }
  }

  // 3. Öğrenci şıklar arasında kaldığında
  if (msg.includes('şık') || msg.includes('eledim') || msg.includes('kararsız')) {
    return `Çok güzel bir eleme yapmışsın! 👏 
Kalan seçenekler arasındaki farkı görmek için soru kökündeki vurguya dikkat et: Soru senden **"en az"** mı, **"kesinlikle"** mi yoksa **"ulaşılamaz"** olanı mı istiyor? 
Kalan seçenekleri bu kritere göre tekrar değerlendirirsen doğru yolu hemen göreceksin. Sence hangisi bu koşulu tam sağlıyor?`;
  }

  // 4. Öğrenci ilk adımı istediğinde veya henüz yeni başladığında
  if (historyLength <= 1 || msg.includes('ilk adım') || msg.includes('ipucu ver') || msg.includes('başlayam')) {
    if (courseName.toLowerCase().includes('matematik')) {
      return `Bu ${topicName} sorusunda harika bir ipucu gizli! 🔍

İlk adım olarak şunu düşünelim:
İşlemde parantez ve üslü ifadeler yer alıyorsa, işlem önceliği kuralına göre ilk olarak hangi kısımdan başlamalıyız?

Sorudaki ilk işlem için ne düşünüyorsun?`;
    }

    return `${courseName} - ${topicName} sorusu için ilk yönlendirici ipucun: 💡

Sorudaki verilenleri ve senden isteneni ayrı ayrı not ettiğinde, ilk işlem adımı için ne düşünüyorsun? İlk hamleyi birlikte yapalım!`;
  }

  // 5. Genel devam adımları
  return `Çok doğru bir yaklaşımla ilerliyorsun! 🎯

Bulduğun bu sonucu bir sonraki işlem adımıyla birleştirdiğinde sonuca ulaşıyorsun. Bir sonraki adımı denemek ister misin?`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SolveApiRequest;
    const { questionImage, courseName, topicName, studentNote, userMessage, conversationHistory } = body;

    if (!courseName || !topicName) {
      return NextResponse.json(
        { error: 'Ders ve konu bilgisi zorunludur.' },
        { status: 400 }
      );
    }

    const isTopicCoaching = !questionImage;
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
3. Varsa somut bir günlük hayat örneği veya pratik kural ver.
4. Cevabı 2-3 akıcı paragraf veya net maddeler halinde, markdown formatında sun.`;
    } else {
      promptText = `${SYSTEM_PROMPT}

ÖĞRENCİ BİLGİLERİ:
Ders: ${courseName}
Konu: ${topicName}
Öğrenci Notu: ${studentNote || 'Yok'}
Öğrencinin Son Mesajı: "${userQuery || 'Bu sorunun çözümünde bana adım adım rehberlik eder misin?'}"

Görselde öğrencinin çözemediği soru yer alıyor. Lütfen soruyu incele, soru kökünü tespit et ve öğrencinin sorusuna göre adım adım Sokratik ipucu ver.`;
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

    // Gemini payload hazırla (Katı 'user' -> 'model' kuralı uygulanır)
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
        const parts: any[] = [{ text: `${promptText}\n\nÖğrencinin Sorusu: "${userQuery || 'Nasıl çözebilirim?'}"` }];
        if (imagePart) parts.push(imagePart);
        contents.push({ role: 'user', parts });
      }
    }

    const geminiResult = await callGeminiApi({
      contents,
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.3,
      maxOutputTokens: 1200,
    });

    if (geminiResult.text) {
      const result: SolveApiResponse = {
        reply: geminiResult.text,
        message: geminiResult.text,
        isMock: false,
      };
      return NextResponse.json(result);
    }

    // API çağrısı başarısız olursa pedagojik mock yanıt döndür
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
      conversationHistory ? conversationHistory.length : 0
    );

    const result: SolveApiResponse = {
      reply: mockReply,
      message: mockReply,
      isMock: true,
      suggestedAction: mockReply.includes('Öğrenildi') ? 'resolve' : 'continue',
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
