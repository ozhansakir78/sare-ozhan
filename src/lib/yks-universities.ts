export interface YksUniversityTarget {
  id: string;
  name: string;
  department: string;
  city: string;
  type: 'devlet' | 'vakif';
  scoreType: 'SAY' | 'EA' | 'SÖZ' | 'DİL';
  minScore: number; // Örn: 540.25 (Yerleştirme Puanı)
  minRank: number; // Başarı sırası (Örn: 250, 1500 vb.)
  targetObp: number; // İdeal lise diploma notu (örn: 96.5)
  idealTytNet: number; // 120 üzerinden ideal TYT Net (örn: 105)
  badge: string;
  description: string;
}

export const YKS_TOP_UNIVERSITIES: YksUniversityTarget[] = [
  {
    id: 'boun-ceng',
    name: 'Boğaziçi Üniversitesi',
    department: 'Bilgisayar Mühendisliği (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 548.8,
    minRank: 280,
    targetObp: 98.0,
    idealTytNet: 110,
    badge: '🏆 Türkiye Sayısal Zirvesi',
    description: 'Bebek, İstanbul. Türkiye\'nin en yüksek puanlı mühendislik programı ve global teknoloji liderliği.',
  },
  {
    id: 'odtu-ee',
    name: 'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    department: 'Elektrik-Elektronik Mühendisliği (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 542.4,
    minRank: 950,
    targetObp: 97.0,
    idealTytNet: 106,
    badge: '⚡ Savunma ve İleri Teknoloji',
    description: 'Çankaya, Ankara. Uluslararası akreditasyon ve AR-GE projelerinde Türkiye\'nin öncüsü.',
  },
  {
    id: 'itu-ai',
    name: 'İTÜ (İstanbul Teknik Üniversitesi)',
    department: 'Yapay Zekâ ve Veri Mühendisliği (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 539.1,
    minRank: 1600,
    targetObp: 96.5,
    idealTytNet: 104,
    badge: '🤖 Geleceğin Teknolojisi',
    description: 'Ayazağa, İstanbul. Türkiye\'nin ilk yapay zekâ mühendisliği lisans programı.',
  },
  {
    id: 'koc-tip',
    name: 'Koç Üniversitesi',
    department: 'Tıp Fakültesi (İngilizce - Tam Burslu)',
    city: 'İstanbul',
    type: 'vakif',
    scoreType: 'SAY',
    minScore: 554.2,
    minRank: 65,
    targetObp: 99.0,
    idealTytNet: 114,
    badge: '🔬 Türkiye Tıp Şampiyonu',
    description: 'Sarıyer, İstanbul. Dünya standartlarında klinik araştırma ve laboratuvar imkânları.',
  },
  {
    id: 'hacettepe-tip',
    name: 'Hacettepe Üniversitesi',
    department: 'Tıp Fakültesi (Türkçe)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 541.5,
    minRank: 1200,
    targetObp: 97.5,
    idealTytNet: 105,
    badge: '🩺 Türkiye\'nin Tıp Çınarı',
    description: 'Sıhhiye, Ankara. Köklü tıp eğitimi ve en geniş klinik vaka deneyimi.',
  },
  {
    id: 'cerrahpasa-tip',
    name: 'İstanbul Üniversitesi - Cerrahpaşa',
    department: 'Cerrahpaşa Tıp Fakültesi (Türkçe)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 537.8,
    minRank: 2100,
    targetObp: 96.0,
    idealTytNet: 102,
    badge: '🏥 Asırlık Hekimlik Geleneği',
    description: 'Fatih, İstanbul. Türkiye\'nin en saygın ve köklü tıp ekolü.',
  },
  {
    id: 'boun-isletme',
    name: 'Boğaziçi Üniversitesi',
    department: 'İşletme (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 524.6,
    minRank: 420,
    targetObp: 96.0,
    idealTytNet: 100,
    badge: '💼 Türkiye Eşit Ağırlık 1. Tercihi',
    description: 'Bebek, İstanbul. Finans, yönetim ve uluslararası danışmanlıkta zirve kariyer.',
  },
  {
    id: 'gs-hukuk',
    name: 'Galatasaray Üniversitesi',
    department: 'Hukuk Fakültesi (Fransızca)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 522.3,
    minRank: 600,
    targetObp: 96.5,
    idealTytNet: 98,
    badge: '⚖️ Uluslararası Hukuk Ekolü',
    description: 'Ortaköy, İstanbul. Çift dilli hukuk ve uluslararası tahkim kariyeri.',
  },
  {
    id: 'bilkent-ceng',
    name: 'İhsan Doğramacı Bilkent Üniversitesi',
    department: 'Bilgisayar Mühendisliği (Tam Burslu)',
    city: 'Ankara',
    type: 'vakif',
    scoreType: 'SAY',
    minScore: 546.5,
    minRank: 450,
    targetObp: 97.5,
    idealTytNet: 108,
    badge: '💻 Silikon Vadisi Ağı',
    description: 'Çankaya, Ankara. Dünya üniversitelerine doğrudan kabul ve güçlü mezun ağı.',
  },
  {
    id: 'ytu-yazilim',
    name: 'Yıldız Teknik Üniversitesi',
    department: 'Bilgisayar Mühendisliği',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 528.2,
    minRank: 4800,
    targetObp: 94.5,
    idealTytNet: 98,
    badge: '⭐ Teknopark ve Yazılım Gücü',
    description: 'Davutpaşa, İstanbul. Türkiye\'nin en büyük teknoparkında sanayiyle iç içe mühendislik.',
  },
  {
    id: 'ankara-hukuk',
    name: 'Ankara Üniversitesi',
    department: 'Hukuk Fakültesi',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 512.4,
    minRank: 1850,
    targetObp: 95.0,
    idealTytNet: 94,
    badge: '⚖️ Cumhuriyetin İlk Hukuk Fakültesi',
    description: 'Cebeci, Ankara. Türkiye\'nin en saygın hakim, savcı ve avukat yetiştiren tarihi fakültesi.',
  },
  {
    id: 'ege-tip',
    name: 'Ege Üniversitesi',
    department: 'Tıp Fakültesi',
    city: 'İzmir',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 532.6,
    minRank: 3200,
    targetObp: 96.5,
    idealTytNet: 100,
    badge: '🌿 Ege\'nin Sağlık Üssü',
    description: 'Bornova, İzmir. Güçlü akademik kadro ve uluslararası akredite tıp eğitimi.',
  },
  {
    id: 'gazi-tip',
    name: 'Gazi Üniversitesi',
    department: 'Tıp Fakültesi',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 530.8,
    minRank: 3600,
    targetObp: 96.0,
    idealTytNet: 98,
    badge: '🏛️ Başkentin Köklü Hekimliği',
    description: 'Beşevler, Ankara. Modern hastane kompleksi ve kapsamlı cerrahi vaka eğitimi.',
  },
  {
    id: 'deu-ceng',
    name: 'Dokuz Eylül Üniversitesi',
    department: 'Bilgisayar Mühendisliği (İngilizce)',
    city: 'İzmir',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 515.2,
    minRank: 9500,
    targetObp: 93.5,
    idealTytNet: 92,
    badge: '💻 Ege Yazılım Koridoru',
    description: 'Tınaztepe, Buca, İzmir. Bilişim ve yapay zekâ projelerinde öncü merkez.',
  },
  {
    id: 'akdeniz-tip',
    name: 'Akdeniz Üniversitesi',
    department: 'Tıp Fakültesi',
    city: 'Antalya',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 526.4,
    minRank: 4500,
    targetObp: 95.5,
    idealTytNet: 96,
    badge: '🏆 Organ Nakli ve Cerrahi Lideri',
    description: 'Konyaaltı, Antalya. Dünyaca ünlü kompozit doku ve organ nakli başarıları.',
  },
  {
    id: 'cukurova-tip',
    name: 'Çukurova Üniversitesi',
    department: 'Tıp Fakültesi (Balcalı)',
    city: 'Adana',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 523.1,
    minRank: 5200,
    targetObp: 95.0,
    idealTytNet: 95,
    badge: '🏥 Güneyin Bölge Hastanesi',
    description: 'Sarıçam, Adana. Balcalı kampüsü ve geniş klinik staj olanakları.',
  },
  {
    id: 'uludag-tip',
    name: 'Bursa Uludağ Üniversitesi',
    department: 'Tıp Fakültesi',
    city: 'Bursa',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 525.0,
    minRank: 4800,
    targetObp: 95.2,
    idealTytNet: 95,
    badge: '🌲 Marmara Sağlık Merkezi',
    description: 'Görükle, Nilüfer, Bursa. Güney Marmara\'nın en büyük araştırma hastanesi.',
  },
];

export interface TargetUniversityGap {
  university: YksUniversityTarget;
  currentEstimatedObp: number;
  obpGap: number;
  status: 'on_track' | 'close' | 'needs_boost';
  statusMessage: string;
}

export function analyzeUniversityTargetGap(
  targetId: string,
  currentTermAverage: number
): TargetUniversityGap | null {
  const target = YKS_TOP_UNIVERSITIES.find((u) => u.id === targetId);
  if (!target) return null;

  const obpGap = Number((target.targetObp - currentTermAverage).toFixed(2));

  let status: 'on_track' | 'close' | 'needs_boost' = 'on_track';
  let statusMessage = 'Harika! 9. sınıf notların hedeflediğin üniversite standardının üzerinde.';

  if (obpGap > 5) {
    status = 'needs_boost';
    statusMessage = `Hedefin için 9. sınıf ortalamanı ${obpGap} puan yükseltmen OBP avantajı sağlayacaktır.`;
  } else if (obpGap > 0) {
    status = 'close';
    statusMessage = `Hedefine çok yakınsın! Küçük bir çalışma artışıyla hedef OBP bandına yerleşeceksin.`;
  }

  return {
    university: target,
    currentEstimatedObp: currentTermAverage,
    obpGap,
    status,
    statusMessage,
  };
}

export function searchUniversities(query: string): YksUniversityTarget[] {
  if (!query || query.trim() === '') {
    return YKS_TOP_UNIVERSITIES.slice(0, 10);
  }
  const q = query.toLowerCase().trim();
  return YKS_TOP_UNIVERSITIES.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.scoreType.toLowerCase().includes(q)
  );
}

