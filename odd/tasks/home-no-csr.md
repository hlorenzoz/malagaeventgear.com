# home-no-csr: home page without hydration and light icons

Objective: bring the home page (`/` and its 12 localized versions, one route `src/routes/(public)/+page.svelte`) from 83-87 to about 99 in mobile Lighthouse, as measured in the upper bound experiment. Same pattern as `odd/tasks/post-no-csr.md` (read it: S2, S3, Log L4, L7). Branch `feat/i18n`, local commits only, never push. Runner: Playwright dev (`bunx playwright test`, 5173) and Vitest (`bun run test`).

## Specs

- **S1. Light favicon and logos.** `static/favicon.svg` (89,257 B) and `src/lib/assets/logo-light.svg` / `logo-dark.svg` (31,063 B and 29,974 B) are each one base64 512x512 PNG wrapped in SVG, all fetched before the LCP. Replace them with files of the same look at the size they are displayed (2x for high density screens), generated from the PNG they already embed, so nothing visible changes. The favicon keeps a size Google accepts (`.agents/context/seo/search/docs/appearance/favicon-in-search.md:61`: square, at least 8x8 px, larger than 48x48 recommended; corrected in L4, the original "multiple of 48" premise was not in the doc). `siteConfig.logoUrl` (JSON-LD logo) is NOT touched. The footer renders two logos and hides one with CSS: the hidden one must not be downloaded on the first load.
- **S2. No hydration on the home.** `export const csr = false` in `src/routes/(public)/+page.ts`, all 13 locales: no SvelteKit JS, no `modulepreload`, head SEO identical (canonical, hreflang, Open Graph, JSON-LD).
- **S3. One shared enhancement script.** The post script becomes the script of every non-hydrated page (posts and home), still a plain JS file injected with `{@html}` through `?url&no-inline`, registering no service worker. Header behaviour (theme, live system scheme, logo, mobile menu) works on the home. Hide on scroll stays posts only (as in TopNavBar).
- **S4. Home pieces keep working on a direct load** (each measured broken without hydration on 2026-11-15):
  1. FAQ (`+page.svelte` around lines 82, 840, 862): answers open and close.
  2. Packages carousel (`+page.svelte` around 675-681, 767): every card reachable (no first card off screen to the left), scroll and arrows work.
  3. Testimonials (`Testimonials.svelte`, `TestimonialCard.svelte`): every card reachable, arrows, "Read more" / "Read less" in the page language. Reviews are never translated.
  4. LatestPostsRow (2 rows): scrollable on mobile.
  5. ImageMarquee (2 rows, deferred): images mount near the viewport (the `<template>` fallback, today only inside posts).
- **S5. Two code paths.** A direct load uses the script. Client side navigation into the home (from any hydrated page) still renders with Svelte, and the script must not run. Every other page that uses the changed components (`Testimonials`, `TestimonialCard`, `LatestPostsRow`, `ImageMarquee`, `Footer`, `TopNavBar`) behaves exactly as before.
- **S6. Tests.** One RED test per rule before the fix, then GREEN, direct load and client navigation. Existing specs stay green: `home-carousels-lcp`, `home-equipment-link`, `home-impact`, `home-partner`, `testimonials`, `faq`, `faq-ssr`, `post-no-csr`, `i18n`, `gallery-alt.prod`.
- **S7. Measurement.** Mobile Lighthouse, 3 runs, `/` and `/de/`, before and after. Baseline 2026-11-15: 83/87/84, FCP 2.6 s, LCP 3.4 to 4.0 s, JS 177 KiB in 29 requests. Then `just test-lighthouse` (known pre-existing: `/contact/` Turnstile 110200).
- **S8. Docs.** `.agents/CHANGELOG.md`, the CLAUDE.md bullet "Los posts del blog no se hidratan" extended to the home.

## Tasks

| ID | Specs | Route | Status | Commit |
| :-- | :-- | :-- | :-- | :-- |
| T1 | S1, S6 | delegated (context backstop), first | done | |
| T2 | S2, S3, S4, S5, S6 | delegated (same writer, after T1) | done | |
| T3 | S6, S7 | parent + independent verifier (risk item 3: shared components) | done, verifier PASS (L4, L5) | |
| T4 | S8 | parent | done | |

## Log

- L1 (2026-11-15, user, verbatim): "Yes, the home" (start on the home page performance), then "Yes, full plan".
- L2 (2026-11-15): explorer measured four variants: hydrated 83/87/84; icons only 88/88/88; csr=false only 96/97/97; csr=false plus 114 B placeholder icons 99/99/100 (an upper bound, real optimized logos will weigh more). Reveal elements on the home already ship `active is-revealed`, so they stay visible. No form, Turnstile or analytics on the home. Not in scope: moving the home `load` to the server (would drop a 45.7 KiB posts chunk on client navigation, not measured).
- L3 (2026-11-15): writer done, T1 and T2. Icons: favicon.svg 89,257 -> 5,198 B, logos 31,063 / 29,974 -> 6,012 / 5,955 B (embedded 512 px PNG replaced by a lossless WebP at 2x display size, pixel parity mean diff under 1/255), footer logos `loading="lazy"`. Script renamed `post-enhance.js` -> `enhance.js` (12,768 B, 4,366 gzip). Checks reported: `just check` 0 errors, `bun run test` 7977 passed, 12 Playwright specs 314 passed / 9 skipped (existing skips), build ok, `gallery-alt.prod` 5 passed. RED: 31 of 35 new tests failed before the code. Parent: fixed 2 stale comments naming `post-enhance.js`, re-ran `tests/home-no-csr.spec.ts`: 35 passed. S7 Lighthouse (fresh build, local preview, mobile, 3 runs): `/` 100/100/100 (FCP 0.8 s, LCP 1.8 s, JS 5 KiB), `/de/` 100/99/99, a post 99/99/99 (was 97).
- L4 (2026-11-15): independent verifier: PASS, no blockers. S1-S6 PASS against a baseline build of eb457340: head parity on all 13 homes byte for byte, hydrated pages identical (geometry, arrows, read more, marquees; screenshots differ by 6 to 12 pixels of logo anti aliasing), both code paths identical to the baseline hydrated home, rule 12 clean. Advisories: (1) with JS disabled the packages row now starts at Eco and cuts Basic MICE on the right, while the baseline cut Eco on the left (neither scrolls without JS), (2) Testimonials no longer paint `justify-center` before hydration (no jump on hydration), (3) the favicon doc asks for at least 8x8 px and recommends larger than 48x48, so S1's "multiple of 48" was wrong (spec corrected), the doc does not mention SVG at all (the verifier's "SVG unsupported" is not in the file), (4) logo RMSE about 3.6/255, still near identical by absolute error counts. With JS disabled Chrome ignores `loading="lazy"`, so both footer logos are fetched there.
- L5 (2026-11-15): `just test-lighthouse` (18 pages, 3 runs): only failure `/contact/` best practices 0.96 (pre-existing TurnstileError 110200). Performance: `/` 100/100/100, `/blog/` 93/93/94 (was 0.88, failing), packages 94-95, `/equipment/` 94, `/faq/` 96, legal pages 99, `/contact/` 100. Every page now passes the 0.9 performance minimum.
- Advisories from the writer: the header still fetches the light logo first on the light theme (pre-existing build time `src`); `favicon.ico` and `favicon.png` stay 32x32 (below Google's "larger than 48x48" recommendation, separate decision).
