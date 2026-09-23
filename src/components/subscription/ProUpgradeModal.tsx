'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { upgradeToPro } from '@/lib/quota';
import { useAuth } from '@/components/auth/AuthProvider';
import { trackEvent } from '@/lib/analytics';
import {
  Sparkles,
  X,
  Check,
  ShieldCheck,
  Zap,
  MessageSquare,
  Target,
  Award,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'quota_exhausted' | 'manual';
  onSuccess?: () => void;
}

export function ProUpgradeModal({
  isOpen,
  onClose,
  reason = 'manual',
  onSuccess,
}: ProUpgradeModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'season' | 'monthly'>('season');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      trackEvent('open_pro_modal', { reason, plan: selectedPlan });
    }
  }, [isOpen, reason, selectedPlan]);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    setIsProcessing(true);
    trackEvent('start_checkout', { planId: selectedPlan });
    try {
      const res = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          userId: user?.id,
          email: user?.email,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.checkoutUrl) {
          onClose();
          router.push(data.checkoutUrl);
          return;
        }
      }
    } catch (e) {
      console.warn('Checkout rotası çağrısı uyarısı:', e);
    }

    // Doğrudan simülasyon fallback'i
    upgradeToPro();
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      if (onSuccess) onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl border border-indigo-200/40 bg-white p-6 shadow-2xl dark:border-indigo-900/50 dark:bg-slate-900 sm:p-8">
        {/* Kapat Butonu */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-xl border border-slate-200 bg-white p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          /* Başarılı Satın Alım Ekranı */
          <div className="my-12 flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
              SınavKoçu PRO&apos;ya Hoş Geldin! 🚀
            </h3>
            <p className="mt-2 max-w-sm text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              Sınırsız Sokratik AI soru çözümü, Veli WhatsApp karnesi ve nokta atışı kamp denemeleri aktif edildi.
            </p>
          </div>
        ) : (
          <div>
            {/* Üst Vurgu / Başlık */}
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>{reason === 'quota_exhausted' ? 'Günlük Ücretsiz Soru Kotan Doldu' : 'SınavKoçu PRO Avantajları'}</span>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Hedeflediğin Liseye{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Sınırsız Soru Analitiği
                </span>{' '}
                ile Ulaş
              </h2>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                LGS&apos;de derece yapan öğrencilerin sırrı; çözemedikleri her sorunun peşine düşüp mantığını kavramalarıdır.
              </p>
            </div>

            {/* Neden Pro? Avantaj Listesi */}
            <div className="mt-6 space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                    Sınırsız Sokratik AI Soru Çözümü
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Günde 3 soru sınırını tamamen kaldır. Takıldığın yüzlerce soruyu adım adım öğren.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                    Haftalık Veli WhatsApp İlerleme Raporu
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hangi konularda eksik kapandığını ve başarı yüzdesini her pazar velinin telefonuna otomatik raporla.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                    Kişiye Özel &ldquo;Nokta Atışı&rdquo; Kamp Denemesi
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Yalnızca en çok yanlış yaptığın kritik konulardan üretilen kişiselleştirilmiş mini denemeler.
                  </p>
                </div>
              </div>
            </div>

            {/* Fiyatlandırma Seçenekleri */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Dönemlik Plan (Önerilen) */}
              <div
                onClick={() => setSelectedPlan('season')}
                className={`relative flex flex-col justify-between rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                  selectedPlan === 'season'
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-md dark:border-indigo-500 dark:bg-indigo-950/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-0.5 text-[10px] font-black text-white shadow-xs">
                  %60 İNDİRİM &bull; EN ÇOK TERCİH EDİLEN
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    2027 LGS Tam Sezon Paketi
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    LGS gününe kadar geçerli tek seferlik ödeme
                  </p>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      499 ₺
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      1.199 ₺
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                      / dönemlik
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> Sınav bitimine kadar sınırsız
                </div>
              </div>

              {/* Aylık Plan */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                className={`flex flex-col justify-between rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                  selectedPlan === 'monthly'
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-md dark:border-indigo-500 dark:bg-indigo-950/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Aylık Standart Plan
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    İstediğin an iptal edebileceğin esnek abonelik
                  </p>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      149 ₺
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      / ay
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Check className="h-3.5 w-3.5" /> Her ay otomatik yenilenir
                </div>
              </div>
            </div>

            {/* Aksiyon ve Güvenlik */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 focus:outline-none cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>
                  {isProcessing ? 'Ödeme Güvenle İşleniyor...' : 'Hemen PRO Paketine Geç'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 14 Gün Koşulsuz İade Garantisi
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-slate-400" /> 256-Bit SSL Güvenli Altyapı
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
