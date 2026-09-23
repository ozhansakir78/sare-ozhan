'use client';

import React from 'react';
import { useFocus } from '@/components/focus/FocusContext';
import { Music, Sparkles, Bell, VolumeX, Volume2 } from 'lucide-react';

export function AmbientSoundPlayer() {
  const { activeSound, soundVolume, toggleSound, setSoundVolume } = useFocus();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          🎧 Huzurlu Çalışma Melodileri
        </span>
        {activeSound !== 'none' && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Çalıyor
          </span>
        )}
      </div>

      {/* 4 Melodik Enstrüman Seçeneği (Cızırtısız & Uğultusuz) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* 1. Lofi Piyano */}
        <button
          type="button"
          onClick={() => toggleSound('lofi')}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition cursor-pointer ${
            activeSound === 'lofi'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Music className={`h-4 w-4 ${activeSound === 'lofi' ? 'text-indigo-600' : ''}`} />
          <span>Lofi Piyano</span>
        </button>

        {/* 2. Akustik Gitar */}
        <button
          type="button"
          onClick={() => toggleSound('guitar')}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition cursor-pointer ${
            activeSound === 'guitar'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <span className="text-base">🎸</span>
          <span>Akustik Gitar</span>
        </button>

        {/* 3. Müzik Kutusu */}
        <button
          type="button"
          onClick={() => toggleSound('music-box')}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition cursor-pointer ${
            activeSound === 'music-box'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className={`h-4 w-4 ${activeSound === 'music-box' ? 'text-indigo-600' : ''}`} />
          <span>Müzik Kutusu</span>
        </button>

        {/* 4. Huzur Çanı */}
        <button
          type="button"
          onClick={() => toggleSound('library')}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition cursor-pointer ${
            activeSound === 'library'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className={`h-4 w-4 ${activeSound === 'library' ? 'text-indigo-600' : ''}`} />
          <span>Huzur Çanı</span>
        </button>
      </div>

      {/* Ses Ayarı Çubuğu */}
      {activeSound !== 'none' && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => toggleSound(activeSound)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
          >
            {soundVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={soundVolume}
            onChange={(e) => setSoundVolume(Number(e.target.value))}
            className="h-1.5 w-full appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700 cursor-pointer"
          />
          <span className="text-[11px] font-bold text-slate-400 w-7 text-right">
            %{soundVolume}
          </span>
        </div>
      )}
    </div>
  );
}
