import type { APIRoute } from 'astro';

// All static pages grouped by equivalent slug across locales.
// Update this list whenever a new page is added.
const pageGroups: Array<{
  priority: string;
  changefreq: string;
  urls: Record<string, string>;
}> = [
  {
    priority: '1.0',
    changefreq: 'weekly',
    urls: { es: '/es/', en: '/en/', it: '/it/' },
  },
  {
    priority: '0.9',
    changefreq: 'monthly',
    urls: { es: '/es/servicios/', en: '/en/services/', it: '/it/servizi/' },
  },
  {
    priority: '0.8',
    changefreq: 'monthly',
    urls: { es: '/es/sobre-nosotros/', en: '/en/about-us/', it: '/it/chi-siamo/' },
  },
  {
    priority: '0.7',
    changefreq: 'monthly',
    urls: { es: '/es/contacto/', en: '/en/contact/', it: '/it/contatto/' },
  },
];

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? 'https://www.awakemarketing.es';

  const urlEntries = pageGroups.flatMap((group) =>
    Object.entries(group.urls).map(([, path]) => {
      const alternates = Object.entries(group.urls)
        .map(
          ([loc, altPath]) =>
            `    <xhtml:link rel="alternate" hreflang="${loc}" href="${siteUrl}${altPath}"/>`,
        )
        .join('\n');

      // x-default points to the Spanish version
      const xDefault = group.urls['es']
        ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${group.urls['es']}"/>`
        : '';

      return `  <url>
    <loc>${siteUrl}${path}</loc>
${alternates}
${xDefault}
    <changefreq>${group.changefreq}</changefreq>
    <priority>${group.priority}</priority>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
