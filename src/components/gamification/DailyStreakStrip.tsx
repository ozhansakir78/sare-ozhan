'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStreakData, DEFAULT_STREAK, StreakData } from '@/lib/streak-storage';
import { Flame, Target, Trophy, ArrowRight, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';

export function DailyStreakStrip() {
  const [streak, setStreak] = useState<StreakData>(DEFAULT_STREAK);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const refresh = () => {
    setStreak(getStreakData());
  };

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener('streak_updated', handleUpdate);
    return () => window.removeEventListener('streak_updated', handleUpdate);
  }, []);

  const current = streak.currentStreak;
  const progressPercent = Math.min(100, Math.round((streak.todayQuestionsCount / streak.dailyGoal) * 100));
  const isGoalDone = streak.todayQuestionsCount >= streak.dailyGoal;
  const remaining = Math.max(0, streak.dailyGoal - streak.todayQuestionsCount);

  return (
    <aside
      aria-label="Günlük Çalışma Serisi ve Soru Hedefi"
      className="border-b border-amber-200/80 bg-gradient-to-r from-amber-50/95 via-orange-50/80 to-amber-50/95 dark:border-amber-900/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30 transition-all shadow-2xs"
    >
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
        {isCollapsed ? (
          /* Küçültülmüş Tek Satır Durum */
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span suppressHydrationWarning className="font-black text-slate-800 dark:text-slate-200">
                {current > 0 ? `${current} Günlük Seri` : 'Günlük Seri Başlat'}
              </span>
              <span className="text-slate-300 dark:text-slate-600">&bull;</span>
              <span suppressHydrationWarning className="font-semibold text-slate-600 dark:text-slate-400">
                Hedef: {streak.todayQuestionsCount}/{streak.dailyGoal} Soru
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 dark:text-amber-400 cursor-pointer"
            >
              <span>Ayrıntıları Aç</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          /* Genişletilmiş ve Dağıtılmış Görünüm (Kullanıcının İstediği Düzen) */
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Sol: Seri & Rekor */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 shadow-inner">
                <Flame className="h-5 w-5 fill-amber-500 text-amber-500 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 suppressHydrationWarning className="text-sm font-black text-slate-900 dark:text-white">
                    {current > 0 ? `${current} Günlük Seri!` : 'Serini Başlat!'}
                  </h3>
                  <span suppressHydrationWarning className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    <Trophy className="h-3 w-3 text-amber-600" /> Rekor: {streak.bestStreak}g
                  </span>
                </div>
                <p suppressHydrationWarning className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {current > 0
                    ? 'Ateşi söndürme, hedefe odaklan!'
                    : 'Bugün 5 soru çöz, serin başlasın!'}
                </p>
              </div>
            </div>

            {/* Orta: Günlük Soru Hedefi & İlerleme Çubuğu */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Günlük Soru Hedefi</span>
                </span>
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  {streak.todayQuestionsCount} / {streak.dailyGoal} Soru (%{progressPercent})
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-amber-200/60 dark:bg-slate-800">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isGoalDone
                      ? 'bg-emerald-500'
                      : 'bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-1 text-[11px]">
                {isGoalDone ? (
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Tebrikler! Bugünkü hedefini tamamladın.
                  </span>
                ) : (
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    Serini korumak için bugün{' '}
                    <strong className="font-black text-amber-900 dark:text-amber-200 underline">
                      {remaining} soru
                    </strong>{' '}
                    daha çözmelisin!
                  </span>
                )}
              </div>
            </div>

            {/* Sağ: Aksiyon Butonu & Gizleme */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <Link
                href="/deneme-coz"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1.5 text-xs font-black text-white shadow-xs hover:from-indigo-700 hover:to-violet-700 transition"
              >
                <span>Hemen Soru Çöz</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Şeridi Küçült"
                className="rounded-xl border border-amber-200/80 bg-white/70 p-1.5 text-amber-800 hover:bg-white dark:border-amber-900/60 dark:bg-slate-800/80 dark:text-amber-300 transition cursor-pointer"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
