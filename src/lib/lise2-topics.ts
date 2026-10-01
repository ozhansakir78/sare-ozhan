// MEB Güncel 10. Sınıf (Lise 2) Müfredat ve Kazanım Haritası
// Talim ve Terbiye Kurulu Başkanlığı (TTKB) ve MEB Ortak Yazılı Sınav Konu Dağılım Tablolarına Tam Uyumlu

export type Lise2CourseKey =
  | 'matematik'
  | 'fizik'
  | 'kimya'
  | 'biyoloji'
  | 'edebiyat'
  | 'tarih'
  | 'cografya'
  | 'felsefe'
  | 'ingilizce'
  | 'din';

export interface Lise2CourseOption {
  key: Lise2CourseKey;
  name: string;
  weeklyHours: number; // MEB Haftalık Ders Saati
  isPassingRequirement?: boolean; // MEB Baraj Dersi (Türk Dili ve Edebiyatı için 70 barajı)
  modelName: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}

export const LISE2_COURSE_OPTIONS: readonly Lise2CourseOption[] = [
  {
    key: 'edebiyat',
    name: 'Türk Dili ve Edebiyatı (10. Sınıf)',
    weeklyHours: 5,
    isPassingRequirement: true, // MEB Ortaöğretim Baraj Dersi: 70
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-rose-50/60 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-900/50',
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    },
  },
  {
    key: 'matematik',
    name: 'Matematik (10. Sınıf)',
    weeklyHours: 6,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-blue-50/60 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-900/50',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    },
  },
  {
    key: 'fizik',
    name: 'Fizik (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-indigo-50/60 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-900/50',
      text: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
    },
  },
  {
    key: 'kimya',
    name: 'Kimya (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-violet-50/60 dark:bg-violet-950/20',
      border: 'border-violet-200 dark:border-violet-900/50',
      text: 'text-violet-600 dark:text-violet-400',
      badge: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
    },
  },
  {
    key: 'biyoloji',
    name: 'Biyoloji (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900/50',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
  },
  {
    key: 'tarih',
    name: 'Tarih (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-amber-50/60 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900/50',
      text: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    },
  },
  {
    key: 'cografya',
    name: 'Coğrafya (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-teal-50/60 dark:bg-teal-950/20',
      border: 'border-teal-200 dark:border-teal-900/50',
      text: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    },
  },
  {
    key: 'felsefe',
    name: 'Felsefe (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-orange-50/60 dark:bg-orange-950/20',
      border: 'border-orange-200 dark:border-orange-900/50',
      text: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
    },
  },
  {
    key: 'ingilizce',
    name: 'Birinci Yabancı Dil (İngilizce 10)',
    weeklyHours: 4,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-sky-50/60 dark:bg-sky-950/20',
      border: 'border-sky-200 dark:border-sky-900/50',
      text: 'text-sky-600 dark:text-sky-400',
      badge: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
    },
  },
  {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi (10. Sınıf)',
    weeklyHours: 2,
    modelName: 'MEB 10. Sınıf Müfredatı',
    colorTheme: {
      bg: 'bg-purple-50/60 dark:bg-purple-950/20',
      border: 'border-purple-200 dark:border-purple-900/50',
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    },
  },
] as const;

