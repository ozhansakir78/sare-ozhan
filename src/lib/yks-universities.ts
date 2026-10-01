/**
 * YKS Hedef Üniversite & Bölüm Veri Tabanı (YÖK Atlas 2025/2026 Kalibrasyonlu)
 * Türkiye genelindeki Sayısal (SAY), Eşit Ağırlık (EA), Sözel (SÖZ), Yabancı Dil (DİL)
 * ve Önlisans (TYT) hedef programlarını, resmi YÖK barajlarını ve net gereksinimlerini içerir.
 */

export type YksScoreType = 'SAY' | 'EA' | 'SÖZ' | 'DİL' | 'TYT';

export interface YksUniversityTarget {
  id: string;
  name: string;
  department: string;
  city: string;
  type: 'devlet' | 'vakif';
  scoreType: YksScoreType;
  minScore: number; // 2025/2026 YÖK Atlas yaklaşık taban yerleştirme puanı
  minRank: number; // 2025/2026 YÖK Atlas yaklaşık başarı sırası (Örn: 280, 1500 vb.)
  targetObp: number; // İdeal lise diploma notu (örn: 96.5)
  idealTytNet: number; // 120 üzerinden ideal TYT Net (örn: 105)
  idealAytNet?: number; // 80 üzerinden ideal AYT veya YDT Net (Önlisans için undefined)
  quota?: number; // Kontenjan
  isYokBaraji?: boolean; // Tıp 50k, Diş 80k, Eczacılık 100k, Hukuk 125k, Mimarlık 250k, Müh 300k, Öğretmenlik 300k
  yokAtlasCode?: string; // ÖSYM / YÖK Atlas Program Kodu
  badge: string;
  description: string;
}

