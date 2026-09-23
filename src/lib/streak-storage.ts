export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null; // 'YYYY-MM-DD'
  todayQuestionsCount: number;
  dailyGoal: number; // Varsayılan 5 soru
  totalActiveDays: number;
}

const STREAK_STORAGE_KEY = 'lgs_user_streak_v1';

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastActiveDate: null,
  todayQuestionsCount: 0,
  dailyGoal: 5,
  totalActiveDays: 0,
};

export function getStreakData(): StreakData {
  if (typeof window === 'undefined') {
    return DEFAULT_STREAK;
  }

  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_STREAK;
    }

    const data: StreakData = JSON.parse(raw);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    // Gün değiştiyse bugünkü soru sayısını sıfırla
    if (data.lastActiveDate !== today) {
      if (data.lastActiveDate !== yesterday && data.lastActiveDate !== null) {
        // 1 günden fazla ara vermiş, seri sıfırlandı
        data.currentStreak = 0;
      }
      data.todayQuestionsCount = 0;
      // Kaydet
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(data));
    }

    return data;
  } catch {
    return DEFAULT_STREAK;
  }
}

export function recordStreakActivity(questionCount: number = 1): {
  streak: StreakData;
  streakIncreased: boolean;
  goalJustCompleted: boolean;
} {
  if (typeof window === 'undefined') {
    return { streak: DEFAULT_STREAK, streakIncreased: false, goalJustCompleted: false };
  }

  try {
    const current = getStreakData();
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let streakIncreased = false;
    const prevCount = current.todayQuestionsCount;
    const newCount = prevCount + questionCount;
    const goalJustCompleted = prevCount < current.dailyGoal && newCount >= current.dailyGoal;

    if (current.lastActiveDate !== today) {
      if (current.lastActiveDate === yesterday) {
        current.currentStreak += 1;
        streakIncreased = true;
      } else {
        current.currentStreak = 1;
        streakIncreased = true;
      }
      current.totalActiveDays += 1;
      current.lastActiveDate = today;
    }

    current.todayQuestionsCount = newCount;

    if (current.currentStreak > current.bestStreak) {
      current.bestStreak = current.currentStreak;
    }

    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(current));

    // Diğer bileşenlerin haberdar olması için etkinlik fırlat
    window.dispatchEvent(new CustomEvent('streak_updated', { detail: current }));

    return {
      streak: current,
      streakIncreased,
      goalJustCompleted,
    };
  } catch {
    return { streak: DEFAULT_STREAK, streakIncreased: false, goalJustCompleted: false };
  }
}

export function updateDailyGoal(newGoal: number): StreakData {
  const current = getStreakData();
  current.dailyGoal = Math.max(1, newGoal);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('streak_updated', { detail: current }));
  }
  return current;
}
