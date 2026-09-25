import { LgsHighSchool, TargetGapAnalysis } from '@/types/school';

export const LGS_HIGH_SCHOOLS: LgsHighSchool[] = [
  {
    id: 'galatasaray',
    name: 'Galatasaray Lisesi',
    city: 'İstanbul',
    district: 'Beyoğlu',
    type: 'anadolu',
    minScore: 494.85,
    minPercentile: 0.04,
    quota: 100,
    badge: '🏆 Türkiye Birincilerinin Tercihi',
    description: 'Beyoğlu, İstanbul. Fransızca eğitim veren, Türkiye\'nin en köklü ve en yüksek taban puanlı lisesi.',
  },
  {
    id: 'istanbul-erkek',
    name: 'İstanbul Erkek Lisesi',
    city: 'İstanbul',
    district: 'Fatih',
    type: 'anadolu',
    minScore: 493.42,
    minPercentile: 0.07,
    quota: 150,
    badge: '🇩🇪 Abitur Diploması & Alman Eğitimi',
    description: 'Fatih, İstanbul. Almanca hazırlık ve çift diploma avantajıyla öne çıkan tarihi lise.',
  },
  {
    id: 'kabatas-erkek',
    name: 'Kabataş Erkek Lisesi',
    city: 'İstanbul',
    district: 'Beşiktaş',
    type: 'anadolu',
    minScore: 492.15,
    minPercentile: 0.11,
    quota: 180,
    badge: '🌟 Boğazın İncisi & Prestij',
    description: 'Ortaköy, Beşiktaş, İstanbul. İngilizce ve Almanca bölümleriyle akademik ve sosyal alanda zirve okul.',
  },
  {
    id: 'ankara-fen',
    name: 'Ankara Fen Lisesi',
    city: 'Ankara',
    district: 'Çankaya',
    type: 'fen',
    minScore: 491.50,
    minPercentile: 0.15,
    quota: 120,
    badge: '🔬 Türkiye\'nin İlk Fen Lisesi',
    description: 'Çankaya, Ankara. Bilim olimpiyatları ve tıp/mühendislik başarılarında Türkiye lideri.',
  },
  {
    id: 'ataturk-fen-istanbul',
    name: 'İstanbul Atatürk Fen Lisesi',
    city: 'İstanbul',
    district: 'Kadıköy',
    type: 'fen',
    minScore: 490.25,
    minPercentile: 0.22,
    quota: 120,
    badge: '⚡ İstanbul\'un En İyi Fen Lisesi',
    description: 'Kadıköy, İstanbul. Marmara Bölgesi\'nin en prestijli fen lisesi.',
  },
  {
    id: 'izmir-fen',
    name: 'İzmir Fen Lisesi',
    city: 'İzmir',
    district: 'Bornova',
    type: 'fen',
    minScore: 489.80,
    minPercentile: 0.26,
    quota: 90,
    badge: '🌊 Ege\'nin Bilim Üssü',
    description: 'Bornova, İzmir. Ege Bölgesi\'nin en yüksek puanlı bilim okulu.',
  },
  {
    id: 'cagaloglu-anadolu',
    name: 'Cağaloğlu Anadolu Lisesi',
    city: 'İstanbul',
    district: 'Fatih',
    type: 'anadolu',
    minScore: 488.10,
    minPercentile: 0.38,
    quota: 150,
    badge: '📜 Tarihi Alman Ekolü',
    description: 'Fatih, İstanbul. Tarihi yarımadada köklü Almanca eğitim geleneği.',
  },
  {
    id: 'kadikoy-anadolu',
    name: 'Kadıköy Anadolu Lisesi (KAL)',
    city: 'İstanbul',
    district: 'Kadıköy',
    type: 'anadolu',
    minScore: 486.40,
    minPercentile: 0.52,
    quota: 210,
    badge: 'Martı Ekolü & Güçlü Mezun Ağı',
    description: 'Moda, Kadıköy. İngilizce eğitimi ve köklü kültürüyle İstanbul\'un gözdesi.',
  },
  {
    id: 'bursa-tofas-fen',
    name: 'Tofaş Fen Lisesi',
    city: 'Bursa',
    district: 'Nilüfer',
    type: 'fen',
    minScore: 485.60,
    minPercentile: 0.61,
    quota: 120,
    badge: '🏎️ Sanayi & Bilim İşbirliği',
    description: 'Nilüfer, Bursa. Güney Marmara\'nın en başarılı fen lisesi.',
  },
  {
    id: 'bornova-anadolu',
    name: 'Bornova Anadolu Lisesi (BAL)',
    city: 'İzmir',
    district: 'Bornova',
    type: 'anadolu',
    minScore: 484.20,
    minPercentile: 0.74,
    quota: 240,
    badge: 'BAL Efsanesi & İng/Alm/Fra',
    description: 'Bornova, İzmir. 3 yabancı dil seçeneği ve zengin kampüs yaşamı.',
  },
  {
    id: 'antalya-yusuf-ziya-fen',
    name: 'Yusuf Ziya Öner Fen Lisesi',
    city: 'Antalya',
    district: 'Döşemealtı',
    type: 'fen',
    minScore: 482.90,
    minPercentile: 0.88,
    quota: 120,
    badge: '☀️ Akdeniz\'in Zirvesi',
    description: 'Döşemealtı, Antalya. Akdeniz bölgesinin en başarılı fen lisesi.',
  },
  {
    id: 'adana-fen',
    name: 'Adana Fen Lisesi',
    city: 'Adana',
    district: 'Çukurova',
    type: 'fen',
    minScore: 481.30,
    minPercentile: 1.05,
    quota: 120,
    badge: '🎯 Çukurova\'nın Gururu',
    description: 'Çukurova, Adana. Bölgenin en yüksek YKS başarı oranına sahip lisesi.',
  },
  {
    id: 'gaziantep-vehbi-dincerler-fen',
    name: 'Vehbi Dinçerler Fen Lisesi',
    city: 'Gaziantep',
    district: 'Şehitkamil',
    type: 'fen',
    minScore: 478.40,
    minPercentile: 1.35,
    quota: 120,
    badge: 'Güneydoğu\'nun En İyisi',
    description: 'Şehitkamil, Gaziantep. Yüksek akademik başarı ve proje çalışmaları.',
  },
  {
    id: 'eskisehir-fatih-fen',
    name: 'Eskişehir Fatih Fen Lisesi',
    city: 'Eskişehir',
    district: 'Odunpazarı',
    type: 'fen',
    minScore: 477.10,
    minPercentile: 1.48,
    quota: 120,
    badge: 'İç Anadolu Bilim Yıldızı',
    description: 'Odunpazarı, Eskişehir. Köklü fen eğitimi ve modern laboratuvarlar.',
  },
  {
    id: 'vefa-lisesi',
    name: 'Vefa Lisesi',
    city: 'İstanbul',
    district: 'Fatih',
    type: 'anadolu',
    minScore: 475.60,
    minPercentile: 1.68,
    quota: 150,
    badge: 'Boza Ekolü & Yeşil Beyaz Kültür',
    description: 'Fatih, İstanbul. Türkiye\'nin anadille eğitim yapan ilk mülkiye mektebi.',
  },
  {
    id: 'samsun-garip-zeycan-fen',
    name: 'Garip Zeycan Yıldırım Fen Lisesi',
    city: 'Samsun',
    district: 'Atakum',
    type: 'fen',
    minScore: 472.80,
    minPercentile: 1.95,
    quota: 120,
    badge: '⚓ Karadeniz\'in Lider Fen Lisesi',
    description: 'Atakum, Samsun. Karadeniz kıyısında olimpik bilim çalışmaları.',
  },
  {
    id: 'kocaeli-fen',
    name: 'Kocaeli Fen Lisesi',
    city: 'Kocaeli',
    district: 'İzmit',
    type: 'fen',
    minScore: 476.30,
    minPercentile: 1.55,
    quota: 120,
    badge: '🔬 Sanayinin Bilim Öncüsü',
    description: 'İzmit, Kocaeli. Sanayi ve teknoloji kentine yakışır güçlü fen altyapısı.',
  },
  {
    id: 'konya-meram-fen',
    name: 'Konya Meram Fen Lisesi',
    city: 'Konya',
    district: 'Meram',
    type: 'fen',
    minScore: 479.20,
    minPercentile: 1.20,
    quota: 120,
    badge: '🌾 İç Anadolu Zirvesi',
    description: 'Meram, Konya. YKS dereceleri ve bilim olimpiyatı madalyaları.',
  },
  {
    id: 'trabzon-fen',
    name: 'Trabzon Merkez Fen Lisesi',
    city: 'Trabzon',
    district: 'Ortahisar',
    type: 'fen',
    minScore: 471.50,
    minPercentile: 2.10,
    quota: 120,
    badge: '🌲 Doğu Karadeniz Bilim Merkezi',
    description: 'Ortahisar, Trabzon. Köklü eğitim kadrosu ve yüksek üniversite yerleşimi.',
  },
  {
    id: 'denizli-erbakir-fen',
    name: 'Erbakır Fen Lisesi',
    city: 'Denizli',
    district: 'Merkezefendi',
    type: 'fen',
    minScore: 478.10,
    minPercentile: 1.38,
    quota: 120,
    badge: '⚙️ Ege\'nin Parlayan Yıldızı',
    description: 'Merkezefendi, Denizli. Mühendislik ve tıp fakültelerine yüksek yerleştirme.',
  },
  {
    id: 'diyarbakir-rekabet-fen',
    name: 'Rekabet Kurumu Cumhuriyet Fen Lisesi',
    city: 'Diyarbakır',
    district: 'Yenişehir',
    type: 'fen',
    minScore: 473.40,
    minPercentile: 1.85,
    quota: 120,
    badge: '☀️ Bölgenin Tıp Fabrikası',
    description: 'Yenişehir, Diyarbakır. Güneydoğu Anadolu\'nun en köklü ve başarılı fen lisesi.',
  },
  {
    id: 'balikesir-sirri-yircali-anadolu',
    name: 'Sırrı Yırcalı Anadolu Lisesi (SYAL)',
    city: 'Balıkesir',
    district: 'Karesi',
    type: 'anadolu',
    minScore: 468.90,
    minPercentile: 2.45,
    quota: 150,
    badge: '🎓 Güney Marmara Klasiği',
    description: 'Karesi, Balıkesir. Çift yabancı dil ve uluslararası başarı projeleri.',
  },
];

