'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { OnlineExam } from '@/types/online-exam';
import { getWeeklySundayInfo } from '@/lib/weekly-live-exam';
import {
  Lock,
  Clock,
  ShieldCheck,
  Trophy,
  Users,
  ArrowRight,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';

interface LiveExamWaitingRoomProps {
  exam: OnlineExam;
  onUnlock?: () => void;
}

export function LiveExamWaitingRoom({ exam, onUnlock }: LiveExamWaitingRoomProps) {
  const [sundayInfo, setSundayInfo] = useState(() => getWeeklySundayInfo());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false,
  });

  useEffect(() => {
    const checkTime = () => {
      const info = getWeeklySundayInfo();
      setSundayInfo(info);

      if (info.isLiveNow) {
        setTimeLeft((prev) => ({ ...prev, isUnlocked: true }));
        if (onUnlock) onUnlock();
        return;
      }

      const diff = new Date(info.isoDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft((prev) => ({ ...prev, isUnlocked: true }));
        if (onUnlock) onUnlock();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isUnlocked: false,
      });
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [onUnlock]);

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Geri Dön Linki - Yüksek Kontrast */}
        <div>
          <Link
            href="/deneme-coz"
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-2xs transition dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Tüm Deneme Sınavlarına Dön</span>
          </Link>
        </div>

        {/* Ana Kilitli Bekleme Kartı */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 sm:p-10 shadow-2xl text-center text-white">
          {/* Arka plan ışıkları */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          {/* Kilit Rozeti */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/20 px-4 py-1.5 text-xs font-black text-amber-300 shadow-xs">
            <Lock className="h-3.5 w-3.5 animate-pulse text-amber-400" />
            <span>CANLI SINAV GÜVENLİK KİLİDİ AKTİF</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight text-white">
            {sundayInfo.dateStr} — LGS Türkiye Geneli Canlı Denemesi
          </h1>

          <p className="mt-3 text-sm text-slate-200 max-w-xl mx-auto leading-relaxed font-medium">
            Tüm Türkiye genelinde adil, şeffaf ve eşit yarışma koşulları sağlanması için sınav soruları{' '}
            <strong className="text-amber-300 font-bold underline decoration-amber-400/60 decoration-2 underline-offset-2">
              {sundayInfo.dateStr} Pazar saat 10:00:00&apos;da
            </strong>{' '}
            tüm öğrencilerle aynı anda eşzamanlı olarak açılacaktır.
          </p>

          {/* Canlı Geri Sayım Kutuları */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Gün */}
            <div className="flex flex-col items-center rounded-2xl bg-slate-800/90 border border-slate-700 p-3 sm:p-4 min-w-[75px] sm:min-w-[90px] shadow-lg">
              <span className="text-3xl sm:text-5xl font-black text-white">{timeLeft.days}</span>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mt-1">Gün</span>
            </div>
            <span className="text-2xl font-black text-indigo-400">:</span>
            {/* Saat */}
            <div className="flex flex-col items-center rounded-2xl bg-slate-800/90 border border-slate-700 p-3 sm:p-4 min-w-[75px] sm:min-w-[90px] shadow-lg">
              <span className="text-3xl sm:text-5xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mt-1">Saat</span>
            </div>
            <span className="text-2xl font-black text-indigo-400">:</span>
            {/* Dk */}
            <div className="flex flex-col items-center rounded-2xl bg-slate-800/90 border border-slate-700 p-3 sm:p-4 min-w-[75px] sm:min-w-[90px] shadow-lg">
              <span className="text-3xl sm:text-5xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mt-1">Dakika</span>
            </div>
            <span className="text-2xl font-black text-indigo-400">:</span>
            {/* Sn */}
            <div className="flex flex-col items-center rounded-2xl bg-amber-500/20 border border-amber-500/50 p-3 sm:p-4 min-w-[75px] sm:min-w-[90px] shadow-lg">
              <span className="text-3xl sm:text-5xl font-black text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider mt-1">Saniye</span>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-900/60 border border-indigo-400/30 px-4 py-2 text-xs font-bold text-indigo-100 shadow-sm">
            <Clock className="h-4 w-4 text-indigo-300 shrink-0" />
            <span>Sınav Süresi: <strong className="text-white font-extrabold">10:00 - 12:30</strong> (150 Dakika) &bull; Türkiye Ligine Katılım</span>
          </div>
        </div>

        {/* Neden Kilitli? Bilgilendirme 3'lü Kartı - YÜKSEK KONTRAST BEYAZ KARTLAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">Adil &amp; Eşit Sıralama</h4>
            <p className="mt-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Soruların önceden görülüp ezberlenmesini engeller. Tüm öğrenciler soruları aynı anda ilk kez görür.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 mb-3">
              <Trophy className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">Resmi Liderlik Podyumu</h4>
            <p className="mt-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Sınav bitiminde tüm netler hesaplanır ve Pazar akşamı Türkiye geneli ilk 3 derece podyumu açıklanır.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 mb-3">
              <Users className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">1,420+ Eşzamanlı Rakip</h4>
            <p className="mt-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Gerçek LGS atmosferini yaşamak için binlerce 8. sınıf öğrencisiyle aynı dakikalarda sınavda olursun.
            </p>
          </div>
        </div>

        {/* Sınav Saatini Beklerken Ne Yapabilirsin? - FERAH VE OKUNAKLI ALAN */}
        <div className="rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/70 p-6 sm:p-8 space-y-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span>Sınav Saatini Beklerken Isınma Turu Yap:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/deneme-coz"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-500 hover:shadow-md transition group dark:border-slate-700 dark:bg-slate-800"
            >
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  Açık Olan 20 Denemeyi Çöz
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                  Matematik, Fen ve Türkçe branş denemeleriyle hız kazan.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition shrink-0 ml-2" />
            </Link>

            <Link
              href="/lgs-konulari"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-500 hover:shadow-md transition group dark:border-slate-700 dark:bg-slate-800"
            >
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  57 Konu Özetini &amp; Formülleri Oku
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                  MEB sınav tuzaklarını ve formülleri tazeleyerek sınava gir.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition shrink-0 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
