'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LgsCourseKey } from '@/types/exam';
import {
  getAllPastQuestions,
  getYearsList,
  getPastQuestionsFiltered,
  PastQuestionSource,
} from '@/lib/meb-past-questions';
import { PastQuestionCard } from '@/components/meb/PastQuestionCard';
import { AuthGuard } from '@/components/auth/AuthGuard';
import {
  FileText,
  Search,
  BookOpen,
  Filter,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function MebCikmisSorularPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<LgsCourseKey | 'all'>('all');
  const [selectedSource, setSelectedSource] = useState<PastQuestionSource | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const years = getYearsList();

  const courses: { key: LgsCourseKey | 'all'; label: string }[] = [
    { key: 'all', label: 'Tüm Dersler' },
    { key: 'matematik', label: 'Matematik' },
    { key: 'fen', label: 'Fen Bilimleri' },
    { key: 'turkce', label: 'Türkçe' },
    { key: 'inkilap', label: 'T.C. İnkılap' },
  ];

  const filteredQuestions = getPastQuestionsFiltered(
    selectedYear,
    selectedCourse,
    selectedSource,
    searchQuery
  );

  return (
    <AuthGuard
      title="MEB Çıkmış Soruları İncelemek İçin Giriş Yapmalısınız"
      description="2018–2024 yılları arasındaki resmi LGS sorularını, çeldirici analizlerini ve Sokratik ipuçlarını incelemek için lütfen hesabınıza giriş yapın."
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 py-8 sm:py-12">
      {/* Hero Başlık */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
          <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>Resmi MEB Çıkmış Sınav Soruları Arşivi (2018–2024)</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          LGS Çıkmış Sorular &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
            MEB Örnek Soruları
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Geçmiş yıllarda MEB&apos;in sorduğu gerçek LGS sorularını süre tutarak veya soru soru çöz. Resmi çözüm adımlarını, çeldirici tuzakları ve Sokratik ipuçlarını incele.
        </p>
      </section>

      {/* Arama & Filtreleme Çubuğu */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        {/* Arama Inputu */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Konu, kural veya soru metni ara (örn: Kareköklü, Sıvı Basıncı, EBOB, Fiilimsiler)..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Yıl Filtresi */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="font-bold text-slate-400 text-[11px] shrink-0 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Yıl:
          </span>
          <button
            type="button"
            onClick={() => setSelectedYear('all')}
            className={`rounded-xl px-3 py-1 font-bold transition cursor-pointer shrink-0 ${
              selectedYear === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Tüm Yıllar
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setSelectedYear(y)}
              className={`rounded-xl px-3 py-1 font-bold transition cursor-pointer shrink-0 ${
                selectedYear === y
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {y} LGS
            </button>
          ))}
        </div>

        {/* Ders Filtresi */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
          <span className="font-bold text-slate-400 text-[11px] shrink-0 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Ders:
          </span>
          {courses.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCourse(c.key)}
              className={`rounded-xl px-3 py-1 font-bold transition cursor-pointer shrink-0 ${
                selectedCourse === c.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Soru Listesi Sayacı & Başlığı */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
        <span>{filteredQuestions.length} Çıkmış Soru Bulundu</span>
        <Link
          href="/deneme-coz"
          className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <span>Süreli Denemelere Dön</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Soru Kartları Grid/Stack */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <BookOpen className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Seçtiğiniz kriterlere uygun çıkmış soru bulunamadı.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedYear('all');
                setSelectedCourse('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <PastQuestionCard key={question.id} question={question} />
          ))
        )}
      </div>
    </div>
    </AuthGuard>
  );
}
