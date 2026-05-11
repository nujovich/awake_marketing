# Brand Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the color token system and section rhythm of the AWAKE landing page to match DESIGN.md v2.1 and the HTML reference, without adding new sections.

**Architecture:** Foundation-first: fix CSS tokens in Task 1 (everything else depends on correct token names), then repair each affected component independently, then rework `index.astro` section by section. Each task produces a clean, buildable commit. No test framework exists — verification is `npm run build` (catches TS/Astro compile errors) plus inline visual notes.

**Tech Stack:** Astro 6, Tailwind CSS v4 (`@theme` block in `global.css`), TypeScript, no test runner.

---

## File map

| File | Change type | Summary |
|---|---|---|
| `src/styles/global.css` | Modify | Fix token values, rename `violet-dark`→`violet-deep`, add `coral`, remove `gold` and 5 legacy scales |
| `src/components/Button.astro` | Modify | Add `"outline"` variant + `onDark` prop; fix `ink` hover gold→coral |
| `src/components/SectionTitle.astro` | Modify | Dark-tone eyebrow: `text-gold` → `text-paper/70` |
| `src/components/CoreMethod.astro` | Modify | Dark-tone letter + border: `gold` → `coral` |
| `src/components/PriceCard.astro` | Modify | Featured: price/badge/accent `gold`→`paper`/`coral`; border hover `violet-dark`→`violet-deep` |
| `src/components/ServiceRow.astro` | Create | Service list row: index + large name + description + hover arrow |
| `src/data/content.ts` | Modify | Add `serviceList` export (4 items) |
| `src/components/Header.astro` | Modify | `bg-paper` → `bg-violet/92`; links and CTA go white |
| `src/components/Footer.astro` | Modify | `bg-ink` → `bg-violet`; `gold` → `coral` throughout |
| `src/pages/index.astro` | Modify | Hero → violet; CORE → offwhite; Servicios → violet+list; Cierre → violet-deep; gold cleanup in Pillars + Sí/No |

---

## Task 1: Color tokens

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Replace the `@theme` color block**

  Open `src/styles/global.css`. Replace the entire `@theme { … }` block (lines 3–115) with:

  ```css
  @theme {
    /* ====== Paleta Awake (DESIGN.md v2.1) ====== */
    --color-ink:          #0a0a0a;
    --color-graphite:     #2c2c2c;
    --color-paper:        #ffffff;
    --color-offwhite:     #f4f4f4;
    --color-rule:         #e8e4ea;

    --color-violet:       #6b2470;
    --color-violet-deep:  #3a1840;
    --color-violet-soft:  #f3e9f7;
    --color-violet-line:  #e6d5ee;
    --color-coral:        #e89b7b;

    /* ====== Tipografía ====== */
    --font-sans:     "Raleway", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-display:  "Montserrat", ui-sans-serif, system-ui, -apple-system, sans-serif;

    /* ====== Animaciones ====== */
    --animate-fade-up: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    --animate-fade-in: fade-in 0.6s ease-out both;

    @keyframes fade-up {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
  }
  ```

  Everything below the closing `}` of `@theme` stays unchanged.

- [ ] **Verify build compiles**

  ```bash
  cd /home/nujovich/awake_marketing && npm run build 2>&1 | tail -20
  ```

  Expected: build completes. Likely warnings about unused `gold`/`violet-dark` classes — those are expected and will be cleaned up in subsequent tasks. A hard error means a CSS syntax problem — check brace matching.

- [ ] **Commit**

  ```bash
  git add src/styles/global.css
  git commit -m "fix(tokens): correct violet to #6B2470, add coral, rename to violet-deep, remove gold and legacy scales"
  ```

---

## Task 2: Button component

**Files:**
- Modify: `src/components/Button.astro`