/**
 * Türkiye 81 İl Üniversite Rehberi (Devlet & Vakıf)
 */
export const TURKEY_UNIVERSITIES_BY_CITY: Record<string, string[]> = {
  'Adana': ['Çukurova Üniversitesi', 'Adana Alparslan Türkeş Bilim ve Teknoloji Üniversitesi'],
  'Adıyaman': ['Adıyaman Üniversitesi'],
  'Afyonkarahisar': ['Afyon Kocatepe Üniversitesi', 'Afyonkarahisar Sağlık Bilimleri Üniversitesi'],
  'Ağrı': ['Ağrı İbrahim Çeçen Üniversitesi'],
  'Amasya': ['Amasya Üniversitesi'],
  'Ankara': [
    'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    'Hacettepe Üniversitesi',
    'Ankara Üniversitesi',
    'Gazi Üniversitesi',
    'Bilkent Üniversitesi',
    'TOBB Ekonomi ve Teknoloji Üniversitesi',
    'Ankara Yıldırım Beyazıt Üniversitesi',
    'Başkent Üniversitesi',
    'Çankaya Üniversitesi',
    'TED Üniversitesi',
    'Atılım Üniversitesi',
    'Lokman Hekim Üniversitesi',
    'Ankara Medipol Üniversitesi',
    'Ankara Sosyal Bilimler Üniversitesi',
    'Ufuk Üniversitesi',
    'Ostim Teknik Üniversitesi',
    'Türk Hava Kurumu Üniversitesi',
    'Yüksek İhtisas Üniversitesi',
  ],
  'Antalya': ['Akdeniz Üniversitesi', 'Alanya Alaaddin Keykubat Üniversitesi', 'Antalya Bilim Üniversitesi', 'Alanya Üniversitesi'],
  'Artvin': ['Artvin Çoruh Üniversitesi'],
  'Aydın': ['Aydın Adnan Menderes Üniversitesi'],
  'Balıkesir': ['Balıkesir Üniversitesi', 'Bandırma Onyedi Eylül Üniversitesi'],
  'Bilecik': ['Bilecik Şeyh Edebali Üniversitesi'],
  'Bingöl': ['Bingöl Üniversitesi'],
  'Bitlis': ['Bitlis Eren Üniversitesi'],
  'Bolu': ['Bolu Abant İzzet Baysal Üniversitesi'],
  'Burdur': ['Burdur Mehmet Akif Ersoy Üniversitesi'],
  'Bursa': ['Bursa Uludağ Üniversitesi', 'Bursa Teknik Üniversitesi', 'Mudanya Üniversitesi'],
  'Çanakkale': ['Çanakkale Onsekiz Mart Üniversitesi'],
  'Çankırı': ['Çankırı Karatekin Üniversitesi'],
  'Çorum': ['Hitit Üniversitesi'],
  'Denizli': ['Pamukkale Üniversitesi'],
  'Diyarbakır': ['Dicle Üniversitesi'],
  'Edirne': ['Trakya Üniversitesi'],
  'Elazığ': ['Fırat Üniversitesi'],
  'Erzincan': ['Erzincan Binali Yıldırım Üniversitesi'],
  'Erzurum': ['Atatürk Üniversitesi', 'Erzurum Teknik Üniversitesi'],
  'Eskişehir': ['Eskişehir Anadolu Üniversitesi', 'Eskişehir Osmangazi Üniversitesi', 'Eskişehir Teknik Üniversitesi (ESTÜ)'],
  'Gaziantep': ['Gaziantep Üniversitesi', 'Gaziantep İslam Bilim ve Teknoloji Üniversitesi', 'Hasan Kalyoncu Üniversitesi', 'SANKO Üniversitesi'],
  'Giresun': ['Giresun Üniversitesi'],
  'Gümüşhane': ['Gümüşhane Üniversitesi'],
  'Hakkari': ['Hakkari Üniversitesi'],
  'Hatay': ['Hatay Mustafa Kemal Üniversitesi', 'İskenderun Teknik Üniversitesi'],
  'Isparta': ['Süleyman Demirel Üniversitesi', 'Isparta Uygulamalı Bilimler Üniversitesi'],
  'Mersin': ['Mersin Üniversitesi', 'Tarsus Üniversitesi', 'Toros Üniversitesi'],
  'İstanbul': [
    'Boğaziçi Üniversitesi',
    'İTÜ (İstanbul Teknik Üniversitesi)',
    'İstanbul Üniversitesi',
    'İstanbul Üniversitesi - Cerrahpaşa',
    'Yıldız Teknik Üniversitesi (YTÜ)',
    'Marmara Üniversitesi',
    'Koç Üniversitesi',
    'Sabancı Üniversitesi',
    'Özyeğin Üniversitesi',
    'Galatasaray Üniversitesi',
    'Türk-Alman Üniversitesi',
    'Mimar Sinan Güzel Sanatlar Üniversitesi',
    'İstanbul Medipol Üniversitesi',
    'Bahçeşehir Üniversitesi (BAU)',
    'Yeditepe Üniversitesi',
    'İstanbul Bilgi Üniversitesi',
    'Kadir Has Üniversitesi',
    'Acıbadem Mehmet Ali Aydınlar Üniversitesi',
    'Bezmiâlem Vakıf Üniversitesi',
    'İstanbul Ticaret Üniversitesi',
    'Üsküdar Üniversitesi',
    'İstanbul Aydın Üniversitesi',
    'İstanbul Sabahattin Zaim Üniversitesi',
    'İstanbul Gelişim Üniversitesi',
    'Doğuş Üniversitesi',
    'Maltepe Üniversitesi',
    'Haliç Üniversitesi',
    'Beykent Üniversitesi',
    'Kültür Üniversitesi',
    'Nişantaşı Üniversitesi',
    'Biruni Üniversitesi',
    'İstanbul Sağlık ve Teknoloji Üniversitesi',
    'İstanbul Gedik Üniversitesi',
    'Fenerbahçe Üniversitesi',
    'İstinye Üniversitesi',
    'MEF Üniversitesi',
    'Piri Reis Üniversitesi',
    'İstanbul Atlas Üniversitesi',
    'İstanbul Arel Üniversitesi',
    'İstanbul Galata Üniversitesi',
    'İstanbul Rumeli Üniversitesi',
    'İstanbul Esenyurt Üniversitesi',
    'Demiroğlu Bilim Üniversitesi',
    'Beykoz Üniversitesi',
    'İstanbul Okan Üniversitesi',
    'İstanbul Ayvansaray / Topkapı Üniversitesi',
    'İstanbul Kent Üniversitesi',
  ],
  'İzmir': [
    'Ege Üniversitesi',
    'Dokuz Eylül Üniversitesi',
    'İzmir Yüksek Teknoloji Enstitüsü (İYTE)',
    'İzmir Kâtip Çelebi Üniversitesi',
    'İzmir Ekonomi Üniversitesi',
    'Yaşar Üniversitesi',
    'İzmir Bakırçay Üniversitesi',
    'İzmir Demokrasi Üniversitesi',
    'İzmir Tınaztepe Üniversitesi',
  ],
  'Kars': ['Kafkas Üniversitesi'],
  'Kastamonu': ['Kastamonu Üniversitesi'],
  'Kayseri': ['Erciyes Üniversitesi', 'Abdullah Gül Üniversitesi (AGÜ)', 'Kayseri Üniversitesi', 'Nuh Naci Yazgan Üniversitesi'],
  'Kırklareli': ['Kırklareli Üniversitesi'],
  'Kırşehir': ['Kırşehir Ahi Evran Üniversitesi'],
  'Kocaeli': ['Kocaeli Üniversitesi', 'Gebze Teknik Üniversitesi (GTÜ)', 'Kocaeli Sağlık ve Teknoloji Üniversitesi'],
  'Konya': ['Selçuk Üniversitesi', 'Necmettin Erbakan Üniversitesi', 'Konya Teknik Üniversitesi', 'KTO Karatay Üniversitesi', 'Konya Gıda ve Tarım Üniversitesi'],
  'Kütahya': ['Kütahya Dumlupınar Üniversitesi', 'Kütahya Sağlık Bilimleri Üniversitesi (KSBÜ)'],
  'Malatya': ['İnönü Üniversitesi', 'Malatya Turgut Özal Üniversitesi'],
  'Manisa': ['Manisa Celal Bayar Üniversitesi'],
  'Kahramanmaraş': ['Kahramanmaraş Sütçü İmam Üniversitesi', 'Kahramanmaraş İstiklal Üniversitesi'],
  'Mardin': ['Mardin Artuklu Üniversitesi'],
  'Muğla': ['Muğla Sıtkı Koçman Üniversitesi'],
  'Muş': ['Muş Alparslan Üniversitesi'],
  'Nevşehir': ['Nevşehir Hacı Bektaş Veli Üniversitesi', 'Kapadokya Üniversitesi'],
  'Niğde': ['Niğde Ömer Halisdemir Üniversitesi'],
  'Ordu': ['Ordu Üniversitesi'],
  'Rize': ['Recep Tayyip Erdoğan Üniversitesi'],
  'Sakarya': ['Sakarya Üniversitesi', 'Sakarya Uygulamalı Bilimler Üniversitesi'],
  'Samsun': ['Ondokuz Mayıs Üniversitesi', 'Samsun Üniversitesi'],
  'Siirt': ['Siirt Üniversitesi'],
  'Sinop': ['Sinop Üniversitesi'],
  'Sivas': ['Sivas Cumhuriyet Üniversitesi', 'Sivas Bilim ve Teknoloji Üniversitesi'],
  'Tekirdağ': ['Tekirdağ Namık Kemal Üniversitesi'],
  'Tokat': ['Tokat Gaziosmanpaşa Üniversitesi'],
  'Trabzon': ['Karadeniz Teknik Üniversitesi (KTÜ)', 'Trabzon Üniversitesi', 'Avrasya Üniversitesi'],
  'Tunceli': ['Munzur Üniversitesi'],
  'Şanlıurfa': ['Harran Üniversitesi'],
  'Uşak': ['Uşak Üniversitesi'],
  'Van': ['Van Yüzüncü Yıl Üniversitesi'],
  'Yozgat': ['Yozgat Bozok Üniversitesi'],
  'Zonguldak': ['Zonguldak Bülent Ecevit Üniversitesi'],
  'Aksaray': ['Aksaray Üniversitesi'],
  'Bayburt': ['Bayburt Üniversitesi'],
  'Karaman': ['Karamanoğlu Mehmetbey Üniversitesi'],
  'Kırıkkale': ['Kırıkkale Üniversitesi'],
  'Batman': ['Batman Üniversitesi'],
  'Şırnak': ['Şırnak Üniversitesi'],
  'Bartın': ['Bartın Üniversitesi'],
  'Ardahan': ['Ardahan Üniversitesi'],
  'Iğdır': ['Iğdır Üniversitesi'],
  'Yalova': ['Yalova Üniversitesi'],
  'Karabük': ['Karabük Üniversitesi'],
  'Kilis': ['Kilis 7 Aralık Üniversitesi'],
  'Osmaniye': ['Osmaniye Korkut Ata Üniversitesi'],
  'Düzce': ['Düzce Üniversitesi'],
};

