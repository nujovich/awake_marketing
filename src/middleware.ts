import { defineMiddleware } from 'astro:middleware';

const SUPPORTED = ['es', 'en', 'it'] as const;
type Locale = (typeof SUPPORTED)[number];

function detectLocale(acceptLanguage: string): Locale {
  const candidates = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().slice(0, 2).toLowerCase());
  for (const c of candidates) {
    if (SUPPORTED.includes(c as Locale)) return c as Locale;
  }
  return 'es';
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Server-side 301 redirect for the root path so Google never sees a
  // meta-refresh redirect page, and PageRank flows correctly.
  if (pathname === '/') {
    const locale = detectLocale(
      context.request.headers.get('accept-language') ?? '',
    );
    return context.redirect(`/${locale}/`, 301);
  }

  return next();
});
