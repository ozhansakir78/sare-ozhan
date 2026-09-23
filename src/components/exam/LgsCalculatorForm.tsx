'use client';

import React, { useState, useId } from 'react';
import {
  LGS_COURSES,
  calculateLgsResults,
  getInitialLgsInputs,
  getSampleLgsInputs,
} from '@/lib/lgs-calculation';
import type { LgsCourseKey, LgsCourseInput, LgsCalculationResult } from '@/types/exam';
import { LgsResultCard } from '@/components/exam/LgsResultCard';
import {
  RotateCcw,
  Sparkles,
  BookOpen,
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';

interface LgsCalculatorFormProps {
  onResultChange?: (result: LgsCalculationResult) => void;
}

export function LgsCalculatorForm({ onResultChange }: LgsCalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<LgsCourseKey, LgsCourseInput>>(getInitialLgsInputs());

  // Dinamik anlık hesaplama
  const result = calculateLgsResults(inputs);

  const handleInputChange = (
    key: LgsCourseKey,
    field: 'correct' | 'incorrect',
    valueStr: string
  ) => {
    const courseConfig = LGS_COURSES.find((c) => c.key === key);
    if (!courseConfig) return;

    let numVal = parseInt(valueStr, 10);
    if (isNaN(numVal) || numVal < 0) {
      numVal = 0;
    }

    const current = inputs[key] || { correct: 0, incorrect: 0 };
    let newCorrect = field === 'correct' ? numVal : current.correct;
    let newIncorrect = field === 'incorrect' ? numVal : current.incorrect;

    // Doğru + Yanlış soru sayısını aşamaz kısıtlaması
    if (field === 'correct') {
      newCorrect = Math.min(courseConfig.questionCount, newCorrect);
      if (newCorrect + newIncorrect > courseConfig.questionCount) {
        newIncorrect = courseConfig.questionCount - newCorrect;
      }
    } else {
      newIncorrect = Math.min(courseConfig.questionCount, newIncorrect);
      if (newCorrect + newIncorrect > courseConfig.questionCount) {
        newCorrect = courseConfig.questionCount - newIncorrect;
      }
    }

    const nextInputs = {
      ...inputs,
      [key]: {
        correct: newCorrect,
        incorrect: newIncorrect,
      },
    };

    setInputs(nextInputs);
    if (onResultChange) {
      onResultChange(calculateLgsResults(nextInputs));
    }
  };

  const handleReset = () => {
    const initial = getInitialLgsInputs();
    setInputs(initial);
    if (onResultChange) {
      onResultChange(calculateLgsResults(initial));
    }
  };

  const handleLoadSample = () => {
    const sample = getSampleLgsInputs();
    setInputs(sample);
    if (onResultChange) {
      onResultChange(calculateLgsResults(sample));
    }
  };

  return (
    <div className="space-y-8">
      {/* Üst İşlem Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Ders Bazlı Net Girişi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              3 Yanlış 1 Doğruyu Götürür (Minimum net: 0)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Tümünü Temizle
          </button>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Örnek Deneme Yükle
          </button>
        </div>
      </div>

      {/* 6 Dersin Kartları (2 sütunlu grid) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LGS_COURSES.map((course) => {
          const currentInput = inputs[course.key] || { correct: 0, incorrect: 0 };
          const courseRes = result.courses[course.key];
          const isHighWeight = course.weight === 4;

          return (
            <div
              key={course.key}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
            >
              {/* Kart Başlığı */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {course.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {course.questionCount} Soru
                      </span>
                      <span>•</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          isHighWeight
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        Katsayı: {course.weight}x
                      </span>
                    </div>
                  </div>

                  {/* Anlık Net Rozeti */}
                  <div className="text-right">
                    <span className="text-[10px] font-medium uppercase text-slate-400">
                      Net
                    </span>
                    <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {courseRes.net.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* D ve Y Giriş Alanları */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {/* Doğru Input */}
                  <div>
                    <label
                      htmlFor={`${course.key}-correct`}
                      className="mb-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Doğru
                    </label>
                    <input
                      id={`${course.key}-correct`}
                      type="number"
                      min={0}
                      max={course.questionCount}
                      value={currentInput.correct === 0 ? '' : currentInput.correct}
                      placeholder="0"
                      onChange={(e) =>
                        handleInputChange(course.key, 'correct', e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 text-center text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-400"
                    />
                  </div>

                  {/* Yanlış Input */}
                  <div>
                    <label
                      htmlFor={`${course.key}-incorrect`}
                      className="mb-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400"
                    >
                      <XCircle className="h-3 w-3" />
                      Yanlış
                    </label>
                    <input
                      id={`${course.key}-incorrect`}
                      type="number"
                      min={0}
                      max={course.questionCount - currentInput.correct}
                      value={currentInput.incorrect === 0 ? '' : currentInput.incorrect}
                      placeholder="0"
                      onChange={(e) =>
                        handleInputChange(course.key, 'incorrect', e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 text-center text-sm font-bold text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-rose-400"
                    />
                  </div>

                  {/* Boş (Otomatik Hesaplanır) */}
                  <div>
                    <label
                      htmlFor={`${course.key}-empty`}
                      className="mb-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                    >
                      <HelpCircle className="h-3 w-3" />
                      Boş
                    </label>
                    <div
                      id={`${course.key}-empty`}
                      className="flex h-[38px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-100/50 text-sm font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400"
                    >
                      {courseRes.empty}
                    </div>
                  </div>
                </div>
              </div>

              {/* İlerleme Çubuğu */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Başarı Oranı</span>
                  <span className="font-semibold">
                    %{Math.round((courseRes.net / course.questionCount) * 100)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isHighWeight ? 'bg-indigo-600' : 'bg-slate-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(0, (courseRes.net / course.questionCount) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sonuç Kartı Entegrasyonu */}
      <LgsResultCard result={result} />
    </div>
  );
}