const TARGET_SCHOOL_KEY = 'lgs_target_school_v1';

export function getAllHighSchools(): LgsHighSchool[] {
  return LGS_HIGH_SCHOOLS;
}

export function getHighSchoolById(id: string): LgsHighSchool | undefined {
  return LGS_HIGH_SCHOOLS.find((s) => s.id === id);
}

export function getSelectedTargetSchool(): LgsHighSchool | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const stored = localStorage.getItem(TARGET_SCHOOL_KEY);
    if (stored) {
      const found = LGS_HIGH_SCHOOLS.find((s) => s.id === stored);
      if (found) return found;
    }
  } catch (e) {
    console.error('Error reading target school:', e);
  }
  return null;
}

export function setSelectedTargetSchool(schoolId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TARGET_SCHOOL_KEY, schoolId);
    window.dispatchEvent(new CustomEvent('target_school_updated', { detail: schoolId }));
  } catch (e) {
    console.error('Error writing target school:', e);
  }
}

/**
 * Öğrencinin son deneme puanı ile hedef lisesi arasındaki farkı ve gereken netleri hesaplar.
 */
export function analyzeTargetGap(target: LgsHighSchool, currentScore: number): TargetGapAnalysis {
  const diff = Number((target.minScore - currentScore).toFixed(2));
  const isAchieved = diff <= 0;
  
  // İlerleme yüzdesi (0 - 100)
  const progressPercent = Math.min(100, Math.max(10, Math.round((currentScore / target.minScore) * 100)));

  // LGS katsayıları: Matematik ~4.2, Fen ~4.1, Türkçe ~4.1
  const neededMatNets = isAchieved ? 0 : Number(Math.max(0.5, (diff / 4.25)).toFixed(1));
  const neededFenNets = isAchieved ? 0 : Number(Math.max(0.5, (diff / 4.15)).toFixed(1));
  const neededTurkceNets = isAchieved ? 0 : Number(Math.max(0.5, (diff / 4.20)).toFixed(1));

  let smartAdvice = '';
  if (isAchieved) {
    smartAdvice = `Tebrikler! Mevcut deneme puanın (${currentScore.toFixed(1)}) ${target.name} taban puanının (${target.minScore.toFixed(1)}) üzerinde. Bu tempoyu koru ve istikrarını sürdür!`;
  } else if (diff <= 15) {
    smartAdvice = `Hedefine çok az kaldı! Sadece Matematikten +${Math.ceil(neededMatNets)} net veya Fen'den +${Math.ceil(neededFenNets)} net artışla ${target.name}'ne yerleşebilirsin.`;
  } else if (diff <= 35) {
    smartAdvice = `Güzel bir ivmen var. Matematik ve Fen'de en çok hata yaptığın 2 konuyu Yanlış Defteri ile kapatırsan bu arayı hızla kapatacaksın.`;
  } else {
    smartAdvice = `Hedefin büyük ve harika bir motivasyon! Haftalık deneme çözümlerine düzenli devam ederek netlerini adım adım zirveye taşıyabilirsin.`;
  }

  return {
    targetSchool: target,
    currentScore,
    scoreDifference: diff,
    progressPercent,
    isAchieved,
    neededNetEquivalent: [
      { course: 'matematik', neededNets: neededMatNets },
      { course: 'fen', neededNets: neededFenNets },
      { course: 'turkce', neededNets: neededTurkceNets },
    ],
    smartAdvice,
  };
}

