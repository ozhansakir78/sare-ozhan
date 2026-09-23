'use client';

import { useState, useEffect, useCallback } from 'react';

export type GradeTier = 'lgs' | 'lise1';

export const GRADE_TIER_STORAGE_KEY = 'lgs_active_tier_v1';
export const GRADE_TIER_EVENT = 'grade_tier_changed';

export interface GradeTierConfig {
  key: GradeTier;
  label: string;
  shortLabel: string;
  badge: string;
  targetTypeLabel: string;
  scoreScaleLabel: string;
  themeColor: string;
}

export const GRADE_TIERS: Record<GradeTier, GradeTierConfig> = {
  lgs: {
    key: 'lgs',
    label: '8. Sınıf (LGS 2027)',
    shortLabel: '8. Sınıf LGS',
    badge: 'LGS Modu',
    targetTypeLabel: 'Hedef Lise',
    scoreScaleLabel: '500 Üzerinden Puan',
    themeColor: 'indigo',
  },
  lise1: {
    key: 'lise1',
    label: '9. Sınıf (Lise 1)',
    shortLabel: '9. Sınıf Lise 1',
    badge: 'Lise 1 Modu',
    targetTypeLabel: 'Hedef Üniversite / Bölüm',
    scoreScaleLabel: '100 Üzerinden Yazılı Notu & OBP',
    themeColor: 'emerald',
  },
};

/**
 * Mevcut aktif kademeyi localStorage'dan okur (Varsayılan: 'lgs')
 */
export function getActiveTier(): GradeTier {
  if (typeof window === 'undefined') return 'lgs';
  try {
    const stored = localStorage.getItem(GRADE_TIER_STORAGE_KEY);
    if (stored === 'lise1' || stored === 'lgs') {
      return stored;
    }
  } catch (e) {
    console.error('Grade tier read error:', e);
  }
  return 'lgs';
}

/**
 * Aktif kademeyi kaydeder ve tüm açık bileşenlere haber verir
 */
export function setActiveTier(tier: GradeTier): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GRADE_TIER_STORAGE_KEY, tier);
    window.dispatchEvent(new CustomEvent(GRADE_TIER_EVENT, { detail: { tier } }));
  } catch (e) {
    console.error('Grade tier save error:', e);
  }
}

/**
 * React bileşenlerinde aktif kademeyi canlı takip etmek için hook
 */
export function useGradeTier() {
  const [tier, setTierState] = useState<GradeTier>('lgs');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setTierState(getActiveTier());

    const handleTierChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ tier: GradeTier }>;
      if (customEvent.detail?.tier) {
        setTierState(customEvent.detail.tier);
      } else {
        setTierState(getActiveTier());
      }
    };

    window.addEventListener(GRADE_TIER_EVENT, handleTierChange);
    window.addEventListener('storage', handleTierChange);

    return () => {
      window.removeEventListener(GRADE_TIER_EVENT, handleTierChange);
      window.removeEventListener('storage', handleTierChange);
    };
  }, []);

  const setTier = useCallback((newTier: GradeTier) => {
    setTierState(newTier);
    setActiveTier(newTier);
  }, []);

  return {
    tier,
    setTier,
    isLise1: tier === 'lise1',
    isLgs: tier === 'lgs',
    config: GRADE_TIERS[tier],
    mounted,
  };
}
