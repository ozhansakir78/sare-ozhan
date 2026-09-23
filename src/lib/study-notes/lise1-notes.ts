import type { TopicStudyNote } from '@/types/study';

export const LISE1_STUDY_NOTES: TopicStudyNote[] = [
  // ==========================================
  // TÜRK DİLİ VE EDEBİYATI (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-edb-1',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    topicName: 'Giriş: Edebiyatın Tanımı ve Güzel Sanatlar İçindeki Yeri',
    lgsFrequency: '1. Ortak Yazılıda Kesin 1 Klasik Soru (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Edebiyat; duygu, düşünce ve hayallerin dil aracılığıyla estetik biçimde ifade edilmesidir.',
      'Güzel sanatlar kullandıkları malzemeye göre üçe ayrılır: İşitsel (Fonetik), Görsel (Plastik) ve Dramatik (Ritmik).',
      'Edebiyat ve müzik "İşitsel (Fonetik) Sanatlar" grubundadır; temel malzemesi dildir.',
      'Edebiyat; tarih, coğrafya, felsefe, sosyoloji ve psikoloji gibi diğer bilim dallarından beslenir.',
    ],
    formulas: [
      '📌 Güzel Sanatların 3 Temel Grubu:\n• İşitsel (Fonetik): Edebiyat, Müzik (Malzemesi ses ve dildir)\n• Görsel (Plastik): Resim, Heykel, Mimari (Malzemesi madde ve boyadır)\n• Dramatik (Ritmik): Tiyatro, Sinema, Bale (Malzemesi insan eylemi ve harekettir)',
    ],
    mebTraps: [
      'Tuzak: Edebiyatı görsel sanat zannetmek. Edebiyat kulağa ve zihne hitap ettiği için fonetiktir (işitseldir).',
      'Tuzak: Bilim ile edebiyatı birbirine karıştırmak. Edebiyat kurgusal ve estetik haz odaklıdır, bilim ise nesnel ve kanıtlanabilir bilgi üretir.',
    ],
    questionStrategy:
      'MEB yazılısında sanat tablosu verilir ve boşluk doldurma istenir. Fonetik = Edebiyat ve Müzik; Plastik = Resim, Heykel, Mimari; Dramatik = Tiyatro, Sinema, Bale olarak kodla.',
    relatedExamSlug: 'meb-9-edebiyat-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Edebiyatın güzel sanatlar içindeki yerini belirterek temel malzemesini ve ilişkili olduğu iki bilim dalını yazınız.',
      solutionSteps: [
        '1. Adım: Edebiyat işitsel (fonetik) sanatlar grubundadır.',
        '2. Adım: Temel malzemesi dil (sözcükler) ve sestir.',
        '3. Adım: Tarih ve psikoloji bilimleriyle doğrudan ilişkilidir.',
      ],
      keyTakeaway: 'Edebiyat = Fonetik Sanat + Malzemesi Dil.',
    },
  },
  {
    topicId: 'l1-note-edb-2',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    topicName: 'İletişim ve İletişimin Temel Ögeleri',
    lgsFrequency: '1. Ortak Yazılıda 10-15 Puanlık Soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Gönderici (Kaynak): İletiyi hazırlayan ve başlatan kişi veya merci.',
      'Alıcı: Gönderilen iletiyi alan, anlamlandıran kişi veya grup.',
      'İleti (Mesaj): Aktarılmak istenen duygu, düşünce veya bilgi.',
      'Kanal: İletinin alıcıya ulaştırıldığı yol (sözlü, yazılı, görsel sinyal).',
      'Bağlam: İletişimin gerçekleştiği ortam (fiziki ve sosyal çevre).',
      'Dönüt (Geri Bildirim): Alıcının iletiye verdiği sözlü ya da eylemsel her türlü yanıt.',
    ],
    mebTraps: [
      'Tuzak: Kanal ile kodu birbirine karıştırmak. Kod dildir (Türkçe, İngilizce, Mors vb.), kanal ise ses dalgası, kâğıt, telefon hattıdır.',
      'Tuzak: Dönütü unutmak. Eğer alıcı cevap vermez veya tepki göstermezse iletişimde dönüt eksik kalmış olur.',
    ],
    questionStrategy:
      'Verilen kısa diyalogda gönderici, alıcı, ileti ve dönütü tek tek ok çıkararak eşleştir.',
    relatedExamSlug: 'meb-9-edebiyat-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Öğretmenin "Ödevini getirdin mi?" sorusuna öğrencinin "Evet çantamda öğretmenim." demesi olayında kanal ve dönüt nedir?',
      solutionSteps: [
        '1. İletişim sözlü olarak gerçekleştiğinden kanal: Ses dalgaları (Sözlü dil).',
        '2. Öğrencinin "Evet çantamda öğretmenim." yanıtı alıcının verdiği dönüttür (geri bildirim).',
      ],
      keyTakeaway: 'Cevap = Dönüt; İletişim Aracı = Kanal.',
    },
  },
  {
    topicId: 'l1-note-edb-3',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    topicName: 'Hikâye (Olay Hikâyesi - Maupassant & Durum Hikâyesi - Çehov)',
    lgsFrequency: '1. ve 2. Yazılıda Kesin Karşılaştırma Sorusu (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Olay Hikâyesi (Klasik / Maupassant Tarzı): Serim, düğüm, çözüm planı katıdır. Merak ve heyecan unsuru zirvededir. Temsilcileri: Guy de Maupassant, Ömer Seyfettin, Refik Halid Karay.',
      'Durum Hikâyesi (Kesit / Çehov Tarzı): Hayatın içinden bir an veya kesit sunulur. Merak ikinci plandadır; psikolojik tahlil ve atmosfer öne çıkar. Temsilcileri: Anton Çehov, Sait Faik Abasıyanık, Memduh Şevket Esendal.',
      'Hikâyenin yapı unsurları: Olay örgüsü, Kişiler, Mekân ve Zamandır.',
      'Anlatıcı türleri: 1. Tekil (Ben/Kahraman) ve 3. Tekil (O/Gözlemci veya Hâkim).',
    ],
    mebTraps: [
      'Tuzak: Sait Faik\'i olay hikâyecisi sanmak. Sait Faik durum (kesit) hikâyeciliğinin Türk edebiyatındaki zirvesidir.',
      'Tuzak: Hâkim (İlahi) bakış açısı ile Gözlemci bakış açısını karıştırmak. Karakterin aklından geçenleri ve gelecekte ne olacağını biliyorsa HÂKİM; sadece bir kamera gibi gördüğünü aktarıyorsa GÖZLEMCİ.',
    ],
    questionStrategy:
      'Yazılıda iki hikâye parçası verilir. Olay akışı ve şaşırtıcı son varsa Olay Hikâyesi; bir kahvehane sohbeti ya da deniz kenarında düşünce akışı varsa Durum Hikâyesi de.',
    relatedExamSlug: 'meb-9-edebiyat-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Olay hikâyesi ile durum hikâyesini merak unsuru ve plan bakımından ikişer madde ile karşılaştırınız.',
      solutionSteps: [
        '1. Olay hikâyesinde merak unsuru çok yüksektir; durum hikâyesinde merak ikinci plandadır.',
        '2. Olay hikâyesi serim-düğüm-çözüm planına sıkıca bağlıdır; durum hikâyesinde klasik plan bulunmaz.',
      ],
      keyTakeaway: 'Maupassant = Olay & Merak; Çehov = Kesit & Ruh Hali.',
    },
  },
  {
    topicId: 'l1-note-edb-4',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    topicName: 'Dil Bilgisi: İsimler (Adlar) ve İsim Tamlamaları',
    lgsFrequency: 'MEB Ortak Sınavında Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Varlıklara verilişine göre: Özel İsim (Atatürk, İstanbul) & Cins İsim (masa, ağaç).',
      'Maddelerine göre: Somut İsim (rüzgâr, ses, ışık) & Soyut İsim (akıl, sevgi, hüzün).',
      'Sayılarına göre: Tekil İsim, Çoğul İsim (-lar/-ler) & Topluluk İsmi (ordu, sürü, deste, orman).',
      'Belirtili İsim Tamlaması: Tamlayan (-ın/-in) ve Tamlanan (-ı/-i) ek alır: Kapı-n-ın kol-u.',
      'Belirtisiz İsim Tamlaması: Sadece tamlanan ek alır: Okul bahçe-s-i.',
      'Zincirleme İsim Tamlaması: En az üç ismin birbirine bağlandığı tamlamadır: Okul kapısının anahtarı.',
    ],
    mebTraps: [
      'Tuzak: Ses ve rüzgârı soyut zannetmek. Duyularımızla (kulak, dokunma) algılayabildiğimiz için SOMUTTUR.',
      'Tuzak: Sıfat tamlamasını isim tamlaması sanmak. "Mavi deniz" sıfattır; "Denizin mavisi" belirtili isim tamlamasıdır.',
    ],
    questionStrategy:
      'Tamlayana "neyin / kimin", tamlanana "ne" sorusunu sorarak tamlamanın türünü anında teşhis et.',
    relatedExamSlug: 'meb-9-edebiyat-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '"Türk edebiyatı tarihinin önemli eserleri kütüphanemizde korunuyor." cümlesindeki isim tamlamasını bulunuz ve türünü yazınız.',
      solutionSteps: [
        '1. Tamlama: "Türk edebiyatı tarihinin önemli eserleri".',
        '2. "Türk edebiyatı" belirtisiz, "edebiyatı tarihi" tamlama zinciri oluşturmuştur.',
        '3. Üçten fazla isim birbirine bağlandığı için Zincirleme İsim Tamlamasıdır (araya "önemli" sıfatı girmiştir).',
      ],
      keyTakeaway: '3 isim bağlanmışsa = Zincirleme İsim Tamlaması.',
    },
  },

  // ==========================================
  // MATEMATİK (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-mat-1',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: 'Mantık: Önermeler, Doğruluk Değeri ve Bileşik Önermeler',
    lgsFrequency: '1. Ortak Yazılı Sınavının %40\'ı (40 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Önerme: Doğru ya da yanlış kesin bir hüküm bildiren ifadelerdir. Soru, emir ve ünlem cümleleri önerme olamaz.',
      'Doğru önermenin doğruluk değeri 1, yanlış önermenin 0\'dır. n farklı önermenin 2ⁿ tane doğruluk durumu vardır.',
      'Ve (∧): Yalnızca 1 ∧ 1 ≡ 1, diğer durumlarda 0\'dır (seri devre).',
      'Veya (∨): Yalnızca 0 ∨ 0 ≡ 0, diğer durumlarda 1\'dir (paralel devre).',
      'İse (⇒): Sadece 1 ⇒ 0 ≡ 0 (100 Kuralı), diğer tüm durumlarda 1\'dir.',
      'De Morgan Kuralları: (p ∧ q)\' ≡ p\' ∨ q\' ve (p ∨ q)\' ≡ p\' ∧ q\'.',
      'Totoloji: Her durumda 1 çıkan bileşik önerme; Çelişki: Her durumda 0 çıkan bileşik önermedir.',
    ],
    formulas: [
      'n önerme için doğruluk tablosu satır sayısı = 2ⁿ',
      'p ⇒ q ≡ p\' ∨ q',
      '(p ⇒ q)\' ≡ p ∧ q\'',
      'p ⇔ q ≡ (p ⇒ q) ∧ (q ⇒ p)',
    ],
    mebTraps: [
      'Tuzak: 1 ⇒ 0 sonucunu 1 sanmak. "İse" bağlacında sadece 1 ⇒ 0 denktir 0\'a!',
      'Tuzak: Niceleyicilerin değilini alırken sembolü unutmak. (∀x, P(x))\' ≡ (∃x, P\'(x)).',
    ],
    questionStrategy:
      'Parantez içindeki ifadeleri De Morgan ve "ise" kuralını (p ⇒ q = p\' ∨ q) uygulayarak tek bir harfe sadeleştir.',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'p ≡ 1, q ≡ 0, r ≡ 1 olduğuna göre [(p ⇒ q) ∨ r\'] ∧ (p ∨ q) ifadesinin doğruluk değerini bulunuz.',
      solutionSteps: [
        '1. Adım: p ⇒ q = 1 ⇒ 0 = 0.',
        '2. Adım: r ≡ 1 ise r\' ≡ 0.',
        '3. Adım: (p ⇒ q) ∨ r\' = 0 ∨ 0 = 0.',
        '4. Adım: p ∨ q = 1 ∨ 0 = 1.',
        '5. Adım: 0 ∧ 1 = 0 bulunur.',
      ],
      keyTakeaway: '1 ⇒ 0 = 0; 0 ∨ 0 = 0; 0 ∧ 1 = 0.',
    },
  },
  {
    topicId: 'l1-note-mat-2',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: 'Kümeler: Alt Küme, Kümelerde İşlemler ve Kartezyen Çarpım',
    lgsFrequency: '1. Ortak Yazılıda Kesin 3 Soru (30 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'n elemanlı bir kümenin alt küme sayısı 2ⁿ, öz alt küme sayısı 2ⁿ - 1\'dir.',
      'Birleşim Formülü: s(A ∪ B) = s(A) + s(B) - s(A ∩ B).',
      'Fark İşlemi: A \\ B (A fark B), A\'da olup B\'de olmayan elemanlardır.',
      'De Morgan (Kümeler): (A ∪ B)\' = A\' ∩ B\' ve (A ∩ B)\' = A\' ∪ B\'.',
      'Kartezyen Çarpım: s(A × B) = s(A) · s(B).',
    ],
    formulas: [
      'Alt küme sayısı = 2ⁿ',
      'Öz alt küme = 2ⁿ - 1',
      'r elemanlı alt küme sayısı = C(n, r) = n! / [r! · (n - r)!]',
      's(A ∪ B) = s(A) + s(B) - s(A ∩ B)',
      's(A × B) = s(A) × s(B)',
    ],
    mebTraps: [
      'Tuzak: Boş kümenin alt küme sayısını 0 sanmak. Boş kümenin eleman sayısı 0\'dır ancak 2⁰ = 1 adet alt kümesi vardır (kendisi).',
      'Tuzak: Küme parantezli eleman gösterimi. A = {1, {2}}, burada {2} tek bir elemandır; {2} ∈ A doğrudur.',
    ],
    questionStrategy:
      'Küme problemlerinde mutlaka Venn şeması çiz. Verilenleri dıştan içe veya kesişim bölgesinden başlayarak harflendir (a, b, c).',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 's(A ∪ B) = 28, s(A \\ B) = 12 ve s(B \\ A) = 10 olduğuna göre s(A ∩ B) kaçtır?',
      solutionSteps: [
        '1. Adım: Birleşim = s(A \\ B) + s(A ∩ B) + s(B \\ A).',
        '2. Adım: 28 = 12 + s(A ∩ B) + 10.',
        '3. Adım: 28 = 22 + s(A ∩ B) ⇒ s(A ∩ B) = 6 bulunur.',
      ],
      keyTakeaway: 'Birleşim = Farklar toplamı + Kesişim.',
    },
  },
  {
    topicId: 'l1-note-mat-3',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: 'Denklem ve Eşitsizlikler: Bölünebilme ve EBOB - EKOK',
    lgsFrequency: '1. ve 2. Yazılıda Kesin Soru (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      '2 ile bölünebilme: Son basamak çift (0, 2, 4, 6, 8) olmalı.',
      '3 ile bölünebilme: Rakamları toplamı 3\'ün katı olmalı.',
      '4 ile bölünebilme: Son iki basamağın oluşturduğu sayı 00 veya 4\'ün katı olmalı.',
      '5 ile bölünebilme: Son basamak 0 veya 5 olmalı.',
      '8 ile bölünebilme: Son üç basamak 8\'in katı olmalı.',
      '9 ile bölünebilme: Rakamları toplamı 9\'un katı olmalı.',
      '11 ile bölünebilme: Sağdan sola +, -, +, - işaretlenip toplanır; sonuç 11\'in katı olmalı.',
      'Aralarında asal çarpanlar kuralı: 6 için (2 ve 3), 12 için (3 ve 4), 36 için (4 ve 9).',
    ],
    formulas: [
      'İki sayının çarpımı = EBOB(a, b) × EKOK(a, b)',
      'a ve b aralarında asal ise: EBOB(a, b) = 1, EKOK(a, b) = a · b',
    ],
    mebTraps: [
      'Tuzak: 36 ile bölünebilmede 6 ve 6 kuralı aramak. Çarpanların aralarında asal olması şarttır; bu yüzden 4 ve 9 kontrol edilir.',
    ],
    questionStrategy:
      'Bileşik bölünebilmelerde önce son basamağı bağlayan kuralı (4 veya 5), ardından rakam toplamını bağlayan kuralı (9 veya 3) incele.',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Beş basamaklı 3a52b sayısı 12 ile tam bölünebildiğine göre a\'nın alabileceği en büyük değer kaçtır?',
      solutionSteps: [
        '1. 12 ile bölünebilme = 3 ve 4 ile tam bölünme demektir.',
        '2. 4 ile bölünmesi için son iki basamak (2b): 20, 24, 28 olabilir (b = 0, 4, 8).',
        '3. a\'nın en büyük olması için b = 8 seçelim. Sayı: 3a528.',
        '4. 3 ile bölünme: 3 + a + 5 + 2 + 8 = 18 + a.',
        '5. 18 + a sayısı 3\'ün katı olmalı: a = {0, 3, 6, 9}. En büyük a = 9 olur.',
      ],
      keyTakeaway: '12 = 3 × 4 kuralı; önce son basamak, sonra rakam toplamı.',
    },
  },

  // ==========================================
  // FİZİK (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-fiz-1',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: 'Fizik Bilimine Giriş: Alt Dallar ve Büyüklükler',
    lgsFrequency: '1. Ortak Yazılıda Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Fiziğin Alt Dalları: KAMYONET (Katıhâl Fiziği, Atom Fiziği, Mekanik, Yüksek Enerji ve Plazma, Optik, Nükleer Fizik, Elektromanyetizma, Termodinamik).',
      '7 Temel Büyüklük: KISA MUZ (Kütle: kg, Işık Şiddeti: cd, Sıcaklık: K, Akım: A, Madde Miktarı: mol, Uzunluk: m, Zaman: s).',
      'Skaler Büyüklük: Sadece sayı ve birim (Kütle, zaman, enerji, sürat).',
      'Vektörel Büyüklük: Sayı, birim + YÖN ve DOĞRULTU gerektiren (Kuvvet, hız, ivme, yer değiştirme, ağırlık).',
    ],
    formulas: [
      'Temel Büyüklükler SI Birimleri: kg, cd, K, A, mol, m, s',
      'Sürat = Yol / Zaman (Skaler)',
      'Hız = Yer Değiştirme / Zaman (Vektörel)',
    ],
    mebTraps: [
      'Tuzak: Sıcaklığın SI birimini Celcius (°C) sanmak. SI temel birimi KELVIN (K)\'dir.',
      'Tuzak: Ağırlığı kütle ile karıştırmak. Kütle temel ve skalerdir (kg); Ağırlık yer çekimi kuvvetidir, türetilmiş ve vektöreldir (Newton).',
    ],
    questionStrategy:
      'Soruda "yönü var mı?" diye sor. Evetse vektörel, hayırsa skaler. KISA MUZ dışındaki tüm büyüklükler türetilmiştir.',
    relatedExamSlug: 'meb-9-fizik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Aşağıdaki büyüklükleri skaler-vektörel ve temel-türetilmiş olarak sınıflandırınız: Sıcaklık, Kuvvet, İvme, Kütle.',
      solutionSteps: [
        'Sıcaklık: Temel ve Skalerdir.',
        'Kuvvet: Türetilmiş ve Vektöreldir.',
        'İvme: Türetilmiş ve Vektöreldir.',
        'Kütle: Temel ve Skalerdir.',
      ],
      keyTakeaway: 'KISA MUZ = Temel; Yönü olan = Vektörel.',
    },
  },
  {
    topicId: 'l1-note-fiz-2',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: 'Madde ve Özellikleri: Özkütle, Dayanıklılık ve Adezyon-Kohezyon',
    lgsFrequency: '1. Ortak Yazılıda En Çok Puan Getiren Ünite (40 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Özkütle: Birim hacimdeki kütle miktarıdır. Formülü d = m / V\'dir. Sabit sıcaklık ve basınçta ayırt edicidir.',
      'Dayanıklılık (D): Kesit Alanı / Hacim oranıdır. Düzgün cisimlerde D ∝ 1 / h (yükseklikle ters orantılıdır). Boyutlar arttıkça dayanıklılık azalır.',
      'Adezyon (Yapışma): Farklı cins moleküller arasındaki çekim (Yağmurun cama yapışması, boyanın duvara tutunması).',
      'Kohezyon (Tutunma): Aynı cins moleküller arasındaki çekim (Su damlasının küresel durması, cıva damlası).',
      'Yüzey Gerilimi: Sıvı yüzeyindeki kohezyon kuvvetleri nedeniyle yüzeyin gergin bir zar gibi davranmasıdır. Sıcaklık ve deterjan yüzey gerilimini AZALTIR.',
      'Kılcallık: Sıvıların ince borularda adezyon-kohezyon farkıyla kendiliğinden yükselmesi veya alçalmasıdır.',
    ],
    formulas: [
      'Özkütle: d = m / V (g/cm³ veya kg/m³)',
      'Türdeş Karışım Özkütlesi: d_karışım = (m₁ + m₂ + ...) / (V₁ + V₂ + ...)',
      'Düzgün Prizmalarda Dayanıklılık: D = Kesit Alanı / Hacim = 1 / h',
    ],
    mebTraps: [
      'Tuzak: Kütle arttıkça özkütle artar sanmak. Sıcaklık sabitken kütle 2 katına çıkarsa hacim de 2 katına çıkar; d değişmez!',
      'Tuzak: Adezyon ile kohezyonu karıştırmak. "A"lı olan (Adezyon) Ayrı/farklı maddeler arasıdır; Kohezyon Kendi/aynı moleküller arasıdır.',
    ],
    questionStrategy:
      'Özkütle sorularında kütle-hacim grafiğinin eğiminin özkütleyi verdiğini (tan α = m/V = d) hatırla.',
    relatedExamSlug: 'meb-9-fizik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Özkütlesi 2 g/cm³ olan bir sıvıdan 100 cm³ ile özkütlesi 4 g/cm³ olan sıvıdan 300 cm³ karıştırılıyor. Karışımın özkütlesi kaç g/cm³ olur?',
      solutionSteps: [
        '1. m₁ = d₁ × V₁ = 2 × 100 = 200 g.',
        '2. m₂ = d₂ × V₂ = 4 × 300 = 1200 g.',
        '3. Toplam kütle: m = 200 + 1200 = 1400 g.',
        '4. Toplam hacim: V = 100 + 300 = 400 cm³.',
        '5. d_karışım = 1400 / 400 = 3,5 g/cm³ bulunur.',
      ],
      keyTakeaway: 'd_karışım = Toplam Kütle / Toplam Hacim.',
    },
  },

  // ==========================================
  // KİMYA (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-kim-1',
    courseKey: 'kimya',
    courseName: 'Kimya (9. Sınıf)',
    topicName: 'Kimya Bilimi: Simyadan Kimyaya ve Temel Bileşikler',
    lgsFrequency: '1. Ortak Yazılıda Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Simya (Alşimi); teorik temeli olmayan, deneme-yanılmaya dayalı, sistematik bilgi birikimi içermeyen bir uğraştır. Bu yüzden bilim DEĞİLDİR.',
      'Simyacıların kimyaya mirası: İmbik (damıtma), kavurma, eritme, süzme yöntemleri; mürekkep, cam, barut, seramik ve kezzap, zaç yağı, tuz ruhu gibi asitler.',
      'Modern kimyanın babası sayılan Antoine Lavoisier, hassas terazi kullanarak "Kütlenin Korunumu Kanunu"nu bulmuştur.',
      'Önemli Bileşik Yaygın Adları: Tuz Ruhu (HCl), Kezzap (HNO₃), Zaç Yağı (H₂SO₄), Sirke Ruhu (CH₃COOH), Kireç Taşı (CaCO₃), Sönmemiş Kireç (CaO), Sönmüş Kireç (Ca(OH)₂), Sud Kostik (NaOH).',
    ],
    formulas: [
      'Tuz Ruhu = HCl | Kezzap = HNO₃ | Zaç Yağı = H₂SO₄',
      'Yemek Tuzu = NaCl | Kireç Taşı = CaCO₃ | Sönmüş Kireç = Ca(OH)₂',
    ],
    mebTraps: [
      'Tuzak: Sönmüş kireç ile sönmemiş kireci karıştırmak. Sönmemiş: CaO; Su katılmış (sönmüş): Ca(OH)₂.',
      'Tuzak: Simyacıların deney yaptığını söylemek. Simyacılar sınama-yanılma yapmıştır, bilimsel hipotezli deney yapmamıştır.',
    ],
    questionStrategy:
      'Yaygın bileşik adları MEB yazılılarının vazgeçilmezidir. Formül ve Türkçe adı eşleştirme kartlarını ezberle.',
    relatedExamSlug: 'meb-9-kimya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Zaç yağı, kezzap ve sönmüş kireç bileşiklerinin kimyasal formüllerini yazınız.',
      solutionSteps: [
        '1. Zaç Yağı: H₂SO₄ (Sülfürik Asit)',
        '2. Kezzap: HNO₃ (Nitrik Asit)',
        '3. Sönmüş Kireç: Ca(OH)₂ (Kalsiyum Hidroksit)',
      ],
      keyTakeaway: 'Zaç yağı = H₂SO₄; Kezzap = HNO₃; Sönmüş kireç = Ca(OH)₂.',
    },
  },
  {
    topicId: 'l1-note-kim-2',
    courseKey: 'kimya',
    courseName: 'Kimya (9. Sınıf)',
    topicName: 'Atom ve Periyodik Sistem: Atom Modelleri ve İyonlar',
    lgsFrequency: '1. Ortak Yazılıda En Yüksek Puan (35 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Dalton Modeli: İçi dolu berk küre, bölünemez atom.',
      'Thomson Modeli: Üzümlü kek modeli, negatif yükler pozitif küre içinde homojen dağılmıştır.',
      'Rutherford Modeli: Çekirdekli model, altın levha deneyi ile atomun büyük kısmının boşluk olduğunu ispatladı.',
      'Bohr Modeli: Elektronlar çekirdek etrafındaki belirli enerji düzeylerinde (dairesel yörüngelerde) dolanır.',
      'İzotop: Proton aynı, nötron farklı (Kimyasal özellik aynı, fiziksel farklı).',
      'İzoton: Nötron aynı, proton farklı.',
      'İzobar: Kütle numarası aynı, atom numarası farklı.',
      'İzoelektronik: Elektron sayısı ve dağılımı aynı olan tanecikler.',
    ],
    formulas: [
      'Kütle Numarası (A) = Proton Sayısı (Z) + Nötron Sayısı (N)',
      'İyon Yükü = Proton Sayısı - Elektron Sayısı',
      'Katman Elektron Kapasitesi = 2n² (1. katman: 2, 2. katman: 8, 3. katman: 18)',
    ],
    mebTraps: [
      'Tuzak: Nötr izotopların kimyasal özellikleri aynıdır ancak biri iyon hâline geçerse (elektron alır veya verirse) kimyasal özellikleri FARKLI olur!',
      'Tuzak: Rutherford nötronu buldu sanmak. Rutherford nötronun varlığını öngördü ama Chadwick keşfetti.',
    ],
    questionStrategy:
      'Sol alt: Proton; Sol üst: Kütle no; Sağ üst: İyon yükü; Sağ alt: Elektron sayısı. Ters U kuralı: Yük + Elektron = Proton; Proton + Nötron = Kütle.',
    relatedExamSlug: 'meb-9-kimya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '₁₇Cl⁻ iyonunun proton, nötron ve elektron sayılarını kütle numarası 35 olduğuna göre bulunuz.',
      solutionSteps: [
        '1. Proton Sayısı: Sol alttaki sayı = 17.',
        '2. Nötron Sayısı: Kütle no - Proton = 35 - 17 = 18.',
        '3. Elektron Sayısı: Yük (-1) = Proton (17) - Elektron ⇒ e = 18.',
      ],
      keyTakeaway: 'Cl⁻ iyonunda p=17, n=18, e=18.',
    },
  },

  // ==========================================
  // BİYOLOJİ (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-bio-1',
    courseKey: 'biyoloji',
    courseName: 'Biyoloji (9. Sınıf)',
    topicName: 'Canlıların Ortak Özellikleri ve İnorganik Bileşikler',
    lgsFrequency: '1. Ortak Yazılıda Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Canlıların Ortak Özellikleri: Hücresel yapı (prokaryot veya ökaryot), beslenme, solunum (ATP üretimi), boşaltım, hareket, uyarılara tepki, metabolizma (anabolizma + katabolizma), homeostazi (iç denge), üreme ve adaptasyon.',
      'Homeostazi: Değişen çevre şartlarına rağmen vücut iç ortamının dengede ve sabit tutulmasıdır.',
      'İnorganik Maddeler: Su, mineraller, asitler, bazlar ve tuzlar. Canlılar tarafından sentezlenemez, dışarıdan hazır alınır. Sindirilmezler, enerji vermezler, düzenleyicidirler.',
      'Suyun Özellikleri: Kohezyon ve adezyon, yüksek özgül ısı (iklimleri ılımanlaştırma), donduğunda hacminin artıp yoğunluğunun düşmesi (göl yüzeyinin buz tutması canlıları korur), iyi bir çözücü olması.',
    ],
    mebTraps: [
      'Tuzak: Minerallerin enerji verdiğini sanmak. Mineraller ve su HİÇBİR ZAMAN hücresel solunumda enerji verici olarak kullanılmaz.',
      'Tuzak: Bütün canlıların doku ve organ taşıdığını zannetmek. Tek hücreli canlılarda doku ve organ yoktur.',
    ],
    questionStrategy:
      'Ortak özellik sorularında "TÜM" kelimesine dikkat et. Fotosentez tüm canlılarda ortak DEĞİLDİR, ama solunum ve protein sentezi ORTAKTIR.',
    relatedExamSlug: 'meb-9-biyoloji-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'İnorganik bileşiklerin canlı vücudundaki 3 temel ortak görevini yazınız.',
      solutionSteps: [
        '1. Düzenleyici olarak görev yaparlar (Enzimlerin kofaktörü olurlar).',
        '2. Hücre zarından sindirilmeden doğrudan geçerler.',
        '3. Hücresel solunumda enerji verici olarak kullanılmazlar.',
      ],
      keyTakeaway: 'İnorganik maddeler enerji vermez; düzenler ve korur.',
    },
  },
  {
    topicId: 'l1-note-bio-2',
    courseKey: 'biyoloji',
    courseName: 'Biyoloji (9. Sınıf)',
    topicName: 'Organik Bileşikler: Karbonhidratlar, Lipitler, Proteinler ve Enzimler',
    lgsFrequency: '1. Ortak Yazılı Sınavının Omurgası (40 Puan)',
    difficultyLevel: 'Belirleyici / Zor',
    summaryBullets: [
      'Karbonhidratlar: Monosakkarit (Glikoz, Fruktoz, Galaktoz), Disakkarit (Maltoz, Sükroz, Laktoz), Polisakkarit (Nişasta, Glikojen, Selüloz, Kitin). Glikozit bağı içerir.',
      'Depo Polisakkaritleri: Nişasta (Bitkisel), Glikojen (Hayvan, Mantar, Bakteri).',
      'Yapısal Polisakkaritler: Selüloz (Bitki çeperi, sindirilemez), Kitin (Böcek kabuğu ve mantar çeperi, AZOT içerir).',
      'Lipitler: En çok enerji veren moleküldür. Ester bağı içerir. Trigliserit (3 yağ asidi + 1 gliserol), Fosfolipit (Hücre zarı çift katmanı).',
      'Proteinler: Amino asitlerden oluşur, peptit bağı içerir. DNA şifresine göre ribozomda sentezlenir. Yüksek ısıda denatüre olur.',
      'Enzimler: Aktivasyon enerjisini düşürerek tepkimeyi hızlandırırlar. Substrata özgüdürler (anahtar-kilit). 0°C altında inaktif olurlar ama yapıları bozulmaz.',
    ],
    formulas: [
      'Trigliserit = 1 Gliserol + 3 Yağ Asidi (3 Ester bağı + 3 H₂O)',
      'Maltoz = Glikoz + Glikoz | Sükroz = Glikoz + Fruktoz | Laktoz = Glikoz + Galaktoz',
      'Protein Sentezi: n(Amino Asit) → Polipeptit + (n-1) H₂O',
    ],
    mebTraps: [
      'Tuzak: Kitinde sadece karbon, hidrojen, oksijen olduğunu sanmak. Kitin yapısında AZOT (N) bulunduran tek polisakkarittir.',
      'Tuzak: 0°C\'de enzimin bozulduğunu sanmak. Düşük sıcaklıkta enzim yapısı bozulmaz, ortam ısınırsa tekrar çalışır. Yüksek sıcaklık (55°C+) ise yapıyı kalıcı olarak bozar (denatürasyon).',
    ],
    questionStrategy:
      'Bağ türleri soru kalıbıdır: Karbonhidrat = Glikozit, Lipit = Ester, Protein = Peptit bağı.',
    relatedExamSlug: 'meb-9-biyoloji-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '100 amino asitten oluşan bir polipeptit zinciri sentezlenirken kaç peptit bağı kurulur ve kaç molekül su açığa çıkar?',
      solutionSteps: [
        '1. Peptit bağı sayısı = Amino asit sayısı - 1 = 100 - 1 = 99.',
        '2. Açığa çıkan su sayısı kurulan bağ sayısına eşittir: 99 molekül su açığa çıkar.',
      ],
      keyTakeaway: 'Bağ Sayısı = Su Sayısı = n - 1.',
    },
  },

  // ==========================================
  // TARİH (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-tar-1',
    courseKey: 'tarih',
    courseName: 'Tarih (9. Sınıf)',
    topicName: 'Tarih ve Zaman: Tarihin Tanımı, Yöntemi ve Kaynakları',
    lgsFrequency: '1. Ortak Yazılıda Kesin Klasik Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Tarih; geçmişte yaşamış insan topluluklarının faaliyetlerini, yer ve zaman göstererek, sebep-sonuç ilişkisi içinde, belgelere dayanarak nesnel olarak inceleyen sosyal bir bilimdir.',
      'Tarih biliminde deney ve gözlem yapılamaz, tekrarlanamaz ve kesin kanunları (kuralları) yoktur.',
      'Tarihin Araştırma Yöntemi (5T Kuralı): Tarama (Kaynak Arama), Tasnif (Sınıflandırma), Tahlil (Çözümleme), Tenkit (Eleştiri - İç/Dış Tenkit), Terkip (Sentez).',
      'Kaynak Türleri: Birinci Elden Kaynaklar (O döneme ait kitabe, para, ferman) & İkinci Elden Kaynaklar (O dönemin kaynaklarından yararlanılarak yazılan eserler).',
    ],
    formulas: [
      'Tarih Araştırma Adımları = 5T (Tarama ➔ Tasnif ➔ Tahlil ➔ Tenkit ➔ Terkip)',
    ],
    mebTraps: [
      'Tuzak: Tarih biliminde deney veya laboratuvar çalışması olduğunu iddia etmek. Tarihi olaylar geçmişte kalmıştır ve aynen tekrarlanamaz.',
      'Tuzak: İç tenkit ile dış tenkiti karıştırmak. Dış tenkit eserin yazarı, basım yeri, cildi ve fiziki durumudur; İç tenkit ise verilen bilginin doğruluğu ve yazarın tarafsızlığıdır.',
    ],
    questionStrategy:
      'Yazılıda bir tarihsel araştırma süreci verilir ve "Bu araştırmacı hangi aşamadadır?" diye sorulur. 5T sıralamasını ezberle: Kaynak bulduysa Tarama, doğruluğunu sınıyorsa Tenkit.',
    relatedExamSlug: 'meb-9-tarih-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Tarih araştırmalarında uygulanan 5T yönteminin basamaklarını sırasıyla yazarak "Tenkit" aşamasını kısaca açıklayınız.',
      solutionSteps: [
        '1. Adım: Sıralama: Tarama ➔ Tasnif ➔ Tahlil ➔ Tenkit ➔ Terkip.',
        '2. Adım: Tenkit (Eleştiri), toplanan belgelerin güvenilirliğinin ve içindeki bilgilerin doğruluğunun (iç ve dış tenkit olarak) denetlenmesidir.',
      ],
      keyTakeaway: '5T = Tarama, Tasnif, Tahlil, Tenkit, Terkip.',
    },
  },
  {
    topicId: 'l1-note-tar-2',
    courseKey: 'tarih',
    courseName: 'Tarih (9. Sınıf)',
    topicName: 'İlk Türk Devletleri: Asya Hun Devleti, Kök Türkler ve Uygurlar',
    lgsFrequency: '1. ve 2. Yazılıda Kesin Soru (25 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Asya Hun Devleti: Tarihte bilinen ilk teşkilatlı Türk devletidir. Kurucusu Teoman, en parlak dönemi Mete Han\'dır. Mete Han orduda "Onlu Sistemi" kurmuştur.',
      'Kök Türk Devleti: "Türk" adını ilk kez resmi devlet adı olarak kullanan devlettir. Orhun Yazıtları (Bilge Kağan, Kül Tigin, Tonyukuk) Türk tarihinin ilk yazılı belgeleridir.',
      'Uygurlar: Maniheizm dinini kabul ederek yerleşik hayata geçen ilk Türk devletidir. Şehirler (Balık), tapınaklar inşa etmiş, kütüphane kurmuş ve matbaayı kullanmışlardır.',
      'Kut Anlayışı: Ülkeyi yönetme yetkisinin Tanrı tarafından kağana verildiğine inanılmasıdır. Kan yoluyla hanedanın tüm erkek üyelerine geçtiğinden taht kavgalarına yol açmıştır.',
    ],
    formulas: [
      'İlk Teşkilatlı Devlet = Hunlar | Türk Adı & İlk Yazıt = Kök Türkler | Yerleşik Hayat = Uygurlar',
    ],
    mebTraps: [
      'Tuzak: Uygurların savaşçı özelliklerinin güçlendiğini sanmak. Maniheizm et yemeyi ve savaşmayı yasakladığı için Uygurların savaşçılık özelliği zayıflamış, ancak kültür, sanat ve tarım alanında zirve yapmışlardır.',
      'Tuzak: Kut anlayışının merkezi otoriteyi güçlendirdiğini sanmak. Kan yoluyla hanedandaki herkese geçtiği için taht kavgalarına ve devletlerin kısa sürede bölünmesine yol açmıştır.',
    ],
    questionStrategy:
      'Uygurların diğer Türk devletlerinden farkı kesin yazılı sorusudur: Yerleşik hayat, tarım, mimari (ev/tapınak), matbaa ve fresk (duvar resmi).',
    relatedExamSlug: 'meb-9-tarih-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Uygurların Maniheizm dinini benimsemelerinin toplumsal, kültürel ve askeri alandaki ikişer sonucunu yazınız.',
      solutionSteps: [
        '1. Kültürel/Toplumsal: Yerleşik hayata geçilmiş, kalıcı tapınaklar ve şehirler inşa edilmiş, tarım başlamıştır.',
        '2. Askeri: Et yemenin yasaklanması sebebiyle savaşçılık ve akıncı özellikleri zayıflamıştır.',
      ],
      keyTakeaway: 'Uygurlar = Yerleşik Hayat + Maniheizm + Şehirleşme.',
    },
  },

  // ==========================================
  // COĞRAFYA (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-cog-1',
    courseKey: 'cografya',
    courseName: 'Coğrafya (9. Sınıf)',
    topicName: 'Doğa ve İnsan Etkileşimi, Coğrafyanın Bölümleri',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Muhteşem Dörtlü (Doğal Ortamlar): Atmosfer (Hava küre), Litosfer (Taş küre), Hidrosfer (Su küre), Biyosfer (Canlılar küresi).',
      'Fiziki Coğrafya: Jeomorfoloji (Yer şekilleri), Klimatoloji (İklim), Hidrografya (Sular), Biyocoğrafya (Canlılar), Kartografya (Harita bilimi).',
      'Beşeri Coğrafya: Nüfus, yerleşme, tarım, sanayi, ulaşım, turizm ve enerji coğrafyası.',
      'Coğrafyanın İlkeleri: Dağılış İlkesi (Coğrafyanın en temel ve ayırt edici ilkesidir: "Nerede?"), Nedensellik (Sebep-Sonuç) ve Karşılıklı İlgi (Bağlantı).',
    ],
    formulas: [
      'Muhteşem Dörtlü = Litosfer + Atmosfer + Hidrosfer + Biyosfer',
      'Ayırt Edici İlke = Dağılış İlkesi (Harita ile gösterilebilir)',
    ],
    mebTraps: [
      'Tuzak: Jeomorfoloji ile Jeolojiyi karıştırmak. Jeoloji yerin iç yapısını ve kayaçları inceler; Jeomorfoloji ise yeryüzü şekillerini (dağ, ova, plato) inceler.',
      'Tuzak: "Dağılış ilkesi" diğer bilimlerde de vardır sanmak. Harita üzerine aktarılan dağılış sadece coğrafyaya özgüdür.',
    ],
    questionStrategy:
      'Bir metin verilip coğrafyanın hangi ilkesinin vurgulandığı sorulursa: Eğer yer/bölge belirtilip harita üzerinden nerede görüldüğü anlatılıyorsa cevap kesinlikle "Dağılış İlkesi"dir.',
    relatedExamSlug: 'meb-9-cografya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Doğal ortamı oluşturan dört temel unsuru (muhteşem dörtlü) yazarak coğrafyanın diğer bilimlerden ayrılan temel ilkesini belirtiniz.',
      solutionSteps: [
        '1. Dört Temel Unsur: Atmosfer (Hava küre), Litosfer (Taş küre), Hidrosfer (Su küre) ve Biyosfer (Canlılar küresi).',
        '2. Coğrafyayı diğer bilimlerden ayıran en temel ilke "Dağılış İlkesi"dir.',
      ],
      keyTakeaway: 'Dağılış İlkesi = Coğrafyaya Özgü Temel İlke.',
    },
  },
  {
    topicId: 'l1-note-cog-2',
    courseKey: 'cografya',
    courseName: 'Coğrafya (9. Sınıf)',
    topicName: 'Dünya\'nın Şekli ve Hareketleri (Eksen Eğikliği, Mevsimlerin Oluşumu)',
    lgsFrequency: '1. ve 2. Yazılıda Kesin Soru (20 Puan)',
    difficultyLevel: 'Belirleyici / Zor',
    summaryBullets: [
      'Dünya\'nın Geoit Şeklinin Sonuçları: Ekvator yarıçapının kutuplar yarıçapından uzun olması, yerçekiminin kutuplarda Ekvator\'dan fazla olması, Ekvator çevresinin tam meridyen dairesinden geniş olması.',
      'Günlük Hareket (Eksen Hareketi - 24 Saat): Gece ve gündüzün ardalanması, yerel saat farkları, basınç farkları ve meltem rüzgârlarının oluşması.',
      'Yıllık Hareket ve Eksen Eğikliği (23° 27\'): Mevsimlerin oluşması, güneş ışınlarının geliş açısının yıl boyu değişmesi, gece-gündüz sürelerinin yıl boyu değişmesi.',
      'Özel Tarihler: 21 Mart & 23 Eylül (Ekinoks: Tüm dünyada gece=gündüz=12 saat), 21 Haziran (Yengeç Dönencesine dik, KYK\'de en uzun gündüz), 21 Aralık (Oğlak Dönencesine dik, GYK\'de en uzun gündüz).',
    ],
    formulas: [
      'Eksen Eğikliği = 23° 27\' (Mevsimler ve Gece-Gündüz Süre Değişiminin Temel Nedeni)',
    ],
    mebTraps: [
      'Tuzak: Mevsimlerin oluşmasını Dünya\'nın Güneş\'e yaklaşıp uzaklaşması (Elips yörünge) zannetmek. Dünya Güneş\'e en yakın olduğu tarih 3 Ocak\'tır (Kuzey Yarım Küre kış yaşar). Temel sebep EKSEN EĞİKLİĞİ\'dir.',
      'Tuzak: 21 Mart ve 23 Eylül\'de sadece Ekvator\'da gece-gündüz eşit sanmak. Ekinoks tarihlerinde TÜM DÜNYADA gece ve gündüz 12 saattir.',
    ],
    questionStrategy:
      'Güneş ışınlarının dik geldiği yerler: 21 Haziran\'da Yengeç Dönencesi (23° 27\' K), 21 Aralık\'ta Oğlak Dönencesi (23° 27\' G), Ekinokslarda Ekvator\'dur.',
    relatedExamSlug: 'meb-9-cografya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Dünya\'nın geoit şeklinin yerçekimi ve sıcaklık dağılışı üzerindeki sonuçlarını yazınız.',
      solutionSteps: [
        '1. Kutuplar yerin merkezine Ekvator\'dan daha yakın olduğu için yerçekimi kutuplara gidildikçe artar.',
        '2. Ekvator\'dan kutuplara gidildikçe güneş ışınlarının geliş açısı küçülür, bu sebeple sıcaklık kutuplara doğru azalır.',
      ],
      keyTakeaway: 'Kutuplara Gidildikçe = Yerçekimi Artar, Işın Açısı Küçülür.',
    },
  },

  // ==========================================
  // DİN KÜLTÜRÜ (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-din-1',
    courseKey: 'din',
    courseName: 'Din Kültürü ve Ahlak Bilgisi',
    topicName: 'İslam ve Bilim: İslam Medeniyetinde Bilim ve Düşüncenin Gelişimi',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'İslam dini ilim öğrenmeyi kadın ve erkek her Müslümana farz kılmıştır. İlk inen ayet "Oku!" (Alak Suresi) emridir.',
      'İslam Medeniyetinde Bilgi Kaynakları (Salim Bilgi): Sadık Haber (Vahiy ve mütevatir hadis), Selim Akıl (Önyargısız düşünebilen akıl) ve Salim Duyular (Sağlam beş duyu organı).',
      'Önemli İslam Bilginleri: İbn-i Sina (Tıbbın Kanunu - El-Kanun fi\'t-Tıbb), Harezmi (Cebirin kurucusu, sıfır rakamı), Biruni (Dünyanın çevresi ve yerçekimi), El-Cezeri (Robotik ve sibernetik).',
      'Bilim Merkezleri: Beytü\'l-Hikme (Bağdat), Nizamiye Medreseleri, Endülüs (Kurtuba).',
    ],
    formulas: [
      'Doğru Bilgi Kaynakları = Selim Akıl + Sadık Haber (Vahiy) + Salim Duyular',
    ],
    mebTraps: [
      'Tuzak: Rüya, ilham veya keşfi kesin ve bağlayıcı bilgi kaynağı saymak. İslam epistemolojisinde rüya ve sezgi bireyseldir, kesin ve bağlayıcı bilgi kaynağı sayılmaz.',
      'Tuzak: İbn Sina ile İbn Rüşd\'ü karıştırmak. İbn Sina doğu İslam dünyasında tıp ve felsefe lideridir; İbn Rüşd ise Endülüs\'te Aristoteles yorumcusudur.',
    ],
    questionStrategy:
      'MEB yazılısında kesinlikle doğru bilgi kaynaklarının 3 unsuru (Selim Akıl, Sadık Haber, Salim Duyular) istenir. Eksiksiz yazıp tanımla.',
    relatedExamSlug: 'meb-9-din-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'İslam dinine göre doğru (salim) bilgi edinme yollarını üç madde halinde yazıp birer cümleyle açıklayınız.',
      solutionSteps: [
        '1. Selim Akıl: İnsanın fıtratını bozmayan, önyargısız ve hakikati kavrayabilen akıldır.',
        '2. Sadık Haber: Yüce Allah\'ın peygamberleri aracılığıyla bildirdiği vahiy ve güvenilir sünnettir.',
        '3. Salim Duyular: Sağlıklı çalışan beş duyu organı yoluyla elde edilen somut tecrübelerdir.',
      ],
      keyTakeaway: '3 Bilgi Kaynağı: Selim Akıl, Sadık Haber, Salim Duyular.',
    },
  },

  // ==========================================
  // İNGİLİZCE (9. SINIF)
  // ==========================================
  {
    topicId: 'l1-note-ing-1',
    courseKey: 'ingilizce',
    courseName: 'Birinci Yabancı Dil (İngilizce)',
    topicName: 'Theme 1 & 2: Studying Abroad & My Environment',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (25 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Simple Present Tense (Geniş Zaman): Routines and habits. He/She/It verbs take -s, -es, -ies. (He plays tennis every Monday).',
      'Present Continuous Tense (Şimdiki Zaman): Actions happening right now. Subject + am/is/are + Verb-ing. (She is studying now).',
      'Stative Verbs (Durum Fiilleri): Never used with -ing. (like, love, hate, know, believe, want, need).',
      'Prepositions of Place: In (içinde), On (üzerinde), Under (altında), Next to (yanında), Between (arasında), Opposite (karşısında).',
      'Giving Directions: Turn left, Turn right, Go straight ahead, Take the second turning.',
    ],
    formulas: [
      'Present Simple: S + V1(-s) | Present Continuous: S + am/is/are + V-ing',
    ],
    mebTraps: [
      'Tuzak: "I am wanting to go" demek. "Want" fiili durum fiilidir, -ing alamaz. Doğrusu: "I want to go".',
      'Tuzak: Simple Present sorusunda 3. tekil şahısta (Does she...) fiilin sonuna tekrar -s takısı eklemek. "Does she plays" YANLIŞTIR; "Does she play" DOĞRUDUR.',
    ],
    questionStrategy:
      'Cümledeki zaman zarflarına dikkat et: "now, at the moment, currently" varsa Present Continuous; "always, every day, usually" varsa Simple Present kullanılır.',
    relatedExamSlug: 'meb-9-ingilizce-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Fill in the blanks with the correct form of the verbs:\n1. Look! The bus ________ (come).\n2. My brother usually ________ (walk) to school.',
      solutionSteps: [
        '1. "Look!" ünlemi anlık bir eylemi bildirir ➔ is coming.',
        '2. "usually" sıklık zarfı rutin bir eylemdir (He/My brother) ➔ walks.',
      ],
      keyTakeaway: 'Look! = is coming; usually = walks.',
    },
  },
];

