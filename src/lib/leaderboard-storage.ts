import { LeaderboardEntry } from '@/types/leaderboard';

const LEADERBOARD_STORAGE_KEY = 'lgs_leaderboard_entries_v1';

export const INITIAL_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    nickname: 'DereceAvcısı',
    examTitle: '2027 LGS Türkiye Geneli 1. Büyük Deneme',
    examSlug: 'lgs-2027-turkiye-geneli-1-deneme',
    score: 494.32,
    totalNet: 88.33,
    correctCount: 18,
    wrongCount: 0,
    city: 'İstanbul',
    targetSchool: 'Galatasaray Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'lead-2',
    nickname: 'FenLisesiYolcusu',
    examTitle: '2027 LGS Türkiye Geneli 1. Büyük Deneme',
    examSlug: 'lgs-2027-turkiye-geneli-1-deneme',
    score: 489.15,
    totalNet: 86.67,
    correctCount: 17,
    wrongCount: 1,
    city: 'Ankara',
    targetSchool: 'Ankara Fen Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'lead-3',
    nickname: 'KabatasHedef',
    examTitle: '2027 LGS Türkiye Geneli 1. Büyük Deneme',
    examSlug: 'lgs-2027-turkiye-geneli-1-deneme',
    score: 482.40,
    totalNet: 84.33,
    correctCount: 17,
    wrongCount: 1,
    city: 'İzmir',
    targetSchool: 'Kabataş Erkek Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
  {
    id: 'lead-4',
    nickname: 'LgsBükücü',
    examTitle: '2027 LGS 1. Dönem Altın Kamp Denemesi',
    examSlug: 'lgs-2027-1-donem-altin-kamp-denemesi',
    score: 476.80,
    totalNet: 82.00,
    correctCount: 11,
    wrongCount: 1,
    city: 'Bursa',
    targetSchool: 'İstanbul Erkek Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: 'lead-5',
    nickname: 'MatematikDehası',
    examTitle: '1. Ünite: Çarpanlar ve Katlar Uzmanlık Denemesi',
    examSlug: 'lgs-mat-unite-1-carpanlar-katlar',
    score: 471.25,
    totalNet: 80.67,
    correctCount: 5,
    wrongCount: 0,
    city: 'Antalya',
    targetSchool: 'Antalya Fen Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'lead-6',
    nickname: 'AslaPesEtme',
    examTitle: '2027 LGS Türkiye Geneli 1. Büyük Deneme',
    examSlug: 'lgs-2027-turkiye-geneli-1-deneme',
    score: 465.50,
    totalNet: 78.33,
    correctCount: 16,
    wrongCount: 2,
    city: 'Eskişehir',
    targetSchool: 'Eskişehir Fatih Fen Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 55).toISOString(),
  },
  {
    id: 'lead-7',
    nickname: 'SoruCanavarı',
    examTitle: '2027 LGS 1. Dönem Altın Kamp Denemesi',
    examSlug: 'lgs-2027-1-donem-altin-kamp-denemesi',
    score: 458.90,
    totalNet: 76.00,
    correctCount: 10,
    wrongCount: 2,
    city: 'Konya',
    targetSchool: 'Meram Fen Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: 'lead-8',
    nickname: 'Lgs2027Şampiyonu',
    examTitle: '2027 LGS Türkiye Geneli 1. Büyük Deneme',
    examSlug: 'lgs-2027-turkiye-geneli-1-deneme',
    score: 452.10,
    totalNet: 73.67,
    correctCount: 15,
    wrongCount: 3,
    city: 'Adana',
    targetSchool: 'Adana Fen Lisesi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
  },
];

export function getLeaderboardEntries(filterPeriod: 'weekly' | 'all-time' = 'all-time', examSlug?: string): LeaderboardEntry[] {
  let userEntries: LeaderboardEntry[] = [];
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (saved) {
        userEntries = JSON.parse(saved);
      }
    } catch {
      userEntries = [];
    }
  }

  const all = [...userEntries, ...INITIAL_ENTRIES];

  let filtered = all;
  if (examSlug && examSlug !== 'all') {
    filtered = filtered.filter((e) => e.examSlug === examSlug);
  }

  if (filterPeriod === 'weekly') {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    filtered = filtered.filter((e) => new Date(e.createdAt).getTime() >= oneWeekAgo);
  }

  // Puana göre azalan sırada sırala
  return filtered.sort((a, b) => b.score - a.score);
}

export function addLeaderboardEntry(
  entry: Omit<LeaderboardEntry, 'id' | 'createdAt' | 'isCurrentUser'>
): LeaderboardEntry {
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: 'lead-user-' + Date.now(),
    createdAt: new Date().toISOString(),
    isCurrentUser: true,
  };

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      const list: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];
      list.unshift(newEntry);
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  return newEntry;
}
