/**
 * Veli İlerleme Karnesi ve Haftalık Otomasyon E-Posta Şablonları
 * Tüm e-posta istemcileriyle (Gmail, Outlook, Apple Mail vb.) %100 uyumlu inline CSS şablonu.
 */

export interface ParentReportEmailData {
  studentName?: string;
  reportDate?: string;
  examInfo?: {
    title: string;
    score: number;
    net: number;
    percentile?: number;
    targetSchool?: string;
    targetSchoolProgress?: number;
  };
  stats?: {
    total: number;
    resolved: number;
    unresolved: number;
    successRate: number;
  };
  criticalTopics?: Array<{ name: string; count?: number }>;
  guidanceNote?: string;
  dashboardUrl?: string;
}

export function generateParentReportEmailHtml(data: ParentReportEmailData): string {
  const {
    studentName = 'Öğrenciniz',
    reportDate = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    examInfo,
    stats,
    criticalTopics = [],
    guidanceNote = 'Öğrenciniz bu hafta istikrarlı bir çalışma sergiledi. Çözemediği soruları Yanlış Defteri ile kapatması net artışını hızlandıracaktır.',
    dashboardUrl = 'https://sinavkocu.ai/veli-raporu',
  } = data;

  const resolvedCount = stats?.resolved ?? 0;
  const totalCount = stats?.total || 1;
  const successRate = stats?.successRate ?? Math.round((resolvedCount / totalCount) * 100);

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SınavKoçu.ai — Haftalık LGS Veli İlerleme Raporu</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
    
    <!-- Başlık / Banner -->
    <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 36px 24px; text-align: center; color: #ffffff;">
      <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
        LGS 2027 &bull; Gelişim Takip Sistemi
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">SınavKoçu.ai</h1>
      <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.95; font-weight: 500;">
        Haftalık Veli Bilgilendirme ve Karne Raporu
      </p>
      <div style="margin-top: 14px; display: inline-block; background-color: #ffffff; color: #4f46e5; padding: 5px 16px; border-radius: 9999px; font-size: 12px; font-weight: 800;">
        📅 ${reportDate}
      </div>
    </div>

    <!-- İçerik Alanı -->
    <div style="padding: 28px 24px;">
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 0;">
        Sayın Velimiz,<br><br>
        <strong>${studentName}</strong> adlı öğrencimizin son dönemdeki LGS deneme performansları, hedef lise ilerlemesi ve yanlış defteri analizleri aşağıda bilginize sunulmuştur:
      </p>

      <!-- 1. Son Deneme Sınavı Özeti -->
      ${
        examInfo
          ? `
      <div style="background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%); border: 1px solid #c7d2fe; border-radius: 18px; padding: 20px; margin: 24px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 800; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.5px;">Son Çözülen Deneme Sınavı</span>
        </div>
        <h3 style="margin: 0 0 14px 0; font-size: 17px; font-weight: 900; color: #1e1b4b;">${examInfo.title}</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid rgba(199, 210, 254, 0.6);">
            <td style="padding: 8px 0; font-size: 13px; color: #475569;">Tahmini LGS Puanı:</td>
            <td style="padding: 8px 0; font-size: 18px; font-weight: 900; color: #4f46e5; text-align: right;">${examInfo.score.toFixed(1)} Puan</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(199, 210, 254, 0.6);">
            <td style="padding: 8px 0; font-size: 13px; color: #475569;">Toplam Net:</td>
            <td style="padding: 8px 0; font-size: 15px; font-weight: 800; color: #0f172a; text-align: right;">${examInfo.net.toFixed(2)} / 90.00</td>
          </tr>
          ${
            examInfo.percentile
              ? `
          <tr style="border-bottom: 1px solid rgba(199, 210, 254, 0.6);">
            <td style="padding: 8px 0; font-size: 13px; color: #475569;">Tahmini Türkiye Yüzdeliği:</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 800; color: #059669; text-align: right;">%${examInfo.percentile}</td>
          </tr>
          `
              : ''
          }
          ${
            examInfo.targetSchool
              ? `
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #475569;">Hedef Lise:</td>
            <td style="padding: 8px 0; font-size: 13px; font-weight: 800; color: #7c3aed; text-align: right;">${examInfo.targetSchool} ${examInfo.targetSchoolProgress ? `(%${examInfo.targetSchoolProgress})` : ''}</td>
          </tr>
          `
              : ''
          }
        </table>
      </div>
      `
          : ''
      }

      <!-- 2. Yanlış Defteri Başarısı -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 20px; margin: 24px 0;">
        <span style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.5px;">Eksik Soru Kapatma İlerlemesi</span>
        <div style="margin-top: 10px; display: flex; align-items: baseline;">
          <span style="font-size: 32px; font-weight: 900; color: #0f172a;">%${successRate}</span>
          <span style="font-size: 13px; color: #64748b; margin-left: 10px; font-weight: 600;">(${resolvedCount} / ${totalCount} Soru Başarıyla Çözüldü)</span>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b; line-height: 1.5;">
          Öğrenciniz denemelerde yanlış yaptığı soruları yapay zekâ ipuçlarıyla adım adım çözerek eksiklerini kapatıyor.
        </p>
      </div>

      <!-- 3. Dikkat Gerektiren Konular -->
      ${
        criticalTopics.length > 0
          ? `
      <div style="margin: 24px 0; background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 18px; padding: 18px;">
        <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #9f1239;">
          ⚠️ Bu Hafta Odaklanılması Gereken Kritik Konular:
        </h4>
        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #881337; line-height: 1.8;">
          ${criticalTopics.map((t) => `<li><strong>${t.name}</strong> ${t.count ? `(${t.count} soru tekrar bekliyor)` : ''}</li>`).join('')}
        </ul>
      </div>
      `
          : ''
      }

      <!-- 4. Yapay Zekâ Koç Tavsiyesi -->
      <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 18px; padding: 18px; margin: 24px 0;">
        <div style="font-size: 12px; font-weight: 800; color: #92400e; margin-bottom: 6px;">
          💡 SınavKoçu AI Rehberlik Tavsiyesi:
        </div>
        <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.6;">
          ${guidanceNote}
        </p>
      </div>

      <!-- CTA Butonu -->
      <div style="text-align: center; margin: 32px 0 12px 0;">
        <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 14px; font-size: 14px; font-weight: 800; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">
          Detaylı Veli Paneline Git &rarr;
        </a>
      </div>

      <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px; line-height: 1.5;">
        Bu e-posta, SınavKoçu.ai platformundaki öğrenci veli bilgilendirme sistemi tarafından otomatik olarak oluşturulmuştur.<br>
        Sorularınız veya destek talepleriniz için <a href="mailto:destek@sinavkocu.ai" style="color: #6366f1; text-decoration: underline;">destek@sinavkocu.ai</a> adresine yazabilirsiniz.
      </p>
    </div>
  </div>
</body>
</html>
`;
}
