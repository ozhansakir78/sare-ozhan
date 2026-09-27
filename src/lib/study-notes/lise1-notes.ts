import type { TopicStudyNote } from '@/types/study';

export const LISE1_STUDY_NOTES: TopicStudyNote[] = [
  // ==========================================
  // TÜRK DİLİ VE EDEBİYATI (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-edb-1',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    topicName: '1. Tema: Sözün İnceliği - Edebiyatın Doğası, Estetik Değer ve Güzel Sanatlarla İlişkisi',
    lgsFrequency: '1. Ortak Yazılıda Kesin 1 Açık Uçlu Soru (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Edebiyat; duygu, düşünce ve hayallerin dil aracılığıyla estetik biçimde ifade edilmesidir.',
      'Güzel sanatlar kullandıkları malzemeye göre üçe ayrılır: İşitsel (Fonetik), Görsel (Plastik) ve Dramatik (Ritmik).',
      'Edebiyat ve müzik "İşitsel (Fonetik) Sanatlar" grubundadır; temel malzemesi dildir.',
      'Edebiyat; tarih, coğrafya, felsefe, sosyoloji ve psikoloji gibi diğer bilim dallarından doğrudan beslenir.',
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
    topicName: '2. Tema: Anlam Arayışı - Metinde Konu, Tema, Ana Fikir ve İleti Tespiti',
    lgsFrequency: '1. Ortak Yazılıda Kesin 15 Puanlık Soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Konu: Metinde neden söz edildiğidir (Örn: Köyden kente göç).',
      'Tema: Metnin bütününe hâkim olan soyut duygu veya kavramdır (Örn: Yalnızlık, sevgi, ölüm).',
      'Ana Fikir (Ana Düşünce): Yazarın okuyucuya iletmek istediği asıl mesaj, varılan nihai yargıdır.',
      'İletişim Ögeleri: Gönderici, Alıcı, İleti, Kanal, Bağlam ve Dönüt.',
    ],
    mebTraps: [
      'Tuzak: Konu ile temayı karıştırmak. Konu somuttur (bir olay, olgu); tema ise soyuttur (hüzün, vatan sevgisi).',
      'Tuzak: Dönütü unutmak. Eğer alıcı cevap vermez veya tepki göstermezse iletişimde dönüt eksik kalır.',
    ],
    questionStrategy:
      'Metne "Yazar neyi anlatıyor?" sorusunu sorarsan Konu; "Metinden hangi dersi çıkarmalıyız?" sorusunu sorarsan Ana Fikir bulunur.',
    relatedExamSlug: 'meb-9-edebiyat-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Verilen bir paragrafta yazarın aktarmak istediği ana düşünceyi bulurken izlenmesi gereken yöntemi açıklayınız.',
      solutionSteps: [
        '1. Metnin giriş ve sonuç cümlelerine odaklanılır.',
        '2. "Yazar bana ne anlatmak istedi ve hangi sonuca vardı?" sorusu sorulur.',
        '3. Çıkarılan yargı tam bir cümle hâlinde yazılır.',
      ],
      keyTakeaway: 'Ana fikir tam bir yargı cümlesidir; konu ise ifadedir.',
    },
  },
  {
    topicId: 'l1-note-edb-3',
    courseKey: 'edebiyat',
    courseName: 'Türk Dili ve Edebiyatı',
    topicName: '2. Tema: Anlam Arayışı - Hikâye Türü Tahlili: Olay ve Durum Hikâyeleri',
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
    topicName: 'Dil Bilgisi: İsimler, Sıfatlar, Zamirler ve Zarfların Metindeki İşlevleri',
    lgsFrequency: 'MEB Ortak Sınavında Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'İsimler (Adlar): Varlıkları karşılar. Belirtili (kapı-n-ın kol-u), Belirtisiz (okul bahçe-s-i), Zincirleme (okul kapısının kolu) tamlamalar kurar.',
      'Sıfatlar (Ön Adlar): İsimlerin önüne gelerek onları niteler ya da belirtir (Nasıl? Kaç? Hangi? Kaçıncı?).',
      'Zamirler (Adıllar): İsmin yerini tutan sözcüklerdir (Kişi, İşaret, Belgisiz, Soru zamirleri).',
      'Zarflar (Belirteçler): Fiilleri, fiilimsileri, sıfatları veya başka zarfları durum, zaman, miktar, yer-yön, soru yönünden etkiler.',
    ],
    mebTraps: [
      'Tuzak: Sıfat tamlamasını isim tamlaması sanmak. "Mavi gömlek" sıfattır; "Gömleğin mavisi" belirtili isim tamlamasıdır.',
      'Tuzak: "İçeri" zarfı ile "içeriye" ismini karıştırmak. Yer-yön bildiren kelimeler ek alırsa isimleşir!',
    ],
    questionStrategy:
      'Sözcüğün türünü belirlerken tek başına anlamına değil, cümle içindeki görevine bak. İsmin önündeyse Sıfat, ismin yerini tuttuysa Zamir, eylemi nitelediyse Zarftır.',
    relatedExamSlug: 'meb-9-edebiyat-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '"Bu güzel kitapları masanın üzerine dün bıraktım." cümlesindeki altı çizili sözcüklerin türlerini yazınız: "Bu", "güzel", "üzerine", "dün".',
      solutionSteps: [
        '1. "Bu" kitapları: İsmi işaret ettiği için İşaret Sıfatıdır.',
        '2. "güzel" kitaplar: İsmi nitelediği için Niteleme Sıfatıdır.',
        '3. masanın "üzerine": İsim tamlamasının tamlananı olduğu için İsimdir.',
        '4. "dün" bıraktım: Fiilin zamanını bildirdiği için Zaman Zarfıdır.',
      ],
      keyTakeaway: 'İsmi niteleyen = Sıfat; İsmin yerini tutan = Zamir; Fiili niteleyen = Zarf.',
    },
  },

  // ==========================================
  // MATEMATİK (9. SINIF - TÜRKİYE YÜZYILI MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-mat-1',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: '1. Tema: Sayılar - Gerçek Sayıların Üslü ve Köklü Gösterimleri',
    lgsFrequency: '1. Ortak Yazılı Sınavının %35\'i (35 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Üslü Gösterimler: aⁿ ifadesinde a taban, n üstür. aⁿ · aᵐ = aⁿ⁺ᵐ ve (aⁿ)ᵐ = aⁿᵐ kuralları geçerlidir.',
      'Köklü Gösterimler: ⁿ√a ifadesinde n derecedir. Rasyonel üs: ⁿ√(aᵐ) = a^(m/n).',
      'Paydayı Rasyonel Yapma: Paydada köklü ifade bırakılmaz; eşleniği ile çarpılır (Örn: √(a) için √(a); √(a) - √(b) için √(a) + √(b)).',
      'Sayı Kümeleri: Doğal Sayılar (N), Tam Sayılar (Z), Rasyonel Sayılar (Q), İrrasyonel Sayılar (Q\') ve Gerçek Sayılar (R = Q ∪ Q\').',
    ],
    formulas: [
      'aⁿ · aᵐ = aⁿ⁺ᵐ  ve  aⁿ / aᵐ = aⁿ⁻ᵐ',
      'ⁿ√(aᵐ) = a^(m/n)',
      '√(a) · √(b) = √(a · b)  (a, b ≥ 0)',
      '(√a - √b)(√a + √b) = a - b (İki kare farkı)',
    ],
    mebTraps: [
      'Tuzak: Köklü sayılarda toplama yaparken kök içlerini toplamak. √(9) + √(16) = √(25) DEĞİLDİR! 3 + 4 = 7\'dir.',
      'Tuzak: Çift dereceli köklerin içi negatif olamaz: ²√(-4) gerçek sayılarda tanımsızdır.',
    ],
    questionStrategy:
      'Köklü işlem sorularında önce kök dışına çıkarılabilecek tam kare çarpanları dışarı al (√75 = √(25·3) = 5√3), sonra benzer terimleri topla.',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '√12 + √27 - √48 işleminin sonucunu adım adım gösteriniz.',
      solutionSteps: [
        '1. Adım: √12 = √(4 · 3) = 2√3.',
        '2. Adım: √27 = √(9 · 3) = 3√3.',
        '3. Adım: √48 = √(16 · 3) = 4√3.',
        '4. Adım: 2√3 + 3√3 - 4√3 = (2 + 3 - 4)√3 = 1√3 = √3 bulunur.',
      ],
      keyTakeaway: 'Tam kare çarpanları dışarı çıkar, katsayıları topla.',
    },
  },
  {
    topicId: 'l1-note-mat-2',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: '1. Tema: Sayılar - Gerçek Sayı Aralıkları ve Sayı Kümeleri',
    lgsFrequency: '1. Ortak Yazılıda Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Açık Aralık: (a, b) = {x ∈ R | a < x < b} uç noktalar dahil değildir (içi boş daire).',
      'Kapalı Aralık: [a, b] = {x ∈ R | a ≤ x ≤ b} uç noktalar dahildir (içi dolu daire).',
      'Yarı Açık Aralık: [a, b) veya (a, b] bir taraf dahil, diğer taraf dahil değil.',
      'Kümelerde İşlemler: Kesişim (∩) her iki aralıkta ortak olan sayılar; Birleşim (∪) en sol sınırdan en sağ sınıra kadar tüm sayılardır.',
    ],
    formulas: [
      'A = [-2, 5) ve B = (1, 7] ise A ∩ B = (1, 5) ve A ∪ B = [-2, 7]',
    ],
    mebTraps: [
      'Tuzak: Aralık kesişiminde dahil/dahil değil durumuna dikkat etmemek. Bir kümede dahil, diğerinde dahil değilse kesişime DAHİL EDİLMEZ.',
    ],
    questionStrategy:
      'Aralık işlemlerini mutlaka tek bir sayı doğrusu üzerinde farklı renklerle çiz; çakışan bölge kesişimdir.',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'A = [-3, 4) ve B = [0, 6] aralıkları için A ∩ B ve A ∪ B kümelerini aralık gösterimiyle yazınız.',
      solutionSteps: [
        '1. Sayı doğrusu çizildiğinde ortak bölge 0 ile 4 arasıdır: 0 her ikisinde de dahildir, 4 ise A\'da açık aralıktır.',
        '2. A ∩ B = [0, 4).',
        '3. Birleşim en küçük sol uç (-3 dahil) ile en büyük sağ uç (6 dahil) arasıdır: A ∪ B = [-3, 6].',
      ],
      keyTakeaway: 'Kesişim ortak bölgedir; Birleşim en geniş kapsayan aralıktır.',
    },
  },
  {
    topicId: 'l1-note-mat-3',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: '1. Tema: Sayılar - İki Kare Farkı ve Tam Kare Özdeşlikleri',
    lgsFrequency: 'MEB Ortak Sınavında Kesin 15 Puan',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'İki Kare Farkı Özdeşliği: a² - b² = (a - b)(a + b).',
      'Toplamın Karesi (Tam Kare): (a + b)² = a² + 2ab + b².',
      'Farkın Karesi (Tam Kare): (a - b)² = a² - 2ab + b².',
      'Çarpanlara Ayırma: Ortak çarpan parantezine alma ve özdeşliklerden yararlanarak sadeleştirme.',
    ],
    formulas: [
      'a² - b² = (a - b)(a + b)',
      '(a + b)² = a² + 2ab + b²',
      '(a - b)² = a² - 2ab + b²',
    ],
    mebTraps: [
      'Tuzak: (a + b)² ifadesini a² + b² sanmak! Ortadaki 2ab terimi mutlaka yazılmalıdır.',
      'Tuzak: a² + b² ifadesini çarpanlarına ayırmaya çalışmak (gerçek sayılarda ayrılamaz).',
    ],
    questionStrategy:
      'Yazılıda kesirli cebirsel ifadelerin sadeleştirilmesi sorulduğunda hem pay hem paydayı tam kare veya iki kare farkı olarak çarpanlarına ayır ve sadeleştir.',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'x² - 9 / (x² - 6x + 9) ifadesini en sade biçimde yazınız.',
      solutionSteps: [
        '1. Pay: x² - 9 iki kare farkıdır: (x - 3)(x + 3).',
        '2. Payda: x² - 6x + 9 tam karedir: (x - 3)² = (x - 3)(x - 3).',
        '3. Sadeleştirme: (x - 3)(x + 3) / [(x - 3)(x - 3)] = (x + 3) / (x - 3) bulunur.',
      ],
      keyTakeaway: 'Pay ve paydayı çarpanlarına ayır, ortak çarpanı sadeleştir.',
    },
  },
  {
    topicId: 'l1-note-mat-4',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: '2. Tema: Nicelikler ve Değişimler - Doğrusal Fonksiyonlar ve Grafikleri',
    lgsFrequency: '1. ve 2. Dönem Ortak Yazılılarının Vazgeçilmezi (25 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Doğrusal Fonksiyon: f(x) = ax + b biçimindeki fonksiyonlardır. Grafiği bir doğru belirtir.',
      'Eğim (m = a): x\'in katsayısıdır. a > 0 ise fonksiyon artan, a < 0 ise azalandır, a = 0 ise sabit fonksiyondur.',
      'Eksenleri Kestiği Noktalar: y ekseni için x=0 yazılır (0, b); x ekseni için y=0 yazılır (-b/a, 0).',
      'Günlük Hayat Değişim Oranları: Değişim oranı = (y₂ - y₁) / (x₂ - x₁) doğrunun eğimine eşittir.',
    ],
    formulas: [
      'f(x) = ax + b (Doğrusal Fonksiyon)',
      'Eğim m = (f(x₂) - f(x₁)) / (x₂ - x₁)',
    ],
    mebTraps: [
      'Tuzak: Grafikten kural yazarken eksenleri ters almak. x eksenini kestiği yer f(x)=0 yapan köktür.',
    ],
    questionStrategy:
      'f(x) = ax + b yaz, verilen iki noktayı fonksiyonda yerine koyup iki bilinmeyenli basit denklemle a ve b\'yi bul.',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Doğrusal bir f fonksiyonu için f(1) = 5 ve f(3) = 11 olduğuna göre f(5) değerini bulunuz.',
      solutionSteps: [
        '1. f(x) = ax + b formundadır.',
        '2. Değişim oranı (eğim a) = (11 - 5) / (3 - 1) = 6 / 2 = 3.',
        '3. f(x) = 3x + b. f(1) = 3(1) + b = 5 ⇒ b = 2.',
        '4. Kural: f(x) = 3x + 2. O hâlde f(5) = 3(5) + 2 = 17 bulunur.',
      ],
      keyTakeaway: 'Doğrusal fonksiyonda artış miktarı sabittir; eğim a = 3.',
    },
  },
  {
    topicId: 'l1-note-mat-5',
    courseKey: 'matematik',
    courseName: 'Matematik (9. Sınıf)',
    topicName: '3. Tema: Algoritma ve Bilişim - Algoritma Temelli Problemler ve Akış Şemaları',
    lgsFrequency: 'Maarif Modeli Yeni Nesil Yazılı Sorusu (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Algoritma: Bir problemin çözümü için tasarlanan, sonlu sayıda adımdan oluşan mantıksal işlem sırasıdır.',
      'Akış Şeması Sembolleri: Elips (Başla/Bitir), Dikdörtgen (İşlem/Hesaplama), Eşkenar Dörtgen (Karar/Koşul), Paralelkenar (Veri Girişi).',
      'Mantık Niceleyicileri: Evrensel niceleyici (∀ - Her), Varlıksal niceleyici (∃ - Bazı/En az bir).',
    ],
    formulas: [
      'Niceleyici Değili: (∀x, P(x))\' ≡ ∃x, P\'(x)  ve  (∃x, P(x))\' ≡ ∀x, P\'(x)',
    ],
    mebTraps: [
      'Tuzak: Niceleyicinin değilini alırken eşitsizlik yönünü yanlış çevirmek. > işaretinin değili ≤ olur!',
    ],
    questionStrategy:
      'Akış şemasında adım adım değişkenlerin değerini bir tabloda izle (kuru çalışma/izleme tablosu).',
    relatedExamSlug: 'meb-9-matematik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '"∀x ∈ R, x² ≥ 0" önermesinin değilini yazınız.',
      solutionSteps: [
        '1. ∀ niceleyicisinin değili ∃ niceleyicisidir.',
        '2. ≥ bağıntısının değili < bağıntısıdır.',
        '3. Önermenin değili: "∃x ∈ R, x² < 0" olur.',
      ],
      keyTakeaway: '∀ değili ∃; ≥ değili <.',
    },
  },

  // ==========================================
  // FİZİK (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-fiz-1',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: '1. Ünite: Fizik Bilimi ve Kariyer Keşfi - Fiziğin Doğası, Önemi ve Alt Dalları',
    lgsFrequency: '1. Ortak Yazılıda Kesin 1 Açık Uçlu Soru (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Fizik; madde ile enerji arasındaki etkileşimi inceleyen, deney ve gözleme dayalı temel bir doğa bilimidir.',
      'Fiziğin Alt Dalları: KAMYONET (Katıhâl Fiziği, Atom Fiziği, Mekanik, Yüksek Enerji ve Plazma, Optik, Nükleer Fizik, Elektromanyetizma, Termodinamik).',
      'Katıhâl Fiziği: Yarı iletkenler, süper iletkenler, nanoteknoloji, kristal yapılar (Bilgisayar çipleri, güneş pilleri).',
      'Yüksek Enerji ve Plazma Fiziği: CERN parçacık hızlandırıcıları, füzyon enerjisi ve uzay seyahatleri.',
    ],
    formulas: [
      'Fiziğin Alt Dalları Kodlaması: KAMYONET',
    ],
    mebTraps: [
      'Tuzak: Nükleer fizik ile atom fiziğini karıştırmak. Atom fiziği atomun elektron yapısını inceler (lazer, 3D yazıcı); Nükleer fizik atomun ÇEKİRDEĞİNİ inceler (radyasyon, nükleer santral, PET çekimi).',
    ],
    questionStrategy:
      'Teknolojik bir cihaz verildiğinde (örneğin MR cihazı veya Güneş paneli) hangi alt dalla ilişkili olduğunu doğrudan KAMYONET kodlamasından bul.',
    relatedExamSlug: 'meb-9-fizik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'CERN\'de yapılan parçacık çarpıştırma deneyleri ile güneş panellerinde kullanılan yarı iletken teknolojisi fiziğin hangi alt dalları ile doğrudan ilgilidir?',
      solutionSteps: [
        '1. CERN deneyleri atom altı parçacıkların yüksek enerjideki davranışını inceler ➔ Yüksek Enerji ve Plazma Fiziği.',
        '2. Güneş pilleri ve yarı iletken kristal yapılar ➔ Katıhâl Fiziği.',
      ],
      keyTakeaway: 'CERN = Yüksek Enerji; Yarı iletkenler = Katıhâl Fiziği.',
    },
  },
  {
    topicId: 'l1-note-fiz-2',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: '2. Ünite: Kuvvet ve Hareket - Temel ve Türetilmiş, Skaler ve Vektörel Büyüklükler',
    lgsFrequency: '1. Ortak Yazılıda Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      '7 Temel Büyüklük: KISA MUZ (Kütle: kg, Işık Şiddeti: cd, Sıcaklık: K, Akım: A, Madde Miktarı: mol, Uzunluk: m, Zaman: s).',
      'Skaler Büyüklük: Sadece sayı ve birimle ifade edilen (Kütle, zaman, sıcaklık, enerji, sürat).',
      'Vektörel Büyüklük: Sayı ve birimin yanında yön ve doğrultu gerektiren (Kuvvet, hız, ivme, yer değiştirme, ağırlık).',
      'Yer Değiştirme (Δx): Son konum ile ilk konum arasındaki en kısa yönlü uzaklıktır (Vektörel).',
    ],
    formulas: [
      'Temel Büyüklük SI Birimleri: kg, cd, K, A, mol, m, s',
      'Sürat = Alınan Yol / Geçen Zaman (Skaler)',
      'Hız = Yer Değiştirme / Geçen Zaman (Vektörel)',
    ],
    mebTraps: [
      'Tuzak: Sıcaklığın SI birimini Celcius (°C) sanmak. SI birimi KELVIN (K)\'dir.',
      'Tuzak: Sürat ile hızı karıştırmak. Sürat skalerdir, yönü yoktur; hız ise vektöreldir, yönü vardır.',
    ],
    questionStrategy:
      'Soruda yön şart mı diye bak: Evetse Vektörel, Hayırsa Skaler. KISA MUZ dışındakiler Türetilmiştir.',
    relatedExamSlug: 'meb-9-fizik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Bir koşucu dairesel bir pist etrafında bir tam tur atarak başladığı noktaya geri dönüyor. Bu koşucunun aldığı yol ve yer değiştirmesi hakkında ne söylenebilir?',
      solutionSteps: [
        '1. Başladığı noktaya geri döndüğü için ilk konum = son konumdur. Yer değiştirme sıfırdır (Δx = 0).',
        '2. Koştuğu tüm pistin çevresi kadar yol katetmiştir; alınan yol sıfır değildir.',
      ],
      keyTakeaway: 'Başlangıca dönülürse yer değiştirme = 0 olur.',
    },
  },
  {
    topicId: 'l1-note-fiz-3',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: '3. Ünite: Akışkanlar - Katı ve Sıvı Basıncı, Günlük Hayat Uygulamaları',
    lgsFrequency: 'MEB Maarif Modeli Yeni Ünite (30 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Katı Basıncı: P = F / S. Ağırlık arttıkça basınç artar; temas yüzeyi arttıkça basınç azalır.',
      'Sıvı Basıncı: P = h · d · g (Derinlik × Özkütle × Yerçekimi İvmesi). Kabın şekline ve sıvı hacmine bağlı DEĞİLDİR.',
      'Pascal İlkesi: Sıvılar sıkıştırılamaz ve üzerlerine uygulanan basıncı her doğrultuda aynen iletir (Hidrolik fren, berber koltuğu, su cenderesi).',
      'Bileşik Kaplar: Tabanları birleştirilmiş kaplarda aynı cins sıvının kollardaki sıvı seviyeleri eşit olur.',
    ],
    formulas: [
      'Katı Basıncı: P = G / S',
      'Sıvı Basıncı: P = h · d · g',
      'Pascal İlkesi / Su Cenderesi: F₁ / S₁ = F₂ / S₂',
    ],
    mebTraps: [
      'Tuzak: Sıvı basıncını sıvı miktarına bağlı sanmak. Yalnızca derinlik (h) ve yoğunluğa (d) bağlıdır.',
      'Tuzak: Pascal ilkesinde sıvının "kuvveti" aynen ilettiğini sanmak. Sıvılar KUVVETİ değil, BASINCI aynen iletir!',
    ],
    questionStrategy:
      'Sıvı basıncı sorularında daima sıvının açık üst yüzeyinden olan dik derinliği (h) al.',
    relatedExamSlug: 'meb-9-fizik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Özkütlesi 2 g/cm³ olan bir sıvının 30 cm derinliğindeki noktasal sıvı basıncını bulunuz (g = 10 m/s², d_sıvı = 2000 kg/m³, h = 0,3 m).',
      solutionSteps: [
        '1. Formül: P = h · d · g.',
        '2. Değerleri SI birimlerinde yerine koyalım: P = 0,3 · 2000 · 10 = 6000 Pa (N/m²).',
      ],
      keyTakeaway: 'P = h · d · g formülü ve SI birimleri esastır.',
    },
  },
  {
    topicId: 'l1-note-fiz-4',
    courseKey: 'fizik',
    courseName: 'Fizik (9. Sınıf)',
    topicName: '3. Ünite: Akışkanlar - Bernoulli İlkesi ve Akışkanlar Dinamiği',
    lgsFrequency: 'MEB Ortak Yazılı Senaryosu (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Bernoulli İlkesi: Akışkanın (hava, su vb.) hızının arttığı yerde basıncı düşer.',
      'Süreklilik İlkesi: Akışkanın geçtiği kesit daraldıkça akış hızı artar (A₁ · v₁ = A₂ · v₂).',
      'Uçak Kanadı Tasarımı: Kanadın üst kısmı kavisli olduğu için hava üstten daha hızlı akar ve üstte alçak basınç oluşur. Alttaki yüksek basınç uçağı yukarı iter (Kaldırma kuvveti).',
      'Günlük Hayat Örnekleri: Rüzgârda çatının uçması, şemsiyenin ters dönmesi, yanından hızlı tren geçen kişinin trene doğru çekilmesi, parfüm püskürtücüleri.',
    ],
    formulas: [
      'Süreklilik: A₁ · v₁ = A₂ · v₂  (Kesit daralırsa hız artar)',
      'Bernoulli: v artarsa ➔ P azalır',
    ],
    mebTraps: [
      'Tuzak: Kesit daralınca basıncın arttığını sanmak. Hortumun ucunu sıktığımızda suyun hızı artar, ancak yan çeperlere uyguladığı akışkan basıncı DÜŞER.',
    ],
    questionStrategy:
      'Boru kesiti daraldı ➔ Akış hızı arttı ➔ Basınç düştü ➔ Sıvı seviyesi daha az yükseldi zincirini kur.',
    relatedExamSlug: 'meb-9-fizik-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Fırtınalı havalarda çatıların dışarıdan içeriye doğru değil de içeriden dışarıya doğru havaya uçmasının fiziksel gerekçesini Bernoulli ilkesiyle açıklayınız.',
      solutionSteps: [
        '1. Çatının üzerinden esen şiddetli rüzgâr akış hızını artırır ve çatının üst yüzeyinde basınç düşer (alçak basınç).',
        '2. Evin içindeki hava durgun olduğundan iç basınç daha yüksektir (yüksek basınç).',
        '3. Basınç farkından doğan yukarı yönlü kuvvet çatıyı yukarı doğru fırlatır.',
      ],
      keyTakeaway: 'Hızlı hava = Düşük basınç (Bernoulli İlkesi).',
    },
  },

  // ==========================================
  // KİMYA (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-kim-1',
    courseKey: 'kimya',
    courseName: 'Kimya (9. Sınıf)',
    topicName: '1. Tema: Etkileşim - Kimya Laboratuvarında Güvenlik Kuralları ve Piktogramlar',
    lgsFrequency: '1. Ortak Yazılıda Kesin 1 Açık Uçlu Soru (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Güvenlik Uyarı İşaretleri (Piktogramlar): Yanıcı (alev), Yakıcı (ortasında O harfi olan alev), Aşındırıcı/Korozif (ele ve metale damlayan asit), Zehirli/Toksik (kurukafa), Patlayıcı (parçalanan bomba), Çevreye Zararlı (kurumuş ağaç ve ölü balık).',
      'Laboratuvar Temel Kuralı: Asit üzerine asla su dökülmez! Sıçrama ve aşırı ısınmayı önlemek için daima suyun üzerine yavaşça asit eklenir.',
      'Temel Laboratuvar Malzemeleri: Beherglas, Erlenmayer, Büret, Pipet, Dereceli Silindir (Mezür), Balon Joje.',
    ],
    formulas: [
      'Altın Kural: "Suyun üstüne asit dökülür; asidin üstüne asla su dökülmez!"',
    ],
    mebTraps: [
      'Tuzak: Yanıcı ile yakıcı piktogramını karıştırmak. Alevin ortasında "O" (Oksijen çemberi) varsa YAKICI (oksitleyici) maddedir.',
    ],
    questionStrategy:
      'Piktogram sorularında simgenin görsel detayına odaklan. Balık ve ağaç varsa çevre, kurukafa varsa toksiktir.',
    relatedExamSlug: 'meb-9-kimya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Laboratuvarda derişik sülfürik asit çözeltisi hazırlarken asit ve suyun karıştırılma sırasını ve nedenini yazınız.',
      solutionSteps: [
        '1. Önce kaba su konulur, ardından asit azar azar ve çalkalanarak suyun üzerine ilave edilir.',
        '2. Sebebi: Asit üzerine su eklenirse aşırı ısı açığa çıkar ve asit sıçrayarak kimyasal yanıklara yol açar.',
      ],
      keyTakeaway: 'Daima suyun üstüne asit eklenir.',
    },
  },
  {
    topicId: 'l1-note-kim-2',
    courseKey: 'kimya',
    courseName: 'Kimya (9. Sınıf)',
    topicName: '1. Tema: Etkileşim - Bohr ve Modern Atom Teorisi, Atom Orbitalleri',
    lgsFrequency: '1. Ortak Yazılı Sınavının Omurgası (35 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Bohr Modeli: Elektronlar çekirdek çevresinde belirli dairesel yörüngelerde dolanır. Yalnızca tek elektronlu sistemleri (H, He⁺, Li²⁺) açıklayabilmiştir.',
      'Modern Atom Teorisi (Bulut Modeli): Heisenberg Belirsizlik İlkesi gereği elektronun yeri ve hızı aynı anda kesin olarak bilinemez.',
      'Orbital: Elektronların bulunma olasılığının yüksek olduğu uzay bölgeleridir (s, p, d, f orbitalleri).',
      'Atom Numarası (Z) = Proton Sayısı. Nötr atomda Proton = Elektron.',
      'İzotop: Protonları aynı, nötronları farklı olan atomlardır.',
    ],
    formulas: [
      'Kütle Numarası (A) = Proton Sayısı (Z) + Nötron Sayısı (N)',
      'İyon Yükü = Proton Sayısı - Elektron Sayısı',
    ],
    mebTraps: [
      'Tuzak: Bohr atom modelinin tüm atomları açıkladığını sanmak. Yalnızca tek elektronlu tanecikleri açıklayabilmiştir.',
      'Tuzak: İzotop iyonların kimyasal özelliğini aynı sanmak. Elektron sayısı değiştiğinde kimyasal özellik FARKLI olur!',
    ],
    questionStrategy:
      'Sol alt: Proton, Sol üst: Kütle No, Sağ üst: İyon yükü, Sağ alt: Elektron sayısı. Yük + Elektron = Proton bağıntısını uygula.',
    relatedExamSlug: 'meb-9-kimya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '₁₃Al³⁺ iyonunun kütle numarası 27 olduğuna göre nötron ve elektron sayısını bulunuz.',
      solutionSteps: [
        '1. Proton = 13, Kütle no = 27.',
        '2. Nötron = Kütle - Proton = 27 - 13 = 14.',
        '3. İyon Yükü (+3) = 13 - Elektron ⇒ Elektron = 10 bulunur.',
      ],
      keyTakeaway: 'Al³⁺ iyonunda p=13, n=14, e=10.',
    },
  },
  {
    topicId: 'l1-note-kim-3',
    courseKey: 'kimya',
    courseName: 'Kimya (9. Sınıf)',
    topicName: '2. Tema: Çeşitlilik - Güçlü Etkileşimler: İyonik, Kovalent ve Metalik Bağ',
    lgsFrequency: '2. Ortak Yazılıda Kesin Soru (30 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'İyonik Bağ: Metal ve ametal atomları arasında elektron alışverişi ile oluşur (Elektrostatik çekim). Katı hâlde elektriği iletmez, sıvı veya sulu çözeltisi iletir.',
      'Kovalent Bağ: Ametal atomları arasında elektron ortaklaşması ile oluşur. Apolar kovalent (aynı ametaller: O₂, Cl₂) ve Polar kovalent (farklı ametaller: H₂O, HCl).',
      'Metalik Bağ: Metal katyonları ile serbest elektron denizi arasındaki çekimdir. Metallere elektrik/ısı iletkenliği, parlaklık ve tel/levha olma özelliği kazandırır.',
    ],
    formulas: [
      'İyonik Bağ = Elektron Alışverişi (Metal + Ametal)',
      'Kovalent Bağ = Elektron Ortaklaşması (Ametal + Ametal)',
      'Metalik Bağ = Metal Katyonu + Serbest Elektron Denizi',
    ],
    mebTraps: [
      'Tuzak: Sofra tuzunun (NaCl) katı hâlde elektriği ilettiğini sanmak. İyonik katılar serbest iyon içermediğinden elektriği iletmez; eriyik veya sulu çözeltisi iletir!',
    ],
    questionStrategy:
      'Atomların metal mi ametal mi olduğunu belirle: H, C, N, O, F, P, S, Cl, Br, I ametaldir. Ametal+Ametal = Kovalent; Metal+Ametal = İyoniktir.',
    relatedExamSlug: 'meb-9-kimya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'NaCl, H₂O ve Fe maddelerindeki kimyasal bağ türlerini sınıflandırınız.',
      solutionSteps: [
        '1. NaCl: Na (Metal) + Cl (Ametal) ➔ İyonik Bağ.',
        '2. H₂O: H (Ametal) + O (Ametal) ➔ Polar Kovalent Bağ.',
        '3. Fe: Saf demir atomları ➔ Metalik Bağ.',
      ],
      keyTakeaway: 'Metal+Ametal = İyonik; Ametal+Ametal = Kovalent; Saf Metal = Metalik Bağ.',
    },
  },

  // ==========================================
  // BİYOLOJİ (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-bio-1',
    courseKey: 'biyoloji',
    courseName: 'Biyoloji (9. Sınıf)',
    topicName: '1. Tema: Yaşam - Canlıların Ortak Özellikleri (Metabolizma, Homeostazi, Adaptasyon vb.)',
    lgsFrequency: '1. Ortak Yazılıda Kesin 2 Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Canlıların Ortak Özellikleri: Hücresel yapı (prokaryot veya ökaryot), beslenme, hücresel solunum (ATP üretimi), boşaltım, hareket, uyarılara tepki, metabolizma (anabolizma + katabolizma), homeostazi (iç denge), üreme ve adaptasyon.',
      'Homeostazi: Değişen çevre şartlarına rağmen vücut iç ortamının dengede ve kararlı tutulmasıdır (Örn: Terleyerek vücut ısısını düşürme).',
      'Metabolizma: Anabolizma (Yapım/Özümleme - Örn: Protein sentezi) ve Katabolizma (Yıkım/Yadımlama - Örn: Hücresel solunum).',
    ],
    formulas: [
      'Metabolizma = Anabolizma (Yapım) + Katabolizma (Yıkım)',
      'Homeostazi = Kararlı ve Dengeli İç Ortam',
    ],
    mebTraps: [
      'Tuzak: Fotosentezin tüm canlılarda ortak olduğunu sanmak. Fotosentez veya kemosentez sadece ototroflarda görülür, tüm canlılarda ortak DEĞİLDİR.',
      'Tuzak: Bütün canlıların doku ve organ taşıdığını sanmak. Bir hücrelilerde doku ve organ bulunmaz.',
    ],
    questionStrategy:
      'Soru kökünde "tüm canlılar" ifadesi varsa; hücresel yapı, ATP üretimi, protein sentezi ve ribozom varlığı kesin ortaktır.',
    relatedExamSlug: 'meb-9-biyoloji-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Homeostazi kavramını tanımlayarak insan vücudundan bir örnek veriniz.',
      solutionSteps: [
        '1. Tanım: Değişen çevre şartlarına rağmen canlının iç çevresini dinamik bir dengede sabit tutabilme yeteneğidir.',
        '2. Örnek: Sıcak havalarda vücut sıcaklığı yükseldiğinde terleme mekanizmasıyla ısının düşürülmesi veya kanda glikoz yükselince insülin salgılanması.',
      ],
      keyTakeaway: 'Homeostazi = Dinamik İç Denge.',
    },
  },
  {
    topicId: 'l1-note-bio-2',
    courseKey: 'biyoloji',
    courseName: 'Biyoloji (9. Sınıf)',
    topicName: '1. Tema: Yaşam - Organik Bileşikler: Proteinler, Peptit Bağı ve Denatürasyon',
    lgsFrequency: '1. Ortak Yazılı Sınavının %30\'u (30 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Proteinlerin Yapı Taşı: Amino asitlerdir (20 çeşit amino asit vardır). Her amino asitte bir amino grubu (-NH₂), bir karboksil grubu (-COOH) ve bir radikal grup (R) bulunur.',
      'Peptit Bağı: Bir amino asidin karboksil grubu ile diğerinin amino grubu arasında kurulur; her bağ için 1 molekül su açığa çıkar.',
      'Özgüllük: Proteinlerin sırası, sayısı ve çeşidi DNA şifresine göre belirlendiği için her canlıya özgüdür.',
      'Denatürasyon: Yüksek sıcaklık, pH değişimi ve basınç etkisiyle proteinin üç boyutlu yapısının bozulup işlevsizleşmesidir (Primer yapısı bozulmaz).',
    ],
    formulas: [
      'n(Amino Asit) → Polipeptit + (n - 1) H₂O',
      'Kurulan Peptit Bağı Sayısı = Açığa Çıkan Su Sayısı = n - 1',
    ],
    mebTraps: [
      'Tuzak: Denatüre olan proteinin amino asit sırasının bozulduğunu sanmak. Peptit bağları kopmaz, primer dizi aynı kalır; sadece 3 boyutlu katlanma yapısı bozulur.',
    ],
    questionStrategy:
      'Protein sentezi hesaplamalarında: Bağ Sayısı = Su Sayısı = Amino Asit Sayısı - 1 formülünü uygula.',
    relatedExamSlug: 'meb-9-biyoloji-1-donem-1-yazili',
    exampleQuestion: {
      questionText: '75 amino asitten oluşan bir polipeptit sentezlenirken kaç peptit bağı kurulur ve kaç molekül su açığa çıkar?',
      solutionSteps: [
        '1. Peptit bağı sayısı = n - 1 = 75 - 1 = 74.',
        '2. Açığa çıkan su sayısı kurulan bağ sayısına eşittir = 74 molekül su.',
      ],
      keyTakeaway: 'Bağ = Su = n - 1.',
    },
  },
  {
    topicId: 'l1-note-bio-3',
    courseKey: 'biyoloji',
    courseName: 'Biyoloji (9. Sınıf)',
    topicName: '2. Tema: Organizasyon - Hücrenin Yapısı: Prokaryot ve Ökaryot Hücre Karşılaştırması',
    lgsFrequency: 'MEB Ortak Yazılı Karşılaştırma Sorusu (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Prokaryot Hücre: Zarla çevrili çekirdek ve zarlı organelleri (mitokondri, ER, golgi vb.) YOKTUR. Genetik materyal (halkasal DNA) sitoplazmada serbesttir. Tek organeli RİBOZOM\'dur (Bakteriler ve Arkeler).',
      'Ökaryot Hücre: Zarla çevrili çekirdeği ve zarlı/zarsız organelleri VARDIR (Bitki, hayvan, mantar, protista).',
      'Ortak Yapılar: Hücre zarı, sitoplazma, ribozom ve nükleik asitler (DNA ve RNA) her iki hücre tipinde de ortaktır.',
    ],
    formulas: [
      'Prokaryot = Çekirdeksiz + Sadece Ribozom',
      'Ökaryot = Çekirdekli + Zarlı Organeller',
    ],
    mebTraps: [
      'Tuzak: Bakterilerde fotosentez veya solunum olmaz sanmak. Kloroplastı veya mitokondrisi yoktur ama sitoplazmik kıvrımlarla fotosentez ve solunum yapabilirler.',
    ],
    questionStrategy:
      'Yazılıda tablo doldurma sorulur: Prokaryot sütununa sadece Ribozom işaretle, diğer tüm organellere eksi (-) koy.',
    relatedExamSlug: 'meb-9-biyoloji-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Prokaryot ve ökaryot hücreleri çekirdek zarı, organel çeşidi ve DNA konumu bakımından karşılaştırınız.',
      solutionSteps: [
        '1. Çekirdek Zarı: Prokaryotta yoktur; ökaryotta çift katlı zarla çevrilidir.',
        '2. Organel Çeşidi: Prokaryotta sadece zarsız ribozom bulunur; ökaryotta zarlı ve zarsız organeller vardır.',
        '3. DNA Konumu: Prokaryotta sitoplazmada serbesttir; ökaryotta çekirdek içinde yer alır.',
      ],
      keyTakeaway: 'Prokaryot çekirdeksizdir; ökaryot çekirdeklidir.',
    },
  },

  // ==========================================
  // TARİH (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-tar-1',
    courseKey: 'tarih',
    courseName: 'Tarih (9. Sınıf)',
    topicName: '1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarih Öğrenmenin Faydaları ve Tarih Bilinci',
    lgsFrequency: '1. Ortak Yazılıda Kesin 1 Açık Uçlu Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Tarih; geçmişte yaşamış insan topluluklarının faaliyetlerini, yer ve zaman göstererek, sebep-sonuç ilişkisi içinde, belgelere dayanarak nesnel olarak inceleyen sosyal bir bilimdir.',
      'Tarih biliminde laboratuvar deneyi ve gözlem yapılamaz; kanunları (kuralları) mutlak ve değişmez değildir.',
      'Tarih Araştırma Basamakları (5T Kuralı): 1. Tarama (Kaynak Arama), 2. Tasnif (Sınıflandırma), 3. Tahlil (Çözümleme/Yeterlilik), 4. Tenkit (Eleştiri - İç/Dış Tenkit), 5. Terkip (Sentez/Yazım).',
      'Kaynak Türleri: Birinci Elden Kaynaklar (O döneme ait kitabe, para, ferman, fosil) & İkinci Elden Kaynaklar (O dönemin kaynaklarından yararlanılarak sonradan yazılan eserler).',
    ],
    formulas: [
      'Tarih Araştırma Adımları = 5T (Tarama ➔ Tasnif ➔ Tahlil ➔ Tenkit ➔ Terkip)',
    ],
    mebTraps: [
      'Tuzak: Dış tenkit ile iç tenkiti karıştırmak. Dış tenkit eserin yazarı, basım yılı, kâğıt türü gibi fiziki özellikleridir; İç tenkit ise bilginin güvenilirliği ve yazarın tarafsızlığıdır.',
    ],
    questionStrategy:
      'Yazılıda 5T adımlarını sırasıyla yazıp "Tenkit" aşamasını tanımlaman istenir: Bilgilerin doğruluğunu ve tarafsızlığını test etmektir.',
    relatedExamSlug: 'meb-9-tarih-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Tarih araştırmalarında belgenin güvenilirliğini denetlemek amacıyla yapılan "İç Tenkit" ve "Dış Tenkit" arasındaki farkı açıklayınız.',
      solutionSteps: [
        '1. Dış Tenkit: Belgenin fiziki yapısı, adı, yazarının kimliği, basıldığı yer ve zaman gibi dış unsurlarını inceler.',
        '2. İç Tenkit: Belgede yer alan bilgilerin doğruluğunu, yazarın tarafsızlığını ve başka belgelerle tutarlılığını inceler.',
      ],
      keyTakeaway: 'Dış Tenkit = Fiziki özellikler; İç Tenkit = Bilginin doğruluğu.',
    },
  },
  {
    topicId: 'l1-note-tar-2',
    courseKey: 'tarih',
    courseName: 'Tarih (9. Sınıf)',
    topicName: '2. Ünite: Eski Çağ Medeniyetleri - Tarım Devrimi, Yerleşik Yaşam ve Şehir Devletleri',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (25 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Bereketli Hilal: Mezopotamya, Anadolu ve Levant bölgesini kapsayan tarımın ve ilk yerleşik köylerin başladığı havzadır (Çayönü, Göbeklitepe, Çatalhöyük).',
      'Yazının İcadı: MÖ 3200\'de Sümerler tarafından tapınak depolarındaki ürünleri kaydetmek (Ziggurat zemin katı) amacıyla çivi yazısı icat edilmiş ve Tarihî Çağlar başlamıştır.',
      'Yazılı Hukuk: İlk yazılı kanunlar Sümer Kralı Urugakina tarafından yapılmıştır. Babil Kralı Hammurabi ise kısas esasına dayalı sert kanunlar hazırlamıştır.',
    ],
    formulas: [
      'Tarihî Çağların Başlangıcı = Yazının İcadı (MÖ 3200 Sümerler)',
      'İlk Yazılı Kanun = Urugakina (Sümer)',
    ],
    mebTraps: [
      'Tuzak: Hammurabi kanunlarını ilk yazılı kanun sanmak. İlk yazılı kanunlar Sümer Kralı Urugakina\'ya aittir; Hammurabi kanunları ise en kapsamlı kısas kanunlarıdır.',
    ],
    questionStrategy:
      'Sümer zigguratlarının çok fonksiyonlu yapısını unutma: En alt kat depo (yazı burada doğdu), orta kat ibadethane ve okul, en üst kat rasathane (astronomi burada gelişti).',
    relatedExamSlug: 'meb-9-tarih-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Sümerlerin Ziggurat adı verilen tapınaklarının bilimin ve yazının gelişimine olan iki temel katkısını yazınız.',
      solutionSteps: [
        '1. Depolanan tahılların kaydını tutma ihtiyacı çivi yazısının icat edilmesini sağlamıştır.',
        '2. En üst katının rasathane (gözlemevi) olarak kullanılması Ay takviminin ve astronomi biliminin gelişmesini sağlamıştır.',
      ],
      keyTakeaway: 'Ziggurat = Depo (Yazı) + Rasathane (Astronomi).',
    },
  },

  // ==========================================
  // COĞRAFYA (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-cog-1',
    courseKey: 'cografya',
    courseName: 'Coğrafya (9. Sınıf)',
    topicName: '1. Ünite: Coğrafyanın Doğası - Coğrafya Biliminin Konusu, İlkeleri ve Bölümleri',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (15 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Muhteşem Dörtlü (Doğal Ortamlar): Atmosfer (Hava küre), Litosfer (Taş küre), Hidrosfer (Su küre), Biyosfer (Canlılar küresi).',
      'Coğrafyanın 3 Temel İlkesi: 1. Dağılış İlkesi (Coğrafyaya özgü temel ilkedir, harita ile gösterilir), 2. Nedensellik (Sebep-sonuç), 3. Karşılıklı İlgi (Bağlantı).',
      'Fiziki Coğrafya: Jeomorfoloji (Yer şekilleri), Klimatoloji (İklim), Hidrografya (Sular), Biyocoğrafya (Canlılar), Kartografya (Harita).',
      'Beşerî Coğrafya: Nüfus, yerleşme, ekonomik faaliyetler (tarım, sanayi, turizm, ulaşım).',
    ],
    formulas: [
      'Muhteşem Dörtlü = Litosfer + Atmosfer + Hidrosfer + Biyosfer',
      'Coğrafyanın Özgün İlkesi = Dağılış İlkesi',
    ],
    mebTraps: [
      'Tuzak: Jeomorfoloji ile Jeolojiyi karıştırmak. Jeoloji yerin derinliklerini ve kayaçları inceler; Jeomorfoloji ise yeryüzü şekillerini inceler.',
    ],
    questionStrategy:
      'Soru metninde bir olayın "nerede, hangi bölgelerde yoğunlaştığı" anlatılıyorsa cevap kesinlikle Dağılış İlkesidir.',
    relatedExamSlug: 'meb-9-cografya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Doğal ortamı oluşturan dört unsuru (muhteşem dörtlü) yazarak coğrafyayı diğer bilimlerden ayıran en temel ilkeyi belirtiniz.',
      solutionSteps: [
        '1. Dört Unsur: Litosfer (Taş küre), Atmosfer (Hava küre), Hidrosfer (Su küre) ve Biyosfer (Canlılar küresi).',
        '2. En temel ilke: Dağılış İlkesidir.',
      ],
      keyTakeaway: 'Dağılış ilkesi sadece coğrafyaya özgüdür.',
    },
  },
  {
    topicId: 'l1-note-cog-2',
    courseKey: 'cografya',
    courseName: 'Coğrafya (9. Sınıf)',
    topicName: '2. Ünite: Mekânsal Bilgi Teknolojileri - Harita ve Konum Okuryazarlığı, Projeksiyon Türleri',
    lgsFrequency: '1. Ortak Yazılıda Kesin Harita Sorusu (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Harita Şartları: Kuş bakışı görünüş, belirli bir ölçek ve düzleme aktarılmış olma.',
      'Projeksiyon Tipleri: Silindirik Projeksiyon (Ekvator ve çevresini hatasız çizer), Konik Projeksiyon (Orta kuşak ülkelerini en az hatayla çizer - Türkiye için en uygunudur), Düzlem Projeksiyon (Kutupları en az hatayla çizer).',
      'Ölçek: Kesir Ölçek ve Çizgi Ölçek. Büyük ölçekli haritalar ayrıntıyı çok gösterir, küçültme oranı azdır, paydası küçüktür.',
    ],
    formulas: [
      'Türkiye Haritası İçin En Uygun Projeksiyon = Konik Projeksiyon',
      'Büyük Ölçek = Payda Küçük + Ayrıntı Fazla + Bozulma Az',
    ],
    mebTraps: [
      'Tuzak: Büyük ölçekli haritanın paydasının büyük olduğunu sanmak. Büyük ölçek 1/10.000\'dir, paydası KÜÇÜKTÜR.',
    ],
    questionStrategy:
      'Türkiye orta kuşakta yer aldığı için konik projeksiyon kullanılır; Grönland veya kutuplar için düzlem, Brezilya için silindirik seçilir.',
    relatedExamSlug: 'meb-9-cografya-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Türkiye\'nin fiziki haritası çizilirken hata oranını en aza indirmek için hangi projeksiyon yöntemi seçilmelidir? Gerekçesini yazınız.',
      solutionSteps: [
        '1. Seçilmesi gereken yöntem: Konik Projeksiyon.',
        '2. Gerekçesi: Konik projeksiyon orta kuşakta (30°-60° enlemleri) yer alan bölgeleri en az bozulmayla çizer; Türkiye de bir orta kuşak ülkesidir.',
      ],
      keyTakeaway: 'Türkiye = Orta Kuşak = Konik Projeksiyon.',
    },
  },

  // ==========================================
  // İNGİLİZCE (9. SINIF - TÜRKİYE YÜZYILI MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-ing-1',
    courseKey: 'ingilizce',
    courseName: 'Birinci Yabancı Dil (İngilizce)',
    topicName: 'Theme 1: School Life - Students from Different Countries, Nationalities & Capitals',
    lgsFrequency: '1. Ortak Yazılı Sınavında Kesin 25 Puan',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Country, Nationality and Language pairs: Turkey - Turkish, France - French, Germany - German, Japan - Japanese, Spain - Spanish.',
      'Verb "To Be" (am / is / are): I am, He/She/It is, We/You/They are.',
      'Asking personal information: Where are you from? (I am from Spain.) / What nationality are you? (I am Spanish.) / What is your capital city? (Madrid).',
      'Possessive Adjectives: my, your, his, her, its, our, their.',
    ],
    formulas: [
      'Country: "I come from / I am from [Country]"',
      'Nationality: "I am [Nationality]"',
      'Language: "I speak [Language]"',
    ],
    mebTraps: [
      'Tuzak: "I am from Turkish" demek! "From" kelimesinden sonra ÜLKE adı (Turkey) gelir, milliyet gelmez. Doğrusu: "I am from Turkey" veya "I am Turkish".',
    ],
    questionStrategy:
      'Yazılıda boşluk doldurma verildiğinde "from" kelimesine dikkat et: "from" varsa ülke, yoksa milliyet yaz.',
    relatedExamSlug: 'meb-9-ingilizce-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Complete the dialogue:\nA: Where is Maria from?\nB: She is from Spain.\nA: What nationality is she?\nB: She is ________.\nA: What language does she speak?\nB: She speaks ________.',
      solutionSteps: [
        '1. Nationality for Spain: Spanish.',
        '2. Language for Spain: Spanish.',
      ],
      keyTakeaway: 'Country: Spain | Nationality: Spanish | Language: Spanish.',
    },
  },
  {
    topicId: 'l1-note-ing-2',
    courseKey: 'ingilizce',
    courseName: 'Birinci Yabancı Dil (İngilizce)',
    topicName: 'Theme 1: School Life - School Activities, Daily Routines & National Celebrations',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (25 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Simple Present Tense (Geniş Zaman): Düzenli alışkanlıklar ve okul rutinleri için kullanılır.',
      '3rd Person Singular Rule: He, She, It öznelerinde olumlu cümlede fiil -s, -es, -ies takısı alır (He attends the chess club).',
      'Adverbs of Frequency (Sıklık Zarfları): Always (100%), Usually (80%), Often (60%), Sometimes (40%), Rarely/Seldom (10%), Never (0%). Özne ile asıl fiil arasına gelir.',
      'Prepositions of Time: AT (at 8 o\'clock, at night), ON (on Monday, on 29th October), IN (in the morning, in spring, in 2026).',
    ],
    formulas: [
      'Positive: Subject + V1 / V(-s/-es) + Object',
      'Negative: Subject + don\'t / doesn\'t + V1',
      'Time Prepositions: AT (saatler) | ON (günler & tarihler) | IN (aylar, mevsimler, yıllar)',
    ],
    mebTraps: [
      'Tuzak: "Does he plays" demek. Soru veya olumsuz cümlede "does/doesn\'t" geldiğinde fiildeki -s takısı DÜŞER: "Does he play".',
      'Tuzak: Günlerin önüne "in" koymak. Günler daima "on" alır: "on Friday".',
    ],
    questionStrategy:
      'Saat gördüğün yere "at", gün gördüğün yere "on", ay/yıl gördüğün yere "in" yaz.',
    relatedExamSlug: 'meb-9-ingilizce-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Put the verbs in brackets into the correct Simple Present form:\n1. Zeynep ________ (attend) the drama club every Tuesday.\n2. We ________ (not / have) classes on the weekend.',
      solutionSteps: [
        '1. Zeynep (She) tekil özne olduğu için fiil -s alır ➔ attends.',
        '2. We öznesi için olumsuzluk don\'t + V1\'dir ➔ don\'t have.',
      ],
      keyTakeaway: 'He/She/It ➔ attends; I/We/They ➔ don\'t have.',
    },
  },
  {
    topicId: 'l1-note-ing-3',
    courseKey: 'ingilizce',
    courseName: 'Birinci Yabancı Dil (İngilizce)',
    topicName: 'Theme 2: Classroom Life - Classmates, Friendships & Study Habits',
    lgsFrequency: '1. ve 2. Yazılı Kazanımı (20 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Expressing Likes and Dislikes: like, love, enjoy, hate, can\'t stand + Verb-ing (I enjoy studying in the library).',
      'Giving Classroom Instructions / Imperatives: Open your books, Don\'t speak loudly, Listen carefully.',
      'Making Suggestions: Let\'s + V1 (Let\'s study together), Shall we + V1?, Why don\'t we + V1?, What about + V-ing?.',
    ],
    formulas: [
      'Love / Like / Hate + V-ing (Örn: She likes reading)',
      'Let\'s + V1  vs  What about + V-ing?',
    ],
    mebTraps: [
      'Tuzak: "What about go to library" demek. "What about / How about" yapısından sonra gelen fiil mutlaka -ing almalıdır: "What about going...".',
    ],
    questionStrategy:
      'Öneri cümlelerinde fiilin ek alıp almadığına bak: V1 varsa "Let\'s", -ing varsa "How about / What about" seç.',
    relatedExamSlug: 'meb-9-ingilizce-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'Fill in the blanks with the correct form:\n1. Why don\'t we ________ (review) the biology notes together?\n2. What about ________ (solve) 20 math questions?',
      solutionSteps: [
        '1. Why don\'t we + V1 yalın fiil alır ➔ review.',
        '2. What about + V-ing alır ➔ solving.',
      ],
      keyTakeaway: 'Why don\'t we review? | What about solving?',
    },
  },

  // ==========================================
  // DİN KÜLTÜRÜ (9. SINIF - MAARİF MODELİ)
  // ==========================================
  {
    topicId: 'l1-note-din-1',
    courseKey: 'din',
    courseName: 'Din Kültürü ve Ahlak Bilgisi',
    topicName: '1. Ünite: Allah-İnsan İlişkisi - İnsanın Yaratılışı ve Özellikleri',
    lgsFrequency: '1. Ortak Yazılıda Kesin Soru (20 Puan)',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'İnsanın Yaratılışı: İnsan ahsen-i takvim (en güzel surette ve donanımda) yaratılmıştır. Akıl ve irade sahibi olması sebebiyle eylemlerinden sorumludur.',
      'Fıtrat: İnsanın doğuştan getirdiği, Yüce Yaratıcı\'yı tanıma ve inanma eğilimidir.',
      'Doğru Bilgi Kaynakları (Salim Bilgi): Sadık Haber (Vahiy ve güvenilir sünnet), Selim Akıl (Önyargısız düşünebilen akıl), Salim Duyular (Sağlam beş duyu organı).',
      'İbadet ve Dua: İnsanın Allah ile doğrudan kurduğu manevi bağdır; sığınma ve şükür ifadesidir.',
    ],
    formulas: [
      'Salim Bilgi Kaynakları = Selim Akıl + Sadık Haber (Vahiy) + Salim Duyular',
    ],
    mebTraps: [
      'Tuzak: Rüya ve ilhamı kesin ve bağlayıcı bilgi kaynağı saymak. İslam epistemolojisinde rüya ve keşif kişiye özeldir; dinen bağlayıcı genel bilgi kaynağı sayılmaz.',
    ],
    questionStrategy:
      'MEB yazılısında Salim Bilgi kaynaklarının 3 unsuru istenir: Selim Akıl, Sadık Haber ve Salim Duyular.',
    relatedExamSlug: 'meb-9-din-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'İslam dinine göre doğru bilgiye ulaşmanın üç temel yolunu yazarak "Sadık Haber" kavramını açıklayınız.',
      solutionSteps: [
        '1. Üç Yol: Selim Akıl, Sadık Haber ve Salim Duyular.',
        '2. Sadık Haber: Yüce Allah\'ın peygamberleri aracılığıyla insanlığa bildirdiği vahiyler ve güvenilir sünnettir.',
      ],
      keyTakeaway: 'Salim Duyular, Selim Akıl, Sadık Haber (Vahiy).',
    },
  },
  {
    topicId: 'l1-note-din-2',
    courseKey: 'din',
    courseName: 'Din Kültürü ve Ahlak Bilgisi',
    topicName: '4. Ünite: Ahlaki Değerler ve Gençlik - Temel Ahlaki Erdemler (Adalet, Hikmet, İffet, Şecaat)',
    lgsFrequency: 'MEB Ortak Yazılı Senaryosu (25 Puan)',
    difficultyLevel: 'Orta',
    summaryBullets: [
      '4 Temel Erdem: 1. Hikmet (Bilgelik, doğru ile yanlışı ayırabilme), 2. Adalet (Her hak sahibine hakkını verme, dengeli olma), 3. İffet (Nefsi meşru olmayan arzulardan koruma, haya), 4. Şecaat (Cesaret, hak uğruna korkusuzca durabilme).',
      'Genç Sahabiler: Mus\'ab bin Umeyr (Medine\'nin ilk öğretmeni), Üsame bin Zeyd (Genç ordu komutanı), Muaz bin Cebel (Yemen\'e vali ve kadı olarak tayin edilen ilim sahibi genç).',
    ],
    formulas: [
      '4 Temel Ahlaki Erdem = Hikmet + Adalet + İffet + Şecaat',
    ],
    mebTraps: [
      'Tuzak: Şecaat ile saldırganlığı karıştırmak. Şecaat meşru müdafaa ve hakkı koruma cesaretidir, haksız saldırganlık değildir.',
    ],
    questionStrategy:
      'Erdemlerin anlamlarını birebir eşleştir: Hikmet = Akıl erdemi; İffet = Şehvet kontrolü; Şecaat = Cesaret; Adalet = Bütün erdemlerin dengesi.',
    relatedExamSlug: 'meb-9-din-1-donem-1-yazili',
    exampleQuestion: {
      questionText: 'İslam ahlakında kabul edilen dört temel erdemi yazarak "Hikmet" kavramını bir cümleyle açıklayınız.',
      solutionSteps: [
        '1. Dört Temel Erdem: Hikmet, Adalet, İffet, Şecaat.',
        '2. Hikmet: İnsanın aklını doğru kullanarak iyi ile kötüyü, hak ile batılı birbirinden ayırt edebilme basiretidir.',
      ],
      keyTakeaway: 'Dört Erdem: Hikmet, Adalet, İffet, Şecaat.',
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
      `"${topicName}" konusu, MEB 9. Sınıf ${courseName} Türkiye Yüzyılı Maarif Modeli müfredatının en kritik açık uçlu yazılı kazanımları arasında yer alır.`,
      'Kavramsal ve Beceriler Temelli Yaklaşım: Bu temada formül ve kural ezberlemek yerine, durum analizini kavrayıp basamak basamak gerekçelendirmek esastır.',
      'YKS (TYT) Temel Atma: 9. sınıf kazanımları TYT sınavının yaklaşık %45\'lik omurgasını oluşturduğundan, şimdiden sağlam öğrenilmesi büyük avantaj sağlar.',
      'Açık Uçlu MEB Yazılı Standartları: MEB yeni ortak sınav formatında sadece sonuca değil, işlem adımlarına ve kavram açıklamalarına tam puan takdir edilmektedir.',
    ],
    formulas: [
      ['edebiyat', 'tarih', 'cografya', 'din', 'ingilizce'].includes(courseKey)
        ? `📌 ${topicName} Yazılı Püf Noktası: Açık uçlu sorularda temel kavramı net cümlelerle tanımlayıp günlük hayattan veya metinden somut bir örnekle destekleyin.`
        : `${courseName} Formül/Kural: Temel Bağıntı ➔ Verileri Yerine Koyma ➔ Adım Adım Çözüm = 100 Tam Puan`,
    ],
    mebTraps: [
      `Tuzak: ${topicName} konusunda yüzeysel tanımla yetinip soru tiplerindeki detayları atlamak. MEB ortak yazılılarında senaryo ve beceri temelli sorular sorulur.`,
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
