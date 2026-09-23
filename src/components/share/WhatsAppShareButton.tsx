'use client';

import React, { useState } from 'react';
import { MessageCircle, Check, Send, X, Share2 } from 'lucide-react';
import { getWhatsAppShareUrl, type WhatsAppShareData } from '@/lib/whatsapp-share';

interface WhatsAppShareButtonProps {
  shareData: WhatsAppShareData;
  buttonText?: string;
  variant?: 'primary' | 'outline' | 'compact';
  className?: string;
}

export function WhatsAppShareButton({
  shareData,
  buttonText = 'WhatsApp ile Paylaş',
  variant = 'primary',
  className = '',
}: WhatsAppShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState(shareData.recipientPhone || '');
  const [isCopied, setIsCopied] = useState(false);

  const handleQuickShare = () => {
    const url = getWhatsAppShareUrl({
      ...shareData,
      recipientPhone: phone || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };

  const handleCopyText = async () => {
    const { generateWhatsAppReportMessage } = await import('@/lib/whatsapp-share');
    const text = generateWhatsAppReportMessage(shareData);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Buton stilleri
  let buttonStyle =
    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer';

  if (variant === 'primary') {
    buttonStyle +=
      ' bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20 active:scale-95';
  } else if (variant === 'outline') {
    buttonStyle +=
      ' border border-emerald-300 bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 active:scale-95';
  } else if (variant === 'compact') {
    buttonStyle =
      'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer shadow-xs active:scale-95';
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`${buttonStyle} ${className}`}
        title="WhatsApp üzerinden karne ve gelişim raporunu ilet"
      >
        <MessageCircle className={variant === 'compact' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        <span>{buttonText}</span>
      </button>

      {/* Paylaşım Modalı */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    WhatsApp ile Karne Paylaş
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    0 TL maliyetli, anında mesaj iletimi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mesaj Önizlemesi */}
            <div className="mt-4 rounded-2xl border border-emerald-200/70 bg-emerald-50/50 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                💬 Hazırlanan WhatsApp Mesajı
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line line-clamp-6 leading-relaxed font-sans">
                {shareData.mode === 'student_to_parent'
                  ? `👋 *Anneciğim / Babacığım,*\nBugünkü *${shareData.examTitle}* denememi tamamladım!\n🎯 Toplam Net: ${shareData.totalNet.toFixed(2)} Net\n🏆 Puanım: ${shareData.score?.toFixed(1) || '-'} Puan`
                  : `📊 *${shareData.studentName || 'Öğrenciniz'}* LGS Karne Özeti\n🎯 Toplam Net: ${shareData.totalNet.toFixed(2)} Net`}
                {shareData.targetSchool && `\n🏫 Hedef: ${shareData.targetSchool}`}
              </p>
            </div>

            {/* Opsiyonel Numara Girişi */}
            <div className="mt-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Alıcı Telefon Numarası (Opsiyonel)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Örn: 0532 123 45 67 (Boş bırakırsanız rehber açılır)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <p className="text-[10px] text-slate-400">
                💡 Boş bırakırsanız WhatsApp açıldığında anne, baba, eş veya öğretmeninizi rehberden kolayca seçebilirsiniz.
              </p>
            </div>

            {/* Butonlar */}
            <div className="mt-6 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Metni Kopyala</span>
                  </>
                )}
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={handleQuickShare}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>WhatsApp&apos;ı Aç</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
