/**
 * Öğrencinin kademesine (LGS, 9, 10, 11, YKS) göre dinamik öğretmen personası ve sistem talimatı üretir.
 */
export function buildTierSpecificSystemPrompt(
  tier?: 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks',
  gradeLevel?: string,
  scoreType?: string,
  courseName?: string
): { systemPrompt: string; personaTitle: string } {
  let resolvedTier = tier;
  if (!resolvedTier) {
    if (gradeLevel === '9') resolvedTier = 'lise1';
    else if (gradeLevel === '10') resolvedTier = 'lise2';
    else if (gradeLevel === '11') resolvedTier = 'lise3';
    else if (gradeLevel === '12' || gradeLevel === 'mezun') resolvedTier = 'yks';
    else resolvedTier = 'lgs';
  }

  let personaTitle = '🎓 MEB LGS Sınav Koçu';
  let personaDescription = '8. Sınıf LGS öğrencilerine rehberlik eden uzman, sıcak, sabırlı ve pedagojik bir Sokratik öğretmen ve soru çözüm koçusun.';
  let pedagogicalGuidance = `
- MEB LGS yeni nesil soru mantığına odaklan (beceri temelli, grafik/tablo yorumlama, günlük hayat modellemeleri).
- Öğrencinin soru kökünü ("hangisi çıkarılamaz", "kesinlikle doğrudur", "en az kaçtır") doğru okumasını sağla.
- 3 yanlışın 1 doğruyu götürdüğü LGS kuralını gözeterek çeldiricileri fark ettir.`;

  if (resolvedTier === 'lise1') {
    personaTitle = '🏛️ MEB 9. Sınıf Maarif Modeli Öğretmeni';
    personaDescription = '9. Sınıf (Lise 1) öğrencilerine rehberlik eden Türkiye Yüzyılı Maarif Modeli uzmanı lise branş öğretmeni ve MEB Ortak Yazılı Sınav koçusun.';
    pedagogicalGuidance = `
- MEB Ortak Yazılı Sınav açık uçlu soru standartlarına göre adım adım kavramsal gerekçelendirme yap.
- Türk Dili ve Edebiyatı 70 barajı ve lise notlarının üniversite YKS OBP puanına %25 doğrudan etkisini göz önünde bulundur.
- Ezber yerine neden-sonuç bağıntısı kurdur.`;
  } else if (resolvedTier === 'lise2') {
    personaTitle = '🧭 10. Sınıf Akademik Rehber & Alan Koçu';
    personaDescription = '10. Sınıf (Lise 2) öğrencilerine rehberlik eden lise branş öğretmeni ve Alan Seçimi (Sayısal, Eşit Ağırlık, Sözel, Dil) akademik danışmanısın.';
    pedagogicalGuidance = `
- 10. sınıf müfredatındaki temel soyut kavramları (fonksiyonlar, kalıtım, dalgalar, felsefe vb.) pekiştir.
- Öğrencinin 11. sınıfta seçeceği alan ile bu dersin ilişkisini sezdir ve akademik özgüven kazandır.
- MEB 2. dönem ortak yazılı ve okul başarı puanı (OBP) ciddiyetini vurgula.`;
  } else if (resolvedTier === 'lise3') {
    personaTitle = '🎯 11. Sınıf İleri Alan & Erken TYT Koçu';
    personaDescription = '11. Sınıf (Lise 3) öğrencilerine rehberlik eden kıdemli Alan Öğretmeni ve YKS Temel Atma Koçusun.';
    pedagogicalGuidance = `
- %70 İleri Düzey Alan Müfredatı (Trigonometri, Vektör/Bağıl Hareket, Modern Atom, Dolaşım Sistemleri, Edebi Akımlar vb.) derinliği sağla.
- %30 Erken TYT net artırma ve soru pratikliğini teşvik et.
- Soru çözümlerinde formül ezberletmek yerine teorik ispat ve çıkarım mantığını öğret.`;
  } else if (resolvedTier === 'yks') {
    personaTitle = '🏆 ÖSYM YKS (TYT / AYT / YDT) Sınav Koçu';
    personaDescription = '12. Sınıf ve Mezun YKS adaylarına rehberlik eden, ÖSYM soru formatına hakim kıdemli YKS Sınav Koçu ve Branş Uzmanısın.';
    pedagogicalGuidance = `
- ÖSYM YKS soru stillerini, klasik soru tuzaklarını ve çeldiricileri göster.
- AYT derinliğinde (Türev, İntegral, Limit, Elektrokimya, Organik Kimya, Modern Fizik, Edebi Akımlar) adım adım eksiksiz matematiksel/mantıksal doğruluk sağla.
- 4 yanlışın 1 doğruyu götürdüğü ÖSYM kuralını hatırlatarak şık eleme stratejilerini ve süre yönetimini öğret.`;
  }

  const systemPrompt = `Sen ${personaDescription}
GÖREVİN: Öğrencinin yüklediği soru görselini ve sorusunu dikkatle analiz ederek, öğrencinin soru mantığını kavramasını sağlamak ve öğrencinin talebine göre (İpucu veya Tam Çözüm) rehberlik etmek.

ROL & PEDAGOJİK YAKLAŞIM (${personaTitle}):
${pedagogicalGuidance}

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
   - ASLA LaTeX sembolleri (dolar sembolü, \\cdot, \\times, \\frac vb.) KULLANMA. Dolar sembolü KESİNLİKLE YASAKTIR.
   - Matematik işlemlerini doğrudan doğal, okunaklı Türkçe karakterlerle yaz:
     * '4 · 4' gibi açık yazım tercih et.
     * Üslü ifadeleri daima Unicode üst simge ile yaz: '4²', '2³', '2¹²', '2⁷', '4⁷', 'x²', '10⁻⁵'. Bilgisayar programlama formatı olan '^' (örn: 2^3, 2^12) KESİNLİKLE KULLANMA!
     * Çarpma için '·' veya 'x', bölme için '÷' veya '/' kullan.
   - Adımları belirginleştirmek için "**1. Adım:**", "**2. Adım:**" gibi kalın başlıklar kullan.

4. DOĞAL VE GERÇEKÇİ DİL:
   - Asla basmakalıp robotik cümleler kurma. Soruda şıklar varsa şıklardan bahset; soru klasik bir işlemse işlem adımlarından bahset.
   - Pedagojik, motive edici ve öğrencinin kademesine (${personaTitle}) uygun ol.`;

  return { systemPrompt, personaTitle };
}

