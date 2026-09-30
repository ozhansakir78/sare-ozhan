import type { OnlineExamType } from '@/types/online-exam';

/**
 * SınavKoçu.ai - Çok Kademeli (Multi-Tier) Eğitim Kademesi Tipleri
 * 8. Sınıf LGS'den 12. Sınıf YKS Zirvesine kadar tam kademe desteği
 */
export type GradeTier = 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks';

export type GradeNumber = 8 | 9 | 10 | 11 | 12;

/**
 * 11 ve 12. sınıf YKS alan seçenekleri
 */
export type LiseAlan = 'sayisal' | 'esit_agirlik' | 'sozel' | 'dil';

export interface GradeTierConfig {
  key: GradeTier;
  gradeNumber: GradeNumber;
  label: string;
  shortLabel: string;
  badge: string;
  targetTypeLabel: string;
  scoreScaleLabel: string;
  themeColor: string;
  description: string;
  supportedExamTypes: OnlineExamType[];
}
