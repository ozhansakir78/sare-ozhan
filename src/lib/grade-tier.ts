'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GradeTier, GradeTierConfig } from '@/types/grade-tier';

export * from '@/types/grade-tier';

export const GRADE_TIER_STORAGE_KEY = 'lgs_active_tier_v1';
export const GRADE_TIER_EVENT = 'grade_tier_changed';

export const VALID_TIERS: GradeTier[] = ['lgs', 'lise1', 'lise2', 'lise3', 'yks'];

export const GRADE_TIERS: Record<GradeTier, GradeTierConfig> = {
  lgs: {
    key: 'lgs',
    gradeNumber: 8,
    label: '8. Sınıf (LGS 2027)',
    shortLabel: '8. Sınıf LGS',
    badge: 'LGS Modu',
    targetTypeLabel: 'Hedef Lise',
    scoreScaleLabel: '500 Üzerinden Puan & Yüzdelik Dilim',
    themeColor: 'indigo',
    description: 'MEB 8. Sınıf LGS denemeleri, ders bazlı netler ve Sokratik soru analitiği.',
    supportedExamTypes: ['full', 'branch', 'mini'],
  },
  lise1: {
    key: 'lise1',
    gradeNumber: 9,
    label: '9. Sınıf (Lise 1)',
    shortLabel: '9. Sınıf Lise 1',
    badge: 'Lise 1 Modu',
    targetTypeLabel: 'Hedef Üniversite / Bölüm',
    scoreScaleLabel: '100 Üzerinden MEB Ortak Yazılı Notu & OBP',
    themeColor: 'emerald',
    description: 'Türkiye Yüzyılı Maarif Modeli 9. sınıf ortak yazılı provaları ve temel YKS koçluğu.',
    supportedExamTypes: ['yazili', 'branch', 'tyt'],
  },
  lise2: {
    key: 'lise2',
    gradeNumber: 10,
    label: '10. Sınıf (Lise 2)',
    shortLabel: '10. Sınıf Lise 2',
    badge: 'Lise 2 Modu',
    targetTypeLabel: 'Hedef Alan (Sayısal/EA/Sözel/Dil) & Üniversite',
    scoreScaleLabel: '100 Üzerinden MEB Ortak Yazılı Notu & OBP',
    themeColor: 'teal',
    description: '10. sınıf MEB ortak yazılıları, OBP yükseltme ve 11. sınıf alan seçimi rehberliği.',
    supportedExamTypes: ['yazili', 'branch', 'tyt'],
  },
  lise3: {
    key: 'lise3',
    gradeNumber: 11,
    label: '11. Sınıf (Lise 3)',
    shortLabel: '11. Sınıf Lise 3',
    badge: 'Lise 3 Modu',
    targetTypeLabel: 'Hedef Bölüm & YKS Başarı Sırası',
    scoreScaleLabel: 'YKS Başarı Sırası & 100 Üzerinden Yazılı',
    themeColor: 'amber',
    description: 'Alan dersleri (Sayısal/EA/Sözel), erken TYT kampları ve AYT temel atma koçluğu.',
    supportedExamTypes: ['branch', 'yazili', 'tyt', 'ayt'],
  },
  yks: {
    key: 'yks',
    gradeNumber: 12,
    label: '12. Sınıf & Mezun (YKS)',
    shortLabel: 'YKS (TYT/AYT)',
    badge: 'YKS Zirve Modu',
    targetTypeLabel: 'Hedef Üniversite & YÖK Atlas Sıralaması',
    scoreScaleLabel: 'ÖSYM Puanı (TYT / Sayısal / EA / Sözel / Dil)',
    themeColor: 'rose',
    description: '120 soruluk TYT, 160 soruluk AYT denemeleri, YDT ve YÖK Atlas net simülatörü.',
    supportedExamTypes: ['full', 'tyt', 'ayt', 'ydt', 'branch'],
  },
};

/**
 * Mevcut aktif kademeyi localStorage'dan okur (Varsayılan: 'lgs')
 */
export function getActiveTier(): GradeTier {
  if (typeof window === 'undefined') return 'lgs';
  try {
    const stored = localStorage.getItem(GRADE_TIER_STORAGE_KEY) as GradeTier;
    if (stored && VALID_TIERS.includes(stored)) {
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
      if (customEvent.detail?.tier && VALID_TIERS.includes(customEvent.detail.tier)) {
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
    if (VALID_TIERS.includes(newTier)) {
      setTierState(newTier);
      setActiveTier(newTier);
    }
  }, []);

  const isLgs = tier === 'lgs';
  const isLise1 = tier === 'lise1';
  const isLise2 = tier === 'lise2';
  const isLise3 = tier === 'lise3';
  const isYks = tier === 'yks';
  const isLise = tier !== 'lgs';

  return {
    tier,
    setTier,
    isLgs,
    isLise1,
    isLise2,
    isLise3,
    isYks,
    isLise,
    config: GRADE_TIERS[tier] || GRADE_TIERS.lgs,
    mounted,
  };
}
