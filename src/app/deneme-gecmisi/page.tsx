'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { ExamHistoryChart } from '@/components/exam/ExamHistoryChart';
import {
  getStoredExams,
  deleteStoredExam,
  calculateExamTrends,
  type ExamTrends,
} from '@/lib/exam-storage';
import type { SavedStudentExam } from '@/types/exam';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  TrendingUp,
  Award,
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  Plus,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { WhatsAppShareButton } from '@/components/share/WhatsAppShareButton';

export default function DenemeGecmisiPage() {
  const { profile } = useAuth();
  const [exams, setExams] = useState<SavedStudentExam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  useEffect(() => {
    setExams(getStoredExams());
  }, []);

  const trends = calculateExamTrends(exams);
  const targetScore = profile?.target_score || 460;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bu deneme sonucunu silmek istediğinize emin misiniz?')) {
      const updated = deleteStoredExam(id);
      setExams(updated);
      if (selectedExamId === id) setSelectedExamId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 py-8">
          {/* Başlık ve Eylem */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>2027 LGS Başarı Takibi</span>
              </div>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Deneme Sınavı Geçmişi &amp; Trend Analizi
              </h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Çözdüğün denemeleri kaydet, puan artışını takip et ve hedef lisene ne kadar yaklaştığını gör.
              </p>
            </div>

            <Link
              href="/#hesaplama"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700"
            >
              <Plus className="h-4 w-4" />
              <span>Yeni Deneme Hesapla &amp; Kaydet</span>
            </Link>
          </div>

          {/* 4 KPI Kartı */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {/* Toplam Deneme */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Toplam Deneme
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                  {trends.totalCount}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Adet</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Kayıtlı deneme sınavı</p>
            </div>

            {/* En Yüksek Puan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                En Yüksek Puan
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                  {trends.highestScore}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Puan</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Kişisel rekorun</p>
            </div>

            {/* Ortalama Puan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Ortalama Puan
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 sm:text-3xl">
                  {trends.averageScore}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Puan</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Ortalama {trends.averageNet} Net</p>
            </div>

            {/* Puan Değişimi */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Gelişim Trendi
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span
                  className={`text-2xl font-black sm:text-3xl ${
                    trends.scoreChange >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {trends.scoreChange >= 0 ? `+${trends.scoreChange}` : trends.scoreChange}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Puan</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">İlk denemeden bugüne</p>
            </div>
          </div>

          {/* İlerleme Grafiği */}
          <ExamHistoryChart exams={exams} targetScore={targetScore} />

          {/* Deneme Listesi */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Kayıtlı Denemeler ({exams.length})
              </h2>
              <span className="text-xs text-slate-500">
                Detay görmek için denemeye tıklayın
              </span>
            </div>

            {exams.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-slate-200">
                  Henüz kayıtlı bir denemeniz yok
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Ana sayfadaki LGS Net Hesaplama modülünden deneme sonuçlarınızı hesaplayıp &ldquo;Denemeyi Kaydet&rdquo; butonuna basın.
                </p>
                <Link
                  href="/#hesaplama"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow"
                >
                  <Plus className="h-4 w-4" />
                  <span>İlk Denemeni Hesapla</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {exams.map((exam, idx) => {
                  const isExpanded = selectedExamId === exam.id;

                  return (
                    <div
                      key={exam.id}
                      onClick={() => setSelectedExamId(isExpanded ? null : exam.id)}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
                    >
                      {/* Ana Satır */}
                      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-black text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                            #{exams.length - idx}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {exam.examTitle}
                            </h4>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{exam.examDate}</span>
                              <span>&bull;</span>
                              <span>
                                {exam.totalCorrect} D &bull; {exam.totalIncorrect} Y &bull; {exam.totalEmpty} B
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-right">
                            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                              {exam.totalScore} ₺Puan
                            </div>
                            <div className="text-[11px] font-semibold text-slate-500">
                              {exam.totalNet} Net &bull; %{exam.calculatedPercentile} Dilim
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div onClick={(e) => e.stopPropagation()}>
                              <WhatsAppShareButton
                                variant="compact"
                                shareData={{
                                  examTitle: exam.examTitle,
                                  score: exam.totalScore,
                                  totalNet: exam.totalNet,
                                  courseBreakdown: Object.values(exam.courses).map((c) => ({
                                    name: c.courseName,
                                    net: c.net,
                                  })),
                                  mode: 'student_to_parent',
                                }}
                                buttonText="Veliye İlet"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleDelete(exam.id, e)}
                              title="Denemeyi Sil"
                              className="rounded-lg p-2 text-slate-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 dark:hover:bg-rose-950/40"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <div className="text-slate-400">
                              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Açılır Ders Döküm Tablosu */}
                      {isExpanded && (
                        <div className="border-t border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50 sm:p-5">
                          <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Ders Bazlı Net Analizi
                          </h5>

                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                            {Object.entries(exam.courses).map(([key, c]) => (
                              <div
                                key={key}
                                className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900"
                              >
                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate block">
                                  {c.courseName}
                                </span>
                                <div className="mt-1 text-base font-black text-indigo-600 dark:text-indigo-400">
                                  {c.net} Net
                                </div>
                                <div className="mt-0.5 text-[10px] text-slate-400">
                                  {c.correct}D {c.incorrect}Y {c.empty}B
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
    </div>
  );
}
