# 🚀 Canlıya (Production) Geçiş Rehberi ve Eksikler Listesi

Bu belge, **SınavKoçu.ai** platformunun geliştirme (localhost) ortamından gerçek canlı sunucuya (Vercel, Supabase, Özel Domain) taşınması sırasında yapılması gereken tüm teknik ve operasyonel adımları listeler.

---

## 📋 1. Supabase (Bulut Veritabanı & Auth) Kurulumu

Şu anda platform **Yerel Mod (Local Storage)** ile kesintisiz çalışacak şekilde tasarlanmıştır. Canlıya geçerken aşağıdaki adımlar tamamlanmalıdır:

- [ ] **1.1. Supabase Projesi Oluşturma:**
  - [supabase.com](https://supabase.com) adresinden yeni bir proje oluşturun (Örnek Bölge: *Frankfurt (eu-central-1)*).
- [ ] **1.2. Veritabanı Şemasının Yüklenmesi:**
  - Proje dizininde hazır bulunan `supabase/schema.sql` dosyasının içeriğini kopyalayın.
  - Supabase Dashboard -> **SQL Editor** bölümüne yapıştırıp **RUN** butonuna basarak tüm tabloları, RLS (Row Level Security) güvenlik politikalarını ve tetikleyicileri (trigger) oluşturun.
- [ ] **1.3. Supabase Storage (Görsel Depolama) Ayarı:**
  - Supabase -> **Storage** sekmesinde `question-images` adında bir bucket oluşturulduğundan emin olun (`supabase/schema.sql` içinde otomatik tanımı yer alır).
  - Öğrencilerin yüklediği soru fotoğrafları bu güvenli alanda depolanacaktır.
- [ ] **1.4. Supabase Auth & E-posta Ayarları:**
  - **Site URL & Redirect URLs:** Canlı domain adresinizi (örn: `https://www.sinavkocu.ai/auth/callback` ve `https://www.sinavkocu.ai/profil`) Supabase -> **Authentication -> URL Configuration** kısmına ekleyin.
  - **E-posta Doğrulaması:** İsteğe bağlı olarak "Confirm email" seçeneğini aktif/pasif yapın.
  - **Google OAuth (İsteğe Bağlı):** Google Cloud Console üzerinden OAuth Client oluşturup ID ve Secret anahtarlarını Supabase Auth sağlayıcılarına girin.

---

## 🔑 2. Ortam Değişkenleri (.env.production / Vercel Environment Variables)

Canlı sunucuda (ör. Vercel Panel -> Settings -> Environment Variables) tanımlanması gereken gerçek anahtarlar:

```env
# 1. Google Gemini Yapay Zekâ API
GEMINI_API_KEY=AIzaSy...gercek_gemini_api_key...

# 2. Supabase Canlı Bağlantı Anahtarları (Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://[PROJE_REF_KODUNUZ].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...gercek_anon_key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...servis_rol_key_webhooklar_icin...

# 3. Canlı Domain Adresi
NEXT_PUBLIC_SITE_URL=https://www.sinavkocu.ai

# 4. Ödeme Altyapısı (iyzico / Shopier vb.)
# PAYMENT_API_KEY=...
# PAYMENT_SECRET_KEY=...
# PAYMENT_WEBHOOK_SECRET=...

# 5. Otomatik E-posta Servisi (Resend / SendGrid / Postmark)
# RESEND_API_KEY=re_...

# 6. Zamanlanmış Görevler (Cron) Gizli Anahtarı
CRON_SECRET=super_gizli_rastgele_uretilen_guvenlik_anahtari
```

---

## 💳 3. Ödeme & Abonelik Altyapısı

Platformda şu anda Pro üyelik akışı ve modalı eksiksiz tasarlanmış, test modunda simüle edilmektedir.
- [ ] **Ödeme Sağlayıcısı Seçimi:** iyzico, Shopier veya PayTR ile üye işyeri sözleşmesi yapılması.
- [ ] **Webhook Endpoint Doğrulaması:** `src/app/api/payment/webhook/route.ts` dosyasına ödeme sağlayıcısının gelen imza doğrulama (hash check) algoritmasının bağlanması.
- [ ] Başarılı ödemede kullanıcının `user_profiles.is_pro` durumunun otomatik olarak `true` yapılması (kod yapısı hazır durumdadır).

---

## 📧 4. Otomatik Veli Raporları & Cron İşleri

- [ ] **E-posta Sağlayıcısı Entegrasyonu:**
  - Haftalık veli analiz karnesini velinin e-postasına göndermek için `src/app/api/parent/send-email/route.ts` içine Resend / Nodemailer bağlantısı.
- [ ] **Otomatik Tetikleyici (Vercel Cron):**
  - `vercel.json` içerisine her pazar akşamı 20:00'de `/api/cron/weekly-parent-report` endpoint'ini çağıracak zamanlanmış görev tanımı:
  ```json
  {
    "crons": [
      {
        "path": "/api/cron/weekly-parent-report",
        "schedule": "0 17 * * 0"
      }
    ]
  }
  ```

---

## 🌐 5. Alan Adı (Domain) & Dağıtım (Deploy)

- [ ] **GitHub Deposu:** Kodların özel (private) bir GitHub deposuna aktarılması.
- [ ] **Vercel / Cloudflare Entegrasyonu:**
  - GitHub deposu Vercel'e bağlanarak "Import Project" yapılması.
  - Next.js preset'i seçilmesi ve yukarıdaki ortam değişkenlerinin girilmesi.
- [ ] **Özel Alan Adı (DNS):**
  - Satın alınan alan adı için DNS CNAME ve A kayıtlarının Vercel sunucularına yönlendirilmesi.
  - Otomatik SSL sertifikasının kontrol edilmesi.

---

## 🛡️ 6. Güvenlik, SEO & Canlı Test Kontrol Listesi

- [ ] `npm run build` komutunun 0 hata ile geçtiği doğrulandı (74 rotanın tamamı derleniyor).
- [ ] `robots.txt` ve `sitemap.xml` canlı domain URL'i ile kontrol edildi.
- [ ] Google Search Console ve Google Analytics (GA4) izleme kodları eklendi.
- [ ] Canlıda bir test kullanıcısı ile kayıt, giriş, deneme çözme ve yanlış defterine soru yükleme akışları uçtan uca test edildi.