- [ ] **Replace the full file content**

  ```astro
  ---
  type Variant = "primary" | "secondary" | "outline" | "ghost" | "ink";

  interface Props {
    href?: string;
    variant?: Variant;
    type?: "button" | "submit";
    class?: string;
    arrow?: boolean;
    onDark?: boolean;
  }

  const {
    href,
    variant = "primary",
    type = "button",
    class: cls = "",
    arrow = true,
    onDark = false,
  } = Astro.props;

  const base =
    "group inline-flex items-center justify-center gap-3 px-7 py-4 font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:ring-violet";

  const styles: Record<Variant, string> = {
    primary:   "bg-violet text-paper hover:bg-violet-deep",
    secondary: "border border-violet text-violet hover:bg-violet hover:text-paper",
    outline:   onDark
                 ? "border border-paper/60 text-paper hover:bg-paper hover:text-violet"
                 : "border border-violet text-violet hover:bg-violet hover:text-paper",
    ghost:     onDark
                 ? "text-paper/80 hover:text-paper border-b border-paper/40 hover:border-paper pb-1 px-0"
                 : "text-ink hover:text-violet border-b border-ink hover:border-violet pb-1 px-0",
    ink:       "bg-ink text-paper hover:bg-coral hover:text-ink",
  };

  const className = `${base} ${styles[variant]} ${cls}`.trim();

  const Tag = href ? "a" : "button";
  ---

  <Tag class={className} href={href} type={!href ? type : undefined}>
    <slot />
    {
      arrow && (
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )
    }
  </Tag>
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  Expected: no TypeScript errors on `Button.astro`.

- [ ] **Commit**

  ```bash
  git add src/components/Button.astro
  git commit -m "feat(Button): add outline variant with onDark prop; fix ink hover gold→coral"
  ```

---

## Task 3: SectionTitle component

**Files:**
- Modify: `src/components/SectionTitle.astro`

- [ ] **Fix dark-tone eyebrow color** (line 21)

  Find:
  ```ts
  const eyebrowColor = tone === "dark" ? "text-gold" : "text-violet";
  ```
  Replace with:
  ```ts
  const eyebrowColor = tone === "dark" ? "text-paper/70" : "text-violet";
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

- [ ] **Commit**

  ```bash
  git add src/components/SectionTitle.astro
  git commit -m "fix(SectionTitle): dark tone eyebrow gold→paper/70"
  ```

---

## Task 4: CoreMethod component

**Files:**
- Modify: `src/components/CoreMethod.astro`

- [ ] **Fix dark-tone gold references** (lines 13 and 15)

  Find:
  ```ts
  const cardBorder =
    tone === "dark" ? "border-paper/15 hover:border-gold" : "border-violet-line hover:border-violet";
  ```
  Replace with:
  ```ts
  const cardBorder =
    tone === "dark" ? "border-paper/15 hover:border-coral" : "border-violet-line hover:border-violet";
  ```

  Find:
  ```ts
  const letterColor = tone === "dark" ? "text-gold" : "text-violet";
  ```
  Replace with:
  ```ts
  const letterColor = tone === "dark" ? "text-coral" : "text-violet";
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

- [ ] **Commit**

  ```bash
  git add src/components/CoreMethod.astro
  git commit -m "fix(CoreMethod): dark tone letter and border gold→coral"
  ```

---

## Task 5: PriceCard component

**Files:**
- Modify: `src/components/PriceCard.astro`

- [ ] **Fix all gold and violet-dark references**

  Change 1 — non-featured border hover (line 16):
  ```ts
  // Before
  : "bg-paper text-ink border border-violet hover:border-violet-dark",
  // After
  : "bg-paper text-ink border border-violet hover:border-violet-deep",
  ```

  Change 2 — featured badge background (line 25):
  ```ts
  // Before
  featured ? "bg-gold text-ink" : "bg-ink text-paper",
  // After
  featured ? "bg-coral text-paper" : "bg-ink text-paper",
  ```

  Change 3 — horizontal accent line (line 53):
  ```ts
  // Before
  featured ? "bg-gold" : "bg-violet"
  // After
  featured ? "bg-coral" : "bg-violet"
  ```

  Change 4 — featured price color (line 59):
  ```ts
  // Before
  featured ? "text-gold" : "text-ink",
  // After
  featured ? "text-paper" : "text-ink",
  ```

  Change 5 — featured bullet dot (line 97):
  ```ts
  // Before
  featured ? "bg-gold" : "bg-violet",
  // After
  featured ? "bg-coral" : "bg-violet",
  ```

  Change 6 — featured CTA button (line 120):
  ```ts
  // Before
  ? "bg-gold text-ink hover:bg-paper"
  // After
  ? "bg-paper text-violet hover:bg-violet-soft"
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

