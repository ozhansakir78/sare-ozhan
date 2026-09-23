'use client';

import React from 'react';
import Link from 'next/link';
import { useGradeTier } from '@/lib/grade-tier';
import { ExamCatalogGrid } from '@/components/exam-session/ExamCatalogGrid';
import { LiveSundayExamCard } from '@/components/exam/LiveSundayExamCard';
import { DailyQuestCard } from '@/components/quest/DailyQuestCard';
import { CustomExamBanner } from '@/components/exam/CustomExamBanner';
import type { OnlineExam } from '@/types/online-exam';
import {
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  School,
  FileCheck2,
  AlertTriangle,
  GraduationCap,
  Calculator,
} from 'lucide-react';

interface DenemeCozTierContainerProps {
  exams: OnlineExam[];
}

export function DenemeCozTierContainer({ exams }: DenemeCozTierContainerProps) {
  const { isLise1 } = useGradeTier();

  if (isLise1) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
        {/* 9. Sınıf (Lise 1) Hero Banner */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
            <School className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>MEB 2026-2027 9. Sınıf (Lise 1) Sınav Merkezi</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            9. Sınıf MEB Ortak Yazılı Provaları &amp;{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              TYT Denemeleri
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            MEB ortak yazılı senaryolarına tam uyumlu 1. ve 2. dönem prova sınavlarını ve TYT tarama denemelerini süre tutarak çözün. Anında net, 100 üzerinden yazılı notu ve Sokratik AI çözümleri.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/lise1-konulari"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition"
            >
              <BookOpen className="h-4 w-4" />
              <span>9. Sınıf Konu &amp; Yazılı Rehberi</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              <Calculator className="h-4 w-4 text-emerald-500" />
              <span>Yazılı Notu &amp; Takdir/Teşekkür Hesapla</span>
            </Link>
          </div>
        </section>

        {/* Eksik Konuya Özel Yapay Zekâ Destekli Pekiştirme Testi Oluşturucu */}
        <CustomExamBanner />

        {/* 9. Sınıf MEB Yazılı Bilgilendirme ve Başarı Kartı */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-5 sm:p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  MEB Ortak Yazılı Senaryoları
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Yeni müfredat açık uçlu ve çoktan seçmeli standartları
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              MEB ortak sınavlarında ezber yerine kavramsal kavrama ve soru çözüm adımları puanlandırılır. Çözdüğünüz her provada pedagojik puanlama anahtarını inceleyebilirsiniz.
            </p>
          </div>

          <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent p-5 sm:p-6 dark:border-rose-900/50 dark:bg-rose-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-sm">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Edebiyat 70 Barajı &amp; OBP Önemi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Yeni yönetmelik sınıf geçme ve belge şartı
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Türk Dili ve Edebiyatı notu 70&apos;in altında olan öğrenciler doğrudan sınıf geçemez ve belge alamaz. 9. sınıf yıl sonu puanı OBP&apos;ye %25 katkı sağlar.
            </p>
          </div>
        </section>

        {/* 9. Sınıf Özellik Şeritleri */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">
                40 Dakika Ders Saati Modu
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Okul yazılı süresine birebir uyumlu prova
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">
                100 Üzerinden Puanlama
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Edebiyat 70 barajı ve Takdir/Teşekkür analizi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">
                YKS (TYT) Temel Atma
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                5 seçenekli soru yapısı ve Sokratik ipuçları
              </p>
            </div>
          </div>
        </div>

        {/* Denemeler Listesi & Filtre */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
              Yayındaki 9. Sınıf MEB Ortak Yazılı &amp; TYT Denemeleri
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              1. Dönem ve 2. Dönem MEB ortak yazılı senaryo provaları ile TYT tarama sınavlarından dilediğini seçip çözmeye başlayabilirsin.
            </p>
          </div>

          <ExamCatalogGrid initialExams={exams} />
        </section>

        {/* Deneme Sonrası Yanlış Defteri Çağrısı */}
        <section className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-200 backdrop-blur-sm">
                <Award className="h-3.5 w-3.5" />
                9. Sınıf Yazılı Başarısı
              </span>
              <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                Yazılı provasında yapamadığın soruları Yanlış Defteri&apos;ne aktar
              </h3>
              <p className="max-w-xl text-xs text-emerald-100/80 sm:text-sm">
                Sınav bittiğinde &quot;Yanlış Defterime Aktar&quot; butonuna basarak tüm eksiklerini topla, okul yazılı sınavından önce tek tıkla pekiştirme testi çözerek 100 tam puanı hedefle.
              </p>
            </div>

            <Link
              href="/yanlis-defteri"
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-black text-emerald-950 shadow-md transition hover:bg-emerald-50 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-emerald-700" />
              <span>Yanlış Defterime Git</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Varsayılan: 8. Sınıf (LGS) Deneyimi
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
      {/* Hero Banner */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>2027 LGS Yeni Nesil Deneme Motoru</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          Online LGS Denemeleri Çöz &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
            Eksiklerini Kapat
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Süre tutarak gerçek sınav atmosferinde denemeni çöz. Sınav bittiğinde yanlış ve boş soruların{' '}
          <strong>otomatik olarak Yanlış Defteri&apos;ne eklensin</strong> ve Sokratik AI koçla adım adım çözülsün.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/meb-cikmis-sorular"
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800/60 transition"
          >
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            <span>2018–2024 MEB Çıkmış Sorular Arşivi</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Eksik Konuya Özel Yapay Zekâ Destekli Pekiştirme Testi Oluşturucu */}
      <CustomExamBanner />

      {/* Günün Yeni Nesil LGS Meydan Okuması (Daily Quest) */}
      <DailyQuestCard />

      {/* Her Pazar Canlı Türkiye Geneli LGS Denemesi Geri Sayım Kartı */}
      <LiveSundayExamCard />

      {/* Özellik Şeritleri */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">
              Canlı LGS Sayaç Modu
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Gerçek sınav süresine göre zaman yönetimi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">
              3 Yanlış 1 Doğruyu Götürür
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Resmi MEB katsayılarıyla anında net hesabı
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">
              Sokratik AI Entegrasyonu
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Yanlış sorulara adım adım ipuçlarıyla çözüm
            </p>
          </div>
        </div>
      </div>

      {/* Denemeler Listesi & Filtre */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
            Yayındaki LGS Deneme Sınavları
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            MEB resmi örnek soruları ve branş denemelerinden dilediğini seçerek hemen çözmeye başlayabilirsin.
          </p>
        </div>

        <ExamCatalogGrid initialExams={exams} />
      </section>

      {/* Deneme Sonrası Yanlış Defteri Çağrısı */}
      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/30 px-3 py-1 text-[11px] font-bold text-indigo-200 backdrop-blur-sm">
              <Award className="h-3.5 w-3.5" />
              Kişiselleştirilmiş Öğrenme
            </span>
            <h3 className="text-xl font-black tracking-tight sm:text-2xl">
              Denemede yapamadığın soruları Yanlış Defteri&apos;nde biriktir
            </h3>
            <p className="max-w-xl text-xs text-indigo-100/80 sm:text-sm">
              Sınav bittiğinde &quot;Yanlış Defterime Aktar&quot; butonuna basarak tüm eksiklerini tek bir yerde toplayabilir, haftalık veli raporuna yansıtabilirsin.
            </p>
          </div>

          <Link
            href="/yanlis-defteri"
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-black text-indigo-900 shadow-md transition hover:bg-indigo-50 cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>Yanlış Defterime Git</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
