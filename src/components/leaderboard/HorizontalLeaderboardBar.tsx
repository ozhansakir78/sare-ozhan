'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LeaderboardEntry } from '@/types/leaderboard';
import { getLeaderboardEntries, INITIAL_ENTRIES } from '@/lib/leaderboard-storage';
import { getStoredExams } from '@/lib/exam-storage';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Trophy,
  Crown,
  Medal,
  ArrowRight,
  TrendingUp,
  User,
  ChevronRight,
} from 'lucide-react';

export function HorizontalLeaderboardBar() {
  const { profile, user } = useAuth();
  const [topEntries, setTopEntries] = useState<LeaderboardEntry[]>(() => INITIAL_ENTRIES.slice(0, 5));
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userBestScore, setUserBestScore] = useState<number | null>(null);

  useEffect(() => {
    // Tüm zamanlar liderlik tablosundan ilk 5 öğrenciyi al (yer kaplamaması için)
    const entries = getLeaderboardEntries('all-time');
    setTopEntries(entries.slice(0, 5));

    // Kullanıcının kayıtlı denemelerinden en yüksek skorunu bul
    const exams = getStoredExams();
    if (exams.length > 0) {
      const best = Math.max(...exams.map((e) => e.totalScore));
      setUserBestScore(best);

      const higherCount = entries.filter((e) => e.score > best).length;
      setUserRank(higherCount + 1);
    } else {
      const myEntryIndex = entries.findIndex((e) => e.isCurrentUser);
      if (myEntryIndex !== -1) {
        setUserRank(myEntryIndex + 1);
        setUserBestScore(entries[myEntryIndex].score);
      }
    }
  }, []);

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Sen';

  return (
    <div className="border-b border-slate-800 bg-slate-900 text-slate-100 py-1.5 px-3 sm:px-6 shadow-xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 text-xs overflow-x-auto no-scrollbar">
        {/* Sol: Liderlik Rozeti */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <Trophy className="h-3 w-3" />
          </span>
          <span className="font-extrabold text-[11px] text-amber-400 uppercase tracking-wider hidden sm:inline">
            Canlı Ligi:
          </span>
        </div>

        {/* Orta: İlk 5 Sıralama (Yatay Kaydırılabilir Kapsüller) */}
        <div className="flex items-center gap-2 min-w-0 overflow-x-auto no-scrollbar py-0.5">
          {topEntries.map((entry, index) => {
            const rank = index + 1;
            const isFirst = rank === 1;
            const isSecond = rank === 2;
            const isThird = rank === 3;

            return (
              <div
                key={entry.id || index}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold whitespace-nowrap transition shrink-0 ${
                  isFirst
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                    : isSecond
                    ? 'bg-slate-800 border border-slate-700 text-slate-200'
                    : isThird
                    ? 'bg-amber-900/20 border border-amber-800/40 text-amber-300'
                    : 'bg-slate-800/60 border border-slate-700/60 text-slate-300'
                }`}
              >
                <span className="flex items-center font-bold">
                  {isFirst && <Crown className="h-3 w-3 text-amber-400 mr-0.5" />}
                  {isSecond && <Medal className="h-3 w-3 text-slate-300 mr-0.5" />}
                  {isThird && <Medal className="h-3 w-3 text-amber-600 mr-0.5" />}
                  {!isFirst && !isSecond && !isThird && `#${rank}`}
                </span>
                <span className="font-bold max-w-[90px] sm:max-w-[110px] truncate">
                  {entry.nickname}
                </span>
                <span className="font-mono font-bold text-amber-400 text-[10px]">
                  {entry.score.toFixed(1)}P
                </span>
              </div>
            );
          })}
        </div>

        {/* Sağ: Öğrencinin Sırası ve Kullanıcı İsmi */}
        <div className="flex items-center gap-2 shrink-0 ml-auto pl-2 border-l border-slate-700">
          <Link
            href="/profil"
            title="Öğrenci Profilim ve Hedeflerim"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400/80 hover:bg-indigo-900/60 px-2.5 py-1 text-[11px] transition cursor-pointer group"
          >
            <User className="h-3 w-3 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-200 max-w-[80px] sm:max-w-[100px] truncate">
              {displayName}
            </span>
            <span className="text-slate-500">&bull;</span>
            {userRank ? (
              <span className="font-black text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" />
                Sıran #{userRank}
              </span>
            ) : (
              <span className="text-amber-400 font-bold">
                Sıralamaya Gir
              </span>
            )}
          </Link>

          <Link
            href="/liderlik-tablosu"
            className="hidden md:inline-flex items-center gap-0.5 text-[11px] font-bold text-slate-400 hover:text-white transition whitespace-nowrap"
          >
            <span>Tüm Liste</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
