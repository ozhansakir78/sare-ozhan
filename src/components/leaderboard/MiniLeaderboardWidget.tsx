'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LeaderboardEntry } from '@/types/leaderboard';
import { getLeaderboardEntries } from '@/lib/leaderboard-storage';
import { getStoredExams } from '@/lib/exam-storage';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Trophy,
  Crown,
  Medal,
  Sparkles,
  ArrowRight,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';

export function MiniLeaderboardWidget() {
  const { profile, user } = useAuth();
  const [topTen, setTopTen] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userBestScore, setUserBestScore] = useState<number | null>(null);

  useEffect(() => {
    // Tüm zamanlar liderlik tablosunu çek
    const entries = getLeaderboardEntries('all-time');
    setTopTen(entries.slice(0, 10));

    // Kullanıcının denemelerinden en yüksek skorunu bul
    const exams = getStoredExams();
    if (exams.length > 0) {
      const best = Math.max(...exams.map((e) => e.totalScore));
      setUserBestScore(best);

      // Sıralamayı hesapla: best skordan daha yüksek puan alan kaç kişi var?
      const higherCount = entries.filter((e) => e.score > best).length;
      setUserRank(higherCount + 1);
    } else {
      // Eğer liderlik tablosunda isCurrentUser bayraklı giriş varsa onu bul
      const myEntryIndex = entries.findIndex((e) => e.isCurrentUser);
      if (myEntryIndex !== -1) {
        setUserRank(myEntryIndex + 1);
        setUserBestScore(entries[myEntryIndex].score);
      }
    }
  }, []);

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Sen';

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
      {/* Widget Başlığı */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-500/10 via-indigo-500/5 to-transparent px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>LGS Liderlik Tablosu</span>
              <span className="rounded-md bg-amber-100 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                İLK 10
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Türkiye Geneli Canlı Sıralama</p>
          </div>
        </div>

        <Link
          href="/liderlik-tablosu"
          className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition"
        >
          <span>Tüm Liste</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* İlk 10 Öğrenci Listesi */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[380px] overflow-y-auto">
        {topTen.map((entry, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          const isSecond = rank === 2;
          const isThird = rank === 3;

          return (
            <div
              key={entry.id || index}
              className={`flex items-center justify-between px-3.5 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                isFirst
                  ? 'bg-amber-50/40 dark:bg-amber-950/20'
                  : ''
              }`}
            >
              {/* Sıra Numarası ve İsim */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center font-black text-xs">
                  {isFirst && <Crown className="h-4 w-4 text-amber-500 fill-amber-400" />}
                  {isSecond && <Medal className="h-4 w-4 text-slate-400" />}
                  {isThird && <Medal className="h-4 w-4 text-amber-700" />}
                  {!isFirst && !isSecond && !isThird && (
                    <span className="text-[11px] font-bold text-slate-400">#{rank}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[120px] sm:max-w-[140px]">
                      {entry.nickname}
                    </span>
                    {entry.city && (
                      <span className="hidden sm:inline text-[10px] text-slate-400">
                        ({entry.city})
                      </span>
                    )}
                  </div>
                  {entry.targetSchool && (
                    <p className="truncate text-[10px] text-indigo-600 dark:text-indigo-400 max-w-[130px]">
                      {entry.targetSchool}
                    </p>
                  )}
                </div>
              </div>

              {/* Skor ve Net */}
              <div className="text-right shrink-0">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {entry.score.toFixed(1)}
                </span>
                <span className="block text-[10px] font-medium text-slate-400">
                  {entry.totalNet.toFixed(1)} Net
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alt Sabit Kısım: Öğrencinin Sırası ve Kullanıcı İsmi */}
      <div className="mt-auto border-t-2 border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-violet-50/80 to-indigo-50/90 p-3.5 dark:border-indigo-900/60 dark:from-indigo-950/60 dark:via-slate-900 dark:to-indigo-950/60">
        <div className="flex items-center justify-between gap-3">
          {/* Kullanıcı Profil Bilgisi */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xs">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                  {displayName}
                </span>
                <span className="rounded-full bg-indigo-100 px-1.5 py-0.2 text-[9px] font-extrabold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  SEN
                </span>
              </div>
              <div className="text-[11px] font-bold">
                {userRank ? (
                  <span className="text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Sıran: #{userRank} (En İyi: {userBestScore?.toFixed(1)} P)
                  </span>
                ) : (
                  <span className="text-slate-500 dark:text-slate-400">
                    Henüz sıralamada değilsin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sıralamayı Yükselt Butonu */}
          <Link
            href="/deneme-coz"
            className="shrink-0 inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-2 text-[11px] font-black text-white shadow-xs hover:bg-indigo-700 transition"
          >
            <Zap className="h-3 w-3 text-amber-300" />
            <span>{userRank ? 'Yüksel' : 'Sıraya Gir'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
