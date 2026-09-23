import type { OnlineExam } from '@/types/online-exam';
import { FULL_LGS_EXAMS } from '@/lib/exams/full-lgs-exams';

export interface SundayInfo {
  dateStr: string;
  shortDate: string;
  isoDate: string;
  isLiveNow: boolean;
}

const TR_MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

export function getWeeklySundayInfo(): SundayInfo {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday...
  const hour = now.getHours();
  const minute = now.getMinutes();

  let isLiveNow = false;
  let daysUntilSunday = 0;

  if (day === 0) {
    // Bugün Pazar
    if (hour === 10 || hour === 11 || (hour === 12 && minute <= 30)) {
      isLiveNow = true;
      daysUntilSunday = 0;
    } else if (hour > 12 || (hour === 12 && minute > 30)) {
      // Pazar öğleden sonra, sıradaki pazara geç
      daysUntilSunday = 7;
    } else {
      // Pazar sabah 10'dan önce, bugün 10'da başlayacak
      daysUntilSunday = 0;
    }
  } else {
    // Hafta içi (Pazartesi - Cumartesi)
    daysUntilSunday = 7 - day;
  }

  const target = new Date(now);
  target.setDate(now.getDate() + daysUntilSunday);

  const dayNum = target.getDate();
  const monthName = TR_MONTHS[target.getMonth()];
  const yearNum = target.getFullYear();

  const dateStr = `${dayNum} ${monthName} ${yearNum}`;
  const shortDate = `${String(dayNum).padStart(2, '0')}.${String(target.getMonth() + 1).padStart(2, '0')}.${yearNum}`;
  const isoDate = `${yearNum}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

  return {
    dateStr,
    shortDate,
    isoDate,
    isLiveNow,
  };
}

export function generateWeeklyLiveExam(): OnlineExam {
  const { dateStr, isLiveNow } = getWeeklySundayInfo();

  // Temel Türkiye Geneli sınav sorularını referans alıp o haftanın tarihiyle canlı sınava dönüştür
  const baseExam = FULL_LGS_EXAMS[0];

  return {
    id: 'lgs-weekly-live-exam',
    slug: 'lgs-canli-pazar-denemesi',
    title: `${dateStr} — LGS 2027 Türkiye Geneli Canlı Deneme Sınavı`,
    description: `${dateStr} Pazar günü saat 10:00'da tüm Türkiye ile eşzamanlı düzenlenen resmi haftalık canlı LGS denemesi. MEB standartlarında yeni nesil beceri temelli sorular ve ayrıntılı çözümler.`,
    type: 'full',
    courseName: 'Tüm Dersler (Haftalık Canlı LGS)',
    questionCount: baseExam.questionCount,
    durationMinutes: baseExam.durationMinutes,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: isLiveNow ? '🔴 ŞİMDİ CANLI YAYINDA' : '⏰ BU PAZAR 10:00 CANLI',
    questions: baseExam.questions,
  };
}