/**
 * Konuya, kademeye ve öğrenci mesajına göre pedagojik mock Sokratik veya tam çözüm yanıt üreten yardımcı fonksiyon
 */
export function generateMockSocraticResponse(
  courseName: string,
  topicName: string,
  lastUserMessage?: string,
  mode?: 'hint' | 'full_solve',
  tier?: 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks'
): string {
  const msg = lastUserMessage?.toLowerCase() || '';
  const isFullSolve = mode === 'full_solve' || msg.includes('tamamen çöz') || msg.includes('soruyu çöz') || msg.includes('çözümü ver') || msg.includes('cevabı söyle');

  // 1. Tam Çözüm Modu
  if (isFullSolve) {
    if (tier === 'yks') {
      return `ÖSYM YKS Çözüm Analizi: 🎯
Bu ${courseName} (${topicName}) sorusunun ÖSYM standartlarında adım adım eksiksiz çözümü:

**1. Adım (ÖSYM Soru Mantığı & Veri Tespiti):**
Soruda verilen bağıntı ve sınır koşullarını tespit ediyoruz. İlgili formülü veya teorem mantığını kuruyoruz.

**2. Adım (İşlem & Denklem Çözümü):**
Bileşenleri yerine koyarak işlem adımlarını sadeleştiriyoruz:
Temel bağıntı gereğince ara adımları uyguladığımızda istenen parametreye doğrudan ulaşıyoruz.

**3. Adım (Çeldirici Analizi & Sağlama):**
ÖSYM'nin sıklıkla kurguladığı işlem tuzaklarını kontrol ediyoruz (işaret hataları, tanım kümesi kısıtlamaları).

**Nihai Cevap:** İlgili seçenek eksiksiz doğrulanmıştır.
Tebrikler! Çözümün mantığını kavradıysan soruyu "Öğrenildi" olarak işaretleyebilirsin.`;
    }

    if (courseName.toLowerCase().includes('matematik')) {
      return `Bu sorunun adım adım eksiksiz çözümü şu şekildedir: 🎯

**1. Adım (İşlem Önceliği):**
İşlem önceliği kuralına göre ilk olarak parantez içindeki işlem yapılır:
(4² - 2) ifadesinde önce üslü sayıyı hesaplayalım:
4² = 4 · 4 = 16
Şimdi çıkarma işlemini tamamlayalım:
16 - 2 = 14

**2. Adım (Üslü İfade Değeri):**
Başta bulunan üslü sayının değerini hesaplayalım:
2³ = 2 · 2 · 2 = 8

**3. Adım (Çarpma İşlemi):**
Şimdi bulduğumuz iki değeri birbiriyle çarpıyoruz:
8 · 14 = 112

**Nihai Cevap:** 112
Tebrikler! Çözümün tüm adımlarını kavradıysan yukarıdaki "Öğrendim Olarak İşaretle" butonuna tıklayabilirsin.`;
    }

    return `Sorunun tam ve ayrıntılı çözümü: 🎯

**1. Adım:** Soruda verilen temel verileri ve kuralları belirliyoruz.
**2. Adım:** İlgili formül veya mantık kuralını uyguluyoruz.
**3. Adım:** İşlemleri tamamlayarak doğru sonuca ulaşıyoruz.

**Nihai Cevap:** Çözüm adımları tamamlanmıştır.
Aklına takılan herhangi bir nokta olursa çekinmeden sorabilirsin!`;
  }

  // 2. Öğrenci çözümü anladığını belirttiğinde
  if (msg.includes('anladım') || msg.includes('teşekkür') || msg.includes('çözdüm')) {
    return `Harika iş çıkardın! 🎉 Sorunun temel mantığını kavradın ve sonuca ulaştın. 
Bu soruyu Yanlış Defteri'nde **"Öğrenildi / Çözüldü"** olarak işaretleyebilirsin. Sınavda benzer bir soru çıktığında bu çözüm stratejisini hemen hatırlayacaksın!`;
  }

  // 3. Öğrenci şıklar arasında kaldığında
  if (msg.includes('şık') || msg.includes('eledim') || msg.includes('kararsız')) {
    return `Çok güzel bir eleme yapmışsın! 👏 
Kalan seçenekler arasındaki farkı görmek için soru kökündeki vurguya dikkat et: Soru senden **"en az"** mı, **"kesinlikle"** mi yoksa **"ulaşılamaz"** olanı mı istiyor? 
Kalan seçenekleri bu kritere göre tekrar değerlendirirsen doğru yolu hemen göreceksin. Sence hangisi bu koşulu tam karşılıyor?`;
  }

  // 4. Kademeye Göre Yönlendirici İlk İpucu
  if (tier === 'yks') {
    return `ÖSYM YKS Soru Koçu İpucu: 💡
Bu ${topicName} sorusunu çözerken ÖSYM'nin istediği ilk kavrama odaklan:
Sorudaki değişkenleri ve sınır şartlarını belirledikten sonra, ilk olarak hangi formül veya teorem ile başlamayı düşünüyorsun? Düşünceni paylaş, birlikte ilerleyelim!`;
  }

  if (tier === 'lise1') {
    return `MEB 9. Sınıf Yazılı İpucu: 💡
Bu ${topicName} sorusu MEB ortak sınavlarında açık uçlu kavramsal gerekçelendirme gerektirir.
İlk adım olarak soruda verilen tanımı veya kuralı kendi cümlelerinle nasıl ifade edersin? İlk hamleni bekliyorum!`;
  }

  if (courseName.toLowerCase().includes('matematik')) {
    return `Bu ${topicName} sorusunu çözmek için ilk ipucun: 💡

**1. Adım:** İşlem önceliği kuralını hatırla: Parantez içindeki işlem her zaman önceliklidir!
Parantez içinde (4² - 2) ifadesi yer alıyor. 4² ifadesi 4 · 4 demektir.

Sence parantez içindeki çıkarma işleminin sonucu kaç çıkar? Cevabını yaz, bir sonraki adıma geçelim!`;
  }

  return `${courseName} - ${topicName} sorusu için ilk yönlendirici ipucun: 💡

Sorudaki verilenleri ve senden isteneni ayrı ayrı not ettiğinde, ilk işlem adımı için ne düşünüyorsun? İlk hamleyi birlikte yapalım!`;
}
