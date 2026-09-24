## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: mdsvex, sveltekit-adapter

---

## Objetivo del Proyecto

1. **Migración del sitio web en WordPress a SvelteKit**: [malagaeventgear.com](https://malagaeventgear.com/)
   - **Páginas**: Migración de todas las páginas del sitio web actual (incluyendo las páginas legales, etc.).
   - **Migración de imágenes**: Transferencia y optimización de imágenes a Cloudflare CDN.
   - **Migración de todos los posts**: Migración en formato mdsvex (.svx) de todos los posts detallados en el [sitemap](https://malagaeventgear.com/sitemap_index.xml).

2. **Creación / actualización de contenido**

3. **Sitio multilingüe**: publicar todo el sitio en los 13 idiomas de
   [Idiomas soportados](#idiomas-soportados).

> **Este archivo es la única fuente de instrucciones del proyecto.** `docs/CLAUDE.template.md`
> NO describe este proyecto: es una plantilla genérica (datos ficticios, "Northwind Events") para
> arrancar un sitio NUEVO con este mismo stack, junto con `docs/scaffold-prompt.md`. Se llama
> `.template.md` a propósito, para que Claude Code no la cargue como memoria al trabajar dentro de
> `docs/`. Ningún agente la sigue en este repo y nunca se edita con datos de MEG: cambia solo
> cuando cambia el stack que la plantilla enseña.

---

## Idiomas soportados

El sitio se publica en **13 idiomas** (decisión del usuario, 2026-09-24). El inglés es la versión
base y vive en la raíz. Cada uno de los demás idiomas vive bajo su propio prefijo de URL.

| Locale | Idioma (nombre nativo) | Prefijo URL | Valores hreflang |
| :--- | :--- | :--- | :--- |
| `en` | English | (raíz) | `en`, `x-default` |
| `fr` | Français | `/fr/` | `fr` |
| `it` | Italiano | `/it/` | `it` |
| `de` | Deutsch | `/de/` | `de` |
| `nl` | Nederlands | `/nl/` | `nl` |
| `pt-pt` | Português (Portugal) | `/pt-pt/` | `pt-PT` |
| `pt-br` | Português (Brasil) | `/pt-br/` | `pt-BR` |
| `sv` | Svenska | `/sv/` | `sv` |
| `da` | Dansk | `/da/` | `da` |
| `nb` | Norsk (bokmål) | `/nb/` | `nb`, `no` |
| `zh-hans` | 简体中文 | `/zh-hans/` | `zh-Hans`, `zh` |
| `zh-tw` | 繁體中文 (台灣) | `/zh-tw/` | `zh-Hant-TW`, `zh-Hant` |
| `zh-hk` | 繁體中文 (香港) | `/zh-hk/` | `zh-Hant-HK` |

**Sin español (decisión del usuario, 2026-09-24, tarde).** El sitio NO tiene versión en español.
Esa misma mañana se había decidido sumarlo con `/es/`, y se revirtió. No existe `es` en `LOCALES`
ni hay copia en español en ningún lado. MEG igual ATIENDE en español (ver "Hechos del negocio"):
eso es atención al cliente, no contenido del sitio. Volver a sumar el español es una decisión
explícita y fechada del usuario, como cualquier otro idioma.

El portugués de Portugal y el de Brasil tienen **contenido propio cada uno**, no una copia con
otra etiqueta. Las tres variantes de chino cubren a cualquier lector chino, venga de donde venga.

**Estado (2026-09-24): páginas principales y paquetes publicados en los 13 idiomas. El blog
sigue solo en inglés hasta la Fase 4.** Un idioma se publica recién cuando TODO su contenido está
traducido: la lista de idiomas publicados es `PAGE_LOCALES` en `src/lib/i18n/availability.ts`
(hoy los 13). En una página traducida el menú lleva a "Blog (in English)" y ningún listado muestra
títulos de posts en inglés (`i18n.postsPublished`). La implementación va por fases:

| Fase | Qué | Estado |
| :--- | :--- | :--- |
| 0 | Documentación (este archivo) | hecha |
| 1 | Mapa de contenido (keyword, URL) por idioma | hecha para páginas, paquetes y categorías. Los posts se mapean en cada lote de la Fase 4 |
| 2 | Infraestructura de URLs por idioma, hreflang y sitemaps | hecha |
| 3 | Páginas principales y paquetes en los 13 idiomas | hecha (2026-09-24): 17 páginas y 5 paquetes por idioma, 18 HTML prerenderizados por idioma |
| 4 | Posts del blog, por lotes de silo | pendiente |

Todo lo marcado **"(pendiente, Fase N)"** en este archivo describe el objetivo, no lo que existe.
Al cerrar cada fase se actualiza este archivo con rutas y conteos reales. Una fase no se da por
cerrada con este archivo desactualizado.

### Reglas mandatorias de idioma

1. **Todo contenido nuevo se crea en los 13 idiomas, en el mismo cambio.** Vale para páginas,
   paquetes, posts, FAQ, copy de UI y el texto de las imágenes. Un contenido no se publica hasta
   tener sus 14 versiones. Para páginas y paquetes lo impone
   `src/lib/i18n/localized-completeness.test.ts`: cada idioma de `PAGE_LOCALES` tiene su
   diccionario, su copia de paquetes y FAQ con la misma forma que el inglés, y fecha propia en
   cada página y paquete. Para posts, el guard llega con la Fase 4 y controla por fecha de corte,
   nunca con un allowlist.
2. **Toda edición de contenido inglés se propaga a los 12 idiomas restantes en el mismo cambio.**
   Cada traducción guarda en `sourceUpdated` la fecha de la versión inglesa que tradujo, y la
   suite falla si el inglés es más nuevo (pendiente, Fase 4). Un arreglo como el de Shure a Audix
   no puede quedar corregido en inglés y desactualizado en otros 12 idiomas.
3. **Agregar o quitar un idioma es una decisión explícita del usuario, con fecha**, igual que
   crear una categoría del blog. Ningún agente lo decide por su cuenta.

### Hechos del negocio sobre idiomas (confirmados por el usuario, 2026-09-24)

- **MEG atiende solo en inglés y español.** Toda página en otro idioma lo aclara en su propio
  idioma, en la página de contacto y junto al formulario (en alemán, por ejemplo: "Wir antworten
  auf Englisch oder Spanisch"). `LocalBusiness` declara `availableLanguage` solo con `en` y `es`.
  Los emails transaccionales salen en inglés, salvo a un lead cuyo navegador está en español.
  **Nunca prometer atención en otro idioma.**
- **Páginas legales: prevalece la versión inglesa.** Cada traducción de privacy, terms, gdpr y
  cookie lo dice arriba de todo, en su idioma, con enlace a la versión inglesa.
- **Los nombres de paquete no se traducen** (`Eco Pack`, `Wedding Pack`, `MICE Pack`...), para
  que cualquier cliente se refiera al mismo paquete en cualquier idioma. Se traducen la
  descripción, lo incluido, lo opcional y el resto del copy.

---

## Internacionalización (i18n)

Arquitectura objetivo y reglas de traducción. Las fuentes se verificaron el 2026-09-24 contra
Google Search Central y el PDF de Quality Raters. Ante una duda se vuelve a leer la fuente, no
este resumen.

### Lo que dice Google (citas textuales)

- **Detección de idioma**: "Google uses the visible content of your page to determine its
  language. We don't use any code-level language information such as `lang` attributes, or the
  URL." ([managing-multi-regional-sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites))
- **Un idioma por página**: "use a single language for content and navigation on each page, and
  by avoiding side-by-side translations".
- **Redirección**: "Avoid automatically redirecting users from one language version of a site to
  a different language version of a site."
- **URLs**: "Use words in your audience's language in the URL (and, if applicable, transliterated
  words)." Los caracteres no ASCII van con percent encoding.
  ([url-structure](https://developers.google.com/search/docs/crawling-indexing/url-structure))
- **hreflang**: "Each language version must list itself as well as all other language
  versions." Las URLs van absolutas. Se admiten `zh-Hans` y `zh-Hant`, también combinados con
  región. No se admite un código de país solo. Sobre combinar HTML, cabeceras HTTP y sitemap:
  "there's no benefit in Search".
  ([localized-versions](https://developers.google.com/search/docs/specialty/international/localized-versions))
- **Traducción y calidad**: la política de spam menciona traducir solo como forma de ofuscar
  contenido scrapeado. El PDF (4.6.5, p. 42) dice: "Creating an abundance of content with little
  effort or originality with no editing or manual curation is often the defining attribute of
  spammy websites." Lo que protege una traducción es la **edición y la curación**, no el método.

### Arquitectura (implementada en la Fase 2)

| Pieza | Dónde |
| :--- | :--- |
| Locales, hreflang, `og:locale`, nombre nativo | `src/lib/i18n/locales.ts` (`LOCALE_META`) |
| Idiomas publicados | `src/lib/i18n/availability.ts` (`PAGE_LOCALES`, más la disponibilidad de posts en la Fase 4) |
| Slug y keyword por idioma (fuente única) | `src/lib/i18n/content-map/locales/<locale>.ts`, validado por `content-map.test.ts` |
| URL traducida a ruta inglesa | hook `reroute` en `src/hooks.ts` (tabla del mapa del idioma, cargada bajo demanda) |
| Ruta inglesa a URL traducida | `i18n.href('/packages/eco/')` en componentes. Si no está publicada en el idioma, devuelve la inglesa |
| Idioma de la página, `<html lang>` | `(public)/+layout.server.ts` (idioma y alternates), `hooks.server.ts` (`%lang%`) |
| Diccionario de UI | `src/lib/i18n/messages/<locale>.ts` (`satisfies Messages`, cargado bajo demanda) |
| Copia de cada página | `src/routes/(public)/<ruta>/i18n/<locale>.ts` (`export const updated`, `default satisfies Copy`), cargada por el `+page.ts` de la ruta con `loadPageCopy` |
| Unión de textos en un template | `i18n.space`, `i18n.comma` e `i18n.stop`: espacio, `, ` y `.` en escritura latina, nada, `，` y `。` en chino. Nunca un `' '`, `', '` ni `.` literal entre dos textos traducidos |
| Copia de paquetes y FAQ | inglés en `packages.ts` / `faq.ts` (fuente). Resto en `src/lib/i18n/data/<locale>.ts`, leído con `pkgCopy()` / `faqCopy()` |
| hreflang, canonical, `og:locale` | `SeoHead.svelte`, desde `page.data.alternates` |
| Sitemaps por idioma | `page-sitemap-[locale].xml`, listados en `sitemap_index.xml` solo si el idioma está publicado |
| Precache del PWA | `vite.config.ts`: lista explícita (home, paquetes y `/map` en inglés). Páginas traducidas y el blog en todos los idiomas quedan FUERA del precache. Los chunks JS de la copia traducida también quedan fuera: el plugin `skipTranslatedCopyInPrecache` los detecta en el bundle y los suma a `globIgnores`, porque SvelteKit nombra los chunks solo por hash. Se cargan bajo demanda al abrir una página de ese idioma. Build del 2026-09-24: 311 entradas y 9.417 KiB (551 y 10.065 antes del plugin, 293 en `main`). Lo controla `tests/pwa-precache.prod.spec.ts` |

Cada idioma carga su diccionario, su mapa y su copia de datos como chunks propios: una página
nunca descarga los otros 12 idiomas. Por eso la copia traducida NO va dentro de `packages.ts`.

- **Subdirectorios por idioma**, con el inglés en la raíz y sin cambios de URL. Verificado el
  2026-09-24: Google nunca indexó URLs en español ni en otro idioma (WordPress era solo inglés y
  GSC no muestra ninguna), así que no hace falta ningún redirect.
- **El locale se detecta por el primer segmento completo de la ruta**, nunca con
  `startsWith('/es')`. `/essential-items-for-wedding-rentals/` empieza con `/es` y no es español.
- **Una URL de idioma existe solo si su contenido principal está traducido.** No hay páginas de
  relleno en inglés bajo un prefijo, ni índices de blog o categorías vacíos.
- **El texto traducido va en el HTML servido** (prerender o SSR). Traducir solo en el cliente es
  invisible para Google, y es el fallo de fondo del selector `en/es` actual.
- **Sin redirección automática** por idioma del navegador ni por IP. El selector de idioma son
  enlaces con el nombre nativo del idioma, sin banderas, al equivalente de la página actual.
- **hreflang solo en el `<head>`**, vía `SeoHead`: recíproco, autorreferente, con URLs absolutas
  y trailing slash, y solo en páginas indexables. Los sitemaps listan las URLs sin `xhtml:link`.
- **Sitemaps por idioma**: un sitemap hijo por tipo y locale en `sitemap_index.xml`
  (`page-sitemap-de.xml`, `post-sitemap-zh-hans.xml`...). Un sitemap sin URLs no se emite.
- **Slugs en el idioma del público**: transliterados a ASCII en los idiomas latinos (`ü` pasa a
  `ue`, `å` pasa a `a`) y en caracteres chinos con percent encoding en chino (única palabra
  latina permitida: el préstamo `cookie`, como en `/zh-hans/cookie政策/`). Las keywords, en
  cambio, se escriben con sus letras reales (tildes, umlauts, å). La fuente única es
  `src/lib/i18n/content-map/locales/<locale>.ts`.
- **Todas las páginas públicas se prerenderizan**, en todos los idiomas. El crawler de prerender
  descubre las URLs traducidas por los enlaces del selector de idioma, y una URL de idioma no
  publicada no se genera, así que responde 404 en lugar de servir inglés bajo un prefijo.
- **Un solo nodo `#organization`** en todos los idiomas, con NAP y marca sin traducir.

### Reglas de traducción

- **Keywords**: se construyen con el vocabulario con el que busca un nativo, no traduciendo la
  keyword inglesa. No hay datos de volumen por idioma en el repo, así que toda keyword nace con
  `status: 'propuesta'` y pasa a `'validada'` solo con datos del país. Nunca dar a entender que se
  validó.
- **Sin traducir**: NAP, nombre de la empresa, nombres de paquete, marcas y modelos de equipo
  (`Audix RAD-360`, `Vivitek D5`).
- **Localidades**: en su forma local o su exónimo habitual en el idioma (`Malaga` en alemán,
  `马拉加` en chino). La dirección del NAP no cambia.
- **Precios**: siempre `formatPrice(amount, locale)`, nunca un literal.
- **Imágenes**: se traduce todo lo textual: `alt`, `title`, `figcaption`, `og:image:alt`,
  `twitter:image:alt`, `caption` y `name` del `ImageObject`, y los `alt` dentro de los posts. El
  archivo de imagen es el mismo en todos los idiomas. En los sitemaps de imágenes va solo
  `image:loc`.
- **Reseñas**: NUNCA se traducen (decisión del usuario, 2026-09-24). Se muestran siempre en su
  idioma original, tal cual las escribió el cliente, en los 13 idiomas del sitio, con su atributo
  `lang`. No existe campo de traducción de reseñas: no lo agregues.
- **Revisión**: cada lote de traducciones lleva revisión nativa por muestreo. Nunca se publica
  traducción automática sin revisar (PDF 4.6.5).
- **Tipografía**: la regla 12 se aplica igual en todos los idiomas latinos. La puntuación china de
  ancho completo es idioma y queda exenta (ver §12).
- **Fuentes CJK**: pila de fuentes del sistema (PingFang, Microsoft YaHei/JhengHei, Noto Sans CJK).
  Nunca webfonts CJK, que pesan varios MB.

---

# Contexto del Proyecto y Reglas para el Asistente de IA

## Rol del Asistente
Eres un Ingeniero de Software Senior especializado en SvelteKit, integraciones con Cloudflare (Workers, Pages, D1, R2) y un experto absoluto en Technical SEO, Holistic SEO y Generative SEO. Tu objetivo es escribir código limpio, tipado, modular y optimizado para métricas Core Web Vitals (FCP, LCP, CLS, INP).

## Base de Conocimiento de la Compañía (Knowledge Base)
Toda la información institucional, catálogo de equipos, áreas de servicio logísticas, flujos de negocio y especificaciones de los paquetes de alquiler de Malaga Event Gear (MEG) se encuentran consolidados en **[.agents/BUSINESS.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/.agents/BUSINESS.md)**. Es obligatorio consultar este archivo para cualquier tarea que requiera contexto de negocio, tarifas, especificaciones técnicas o descripciones de servicios.

## Stack Tecnológico
- **Frontend/Fullstack:** SvelteKit (Client-side routing para el dashboard, SSR/Prerendering para la web pública).
- **Procesamiento de Contenido:** mdsvex (.svx - Markdown + Svelte) para el blog.
- **Base de Datos:** Cloudflare D1 (SQLite) - Usaremos Drizzle ORM en el futuro.
- **Almacenamiento/CDN:** Cloudflare R2 / Cloudflare Images.
- **Entorno:** Node.js (desarrollo) -> Cloudflare Edge (producción).

---

## Infraestructura: Captura de Leads & Email Lifecycle

El sitio dejó de ser puramente estático: las páginas de paquete (`/packages/[slug]/`) capturan
leads y disparan correos transaccionales. Antes de tocar cualquier pieza de este flujo, entendé
la arquitectura. Los pasos de provisioning/deploy están en **[docs/lead-capture-deployment.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/docs/lead-capture-deployment.md)** (consultá ese runbook para D1, Resend, Turnstile y secrets).

### Flujo de un lead
1. El usuario completa `LeadForm.svelte` (embebido en cada página de paquete) → `POST /api/leads`.
2. El endpoint valida en orden: **Zod → honeypot → Turnstile siteverify (`/turnstile/v0/siteverify`) → rate-limit**, luego inserta el lead.
3. Se envían 2 correos vía Resend: **confirmación al lead** + **notificación a destinatarios internos**.
4. Se agenda un `review_request` para el día siguiente al `event_date`.
5. Post-evento, el Worker de cron (`workers/review-reminders/`) envía el pedido de reseña de Google
   con un link trackeado `/r/[token]`; máx 3 envíos, un día de por medio, **corte al primer clic**.

### Componentes y reglas
- **Storage (Cloudflare D1):** binding `DB`, esquema normalizado en `migrations/0001_init.sql`
  (tablas `leads`, `lead_events`, `email_messages`, `review_requests`, `recipients`). Pensado como
  base del CRM propio. En desarrollo se simula con SQLite local (`wrangler ... --local`, miniflare).
  Migraciones: `bunx wrangler d1 migrations apply meg-leads [--local|--remote]`.
- **Lógica de servidor (`src/lib/server/`):** separá SIEMPRE lo **puro** de lo **I/O**. `reviews/sequence.ts`
  y `email/templates/*` son funciones puras (testeadas con Vitest sin DB). `db/`, `email/resend.ts`,
  `leads/service.ts` hacen I/O. `leads/recipients.ts` resuelve destinatarios: **D1 primero, fallback a
  `LEAD_NOTIFY_EMAILS` (env)**.
- **Email (Resend):** se usa vía `fetch` (Workers-safe), NO el SDK de Node. Plantillas **bilingües** (EN/ES)
  reciben `locale` explícito y NO usan el store i18n del cliente. Los demás idiomas del sitio reciben la
  plantilla inglesa, porque MEG atiende solo en inglés y español (ver [Idiomas soportados](#idiomas-soportados)).
  **Fallo de email NO debe revertir el lead**
  (se persiste estado `failed` en `email_messages` y se devuelve `leadId` igual).
- **Cron (Worker separado):** `adapter-cloudflare` NO expone handler `scheduled` en su `_worker.js`. Por eso el
  cron vive en `workers/review-reminders/` con su propio `wrangler.toml`, bindeado a la **misma D1** y al mismo
  `RESEND_API_KEY`, reutilizando el código compartido de `src/lib/server/`. **Es un segundo target de deploy.**
- **Anti-spam (Turnstile):** modo managed/invisible. Widget cliente con `PUBLIC_TURNSTILE_SITE_KEY`; verificación
  server-side con `TURNSTILE_SECRET_KEY` contra **`v0/siteverify`** (NO existe `v1` - usar v0 siempre). Si el secret
  no está seteado, la verificación se OMITE (modo dev); con el secret presente, se ENFUERZA (fail-closed).
- **Endpoints dinámicos vs prerender:** `/api/leads` y `/r/[token]` llevan `export const prerender = false;`
  (las páginas de paquete siguen prerenderizadas). No rompas esa coexistencia.
- **i18n (gotcha):** el módulo activo es `$lib/i18n.svelte` y `i18n.t` es un **getter** → acceso por propiedad
  `i18n.t.leadForm.x`, NUNCA como función `i18n.t('...')`. El directorio `src/lib/i18n/`, que tenía un segundo
  i18n sin usar, se borró en el commit `2271787`. Hoy ese directorio es la infraestructura de idiomas (ver
  [Internacionalización (i18n)](#internacionalización-i18n)). El idioma sale de la URL vía `page.data`, nunca de `localStorage`.

### Secrets / vars (ver runbook para cómo cargarlos)
`RESEND_API_KEY`, `RESEND_FROM`, `TURNSTILE_SECRET_KEY` (secrets) · `LEAD_NOTIFY_EMAILS`,
`PUBLIC_SITE_URL`, `PUBLIC_TURNSTILE_SITE_KEY` (vars públicas). Dev: `.dev.vars` (gitignored).

---

## Router de Skills de IA (AI Skills Router)

Cuando detectes o inicies una tarea en este proyecto, **cargá inmediatamente** la skill relevante según el contexto antes de escribir código o realizar diagnósticos. Esto garantiza que apliquemos de manera estricta los mejores estándares de desarrollo:

| Contexto / Tarea | Skill a Cargar | Enfoque Principal |
| :--- | :--- | :--- |
| **Componentes y Reactividad**<br>Eventos, stores, lógica de renderizado, y sintaxis de Svelte 5. | `svelte-core-bestpractices [Local]`<br>`svelte-code-writer [Local]` | Buenas prácticas de Svelte 5, modularidad, tipado estricto y aserciones. |
| **Estética y Visuales Premium**<br>Uso de variables CSS, glassmorphism, paleta de colores (DESIGN.md), y micro-animaciones. | `ui-ux-pro-max [Global]`<br>`frontend-design [Global]`<br>`high-end-visual-design [Global]`<br>`glassmorphism [Global]`<br>`minimalist-ui [Global]` | Wow-factor visual, glassmorphism sofisticado, paletas balanceadas e interacciones fluidas. |
| **HTML5 & CSS Moderno**<br>Efectos de scroll, View Transitions, container queries, :has(), y APIs nativas del DOM. | `modern-web-guidance [Local]` | Estándares HTML5, optimización visual y compatibilidad con APIs de navegador avanzadas. |
| **SEO, Contenido & Conversión**<br>Estrategia SEO, auditorías locales/técnicas, E-E-A-T, backlinks, topic clustering, copywriting y CRO. | Ver **[SEO y Contenido: agentes globales](#seo-y-contenido-agentes-globales)** y **[SEO.md](SEO.md)** | **MANDATORIO:** para SEO técnico, estructura local (GBP) y E-E-A-T, la sección "SEO y Contenido: agentes globales" (más abajo) es el contrato operativo; `SEO.md` es la estrategia de contenido. Orden de precedencia ante conflicto: **PDF de Google > esta sección > SEO.md**. |
| **Rendimiento & Cloudflare**<br>Diagnóstico de cuellos de botella de JS, Edge Rendering, Wrangler y restricciones de Cloudflare Workers/Pages. | `performance-investigation [Local]`<br>`cloudflare-guard [Global]`<br>`cloudflare [Global]`<br>`cloudflare-deploy [Global]`<br>`workers-best-practices [Global]`<br>`wrangler [Global]`<br>`performance [Global]`<br>`web-perf [Global]`<br>**`lighthouse [Global]` + `chrome-devtools-mcp` (MANDATORIO, ver §10)** | Edge compatibility, wrangler config, optimizaciones críticas de carga y eliminación de scripts bloqueantes. Medición real de CWV con `chrome-devtools-mcp` y validación con `lighthouse`. |
| **Mobile & PWA Readiness**<br>Compatibilidad PWA, touch targets (mín 44px), safe areas (safe-area-inset-*), notch compliance y Capacitor. | `mobile-readiness-lead [Global]` | Compatibilidad fluida con dispositivos móviles y preparación Capacitor/PWA. |
| **Accesibilidad (a11y)**<br>Navegación por teclado, etiquetas ARIA, contraste WCAG 2.1 AA, y semántica HTML5. | `a11y-debugging [Global]` | Accesibilidad web global, inclusión, usabilidad y SEO Holístico. |
| **Testing de Interfaces**<br>Validación visual, logs del navegador, y pruebas de integración locales con Playwright. | `webapp-testing [Global]`<br>`e2e-testing-patterns [Global]`<br>`tdd [Global]`<br>`test-driven-development [Global]` | Pruebas de integración automatizadas, desarrollo guiado por pruebas (TDD) y Playwright. |
| **Seguridad & Autenticación**<br>Protección contra ataques en la web, flujos de sesión del CRM y seguridad de base de datos. | `security-best-practices [Global]`<br>`better-auth-best-practices [Global]` | Prácticas sólidas de autenticación, escape de entradas de usuario y robustez de APIs. |

## SEO y Contenido: agentes globales

Cuatro agentes de SEO/Local-SEO y sus comandos están instalados de forma **global**, no en
este repo. Son compartidos por todos los proyectos de cliente.

### Dónde viven (y por qué no están en el repo)

| Tipo | Ubicación |
| :--- | :--- |
| Agentes | `~/.claude/agents/` (`seo-auditor`, `seo-fixer`, `gbp-site-architect`, `local-content-writer`) |
| Comandos | `~/.claude/commands/seo/`, `~/.claude/commands/local-seo/` |
| Search Quality Rater Guidelines (PDF) | `~/.agents/context/google-eeat-guideline/searchqualityevaluatorguidelines.pdf` |

Dos consecuencias. **No sobreviven a un clone limpio**: una máquina nueva los instala
aparte. Y **editar un agente global afecta a TODOS los clientes** a la vez, así que nunca se
edita un agente global para adaptarlo a este proyecto: se hace que el proyecto se
autodescriba (ver "Lo que este proyecto declara").

Prohibido copiar aquí la metodología Core 30, las reglas de E-E-A-T o los checklists de
auditoría. `gbp-site-architect` tiene la metodología; `seo-auditor` tiene el checklist. Una
segunda copia deriva en silencio porque son instrucciones en prosa, no código.

### Contexto global vs por proyecto

- `~/.agents/context/` es material **global**, idéntico para todo cliente (ahí vive el PDF de
  Google; se direcciona con el prefijo `~/`).
- `.agents/context/` es material de **este** cliente. Los documentos (`.md`, `.csv`, etc.) se
  trackean normalmente en git ([.gitignore](.gitignore) solo excluye imágenes dentro de
  `.agents/context/**` - `.png`/`.jpg`/`.jpeg`/`.gif`/`.webp`); no asumir que un archivo nuevo
  ahí es local-only sin chequear `git status`. Un agente que NO encuentre un dato esperado
  igual debe DECIR que corrió sin él, jamás inventarlo.
- Layout esperado cuando se agregue material: `Google Search Console Errors/YYYY-MM-DD/` (una
  carpeta fechada por export; los agentes globean la MÁS RECIENTE, nunca hardcodean fecha),
  `gbp/`, `brief/`.
- Contenido real hoy: `gmbeverywhere.com/meg/generic.md` y `gmbeverywhere.com/meg/fixed.md`
  (catálogo de categorías GBP y servicios candidatos por categoría, ya resuelto en
  `content-map.md`), `Equipamiento.csv` (inventario real de equipo, ver más abajo),
  `REPORT_Merchant_Center.md`, `REPORT_Universal_Cart.md`.
  **No hay export de GSC**: toda auditoría debe declarar que corrió sin datos de Search Console.

### El orden de operaciones

Estructura antes que contenido, contenido antes que auditoría, auditoría antes que fix. Cada
paso lee lo que guardó el anterior, y dos se niegan a correr sin ello.

| Comando | Argumento | Escribe | Requisito duro |
| :--- | :--- | :--- | :--- |
| `/local-seo:website-structure-review` | URL o nombre del negocio; vacío = audita este repo | `gbp-structure/{slug}` | ninguno |
| `/local-seo:create-supporting-content` | lista de páginas / servicio; vacío = batch del gap Core 30 | `gbp-content/{slug}/{page-slug}` | BLOQUEA sin `gbp-structure/{slug}` |
| `/seo:reverse-silo-review` | keywords, estructura/URL, o vacío = audita este repo | `reverse-silo/{slug}` | ninguno |
| `/local-seo:blog-posts-structure-review` | keywords, URL, o vacío = audita el blog de este repo | `reverse-silo/{slug}` | ninguno |
| `/seo:review` | vacío = último commit, `working`, `all`, una ruta o una URL | `seo-audit/{slug}` | ninguno |
| `/seo:fix` | findings/páginas; vacío = arregla la última review | `seo-fix/{slug}` | BLOQUEA (`status: blocked`) sin auditoría |

- `/seo:review` es **report-only por capacidad**: `seo-auditor` no tiene tools Write ni Edit,
  así que el contrato lo impone la capacidad, no la instrucción. `/seo:fix` es el único que
  edita código.
- El slug de ESTE proyecto es **`malagaeventgear.com`** (`mem_current_project`, si no, el
  nombre del directorio del repo). Nunca se arrastra el slug de otro cliente, o los findings
  de un negocio terminan escritos en otro.
- Separación deliberada: `gbp-site-architect` para **ESTRUCTURA** (el árbol de URLs que
  espeja la jerarquía del GBP); `seo-auditor` para **SEÑALES** (schema, consistencia NAP,
  rastreabilidad, on-page). No se le pide a uno el trabajo del otro.

### E-E-A-T: leer el PDF, nunca contestar de memoria

Ante CUALQUIER pregunta de E-E-A-T, leé
`~/.agents/context/google-eeat-guideline/searchqualityevaluatorguidelines.pdf` antes de
responder (Read tool, parámetro `pages`). No un blog, no memoria de entrenamiento, no este
archivo. Si el PDF y otra fuente discrepan, gana el PDF, incluido cuando la otra fuente es
este archivo o `SEO.md`.

| Pregunta | Sección |
| :--- | :--- |
| Qué significa E-E-A-T | 3.4 (p. 26) |
| Reputación, y qué hacer cuando no hay | 3.3.4 - 3.3.5 (p. 25) |
| Scaled content abuse, contenido generado por IA | 4.6.5 - 4.6.6 (p. 42) |
| Qué exige la calificación Lowest | 4.0 - 4.1 (p. 29-31) |
| Información escasa sobre el negocio | 5.5 - 5.6 (p. 63) |
| Qué aspecto tiene la calidad High | 7.0 - 7.3 (p. 71-73) |

Tres puntos que casi todos citan mal, no los repitas de memoria:

1. **Trust es el CENTRO** de E-E-A-T, no un cuarto par. Experience, Expertise y
   Authoritativeness existen para sostener la evaluación de Trust. Si una página no es
   confiable por cualquier razón, tiene E-E-A-T bajo.
2. **Authoritativeness** es ser la fuente de referencia SOBRE el tema, no enlazar hacia
   fuentes autorizadas. Un negocio local es la fuente autoritativa sobre sí mismo. (Esto
   contradice explícitamente a `SEO.md`, que sugiere enlazar afuera para "construir
   autoridad"; gana el PDF.)
3. **Reputación ausente NO es señal negativa** para un negocio chico. Una página puede
   calificar High sin información de reputación. Nunca bloquees una página por no tenerla.

### Cuándo NO usar estos agentes

| Necesidad | Usar en su lugar |
| :--- | :--- |
| Copy de una sola página | skill `copywriting` |
| Auditoría técnica (crawl/velocidad/meta) | skill `seo-audit` |
| Muchas páginas desde una plantilla | skill `programmatic-seo` |
| Datos estructurados / JSON-LD | skill `schema` |

## Lo que este proyecto declara (para que los agentes globales funcionen)

Los agentes globales no asumen nada sobre el stack. Una adivinanza sobre el build o la salida
del build produce auditorías que suenan seguras y son falsas. Estos son los hechos:

- **Build**: `bun run build` (= `wrangler types` + `bun scripts/fix-types.ts` + `vite build`).
  El HTML prerenderizado aterriza en **`.svelte-kit/cloudflare/`** (321 archivos `.html` en el build
  revisado el 2026-09-24 con las páginas en los 13 idiomas, unos 1.300 cuando también estén los posts).
  Preview de producción: `bun run preview` (puerto 4173). Dev: puerto 5173. NO es `out/` ni
  `dist/`, y NO se asume `bun run build` sin los pasos de `wrangler types` / `fix-types.ts`.
- **Fuentes únicas de verdad**:

  | Qué | Dónde |
  | :--- | :--- |
  | Canonical | Por página en `+page.svelte` vía `SeoHead canonicalUrl`, siempre con trailing slash. Paquetes y blog lo derivan de `siteConfig.url` |
  | Hreflang | Solo en el `<head>`, vía `SeoHead` desde `page.data.alternates` (resuelto en `(public)/+layout.server.ts`). Recíproco, autorreferente, `x-default` al inglés. Los sitemaps NO llevan `xhtml:link`. Solo se emite hacia los idiomas donde esa página está publicada (hoy los 13 para páginas y paquetes, solo el inglés para el blog). Ver [Internacionalización (i18n)](#internacionalización-i18n) |
  | Registro de rutas | No hay uno central: `STATIC_SITEMAP_PAGES` en `src/lib/utils/sitemap.ts` + `packages[].route` + glob de `src/content/blog/*.svx` |
  | Datos estructurados (JSON-LD) | `src/lib/utils/schema.ts` (constructores). Docs: `docs/structured-data.md`, `.agents/STRUCTURED_DATA.md` |
  | Metadatos de página | `src/lib/components/seo/SeoHead.svelte` |
  | NAP y negocio | `src/lib/data/site.ts` |
  | Precios y paquetes | `src/lib/data/packages.ts` (ver sección 7) |
  | Reseñas / testimonios reales | `src/lib/data/testimonials.ts` (`getTestimonials(limit?)`, `getReviewsMeta()`) sobre `src/lib/data/reviews.json` (reseñas curadas de Google, fuente `GMB_PROFILE_URL`) |
  | Copy / i18n | `src/lib/i18n.svelte.ts` (`i18n.t` es GETTER: `i18n.t.x`, NUNCA `i18n.t('x')`. Enlaces internos con `i18n.href(enPath)`). Diccionarios en `src/lib/i18n/messages/<locale>.ts`, copia de paquetes y FAQ en `src/lib/i18n/data/<locale>.ts`. El idioma sale de la URL |
  | Slug y keyword por idioma | `src/lib/i18n/content-map/locales/<locale>.ts` |
  | Contenido editorial (blog) | `src/content/blog/*.svx` |
  | Headers y redirects | `_headers`, `_redirects` |
  | Endpoint para LLMs | `src/routes/(public)/llms.txt/+server.ts` (derivado, nunca hardcodeado) |
  | Frescura de páginas estáticas | `meta.ts` colocado junto a cada ruta (`contentUpdated`), consumido por `page-sitemap.xml` |

- **Suite de tests** (correrla en vez de reinventar aserciones): `bunx playwright test` (134
  specs en `tests/`); las específicas de SEO son `schema.spec.ts`, `sitemaps.spec.ts`,
  `opengraph.spec.ts`, `breadcrumbs.spec.ts`, `llms-txt.spec.ts`, `pricing-consistency.spec.ts`,
  `faq.spec.ts`. Unitarios/lógica de datos: `bun run test` (vitest). Performance:
  `just test-lighthouse`.
- **NAP exacto** (de `site.ts`, debe coincidir carácter por carácter en cada mención del sitio):
  - Name: `Malaga Event Gear`
  - Address: `Av. de Barcelona, 34, Distrito Centro, 29009 Málaga`
  - Phone: `666 346 911`
- **Idiomas de atención al cliente**: solo inglés y español (confirmado por el negocio el
  2026-09-24), aunque el sitio se publique en 13 idiomas (el español NO es uno de ellos). Ver [Idiomas soportados](#idiomas-soportados).
- **GBP**: categoría primaria `Audio Visual Equipment Hire Service` (primera de
  `siteConfig.categories`; confirmar contra la ficha viva antes de trabajo de estructura);
  secundarias: `Party equipment rental service`, `Stage lighting equipment supplier`,
  `Video conferencing equipment supplier`. Áreas de servicio: las 23 localidades de
  `siteConfig.serviceAreas`. Catálogo de categorías y servicios candidatos:
  `.agents/context/gmbeverywhere.com/meg/generic.md`.
- **Inventario real de equipamiento**: `.agents/context/Equipamiento.csv` (trackeado en git,
  material de este cliente igual que el resto de `.agents/context/`) es el listado ITEMIZADO del
  equipo físico real que posee MEG: marca, modelo y cantidad por unidad (no paquetes
  comerciales). Es una fuente de verdad más granular que `packages.ts` - `packages.ts` es
  el catálogo de PAQUETES vendidos al cliente (con precio); el CSV es el inventario de
  ACTIVOS individuales detrás de esos paquetes, y puede incluir equipo no empaquetado
  todavía o retirado.
  - **Cuándo usarlo**: (1) antes de crear o actualizar un post de soporte del reverse silo,
    para confirmar si el servicio/palabra clave tiene respaldo real en el inventario (evita
    inventar un producto que MEG no tiene, y evita descartar por error uno que sí tiene pero
    que `packages.ts` no detalla a ese nivel); (2) para citar marca/modelo real en vez de
    quedarse en genérico ("proyector Vivitek D5, 3000 lumens" en vez de solo "proyector de
    3000 lumens"), siempre que el modelo listado siga coincidiendo con lo que ya está
    publicado (ver el gotcha de abajo antes de citar una marca nueva).
  - **Historial resuelto (2026-07-31)**: el CSV llegó a listar una cámara de vídeo Sony, una
    cámara subacuática Sanyo Xacty y un notebook ASUS EeePC. El negocio confirmó primero que
    ese inventario estaba vigente; en la misma sesión el CSV se actualizó de nuevo y esas
    filas quedaron vacías, y el negocio confirmó que ese equipo fue dado de baja
    ("se dieron de baja"). Los posts que afirman que MEG **no** ofrece cámaras ni servicios
    de vídeo/foto son correctos tal cual están publicados. No reabrir esta pregunta sin un
    update explícito del negocio sobre equipo de cámara/vídeo nuevo.
  - **Servicios subcontratados (confirmado 2026-07-31 por el negocio)**: MEG SÍ presta
    traducción simultánea e interpretación, y sistemas de votación interactiva, para eventos
    corporativos y de nivel congreso - pero **sin equipamiento propio**: ambos se gestionan
    subcontratando a un proveedor externo. Esto es distinto de "no lo ofrecemos": al escribir
    sobre estos dos servicios, la negación correcta es "no lo tenemos en nuestro catálogo de
    equipo propio" + "sí lo coordinamos con un socio subcontratado", nunca un "no" categórico.
    Video wall SÍ sigue siendo un "no" categórico (pantalla de gran formato es un panel plano
    único de 60 pulgadas, no un muro modular) - no confundir los dos casos aunque `faq.ts`
    los mencionaba juntos históricamente.
  - **Iluminación real corregida (confirmado 2026-07-31 por el negocio)**: la categoría
    LUMINARIA del CSV son exactamente 4 items: 2x barra Eurolite LED KLS-200 (4 focos fijos
    orientables a mano + pedal), 1x ADJ Encore FRI50Z (Fresnel de zoom, fijo), 1x ADJ Element
    H6 Pack (kit de uplighting inalámbrico a batería, 6 focos, item aparte no incluido en
    ningún paquete). Ninguno es un "moving head" (cabeza robótica DMX pan/tilt) real - esa
    frase (`Beam/Spot moving head fixtures`) era una exageración del copy de marketing en
    `src/routes/(public)/equipment/+page.svelte`, ya corregida junto con las 2 páginas pillar
    y otras menciones menores. El uplighting SÍ es real (antes negado como "no ofrecemos
    uplighting como fixture independiente" en varias páginas, incluida
    `lighting-ideas-for-wedding-rentals.svx` cuya tesis entera dependía de esa negación - ya
    corregida para aclarar que el kit existe pero no está incluido en el Wedding Pack ni el
    Eco Pack).
  - **Micrófonos de corbata/diadema reales (confirmado 2026-07-31 por el negocio)**: el CSV
    lista 2x sets inalámbricos AUDIX RAD-360 de corbata y 1x AUDIX-HT5 de diadema. La negación
    "no ofrecemos micrófonos de corbata ni diadema" (antes en `sound-system-rental.svx` y el
    pillar) era falsa, ya corregida en ambos: son un item aparte, no incluido en los paquetes
    estándar.
  - **Contradicción de marca Shure vs Audix (RESUELTO 2026-08-05)**: confirmado directamente
    con el negocio - el inventario (Audix, serie RAD-360/Fusion) es la fuente de la verdad.
    Las 5 menciones reales de "Shure" (`sound-system-rental.svx`, `audiovisual-equipment-
    rental-service.svx`, `pros-and-cons-of-wedding-rentals.svx`, `latest-trends-in-wedding-
    rentals.svx`, `faq.ts`) corregidas a "Audix", incluido el anchor del H2 en
    `sound-system-rental.svx`. Cachés regenerados, tests y build en verde.

## Honestidad (sobreescribe cualquier regla anterior)

- Nunca inventes un específico que el negocio no pueda verificar: años en el mercado, cantidad
  de clientes, facturación, número de reseñas. Bajo la guía de Google un específico no
  verificable es peor que un general honesto.
- Si faltan datos de GSC o GBP, decí que el trabajo corrió sin ellos. No des a entender que se
  chequearon.
- Nunca reportes un check renderizado como PASS desde un build viejo. Si el build falta o es
  más viejo que el fuente, marcá esos checks NEEDS BUILD y decilo.

## Sistema de Diseño

Las directrices visuales completas (paleta de colores, tipografía, espaciado, componentes y elevación) se encuentran en **`DESIGN.md`**. Antes de crear o modificar cualquier componente de UI, consultá ese archivo.

### Temas (Claro / Oscuro)
- El sitio soporta **dos temas**: `dark` (por defecto) y `light`.
- Los tokens de color deben definirse como variables CSS en `:root` y sobreescribirse en `[data-theme="light"]`.
- El tema activo se controla mediante el atributo `data-theme` en el elemento `<html>`.
- La preferencia del usuario se persiste en `localStorage` bajo la clave `theme`.
- En el primer acceso, se respeta `prefers-color-scheme` como valor inicial si no hay preferencia guardada.

---

## Reglas Estrictas de Desarrollo

### 1. Ecosistema SvelteKit
- Usa siempre `<script lang="ts">` en los componentes.
- Prioriza el uso de Svelte Actions (`use:action`) para manipulaciones del DOM y Svelte Stores o Context API para el estado, evitando prop-drilling excesivo.
- Para la gestión de formularios en el futuro CRM, utiliza exclusivamente las **Form Actions** nativas de SvelteKit en los archivos `+page.server.ts`, con mejora progresiva (`use:enhance`).

### 2. Arquitectura SEO (Mandatorio)
- Las directrices técnicas de arquitectura y optimización SEO (cero errores de rastreo, inyección JSON-LD estructurado, optimización de imágenes y rendimiento LCP) se han consolidado y se mantienen bajo control estricto en **[SEO.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/SEO.md)**. Es obligatorio que el desarrollador/asistente de IA consulte y aplique dichas directrices para toda ruta pública del sitio.
- **Estandarización de URLs**: Cada URL interna debe terminar estrictamente en `/` (trailing slash) (por ejemplo, `/packages/`, `/about-us/`, `/contact-us/`). Esto es mandatorio para garantizar la consistencia en el rastreo SEO, evitar duplicidad de contenido y alinear la navegación.
- **Estrategia de Datos Estructurados Obligatoria**: Cada página pública debe llevar sus datos estructurados correspondientes según su tipo de contenido, tal y como se detalla en **[.agents/STRUCTURED_DATA.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/.agents/STRUCTURED_DATA.md)**. Todos los metadatos deben provenir de la configuración única en `src/lib/data/site.ts` y generarse mediante el helper unificado `src/lib/utils/schema.ts` para evitar la duplicación de datos. El layout principal público gestiona automáticamente los esquemas globales (`LocalBusiness` y el `BreadcrumbList` dinámico), mientras que las páginas específicas inyectan sus esquemas locales correspondientes (`Service`, `ItemList`, `FAQPage`, `Article`) mediante el componente unificado `SeoHead.svelte`.
- **Datos estructurados - convenciones implementadas** (mantener al tocar `schema.ts`):
  1. **Última miga del breadcrumb = título real**: `buildBreadcrumbsSchema(pathname, leafName?)` usa `leafName` para el último crumb cuando se provee; el layout público pasa `data.post.title` (posts) o `data.pkg.name` (paquetes), con fallback al slug capitalizado. NO volver a derivar el nombre del slug para páginas con título disponible.
  2. **`publisher` por `@id`**: en `buildArticleSchema`, `publisher` referencia el nodo canónico `{"@id": ".../#organization"}` (emitido por el layout vía `buildLocalBusinessSchema`), igual que `buildWebSiteSchema` / `buildServiceSchema`. NO redefinir una `Organization` parcial inline.
- **Actualización Obligatoria de Sitemaps**: Cada vez que se cree, actualice o elimine una página, ruta dinámica de catálogo o artículo de blog (.svx), es estrictamente mandatorio verificar y actualizar su endpoint de sitemap XML correspondiente (ej. `page-sitemap.xml`, `post-sitemap.xml`) para asegurar la indexación inmediata y la consistencia en el presupuesto de rastreo de Google.
  Con el sitio en varios idiomas, esto vale **por idioma**: cada página o post que se crea, traduce,
  modifica o elimina actualiza el sitemap de su idioma en el mismo cambio (`page-sitemap-<locale>.xml`,
  los de posts, categorías y autor por idioma llegan con la Fase 4).


### 3. Restricciones de Cloudflare
- El proyecto utiliza `@sveltejs/adapter-cloudflare`.
- **No uses APIs específicas de Node.js** (como `fs`, `path`, `crypto` nativo de node) en los archivos `+page.server.ts` que se ejecutarán en SSR, ya que fallarán en el entorno Edge de Cloudflare Workers. Usa las Web APIs estándar (Fetch, Crypto, URL, etc.).
- Las lecturas de archivos mdsvex (.svx) se harán estrictamente en tiempo de compilación (Prerendering) utilizando las importaciones de Vite (`import.meta.glob`).

### 4. Flujo de Trabajo y Estilo
- **Idiomas:** el código fuente (variables, funciones, componentes) se escribe en inglés. La interfaz y el contenido públicos se publican en los 13 idiomas de [Idiomas soportados](#idiomas-soportados), con el inglés como versión base (la infraestructura existe y cada idioma se publica al completar su traducción, ver `PAGE_LOCALES`). La estructura de traducción tiene que ser compatible con Cloudflare Workers. Los comentarios, la documentación y los commits pueden seguir escribiéndose en español.
- **Código conciso:** Evita reescribir funciones enteras si solo cambian dos líneas. Proporciona el fragmento modificado e indica dónde insertarlo.
- No inventes dependencias ni generes contenido de relleno ("Lorem Ipsum") a menos que se te solicite explícitamente para una maqueta.

### 5. Creación y Actualización de Contenido (Blog / SEO)
- **Idiomas:** todo contenido que se crea o actualiza se hace en los 13 idiomas soportados, en el mismo cambio (ver [Reglas mandatorias de idioma](#reglas-mandatorias-de-idioma)). La keyword de cada idioma sale de `content-map.ts`, nunca de traducir la keyword inglesa. Las reseñas nunca se traducen: se citan en su idioma original en todas las páginas (ver [Internacionalización (i18n)](#internacionalización-i18n)).
- Las pautas de redacción, estrategias de contenido anti-AI-slop, el framework de optimización E-E-A-T y la resolución de los **5 Errores Críticos que Matan el Tráfico** se encuentran detallados en **[SEO.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/SEO.md)**. Es obligatorio que el desarrollador/redactor los siga rigurosamente para cualquier publicación o contenido comercial.
- **Reseñas reales de Google (E-E-A-T - Experience/Trust):** al crear o actualizar contenido comercial (posts del silo, páginas de paquete, servicios), consultar `src/lib/data/testimonials.ts` (`getTestimonials(limit?)`) para ver si hay una reseña real relevante al tema del contenido (tipo de evento, paquete, zona). Si la hay, citarla **textual** - autor, `rating`, `relativeTime` y el cuerpo en `text`, en su idioma original y sin traducir - nunca parafrasearla inventando énfasis que la reseña no tiene. Si no hay ninguna reseña relevante para ese tema puntual, no es un bloqueante ni una señal negativa (ver "Reputación ausente NO es señal negativa" más arriba); lo que sí está prohibido es dejar una sección de tipo "Testimonials" con un heading vacío o con prosa genérica sin cita real donde debería ir una.
- **Posts de la categoría `News` como fuente de eventos anteriores (E-E-A-T - Experience):** al crear o actualizar contenido (posts del silo, páginas de paquete, servicios), consultar los posts existentes con `categories` que incluya `News` (`src/content/blog/*.svx`) como fuente de eventos reales ya desarrollados por MEG. Cuando un evento anterior sea relevante por contexto (tipo de evento, paquete, zona, temática), referenciarlo en el cuerpo del contenido y enlazar al post de noticia correspondiente (`/blog/<slug>/`). No inventar eventos ni detalles que el post de noticia no confirme.

### 6. Spec-Driven Development (SDD) (Mandatorio)
- **Desarrollo Guiado por Especificaciones (SDD):** Cada vez que se cree, modifique o actualice cualquier funcionalidad, lógica de negocio o componente, es **estrictamente mandatorio** seguir la metodología SDD paso a paso (Explore -> Propose -> Spec -> Design -> Tasks -> Apply -> Verify -> Archive).
- **Prohibido el código inmediato:** Bajo ninguna circunstancia se debe saltar a escribir código directamente sin antes haber definido y aprobado las especificaciones técnicas pertinentes.

### 7. Almacenamiento Centralizado de Paquetes (Mandatorio)
- **Estructura homogénea y validación:** Toda la información sobre paquetes de servicios (precios, inclusiones, opcionales, descripciones, límites de invitados e iconos de navegación) debe almacenarse centralizadamente en `src/lib/data/packages.ts`, empleando esquemas de validación Zod.
- **Prohibido duplicar datos:** Ningún componente, página, endpoint, diccionario i18n, FAQ ni bloque JSON-LD debe harcodear o duplicar datos de paquetes; siempre se debe consultar este sistema de almacenamiento unificado. Esto incluye **cadenas de precio formateadas** (`'€290'`, `'290 €'`), **rangos** (`'290€ - 650€'`) y el **porcentaje de IVA**.
- **API de precios (usar SIEMPRE, nunca literales):** `packages.ts` expone la capa derivada. No reimplementes ninguna de estas operaciones a mano:

  | Necesidad | Helper |
  | :--- | :--- |
  | Precio formateado según idioma (`€290` en / `290 €` es) | `formatPrice(amount, lang)` |
  | Precio mínimo / máximo del catálogo | `getPriceRange()` |
  | Rango legible para UI | `formatPriceRange(lang)` |
  | `priceRange` de schema.org LocalBusiness | `getSchemaPriceRange()` |
  | Etiquetas `Nombre (precio)` para listados | `getPackageLabels(lang)` |
  | Packs destacados de la home | `getHomepageShowcasePackages()` |
  | Moneda / símbolo / IVA | `CURRENCY`, `CURRENCY_SYMBOL`, `VAT_RATE` |
  | Importes que no son un paquete (extras, técnico por día u hora, tarima por m², mínimo fuera de provincia, tramos del filtro de presupuesto) | `PRICE_POINTS` (fuente única de esos números) |
  | El porcentaje de IVA dentro de un texto traducible | token `{vat}`, renderizado desde `VAT_RATE` con el formato del idioma (`21%`, `21 %`). Nunca `21%` literal |
  | Cantidad de clientes (`1,000+`) | `siteConfig.clientCount` (fuente: `.agents/BUSINESS.md`), formateada con `formatNumber`. En copia, `{clients}` |
  | Un importe dentro de un texto traducible | token `{price:clave}` con una clave de `PRICE_POINTS` (`'Proyector (+{price:projectorScreen})'`), renderizado con `withPrices(text, lang)`. Los diccionarios (`(public)/+layout.ts`) y la copia de página (`loadPageCopy`) se cargan ya renderizados con `renderTokens`, y `pkgCopy()` y `faqCopy()` también lo aplican: ningún componente tiene que llamar a `withPrices`. Nunca un número en la copia, ni siquiera como `{price:50}` |

- **Nombres de paquete sin traducir:** el `name` de cada paquete es el mismo en los 13 idiomas, porque es la referencia común para cualquier cliente. `packages.ts` guarda la copia SOLO en inglés (la fuente). Cada traducción vive en `src/lib/i18n/data/<locale>.ts` y se lee con `pkgCopy(pkg)` (y `faqCopy(item)` para `faq.ts`). En las traducciones de FAQ, la lista de precios se escribe con el token `{packagesWithPrices}`, nunca con precios literales.
- **Un único nodo `#organization`:** el `priceRange` (y todo el NAP) se emite **solo** desde `buildLocalBusinessSchema()` en `src/lib/utils/schema.ts`, que lo deriva del catálogo. Las páginas que necesiten referirse a la empresa lo hacen **por `@id`** (`{'@id': '.../#organization'}`), nunca redefiniendo el nodo. Redefinirlo ya produjo dos verdades simultáneas (`'€€'` en `schema.ts` vs `'290€ - 650€'` en `/about-us/`, con direcciones distintas).
- **Guard automático:** `src/lib/data/no-hardcoded-prices.test.ts` falla si un archivo de copia (diccionarios, datos y copia de página de cualquier idioma, más `faq.ts` y `packages.ts`) trae un importe literal (`50€`, `400 €`, `240欧元`) o un token `{price:...}` cuya clave no existe en `PRICE_POINTS`. Además escanea todo `src/**` (excepto `src/content/**`, que es copy editorial) y **falla la suite** ante cualquier literal `€290` / `290 €` / `290 EUR`. Si tu cambio lo rompe, la solución es importar el helper - **no** ampliar el allowlist.

**Excepción documentada - contenido editorial:** los posts del blog (`src/content/blog/*.svx`) y sus FAQs extraídas (`src/lib/data/post-faqs.json`) contienen precios orientativos históricos (`desde €290+`). Son prosa firmada con su propia fecha de publicación, no datos de catálogo, y quedan **fuera** del guard. Si cambian las tarifas, revisalos a mano.

### 8. Pruebas E2E Obligatorias (Mandatorio)
- **Pruebas de integración:** Para cada nueva implementación, diseño, refactorización o adición de páginas, se deben crear o actualizar las pruebas E2E correspondientes (usando Playwright bajo la carpeta `tests/`) para asegurar la completa integridad, responsividad y correcto funcionamiento libre de regresiones.

### 9. Registro de Cambios Obligatorio (Mandatorio)
- **Registro en CHANGELOG.md**: Cada vez que se agregue, elimine o actualice alguna funcionalidad, lógica de negocio o componente, es **estrictamente mandatorio** documentar detalladamente el cambio en **[.agents/CHANGELOG.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/.agents/CHANGELOG.md)**.

### 10. Auditoría de Performance Obligatoria (Mandatorio)
- **Tooling obligatorio:** Siempre que se vaya a trabajar sobre el rendimiento del sitio (Core Web Vitals, LCP/FCP/CLS/INP, scripts bloqueantes, reflows, payloads, caching), es **estrictamente mandatorio**:
  1. **Cargar el skill `/lighthouse`** antes de diagnosticar o aplicar optimizaciones.
  2. **Usar `chrome-devtools-mcp`** para la medición real en navegador (performance traces, Core Web Vitals, forced reflows, render-blocking, network). El servidor está configurado en [.mcp.json](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/.mcp.json); si no está disponible, instalarlo.
  3. **Validar contra `.lighthouserc.json`** ejecutando `bunx @lhci/cli autorun` (levanta `bun run preview` y audita todas las páginas públicas) antes de dar por cerrada cualquier tarea de performance.
- **Prohibido optimizar a ciegas:** No se aplican cambios de performance basados solo en intuición; toda optimización debe partir de una medición (`chrome-devtools-mcp` / `lighthouse`) y verificarse con otra medición posterior.

### 11. Fechas de Frescura (Mandatorio)

La frescura es una señal de Trust. Fechas que se contradicen entre el sitemap, los datos
estructurados y la página visible son PEORES que no tener fechas, porque prueban que el
mantenimiento no es real.

- Cada vez que se crea o modifica el contenido de una página, se actualiza su fecha de
  modificación en TODOS los lugares que la llevan, en el mismo cambio. Nunca dejar una atrás.
- La fecha vive **AL LADO** del contenido, nunca en una segunda lista mantenida a mano.
- `datePublished` se fija una vez, en la creación, y **NUNCA** se bumpea en una edición.
- **Prohibido el timestamp de build.** Afirmar que toda página cambió en cada deploy le
  enseña a los crawlers a ignorar el campo.
- Bumpear solo ante un cambio real de contenido. Un typo no es un cambio de contenido.
- Una página que lista otras páginas (el sitemap HTML `/sitemap/`) mueve su fecha cuando se
  agrega una página a su lista.
- **Mapa concreto en este proyecto:**
  - Blog: campo `updatedDate` del frontmatter (`just post-touch <slug>`), que alimenta el
    `<lastmod>` de `post-sitemap.xml` y el `dateModified` del `Article` (JSON-LD).
  - Páginas estáticas: `contentUpdated` en el `meta.ts` colocado junto a cada ruta
    (`src/routes/(public)/<ruta>/meta.ts`), consumido por `page-sitemap.xml`.
  - Paquetes: campo `updated` en `src/lib/data/packages.ts` (validado por Zod).
  - Guard automático: `src/lib/data/sitemap-freshness.test.ts` falla la suite si una ruta o
    un paquete no declara su fecha. La solución es declarar la fecha, nunca ampliar un allowlist.
  - Traducciones: cada idioma lleva sus propias fechas, que alimentan el sitemap de ese idioma
    (páginas: `export const updated` en `<ruta>/i18n/<locale>.ts`, paquetes: `updated` en
    `src/lib/i18n/data/<locale>.ts`). Los posts suman `sourceUpdated` con la fecha de la versión
    inglesa que se tradujo (pendiente, Fase 4). `publishDate` de una traducción es la fecha en que se publicó esa traducción.

### 12. Sin Caracteres Tipográficos de IA (Mandatorio)

Solo ASCII para puntuación, en todo archivo: contenido, código, comentarios, commits, tests y
scripts.

| Prohibido | Usar en su lugar |
| :--- | :--- |
| Raya (em dash) | coma, dos puntos, punto o paréntesis según contexto (`-` está bien en código y etiquetas) |
| Semirraya (en dash) | `-`, o `to`/`a` para rangos |
| Guion espaciado como sustituto de raya (`palabra - palabra`) | reunir la frase sin el guion, o partirla en dos oraciones |
| Punto y coma (`;`) | punto y arrancar la siguiente oración con mayúscula (o coma si la cláusula es corta) |
| Comillas curvas | `'` y `"` |
| Puntos suspensivos de un carácter | `...` |
| Espacio duro (nbsp) | espacio normal |
| Carácter de viñeta (`•`) | `-` al inicio del ítem de lista en markdown |
| Guion uniendo palabras/términos en prosa o encabezados (`all-in-one`, `high-end`) | un espacio entre las palabras (`all in one`, `high end`). El guion se mantiene solo donde es estructural: slugs de URL, nombres de archivo, identificadores de código, clases CSS o un nombre propio establecido |

**Aclaración**: esto NO significa borrar tildes ni la ñ. `Málaga` y `configuración` son
idioma, no tipografía de IA, y se mantienen. Solo se prohíben los caracteres de la tabla.

**Chino**: la puntuación china de ancho completo (`，`, `。`, `、`, `「」` y el resto) también es
idioma y queda exenta de la tabla en el contenido `zh-hans`, `zh-tw` y `zh-hk`. En los demás
idiomas (francés, alemán, etc.) la tabla se aplica igual: comillas rectas, espacio normal y sin
punto y coma.

**Al tocar contenido existente**: si al crear o editar una página/post aparece alguno de estos
caracteres en el contenido ya existente (no solo en lo nuevo que agregás), corregilo en el mismo
cambio. Dejarlo pasar porque "no era tu parte" no es neutral, es un chequeo que no se hizo.

---

## Blog Content Authoring

El blog usa **mdsvex** con archivos `.svx` (Markdown + Svelte). No es MDX - es `.svx`.

### Dónde viven los posts

Todos los posts están en `src/content/blog/*.svx`. Un archivo = un post.
El slug del post se deriva del nombre del archivo (sin extensión).

### Cómo crear un nuevo post

```bash
just post-new
# o con argumentos:
bun scripts/post-new.ts --title "Mi Post" --category "Events" --author "Hector Luis Lorenzo"
```

Esto crea `src/content/blog/<slug>.svx` con frontmatter válido y `draft: true`.

**Posts en varios idiomas (pendiente, Fase 4):** `just post-new` va a crear el post inglés y sus
13 traducciones como `draft` en `src/content/blog/<locale>/<slug-en>.svx`, y `just post-touch` va
a avisar qué traducciones quedaron desactualizadas. Hasta que cierre la Fase 4, un post nuevo
existe solo en inglés.

### Semántica de fechas

| Campo | Cuándo usarlo |
|-------|--------------|
| `publishDate` | Fecha de primera publicación - cuándo el post aparece en el sitio. **Inmutable** después del primer deploy. |
| `updatedDate` | Última modificación significativa. Actualizar con `just post-touch <slug>`. **Drives sitemap lastmod** y el `dateModified` del `Article`. Misma validación que `publishDate` (YYYY-MM-DD o ISO 8601 con offset), opcional. |

No existe un campo `date` ni `updated` en el schema - `publishDate` es la fecha de creación/publicación
y `updatedDate` la de modificación (el campo se llamó `updated` hasta que se renombró a `updatedDate`).

> **Datos estructurados - fechas (Article/NewsArticle) - gotcha verificado:** Google exige
> `datePublished`/`dateModified` en ISO 8601 completo **con offset de zona horaria**
> (ej. `2026-06-15T09:00:00+02:00`). Un valor **solo-fecha** `YYYY-MM-DD` dispara los avisos
> *"el valor de fecha y hora no es válido"* / *"falta la zona horaria"* en el test de Rich Results.
> Esto se normaliza **de forma centralizada** con `toIso8601WithOffset()` en
> [`src/lib/utils/schema.ts`](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/src/lib/utils/schema.ts)
> (offset real de Europe/Madrid, respeta DST), aplicado dentro de `buildArticleSchema`. **NO**
> formatees fechas a mano en el JSON-LD ni en el frontmatter.
> Causa raíz del gotcha (YAML): `publishDate: "2026-06-15"` **entre comillas** queda como string
> solo-fecha, y el helper lo normaliza a `2026-06-15T09:00:00+02:00`. **Sin comillas**, el parser
> YAML lo convierte a datetime y lo serializa como `2026-06-15T00:00:00.000Z`.
>
> **Ojo, las dos formas NO son equivalentes.** `toIso8601WithOffset()` arranca con un guard
> `if (date.includes('T')) return date;`, así que la forma **sin comillas ya llega con `T` y sale
> intacta**: el helper no la toca. Verificado en el HTML prerenderizado.
>
> | Frontmatter | JSON-LD emitido | ¿Normalizado? |
> | :--- | :--- | :--- |
> | `publishDate: "2026-06-15"` | `2026-06-15T09:00:00+02:00` | sí, offset real de Madrid |
> | `publishDate: 2026-06-15` | `2026-06-15T00:00:00.000Z` | no, pasa de largo |
>
> Esto **no** rompe Rich Results: `Z` es un designador de zona horaria válido, así que no dispara
> el aviso *"falta la zona horaria"* que motivó este gotcha. La diferencia es semántica: medianoche
> UTC (02:00 en Madrid) en vez de las 09:00 locales que el helper pretende fijar.
>
> Estado actual del corpus: la mayoría de los posts usa la forma **sin comillas** y emite `Z`.
> Al crear un post nuevo, **usá comillas** para que la fecha pase por el helper. Unificar los
> posts viejos es una decisión aparte y deliberada: cambiaría el `datePublished` emitido de
> todo el blog de una sola vez.

### Reglas del body

1. **NO repetir el título como `<h1>`** - el layout (`BlogPost.svelte`) ya lo renderiza.
2. Empezar directamente con el contenido (párrafo o `## Subtítulo`).
3. Las imágenes deben estar en R2 (`cdn.malagaeventgear.com`) o ser URLs absolutas.
4. **Imágenes nuevas: subir con `just post-images <carpeta>`** (WebP + AVIF en toda la
   escalera de anchos, con `alt` y `caption` en `assets/<carpeta>/meta.yaml`), y en el post
   escribir **markdown simple** con la URL de la variante original:
   `![alt](https://cdn.malagaeventgear.com/blog/<id>/<base>.webp)`. **Nunca pegar `<picture>`
   ni `srcset` a mano**: `scripts/rehype-blog-images.mjs` los genera en el build desde el
   manifest, con `<source type="image/avif">` si la imagen tiene AVIF (el navegador elige el
   formato que soporta) y el `<img>` WebP como fallback. Referencia completa: `infra.txt` §15.8.

   **Pendiente (anotado el 2026-09-24, sin fecha de ejecución):**
   - **AVIF para las imágenes migradas de WordPress.** Hoy solo 13 imágenes (la galería del
     post de ECOC 2026, subidas con `post-images`) tienen `avifUrl`. Las ~1.585 variantes
     migradas son solo WebP. Hace falta un script puntual e idempotente que genere el AVIF de
     cada variante, lo suba a R2 con la misma clave y extensión `.avif`, y escriba `avifUrl`
     en la entrada WebP del manifest (nunca una entrada AVIF aparte). El plugin ya emite el
     `<picture>` solo, sin cambios de código. Después, purgar el CDN si se pisa alguna clave.
   - **`<picture>` en las portadas** (hero del post, que es el LCP, y tarjetas de listado).
     Pasan por `cover-thumbs.json`, que hoy solo tiene `srcset` WebP: agregar el AVIF ahí y
     el `<picture>` en `BlogPost.svelte` y `BlogPostCard.svelte`.

### Campos requeridos del frontmatter

```yaml
title: "Título del post"               # requerido, min 1 char
description: "Descripción SEO..."      # requerido, min 10 chars
author: "Hector Luis Lorenzo"          # display name (no slug)
publishDate: "2026-06-07"              # YYYY-MM-DD (creación, inmutable)
updatedDate: "2026-06-20"              # opcional - última modificación (just post-touch)
excerpt: "Resumen visible..."          # requerido, min 10 chars - aparece en listados
coverImage: "https://cdn.malagaeventgear.com/..."  # requerido - URL completa
categories:                            # 1+ del vocabulario controlado (ver abajo)
  - "Events"
  - "Weddings"
tags: []
keyword: "titulo del post"             # frase-objetivo (reverse silo)
siloRole: standalone                   # pillar | supporting | both | standalone
targetPage: ""                         # URL a la que enlaza hacia arriba (vacío si standalone)
draft: true                            # cambiar a false para publicar
```

### Categorías (vocabulario controlado)

Un post pertenece a **1 o más** categorías. Las páginas de categoría (`/blog/category/<slug>/`)
se derivan solas del array `categories[]`. Elegí del vocabulario en uso, no inventes:

`Events` · `Audio Visual Rental` · `Weddings` · `News` · `Corporate & Enterprise` ·
`Event Planning` · `Gadgets`

Al crear el post, el agente de contenido asigna las categorías **según el contexto del post**.
Crear una categoría nueva es una decisión de taxonomía deliberada (agregarla a
`CONTROLLED_CATEGORIES` en `scripts/post-new.ts` y a esta lista), no algo ad-hoc: una categoría
suelta produce una category page fina. Es un eje **ortogonal** al reverse silo: `categories` es
taxonomía; `siloRole`/`targetPage` es estructura de enlace. La category page NO es el target page
del silo.

### Publicar un draft

1. Cambiar `draft: true` → `draft: false` en el frontmatter
2. `git commit` + `git push` a GitHub → Cloudflare Workers hace el build y el deploy solo

### Actualizar un post ya publicado (no tocar `draft`)

Actualizar el contenido de un post que ya está en producción (`draft: false`) es una operación
distinta de publicar un post nuevo, y el campo `draft` **no se toca**: se queda en `false`. Lo
único que cambia es el contenido y `updatedDate` (`just post-touch <slug>`). Volver a poner
`draft: true` en un post ya indexado lo saca del sitemap y de Google - eso es una
**despublicación deliberada**, una acción totalmente distinta a una actualización de contenido,
que requiere pedido explícito del usuario y nunca es un efecto colateral de una edición.

### Publicación: solo por push (sin cron)

**Decisión del usuario (2026-09-24):** el contenido se genera localmente y se publica con un
`git push` a GitHub. Cloudflare Workers hace el build y el deploy automáticamente. **No hay
rebuild programado**: el cron worker `workers/blog-rebuild/` (que apuntaba a un deploy hook de
Cloudflare Pages, y nunca estuvo desplegado en la cuenta) queda descartado.

Consecuencia: un post con `publishDate` en el futuro NO se publica solo en esa fecha. Aparece
recién en el primer build posterior a esa fecha, es decir, en el siguiente push. Para publicar
un post, su `publishDate` es la fecha del push, no una fecha futura.

### Marcar un post como actualizado

```bash
just post-touch mi-post-slug
# Actualiza el campo `updated` en el frontmatter a la fecha de hoy
```

Documentación técnica completa: [`docs/blog-architecture.md`](docs/blog-architecture.md)
Runbook de migración WP: [`.agents/WP_MIGRATION.md`](.agents/WP_MIGRATION.md)

---

## Reverse Silo del Blog

El blog se construye como un **Reverse Silo** (metodología PageOptimizer Pro). El plan
intencional de keywords y enlaces se trackea en
`.agents/context/keywords/pop/PageOptimizer Pro _ Reverse Silo - POP.csv` (trackeado en git).

### El modelo

```
                          TARGET PAGE (pilar)
                          ^      ^      ^
                          |      |      |
   Supporting Post 1 <-> Supporting Post 2 <-> Supporting Post 3
```

1. Cada supporting post enlaza HACIA ABAJO al target page (embudo de equity).
2. Cada post enlaza a sus hermanos ADYACENTES, en ambos sentidos (una cadena, no todos-con-todos).
3. El target page NO devuelve enlaces hacia abajo: es un sumidero de equity. Ese flujo invertido
   es el "reverse". Es la misma estructura que un árbol Core 30 de GBP anidado.

### Los silos de MEG

| Silo | Pilar (target page) | Target del pilar |
| :--- | :--- | :--- |
| audio visual rental | `/blog/audio-visual-rental/` | `/` (home) |
| wedding rentals | `/blog/wedding-rentals/` | `/` (home) |
| audiovisual equipment rental service | `/blog/audiovisual-equipment-rental-service/` | `/` (home) |
| event technology service | `/blog/event-technology-service/` | `/` (home) |
| stage lighting equipment supplier | `/blog/stage-lighting-rental/` | `/` (home) |

Los supporting posts apuntan a su pilar. Los posts de noticias (`siloRole: news`) no forman un
silo: no hay cadena lateral entre ellos (cada noticia es independiente), pero cada uno enlaza
hacia arriba directamente al home (`targetPage: "/"`). Los posts standalone (corporativos,
migración WP) no pertenecen a ningún silo y no tienen target (`siloRole: standalone`, sin target).

### Metadata de silo por contenido

Cada contenido declara su rol en el silo. Fuente única de verdad; el grafo se deriva de acá.

| Campo | Posts (`.svx` frontmatter) | Páginas (`meta.ts`) |
| :--- | :--- | :--- |
| `keyword` | frase-objetivo POP | keyword pelada |
| `siloRole` | `pillar` / `supporting` / `both` / `news` / `standalone` | idem (solo si la página es nodo de silo) |
| `targetPage` | URL a la que enlaza hacia arriba (pilar -> `/`, supporting -> su pilar, news -> `/`) | idem |
| `url` | **derivado**, NO se almacena | **derivado** del route path |

Reglas `keyword` / `url`:
- **Post**: `keyword` = la URL bajo `/blog/` (el slug de-hyphenado). Excepción: los posts near-me
  llevan la frase POP pelada (su slug arrastra el sufijo `-in-malaga-spain`). `url` = `/blog/<slug>/`.
- **Página**: `keyword` pelada. `url` = `/<slug>/`.
- Ejemplos: página `/keyword/` ; post `/blog/keyword/`.

Hoy ninguna página estática es nodo de silo (el silo vive 100% en el blog; el home es solo el
sink `/`). La convención de página queda documentada para cuando una página entre a un silo.

### El mapa del sitio (grafo)

La ruta **`/map`** es el mapa COMPLETO del sitio (páginas + paquetes + reverse silo del blog),
renderizado como un **mindmap Mermaid** más secciones navegables. Es un artefacto **DERIVADO en
vivo**: no hay archivo committeado ni paso de generación: `src/lib/data/site-map.ts`
(`buildSiteMap`) lo computa desde el frontmatter de cada post y el catálogo de paquetes en el
`load()` de la ruta. `/map` está **excluida de los sitemaps** (no está en `STATIC_SITEMAP_PAGES`) y
marcada `noindex`: es una herramienta interna. **Nunca se edita a mano** (no hay nada que editar).

### Reglas mandatorias

- Al crear o editar una página/post, declarar su metadata de silo (o `standalone`). No hay mapa que
  regenerar: `/map` deriva en vivo. El guard `src/lib/data/site-map.test.ts` (`validateSiloGraph`)
  falla la suite si un post no-fixture no declara `siloRole` o si un `targetPage` no resuelve.
- El backfill inicial se hizo con `scripts/backfill-silo-meta.ts` (idempotente) desde el CSV.
- Caveats del CSV de POP (tenerlos presentes al leerlo o alimentarlo a un script):
  - Usa URLs **RAÍZ ANTIGUAS** (`/<slug>/`); la estructura actual es `/blog/<slug>/` con redirects.
    El CSV es el PLAN intencional, no el estado live.
  - ~13 filas con `#REF!`, palabras de status (`/published`, `/draft`) o el placeholder `/Keyword`
    en las columnas de supporting link: limpiar antes de usarlas.
  - Algunas filas usan el slot de hermano (`Supporting link 2`) para un link comercial a una
    página de paquete (`/wedding-pack/`) en vez de a un post hermano: no es reverse silo puro.

### Herramientas (globales, cross-cliente)

- `/seo:reverse-silo-review` - define un silo desde una lista de keywords, o audita el interlinking
  existente contra el modelo.
- `/local-seo:blog-posts-structure-review` - audita la estructura de posts del blog contra el
  reverse silo (el análogo de `/local-seo:website-structure-review` para GBP/Core 30).

Ambos delegan en el agente `reverse-silo-architect`. Son globales (`~/.claude/`): llevan solo
metodología agnóstica y leen los hechos de MEG desde este `CLAUDE.md` (Mode B).