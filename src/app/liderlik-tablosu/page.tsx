import React from 'react';
import type { Metadata } from 'next';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { Trophy, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Türkiye Geneli LGS Liderlik Sıralaması | SınavKoçu.ai',
  description: '2027 LGS denemelerinde en yüksek puan ve net yapan öğrencilerin Türkiye geneli haftalık ve genel liderlik tablosu.',
};

export default function LeaderboardPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Başlık ve İstatistik Şeridi */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-3">
            <Trophy className="h-3.5 w-3.5 text-amber-600" />
            <span>2027 LGS Türkiye Ligi</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            Türkiye Geneli Liderlik Tablosu
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Denemeleri çöz, takma adınla listeye gir ve Türkiye genelindeki rakiplerin arasındaki yerini gör!
          </p>
        </div>

        {/* 3'lü Özet Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 dark:text-white">1,420+</span>
              <span className="block text-xs text-slate-400">Toplam Katılımcı</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 dark:text-white">494.3 Puan</span>
              <span className="block text-xs text-slate-400">Haftanın En Yüksek Skoru</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400">Sen de Katıl</span>
              <span className="block text-sm font-black text-slate-900 dark:text-white">Deneme Çöz &amp; Listeye Gir</span>
            </div>
            <Link
              href="/deneme-coz"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Sıralama Tablosu Bileşeni */}
        <LeaderboardTable />
      </div>
    </div>
  );
}
