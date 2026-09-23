'use client';

import React from 'react';
import type { OnlineExam } from '@/types/online-exam';
import Link from 'next/link';
import {
  Clock,
  HelpCircle,
  BarChart,
  ArrowRight,
  Sparkles,
  BookOpen,
  Atom,
  Calculator,
  Printer,
  Lock,
  Trash2,
} from 'lucide-react';
import { getWeeklySundayInfo } from '@/lib/weekly-live-exam';

interface ExamCardProps {
  exam: OnlineExam;
  onDelete?: (examId: string) => void;
}

export function ExamCard({ exam, onDelete }: ExamCardProps) {
  const getCourseIcon = (courseKey?: string) => {
    switch (courseKey) {
      case 'matematik':
        return <Calculator className="h-4 w-4" />;
      case 'turkce':
      case 'edebiyat':
        return <BookOpen className="h-4 w-4" />;
      case 'fen':
      case 'fizik':
      case 'kimya':
      case 'biyoloji':
        return <Atom className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const isWeeklyLive = exam.slug === 'lgs-canli-pazar-denemesi';
  const isLiveNow = isWeeklyLive ? getWeeklySundayInfo().isLiveNow : false;
  const isLocked = isWeeklyLive && !isLiveNow;
  const isMebChallenge = exam.slug.startsWith('lgs-haftalik-') || Boolean(exam.badgeText?.includes('MEB'));
  const isCustom = exam.isCustomGenerated || exam.id.startsWith('custom-ai') || exam.slug.startsWith('ozel-test');

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl border p-6 shadow-sm transition-all ${
        isLocked
          ? 'border-amber-300/90 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 dark:border-amber-800/60 dark:from-slate-900 dark:to-amber-950/20 hover:border-amber-400'
          : isCustom
          ? 'border-purple-300/80 bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/30 dark:border-purple-900/60 dark:from-slate-900 dark:to-purple-950/20 hover:border-purple-400'
          : isMebChallenge
          ? 'border-amber-200 bg-gradient-to-br from-amber-50/30 via-white to-indigo-50/20 hover:border-indigo-400 hover:shadow-md dark:border-amber-900/40 dark:from-slate-900 dark:to-slate-850'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700/60'
      }`}
    >
      <div>
        {/* Üst Rozetler */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            {getCourseIcon(exam.courseKey)}
            {exam.courseName || (exam.tier === 'lise1' ? '9. Sınıf' : 'Genel LGS')}
          </span>

          <div className="flex items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-black tracking-wider ${
                isLocked
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1'
                  : isCustom
                  ? 'bg-purple-100 text-purple-900 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
                  : isMebChallenge
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {isLocked && <Lock className="h-3 w-3" />}
              {isLocked
                ? 'PAZAR 10:00 KİLİTLİ'
                : isCustom
                ? '✨ ÖZEL TESTİN'
                : isMebChallenge
                ? '📅 MEB MEYDAN OKUMA'
                : exam.badgeText || 'ÜCRETSİZ'}
            </span>

            {isCustom && onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(exam.id);
                }}
                title="Özel Testi Sil"
                className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <h3 className="mt-4 text-base font-black tracking-tight text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-lg">
          {exam.title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
          {exam.description}
        </p>

        {/* Bilgi Rozetleri */}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
            <span>{exam.questionCount} Soru</span>
          </div>

          <span className="text-slate-300 dark:text-slate-700">&bull;</span>

          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{exam.durationMinutes} Dakika</span>
          </div>

          <span className="text-slate-300 dark:text-slate-700">&bull;</span>

          <div className="flex items-center gap-1">
            <BarChart className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {exam.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Aksiyon Butonları */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <Link
          href={`/deneme-coz/${exam.slug}`}
          className={`flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold text-white shadow-xs transition ${
            isLocked
              ? 'bg-amber-600 hover:bg-amber-700'
              : 'bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600'
          }`}
        >
          {isLocked && <Lock className="h-3.5 w-3.5" />}
          <span>{isLocked ? 'Pazar 10:00 Bekleme Salonu' : 'Denemeyi Çöz'}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        {!isLocked && (
          <Link
            href={`/deneme-coz/${exam.slug}/yazdir`}
            target="_blank"
            title="MEB Kitapçığı & Optik Form Yazdır / PDF İndir"
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">PDF</span>
          </Link>
        )}
      </div>
    </div>
  );
}
