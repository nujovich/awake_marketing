# Contact Form Toast Notification — Design Spec

**Date:** 2026-05-14
**Status:** Approved

---

## Problem

The three contact pages (`/en/contact`, `/es/contacto`, `/it/contatto`) currently use browser `alert()` dialogs for form submission feedback. These are visually inconsistent with the Awake design system and block the page. Additionally, three bugs exist in the current implementation:

1. The `<form>` element has no `id="contactForm"`, so `document.getElementById("contactForm")` always returns `null` — the submit handler never attaches.
2. Alert messages are hardcoded in Spanish across all three pages, including the English and Italian versions.
3. The `<script>` block is copy-pasted identically across all three pages.

---

## Solution

A shared `Toast.astro` component added to each contact page. The component receives localized strings as props, renders a fixed pill at the top center of the viewport, and exposes `window.showToast('success' | 'error')` for the page script to call.

---

## Design Decisions

| Question | Decision |
|---|---|
| Position | Top center of viewport |
| Style | Dark pill — `space-indigo-950` background, consistent with the form card |
| Behavior | Slides in from top, auto-dismisses after 5 s, no close button |
| Architecture | Option B: shared `Toast.astro` component, included in each contact page with locale-specific props |

---

## Component: `src/components/Toast.astro`

### Props

```ts
interface Props {
  successMsg:     string;
  errorMsg:       string;
  successEyebrow: string;
  errorEyebrow:   string;
}
```

### Structure

```html
<div id="toast" aria-live="polite" aria-atomic="true" role="status">
  <span id="toast-icon"></span>
  <span>
    <span id="toast-eyebrow"></span>
    <span id="toast-msg"></span>
  </span>
</div>
```

### Tokens

| Property | Token | Value |
|---|---|---|
| Background | `--color-space-indigo-950` | `#0f0b28` |
| Text | `--color-bone-50` | `#fafaf8` |
| Ring | `ring-1 ring-bone-50/10` | subtle border |
| Shadow | `shadow-xl shadow-space-indigo-900/40` | lifted |
| Success icon bg | `--color-jungle-teal-600` | `#2a9b88` |
| Error icon bg | `--color-powder-petal-500` | `#ad7494` |
| Border radius | `rounded-full` | pill |

### Typography

| Element | Style |
|---|---|
| Eyebrow | `font-display text-[9px] font-semibold uppercase tracking-[0.22em] opacity-50` |
| Message | `font-display text-[13px] font-medium tracking-[0.01em]` |

### Animation

| Phase | Spec |
|---|---|
| Enter | `translateY(-100% → 0)` + `opacity 0 → 1` · 0.5 s · `cubic-bezier(0.22, 1, 0.36, 1)` (same easing as `.reveal`) |
| Hold | 5 000 ms |
| Exit | `translateY(0 → -100%)` + `opacity 1 → 0` · 0.3 s · `ease-in` |
| Reduced motion | Translate suppressed; fade only — consistent with `.reveal` media query |

### JavaScript API

The component inlines a `<script>` that attaches `window.showToast(type: 'success' | 'error')`. This reads the `data-success-msg` and `data-error-msg` attributes set on the toast element from the Astro props, so no string duplication occurs.

---

## i18n Changes

Add to each locale file (`en.json`, `es.json`, `it.json`) under `contact`:

```json
"toastSuccess": "Message received. We'll be in touch soon.",
"toastError":   "Something went wrong. Please try again."
```

Eyebrow labels (`Sent` / `Error`) are also locale-keyed:

```json
"toastSuccessEyebrow": "Sent",
"toastErrorEyebrow":   "Error"
```

---

## Contact Page Changes (all three)

1. Add `id="contactForm"` to the `<form>` element — fixes the missing ID bug.
2. Import and render `<Toast successMsg={t.contact.toastSuccess} errorMsg={t.contact.toastError} successEyebrow={t.contact.toastSuccessEyebrow} errorEyebrow={t.contact.toastErrorEyebrow} />` inside the Layout, after the form section.
3. Replace the `<script>` block's `alert()` calls with `window.showToast('success')` and `window.showToast('error')`.

---

## Bugs Fixed as Part of This Work

| Bug | Fix |
|---|---|
| `<form>` missing `id="contactForm"` | Add `id="contactForm"` |
| Alert messages hardcoded in Spanish on EN and IT pages | Localized via i18n keys + props |
| Script duplicated across 3 pages | Script lives inside `Toast.astro`; pages only call `window.showToast()` |

---

## Out of Scope

- Toast for other forms (newsletter, diagnosis) — separate initiative if needed.
- Toast queue / stacking multiple toasts.
- Persistent error state (inline field validation).
