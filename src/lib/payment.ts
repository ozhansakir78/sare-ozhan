/**
 * Ödeme Ağ Geçidi ve PRO Üyelik Yardımcısı (İyzico & Stripe)
 */

export interface PricingPlan {
  id: 'season' | 'monthly';
  name: string;
  price: number;
  currency: string;
  durationMonths?: number;
  description: string;
  features: string[];
}

export const PRICING_PLANS: Record<'season' | 'monthly', PricingPlan> = {
  season: {
    id: 'season',
    name: '2027 LGS Tam Sezon Paketi',
    price: 499,
    currency: 'TRY',
    durationMonths: 12,
    description: '2027 LGS sınav gününe kadar sınırsız erişim',
    features: [
      'Sınırsız Sokratik Yapay Zekâ Soru Çözümü',
      'Tüm Online Deneme Sınavları ve Kitapçık İndirme',
      'Haftalık Otomatik Veli WhatsApp & E-Posta Karnesi',
      'Kişiselleştirilmiş LGS Hedef Lise Yol Haritası',
      'Öncelikli 7/24 AI Koç Desteği',
    ],
  },
  monthly: {
    id: 'monthly',
    name: 'Aylık Standart Plan',
    price: 149,
    currency: 'TRY',
    durationMonths: 1,
    description: '30 gün boyunca kesintisiz PRO üyelik',
    features: [
      'Sınırsız Sokratik Yapay Zekâ Soru Çözümü',
      'Tüm Online Deneme Sınavları',
      'Haftalık Veli Karnesi',
    ],
  },
};

/**
 * PRO üyelik bitiş tarihini hesaplar.
 */
export function calculateProExpirationDate(planId: 'season' | 'monthly'): string {
  if (planId === 'season') {
    // 2027 LGS sınav takvimi bitişi (Örn: 15 Temmuz 2027)
    return new Date('2027-07-15T23:59:59.000Z').toISOString();
  }

  // Aylık paket: bugünden itibaren 30 gün
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString();
}

/**
 * İyzico / Stripe ortam değişkenleri kontrolü.
 */
export const isPaymentGatewayConfigured = Boolean(
  process.env.IYZICO_API_KEY || process.env.STRIPE_SECRET_KEY
);
