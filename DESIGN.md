# AWAKE — Manual de Marca

**Estudio:** Marketing Digital · Valencia · Alicante
**CEO:** Stefania Franco
**Método:** CORE
**Versión:** 2.1 — Mayo 2026

> "Cuidamos tu marca como si fuera la nuestra."
> Despertamos el potencial oculto de los negocios físicos: identidad, estructura y resultados medibles.

---

## Resumen ejecutivo

La identidad AWAKE convive en dos universos: un **violeta saturado** que ocupa todo el lienzo (presencia, autoridad, energía) y un **monocromo editorial** sobre blanco/negro (silencio, sofisticación, oficio). El sistema no elige uno u otro: los alterna como ritmo a lo largo de la web — secciones violetas a pantalla completa, intercaladas con secciones blancas tipo portfolio.

| Eje | Modo "Saturado" | Modo "Editorial" |
|---|---|---|
| Fondo | `--violet` `#6B2470` | `--paper` `#FFFFFF` / `--offwhite` `#F4F4F4` |
| Tipografía | Montserrat blanco, grande | Montserrat negro, condensado |
| Imagen | Plana, simbólica, llena de aire | Fotografía real, marco fino |
| Uso | Hero, CTA, divisores narrativos | Servicios, casos, equipo, listas |

---

## 01 · Identidad gráfica

Wordmark **AWAKE** en Montserrat Bold con letterspacing amplio. Debajo, una tira blanca centrada con la palabra **MARKETING** (tracking ≥ 6 px), opcionalmente acompañada de la tagline en cursiva. Para portfolio se admite la versión sin tira, todo en blanco sobre violeta.

### Versiones disponibles (en `/assets/`)

| Archivo | Uso |
|---|---|
| `logo-awake-primary.svg` | Lockup violeta sobre fondo claro |
| `logo-awake-inverse.svg` | Lockup blanco sobre violeta — versión por defecto en hero/social |
| `logo-awake-mono-black.svg` | Versión 1-tinta negro sobre blanco |
| `logo-awake-monogram.svg` | Círculo violeta con "A" — favicon, avatar IG, sello |

### Construcción

| Regla | Valor |
|---|---|
| Zona de protección | ≥ 1× altura "A" en todos los lados |
| Tamaño mínimo digital | 96 px de ancho (lockup) · 32 px (monograma) |
| Tamaño mínimo impreso | 22 mm de ancho (lockup) · 8 mm (monograma) |
| Tira "MARKETING" | Siempre centrada, fondo blanco puro, tracking 6–11 px |
| Tagline (opcional) | Raleway Italic 300, 1.5 px letterspacing |

### Usos prohibidos

- No rotar ni inclinar el wordmark.
- No estirar, comprimir ni añadir contornos.
- No usar la tira "MARKETING" en otro color que blanco.
- No aplicar sombras paralelas, brillos, neón o degradados al wordmark.
- No reemplazar Montserrat por otra sans (incluidas system-ui o Arial).

---

## 02 · Paleta cromática

Sistema dual: violeta saturado para presencia + neutros para lectura. El **coral** es un acento bajo, solo en composiciones de portfolio o stories. Sin colores secundarios saturados.

| Token | HEX | Rol |
|---|---|---|
| `--violet` | `#6B2470` | Primario · fondos saturados · CTA |
| `--violet-deep` | `#3A1840` | Cabecera oscura · profundidad · sombras |
| `--violet-soft` | `#F3E9F7` | Tinte de sección, fondos de card |
| `--violet-line` | `#E6D5EE` | Bordes finos, separadores |
| `--ink` | `#0A0A0A` | Tipografía sobre blanco |
| `--graphite` | `#2C2C2C` | Cuerpo de texto secundario |
| `--paper` | `#FFFFFF` | Fondo editorial · tira de logo |
| `--offwhite` | `#F4F4F4` | Fondo de sección alterna |
| `--coral` | `#E89B7B` | Acento puntual (portfolio, social) |
| `--rule` | `#E8E4EA` | Líneas de 1 px |

### Contraste (WCAG)

| Combinación | Ratio | Nivel |
|---|---|---|
| Blanco sobre `--violet` | 9.1 : 1 | AAA |
| Blanco sobre `--violet-deep` | 14.4 : 1 | AAA |
| `--violet` sobre blanco | 9.1 : 1 | AAA |
| `--ink` sobre `--offwhite` | 19.7 : 1 | AAA |

---

## 03 · Sistema tipográfico

**Montserrat** para todo lo display y de marca. **Raleway** para cuerpo extenso y cursivas editoriales. Los headings se trabajan con letter-spacing **positivo amplio** (4–12 px) — es la huella visual del lockup.

