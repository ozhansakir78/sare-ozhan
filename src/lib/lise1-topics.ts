// MEB Türkiye Yüzyılı Maarif Modeli (9. Sınıf Güncel Müfredatı)
// 2024-2025 Eğitim-Öğretim Yılından İtibaren Yürürlükte Olan Resmi Tema, Ünite ve Ortak Yazılı Kazanımları

export type Lise1CourseKey =
  | 'edebiyat'
  | 'matematik'
  | 'fizik'
  | 'kimya'
  | 'biyoloji'
  | 'tarih'
  | 'cografya'
  | 'ingilizce'
  | 'din';

export interface Lise1CourseOption {
  key: Lise1CourseKey;
  name: string;
  weeklyHours: number; // MEB Haftalık Ders Saati
  isPassingRequirement?: boolean; // MEB Baraj Dersi (Türk Dili ve Edebiyatı için 70 barajı)
  modelName: string; // "Türkiye Yüzyılı Maarif Modeli"
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}

export const LISE1_COURSE_OPTIONS: readonly Lise1CourseOption[] = [
  {
    key: 'edebiyat',
    name: 'Türk Dili ve Edebiyatı',
    weeklyHours: 5,
    isPassingRequirement: true,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-rose-50/60 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-900/50',
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    },
  },
  {
    key: 'matematik',
    name: 'Matematik (9. Sınıf)',
    weeklyHours: 6,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-blue-50/60 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-900/50',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    },
  },
  {
    key: 'fizik',
    name: 'Fizik (9. Sınıf)',
    weeklyHours: 2,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-indigo-50/60 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-900/50',
      text: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
    },
  },
  {
    key: 'kimya',
    name: 'Kimya (9. Sınıf)',
    weeklyHours: 2,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-violet-50/60 dark:bg-violet-950/20',
      border: 'border-violet-200 dark:border-violet-900/50',
      text: 'text-violet-600 dark:text-violet-400',
      badge: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
    },
  },
  {
    key: 'biyoloji',
    name: 'Biyoloji (9. Sınıf)',
    weeklyHours: 2,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900/50',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
  },
  {
    key: 'tarih',
    name: 'Tarih (9. Sınıf)',
    weeklyHours: 2,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-amber-50/60 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900/50',
      text: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    },
  },
  {
    key: 'cografya',
    name: 'Coğrafya (9. Sınıf)',
    weeklyHours: 2,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-teal-50/60 dark:bg-teal-950/20',
      border: 'border-teal-200 dark:border-teal-900/50',
      text: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    },
  },
  {
    key: 'ingilizce',
    name: 'Birinci Yabancı Dil (İngilizce)',
    weeklyHours: 4,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-sky-50/60 dark:bg-sky-950/20',
      border: 'border-sky-200 dark:border-sky-900/50',
      text: 'text-sky-600 dark:text-sky-400',
      badge: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
    },
  },
  {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi',
    weeklyHours: 2,
    modelName: 'Türkiye Yüzyılı Maarif Modeli',
    colorTheme: {
      bg: 'bg-purple-50/60 dark:bg-purple-950/20',
      border: 'border-purple-200 dark:border-purple-900/50',
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    },
  },
] as const;

