'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  YKS_TOP_UNIVERSITIES,
  YksUniversityTarget,
  analyzeUniversityTargetGap,
} from '@/lib/yks-universities';
import {
  GraduationCap,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  BookOpen,
  School,
  ArrowRight,
} from 'lucide-react';

interface UniversityRadarCardProps {
  currentTermAverage?: number;
}

export function UniversityRadarCard({ currentTermAverage = 88.5 }: UniversityRadarCardProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('boun-ceng');

  const selectedTarget =
    YKS_TOP_UNIVERSITIES.find((u) => u.id === selectedTargetId) || YKS_TOP_UNIVERSITIES[0];

  const gapAnalysis = analyzeUniversityTargetGap(selectedTarget.id, currentTermAverage);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>9. Sınıftan YKS Temel Atma Vizyonu</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-500" />
            <span>Hedef Üniversite &amp; Bölüm Radarı</span>
          </h3>
        </div>

        {/* Seçici Açılır Menü */}
        <div className="flex items-center gap-2">
          <label htmlFor="uni-select" className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Hedef Seç:
          </label>
          <select
            id="uni-select"
            value={selectedTargetId}
            onChange={(e) => setSelectedTargetId(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {YKS_TOP_UNIVERSITIES.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name} — {uni.department.split('(')[0].trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Seçili Üniversite Detay Kartı */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 p-5 dark:border-indigo-950 dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="rounded-md bg-indigo-600 text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              {selectedTarget.badge}
            </span>
            <h4 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
              {selectedTarget.name}
            </h4>
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {selectedTarget.department} &bull; {selectedTarget.city} ({selectedTarget.scoreType})
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Tahmini Başarı Sırası</span>
            <div className="text-base font-black text-slate-900 dark:text-white">
              İlk {selectedTarget.minRank.toLocaleString('tr-TR')}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {selectedTarget.description}
        </p>

        {/* 9. Sınıf OBP & Net İhtiyacı Karşılaştırma Göstergesi */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
          {/* İdeal Diploma Notu */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80 text-center">
            <span className="text-[10px] font-bold text-slate-400">Hedef Lise Not Ortalaması</span>
            <div className="text-lg font-black text-slate-900 dark:text-white">
              {selectedTarget.targetObp} / 100
            </div>
            <span className="text-[10px] text-slate-500">9. sınıf OBP&apos;nin %25&apos;idir</span>
          </div>

          {/* Öğrencinin Mevcut Durumu */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80 text-center">
            <span className="text-[10px] font-bold text-slate-400">Senin Dönem Notun</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {currentTermAverage} / 100
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold">
              {currentTermAverage >= selectedTarget.targetObp
                ? 'Hedef Bandındasın 🎯'
                : `${(selectedTarget.targetObp - currentTermAverage).toFixed(1)} puan fark var`}
            </span>
          </div>

          {/* İdeal TYT Net */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/80 text-center">
            <span className="text-[10px] font-bold text-slate-400">Hedeflenen TYT Neti</span>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {selectedTarget.idealTytNet} Net / 120
            </div>
            <span className="text-[10px] text-slate-500">9. sınıfta temel atarak başla</span>
          </div>
        </div>

        {/* Durum Mesajı */}
        {gapAnalysis && (
          <div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-700 dark:bg-slate-800/90 dark:text-slate-300 flex items-center justify-between">
            <span>💡 <strong>Koç Tavsiyesi:</strong> {gapAnalysis.statusMessage}</span>
            <Link
              href="/lise1-konulari"
              className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 shrink-0 ml-2"
            >
              <span>Konuları İncele</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
