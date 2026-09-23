'use client';

import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { getLeaderboardEntries } from '@/lib/leaderboard-storage';
import { ONLINE_EXAMS } from '@/lib/online-exams-data';
import { Trophy, Medal, Crown, Target, MapPin, Sparkles, Filter, Calendar } from 'lucide-react';

export function LeaderboardTable() {
  const [period, setPeriod] = useState<'weekly' | 'all-time'>('all-time');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(getLeaderboardEntries(period, selectedExam));
  }, [period, selectedExam]);

  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

  return (
    <div className="space-y-8">
      {/* Filtre ve Dönem Seçimi Barı */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Dönem Butonları */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800/80 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setPeriod('all-time')}
            className={`flex-1 sm:flex-initial rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              period === 'all-time'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            🏆 Genel Sıralama
          </button>
          <button
            type="button"
            onClick={() => setPeriod('weekly')}
            className={`flex-1 sm:flex-initial rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              period === 'weekly'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            ⚡ Bu Haftanın En İyileri
          </button>
        </div>

        {/* Sınav Seçimi Açılır Kutusu */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Deneme Sınavları</option>
            {ONLINE_EXAMS.map((exam) => (
              <option key={exam.slug} value={exam.slug}>
                {exam.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* İlk 3 Podyumu (Görsel Derece Kürsüsü) */}
      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
          {/* 2. Sıra (Gümüş) */}
          {topThree[1] && (
            <div className="order-2 md:order-1 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center">
              <div className="relative mb-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-700 shadow-md">
                  <Medal className="h-8 w-8 text-slate-600" />
                </div>
                <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 text-xs font-black text-white">
                  2
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {topThree[1].nickname}
              </h3>
              {topThree[1].targetSchool && (
                <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <Target className="h-3 w-3" /> {topThree[1].targetSchool}
                </span>
              )}
              <div className="mt-4 w-full rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {topThree[1].score.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 block font-medium">
                  {topThree[1].totalNet} Net &bull; {topThree[1].city || 'Türkiye'}
                </span>
              </div>
            </div>
          )}

          {/* 1. Sıra (Altın Taç Şampiyon) */}
          {topThree[0] && (
            <div className="order-1 md:order-2 rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-amber-50/50 to-white p-7 text-center shadow-xl dark:border-amber-500/50 dark:from-amber-950/20 dark:to-slate-900 flex flex-col items-center transform md:-translate-y-2">
              <div className="relative mb-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 text-amber-900 shadow-lg shadow-amber-500/20">
                  <Crown className="h-10 w-10 text-amber-800" />
                </div>
                <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-white shadow">
                  1
                </span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 mb-1">
                <Sparkles className="h-3 w-3" /> LİDER
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {topThree[0].nickname}
              </h3>
              {topThree[0].targetSchool && (
                <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <Target className="h-3.5 w-3.5" /> {topThree[0].targetSchool}
                </span>
              )}
              <div className="mt-4 w-full rounded-2xl bg-amber-50 p-3.5 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
                <span className="text-3xl font-black text-amber-900 dark:text-amber-300">
                  {topThree[0].score.toFixed(1)}
                </span>
                <span className="text-xs text-amber-700/80 dark:text-amber-400/80 block font-medium">
                  {topThree[0].totalNet} Net &bull; {topThree[0].city || 'Türkiye'}
                </span>
              </div>
            </div>
          )}

          {/* 3. Sıra (Bronz) */}
          {topThree[2] && (
            <div className="order-3 md:order-3 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center">
              <div className="relative mb-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-700 text-white shadow-md">
                  <Medal className="h-8 w-8 text-amber-200" />
                </div>
                <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-black text-white">
                  3
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {topThree[2].nickname}
              </h3>
              {topThree[2].targetSchool && (
                <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <Target className="h-3 w-3" /> {topThree[2].targetSchool}
                </span>
              )}
              <div className="mt-4 w-full rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {topThree[2].score.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 block font-medium">
                  {topThree[2].totalNet} Net &bull; {topThree[2].city || 'Türkiye'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sıralama Tablosu */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Sıra</th>
                <th className="py-3.5 px-4 sm:px-6">Öğrenci Lakabı</th>
                <th className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Hedef Lise / İl</th>
                <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Sınav</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Net</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">LGS Puanı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {entries.map((entry, index) => {
                const rank = index + 1;
                return (
                  <tr
                    key={entry.id}
                    className={`transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40 ${
                      entry.isCurrentUser
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/40 font-bold'
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {rank === 1 && <Crown className="h-4 w-4 text-amber-500" />}
                        {rank === 2 && <Medal className="h-4 w-4 text-slate-400" />}
                        {rank === 3 && <Medal className="h-4 w-4 text-amber-700" />}
                        <span className={`font-black ${rank <= 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                          #{rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 dark:text-white">
                          {entry.nickname}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="rounded-md bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            SEN
                          </span>
                        )}
                      </div>
                      {/* Mobilde Hedef Lise */}
                      {entry.targetSchool && (
                        <span className="block text-[11px] text-slate-400 sm:hidden">
                          {entry.targetSchool}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 hidden sm:table-cell text-slate-600 dark:text-slate-300">
                      <div className="flex flex-col">
                        <span>{entry.targetSchool || 'Belirtilmedi'}</span>
                        {entry.city && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {entry.city}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 hidden md:table-cell text-slate-500 dark:text-slate-400 max-w-xs truncate">
                      {entry.examTitle}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center font-bold text-slate-700 dark:text-slate-200">
                      {entry.totalNet}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 sm:text-base">
                        {entry.score.toFixed(2)}
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
