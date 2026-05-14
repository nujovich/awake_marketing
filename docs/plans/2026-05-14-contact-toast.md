# Contact Form Toast Notification — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace browser `alert()` dialogs on the three contact pages with a custom Awake-branded toast notification (dark pill, top center, auto-dismisses after 5 s).

**Architecture:** A shared `Toast.astro` component holds all markup, styles, and the `window.showToast()` JS API. Each of the three contact pages imports it, passes localized strings as props, and calls `window.showToast('success' | 'error')` from the submit handler. The three locale JSON files each gain four new keys under `contact`.

**Tech Stack:** Astro 4, Tailwind CSS v4 (utility-first, custom tokens via `@theme` in `src/styles/global.css`), TypeScript, Montserrat / Raleway fonts (already loaded globally).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/Toast.astro` | Markup, animation CSS, `window.showToast` API |
| Modify | `src/i18n/en.json` | Add 4 toast keys under `contact` |
| Modify | `src/i18n/es.json` | Add 4 toast keys under `contact` |
| Modify | `src/i18n/it.json` | Add 4 toast keys under `contact` |
| Modify | `src/pages/en/contact.astro` | Add form `id`, import Toast, replace script |
| Modify | `src/pages/es/contacto.astro` | Add form `id`, import Toast, replace script |
| Modify | `src/pages/it/contatto.astro` | Add form `id`, import Toast, replace script |

---

## Task 1: Add toast i18n keys to all three locale files

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/es.json`
- Modify: `src/i18n/it.json`

- [ ] **Step 1: Add keys to `src/i18n/en.json`**

  Inside the `"contact"` object, after `"responseNote"` and before `"faqEyebrow"`, add:

  ```json
  "toastSuccessEyebrow": "Sent",
  "toastSuccess": "Message received. We'll be in touch soon.",
  "toastErrorEyebrow": "Error",
  "toastError": "Something went wrong. Please try again.",
  ```

- [ ] **Step 2: Add keys to `src/i18n/es.json`**

  Inside the `"contact"` object, after `"responseNote"` and before `"faqEyebrow"`, add:

  ```json
  "toastSuccessEyebrow": "Enviado",
  "toastSuccess": "Mensaje recibido. Nos pondremos en contacto pronto.",
  "toastErrorEyebrow": "Error",
  "toastError": "Algo salió mal. Por favor, inténtalo de nuevo.",
  ```

- [ ] **Step 3: Add keys to `src/i18n/it.json`**

  Inside the `"contact"` object, after `"responseNote"` and before `"faqEyebrow"`, add:

  ```json
  "toastSuccessEyebrow": "Inviato",
  "toastSuccess": "Messaggio ricevuto. Ti risponderemo presto.",
  "toastErrorEyebrow": "Errore",
  "toastError": "Qualcosa è andato storto. Riprova più tardi.",
  ```

- [ ] **Step 4: Verify JSON is valid**

  ```bash
  node -e "['en','es','it'].forEach(l => { JSON.parse(require('fs').readFileSync(\`src/i18n/\${l}.json\`,'utf8')); console.log(l,'OK'); })"
  ```

  Expected output:
  ```
  en OK
  es OK
  it OK
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/i18n/en.json src/i18n/es.json src/i18n/it.json
  git commit -m "feat: add toast i18n keys for contact form (en, es, it)"
  ```

---

## Task 2: Create `Toast.astro` component

**Files:**
- Create: `src/components/Toast.astro`

