'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getStreakData, StreakData } from '@/lib/streak-storage';
import { Flame, Target, Trophy, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function DailyStreakBadge() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const refreshStreak = () => {
    setStreak(getStreakData());
  };

  useEffect(() => {
    refreshStreak();

    const handleUpdate = () => refreshStreak();
    window.addEventListener('streak_updated', handleUpdate);

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('streak_updated', handleUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!streak) return null;

  const current = streak.currentStreak;
  const progressPercent = Math.min(100, Math.round((streak.todayQuestionsCount / streak.dailyGoal) * 100));
  const isGoalDone = streak.todayQuestionsCount >= streak.dailyGoal;

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Navbar Butonu */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-black transition cursor-pointer ${
          current > 0
            ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-2xs hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200'
            : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400'
        }`}
        title="Günlük Seri ve Hedef Durumu"
      >
        <Flame className={`h-4 w-4 ${current > 0 ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-slate-400'}`} />
        <span>{current > 0 ? `${current} Gün` : 'Seri Başlat'}</span>
      </button>

      {/* Popover Açılır Kart */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-3xl border border-amber-200 bg-white p-5 shadow-2xl z-50 dark:border-amber-900/50 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <Flame className="h-5 w-5 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {current > 0 ? `${current} Günlük Seri!` : 'Serini Başlat!'}
                </h4>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {current > 0 ? 'Ateşi söndürme, hedefe odaklan!' : 'Her gün gir, seriyi koru!'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                <Trophy className="h-3 w-3" /> Rekor: {streak.bestStreak}g
              </span>
            </div>
          </div>

          {/* Günlük Hedef İlerlemesi */}
          <div className="mt-4 rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-indigo-500" /> Günlük Soru Hedefi
              </span>
              <span className="font-black text-indigo-600 dark:text-indigo-400">
                {streak.todayQuestionsCount} / {streak.dailyGoal} Soru
              </span>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-full transition-all duration-500 ${
                  isGoalDone
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-amber-500 to-indigo-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {isGoalDone ? (
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Harika! Bugünün günlük hedefini tamamladın.</span>
              </div>
            ) : (
              <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                Serini korumak için bugün{' '}
                <strong className="font-bold text-slate-700 dark:text-slate-200">
                  {streak.dailyGoal - streak.todayQuestionsCount} soru
                </strong>{' '}
                daha çözmelisin!
              </p>
            )}
          </div>

          {/* Aksiyon Butonu */}
          <div className="mt-4">
            <Link
              href="/deneme-coz"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700"
            >
              <span>Hemen Soru Çöz</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