/**
 * Türkçe karakterlere duyarlı Title Case (Her kelimenin ilk harfini büyük yapar)
 */
export function toTurkishTitleCase(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return '';
      const firstChar = word.charAt(0).toLocaleUpperCase('tr-TR');
      const rest = word.slice(1).toLocaleLowerCase('tr-TR');
      return firstChar + rest;
    })
    .join(' ');
}

/**
 * Kullanıcının yazdığı serbest metni (ör. "kabataş", "galatasaray", "kadıköy")
 * LGS veritabanındaki resmi okul ismiyle eşleştirir ve düzgün yazılmış halini döner.
 */
export function normalizeSchoolName(input: string): string {
  if (!input || !input.trim()) return 'Kabataş Erkek Lisesi';
  const query = input.trim().toLocaleLowerCase('tr-TR');

  // 1. Doğrudan veya popüler kısaltma eşleşmesi
  if (query.includes('kabataş') || query.includes('kabatas')) return 'Kabataş Erkek Lisesi';
  if (query.includes('galatasaray')) return 'Galatasaray Lisesi';
  if (query.includes('istanbul erkek') || query.includes('ıstanbul erkek')) return 'İstanbul Erkek Lisesi';
  if (query.includes('ankara fen')) return 'Ankara Fen Lisesi';
  if (query.includes('izmir fen') || query.includes('ızmir fen')) return 'İzmir Fen Lisesi';
  if (query.includes('atatürk fen') || query.includes('ataturk fen')) return 'İstanbul Atatürk Fen Lisesi';
  if (query.includes('cağaloğlu') || query.includes('cagaloglu')) return 'Cağaloğlu Anadolu Lisesi';
  if (query.includes('kadıköy') || query.includes('kadikoy') || query === 'kal') return 'Kadıköy Anadolu Lisesi (KAL)';
  if (query.includes('tofaş') || query.includes('tofas')) return 'Tofaş Fen Lisesi';
  if (query.includes('bornova') || query === 'bal') return 'Bornova Anadolu Lisesi (BAL)';
  if (query.includes('vefa')) return 'Vefa Lisesi';
  if (query.includes('adana fen')) return 'Adana Fen Lisesi';
  if (query.includes('gaziantep') || query.includes('vehbi dinçerler')) return 'Vehbi Dinçerler Fen Lisesi';
  if (query.includes('eskişehir') || query.includes('eskisehir')) return 'Eskişehir Fatih Fen Lisesi';
  if (query.includes('samsun') || query.includes('garip zeycan')) return 'Garip Zeycan Yıldırım Fen Lisesi';
  if (query.includes('antalya') || query.includes('yusuf ziya')) return 'Yusuf Ziya Öner Fen Lisesi';

  // 2. LGS_HIGH_SCHOOLS listesinde genel arama
  const match = LGS_HIGH_SCHOOLS.find((school) => {
    const sName = school.name.toLocaleLowerCase('tr-TR');
    return sName.includes(query) || query.includes(sName);
  });
  if (match) return match.name;

  // 3. Eşleşme yoksa düzgün Türkçe Başlık Formatına (Title Case) çevir
  return toTurkishTitleCase(input);
}

