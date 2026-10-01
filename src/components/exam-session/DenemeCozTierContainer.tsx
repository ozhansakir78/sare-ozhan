'use client';

import React from 'react';
import Link from 'next/link';
import { useGradeTier } from '@/lib/grade-tier';
import { ExamCatalogGrid } from '@/components/exam-session/ExamCatalogGrid';
import { LiveSundayExamCard } from '@/components/exam/LiveSundayExamCard';
import { DailyQuestCard } from '@/components/quest/DailyQuestCard';
import { CustomExamBanner } from '@/components/exam/CustomExamBanner';
import { AuthGuard } from '@/components/auth/AuthGuard';
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
  GraduationCap,
  Calculator,
  Compass,
  Trophy,
} from 'lucide-react';

interface DenemeCozTierContainerProps {
  exams: OnlineExam[];
}

export function DenemeCozTierContainer({ exams }: DenemeCozTierContainerProps) {
  const { isLise1, isLise2, isLise3, isYks, isLgs, config } = useGradeTier();

  // 12. Sınıf & YKS (TYT / AYT / YDT) Deneyimi
  if (isYks) {
    return (
      <AuthGuard
        title="YKS Denemelerini Çözmek İçin Giriş Yapmalısınız"
        description="ÖSYM 120 soruluk TYT ve alan AYT denemelerini süre tutarak çözmek, anında Türkiye sıralaması ve YÖK baraj analizini görmek için lütfen ücretsiz üye olun veya giriş yapın."
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
          {/* YKS Hero Banner */}
          <section className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/50 dark:text-rose-300">
              <Trophy className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>ÖSYM 2026-2027 YKS (TYT / AYT / YDT) Sınav Merkezi</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              YKS TYT &amp; AYT Online Deneme Sınavları &amp;{' '}
              <span className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Alan Provaları
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              ÖSYM standartlarında 120 soruluk TYT ve alan bazlı (Sayısal, EA, Sözel, Dil) AYT denemelerini süre tutarak çözün. 4 yanlış 1 doğru kuralı, anında ham/yerleştirme puanı, Türkiye başarı sırası tahmini ve Sokratik AI çözümleri.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-500 transition"
              >
                <Calculator className="h-4 w-4" />
                <span>YKS (TYT/AYT) Puan &amp; Sıralama Hesapla</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
              >
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>YÖK Atlas Hedef Üniversite Radarı</span>
              </Link>
            </div>
          </section>

          {/* Eksik Konuya Özel Yapay Zekâ Destekli Pekiştirme Testi Oluşturucu */}
          <CustomExamBanner />

          {/* YKS Özellik Şeritleri */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white">
                  165 Dk TYT &amp; Turlama Modu
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  ÖSYM süresi ve 22 dk kontrol rezervi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white">
                  4 Yanlış 1 Doğruyu Götürür
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Resmi ÖSYM ham net ve katsayı hesabı
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white">
                  YÖK Başarı Barajları
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tıp, Diş, Hukuk, Müh. baraj uygunluğu
                </p>
              </div>
            </div>
          </div>

          {/* Sınavlar Kataloğu */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                Yayındaki YKS (TYT, AYT, YDT) Denemeleri
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                120 soruluk TYT genel denemeleri ve alan bazlı AYT provalarından dilediğini seçip çözmeye başlayabilirsin.
              </p>
            </div>

            <ExamCatalogGrid initialExams={exams} />
          </section>
        </div>
      </AuthGuard>
    );
  }

  // 11. Sınıf (Lise 3) Deneyimi
  if (isLise3) {
    return (
      <AuthGuard
        title="11. Sınıf Denemelerini Çözmek İçin Giriş Yapmalısınız"
        description="11. Sınıf MEB ortak yazılı prova sınavlarını çözmek, alan başarınızı ölçmek ve 70/30 Erken TYT denemelerini başlatmak için lütfen ücretsiz üye olun veya giriş yapın."
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
          {/* 11. Sınıf Hero Banner */}
          <section className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/50 dark:text-blue-300">
              <School className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>MEB 2026-2027 11. Sınıf Alan &amp; Erken TYT Sınav Merkezi</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              11. Sınıf MEB Yazılı Provaları &amp;{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Alan Denemeleri
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Sayısal, Eşit Ağırlık, Sözel ve Yabancı Dil alan dersleri için MEB 1. ve 2. dönem yazılı sınav provalarını ve 70/30 zaman modelli Erken TYT denemelerini süre tutarak çözün.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/lise3-konulari"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition"
              >
                <BookOpen className="h-4 w-4" />
                <span>11. Sınıf Alan &amp; Erken TYT Rehberi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          <CustomExamBanner />

          {/* Sınavlar Kataloğu */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                Yayındaki 11. Sınıf Yazılı Provaları &amp; Alan Denemeleri
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                İleri Matematik, Fizik, Kimya, Biyoloji, Edebiyat, Tarih, Coğrafya ve Felsefe alan sınavları.
              </p>
            </div>

            <ExamCatalogGrid initialExams={exams} />
          </section>
        </div>
      </AuthGuard>
    );
  }

  // 10. Sınıf (Lise 2) Deneyimi
  if (isLise2) {
    return (
      <AuthGuard
        title="10. Sınıf Yazılı Provalarını Çözmek İçin Giriş Yapmalısınız"
        description="10. Sınıf MEB ortak yazılı prova sınavlarını çözmek, okul başarınızı artırmak ve 11. sınıf alan seçimi simülatörünü kullanmak için lütfen ücretsiz üye olun veya giriş yapın."
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
          {/* 10. Sınıf Hero Banner */}
          <section className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-700 dark:border-purple-800/60 dark:bg-purple-950/50 dark:text-purple-300">
              <Compass className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span>MEB 2026-2027 10. Sınıf Sınav &amp; Alan Seçimi Merkezi</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              10. Sınıf MEB Ortak Yazılı Provaları &amp;{' '}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Alan Hazırlığı
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              10 temel ders için MEB açık uçlu ve çoktan seçmeli ortak yazılı provalarını süre tutarak çözün. 11. sınıf alan seçimi öncesi güçlü akademik temel ve yüksek OBP oluşturun.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/lise2-konulari"
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-purple-500 transition"
              >
                <Compass className="h-4 w-4" />
                <span>10. Sınıf Alan Seçimi (MF/TM/TS/DİL) Radarı</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          <CustomExamBanner />

          {/* Sınavlar Kataloğu */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                Yayındaki 10. Sınıf MEB Ortak Yazılı Provaları
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                10 temel dersin MEB 1. Dönem ve 2. Dönem ortak yazılı senaryolarına tam uyumlu deneme provaları.
              </p>
            </div>

            <ExamCatalogGrid initialExams={exams} />
          </section>
        </div>
      </AuthGuard>
    );
  }

  // 9. Sınıf (Lise 1) Deneyimi
  if (isLise1) {
    return (
      <AuthGuard
        title="MEB Ortak Yazılı Provalarını Çözmek İçin Giriş Yapmalısınız"
        description="9. Sınıf MEB ortak yazılı prova sınavlarını çözmek, 100 üzerinden yazılı notu karnesi almak ve TYT denemelerini başlatmak için lütfen ücretsiz üye olun veya giriş yapın."
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
          {/* 9. Sınıf Hero Banner */}
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

          <CustomExamBanner />

          {/* Sınavlar Kataloğu */}
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
        </div>
      </AuthGuard>
    );
  }

  // Varsayılan: 8. Sınıf (LGS) Deneyimi
  return (
    <AuthGuard
      title="Online Deneme Çözmek İçin Giriş Yapmalısınız"
      description="2027 LGS denemelerini süre tutarak çözmek, anında net ve standart puan karnesi almak ve sorularınızı kaydetmek için lütfen ücretsiz üye olun veya giriş yapın."
    >
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
              <span>MEB Çıkmış Sınav Soruları Arşivi</span>
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
              Genel LGS denemeleri, Sayısal / Sözel branş denemeleri ve ünite bazlı testlerden dilediğini seçip çözmeye başlayabilirsin.
            </p>
          </div>

          <ExamCatalogGrid initialExams={exams} />
        </section>
      </div>
    </AuthGuard>
  );
}
