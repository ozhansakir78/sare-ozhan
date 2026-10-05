'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  calculateFieldSelection,
  CourseGradeInput,
  StudentInterestsInput,
  FieldSelectionResult,
} from '@/lib/field-selection';
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
  Save,
  Plus,
  Trash2,
  School,
  GraduationCap,
  Compass,
  Briefcase,
} from 'lucide-react';

export interface Lise2CourseRow {
  name: string;
  key: string;
  weeklyHours: number;
  isPassingRequirement?: boolean;
  exam1: number | null;
  exam2: number | null;
  performance1: number | null;
  performance2: number | null;
}

const DEFAULT_LISE2_COURSES: Lise2CourseRow[] = [
  {
    name: 'Türk Dili ve Edebiyatı (10. Sınıf)',
    key: 'edebiyat',
    weeklyHours: 5,
    isPassingRequirement: true,
    exam1: 80,
    exam2: 85,
    performance1: 85,
    performance2: 90,
  },
  {
    name: 'Matematik (10. Sınıf)',
    key: 'matematik',
    weeklyHours: 6,
    exam1: 80,
    exam2: 75,
    performance1: 85,
    performance2: 85,
  },
  {
    name: 'Fizik (10. Sınıf)',
    key: 'fizik',
    weeklyHours: 2,
    exam1: 75,
    exam2: 80,
    performance1: 85,
    performance2: 85,
  },
  {
    name: 'Kimya (10. Sınıf)',
    key: 'kimya',
    weeklyHours: 2,
    exam1: 75,
    exam2: 75,
    performance1: 80,
    performance2: 85,
  },
  {
    name: 'Biyoloji (10. Sınıf)',
    key: 'biyoloji',
    weeklyHours: 2,
    exam1: 75,
    exam2: 80,
    performance1: 85,
    performance2: 90,
  },
  {
    name: 'Tarih (10. Sınıf)',
    key: 'tarih',
    weeklyHours: 2,
    exam1: 75,
    exam2: 80,
    performance1: 85,
    performance2: 85,
  },
  {
    name: 'Coğrafya (10. Sınıf)',
    key: 'cografya',
    weeklyHours: 2,
    exam1: 75,
    exam2: 75,
    performance1: 80,
    performance2: 85,
  },
  {
    name: 'Felsefe (10. Sınıf)',
    key: 'felsefe',
    weeklyHours: 2,
    exam1: 75,
    exam2: 80,
    performance1: 85,
    performance2: 85,
  },
  {
    name: 'Birinci Yabancı Dil (İngilizce)',
    key: 'ingilizce',
    weeklyHours: 4,
    exam1: 80,
    exam2: 85,
    performance1: 85,
    performance2: 90,
  },
  {
    name: 'İkinci Yabancı Dil (Almanca)',
    key: 'almanca',
    weeklyHours: 2,
    exam1: 80,
    exam2: 80,
    performance1: 85,
    performance2: 85,
  },
  {
    name: 'Din Kültürü ve Ahlak Bilgisi',
    key: 'din',
    weeklyHours: 2,
    exam1: 85,
    exam2: 85,
    performance1: 90,
    performance2: 90,
  },
  {
    name: 'Beden Eğitimi ve Spor',
    key: 'beden',
    weeklyHours: 2,
    exam1: 95,
    exam2: 95,
    performance1: 100,
    performance2: 100,
  },
  {
    name: 'Görsel Sanatlar / Müzik',
    key: 'sanat',
    weeklyHours: 2,
    exam1: 90,
    exam2: 95,
    performance1: 95,
    performance2: 100,
  },
  {
    name: 'Rehberlik ve Yönlendirme',
    key: 'rehberlik',
    weeklyHours: 1,
    exam1: null,
    exam2: null,
    performance1: null,
    performance2: null,
  },
];

const STORAGE_KEY = 'sinavkocu_lise2_grades_v1';

