/**
 * WhatsApp Karne & Gelişim Raporu Paylaşım Yardımcısı
 * 0 TL Maliyetli, doğrudan WhatsApp Web ve WhatsApp Mobil uygulamasını açan bağlantı üreticisi.
 */

export interface WhatsAppShareData {
  studentName?: string;
  examTitle: string;
  score?: number;
  totalNet: number;
  targetSchool?: string;
  targetSchoolProgress?: number;
  highlightNote?: string;
  courseBreakdown?: Array<{ name: string; net: number }>;
  recipientPhone?: string; // Örn: 905xxxxxxxxx (opsiyonel)
  mode?: 'student_to_parent' | 'parent_to_other';
}

/**
 * Zengin formatlı WhatsApp mesaj metnini oluşturur.
 */
export function generateWhatsAppReportMessage(data: WhatsAppShareData): string {
  const {
    studentName = 'Öğrenciniz',
    examTitle,
    score,
    totalNet,
    targetSchool,
    targetSchoolProgress,
    highlightNote,
    courseBreakdown,
    mode = 'student_to_parent',
  } = data;

  const lines: string[] = [];

  if (mode === 'student_to_parent') {
    lines.push(`👋 *Anneciğim / Babacığım,*`);
    lines.push(`Bugünkü *${examTitle}* denememi tamamladım! İşte sonucum:`);
  } else {
    lines.push(`📊 *SınavKoçu.ai — ${studentName} LGS Gelişim Karnesi*`);
    lines.push(`📅 *Sınav:* ${examTitle}`);
  }

  lines.push('');
  lines.push(`🎯 *Toplam Net:* ${totalNet.toFixed(2)} Net`);
  if (score && score > 0) {
    lines.push(`🏆 *Tahmini LGS Puanı:* ${score.toFixed(1)} Puan`);
  }

  if (targetSchool) {
    const progressText = targetSchoolProgress ? ` (%${targetSchoolProgress} Ulaşıldı)` : '';
    lines.push(`🏫 *Hedef Lise:* ${targetSchool}${progressText}`);
  }

  if (courseBreakdown && courseBreakdown.length > 0) {
    lines.push('');
    lines.push('📚 *Ders Netleri:*');
    for (const c of courseBreakdown.slice(0, 6)) {
      lines.push(`• ${c.name}: ${c.net.toFixed(1)} Net`);
    }
  }

  if (highlightNote) {
    lines.push('');
    lines.push(`💡 *Koç Analizi:* ${highlightNote}`);
  }

  lines.push('');
  lines.push(`🔗 *Detaylı Analiz & Yanlış Defteri:* https://sinavkocu.ai`);
  lines.push(`_SınavKoçu.ai Akıllı Sınav Asistanı ile gönderildi._`);

  return lines.join('\n');
}

/**
 * WhatsApp Web veya mobil uygulamasını açacak url'yi oluşturur.
 * Eğer telefon numarası verilmediyse doğrudan WhatsApp kişi seçme ekranı açılır.
 */
export function getWhatsAppShareUrl(data: WhatsAppShareData): string {
  const message = generateWhatsAppReportMessage(data);
  const encodedText = encodeURIComponent(message);

  const cleanPhone = data.recipientPhone
    ? data.recipientPhone.replace(/[^0-9]/g, '')
    : '';

  if (cleanPhone) {
    // Türkiye numarası ise ve başında 90 yoksa 90 ekle
    const formattedPhone = cleanPhone.startsWith('0')
      ? `9${cleanPhone}`
      : cleanPhone.startsWith('90')
      ? cleanPhone
      : `90${cleanPhone}`;

    return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`;
  }

  // Kişi seçme ekranı ile aç
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}
