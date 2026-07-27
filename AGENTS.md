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
  reciben `locale` explícito - NO usan el store i18n del cliente. **Fallo de email NO debe revertir el lead**
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
  `i18n.t.leadForm.x`, NUNCA como función `i18n.t('...')`. Hay un segundo i18n sin usar en `src/lib/i18n/` - no confundir.

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
- `.agents/context/` es material de **este** cliente y está **gitignoreado a propósito**
  ([.gitignore](.gitignore), regla de "scraped/downloaded research context"): es local y no
  re-creable desde un clone. Un agente que NO lo encuentre debe DECIR que corrió sin ese
  dato, jamás inventarlo.
- Layout esperado cuando se agregue material: `Google Search Console Errors/YYYY-MM-DD/` (una
  carpeta fechada por export; los agentes globean la MÁS RECIENTE, nunca hardcodean fecha),
  `gbp/`, `brief/`.
- Contenido real hoy: `gmbeverywhere.com/meg/generic.md` (catálogo de categorías GBP y
  servicios candidatos por categoría), `REPORT_Merchant_Center.md`, `REPORT_Universal_Cart.md`.
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
  El HTML prerenderizado aterriza en **`.svelte-kit/cloudflare/`** (92 archivos `.html`).
  Preview de producción: `bun run preview` (puerto 4173). Dev: puerto 5173. NO es `out/` ni
  `dist/`, y NO se asume `bun run build` sin los pasos de `wrangler types` / `fix-types.ts`.
- **Fuentes únicas de verdad**:

  | Qué | Dónde |
  | :--- | :--- |
  | Canonical | Por página en `+page.svelte` vía `SeoHead canonicalUrl`, siempre con trailing slash. Paquetes y blog lo derivan de `siteConfig.url` |
  | Hreflang | NO existe: el sitio es una sola URL en inglés con i18n de cliente. `SeoHead` solo emite `og:locale:alternate`. Un agente que pida hreflang está pidiendo una arquitectura que el sitio no tiene |
  | Registro de rutas | No hay uno central: `STATIC_SITEMAP_PAGES` en `src/lib/utils/sitemap.ts` + `packages[].route` + glob de `src/content/blog/*.svx` |
  | Datos estructurados (JSON-LD) | `src/lib/utils/schema.ts` (constructores). Docs: `docs/structured-data.md`, `.agents/STRUCTURED_DATA.md` |
  | Metadatos de página | `src/lib/components/seo/SeoHead.svelte` |
  | NAP y negocio | `src/lib/data/site.ts` |
  | Precios y paquetes | `src/lib/data/packages.ts` (ver sección 7) |
  | Reseñas / testimonios reales | `src/lib/data/testimonials.ts` (`getTestimonials(limit?)`, `getReviewsMeta()`) sobre `src/lib/data/reviews.json` (reseñas curadas de Google, fuente `GMB_PROFILE_URL`) |
  | Copy / i18n | `src/lib/i18n.svelte.ts` (`i18n.t` es GETTER: `i18n.t.x`, NUNCA `i18n.t('x')`) |
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
  - Phone: `+34 600 42 87 50`
- **GBP**: categoría primaria `Audio Visual Equipment Hire Service` (primera de
  `siteConfig.categories`; confirmar contra la ficha viva antes de trabajo de estructura);
  secundarias: `Party equipment rental service`, `Stage lighting equipment supplier`,
  `Video conferencing equipment supplier`. Áreas de servicio: las 23 localidades de
  `siteConfig.serviceAreas`. Catálogo de categorías y servicios candidatos:
  `.agents/context/gmbeverywhere.com/meg/generic.md`.

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


### 3. Restricciones de Cloudflare
- El proyecto utiliza `@sveltejs/adapter-cloudflare`.
- **No uses APIs específicas de Node.js** (como `fs`, `path`, `crypto` nativo de node) en los archivos `+page.server.ts` que se ejecutarán en SSR, ya que fallarán en el entorno Edge de Cloudflare Workers. Usa las Web APIs estándar (Fetch, Crypto, URL, etc.).
- Las lecturas de archivos mdsvex (.svx) se harán estrictamente en tiempo de compilación (Prerendering) utilizando las importaciones de Vite (`import.meta.glob`).

### 4. Flujo de Trabajo y Estilo
- **Idiomas:** El código fuente (variables, funciones, componentes) y la interfaz de usuario (UI) de la parte pública deben escribirse **únicamente en idioma inglés** por el momento. Sin embargo, se debe diseñar y crear la estructura de traducción a futuro (localización/i18n) de forma que sea escalable y compatible con Cloudflare Workers. Los comentarios, la documentación y los commits pueden seguir escribiéndose en español.
- **Código conciso:** Evita reescribir funciones enteras si solo cambian dos líneas. Proporciona el fragmento modificado e indica dónde insertarlo.
- No inventes dependencias ni generes contenido de relleno ("Lorem Ipsum") a menos que se te solicite explícitamente para una maqueta.

