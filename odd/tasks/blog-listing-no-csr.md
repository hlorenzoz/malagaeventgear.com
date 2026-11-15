# blog-listing-no-csr: blog listing pages without hydration

Objective: serve the blog listing pages with no SvelteKit JS, same pattern as `odd/tasks/post-no-csr.md` and `odd/tasks/home-no-csr.md` (read both, and the CLAUDE.md bullet "Los posts del blog y la home no se hidratan"). Branch `feat/i18n`, local commits only, never push. Runner: Playwright dev (`bunx playwright test`, 5173) and Vitest.

## Specs

- **S1. No hydration on the listings**: `export const csr = false` in `src/routes/(public)/blog/+page.ts`, `blog/category/[category]/+page.ts`, `blog/author/[author]/+page.ts` and `blog/categories/+page.ts`, all 13 locales. No SvelteKit JS, no `modulepreload`, head SEO identical (canonical, hreflang, Open Graph, JSON-LD).
- **S2. Shared script**: inject `src/lib/no-csr/enhance.js` the same way (`{@html}`, `?url&no-inline`), registering no service worker. It must restore what an explorer measured broken without hydration on 2026-11-15: theme toggle, mobile menu, Testimonials arrows (on `/blog/`), review "Read more". Hide on scroll stays posts only. Explorer injected the script by hand into a csr=false `/blog/` build and all four worked with no markup change.
- **S3. Two code paths**: client navigation into a listing (from a hydrated page, or between listings) still renders with Svelte and the script must not run.
- **S4. No LCP regression**: `/blog/` must keep an LCP candidate (see `odd/tasks/home-no-csr.md` L6: an early scroll of a `snap-mandatory` row before the first paint gave NO_LCP). Lighthouse CLI on a local preview must report an LCP on `/blog/`, a category, the author page and `/blog/categories/`.
- **S5. Tests**: RED before GREEN, direct load and client navigation, in `tests/blog-listing-no-csr.spec.ts`. Existing specs stay green (`blog-*.spec.ts`, `testimonials`, `i18n`, `breadcrumbs`, `sitemaps`, `post-no-csr`, `home-no-csr`).
- **S6. Measurement**: mobile Lighthouse, 3 runs, before and after, on `/blog/`, `/blog/category/events/`, `/de/blog/` (or its localized path). Baseline 2026-11-15 after `9eacac93`: `/blog/` 90/90 (LCP 3.1 s); explorer before that fix: category 90/90/91, author 90. Then `just test-lighthouse`.
- **S7. Docs**: `.agents/CHANGELOG.md`, the CLAUDE.md bullet extended to the listings.

## Tasks

| ID | Specs | Route | Status | Commit |
| :-- | :-- | :-- | :-- | :-- |
| T1 | S1-S5 | delegated (context backstop) | done | |
| T2 | S4, S6 | parent | done (L3) | |
| T3 | S7 | parent | done | |

## Log

- L1 (2026-11-15, user, verbatim): "Haz el análisis sobre Blog para optimizarla y quitar la hidratación", then "Yes, implement it".
- L2 (2026-11-15): explorer facts: listings are universal `+page.ts` loads whose page data is not serialized, so the client re-runs the load and downloads a 46 KiB gzip chunk with every post's frontmatter; csr=false removes it. Rendered interactive pieces: TopNavBar, LanguageSwitcher (native details), Testimonials + TestimonialCard (only on `/blog/`). No search, filters, pagination, forms or marquees. All 89 cards are in the SSR HTML; reveal classes ship `active is-revealed`. Category events csr=false measured 99/99/100.
- L3 (2026-11-15): writer done. 117 listing pages (13 locales x 9) ship no SvelteKit JS, head parity 6,110 tags / 0 differences against the pre-change build. RED 15 of 19, then 19/19 GREEN. `tests/post-no-csr.spec.ts` client navigation now starts at `/packages/` (`/blog/` is a full page load now). Checks: `just check` 0 errors, `bun run test` 7977 passed, requested Playwright list 6623 passed / 117 skipped / 0 failed (earlier 30 s timeouts under parallel load in `i18n.spec.ts:231`, `testimonials.spec.ts:168`, `map.spec.ts:92` passed alone). Lighthouse (local, 2 runs): `/blog/` 98/99 LCP 2.2 s, category 99/99, author 99/99, categories 100/100, LCP present everywhere. Parent re-ran `blog-listing-no-csr` + `post-no-csr`: 37 passed.
- L4 (2026-11-15): `just test-lighthouse` (18 pages, 3 runs): only failure `/contact/` best practices 0.96 (pre-existing Turnstile 110200). Performance: `/` 100, `/blog/` 99/99/99, packages detail pages 100 (were 94-95 before the `9eacac93` snap fix), `/equipment/` and `/meet-the-team/` 99, `/faq/` 96, `/packages/` 94, legal pages 99-100.
