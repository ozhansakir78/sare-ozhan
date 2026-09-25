'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  School,
  GraduationCap,
  MapPin,
  Building2,
  Search,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { getAllCities, getDistrictsForCity } from '@/lib/turkey-locations';
import {
  LGS_HIGH_SCHOOLS,
  getHighSchoolsByLocation,
  searchHighSchools,
  toTurkishTitleCase,
} from '@/lib/lgs-high-schools';
import {
  YKS_TOP_UNIVERSITIES,
  getDistinctUniversities,
  getDepartmentsByUniversity,
  getCitiesWithUniversities,
  YksUniversityTarget,
} from '@/lib/yks-universities';
import type { LgsHighSchool } from '@/types/school';

interface HierarchicalTargetSelectorProps {
  gradeLevel: '8' | '9';
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  selectedSchool: string;
  onSchoolChange: (schoolName: string, minScore?: number) => void;
  selectedDepartment: string;
  onDepartmentChange: (depName: string) => void;
}

export function HierarchicalTargetSelector({
  gradeLevel,
  selectedCity,
  onCityChange,
  selectedDistrict,
  onDistrictChange,
  selectedSchool,
  onSchoolChange,
  selectedDepartment,
  onDepartmentChange,
}: HierarchicalTargetSelectorProps) {
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const allCities = useMemo(() => getAllCities(), []);

  // İlçe listesi seçilen ile göre dinamik
  const districtOptions = useMemo(() => {
    if (!selectedCity) return [];
    return getDistrictsForCity(selectedCity);
  }, [selectedCity]);

  // Şehir değiştiğinde ilçeyi sıfırla
  const handleCitySelect = (city: string) => {
    onCityChange(city);
    onDistrictChange('');
    if (gradeLevel === '8') {
      onSchoolChange('');
    } else {
      onSchoolChange('');
      onDepartmentChange('');
    }
  };

  // İlçe değiştiğinde
  const handleDistrictSelect = (district: string) => {
    onDistrictChange(district);
    onSchoolChange('');
  };

  // --- 8. SINIF: LİSE FİLTRELEME & ARAMA ---
  const filteredHighSchools = useMemo<LgsHighSchool[]>(() => {
    if (schoolSearchQuery.trim()) {
      return searchHighSchools(schoolSearchQuery);
    }
    return getHighSchoolsByLocation(selectedCity, selectedDistrict);
  }, [schoolSearchQuery, selectedCity, selectedDistrict]);

  // --- 9. SINIF: ÜNİVERSİTE & BÖLÜM FİLTRELEME ---
  const universityOptions = useMemo(() => {
    return getDistinctUniversities(selectedCity);
  }, [selectedCity]);

  const departmentOptions = useMemo<YksUniversityTarget[]>(() => {
    if (!selectedSchool) return [];
    return getDepartmentsByUniversity(selectedSchool);
  }, [selectedSchool]);

  const handleUniversitySelect = (uniName: string) => {
    onSchoolChange(uniName);
    onDepartmentChange('');
  };

  const handleDepartmentSelect = (target: YksUniversityTarget) => {
    onDepartmentChange(target.department);
    onSchoolChange(target.name, target.minScore);
  };

  return (
    <div className="space-y-3.5 rounded-2xl border border-indigo-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-200">
          {gradeLevel === '8' ? (
            <>
              <School className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Hedef Lise Belirleme (İl / İlçe / Lise)</span>
            </>
          ) : (
            <>
              <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Hedef Üniversite & Bölüm (Şehir / Okul / Bölüm)</span>
            </>
          )}
        </span>
        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 shadow-2xs border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
          {gradeLevel === '8' ? 'LGS 2027' : 'YKS Radarı'}
        </span>
      </div>

      {/* 1. ADIM: İL SEÇİMİ */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            {gradeLevel === '8' ? 'Hedef İl (Şehir)' : 'Üniversite Şehri'}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <select
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-8 pl-8 text-xs font-semibold text-slate-800 transition focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">{gradeLevel === '8' ? 'Tüm İller / Şehir Seçin' : 'Tüm Şehirler'}</option>
              {allCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. ADIM: 8. SINIF İÇİN İLÇE SEÇİMİ */}
        {gradeLevel === '8' ? (
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              İlçe (Opsiyonel)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
                <Building2 className="h-3.5 w-3.5" />
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                disabled={!selectedCity || districtOptions.length === 0}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-8 pl-8 text-xs font-semibold text-slate-800 transition focus:border-indigo-500 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-800/50"
              >
                <option value="">{selectedCity ? 'Tüm İlçeler' : 'Önce İl Seçin'}</option>
                {districtOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          /* 9. SINIF İÇİN HEDEF ÜNİVERSİTE SEÇİMİ */
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Hedef Üniversite
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
                <Building2 className="h-3.5 w-3.5" />
              </span>
              <select
                value={selectedSchool}
                onChange={(e) => handleUniversitySelect(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-8 pl-8 text-xs font-semibold text-slate-800 transition focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">Üniversite Seçin...</option>
                {universityOptions.map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name} ({u.city})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 3. ADIM: 8. SINIF HEDEF LİSE SEÇİMİ (Arama veya Listeden Tıklama) */}
      {gradeLevel === '8' && (
        <div className="space-y-2 pt-1">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
            Hedef Lise
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              value={schoolSearchQuery || selectedSchool}
              onChange={(e) => {
                setSchoolSearchQuery(e.target.value);
                onSchoolChange(e.target.value);
              }}
              placeholder="Örn: Kabataş Erkek Lisesi, Atatürk Fen..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-8 text-xs font-semibold text-slate-800 transition focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Hızlı Seçim Listesi */}
          <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-200/80 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-800/80 space-y-1">
            {filteredHighSchools.length === 0 ? (
              <div className="p-2 text-center text-[11px] text-slate-400">
                Seçilen konuma ait lise bulunamadı. Yukarıya istediğiniz lisenin adını yazabilirsiniz.
              </div>
            ) : (
              filteredHighSchools.slice(0, 8).map((school) => {
                const isSelected = selectedSchool === school.name;
                return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => {
                      onSchoolChange(school.name, Math.round(school.minScore));
                      setSchoolSearchQuery('');
                      if (school.city && !selectedCity) {
                        onCityChange(school.city);
                      }
                      if (school.district && !selectedDistrict) {
                        onDistrictChange(school.district);
                      }
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-900 font-bold dark:bg-indigo-950/60 dark:text-indigo-200'
                        : 'hover:bg-slate-50 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {isSelected ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                      ) : (
                        <School className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="truncate">{school.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                      <span className="text-slate-400">
                        {school.city}{school.district ? `/${school.district}` : ''}
                      </span>
                      <span className="rounded bg-indigo-100/70 px-1.5 py-0.5 font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                        {school.minScore} Puan
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 3. ADIM: 9. SINIF HEDEF BÖLÜM SEÇİMİ */}
      {gradeLevel === '9' && (
        <div className="space-y-2 pt-1">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
            Hedef Bölüm / Lisans Programı
          </label>
          {departmentOptions.length > 0 ? (
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {departmentOptions.map((dep) => {
                const isSelected = selectedDepartment === dep.department;
                return (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => handleDepartmentSelect(dep)}
                    className={`flex flex-col rounded-xl border p-2.5 text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/80 dark:border-emerald-600 dark:bg-emerald-950/40'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span className="truncate">{dep.department}</span>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        {dep.scoreType}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Hedef OBP: <strong>{dep.targetObp}</strong></span>
                      <span>İdeal TYT: <strong>{dep.idealTytNet} Net</strong></span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-3 text-center text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-800">
              {selectedSchool
                ? 'Bu üniversite için bölüm listesi yükleniyor...'
                : 'Lütfen yukarıdan bir hedef üniversite seçin.'}
            </div>
          )}
        </div>
      )}

      {/* SEÇİLEN ÖZET ROZETİ */}
      {(selectedSchool || selectedDepartment) && (
        <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-white p-2 text-xs font-semibold text-slate-700 border border-slate-200/70 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span className="truncate">
            Seçilen Hedef: <strong>{selectedSchool}</strong>
            {selectedDepartment ? ` — ${selectedDepartment}` : ''}
            {selectedCity ? ` (${selectedCity}${selectedDistrict ? ` / ${selectedDistrict}` : ''})` : ''}
          </span>
        </div>
      )}
    </div>
  );
}
