import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Allow external cover images (Supabase Storage + admin-pasted URLs).
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 301s from the old WordPress URLs (still indexed by Google, now 404) to their
  // current equivalents — recovers ranking/link equity and avoids 404s.
  async redirects() {
    return [
      // WordPress archive pages → blog
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      // Old service pages → services
      { source: '/tvorba-webstranok', destination: '/sluzby', permanent: true },
      { source: '/online-reklama', destination: '/sluzby', permanent: true },
      { source: '/spravovanie-socialnych-sieti', destination: '/sluzby', permanent: true },
      { source: '/reklama-na-internete', destination: '/sluzby', permanent: true },
      // Old portfolio → projects
      { source: '/portfolio', destination: '/projekty', permanent: true },
      // Old legal page name → current
      { source: '/vseobecne-obchodne-podmienky', destination: '/obchodne-podmienky', permanent: true },
      // Old WordPress blog permalinks (root-level) → blog
      { source: '/ako-vytvorit-efektivnu-webstranku-ktora-naozaj-predava', destination: '/blog', permanent: true },
      { source: '/preco-vas-web-nepredava-5-chyb-ktore-vas-stoja-zakaznikov', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