/**
 * Arama sorgusuna göre LGS liselerini filtreler
 */
export function searchHighSchools(query: string): LgsHighSchool[] {
  if (!query || !query.trim()) {
    return LGS_HIGH_SCHOOLS.slice(0, 6); // Varsayılan en popüler ilk 6 lise
  }
  const cleanQuery = query.trim().toLocaleLowerCase('tr-TR');
  return LGS_HIGH_SCHOOLS.filter((school) => {
    const sName = school.name.toLocaleLowerCase('tr-TR');
    const sCity = school.city.toLocaleLowerCase('tr-TR');
    return sName.includes(cleanQuery) || sCity.includes(cleanQuery);
  });
}

/**
 * Şehir ve/veya ilçeye göre liseleri filtreler
 */
export function getHighSchoolsByLocation(city?: string, district?: string): LgsHighSchool[] {
  let list = LGS_HIGH_SCHOOLS;
  if (city && city.trim() !== '') {
    const cClean = city.trim().toLocaleLowerCase('tr-TR');
    list = list.filter((s) => s.city.toLocaleLowerCase('tr-TR') === cClean);
  }
  if (district && district.trim() !== '' && district !== 'Tüm İlçeler' && district !== 'Merkez') {
    const dClean = district.trim().toLocaleLowerCase('tr-TR');
    list = list.filter((s) => s.district && s.district.toLocaleLowerCase('tr-TR') === dClean);
  }
  return list;
}

/**
 * Sistemde lisesi kayıtlı olan şehirlerin listesini döner
 */
export function getCitiesWithHighSchools(): string[] {
  const cities = Array.from(new Set(LGS_HIGH_SCHOOLS.map((s) => s.city)));
  return cities.sort((a, b) => a.localeCompare(b, 'tr'));
}

