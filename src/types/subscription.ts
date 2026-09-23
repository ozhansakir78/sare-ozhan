export interface QuotaStatus {
  isPro: boolean;
  dailyLimit: number;
  usedToday: number;
  remainingToday: number;
  dateKey: string; // YYYY-MM-DD
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}
