# AWAKE · Brand Alignment — Design Spec

**Fecha:** 2026-05-12
**Rama:** `claude/redesign-landing-page-qWq0J`
**Alcance:** Fix crítico + ritmo de secciones (sin agregar secciones nuevas)
**Referencia visual:** `Awake Web Home.html` (adjunto) + `DESIGN.md` v2.1

---

## Resumen ejecutivo

El sitio Astro actual diverge del manual de marca DESIGN.md en tres áreas críticas: tokens de color incorrectos (violet erróneo, gold inexistente en la marca), hero editorial sobre fondo blanco en lugar de saturado violeta, y ritmo de secciones que viola la regla "nunca dos saturadas seguidas". Este spec corrige esos tres problemas ajustando archivos existentes — sin añadir nuevas secciones.

---

## 1 · Tokens de color — `src/styles/global.css`

### Correcciones

| Token Tailwind | Valor actual | Valor correcto | Motivo |
|---|---|---|---|
| `--color-violet` | `#8f3ab2` | `#6B2470` | DESIGN.md §02 |
| `--color-violet-dark` | `#513f73` | eliminado | renombrar |
| `--color-violet-deep` | ausente | `#3A1840` | DESIGN.md §02 `--violet-deep` |
| `--color-coral` | ausente | `#E89B7B` | DESIGN.md §02 acento puntual |
| `--color-gold` | `#f5c842` | **eliminado** | no existe en DESIGN.md |

### Limpieza de escalas legacy

Eliminar los cinco bloques de color heredados del scaffold inicial — no se usan en ningún componente:
- `--color-space-indigo-*` (10 tokens)
- `--color-vintage-grape-*` (10 tokens)
- `--color-jungle-teal-*` (10 tokens)
- `--color-bone-*` (10 tokens)
- `--color-powder-petal-*` (10 tokens)

### Propagación del renombrado `violet-dark` → `violet-deep`

Todas las clases Tailwind que referencien `violet-dark` deben actualizarse a `violet-deep` en el mismo paso:
- `bg-violet-dark` → `bg-violet-deep`
- `hover:bg-violet-dark` → `hover:bg-violet-deep`
- `text-violet-dark` → `text-violet-deep`

---

## 2 · Header — `src/components/Header.astro`

| Elemento | Antes | Después |
|---|---|---|
| Fondo | `bg-paper/95 backdrop-blur border-b border-rule` | `bg-violet/92 backdrop-blur border-b border-paper/10` |
| Logo variant | `<Logo />` (dark) | `<Logo variant="light" />` |
| Nav links | `text-ink hover:text-violet` | `text-paper/85 hover:text-paper` |
| Nav link activo | `text-violet` | `text-paper` |
| CTA desktop | `bg-ink text-paper hover:bg-violet` | `border border-paper/60 text-paper hover:bg-paper hover:text-violet` |
| Mobile border | `border-rule` | `border-paper/20` |
| Mobile nav links | `text-ink` | `text-paper/85` |
| Mobile CTA | `bg-ink text-paper` | `bg-paper text-violet` |

---

## 3 · Hero — `src/pages/index.astro` (sección 01)

Fondo: `bg-paper border-b border-rule` → `bg-violet`.  
El copy existente no cambia. Solo se adaptan colores de texto y botones al fondo violeta.

| Elemento | Antes | Después |
|---|---|---|
| Contenedor sección | `bg-paper border-b border-rule` | `bg-violet` |
| Meta-top labels | `text-violet` / `text-graphite/70` | `text-paper/70` / `text-paper/50` |
| `<h1>` base | `text-ink` | `text-paper` |
| `"invisibles"` em | `italic font-light text-violet` | `italic font-light text-coral` |
| Párrafo body | `text-graphite` | `text-paper/80` |
| Semibold "Método CORE" | `text-ink` | `text-paper` |
| Eyebrow CORE block | `text-violet` | `text-paper/50` |
| Letra CORE (C/O/R/E) | `text-violet` | `text-coral` |
| Stage label CORE | `text-graphite/60` | `text-paper/40` |
| Border del bloque CORE | `border-ink` | `border-paper/20` |
| Separadores `border-rule` dentro CORE | `border-rule` | `border-paper/10` |
| Quote italic al pie CORE | `text-graphite/70 font-sans` | `text-paper/40` |
| CTA primario | `variant="primary"` (bg-violet) | `variant="outline"` (border-paper, hover bg-paper text-violet) |
| CTA ghost | `text-ink border-b border-ink hover:text-violet hover:border-violet` | `text-paper/80 border-b border-paper/40 hover:text-paper hover:border-paper` |

