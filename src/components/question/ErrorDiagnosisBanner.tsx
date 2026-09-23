'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredQuestions, getErrorDiagnosis, ErrorDiagnosisResult } from '@/lib/question-storage';
import {
  Brain,
  Eye,
  Pencil,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export function ErrorDiagnosisBanner() {
  const [diagnosis, setDiagnosis] = useState<ErrorDiagnosisResult>(() => {
    return getErrorDiagnosis(getStoredQuestions());
  });

  const refreshDiagnosis = () => {
    const questions = getStoredQuestions();
    setDiagnosis(getErrorDiagnosis(questions));
  };

  useEffect(() => {
    refreshDiagnosis();
    const handleUpdate = () => refreshDiagnosis();
    window.addEventListener('questions_updated', handleUpdate);
    return () => window.removeEventListener('questions_updated', handleUpdate);
  }, []);

  if (diagnosis.totalQuestions === 0) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-indigo-100/90 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 p-5 shadow-xs dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 sm:p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Sol: AI Hata Teşhisi */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-[11px] font-black text-white shadow-xs">
              <Brain className="h-3.5 w-3.5" />
              AKILLI HATA KÖK NEDEN TEŞHİSİ
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              ({diagnosis.totalWithReason} / {diagnosis.totalQuestions} Soru Etiketlendi)
            </span>
          </div>

          <div className="rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-4">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  AI Sınav Koçu Analizi:
                </h4>
                <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {diagnosis.aiDiagnosis}
                </p>
              </div>
            </div>
          </div>

          {/* Hata Oranları Çok Segmentli İlerleme Çubuğu */}
          {diagnosis.totalWithReason > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span>Hata Dağılım Grafiği</span>
                <span>%100 üzerinden</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex">
                {diagnosis.carelessnessPercent > 0 && (
                  <div
                    title={`Dikkatsizlik: %${diagnosis.carelessnessPercent}`}
                    style={{ width: `${diagnosis.carelessnessPercent}%` }}
                    className="h-full bg-amber-500 transition-all duration-500"
                  />
                )}
                {diagnosis.calculationErrorPercent > 0 && (
                  <div
                    title={`İşlem Hatası: %${diagnosis.calculationErrorPercent}`}
                    style={{ width: `${diagnosis.calculationErrorPercent}%` }}
                    className="h-full bg-blue-500 transition-all duration-500"
                  />
                )}
                {diagnosis.knowledgeGapPercent > 0 && (
                  <div
                    title={`Bilgi Eksiği: %${diagnosis.knowledgeGapPercent}`}
                    style={{ width: `${diagnosis.knowledgeGapPercent}%` }}
                    className="h-full bg-purple-500 transition-all duration-500"
                  />
                )}
                {diagnosis.timePressurePercent > 0 && (
                  <div
                    title={`Süre Yetmedi: %${diagnosis.timePressurePercent}`}
                    style={{ width: `${diagnosis.timePressurePercent}%` }}
                    className="h-full bg-rose-500 transition-all duration-500"
                  />
                )}
              </div>
            </div>
          )}

          {/* 4 Renkli Kapsül */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/30 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-700 dark:text-amber-400 font-bold text-xs">
                <Eye className="h-3.5 w-3.5" />
                <span>Dikkatsizlik</span>
              </div>
              <p className="mt-1 text-base font-black text-amber-900 dark:text-amber-200">
                %{diagnosis.carelessnessPercent}
              </p>
              <span className="text-[10px] text-amber-700/80 dark:text-amber-400">
                {diagnosis.carelessnessCount} Soru
              </span>
            </div>

            <div className="rounded-xl border border-blue-200/80 bg-blue-50/70 dark:border-blue-900/50 dark:bg-blue-950/30 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-700 dark:text-blue-400 font-bold text-xs">
                <Pencil className="h-3.5 w-3.5" />
                <span>İşlem Hatası</span>
              </div>
              <p className="mt-1 text-base font-black text-blue-900 dark:text-blue-200">
                %{diagnosis.calculationErrorPercent}
              </p>
              <span className="text-[10px] text-blue-700/80 dark:text-blue-400">
                {diagnosis.calculationErrorCount} Soru
              </span>
            </div>

            <div className="rounded-xl border border-purple-200/80 bg-purple-50/70 dark:border-purple-900/50 dark:bg-purple-950/30 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-xs">
                <Brain className="h-3.5 w-3.5" />
                <span>Bilgi Eksiği</span>
              </div>
              <p className="mt-1 text-base font-black text-purple-900 dark:text-purple-200">
                %{diagnosis.knowledgeGapPercent}
              </p>
              <span className="text-[10px] text-purple-700/80 dark:text-purple-400">
                {diagnosis.knowledgeGapCount} Soru
              </span>
            </div>

            <div className="rounded-xl border border-rose-200/80 bg-rose-50/70 dark:border-rose-900/50 dark:bg-rose-950/30 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-rose-700 dark:text-rose-400 font-bold text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>Süre Yetmedi</span>
              </div>
              <p className="mt-1 text-base font-black text-rose-900 dark:text-rose-200">
                %{diagnosis.timePressurePercent}
              </p>
              <span className="text-[10px] text-rose-700/80 dark:text-rose-400">
                {diagnosis.timePressureCount} Soru
              </span>
            </div>
          </div>
        </div>

        {/* Sağ: 1-Tıkla Eksik Kapatma Testi Aksiyon Kartı */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white text-center shadow-md max-w-sm shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner mb-3">
            <Zap className="h-6 w-6 text-amber-300 fill-amber-300" />
          </div>

          <h3 className="text-base font-black tracking-tight">
            1-Tık Kişisel Telafi Hapı
          </h3>
          <p className="mt-1.5 text-xs text-indigo-100 leading-relaxed">
            Yanlış defterinde takıldığın konulardan sadece sana özel <strong>5 soruluk mikro telafi testi</strong>.
          </p>

          <Link
            href="/deneme-coz/lgs-haftalik-sayisal-meydan-okuma"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-indigo-700 shadow-sm hover:bg-indigo-50 transition"
          >
            <span>Hemen Telafi Testini Çöz</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <span className="mt-2 text-[10px] text-indigo-200">
            Hedef: Bu konulardan en az 4/5 yaparak rozet kazan!
          </span>
        </div>
      </div>
    </div>
  );
}