- [ ] **Step 1: Create the file**

  ```astro
  ---
  interface Props {
    successMsg:     string;
    errorMsg:       string;
    successEyebrow: string;
    errorEyebrow:   string;
  }

  const { successMsg, errorMsg, successEyebrow, errorEyebrow } = Astro.props;
  ---

  <div
    id="toast"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    data-success-msg={successMsg}
    data-error-msg={errorMsg}
    data-success-eyebrow={successEyebrow}
    data-error-eyebrow={errorEyebrow}
    class="fixed z-50 inline-flex items-center gap-[10px] bg-space-indigo-950 ring-1 ring-bone-50/10 shadow-[0_16px_40px_rgba(15,11,40,0.40)] px-[22px] py-[13px] rounded-full font-display text-bone-50 whitespace-nowrap pointer-events-none"
  >
    <span
      id="toast-icon"
      class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
    ></span>
    <span>
      <span id="toast-eyebrow" class="block text-[9px] font-semibold uppercase tracking-[0.22em] opacity-50 mb-0.5"></span>
      <span id="toast-msg" class="block text-[13px] font-medium tracking-[0.01em]"></span>
    </span>
  </div>

  <style>
    #toast {
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(calc(-100% - 20px));
      opacity: 0;
    }
    #toast.toast-show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
      transition:
        transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
        opacity   0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }
    #toast.toast-hide {
      transform: translateX(-50%) translateY(calc(-100% - 20px));
      opacity: 0;
      transition:
        transform 0.3s ease-in,
        opacity   0.3s ease-in;
    }
    @media (prefers-reduced-motion: reduce) {
      #toast,
      #toast.toast-show,
      #toast.toast-hide {
        transform: translateX(-50%);
      }
    }
  </style>

  <script>
    declare global {
      interface Window {
        showToast: (type: "success" | "error") => void;
      }
    }

    const el      = document.getElementById("toast") as HTMLElement;
    const icon    = document.getElementById("toast-icon") as HTMLElement;
    const eyebrow = document.getElementById("toast-eyebrow") as HTMLElement;
    const msgEl   = document.getElementById("toast-msg") as HTMLElement;

    let timer: ReturnType<typeof setTimeout> | null = null;

    window.showToast = (type) => {
      if (timer) clearTimeout(timer);

      el.style.transition = "none";
      el.classList.remove("toast-show", "toast-hide");
      void el.offsetWidth; // force reflow so transition resets cleanly

      if (type === "success") {
        icon.style.background = "var(--color-jungle-teal-600)";
        icon.textContent = "✓";
        eyebrow.textContent = el.dataset.successEyebrow!;
        msgEl.textContent = el.dataset.successMsg!;
      } else {
        icon.style.background = "var(--color-powder-petal-500)";
        icon.textContent = "✕";
        eyebrow.textContent = el.dataset.errorEyebrow!;
        msgEl.textContent = el.dataset.errorMsg!;
      }

      el.style.transition = "";
      el.classList.add("toast-show");

      timer = setTimeout(() => {
        el.classList.remove("toast-show");
        el.classList.add("toast-hide");
      }, 5000);
    };
  </script>
  ```