- [ ] **Commit**

  ```bash
  git add src/components/PriceCard.astro
  git commit -m "fix(PriceCard): featured gold→coral/paper, border hover violet-dark→violet-deep"
  ```

---

## Task 6: ServiceRow component (new)

**Files:**
- Create: `src/components/ServiceRow.astro`

- [ ] **Create the file**

  ```astro
  ---
  interface Props {
    idx: string;
    name: string;
    nameItalic?: string;
    desc: string;
    href?: string;
  }

  const { idx, name, nameItalic, desc, href = "#" } = Astro.props;
  ---

  <a
    href={href}
    class="group flex flex-wrap items-end gap-4 sm:grid sm:grid-cols-[80px_1fr_1fr_60px] sm:gap-8 py-8 sm:py-10 border-t border-paper/18 transition-all duration-300 hover:pl-4"
  >
    <span class="font-display font-light text-sm tracking-[0.16em] text-paper/70">
      {idx}
    </span>

    <span class="font-display font-bold text-[clamp(28px,5vw,56px)] leading-none tracking-[-0.02em] text-paper">
      {name}{nameItalic && (
        <em class="font-body italic font-light"> {nameItalic}</em>
      )}
    </span>

    <span class="font-body text-sm leading-relaxed text-paper/85 max-w-[460px]">
      {desc}
    </span>

    <span class="font-display text-xs tracking-[0.18em] uppercase text-paper/0 group-hover:text-paper/80 transition-colors duration-300 text-right">
      Saber más →
    </span>
  </a>
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  Expected: no errors. The component won't appear anywhere yet — it gets wired in Task 9 (Servicios).

- [ ] **Commit**

  ```bash
  git add src/components/ServiceRow.astro
  git commit -m "feat(ServiceRow): new typographic service list row component"
  ```

---

## Task 7: serviceList data

**Files:**
- Modify: `src/data/content.ts`

- [ ] **Add the export at the end of the file** (after the `faq` export, before the final closing)

  ```ts
  export const serviceList = [
    {
      idx: "01",
      name: "Branding",
      nameItalic: "& identidad",
      desc: "Sistema visual completo, naming, manual de uso y dirección de arte.",
      href: "/servicios",
    },
    {
      idx: "02",
      name: "Redes sociales",
      nameItalic: undefined,
      desc: "Estrategia, contenido, sesión de fotos mensual y comunidad gestionada.",
      href: "/servicios",
    },
    {
      idx: "03",
      name: "Web",
      nameItalic: "& e-commerce",
      desc: "Diseño y desarrollo que convierte. SEO técnico y analítica mes a mes.",
      href: "/servicios",
    },
    {
      idx: "04",
      name: "Campañas pagadas",
      nameItalic: undefined,
      desc: "Meta Ads y Google Ads con foco en local. Reporting transparente desde el día uno.",
      href: "/servicios",
    },
  ] as const;
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

- [ ] **Commit**

  ```bash
  git add src/data/content.ts
  git commit -m "feat(content): add serviceList for typographic services section"
  ```

---

## Task 8: Header

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Replace the `<header>` opening tag classes**

  Find:
  ```astro
  <header
    class="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-rule"
  ```
  Replace with:
  ```astro
  <header
    class="sticky top-0 z-40 bg-violet/92 backdrop-blur border-b border-paper/10"
  ```