export const LISE2_TOPICS_BY_COURSE: Record<Lise2CourseKey, readonly string[]> = {
  // 1. MATEMATİK (10. Sınıf - 6 Ana Ünite)
  matematik: [
    '1. Ünite: Sayma ve Olasılık - Toplama ve Çarpma Yoluyla Sayma Kuralları',
    '1. Ünite: Sayma ve Olasılık - Faktöriyel ve Permütasyon (Dizilim)',
    '1. Ünite: Sayma ve Olasılık - Kombinasyon (Seçim) ve Özellikleri',
    '1. Ünite: Sayma ve Olasılık - Binom Açılımı ve Katsayılar Bağıntısı',
    '1. Ünite: Sayma ve Olasılık - Basit ve Koşullu Olayların Olasılığı',
    '2. Ünite: Fonksiyonlar - Fonksiyon Kavramı, Tanım, Değer ve Görüntü Kümesi',
    '2. Ünite: Fonksiyonlar - Fonksiyon Türleri: Bire Bir, Örten, İçine, Birim, Sabit ve Doğrusal',
    '2. Ünite: Fonksiyonlar - Fonksiyon Grafikleri ve Dikey Doğru Testi',
    '2. Ünite: Fonksiyonlar - İki Fonksiyonun Bileşkesi (f o g)(x)',
    '2. Ünite: Fonksiyonlar - Bir Fonksiyonun Tersi f⁻¹(x) ve Özellikleri',
    '3. Ünite: Polinomlar - Polinom Kavramı, Derece, Başkatsayı ve Sabit Terim',
    '3. Ünite: Polinomlar - Polinomlarda Toplama, Çıkarma, Çarpma ve Bölme İşlemi',
    '3. Ünite: Polinomlar - Kalan Teoremi: P(x)\'in (x - a) ve (ax + b) ile Bölümünden Kalan',
    '3. Ünite: Polinomlar - Çarpanlara Ayırma: Ortak Çarpan, Gruplandırma, Özdeşlikler',
    '4. Ünite: İkinci Dereceden Denklemler - ax² + bx + c = 0 Denkleminin Kökleri ve Diskriminant (Δ)',
    '4. Ünite: İkinci Dereceden Denklemler - Kökler ile Katsayılar Arasındaki Bağıntılar',
    '4. Ünite: İkinci Dereceden Denklemler - Karmaşık Sayılara Giriş (i² = -1)',
    '5. Ünite: Dörtgenler ve Çokgenler - Dışbükey (Konveks) Çokgenler ve Açı Özellikleri',
    '5. Ünite: Dörtgenler ve Çokgenler - Dörtgenlerde Açı, Kenar ve Köşegen Bağıntıları',
    '5. Ünite: Dörtgenler ve Çokgenler - Özel Dörtgenler: Yamuk ve İkizkenar/Dik Yamuk',
    '5. Ünite: Dörtgenler ve Çokgenler - Özel Dörtgenler: Paralelkenar ve Eşkenar Dörtgen',
    '5. Ünite: Dörtgenler ve Çokgenler - Özel Dörtgenler: Dikdörtgen, Kare ve Deltoid',
    '6. Ünite: Uzay Geometri - Prizmalar: Dik Prizmanın Alanı ve Hacmi',
    '6. Ünite: Uzay Geometri - Piramitler: Dik Piramidin Alanı ve Hacmi',
  ],

  // 2. FİZİK (10. Sınıf - 4 Ana Ünite)
  fizik: [
    '1. Ünite: Elektrik ve Manyetizma - Elektrik Akımı, Potansiyel Farkı ve Direnç',
    '1. Ünite: Elektrik ve Manyetizma - Katı Bir İletkenin Direncini Etkileyen Değişkenler (R = ρ·L/A)',
    '1. Ünite: Elektrik ve Manyetizma - Ohm Yasası (V = I·R)',
    '1. Ünite: Elektrik ve Manyetizma - Dirençlerin Seri ve Paralel Bağlanması ve Eşdeğer Direnç',
    '1. Ünite: Elektrik ve Manyetizma - Üreteçlerin Seri ve Paralel Bağlanması',
    '1. Ünite: Elektrik ve Manyetizma - Elektriksel Enerji ve Güç Hesaplamaları',
    '1. Ünite: Elektrik ve Manyetizma - Mıknatıslar, Manyetik Alan Çizgileri ve Akımın Manyetik Etkisi',
    '2. Ünite: Basınç ve Kaldırma Kuvveti - Katı, Sıvı ve Gaz Basıncı ve Günlük Hayat',
    '2. Ünite: Basınç ve Kaldırma Kuvveti - Durgun Sıvıların Kaldırma Kuvveti ve Arşimet Prensibi',
    '3. Ünite: Dalgalar - Dalgaların Temel Değişkenleri: Periyot, Frekans, Dalga Boyu ve Hız (v = λ·f)',
    '3. Ünite: Dalgalar - Yay Dalgaları: Atmanın Yansıması, İletilmesi ve Girişimi',
    '3. Ünite: Dalgalar - Su Dalgaları: Doğrusal ve Dairesel Dalgalarda Yansıma, Kırılma ve Stroboskop',
    '3. Ünite: Dalgalar - Ses Dalgaları: Yükseklik (Frekans), Şiddet (Genlik), Tını, Rezonans ve Yankı',
    '3. Ünite: Dalgalar - Deprem Dalgaları ve Deprem Riskinden Korunma Yolları',
    '4. Ünite: Optik - Aydınlanma Şiddeti, Işık Akısı ve Işık Şiddeti',
    '4. Ünite: Optik - Düzlem Aynada Yansıma ve Görüntü Özellikleri',
    '4. Ünite: Optik - Küresel Aynalar: Çukur ve Tümsek Aynada Özel Işınlar ve Görüntü',
    '4. Ünite: Optik - Işığın Kırılması, Snell Yasası, Tam Yansıma ve Sınır Açısı',
    '4. Ünite: Optik - Mercekler: İnce ve Kalın Kenarlı Merceklerde Özel Işınlar ve Görüntü Oluşumu',
    '4. Ünite: Optik - Prizmalar ve Işığın Renklere Ayrılması',
  ],

  // 3. KİMYA (10. Sınıf - 4 Ana Ünite)
  kimya: [
    '1. Ünite: Kimyanın Temel Kanunları - Kütlenin Korunumu Kanunu (Lavoisier)',
    '1. Ünite: Kimyanın Temel Kanunları - Sabit Oranlar Kanunu (Proust)',
    '1. Ünite: Kimyanın Temel Kanunları - Katlı Oranlar Kanunu (Dalton)',
    '1. Ünite: Kimyasal Hesaplamalar - Mol Kavramı ve Avogadro Sayısı (NA = 6,02·10²³)',
    '1. Ünite: Kimyasal Hesaplamalar - Mol Kütlesi, Hacim (NK 22,4 L) ve Tanecik Sayısı Bağıntıları',
    '1. Ünite: Kimyasal Hesaplamalar - Kimyasal Denklemlerin Denkleştirilmesi',
    '1. Ünite: Kimyasal Hesaplamalar - Kimyasal Tepkime Türleri (Yanma, Asit-Baz, Çökelme vb.)',
    '1. Ünite: Kimyasal Hesaplamalar - Sınırlayıcı Bileşen, Artan Madde ve Yüzde Verim Problemleri',
    '2. Ünite: Karışımlar - Homojen ve Heterojen Karışımlar (Süspansiyon, Emülsiyon, Kolloid, Aerosol)',
    '2. Ünite: Karışımlar - Çözünme Süreci: Moleküler ve İyonik Çözünme, "Benzer Benzeri Çözer"',
    '2. Ünite: Karışımlar - Kütlece Yüzde, Hacimce Yüzde ve ppm (Milyonda Bir) Derişim',
    '2. Ünite: Karışımlar - Koligatif Özellikler: Kaynama Noktası Yükselmesi ve Donma Noktası Alçalması',
    '2. Ünite: Karışımlar - Ayırma Yöntemleri: Süzme, Damıtma, Ayrımsal Damıtma, Ayırma Hunisi, Flotasyon',
    '3. Ünite: Asitler, Bazlar ve Tuzlar - Asit ve Bazların Tanımı ve Genel Özellikleri',
    '3. Ünite: Asitler, Bazlar ve Tuzlar - pH ve pOH Kavramları ve İndikatörler',
    '3. Ünite: Asitler, Bazlar ve Tuzlar - Asit-Baz Nötralleşme Tepkimeleri ve Titrasyon',
    '3. Ünite: Asitler, Bazlar ve Tuzlar - Asit ve Bazların Metallerle Tepkimeleri (Aktif, Amfoter, Soy Metaller)',
    '3. Ünite: Asitler, Bazlar ve Tuzlar - Günlük Hayatta Asit-Baz Güvenliği ve Asit Yağmurları',
    '3. Ünite: Asitler, Bazlar ve Tuzlar - Önemli Tuzlar: NaCl, Na₂CO₃, NaHCO₃, CaCO₃ ve NH₄Cl',
    '4. Ünite: Kimya Her Yerde - Temizlik Maddeleri: Sabun ve Deterjanın Yapısı ve Farkları',
    '4. Ünite: Kimya Her Yerde - Polimerler (PET, PE, PVC, Teflon) ve Kozmetik Ürünler',
    '4. Ünite: Kimya Her Yerde - İlaç Formları (Hap, Şurup, İğne) ve Gıda Katkı Maddeleri',
  ],

  // 4. BİYOLOJİ (10. Sınıf - 3 Ana Ünite)
  biyoloji: [
    '1. Ünite: Hücre Bölünmeleri - Hücre Bölünmesinin Gerekliliği ve Hücre Döngüsü',
    '1. Ünite: Hücre Bölünmeleri - Mitoz Bölünme Evreleri: Profaz, Metafaz, Anafaz ve Telofaz',
    '1. Ünite: Hücre Bölünmeleri - Hayvan ve Bitki Hücrelerinde Sitokinez (Boğumlanma vs Ara Lamel)',
    '1. Ünite: Hücre Bölünmeleri - Eşeysiz Üreme: İkiye Bölünme, Tomurcuklanma, Sporla, Rejenerasyon, Vejetatif ve Partenogenez',
    '1. Ünite: Hücre Bölünmeleri - Mayoz Bölünme Evreleri: Mayoz I ve Mayoz II Karşılaştırması',
    '1. Ünite: Hücre Bölünmeleri - Krossing-over, Homolog Kromozom Ayrılması ve Genetik Çeşitlilik',
    '1. Ünite: Hücre Bölünmeleri - Eşeyli Üreme ve Döllenme',
    '2. Ünite: Kalıtımın Genel İlkeleri - Mendel İlkeleri, Genotip ve Fenotip Kavramları',
    '2. Ünite: Kalıtımın Genel İlkeleri - Monohibrit ve Dihibrit Çaprazlamalar, Punnett Karesi',
    '2. Ünite: Kalıtımın Genel İlkeleri - Eş Baskınlık ve Çok Alellilik (ABO Kan Grupları ve Rh Faktörü)',
    '2. Ünite: Kalıtımın Genel İlkeleri - Eşeye Bağlı Kalıtım: X ve Y Kromozomuna Bağlı Kalıtılan Hastalıklar (Hemofili, Renk Körlüğü)',
    '2. Ünite: Kalıtımın Genel İlkeleri - Soyağaçları ve Kalıtım Kalıpları Analizi',
    '2. Ünite: Kalıtımın Genel İlkeleri - Akraba Evliliklerinin Genetik Riskleri',
    '3. Ünite: Ekosistem Ekolojisi - Ekosistemin Canlı (Biyotik) ve Cansız (Abiyotik) Bileşenleri',
    '3. Ünite: Ekosistem Ekolojisi - Besin Zinciri, Besin Ağı ve Biyokütle Piramidinde %10 Enerji Yasası',
    '3. Ünite: Ekosistem Ekolojisi - Biyolojik Birikim (Zehirli Madde Yoğunluğu)',
    '3. Ünite: Ekosistem Ekolojisi - Madde Döngüleri: Karbon, Azot ve Su Döngüsü',
    '3. Ünite: Güncel Çevre Sorunları - Sera Gazları, Küresel İklim Değişikliği, Ekolojik ve Su Ayak İzi',
  ],

  // 5. TÜRK DİLİ VE EDEBİYATI (10. Sınıf - 7 Ana Ünite)
  edebiyat: [
    '1. Ünite: Giriş - Edebiyatın Tarih ve Din ile İlişkisi',
    '1. Ünite: Giriş - Türk Edebiyatının Tarihî Dönemleri ve Türkçenin Tarihî Gelişimi',
    '2. Ünite: Hikâye - Dede Korkut Hikâyeleri, Halk Hikâyeleri ve Mesnevi',
    '2. Ünite: Hikâye - Tanzimat ve Millî Edebiyat Dönemi Hikâyeleri',
    '2. Ünite: Hikâye - Dil Bilgisi: Fiilimsiler (İsim-fiil, Sıfat-fiil, Zarf-fiil) Metin İncelemesi',
    '3. Ünite: Şiir - İslamiyet Öncesi Türk Şiiri: Koşuk ve Sagu',
    '3. Ünite: Şiir - Geçiş Dönemi Türk Edebiyatı: Kutadgu Bilig, Divanü Lugati\'t-Türk, Atabetü\'l-Hakayık, Divan-ı Hikmet',
    '3. Ünite: Şiir - Halk Şiiri: Anonim, Âşık (Koşma, Semai) ve Dini-Tasavvufi (İlahi, Nefes)',
    '3. Ünite: Şiir - Divan Şiiri: Gazel, Kaside, Mesnevi ve Şarkı Nazım Şekilleri',
    '3. Ünite: Şiir - Aruz ve Hece Ölçüsü, Uyak ve Redif Tahlilleri',
    '3. Ünite: Şiir - Dil Bilgisi: İsim Tamlamaları (Belirtili, Belirtisiz, Zincirleme)',
    '4. Ünite: Destan / Efsane - İslamiyet Öncesi ve İslami Dönem Türk Destanları',
    '4. Ünite: Destan / Efsane - Dünya Destanları, Doğal ve Yapay Destan Farkı',
    '4. Ünite: Destan / Efsane - Dil Bilgisi: Sıfat Tamlamaları',
    '5. Ünite: Roman - Dünya Edebiyatında Romanın Doğuşu (Don Kişot)',
    '5. Ünite: Roman - Tanzimat, Servetifünun ve Millî Edebiyat Romanı Tahlilleri',
    '5. Ünite: Roman - Dil Bilgisi: Cümle Türleri (Yüklemine, Anlamına, Öge Dizilişine ve Yapısına Göre Cümleler)',
    '6. Ünite: Tiyatro - Geleneksel Türk Tiyatrosu: Karagöz, Orta Oyunu, Meddah ve Köy Seyirlik Oyunları',
    '6. Ünite: Tiyatro - Modern Türk Tiyatrosunun Gelişimi: Trajedi, Komedi ve Dram',
    '7. Ünite: Anı / Gezi Yazısı / Haber - Tür Özellikleri, Temsilcileri ve Metin Tahlili',
    'Dil Bilgisi: Noktalama İşaretleri ve İmla/Yazım Kuralları',
  ],

  // 6. TARİH (10. Sınıf - 7 Ana Ünite)
  tarih: [
    '1. Ünite: Selçuklu Türkiyesi - Malazgirt Sonrası Anadolu\'da Kurulan İlk Türk Beylikleri',
    '1. Ünite: Selçuklu Türkiyesi - Türkiye Selçuklu Devleti, Anadolu\'nun Türkleşmesi ve Miryokefalon',
    '1. Ünite: Selçuklu Türkiyesi - Haçlı Seferleri ve Anadolu\'ya Etkileri',
    '1. Ünite: Selçuklu Türkiyesi - Kösedağ Savaşı ve Anadolu\'da İkinci Beylikler Dönemi',
    '2. Ünite: Beylikten Devlete Osmanlı - Osmanlı\'nın Kuruluş Şartları, Jeopolitik Konumu ve Gaza Anlayışı',
    '2. Ünite: Beylikten Devlete Osmanlı - İskân ve İstimalet (Hoşgörü) Politikası',
    '2. Ünite: Beylikten Devlete Osmanlı - Balkan Fetihleri (Sırpsındığı, I. Kosova, Niğbolu, Varna)',
    '2. Ünite: Beylikten Devlete Osmanlı - Ankara Savaşı (1402), Fetret Devri ve Devletin Yeniden Toparlanması',
    '3. Ünite: Savaşçılar ve Askerler - Tımar Sistemi ve Tımarlı Sipahiler',
    '3. Ünite: Savaşçılar ve Askerler - Devşirme Sistemi, Kapıkulu Ocakları ve Yeniçeriler',
    '4. Ünite: Beylikten Devlete Medeniyet - Osmanlı\'da İlmiye, Seyfiye ve Kalemiye Sınıfları',
    '4. Ünite: Beylikten Devlete Medeniyet - Anadolu\'da Tasavvuf ve Ahilik Teşkilatının Toplumsal Rolü',
    '5. Ünite: Dünya Gücü Osmanlı - İstanbul\'un Fethi, Sebepleri ve Dünya Tarihindeki Sonuçları',
    '5. Ünite: Dünya Gücü Osmanlı - Fatih Kanunnamesi ve Merkeziyetçi Devlet Yapısı',
    '5. Ünite: Dünya Gücü Osmanlı - Yavuz Sultan Selim: Çaldıran, Mercidabık ve Ridaniye ile Hilafet',
    '5. Ünite: Dünya Gücü Osmanlı - Kanuni Sultan Süleyman: Mohaç, Viyana Kuşatması ve Preveze Deniz Zaferi',
    '6. Ünite: Sultan ve Merkez Teşkilatı - Divan-ı Hümayun ve Üyeleri (Sadrazam, Şeyhülislam, Defterdar, Nişancı)',
    '6. Ünite: Sultan ve Merkez Teşkilatı - Saray Teşkilatı: Enderun, Birun ve Harem',
    '7. Ünite: Klasik Çağda Toplum - Osmanlı Millet Sistemi, Lonca ve Vakıf Kültürü',
  ],

  // 7. COĞRAFYA (10. Sınıf - 5 Ana Ünite)
  cografya: [
    '1. Ünite: Doğal Sistemler - Yerin İç Yapısı, Levha Tektoniği ve Jeolojik Zamanlar',
    '1. Ünite: Doğal Sistemler - İç Kuvvetler: Orojenez (Dağ Oluşumu), Epirojenez (Kıta Oluşumu), Volkanizma ve Depremler',
    '1. Ünite: Doğal Sistemler - Kayaç Türleri: Magmatik, Sedimanter (Tortul) ve Metamorfik (Başkalaşım)',
    '1. Ünite: Doğal Sistemler - Dış Kuvvetler: Akarsu Aşınım ve Birikim Şekilleri (Vadi, Menderes, Delta vb.)',
    '1. Ünite: Doğal Sistemler - Dış Kuvvetler: Karstik, Buzul, Rüzgâr ve Dalga/Kıyı Şekilleri',
    '2. Ünite: Türkiye\'nin Yer Şekilleri - Türkiye\'nin Dağları, Ovaları, Platoları ve Jeolojik Evrimi',
    '2. Ünite: Türkiye\'nin Su, Toprak ve Bitkileri - Türkiye\'nin Akarsuları, Gölleri ve Yeraltı Suları',
    '2. Ünite: Türkiye\'nin Su, Toprak ve Bitkileri - Zonal, Azonal ve İntrazonal Toprak Türleri',
    '2. Ünite: Türkiye\'nin Su, Toprak ve Bitkileri - Türkiye\'nin Bitki Örtüsü: Orman, Çalı (Maki/Garig) ve Bozkır',
    '3. Ünite: Beşerî Sistemler - Dünya Nüfusunun Tarihsel Gelişimi ve Dağılışını Etkileyen Faktörler',
    '3. Ünite: Beşerî Sistemler - Nüfus Piramitleri ve Demografik Gelişmişlik Düzeyi Analizi',
    '3. Ünite: Beşerî Sistemler - Türkiye\'de Nüfusun Dağılışı, Nüfus Sayımları ve Nüfus Politikaları',
    '3. Ünite: Beşerî Sistemler - Göçlerin Nedenleri ve Sonuçları (İç ve Dış Göçler, Beyin Göçü, Mültecilik)',
    '4. Ünite: Küresel Ortam - Uluslararası Ulaşım Hatları: Boğazlar, Kanallar (Süveyş, Panama vb.) ve Deniz Yolları',
    '5. Ünite: Çevre ve Toplum - Afetlerin Sınıflandırılması, Dağılışı ve Türkiye\'de Bütüncül Afet Yönetimi',
  ],

  // 8. FELSEFE (10. Sınıf - 4 Ana Ünite)
  felsefe: [
    '1. Ünite: Felsefeyi Tanıma - Felsefenin Anlamı, Doğuşu ve Antik Yunan Düşüncesi',
    '1. Ünite: Felsefeyi Tanıma - Felsefi Düşüncenin Nitelikleri: Refleksif, Rasyonel, Bütüncül, Kümülatif, Eleştirel ve Sorgulayıcı',
    '1. Ünite: Felsefeyi Tanıma - Felsefenin Bireysel ve Toplumsal Hayata Katkıları',
    '2. Ünite: Felsefe ile Düşünme - Akıl Yürütme Yöntemleri: Tümdengelim, Tümevarım ve Analoji',
    '2. Ünite: Felsefe ile Düşünme - Doğruluk, Gerçeklik, Tutarlılık ve Çelişiklik Kavramları',
    '2. Ünite: Felsefe ile Düşünme - Felsefede Argümantasyon, Önerme ve Dil İlişkisi',
    '3. Ünite: Felsefenin Alanları - Varlık Felsefesi (Ontoloji): Varlığın Mahiyeti, İdealizm, Materyalizm ve Düalizm',
    '3. Ünite: Felsefenin Alanları - Bilgi Felsefesi (Epistemoloji): Doğru Bilginin İmkânı, Rasyonalizm, Empirizm, Kritisizm ve Pozitivizm',
    '3. Ünite: Felsefenin Alanları - Bilim Felsefesi: Bilimin Doğası, Bilimsel Yöntem ve Bilimsel Paradigma (Thomas Kuhn)',
    '3. Ünite: Felsefenin Alanları - Ahlak Felsefesi (Etik): Ahlakın Kaynağı, İrade Özgürlüğü, Determinizm ve Evrensel Ahlak Yasası',
    '3. Ünite: Felsefenin Alanları - Din Felsefesi: Tanrı\'nın Varlığına Dair Görüşler (Teizm, Deizm, Panteizm, Agnostisizm, Ateizm)',
    '3. Ünite: Felsefenin Alanları - Siyaset Felsefesi: Devletin Doğuşu, İktidarın Meşruiyeti, Ütopyalar ve Hak/Adalet',
    '3. Ünite: Felsefenin Alanları - Sanat Felsefesi (Estetik): Sanatın Doğası, Güzel Kavramı, Taklit, Yaratma ve Oyun Olarak Sanat',
    '4. Ünite: Felsefi Okuma ve Yazma - Felsefi Metinleri Tahlil Etme ve Özgün Felsefi Görüş Oluşturma',
  ],

  // 9. İNGİLİZCE (10. Sınıf - 10 Tema)
  ingilizce: [
    'Theme 1: School Life - School Subjects, Study Routines & Collaborative Projects',
    'Theme 2: Plans & Ambitions - Future Intentions, Predictions & Making Appointments (will / be going to)',
    'Theme 3: Legendary Figures - Historical Heroes, Biographies & Past Narratives (Simple Past & Past Continuous)',
    'Theme 4: Traditions & Heritage - Cultural Festivals, National Ceremonies & Passive Voice Foundations',
    'Theme 5: Travel & Vacations - Travel Experiences, City Breaks & Life Experiences (Present Perfect Tense)',
    'Theme 6: Helpful Tips & Advice - Giving Advice, Rules & Obligations (should, must, have to)',
    'Theme 7: Food & Feasts - Recipes, Cooking Verbs & Dietary Preferences',
    'Theme 8: Digital Era & Innovation - Technology Trends, Cybersecurity & Type 1 Conditionals (If Clauses)',
    'Theme 9: Modern Heroes & Roles - Defining Relative Clauses (who, which, that) in Social Responsibility',
    'Theme 10: Shopping & Economy - Money Management, Making Comparisons & Consumer Rights',
  ],

  // 10. DİN KÜLTÜRÜ VE AHLAK BİLGİSİ (10. Sınıf - 5 Ana Ünite)
  din: [
    '1. Ünite: Allah İnancı ve İnsan - Allah\'ın İsim ve Sıfatları: Zati Sıfatlar (Vücud, Kıdem, Beka, Vahdaniyet, Muhalefetün lil-havadis, Kıyam bi-nefsihi)',
    '1. Ünite: Allah İnancı ve İnsan - Allah\'ın Subuti Sıfatları: Hayat, İlim, Semi, Basar, İrade, Kudret, Kelam, Tekvin',
    '1. Ünite: Allah İnancı ve İnsan - İnsanın Allah ile İrtibatı: Dua, İbadet, Tevbe ve Kur\'an Okuma',
    '2. Ünite: İslam Düşüncesinde Yorumlar - Dinin Anlaşılmasında Mezheplerin Doğuş Nedenleri',
    '2. Ünite: İslam Düşüncesinde Yorumlar - İtikadi Yorumlar: Eş\'arilik, Maturidilik ve Şia',
    '2. Ünite: İslam Düşüncesinde Yorumlar - Fıkhi Yorumlar: Hanefilik, Şafiilik, Malikilik, Hanbelilik ve Caferilik',
    '3. Ünite: Din ve Hayat - Dinin Aile Kurumu, Sosyal Birlik ve Toplum Hayatındaki Koruyucu Rolü',
    '3. Ünite: Din ve Hayat - Dinin Kültür, Mimari, Edebiyat ve Musiki Üzerindeki Estetik Yansımaları',
    '4. Ünite: Ahlaki Tutum ve Davranışlar - İslam Ahlakının Temel Kaynakları: Kur\'an ve Sünnet',
    '4. Ünite: Ahlaki Tutum ve Davranışlar - Örnek Ahlaki Erdemler: Adalet, Doğruluk, Emanet, Tevazu ve Cömertlik',
    '4. Ünite: Ahlaki Tutum ve Davranışlar - Kaçınılması Gereken Kötü Huylar: İsraf, Yalan, Hile, Gıybet, Haset ve Kibir',
    '5. Ünite: Tasavvufi Yorumlar - Tasavvufun Mahiyeti, İrfani Bilgi ve Nefs Terbiyesi',
    '5. Ünite: Tasavvufi Yorumlar - Yesevilik, Kadirilik, Mevlevilik, Nakşibendilik ve Alevi-Bektaşi Kültürü (Cem, Semah, Gülbenk)',
  ],
} as const;