- [ ] **Step 2: Verify the build compiles without errors**

  ```bash
  pnpm astro check
  ```

  Expected: zero type errors related to `Toast.astro`.

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/Toast.astro
  git commit -m "feat: add Toast component with Awake DS styling"
  ```

---

## Task 3: Wire up `/en/contact`

**Files:**
- Modify: `src/pages/en/contact.astro`

- [ ] **Step 1: Add Toast import in the frontmatter**

  In `src/pages/en/contact.astro`, the frontmatter block currently reads:

  ```astro
  ---
  import Layout from "../../layouts/Layout.astro";
  import Button from "../../components/Button.astro";
  import SectionTitle from "../../components/SectionTitle.astro";
  import t from "../../i18n/en.json";
  ```

  Add the Toast import:

  ```astro
  ---
  import Layout from "../../layouts/Layout.astro";
  import Button from "../../components/Button.astro";
  import SectionTitle from "../../components/SectionTitle.astro";
  import Toast from "../../components/Toast.astro";
  import t from "../../i18n/en.json";
  ```

- [ ] **Step 2: Add `id` to the form element**

  Find the opening `<form` tag (line ~96):

  ```astro
  <form
      class="reveal rounded-3xl bg-space-indigo-950 p-8 sm:p-10 text-bone-100 shadow-xl shadow-space-indigo-900/15"
      enctype="text/plain"
  >
  ```

  Change it to:

  ```astro
  <form
      id="contactForm"
      class="reveal rounded-3xl bg-space-indigo-950 p-8 sm:p-10 text-bone-100 shadow-xl shadow-space-indigo-900/15"
      enctype="text/plain"
  >
  ```

- [ ] **Step 3: Add `<Toast />` just before `</Layout>`**

  At the very bottom of the template, before the closing `</Layout>` tag, add:

  ```astro
  <Toast
      successMsg={t.contact.toastSuccess}
      errorMsg={t.contact.toastError}
      successEyebrow={t.contact.toastSuccessEyebrow}
      errorEyebrow={t.contact.toastErrorEyebrow}
  />
  ```

- [ ] **Step 4: Replace the `<script>` block**

  Remove the existing `<script>…</script>` block at the bottom of the file and replace it with:

  ```astro
  <script>
      const form = document.getElementById("contactForm");

      if (form) {
          form.addEventListener("submit", async (e) => {
              e.preventDefault();

              const formData = new FormData(form as HTMLFormElement);
              const data = Object.fromEntries(formData);

              try {
                  const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                  });

                  if (response.ok) {
                      window.showToast("success");
                      (form as HTMLFormElement).reset();
                  } else {
                      window.showToast("error");
                  }
              } catch {
                  window.showToast("error");
              }
          });
      }
  </script>
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/pages/en/contact.astro
  git commit -m "feat: wire Toast into EN contact page"
  ```

---

## Task 4: Wire up `/es/contacto`

**Files:**
- Modify: `src/pages/es/contacto.astro`

- [ ] **Step 1: Add Toast import in the frontmatter**

  ```astro
  ---
  import Layout from "../../layouts/Layout.astro";
  import Button from "../../components/Button.astro";
  import SectionTitle from "../../components/SectionTitle.astro";
  import Toast from "../../components/Toast.astro";
  import t from "../../i18n/es.json";
  ```

- [ ] **Step 2: Add `id` to the form element**

  ```astro
  <form
      id="contactForm"
      class="reveal rounded-3xl bg-space-indigo-950 p-8 sm:p-10 text-bone-100 shadow-xl shadow-space-indigo-900/15"
      enctype="text/plain"
  >
  ```

- [ ] **Step 3: Add `<Toast />` just before `</Layout>`**

  ```astro
  <Toast
      successMsg={t.contact.toastSuccess}
      errorMsg={t.contact.toastError}
      successEyebrow={t.contact.toastSuccessEyebrow}
      errorEyebrow={t.contact.toastErrorEyebrow}
  />
  ```

- [ ] **Step 4: Replace the `<script>` block**

  ```astro
  <script>
      const form = document.getElementById("contactForm");

      if (form) {
          form.addEventListener("submit", async (e) => {
              e.preventDefault();

              const formData = new FormData(form as HTMLFormElement);
              const data = Object.fromEntries(formData);

              try {
                  const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                  });

                  if (response.ok) {
                      window.showToast("success");
                      (form as HTMLFormElement).reset();
                  } else {
                      window.showToast("error");
                  }
              } catch {
                  window.showToast("error");
              }
          });
      }
  </script>
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/pages/es/contacto.astro
  git commit -m "feat: wire Toast into ES contacto page"
  ```

---

## Task 5: Wire up `/it/contatto`

**Files:**
- Modify: `src/pages/it/contatto.astro`

- [ ] **Step 1: Add Toast import in the frontmatter**

  ```astro
  ---
  import Layout from "../../layouts/Layout.astro";
  import Button from "../../components/Button.astro";
  import SectionTitle from "../../components/SectionTitle.astro";
  import Toast from "../../components/Toast.astro";
  import t from "../../i18n/it.json";
  ```

- [ ] **Step 2: Add `id` to the form element**

  ```astro
  <form
      id="contactForm"
      class="reveal rounded-3xl bg-space-indigo-950 p-8 sm:p-10 text-bone-100 shadow-xl shadow-space-indigo-900/15"
      enctype="text/plain"
  >
  ```

- [ ] **Step 3: Add `<Toast />` just before `</Layout>`**

  ```astro
  <Toast
      successMsg={t.contact.toastSuccess}
      errorMsg={t.contact.toastError}
      successEyebrow={t.contact.toastSuccessEyebrow}
      errorEyebrow={t.contact.toastErrorEyebrow}
  />
  ```

- [ ] **Step 4: Replace the `<script>` block**

  ```astro
  <script>
      const form = document.getElementById("contactForm");

      if (form) {
          form.addEventListener("submit", async (e) => {
              e.preventDefault();

              const formData = new FormData(form as HTMLFormElement);
              const data = Object.fromEntries(formData);

              try {
                  const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                  });

                  if (response.ok) {
                      window.showToast("success");
                      (form as HTMLFormElement).reset();
                  } else {
                      window.showToast("error");
                  }
              } catch {
                  window.showToast("error");
              }
          });
      }
  </script>
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/pages/it/contatto.astro
  git commit -m "feat: wire Toast into IT contatto page"
  ```

---

## Task 6: Smoke test all three routes

**Files:** none (manual verification)

- [ ] **Step 1: Start the dev server**

  ```bash
  pnpm dev
  ```

  Server starts at `http://localhost:4321`.

- [ ] **Step 2: Test `/en/contact`**

  1. Open `http://localhost:4321/en/contact`
  2. Fill in Name and Email (required), submit.
  3. Verify: dark pill slides in from top center with teal dot + "Sent / Message received..." text.
  4. Wait 5 s — verify pill slides back out automatically.
  5. Submit with network offline (DevTools → Network → Offline) — verify pill shows pink dot + "Error / Something went wrong..." text.

- [ ] **Step 3: Test `/es/contacto`**

  Same steps as above at `http://localhost:4321/es/contacto`. Verify eyebrow reads "Enviado" / "Error" and messages are in Spanish.

- [ ] **Step 4: Test `/it/contatto`**

  Same steps at `http://localhost:4321/it/contatto`. Verify eyebrow reads "Inviato" / "Errore" and messages are in Italian.

- [ ] **Step 5: Test reduced-motion**

  In DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`. Submit the form and verify the toast fades in/out without any vertical slide.

- [ ] **Step 6: Final commit if any fixes were needed**

  ```bash
  git add -p
  git commit -m "fix: smoke test corrections for contact toast"
  ```
