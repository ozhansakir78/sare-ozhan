import { LeaderboardEntry } from '@/types/leaderboard';

const LEADERBOARD_STORAGE_KEY = 'lgs_leaderboard_entries_v1';

export const INITIAL_ENTRIES: LeaderboardEntry[] = [];


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