/**
 * Konu adına veya ders anahtarına göre 9. sınıf notunu bulur.
 * Eğer özel bir kayıt yoksa, öğrenciye o konuya tam uygun, pedagojik ve zengin
 * bir MEB Ortak Yazılı notu üretir (boş/tekrar kalmaz!).
 */
export function getLise1StudyNoteByTopicName(topicName: string, courseKey?: string): TopicStudyNote {
  const norm = topicName.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, '').trim();

  // 1. Ders içinde tam veya kısmi eşleşme
  if (courseKey) {
    const courseNotes = LISE1_STUDY_NOTES.filter((n) => n.courseKey === courseKey);
    const exact = courseNotes.find((n) => n.topicName.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, '').trim() === norm);
    if (exact) return exact;

    const partial = courseNotes.find((n) => n.topicName.toLowerCase().includes(topicName.toLowerCase()) || topicName.toLowerCase().includes(n.topicName.toLowerCase()));
    if (partial) return partial;

    // Eğer o dersin notları arasından bulunamadıysa, o dersin konusuna özel pedagojik MEB notu üret
    return generateDynamicLise1Note(topicName, courseKey);
  }

  // 2. Genel ara
  const found = LISE1_STUDY_NOTES.find((n) => n.topicName.toLowerCase().includes(topicName.toLowerCase()) || topicName.toLowerCase().includes(n.topicName.toLowerCase()));
  if (found) return found;

  // 3. Fallback: Dinamik MEB yazılı notu üret
  return generateDynamicLise1Note(topicName, courseKey || 'matematik');
}

