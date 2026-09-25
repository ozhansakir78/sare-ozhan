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
  const [departmentSearchQuery, setDepartmentSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState<'ALL' | 'SAY' | 'EA' | 'SÖZ' | 'DİL'>('ALL');
  const [isCustomUniversity, setIsCustomUniversity] = useState(false);
  const [isCustomDepartment, setIsCustomDepartment] = useState(false);
  const [customUniInput, setCustomUniInput] = useState('');
  const [customDepInput, setCustomDepInput] = useState('');

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
      setIsCustomUniversity(false);
      setIsCustomDepartment(false);
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

  const filteredDepartments = useMemo(() => {
    let list = departmentOptions;
    if (scoreFilter !== 'ALL') {
      list = list.filter((d) => d.scoreType === scoreFilter);
    }
    if (departmentSearchQuery.trim()) {
      const q = departmentSearchQuery.toLowerCase().trim();
      list = list.filter((d) => d.department.toLowerCase().includes(q));
    }
    return list;
  }, [departmentOptions, scoreFilter, departmentSearchQuery]);

  const handleUniversitySelect = (uniName: string) => {
    if (uniName === '__custom__') {
      setIsCustomUniversity(true);
      return;
    }
    setIsCustomUniversity(false);
    onSchoolChange(uniName);
    onDepartmentChange('');
  };

  const handleDepartmentSelect = (target: YksUniversityTarget) => {
    setIsCustomDepartment(false);
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
              <span>Hedef Lise Belirleme (81 İl / İlçe / Lise)</span>
            </>
          ) : (
            <>
              <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Hedef Üniversite & Bölüm (81 İl / Üniversite / Lisans)</span>
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
            {gradeLevel === '8' ? 'Hedef İl (Şehir)' : 'Üniversite Şehri (81 İl)'}
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
              <option value="">{gradeLevel === '8' ? 'Tüm İller / Şehir Seçin' : 'Tüm Şehirler (Tüm Üniversiteler)'}</option>
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                Hedef Üniversite
              </label>
              <button
                type="button"
                onClick={() => setIsCustomUniversity(!isCustomUniversity)}
                className="text-[10px] font-bold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                {isCustomUniversity ? '← Listeden Seç' : '✍️ Elle Yaz'}
              </button>
            </div>

            {isCustomUniversity ? (
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
                  <Building2 className="h-3.5 w-3.5" />
                </span>
                <input
                  type="text"
                  value={customUniInput || selectedSchool}
                  onChange={(e) => {
                    setCustomUniInput(e.target.value);
                    onSchoolChange(e.target.value);
                  }}
                  placeholder="Üniversite adını yazın..."
                  className="w-full rounded-xl border border-emerald-300 bg-white py-2 pr-3 pl-8 text-xs font-semibold text-slate-800 transition focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            ) : (
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
                  <Building2 className="h-3.5 w-3.5" />
                </span>
                <select
                  value={selectedSchool}
                  onChange={(e) => handleUniversitySelect(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-8 pl-8 text-xs font-semibold text-slate-800 transition focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">
                    {selectedCity
                      ? `${selectedCity} Üniversiteleri (${universityOptions.length})...`
                      : `Üniversite Seçin (${universityOptions.length})...`}
                  </option>
                  {universityOptions.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.name} ({u.city})
                    </option>
                  ))}
                  <option value="__custom__">✍️ Listede Olmayan Üniversiteyi Elle Yaz...</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. ADIM: 8. SINIF HEDEF LİSE SEÇİMİ */}
      {gradeLevel === '8' && (
        <div className="space-y-2 pt-1">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
            Hedef Lise (Arama veya Listeden Seçim)
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
              placeholder="Örn: Kabataş Erkek Lisesi, Atatürk Fen, veya istediğiniz lisenin adı..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-8 text-xs font-semibold text-slate-800 transition focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Hızlı Seçim Listesi */}
          <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-200/80 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-800/80 space-y-1">
            {filteredHighSchools.length === 0 ? (
              <div className="p-2 text-center text-[11px] text-slate-400">
                Aramanıza uyan lise bulunamadı. Yukarıdaki kutuya dilediğiniz lise adını doğrudan yazabilirsiniz.
              </div>
            ) : (
              filteredHighSchools.slice(0, 10).map((school) => {
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
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
              Hedef Bölüm / Lisans Programı
            </label>
            {selectedSchool && (
              <button
                type="button"
                onClick={() => setIsCustomDepartment(!isCustomDepartment)}
                className="text-[10px] font-bold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                {isCustomDepartment ? '← Bölüm Listesine Dön' : '✍️ Özel Bölüm Yaz'}
              </button>
            )}
          </div>

          {isCustomDepartment ? (
            <div className="rounded-xl border border-emerald-300 bg-white p-3 space-y-2 dark:border-slate-700 dark:bg-slate-800">
              <input
                type="text"
                value={customDepInput || selectedDepartment}
                onChange={(e) => {
                  setCustomDepInput(e.target.value);
                  onDepartmentChange(e.target.value);
                }}
                placeholder="Örn: Yapay Zekâ Mühendisliği, Pilotaj, Moleküler Biyoloji..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 transition focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <p className="text-[11px] text-slate-400">
                Hedeflediğiniz bölümün tam adını yazabilirsiniz.
              </p>
            </div>
          ) : departmentOptions.length > 0 ? (
            <div className="space-y-2">
              {/* Puan Türü Filtreleri & Arama */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['ALL', 'SAY', 'EA', 'SÖZ', 'DİL'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setScoreFilter(st)}
                    className={`rounded-lg px-2 py-1 text-[10px] font-bold transition cursor-pointer ${
                      scoreFilter === st
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {st === 'ALL' ? 'Tümü' : st}
                  </button>
                ))}
                <div className="relative flex-1 min-w-[140px]">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400 pointer-events-none">
                    <Search className="h-3 w-3" />
                  </span>
                  <input
                    type="text"
                    value={departmentSearchQuery}
                    onChange={(e) => setDepartmentSearchQuery(e.target.value)}
                    placeholder="Bölüm filtrele..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-1 pr-2 pl-6 text-[11px] font-medium text-slate-800 transition focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Bölüm Kartları */}
              <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200/80 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-800/80 space-y-1">
                {filteredDepartments.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400">
                    Aramanıza uyan bölüm bulunamadı.{' '}
                    <button
                      type="button"
                      onClick={() => setIsCustomDepartment(true)}
                      className="font-bold text-emerald-600 underline"
                    >
                      Bölümü elle yazmak için tıklayın
                    </button>
                  </div>
                ) : (
                  filteredDepartments.map((dep) => {
                    const isSelected = selectedDepartment === dep.department;
                    return (
                      <button
                        key={dep.id}
                        type="button"
                        onClick={() => handleDepartmentSelect(dep)}
                        className={`w-full flex items-center justify-between rounded-lg p-2 text-left transition cursor-pointer ${
                          isSelected
                            ? 'border border-emerald-500 bg-emerald-50/80 dark:border-emerald-600 dark:bg-emerald-950/40'
                            : 'hover:bg-slate-50 border border-transparent dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          {isSelected ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate text-xs font-bold text-slate-900 dark:text-white">
                            {dep.department}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-extrabold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                            {dep.scoreType}
                          </span>
                          <span className="hidden sm:inline text-slate-400">
                            {dep.idealTytNet} Net TYT
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-3 text-center text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-800">
              {selectedSchool
                ? 'Bu üniversite için bölüm listesi hazırlanıyor...'
                : 'Lütfen önce yukarıdan bir hedef üniversite seçin.'}
            </div>
          )}
        </div>
      )}

      {/* SEÇİLEN ÖZET ROZETİ */}
      {(selectedSchool || selectedDepartment) && (
        <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-white p-2.5 text-xs font-semibold text-slate-700 border border-slate-200/70 shadow-2xs dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span className="truncate">
            Seçilen Hedef: <strong className="text-slate-900 dark:text-white">{selectedSchool}</strong>
            {selectedDepartment ? ` — ${selectedDepartment}` : ''}
            {selectedCity ? ` (${selectedCity}${selectedDistrict ? ` / ${selectedDistrict}` : ''})` : ''}
          </span>
        </div>
      )}
    </div>
  );
}
