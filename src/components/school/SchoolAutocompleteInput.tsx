'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { School, Check, Sparkles, MapPin, Building2, GraduationCap } from 'lucide-react';
import { LGS_HIGH_SCHOOLS, searchHighSchools, normalizeSchoolName } from '@/lib/lgs-high-schools';
import { YKS_TOP_UNIVERSITIES, searchUniversities } from '@/lib/yks-universities';
import type { LgsHighSchool } from '@/types/school';

interface SchoolAutocompleteInputProps {
  value: string;
  onChange: (schoolName: string, minScore?: number) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  mode?: 'lise' | 'uni' | 'all';
}

export interface TargetSchoolMatch {
  id: string;
  fullName: string;
  title: string;
  subtitle: string;
  city: string;
  category: 'lise' | 'universite';
  badge: string;
  minScore?: number;
}

const POPULAR_HIGH_SCHOOLS = [
  'Kabataş Erkek Lisesi',
  'Galatasaray Lisesi',
  'İstanbul Erkek Lisesi',
  'Ankara Fen Lisesi',
  'İzmir Fen Lisesi',
  'Kadıköy Anadolu Lisesi',
];

const POPULAR_UNIVERSITIES = [
  'Boğaziçi Üniversitesi (Bilgisayar Müh.)',
  'ODTÜ (Elektrik-Elektronik Müh.)',
  'İTÜ (Yapay Zekâ Müh.)',
  'Koç Üniversitesi (Tıp Fakültesi)',
  'Hacettepe Üniversitesi (Tıp)',
  'Galatasaray Üniversitesi (Hukuk)',
];

