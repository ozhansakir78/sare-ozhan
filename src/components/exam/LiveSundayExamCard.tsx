'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getWeeklySundayInfo } from '@/lib/weekly-live-exam';
import { Trophy, Clock, Sparkles, Users, ArrowRight, ShieldCheck, Radio } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function getNextSunday10AM(): { targetDate: Date; isCurrentlyLive: boolean } {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Eğer bugün Pazar ise ve saat 10:00 ile 12:30 arasındaysa CANLI MOD
  if (dayOfWeek === 0) {
    if (currentHour === 10 || currentHour === 11 || (currentHour === 12 && currentMinute <= 30)) {
      return { targetDate: now, isCurrentlyLive: true };
    }
  }

  // Sıradaki Pazar gününü bul
  const daysUntilSunday = (7 - dayOfWeek) % 7 === 0 && (currentHour > 12 || (currentHour === 12 && currentMinute > 30))
    ? 7
    : (7 - dayOfWeek) % 7;

  const target = new Date(now);
  target.setDate(now.getDate() + (daysUntilSunday === 0 && (currentHour >= 13) ? 7 : daysUntilSunday));
  target.setHours(10, 0, 0, 0);

  return { targetDate: target, isCurrentlyLive: false };
}

export function LiveSundayExamCard() {
  const [sundayInfo, setSundayInfo] = useState(() => getWeeklySundayInfo());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    setSundayInfo(getWeeklySundayInfo());
    const updateCountdown = () => {
      const { targetDate, isCurrentlyLive } = getNextSunday10AM();
      if (isCurrentlyLive) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 sm:p-8 text-white shadow-xl">
      {/* Arka Plan Efektleri */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Sol Alan: Başlık & Bilgiler */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-bold text-indigo-200">
            {timeLeft.isLive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-rose-300">🔴 CANLI YAYINDA</span>
              </>
            ) : (
              <>
                <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Geleneksel Her Pazar Canlı Etkinlik</span>
              </>
            )}
            <span className="text-indigo-400">&bull;</span>
            <span>2027 LGS Türkiye Ligi</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            {timeLeft.isLive
              ? `${sundayInfo.dateStr} — Türkiye Geneli Canlı LGS Denemesi Başladı!`
              : `${sundayInfo.dateStr} Pazar 10:00 — Türkiye Geneli Canlı LGS Denemesi`}
          </h2>

          <p className="text-xs sm:text-sm text-indigo-200/80 leading-relaxed">
            {timeLeft.isLive
              ? 'Şu anda binlerce öğrenciyle eşzamanlı sınavdasın. Hemen başla, süren işliyor!'
              : 'Her Pazar saat 10:00’da tüm Türkiye ile eşzamanlı başla, gerçek LGS provası yap ve sınav bitince Liderlik Kürsüsü’ndeki yerini al!'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-indigo-200/70 font-semibold">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              1,420+ Eşzamanlı Katılımcı
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              Resmi Liderlik Sıralaması
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              MEB Müfredatı ve Yeni Nesil Sorular
            </span>
          </div>
        </div>

        {/* Sağ Alan: Geri Sayım Kutuları ve Katıl Butonu */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          {timeLeft.isLive ? (
            <div className="rounded-2xl bg-rose-500/20 border border-rose-500/40 p-4 text-center w-full sm:w-auto">
              <span className="block text-xs font-bold text-rose-300">Sınav Süresi Devam Ediyor</span>
              <span className="block text-2xl font-black text-white mt-1">10:00 - 12:30</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Gün */}
              <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 min-w-[54px] text-center border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white">{timeLeft.days}</span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Gün</span>
              </div>
              <span className="text-xl font-bold text-indigo-400">:</span>
              {/* Saat */}
              <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 min-w-[54px] text-center border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Saat</span>
              </div>
              <span className="text-xl font-bold text-indigo-400">:</span>
              {/* Dakika */}
              <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 min-w-[54px] text-center border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Dk</span>
              </div>
              <span className="text-xl font-bold text-indigo-400">:</span>
              {/* Saniye */}
              <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 min-w-[54px] text-center border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-amber-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Sn</span>
              </div>
            </div>
          )}

          {/* Buton */}
          <Link
            href="/deneme-coz/lgs-canli-pazar-denemesi"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-black shadow-lg transition cursor-pointer ${
              timeLeft.isLive
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-rose-500/25 hover:from-rose-600 hover:to-amber-600'
                : 'bg-white text-indigo-950 shadow-white/10 hover:bg-indigo-50'
            }`}
          >
            <span>{timeLeft.isLive ? 'Canlı Sınava Katıl' : 'Denemeyi Şimdi İncele / Çöz'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
