import type { QuotaStatus } from '@/types/subscription';

const QUOTA_STORAGE_KEY = 'lgs_user_quota_v1';
export const DEFAULT_DAILY_LIMIT = 3;

function getTodayDateKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function getQuotaStatus(): QuotaStatus {
  const todayKey = getTodayDateKey();

  if (typeof window === 'undefined') {
    return {
      isPro: false,
      dailyLimit: DEFAULT_DAILY_LIMIT,
      usedToday: 0,
      remainingToday: DEFAULT_DAILY_LIMIT,
      dateKey: todayKey,
    };
  }

  try {
    const raw = localStorage.getItem(QUOTA_STORAGE_KEY);
    if (!raw) {
      const initial: QuotaStatus = {
        isPro: false,
        dailyLimit: DEFAULT_DAILY_LIMIT,
        usedToday: 0,
        remainingToday: DEFAULT_DAILY_LIMIT,
        dateKey: todayKey,
      };
      localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw) as QuotaStatus;

    // Eğer kullanıcı PRO ise sınırsız erişim
    if (parsed.isPro) {
      return {
        ...parsed,
        remainingToday: 999,
        dateKey: todayKey,
      };
    }

    // Tarih değişmişse yeni gün kotasını sıfırla
    if (parsed.dateKey !== todayKey) {
      const resetDay: QuotaStatus = {
        isPro: false,
        dailyLimit: DEFAULT_DAILY_LIMIT,
        usedToday: 0,
        remainingToday: DEFAULT_DAILY_LIMIT,
        dateKey: todayKey,
      };
      localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(resetDay));
      return resetDay;
    }

    return parsed;
  } catch (err) {
    console.error('Kota okuma hatası:', err);
    return {
      isPro: false,
      dailyLimit: DEFAULT_DAILY_LIMIT,
      usedToday: 0,
      remainingToday: DEFAULT_DAILY_LIMIT,
      dateKey: todayKey,
    };
  }
}

export function consumeQuota(): { success: boolean; quota: QuotaStatus } {
  const current = getQuotaStatus();

  // PRO kullanıcılar için kota harcanmaz, sınırsızdır
  if (current.isPro) {
    return { success: true, quota: current };
  }

  if (current.remainingToday <= 0) {
    return { success: false, quota: current };
  }

  const updated: QuotaStatus = {
    ...current,
    usedToday: current.usedToday + 1,
    remainingToday: Math.max(0, current.remainingToday - 1),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('quota_updated'));
    } catch (e) {
      console.error('Kota güncelleme hatası:', e);
    }
  }

  return { success: true, quota: updated };
}

export function upgradeToPro(): QuotaStatus {
  const current = getQuotaStatus();
  const proStatus: QuotaStatus = {
    ...current,
    isPro: true,
    remainingToday: 999,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(proStatus));
      window.dispatchEvent(new Event('quota_updated'));
    } catch (e) {
      console.error('PRO yükseltme hatası:', e);
    }
  }

  return proStatus;
}

export function downgradeToFree(): QuotaStatus {
  const todayKey = getTodayDateKey();
  const freeStatus: QuotaStatus = {
    isPro: false,
    dailyLimit: DEFAULT_DAILY_LIMIT,
    usedToday: 0,
    remainingToday: DEFAULT_DAILY_LIMIT,
    dateKey: todayKey,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(freeStatus));
      window.dispatchEvent(new Event('quota_updated'));
    } catch (e) {
      console.error('Free duruma alma hatası:', e);
    }
  }

  return freeStatus;
}