export interface Lise2Unit {
  id: string;
  unitNumber: number;
  title: string;
  semester: 1 | 2;
  outcomes: string[];
  mebExamFocus: string; // MEB Ortak Yazılı Sınavı Konu Odakları
}

export interface Lise2CourseDetailedMetadata {
  key: Lise2CourseKey;
  name: string;
  weeklyHours: number;
  passingThreshold: number; // Edebiyat 70, diğerleri 50
  isBarajDersi: boolean;
  annualExamCount: number; // 4 sınav
  mebScenarioSummary: {
    term1Exam1: string;
    term1Exam2: string; // Ülke Geneli Ortak
    term2Exam1: string;
    term2Exam2: string; // İl / Ülke Geneli Ortak
  };
  units: Lise2Unit[];
}

export const LISE2_DETAILED_CURRICULUM: Record<Lise2CourseKey, Lise2CourseDetailedMetadata> = {
  matematik: {
    key: 'matematik',
    name: 'Matematik (10. Sınıf)',
    weeklyHours: 6,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Sayma kuralları, faktöriyel, permütasyon, kombinasyon, binom açılımı ve basit olayların olasılığı.',
      term1Exam2: 'MEB Ülke Geneli Ortak: Fonksiyon kavramı, fonksiyon türleri (bire bir, örten, birim, sabit), bileşke ve ters fonksiyon.',
      term2Exam1: 'Polinomlar, polinomlarda dört işlem, kalan teoremi ve çarpanlara ayırma yöntemleri.',
      term2Exam2: 'İkinci dereceden denklemler, diskriminant, kök-katsayı bağıntıları, çokgenler ve özel dörtgenler (yamuk, paralelkenar).',
    },
    units: [
      {
        id: 'l2-mat-u1',
        unitNumber: 1,
        title: 'Sayma ve Olasılık',
        semester: 1,
        outcomes: [
          'Olayların gerçekleşme sayısını toplama ve çarpma ilkeleri ile bulur.',
          'n elemanlı bir kümenin r\'li permütasyonlarını (sıralanışlarını) hesaplar.',
          'Kombinasyon kavramını alt küme sayısı ve seçim problemleriyle ilişkilendirir.',
          'Binom açılımını yapar, Pascal üçgeni ile katsayılar ilişkisini kurar.',
          'Basit ve koşullu olayların olasılıklarını hesaplar.',
        ],
        mebExamFocus: 'Kombinasyon ile seçim problemleri, tekrarlı permütasyon ve binom sabit terim bulma.',
      },
      {
        id: 'l2-mat-u2',
        unitNumber: 2,
        title: 'Fonksiyonlar',
        semester: 1,
        outcomes: [
          'Fonksiyon kavramını tanım, değer ve görüntü kümeleriyle açıklar.',
          'Bire bir, örten, sabit, birim ve doğrusal fonksiyonların grafiklerini yorumlar.',
          'İki fonksiyonun bileşkesini bulur ve bileşke işleminin özelliklerini kullanır.',
          'Bire bir ve örten bir fonksiyonun tersini cebirsel olarak belirler.',
        ],
        mebExamFocus: 'Bileşke fonksiyon (f o g)(x), fonksiyon grafiği okuma ve f⁻¹(x) ters fonksiyonu bulma.',
      },
      {
        id: 'l2-mat-u3',
        unitNumber: 3,
        title: 'Polinomlar ve Çarpanlara Ayırma',
        semester: 2,
        outcomes: [
          'Polinom kavramını derecesi, başkatsayısı ve sabit terimi ile tanımlar.',
          'Polinomlarda toplama, çıkarma, çarpma ve bölme işlemlerini yapar.',
          'P(x) polinomunun (x - a) ile bölümünden kalanı bölme işlemi yapmadan bulur.',
          'Cebirsel ifadeleri ortak çarpan parantezine alma ve özdeşlikler yoluyla çarpanlarına ayırır.',
        ],
        mebExamFocus: 'Kalan teoremi P(a) hesabı ve iki kare farkı/tam kare ile çarpanlara ayırma.',
      },
      {
        id: 'l2-mat-u4',
        unitNumber: 4,
        title: 'İkinci Dereceden Denklemler',
        semester: 2,
        outcomes: [
          'ax² + bx + c = 0 denkleminin köklerini diskriminant (Δ = b² - 4ac) formülüyle inceler.',
          'Kökler toplamı (x₁ + x₂ = -b/a) ve kökler çarpımı (x₁ · x₂ = c/a) bağıntılarını uygular.',
          'Karmaşık sayıların sanal birimini (i² = -1) kavrar.',
        ],
        mebExamFocus: 'Diskriminantın sıfırdan büyük/küçük/eşit olma durumları ve kök-katsayı ilişkileri.',
      },
      {
        id: 'l2-mat-u5',
        unitNumber: 5,
        title: 'Dörtgenler ve Çokgenler',
        semester: 2,
        outcomes: [
          'Konveks çokgenlerin iç ve dış açılar toplamını hesaplar.',
          'Özel dörtgenlerin (yamuk, paralelkenar, eşkenar dörtgen, dikdörtgen, kare, deltoid) açı, kenar, köşegen ve alan bağıntılarını ispatlar.',
        ],
        mebExamFocus: 'Yamukta orta taban ve alan hesabı, paralelkenar ve eşkenar dörtgen köşegen özellikleri.',
      },
      {
        id: 'l2-mat-u6',
        unitNumber: 6,
        title: 'Uzay Geometri (Prizma ve Piramitler)',
        semester: 2,
        outcomes: [
          'Dik prizmaların yüzey alanlarını ve hacim bağıntılarını hesaplar.',
          'Dik piramitlerin alan ve hacimlerini geometrik modeller üzerinden çözer.',
        ],
        mebExamFocus: 'Dikdörtgenler prizması cisim köşegeni ve hacim formülleri.',
      },
    ],
  },

  fizik: {
    key: 'fizik',
    name: 'Fizik (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Elektrik akımı, iletkenin direnci (R = ρ·L/A), Ohm yasası, dirençlerin seri ve paralel bağlanması.',
      term1Exam2: 'Üreteçlerin bağlanması, elektriksel güç ve enerji, mıknatıslar ve akımın manyetik alanı.',
      term2Exam1: 'Dalgaların temel değişkenleri (v = λ·f), yay dalgalarında yansıma ve iletilme, su dalgaları ve stroboskop.',
      term2Exam2: 'Ses dalgaları (yükseklik, şiddet, tını), düzlem aynada görüntü, küresel aynalar ve ışığın kırılması (Snell yasası).',
    },
    units: [
      {
        id: 'l2-fiz-u1',
        unitNumber: 1,
        title: 'Elektrik ve Manyetizma',
        semester: 1,
        outcomes: [
          'Elektrik akımı, potansiyel farkı ve direnç kavramlarını ilişkilendirir.',
          'Katı bir iletkenin direncini R = ρ·L/A formülüyle hesaplar.',
          'Ohm yasasını kullanarak devre akımını ve gerilimini hesaplar.',
          'Dirençlerin seri ve paralel bağlanmasında eşdeğer direnci ve voltmetre/ampermetre okumalarını bulur.',
          'Elektriksel güç (P = V·I = I²·R) ve harcanan enerjiyi hesaplar.',
          'Mıknatısların kutuplarını ve akım taşıyan düz telin etrafındaki manyetik alan çizgilerini açıklar.',
        ],
        mebExamFocus: 'Eşdeğer direnç bulma, ampermetre-voltmetre değerleri ve lambaların parlaklığı karşılaştırması.',
      },
      {
        id: 'l2-fiz-u2',
        unitNumber: 2,
        title: 'Basınç ve Kaldırma Kuvveti',
        semester: 1,
        outcomes: [
          'Katı, sıvı ve gaz basıncı arasındaki ilişkiyi açıklar.',
          'Durgun sıvıların kaldırma kuvveti ile cisimlerin yoğunlukları arasındaki ilişkiyi kurar.',
        ],
        mebExamFocus: 'Birbirine karışmayan sıvılarda basınç ve taşırma kabı problemleri.',
      },
      {
        id: 'l2-fiz-u3',
        unitNumber: 3,
        title: 'Dalgalar',
        semester: 2,
        outcomes: [
          'Dalgaların temel niceliklerini (frekans, periyot, dalga boyu, hız: v = λ·f) hesaplar.',
          'Yay dalgalarında sabit ve serbest uçtan yansımayı atma profili üzerinde gösterir.',
          'Su dalgalarında derinliğin dalga hızına etkisini ve stroboskop formülünü uygular.',
          'Sesin tını, yükseklik ve şiddet özelliklerini rezonans olayıyla açıklar.',
          'Deprem dalgalarını (P, S, Rayleigh, Love) ve binalardaki rezonans riskini değerlendirir.',
        ],
        mebExamFocus: 'v = λ·f bağıntısı, atmanın yansıması ve su dalgalarının derin ortamdan sığ ortama geçişi.',
      },
      {
        id: 'l2-fiz-u4',
        unitNumber: 4,
        title: 'Optik',
        semester: 2,
        outcomes: [
          'Işık şiddeti, ışık akısı ve aydınlanma şiddeti (E = I/d²) kavramlarını ayırt eder.',
          'Düzlem aynada görüş alanı ve simetrik görüntü özelliklerini çizer.',
          'Çukur ve tümsek aynada odak noktası ve özel ışınların seyrini gösterir.',
          'Işığın az yoğun ortamdan çok yoğun ortama geçişinde Snell yasası ve sınır açısını açıklar.',
          'İnce ve kalın kenarlı merceklerde görüntü özelliklerini ve göz kusurlarını (miyop, hipermetrop) ilişkilendirir.',
        ],
        mebExamFocus: 'Çukur ayna özel ışınları, sınır açısı ve tam yansıma, merceklerde odak uzaklığı.',
      },
    ],
  },

  kimya: {
    key: 'kimya',
    name: 'Kimya (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Kimyanın temel kanunları (Lavoisier, Proust, Dalton), mol kavramı ve kimyasal denklem denkleştirme.',
      term1Exam2: 'Kimyasal tepkime türleri, sınırlayıcı bileşen ve yüzde verim hesaplamaları, karışımların sınıflandırılması.',
      term2Exam1: 'Çözünme süreci, kütlece/hacimce yüzde derişim, koligatif özellikler ve karışımları ayırma yöntemleri.',
      term2Exam2: 'Asitler ve bazların genel özellikleri, pH/pOH, nötralleşme tepkimeleri, tuzlar ve temizlik maddeleri (sabun/deterjan).',
    },
    units: [
      {
        id: 'l2-kim-u1',
        unitNumber: 1,
        title: 'Kimyanın Temel Kanunları ve Kimyasal Hesaplamalar',
        semester: 1,
        outcomes: [
          'Kütlenin korunumu, sabit oranlar ve katlı oranlar kanunlarını kimyasal olaylarda uygular.',
          'Mol kavramını tanecik sayısı, kütle ve gazların normal koşullardaki hacmi (22,4 L) ile ilişkilendirir.',
          'Kimyasal tepkime denklemlerini atom sayılarını koruyarak denkleştirir.',
          'Kimyasal tepkimelerde mol-kütle, sınırlayıcı bileşen ve kuramsal/gerçek verim hesaplamaları yapar.',
        ],
        mebExamFocus: 'Katlı oranlar kanunu uygulama, mol-tanecik dönüşümü ve sınırlayıcı bileşen problemleri.',
      },
      {
        id: 'l2-kim-u2',
        unitNumber: 2,
        title: 'Karışımlar',
        semester: 1,
        outcomes: [
          'Karışımları homojen (çözelti) ve heterojen (süspansiyon, emülsiyon, kolloid, aerosol) olarak sınıflandırır.',
          'Çözünme sürecini moleküler etkileşimler ("benzer benzeri çözer") düzeyinde açıklar.',
          'Kütlece yüzde, hacimce yüzde ve ppm cinsinden derişim hesaplamaları yapar.',
          'Çözeltilerin donma noktası alçalması ve kaynama noktası yükselmesi özelliklerini açıklar.',
          'Karışımları süzme, ayrımsal damıtma, ayırma hunisi gibi uygun yöntemlerle bileşenlerine ayırır.',
        ],
        mebExamFocus: 'Kütlece yüzde derişim formülleri ve ayrımsal damıtma kaynama noktası farkı prensibi.',
      },
      {
        id: 'l2-kim-u3',
        unitNumber: 3,
        title: 'Asitler, Bazlar ve Tuzlar',
        semester: 2,
        outcomes: [
          'Asit ve bazların özelliklerini pH skalası ve indikatör renk değişimleri üzerinden açıklar.',
          'Asit-baz tepkimelerini ve nötralleşme sonucu tuz ve su oluşumunu denklemlerle gösterir.',
          'Asit ve bazların aktif, yarı soy ve amfoter metallerle tepkimeye girerek gaz çıkışı üretmesini modeller.',
          'Sanayide ve evde yaygın kullanılan tuzların (NaCl, NaHCO₃, CaCO₃ vb.) kullanım alanlarını belirtir.',
        ],
        mebExamFocus: 'Metallerin asit/bazlarla tepkimesinden çıkan gazlar (H₂ vs SO₂/NO₂) ve nötralleşme mol hesabı.',
      },
      {
        id: 'l2-kim-u4',
        unitNumber: 4,
        title: 'Kimya Her Yerde',
        semester: 2,
        outcomes: [
          'Sabun ve deterjanın kimyasal yapısını, hidrofil-hidrofob uçlarını ve kir temizleme mekanizmasını açıklar.',
          'Yaygın polimerlerin (PVC, teflon, PET) ve kozmetiklerin insan sağlığı ve çevreye etkilerini değerlendirir.',
        ],
        mebExamFocus: 'Sabun ve deterjanın yapısındaki apolar kuyruk (kir tutan) ve polar baş (su tutan) analizi.',
      },
    ],
  },

  biyoloji: {
    key: 'biyoloji',
    name: 'Biyoloji (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Hücre döngüsü, mitoz bölünme evreleri, sitokinez ve eşeysiz üreme çeşitleri.',
      term1Exam2: 'Mayoz bölünme evreleri (Mayoz I ve Mayoz II), krossing-over, eşeyli üreme ve döllenme.',
      term2Exam1: 'Mendel genetiği, monohibrit ve dihibrit çaprazlamalar, eş baskınlık ve kan grupları (ABO/Rh).',
      term2Exam2: 'Eşeye bağlı kalıtım (hemofili, renk körlüğü), soyağaçları, ekosistem ekolojisi ve madde döngüleri.',
    },
    units: [
      {
        id: 'l2-biy-u1',
        unitNumber: 1,
        title: 'Hücre Bölünmeleri ve Üreme',
        semester: 1,
        outcomes: [
          'Mitoz bölünmenin evrelerini (profaz, metafaz, anafaz, telofaz) mikroskobik görseller üzerinden açıklar.',
          'Bitki ve hayvan hücresi sitokinezini (ara lamel vs boğumlanma) karşılaştırır.',
          'Eşeysiz üreme biçimlerini (bölünerek, tomurcuklanma, sporla, rejenerasyon, vejetatif, partenogenez) örneklendirir.',
          'Mayoz bölünmede homolog kromozom ayrılması ve krossing-over ile çeşitlilik oluşumunu açıklar.',
          'Mitoz ve mayoz bölünmeyi kromozom sayısı ve genetik yapı bakımından karşılaştırır.',
        ],
        mebExamFocus: 'Mitoz ve mayozda kromozom sayısı-DNA miktarı grafikleri ve krossing-over evresi (Profaz I).',
      },
      {
        id: 'l2-biy-u2',
        unitNumber: 2,
        title: 'Kalıtımın Genel İlkeleri',
        semester: 2,
        outcomes: [
          'Mendel ilkelerini (ayrılma ve bağımsız dağılım) monohibrit ve dihibrit çaprazlamalarla açıklar.',
          'Eş baskınlık, çok alellilik ve ABO/Rh kan grubu sistemini genotip ve fenotipleriyle çözer.',
          'İnsanda cinsiyete bağlı kalıtılan (hemofili ve kırmızı-yeşil renk körlüğü) hastalıkların aktarımını modeller.',
          'Soyağaçlarında otozomal ve gonozomal çekinik/baskın genlerin taşınma olasılıklarını hesaplar.',
        ],
        mebExamFocus: 'Soyağacı analizi (X\'e bağlı çekinik veya otozomal çekinik taşınma) ve kan grubu çaprazlamaları.',
      },
      {
        id: 'l2-biy-u3',
        unitNumber: 3,
        title: 'Ekosistem Ekolojisi ve Güncel Çevre Sorunları',
        semester: 2,
        outcomes: [
          'Ekosistemin abiyotik ve biyotik unsurlarını besin piramidi üzerinde modeller.',
          'Besin zincirinde üreticiden son tüketiciye gidildikçe aktarılan enerjiyi (%10 kuralı) ve biyolojik birikimi açıklar.',
          'Karbon, azot ve su döngülerinin ekolojik dengedeki işlevini değerlendirir.',
          'Küresel iklim değişikliğinin nedenlerini ve ekolojik ayak izini azaltma yollarını kavrar.',
        ],
        mebExamFocus: 'Besin piramidinde biyolojik birikim (zehir) artışı ve azot döngüsünde nitrifikasyon basamakları.',
      },
    ],
  },

  edebiyat: {
    key: 'edebiyat',
    name: 'Türk Dili ve Edebiyatı (10. Sınıf)',
    weeklyHours: 5,
    passingThreshold: 70, // MEB Ortaöğretim Kurumları Yönetmeliği Baraj Dersi
    isBarajDersi: true,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Edebiyatın tarih ve din ile ilişkisi, Türk edebiyatının dönemleri, Dede Korkut hikâyeleri, fiilimsiler.',
      term1Exam2: 'Halk hikâyesi, mesnevi, Tanzimat ve Millî Edebiyat hikâyeleri, İslamiyet öncesi şiir (koşuk/sagu), isim tamlamaları.',
      term2Exam1: 'Geçiş dönemi eserleri (Kutadgu Bilig vb.), Divan şiiri nazım şekilleri (gazel, kaside), aruz ölçüsü, destan türü.',
      term2Exam2: 'Tanzimat ve Millî Edebiyat romanı, geleneksel Türk tiyatrosu (Karagöz, Orta Oyunu), cümle türleri ve yazım kuralları.',
    },
    units: [
      {
        id: 'l2-edb-u1',
        unitNumber: 1,
        title: 'Giriş ve Hikâye',
        semester: 1,
        outcomes: [
          'Edebiyatın tarih ve dinle olan karşılıklı etkileşimini açıklar.',
          'Türk edebiyatının üç ana dönemini (İslamiyet öncesi, İslami dönem, Batı etkisinde) sınıflandırır.',
          'Dede Korkut hikâyelerinin geçiş dönemi özelliklerini ve anlatım tarzını tahlil eder.',
          'Halk hikâyesi, mesnevi ve modern hikâyenin yapı unsurlarını karşılaştırır.',
        ],
        mebExamFocus: 'Dede Korkut hikâyeleri nitelikleri, mesnevi kafiye düzeni (aa bb cc) ve fiilimsiler.',
      },
      {
        id: 'l2-edb-u2',
        unitNumber: 2,
        title: 'Şiir (İslamiyet Öncesi, Geçiş Dönemi, Halk ve Divan Şiiri)',
        semester: 1,
        outcomes: [
          'Koşuk ve sagu nazım şekillerini biçim ve içerik açısından inceler.',
          'Kutadgu Bilig, Divanü Lugati\'t-Türk, Atabetü\'l-Hakayık ve Divan-ı Hikmet\'in edebi özelliklerini kavrar.',
          'Âşık tarzı halk şiirinde koşma ve semai türlerini ahenk unsurlarıyla çözümler.',
          'Divan şiirinde gazel ve kasidenin beyit sayısı, kafiye örgüsü ve mahlas beytini bulur.',
        ],
        mebExamFocus: 'Kutadgu Bilig özellikleri, gazelde matla/makta beyti ve isim tamlamaları türleri.',
      },
      {
        id: 'l2-edb-u3',
        unitNumber: 3,
        title: 'Destan ve Efsane',
        semester: 2,
        outcomes: [
          'Türk destanlarının (Ergenekon, Türeyiş, Oğuz Kağan vb.) mitolojik motiflerini (kurt, ışık, ok/yay) belirler.',
          'Doğal ve yapay destanların oluşum aşamalarını karşılaştırır.',
        ],
        mebExamFocus: 'Doğal destan oluşum basamakları (doğuş, yayılma, derleme) ve sıfat tamlamaları.',
      },
      {
        id: 'l2-edb-u4',
        unitNumber: 4,
        title: 'Roman, Tiyatro ve Cümle Türleri',
        semester: 2,
        outcomes: [
          'Tanzimat, Servetifünun ve Millî Edebiyat romanlarının tema ve teknik özelliklerini karşılaştırır.',
          'Geleneksel Türk tiyatrosu (Karagöz, Orta Oyunu, Meddah) tiplerini (Hacivat, Pişekâr, Kavuklu) çözümler.',
          'Cümleleri yüklemin türüne, yerine, anlamına ve yapısına (basit, birleşik, sıralı, bağlı) göre tahlil eder.',
        ],
        mebExamFocus: 'Karagöz ile Orta Oyunu karşılaştırması ve birleşik/sıralı/bağlı cümle ayrımı.',
      },
    ],
  },

  tarih: {
    key: 'tarih',
    name: 'Tarih (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Malazgirt sonrası Anadolu beylikleri, Türkiye Selçuklu Devleti, Haçlı Seferleri ve Kösedağ Savaşı.',
      term1Exam2: 'Osmanlı\'nın kuruluşu, iskân ve istimalet politikası, Balkan fetihleri, Ankara Savaşı ve Fetret Devri.',
      term2Exam1: 'Tımar sistemi, Kapıkulu Ocakları, Yeniçeriler, Osmanlı ilmiye-seyfiye-kalemiye sınıfları ve Ahilik.',
      term2Exam2: 'İstanbul\'un fethi, Fatih Kanunnamesi, Yavuz dönemi doğu seferleri, Kanuni dönemi ve Divan-ı Hümayun teşkilatı.',
    },
    units: [
      {
        id: 'l2-tar-u1',
        unitNumber: 1,
        title: 'Selçuklu Türkiyesi ve Beylikler',
        semester: 1,
        outcomes: [
          '1071 Malazgirt sonrası Anadolu\'da kurulan I. Dönem beyliklerinin (Danişmentliler, Saltuklular vb.) kültürel mirasını kavrar.',
          'Türkiye Selçuklu Devleti\'nin ticareti geliştirme politikalarını (kervansaraylar, sigortacılık) açıklar.',
          'Kösedağ Savaşı\'nın (1243) Anadolu\'daki siyasi birliğin bozulmasındaki rolünü değerlendirir.',
        ],
        mebExamFocus: 'Miryokefalon Zaferi\'nin önemi ve Kösedağ Savaşı sonrası II. Beylikler Dönemi.',
      },
      {
        id: 'l2-tar-u2',
        unitNumber: 2,
        title: 'Beylikten Devlete Osmanlı Siyaseti',
        semester: 1,
        outcomes: [
          'Osmanlı Beyliği\'nin kısa sürede büyümesinde jeopolitik konum, adaletli yönetim ve gaza anlayışını açıklar.',
          'İskân ve istimalet politikalarının Balkanlar\'daki kalıcılığa etkilerini değerlendirir.',
          'Ankara Savaşı (1402) ve sonrasındaki Fetret Devri\'nin devlete etkilerini irdeler.',
        ],
        mebExamFocus: 'İstimalet (hoşgörü) politikasının aşamaları ve Fetret Devri\'nde Balkanlar\'ın durumu.',
      },
      {
        id: 'l2-tar-u3',
        unitNumber: 3,
        title: 'Devletleşme Sürecinde Askerler ve Medeniyet',
        semester: 2,
        outcomes: [
          'Tımar sisteminin askeri, tarımsal ve idari faydalarını analiz eder.',
          'Devşirme sistemiyle yetiştirilen Yeniçeri Ocağı\'nın merkezi otoriteye katkısını değerlendirir.',
          'Ahilik teşkilatının mesleki ahlak ve usta-çırak ilişkisindeki rolünü kavrar.',
        ],
        mebExamFocus: 'Tımar sisteminin hazineye yük olmadan ordu besleme ilkesi ve Ahilik kuralları.',
      },
      {
        id: 'l2-tar-u4',
        unitNumber: 4,
        title: 'Dünya Gücü Osmanlı Devleti',
        semester: 2,
        outcomes: [
          'İstanbul\'un fethinin askeri, stratejik ve dünya tarihi sonuçlarını değerlendirir.',
          'Yavuz Sultan Selim döneminde Safevi ve Memlüklerle yapılan mücadeleleri açıklar.',
          'Kanuni döneminde Osmanlı\'nın Avrupa siyasetindeki belirleyici rolünü ve Preveze Deniz Zaferi\'ni kavrar.',
          'Divan-ı Hümayun üyelerinin (sadrazam, defterdar, nişancı vb.) görev alanlarını ilişkilendirir.',
        ],
        mebExamFocus: 'İstanbul\'un fethinin sonuçları ve Divan üyelerinin yetki dağılımı.',
      },
    ],
  },

  cografya: {
    key: 'cografya',
    name: 'Coğrafya (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Yerin iç yapısı, levha tektoniği, iç kuvvetler (orojenez, epirojenez, volkanizma, depremler), kayaç türleri.',
      term1Exam2: 'Dış kuvvetler (akarsular, karstik şekiller, rüzgârlar, buzullar), Türkiye\'nin yer şekilleri ve jeolojik evrimi.',
      term2Exam1: 'Türkiye\'nin suları, toprak tipleri ve bitki örtüsü, dünyada nüfusun tarihsel gelişimi ve dağılışı.',
      term2Exam2: 'Nüfus piramitleri, Türkiye\'de nüfus ve göç hareketleri, uluslararası deniz ticaret yolları ve afet yönetimi.',
    },
    units: [
      {
        id: 'l2-cog-u1',
        unitNumber: 1,
        title: 'Doğal Sistemler (İç ve Dış Kuvvetler)',
        semester: 1,
        outcomes: [
          'Levha tektoniği kuramını ve yer kabuğunun hareketlerini iç kuvvetlerle (orojenez, volkanizma, deprem) ilişkilendirir.',
          'Püskürük, tortul ve başkalaşım kayaç türlerini özellikleriyle ayırt eder.',
          'Akarsu, rüzgâr ve karstik şekillerin aşınım ve birikim süreçlerini tahlil eder.',
        ],
        mebExamFocus: 'Orojenezde kıvrılma-kırılma (horst-graben) ve delta ovası oluşum koşulları.',
      },
      {
        id: 'l2-cog-u2',
        unitNumber: 2,
        title: 'Türkiye\'nin Fiziki Coğrafyası (Yer Şekilleri, Su, Toprak, Bitki)',
        semester: 1,
        outcomes: [
          'Türkiye\'nin genç oluşumlu bir ülke olmasının yer şekillerine ve depremselliğe etkilerini açıklar.',
          'Türkiye\'nin akarsu rejimlerini ve göl türlerini (tektonik, volkanik, karstik) sınıflandırır.',
          'Türkiye\'deki toprak türlerini ve bitki formasyonlarını (maki, orman, bozkır) harita üzerinde gösterir.',
        ],
        mebExamFocus: 'Türkiye\'de fay hatları ve deprem dağılışı ile maki-garig bitki örtüsü özellikleri.',
      },
      {
        id: 'l2-cog-u3',
        unitNumber: 3,
        title: 'Beşerî Sistemler (Nüfus ve Göç)',
        semester: 2,
        outcomes: [
          'Nüfus piramitlerinin taban ve tavan genişliğine bakarak ülkelerin gelişmişlik düzeyini belirler.',
          'Türkiye\'de nüfusun mekânsal dağılışında iklim ve yer şekillerinin etkisini irdeler.',
          'İç ve dış göçlerin ekonomik, sosyal ve mekânsal sonuçlarını değerlendirir.',
        ],
        mebExamFocus: 'Nüfus piramidi okuma (gelişmiş vs gelişmekte olan ülke) ve beyin göçünün etkileri.',
      },
      {
        id: 'l2-cog-u4',
        unitNumber: 4,
        title: 'Küresel Ortam ve Çevre (Ulaşım Yolları ve Afetler)',
        semester: 2,
        outcomes: [
          'Dünya deniz ticaretinde kritik boğaz ve kanalların (Hürmüz, Malakka, Süveyş, Panama) konumunu açıklar.',
          'Türkiye\'deki afet türlerini (deprem, heyelan, çığ, sel) ve afet öncesi hazırlık süreçlerini kavrar.',
        ],
        mebExamFocus: 'Petrol taşımacılığında Hürmüz Boğazı ve mühendislik harikası Panama Kanalı.',
      },
    ],
  },

  felsefe: {
    key: 'felsefe',
    name: 'Felsefe (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Felsefenin anlamı, doğuşu, felsefi düşüncenin nitelikleri (refleksif, kümülatif, rasyonel), felsefe ve hikmet ilişkisi.',
      term1Exam2: 'Akıl yürütme yöntemleri (tümdengelim, tümevarım, analoji), doğruluk ve gerçeklik, dil ve felsefe ilişkisi.',
      term2Exam1: 'Varlık felsefesi (ontoloji), varlığın mahiyeti (idealizm, materyalizm, düalizm), bilgi felsefesi (epistemoloji).',
      term2Exam2: 'Ahlak felsefesi (etik), ahlak yasası ve özgürlük, din felsefesi, siyaset felsefesi ve sanat felsefesi (estetik).',
    },
    units: [
      {
        id: 'l2-fel-u1',
        unitNumber: 1,
        title: 'Felsefeyi Tanıma',
        semester: 1,
        outcomes: [
          'Felsefenin kelime anlamını (philosophia - bilgelik sevgisi) ve hikmetle (hikmet) ilişkisini açıklar.',
          'Felsefenin Antik İyonya\'da mitolojiden akla geçişle ortaya çıkış koşullarını kavrar.',
          'Felsefi düşüncenin temel niteliklerini (sorgulayıcı, refleksif, eleştirel, rasyonel, kümülatif, evrensel) analiz eder.',
          'Felsefenin bireye (eleştirel bakış, önyargılardan arınma) ve topluma katkılarını açıklar.',
        ],
        mebExamFocus: 'Felsefi düşüncenin özellikleri: Refleksif (düşünce üzerine düşünme) ve kümülatif (yığılan) olması.',
      },
      {
        id: 'l2-fel-u2',
        unitNumber: 2,
        title: 'Felsefe ile Düşünme',
        semester: 1,
        outcomes: [
          'Tümdengelim, tümevarım ve analoji akıl yürütme yöntemlerini argümanlarda ayırt eder.',
          'Doğruluk (önermenin gerçekliğe uygunluğu) ile gerçeklik (zihinden bağımsız var olan) farkını kavrar.',
          'Akıl yürütmede tutarlılık ve çelişiklik kavramlarını açıklar.',
        ],
        mebExamFocus: 'Tümdengelim (genelden özele) ve analoji (benzeşim) örnekleri üzerinden akıl yürütme soruları.',
      },
      {
        id: 'l2-fel-u3',
        unitNumber: 3,
        title: 'Varlık ve Bilgi Felsefesi',
        semester: 2,
        outcomes: [
          'Ontolojide varlığın var olup olmadığını (nihilizm vs realizm) ve varlığın mahiyetini (madde, idea, düalizm) tartışır.',
          'Epistemolojide doğru bilginin kaynağına dair akımları (rasyonalizm, empirizm, kritisizm, pozitivizm) karşılaştırır.',
        ],
        mebExamFocus: 'Rasyonalizm (akılcılık) ile Empirizm (deneycilik) çatışması ve Kant\'ın kritisizmi.',
      },
      {
        id: 'l2-fel-u4',
        unitNumber: 4,
        title: 'Ahlak, Din, Siyaset ve Sanat Felsefesi',
        semester: 2,
        outcomes: [
          'Etikte ahlaki eylemin amacını ve irade özgürlüğünü (determinizm, indeterminizm, otodeterminizm) irdeler.',
          'Tanrı\'nın varlığına ilişkin temel yaklaşımları (teizm, deizm, panteizm, agnostisizm, ateizm) açıklar.',
          'Devletin meşruiyetini ve ideal düzen arayışlarını (ütopyalar) karşılaştırır.',
          'Estetikte taklit, yaratma ve oyun kuramlarını sanat eseri üzerinden tahlil eder.',
        ],
        mebExamFocus: 'Ahlaki özgürlük yaklaşımları (determinizm vs otodeterminizm) ve deizm-teizm farkı.',
      },
    ],
  },

  ingilizce: {
    key: 'ingilizce',
    name: 'Birinci Yabancı Dil (İngilizce 10)',
    weeklyHours: 4,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Themes 1 & 2: School routines, future plans and ambitions (will vs be going to), making arrangements.',
      term1Exam2: 'Themes 3 & 4: Legendary figures, biographies, Simple Past vs Past Continuous, cultural traditions.',
      term2Exam1: 'Themes 5 & 6: Travel experiences, Present Perfect Tense, modals of advice and obligation (should, must, have to).',
      term2Exam2: 'Themes 7 & 8: Food and cooking verbs, digital era, cyber ethics and Type 1 Conditionals (If clauses).',
    },
    units: [
      {
        id: 'l2-ing-u1',
        unitNumber: 1,
        title: 'School Life & Future Plans (Themes 1 & 2)',
        semester: 1,
        outcomes: [
          'Expresses personal interests and academic goals in school life.',
          'Talks about future plans, intentions and predictions using "will" and "be going to".',
        ],
        mebExamFocus: 'Future forms distinction: Planned intentions (be going to) vs instant decisions (will).',
      },
      {
        id: 'l2-ing-u2',
        unitNumber: 2,
        title: 'Legendary Figures & Traditions (Themes 3 & 4)',
        semester: 1,
        outcomes: [
          'Narrates past events and historical achievements using Simple Past and Past Continuous.',
          'Describes cultural traditions, ceremonies and national festivals.',
        ],
        mebExamFocus: 'Past narrative clauses with "when" and "while".',
      },
      {
        id: 'l2-ing-u3',
        unitNumber: 3,
        title: 'Travel & Helpful Tips (Themes 5 & 6)',
        semester: 2,
        outcomes: [
          'Expresses life experiences and travel memories using Present Perfect Tense.',
          'Gives advice and explains school or workplace rules using modal auxiliaries (should, must, have to).',
        ],
        mebExamFocus: 'Present Perfect with "ever, never, just, already" and modal obligations.',
      },
      {
        id: 'l2-ing-u4',
        unitNumber: 4,
        title: 'Digital Era & Innovation (Themes 7 & 8)',
        semester: 2,
        outcomes: [
          'Discusses technological innovations, cyber safety and online ethics.',
          'Uses Type 1 Conditional sentences (If + present, will + verb) to talk about possible future conditions.',
        ],
        mebExamFocus: 'First Conditional (If clauses) and technology vocabulary.',
      },
    ],
  },

  din: {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi (10. Sınıf)',
    weeklyHours: 2,
    passingThreshold: 50,
    isBarajDersi: false,
    annualExamCount: 4,
    mebScenarioSummary: {
      term1Exam1: 'Allah\'ın Zati ve Subuti sıfatları, insanın Allah ile irtibat yolları (dua, ibadet, tevbe, Kur\'an).',
      term1Exam2: 'İslam düşüncesinde mezheplerin ortaya çıkış sebepleri, itikadi (Eş\'arilik, Maturidilik) ve ameli mezhepler.',
      term2Exam1: 'Dinin aile, toplum, sanat ve kültür üzerindeki koruyucu ve birleştirici etkileri.',
      term2Exam2: 'İslam ahlakının kaynakları, temel erdemler (adalet, emanet), tasavvufi düşünce ve Alevi-Bektaşi kültürü.',
    },
    units: [
      {
        id: 'l2-din-u1',
        unitNumber: 1,
        title: 'Allah İnancı ve İnsan',
        semester: 1,
        outcomes: [
          'Allah\'ın Zati sıfatlarını (Vücud, Kıdem, Beka, Vahdaniyet, Muhalefetün lil-havadis, Kıyam bi-nefsihi) açıklar.',
          'Allah\'ın Subuti sıfatlarını (Hayat, İlim, Semi, Basar, İrade, Kudret, Kelam, Tekvin) delilleriyle kavrar.',
          'Dua, ibadet, tevbe ve Kur\'an okumanın insanın manevi gelişimindeki rolünü değerlendirir.',
        ],
        mebExamFocus: 'Zati (sadece Allah\'a has) ve Subuti (benzeri insana sınırlı verilen) sıfatların ayrımı.',
      },
      {
        id: 'l2-din-u2',
        unitNumber: 2,
        title: 'İslam Düşüncesinde Yorumlar (Mezhepler)',
        semester: 1,
        outcomes: [
          'İslam\'ın ana kaynaklarının farklı yorumlanmasının bir zenginlik olduğunu kavrar.',
          'İtikadi yorumları (Maturidilik, Eş\'arilik) ve kurucularını açıklar.',
          'Fıkhi/ameli yorumları (Hanefilik, Şafiilik, Malikilik, Hanbelilik, Caferilik) tanır.',
        ],
        mebExamFocus: 'İtikadi mezhepler ile fıkhi mezheplerin farkı ve Maturidilikte aklın önemi.',
      },
      {
        id: 'l2-din-u3',
        unitNumber: 3,
        title: 'Din ve Hayat',
        semester: 2,
        outcomes: [
          'Dinin aileyi koruma, toplumsal dayanışma ve adalet tesis etmedeki rolünü açıklar.',
          'İslam medeniyetinde cami mimarisi, hüsn-i hat, ebru ve musiki gibi sanat eserlerini değerlendirir.',
        ],
        mebExamFocus: 'Dinin temel gayeleri (can, akıl, mal, nesil ve din emniyeti) ve sanat yansımaları.',
      },
      {
        id: 'l2-din-u4',
        unitNumber: 4,
        title: 'Ahlaki Tutumlar ve Tasavvufi Düşünce',
        semester: 2,
        outcomes: [
          'Adalet, dürüstlük, emanet ve cömertlik erdemlerini ayet ve hadislerle açıklar.',
          'Tasavvufun nefs terbiyesi ve ahlak güzelleştirme hedefini kavrar.',
          'Mevlevilik, Yesevilik ve Alevi-Bektaşi kültüründe cem, semah ve gülbenk ritüellerinin anlamını kavrar.',
        ],
        mebExamFocus: 'Alevi-Bektaşi kültüründe dört kapı kırk makam ve cem ibadeti kavramları.',
      },
    ],
  },
};

