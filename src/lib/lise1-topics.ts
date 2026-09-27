// MEB Türkiye Yüzyılı Maarif Modeli (9. Sınıf Güncel Müfredatı)
// 2024-2025 Eğitim-Öğretim Yılından İtibaren Yürürlükte Olan Resmi Tema ve Üniteler

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
