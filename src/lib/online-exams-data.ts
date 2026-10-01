import type { OnlineExam, OnlineExamTier } from '@/types/online-exam';
import { FULL_LGS_EXAMS } from '@/lib/exams/full-lgs-exams';
import { MATH_EXAMS } from '@/lib/exams/math-exams';
import { TURKISH_EXAMS } from '@/lib/exams/turkish-exams';
import { SCIENCE_EXAMS } from '@/lib/exams/science-exams';
import { VERBAL_EXAMS } from '@/lib/exams/verbal-exams';
import { LISE1_EXAMS } from '@/lib/exams/lise1-exams';
import { LISE1_UNIT_TESTS } from '@/lib/exams/lise1-unit-tests';
import { LISE2_EXAMS } from '@/lib/exams/lise2-exams';
import { LISE3_EXAMS } from '@/lib/exams/lise3-exams';
import { LGS_UNIT_TESTS } from '@/lib/exams/lgs-unit-tests';
import { generateWeeklyLiveExam } from '@/lib/weekly-live-exam';
import { getAutonomousChallengeExams } from '@/lib/autonomous-challenge-engine';

export const ONLINE_EXAMS: OnlineExam[] = [
  generateWeeklyLiveExam(),
  ...getAutonomousChallengeExams(),
  ...FULL_LGS_EXAMS,
  ...MATH_EXAMS,
  ...TURKISH_EXAMS,
  ...SCIENCE_EXAMS,
  ...VERBAL_EXAMS,
  ...LGS_UNIT_TESTS,
  ...LISE1_EXAMS,
  ...LISE1_UNIT_TESTS,
  ...LISE2_EXAMS,
  ...LISE3_EXAMS,
];

export function getOnlineExams(): OnlineExam[] {
  if (typeof window !== 'undefined') {
    try {
      const customRaw = localStorage.getItem('lgs_custom_exams_v1');
      if (customRaw) {
        const customExams = JSON.parse(customRaw) as OnlineExam[];
        return [...ONLINE_EXAMS, ...customExams];
      }
    } catch (e) {
      console.error('Custom exams load error:', e);
    }
  }
  return ONLINE_EXAMS;
}

export function getOnlineExamBySlug(slug: string): OnlineExam | undefined {
  const all = getOnlineExams();
  return all.find((e) => e.slug === slug);
}

/**
 * Belirli bir kademeye (LGS, lise1, lise2, lise3, yks) ait sınavları filtreler
 */
export function getOnlineExamsByTier(tier: OnlineExamTier): OnlineExam[] {
  const all = getOnlineExams();
  if (tier === 'lgs') {
    return all.filter((e) => !e.tier || e.tier === 'lgs');
  }
  return all.filter((e) => e.tier === tier);
}