### Marquee strip

| Elemento | Antes | Después |
|---|---|---|
| Fondo | `bg-paper` | `bg-violet-deep` |
| Texto | `text-ink` | `text-paper/90` |
| Bullet impar (era `text-gold`) | `text-gold` | `text-paper/40` |
| Bullet par (era `text-violet`) | `text-violet` | `text-coral` |

---

## 4 · Método CORE — `index.astro` (sección 03)

Corrección de ritmo: esta sección saturada entre el hero violeta y la sección de pilares viola la regla de alternancia.

| Elemento | Antes | Después |
|---|---|---|
| Fondo sección | `bg-violet-deep text-paper` | `bg-offwhite` |
| `<SectionTitle tone>` | `tone="dark"` | eliminar prop (default light) |
| `<CoreMethod tone>` | `tone="dark"` | eliminar prop (default light) |
| Botón | `variant="secondary"` | sin cambio (funciona en fondo claro) |

---

## 5 · Servicios — `index.astro` (sección 05) + `ServiceRow.astro` (nuevo)

### Sección

| Elemento | Antes | Después |
|---|---|---|
| Fondo | `bg-paper border-b border-rule` | `bg-violet text-paper` |
| `<SectionTitle tone>` | sin `tone` (light) | `tone="dark"` |
| Contenido | 3 `<PriceCard>` en grid `md:grid-cols-3` | Lista de 4 `<ServiceRow>` |
| Botón final | `variant="ghost"` | `variant="outline" onDark={true}` |

### Nuevo componente `src/components/ServiceRow.astro`

Props: `{ idx: string; name: string; nameItalic?: string; desc: string; href?: string }`

Estructura visual:
```
┌─────────────────────────────────────────────────────────────┐
│ 01   Branding & identidad    descripción corta         →    │
├─────────────────────────────────────────────────────────────┤
│ 02   Redes sociales          descripción corta         →    │
│ …                                                           │
└─────────────────────────────────────────────────────────────┘
```

Comportamiento:
- `border-top: 1px solid rgba(255,255,255,0.18)` en cada fila
- Nombre: `font-display font-bold text-[clamp(28px,5vw,56px)] leading-none tracking-[-0.02em] text-paper`
- La parte en cursiva del nombre (ej. "& identidad") usa `font-body italic font-light`
- Descripción: `font-body text-sm text-paper/85 max-w-[460px]`
- Arrow "→": `opacity-0 group-hover:opacity-100 transition-opacity`
- Hover: `hover:pl-4 transition-all duration-300` en el contenedor

### Datos — `src/data/content.ts` (añadir export)

```ts
export const serviceList = [
  { idx: "01", name: "Branding", nameItalic: "& identidad",
    desc: "Sistema visual completo, naming, manual de uso y dirección de arte.", href: "/servicios" },
  { idx: "02", name: "Redes sociales", nameItalic: undefined,
    desc: "Estrategia, contenido, sesión de fotos mensual y comunidad gestionada.", href: "/servicios" },
  { idx: "03", name: "Web", nameItalic: "& e-commerce",
    desc: "Diseño y desarrollo que convierte. SEO técnico y analítica mes a mes.", href: "/servicios" },
  { idx: "04", name: "Campañas pagadas", nameItalic: undefined,
    desc: "Meta Ads y Google Ads con foco en local. Reporting transparente desde el día uno.", href: "/servicios" },
];
```

---

## 6 · Cierre / Quote — `index.astro` (sección 07)

