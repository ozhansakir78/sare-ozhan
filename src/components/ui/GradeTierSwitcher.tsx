'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGradeTier, GradeTier } from '@/lib/grade-tier';
import { GraduationCap, School, ChevronDown, Check, Sparkles } from 'lucide-react';

interface GradeTierSwitcherProps {
  variant?: 'dropdown' | 'segmented';
  compact?: boolean;
  className?: string;
  onSelect?: (tier: GradeTier) => void;
}

export function GradeTierSwitcher({
  variant = 'dropdown',
  compact = false,
  className = '',
  onSelect,
}: GradeTierSwitcherProps) {
  const { tier, setTier, isLise1, mounted } = useGradeTier();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!mounted) {
    return (
      <div className={`h-8 w-32 rounded-xl bg-slate-800/60 animate-pulse shrink-0 ${className}`} />
    );
  }

  const handleSelect = (selectedTier: GradeTier) => {
    setTier(selectedTier);
    setIsOpen(false);
    if (onSelect) {
      onSelect(selectedTier);
    }
  };

  // 1. DROPDOWN MODU (Navbar ve dar alanlar için ideal, sıfır taşma, profesyonel SaaS görünümü)
  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block text-left shrink-0 ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap shadow-xs ${
            isLise1
              ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-500/60'
              : 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-500/60'
          }`}
          title="Eğitim Kademesini Değiştir"
        >
          {isLise1 ? (
            <School className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : (
            <GraduationCap className="h-4 w-4 text-indigo-400 shrink-0" />
          )}

          <span className="shrink-0 whitespace-nowrap tracking-tight font-black">
            {isLise1 ? '9. Sınıf (Lise 1)' : '8. Sınıf (LGS)'}
          </span>

          <ChevronDown
            className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </button>

        {/* Açılır Menü */}
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-700 bg-slate-900/98 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
            <div className="px-2.5 py-1.5 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Eğitim Kademesini Seç
            </div>

            <div className="mt-1 space-y-1">
              {/* 8. Sınıf LGS */}
              <button
                type="button"
                onClick={() => handleSelect('lgs')}
                className={`flex w-full items-center justify-between gap-3 rounded-xl p-2.5 text-left text-xs font-bold transition cursor-pointer ${
                  tier === 'lgs'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      tier === 'lgs' ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black truncate">8. Sınıf (LGS 2027)</div>
                    <div
                      className={`text-[10px] font-normal truncate ${
                        tier === 'lgs' ? 'text-indigo-100' : 'text-slate-400'
                      }`}
                    >
                      Puan &amp; Dilim Hesaplama, LGS Denemeleri
                    </div>
                  </div>
                </div>
                {tier === 'lgs' && <Check className="h-4 w-4 shrink-0 text-white" />}
              </button>

              {/* 9. Sınıf Lise 1 */}
              <button
                type="button"
                onClick={() => handleSelect('lise1')}
                className={`flex w-full items-center justify-between gap-3 rounded-xl p-2.5 text-left text-xs font-bold transition cursor-pointer ${
                  tier === 'lise1'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      tier === 'lise1' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400'
                    }`}
                  >
                    <School className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black truncate flex items-center gap-1.5">
                      <span>9. Sınıf (Lise 1)</span>
                      <span className="rounded-md bg-emerald-400/20 px-1 py-0.2 text-[9px] font-black text-emerald-300 border border-emerald-400/30">
                        YENİ
                      </span>
                    </div>
                    <div
                      className={`text-[10px] font-normal truncate ${
                        tier === 'lise1' ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      MEB Ortak Yazılı, OBP &amp; YKS Temel
                    </div>
                  </div>
                </div>
                {tier === 'lise1' && <Check className="h-4 w-4 shrink-0 text-white" />}
              </button>

              {/* Gelecek Kademeler (Devre dışı önizleme) */}
              <div className="pt-1.5 mt-1 border-t border-slate-800 px-2 py-1 text-[10px] text-slate-500 flex items-center justify-between">
                <span>10, 11 ve 12. Sınıf (YKS)</span>
                <span className="font-semibold text-amber-400/80">Yakında</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SEGMENTED MODU (Ana Sayfa Hero, Profil ve geniş alanlar için)
  return (
    <div
      className={`inline-flex items-center rounded-2xl bg-slate-950/80 p-1 border border-slate-800 shadow-sm shrink-0 whitespace-nowrap flex-nowrap ${className}`}
      role="group"
      aria-label="Eğitim Kademesi Seçimi"
    >
      <button
        type="button"
        onClick={() => handleSelect('lgs')}
        className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap ${
          tier === 'lgs'
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-white/10'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <GraduationCap className={`h-4 w-4 shrink-0 ${tier === 'lgs' ? 'text-white' : 'text-indigo-400'}`} />
        <span className="tracking-tight shrink-0 whitespace-nowrap">8. Sınıf (LGS)</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('lise1')}
        className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap ${
          tier === 'lise1'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-white/10'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <School className={`h-4 w-4 shrink-0 ${tier === 'lise1' ? 'text-white' : 'text-emerald-400'}`} />
        <span className="tracking-tight shrink-0 whitespace-nowrap">9. Sınıf (Lise 1)</span>
        <span className="rounded-md bg-emerald-500/20 px-1 py-0.2 text-[9px] font-black text-emerald-300 border border-emerald-500/30 shrink-0 whitespace-nowrap">
          YENİ
        </span>
      </button>
    </div>
  );
}
