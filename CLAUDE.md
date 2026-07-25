# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Also read `AGENTS.md` (agent personas, review checklists) at session start.

---

## 0. Language rules — non-negotiable

| Context | Language |
|---|---|
| Conversation with Gustavo (chat) | **Spanish** |
| Code (variables, functions, types, file names) | **English** |
| Code comments (`.tsx` and `.css`) | **English** |
| Git commits and branch names | **English** |
| User-facing content (site copy, alt text, metadata) | **Spanish** |
| `CLAUDE.md` / `AGENTS.md` | **English** |

Rule of thumb: anything Claude *writes to the repo* is English. Anything a *site visitor reads* is Spanish. Anything said *to Gustavo* is Spanish.

Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). Branches are `type/short-description` in kebab-case.

> Known violation: `app/globals.css` has Spanish comments (it predates this rule). Convert to English when next touching that file.

---

## 1. Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

```bash
pnpm dev      # next dev — http://localhost:3000
pnpm build    # next build — must pass clean before any push to main
pnpm start    # serve the production build
pnpm lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

**There is no test suite and no test runner installed.** Do not invent test commands or scaffold a framework unless Gustavo asks. Verification is `pnpm build` + `pnpm lint` + manual browser check.

TypeScript is `strict: true`, `noEmit` — type errors surface via `pnpm build` or the editor, not a separate script.

---

## 2. Stack — what is actually installed

| Layer | Reality |
|---|---|
| Framework | Next.js **16.2.6**, App Router |
| UI | React **19.2.4** |
| Styling | **CSS Modules** (`*.module.css`) + CSS custom properties in `app/globals.css` |
| Animation | `motion` 12.x — imported from `"motion/react"`, **never** `"framer-motion"` |
| Icons | `react-icons` 5.x |
| Fonts | `next/font/google` — Playfair Display + DM Sans, loaded in `app/layout.tsx` |
| Hosting | Vercel |

**Tailwind is installed but not used.** `tailwindcss` + `@tailwindcss/postcss` are in `devDependencies` and wired into `postcss.config.mjs`, but `globals.css` never imports Tailwind, there is no `@theme` block, and zero Tailwind utility classes exist in the codebase. **Do not write Tailwind classes.** Either fully adopt it as a deliberate decision with Gustavo, or drop the dependency — but don't mix.

**No form library, by choice.** `react-hook-form` is not installed. The contact form uses a Server Action plus React 19's `useActionState` — React covers this natively, so adding a dependency would violate §5. No validation library either; validation is plain functions in `lib/contact-validation.ts`.

Path alias: `@/*` → repo root (`@/components/...`, `@/lib/...`).

---

## 3. Architecture

### Routing and composition
```
app/layout.tsx      → fonts, <html lang="es">, metadata + JSON-LD, skip link, IntroOverlay + Navbar + {children} + Footer
app/page.tsx        → home: Hero, Works, Specialties, About, AboutCta
app/sobre-mi/       → AboutHero, Biography, Timeline, Philosophy, Process, Credentials, AboutCta
app/servicios/      → ServicesHero, ServicesList, Diagnosis, AboutCta
app/contacto/       → ContactHero, ContactInfo
```

**A `page.tsx` only imports and orders section components — never content JSX.** Each wraps its sections in `<main id="contenido">`, which the skip link targets.

**Section order is an argument, not a default.** The home page leads with `Works` because the visitor is a curator deciding on evidence, not on a statement — `About` closes instead of opening. On `/sobre-mi`, `Timeline` sits behind `Biography` so `Philosophy` lands as the centre hinge, which also breaks up three structurally identical sections that used to run back to back. Don't reshuffle these without a reason of the same kind.

`components/layout/` = Navbar, Footer (rendered once in the root layout).
`components/sections/` = one file per page section, each paired with a `.module.css` of the same name.
`components/ui/` = shared primitives. Currently only `IntroOverlay` (a 2.8s timed splash with an `enter → idle → exit → done` phase machine).

### Data flow
All content data lives in `lib/constants.ts` as **explicitly typed exported arrays** (`export const WORKS: Work[] = [...]`), with the interfaces defined in `lib/types.ts`. Sections import a constant and map over it. Never hardcode copy, project data, or lists inside JSX, and never rely on inferred types for exported data.

### Styling model — read this before writing any CSS
1. `app/globals.css` is the single source of truth. It defines four 11-stop color ramps (`--primary-*`, `--secondary-*`, `--tertiary-*`, `--neutral-*`), then semantic tokens on top of them.
2. **Components consume semantic tokens only:** `--bg-dark`, `--bg-light`, `--text-main`, `--text-inv`, `--text-muted`, `--text-muted-inv`, `--text-link`, `--accent`, `--accent-sand`, `--accent-muted`, `--accent-dim`, `--surface`, `--surface-raised`, `--border-inv`, `--serif`, `--sans`. Reach for a raw ramp stop (`--primary-800`) only when no semantic token fits.

   **Muted text is split by ground and the distinction is load-bearing:** `--text-muted` on light surfaces, `--text-muted-inv` on dark ones. A single token used to serve both and failed WCAG AA on each (4.09:1 and 3.94:1) while carrying nearly all the body copy. Picking the wrong one silently reintroduces that failure.

   Also available: a type scale (`--text-label` … `--text-display`), `--track-caps` / `--track-tight`, four line heights, measures (`--measure-body` 65ch, `--measure-intro`, `--measure-tagline`), three section densities (`--sect-xl` / `--sect-md` / `--sect-sm` plus `--sect-inline`), `--content-max`, `--nav-offset`, and a semantic z-index scale (`--z-base` … `--z-intro`). Use these instead of inventing values — the site previously had 18 distinct small font sizes for about 6 roles, seven tracking values for one role, and 8 sections sharing one identical padding.

   **`--content-max` is what keeps page widths in agreement.** Sections each declared their own cap before, which is how the home page ran content to ~1840px while every interior route stopped at 1200px — the column visibly jumped on each navigation. `Works` is the one deliberate exception: it is full-bleed because it is a gallery wall.
3. `globals.css` also declares a block of **shadcn/Figma Make aliases** (`--background`, `--card`, `--primary`, `--radius`, …). These exist so Figma Make output renders without edits. **Never reference them from project code.** Note `--radius: 0.625rem` lives in that block — it is not the project's radius policy (see §4).

   That block used to redeclare `--accent`, silently overriding the semantic token so the whole site rendered a dark brown instead of the intended gold. It is now `--accent-ui`. **Never let an alias in that block shadow a semantic token name.**
4. Each `.module.css` opens with a comment listing which globals it consumes. Follow that convention in new modules.
5. Fonts: `layout.tsx` passes `next/font` variables named `--serif` / `--sans` onto `<html>`, which override the literal font stacks declared in `globals.css`. Both must stay in sync if either changes.

There is **no theme switching mechanism** — no `ThemeObserver`, no `data-theme` attribute, no `IntersectionObserver`. The body is dark by default and each section sets its own `background-color` token. Light/dark rhythm is achieved section by section, manually.

### Contact form
`/contacto` renders `ContactInfo` (layout + contact details) which composes `ContactForm` — the form is a separate component so neither file passes ~150 lines.

- `lib/actions/contact.ts` — `"use server"`. Validates, then POSTs to the Resend REST API with `fetch` (no SDK installed). **A `"use server"` module may only export async functions**, which is why `INITIAL_CONTACT_STATE` lives in `lib/constants.ts` instead of next to the action.
- `lib/contact-validation.ts` — pure, dependency-free validation. Deliberately outside the `"use server"` module so it can be exercised without a running server.
- `ContactForm.tsx` — `useActionState` drives errors, pending state and the `aria-live` feedback line. Fields render from a `FIELDS` config array; a honeypot input named `company` traps bots and returns a fake success.

Env vars (see `.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`. If the first two are missing the form degrades gracefully — it tells the visitor to email directly and logs a server-side error rather than throwing.

### Motion system
`lib/motion.ts` is the only place motion variants are defined. Sections previously each declared an identical local `fadeUp` — 13 byte-for-byte copies, which is what made the site read as templated.

Consume it as `const v = useMotionVariants()` then `variants={v.reveal}`. **Never import the raw variant objects**: the hook is what swaps in the reduced-motion twins. The five variants are named after the craft — `reveal` (wipe, like lifting varnish), `stratum` (layers settling), `emerge` (blur to focus, raking light), `chromatic` (grey to colour, chromatic reintegration) and `settle` (the quiet one, for body copy).

`components/ui/` holds the thematic primitives. Each one is a gesture from the craft, not decoration — that is the bar any new effect has to clear:

| Component | Gesture | Used in |
|---|---|---|
| `CleaningReveal` | A swab wipe uncovering the clean layer | `Biography` (the portrait) |
| `Craquelure` | Animated crack network that seals shut | `About` |
| `RakingLight` | Low-angle beam revealing surface relief | `Hero` |
| `TechnicalExamination` | Visible / raking / UV fluorescence, switchable | `Diagnosis` |
| `DamageMap` | Condition survey tracing itself over a piece | `Diagnosis` |
| `BeforeAfterSlider` | Documented before/after comparison | **not yet wired** — needs real pairs |

Two rules that matter:

- **Simulated technique must be labelled as such.** `CleaningReveal`, `TechnicalExamination` and `DamageMap` are all CSS/SVG over an ordinary photograph — there is no real UV capture and no real condition survey behind them. `TechnicalExamination` and `DamageMap` carry a visible caption saying so; keep it. A curator who mistakes an illustration for documentation and then finds out is right to distrust everything else on the site. Real before/after pairs go through `BeforeAfterSlider`, deliberately left unwired until Solange provides them.
- **Every effect degrades under `prefers-reduced-motion`.** `RakingLight` renders nothing at all, since the movement *is* the effect; the others crossfade.

`Works` applies the cleaning gesture in pure CSS instead — pieces sit under an oxidised-varnish filter and clear on hover/focus. Same idea, no second image downloaded.

### Scroll-driven sequence (`Intervention`)

`components/sections/Intervention.tsx` pins one piece while five restoration states cross-fade over it and the notes scroll alongside. It is the site's most ambitious effect and it contains **zero JavaScript** — no scroll listener, no rAF loop. The whole thing is `view-timeline` + `position: sticky` + `animation-range`, which runs on the compositor.

Three rules if you touch it:

1. **The fallback is the base, the animation is the override.** Base CSS renders a plain vertical list where every stage has its own image and text; the pinned viewer only appears inside `@supports (animation-timeline: view())`. Invert that and browsers without support get a broken page instead of a readable one.
2. **It turns itself off below 900px and under `prefers-reduced-motion`,** falling back to the same stacked list. Pinning a tall image above text leaves no room to read on a phone, and scroll-linked animation is motion by definition.
3. **The `animation-range` values are the choreography.** They are written out per stage rather than computed, so the overlap between phases can be read at a glance.

The five stage images are currently one photograph under different filters (`.stateSoiled` … `.stateFinished`). When Solange supplies five frames of a single piece — same angle, same framing — swap the `image` field per stage and delete the filter classes. Nothing else changes. Until then the section is labelled a *secuencia ilustrativa*, and that label stays as long as the frames are simulated.

---

## 4. Design system rules

- **`border-radius: 0` on every element.** Editorial decision, not an oversight. No violations remain — the last two (`Footer` social circles, `Works` cards) were cleared.
- **Text over photography needs a guaranteed scrim.** Never rely on the image happening to be dark: the hero stats measured 1.02:1 over a white lab coat because a left-to-right gradient cannot protect right-anchored content. Blocks placed over images carry their own scrim.
- No `box-shadow`, no decorative gradients, no glassmorphism.
- Italics are reserved for the "Rodríguez" surname in the hero, project titles, and occasional poetic taglines. Never on body copy, service names, or testimonials.
- No hardcoded hex in component CSS — go through a token. (`Specialties.module.css` uses a bare `#fff` on hover; acceptable only as an intentional pure-white accent.)
- No inline styles in JSX. The one sanctioned exception is passing a CSS custom property for staggering, as in `Navbar.tsx:84` (`style={{ "--i": i } as React.CSSProperties}`).
- Section padding, clamp-based type scales, and `--border-inv` hairlines are the established rhythm — match neighboring sections rather than inventing new spacing.

---

## 5. Component conventions

- `"use client"` is required on anything using `motion`, hooks, or event handlers — that is currently every section component. Everything else stays a Server Component; don't add the directive defensively.
- `export default function Name()` — never `const Name: React.FC` or arrow-function components.
- Explicit types on callbacks, handlers, and helpers: `const closeMenu = (): void => ...`.
- Zero `any` without a comment justifying it.
- One component per file, named identically to the file. Split past ~150 lines.
- Comments explain *why*, not *what*.
- Motion pattern: `const v = useMotionVariants()` from `lib/motion.ts`, then `initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}` with `staggerChildren` on the parent and `variants={v.<name>}` on the children. **`viewport={{ once: true }}` is mandatory.** Do not declare local variant objects and do not import raw variants — the hook is what supplies the reduced-motion fallback.
- Images always `next/image` with `fill` + `sizes`, or explicit `width`/`height`. `priority` only on the hero. Descriptive Spanish `alt` on every image.

---

## 6. SEO — current state and gaps

`lib/seo.ts` is the SEO source of truth. **`SITE_URL` drives every canonical, sitemap entry and schema `@id`** — it reads `NEXT_PUBLIC_SITE_URL` and falls back to the Vercel domain. Set that env var in the Vercel dashboard when a custom domain goes live; nothing else needs to change.

Implemented: `lang="es"`; `metadataBase` + per-page `metadata` with `alternates.canonical` on `/sobre-mi`, `/servicios`, `/contacto`; Spanish OpenGraph (`locale: "es_PE"`); `app/sitemap.ts`; `app/robots.ts`; server-rendered JSON-LD `@graph` (`ProfessionalService` + `Person` + `WebSite`) injected in `app/layout.tsx`; `app/icon.svg`; single `<h1>` per page; `aria-label` on both navbars.

**Sitemap rule:** `lastModified` dates in `app/sitemap.ts` are hand-maintained per route and must reflect real content changes. Never replace them with `new Date()` — that marks every route as freshly modified on each deploy and Google stops trusting the signal. `priority` and `changefreq` are deliberately omitted; Google ignores both.

**Schema rule:** `lib/seo.ts` deliberately omits `telephone`, `email`, `sameAs`, `geo`, `streetAddress`, `openingHours` and `foundingDate` because the values currently in the codebase are placeholders. Add each one only when Solange confirms it — publishing fabricated business data is a spam signal, not a missing-field warning.

**Still missing:**
- No `og-image.jpg`; no `images` entry in any OpenGraph block.
- Home (`app/page.tsx`) has no own `metadata` — it inherits the layout title (acceptable for the homepage, but a dedicated one would rank better).

When adding metadata to a new page, mirror `app/sobre-mi/page.tsx` and add the route to `ROUTES` in `app/sitemap.ts`.

---

## 7. Accessibility minimums

- Custom clickable elements that aren't `<button>`/`<a>` need a `role` plus Enter/Space handling.
- 4.5:1 minimum text contrast — check `--text-muted` (`#7C7468`) carefully, it is borderline over `--bg-dark`.
- Every form control gets an associated `<label>` (may be visually hidden).
- `aria-label` on icon-only controls (see the Navbar hamburger button for the pattern).

---

## 8. Before deploying to production

- [ ] `pnpm build` clean, no warnings
- [ ] `pnpm lint` clean
- [ ] Lighthouse > 90 on Performance / Accessibility / SEO
- [ ] Every image has a descriptive Spanish `alt`
- [ ] New pages export their own `metadata`
- [ ] Tested on a real mobile device, not just DevTools
- [ ] WhatsApp number and social handles verified (`SOCIAL_LINKS` currently points at placeholder root URLs — `https://linkedin.com`, etc.)

Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 9. Locked decisions — don't revisit without a new reason

- CSS Modules per component + CSS custom properties. Not Tailwind, not styled-components.
- `motion/react` import path, never `framer-motion`.
- Zero `border-radius` sitewide.
- Spanish-only content — no English version planned.
- Section-level light/dark alternation set manually, not via `prefers-color-scheme` or a toggle.
- Language split per §0.

---

## 10. Content integrity

`lib/constants.ts` currently mixes real and placeholder data (credentials, timeline milestones, stats, social URLs). **Never invent facts about Solange** — no fabricated institutions, dates, certifications, or testimonials. If real content is missing, use a clearly marked placeholder and tell Gustavo what's needed.

---

## 11. Roadmap

`SITEMAPS.md` holds the V1→V4 architectural roadmap in Spanish (V1 MVP through V4 full cultural platform). The site is currently at roughly V1.5 — home, sobre-mí, servicios, contacto exist; project detail pages, before/after comparators, blog, and admin do not.

> `AGENTS.md` §"Session commands" references a `TASKS.md` that does not exist in the repo. Either create it or drop the reference.
