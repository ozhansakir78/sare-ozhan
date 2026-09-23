'use client';

import React, { useState, useRef, useEffect } from 'react';
import { School, Search, Check, Sparkles, MapPin } from 'lucide-react';
import { LGS_HIGH_SCHOOLS, searchHighSchools, normalizeSchoolName } from '@/lib/lgs-high-schools';
import type { LgsHighSchool } from '@/types/school';

interface SchoolAutocompleteInputProps {
  value: string;
  onChange: (schoolName: string, minScore?: number) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const POPULAR_SHORTCUTS = [
  'Kabataş Erkek Lisesi',
  'Galatasaray Lisesi',
  'İstanbul Erkek Lisesi',
  'Ankara Fen Lisesi',
  'İzmir Fen Lisesi',
  'Kadıköy Anadolu Lisesi (KAL)',
];

export function SchoolAutocompleteInput({
  value,
  onChange,
  placeholder = 'Örn: Kabataş Erkek Lisesi, Galatasaray Lisesi...',
  label = 'Hedef Lise',
  required = false,
  className = '',
}: SchoolAutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSchools, setFilteredSchools] = useState<LgsHighSchool[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Değer değiştikçe eşleşen okulları filtrele
  useEffect(() => {
    setFilteredSchools(searchHighSchools(value));
  }, [value]);

  // Dışarı tıklandığında menüyü kapat ve değeri otomatik düzelt/normalize et
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          if (value.trim()) {
            const normalized = normalizeSchoolName(value);
            if (normalized !== value) {
              const matched = LGS_HIGH_SCHOOLS.find((s) => s.name === normalized);
              onChange(normalized, matched ? Math.round(matched.minScore) : undefined);
            }
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, value, onChange]);

  const handleSelect = (school: LgsHighSchool) => {
    onChange(school.name, Math.round(school.minScore));
    setIsOpen(false);
  };

  const handleBlur = () => {
    if (value.trim()) {
      const normalized = normalizeSchoolName(value);
      if (normalized !== value) {
        const matched = LGS_HIGH_SCHOOLS.find((s) => s.name === normalized);
        onChange(normalized, matched ? Math.round(matched.minScore) : undefined);
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
            Yazdıkça resmi lise adı önerilir
          </span>
        </div>
      )}

      {/* Input Kutusu */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <School className="h-4 w-4" />
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
      {isOpen && filteredSchools.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl z-50 dark:border-slate-700 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Resmi LGS Taban Puanları &amp; Liseler
          </div>
          {filteredSchools.map((school) => (
            <button
              key={school.id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // onBlur tetiklenmeden önce seçilsin
                handleSelect(school);
              }}
              className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition cursor-pointer group"
            >
              <div className="min-w-0 flex-1 pr-2">
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {school.name}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <MapPin className="h-2.5 w-2.5" />
                  <span>{school.city}</span>
                  <span>&bull;</span>
                  <span className="capitalize">{school.type} Lisesi</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                  {school.minScore} Puan
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Hızlı Seçim Kısayolları (Popular Chips) */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-500" /> Popüler:
        </span>
        {POPULAR_SHORTCUTS.map((schoolName) => (
          <button
            key={schoolName}
            type="button"
            onClick={() => {
              const matched = LGS_HIGH_SCHOOLS.find((s) => s.name === schoolName);
              if (matched) handleSelect(matched);
            }}
            className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
              value === schoolName
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400'
            }`}
          >
            {schoolName.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
