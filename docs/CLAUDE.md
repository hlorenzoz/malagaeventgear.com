> **THIS FILE IS A TEMPLATE.** Copy it unmodified into the root of a NEW project, then paste
> `scaffold-prompt.md` to a coding agent. The scaffolding agent deletes this banner as its first step.
> **An agent working inside the repository this template was extracted from must ignore this file
> entirely** and follow that repository's own `AGENTS.md`.

# CLAUDE.md

SvelteKit on Cloudflare. Prerendered marketing pages, dynamic API routes, mdsvex blog, D1.

## Commands

| Command | What it does |
| :--- | :--- |
| `just dev` | Vite dev server, port 5173, `strictPort` |
| `just check` | `wrangler types`, type patch, `svelte-kit sync`, `svelte-check`. **Run with `just test` before every commit.** |
| `just test` | Vitest, node environment, unit and pure server logic |
| `just playwright` | Playwright E2E, boots `just dev` itself |
| `just build` | `wrangler types`, type patch, `vite build`. Output `.svelte-kit/cloudflare/` |
| `just preview` | Production preview via `wrangler pages dev`, port 4173 |
| `just test-lighthouse` | Builds, then `lhci autorun` against `.lighthouserc.json` |
| `just format` | Prettier over the whole tree |
| `just migrate-local` / `just migrate` | D1 migrations, local miniflare / remote |
| `just deploy` / `just deploy-worker` | Main app / cron Worker, two separate targets |

`just check` plus `just test` is the fast loop and the pre commit gate. The full gate adds `just playwright`, `just
build` and `just test-lighthouse`. Prettier runs automatically through `pre-commit`.

## Project defaults

Every value is decided. Nothing here is to be filled in or asked about.

| Key | Value |
| :--- | :--- |
| Package name | `website`, private, `"type": "module"` |
| Brand name | `Northwind Events` |
| Base URL / media CDN | `https://example.com` / `https://cdn.example.com` (R2 custom domain) |
| Primary accent / base surface | `#4D8CFF` / `#121414` dark, `#f7f7f8` light |
| Default theme | `dark`, `light` available, persisted in `localStorage.theme` |
| Display / body font | Playfair Display / Plus Jakarta Sans, both self hosted |
| Language | English source and public UI. Second locale `es`, client side, same URL, no hreflang |
| Timezone for date offsets | `Europe/Madrid`. Dev / preview port 5173 / 4173 |
| D1 database / cron Worker | `app-leads` with binding `DB` / `app-reminders` |
| Package manager | bun, lockfile `bun.lock` tracked |

## Stack

Svelte 5.56.8 in runes mode, SvelteKit 2.70.1, TypeScript 6.0.3 with `strict` and `checkJs`, Vite 8.1.5, Tailwind
4.3.3 via `@tailwindcss/vite`, mdsvex 0.12.8, Zod 3.25.76, Vitest 4.1.10, Playwright 1.60.0, Wrangler 4.114.0,
`@sveltejs/adapter-cloudflare` 7.2.9. bun is the only package manager, and the other three lockfiles are gitignored so
a stray `npm install` cannot smuggle in a second one.

Two things break the build if forgotten, both in `build`, `check` and `gen`:

1. **`wrangler types` runs before `vite build` and before `svelte-check`**, because it emits
   `worker-configuration.d.ts` and `tsconfig.types` points at that file exclusively. Then `scripts/fix-types.ts`
   patches it: wrangler writes a self reference to the not yet built `_worker.js`, which is a circular type error on a
   cold clone. The patch rewrites that one type to `any`, idempotently.
2. **`compilerOptions.runes: true`** in `svelte.config.js`, scoped to exclude `node_modules`. Without it a component
   silently falls back to legacy reactivity.

## Architecture

```
src/routes/(public)/   prerendered pages, one folder per route, each with a meta.ts
src/routes/api/        dynamic endpoints, each `export const prerender = false`
src/routes/+layout.ts  export const trailingSlash = 'always'
src/lib/components/    presentational Svelte by domain, no data fetching
src/lib/data/          single sources of truth, Zod validated, plus their guard tests
src/lib/server/        server only, pure logic separated from I/O
src/lib/utils/         pure helpers: schema builders, sitemap, slugify
src/content/blog/      .svx posts, one file per post, editorial prose
workers/               extra deploy targets, each with its own wrangler.toml
scripts/               build time plugins, rehype plugins, authoring CLIs
migrations/            D1 SQL, numbered, forward only. tests/ holds Playwright specs, tests/e2e/ the API flows
```

