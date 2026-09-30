'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGradeTier, GradeTier, VALID_TIERS } from '@/lib/grade-tier';
import { GraduationCap, School, BookOpen, Layers, Trophy, ChevronDown, Check, Sparkles } from 'lucide-react';

interface GradeTierSwitcherProps {
  variant?: 'dropdown' | 'segmented';
  compact?: boolean;
  className?: string;
  onSelect?: (tier: GradeTier) => void;
}

interface TierUIConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortLabel: string;
  sublabel: string;
  badge?: string;
  badgeColor?: string;
  buttonBorder: string;
  buttonBg: string;
  buttonText: string;
  iconColor: string;
  activeItemBg: string;
}

const TIER_UI_PROPS: Record<GradeTier, TierUIConfig> = {
  lgs: {
    icon: GraduationCap,
    label: '8. Sınıf (LGS 2027)',
    shortLabel: '8. Sınıf (LGS)',
    sublabel: 'Puan & Dilim Hesaplama, LGS Denemeleri',
    buttonBorder: 'border-indigo-500/40 hover:border-indigo-500/60',
    buttonBg: 'bg-indigo-950/40 hover:bg-indigo-900/50',
    buttonText: 'text-indigo-300',
    iconColor: 'text-indigo-400',
    activeItemBg: 'bg-indigo-600',
  },
  lise1: {
    icon: School,
    label: '9. Sınıf (Lise 1)',
    shortLabel: '9. Sınıf (Lise 1)',
    sublabel: 'MEB Ortak Yazılı Provaları & TYT Temel',
    badge: 'Maarif Modeli',
    badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
    buttonBorder: 'border-emerald-500/40 hover:border-emerald-500/60',
    buttonBg: 'bg-emerald-950/40 hover:bg-emerald-900/50',
    buttonText: 'text-emerald-300',
    iconColor: 'text-emerald-400',
    activeItemBg: 'bg-emerald-600',
  },
  lise2: {
    icon: BookOpen,
    label: '10. Sınıf (Lise 2)',
    shortLabel: '10. Sınıf (Lise 2)',
    sublabel: 'MEB Ortak Yazılıları & 11. Sınıf Alan Seçimi',
    badge: 'Alan Seçimi',
    badgeColor: 'bg-teal-400/20 text-teal-300 border-teal-400/30',
    buttonBorder: 'border-teal-500/40 hover:border-teal-500/60',
    buttonBg: 'bg-teal-950/40 hover:bg-teal-900/50',
    buttonText: 'text-teal-300',
    iconColor: 'text-teal-400',
    activeItemBg: 'bg-teal-600',
  },
  lise3: {
    icon: Layers,
    label: '11. Sınıf (Lise 3)',
    shortLabel: '11. Sınıf (Lise 3)',
    sublabel: 'Alan Dersleri (Sayısal/EA/Sözel) & Erken TYT',
    badge: 'Alan Dersleri',
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    buttonBorder: 'border-amber-500/40 hover:border-amber-500/60',
    buttonBg: 'bg-amber-950/40 hover:bg-amber-900/50',
    buttonText: 'text-amber-300',
    iconColor: 'text-amber-400',
    activeItemBg: 'bg-amber-600',
  },
  yks: {
    icon: Trophy,
    label: '12. Sınıf & Mezun (YKS)',
    shortLabel: 'YKS (TYT/AYT)',
    sublabel: 'TYT (120 Soru), AYT (160 Soru), YÖK Atlas',
    badge: 'ZİRVE',
    badgeColor: 'bg-rose-400/20 text-rose-300 border-rose-400/30',
    buttonBorder: 'border-rose-500/40 hover:border-rose-500/60',
    buttonBg: 'bg-rose-950/40 hover:bg-rose-900/50',
    buttonText: 'text-rose-300',
    iconColor: 'text-rose-400',
    activeItemBg: 'bg-rose-600',
  },
};