### 5. Creación y Actualización de Contenido (Blog / SEO)
- Las pautas de redacción, estrategias de contenido anti-AI-slop, el framework de optimización E-E-A-T y la resolución de los **5 Errores Críticos que Matan el Tráfico** se encuentran detallados en **[SEO.md](file:///Users/hlorenzoz/databank/Development/%5BMEG%20-%20Malaga%20Event%20Gear%20%28malagaeventgear.com%29%5D/projects/website/SEO.md)**. Es obligatorio que el desarrollador/redactor los siga rigurosamente para cualquier publicación o contenido comercial.
- **Reseñas reales de Google (E-E-A-T - Experience/Trust):** al crear o actualizar contenido comercial (posts del silo, páginas de paquete, servicios), consultar `src/lib/data/testimonials.ts` (`getTestimonials(limit?)`) para ver si hay una reseña real relevante al tema del contenido (tipo de evento, paquete, zona). Si la hay, citarla **textual** - autor, `rating`, `relativeTime` y el cuerpo en `text` (o `translation` si existe) - nunca parafrasearla inventando énfasis que la reseña no tiene. Si no hay ninguna reseña relevante para ese tema puntual, no es un bloqueante ni una señal negativa (ver "Reputación ausente NO es señal negativa" más arriba); lo que sí está prohibido es dejar una sección de tipo "Testimonials" con un heading vacío o con prosa genérica sin cita real donde debería ir una.
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

- **Un único nodo `#organization`:** el `priceRange` (y todo el NAP) se emite **solo** desde `buildLocalBusinessSchema()` en `src/lib/utils/schema.ts`, que lo deriva del catálogo. Las páginas que necesiten referirse a la empresa lo hacen **por `@id`** (`{'@id': '.../#organization'}`), nunca redefiniendo el nodo. Redefinirlo ya produjo dos verdades simultáneas (`'€€'` en `schema.ts` vs `'290€ - 650€'` en `/about-us/`, con direcciones distintas).
- **Guard automático:** `src/lib/data/no-hardcoded-prices.test.ts` escanea todo `src/**` (excepto `src/content/**`, que es copy editorial) y **falla la suite** ante cualquier literal `€290` / `290 €` / `290 EUR`. Si tu cambio lo rompe, la solución es importar el helper - **no** ampliar el allowlist.

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
> solo-fecha; **sin comillas**, el parser YAML lo convierte a datetime con `Z` (UTC). Ambas formas
> son seguras hoy porque el helper las normaliza, pero tenelo presente al revisar JSON-LD.

### Reglas del body

1. **NO repetir el título como `<h1>`** - el layout (`BlogPost.svelte`) ya lo renderiza.
2. Empezar directamente con el contenido (párrafo o `## Subtítulo`).
3. Las imágenes deben estar en R2 (`cdn.malagaeventgear.com`) o ser URLs absolutas.

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
2. `git commit` + `git push` → CI trigger → rebuild automático

### Actualizar un post ya publicado (no tocar `draft`)

Actualizar el contenido de un post que ya está en producción (`draft: false`) es una operación
distinta de publicar un post nuevo, y el campo `draft` **no se toca**: se queda en `false`. Lo
único que cambia es el contenido y `updatedDate` (`just post-touch <slug>`). Volver a poner
`draft: true` en un post ya indexado lo saca del sitemap y de Google - eso es una
**despublicación deliberada**, una acción totalmente distinta a una actualización de contenido,
que requiere pedido explícito del usuario y nunca es un efecto colateral de una edición.

### Post schedulado (publicación futura)

Poner `publishDate` en el futuro. El post no aparecerá hasta que un build corra después
de esa fecha. El cron worker (`workers/blog-rebuild/`) hace un rebuild diario a las 08:00 UTC.

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
`.agents/context/keywords/pop/PageOptimizer Pro _ Reverse Silo - POP.csv` (gitignoreado, local).

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

### Los dos silos de MEG

| Silo | Pilar (target page) | Target del pilar |
| :--- | :--- | :--- |
| audio visual rental | `/blog/audio-visual-rental/` | `/` (home) |
| wedding rentals | `/blog/wedding-rentals/` | `/` (home) |

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
vivo**: no hay archivo committeado ni paso de generación — `src/lib/data/site-map.ts`
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
metodología agnóstica y leen los hechos de MEG desde este `AGENTS.md` (Mode B).