export interface StandardDepartment {
  name: string;
  scoreType: 'SAY' | 'EA' | 'SÖZ' | 'DİL';
  minScore: number;
  idealTytNet: number;
  targetObp: number;
  description: string;
}

export const STANDARD_YKS_PROGRAMS: StandardDepartment[] = [
  { name: 'Tıp Fakültesi', scoreType: 'SAY', minScore: 505, idealTytNet: 98, targetObp: 95.0, description: 'Sağlık ve klinik tıp hekimliği' },
  { name: 'Diş Hekimliği Fakültesi', scoreType: 'SAY', minScore: 470, idealTytNet: 86, targetObp: 92.0, description: 'Ağız ve diş sağlığı hekimliği' },
  { name: 'Eczacılık Fakültesi', scoreType: 'SAY', minScore: 445, idealTytNet: 80, targetObp: 90.0, description: 'İlaç bilimi ve farmasötik teknoloji' },
  { name: 'Bilgisayar Mühendisliği', scoreType: 'SAY', minScore: 480, idealTytNet: 92, targetObp: 93.0, description: 'Yazılım, algoritma ve bilişim sistemleri' },
  { name: 'Yazılım Mühendisliği', scoreType: 'SAY', minScore: 460, idealTytNet: 85, targetObp: 90.0, description: 'Modern uygulama mimarisi ve yazılım geliştirme' },
  { name: 'Yapay Zekâ ve Veri Mühendisliği', scoreType: 'SAY', minScore: 510, idealTytNet: 100, targetObp: 95.0, description: 'Büyük veri, makine öğrenimi ve derin öğrenme' },
  { name: 'Elektrik-Elektronik Mühendisliği', scoreType: 'SAY', minScore: 470, idealTytNet: 88, targetObp: 92.0, description: 'Elektronik sistemler, sinyal işleme ve güç' },
  { name: 'Endüstri Mühendisliği', scoreType: 'SAY', minScore: 455, idealTytNet: 84, targetObp: 91.0, description: 'Süreç optimizasyonu ve yönetim mühendisliği' },
  { name: 'Makine Mühendisliği', scoreType: 'SAY', minScore: 435, idealTytNet: 78, targetObp: 88.0, description: 'Mekanik tasarım ve imalat teknolojileri' },
  { name: 'Havacılık ve Uzay Mühendisliği', scoreType: 'SAY', minScore: 495, idealTytNet: 95, targetObp: 94.0, description: 'Savunma ve hava araçları teknolojisi' },
  { name: 'Mimarlık', scoreType: 'SAY', minScore: 420, idealTytNet: 72, targetObp: 88.0, description: 'Yapı tasarımı ve kentsel estetik' },
  { name: 'Moleküler Biyoloji ve Genetik', scoreType: 'SAY', minScore: 430, idealTytNet: 75, targetObp: 89.0, description: 'Biyoteknoloji ve hücre araştırmaları' },
  { name: 'Hemşirelik', scoreType: 'SAY', minScore: 385, idealTytNet: 64, targetObp: 85.0, description: 'Klinik hasta bakımı ve sağlık hizmetleri' },
  { name: 'Fizyoterapi ve Rehabilitasyon', scoreType: 'SAY', minScore: 395, idealTytNet: 68, targetObp: 86.0, description: 'Fiziksel tedavi ve hareket bilimi' },
  { name: 'Hukuk Fakültesi', scoreType: 'EA', minScore: 440, idealTytNet: 80, targetObp: 90.0, description: 'Adalet, anayasa ve avukatlık/hâkimlik kariyeri' },
  { name: 'Psikoloji', scoreType: 'EA', minScore: 425, idealTytNet: 76, targetObp: 89.0, description: 'İnsan davranışı ve klinik danışmanlık' },
  { name: 'Yönetim Bilişim Sistemleri (YBS)', scoreType: 'EA', minScore: 435, idealTytNet: 80, targetObp: 89.0, description: 'Teknoloji yönetimi ve iş analitiği' },
  { name: 'İşletme', scoreType: 'EA', minScore: 410, idealTytNet: 72, targetObp: 87.0, description: 'Finans, pazarlama ve şirket yönetimi' },
  { name: 'İktisat / Ekonomi', scoreType: 'EA', minScore: 405, idealTytNet: 70, targetObp: 86.0, description: 'Makroekonomi ve piyasa analitiği' },
  { name: 'Sınıf Öğretmenliği', scoreType: 'EA', minScore: 410, idealTytNet: 70, targetObp: 88.0, description: 'Temel ilkokul eğitimi ve pedagoji' },
  { name: 'Rehberlik ve Psikolojik Danışmanlık (PDR)', scoreType: 'EA', minScore: 415, idealTytNet: 72, targetObp: 88.0, description: 'Okul ve kariyer psikolojik danışmanlığı' },
  { name: 'Siyaset Bilimi ve Uluslararası İlişkiler', scoreType: 'EA', minScore: 400, idealTytNet: 68, targetObp: 86.0, description: 'Diplomasi ve küresel ilişkiler' },
  { name: 'Özel Eğitim Öğretmenliği', scoreType: 'SÖZ', minScore: 430, idealTytNet: 78, targetObp: 89.0, description: 'Özel gereksinimli bireylerin eğitimi' },
  { name: 'Türkçe Öğretmenliği', scoreType: 'SÖZ', minScore: 420, idealTytNet: 74, targetObp: 88.0, description: 'Ortaokul ana dil eğitimi' },
  { name: 'Tarih Öğretmenliği', scoreType: 'SÖZ', minScore: 385, idealTytNet: 65, targetObp: 85.0, description: 'Kültür ve medeniyet tarihi eğitimi' },
  { name: 'Halkla İlişkiler ve Tanıtım', scoreType: 'SÖZ', minScore: 375, idealTytNet: 60, targetObp: 84.0, description: 'Kurumsal iletişim ve medya' },
  { name: 'Gastronomi ve Mutfak Sanatları', scoreType: 'SÖZ', minScore: 405, idealTytNet: 70, targetObp: 86.0, description: 'Mutfak sanatları ve restoran yönetimi' },
  { name: 'İngilizce Öğretmenliği', scoreType: 'DİL', minScore: 460, idealTytNet: 82, targetObp: 91.0, description: 'Yabancı dil pedagojisi ve eğitimi' },
  { name: 'Mütercim ve Tercümanlık (İngilizce)', scoreType: 'DİL', minScore: 450, idealTytNet: 80, targetObp: 90.0, description: 'Simültane ve yazılı çeviri' },
  { name: 'İngiliz Dili ve Edebiyatı', scoreType: 'DİL', minScore: 430, idealTytNet: 74, targetObp: 87.0, description: 'Batı edebiyatı ve filoloji' },
];

