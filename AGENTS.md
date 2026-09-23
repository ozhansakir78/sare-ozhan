# AGENTS.MD - Sınav Koçluğu & Soru Analitiği Platformu (LGS / YKS / KPSS)

Bu belge, projede geliştirme yapacak yapay zekâ kodlama asistanları için mimari standartları, teknoloji tercihlerini ve iş akışı kurallarını tanımlar.

## 1. Proje Vizyonu & Kapsam
- **Amaç:** Öğrencilerin deneme netlerini takip eden, çözemedikleri soruları (yanlış defteri) toplayan, kişiselleştirilmiş pekiştirme testleri üreten ve Sokratik yöntemle eksik kapatan çok kademeli sınav koçluğu ekosistemi.
- **Kademeli Yol Haritası:**
  - **Faz 1 (Tamamlanan):** 8. Sınıf LGS + Akıllı Konu Bazlı Pekiştirme Denemesi Oluşturucu.
  - **Faz 2 (Sıradaki):** 9. Sınıf (Lise 1) Modülü — MEB Ortak Yazılı Sınav Provaları, 9. Sınıf Dersleri & YKS (TYT) Temel Atma Koçu.
  - **Faz 3 (Gelecek):** 10. Sınıf (Lise 2) & 11. Sınıf (Lise 3) Alan Seçimi ve Branş Denemeleri.
  - **Faz 4 (Zirve):** 12. Sınıf & Mezun YKS (TYT / AYT / YDT) Üniversite Koçluğu.
- **Çok Kademeli (Multi-Tier) Mimari İlkesi:** Arayüz ve veritabanı yapısı tek bir sınava hapsolmayacak; üst menü/profil üzerinden öğrencinin kademesi (örn: LGS / 9. Sınıf) seçildiğinde dersler, konular, deneme formatı ve hedef radarı dinamik olarak adapte olacaktır.

## 2. Teknoloji Yığını (Tech Stack)
- **Framework:** Next.js (App Router, TypeScript)
- **Stil:** Tailwind CSS, Lucide React (ikonlar), Shadcn/UI (tercih edilen bileşen kütüphanesi)
- **Backend / DB / Auth:** Supabase (PostgreSQL, Supabase Auth, Supabase Storage)
- **Görsel & AI Katmanı:** Çok modlu LLM API'leri (Görselden soru anlama, OCR ve Sokratik ipucu üretimi)

## 3. Temel Mimari Kuralları & Sınırlar
1. **Modüler Sınav Mimarisi:** Dersler, konular ve sorular doğrudan kod içine gömülmeyecek; `exams` tablosu üzerinden dinamik gelecektir. LGS özelindeki sabitler sadece konfigürasyon dosyalarında tutulacaktır.
2. **Sokratik Yaklaşım:** Soru çözüm asistanı hiçbir zaman cevabı doğrudan (ör. "Cevap C şıkkıdır") vermeyecek; öğrenciye yönlendirici sorular ve aşamalı ipuçları sunacaktır.
3. **Temiz Kod & Tip Güvenliği:** TypeScript `any` tipi kullanılmayacak, tüm veritabanı tipleri ve API dönüşleri `@/types` altında tanımlanacaktır.
4. **Bileşen Ayrımı:** Server Component ve Client Component (`'use client'`) sınırlarına dikkat edilecek, veri çekme işlemleri mümkün olduğunca sunucu tarafında yapılacaktır.

## 4. Dizin Yapısı Standardı
```text
src/
├── app/               # Next.js App Router sayfaları ve API rotaları
├── components/        # Yeniden kullanılabilir UI ve domain bileşenleri
│   ├── ui/            # Genel buton, kart, input gibi temel bileşenler
│   ├── exam/          # Net hesaplama ve deneme bileşenleri
│   └── question/      # Yanlış defteri ve AI çözüm bileşenleri
├── lib/               # Supabase istemcisi, matematiksel hesaplama formülleri ve AI yardımcıları
└── types/             # Veritabanı ve uygulama arayüz tipleri (TypeScript)
```

## 5. Yapay Zekâ Geliştirme Kuralları
- Tek seferde birden fazla büyük özelliği uygulamaya kalkışma.
- Her adımda sadece verilen spesifik görevi tamamla, gereksiz dosya kalabalığı yaratma.
- Kurulum veya kod değişikliği bittiğinde neyin yapıldığını ve sıradaki adımı özetle.
- Canlıya geçiş (production) adımları ve Supabase/Ödeme/E-posta gereksinimleri `CANLIYA_GECIS_NOTLARI.md` belgesinde kayıtlıdır; geliştirme yaparken bu hedeflerle uyumlu çalış.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