export const LISE1_TOPICS_BY_COURSE: Record<Lise1CourseKey, readonly string[]> = {
  // 1. MATEMATİK (Türkiye Yüzyılı Maarif Modeli - 7 Ana Tema)
  matematik: [
    '1. Tema: Sayılar - Gerçek Sayıların Üslü ve Köklü Gösterimleri',
    '1. Tema: Sayılar - Gerçek Sayı Aralıkları ve Sayı Kümeleri',
    '1. Tema: Sayılar - İki Kare Farkı ve Tam Kare Özdeşlikleri',
    '2. Tema: Nicelikler ve Değişimler - Doğrusal Fonksiyonlar ve Grafikleri',
    '2. Tema: Nicelikler ve Değişimler - Mutlak Değer Fonksiyonları',
    '2. Tema: Nicelikler ve Değişimler - Doğrusal Denklem ve Eşitsizlikler',
    '3. Tema: Algoritma ve Bilişim - Algoritma Temelli Problemler ve Akış Şemaları',
    '3. Tema: Algoritma ve Bilişim - Mantık Bağlaçları, Niceleyiciler ve Doğruluk Değeri',
    '3. Tema: Algoritma ve Bilişim - Şifreleme Yöntemleri ve Algoritmik Çözümler',
    '4. Tema: Geometrik Şekiller - Üçgende Açı ve Kenar Özellikleri',
    '4. Tema: Geometrik Şekiller - Üçgen Eşitsizliği ve Açı-Kenar Bağıntıları',
    '5. Tema: Eşlik ve Benzerlik - Yansıma, Öteleme ve Dönme Dönüşümleri',
    '5. Tema: Eşlik ve Benzerlik - Üçgenlerde Eşlik ve Benzerlik Koşulları',
    '5. Tema: Eşlik ve Benzerlik - Tales, Pisagor ve Öklid Bağıntıları',
    '6. Tema: İstatistiksel Araştırma Süreci - Tek Değişkenli İstatistiksel Problemler',
    '6. Tema: İstatistiksel Araştırma Süreci - Histogram, Kutu Grafiği ve Yayılım Ölçüleri',
    '6. Tema: İstatistiksel Araştırma Süreci - Aritmetik Ortalama, Medyan ve Standart Sapma',
    '7. Tema: Veriden Olasılığa - Veri Toplama, Düzenleme ve Analiz',
    '7. Tema: Veriden Olasılığa - Deneysel ve Teorik Olasılık, Ayrık/Ayrık Olmayan Olaylar',
  ],

  // 2. FİZİK (Türkiye Yüzyılı Maarif Modeli - 4 Ana Ünite)
  fizik: [
    '1. Ünite: Fizik Bilimi ve Kariyer Keşfi - Fiziğin Doğası, Önemi ve Alt Dalları',
    '1. Ünite: Fizik Bilimi ve Kariyer Keşfi - Fizik Bilimine Yön Veren Bilim İnsanları ve Meslekler',
    '2. Ünite: Kuvvet ve Hareket - Temel ve Türetilmiş, Skaler ve Vektörel Büyüklükler',
    '2. Ünite: Kuvvet ve Hareket - Kartezyen Koordinat Sisteminde Vektörler ve Vektörlerin Toplanması',
    '2. Ünite: Kuvvet ve Hareket - Doğadaki Temel Kuvvetler ve Etkileri',
    '2. Ünite: Kuvvet ve Hareket - Hareket Türleri, Konum, Alınan Yol, Hız ve Sürat',
    '3. Ünite: Akışkanlar - Katı ve Sıvı Basıncı, Günlük Hayat Uygulamaları',
    '3. Ünite: Akışkanlar - Açık Hava Basıncı ve Torricelli Deneyi',
    '3. Ünite: Akışkanlar - Sıvıların Kaldırma Kuvveti ve Yüzme-Batma Koşulları',
    '3. Ünite: Akışkanlar - Bernoulli İlkesi ve Akışkanlar Dinamiği',
    '4. Ünite: Enerji - İç Enerji, Sıcaklık ve Isı Kavramları',
    '4. Ünite: Enerji - Öz Isı, Isı Sığası ve Sıcaklık Değişimi Hesaplamaları',
    '4. Ünite: Enerji - Hâl Değişimi, Isıl Denge ve Isı Aktarım Yolları (İletim, Konveksiyon, Işıma)',
  ],

  // 3. KİMYA (Türkiye Yüzyılı Maarif Modeli - 3 Ana Tema)
  kimya: [
    '1. Tema: Etkileşim - Kimya Hayattır: Günlük Yaşamda Kimya ve Kariyer Alanları',
    '1. Tema: Etkileşim - Kimya Laboratuvarında Güvenlik Kuralları ve Piktogramlar',
    '1. Tema: Etkileşim - Bohr ve Modern Atom Teorisi, Atom Orbitalleri',
    '1. Tema: Etkileşim - Elektron Dizilimleri ve Periyodik Tabloda Yer Bulma',
    '1. Tema: Etkileşim - Periyodik Özelliklerin Değişimi (Yarıçap, İyonlaşma Enerjisi, Elektronegatiflik)',
    '2. Tema: Çeşitlilik - Kimyasal Türler: Atom, Molekül, İyon ve Radikal',
    '2. Tema: Çeşitlilik - Güçlü Etkileşimler: İyonik, Kovalent ve Metalik Bağ',
    '2. Tema: Çeşitlilik - Lewis Nokta Yapısı ve Molekül Polarlığı/Apolarlığı',
    '2. Tema: Çeşitlilik - Zayıf Etkileşimler: Dipol-Dipol, London Kuvvetleri ve Hidrojen Bağı',
    '2. Tema: Çeşitlilik - Maddenin Halleri: Katılar (Kristal ve Amorf) ve Sıvılar (Viskozite, Buhar Basıncı)',
    '3. Tema: Sürdürülebilirlik - Metal Nanoparçacıklar ve Nanoteknolojinin Kimyadaki Rolü',
    '3. Tema: Sürdürülebilirlik - Yeşil Kimya ve Ekolojik Atık Önleme İlkeleri',
  ],

  // 4. BİYOLOJİ (Türkiye Yüzyılı Maarif Modeli - 2 Ana Tema)
  biyoloji: [
    '1. Tema: Yaşam - Yaşam Bilimi Biyoloji, Bilimsel Yöntem ve Bilim Etiği',
    '1. Tema: Yaşam - Canlıların Ortak Özellikleri (Metabolizma, Homeostazi, Adaptasyon vb.)',
    '1. Tema: Yaşam - İnorganik Bileşikler (Su, Mineraller, Asit-Baz-Tuz)',
    '1. Tema: Yaşam - Organik Bileşikler: Karbonhidratlar ve Lipitler',
    '1. Tema: Yaşam - Organik Bileşikler: Proteinler, Peptit Bağı ve Denatürasyon',
    '1. Tema: Yaşam - Biyolojik Katalizörler: Enzimlerin Yapısı ve Çalışma Hızını Etkileyen Faktörler',
    '1. Tema: Yaşam - Nükleik Asitler (DNA ve RNA), Vitaminler ve ATP Enerjisi',
    '2. Tema: Organizasyon - Hücrenin Yapısı: Prokaryot ve Ökaryot Hücre Karşılaştırması',
    '2. Tema: Organizasyon - Hücre Zarı ve Madde Geçişleri (Difüzyon, Osmoz, Aktif Taşıma, Endositoz)',
    '2. Tema: Organizasyon - Hücre Organelleri ve Görevleri',
    '2. Tema: Organizasyon - Biyolojik Sınıflandırma ve 3 Üst Âlem (Bakteri, Arke, Ökaryot) Taksonomisi',
  ],

  // 5. TÜRK DİLİ VE EDEBİYATI (Türkiye Yüzyılı Maarif Modeli - 4 Ana Tema)
  edebiyat: [
    '1. Tema: Sözün İnceliği - Edebiyatın Doğası, Estetik Değer ve Güzel Sanatlarla İlişkisi',
    '1. Tema: Sözün İnceliği - Şiir Sanatı, İmge, Çağrışım ve Ahenk Unsurları',
    '1. Tema: Sözün İnceliği - Deneme Türü ve Edebî Metin Tahlili',
    '1. Tema: Sözün İnceliği - Mülakat ve Sözlü İletişim Becerileri',
    '2. Tema: Anlam Arayışı - Metinde Konu, Tema, Ana Fikir ve İleti Tespiti',
    '2. Tema: Anlam Arayışı - Hikâye Türü Tahlili: Olay ve Durum Hikâyeleri',
    '2. Tema: Anlam Arayışı - Anı (Hatıra) Türü ve Şiir Dinleme Analizi',
    '2. Tema: Anlam Arayışı - Millî Kültür Metni: İstiklal Marşı Tahlili',
    '3. Tema: Anlamın Yapı Taşları - Hikâyede Olay Örgüsü, Kişi, Zaman ve Mekân Analizi',
    '3. Tema: Anlamın Yapı Taşları - Gezi Yazısı ve Seyahat Edebiyatı',
    '3. Tema: Anlamın Yapı Taşları - Belgesel İnceleme ve Görsel/İşitsel Metin Tahlili',
    '4. Tema: Dilin Zenginliği - Üslup Özellikleri ve Edebî Sanatlar',
    '4. Tema: Dilin Zenginliği - Roman Türü, Yapı Unsurları ve Roman Tahlili',
    '4. Tema: Dilin Zenginliği - Eleştiri (Tenkit) Kültürü ve Tiyatro Metinleri',
    'Dil Bilgisi: İsimler, Sıfatlar, Zamirler ve Zarfların Metindeki İşlevleri',
    'Dil Bilgisi: Noktalama İşaretleri ve Yazım Kuralları',
  ],

  // 6. TARİH (Türkiye Yüzyılı Maarif Modeli - 3 Ana Ünite)
  tarih: [
    '1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarih Öğrenmenin Faydaları ve Tarih Bilinci',
    '1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarihin Doğası ve Tarihsel Bilginin Üretim Süreci',
    '1. Ünite: Geçmişin İnşa Sürecinde Tarih - Tarih Araştırmalarında Dijitalleşme ve Yapay Zekâ',
    '2. Ünite: Eski Çağ Medeniyetleri - Tarım Devrimi, Yerleşik Yaşam ve Şehir Devletleri',
    '2. Ünite: Eski Çağ Medeniyetleri - Eski Çağda Yönetim, Ordu Teşkilatı ve Yazılı Hukuk',
    '2. Ünite: Eski Çağ Medeniyetleri - Eski Çağda İnançlar, Bilim, Kültür ve Sanat Havzaları',
    '2. Ünite: Eski Çağ Medeniyetleri - Türklerde Konargöçer Yaşam ve Bozkır Kültürü',
    '3. Ünite: Orta Çağ Medeniyetleri - Kitlesel Göçler ve Orta Çağ Siyasi Teşkilatları',
    '3. Ünite: Orta Çağ Medeniyetleri - Orta Çağ Ticaret Yolları (İpek, Baharat, Kürk Yolu)',
    '3. Ünite: Orta Çağ Medeniyetleri - Medeniyet Havzalarında Bilim, Kültür ve Sanat',
  ],

  // 7. COĞRAFYA (Türkiye Yüzyılı Maarif Modeli - 7 Ana Ünite)
  cografya: [
    '1. Ünite: Coğrafyanın Doğası - Coğrafya Biliminin Konusu, İlkeleri ve Bölümleri',
    '2. Ünite: Mekânsal Bilgi Teknolojileri - Harita ve Konum Okuryazarlığı, Projeksiyon Türleri',
    '2. Ünite: Mekânsal Bilgi Teknolojileri - Coğrafi Bilgi Sistemleri (CBS) ve Ölçek Hesaplamaları',
    '3. Ünite: Doğal Sistemler ve Süreçler - Hava Durumu, İklim Sistemi ve İklim Elemanları',
    '3. Ünite: Doğal Sistemler ve Süreçler - Yeryüzündeki Büyük İklim Tipleri ve Küresel İklim Değişikliği',
    '4. Ünite: Beşerî Sistemler ve Süreçler - Nüfusun Değişimi, Dağılışı ve Nüfus Piramitleri',
    '4. Ünite: Beşerî Sistemler ve Süreçler - Göç Hareketleri ve Demografik Dönüşüm Süreci',
    '5. Ünite: Ekonomik Faaliyetler ve Etkileri - Ekonomik Faaliyetleri Etkileyen Coğrafi Faktörler',
    '6. Ünite: Afetler ve Sürdürülebilir Çevre - Tehlike, Risk ve Bütüncül Afet Yönetimi',
    '7. Ünite: Bölgeler, Ülkeler ve Küresel Bağlantılar - Bölge Belirleme Kriterleri ve Küresel Ağlar',
  ],

  // 8. İNGİLİZCE (Türkiye Yüzyılı Maarif Modeli - 8 Temel Tema)
  ingilizce: [
    'Theme 1: School Life - Students from Different Countries, Nationalities & Capitals',
    'Theme 1: School Life - School Activities, Daily Routines & National Celebrations',
    'Theme 2: Classroom Life - Classmates, Friendships & Study Habits',
    'Theme 2: Classroom Life - Classroom Interactions, Dialogues & Instructions',
    'Theme 3: Personal Life - Physical Appearance Descriptions (Height, Build, Features)',
    'Theme 3: Personal Life - Personality Traits & Character Structures',
    'Theme 4: Family Life - Family Members, Occupations & Work Environments',
    'Theme 4: Family Life - Daily Work Routines & Responsibilities',
    'Theme 5: Life in the House & Neighbourhood - House Types, Rooms & Furniture',
    'Theme 5: Life in the House & Neighbourhood - Neighbourhood Interactions & Community Life',
    'Theme 6: Life in the City & Country - City Life vs Rural Life Comparison',
    'Theme 6: Life in the City & Country - Local and International Food Culture & Food Festivals',
    'Theme 7: Life in the World & Nature - Natural Habitats & Endangered Species',
    'Theme 7: Life in the World & Nature - Wildlife Protection & Environmental Responsibility',
    'Theme 8: Life in the Universe & Future - Movie Genres & Futuristic Concepts',
    'Theme 8: Life in the Universe & Future - Technology, Artificial Intelligence & Space Exploration',
  ],

  // 9. DİN KÜLTÜRÜ VE AHLAK BİLGİSİ (Türkiye Yüzyılı Maarif Modeli - 4 Ana Ünite)
  din: [
    '1. Ünite: Allah-İnsan İlişkisi - İnsanın Yaratılışı ve Özellikleri',
    '1. Ünite: Allah-İnsan İlişkisi - Doğruyu Arayan Bir Varlık Olarak İnsan, Vahiy ve Akıl',
    '1. Ünite: Allah-İnsan İlişkisi - İbadet ve Dua Eden Bir Varlık Olarak İnsan (Rum Suresi 17-27)',
    '2. Ünite: İslam\'da İnanç Esasları - İman ve İmanın Mahiyeti, İnanç Esaslarının Özellikleri',
    '2. Ünite: İslam\'da İnanç Esasları - İmanın Bireye ve Topluma Kazandırdığı Değerler',
    '3. Ünite: İslam\'da İbadetler - İbadetin Kapsamı, Çeşitleri ve Temel İlkeleri',
    '3. Ünite: İslam\'da İbadetler - İnsan Hayatında İbadetin Anlamı ve Ahlakla İlişkisi',
    '4. Ünite: Ahlaki Değerler ve Gençlik - Temel Ahlaki Erdemler (Adalet, Hikmet, İffet, Şecaat)',
    '4. Ünite: Ahlaki Değerler ve Gençlik - Asr-ı Saadette Genç Sahabiler ve Rol Modeller',
  ],
} as const;

