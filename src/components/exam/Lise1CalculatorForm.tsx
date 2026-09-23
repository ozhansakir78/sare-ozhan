'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DEFAULT_LISE1_GRADES,
  Lise1CourseGradeInput,
  calculateLise1Term,
  calculateCourseAverage,
} from '@/lib/lise1-calculation';
import {
  Calculator,
  Award,
  BookOpen,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  RotateCcw,
  GraduationCap,
} from 'lucide-react';

export function Lise1CalculatorForm() {
  const [grades, setGrades] = useState<Lise1CourseGradeInput[]>(DEFAULT_LISE1_GRADES);

  const handleScoreChange = (
    index: number,
    field: 'exam1' | 'exam2' | 'performance1' | 'performance2',
    value: string
  ) => {
    setGrades((prev) => {
      const next = [...prev];
      const parsed = value.trim() === '' ? null : Number(value);
      const safeVal =
        parsed === null || isNaN(parsed) ? null : Math.min(100, Math.max(0, parsed));
      next[index] = { ...next[index], [field]: safeVal };
      return next;
    });
  };

  const handleReset = () => {
    setGrades(DEFAULT_LISE1_GRADES);
  };

  const result = useMemo(() => calculateLise1Term(grades), [grades]);

  return (
    <div className="space-y-8">
      {/* Üst Bilgilendirme ve Özet Kartı */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Sol: Başlık ve Açıklama */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>MEB 2026-2027 Yeni Sınıf Geçme & Ortak Yazılı Sistemi</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
              9. Sınıf Yazılı Notu &amp; <span className="text-emerald-400">Takdir/Teşekkür</span> Hesapla
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed sm:text-sm">
              1. Yazılı, 2. Yazılı ve Performans notlarını gir; haftalık ders saati ağırlıklarına göre dönem ortalamanı,
              belge durumunu ve <strong className="text-emerald-300">YKS için OBP katkını</strong> anında hesapla.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>MEB Kuralı: Türk Dili ve Edebiyatı geçme barajı <strong>70 puandır</strong>.</span>
            </div>
          </div>

          {/* Sağ: Canlı Sonuç Kartı */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Dönem Ağırlıklı Ortalaması
              </span>
              <span className="text-3xl font-black text-emerald-400">
                {result.termAverage}
              </span>
            </div>

            {/* Belge Rozeti */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Belge Durumu:</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black shadow-xs ${result.certificateBadgeColor}`}
              >
                {result.certificateLabel}
              </span>
            </div>

            {/* OBP ve YKS Katkısı */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-center">
              <div className="rounded-xl bg-slate-800/60 p-2.5">
                <div className="text-[10px] font-bold text-slate-400">Tahmini 9. Sınıf OBP</div>
                <div className="text-base font-black text-white">{result.estimatedObp} / 500</div>
              </div>
              <div className="rounded-xl bg-emerald-950/40 border border-emerald-800/40 p-2.5">
                <div className="text-[10px] font-bold text-emerald-300">YKS&apos;ye Ek Puan</div>
                <div className="text-base font-black text-emerald-400">+{result.yksAdditionalPoints} Puan</div>
              </div>
            </div>

            {/* Hızlı Aksiyon */}
            <Link
              href="/deneme-coz"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5 text-xs font-bold text-white shadow-md hover:from-emerald-500 hover:to-teal-500 transition"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>MEB 9. Sınıf Ortak Yazılı Provalarını Çöz</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Ders Notları Giriş Tablosu / Grid */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              9. Sınıf Dersleri &amp; Not Girişi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Notları değiştirdikçe dönem ortalaman ve belge durumun otomatik güncellenir.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Varsayılanlara Sıfırla</span>
          </button>
        </div>

        {/* Tablo */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-bold">Ders Adı</th>
                <th className="pb-3 text-center font-bold">Haftalık Saat</th>
                <th className="pb-3 text-center font-bold">1. Yazılı</th>
                <th className="pb-3 text-center font-bold">2. Yazılı</th>
                <th className="pb-3 text-center font-bold">1. Performans</th>
                <th className="pb-3 text-center font-bold">2. Performans</th>
                <th className="pb-3 text-right font-bold">Ders Ortalaması</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {grades.map((item, index) => {
                const avg = calculateCourseAverage(item);
                const isEdebiyat = item.courseKey === 'edebiyat';
                const threshold = isEdebiyat ? 70 : 50;
                const isPassing = avg >= threshold;

                return (
                  <tr key={item.courseKey} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    {/* Ders Adı */}
                    <td className="py-3 pr-2">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {item.courseName}
                      </div>
                      {isEdebiyat && (
                        <span className="inline-block mt-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 px-1.5 py-0.2 text-[10px] font-black border border-rose-500/20">
                          MEB Baraj Dersi (70)
                        </span>
                      )}
                    </td>

                    {/* Haftalık Ders Saati */}
                    <td className="py-3 text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {item.weeklyHours}
                      </span>
                    </td>

                    {/* 1. Yazılı */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.exam1 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'exam1', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* 2. Yazılı */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.exam2 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'exam2', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* 1. Performans */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.performance1 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'performance1', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* 2. Performans */}
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.performance2 ?? ''}
                        onChange={(e) => handleScoreChange(index, 'performance2', e.target.value)}
                        placeholder="—"
                        className="w-16 rounded-xl border border-slate-300 bg-white py-1.5 text-center text-xs font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </td>

                    {/* Ortalama */}
                    <td className="py-3 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span
                          className={`text-sm font-black ${
                            isPassing
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {avg}
                        </span>
                        {isPassing ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <span title={`Baraj altı: < ${threshold}`}>
                            <AlertTriangle className="h-4 w-4 text-rose-500" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
