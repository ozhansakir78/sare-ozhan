'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LISE3_TOPICS_BY_COURSE,
  LISE3_COURSE_OPTIONS,
  Lise3CourseKey,
  getLise3CoursesByTrack,
} from '@/lib/lise3-topics';
import type { HighSchoolTrack } from '@/lib/field-selection';
import {
  BookOpen,
  School,
  Calculator,
  FlaskConical,
  Atom,
  Dna,
  Landmark,
  Globe2,
  Languages,
  BookHeart,
  ArrowRight,
  FileCheck2,
  Search,
  Compass,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react';

function getLise3Icon(key: Lise3CourseKey) {
  const iconClass = 'h-5 w-5';
  switch (key) {
    case 'edebiyat':
      return <BookOpen className={iconClass} />;
    case 'matematik':
      return <Calculator className={iconClass} />;
    case 'fizik':
      return <Atom className={iconClass} />;
    case 'kimya':
      return <FlaskConical className={iconClass} />;
    case 'biyoloji':
      return <Dna className={iconClass} />;
    case 'tarih':
      return <Landmark className={iconClass} />;
    case 'cografya':
      return <Globe2 className={iconClass} />;
    case 'felsefe':
      return <Compass className={iconClass} />;
    case 'ingilizce':
      return <Languages className={iconClass} />;
    case 'din':
      return <BookHeart className={iconClass} />;
    default:
      return <School className={iconClass} />;
  }
}

export default function Lise3KonulariPage() {
  const [selectedTrack, setSelectedTrack] = useState<HighSchoolTrack | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const displayedCourses = selectedTrack === 'all'
    ? LISE3_COURSE_OPTIONS
    : getLise3CoursesByTrack(selectedTrack);

  const filteredCourses = displayedCourses.filter((c) => {
    if (selectedCourse !== 'all' && c.key !== selectedCourse) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8">
      {/* Hero */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Layers className="h-4 w-4" />
          <span>MEB 11. Sınıf (Lise 3) Alanlaşma &amp; ÖSYM YKS (AYT) Temeli</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          11. Sınıf Konuları &amp;{' '}
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">
            Alan Bazlı AYT Rehberi
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          11. sınıf, YKS Alan Yeterlilik Testi&apos;nin (AYT) omurgasını oluşturur. Sayısal (MF), Eşit Ağırlık (TM), Sözel (TS) ve Yabancı Dil (DİL) alanlarına göre ayrılan ileri düzey ders kazanımlarını incele, MEB ortak yazılılarına ve erken AYT provasına hazırlan.
        </p>

        {/* Alan Filtreleme Butonları */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <button
            type="button"
            onClick={() => {
              setSelectedTrack('all');
              setSelectedCourse('all');
            }}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              selectedTrack === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            Tüm Alanlar
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedTrack('sayisal');
              setSelectedCourse('all');
            }}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              selectedTrack === 'sayisal'
                ? 'bg-blue-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            🔬 Sayısal (MF)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedTrack('esit_agirlik');
              setSelectedCourse('all');
            }}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              selectedTrack === 'esit_agirlik'
                ? 'bg-purple-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            ⚖️ Eşit Ağırlık (TM)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedTrack('sozel');
              setSelectedCourse('all');
            }}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              selectedTrack === 'sozel'
                ? 'bg-amber-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            📜 Sözel (TS)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedTrack('dil');
              setSelectedCourse('all');
            }}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              selectedTrack === 'dil'
                ? 'bg-sky-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            🌍 Yabancı Dil (DİL)
          </button>
        </div>
      </section>

      {/* 11. Sınıf Stratejik Göstergeler */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            AYT Soru Kapsamı
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
            %55 - %60 Ağırlık
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            AYT Matematik, Fen ve Edebiyat-Sosyal testlerindeki soruların yarıdan fazlası 11. sınıf müfredatından sorulur.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            MEB Baraj Dersi
          </div>
          <div className="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400">
            Edebiyat (70 Barajı)
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Hangi alanda olursan ol, Türk Dili ve Edebiyatı dersinden doğrudan geçmek için yıl sonu ortalaması en az 70 olmalıdır.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Erken TYT Stratejisi
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            Tekrar &amp; Koruma
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            11. sınıfta alan dersleri derinleşirken haftalık rutinlerle 9 ve 10. sınıf TYT konularını taze tutmak esastır.
          </p>
        </div>
      </section>

      {/* Arama & Ders Filtreleri */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="11. sınıf konusu veya kazanımı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {selectedTrack === 'all'
              ? 'Tüm Alanlar (10 Ders)'
              : `${selectedTrack.toUpperCase()} Alanı (${displayedCourses.length} Ders)`}
          </div>
        </div>

        {/* Ders Seçici Haplar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCourse('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              selectedCourse === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
            }`}
          >
            Tüm Dersler
          </button>

          {displayedCourses.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCourse(c.key)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedCourse === c.key
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              {getLise3Icon(c.key)}
              <span>{c.name.split(' (')[0]}</span>
              {c.isPassingRequirement && (
                <span className="ml-1 rounded-sm bg-rose-500 text-[10px] text-white px-1 py-0.2">
                  Baraj
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Ders ve Konu Listesi */}
      <section className="space-y-6">
        {filteredCourses.map((course) => {
          const allTopics = LISE3_TOPICS_BY_COURSE[course.key] || [];
          const matchingTopics = allTopics.filter((t) =>
            searchQuery.trim() === ''
              ? true
              : t.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (matchingTopics.length === 0) return null;

          return (
            <div
              key={course.key}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Ders Başlığı */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 sm:px-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-2xl p-2.5 ${course.colorTheme.bg} ${course.colorTheme.text} border ${course.colorTheme.border}`}
                  >
                    {getLise3Icon(course.key)}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{course.name}</span>
                      {course.isPassingRequirement && (
                        <span className="rounded-md bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5">
                          MEB BARAJ DERSİ (70)
                        </span>
                      )}
                    </h2>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Haftalık {course.weeklyHours} Saat | {course.modelName}
                    </div>
                  </div>
                </div>

                <Link
                  href="/deneme-coz"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                >
                  <FileCheck2 className="h-3.5 w-3.5 text-amber-500" />
                  <span>11. Sınıf Yazılı Provasını Çöz</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Konu Satırları */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {matchingTopics.map((topicName, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-4 sm:px-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {topicName}
                        </div>
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                          ÖSYM AYT &amp; MEB Ortak Yazılı Kazanımı
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/deneme-coz"
                      className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40 transition"
                    >
                      Soru Çöz
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