export function SchoolAutocompleteInput({
  value,
  onChange,
  placeholder = 'Örn: Kabataş Erkek Lisesi, Boğaziçi Üniversitesi, ODTÜ...',
  label = 'Hedef Okul (Lise / Üniversite)',
  required = false,
  className = '',
  mode = 'all',
}: SchoolAutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'lise' | 'uni'>(
    mode === 'uni' ? 'uni' : mode === 'lise' ? 'lise' : 'all'
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'uni') setActiveTab('uni');
    else if (mode === 'lise') setActiveTab('lise');
    else setActiveTab('all');
  }, [mode]);

  // Değer değiştikçe eşleşen hem lise hem üniversiteleri filtrele
  const matches = useMemo<TargetSchoolMatch[]>(() => {
    const list: TargetSchoolMatch[] = [];

    // 1. Liseler (LGS)
    if (mode !== 'uni' && (activeTab === 'all' || activeTab === 'lise')) {
      const highSchools = searchHighSchools(value);
      for (const s of highSchools) {
        list.push({
          id: `hs-${s.id}`,
          fullName: s.name,
          title: s.name,
          subtitle: `${s.type.toUpperCase()} Lisesi • LGS Taban: ${s.minScore}`,
          city: s.city,
          category: 'lise',
          badge: `${s.minScore} Puan`,
          minScore: Math.round(s.minScore),
        });
      }
    }

    // 2. Üniversiteler (YKS)
    if (mode !== 'lise' && (activeTab === 'all' || activeTab === 'uni')) {
      const unis = searchUniversities(value);
      for (const u of unis) {
        list.push({
          id: `uni-${u.id}`,
          fullName: `${u.name} (${u.department})`,
          title: u.name,
          subtitle: `${u.department} (${u.scoreType}) • OBP: ${u.targetObp}`,
          city: u.city,
          category: 'universite',
          badge: `${u.scoreType} • ${u.minScore}`,
          minScore: Math.round(u.minScore),
        });
      }
    }

    return list;
  }, [value, activeTab, mode]);

  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          if (value.trim()) {
            if (mode === 'lise') {
              const normalized = normalizeSchoolName(value);
              if (normalized !== value) {
                const matched = LGS_HIGH_SCHOOLS.find((s) => s.name === normalized);
                onChange(normalized, matched ? Math.round(matched.minScore) : undefined);
              }
            } else if (mode === 'uni') {
              const matched = YKS_TOP_UNIVERSITIES.find(
                (u) =>
                  `${u.name} (${u.department})`.toLowerCase() === value.toLowerCase() ||
                  u.name.toLowerCase() === value.toLowerCase()
              );
              if (matched) {
                onChange(`${matched.name} (${matched.department})`, matched.minScore);
              }
            }
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, value, onChange, mode]);

  const handleSelect = (item: TargetSchoolMatch) => {
    onChange(item.fullName, item.minScore);
    setIsOpen(false);
  };

  const handleBlur = () => {
    if (value.trim()) {
      if (mode === 'lise') {
        const normalized = normalizeSchoolName(value);
        if (normalized !== value) {
          const matched = LGS_HIGH_SCHOOLS.find((s) => s.name === normalized);
          onChange(normalized, matched ? Math.round(matched.minScore) : undefined);
        }
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {label}
          </label>
          <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
            {mode === 'uni'
              ? "Yazdıkça Türkiye'nin en iyi üniversite ve bölümleri önerilir"
              : "Yazdıkça Türkiye'nin en iyi okulları önerilir"}
          </span>
        </div>
      )}

      {/* Input Kutusu */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          {mode === 'uni' ? (
            <GraduationCap className="h-4 w-4 text-emerald-500" />
          ) : (
            <School className="h-4 w-4 text-indigo-500" />
          )}
        </span>
        <input
          type="text"
          required={required}
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-9 pl-9 text-xs text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        {value && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-500">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      {/* Açılır Öneri Listesi (Dropdown) */}
      {isOpen && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-50 dark:border-slate-700 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150">
          {/* Kategori Filtresi (Yalnızca 'all' modunda göster) */}
          {mode === 'all' && (
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1.5 dark:border-slate-800 text-[10px]">
              <span className="font-bold uppercase text-slate-400">Önerilen Hedefler</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActiveTab('all');
                  }}
                  className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  Tümü
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActiveTab('lise');
                  }}
                  className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                    activeTab === 'lise'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  🏫 Liseler
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActiveTab('uni');
                  }}
                  className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                    activeTab === 'uni'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  🎓 Üniversiteler
                </button>
              </div>
            </div>
          )}

          <div className="space-y-0.5">
            {matches.map((item) => (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
                className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition cursor-pointer group"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                        item.category === 'lise'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {item.category === 'lise' ? 'LİSE (LGS)' : 'ÜNİVERSİTE (YKS)'}
                    </span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                      {item.title}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    <MapPin className="h-2.5 w-2.5 shrink-0" />
                    <span>{item.city}</span>
                    <span>&bull;</span>
                    <span className="truncate">{item.subtitle}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {item.badge}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hızlı Seçim Kısayolları (Popular Chips) */}
      <div className="mt-2.5 space-y-1.5">
        {/* Lise Seçenekleri (Sadece 'lise' veya 'all' modunda görünür) */}
        {mode !== 'uni' && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mr-1">
              🏫 Lise:
            </span>
            {POPULAR_HIGH_SCHOOLS.map((schoolName) => (
              <button
                key={schoolName}
                type="button"
                onClick={() => {
                  const matched = LGS_HIGH_SCHOOLS.find((s) => s.name === schoolName);
                  onChange(schoolName, matched ? Math.round(matched.minScore) : undefined);
                }}
                className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                  value === schoolName
                    ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400'
                }`}
              >
                {schoolName.split(' ')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Üniversite Seçenekleri (Sadece 'uni' veya 'all' modunda görünür) */}
        {mode !== 'lise' && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mr-1">
              🎓 Üniversite:
            </span>
            {POPULAR_UNIVERSITIES.map((uniName) => {
              const shortName = uniName.split('(')[0].trim().split(' ')[0];
              const isSelected = value.toLowerCase().includes(shortName.toLowerCase());
              return (
                <button
                  key={uniName}
                  type="button"
                  onClick={() => {
                    const matched = YKS_TOP_UNIVERSITIES.find((u) => `${u.name} (${u.department})` === uniName);
                    onChange(uniName, matched ? matched.minScore : undefined);
                  }}
                  className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 shadow-2xs font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400'
                  }`}
                >
                  {shortName}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