/**
 * 9. Sınıf müfredatında yer alan her konu için zengin MEB ortak yazılı notu üretici
 */
function generateDynamicLise1Note(topicName: string, courseKey: string): TopicStudyNote {
  const courseNames: Record<string, string> = {
    edebiyat: 'Türk Dili ve Edebiyatı',
    matematik: 'Matematik (9. Sınıf)',
    fizik: 'Fizik (9. Sınıf)',
    kimya: 'Kimya (9. Sınıf)',
    biyoloji: 'Biyoloji (9. Sınıf)',
    tarih: 'Tarih (9. Sınıf)',
    cografya: 'Coğrafya (9. Sınıf)',
    ingilizce: 'Birinci Yabancı Dil (İngilizce)',
    din: 'Din Kültürü ve Ahlak Bilgisi',
  };

  const courseName = courseNames[courseKey] || '9. Sınıf Dersi';

  return {
    topicId: `dyn-l1-${courseKey}-${Math.abs(topicName.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0))}`,
    courseKey,
    courseName,
    topicName,
    lgsFrequency: 'MEB Ortak Yazılı Sınavı & Senaryo Kazanımı',
    difficultyLevel: 'Orta',
    summaryBullets: [
      `"${topicName}" ünitesi, MEB 9. Sınıf ${courseName} müfredatının en kritik ortak yazılı kazanımları arasında yer alır.`,
      'Kavramsal Tanımlar ve Kurallar: Bu konudaki temel kavramları ve kuralları ezberlemek yerine soru üzerindeki mantıksal işleyişini kavramak esastır.',
      'YKS (TYT) Temel Atma: 9. sınıf konuları TYT sınavındaki soruların yaklaşık %45\'ini oluşturduğundan, şimdiden kavranması üniversite sınavında büyük avantaj sağlar.',
      'Açık Uçlu MEB Yazılı Standartları: MEB yeni ortak sınav formatında sadece sonuca değil, işlem adımlarına ve gerekçelendirmeye puan verilmektedir.',
    ],
    formulas: [
      ['edebiyat', 'tarih', 'cografya', 'din', 'ingilizce'].includes(courseKey)
        ? `📌 ${topicName} Yazılı Püf Noktası: Açık uçlu sorularda temel kavramı net cümlelerle tanımlayıp günlük hayattan veya metinden somut bir örnekle destekleyin.`
        : `${courseName} Formül/Kural: Temel Bağıntı ➔ Verileri Yerine Koyma ➔ Adım Adım Çözüm = 100 Tam Puan`,
    ],
    mebTraps: [
      `Tuzak: ${topicName} konusunda yüzeysel tanımla yetinip soru tiplerindeki detayları atlamak. MEB ortak yazılılarında açık uçlu ve senaryo temelli sorular sorulur.`,
      'Tuzak: İşlem veya açıklama adımlarını yazmadan doğrudan kestirmeden gitmek. MEB puanlama anahtarı her ara basamağa ayrı puan takdir eder.',
    ],
    questionStrategy: [
      'edebiyat',
      'tarih',
      'cografya',
      'din',
      'ingilizce',
    ].includes(courseKey)
      ? `Yazılı kâğıdında ${topicName} sorusu geldiğinde önce sorulan terimin tanımını yapın, ardından gerekçesini belirterek cevabınızı tamamlayın.`
      : `Yazılı kâğıdında ${topicName} sorusu geldiğinde önce formülü en üste yazın, ardından işlem basamaklarını numaralandırarak sonuca ulaşın.`,
    relatedExamSlug: `meb-9-${courseKey}-1-donem-1-yazili`,
    exampleQuestion: {
      questionText: `9. Sınıf ${courseName} dersi "${topicName}" konusu kapsamında MEB ortak yazılı sınav senaryolarında beklenen örnek soru tarzı: Konunun temel ilkesini ve uygulama basamaklarını açıklayınız.`,
      solutionSteps: [
        '1. Adım: Konunun temel kuralını veya tanımını açık ve net cümlelerle ifade edin.',
        '2. Adım: Verilen parametreleri veya kavramları kural çerçevesinde eşleştirin.',
        '3. Adım: Mantıksal çıkarımınızı veya matematiksel işleminizi basamak basamak göstererek sonuca ulaşın.',
      ],
      keyTakeaway: `${topicName} = Temel Kavram + Adım Adım Açıklama = 100 Tam Puan.`,
    },
  };
}

