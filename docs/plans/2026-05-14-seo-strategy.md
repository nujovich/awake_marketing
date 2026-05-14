# Plan de SEO — Awake Marketing
**Sitio:** https://www.awakemarketing.es  
**Idiomas:** Español (principal) · Inglés · Italiano  
**Fecha:** 2026-05-14

---

## Estado actual (baseline)

| Elemento | Estado |
|---|---|
| `<title>` y `<meta description>` por página | ✅ Implementado |
| `hreflang` para es / en / it + x-default | ✅ Implementado |
| Vercel Analytics + Speed Insights | ✅ Implementado |
| `<link rel="canonical">` | ✅ **Añadido ahora** |
| Open Graph completo (og:url, og:image, og:locale) | ✅ **Añadido ahora** |
| Twitter Card | ✅ **Añadido ahora** |
| JSON-LD (MarketingAgency schema) | ✅ **Añadido ahora** |
| `robots.txt` | ✅ **Añadido ahora** |
| `sitemap.xml` dinámico con hreflang | ✅ **Añadido ahora** |
| OG Image 1200×630 PNG real | ❌ Pendiente |
| Google Search Console verificado | ❌ Pendiente |
| Blog / contenido editorial | ❌ Pendiente |
| Backlinks externos | ❌ Pendiente |

---

## Prioridad 1 — Fundación técnica (sprint 1, 1–2 semanas)

### 1.1 OG Image estática
El og:image actual apunta a `/og-image.png` que no existe aún.

**Acción:** Crear un archivo `public/og-image.png` de **1200 × 630 px** con:
- Fondo en los colores de marca (space-indigo / bone)
- Logo Awake centrado
- Tagline en tipografía Montserrat
- Sin texto pequeño (se ve en miniatura)

Herramientas: Figma, Canva, o generador con Satori/OG Image de Vercel.

### 1.2 www vs non-www (canonical)
El config de Astro apunta a `https://awakemarketing.es` (sin www).
Verificar cuál es el dominio principal en Vercel y asegurarse de que el otro redireccione con 301.

```
# En Vercel Dashboard → Domains
awakemarketing.es → redirect 301 → https://www.awakemarketing.es
```

Actualizar también `astro.config.mjs`:
```js
site: 'https://www.awakemarketing.es',
```

Y `public/robots.txt`:
```
Sitemap: https://www.awakemarketing.es/sitemap.xml
```

### 1.3 Google Search Console
1. Verificar propiedad en https://search.google.com/search-console
2. Método recomendado: archivo HTML en `public/` o meta tag de verificación en Layout.astro
3. Enviar el sitemap: `https://www.awakemarketing.es/sitemap.xml`
4. Configurar las dos propiedades (www y non-www) y marcar una como principal

### 1.4 Google Analytics 4
Vercel Analytics recoge datos propios. Para Google Ads y Search Console:
- Crear propiedad GA4
- Añadir el script de gtag en Layout.astro (o usar la integración `@astrojs/partytown` para no bloquear el render)

---

## Prioridad 2 — On-page y keywords (sprint 2, 2–4 semanas)

### 2.1 Keyword mapping por página

| Página ES | Keyword principal | Keyword secundaria |
|---|---|---|
| `/es/` | agencia de marketing Alicante | marketing digital Valencia |
| `/es/servicios/` | servicios de marketing digital | gestión redes sociales España |
| `/es/sobre-nosotros/` | agencia creativa Alicante | consultoría de marca |
| `/es/contacto/` | contactar agencia marketing | presupuesto marketing digital |

| Página EN | Keyword principal | Keyword secundaria |
|---|---|---|
| `/en/` | marketing agency Spain | digital marketing Alicante |
| `/en/services/` | digital marketing services Spain | brand strategy agency |
| `/en/about-us/` | creative marketing agency Spain | — |

**Herramientas de investigación de keywords:**
- Google Keyword Planner (gratis con cuenta Ads)
- Ubersuggest (gratis limitado)
- Semrush / Ahrefs (de pago, mayor precisión)

### 2.2 Optimización de títulos y descripciones

