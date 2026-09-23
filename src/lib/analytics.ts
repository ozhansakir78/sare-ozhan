export type AnalyticsEvent =
  | 'calculate_score'
  | 'save_exam'
  | 'upload_question'
  | 'start_socratic_ai'
  | 'view_parent_report'
  | 'share_parent_report_whatsapp'
  | 'share_parent_report_phone_whatsapp'
  | 'send_parent_report_email'
  | 'open_pro_modal'
  | 'start_checkout'
  | 'complete_purchase';

interface EventProperties {
  [key: string]: string | number | boolean | undefined | null;
}

export function trackEvent(eventName: AnalyticsEvent, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;

  // 1. Geliştirme ortamı / Konsol takibi
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event: ${eventName}]`, properties || {});
  }

  // 2. Google Analytics (gtag) entegrasyonu
  try {
    const win = window as unknown as {
      gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    };

    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, properties as Record<string, unknown>);
    }
  } catch (err) {
    console.warn('Analytics event dispatch error:', err);
  }

  // 3. Yerel CustomEvent yayınlama (uygulama içi dinleyiciler ve telemetry için)
  try {
    const customEvent = new CustomEvent('sinavkocu_event', {
      detail: { eventName, properties, timestamp: new Date().toISOString() },
    });
    window.dispatchEvent(customEvent);
  } catch {}
}
