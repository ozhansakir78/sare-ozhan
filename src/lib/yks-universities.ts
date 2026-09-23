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