`src/routes/` is composition only: a route resolves data and arranges components, while rules, formatting and schema
building live in `src/lib/` where tests can reach them. Two boundaries are load bearing. **`src/lib/server/` splits
pure from I/O**, so templates and scheduling math are pure functions tested with no database while `db/`, the mail
client and service orchestration do the I/O. Mix them and the only way to test a rule is to stand up D1. **The adapter
exposes no `scheduled` handler**, so anything cron driven lives in `workers/<name>/` with its own `wrangler.toml`,
bound to the same D1, importing shared code from `src/lib/server/`. It is a separate deploy target: forgetting it
ships half a deploy.

## Single sources of truth

Every fact has exactly one owner. Nothing downstream restates it.

| Fact | Owner |
| :--- | :--- |
| Business identity, NAP, hours, socials, service areas | `src/lib/data/site.ts` |
| Catalog, prices, currency, VAT | `src/lib/data/packages.ts`, Zod validated |
| JSON-LD builders / page metadata | `src/lib/utils/schema.ts` / `src/lib/components/seo/SeoHead.svelte` |
| Route registry for sitemaps | `STATIC_SITEMAP_PAGES` in `src/lib/utils/sitemap.ts`, catalog routes, the `.svx` glob |
| Per page freshness date | `contentUpdated` in the `meta.ts` beside each route |
| UI copy and locales / editorial prose | `src/lib/i18n.svelte.ts` / `src/content/blog/*.svx` |

**Identity is stored structured, never as display strings.** `siteConfig` holds `address` as parts (`streetAddress`,
`addressLocality`, `addressRegion`, `postalCode`, `addressCountry`), the phone once in E.164, the email once. Display
forms are derived through `formatAddress()`, `formatPhone(lang)` and `telHref()`, so visible copy, `<meta>`, JSON-LD,
`llms.txt` and footer links all read one object. A ready made display string stored beside the parts is a second truth
that drifts in silence. Prices work the same way, through `formatPrice(amount, lang)`, `getPriceRange()`,
`formatPriceRange(lang)` and `getSchemaPriceRange()`. There is exactly **one** `#organization` node, emitted by
`buildLocalBusinessSchema()`, and other pages reference it by `@id`. Redefining it is how a site serves two addresses
and two price ranges at once.

**Guards, not requests.** `src/lib/data/no-duplicated-facts.test.ts` scans `src/**` except `src/content/**` and fails
on any literal matching a value derived from `siteConfig` or the catalog, building those forbidden patterns **from the
objects themselves at test time** so new fields and new prices need no maintenance. When it fails, import the helper.
Do **not** widen the allowlist. `sitemap-freshness.test.ts` fails if a route or catalog entry ships without a declared
date.

## Styling and theming

Tailwind 4 through the Vite plugin, no `tailwind.config.js`. Color tokens are CSS variables on `:root`, overridden
under `[data-theme="light"]`. The theme is a `data-theme` attribute on `<html>`, set by a small inline script in
`src/app.html` before first paint so there is no flash, reading `localStorage.theme` and falling back to
`prefers-color-scheme`. Fonts are self hosted with stable filenames, and `_headers` gives `/fonts/*` a one year
immutable cache.

`kit.inlineStyleThreshold` is `102400`, compared against the **uncompressed** CSS size. A Tailwind global sheet runs
around 80KB uncompressed for roughly 12KB gzipped. Set the threshold lower and the render blocking `<link>` comes back
and takes FCP and LCP with it.

## Content pipeline

`.svx` is mdsvex, not MDX. Posts live in `src/content/blog/`, one file per post, slug from the filename, frontmatter
Zod validated at build time. `publishDate` is set once and **never** bumped. `updatedDate` moves only on a real
content change and drives both the sitemap `<lastmod>` and the `Article` `dateModified`.

- No `layout` option for mdsvex: its layout injection uses `$$props`, incompatible with runes mode. Wrap post
  components explicitly from the `[slug]` route instead.
- `smartypants: false`. mdsvex defaults it to `true` and rewrites clean ASCII source into curly quotes and em dashes
  at build time, breaking the typography rule below.
- rehype plugin order is a dependency chain, not a preference. `rehype-slug` runs first because everything downstream
  needs heading ids, and any plugin that restructures headings into new elements runs last.
