'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CalendarDays } from 'lucide-react';

// 2027 LGS sınav tarihi (Haziran ilk Pazar günü)
const LGS_EXAM_DATE = new Date('2027-06-06T10:00:00+03:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = LGS_EXAM_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface LgsCountdownProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function LgsCountdown({ variant = 'full', className = '' }: LgsCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const isExamPassed = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExamPassed) {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 ${className}`}>
        <CalendarDays className="h-3.5 w-3.5" />
        <span>2027 LGS Sınavı Tamamlandı</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-bold text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300 ${className}`}>
        <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
        <span>2027 LGS&apos;ye {timeLeft.days} Gün</span>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 p-4 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/30 dark:via-slate-900 dark:to-violet-950/20 sm:p-5 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
        <Clock className="h-4 w-4" />
        <span>2027 LGS Sınavına Geri Sayım</span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {/* Gün */}
        <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-xs dark:bg-slate-800 sm:p-3">
          <span className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            {timeLeft.days}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Gün
          </span>
        </div>

        {/* Saat */}
        <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-xs dark:bg-slate-800 sm:p-3">
          <span className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saat
          </span>
        </div>

        {/* Dakika */}
        <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-xs dark:bg-slate-800 sm:p-3">
          <span className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Dakika
          </span>
        </div>

        {/* Saniye */}
        <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-xs dark:bg-slate-800 sm:p-3">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 sm:text-3xl">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saniye
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
        6 Haziran 2027 Pazar • Hedeflenen MEB LGS sınav tarihi
      </p>
    </div>
  );
}
