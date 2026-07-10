// GTM sa načítava vlastným <Script> (lazyOnload), nie cez @next/third-parties,
// takže si typ dataLayer deklarujeme sami.
export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