Reglas de longitud:
- `<title>`: 50–60 caracteres, incluir keyword principal + marca
- `<meta description>`: 140–160 caracteres, CTA implícito, sin truncar

Páginas con margen de mejora:
- `home.metaTitle` en ES: "Awake Marketing — Agencia de Marketing Digital en Alicante | Awake Marketing." → demasiado abstracto, añadir ubicación/servicio
- Propuesta: "Agencia de Marketing Digital en Alicante | Awake Marketing"

### 2.3 Heading hierarchy (H1 → H2 → H3)
Verificar que cada página tenga **exactamente un `<h1>`** que contenga la keyword principal.
Las secciones interiores deben usar `<h2>` / `<h3>`.

### 2.4 Imágenes y alt text
Todas las imágenes (incluyendo SVGs decorativos con `aria-hidden="true"`) deben tener:
- `alt` descriptivo con keyword cuando sea relevante
- `loading="lazy"` en imágenes below-the-fold
- Formato WebP o AVIF cuando sea posible

---

## Prioridad 3 — Contenido editorial (sprint 3+, continuo)

### 3.1 Blog en ES + EN
Un blog posiciona keywords de cola larga y genera tráfico orgánico sostenido.

**Arquitectura sugerida:**
```
/es/blog/
/es/blog/[slug]/
/en/blog/
/en/blog/[slug]/
```

**Primeros 6 artículos sugeridos (ES):**
1. "Cómo crear una estrategia de marca desde cero para pymes"
2. "Gestión de redes sociales: qué métricas importan realmente"
3. "Branding vs Marketing: diferencias clave para tu negocio"
4. "Por qué tu web no convierte (y cómo arreglarlo)"
5. "Guía de email marketing para negocios locales en España"
6. "Qué es el Método CORE y cómo transforma marcas"

**Frecuencia mínima:** 2 artículos/mes para construir autoridad.

### 3.2 Linkbuilding
- Directorios de agencias: Clutch.co, AgencySpy, designrush.com
- Medios locales: noticias de Alicante/Valencia con menciones de marca
- Guest posts en blogs de emprendimiento hispano
- Testimonios de clientes con enlace al sitio

### 3.3 Google My Business
Crear o reclamar ficha en Google Maps:
- Categoría: "Agencia de publicidad" / "Agencia de marketing"
- Fotos de equipo y oficina
- Descripción con keywords
- Responder reseñas activamente

---

## Prioridad 4 — Core Web Vitals y rendimiento

Métricas objetivo (Google PageSpeed ≥ 90 en mobile):

| Métrica | Objetivo |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5 s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200 ms |

**Acciones específicas:**
1. **Preload de la fuente Montserrat** — añadir `<link rel="preload">` para el subset más crítico
2. **`font-display: swap`** — ya está en la URL de Google Fonts (incluido por defecto)
3. **Imágenes con dimensiones explícitas** — para evitar CLS
4. **Lazy load del RadarOrb** — el componente SVG animado puede retrasar el LCP si está above-the-fold

---

## Métricas y seguimiento

| KPI | Herramienta | Frecuencia |
|---|---|---|
| Posiciones por keyword | Google Search Console | Mensual |
| Tráfico orgánico | GA4 / Vercel Analytics | Semanal |
| Core Web Vitals | PageSpeed Insights | Cada deploy |
| Backlinks ganados | Ahrefs / Search Console | Mensual |
| CTR en SERP | Google Search Console | Mensual |

---

## Checklist de implementación

- [x] Canonical URL en todas las páginas
- [x] Open Graph completo
- [x] Twitter Card
- [x] JSON-LD MarketingAgency
- [x] robots.txt
- [x] sitemap.xml dinámico con hreflang
- [ ] Crear `public/og-image.png` (1200×630 px)
- [ ] Definir dominio canónico (www vs non-www) y configurar redirect en Vercel
- [ ] Verificar propiedad en Google Search Console y enviar sitemap
- [ ] Crear propiedad GA4 e integrar
- [ ] Optimizar `<title>` y `<meta description>` con keywords geográficas
- [ ] Auditar H1 en cada página
- [ ] Crear ficha Google My Business
- [ ] Publicar primer artículo de blog
