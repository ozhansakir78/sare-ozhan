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
  weeklyHours: number; // MEB Anadolu / Fen Lisesi haftalık ders saati (ağırlık katsayısı)
  isPassingRequirement?: boolean; // MEB Baraj dersi (Türk Dili ve Edebiyatı için 70 barajı)
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
    isPassingRequirement: true, // MEB Yeni Yönetmelik: 70 barajı
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
    colorTheme: {
      bg: 'bg-purple-50/60 dark:bg-purple-950/20',
      border: 'border-purple-200 dark:border-purple-900/50',
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    },
  },
] as const;

export const LISE1_TOPICS_BY_COURSE: Record<Lise1CourseKey, readonly string[]> = {
  edebiyat: [
    'Giriş: Edebiyatın Tanımı ve Güzel Sanatlar İçindeki Yeri',
    'İletişim ve İletişimin Temel Ögeleri',
    'Hikâye (Olay Hikâyesi - Maupassant & Durum Hikâyesi - Çehov)',
    'Hikâyede Anlatıcı ve Bakış Açıları (Hâkim, Kahraman, Gözlemci)',
    'Şiir Bilgisi (Nazım Birimi, Ölçü, Kafiye, Redif, Ahenk Unsurları)',
    'Şiir Türleri (Lirik, Pastoral, Epik, Didaktik, Satirik)',
    'Masal ve Fabl (Özellikleri, Planı ve Teşhis-İntak Sanatları)',
    'Romanın Yapı Unsurları (Olay, Kişi, Zaman, Mekân)',
    'Tiyatro (Temel Terimler, Komedi, Trajedi, Dram)',
    'Biyografi, Otobiyografi, Tezkire ve Monografi',
    'Mektup, E-Posta ve Dilekçe Yazım Kuralları',
    'Dil Bilgisi: İsimler (Adlar) ve İsim Tamlamaları',
    'Dil Bilgisi: Sıfatlar (Ön Adlar) ve Sıfat Tamlamaları',
    'Dil Bilgisi: Zamirler (Adıllar)',
    'Dil Bilgisi: Zarflar (Belirteçler)',
    'Yazım Kuralları ve Noktalama İşaretleri',
  ],
  matematik: [
    'Mantık: Önermeler, Doğruluk Değeri ve Denk Önermeler',
    'Mantık: Bileşik Önermeler (Ve, Veya, Ya Da, İse, Ancak ve Ancak)',
    'Mantık: Koşullu Önerme ve Karşıt, Ters, Karşıt Ters Kavramları',
    'Mantık: Totoloji, Çelişki ve Niceleyiciler (Her, Bazı)',
    'Kümeler: Küme Kavramı ve Gösterim Yöntemleri',
    'Kümeler: Alt Küme ve Öz Alt Küme',
    'Kümelerde İşlemler (Kesişim, Birleşim, Fark, Tümleme)',
    'Kümelerde Kartezyen Çarpım ve Grafiği',
    'Küme Problemleri (Gerçek Hayat Uygulamaları)',
    'Denklem ve Eşitsizlikler: Sayı Kümeleri ve Bölünebilme Kuralları',
    'EBOB - EKOK ve Periyodik Tekrar Eden Problemler',
    'Birinci Dereceden Bir Bilinmeyenli Denklem ve Eşitsizlikler',
    'Mutlak Değer ve Özellikleri',
    'Birinci Dereceden İki Bilinmeyenli Denklem Sistemleri',
    'Üslü İfadeler ve Özellikleri',
    'Köklü İfadeler ve Özellikleri',
    'Oran - Orantı ve Orantı Çeşitleri (Doğru, Ters, Bileşik)',
    'Problemler: Sayı ve Kesir Problemleri',
    'Problemler: Yaş Problemleri',
    'Problemler: Yüzde, Kâr - Zarar Problemleri',
    'Problemler: Karışım Problemleri',
    'Problemler: Hareket ve Hız Problemleri',
    'Üçgenler: Üçgende Açılar ve Açıortay Bağıntıları',
    'Üçgenler: Üçgende Açı - Kenar Bağıntıları',
    'Üçgenler: Üçgenlerin Eşliği ve Benzerliği (Thales Teoremi)',
    'Üçgenler: Kenarortay ve Ağırlık Merkezi',
    'Üçgenler: Dik Üçgen ve Pisagor Bağıntısı',
    'Üçgenler: Öklid Bağıntıları',
    'Üçgenler: Dar Açılı Dik Üçgende Trigonometrik Oranlar',
    'Üçgenin Alanı ve Alan Parçalama',
    'Veri: Merkezi Eğilim Ölçüleri (Aritmetik Ortalama, Medyan, Mod)',
    'Veri: Merkezi Yayılım Ölçüleri (Açıklık, Standart Sapma) ve Grafikler',
  ],
  fizik: [
    'Fizik Bilimine Giriş: Fiziğin Tanımı ve Alt Dalları (KAMYONET)',
    'Fiziksel Büyüklükler (Temel ve Türetilmiş, Skaler ve Vektörel)',
    'Madde ve Özellikleri: Kütle, Hacim ve Özkütle (d = m / V)',
    'Dayanıklılık (Boyutlar Arası İlişkiler ve Galileo Prensibi)',
    'Adezyon, Kohezyon, Yüzey Gerilimi ve Kılcallık Olayı',
    'Hareket: Konum, Alınan Yol, Yer Değiştirme, Sürat ve Hız',
    'Düzgün Doğrusal Hareket ve Hareket Grafikleri',
    'İvme Kavramı ve Ortalama İvme',
    'Kuvvet: Temel Kuvvetler ve Newton\'ın Hareket Yasaları (Eylemsizlik, Temel Prensip, Etki-Tepki)',
    'Sürtünme Kuvveti (Statik ve Kinetik Sürtünme)',
    'İş, Güç ve Mekanik Enerji (Kinetik ve Potansiyel Enerji)',
    'Mekanik Enerjinin Korunumu ve Verim',
    'Isı, Sıcaklık ve İç Enerji Kavramları',
    'Termometreler ve Sıcaklık Ölçekleri (Celcius, Kelvin, Fahrenheit)',
    'Özgül Isı, Isı Sığası ve Hal Değişimi (Q = m.c.ΔT ve Q = m.L)',
    'Isıl Denge ve Isı İletim Yolları (İletim, Konveksiyon, Işıma)',
    'Elektrostatik: Elektrik Yükleri ve Sürtünme/Dokunma/Etki ile Elektriklenme',
    'Elektroskop ve Coulomb Kanunu',
  ],
  kimya: [
    'Kimya Bilimi: Simyadan Kimyaya Geçiş Süreci',
    'Kimya Disiplinleri (Organik, Anorganik, Analitik, Fizikokimya, Biyokimya)',
    'Kimyacıların Çalışma Alanları ve Laboratuvar Temel Malzemeleri',
    'Elementler, Sembolleri ve Bileşik Formülleri',
    'Kimya Laboratuvarında Güvenlik Kuralları ve Güvenlik Piktogramları',
    'Atom Modelleri: Dalton, Thomson, Rutherford ve Bohr Atom Modeli',
    'Atomun Yapısı: Proton, Nötron, Elektron, İzotop, İzobar, İzoton ve İzoelektronik Tanecikler',
    'Periyodik Sistem: Tarihçesi ve Katman Elektron Dağılımı',
    'Periyodik Özelliklerin Değişimi (Yarıçap, İyonlaşma Enerjisi, Elektronegatiflik, Elektron İlgisi)',
    'Kimyasal Türler Arası Etkileşimler: Güçlü Etkileşimler (İyonik Bağ)',
    'Kimyasal Türler Arası Etkileşimler: Kovalent Bağ (Apolar ve Polar Kovalent)',
    'Kimyasal Türler Arası Etkileşimler: Metalik Bağ ve Elektron Denizi Modeli',
    'Zayıf Etkileşimler: Van der Waals Etkileşimleri ve Dipol-Dipol Bağları',
    'Zayıf Etkileşimler: Hidrojen Bağı ve Su Molekülünün Önemi',
    'Maddenin Halleri: Katılar (Kristal ve Amorf Katılar)',
    'Sıvılar: Viskozite, Buharlaşma Hızı ve Denge Buhar Basıncı',
    'Gazlar ve Gazların Temel Özellikleri (Basınç, Hacim, Sıcaklık, Mol)',
    'Plazma Hali ve Özellikleri',
    'Doğa ve Kimya: Su Kaynakları, Sert ve Yumuşak Su',
    'Çevre Kimyası: Hava, Toprak ve Su Kirleticileri (Sera Gazları, Ozon Tabakası)',
  ],
  biyoloji: [
    'Canlıların Ortak Özellikleri (Hücresel Yapı, Beslenme, Solunum, Boşaltım, Hareket, Uyarılara Tepki, Uyum, Üreme, Metabolizma, Homeostazi)',
    'İnorganik Bileşikler: Su, Mineraller, Asitler, Bazlar ve Tuzlar',
    'Organik Bileşikler: Karbonhidratlar (Monosakkarit, Disakkarit, Polisakkarit)',
    'Organik Bileşikler: Lipitler (Trigliserit, Fosfolipit, Steroit)',
    'Organik Bileşikler: Proteinler (Amino Asitler, Peptit Bağı, Denatürasyon)',
    'Enzimler: Yapısı, Özellikleri ve Enzim Reaksiyon Hızını Etkileyen Faktörler',
    'Hormonlar ve Vitaminler (A, D, E, K ve B, C Vitaminleri)',
    'Nükleik Asitler: DNA ve RNA\'nın Yapısı ve Görevleri',
    'ATP: Canlılarda Enerji Akışı ve Fosforilasyon Türleri',
    'Hücre Teorisi ve Hücrenin Tarihsel Gelişimi',
    'Prokaryot ve Ökaryot Hücrelerin Karşılaştırılması',
    'Hücre Zarı ve Yapısı (Akıcı Mozaik Zar Modeli)',
    'Hücre Zarından Madde Geçişleri: Pasif Taşıma (Difüzyon, Kolaylaştırılmış Difüzyon, Osmoz)',
    'Hücre Zarından Madde Geçişleri: Aktif Taşıma, Endositoz ve Ekzositoz',
    'Hücre Organelleri: Zarsız Organeller (Ribozom, Sentrozom)',
    'Hücre Organelleri: Tek Zarlı Organeller (Endoplazmik Retikulum, Golgi, Lizozom, Peroksizom, Koful)',
    'Hücre Organelleri: Çift Zarlı Organeller (Mitokondri ve Kloroplast)',
    'Hücre Çekirdeği ve Sitoplazma İlişkisi',
    'Canlılar Dünyası: Sınıflandırmanın Temel İlkeleri ve İkili Adlandırma (Binomial)',
    'Canlı Âlemleri: Bakteriler, Arkeler ve Protistler',
    'Canlı Âlemleri: Bitkiler, Mantarlar ve Hayvanlar',
    'Virüslerin Genel Özellikleri ve Biyolojik Önemi',
  ],
  tarih: [
    'Tarih ve Zaman: Tarihin Tanımı, Yöntemi ve Kaynakları',
    'Zamanın Taksimi ve Türklerin Kullandığı Takvimler',
    'İnsanlığın İlk Dönemleri: İlk Çağ Medeniyetleri (Mezopotamya, Mısır, Anadolu, Ege, Çin, Hint)',
    'Orta Çağ\'da Dünya: Feodalizm, Siyasi Yapılar, Ticaret Yolları ve Hukuk',
    'İlk ve Orta Çağlarda Türk Dünyası: Orta Asya Kültür Merkezleri ve Türk Göçleri',
    'İlk Türk Devletleri: Asya Hun Devleti, Kök Türkler ve Uygurlar',
    'Eski Türklerde Devlet Teşkilatı, Ordu (Onlu Sistem) ve Toplumsal Yapı',
    'İslam Medeniyetinin Doğuşu: İslamiyet Öncesi Arabistan ve Hz. Muhammed Dönemi',
    'Dört Halife Dönemi ve Emeviler & Abbasiler Dönemi Medeniyet Hareketleri',
    'Türklerin İslamiyet\'i Kabulü ve Talas Savaşı\'nın Tarihsel Önemi',
    'İlk Türk - İslam Devletleri: Karahanlılar, Gazneliler ve Büyük Selçuklu Devleti',
  ],
  cografya: [
    'Doğa ve İnsan Etkileşimi, Coğrafyanın Bölümleri',
    'Dünya\'nın Şekli ve Hareketleri (Eksen Eğikliği, Mevsimlerin Oluşumu)',
    'Coğrafi Koordinat Sistemi: Paraleller, Meridyenler ve Enlem-Boylam Etkisi',
    'Yerel Saat ve Uluslararası Saat Dilimleri Hesaplamaları',
    'Harita Bilgisi: Harita Elemanları, Projeksiyon Türleri ve Ölçek Çeşitleri',
    'İzoips (Eş Yükselti Eğrileri) Yöntemi ile Yer Şekillerinin Gösterilmesi',
    'Atmosfer ve Katmanları, Hava Durumu ve İklim Farkı',
    'İklim Elemanları: Sıcaklık ve Sıcaklığın Dağılışını Etkileyen Faktörler',
    'İklim Elemanları: Basınç ve Rüzgârlar (Sürekli, Mevsimlik ve Yerel Rüzgârlar)',
    'İklim Elemanları: Nem ve Yağış Çeşitleri (Bağıl Nem, Maksimum Nem, Mutlak Nem)',
    'Dünya\'daki Büyük İklim Tipleri (Makroklima) ve Türkiye İklimi',
  ],
  ingilizce: [
    'Theme 1: Studying Abroad (Greetings, Jobs, Nationalities, Countries)',
    'Theme 2: My Environment (Neighborhood, Rooms, Furniture, Prepositions of Place)',
    'Theme 3: Movies (Movie Genres, Making Suggestions, Expressing Likes & Dislikes)',
    'Theme 4: Human in Nature (Daily Routines, Habits, Simple Present vs Present Continuous)',
    'Theme 5: Inspirational People (Physical Appearance, Personality, Biographical Facts)',
    'Theme 6: Bridging Cultures (Traditions, Customs, Festivals, Simple Past Tense)',
    'Theme 7: World Heritage (Historic Sites, Wonders of the World, Passive Voice Basics)',
    'Theme 8: Emergency and Health (Symptoms, Illnesses, Giving Advice with Should/Must)',
    'Theme 9: Invitations and Celebrations (Accepting & Refusing, Party Arrangements)',
    'Theme 10: Television and Social Media (Media Habits, Comparing Programs, Technology)',
  ],
  din: [
    'İslam ve Bilim: İslam Medeniyetinde Bilim ve Düşüncenin Gelişimi',
    'Kur\'an-ı Kerim\'de Akıl ve Bilgi: Aklın Önemi ve Doğru Bilgi Kaynakları',
    'İnanç Esasları: Allah İnancı, İsim ve Sıfatları (Tevhid İnancı)',
    'İslam Ahlakı: Temel Ahlaki Değerler (Adalet, İffet, Şecaat, Hikmet)',
    'İbadetler ve İbadetin Bireysel ve Toplumsal Faydaları',
    'Gençlik ve Değerler: Asr-ı Saadette Genç Sahabeler ve Rol Modeller',
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
