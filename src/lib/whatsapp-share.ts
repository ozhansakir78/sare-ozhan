/**
 * WhatsApp Karne & Gelişim Raporu Paylaşım Yardımcısı
 * 0 TL Maliyetli, doğrudan WhatsApp Web ve WhatsApp Mobil uygulamasını açan bağlantı üreticisi.
 */
import type { OnlineExamTier } from '@/types/online-exam';

export interface WhatsAppShareData {
  tier?: OnlineExamTier;
  studentName?: string;
  examTitle: string;
  score?: number;
  scoreLabel?: string; // Örn: 'MEB Yazılı Sınav Notu', 'Tahmini LGS Puanı', 'Tahmini YKS (TYT) Puanı'
  scoreUnit?: string;  // Örn: '/ 100', 'Puan'
  totalNet: number;
  totalQuestions?: number;
  correctCount?: number;
  targetSchool?: string;
  targetSchoolLabel?: string; // 'Hedef Lise', 'Hedef Üniversite / Bölüm'
  targetSchoolProgress?: number;
  highlightNote?: string;
  courseBreakdown?: Array<{ name: string; net: number }>;
  recipientPhone?: string; // Örn: 905xxxxxxxxx (opsiyonel)
  mode?: 'student_to_parent' | 'parent_to_other';
}

/**
 * Zengin formatlı WhatsApp mesaj metnini çok kademeli olarak oluşturur.
 */
export function generateWhatsAppReportMessage(data: WhatsAppShareData): string {
  const {
    tier,
    studentName = 'Öğrenciniz',
    examTitle,
    score,
    scoreLabel,
    scoreUnit,
    totalNet,
    totalQuestions,
    correctCount,
    targetSchool,
    targetSchoolLabel,
    targetSchoolProgress,
    highlightNote,
    courseBreakdown,
    mode = 'student_to_parent',
  } = data;

  // Kademe tespiti
  const titleLower = (examTitle || '').toLowerCase();
  const isHighSchool =
    tier === 'lise1' ||
    tier === 'lise2' ||
    tier === 'lise3' ||
    titleLower.includes('9. sınıf') ||
    titleLower.includes('10. sınıf') ||
    titleLower.includes('11. sınıf') ||
    titleLower.includes('lise') ||
    titleLower.includes('yazılı') ||
    titleLower.includes('edebiyat') ||
    titleLower.includes('fizik') ||
    titleLower.includes('kimya') ||
    titleLower.includes('biyoloji');

  const isYks =
    tier === 'yks' ||
    titleLower.includes('yks') ||
    titleLower.includes('tyt') ||
    titleLower.includes('ayt');

  const lines: string[] = [];

  // Başlık Satırları
  if (mode === 'student_to_parent') {
    lines.push(`👋 *Anneciğim / Babacığım,*`);
    if (isHighSchool) {
      lines.push(`Bugünkü *${examTitle}* yazılı provamı/testimi tamamladım! İşte sonucum:`);
    } else if (isYks) {
      lines.push(`Bugünkü *${examTitle}* denememi tamamladım! İşte sonucum:`);
    } else {
      lines.push(`Bugünkü *${examTitle}* denememi tamamladım! İşte sonucum:`);
    }
  } else {
    if (isHighSchool) {
      lines.push(`📊 *SınavKoçu.ai — ${studentName} Lise Yazılı Sınav Karnesi*`);
    } else if (isYks) {
      lines.push(`📊 *SınavKoçu.ai — ${studentName} YKS (TYT/AYT) Gelişim Karnesi*`);
    } else {
      lines.push(`📊 *SınavKoçu.ai — ${studentName} LGS Gelişim Karnesi*`);
    }
    lines.push(`📅 *Sınav:* ${examTitle}`);
  }

  lines.push('');

  // Net ve Puan Satırları
  if (isHighSchool) {
    if (correctCount !== undefined && totalQuestions) {
      lines.push(`🎯 *Doğru Sayısı:* ${correctCount} / ${totalQuestions} Soru`);
    } else {
      lines.push(`🎯 *Toplam Net / Doğru:* ${totalNet.toFixed(1)}`);
    }

    if (score !== undefined && score !== null) {
      const label = scoreLabel || 'MEB Yazılı Sınav Notu';
      const unit = scoreUnit || '/ 100';
      lines.push(`🏆 *${label}:* ${score.toFixed(0)} ${unit}`);
    }
  } else if (isYks) {
    lines.push(`🎯 *Toplam Net:* ${totalNet.toFixed(2)} Net`);
    if (score && score > 0) {
      const label = scoreLabel || 'Tahmini YKS (TYT) Puanı';
      const unit = scoreUnit || 'Puan';
      lines.push(`🏆 *${label}:* ${score.toFixed(1)} ${unit}`);
    }
  } else {
    // LGS
    lines.push(`🎯 *Toplam Net:* ${totalNet.toFixed(2)} Net`);
    if (score && score > 0) {
      const label = scoreLabel || 'Tahmini LGS Puanı';
      const unit = scoreUnit || 'Puan';
      lines.push(`🏆 *${label}:* ${score.toFixed(1)} ${unit}`);
    }
  }

  // Hedef Bilgisi
  if (targetSchool) {
    const progressText = targetSchoolProgress ? ` (%${targetSchoolProgress} Ulaşıldı)` : '';
    const label = targetSchoolLabel || (isHighSchool || isYks ? 'Hedef Üniversite / Bölüm' : 'Hedef Lise');
    const icon = isHighSchool || isYks ? '🎓' : '🏫';
    lines.push(`${icon} *${label}:* ${targetSchool}${progressText}`);
  }

  // Ders Netleri
  if (courseBreakdown && courseBreakdown.length > 0) {
    lines.push('');
    lines.push('📚 *Ders Dağılımı:*');
    for (const c of courseBreakdown.slice(0, 8)) {
      lines.push(`• ${c.name}: ${c.net.toFixed(1)} Net`);
    }
  }

  // Koç Analizi
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
 * WhatsApp Web veya mobil uygulamasını açacak URL'yi oluşturur.
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
