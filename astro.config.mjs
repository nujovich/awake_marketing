// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://awakemarketing.es',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'it'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vercel/analytics'],
    },
    ssr: {
      noExternal: ['@vercel/analytics'],
    },
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false,
    },
  }),
});