- [ ] **Switch Logo to light variant**

  Find:
  ```astro
  <Logo />
  ```
  Replace with:
  ```astro
  <Logo variant="light" />
  ```

- [ ] **Fix desktop nav link colors**

  Find:
  ```astro
  isActive(item.href)
    ? "text-violet"
    : "text-ink hover:text-violet",
  ```
  Replace with:
  ```astro
  isActive(item.href)
    ? "text-paper"
    : "text-paper/85 hover:text-paper",
  ```

- [ ] **Fix desktop CTA button**

  Find:
  ```astro
  class="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-violet transition-colors"
  ```
  Replace with:
  ```astro
  class="inline-flex items-center gap-2 border border-paper/60 text-paper px-5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-paper hover:text-violet transition-colors"
  ```

- [ ] **Fix mobile nav border**

  Find:
  ```astro
  <div id="mobile-nav" class="md:hidden hidden pb-6 pt-2 border-t border-rule">
  ```
  Replace with:
  ```astro
  <div id="mobile-nav" class="md:hidden hidden pb-6 pt-2 border-t border-paper/20">
  ```

- [ ] **Fix mobile nav link colors**

  Find:
  ```astro
  isActive(item.href) ? "text-violet" : "text-ink",
  ```
  Replace with:
  ```astro
  isActive(item.href) ? "text-paper" : "text-paper/85",
  ```

- [ ] **Fix mobile CTA**

  Find:
  ```astro
  class="mt-6 inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em]"
  ```
  Replace with:
  ```astro
  class="mt-6 inline-flex items-center justify-center gap-2 bg-paper text-violet px-5 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em]"
  ```

- [ ] **Verify build and visual check**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  Start dev server and open `http://localhost:4321`. The header should be deep purple with white links and an outlined "Diagnóstico" CTA. The AWAKE logo text should be white.

- [ ] **Commit**

  ```bash
  git add src/components/Header.astro
  git commit -m "fix(Header): violet background, white nav links and CTA"
  ```

---

## Task 9: Footer

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Change footer background**

  Find:
  ```astro
  <footer class="bg-ink text-paper">
  ```
  Replace with:
  ```astro
  <footer class="bg-violet text-paper">
  ```

- [ ] **Fix accent lines (both occurrences of `bg-gold`)**

  Replace all `bg-gold` in this file with `bg-coral`:
  - Line ~13: `<div class="mt-8 mb-16 h-px w-16 bg-gold">` → `bg-coral`
  - Line ~21: `<div class="mt-10 h-px w-16 bg-gold">` → `bg-coral`

- [ ] **Fix "Método CORE" label**

  Find:
  ```astro
  class="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold"
  ```
  Replace with:
  ```astro
  class="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/70"
  ```

- [ ] **Fix nav link hover**

  Find:
  ```astro
  class="text-sm text-paper hover:text-gold transition-colors duration-200"
  ```
  Replace with:
  ```astro
  class="text-sm text-paper hover:text-coral transition-colors duration-200"
  ```

- [ ] **Fix email link hover**

  Find:
  ```astro
  class="hover:text-gold transition-colors"
  ```
  Replace with:
  ```astro
  class="hover:text-coral transition-colors"
  ```