export interface Lise1Unit {
  id: string;
  unitNumber: number;
  title: string;
  semester: 1 | 2;
  outcomes: string[];
  mebExamFocus: string; // MEB Ortak Yazılı Sınavı Konu Odakları
}

export interface Lise1CourseDetailedMetadata {
  key: Lise1CourseKey;
  name: string;
  weeklyHours: number;
  passingThreshold: number; // 70 for edebiyat, 50 for others
  isBarajDersi: boolean;
  annualExamCount: number; // 4 (1. Dönem 1. ve 2. Yazılı, 2. Dönem 1. ve 2. Yazılı)
  units: Lise1Unit[];
  mebScenarioSummary: {
    term1Exam1: string;
    term1Exam2: string; // Ülke Geneli Ortak Sınav
    term2Exam1: string;
    term2Exam2: string; // İl / Ülke Geneli Ortak Sınav
  };
}

export const LISE1_DETAILED_CURRICULUM: Record<Lise1CourseKey, Lise1CourseDetailedMetadata> = {
  edebiyat: {
    key: 'edebiyat',
    name: 'Türk Dili ve Edebiyatı',
    weeklyHours: 5,
    passingThreshold: 70, // MEB Ortaöğretim Kurumları Yönetmeliği Baraj Dersi
    isBarajDersi: true,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Şiir bilgisi, ahenk unsurları, edebiyatın güzel sanatlarla ilişkisi, hikâye türü, isimler ve sıfatlar.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Hikâye unsurları, anı türü, zamirler, yazım ve noktalama kuralları.',
      term2Exam1: 'Gezi yazısı, roman yapısı ve tahlili, zarflar, edebî sanatlar (teşbih, teşhis vb.).',
      term2Exam2: 'Tiyatro metinleri, eleştiri kültürü, sözcük türlerinin tamamı ve genel metin analizi.',
    },
    units: [
      {
        id: 'edb-u1',
        unitNumber: 1,
        title: 'Sözün İnceliği (Edebiyat, Şiir ve Deneme)',
        semester: 1,
        outcomes: [
          'Edebiyatın doğasını ve güzel sanatlarla ilişkisini açıklar.',
          'Şiirde ahenk unsurlarını, kafiye-redif ve imge örgüsünü tespit eder.',
          'Deneme türü metinlerde yazarın öznel bakış açısını tahlil eder.',
          'Mülakat ve sözlü iletişim kurallarını uygular.',
        ],
        mebExamFocus: 'Şiirde nazım birimi, ölçü, uyak düzeni ve söz sanatları soruları.',
      },
      {
        id: 'edb-u2',
        unitNumber: 2,
        title: 'Anlam Arayışı (Hikâye, Anı ve İstiklal Marşı)',
        semester: 1,
        outcomes: [
          'Olay ve durum hikâyelerinin ayırt edici niteliklerini karşılaştırır.',
          'Hikâyede tema, ana fikir ve örtük anlamları çözümler.',
          'Anı (hatıra) türünün tarihsel ve edebi işlevini değerlendirir.',
          'İstiklal Marşı metnini edebi ve estetik açıdan tahlil eder.',
        ],
        mebExamFocus: 'Hikâyede anlatıcı bakış açısı (hâkim, kahraman, gözlemci) ve sözcük türleri.',
      },
      {
        id: 'edb-u3',
        unitNumber: 3,
        title: 'Anlamın Yapı Taşları (Hikâye Yapısı ve Gezi Yazısı)',
        semester: 2,
        outcomes: [
          'Hikâyede olay örgüsü, kişi, zaman ve mekân unsurlarını çözümler.',
          'Gezi yazısı türünün anlatım özelliklerini ve gözlem gücünü inceler.',
          'Belgesel ve görsel/işitsel metinleri eleştirel gözle tahlil eder.',
        ],
        mebExamFocus: 'Gezi yazısı özellikleri ve zarfların (durum, zaman, miktar) tespiti.',
      },
      {
        id: 'edb-u4',
        unitNumber: 4,
        title: 'Dilin Zenginliği (Roman, Tiyatro ve Eleştiri)',
        semester: 2,
        outcomes: [
          'Roman türünün yapı unsurlarını ve anlatım tekniklerini çözümler.',
          'Tiyatro metinlerindeki dramatik örgü ve çatışmayı kavrar.',
          'Eleştiri (tenkit) metinlerini nesnel ve öznel ölçütler bağlamında irdeler.',
        ],
        mebExamFocus: 'Roman ve tiyatro karşılaştırması, edebi sanatlar ve yazım kuralları.',
      },
    ],
  },

  matematik: {
    key: 'matematik',
    name: 'Matematik (9. Sınıf)',
    weeklyHours: 6,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Mantık önermeleri, sayı kümeleri, gerçek sayı aralıkları, üslü ve köklü ifadeler.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Birinci dereceden denklem ve eşitsizlikler, mutlak değer, doğrusal fonksiyonlar.',
      term2Exam1: 'Üçgende açılar, açı-kenar bağıntıları, üçgen eşitsizliği ve üçgende eşlik-benzerlik.',
      term2Exam2: 'Tales, Pisagor ve Öklid bağıntıları, istatistiksel yayılım ölçüleri ve deneysel olasılık.',
    },
    units: [
      {
        id: 'mat-u1',
        unitNumber: 1,
        title: 'Sayılar (Gerçek Sayılar, Üslü-Köklü İfadeler ve Aralıklar)',
        semester: 1,
        outcomes: [
          'Gerçek sayıların üslü ve köklü gösterimlerini işlem özellikleriyle kullanır.',
          'Sayı doğrusu üzerinde gerçek sayı aralıklarını gösterir ve kesişim/birleşim işlemlerini yapar.',
          'İki kare farkı ve tam kare özdeşliklerini cebirsel ve geometrik olarak modeller.',
        ],
        mebExamFocus: 'Köklü sayılarda sıralama, paydayı rasyonel yapma ve aralık gösterimi.',
      },
      {
        id: 'mat-u2',
        unitNumber: 2,
        title: 'Nicelikler ve Değişimler (Doğrusal Fonksiyonlar ve Denklemler)',
        semester: 1,
        outcomes: [
          'Doğrusal fonksiyonların kuralını bulur ve grafiklerini çizer.',
          'Mutlak değer içeren doğrusal denklem ve eşitsizlikleri çözer.',
          'Gerçek hayat problemlerini birinci dereceden denklem ve eşitsizlik modelleriyle çözer.',
        ],
        mebExamFocus: 'Mutlak değerli eşitsizliklerin çözüm kümesi ve grafik üzerinden eğim yorumlama.',
      },
      {
        id: 'mat-u3',
        unitNumber: 3,
        title: 'Algoritma ve Bilişim (Mantık ve Akış Şemaları)',
        semester: 1,
        outcomes: [
          'Önermeleri ve mantık bağlaçlarını (ve, veya, ise, ancak ve ancak) doğruluk tablosuyla modeller.',
          'Açık önermeleri ve niceleyicileri (her, bazı) matematiksel ifadelerde kullanır.',
          'Algoritmik akış şemalarını adım adım analiz eder ve problemi kodlar.',
        ],
        mebExamFocus: 'Koşullu önermenin karşıtı, tersi ve karşıt tersi; totoloji ve çelişki kuralları.',
      },
      {
        id: 'mat-u4',
        unitNumber: 4,
        title: 'Geometrik Şekiller (Üçgende Açı ve Kenar Bağıntıları)',
        semester: 2,
        outcomes: [
          'Üçgenin iç ve dış açı özellikleri arasındaki bağıntıları ispatlar.',
          'Üçgen eşitsizliği kuralını uygulayarak kenar uzunluk aralıklarını belirler.',
          'Büyük açı karşısında büyük kenar bulunur kuralını çoklu geometrik şekillerde çözer.',
        ],
        mebExamFocus: 'İç açılar toplamı, dış açı teoremi ve üçgen eşitsizliği sınır değerleri.',
      },
      {
        id: 'mat-u5',
        unitNumber: 5,
        title: 'Eşlik ve Benzerlik (Dönüşümler, Pisagor ve Öklid)',
        semester: 2,
        outcomes: [
          'Yansıma, öteleme ve dönme dönüşümlerini koordinat sisteminde uygular.',
          'Üçgenlerde Kenar-Açı-Kenar, Açı-Kenar-Açı ve Kenar-Kenar-Kenar benzerlik koşullarını kullanır.',
          'Tales, Pisagor ve Öklid bağıntılarını geometrik ve pratik problemlerde uygular.',
        ],
        mebExamFocus: 'Öklid yükseklik teoremi (h²=p·k) ve benzerlik oranı karesinin alan oranına eşitliği.',
      },
      {
        id: 'mat-u6',
        unitNumber: 6,
        title: 'İstatistik ve Veriden Olasılığa',
        semester: 2,
        outcomes: [
          'Merkezi eğilim (ortalama, medyan, mod) ve yayılım (standart sapma, kutu grafiği) ölçülerini hesaplar.',
          'Histogram grafiği oluşturur ve grup genişliğini belirler.',
          'Ayrık ve ayrık olmayan olaylarda deneysel ve teorik olasılık hesaplamaları yapar.',
        ],
        mebExamFocus: 'Aritmetik ortalama ile medyan farkı ve birleşik olayların teorik olasılığı.',
      },
    ],
  },

  fizik: {
    key: 'fizik',
    name: 'Fizik (9. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Fizik bilimine giriş, büyüklüklerin sınıflandırılması, skaler ve vektörel büyüklükler.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Bir boyutta sabit hızlı hareket, konum-zaman ve hız-zaman grafikleri, temel kuvvetler.',
      term2Exam1: 'Katı ve sıvı basıncı, açık hava basıncı (Torricelli) ve sıvıların kaldırma kuvveti.',
      term2Exam2: 'İç enerji, sıcaklık, ısı, öz ısı, hâl değişimi ve ısıl denge problemleri.',
    },
    units: [
      {
        id: 'fiz-u1',
        unitNumber: 1,
        title: 'Fizik Bilimi ve Kariyer Keşfi',
        semester: 1,
        outcomes: [
          'Fiziğin doğasını, önemini ve alt dallarını (mekanik, termodinamik, optik vb.) açıklar.',
          'Fizik bilimine yön veren bilim insanlarını ve geleceğin mesleklerini tanır.',
        ],
        mebExamFocus: 'Fiziğin alt dalları ile teknolojik uygulamaların eşleştirilmesi.',
      },
      {
        id: 'fiz-u2',
        unitNumber: 2,
        title: 'Kuvvet ve Hareket',
        semester: 1,
        outcomes: [
          'Temel-türetilmiş ve skaler-vektörel büyüklükleri ayırt eder.',
          'Kartezyen koordinat sisteminde iki boyutlu vektörlerin bileşkesini bulur.',
          'Doğadaki dört temel kuvveti (kütle çekim, elektromanyetik, güçlü ve zayıf nükleer) karşılaştırır.',
          'Konum, yer değiştirme, sürat ve hız kavramlarını grafiklerle yorumlar.',
        ],
        mebExamFocus: 'Konum-zaman grafiğinin eğiminden hız bulma, vektör bileşkesi hesaplama.',
      },
      {
        id: 'fiz-u3',
        unitNumber: 3,
        title: 'Akışkanlar (Basınç ve Kaldırma Kuvveti)',
        semester: 2,
        outcomes: [
          'Katı, sıvı ve gazlarda basıncı etkileyen değişkenleri analiz eder.',
          'Pascal ilkesi ve Torricelli açık hava basıncı deneyini günlük hayatla ilişkilendirir.',
          'Arşimet prensibini kullanarak sıvı içindeki cisimlerin yüzme, askıda kalma ve batma durumlarını hesaplar.',
          'Bernoulli ilkesini akışkanlar mekaniğinde yorumlar.',
        ],
        mebExamFocus: 'Sıvı basıncı formülü (P=h·d·g) ve kaldırma kuvveti (Fk=Vbatan·dsıvı·g) bağıntıları.',
      },
      {
        id: 'fiz-u4',
        unitNumber: 4,
        title: 'Enerji (Isı, Sıcaklık ve Termodinamik)',
        semester: 2,
        outcomes: [
          'İç enerji, sıcaklık ve ısı kavramlarını termodinamik temelde ayırt eder.',
          'Öz ısı ve ısı sığası kavramlarını Q = m·c·ΔT bağıntısıyla açıklar.',
          'Maddelerin hâl değişim süreçlerini (erime, buharlaşma) ve ısıl dengeyi modeller.',
          'Isı aktarım yollarını (iletim, konveksiyon, ışıma) günlük hayattaki yalıtım sistemleriyle ilişkilendirir.',
        ],
        mebExamFocus: 'Isıl dengede son sıcaklık hesabı ve hâl değişimi sıcaklık-zaman grafikleri.',
      },
    ],
  },

  kimya: {
    key: 'kimya',
    name: 'Kimya (9. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Kimya bilimi, laboratuvar güvenlik piktogramları, simyadan kimyaya geçiş, atom modelleri.',
      term1Exam2: 'Bohr ve Modern atom teorisi, elektron dizilimi, periyodik sistem ve periyodik özellikler.',
      term2Exam1: 'Kimyasal türler (atom, molekül, iyon), güçlü etkileşimler (iyonik, kovalent, metalik bağ), Lewis yapıları.',
      term2Exam2: 'Zayıf etkileşimler (dipol-dipol, London, hidrojen bağı), maddenin halleri ve yeşil kimya.',
    },
    units: [
      {
        id: 'kim-u1',
        unitNumber: 1,
        title: 'Etkileşim (Kimya Bilimi ve Atomun Yapısı)',
        semester: 1,
        outcomes: [
          'Kimya disiplinlerini (analitik, biyokimya vb.) ve laboratuvar güvenlik kurallarını kavrar.',
          'Dalton, Thomson, Rutherford, Bohr atom teorilerini ve eksikliklerini karşılaştırır.',
          'Elektron dizilimini yazar ve periyodik tabloda grup/periyot tayini yapar.',
          'Periyodik özelliklerin (atom yarıçapı, iyonlaşma enerjisi, elektronegatiflik) periyot ve gruptaki değişimini açıklar.',
        ],
        mebExamFocus: 'İyonlaşma enerjisi sıçramalarından değerlik elektronu bulma ve periyodik eğilimler.',
      },
      {
        id: 'kim-u2',
        unitNumber: 2,
        title: 'Çeşitlilik (Kimyasal Türler Arası Etkileşimler)',
        semester: 2,
        outcomes: [
          'Kimyasal türleri (atom, molekül, iyon, radikal) sınıflandırır.',
          'İyonik bağın oluşumunu ve Lewis yapısını gösterir.',
          'Kovalent bağda apolar ve polar kovalent bağı, molekül polarlığını analiz eder.',
          'Zayıf etkileşimleri (Van der Waals ve Hidrojen bağı) kaynama noktası farklılıklarıyla ilişkilendirir.',
          'Katı türlerini (kristal ve amorf) ayırt eder; sıvılarda viskoziteyi açıklar.',
        ],
        mebExamFocus: 'Lewis elektron nokta gösterimi ve moleküller arası hidrojen bağının kaynama noktasına etkisi.',
      },
      {
        id: 'kim-u3',
        unitNumber: 3,
        title: 'Sürdürülebilirlik (Nanoteknoloji ve Yeşil Kimya)',
        semester: 2,
        outcomes: [
          'Nanoteknoloji ve metalik nanoparçacıkların kimyadaki rolünü açıklar.',
          'Yeşil kimyanın 12 ilkesini çevre kirliliğini önleme bağlamında değerlendirir.',
        ],
        mebExamFocus: 'Atık azaltımı, yenilenebilir hammadde kullanımı ve ekolojik kimya prensipleri.',
      },
    ],
  },

  biyoloji: {
    key: 'biyoloji',
    name: 'Biyoloji (9. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Canlıların ortak özellikleri, inorganik bileşikler (su, mineraller), organik bileşiklere giriş (karbonhidratlar ve lipitler).',
      term1Exam2: 'Proteinler, peptit bağı, enzimlerin yapısı ve reaksiyon hızını etkileyen faktörler, nükleik asitler ve ATP.',
      term2Exam1: 'Hücre teorisi, prokaryot ve ökaryot hücre yapısı, hücre zarı ve madde geçişleri (difüzyon, osmoz, aktif taşıma).',
      term2Exam2: 'Hücre organelleri, organeller arası iş birliği, biyolojik sınıflandırma ve 3 üst âlem taksonomisi.',
    },
    units: [
      {
        id: 'biy-u1',
        unitNumber: 1,
        title: 'Yaşam (Canlıların Temel Bileşenleri ve Biyomoleküller)',
        semester: 1,
        outcomes: [
          'Canlıların 12 ortak özelliğini (hücresel yapı, beslenme, hücresel solunum, homeostazi vb.) açıklar.',
          'Suyun canlılar için önemini kohezyon, adhezyon ve öz ısı özellikleri üzerinden analiz eder.',
          'Karbonhidrat, yağ ve proteinlerin yapı taşlarını ve hücresel görevlerini karşılaştırır.',
          'Enzimlerin substrata özgül yapısını ve pH, sıcaklık, substrat yüzeyi etkilerini grafiklerle yorumlar.',
          'DNA, RNA ve ATP moleküllerinin yapısını ve işlevini açıklar.',
        ],
        mebExamFocus: 'Enzim aktivitesi grafik yorumlama ve organik moleküllerin monomer-polimer yapısı.',
      },
      {
        id: 'biy-u2',
        unitNumber: 2,
        title: 'Organizasyon (Hücre Yapısı ve Biyolojik Çeşitlilik)',
        semester: 2,
        outcomes: [
          'Prokaryot (bakteri, arke) ve ökaryot (bitki, hayvan, mantar) hücreleri yapısal olarak kıyaslar.',
          'Hücre zarından madde geçiş mekanizmalarını (pasif taşıma, osmoz, turgor/plazmoliz, aktif taşıma, endositoz/eksositoz) açıklar.',
          'Zarlı ve zarsız organellerin (ribozom, mitokondri, kloroplast, golgi, ER) işlevlerini ilişkilendirir.',
          'Canlıların bilimsel sınıflandırma basamaklarını (Tür, Cins, Familya...) ve 3 üst âlem sistemini kavrar.',
        ],
        mebExamFocus: 'Hücre zarından geçiş deneyleri (hipertonik, izotonik, hipotonik ortam) ve organel işlevleri.',
      },
    ],
  },

  tarih: {
    key: 'tarih',
    name: 'Tarih (9. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Tarih biliminin konusu, yöntemi, kaynak türleri, zaman ve takvim sistemleri.',
      term1Exam2: 'Eski Çağ medeniyetleri (Mezopotamya, Mısır, Anadolu), ilk yazılı kanunlar, Türklerde konargöçer yaşam.',
      term2Exam1: 'Orta Çağ siyasi teşkilatları, feodalite, Kavimler Göçü, Orta Çağ ticaret yolları (İpek ve Baharat Yolu).',
      term2Exam2: 'Orta Çağ medeniyet havzalarında bilim ve sanat, İslamiyet öncesi Türk devlet teşkilatı ve askeri yapı.',
    },
    units: [
      {
        id: 'tar-u1',
        unitNumber: 1,
        title: 'Geçmişin İnşa Sürecinde Tarih',
        semester: 1,
        outcomes: [
          'Tarih öğrenmenin bireysel ve toplumsal faydalarını tarih bilinciyle ilişkilendirir.',
          'Birinci elden ve ikinci elden kaynakları güvenilirlik bakımından tahlil eder.',
          'Tarih araştırmalarında dijital teknolojilerin ve yapay zekânın kullanımını değerlendirir.',
          'Takvim sistemlerinin (Güneş ve Ay yılı) ortaya çıkışını ve Türklerin kullandığı takvimleri kavrar.',
        ],
        mebExamFocus: 'Kaynak tenkidi basamakları ve Türklerin kullandığı 5 takvimin özellikleri.',
      },
      {
        id: 'tar-u2',
        unitNumber: 2,
        title: 'Eski Çağ Medeniyetleri',
        semester: 1,
        outcomes: [
          'Tarım devrimi, yerleşik hayata geçiş ve ilk şehir devletlerinin doğuşunu açıklar.',
          'Mezopotamya, Mısır ve Anadolu medeniyetlerinin hukuk, yazı ve bilimsel miraslarını karşılaştırır.',
          'Eski Türklerde konargöçer bozkır kültürünün toplumsal yapı ve ordu teşkilatına etkilerini irdeler.',
        ],
        mebExamFocus: 'Hammurabi ve Urugakina kanunları farkı; Türklerde kut anlayışı ve kurultay.',
      },
      {
        id: 'tar-u3',
        unitNumber: 3,
        title: 'Orta Çağ Medeniyetleri',
        semester: 2,
        outcomes: [
          'Kavimler Göçü\'nün Avrupa\'daki siyasi ve feodal yapıya etkilerini açıklar.',
          'İpek, Baharat ve Kürk Yollarının devletler arası siyasi ve ekonomik mücadelelerdeki yerini kavrar.',
          'Orta Çağ\'da İslam, Çin, Hint ve Avrupa medeniyet havzalarındaki bilim ve felsefe hareketlerini karşılaştırır.',
        ],
        mebExamFocus: 'Feodalite düzeni, ticaret yolları denetimi ve İslam medeniyetinin altın çağı.',
      },
    ],
  },

  cografya: {
    key: 'cografya',
    name: 'Coğrafya (9. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Coğrafyanın konusu ve ilkeleri, insan-doğa etkileşimi, coğrafi koordinat sistemi, harita ölçekleri.',
      term1Exam2: 'İzohips haritaları okuma, yer şekillerini tanıma, atmosferin katmanları, hava durumu ve iklim, sıcaklık.',
      term2Exam1: 'Basınç ve rüzgârlar, nem ve yağış tipleri, dünyadaki büyük iklim tipleri (makroklima).',
      term2Exam2: 'Türkiye\'nin iklim özellikleri, nüfusun dağılışı, göç hareketleri ve afet yönetimi.',
    },
    units: [
      {
        id: 'cog-u1',
        unitNumber: 1,
        title: 'Coğrafyanın Doğası ve Mekânsal Bilgi Teknolojileri',
        semester: 1,
        outcomes: [
          'Coğrafya biliminin bölümlerini (fiziki ve beşerî) ve ilkelerini (dağılış, nedensellik, ilgi) açıklar.',
          'Harita projeksiyonlarını (silindirik, konik, düzlem) ve bozulma oranlarını kavrar.',
          'Ölçek türlerini kullanarak haritada uzunluk ve alan hesaplamaları yapar.',
          'İzohips yöntemiyle çizilmiş haritalarda vadi, sırt, tepe, boyun ve falez gibi yer şekillerini gösterir.',
        ],
        mebExamFocus: 'İzohips aralıkları yorumlama ve çizgi ölçek-kesir ölçek çevrimleri.',
      },
      {
        id: 'cog-u2',
        unitNumber: 2,
        title: 'Doğal Sistemler (İklim Elemanları ve İklim Tipleri)',
        semester: 1,
        outcomes: [
          'Atmosferin katmanlarını ve yaşam için önemini açıklar.',
          'Sıcaklığın yeryüzündeki dağılışını etkileyen faktörleri (güneş ışınlarının düşme açısı, enlem, bakı vb.) analiz eder.',
          'Basınç merkezlerini ve rüzgâr türlerini (sürekli, devirli, yerel rüzgârlar) açıklar.',
          'Yoğuşma ve yağış türlerini oluşum biçimlerine göre sınıflandırır.',
          'Büyük iklim tiplerini (Ekvatoral, Akdeniz, Muson, Tundra vb.) sıcaklık ve yağış grafiklerinden tanır.',
        ],
        mebExamFocus: 'Sıcaklık ve yağış grafiği üzerinden iklim tipi tespiti ve Türkiye iklimi.',
      },
      {
        id: 'cog-u3',
        unitNumber: 3,
        title: 'Beşerî Sistemler, Afetler ve Çevre',
        semester: 2,
        outcomes: [
          'Dünyada ve Türkiye\'de nüfusun alansal dağılışını etkileyen doğal ve beşerî faktörleri analiz eder.',
          'Nüfus piramitlerini yaş ve cinsiyet yapısına göre yorumlar.',
          'Göç hareketlerinin nedenlerini ve sonuçlarını değerlendirir.',
          'Doğal afetleri oluşum türlerine göre sınıflandırır ve afet öncesi-sırası-sonrası yapılması gerekenleri kavrar.',
        ],
        mebExamFocus: 'Nüfus piramidi tahlili ve deprem/sel afetlerinde risk azaltma yöntemleri.',
      },
    ],
  },

  ingilizce: {
    key: 'ingilizce',
    name: 'Birinci Yabancı Dil (İngilizce)',
    weeklyHours: 4,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Themes 1 & 2: School and classroom life, nationalities, daily routines, present simple tense, classroom instructions.',
      term1Exam2: 'Themes 3 & 4: Physical appearance & personality adjectives, family relationships, occupations, talking about hobbies.',
      term2Exam1: 'Themes 5 & 6: Rooms, furniture, neighbourhood interactions, city vs countryside life comparison, food cultures.',
      term2Exam2: 'Themes 7 & 8: Wildlife habitats, endangered animals, environmental solutions, technology and future predictions (will/going to).',
    },
    units: [
      {
        id: 'ing-u1',
        unitNumber: 1,
        title: 'School & Classroom Life (Themes 1 & 2)',
        semester: 1,
        outcomes: [
          'Introduces oneself, peers and international students using target vocabulary.',
          'Describes daily school routines using Simple Present Tense and frequency adverbs.',
          'Follows and gives classroom rules and instructions effectively.',
        ],
        mebExamFocus: 'Present Simple vs Present Continuous, frequency adverbs and daily dialogues.',
      },
      {
        id: 'ing-u2',
        unitNumber: 2,
        title: 'Personal & Family Life (Themes 3 & 4)',
        semester: 1,
        outcomes: [
          'Describes physical appearances and character traits of individuals with rich adjectives.',
          'Expresses family relationships, occupations and responsibilities at work.',
          'Talks about personal hobbies, abilities (can/can\'t) and preferences.',
        ],
        mebExamFocus: 'Personality/appearance adjectives (generous, stubbborn, wavy hair) and occupation matching.',
      },
      {
        id: 'ing-u3',
        unitNumber: 3,
        title: 'Living Spaces & City Life (Themes 5 & 6)',
        semester: 2,
        outcomes: [
          'Describes house types, rooms, furniture and prepositions of place.',
          'Compares city life with country life using comparative and superlative structures.',
          'Discusses local and international food cultures and ordering food in a restaurant.',
        ],
        mebExamFocus: 'Comparative forms (cheaper, more crowded) and prepositions of place.',
      },
      {
        id: 'ing-u4',
        unitNumber: 4,
        title: 'Nature & Future Life (Themes 7 & 8)',
        semester: 2,
        outcomes: [
          'Describes natural habitats, wildlife and causes of endangered species.',
          'Offers practical environmental solutions to protect nature and save energy.',
          'Makes predictions about the future regarding technology, artificial intelligence and space.',
        ],
        mebExamFocus: 'Future tenses (will / be going to), modal verbs (must/should) and environmental vocabulary.',
      },
    ],
  },

  din: {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: '1. Ünite: İnsanın özellikleri, dinin insan hayatındaki yeri, fıtrat kavramı, vahiy ve akıl ilişkisi.',
      term1Exam2: '1. ve 2. Ünite: Dua ve ibadet eden varlık olarak insan, İslam inanç esasları, imanın bireysel ve toplumsal kazanımları.',
      term2Exam1: '3. Ünite: İslam\'da ibadetlerin mahiyeti, ibadetlerin temel ilkeleri (ihlas, sünnete uygunluk) ve ahlakla ilişkisi.',
      term2Exam2: '4. Ünite: Temel ahlaki erdemler (adalet, hikmet, iffet, şecaat) ve Asr-ı Saadet\'te örnek genç sahabiler.',
    },
    units: [
      {
        id: 'din-u1',
        unitNumber: 1,
        title: 'Allah-İnsan İlişkisi',
        semester: 1,
        outcomes: [
          'İnsanın yaratılış gayesini, fıtratını ve üstün özelliklerini Kur\'an ayetleriyle açıklar.',
          'Vahiy ve akıl arasındaki dengeyi ve doğru bilgiye ulaşmadaki rollerini kavrar.',
          'Dua ve ibadetin insanın ruhsal dinginliği ve Allah ile irtibatındaki yerini kavrar.',
        ],
        mebExamFocus: 'Fıtrat, haniflik kavramları ve Rum suresi 17-27. ayetlerin ana teması.',
      },
      {
        id: 'din-u2',
        unitNumber: 2,
        title: 'İslam\'da İnanç Esasları',
        semester: 1,
        outcomes: [
          'İman kavramını, imanın tasdik ve ikrar boyutlarını açıklar.',
          'İslam inanç esaslarının temel özelliklerini (dogmatik olmama, fıtrata uygunluk) analiz eder.',
          'İmanın birey ve toplum hayatında oluşturduğu güven ve ahlaki değerleri değerlendirir.',
        ],
        mebExamFocus: 'İcmali ve tafsili iman farkı, imanın mahiyeti ve taklidi/tahkiki iman.',
      },
      {
        id: 'din-u3',
        unitNumber: 3,
        title: 'İslam\'da İbadetler ve Ahlak',
        semester: 2,
        outcomes: [
          'İbadetin kapsamını, ibadet çeşitlerini (bedenî, malî, hem bedenî hem malî) açıklar.',
          'İbadetlerin kabul edilme şartlarını (ihlas ve sünnete uygunluk) kavrar.',
          'İbadetlerin insanın kötülüklerden uzaklaşmasındaki ve ahlak gelişimindeki rolünü değerlendirir.',
        ],
        mebExamFocus: 'İbadetlerin ilkeleri ve ibadet-ahlak bütünlüğü soruları.',
      },
      {
        id: 'din-u4',
        unitNumber: 4,
        title: 'Ahlaki Değerler ve Gençlik',
        semester: 2,
        outcomes: [
          'Dört temel ahlaki erdemi (adalet, hikmet, iffet, şecaat) açıklar.',
          'Hz. Muhammed\'in gençlere verdiği önemi ve genç sahabilerin (Hz. Ali, Muaz b. Cebel, Üsame b. Zeyd) hayatlarını modeller.',
        ],
        mebExamFocus: 'Temel ahlaki erdemler (hikmet, adalet, iffet, şecaat) ve genç sahabilerin rolleri.',
      },
    ],
  },
};