/**
 * Belirtilen dersin konularını döndürür
 */
export function getLise2TopicsByCourse(courseKey: Lise2CourseKey): readonly string[] {
  return LISE2_TOPICS_BY_COURSE[courseKey] || [];
}

/**
 * Ders kodundan Türkçe ders adını döndürür
 */
export function getLise2CourseName(courseKey: Lise2CourseKey): string {
  const found = LISE2_COURSE_OPTIONS.find((c) => c.key === courseKey);
  return found ? found.name : courseKey;
}

/**
 * Bir 10. sınıf dersinin detaylı MEB müfredat metadatasını döndürür
 */
export function getLise2CourseMetadata(courseKey: Lise2CourseKey): Lise2CourseDetailedMetadata | undefined {
  return LISE2_DETAILED_CURRICULUM[courseKey];
}

/**
 * Bir 10. sınıf dersinin resmi ünitelerini döndürür
 */
export function getLise2UnitsByCourse(courseKey: Lise2CourseKey): Lise2Unit[] {
  return LISE2_DETAILED_CURRICULUM[courseKey]?.units || [];
}

/**
 * MEB Ortak Yazılı Sınavı için ilgili dönem ve yazılı numarasına göre odak konuları döndürür
 */
export function getLise2ExamTopicsForSemester(
  courseKey: Lise2CourseKey,
  semester: 1 | 2,
  examNumber: 1 | 2
): string {
  const meta = LISE2_DETAILED_CURRICULUM[courseKey];
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
export function getLise2PassingThreshold(courseKey: Lise2CourseKey): number {
  return courseKey === 'edebiyat' ? 70 : 50;
}
