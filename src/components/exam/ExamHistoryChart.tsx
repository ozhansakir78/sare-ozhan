'use client';

import React, { useState } from 'react';
import type { SavedStudentExam } from '@/types/exam';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

interface ExamHistoryChartProps {
  exams: SavedStudentExam[];
  targetScore?: number;
}

export function ExamHistoryChart({ exams, targetScore = 460 }: ExamHistoryChartProps) {
  const [hoveredExam, setHoveredExam] = useState<SavedStudentExam | null>(null);

  if (exams.length === 0) return null;

  // Kronolojik sırala (eskiden yeniye)
  const sorted = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  // SVG koordinatları
  const width = 600;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;

  const minScore = Math.max(100, Math.floor(Math.min(...sorted.map((e) => e.totalScore)) - 20));
  const maxScore = Math.min(500, Math.ceil(Math.max(...sorted.map((e) => e.totalScore), targetScore) + 20));
  const scoreRange = maxScore - minScore || 1;

  const points = sorted.map((exam, i) => {
    const x =
      sorted.length === 1
        ? width / 2
        : paddingX + (i * (width - 2 * paddingX)) / (sorted.length - 1);
    const y =
      height - paddingY - ((exam.totalScore - minScore) / scoreRange) * (height - 2 * paddingY);
    return { x, y, exam };
  });

  const pathD = points.reduce((acc, curr, index) => {
    return index === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Hedef çizgisinin Y koordinatı
  const targetY =
    height - paddingY - ((targetScore - minScore) / scoreRange) * (height - 2 * paddingY);

  return (
    <div className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-sm dark:border-indigo-900/40 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="h-4 w-4" />
            <span>Puan Gelişim Trendi</span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
            Deneme Puanı İlerleme Grafiği
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            <span>Deneme Puanı</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-rose-500">
            <span className="h-0.5 w-3 bg-rose-400 border-dashed border-t border-rose-500" />
            <span>Hedef ({targetScore})</span>
          </div>
        </div>
      </div>

      {/* SVG Grafik */}
      <div className="relative mt-6 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Yatay ızgara çizgileri */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const scoreVal = Math.round(minScore + ratio * scoreRange);
            const yPos = height - paddingY - ratio * (height - 2 * paddingY);
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={yPos}
                  x2={width - paddingX}
                  y2={yPos}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                  className="dark:stroke-slate-800"
                />
                <text
                  x={paddingX - 8}
                  y={yPos + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  className="font-medium"
                >
                  {scoreVal}
                </text>
              </g>
            );
          })}

          {/* Hedef Çizgisi */}
          {targetY >= paddingY && targetY <= height - paddingY && (
            <line
              x1={paddingX}
              y1={targetY}
              x2={width - paddingX}
              y2={targetY}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
          )}

          {/* Alan Doldurma (Area fill) */}
          {points.length > 1 && (
            <path
              d={`${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`}
              fill="url(#scoreGradient)"
            />
          )}

          {/* Çizgi */}
          <path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Veri Noktaları */}
          {points.map((pt, i) => (
            <g
              key={pt.exam.id}
              className="cursor-pointer transition-transform hover:scale-125"
              onMouseEnter={() => setHoveredExam(pt.exam)}
              onMouseLeave={() => setHoveredExam(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#ffffff"
                stroke="#6366f1"
                strokeWidth="2.5"
              />
              <text
                x={pt.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
                className="font-semibold"
              >
                #{i + 1}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredExam && (
          <div className="pointer-events-none absolute top-2 right-2 rounded-2xl border border-indigo-200 bg-slate-900/95 p-3 text-white shadow-xl backdrop-blur-xs">
            <div className="text-[11px] font-bold text-indigo-300">{hoveredExam.examTitle}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-black">{hoveredExam.totalScore} Puan</span>
              <span className="text-xs text-emerald-400 font-bold">{hoveredExam.totalNet} Net</span>
            </div>
            <div className="mt-0.5 text-[10px] text-slate-400">
              Yüzdelik: %{hoveredExam.calculatedPercentile} • {hoveredExam.examDate}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
