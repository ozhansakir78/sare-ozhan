import { NextRequest, NextResponse } from 'next/server';
import type { SolveApiRequest, SolveApiResponse } from '@/types/ai';
import { callGeminiApi } from '@/lib/gemini';

const SYSTEM_PROMPT = `Sen 8. sınıf LGS öğrencilerine rehberlik eden uzman, sıcak ve pedagojik bir Sokratik öğretmensin.
GÖREVİN: Öğrencinin yüklediği soru görselini ve sorusunu analiz ederek, öğrencinin cevaba KENDİSİNİN ulaşmasını sağlamak.

KESİN KURALLAR:
1. ASLA cevabı doğrudan söyleme (Örneğin "Cevap C şıkkıdır", "Doğru seçenek A", "Sonuç 24'tür" demek KESİNLİKLE YASAKTIR).
2. Soruyu adım adım parçalara böl.
3. Öğrenciye soru kökünü, verilen sayısal/sözel verileri ve ilk atması gereken mantık adımını hatırlatan yönlendirici bir soru veya ipucu ver.
4. Sıcak, motive edici ve öğrenciyi düşündüren bir dil kullan (Örnek: "Harika bir noktaya değindin! Peki soruda verilen şu bilgiyi fark ettin mi?").
5. Öğrenci doğru yaklaştıkça bir sonraki aşamayı aç ve takıldığı yerde formülün veya kuralın mantığını hatırlat.
6. Yanıtlarını 2-3 kısa paragrafı geçmeyecek şekilde anlaşılır ve net tut.`;

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
    return `Harika iş çıkardın! 🎉 Sorunun temel mantığını kendin keşfettin ve çözüme ulaştın. 
Bu soruyu Yanlış Defteri'nde **"Öğrenildi / Çözüldü"** olarak işaretleyebilirsin. Benzer bir soru LGS'de çıktığında bu mantığı hemen hatırlayacaksın!`;
  }

  // 2. Öğrenci şıklar arasında kaldığında
  if (msg.includes('şık') || msg.includes('eledim') || msg.includes('kararsız')) {
    return `Çok güzel bir eleme yapmışsın! 👏 
Kalan iki seçenek arasındaki farkı görmek için soru kökündeki vurguya dikkat et: Soru senden **"en az"** mı, **"kesinlikle"** mi yoksa **"ulaşılamaz"** olanı mı istiyor? 
Kalan iki seçeneği bu kritere göre tekrar değerlendirirsen doğru yolu hemen göreceksin. Sence hangisi bu koşulu tam sağlıyor?`;
  }

  // 3. Öğrenci ilk adımı istediğinde veya henüz yeni başladığında
  if (historyLength <= 1 || msg.includes('ilk adım') || msg.includes('ipucu ver') || msg.includes('başlayam')) {
    if (courseName.toLowerCase().includes('matematik')) {
      return `Bu ${topicName} sorusunda harika bir ipucu gizli! 🔍

İlk adım olarak şunu düşünelim:
Verilen problemde parçalardan bütüne doğru mu gidiyoruz (ortak kat / EKOK), yoksa elimizdeki bir bütünü eşit parçalara mı ayırıyoruz (ortak bölen / EBOB)?

Soruda verilen sayıları bu gözle incelediğinde ilk işlem için ne düşünüyorsun?`;
    }

    if (courseName.toLowerCase().includes('fen')) {
      return `${topicName} konusunda sıkça karşılaşılan çok güzel bir soru! 🔬

Görsele ve grafiğe baktığında:
1. Deneyde değiştirilen (bağımsız değişken) ile sabit tutulan unsurlar neler?
2. Bu durumun kurala göre sonucu nasıl etkilemesini beklersin?

Soru kökündeki grafiğin tepe veya dip noktasına bir kez daha bakar mısın? Sence hangi etken bu değişime yol açmış olabilir?`;
    }

    if (courseName.toLowerCase().includes('türkçe')) {
      return `Türkçe ${topicName} sorularında en kritik aşama soru kökünü doğru anlamaktır! 📖

Öncelikle metindeki anahtar kelimelerin altını çizelim. Paragrafta yazarın asıl savunmak istediği ana düşünce sence cümlenin başında mı yoksa sonuca bağlanan son cümlede mi yer alıyor?`;
    }

    return `${courseName} - ${topicName} sorusu için ilk yönlendirici ipucun: 💡

Sorudaki verilenleri ve senden isteneni ayrı ayrı not ettiğinde, formülü veya kuralı uygulamak için eksik olan ilk veriyi nasıl bulabilirsin? Soru metnindeki ilk cümleyi birlikte inceleyelim: Sence ilk ipucu nerede gizli?`;
  }

  // 4. Genel devam adımları
  return `Çok doğru bir yaklaşımla ilerliyorsun! 🎯

Peki bu bulduğun sonucu soru kökündeki sınırlandırmayla (örneğin aralık, koşul veya birim) birleştirdiğinde seçeneklerden hangisiyle örtüşüyor? Bir sonraki adımı denemek ister misin?`;
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
      promptText = `Sen 8. sınıf LGS öğrencilerine rehberlik eden uzman, samimi ve motive edici bir LGS Konu Koçu ve Öğretmenisin.
Ders: ${courseName}
Konu: ${topicName}

ÖĞRENCİNİN TALEBİ / SORUSU:
"${userQuery || `${topicName} konusu hakkında önemli püf noktaları ve MEB soru kalıbı taktiği ver.`}"

GÖREVİN:
1. Öğrencinin sorusunu veya isteğini pedagojik, sıcak ve akılda kalıcı bir dille yanıtla.
2. MEB'in LGS'de en çok sorduğu soru kalıplarını, çeldiricileri ve yeni nesil soru mantığını açıkla.
3. Varsa somut bir günlük hayat örneği veya pratik kural ver.
4. Cevabı 2-3 akıcı paragraf veya net maddeler halinde, markdown formatında sun.`;
    } else {
      promptText = `${SYSTEM_PROMPT}

ÖĞRENCİ BİLGİLERİ:
Ders: ${courseName}
Konu: ${topicName}
Öğrenci Notu: ${studentNote || userMessage || 'Yok'}

Görselde öğrencinin çözemediği LGS sorusu yer alıyor. Lütfen soruyu ve şıkları incele, soru kökünü tespit et ve Sokratik yöntemle cevabı doğrudan vermeden ilk adım için yönlendirici bir ipucu ver.`;
    }

    // Gemini payload hazırla
    const contents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>;
    }> = [];

    const firstParts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
      { text: promptText },
    ];

    // Görsel verisini işle (base64 veya remote url)
    if (questionImage) {
      if (questionImage.startsWith('data:image/')) {
        const matches = questionImage.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          firstParts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      } else if (questionImage.startsWith('http://') || questionImage.startsWith('https://')) {
        try {
          const imgRes = await fetch(questionImage);
          if (imgRes.ok) {
            const mimeType = (imgRes.headers.get('content-type') || 'image/jpeg').split(';')[0];
            const arrayBuffer = await imgRes.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');
            firstParts.push({
              inlineData: {
                mimeType,
                data: base64Data,
              },
            });
          }
        } catch (imgFetchErr) {
          console.warn('Uzak görsel fetch hatası:', imgFetchErr);
        }
      }
    }

    contents.push({
      role: 'user',
      parts: firstParts,
    });

    // Sohbet geçmişini ekle (varsa)
    if (conversationHistory && conversationHistory.length > 1) {
      for (let i = 1; i < conversationHistory.length; i++) {
        const msg = conversationHistory[i];
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    const geminiResult = await callGeminiApi({
      contents,
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.4,
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
