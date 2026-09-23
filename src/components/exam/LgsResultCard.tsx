import React, { useState } from 'react';
import Link from 'next/link';
import type { LgsCalculationResult } from '@/types/exam';
import { saveExamToStorage } from '@/lib/exam-storage';
import { useAuth } from '@/components/auth/AuthProvider';
import { getSelectedTargetSchool, analyzeTargetGap } from '@/lib/lgs-high-schools';
import {
  Award,
  TrendingUp,
  Target,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookmarkPlus,
  Check,
  Calendar,
} from 'lucide-react';
import { WhatsAppShareButton } from '@/components/share/WhatsAppShareButton';

interface LgsResultCardProps {
  result: LgsCalculationResult;
  onNavigateToNotebook?: () => void;
}

export function LgsResultCard({ result, onNavigateToNotebook }: LgsResultCardProps) {
  const { user } = useAuth();
  const [examTitle, setExamTitle] = useState<string>('');
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);

  const handleSaveExam = () => {
    setIsSaving(true);
    try {
      saveExamToStorage(
        examTitle || `LGS Denemesi (${result.score.toFixed(1)} Puan)`,
        examDate,
        result,
        user?.id
      );
      setIsSaved(true);
      setShowSaveForm(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };
  const {
    totalNet,
    score,
    percentile,
    highestLossCourse,
    totalCorrect,
    totalIncorrect,
    totalEmpty,
    courses,
  } = result;

  const targetSchool = getSelectedTargetSchool();
  const targetAnalysis = analyzeTargetGap(targetSchool, score);

  // Performans rengi
  const getScoreColor = (sc: number) => {
    if (sc >= 450) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20';
    if (sc >= 400) return 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20';
    if (sc >= 300) return 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20';
    return 'text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20';
  };

  return (
    <div className="space-y-6">
      {/* Ana Özet Metrikleri */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Award className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Deneme Sonuç Özeti
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Toplam 90 Soru
          </span>
        </div>

        {/* 3 Büyük Metrik Kutusu */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Toplam Net */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-800/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Toplam Net
              </span>
              <Target className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalNet.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-slate-500">/ 90.00</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {totalCorrect} D
              </span>
              <span>•</span>
              <span className="text-rose-600 dark:text-rose-400 font-medium">
                {totalIncorrect} Y
              </span>
              <span>•</span>
              <span className="text-slate-500 font-medium">
                {totalEmpty} B
              </span>
            </div>
          </div>

          {/* Tahmini LGS Puanı */}
          <div className={`rounded-xl border p-4 transition-colors ${getScoreColor(score)}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Tahmini LGS Puanı
              </span>
              <Award className="h-4 w-4 opacity-80" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">
                {score.toFixed(2)}
              </span>
              <span className="text-xs font-medium opacity-70">/ 500</span>
            </div>
            <p className="mt-2 text-xs opacity-80">
              Standart taban puanı (100) dahil
            </p>
          </div>

          {/* Tahmini Yüzdelik Dilim */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-50/50 p-4 text-purple-700 dark:border-purple-500/20 dark:bg-purple-950/20 dark:text-purple-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Tahmini Dilim
              </span>
              <TrendingUp className="h-4 w-4 opacity-80" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">
                %{percentile.toFixed(2)}
              </span>
            </div>
            <p className="mt-2 text-xs opacity-80">
              MEB geçmiş yıl dağılımına göre
            </p>
          </div>
        </div>

        {/* Hedef Lise Karşılaştırma Bandı */}
        <div className="mt-5 rounded-xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 via-violet-50/70 to-indigo-50/90 p-4 dark:border-indigo-900/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-2xs">
                  <Target className="h-3.5 w-3.5" />
                </span>
                <h5 className="text-xs font-black text-slate-900 dark:text-white">
                  Hedef Lise: {targetSchool.name} ({targetSchool.minScore.toFixed(1)} Puan)
                </h5>
                <span className="rounded-md bg-indigo-100 px-1.5 py-0.2 text-[10px] font-bold text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                  %{targetAnalysis.progressPercent} Yakınlık
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {targetAnalysis.isAchieved ? (
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    🎉 Harika! Bu deneme puanın ({score.toFixed(1)}) hedef lisenin taban puanının üzerinde!
                  </span>
                ) : (
                  <span>
                    Hedefe ulaşmak için:{' '}
                    <strong className="text-indigo-900 dark:text-indigo-200">
                      +{targetAnalysis.scoreDifference.toFixed(1)} puan
                    </strong>{' '}
                    (Yaklaşık{' '}
                    <strong className="text-indigo-900 dark:text-indigo-200">
                      +{targetAnalysis.neededNetEquivalent[0].neededNets} Matematik Neti
                    </strong>{' '}
                    veya{' '}
                    <strong className="text-indigo-900 dark:text-indigo-200">
                      +{targetAnalysis.neededNetEquivalent[1].neededNets} Fen Neti
                    </strong>
                    ) gerekiyor.
                  </span>
                )}
              </p>
            </div>

            <Link
              href="/#hesaplama"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:underline shrink-0"
            >
              <span>Hedefi Yönet</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Deneme Kaydetme Alanı */}
        <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20">
          {isSaved ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <Check className="h-4 w-4 shrink-0 rounded-full bg-emerald-100 p-0.5 dark:bg-emerald-950" />
                <span>Bu deneme başarıyla kaydedildi ve ilerleme grafiğine eklendi!</span>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppShareButton
                  shareData={{
                    examTitle: examTitle || 'LGS Denemesi',
                    score,
                    totalNet,
                    targetSchool: targetSchool?.name,
                    targetSchoolProgress: targetAnalysis?.isAchieved ? 100 : targetAnalysis?.progressPercent || 0,
                    courseBreakdown: Object.values(courses).map((c) => ({ name: c.courseName, net: c.net })),
                    mode: 'student_to_parent',
                  }}
                  buttonText="Veliye WhatsApp'la İlet"
                  variant="outline"
                />
                <Link
                  href="/deneme-gecmisi"
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  <span>Deneme Geçmişini Gör</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ) : !showSaveForm ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Bu deneme puanını gelişim grafiğine kaydetmek veya velinle paylaşmak ister misin?
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Denemelerini biriktirerek puan trendini takip et ve tek tıkla veline karne olarak gönder.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <WhatsAppShareButton
                  shareData={{
                    examTitle: examTitle || 'LGS Deneme Hesaplaması',
                    score,
                    totalNet,
                    targetSchool: targetSchool?.name,
                    targetSchoolProgress: targetAnalysis?.isAchieved ? 100 : targetAnalysis?.progressPercent || 0,
                    courseBreakdown: Object.values(courses).map((c) => ({ name: c.courseName, net: c.net })),
                    mode: 'student_to_parent',
                  }}
                  buttonText="Veliye WhatsApp'la Gönder"
                />
                <button
                  type="button"
                  onClick={() => setShowSaveForm(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 cursor-pointer whitespace-nowrap"
                >
                  <BookmarkPlus className="h-3.5 w-3.5" />
                  <span>Denemeyi Kaydet</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Deneme Adı / Yayın Adı
                  </label>
                  <input
                    type="text"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    placeholder="Örn: Özdebir 3. Deneme, Töder LGS"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Sınav Tarihi
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSaveForm(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveExam}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{isSaving ? 'Kaydediliyor...' : 'Onayla & Kaydet'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ders Bazlı Mini Döküm Çizelgesi */}
        <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ders Bazında Net Dağılımı
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.values(courses).map((c) => (
              <div
                key={c.courseKey}
                className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                    {c.courseName}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {c.net.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.max(0, (c.net / c.questionCount) * 100))}%`,
                    }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
                  <span>{c.correct}D - {c.incorrect}Y</span>
                  <span>Kayıp: {c.lostNet.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner: Yanlış Defteri Köprüsü */}
      {highestLossCourse && highestLossCourse.lostNet > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 p-6 shadow-sm dark:border-amber-700/50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-amber-200/60 px-2 py-0.5 text-[11px] font-semibold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                    Kritik Gelişim Alanı
                  </span>
                  <span className="text-xs text-amber-800/80 dark:text-amber-300/80">
                    Ağırlık Katsayısı: {highestLossCourse.weight}
                  </span>
                </div>
                <h4 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                  {highestLossCourse.courseName} dersinde{' '}
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold">
                    {highestLossCourse.lostNet.toFixed(2)} net
                  </span>{' '}
                  kaybın var!
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Bu kayıp LGS puanını yaklaşık{' '}
                  <strong>
                    {(highestLossCourse.lostNet * highestLossCourse.weight * (400 / 270)).toFixed(1)} puan
                  </strong>{' '}
                  düşürdü. Yanlış yaptığın ve boş bıraktığın soruları analiz ederek netlerini hızla artırabilirsin.
                </p>
              </div>
            </div>

            <Link
              href="/yanlis-defteri"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Yanlış Defteri&apos;ne Ekle</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