/**
 * Belirtilen dersin konularını döndürür
 */
export function getLise1TopicsByCourse(courseKey: Lise1CourseKey): readonly string[] {
  return LISE1_TOPICS_BY_COURSE[courseKey] || [];
}

/**
 * Ders kodundan Türkçe ders adını döndürür
 */
export function getLise1CourseName(courseKey: Lise1CourseKey): string {
  const found = LISE1_COURSE_OPTIONS.find((c) => c.key === courseKey);
  return found ? found.name : courseKey;
}

/**
 * Bir 9. sınıf dersinin detaylı Maarif Modeli müfredat metadatasını döndürür
 */
export function getLise1CourseMetadata(courseKey: Lise1CourseKey): Lise1CourseDetailedMetadata | undefined {
  return LISE1_DETAILED_CURRICULUM[courseKey];
}

/**
 * Bir 9. sınıf dersinin resmi ünitelerini döndürür
 */
export function getLise1UnitsByCourse(courseKey: Lise1CourseKey): Lise1Unit[] {
  return LISE1_DETAILED_CURRICULUM[courseKey]?.units || [];
}

/**
 * MEB Ortak Yazılı Sınavı için ilgili dönem ve yazılı numarasına göre odak konuları döndürür
 */
export function getLise1ExamTopicsForSemester(
  courseKey: Lise1CourseKey,
  semester: 1 | 2,
  examNumber: 1 | 2
): string {
  const meta = LISE1_DETAILED_CURRICULUM[courseKey];
  if (!meta) return '';
  if (semester === 1) {
    return examNumber === 1 ? meta.mebScenarioSummary.term1Exam1 : meta.mebScenarioSummary.term1Exam2;
  } else {
    return examNumber === 1 ? meta.mebScenarioSummary.term2Exam1 : meta.mebScenarioSummary.term2Exam2;
  }
}

/**
 * MEB Ortaöğretim Kurumları Yönetmeliği uyarınca dersin baraj/geçme notunu döndürür
 * (Türk Dili ve Edebiyatı için 70, diğer tüm dersler için 50)
 */
export function getLise1PassingThreshold(courseKey: Lise1CourseKey): number {
  return courseKey === 'edebiyat' ? 70 : 50;
}
