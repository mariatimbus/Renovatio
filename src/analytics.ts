// Google Analytics 4 — se activează doar dacă gaId este setat (Setari din Sheets sau content.ts).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initGA(gaId: string): void {
  if (!gaId || document.getElementById('ga-src')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
  const s = document.createElement('script');
  s.id = 'ga-src';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(s);
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  window.gtag?.('event', name, params);
}