- [ ] **Fix footer bottom tagline**

  Find:
  ```astro
  <span class="text-gold">Sin excusas. Resultados medibles.</span>
  ```
  Replace with:
  ```astro
  <span class="text-coral">Sin excusas. Resultados medibles.</span>
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  In dev server: footer should be purple (same family as header), coral accent lines, white navigation links.

- [ ] **Commit**

  ```bash
  git add src/components/Footer.astro
  git commit -m "fix(Footer): violet background, gold→coral accents"
  ```

---

## Task 10: index.astro — Hero section

**Files:**
- Modify: `src/pages/index.astro`
- Add import: `serviceList` (not yet — that's Task 14)

This task covers only the hero section (everything up to and including the marquee strip).

- [ ] **Add import for Button onDark usage — no change needed** (onDark is a prop, not an import)

- [ ] **Change hero section container**

  Find:
  ```astro
  <section class="relative bg-paper border-b border-rule overflow-hidden">
  ```
  Replace with:
  ```astro
  <section class="relative bg-violet overflow-hidden">
  ```

- [ ] **Fix meta-top labels**

  Find:
  ```astro
  class="reveal flex items-center gap-4">
    <span class="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-violet">
      v2.0 / 2026
    </span>
    <span class="h-px flex-1 bg-rule"></span>
    <span class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite/70">
      Valencia · Alicante
    </span>
  ```
  Replace with:
  ```astro
  class="reveal flex items-center gap-4">
    <span class="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/70">
      v2.0 / 2026
    </span>
    <span class="h-px flex-1 bg-paper/20"></span>
    <span class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
      Valencia · Alicante
    </span>
  ```

- [ ] **Fix h1 text colors**

  Find:
  ```astro
  class="reveal mt-12 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
  ```
  Replace with:
  ```astro
  class="reveal mt-12 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold leading-[0.95] tracking-[-0.03em] text-paper"
  ```

  Find (the "invisibles" span):
  ```astro
  <span class="italic font-light text-violet">invisibles</span>
  ```
  Replace with:
  ```astro
  <span class="italic font-light text-coral">invisibles</span>
  ```

  Find (the "autoridad" underline span):
  ```astro
  <span class="absolute left-0 -bottom-1 h-1 w-full bg-gold"></span>
  ```
  Replace with:
  ```astro
  <span class="absolute left-0 -bottom-1 h-1 w-full bg-coral"></span>
  ```

- [ ] **Fix body paragraph**

  Find:
  ```astro
  class="reveal mt-10 max-w-xl text-base sm:text-lg font-light leading-relaxed text-graphite"
  ```
  Replace with:
  ```astro
  class="reveal mt-10 max-w-xl text-base sm:text-lg font-light leading-relaxed text-paper/80"
  ```

  Find (the inline "Método CORE" semibold):
  ```astro
  <span class="font-semibold text-ink">Método CORE</span>
  ```
  Replace with:
  ```astro
  <span class="font-semibold text-paper">Método CORE</span>
  ```

- [ ] **Fix hero CTA buttons**

  Find:
  ```astro
  <Button href="/contacto" variant="primary">
    Diagnóstico gratis
  </Button>
  <Button href="#metodo" variant="ghost">Ver el método</Button>
  ```
  Replace with:
  ```astro
  <Button href="/contacto" variant="outline" onDark={true}>
    Diagnóstico gratis
  </Button>
  <Button href="#metodo" variant="ghost" onDark={true}>Ver el método</Button>
  ```

- [ ] **Fix CORE right-column block**

  Find:
  ```astro
  <div class="border-t border-ink pt-8">
    <p class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-violet">
      — Método CORE
    </p>
    <ul class="mt-6 space-y-4 font-display text-sm font-semibold">
      {
        coreRows.map((row) => (
          <li class="flex items-baseline gap-4 border-b border-rule pb-3">
            <span class="font-extrabold text-2xl text-violet w-6">
              {row.letter}
            </span>
            <span class="flex-1 text-ink">{row.name}</span>
            <span class="text-[10px] font-light uppercase tracking-[0.2em] text-graphite/60">
              {row.stage}
            </span>
          </li>
        ))
      }
    </ul>
    <p class="mt-8 font-sans text-xs font-light italic text-graphite/70 leading-relaxed">
  ```
  Replace with:
  ```astro
  <div class="border-t border-paper/20 pt-8">
    <p class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
      — Método CORE
    </p>
    <ul class="mt-6 space-y-4 font-display text-sm font-semibold">
      {
        coreRows.map((row) => (
          <li class="flex items-baseline gap-4 border-b border-paper/10 pb-3">
            <span class="font-extrabold text-2xl text-coral w-6">
              {row.letter}
            </span>
            <span class="flex-1 text-paper">{row.name}</span>
            <span class="text-[10px] font-light uppercase tracking-[0.2em] text-paper/40">
              {row.stage}
            </span>
          </li>
        ))
      }
    </ul>
    <p class="mt-8 font-sans text-xs font-light italic text-paper/40 leading-relaxed">
  ```

- [ ] **Fix marquee strip**

  Find:
  ```astro
  <div class="border-t border-rule overflow-hidden bg-paper py-6">
    <div class="marquee-track flex whitespace-nowrap font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[-0.01em] text-ink">
      {
        [...marqueeWords, ...marqueeWords].map((w, i) => (
          <span class="px-8 flex items-center gap-8">
            {w}
            <span class={i % 3 === 1 ? "text-gold" : "text-violet"}>●</span>
          </span>
        ))
      }
    </div>
  </div>
  ```
  Replace with:
  ```astro
  <div class="border-t border-paper/10 overflow-hidden bg-violet-deep py-6">
    <div class="marquee-track flex whitespace-nowrap font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[-0.01em] text-paper/90">
      {
        [...marqueeWords, ...marqueeWords].map((w, i) => (
          <span class="px-8 flex items-center gap-8">
            {w}
            <span class={i % 3 === 1 ? "text-paper/40" : "text-coral"}>●</span>
          </span>
        ))
      }
    </div>
  </div>
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  In dev server: hero is deep purple, headline in white with coral "invisibles", coral CORE letters, marquee on darker purple strip.