- Google rejects a date only `YYYY-MM-DD` in `Article` JSON-LD as missing a timezone. Normalize through one
  `toIso8601WithOffset()` helper that respects DST, never by hand.

## SEO and metadata

Every internal URL ends in a trailing slash, enforced by `trailingSlash = 'always'`. Every public page emits a
canonical and its content type schema through `SeoHead.svelte`. The layout emits the global `LocalBusiness` and
`BreadcrumbList`, whose last crumb uses the real page title when the route has one, not a capitalized slug. Adding,
moving or deleting a page or post means updating its sitemap endpoint in the same change: the freshness guard fails on
a missing date, but it cannot invent the route. **There is no hreflang.** One URL, English source, runtime locale
switching, only `og:locale:alternate`. A request to add hreflang is a request for a different site architecture and
needs a decision, not a patch.

## Testing

Vitest runs `environment: 'node'` over `src/lib/**/*.test.ts`, `workers/**/*.test.ts` and `scripts/**/*.test.ts`, and
excludes `tests/e2e/**`, which belongs to Playwright. **Tests read project files with `import.meta.glob(path, { query:
'?raw', eager: true })`, never `node:fs`**, because `tsconfig.types` is restricted to the Workers definitions on
purpose and that same restriction is what the edge enforces at runtime. Playwright runs chromium, `fullyParallel`,
with `forbidOnly`, 2 retries and 1 worker under CI, and boots the dev server itself on 5173. Every new page, redesign
or refactor updates or adds its spec. No coverage threshold is configured, so the guard tests are what holds the line.
Lighthouse CI asserts performance at least `0.9` and accessibility, best practices and SEO at exactly `1`, over 3 runs
per URL against the preview server on 4173. Every public route is listed in `.lighthouserc.json`, and a new one goes
in that list. Never optimize performance from intuition: measure, change, measure again.

## Deployment

`@sveltejs/adapter-cloudflare`. `wrangler.toml` sets `compatibility_date` and does **not** enable `nodejs_compat`, so
the runtime is Web APIs only: `fetch`, Web Crypto, `URL`, `Request`. Node built ins fail at runtime on the edge rather
than at build time, which is exactly why they survive review. Prefer a third party's HTTP API over its Node SDK.
`.svelte-kit/cloudflare/` is the build output, not `dist/`, not `build/`. Public non secret values go in `[vars]`,
secrets via `wrangler secret put`, local overrides in `.dev.vars`.

Security headers exist in two places by necessity: `_headers` covers static and prerendered responses,
`src/hooks.server.ts` covers SSR and `/api/*`, which never pass through `_headers`. A spec asserts both sets are
identical, so drift fails the suite instead of shipping.

## Conventions

- Conventional commits, no AI attribution. Source identifiers and public UI in English, while comments, docs and
  commits may use the team's language. `<script lang="ts">` and runes in every component.
- `.prettierrc` sets `useTabs` and `singleQuote` explicitly. Prettier defaults to spaces and double quotes, so with
  no config file the first `just format` silently reformats the entire tree.
- **ASCII punctuation only, in every file: content, code, comments, commits, tests, scripts.** No em dash, en dash,
  curly quotes, single character ellipsis, non breaking space, bullet character, semicolon joining sentences in prose,
  or hyphen joining words in prose or headings. Hyphens stay only where structural: URL slugs, filenames, code
  identifiers, CSS classes, proper names. Accents are language, not typography, and stay. Fix any you meet in a file
  you touch, in the same change.
- Never claim a specific the business cannot verify: years in business, client counts, review totals. Never report a
  gate green from a stale build.

## Never do this

- Import `fs`, `path` or `node:crypto` in anything that runs on the edge, including in a test that reads project
  files. Use `import.meta.glob` with `?raw` there.
- Run `npm install` or `pnpm install`. bun only.
- Put a literal price, phone number, address or brand string under `src/` outside its owner.
- Widen a guard allowlist to pass a suite, emit a build timestamp as `<lastmod>`, or bump `datePublished` on an edit.
- Flip a published post back to `draft: true` as an edit side effect. That is an unpublication, needs a request.
- Redefine the `#organization` node inline instead of by `@id`, or write an internal link with no trailing slash.
- Pass mdsvex a `layout` option, leave `smartypants` at its default, or ship a schema change without its migration.
- Commit `.dev.vars`, a secret, or a second lockfile.
- Report a command as passing without having run it.
