import type { MetadataRoute } from 'next';
import { ONLINE_EXAMS } from '@/lib/online-exams-data';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinavkocu.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Sabit temel sayfalar
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/deneme-coz`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/yanlis-defteri`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/deneme-gecmisi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/veli-raporu`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lgs-konulari`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/odaklanma-odasi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/liderlik-tablosu`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/giris`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kayit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 21 adet yeni nesil deneme sınavının statik SEO rotaları
  const examRoutes: MetadataRoute.Sitemap = ONLINE_EXAMS.map((exam) => ({
    url: `${BASE_URL}/deneme-coz/${exam.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: exam.type === 'full' ? 0.95 : 0.9,
  }));

  return [...baseRoutes, ...examRoutes];
}
