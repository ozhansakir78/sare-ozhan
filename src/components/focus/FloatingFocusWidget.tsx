'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFocus, FOCUS_MODE_CONFIG } from '@/components/focus/FocusContext';
import {
  Play,
  Pause,
  Maximize2,
  Music,
  Sparkles,
  Bell,
  Volume2,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export function FloatingFocusWidget() {
  const pathname = usePathname();
  const {
    mode,
    minutes,
    secondsLeft,
    isActive,
    activeSound,
    soundVolume,
    toggleTimer,
    toggleSound,
    setSoundVolume,
    stopSound,
  } = useFocus();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Odaklanma Odası sayfasındayken yüzen çubuğu gizle
  if (pathname === '/odaklanma-odasi') {
    return null;
  }

  // Ne zaman görünmeli? Sayaç çalışıyorsa VEYA ses çalıyorsa
  const isRunningOrPlaying = isActive || activeSound !== 'none';

  if (!isRunningOrPlaying && !isExpanded) {
    return null;
  }

  if (isDismissed) {
    return null;
  }

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;
  const formattedTime = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;

  const totalSeconds = minutes * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <aside
      aria-label="Odaklanma Sayacı ve Müzik Kontrolleri"
      className="fixed bottom-5 right-5 z-50 transition-all duration-300 print:hidden"
    >
      <div className="overflow-hidden rounded-3xl border border-indigo-200/80 bg-white/95 p-3 sm:p-4 shadow-2xl backdrop-blur-md dark:border-indigo-900/80 dark:bg-slate-900/95 max-w-sm">
        {/* Üst Satır: Kompakt Çubuk */}
        <div className="flex items-center gap-3">
          {/* İlerleme Halkası / Zaman */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                className="stroke-indigo-600 transition-all duration-1000 dark:stroke-indigo-500"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 15.5}
                strokeDashoffset={2 * Math.PI * 15.5 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-slate-800 dark:text-slate-100">
              {displayMinutes}m
            </span>
          </div>

          {/* Bilgi Metni */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                {formattedTime}
              </span>
              <span className="text-[10px] font-bold text-slate-400">&bull;</span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                {FOCUS_MODE_CONFIG[mode].title.split(' ')[1] || 'Odak'}
              </span>
            </div>

            {/* Müzik Çalıyor Rozeti */}
            {activeSound !== 'none' && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                {activeSound === 'lofi' && 'Piyano Çalıyor'}
                {activeSound === 'guitar' && 'Gitar Çalıyor'}
                {activeSound === 'music-box' && 'Müzik Kutusu'}
                {activeSound === 'library' && 'Huzur Çanı'}
              </span>
            )}
          </div>

          {/* Düğmeler */}
          <div className="flex items-center gap-1.5 ml-2">
            {/* Başlat / Duraklat */}
            <button
              type="button"
              onClick={toggleTimer}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-700 transition cursor-pointer"
              title={isActive ? 'Duraklat' : 'Devam Et'}
            >
              {isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
            </button>

            {/* Genişlet / Daralt */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
              title={isExpanded ? 'Küçült' : 'Ayarlar'}
            >
              {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
            </button>

            {/* Odaya Büyüt */}
            <Link
              href="/odaklanma-odasi"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
              title="Tam Ekrana Büyüt"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </Link>

            {/* Kapat / Gizle */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
              title="Gizle"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Genişletilmiş Panel */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span>🎧 Dinlendirici Çalışma Melodileri</span>
              {activeSound !== 'none' && (
                <button
                  type="button"
                  onClick={stopSound}
                  className="text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                >
                  Sesi Kapat
                </button>
              )}
            </div>

            {/* Hızlı Seçiciler */}
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => toggleSound('lofi')}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-1.5 px-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSound === 'lofi'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Music className="h-3 w-3" />
                <span>Piyano</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSound('guitar')}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-1.5 px-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSound === 'guitar'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <span className="text-xs">🎸</span>
                <span>Gitar</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSound('music-box')}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-1.5 px-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSound === 'music-box'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Kutu</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSound('library')}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-1.5 px-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSound === 'library'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Bell className="h-3 w-3" />
                <span>Çan</span>
              </button>
            </div>

            {/* Ses Düzeyi */}
            {activeSound !== 'none' && (
              <div className="flex items-center gap-2 pt-1">
                <Volume2 className="h-3.5 w-3.5 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(Number(e.target.value))}
                  className="h-1.5 w-full appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700 cursor-pointer"
                />
                <span className="text-[10px] font-bold text-slate-400 w-6 text-right">
                  %{soundVolume}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
