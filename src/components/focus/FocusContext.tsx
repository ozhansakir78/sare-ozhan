'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ambientSound, SoundType } from '@/lib/ambient-sound';

export type FocusMode = 'focus' | 'short_break' | 'long_break';

export const FOCUS_MODE_CONFIG: Record<FocusMode, { title: string; defaultMinutes: number; badgeColor: string }> = {
  focus: { title: '🎯 Odaklanma Seansı', defaultMinutes: 25, badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300' },
  short_break: { title: '☕ Kısa Mola', defaultMinutes: 5, badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300' },
  long_break: { title: '🌴 Uzun Dinlenme', defaultMinutes: 15, badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300' },
};

const STATS_STORAGE_KEY = 'lgs_focus_stats_v1';

interface DailyStats {
  date: string;
  completedCycles: number;
  totalMinutes: number;
}

interface FocusContextType {
  mode: FocusMode;
  minutes: number;
  secondsLeft: number;
  isActive: boolean;
  activeSound: SoundType;
  soundVolume: number;
  completedToday: number;
  totalMinutesToday: number;
  startTimer: () => void;
  pauseTimer: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  switchMode: (newMode: FocusMode, customMins?: number) => void;
  toggleSound: (type: SoundType) => void;
  setSoundVolume: (volume: number) => void;
  stopSound: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<FocusMode>('focus');
  const [minutes, setMinutes] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeSound, setActiveSound] = useState<SoundType>('none');
  const [soundVolume, setSoundVolumeState] = useState<number>(50);
  const [completedToday, setCompletedToday] = useState<number>(0);
  const [totalMinutesToday, setTotalMinutesToday] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  // Günlük İstatistikleri Yükle
  useEffect(() => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) {
        const parsed: DailyStats = JSON.parse(saved);
        if (parsed.date === todayStr) {
          setCompletedToday(parsed.completedCycles || 0);
          setTotalMinutesToday(parsed.totalMinutes || 0);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveStats = useCallback((addMinutes: number) => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      setCompletedToday((prev) => {
        const newCount = prev + 1;
        setTotalMinutesToday((prevMins) => {
          const newMinutes = prevMins + addMinutes;
          const data: DailyStats = {
            date: todayStr,
            completedCycles: newCount,
            totalMinutes: newMinutes,
          };
          localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(data));
          return newMinutes;
        });
        return newCount;
      });
    } catch {
      // ignore
    }
  }, []);

  const switchMode = useCallback((newMode: FocusMode, customMins?: number) => {
    setIsActive(false);
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const mins = customMins ?? FOCUS_MODE_CONFIG[newMode].defaultMinutes;
    setMode(newMode);
    setMinutes(mins);
    setSecondsLeft(mins * 60);
  }, []);

  // Zamanlayıcı Döngüsü
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }
            ambientSound.playCompletionChime();

            if (mode === 'focus') {
              saveStats(minutes);
              switchMode('short_break');
            } else {
              switchMode('focus');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isActive, mode, minutes, saveStats, switchMode]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const toggleTimer = () => setIsActive((prev) => !prev);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(minutes * 60);
  };
  const skipSession = () => {
    if (mode === 'focus') {
      switchMode('short_break');
    } else {
      switchMode('focus');
    }
  };

  const toggleSound = (type: SoundType) => {
    if (activeSound === type) {
      ambientSound.stop();
      setActiveSound('none');
    } else {
      ambientSound.playSound(type, soundVolume / 100);
      setActiveSound(type);
    }
  };

  const setSoundVolume = (vol: number) => {
    setSoundVolumeState(vol);
    ambientSound.setVolume(vol / 100);
  };

  const stopSound = () => {
    ambientSound.stop();
    setActiveSound('none');
  };

  return (
    <FocusContext.Provider
      value={{
        mode,
        minutes,
        secondsLeft,
        isActive,
        activeSound,
        soundVolume,
        completedToday,
        totalMinutesToday,
        startTimer,
        pauseTimer,
        toggleTimer,
        resetTimer,
        skipSession,
        switchMode,
        toggleSound,
        setSoundVolume,
        stopSound,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
}