- [ ] **Commit**

  ```bash
  git add src/pages/index.astro
  git commit -m "fix(index): hero → saturated violet, coral accents, white text"
  ```

---

## Task 11: index.astro — Método CORE section (offwhite)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Change section background**

  Find:
  ```astro
  <section id="metodo" class="bg-violet-dark text-paper">
  ```
  Replace with:
  ```astro
  <section id="metodo" class="bg-offwhite">
  ```

- [ ] **Remove dark tone from SectionTitle**

  Find:
  ```astro
  <SectionTitle
    number="02"
    eyebrow="Método CORE"
    title="Cuatro fases. Cero relleno."
    intro="Del diagnóstico al impacto medible. Cada fase tiene entregables claros y criterios de avance."
    tone="dark"
  />
  ```
  Replace with:
  ```astro
  <SectionTitle
    number="02"
    eyebrow="Método CORE"
    title="Cuatro fases. Cero relleno."
    intro="Del diagnóstico al impacto medible. Cada fase tiene entregables claros y criterios de avance."
  />
  ```

- [ ] **Remove dark tone from CoreMethod**

  Find:
  ```astro
  <CoreMethod variant="compact" tone="dark" />
  ```
  Replace with:
  ```astro
  <CoreMethod variant="compact" />
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  In dev: the CORE section should now render on light off-white with dark text and violet letters, breaking the chain of saturated sections.

- [ ] **Commit**

  ```bash
  git add src/pages/index.astro
  git commit -m "fix(index): método CORE section bg-offwhite (editorial), restore light tone"
  ```

---

## Task 12: index.astro — Pillar cards + Sí/No gold cleanup

**Files:**
- Modify: `src/pages/index.astro`

These are the remaining `gold` references in sections whose backgrounds don't change. Eliminating them is required because `--color-gold` no longer exists after Task 1.

- [ ] **Fix pillar card hover dots** (section 04 Pilares)

  Find:
  ```astro
  class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-violet group-hover:text-gold">
  ```
  Replace with:
  ```astro
  class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-violet group-hover:text-coral">
  ```

  Find:
  ```astro
  <span class="h-1.5 w-1.5 bg-violet group-hover:bg-gold"></span>
  ```
  Replace with:
  ```astro
  <span class="h-1.5 w-1.5 bg-violet group-hover:bg-coral"></span>
  ```

- [ ] **Fix Sí/No section gold references** (section 06)

  Find (Sí decimos bullet):
  ```astro
  <span class="mt-2 h-1.5 w-1.5 flex-none bg-gold"></span>
  ```
  Replace with:
  ```astro
  <span class="mt-2 h-1.5 w-1.5 flex-none bg-coral"></span>
  ```

  Find (No decimos label):
  ```astro
  class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
    ✗ No decimos
  ```
  Replace with:
  ```astro
  class="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
    ✗ No decimos
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

  Expected: no remaining `gold` references in the build output.