/**
 * Şehre göre filtrelenmiş benzersiz üniversite isimlerini döner
 */
export function getDistinctUniversities(city?: string): { name: string; city: string }[] {
  const result: { name: string; city: string }[] = [];
  const seen = new Set<string>();

  if (city && city.trim() !== '' && city !== 'Tüm Şehirler') {
    const cClean = city.trim();
    // 1) Şehir listesindeki üniversiteleri ekle
    const unisForCity = TURKEY_UNIVERSITIES_BY_CITY[cClean] || [];
    for (const uName of unisForCity) {
      if (!seen.has(uName)) {
        seen.add(uName);
        result.push({ name: uName, city: cClean });
      }
    }

    // 2) YKS_TOP_UNIVERSITIES içindeki varsa ekle
    for (const item of YKS_TOP_UNIVERSITIES) {
      if (item.city.toLowerCase() === cClean.toLowerCase() && !seen.has(item.name)) {
        seen.add(item.name);
        result.push({ name: item.name, city: item.city });
      }
    }
  } else {
    // Tüm şehirlerin üniversiteleri
    for (const [cityName, unis] of Object.entries(TURKEY_UNIVERSITIES_BY_CITY)) {
      for (const uName of unis) {
        if (!seen.has(uName)) {
          seen.add(uName);
          result.push({ name: uName, city: cityName });
        }
      }
    }
    for (const item of YKS_TOP_UNIVERSITIES) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        result.push({ name: item.name, city: item.city });
      }
    }
  }

  return result.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