export const YKS_TOP_UNIVERSITIES: YksUniversityTarget[] = [
  // ==========================================================================
  // SAYISAL (SAY) LİSANS PROGRAMLARI
  // ==========================================================================
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
    idealAytNet: 78.5,
    quota: 10,
    isYokBaraji: true,
    yokAtlasCode: '202410214',
    badge: '🔬 Türkiye Tıp Şampiyonu',
    description: 'Sarıyer, İstanbul. Dünya standartlarında klinik araştırma ve laboratuvar imkânları.',
  },
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
    idealAytNet: 77.5,
    quota: 90,
    isYokBaraji: true,
    yokAtlasCode: '102210214',
    badge: '🏆 Türkiye Sayısal Zirvesi',
    description: 'Bebek, İstanbul. Türkiye\'nin en yüksek puanlı mühendislik programı ve global teknoloji liderliği.',
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
    idealAytNet: 76.5,
    quota: 40,
    isYokBaraji: true,
    yokAtlasCode: '201410185',
    badge: '💻 Silikon Vadisi Ağı',
    description: 'Çankaya, Ankara. Dünya üniversitelerine doğrudan kabul ve güçlü mezun ağı.',
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
    idealAytNet: 75.5,
    quota: 190,
    isYokBaraji: true,
    yokAtlasCode: '108410283',
    badge: '⚡ Savunma ve İleri Teknoloji',
    description: 'Çankaya, Ankara. Uluslararası akreditasyon ve AR-GE projelerinde Türkiye\'nin öncüsü.',
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
    idealAytNet: 75.0,
    quota: 240,
    isYokBaraji: true,
    yokAtlasCode: '104810237',
    badge: '🩺 Türkiye\'nin Tıp Çınarı',
    description: 'Sıhhiye, Ankara. Köklü tıp eğitimi ve en geniş klinik vaka deneyimi.',
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
    idealAytNet: 74.5,
    quota: 50,
    isYokBaraji: true,
    yokAtlasCode: '105590123',
    badge: '🤖 Geleceğin Teknolojisi',
    description: 'Ayazağa, İstanbul. Türkiye\'nin ilk yapay zekâ mühendisliği lisans programı.',
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
    idealAytNet: 74.0,
    quota: 280,
    isYokBaraji: true,
    yokAtlasCode: '111610255',
    badge: '🏥 Asırlık Hekimlik Geleneği',
    description: 'Fatih, İstanbul. Türkiye\'nin en saygın ve köklü tıp ekolü.',
  },
  {
    id: 'odtu-aero',
    name: 'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    department: 'Havacılık ve Uzay Mühendisliği (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 535.4,
    minRank: 2800,
    targetObp: 96.0,
    idealTytNet: 101,
    idealAytNet: 73.0,
    quota: 80,
    isYokBaraji: true,
    yokAtlasCode: '108410292',
    badge: '🚀 Milli Uzay ve Havacılık',
    description: 'Çankaya, Ankara. TUSAŞ, ASELSAN ve ROKETSAN projelerinde doğrudan istihdam.',
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
    idealAytNet: 72.5,
    quota: 330,
    isYokBaraji: true,
    yokAtlasCode: '103410214',
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
    idealAytNet: 72.0,
    quota: 280,
    isYokBaraji: true,
    yokAtlasCode: '104110243',
    badge: '🏛️ Başkentin Köklü Hekimliği',
    description: 'Beşevler, Ankara. Modern hastane kompleksi ve kapsamlı cerrahi vaka eğitimi.',
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
    idealAytNet: 71.0,
    quota: 300,
    isYokBaraji: true,
    yokAtlasCode: '100710185',
    badge: '🏆 Organ Nakli ve Cerrahi Lideri',
    description: 'Konyaaltı, Antalya. Dünyaca ünlü kompozit doku ve organ nakli başarıları.',
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
    idealAytNet: 71.0,
    quota: 130,
    isYokBaraji: true,
    yokAtlasCode: '110110308',
    badge: '⭐ Teknopark ve Yazılım Gücü',
    description: 'Davutpaşa, İstanbul. Türkiye\'nin en büyük teknoparkında sanayiyle iç içe mühendislik.',
  },
  {
    id: 'itu-makine',
    name: 'İTÜ (İstanbul Teknik Üniversitesi)',
    department: 'Makine Mühendisliği (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 527.1,
    minRank: 5200,
    targetObp: 95.0,
    idealTytNet: 96,
    idealAytNet: 70.0,
    quota: 150,
    isYokBaraji: true,
    yokAtlasCode: '105510444',
    badge: '⚙️ Endüstri ve Mekanik Ekolü',
    description: 'Gümüşsuyu, İstanbul. Otomotiv, enerji ve havacılık sektörlerinde aranan mühendislik formasyonu.',
  },
  {
    id: 'cukurova-tip',
    name: 'Çukurova Üniversitesi',
    department: 'Tıp Fakültesi (Balcalı)',
    city: 'Adana',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 523.1,
    minRank: 5500,
    targetObp: 95.0,
    idealTytNet: 95,
    idealAytNet: 70.0,
    quota: 310,
    isYokBaraji: true,
    yokAtlasCode: '102910198',
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
    idealAytNet: 70.5,
    quota: 290,
    isYokBaraji: true,
    yokAtlasCode: '109710214',
    badge: '🌲 Marmara Sağlık Merkezi',
    description: 'Görükle, Nilüfer, Bursa. Güney Marmara\'nın en büyük araştırma hastanesi.',
  },
  {
    id: 'boun-mbg',
    name: 'Boğaziçi Üniversitesi',
    department: 'Moleküler Biyoloji ve Genetik (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 520.4,
    minRank: 7500,
    targetObp: 94.5,
    idealTytNet: 95,
    idealAytNet: 68.0,
    quota: 60,
    yokAtlasCode: '102210162',
    badge: '🧬 Biyoteknoloji ve Genetik',
    description: 'Kuzey Kampüs, Bebek. Kanser genetiği, immünoloji ve uluslararası araştırma laboratuvarları.',
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
    idealAytNet: 67.0,
    quota: 100,
    isYokBaraji: true,
    yokAtlasCode: '103110378',
    badge: '💻 Ege Yazılım Koridoru',
    description: 'Tınaztepe, Buca, İzmir. Bilişim ve yapay zekâ projelerinde öncü merkez.',
  },
  {
    id: 'hacettepe-dis',
    name: 'Hacettepe Üniversitesi',
    department: 'Diş Hekimliği Fakültesi',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 498.6,
    minRank: 18500,
    targetObp: 93.0,
    idealTytNet: 90,
    idealAytNet: 65.0,
    quota: 140,
    isYokBaraji: true,
    yokAtlasCode: '104810185',
    badge: '🦷 Ağız ve Diş Sağlığı Ekolü',
    description: 'Sıhhiye, Ankara. Modern simülasyon laboratuvarları ve kapsamlı protez/cerrahi klinik eğitimi.',
  },
  {
    id: 'itu-mimarlik',
    name: 'İTÜ (İstanbul Teknik Üniversitesi)',
    department: 'Mimarlık (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 482.4,
    minRank: 32000,
    targetObp: 92.0,
    idealTytNet: 85,
    idealAytNet: 60.0,
    quota: 120,
    isYokBaraji: true,
    yokAtlasCode: '105510255',
    badge: '📐 Taşkışla Mimarlık Geleneği',
    description: 'Taşkışla, İstanbul. Tarihi Taşkışla binasında uluslararası akredite (RIBA) mimarlık eğitimi.',
  },
  {
    id: 'ankara-eczacilik',
    name: 'Ankara Üniversitesi',
    department: 'Eczacılık Fakültesi',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SAY',
    minScore: 476.5,
    minRank: 38000,
    targetObp: 91.0,
    idealTytNet: 84,
    idealAytNet: 58.0,
    quota: 160,
    isYokBaraji: true,
    yokAtlasCode: '101110255',
    badge: '💊 Türkiye\'nin İlk Eczacılığı',
    description: 'Tandoğan, Ankara. Klinik eczacılık, biyoteknolojik ilaç ve Ar-Ge laboratuvarları.',
  },

  // ==========================================================================
  // EŞİT AĞIRLIK (EA) LİSANS PROGRAMLARI
  // ==========================================================================
  {
    id: 'koc-hukuk',
    name: 'Koç Üniversitesi',
    department: 'Hukuk Fakültesi (Tam Burslu)',
    city: 'İstanbul',
    type: 'vakif',
    scoreType: 'EA',
    minScore: 538.2,
    minRank: 120,
    targetObp: 98.0,
    idealTytNet: 104,
    idealAytNet: 75.0,
    quota: 15,
    isYokBaraji: true,
    yokAtlasCode: '202410311',
    badge: '⚖️ Küresel Hukuk Liderliği',
    description: 'Rumelifeneri, Sarıyer. Karşılaştırmalı hukuk ve uluslararası tahkim odaklı seçkin eğitim.',
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
    idealAytNet: 72.0,
    quota: 100,
    yokAtlasCode: '102210135',
    badge: '💼 Türkiye Eşit Ağırlık 1. Tercihi',
    description: 'Güney Kampüs, Bebek. Finans, yönetim ve uluslararası danışmanlıkta zirve kariyer.',
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
    idealAytNet: 71.5,
    quota: 50,
    isYokBaraji: true,
    yokAtlasCode: '104010185',
    badge: '⚖️ Uluslararası Hukuk Ekolü',
    description: 'Ortaköy, İstanbul. Çift dilli hukuk ve uluslararası tahkim kariyeri.',
  },
  {
    id: 'boun-psikoloji',
    name: 'Boğaziçi Üniversitesi',
    department: 'Psikoloji (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 518.2,
    minRank: 1100,
    targetObp: 96.0,
    idealTytNet: 97,
    idealAytNet: 70.0,
    quota: 70,
    yokAtlasCode: '102210171',
    badge: '🧠 Bilişsel ve Klinik Psikoloji',
    description: 'Kuzey Kampüs, Bebek. Bilişsel nörobilim ve deneysel psikoloji araştırmaları.',
  },
  {
    id: 'boun-ybs',
    name: 'Boğaziçi Üniversitesi',
    department: 'Yönetim Bilişim Sistemleri (YBS)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 517.5,
    minRank: 1200,
    targetObp: 95.5,
    idealTytNet: 96,
    idealAytNet: 69.5,
    quota: 75,
    yokAtlasCode: '102210356',
    badge: '📊 Teknoloji & İş Zekâsı',
    description: 'Hisar Kampüs, Bebek. Veri bilimi, ürün yönetimi ve bilişim teknolojileri liderliği.',
  },
  {
    id: 'odtu-iktisat',
    name: 'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    department: 'İktisat (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 515.8,
    minRank: 1400,
    targetObp: 95.5,
    idealTytNet: 95,
    idealAytNet: 69.0,
    quota: 120,
    yokAtlasCode: '108410211',
    badge: '📈 Makroekonomi ve Finans Ekolü',
    description: 'Çankaya, Ankara. Merkez bankaları, kalkınma ajansları ve küresel finans piyasaları.',
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
    idealAytNet: 68.0,
    quota: 500,
    isYokBaraji: true,
    yokAtlasCode: '101110273',
    badge: '⚖️ Cumhuriyetin İlk Hukuk Fakültesi',
    description: 'Cebeci, Ankara. Türkiye\'nin en saygın hakim, savcı ve avukat yetiştiren tarihi fakültesi.',
  },
  {
    id: 'odtu-psikoloji',
    name: 'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    department: 'Psikoloji (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 509.3,
    minRank: 2400,
    targetObp: 95.0,
    idealTytNet: 92,
    idealAytNet: 67.0,
    quota: 90,
    yokAtlasCode: '108410238',
    badge: '👥 Sosyal ve Gelişim Psikolojisi',
    description: 'Çankaya, Ankara. Deneysel psikoloji laboratuvarları ve güçlü bilimsel metodoloji.',
  },
  {
    id: 'istanbul-hukuk',
    name: 'İstanbul Üniversitesi',
    department: 'Hukuk Fakültesi',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 504.6,
    minRank: 2900,
    targetObp: 94.0,
    idealTytNet: 91,
    idealAytNet: 65.0,
    quota: 600,
    isYokBaraji: true,
    yokAtlasCode: '105610338',
    badge: '🏛️ Beyazıt Hukuk Geleneği',
    description: 'Beyazıt, İstanbul. Köklü içtihat birikimi ve zengin hukuk kütüphanesi.',
  },
  {
    id: 'odtu-kamu',
    name: 'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    department: 'Siyaset Bilimi ve Kamu Yönetimi (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 502.8,
    minRank: 3100,
    targetObp: 94.0,
    idealTytNet: 90,
    idealAytNet: 64.5,
    quota: 90,
    yokAtlasCode: '108410247',
    badge: '🌐 Diplomasi ve Kamu Politikası',
    description: 'Çankaya, Ankara. Dışişleri Bakanlığı, uluslararası örgütler ve kamu bürokrasisi liderliği.',
  },
  {
    id: 'boun-pdr',
    name: 'Boğaziçi Üniversitesi',
    department: 'Rehberlik ve Psikolojik Danışmanlık (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 478.2,
    minRank: 9800,
    targetObp: 92.5,
    idealTytNet: 86,
    idealAytNet: 61.0,
    quota: 60,
    isYokBaraji: true,
    yokAtlasCode: '102210083',
    badge: '🌱 Okul ve Kariyer Danışmanlığı',
    description: 'Kuzey Kampüs, Bebek. Bireysel danışmanlık teknikleri ve modern eğitim psikolojisi.',
  },
  {
    id: 'marmara-ybs',
    name: 'Marmara Üniversitesi',
    department: 'Yönetim Bilişim Sistemleri (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 468.5,
    minRank: 14500,
    targetObp: 91.5,
    idealTytNet: 82,
    idealAytNet: 57.0,
    quota: 80,
    yokAtlasCode: '107210638',
    badge: '💻 Finansal Teknolojiler & Bilişim',
    description: 'Recep Tayyip Erdoğan Külliyesi, Maltepe. Kurumsal yazılım mimarisi ve ERP sistemleri.',
  },
  {
    id: 'hacettepe-sinif',
    name: 'Hacettepe Üniversitesi',
    department: 'Sınıf Öğretmenliği',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'EA',
    minScore: 432.1,
    minRank: 45000,
    targetObp: 89.0,
    idealTytNet: 75,
    idealAytNet: 50.0,
    quota: 60,
    isYokBaraji: true,
    yokAtlasCode: '104810149',
    badge: '📚 Çağdaş İlkokul Pedagojisi',
    description: 'Beytepe, Ankara. Çocuk gelişimi, erken okuryazarlık ve matematik öğretimi.',
  },

  // ==========================================================================
  // SÖZEL (SÖZ) LİSANS PROGRAMLARI
  // ==========================================================================
  {
    id: 'gs-iletisim',
    name: 'Galatasaray Üniversitesi',
    department: 'İletişim Fakültesi (Fransızca)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 521.8,
    minRank: 280,
    targetObp: 96.0,
    idealTytNet: 92,
    idealAytNet: 72.0,
    quota: 40,
    yokAtlasCode: '104010194',
    badge: '🎥 Medya ve Stratejik İletişim',
    description: 'Ortaköy, İstanbul. Uluslararası medya, gazetecilik ve kurumsal iletişim zirvesi.',
  },
  {
    id: 'boun-tde',
    name: 'Boğaziçi Üniversitesi',
    department: 'Türk Dili ve Edebiyatı (İngilizce Destekli)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 512.4,
    minRank: 450,
    targetObp: 95.0,
    idealTytNet: 90,
    idealAytNet: 70.0,
    quota: 50,
    yokAtlasCode: '102210198',
    badge: '📖 Edebi Metin & Kültür Analizi',
    description: 'Güney Kampüs, Bebek. Karşılaştırmalı edebiyat ve filolojik metin eleştirisi.',
  },
  {
    id: 'marmara-ozel-egitim',
    name: 'Marmara Üniversitesi',
    department: 'Özel Eğitim Öğretmenliği',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 472.5,
    minRank: 3800,
    targetObp: 92.0,
    idealTytNet: 82,
    idealAytNet: 64.0,
    quota: 70,
    isYokBaraji: true,
    yokAtlasCode: '107210214',
    badge: '🌟 En Yüksek İstihdamlı Öğretmenlik',
    description: 'Kadıköy/Maltepe. Otizm, zihinsel ve işitme yetersizlikleri özel rehabilitasyon pedagojisi.',
  },
  {
    id: 'anadolu-ozel-egitim',
    name: 'Eskişehir Anadolu Üniversitesi',
    department: 'Özel Eğitim Öğretmenliği',
    city: 'Eskişehir',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 465.1,
    minRank: 5200,
    targetObp: 91.0,
    idealTytNet: 80,
    idealAytNet: 62.0,
    quota: 80,
    isYokBaraji: true,
    yokAtlasCode: '101010321',
    badge: '🧩 DİLKOM ve Özel Eğitim Enstitüsü',
    description: 'Yunus Emre Kampüsü, Eskişehir. Türkiye\'nin en köklü özel eğitim uygulama merkezi.',
  },
  {
    id: 'akdeniz-gastronomi',
    name: 'Akdeniz Üniversitesi',
    department: 'Gastronomi ve Mutfak Sanatları',
    city: 'Antalya',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 442.8,
    minRank: 12000,
    targetObp: 90.0,
    idealTytNet: 78,
    idealAytNet: 59.0,
    quota: 60,
    yokAtlasCode: '100710264',
    badge: '👨‍🍳 Akdeniz Mutfak Sanatları',
    description: 'Konyaaltı, Antalya. Uluslararası mutfak teknikleri ve gastronomi işletmeciliği.',
  },
  {
    id: 'marmara-turkce',
    name: 'Marmara Üniversitesi',
    department: 'Türkçe Öğretmenliği',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 436.2,
    minRank: 14000,
    targetObp: 89.0,
    idealTytNet: 76,
    idealAytNet: 58.0,
    quota: 65,
    isYokBaraji: true,
    yokAtlasCode: '107210259',
    badge: '✍️ Ana Dil ve Edebiyat Pedagojisi',
    description: 'Maltepe, İstanbul. Okuma anlama ve sözel iletişim becerileri eğitimi.',
  },
  {
    id: 'marmara-ilahiyat',
    name: 'Marmara Üniversitesi',
    department: 'İlahiyat Fakültesi (Arapça Destekli)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 428.5,
    minRank: 18000,
    targetObp: 88.5,
    idealTytNet: 74,
    idealAytNet: 56.0,
    quota: 220,
    yokAtlasCode: '107210356',
    badge: '🕌 İslami İlimler ve Felsefe',
    description: 'Bağlarbaşı, Üsküdar. Klasik Arapça metinler, din felsefesi ve sosyoloji.',
  },
  {
    id: 'gazi-tarih-ogretmenlik',
    name: 'Gazi Üniversitesi',
    department: 'Tarih Öğretmenliği',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 420.1,
    minRank: 22000,
    targetObp: 88.0,
    idealTytNet: 72,
    idealAytNet: 54.0,
    quota: 50,
    isYokBaraji: true,
    yokAtlasCode: '104110322',
    badge: '📜 Tarih Bilinci ve Pedagoji',
    description: 'Beşevler, Ankara. Türk ve dünya tarihi metodolojisi ve öğretim programları.',
  },
  {
    id: 'istanbul-yeni-medya',
    name: 'İstanbul Üniversitesi',
    department: 'Yeni Medya ve İletişim',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'SÖZ',
    minScore: 414.7,
    minRank: 25000,
    targetObp: 87.0,
    idealTytNet: 70,
    idealAytNet: 52.0,
    quota: 70,
    yokAtlasCode: '105610489',
    badge: '📱 Dijital Medya & İçerik Üretimi',
    description: 'Beyazıt, İstanbul. Sosyal medya yönetimi, dijital gazetecilik ve podcast üretimi.',
  },

  // ==========================================================================
  // YABANCI DİL (DİL - YDT) LİSANS PROGRAMLARI
  // ==========================================================================
  {
    id: 'boun-elt',
    name: 'Boğaziçi Üniversitesi',
    department: 'İngilizce Öğretmenliği (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 528.4,
    minRank: 350,
    targetObp: 97.0,
    idealTytNet: 96,
    idealAytNet: 78.5,
    quota: 75,
    isYokBaraji: true,
    yokAtlasCode: '102210092',
    badge: '🇬🇧 Dil Eğitimi ve Uygulamalı Dilbilim',
    description: 'Kuzey Kampüs, Bebek. Dil edinimi teorileri, ikinci dil öğretim teknikleri ve ölçme değerlendirme.',
  },
  {
    id: 'boun-ceviribilim',
    name: 'Boğaziçi Üniversitesi',
    department: 'Çeviribilim / Mütercim-Tercümanlık (İngilizce)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 524.2,
    minRank: 550,
    targetObp: 96.5,
    idealTytNet: 95,
    idealAytNet: 78.0,
    quota: 60,
    yokAtlasCode: '102210108',
    badge: '🎙️ Konferans ve Edebi Çeviri Zirvesi',
    description: 'Güney Kampüs, Bebek. Simültane çeviri kabinleri ve uluslararası konferans tercümanlığı.',
  },
  {
    id: 'odtu-elt',
    name: 'ODTÜ (Orta Doğu Teknik Üniversitesi)',
    department: 'İngilizce Öğretmenliği (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 518.6,
    minRank: 850,
    targetObp: 96.0,
    idealTytNet: 93,
    idealAytNet: 77.5,
    quota: 90,
    isYokBaraji: true,
    yokAtlasCode: '108410141',
    badge: '🎓 ODTÜ Yabancı Dil Pedagojisi',
    description: 'Çankaya, Ankara. Uluslararası dil öğretimi sertifikasyonları ve modern dil laboratuvarları.',
  },
  {
    id: 'hacettepe-tercumanlik',
    name: 'Hacettepe Üniversitesi',
    department: 'Mütercim ve Tercümanlık (İngilizce)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 502.5,
    minRank: 2100,
    targetObp: 95.0,
    idealTytNet: 88,
    idealAytNet: 76.0,
    quota: 65,
    yokAtlasCode: '104810325',
    badge: '🏛️ Diplomasi Tercümanlığı',
    description: 'Beytepe, Ankara. Dışişleri, AB Bakanlığı ve uluslararası kuruluşlar için uzman çeviri eğitimi.',
  },
  {
    id: 'istanbul-ingiliz-dili',
    name: 'İstanbul Üniversitesi',
    department: 'İngiliz Dili ve Edebiyatı',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 486.1,
    minRank: 4200,
    targetObp: 93.0,
    idealTytNet: 84,
    idealAytNet: 74.0,
    quota: 90,
    yokAtlasCode: '105610214',
    badge: '📚 Klasik İngiliz Filolojisi',
    description: 'Beyazıt, İstanbul. Shakespeare dönemi, modern dönem İngiliz edebiyatı ve eleştiri teorileri.',
  },
  {
    id: 'marmara-almanca-tercumanlik',
    name: 'Marmara Üniversitesi',
    department: 'Mütercim ve Tercümanlık (Almanca)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 458.3,
    minRank: 9500,
    targetObp: 91.0,
    idealTytNet: 78,
    idealAytNet: 70.0,
    quota: 50,
    yokAtlasCode: '107210153',
    badge: '🇩🇪 Alman Dili ve Hukuki Çeviri',
    description: 'Göztepe, İstanbul. Sanayi, ticaret ve dış ilişkilerde teknik Almanca çevirmenliği.',
  },
  {
    id: 'ege-turizm-rehberligi',
    name: 'Ege Üniversitesi',
    department: 'Turizm Rehberliği (İngilizce)',
    city: 'İzmir',
    type: 'devlet',
    scoreType: 'DİL',
    minScore: 432.0,
    minRank: 18000,
    targetObp: 88.5,
    idealTytNet: 72,
    idealAytNet: 65.0,
    quota: 60,
    yokAtlasCode: '103410523',
    badge: '🏛️ Arkeoloji & Turizm Rehberliği',
    description: 'Çeşme / Bornova. Anadolu medeniyetleri, antik kentler ve profesyonel turist rehberliği kokartı.',
  },

  // ==========================================================================
  // TYT İLE ALAN ÖNLİSANS (2 YILLIK) PROGRAMLARI
  // ==========================================================================
  {
    id: 'odtu-myo-bilgisayar',
    name: 'ODTÜ Meslek Yüksekokulu',
    department: 'Bilgisayar Programcılığı',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 445.6,
    minRank: 95000,
    targetObp: 92.0,
    idealTytNet: 82,
    quota: 40,
    yokAtlasCode: '108450123',
    badge: '💻 Zirve Önlisans Yazılımı',
    description: 'Çankaya, Ankara. DGS ile ODTÜ Bilgisayar Mühendisliği geçiş imkânı ve ileri web/mobil programlama.',
  },
  {
    id: 'itu-myo-siber',
    name: 'İTÜ Meslek Yüksekokulu',
    department: 'Siber Güvenlik Analistliği ve Operatörlüğü',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 438.2,
    minRank: 110000,
    targetObp: 91.0,
    idealTytNet: 79,
    quota: 30,
    yokAtlasCode: '105550341',
    badge: '🛡️ YÖK Stratejik Siber Güvenlik',
    description: 'Ayazağa, İstanbul. Siber savunma, ağ güvenliği, sızma testleri ve SOC analistliği eğitimi.',
  },
  {
    id: 'hacettepe-paramedik',
    name: 'Hacettepe Üniversitesi Sağlık Hizmetleri MYO',
    department: 'İlk ve Acil Yardım (Paramedik)',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 412.5,
    minRank: 165000,
    targetObp: 89.0,
    idealTytNet: 72,
    quota: 70,
    yokAtlasCode: '104850231',
    badge: '🚑 Acil Tıp ve Yaşam Kurtarma',
    description: 'Sıhhiye, Ankara. 112 ambulans sistemleri, ileri yaşam desteği ve travma müdahale simülasyonları.',
  },
  {
    id: 'estu-ucak-teknolojisi',
    name: 'Eskişehir Teknik Üniversitesi',
    department: 'Uçak Teknolojisi',
    city: 'Eskişehir',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 408.0,
    minRank: 175000,
    targetObp: 88.5,
    idealTytNet: 71,
    quota: 65,
    yokAtlasCode: '112450198',
    badge: '✈️ Sivil Havacılık ve Bakım Onarım',
    description: 'İki Eylül Kampüsü, Eskişehir. SHY-147 onaylı hava aracı gövde, motor ve aviyonik bakım lisansı.',
  },
  {
    id: 'marmara-anestezi',
    name: 'Marmara Üniversitesi Sağlık Hizmetleri MYO',
    department: 'Anestezi',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 402.4,
    minRank: 190000,
    targetObp: 88.0,
    idealTytNet: 70,
    quota: 60,
    yokAtlasCode: '107250185',
    badge: '💉 Ameliyathane & Anestezi Teknikleri',
    description: 'Başıbüyük Sağlık Yerleşkesi. Yoğun bakım ve ameliyathanelerde ileri anestezi uygulamaları.',
  },
  {
    id: 'cerrahpasa-goruntuleme',
    name: 'İstanbul Üniversitesi - Cerrahpaşa Sağlık Hizmetleri MYO',
    department: 'Tıbbi Görüntüleme Teknikleri (Radyoloji)',
    city: 'İstanbul',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 394.2,
    minRank: 215000,
    targetObp: 87.0,
    idealTytNet: 68,
    quota: 65,
    yokAtlasCode: '111650221',
    badge: '🩻 MR, BT & İleri Radyoloji',
    description: 'Cerrahpaşa Tıp Fakültesi hastanesinde doğrudan MR, Bilgisayarlı Tomografi ve PET-BT stajı.',
  },
  {
    id: 'ege-bilgisayar-prog',
    name: 'Ege Üniversitesi Ege MYO',
    department: 'Bilgisayar Programcılığı',
    city: 'İzmir',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 385.0,
    minRank: 240000,
    targetObp: 86.0,
    idealTytNet: 66,
    quota: 85,
    yokAtlasCode: '103450212',
    badge: '💾 Ege Bilişim Teknolojileri',
    description: 'Bornova, İzmir. Veritabanı mimarisi, nesne yönelimli programlama ve bulut bilişim.',
  },
  {
    id: 'ankara-adalet',
    name: 'Ankara Üniversitesi Adalet Meslek Yüksekokulu',
    department: 'Adalet',
    city: 'Ankara',
    type: 'devlet',
    scoreType: 'TYT',
    minScore: 372.4,
    minRank: 280000,
    targetObp: 85.0,
    idealTytNet: 62,
    quota: 90,
    yokAtlasCode: '101150185',
    badge: '⚖️ Adliye & Yargı Hizmetleri',
    description: 'Cebeci, Ankara. DGS ile Hukuk Fakültelerine geçiş önceliği, zabıt kâtipliği ve icra müdürlüğü.',
  },
];

export interface TargetUniversityGap {
  university: YksUniversityTarget;
  currentEstimatedObp: number;
  obpGap: number;
  status: 'on_track' | 'close' | 'needs_boost';
  statusMessage: string;
}

export interface NetSufficiencyAnalysis {
  target: YksUniversityTarget;
  currentTytNet: number;
  currentAytNet?: number;
  tytNetGap: number;
  aytNetGap?: number;
  isTytSufficient: boolean;
  isAytSufficient?: boolean;
  overallStatus: 'ready' | 'close' | 'needs_work';
  guidanceNote: string;
}

/**
 * Öğrencinin lise diploma notu (OBP) ile hedef üniversitenin hedef OBP'si arasındaki farkı analiz eder.
 */
export function analyzeUniversityTargetGap(
  targetId: string,
  currentTermAverage: number
): TargetUniversityGap | null {
  const target = YKS_TOP_UNIVERSITIES.find((u) => u.id === targetId);
  if (!target) return null;

  const obpGap = Number((target.targetObp - currentTermAverage).toFixed(2));

  let status: 'on_track' | 'close' | 'needs_boost' = 'on_track';
  let statusMessage = `Harika! Not ortalaman (${currentTermAverage.toFixed(1)}), ${target.name} ${target.department} hedefinin üzerinde seyrediyor.`;

  if (obpGap > 5) {
    status = 'needs_boost';
    statusMessage = `Hedefin (${target.targetObp} OBP) için okul ortalamanı ${obpGap} puan yükseltmen YKS'de ciddi ek puan sağlayacaktır.`;
  } else if (obpGap > 0) {
    status = 'close';
    statusMessage = `Hedefine çok yakınsın! Sadece ${obpGap} puanlık bir artışla tam hedeflenen diploma notu bandına ulaşacaksın.`;
  }

  return {
    university: target,
    currentEstimatedObp: currentTermAverage,
    obpGap,
    status,
    statusMessage,
  };
}

/**
 * Öğrencinin güncel TYT ve AYT/YDT netlerini hedeflenen üniversite programının ideal netleriyle kıyaslar.
 */
export function calculateNetSufficiency(
  targetId: string,
  currentTytNet: number,
  currentAytNet?: number
): NetSufficiencyAnalysis | null {
  const target = YKS_TOP_UNIVERSITIES.find((u) => u.id === targetId);
  if (!target) return null;

  const tytGap = Number((target.idealTytNet - currentTytNet).toFixed(2));
  const isTytSufficient = tytGap <= 0;

  let aytGap: number | undefined = undefined;
  let isAytSufficient: boolean | undefined = undefined;

  if (target.scoreType !== 'TYT' && target.idealAytNet !== undefined) {
    const aytNetVal = currentAytNet ?? 0;
    aytGap = Number((target.idealAytNet - aytNetVal).toFixed(2));
    isAytSufficient = aytGap <= 0;
  }

  let overallStatus: 'ready' | 'close' | 'needs_work' = 'ready';
  let guidanceNote = '';

  if (target.scoreType === 'TYT') {
    if (isTytSufficient) {
      overallStatus = 'ready';
      guidanceNote = `TYT netlerin (${currentTytNet}) bu önlisans programı için tamamen yeterli düzeydedir.`;
    } else if (tytGap <= 8) {
      overallStatus = 'close';
      guidanceNote = `Hedefe çok yakınsın; TYT'de sadece ${tytGap} netlik bir artış hedefin kazanılmasını sağlayacaktır.`;
    } else {
      overallStatus = 'needs_work';
      guidanceNote = `Hedef TYT netine (${target.idealTytNet}) ulaşmak için ${tytGap} netlik düzenli konu tekrarı ve branş denemesi gerekmektedir.`;
    }
  } else {
    const totalGap = tytGap + (aytGap ?? 0);
    if (isTytSufficient && (isAytSufficient ?? false)) {
      overallStatus = 'ready';
      guidanceNote = `Mükemmel! Hem TYT hem AYT netlerin ${target.name} ${target.department} yerleşimi için ideal aralıktadır.`;
    } else if (totalGap <= 12) {
      overallStatus = 'close';
      guidanceNote = `Kritik eşiktesin! TYT'de ${Math.max(0, tytGap)} net, AYT'de ${Math.max(0, aytGap ?? 0)} net artışla hedefini yakalayabilirsin.`;
    } else {
      overallStatus = 'needs_work';
      guidanceNote = `Hedef başarı sırası (${target.minRank.toLocaleString('tr-TR')}) için özellikle AYT'de ${Math.max(0, aytGap ?? 0)} netlik yoğun bir pekiştirme programı gereklidir.`;
    }
  }

  return {
    target,
    currentTytNet,
    currentAytNet,
    tytNetGap: tytGap,
    aytNetGap: aytGap,
    isTytSufficient,
    isAytSufficient,
    overallStatus,
    guidanceNote,
  };
}

/**
 * Belirli bir puan türüne (SAY, EA, SÖZ, DİL, TYT veya ALL) göre hedefleri filtreler.
 */
export function getProgramsByScoreType(scoreType: YksScoreType | 'ALL'): YksUniversityTarget[] {
  if (!scoreType || scoreType === 'ALL') {
    return YKS_TOP_UNIVERSITIES;
  }
  return YKS_TOP_UNIVERSITIES.filter((u) => u.scoreType === scoreType);
}

/**
 * Resmi YÖK başarı sırası barajına tabi programları döner.
 */
export function getYokBarajiPrograms(): YksUniversityTarget[] {
  return YKS_TOP_UNIVERSITIES.filter((u) => u.isYokBaraji === true);
}

/**
 * Üniversite ve bölüm arama fonksiyonu
 */
export function searchUniversities(query: string, scoreType?: YksScoreType | 'ALL'): YksUniversityTarget[] {
  let list = YKS_TOP_UNIVERSITIES;
  if (scoreType && scoreType !== 'ALL') {
    list = list.filter((u) => u.scoreType === scoreType);
  }

  if (!query || query.trim() === '') {
    return list.slice(0, 15);
  }

  const q = query.toLowerCase().trim();
  return list.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.scoreType.toLowerCase() === q
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
  scoreType: YksScoreType;
  minScore: number;
  minRank: number;
  idealTytNet: number;
  idealAytNet?: number;
  targetObp: number;
  description: string;
  isYokBaraji?: boolean;
}

export const STANDARD_YKS_PROGRAMS: StandardDepartment[] = [
  // SAY
  { name: 'Tıp Fakültesi', scoreType: 'SAY', minScore: 505, minRank: 22000, idealTytNet: 98, idealAytNet: 70, targetObp: 95.0, isYokBaraji: true, description: 'Sağlık ve klinik hekimlik' },
  { name: 'Diş Hekimliği Fakültesi', scoreType: 'SAY', minScore: 470, minRank: 38000, idealTytNet: 86, idealAytNet: 62, targetObp: 92.0, isYokBaraji: true, description: 'Ağız ve diş sağlığı cerrahisi' },
  { name: 'Eczacılık Fakültesi', scoreType: 'SAY', minScore: 445, minRank: 55000, idealTytNet: 80, idealAytNet: 56, targetObp: 90.0, isYokBaraji: true, description: 'Farmasötik bilim ve ilaç teknolojisi' },
  { name: 'Bilgisayar Mühendisliği', scoreType: 'SAY', minScore: 480, minRank: 35000, idealTytNet: 92, idealAytNet: 66, targetObp: 93.0, isYokBaraji: true, description: 'Yazılım, algoritma ve yapay zekâ sistemleri' },
  { name: 'Yazılım Mühendisliği', scoreType: 'SAY', minScore: 460, minRank: 48000, idealTytNet: 85, idealAytNet: 60, targetObp: 90.0, isYokBaraji: true, description: 'Uygulama mimarisi ve bulut sistemler' },
  { name: 'Yapay Zekâ ve Veri Mühendisliği', scoreType: 'SAY', minScore: 510, minRank: 12000, idealTytNet: 100, idealAytNet: 72, targetObp: 95.0, isYokBaraji: true, description: 'Derin öğrenme, makine öğrenmesi ve veri analitiği' },
  { name: 'Elektrik-Elektronik Mühendisliği', scoreType: 'SAY', minScore: 470, minRank: 42000, idealTytNet: 88, idealAytNet: 63, targetObp: 92.0, isYokBaraji: true, description: 'Elektronik sistemler, IoT ve telekomünikasyon' },
  { name: 'Endüstri Mühendisliği', scoreType: 'SAY', minScore: 455, minRank: 52000, idealTytNet: 84, idealAytNet: 59, targetObp: 91.0, isYokBaraji: true, description: 'Süreç optimizasyonu ve yönetim mühendisliği' },
  { name: 'Makine Mühendisliği', scoreType: 'SAY', minScore: 435, minRank: 75000, idealTytNet: 78, idealAytNet: 54, targetObp: 88.0, isYokBaraji: true, description: 'Mekanik tasarım ve robotik imalat teknolojileri' },
  { name: 'Havacılık ve Uzay Mühendisliği', scoreType: 'SAY', minScore: 495, minRank: 25000, idealTytNet: 95, idealAytNet: 69, targetObp: 94.0, isYokBaraji: true, description: 'Savunma sanayii ve hava araçları teknolojisi' },
  { name: 'Mimarlık', scoreType: 'SAY', minScore: 420, minRank: 110000, idealTytNet: 72, idealAytNet: 48, targetObp: 88.0, isYokBaraji: true, description: 'Bina tasarımı, restorasyon ve kentsel estetik' },
  { name: 'Moleküler Biyoloji ve Genetik', scoreType: 'SAY', minScore: 430, minRank: 85000, idealTytNet: 75, idealAytNet: 52, targetObp: 89.0, description: 'Biyoteknoloji, genetik ve hücre biyolojisi' },
  { name: 'Hemşirelik', scoreType: 'SAY', minScore: 385, minRank: 165000, idealTytNet: 64, idealAytNet: 42, targetObp: 85.0, description: 'Klinik hasta bakımı ve sağlık kurumları yönetimi' },
  { name: 'Fizyoterapi ve Rehabilitasyon', scoreType: 'SAY', minScore: 395, minRank: 145000, idealTytNet: 68, idealAytNet: 45, targetObp: 86.0, description: 'Fiziksel tedavi, ergoterapi ve sporcu sağlığı' },

  // EA
  { name: 'Hukuk Fakültesi', scoreType: 'EA', minScore: 440, minRank: 35000, idealTytNet: 80, idealAytNet: 52, targetObp: 90.0, isYokBaraji: true, description: 'Adalet, anayasa ve avukatlık/hâkimlik kariyeri' },
  { name: 'Psikoloji', scoreType: 'EA', minScore: 425, minRank: 48000, idealTytNet: 76, idealAytNet: 48, targetObp: 89.0, description: 'İnsan davranışı ve klinik/gelişim danışmanlığı' },
  { name: 'Yönetim Bilişim Sistemleri (YBS)', scoreType: 'EA', minScore: 435, minRank: 40000, idealTytNet: 80, idealAytNet: 50, targetObp: 89.0, description: 'Bilişim yönetimi, veri tabanı ve iş zekâsı' },
  { name: 'İşletme', scoreType: 'EA', minScore: 410, minRank: 65000, idealTytNet: 72, idealAytNet: 45, targetObp: 87.0, description: 'Finans, pazarlama ve şirket yöneticiliği' },
  { name: 'İktisat / Ekonomi', scoreType: 'EA', minScore: 405, minRank: 72000, idealTytNet: 70, idealAytNet: 44, targetObp: 86.0, description: 'Makroekonomik analiz ve sermaye piyasaları' },
  { name: 'Sınıf Öğretmenliği', scoreType: 'EA', minScore: 410, minRank: 68000, idealTytNet: 70, idealAytNet: 46, targetObp: 88.0, isYokBaraji: true, description: 'İlkokul temel pedagojisi ve çocuk gelişimi' },
  { name: 'Rehberlik ve Psikolojik Danışmanlık (PDR)', scoreType: 'EA', minScore: 415, minRank: 60000, idealTytNet: 72, idealAytNet: 47, targetObp: 88.0, isYokBaraji: true, description: 'Okul ve kariyer psikolojik rehberliği' },
  { name: 'Siyaset Bilimi ve Uluslararası İlişkiler', scoreType: 'EA', minScore: 400, minRank: 80000, idealTytNet: 68, idealAytNet: 42, targetObp: 86.0, description: 'Diplomasi, küresel siyaset ve dış politika' },

  // SÖZ
  { name: 'Özel Eğitim Öğretmenliği', scoreType: 'SÖZ', minScore: 430, minRank: 18000, idealTytNet: 78, idealAytNet: 56, targetObp: 89.0, isYokBaraji: true, description: 'Özel gereksinimli bireylerin pedagojik eğitimi' },
  { name: 'Türkçe Öğretmenliği', scoreType: 'SÖZ', minScore: 420, minRank: 26000, idealTytNet: 74, idealAytNet: 54, targetObp: 88.0, isYokBaraji: true, description: 'Ortaokul ana dil eğitimi ve okuma kültürü' },
  { name: 'Tarih Öğretmenliği', scoreType: 'SÖZ', minScore: 385, minRank: 55000, idealTytNet: 65, idealAytNet: 46, targetObp: 85.0, isYokBaraji: true, description: 'Kültür ve medeniyet tarihi eğitimi' },
  { name: 'Halkla İlişkiler ve Tanıtım', scoreType: 'SÖZ', minScore: 375, minRank: 68000, idealTytNet: 60, idealAytNet: 42, targetObp: 84.0, description: 'Kurumsal iletişim, marka ve halkla ilişkiler' },
  { name: 'Gastronomi ve Mutfak Sanatları', scoreType: 'SÖZ', minScore: 405, minRank: 38000, idealTytNet: 70, idealAytNet: 50, targetObp: 86.0, description: 'Mutfak sanatları, gastronomi ve restoran işletmeciliği' },
  { name: 'İlahiyat / İslami İlimler', scoreType: 'SÖZ', minScore: 390, minRank: 50000, idealTytNet: 66, idealAytNet: 48, targetObp: 85.0, description: 'İslami ilimler, din felsefesi ve ahlak eğitimi' },

  // DİL
  { name: 'İngilizce Öğretmenliği', scoreType: 'DİL', minScore: 460, minRank: 12000, idealTytNet: 82, idealAytNet: 70, targetObp: 91.0, isYokBaraji: true, description: 'Yabancı dil pedagojisi ve İngilizce eğitimi' },
  { name: 'Mütercim ve Tercümanlık (İngilizce)', scoreType: 'DİL', minScore: 450, minRank: 16000, idealTytNet: 80, idealAytNet: 68, targetObp: 90.0, description: 'Simültane ve yazılı metin çevirisi' },
  { name: 'İngiliz Dili ve Edebiyatı', scoreType: 'DİL', minScore: 430, minRank: 25000, idealTytNet: 74, idealAytNet: 64, targetObp: 87.0, description: 'İngiliz edebiyatı ve filolojik inceleme' },
  { name: 'Turizm Rehberliği', scoreType: 'DİL', minScore: 395, minRank: 42000, idealTytNet: 65, idealAytNet: 55, targetObp: 85.0, description: 'Kültür turları ve profesyonel turist rehberliği' },

  // TYT (Önlisans)
  { name: 'İlk ve Acil Yardım (Paramedik)', scoreType: 'TYT', minScore: 390, minRank: 220000, idealTytNet: 68, targetObp: 87.0, description: 'Acil tıp, ambulans ve ilk yardım uygulamaları' },
  { name: 'Bilgisayar Programcılığı', scoreType: 'TYT', minScore: 375, minRank: 260000, idealTytNet: 64, targetObp: 86.0, description: 'Web, mobil ve veritabanı yazılım geliştirme' },
  { name: 'Anestezi', scoreType: 'TYT', minScore: 385, minRank: 235000, idealTytNet: 66, targetObp: 86.5, description: 'Ameliyathane anestezi teknikleri ve cihaz kullanımı' },
  { name: 'Tıbbi Görüntüleme Teknikleri', scoreType: 'TYT', minScore: 380, minRank: 245000, idealTytNet: 65, targetObp: 86.0, description: 'Radyolojik görüntüleme ve tahlil teknolojisi' },
  { name: 'Siber Güvenlik Analistliği', scoreType: 'TYT', minScore: 410, minRank: 170000, idealTytNet: 72, targetObp: 88.0, description: 'Ağ güvenliği ve siber operasyon uzmanlığı' },
  { name: 'Uçak Teknolojisi', scoreType: 'TYT', minScore: 395, minRank: 205000, idealTytNet: 69, targetObp: 87.0, description: 'Hava aracı motor ve aviyonik bakım teknolojisi' },
  { name: 'Adalet', scoreType: 'TYT', minScore: 360, minRank: 310000, idealTytNet: 60, targetObp: 84.0, description: 'Yargı teşkilatı ve hukuk kâtipliği hizmetleri' },
];

/**
 * Şehre göre filtrelenmiş benzersiz üniversite isimlerini döner
 */
export function getDistinctUniversities(city?: string): { name: string; city: string }[] {
  const result: { name: string; city: string }[] = [];
  const seen = new Set<string>();

  if (city && city.trim() !== '' && city !== 'Tüm Şehirler') {
    const cClean = city.trim();
    const unisForCity = TURKEY_UNIVERSITIES_BY_CITY[cClean] || [];
    for (const uName of unisForCity) {
      if (!seen.has(uName)) {
        seen.add(uName);
        result.push({ name: uName, city: cClean });
      }
    }

    for (const item of YKS_TOP_UNIVERSITIES) {
      if (item.city.toLowerCase() === cClean.toLowerCase() && !seen.has(item.name)) {
        seen.add(item.name);
        result.push({ name: item.name, city: item.city });
      }
    }
  } else {
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

  // 3. Genel YKS lisans & önlisans programlarını bu üniversiteye uyarla
  return STANDARD_YKS_PROGRAMS.map((prog, idx) => ({
    id: `${universityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`,
    name: universityName,
    department: prog.name,
    city: cityOfUni,
    type: 'devlet' as const,
    scoreType: prog.scoreType,
    minScore: prog.minScore,
    minRank: prog.minRank,
    targetObp: prog.targetObp,
    idealTytNet: prog.idealTytNet,
    idealAytNet: prog.idealAytNet,
    isYokBaraji: prog.isYokBaraji,
    badge: `🎓 ${prog.scoreType} Programı`,
    description: `${universityName} - ${prog.description}`,
  }));
}

/**
 * Sistemde üniversitesi bulunan şehirler (Tüm 81 il)
 */
export function getCitiesWithUniversities(): string[] {
  return Object.keys(TURKEY_UNIVERSITIES_BY_CITY).sort((a, b) => a.localeCompare(b, 'tr'));
}