- [ ] **Confirm no gold left in src/**

  ```bash
  grep -rn "gold" src/ --include="*.astro" --include="*.ts" --include="*.css"
  ```

  Expected: zero results.

- [ ] **Commit**

  ```bash
  git add src/pages/index.astro
  git commit -m "fix(index): replace all remaining gold references with coral"
  ```

---

## Task 13: index.astro — Servicios section

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Add import for ServiceRow and serviceList at the top of the frontmatter**

  The file already has:
  ```ts
  import { pillarsSection, sinceridad } from "../data/content";
  ```
  Add to that same line group:
  ```ts
  import ServiceRow from "../components/ServiceRow.astro";
  import { pillarsSection, sinceridad, serviceList } from "../data/content";
  ```
  (Remove `serviceList` from `sinceridad`'s import if it was on a separate line; merge into one import.)

- [ ] **Replace the Servicios section**

  Find the entire Servicios section (from the comment to the closing `</section>`):
  ```astro
  {/* ========= SERVICIOS DESTACADOS ========= */}
  <section class="bg-paper border-b border-rule">
    <div class="mx-auto max-w-[1280px] px-6 sm:px-14 py-24 sm:py-32">
      <div class="grid gap-12 lg:grid-cols-12 mb-16">
        <div class="lg:col-span-7">
          <SectionTitle
            number="04"
            eyebrow="Servicios"
            title="Tres puntos de partida. Una sola obsesión: resultados."
            intro="Empezá donde estés. Si nada encaja, armamos un Pack Libre a medida."
          />
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-3 pt-3">
        {featured.map((tier) => <PriceCard tier={tier} />)}
      </div>

      <div class="reveal mt-16">
        <Button href="/servicios" variant="ghost">Ver todos los servicios</Button>
      </div>
    </div>
  </section>
  ```
  Replace with:
  ```astro
  {/* ========= SERVICIOS ========= */}
  <section class="bg-violet">
    <div class="mx-auto max-w-[1280px] px-6 sm:px-14 py-24 sm:py-32">
      <div class="grid gap-12 lg:grid-cols-12 mb-16">
        <div class="lg:col-span-7">
          <SectionTitle
            number="04"
            eyebrow="Servicios"
            title="Lo que hacemos por tu marca."
            intro="Cuatro líneas de trabajo. Una sola obsesión: que tu negocio vuelva a aparecer donde importa."
            tone="dark"
          />
        </div>
      </div>

      <div>
        {serviceList.map((svc) => (
          <ServiceRow
            idx={svc.idx}
            name={svc.name}
            nameItalic={svc.nameItalic}
            desc={svc.desc}
            href={svc.href}
          />
        ))}
      </div>

      <div class="reveal mt-16">
        <Button href="/servicios" variant="outline" onDark={true}>Ver todos los servicios</Button>
      </div>
    </div>
  </section>
  ```

- [ ] **Remove unused `featured` variable** from the frontmatter (it was only used by the old PriceCard grid)

  Find and remove these lines at the top of the frontmatter:
  ```ts
  const featured = [
    diagnostico.find((t) => t.id === "radar")!,
    branding.find((t) => t.id === "core-total")!,
    rrss.find((t) => t.id === "pro")!,
  ];
  ```

  Also remove the now-unused imports `diagnostico`, `branding`, `rrss` from services, and `PriceCard` if no longer needed anywhere else in the file. Check first:

  ```bash
  grep -n "PriceCard\|diagnostico\|branding\|rrss" /home/nujovich/awake_marketing/src/pages/index.astro
  ```

  Remove only the imports/variables that return zero hits elsewhere in the file.

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

- [ ] **Commit**

  ```bash
  git add src/pages/index.astro src/components/ServiceRow.astro src/data/content.ts
  git commit -m "feat(index): servicios → violet bg + ServiceRow typographic list"
  ```

---

## Task 14: index.astro — Cierre section

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Change section background**

  Find:
  ```astro
  <section class="bg-ink text-paper">
  ```
  (This is the Cierre/Quote section — the last section before `</Layout>`.)

  Replace with:
  ```astro
  <section class="bg-violet-deep text-paper">
  ```

- [ ] **Fix eyebrow color**

  Find:
  ```astro
  class="reveal font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
    — Sinceridad ante todo
  ```
  Replace with:
  ```astro
  class="reveal font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/60">
    — Sinceridad ante todo
  ```

- [ ] **Fix CTA button**

  Find (in the Cierre section):
  ```astro
  <Button href="/contacto" variant="secondary">
    Reservar diagnóstico
  </Button>
  ```
  Replace with:
  ```astro
  <Button href="/contacto" variant="outline" onDark={true}>
    Reservar diagnóstico
  </Button>
  ```

- [ ] **Verify build**

  ```bash
  npm run build 2>&1 | tail -10
  ```

- [ ] **Final gold sanity check**

  ```bash
  grep -rn "gold\|violet-dark" src/ --include="*.astro" --include="*.ts" --include="*.css"
  ```

  Expected: zero results.

- [ ] **Final alternation check** — start dev and visually scan the page from top to bottom:

  ```
  Header  → purple ✓
  Hero    → purple ✓
  Mani    → white ✓
  CORE    → off-white ✓
  Pillars → violet-soft ✓
  Servicios → purple ✓
  Sí/No  → off-white ✓
  Cierre  → deep purple ✓
  Footer  → purple ✓
  ```

  No two saturated sections should be adjacent.

- [ ] **Commit**

  ```bash
  git add src/pages/index.astro
  git commit -m "fix(index): cierre section → violet-deep, outline CTA, eyebrow paper/60"
  ```

---

## Self-review

**Spec coverage check:**

| Spec section | Task |
|---|---|
| §1 Token fixes (violet, deep, coral, remove gold, remove legacy) | Task 1 |
| §2 Header (bg, links, CTA) | Task 8 |
| §3 Hero (bg, text, CORE block, marquee, CTAs) | Task 10 |
| §4 Método CORE (offwhite, remove dark tone) | Task 11 |
| §5 Servicios (violet + ServiceRow + serviceList) | Tasks 6, 7, 13 |
| §6 Cierre (violet-deep, eyebrow, CTA) | Task 14 |
| §7 Footer (violet, coral) | Task 9 |
| §8 Button (outline + onDark + ink fix) | Task 2 |
| §8 CoreMethod (dark tone gold→coral) | Task 4 |
| §8 SectionTitle (dark tone gold→paper/70) | Task 3 |
| §8 PriceCard (featured gold→paper/coral, border) | Task 5 |
| Pillar card gold→coral (not explicit in spec but required) | Task 12 |
| Sí/No section gold→coral (not explicit in spec but required) | Task 12 |

All spec requirements covered. The two items not explicit in the spec (pillar + sí/no) are required consequences of removing `--color-gold` — the build would fail without them.

**Placeholder scan:** No TBDs or TODOs found.

**Type consistency:**
- `serviceList` defined in Task 7 as `const`, matches `svc.idx`, `svc.name`, `svc.nameItalic`, `svc.desc`, `svc.href` — all consumed correctly in Task 13.
- `ServiceRow` props (`idx`, `name`, `nameItalic`, `desc`, `href`) defined in Task 6, consumed in Task 13 — match.
- `Button` prop `onDark` added in Task 2, used in Tasks 10, 13, 14 — consistent.