| Elemento | Antes | Después |
|---|---|---|
| Fondo | `bg-ink text-paper` | `bg-violet-deep text-paper` |
| Eyebrow "— Sinceridad ante todo" | `text-gold` | `text-paper/60` |
| `<Button variant>` CTA | `variant="secondary"` | `variant="outline" onDark={true}` |

El componente `Button` con `variant="outline"` sobre `bg-violet-deep` necesitará las clases correctas — ver sección 8.

---

## 7 · Footer — `src/components/Footer.astro`

| Elemento | Antes | Después |
|---|---|---|
| Fondo | `bg-ink text-paper` | `bg-violet text-paper` |
| Línea acento horizontal | `bg-gold` | `bg-coral` |
| "Método CORE · v2.0" label | `text-gold` | `text-paper/70` |
| Hover links de nav | `hover:text-gold` | `hover:text-coral` |
| Texto pie "Sin excusas…" | `text-gold` | `text-coral` |
| Bordes | `border-paper/10` | sin cambio ✓ |

---

## 8 · Componentes globales

### `src/components/Button.astro`

Añadir variante `"outline"`:
```ts
outline: "border border-violet text-violet hover:bg-violet hover:text-paper"
```

Para uso sobre fondos violeta/oscuros, el componente recibe una prop opcional `onDark?: boolean` que cambia las clases:
```ts
// si onDark === true
outline: "border border-paper/60 text-paper hover:bg-paper hover:text-violet"
```

Corregir variante `"ink"`:
- `hover:bg-gold hover:text-ink` → `hover:bg-coral hover:text-ink`

Añadir `"outline"` al tipo `Variant`.

### `src/components/CoreMethod.astro`

Dark tone:
- `hover:border-gold` → `hover:border-coral`
- `text-gold` (letra display) → `text-coral`

### `src/components/SectionTitle.astro`

Dark tone:
- `eyebrowColor`: `text-gold` → `text-paper/70`

### `src/components/PriceCard.astro`

Featured:
- Precio: `text-gold` → `text-paper`
- CTA: `bg-gold text-ink hover:bg-paper` → `bg-paper text-violet hover:bg-violet-soft`
- Acento horizontal (`<div class="mt-8 h-px w-12 bg-gold">`): `bg-gold` → `bg-coral`

---

## 9 · Regla de alternancia verificada (post-fix)

```
Header  → saturado violeta    ✓
01 Hero → saturado violeta    ✓
02 Mani → editorial blanco    ✓  (rompe saturado)
03 CORE → editorial offwhite  ✓
04 Pila → editorial viol-soft ✓
05 Svcs → saturado violeta    ✓  (rompe editorial)
06 SíNo → editorial offwhite  ✓  (rompe saturado)
07 Cier → saturado viol-deep  ✓  (rompe editorial)
Footer  → saturado violeta    ✓
```

Nunca dos saturadas consecutivas. Regla cumplida.

---

## 10 · Fuera de alcance (scope B)

Las siguientes secciones del HTML de referencia **no se añaden** en esta iteración:
- Casos / Portfolio (mosaico 12 col)
- Pricing (3 columnas)
- FAQ + Contacto
- CEO Quote (violet-deep dedicado)

Los SVG de `/public/assets/` (logos, iconos CORE, placeholders) tampoco se integran en esta iteración — son candidatos para un segundo fix.

---

## Archivos modificados

| Archivo | Tipo de cambio |
|---|---|
| `src/styles/global.css` | Tokens de color + limpieza legacy |
| `src/components/Header.astro` | Fondo violeta + texto blanco |
| `src/components/Footer.astro` | Fondo violeta + gold→coral |
| `src/components/Button.astro` | Variante outline + gold→coral |
| `src/components/CoreMethod.astro` | Dark tone gold→coral |
| `src/components/SectionTitle.astro` | Dark tone gold→paper/70 |
| `src/components/PriceCard.astro` | Featured gold→paper/coral |
| `src/components/ServiceRow.astro` | **Nuevo** — fila de servicio |
| `src/data/content.ts` | Añadir export `serviceList` |
| `src/pages/index.astro` | Hero, CORE, Servicios, Cierre |