export function GradeTierSwitcher({
  variant = 'dropdown',
  compact = false,
  className = '',
  onSelect,
}: GradeTierSwitcherProps) {
  const { tier, setTier, mounted } = useGradeTier();
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

  const currentUI = TIER_UI_PROPS[tier] || TIER_UI_PROPS.lgs;
  const CurrentIcon = currentUI.icon;

  const handleSelect = (selectedTier: GradeTier) => {
    setTier(selectedTier);
    setIsOpen(false);
    if (onSelect) {
      onSelect(selectedTier);
    }
  };

  // 1. DROPDOWN MODU (Navbar ve kompakt alanlar için ideal)
  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block text-left shrink-0 ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap shadow-xs ${currentUI.buttonBorder} ${currentUI.buttonBg} ${currentUI.buttonText}`}
          title="Eğitim Kademesini Değiştir"
        >
          <CurrentIcon className={`h-4 w-4 ${currentUI.iconColor} shrink-0`} />

          <span className="shrink-0 whitespace-nowrap tracking-tight font-black">
            {currentUI.shortLabel}
          </span>

          <ChevronDown
            className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </button>

        {/* Açılır Menü (Tüm 5 Kademe) */}
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-slate-700 bg-slate-900/98 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
            <div className="px-2.5 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>Eğitim Kademesini Seç</span>
              <span className="text-indigo-400 flex items-center gap-1 font-semibold normal-case">
                <Sparkles className="h-3 w-3" />
                8 - 12 &amp; YKS
              </span>
            </div>

            <div className="mt-1 space-y-1">
              {VALID_TIERS.map((tierKey) => {
                const itemUI = TIER_UI_PROPS[tierKey];
                const ItemIcon = itemUI.icon;
                const isSelected = tier === tierKey;

                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => handleSelect(tierKey)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl p-2.5 text-left text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? `${itemUI.activeItemBg} text-white shadow-xs`
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          isSelected ? 'bg-white/20 text-white' : `${itemUI.buttonBg} ${itemUI.iconColor}`
                        }`}
                      >
                        <ItemIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-black truncate flex items-center gap-1.5">
                          <span>{itemUI.label}</span>
                          {itemUI.badge && (
                            <span
                              className={`rounded-md px-1.5 py-0.2 text-[9px] font-black border shrink-0 ${
                                isSelected ? 'bg-white/20 text-white border-white/30' : itemUI.badgeColor
                              }`}
                            >
                              {itemUI.badge}
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-[10px] font-normal truncate ${
                            isSelected ? 'text-white/80' : 'text-slate-400'
                          }`}
                        >
                          {itemUI.sublabel}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SEGMENTED MODU (Hero alanı, profil ve yatay menüler için kaydırılabilir şerit)
  return (
    <div
      className={`inline-flex items-center rounded-2xl bg-slate-950/80 p-1 border border-slate-800 shadow-sm shrink-0 whitespace-nowrap overflow-x-auto max-w-full no-scrollbar ${className}`}
      role="group"
      aria-label="Eğitim Kademesi Seçimi"
    >
      {VALID_TIERS.map((tierKey) => {
        const itemUI = TIER_UI_PROPS[tierKey];
        const ItemIcon = itemUI.icon;
        const isSelected = tier === tierKey;

        return (
          <button
            key={tierKey}
            type="button"
            onClick={() => handleSelect(tierKey)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap ${
              isSelected
                ? `${itemUI.activeItemBg} text-white shadow-md ring-1 ring-white/10`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ItemIcon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-white' : itemUI.iconColor}`} />
            <span className="tracking-tight shrink-0 whitespace-nowrap">{itemUI.shortLabel}</span>
            {itemUI.badge && isSelected && (
              <span className="rounded-md bg-white/20 px-1 py-0.2 text-[9px] font-black text-white border border-white/30 shrink-0">
                {itemUI.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
