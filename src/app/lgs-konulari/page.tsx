import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import { LgsCountdown } from '@/components/seo/LgsCountdown';
import { LGS_TOPICS_BY_COURSE, LGS_COURSE_OPTIONS } from '@/lib/lgs-topics';
import {
  BookOpen,
  GraduationCap,
  Calculator,
  FlaskConical,
  Globe2,
  Landmark,
  BookHeart,
  Languages,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TopicStudyGrid } from '@/components/study/TopicStudyGrid';

export const metadata: Metadata = {
  title: 'LGS Konuları 2027 — Tüm Dersler ve Alt Konular',
  description:
    '2027 LGS müfredatındaki 6 dersin tüm konuları: Türkçe, Matematik, Fen Bilimleri, İnkılap Tarihi, Din Kültürü ve İngilizce. Konu bazlı çalışma rehberi.',
  alternates: {
    canonical: '/lgs-konulari',
  },
  openGraph: {
    title: 'LGS Konuları 2027 — Tüm Dersler ve Alt Konular',
    description:
      '2027 LGS müfredatındaki 6 dersin tüm konuları. Konu bazlı çalışma rehberi ve net hesaplama aracı.',
    url: '/lgs-konulari',
  },
};

// Ders anahtarına göre ikon döndüren yardımcı
function getCourseIcon(courseKey: string) {
  const iconClass = 'h-5 w-5';
  switch (courseKey) {
    case 'turkce':
      return <BookOpen className={iconClass} />;
    case 'matematik':
      return <Calculator className={iconClass} />;
    case 'fen':
      return <FlaskConical className={iconClass} />;
    case 'inkilap':
      return <Landmark className={iconClass} />;
    case 'din':
      return <BookHeart className={iconClass} />;
    case 'ingilizce':
      return <Languages className={iconClass} />;
    default:
      return <BookOpen className={iconClass} />;
  }
}

// Ders anahtarına göre renk teması döndüren yardımcı
function getCourseColors(courseKey: string): {
  bg: string;
  border: string;
  icon: string;
  badge: string;
  topicBg: string;
} {
  switch (courseKey) {
    case 'turkce':
      return {
        bg: 'bg-rose-50/50 dark:bg-rose-950/20',
        border: 'border-rose-200 dark:border-rose-900/50',
        icon: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
        topicBg: 'bg-rose-50 dark:bg-rose-950/30',
      };
    case 'matematik':
      return {
        bg: 'bg-blue-50/50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-900/50',
        icon: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
        topicBg: 'bg-blue-50 dark:bg-blue-950/30',
      };
    case 'fen':
      return {
        bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
        border: 'border-emerald-200 dark:border-emerald-900/50',
        icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
        topicBg: 'bg-emerald-50 dark:bg-emerald-950/30',
      };
    case 'inkilap':
      return {
        bg: 'bg-amber-50/50 dark:bg-amber-950/20',
        border: 'border-amber-200 dark:border-amber-900/50',
        icon: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
        topicBg: 'bg-amber-50 dark:bg-amber-950/30',
      };
    case 'din':
      return {
        bg: 'bg-violet-50/50 dark:bg-violet-950/20',
        border: 'border-violet-200 dark:border-violet-900/50',
        icon: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400',
        badge: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
        topicBg: 'bg-violet-50 dark:bg-violet-950/30',
      };
    case 'ingilizce':
      return {
        bg: 'bg-cyan-50/50 dark:bg-cyan-950/20',
        border: 'border-cyan-200 dark:border-cyan-900/50',
        icon: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400',
        badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
        topicBg: 'bg-cyan-50 dark:bg-cyan-950/30',
      };
    default:
      return {
        bg: 'bg-slate-50/50 dark:bg-slate-950/20',
        border: 'border-slate-200 dark:border-slate-800',
        icon: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
        topicBg: 'bg-slate-50 dark:bg-slate-800/30',
      };
  }
}

// Ders soru sayısı ve katsayıları
const COURSE_META: Record<string, { questions: number; weight: number }> = {
  turkce: { questions: 20, weight: 4 },
  matematik: { questions: 20, weight: 4 },
  fen: { questions: 20, weight: 4 },
  inkilap: { questions: 10, weight: 1 },
  din: { questions: 10, weight: 1 },
  ingilizce: { questions: 10, weight: 1 },
};