export function Lise2CalculatorForm() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Lise2CourseRow[]>(DEFAULT_LISE2_COURSES);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Öğrenci ilgi alanları (Alan Seçimi simülatörü için 1-5 puan)
  const [interests, setInterests] = useState<StudentInterestsInput>({
    math: 4,
    science: 4,
    literature: 3,
    social: 3,
    language: 3,
  });

  // LocalStorage'dan kayıtlı notları yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCourses(parsed);
          }
        }
      } catch (e) {
        console.error('Lise 2 grades load error:', e);
      }
    }
  }, []);

  const handleScoreChange = (
    index: number,
    field: 'exam1' | 'exam2' | 'performance1' | 'performance2',
    value: string
  ) => {
    setCourses((prev) => {
      const next = [...prev];
      const trimmed = value.trim();
      const parsed = trimmed === '' ? null : Number(trimmed);
      const safeVal = parsed === null || isNaN(parsed) ? null : Math.min(100, Math.max(0, parsed));
      next[index] = { ...next[index], [field]: safeVal };
      return next;
    });
  };

  const handleWeeklyHoursChange = (index: number, value: string) => {
    const parsed = parseInt(value, 10);
    const safeHours = isNaN(parsed) ? 1 : Math.min(12, Math.max(1, parsed));
    setCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], weeklyHours: safeHours };
      return next;
    });
  };

  // Ders ortalamasını hesapla
  const getCourseAverage = (c: Lise2CourseRow): number | null => {
    const scores = [c.exam1, c.exam2, c.performance1, c.performance2].filter(
      (s): s is number => s !== null
    );
    if (scores.length === 0) return null;
    const sum = scores.reduce((acc, v) => acc + v, 0);
    return Number((sum / scores.length).toFixed(2));
  };

  // Ağırlıklı Dönem Ortalaması & MEB Belge Hesabı
  const { termAverage, totalWeeklyHours, certificateStatus, failedCourseCount, edebiyatPassed } =
    useMemo(() => {
      let weightedSum = 0;
      let totalHours = 0;
      let failedCount = 0;
      let edPassed = true;

      courses.forEach((c) => {
        const avg = getCourseAverage(c);
        if (avg !== null && c.weeklyHours > 0) {
          weightedSum += avg * c.weeklyHours;
          totalHours += c.weeklyHours;

          if (avg < 50) {
            failedCount++;
          }

          if (c.isPassingRequirement && avg < 70) {
            edPassed = false;
          }
        }
      });

      const avg = totalHours > 0 ? Number((weightedSum / totalHours).toFixed(2)) : null;

      let cert = 'Belge Yok';
      if (avg !== null) {
        if (!edPassed) {
          cert = 'Edebiyat Barajına Takıldı (70 Şartı)';
        } else if (failedCount > 0) {
          cert = 'Zayıf Ders Var (Belge Alınamaz)';
        } else if (avg >= 85) {
          cert = '🏅 Takdir Belgesi';
        } else if (avg >= 70) {
          cert = '🥈 Teşekkür Belgesi';
        }
      }

      return {
        termAverage: avg,
        totalWeeklyHours: totalHours,
        certificateStatus: cert,
        failedCourseCount: failedCount,
        edebiyatPassed: edPassed,
      };
    }, [courses]);

  // Alan Seçimi (MF/TM/TS/DİL) Simülasyonu
  const fieldSelectionResult: FieldSelectionResult = useMemo(() => {
    const gradeInput: CourseGradeInput = {};
    courses.forEach((c) => {
      const avg = getCourseAverage(c);
      if (avg !== null && c.key) {
        (gradeInput as any)[c.key] = avg;
      }
    });

    return calculateFieldSelection(gradeInput, interests);
  }, [courses, interests]);

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
      if (termAverage !== null) {
        localStorage.setItem('sinavkocu_lise2_term_average', termAverage.toString());
        window.dispatchEvent(new Event('lise1_grade_updated'));
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error('Save error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('10. Sınıf notlarınızı varsayılan MEB değerlerine sıfırlamak istediğinize emin misiniz?')) {
      setCourses(DEFAULT_LISE2_COURSES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Kart: 10. Sınıf Karne & Alan Özeti */}
      <div className="relative overflow-hidden rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-500/10 via-white to-purple-500/10 p-6 sm:p-8 shadow-sm dark:border-teal-900/50 dark:from-teal-950/30 dark:via-slate-900 dark:to-purple-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 dark:bg-teal-950/80 px-3 py-1 text-xs font-bold text-teal-800 dark:text-teal-300">
              <Compass className="h-3.5 w-3.5" />
              <span>10. Sınıf MEB Yazılı Notu &amp; 11. Sınıf Alan Seçimi (MF/TM/TS/DİL)</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              10. Sınıf Dönem Notu &amp; Alan Uyum Motoru
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              10. sınıf MEB ortak yazılı notlarınızı girin; ağırlıklı dönem ortalamanızı, Takdir/Teşekkür durumunuzu ve 11. sınıfta hangi alana (Sayısal, EA, Sözel, Dil) en yatkın olduğunuzu anında görün.
            </p>
          </div>

          {/* 3'lü Metrik Kartları */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            {/* Dönem Ortalaması */}
            <div className="rounded-2xl border border-teal-200 bg-white p-4 text-center dark:border-teal-900/60 dark:bg-slate-800 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                10. Sınıf OBP
              </span>
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-0.5">
                {termAverage !== null ? termAverage : '—'}
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                {totalWeeklyHours} Saatlik Ağırlık
              </span>
            </div>

            {/* Belge Durumu */}
            <div className="rounded-2xl border border-purple-200 bg-white p-4 text-center dark:border-purple-900/60 dark:bg-slate-800 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                MEB Belgesi
              </span>
              <div className="text-sm font-black text-purple-700 dark:text-purple-300 mt-1.5 truncate">
                {certificateStatus}
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                {edebiyatPassed ? 'Baraj Geçildi (≥70)' : 'Baraj Altı (<70)'}
              </span>
            </div>

            {/* En Uyumlu Alan */}
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-indigo-200 bg-white p-4 text-center dark:border-indigo-900/60 dark:bg-slate-800 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                1. Alan Tavsiyesi
              </span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                {fieldSelectionResult.primaryTrack.shortName} (%{fieldSelectionResult.primaryTrack.compatibilityScore})
              </div>
              <span className="text-[10px] font-semibold text-indigo-500 truncate block">
                {fieldSelectionResult.primaryTrack.trackName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alan Uyum Bandı (MF, TM, TS, DİL) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              11. Sınıf Alan Seçimi Uyum Dağılımı (Yazılı Notlarınıza Göre)
            </h3>
          </div>

          <Link
            href="/lise2-konulari"
            className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-500 dark:text-purple-400"
          >
            <span>Detaylı Alan Simülatörünü Aç</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {fieldSelectionResult.allTracks.map((track) => (
            <div
              key={track.track}
              className={`rounded-2xl border p-3 space-y-2 transition ${
                track.track === fieldSelectionResult.primaryTrack.track
                  ? 'border-purple-500/80 bg-purple-50/70 dark:border-purple-700 dark:bg-purple-950/40 shadow-xs ring-1 ring-purple-400/40'
                  : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-900 dark:text-white flex items-center gap-1">
                  <span>{track.shortName}</span>
                  {track.track === fieldSelectionResult.primaryTrack.track && (
                    <span className="rounded-full bg-purple-500 text-white text-[9px] px-1.5 py-0.2">
                      1. Tercih
                    </span>
                  )}
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-extrabold">
                  %{track.compatibilityScore}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 rounded-full"
                  style={{ width: `${track.compatibilityScore}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {track.trackName}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Sınıf Ders Notları Tablosu */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:px-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span>10. Sınıf Ders Notları &amp; Haftalık Ders Saatleri</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              1. ve 2. yazılı notlarını girin, sistem dönem ortalamanızı ve ders başarı ortalamanızı otomatik hesaplasın.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Varsayılana Dön</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{saveSuccess ? '✓ Kaydedildi' : isSaving ? 'Kaydediliyor...' : 'Notları Kaydet'}</span>
            </button>
          </div>
        </div>

        {/* Tablo */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800/60 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 sm:px-6">Ders Adı</th>
                <th className="px-3 py-3 text-center">Haftalık Saat</th>
                <th className="px-3 py-3 text-center">1. Yazılı</th>
                <th className="px-3 py-3 text-center">2. Yazılı</th>
                <th className="px-3 py-3 text-center">1. Perf.</th>
                <th className="px-3 py-3 text-center">2. Perf.</th>
                <th className="px-4 py-3 text-right sm:pr-6">Ders Ort.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {courses.map((course, idx) => {
                const avg = getCourseAverage(course);
                const isBarajFail = course.isPassingRequirement && avg !== null && avg < 70;
                const isFail = avg !== null && avg < 50;

                return (
                  <tr
                    key={course.key || idx}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {course.name}
                        </span>
                        {course.isPassingRequirement && (
                          <span className="rounded-md bg-rose-100 dark:bg-rose-950 px-1.5 py-0.2 text-[10px] font-bold text-rose-700 dark:text-rose-300">
                            Baraj (70)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={course.weeklyHours}
                        onChange={(e) => handleWeeklyHoursChange(idx, e.target.value)}
                        className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                      />
                    </td>

                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="—"
                        value={course.exam1 ?? ''}
                        onChange={(e) => handleScoreChange(idx, 'exam1', e.target.value)}
                        className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                      />
                    </td>

                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="—"
                        value={course.exam2 ?? ''}
                        onChange={(e) => handleScoreChange(idx, 'exam2', e.target.value)}
                        className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                      />
                    </td>

                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="—"
                        value={course.performance1 ?? ''}
                        onChange={(e) => handleScoreChange(idx, 'performance1', e.target.value)}
                        className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                      />
                    </td>

                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="—"
                        value={course.performance2 ?? ''}
                        onChange={(e) => handleScoreChange(idx, 'performance2', e.target.value)}
                        className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                      />
                    </td>

                    <td className="px-4 py-3 text-right sm:pr-6">
                      <span
                        className={`font-black text-sm ${
                          isBarajFail || isFail
                            ? 'text-rose-600 dark:text-rose-400'
                            : avg !== null && avg >= 85
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {avg !== null ? avg : '—'}
                      </span>
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
