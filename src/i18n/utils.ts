// src/i18n/utils.ts
import { getRelativeLocaleUrl } from 'astro:i18n';

export const slugMap: Record<string, Record<string, string>> = {
  'sobre-nosotros': { en: 'about-us',  it: 'chi-siamo' },
  'servicios':      { en: 'services',  it: 'servizi'   },
  'contacto':       { en: 'contact',   it: 'contatto'  },
};

const reverseSlugMap: Record<string, Record<string, string>> = {
  'about-us':  { es: 'sobre-nosotros', it: 'chi-siamo'  },
  'services':  { es: 'servicios',      it: 'servizi'    },
  'contact':   { es: 'contacto',       it: 'contatto'   },
  'chi-siamo': { es: 'sobre-nosotros', en: 'about-us'   },
  'servizi':   { es: 'servicios',      en: 'services'   },
  'contatto':  { es: 'contacto',       en: 'contact'    },
};

export function getLocalizedUrl(targetLocale: string, currentSlug: string): string {
  if (!currentSlug) return getRelativeLocaleUrl(targetLocale, '/');
  const mapped =
    slugMap[currentSlug]?.[targetLocale] ??
    reverseSlugMap[currentSlug]?.[targetLocale] ??
    currentSlug;
  return getRelativeLocaleUrl(targetLocale, mapped);
}