export default function LgsKonulariPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 py-8">
          {/* Hero */}
          <section className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/70 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>2027 LGS Müfredatı Güncel</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              LGS Konuları 2027{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Tüm Dersler
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              8. sınıf LGS müfredatında yer alan 6 dersin tüm alt konularını inceleyin.
              Toplam 90 soruluk sınavda hangi derste kaç soru sorulduğunu ve ağırlık katsayılarını öğrenin.
            </p>
          </section>

          {/* Geri Sayım */}
          <div className="mx-auto max-w-xl">
            <LgsCountdown variant="full" />
          </div>

          {/* Genel Bilgi Kartları */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Toplam Soru
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                90
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                6 alt testten oluşur
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sınav Süresi
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                155 dk
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                2 oturum (75 dk + 80 dk)
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Puan Aralığı
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                100 — 500
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                MEB Standart Puanı (MSP)
              </p>
            </div>
          </section>

          {/* İnteraktif Konu ve Hap Notlar Modülü */}
          <section className="space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                  Ders Konuları &amp; Hap Bilgiler
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Herhangi bir konuya tıklayarak <strong>hap kuralları, formülleri ve MEB tuzaklarını</strong> inceleyebilirsin.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 self-start sm:self-auto">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>İnteraktif Çalışma Kartları</span>
              </span>
            </div>

            <TopicStudyGrid />
          </section>

          {/* CTA Bölümleri */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LGS Puan Hesaplama CTA */}
            <Link
              href="/"
              className="group flex items-center justify-between rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-indigo-900/50 dark:bg-slate-900 sm:p-6"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                  LGS Puan Hesaplama Aracı
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Deneme sonuçlarını gir, tahmini LGS puanını ve yüzdelik dilimini anında öğren.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-indigo-600 transition group-hover:translate-x-1 dark:text-indigo-400" />
            </Link>

            {/* Yanlış Defteri CTA */}
            <Link
              href="/yanlis-defteri"
              className="group flex items-center justify-between rounded-2xl border border-violet-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-violet-900/50 dark:bg-slate-900 sm:p-6"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                    AI ile Yanlış Analizi
                  </h3>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Yapamadığın soruların fotoğrafını yükle, Sokratik AI koç ile adım adım çöz.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 transition group-hover:translate-x-1 dark:text-violet-400" />
            </Link>
          </section>

          {/* SSS / Bilgilendirme */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Sıkça Sorulan Sorular
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  LGS&apos;de kaç soru sorulur?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  LGS sınavında toplam 90 soru sorulur. Birinci oturumda Türkçe (20), T.C. İnkılap Tarihi ve Atatürkçülük (10),
                  Din Kültürü ve Ahlak Bilgisi (10) ve Yabancı Dil (10) olmak üzere 50 soru; ikinci oturumda Matematik (20) ve
                  Fen Bilimleri (20) olmak üzere 40 soru yer alır.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  LGS&apos;de 3 yanlış 1 doğruyu götürür mü?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Evet. Her alt testte (derste) yapılan her 3 yanlış cevap, o derse ait 1 doğru cevabı eksiltir.
                  Net hesaplama formülü: Net = Doğru − (Yanlış ÷ 3). Boş bırakılan sorular net hesabını etkilemez.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  LGS ders ağırlık katsayıları nelerdir?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Türkçe, Matematik ve Fen Bilimleri derslerinin ağırlık katsayısı <strong>4</strong>&apos;tür.
                  T.C. İnkılap Tarihi, Din Kültürü ve İngilizce derslerinin katsayısı ise <strong>1</strong>&apos;dir.
                  Bu nedenle Matematik, Türkçe ve Fen derslerindeki her net diğer derslere göre 4 kat daha değerlidir.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  2027 LGS sınavı ne zaman?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  2027 LGS sınavının tahmini tarihi Haziran 2027&apos;nin ilk hafta sonudur (6 Haziran 2027).
                  Kesin tarih MEB tarafından ilan edilecektir. Geri sayım sayacımızdan takip edebilirsiniz.
                </p>
              </div>
            </div>
          </section>
    </div>
  );
}