| Rol | Familia / Peso | Tamaño (desktop) | Tracking | Notas |
|---|---|---|---|---|
| **Display XXL** | Montserrat Bold 700 | 140–200 px | +6 a +12 px | Hero "AWAKE" |
| **H1** | Montserrat Bold 700 | 72–96 px | −0.02 em | Portadas de sección |
| **H2** | Montserrat SemiBold 600 | 40–56 px | −0.01 em | Título de sección |
| **H3** | Montserrat Medium 500 | 22–28 px | +1 px | Cards y bloques |
| **Eyebrow** | Montserrat Medium 500 | 11–13 px | +0.22 em UPPER | Pre-titular, etiquetas |
| **Body** | Raleway Regular 400 | 15–17 px | 0 · 1.55 line | Lectura larga |
| **Caption / Quote** | Raleway Italic 300 | 13–15 px | 0 | Pies, citas |
| **Tag pill** | Montserrat Medium 500 | 12 px | +6 a +11 px UPPER | Tira "MARKETING" |

### Reglas de escritura

- Mayúsculas con tracking solo para etiquetas, tags y la tira del logo. Nunca para párrafos.
- Cursiva Raleway para frases-tagline ("Cuidamos tu marca como si fuera la nuestra"), citas y pies.
- Sin subrayados decorativos. Los enlaces usan color violeta + underline en hover.

---

## 04 · Composición y rejilla

### Contenedor

| Breakpoint | Ancho contenedor | Padding lateral |
|---|---|---|
| Móvil (≤ 480 px) | 100% | 20 px |
| Tablet (481–1023 px) | 100% | 32 px |
| Laptop (1024–1279 px) | máx. 1120 px | 40 px |
| Desktop (≥ 1280 px) | máx. 1280 px | 56 px |
| Wide (≥ 1600 px) | máx. 1400 px | 80 px |

### Rejilla

- **12 columnas** en desktop con gutter 24 px.
- **8 columnas** en tablet con gutter 16 px.
- **4 columnas** en móvil con gutter 12 px.
- Padding vertical de sección: `clamp(56px, 8vw, 120px)`.

### Ritmo de secciones (web home)

| # | Sección | Modo | Alto típico (desktop) |
|---|---|---|---|
| 01 | Hero "AWAKE" | Saturado violeta full-bleed | 100 vh (mín. 720 px) |
| 02 | Tagline + manifesto | Editorial blanco | auto · 80–96 px padding |
| 03 | Método CORE (4 letras) | Editorial blanco con tinte `--violet-soft` | auto · 120 px padding |
| 04 | Servicios | Saturado violeta · tipografía grande | 90 vh |
| 05 | Casos / Portfolio | Editorial blanco · grid 12 col | auto |
| 06 | Quote / CEO | Saturado `--violet-deep` | 60 vh |
| 07 | Pricing | Editorial blanco · 3 columnas | auto · 120 px padding |
| 08 | FAQ + Contacto | Editorial `--offwhite` | auto · 96 px padding |
| 09 | Footer | Saturado violeta | auto · 80 px padding |

Regla simple: nunca dos secciones saturadas seguidas. Siempre alternancia para descansar el ojo.

---

## 05 · Media queries (referencia)

```css
/* Mobile-first base. Override up. */
:root {
  --container: 100%;
  --pad: 20px;
  --h-display: clamp(64px, 18vw, 200px);
  --h1: clamp(40px, 8vw, 96px);
  --h2: clamp(28px, 5vw, 56px);
  --section-y: clamp(56px, 8vw, 120px);
}

/* Tablet */
@media (min-width: 481px) {
  :root { --pad: 32px; }
}

/* Laptop */
@media (min-width: 1024px) {
  :root { --container: 1120px; --pad: 40px; }
  .grid-2-up   { grid-template-columns: 1fr 1fr; }
  .grid-3-up   { grid-template-columns: repeat(3, 1fr); }
  .grid-4-up   { grid-template-columns: repeat(4, 1fr); }
}

/* Desktop */
@media (min-width: 1280px) {
  :root { --container: 1280px; --pad: 56px; }
}

/* Wide */
@media (min-width: 1600px) {
  :root { --container: 1400px; --pad: 80px; }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

/* Print — vuelca todo a editorial monocromo */
@media print {
  .bg-violet, .bg-violet-deep { background: #fff !important; color: #0A0A0A !important; }
  .no-print { display: none !important; }
}
```

### Comportamientos por breakpoint

| Componente | Móvil | Tablet | Desktop |
|---|---|---|---|
| Topbar | Logo + hamburguesa | Logo + 3 links + CTA | Logo + 5 links + CTA |
| Hero AWAKE | wordmark al 70 vw, centrado | 60 vw | 50 vw, tagline en cursiva |
| Método CORE | Stack vertical (1 col) | 2 × 2 | 4 × 1 |
| Servicios | 1 col, cards full-width | 2 col | 3 col, hover reveal |
| Casos | 1 col 4:5 portrait | 2 col | 12-col mosaico (1+2 / 2+1) |
| Pricing | 1 col, featured primero | 1 col | 3 col, featured central |
| Footer | 1 col, todo apilado | 2 col | 4 col |

