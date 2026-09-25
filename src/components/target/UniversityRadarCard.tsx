'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  YKS_TOP_UNIVERSITIES,
  YksUniversityTarget,
  analyzeUniversityTargetGap,
} from '@/lib/yks-universities';
import { useAuth } from '@/components/auth/AuthProvider';
import { getStoredLise1TermAverage } from '@/lib/lise1-grade-storage';
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
  Calculator,
} from 'lucide-react';

interface UniversityRadarCardProps {
  currentTermAverage?: number | null;
  selectedTargetUni?: string;
  onTargetChange?: (target: YksUniversityTarget) => void;
}

export function UniversityRadarCard({
  currentTermAverage: propAverage,
  selectedTargetUni,
  onTargetChange,
}: UniversityRadarCardProps) {
  const { profile, user, updateProfile } = useAuth();

  const [termAverage, setTermAverage] = useState<number | null>(() => {
    if (propAverage !== undefined) return propAverage;
    return getStoredLise1TermAverage(user?.id);
  });

  const [selectedTargetId, setSelectedTargetId] = useState<string>(() => {
    const uniName = selectedTargetUni || profile?.target_university;
    if (uniName) {
      const found = YKS_TOP_UNIVERSITIES.find(
        (u) =>
          u.name.toLowerCase() === uniName.toLowerCase() ||
          u.id === uniName ||
          uniName.toLowerCase().includes(u.name.toLowerCase())
      );
      if (found) return found.id;
    }
    return 'boun-ceng';
  });

  // Not güncellemelerini dinle
  useEffect(() => {
    const updateAvg = () => {
      if (propAverage !== undefined) {
        setTermAverage(propAverage);
      } else {
        setTermAverage(getStoredLise1TermAverage(user?.id));
      }
    };

    updateAvg();
    window.addEventListener('lise1_grades_updated', updateAvg);
    return () => window.removeEventListener('lise1_grades_updated', updateAvg);
  }, [propAverage, user?.id]);

  // Profil veya prop değiştiğinde hedefi senkronize et
  useEffect(() => {
    const uniName = selectedTargetUni || profile?.target_university;
    if (uniName) {
      const found = YKS_TOP_UNIVERSITIES.find(
        (u) =>
          u.name.toLowerCase() === uniName.toLowerCase() ||
          u.id === uniName ||
          uniName.toLowerCase().includes(u.name.toLowerCase())
      );
      if (found && found.id !== selectedTargetId) {
        setSelectedTargetId(found.id);
      }
    }
  }, [selectedTargetUni, profile?.target_university, selectedTargetId]);

  const selectedTarget =
    YKS_TOP_UNIVERSITIES.find((u) => u.id === selectedTargetId) || YKS_TOP_UNIVERSITIES[0];

  const hasGrades = termAverage !== null && termAverage > 0;
  const gapAnalysis = hasGrades ? analyzeUniversityTargetGap(selectedTarget.id, termAverage) : null;

  const handleTargetChange = (targetId: string) => {
    setSelectedTargetId(targetId);
    const target = YKS_TOP_UNIVERSITIES.find((u) => u.id === targetId);
    if (target) {
      if (user?.id) {
        updateProfile({
          target_university: target.name,
          target_department: target.department,
          target_score: target.minScore,
        });
      }
      if (onTargetChange) {
        onTargetChange(target);
      }
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>9. Sınıftan YKS Temel Atma Vizyonu</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-500 shrink-0" />
            <span>Hedef Üniversite &amp; Bölüm Radarı</span>
          </h3>
        </div>

        {/* Seçici Açılır Menü */}
        <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
          <label htmlFor="uni-select" className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 whitespace-nowrap">
            Hedef Seç:
          </label>
          <div className="relative min-w-0 flex-1 sm:w-60 md:w-72 max-w-full">
            <select
              id="uni-select"
              value={selectedTargetId}
              onChange={(e) => handleTargetChange(e.target.value)}
              className="w-full truncate rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs focus:border-indigo-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            >
              {YKS_TOP_UNIVERSITIES.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name} — {uni.department.split('(')[0].trim()}
                </option>
              ))}
            </select>
          </div>
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
            <div className={`text-lg font-black ${hasGrades ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {hasGrades ? `${termAverage?.toFixed(1)} / 100` : '— / 100'}
            </div>
            <span className={`text-[10px] font-semibold ${hasGrades ? 'text-emerald-500' : 'text-slate-400'}`}>
              {hasGrades
                ? termAverage! >= selectedTarget.targetObp
                  ? 'Hedef Bandındasın 🎯'
                  : `${(selectedTarget.targetObp - termAverage!).toFixed(1)} puan fark var`
                : 'Henüz Not Girilmedi'}
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

        {/* Durum / Koç Mesajı */}
        <div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-700 dark:bg-slate-800/90 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          {hasGrades && gapAnalysis ? (
            <span>💡 <strong>Koç Tavsiyesi:</strong> {gapAnalysis.statusMessage}</span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Calculator className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                Not Hesapla modülünden 1. ve 2. yazılı notlarını kaydettiğinde, hedefindeki üniversite ile arandaki OBP puan farkı burada otomatik analiz edilecektir.
              </span>
            </span>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 shrink-0"
          >
            <span>{hasGrades ? 'Konuları İncele' : 'Notlarını Hesapla'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
