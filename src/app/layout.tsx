import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sinavkocu.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LGS Puan ve Yüzdelik Dilim Hesaplama 2027 | SınavKoçu",
    template: "%s | SınavKoçu LGS",
  },
  description:
    "MEB standart katsayılarına göre 2027 LGS deneme puanınızı, ders bazlı netlerinizi ve tahmini yüzdelik diliminizi anında hesaplayın. Yanlış defteri ve Sokratik AI koç ile eksik kapatın.",
  keywords: [
    "LGS puan hesaplama",
    "LGS yüzdelik dilim hesaplama",
    "LGS net hesaplama",
    "LGS deneme puanı hesaplama 2027",
    "LGS puan hesaplama 2027",
    "LGS soru çözümü",
    "LGS konuları",
    "LGS hazırlık",
    "8. sınıf deneme sınavı",
    "yanlış defteri",
    "sınav koçu",
  ],
  authors: [{ name: "SınavKoçu" }],
  creator: "SınavKoçu",
  publisher: "SınavKoçu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE_URL,
    siteName: "SınavKoçu LGS",
    title: "LGS Puan ve Yüzdelik Dilim Hesaplama 2027 | SınavKoçu",
    description:
      "MEB standart katsayılarına göre 2027 LGS deneme puanınızı, ders bazlı netlerinizi ve tahmini yüzdelik diliminizi anında hesaplayın.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SınavKoçu LGS Puan Hesaplama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LGS Puan ve Yüzdelik Dilim Hesaplama 2027",
    description:
      "MEB standart katsayılarına göre LGS deneme puanınızı anında hesaplayın. Yanlış defteri ve AI koç ile eksik kapatın.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "education",
};

// JSON-LD yapılandırılmış veri (Google Rich Results için)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SınavKoçu LGS",
  url: BASE_URL,
  description:
    "MEB standart katsayılarına göre LGS deneme puanı, yüzdelik dilim hesaplama ve Sokratik AI soru çözüm platformu.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
    description: "Ücretsiz LGS puan hesaplama ve günde 3 AI soru çözümü",
  },
  educationalLevel: "8. Sınıf (LGS)",
  inLanguage: "tr",
  author: {
    "@type": "Organization",
    name: "SınavKoçu",
  },
};

import { AuthProvider } from "@/components/auth/AuthProvider";
import { FocusProvider } from "@/components/focus/FocusContext";
import { FloatingFocusWidget } from "@/components/focus/FloatingFocusWidget";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { EventAnnouncementModal } from "@/components/notifications/EventAnnouncementModal";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <AuthProvider>
          <FocusProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingFocusWidget />
            <EventAnnouncementModal />
          </FocusProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
