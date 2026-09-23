'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, CheckCircle2, Maximize2, Minimize2 } from 'lucide-react';
import { useFocus, FOCUS_MODE_CONFIG } from '@/components/focus/FocusContext';

export function PomodoroTimer() {
  const {
    mode,
    minutes,
    secondsLeft,
    isActive,
    completedToday,
    totalMinutesToday,
    toggleTimer,
    resetTimer,
    skipSession,
    switchMode,
  } = useFocus();

  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  // İlerleme yüzdesi
  const totalSeconds = minutes * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;
  const formattedTime = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;

  // Sayfa başlığını güncelle (örn: 24:15 - LGS Odaklanma)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isActive) {
        document.title = `${formattedTime} - ${mode === 'focus' ? '🎯 Odaklan' : '☕ Mola'} | SınavKoçu`;
      } else {
        document.title = 'LGS Çalışma & Odaklanma Odası | SınavKoçu.ai';
      }
    }
  }, [formattedTime, isActive, mode]);

  return (
    <div
      className={`transition-all duration-300 ${
        isZenMode
          ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white p-6'
          : 'flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      {/* Zen Modu Düğmesi */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${FOCUS_MODE_CONFIG[mode].badgeColor}`}>
            {FOCUS_MODE_CONFIG[mode].title}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsZenMode(!isZenMode)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
        >
          {isZenMode ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Normal Moda Dön</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Zen Modu (Tam Ekran)</span>
            </>
          )}
        </button>
      </div>

      {/* Mod Seçiciler */}
      <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800/80 mb-8">
        <button
          type="button"
          onClick={() => switchMode('focus', 25)}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            mode === 'focus' && minutes === 25
              ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          🎯 25 Dk Odak
        </button>

        <button
          type="button"
          onClick={() => switchMode('focus', 45)}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer hidden sm:inline-block ${
            mode === 'focus' && minutes === 45
              ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          ⏱️ 45 Dk Deneme
        </button>

        <button
          type="button"
          onClick={() => switchMode('short_break', 5)}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            mode === 'short_break'
              ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          ☕ 5 Dk Mola
        </button>

        <button
          type="button"
          onClick={() => switchMode('long_break', 15)}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            mode === 'long_break'
              ? 'bg-white text-amber-600 shadow-sm dark:bg-slate-900 dark:text-amber-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          🌴 15 Dk Dinlenme
        </button>
      </div>

      {/* Dairesel Sayaç / Büyük Zaman Göstergesi */}
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
        {/* SVG Dairesel İlerleme */}
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-slate-100 dark:stroke-slate-800/80"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            className={`transition-all duration-1000 ${
              mode === 'focus'
                ? 'stroke-indigo-600 dark:stroke-indigo-500'
                : mode === 'short_break'
                ? 'stroke-emerald-500'
                : 'stroke-amber-500'
            }`}
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={2 * Math.PI * 44 * (1 - progressPercent / 100)}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Merkez Sayaç Metni */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="font-mono text-5xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-6xl">
            {formattedTime}
          </span>
          <span className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {isActive ? 'Zaman Akıyor...' : 'Hazır'}
          </span>
        </div>
      </div>

      {/* Kontrol Düğmeleri */}
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={resetTimer}
          title="Sıfırla"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={toggleTimer}
          className={`flex h-14 w-36 items-center justify-center gap-2 rounded-2xl font-black text-sm text-white shadow-lg transition transform active:scale-95 cursor-pointer ${
            isActive
              ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
              : mode === 'focus'
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="h-5 w-5 fill-white" />
              <span>Duraklat</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5 fill-white ml-0.5" />
              <span>Başlat</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={skipSession}
          title="Sonraki Seansa Geç"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Günlük Tamamlanan İstatistikler Rozeti */}
      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-3 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Bugün: <strong>{completedToday} Seans</strong>
          </span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
          Toplam <strong>{totalMinutesToday} Dk</strong> Odaklanma
        </span>
      </div>
    </div>
  );
}