/**
 * Seçilen üniversitenin program ve bölümlerini döner.
 * Üniversiteye özel tanımlı bölümler varsa onları, yoksa standart zengin YKS bölümlerini döner.
 */
export function getDepartmentsByUniversity(universityName: string): YksUniversityTarget[] {
  if (!universityName) return [];
  const uClean = universityName.trim().toLowerCase();

  // 1. Öncelik: Özel tanımlı hedef üniversite programları
  const specific = YKS_TOP_UNIVERSITIES.filter((u) => u.name.toLowerCase() === uClean);
  if (specific.length > 0) {
    return [...specific].sort((a, b) => b.minScore - a.minScore);
  }

  // 2. Üniversite hangi şehirde bul
  let cityOfUni = 'Türkiye';
  for (const [cName, unis] of Object.entries(TURKEY_UNIVERSITIES_BY_CITY)) {
    if (unis.some((u) => u.toLowerCase() === uClean)) {
      cityOfUni = cName;
      break;
    }
  }

  // 3. Genel YKS lisans programlarını bu üniversiteye uyarla
  return STANDARD_YKS_PROGRAMS.map((prog, idx) => ({
    id: `${universityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`,
    name: universityName,
    department: prog.name,
    city: cityOfUni,
    type: 'devlet' as const,
    scoreType: prog.scoreType,
    minScore: prog.minScore,
    minRank: 50000,
    targetObp: prog.targetObp,
    idealTytNet: prog.idealTytNet,
    badge: `🎓 ${prog.scoreType} Lisans Programı`,
    description: `${universityName} - ${prog.description}`,
  }));
}

/**
 * Sistemde üniversitesi bulunan şehirler (Tüm 81 il)
 */
export function getCitiesWithUniversities(): string[] {
  return Object.keys(TURKEY_UNIVERSITIES_BY_CITY).sort((a, b) => a.localeCompare(b, 'tr'));
}