---

## 06 · Componentes UI

### Botones (`.btn`)

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| `.btn-solid` | `--violet` | blanco | CTA principal |
| `.btn-outline` | transparente | `--violet`, borde 1 px | Secundario |
| `.btn-ink` | `--ink` | blanco | Énfasis editorial |
| `.btn-ghost` | transparente | `--violet` + flecha "→" | Inline |

Todos: padding `16px 28px`, Montserrat SemiBold 13 px, tracking +0.14 em, **sin border-radius**, transición de 200 ms en hover (invierte fondo/texto).

### Tag pill (firma de la marca)

- Fondo blanco puro, texto `--violet` Montserrat Medium, tracking 6–11 px.
- Altura fija 22–26 px, padding lateral 12 px, **sin radius**.
- Modo inverso: fondo `--violet`, texto blanco — solo cuando va sobre fondo de imagen.

### Card · Servicio

- Borde 1 px `--violet-line`, fondo `--paper`, padding 32 px.
- Header con eyebrow + número (01, 02…), título Montserrat 22 px, descripción Raleway 15 px.
- Hover (desktop ≥ 1024 px): fondo se llena de `--violet`, texto invierte, micro-translateY −2 px.

### Card · Caso / Portfolio

- Imagen 4:5 portrait (móvil), 3:4 o 1:1 en desktop según slot del mosaico.
- Pie: cliente (Montserrat Medium 12 px tracking) + métrica destacada (Montserrat Bold 28 px).
- Sin marco — la imagen es el marco.

### Pricing card

- Borde 1 px `--violet`, padding 32 px, fondo `--paper`.
- Featured: fondo `--violet`, texto blanco, ribbon Montserrat 10 px tracking +0.22 em.
- Precio Montserrat Light 42 px con `<small>` de unidad.

### Inputs y formulario

- Borde 1 px `--violet-line`, padding `18px 20px`, fondo `--paper`.
- Placeholder en `--violet` opacidad 0.4 italic.
- Focus: borde sólido `--violet`, sin outline-ring.
- Mensaje de error en `--ink` (no rojo) con icono "!" mínimo.

---

## 07 · Voz & tono

Cercana pero seria. Directa, sin artificios. Confiada sin arrogancia.

**Sí decimos**
- "Cuidamos tu marca como si fuera la nuestra."
- "Despertamos el potencial oculto de tu marca."
- "Resultados visibles en 60 días o no seguimos."
- "Sin permanencia. Mes a mes."

**No decimos**
- "Soluciones integrales 360°."
- "Garantizamos el éxito de tu marca."
- "Amplia experiencia en el sector."
- Inglés innecesario, jerga de agencia, superlativos.

---

## 08 · Activos en `/assets/`

| Archivo | Tipo | Notas |
|---|---|---|
| `logo-awake-primary.svg` | SVG | Lockup violeta sobre fondo claro |
| `logo-awake-inverse.svg` | SVG | Lockup blanco sobre violeta |
| `logo-awake-mono-black.svg` | SVG | 1 tinta negro |
| `logo-awake-monogram.svg` | SVG | Avatar / favicon |
| `pattern-grid.svg` | SVG | Trama editorial (12 col) |
| `divider-rule.svg` | SVG | Línea de sección |
| `swatch-violet.svg` | SVG | Muestra de color primaria |
| `swatch-coral.svg` | SVG | Muestra de acento |
| `icon-core-c.svg` | SVG | Icono Claridad |
| `icon-core-o.svg` | SVG | Icono Orden |
| `icon-core-r.svg` | SVG | Icono Realce |
| `icon-core-e.svg` | SVG | Icono Expansión |
| `placeholder-portrait.svg` | SVG | Slot 4:5 (equipo, retratos) |
| `placeholder-landscape.svg` | SVG | Slot 5:3 (casos, paisaje) |
| `placeholder-square.svg` | SVG | Slot 1:1 (social, intro) |

---

## Tokens — copia rápida

```css
:root {
  --violet:       #6B2470;
  --violet-deep:  #3A1840;
  --violet-soft:  #F3E9F7;
  --violet-line:  #E6D5EE;
  --ink:          #0A0A0A;
  --graphite:     #2C2C2C;
  --paper:        #FFFFFF;
  --offwhite:     #F4F4F4;
  --coral:        #E89B7B;
  --rule:         #E8E4EA;

  --font-display: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  --font-body:    "Raleway", system-ui, sans-serif;
}
```
