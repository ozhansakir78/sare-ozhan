'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getActiveChallengeForToday, ActiveChallengeInfo } from '@/lib/meb-curriculum-calendar';
import {
  Sparkles,
  X,
  Trophy,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
  Users,
} from 'lucide-react';

const EVENT_MODAL_STORAGE_KEY = 'lgs_event_modal_dismissed_v1';

export function EventAnnouncementModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<ActiveChallengeInfo | null>(null);

  useEffect(() => {
    // Sadece istemci tarafında kontrol et
    const current = getActiveChallengeForToday();
    setChallenge(current);

    // Bugün daha önce kapatılmış mı?
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem(EVENT_MODAL_STORAGE_KEY);
      if (savedDate === todayStr) {
        // Bugün kapatılmış, açma
        return;
      }
    } catch {
      // ignore
    }

    // 1.8 saniye sonra tatlı bir animasyonla aç
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (dontShowToday = false) => {
    setIsOpen(false);
    if (dontShowToday) {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem(EVENT_MODAL_STORAGE_KEY, todayStr);
      } catch {
        // ignore
      }
    }
  };

  if (!isOpen || !challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-indigo-200/80 bg-white p-6 sm:p-8 shadow-2xl dark:border-indigo-900/60 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
        {/* Kapat Butonu */}
        <button
          type="button"
          onClick={() => handleDismiss(true)}
          className="absolute top-4 right-4 rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white transition cursor-pointer"
          title="Kapat"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Üst Rozet & İkon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-600 dark:text-amber-400">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{challenge.badge}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
            <Clock className="h-3 w-3" /> {challenge.durationMinutes} Dk
          </span>
        </div>

        {/* Başlık ve Açıklama */}
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          {challenge.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {challenge.description}
        </p>

        {/* Kazanım & Konu Rozetleri */}
        <div className="mt-4 rounded-2xl bg-indigo-50/70 p-3.5 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/50">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200 mb-2">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>Bu Sınavdaki MEB Kazanımları:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {challenge.targetTopics.map((topic, i) => (
              <span
                key={i}
                className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-2xs dark:bg-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700"
              >
                &bull; {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Sosyal Kanıt & Katılımcı Bilgisi */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
            <Users className="h-3.5 w-3.5" />
            <span>340+ Öğrenci Katıldı</span>
          </span>
          <span className="font-semibold">
            {challenge.questionCount} Soru &bull; Canlı Sıralama
          </span>
        </div>

        {/* Aksiyon Butonları */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href={`/deneme-coz/${challenge.slug}`}
            onClick={() => handleDismiss(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-xs sm:text-sm font-black text-white shadow-md shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition"
          >
            <span>Meydan Okumayı Başlat</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => handleDismiss(true)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Bugün Gösterme
          </button>
        </div>
      </div>
    </div>
  );
}
