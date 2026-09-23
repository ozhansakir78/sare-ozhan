'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  BookOpen,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  Zap,
} from 'lucide-react';

function OdemeBasariliContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'season';
  const planName =
    planId === 'season' ? '2027 LGS Tam Sezon Paketi' : 'Aylık Standart Plan';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <div className="w-full max-w-lg text-center">
        {/* Başarı İkonu */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-xl shadow-emerald-500/20 dark:bg-emerald-950/80 dark:text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Ödeme Başarıyla Tamamlandı</span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          SınavKoçu PRO&apos;ya Hoş Geldin! 🎉
        </h1>

        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
          <strong>{planName}</strong> üyeliğin başarıyla aktifleştirildi. Artık LGS hazırlığında hiçbir sınırın yok!
        </p>

        {/* Aktif Edilen Avantajlar */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Hesabına Tanımlanan Haklar
          </h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <Zap className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Sınırsız Sokratik AI Soru Çözümü
                </h4>
                <p className="text-[11px] text-slate-500">Günlük 3 soru sınırı tamamen kaldırıldı.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Deneme Trend Takibi &amp; İlerleme Grafiği
                </h4>
                <p className="text-[11px] text-slate-500">Tüm denemelerin ve puan değişimlerin kayıt altında.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Haftalık Veli WhatsApp Raporu
                </h4>
                <p className="text-[11px] text-slate-500">Hangi konularda eksik kapattığın veline otomatik sunulur.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Eylem Butonları */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/yanlis-defteri"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700"
          >
            <BookOpen className="h-4 w-4" />
            <span>Yanlış Defterine Git</span>
          </Link>

          <Link
            href="/deneme-gecmisi"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Deneme Geçmişini Gör</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OdemeBasariliPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Yükleniyor...</div>}>
      <OdemeBasariliContent />
    </Suspense>
  );
}
