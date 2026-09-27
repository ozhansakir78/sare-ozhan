'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface ExamTimerProps {
  durationMinutes: number;
  initialRemainingSeconds?: number;
  onTimeUp: () => void;
  onTick?: (remainingSeconds: number) => void;
}

export function ExamTimer({
  durationMinutes,
  initialRemainingSeconds,
  onTimeUp,
  onTick,
}: ExamTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    if (initialRemainingSeconds !== undefined && initialRemainingSeconds > 0) {
      return initialRemainingSeconds;
    }
    return durationMinutes * 60;
  });

  useEffect(() => {
    if (initialRemainingSeconds !== undefined && initialRemainingSeconds > 0) {
      setSecondsRemaining(initialRemainingSeconds);
    } else {
      setSecondsRemaining(durationMinutes * 60);
    }
  }, [durationMinutes, initialRemainingSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        const next = prev - 1;
        if (onTick) onTick(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      onTimeUp();
    }
  }, [secondsRemaining, onTimeUp]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isUrgent = secondsRemaining < 180; // Son 3 dakika

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow-xs ${
        isUrgent
          ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400'
          : 'bg-indigo-50/80 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-300'
      }`}
    >
      {isUrgent ? (
        <AlertCircle className="h-4 w-4 text-rose-500" />
      ) : (
        <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      )}
      <span className="font-mono text-sm tracking-tight">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      {isUrgent && <span className="text-[10px] hidden sm:inline">Son Dakikalar!</span>}
    </div>
  );
}
