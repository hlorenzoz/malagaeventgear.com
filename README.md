# Malaga Event Gear: Website

Sitio de [malagaeventgear.com](https://malagaeventgear.com/) construido con **SvelteKit 5**
(Svelte runes), **TypeScript**, **Tailwind v4** y desplegado sobre **Cloudflare**
(`@sveltejs/adapter-cloudflare`). Contenido del blog vía **MDsveX**.

> Contexto para el asistente de IA, reglas de desarrollo y arquitectura: ver
> [CLAUDE.md](CLAUDE.md). Conocimiento de negocio: `.agents/BUSINESS.md`. Diseño: `DESIGN.md`. SEO: `.agents/context/SEO.md`.

## Contenido

- [Stack](#stack)
- [Desarrollo](#desarrollo)
- [Build & deploy](#build--deploy)
- [Comandos just](#comandos-just)
  - [1. Desarrollo y calidad](#1-desarrollo-y-calidad)
  - [2. Blog y traducciones](#2-blog-y-traducciones)
  - [3. Keywords, FAQs y plan de contenido](#3-keywords-faqs-y-plan-de-contenido)
  - [4. Tareas (TODO.json)](#4-tareas-todojson)
  - [5. Implementador de tareas bajo demanda](#5-implementador-de-tareas-bajo-demanda)
  - [6. Base de datos, secrets y deploy](#6-base-de-datos-secrets-y-deploy)
  - [7. Qué corre solo y qué corro yo](#7-qué-corre-solo-y-qué-corro-yo)
  - [Solución de problemas](#solución-de-problemas)
- [Agentes](#agentes)
- [Captura de Leads](#captura-de-leads-formularios-a-crm)

## Stack

- **Frontend/Fullstack:** SvelteKit (prerender para la web pública, endpoints dinámicos para APIs).
- **Base de datos:** Cloudflare D1 (SQLite), captura de leads normalizada.
- **Email:** Resend (confirmación al lead + notificación interna + secuencia de reseñas).
- **Antispam:** Cloudflare Turnstile (managed/invisible).
- **Cron:** Worker de Cloudflare separado (`workers/review-reminders/`).
- **Gestor de paquetes:** bun.

## Desarrollo

```sh
bun install
bun run dev            # servidor de desarrollo (vite, puerto 5173)
bun run check          # wrangler types + svelte-kit sync + svelte-check
bun run test           # Vitest (unit + integración server-lib)
bunx playwright test   # E2E (carpeta tests/)
```

Cada uno tiene su receta `just` (ver [Comandos just](#comandos-just)).

## Build & deploy

```sh
bun run build          # build de producción (SvelteKit a Cloudflare)
bunx wrangler deploy   # deploy de la app principal
```

El Worker de cron de recordatorios de reseña se despliega aparte:

```sh
cd workers/review-reminders && bunx wrangler deploy
```

## Comandos just

Todo lo repetible del proyecto es una receta de [just](https://github.com/casey/just). El listado
vivo sale de `just --list` y las recetas están en el `Justfile`. Esta sección explica cada una.
Reglas generales:

- Las recetas que llaman a Claude (`keywords-research`, `faq-research`, `content-plan`,
  `todo-implement`) **cuestan dinero** y tienen un tope de gasto. No se corren para probar.
- Un id de tarea se escribe entre comillas simples (`'#T0037'`), porque `#` abre un comentario en
  la shell. Un estado con espacio también (`--estado "en curso"`).
- Nada de esto hace `git push`. Los commits de las recetas son locales.

### 1. Desarrollo y calidad

| Comando | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `install` | Instala dependencias (`bun install`) | `just install` |
| `dev` | Servidor de desarrollo de Vite en el puerto 5173 | `just dev` |
| `build` | `wrangler types` + `scripts/fix-types.ts` + `vite build`. El HTML prerenderizado queda en `.svelte-kit/cloudflare/`. Tarda unos 11 minutos con los 13 idiomas | `just build` |
| `preview` | Sirve el build con `wrangler pages dev` en el puerto 4173. Requiere un build previo | `just build && just preview` |
| `check` | `wrangler types` + `fix-types.ts` + `svelte-kit sync` + `svelte-check` | `just check` |
| `test` | Vitest, toda la suite (`vitest run`) | `just test` |
| `playwright` | E2E de `tests/` contra el servidor de desarrollo. Excluye los `*.prod.spec.ts` | `just playwright` |
| `test-lighthouse` | Corre `build`, borra `.lighthouseci` y ejecuta `lhci autorun` con `.lighthouserc.json` | `just test-lighthouse` |
| `format` | `bunx prettier --write .` sobre todo el repo | `just format` |
| `gen` | Regenera los tipos de Cloudflare (D1, R2) desde `wrangler.toml` | `just gen` |

Gate recomendado antes de commitear (de CLAUDE.md): `just check` y `just test`. El gate completo suma `just playwright`, `just build` y
`just test-lighthouse`.

Prettier corre solo desde `.pre-commit-config.yaml` al commitear. Los specs `*.prod.spec.ts`
miran el build real y se corren con `bunx playwright test -c playwright.prod.config.ts`, que hace
su propio build y preview. `just format` formatea todo el repo de una vez: revisá el diff antes de
commitear (no hay configuración de Prettier en la raíz del repo).

### 2. Blog y traducciones

Un post vive en `src/content/blog/<slug>.svx` y sus 12 traducciones en
`src/content/blog/<locale>/<slug>.svx`. El slug es siempre el inglés. Todo contenido nuevo o
editado sale en los 13 idiomas en el mismo cambio.

| Comando | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `post-new` | Crea un post inglés con `draft: true`, interactivo. Acepta `--title`, `--category`, `--author` | `just post-new` |
| `post-touch <slug>` | Pone `updatedDate` de hoy y lista las traducciones que quedan desactualizadas | `just post-touch projector-rental` |
| `post-sync <slug>` | Tras editar el inglés: `post-touch` + regenera `post-faqs.json` y `post-toc.json` + lista traducciones por actualizar | `just post-sync projector-rental` |
| `post-images [carpeta] [--dry-run]` | Convierte las imágenes de `assets/` a WebP y AVIF, las sube a R2 y actualiza `scripts/migrate-wp/manifest.json` | `just post-images evento-ECOC2026 --dry-run` |
| `post-heading-id "<h>"...` | Imprime el id (`rehype-slug`) de cada encabezado, para los anclajes internos de una traducción | `just post-heading-id "Preguntas frecuentes"` |
| `post-translations-status [--json]` | Qué traducciones faltan o están desactualizadas. Sin pendientes imprime `complete: ...` | `just post-translations-status` |
| `post-translate-brief <slug> [--out ruta]` | Imprime el brief del traductor del post (base + `special/<slug>.md` + cola) | `just post-translate-brief projector-rental --out brief.md` |
| `post-translate-map <slug> --map <json o ->` | Agrega la entrada del content map del post en los idiomas del JSON (`{ "fr": { "slug": "...", "keyword": "..." } }`) | `just post-translate-map projector-rental --map mapa.json` |
| `post-translate-check <slug> [--strict] [--locale fr,de] [--post-build]` | Revisa las 12 traducciones contra el inglés. Sale con error si algo falla | `just post-translate-check projector-rental --strict` |
| `post-translate-finish <slug> [--no-commit]` | Checks, tests, build, sitemaps y commit LOCAL de las traducciones | `just post-translate-finish projector-rental` |

Notas de uso:

- `post-images` necesita `wrangler` logueado en la cuenta dueña del sitio. En el post se pega
  markdown simple con la URL WebP original (`![alt](https://cdn.malagaeventgear.com/blog/<id>/<base>.webp)`).
  El `<picture>` lo genera el build, no se pega a mano.
- `post-translate-map` es idempotente y no escribe nada si una sola entrada es inválida
  (slug repetido, keyword igual a otra del idioma, campos de más).
- `post-translate-finish` se niega a correr si hay algo en el índice de git, y solo commitea
  `src/content/blog`, `src/lib/i18n/content-map`, `post-faqs.json` y `post-toc.json`.

**Flujo de punta a punta: crear o actualizar un post y traducirlo a los 12 idiomas**

1. Post nuevo: `just post-new` y escribir el cuerpo en inglés. Post existente: editar el `.svx`.
   Las imágenes nuevas pasan antes por `just post-images <carpeta>`.
2. `just post-sync <slug>` regenera `post-faqs.json` y `post-toc.json` y lista las traducciones
   que quedaron atrás (en un post nuevo también agrega `updatedDate` de hoy).
3. `just post-translate-brief <slug>` para obtener el brief. Traducir a `fr`, `it`, `de`, `nl`,
   `pt-pt`, `pt-br`, `sv`, `da`, `nb`, `zh-hans`, `zh-tw` y `zh-hk`, a mano o con el agente
   `post-translator`, uno solo a la vez. En una actualización cada traducción recibe la misma
   edición y su `sourceUpdated` pasa a la nueva fecha inglesa.
4. Solo para un post nuevo: `just post-translate-map <slug> --map mapa.json` con el slug y la
   keyword de cada idioma. Los anclajes internos se calculan con `just post-heading-id`.
5. `just post-translate-check <slug> --strict` hasta que no quede ninguna fila con error.
6. `just post-translations-status` debe terminar en `complete:`.
7. `just post-translate-finish <slug>` cierra el cambio: checks, tests, build y commit local.

Qué verifica `post-translate-check`:

| Verificación | Detalle |
| :--- | :--- |
| Frontmatter | Solo `title`, `description`, `excerpt`, `publishDate`, `sourceUpdated` y `updatedDate` opcional. Fechas válidas y no futuras |
| Largos | Título de hasta 65 caracteres, descripción de hasta 160 |
| Tipografía (regla 12) | Caracteres prohibidos y punto y coma en la prosa. En chino, caracteres coloquiales cantoneses o simplificados en texto tradicional |
| Estructura contra el inglés | Misma cantidad de H2 y H3, imágenes, `InlineCTA`, `ImageMarquee`, citas, filas de tabla y preguntas de FAQ |
| Keyword | Uso en el primer párrafo y en el título. Son avisos, y errores con `--strict` |
| Content map | Choques de slug y de keyword con otras entradas del idioma |
| `--post-build` | Audita el HTML de `.svelte-kit/cloudflare`: anclajes, conteo de encabezados e imágenes, markdown filtrado. Dice `NEEDS BUILD` si el build es más viejo que las fuentes |

### 3. Keywords, FAQs y plan de contenido

Toda la investigación vive en `.agents/data/keywords.json` y **solo la escriben scripts**, nunca
a mano. Ver CLAUDE.md, "Investigación de keywords".

**Corre solo, todos los días** (`launchd` ejecuta `just keywords-daily`):

| Etapa | Receta | Agente | Tope |
| :--- | :--- | :--- | :--- |
| 1. Investigación | `keywords-research` | `ubersuggest-analyst` (MCP de Ubersuggest) | 4 USD |
| 2. FAQs | `faq-research` | `faq-researcher` (autocompletado de Google) | 2 USD |
| 3. Plan de contenido | `content-plan` | `content-strategist` | 4 USD |
| 4. Orden de tareas | `todo-organize` | ninguno (determinista, sin red) | 0 |

`keywords-daily` es `scripts/keywords/daily-guard.ts`. Qué hace en cada disparo:

- `launchd` lo dispara a las 09:30, al iniciar sesión y cada hora. Casi todos los disparos no
  hacen nada y no llaman a Claude.
- Una etapa está hecha si su archivo de hoy (`ubersuggest/`, `faqs/` o `content-plan/` bajo
  `.agents/context/keywords/`) está commiteado y sin cambios. Hoy es la fecha de Europe/Madrid.
- Las etapas 1 a 3 son **independientes**: si una falla o se queda sin cuota, las demás corren igual
  y la que falló se reintenta en el próximo disparo.
- `todo-organize` corre **siempre** a partir de las 09:30, aunque no haya red, se hayan agotado los
  intentos o los agentes hayan fallado. Solo reescribe `TODO.json` si algo cambió. Así las tareas
  bloqueadas por traducciones se destraban solas.
- Frenos de las etapas con agente: nada antes de las 09:30, sin red (HEAD a `api.anthropic.com`),
  otro run en curso (lock) y 3 intentos por día. Los días perdidos no se recuperan, son una sola
  corrida hoy.
- `--dry-run` imprime la decisión sin correr nada. `--force` ignora la hora, lo ya hecho y los
  intentos, pero respeta el lock y la red.
- Log: `~/Library/Logs/meg-keyword-research.log`, una línea por decisión.

| Comando | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `keywords-daily [--dry-run] [--force]` | La corrida diaria con control, descrita arriba | `just keywords-daily --dry-run` |
| `keywords-schedule-install` | Copia la plantilla de launchd a `~/Library/LaunchAgents/com.malagaeventgear.keyword-research.plist`, completa las rutas y la arranca | `just keywords-schedule-install` |
| `keywords-research` | Agente de Ubersuggest (`claude -p`, aislado, 4 USD). Lo llama el guard | `just keywords-research` |
| `faq-research` | Agente de FAQs (aislado, 2 USD). Lo llama el guard | `just faq-research` |
| `content-plan` | Agente del plan (aislado, 4 USD). Lo llama el guard | `just content-plan` |
| `keywords-seeds [n]` | JSON con la agenda del día y las N semillas de investigación (3 por defecto) | `just keywords-seeds 5` |
| `faq-seeds [n]` | JSON con las N keywords del día para el agente de FAQs (10 por defecto) | `just faq-seeds` |
| `keywords-sync` | Reconstruye `keywords.json` desde las fuentes del repo y los lotes commiteados. Idempotente | `just keywords-sync` |
| `keywords-ingest <lote>` | Valida y mergea un lote de Ubersuggest | `just keywords-ingest .agents/context/keywords/ubersuggest/2026-10-01.json` |
| `faqs-ingest <lote>` | Valida y mergea un lote de FAQs | `just faqs-ingest .agents/context/keywords/faqs/2026-10-01.json` |
| `keywords-commit <lote>` | Corre los tests de `scripts/keywords` y commitea solo `keywords.json`, el lote y `ubersuggest.json` | `just keywords-commit .agents/context/keywords/ubersuggest/2026-10-01.json` |
| `faqs-commit <lote>` | Igual, para el lote de FAQs | `just faqs-commit .agents/context/keywords/faqs/2026-10-01.json` |
| `keywords-report-log [--stdout]` | Regenera `.agents/data/ubersuggest.json` desde los lotes commiteados | `just keywords-report-log --stdout` |
| `keywords-tier` | JSON con el traffic tier de Avalanche (impresiones diarias del último export de GSC) | `just keywords-tier` |
| `faqs [--keyword id] [--status idea] [--source s] [--since fecha]` | FAQs de `keywords.json` filtradas, sin abrir el archivo | `just faqs --status idea --since 2026-09-30` |
| `content-candidates [n]` | JSON con las N candidatas de contenido del día (20 por defecto) y el cupo de posts nuevos | `just content-candidates 10` |
| `content-inventory [--cluster c]` | JSON con los posts ingleses, sus H2/H3 y FAQs. Acepta el clúster con o sin `--cluster` | `just content-inventory --cluster "audio visual rental"` |
| `content-plan-apply <plan>` | Valida el plan, corre `keywords-sync` y `todo-organize` | `just content-plan-apply .agents/context/keywords/content-plan/2026-10-01.json` |
| `content-plan-commit <plan>` | Commitea solo `keywords.json` y el plan, nunca `TODO.json` | `just content-plan-commit .agents/context/keywords/content-plan/2026-10-01.json` |

Cómo usarlos:

- **Manual y seguro** (solo lectura): `keywords-tier`, `keywords-seeds`, `faq-seeds`, `faqs`,
  `content-candidates`, `content-inventory` y `keywords-report-log --stdout`.
- **Manual con efecto en el repo**: `keywords-sync` regenera `keywords.json`. Correlo después de
  publicar contenido para que la keyword pase a `covered` o `published`.
- **Los de ingestión y commit** (`*-ingest`, `*-commit`, `content-plan-apply`) son la puerta que
  usan los agentes. Los commits van con `--no-verify` a propósito, para no pisar el trabajo de otra
  sesión con el stash del pre-commit.

### 4. Tareas (TODO.json)

`.agents/data/TODO.json` es la lista de trabajo. Se lee y se cambia con estas recetas, sin editar
el JSON. La escritura es atómica y se reintenta una vez si otra sesión modificó el archivo.

| Comando | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `todo-list [filtros]` | Tabla de tareas. Filtros `--estado`, `--prioridad`, `--tipo`, `--origen`, `--texto` | `just todo-list --prioridad alta --tipo contenido` |
| `todo-add --titulo "..."` | Crea una tarea del usuario con el siguiente id. Opciones `--prioridad`, `--tipo`, `--desc`, `--desc-file` | `just todo-add --titulo "Revisar fotos" --tipo imagenes --desc-file nota.txt` |
| `todo-set <id> [opciones]` | Cambia `--estado`, `--prioridad`, `--tipo` o suma `--add-nota` | `just todo-set '#T0007' --estado hecha` |
| `todo-organize [--dry-run] [--needs-priority] [--file ruta]` | Valida, suma las tareas de los planes y de los reportes, cierra las cubiertas, bloquea por traducciones y ordena | `just todo-organize --dry-run` |
| `todo-next [--task id] [--max N]` | JSON `{ next, queue, skipped }` con lo que implementaría `todo-implement`. Solo lee | `just todo-next --max 3` |

Vocabulario:

| Campo | Valores |
| :--- | :--- |
| `estado` | `pendiente`, `en curso`, `bloqueada`, `hecha` |
| `prioridad` | `alta`, `media`, `baja` |
| `tipo` | `contenido`, `traduccion`, `seo-tecnico`, `visibilidad-ia`, `keywords`, `link-building`, `imagenes`, `infraestructura`, `diseno`, `negocio`, `otro` |

Pasar una tarea a `hecha` pone la fecha de hoy. Reabrirla la borra. El orden del archivo es:
abiertas por prioridad primero y hechas al final. Mientras falte alguna traducción de un post
publicado, `todo-organize` bloquea las tareas pendientes del `content-strategist` y las reabre solo
cuando el backlog llega a cero. Una tarea bloqueada a mano sigue bloqueada.

### 5. Implementador de tareas bajo demanda

Implementa las tareas de contenido abiertas de `TODO.json` por prioridad, de punta a punta.
**Solo bajo demanda**: nada lo programa y la cadena diaria no lo llama.

| Comando | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `todo-implement [--task id] [--max N] [--dry-run]` | Corrida headless de Claude con los 5 agentes. `--dry-run` no llama a Claude: corre `todo-next` e imprime el comando | `just todo-implement --task '#T0037'` |
| `nlp-terms-check <archivo>` | Valida el archivo de términos NLP del investigador de SERP e imprime el resumen que recibe `post-writer`. Sale con error y la lista de problemas si es inválido | `just nlp-terms-check .agents/context/keywords/nlp-terms/2026-10-02-T0037.json` |
| `todo-implement-commit <id> <slug>` | Commitea solo `keywords.json` tras implementar una tarea. Lo usa el orquestador | `just todo-implement-commit '#T0037' tv-screen-rental` |

Qué hace, paso a paso, con un agente a la vez:

1. **Preflight** (`todo-implementer`): nada en el índice, nada modificado en `src/` ni `scripts/`,
   y `post-translations-status` en `complete:`. Si no, se detiene sin tocar nada.
2. Elige la tarea con `todo-next`, la marca `en curso` y hace el triage. Si ya está cubierta,
   canibaliza otro post o pide un hecho sin respaldo, la pasa a `bloqueada` con una nota.
3. **`serp-term-researcher`** busca en Google el término de la tarea, abre las 3 primeras páginas
   orgánicas y guarda solo términos NLP cortos (entidades, vocabulario relacionado, preguntas) en
   `.agents/context/keywords/nlp-terms/YYYY-MM-DD-T####.json`. El orquestador lo valida con
   `just nlp-terms-check`. Si falla, la tarea sigue sin esos términos, no se bloquea.
4. **`post-writer`** edita el post inglés (sección H2 o H3, o una pregunta de FAQ) cubriendo esos
   términos con sus palabras (y filtrándolos contra el inventario real), corre `post-sync` y escribe
   la entrada de `.agents/CHANGELOG.md`. El orquestador commitea `feat(blog): <slug> ...` junto con el
   archivo de términos.
5. **`post-translator`** (modo UPDATE) aplica la misma edición a los 12 idiomas.
6. **`post-verifier`** revisa de forma independiente, sin Write ni Edit: `post-translate-check
   --strict`, tests, estado de traducciones y honestidad del texto. Si falla, hasta 2 vueltas de
   reparación.
7. **Finish gate**: `post-translate-finish` (checks, tests, build y commit local de las
   traducciones), `keywords-sync`, `todo-organize`, la tarea pasa a `hecha` y
   `todo-implement-commit` commitea `keywords.json`.

Alcance y límites:

- **v1 implementa solo tareas `add-section` y `add-faq`.** Las `Post nuevo` (necesitan portada en
  R2 y enlaces de silo) y las tareas escritas a mano salen en `skipped` de `todo-next`.
- **Nunca hace push**, nunca commitea `TODO.json` y no agrega `Co-Authored-By`.
- **Presupuesto**: `--max-budget-usd` de 30 USD por tarea (`--max N` lo multiplica). Con la variable
  `TODO_IMPLEMENT_BUDGET` se fija el tope total de la corrida: `TODO_IMPLEMENT_BUDGET=15 just
  todo-implement`. Una tarea real cuesta varios USD y el build tarda unos 11 minutos.
- Los permisos valen para toda la sesión: Write y Edit solo en el blog, sus datos generados, el
  content map, el changelog y `nlp-terms/`. Bash solo para los comandos de la receta. `WebSearch` y
  `WebFetch` están permitidos en la sesión, pero solo `serp-term-researcher` los lista en sus
  herramientas, y lo que lee de la web es dato no confiable (el validador solo deja pasar términos
  cortos).
- La búsqueda del investigador no se localiza a España: la herramienta no lo permite, y el archivo lo
  deja dicho en `localized: false`. `post-writer` filtra los términos por mercado e inventario.

**Estado honesto: la corrida de punta a punta todavía no se ejercitó con una tarea real.** Solo se
probó con pruebas de humo (menos de 0,5 USD) que la herramienta Agent funciona en modo headless y
que los subagentes heredan los permisos acotados. La primera corrida conviene mirarla. Empezá con
`just todo-implement --dry-run`.

Qué revisar después:

1. `git log --oneline -5` y `git show --stat <hash>` para ver los commits (inglés, traducciones y
   `keywords.json`).
2. `git status --short` y `just post-translations-status` (debe decir `complete:`).
3. `just todo-list --estado "en curso"` y `just todo-list --estado bloqueada`.

Si una tarea termina `bloqueada`:

- Leé la nota (`bloqueada por todo-implementer <fecha>: <motivo>`) en el campo `notas` de la tarea,
  por ejemplo con `rg -n "bloqueada por todo-implementer" .agents/data/TODO.json`. `todo-list`
  muestra la tabla, no las notas.
- Causas típicas: ya estaba cubierta, canibaliza otro post, el brief pedía un dato sin respaldo,
  o el verificador falló dos veces.
- Si falló el verificador, el commit del inglés existe y las traducciones pueden estar
  desactualizadas. `just post-translations-status` lo muestra. Se retoma a mano con
  `post-translate-check` y `post-translate-finish`.
- Para reintentar: corregí la causa y `just todo-set '#T0037' --estado pendiente`.
  `todo-organize` solo reabre las que bloqueó la puerta de traducciones.

### 6. Base de datos, secrets y deploy

Requieren `wrangler login` en la cuenta dueña del sitio. Detalle del provisioning en
[docs/lead-capture-deployment.md](docs/lead-capture-deployment.md).

| Comando | Qué hace | Cuidado |
| :--- | :--- | :--- |
| `migrate-local` | Aplica las migraciones D1 a la base local (SQLite/miniflare) | Seguro, es desarrollo |
| `migrate` | Aplica las migraciones D1 a la base REMOTA | Producción. Usar tras cambiar el esquema |
| `db-tables` | Lista las tablas de la D1 remota | Solo lectura |
| `db-open` | Copia al portapapeles (`pbcopy`) la ruta del SQLite local | Falla si no hay D1 local: correr `just migrate-local` y enviar un lead primero |
| `secrets` | Pide uno por uno `RESEND_API_KEY`, `RESEND_FROM`, `TURNSTILE_SECRET_KEY` e `INDEXNOW_KEY` | Interactivo, escribe en producción |
| `secrets-worker` | Carga `RESEND_API_KEY` en el worker `meg-review-reminders` | Interactivo, escribe en producción |
| `deploy` | `bun run build` + `wrangler deploy` de la app principal | Normalmente lo hace la CI con `git push` |
| `deploy-worker` | Despliega `workers/review-reminders/` (segundo target de deploy) | Es un deploy separado del principal |
| `migrate-wp-dry-run` | Migración WordPress a mdsvex en solo lectura: no escribe archivos ni sube a R2 | Siempre primero |
| `migrate-wp-run` | Migración REAL: descarga imágenes, sube a R2 y emite los `.svx` | Correr antes `migrate-wp-dry-run`. Ver `.agents/WP_MIGRATION.md` |

### 7. Qué corre solo y qué corro yo

| Corre solo (launchd, `keywords-daily`) | Lo corro yo, a demanda |
| :--- | :--- |
| `keywords-research` (investigación de Ubersuggest) | Desarrollo y calidad: `dev`, `build`, `check`, `test`, `playwright`, `test-lighthouse` |
| `faq-research` (FAQs de autocompletado) | Blog y traducciones: `post-*` |
| `content-plan` (plan de contenido) | Lectura de datos: `keywords-tier`, `faqs`, `content-candidates`, `content-inventory` |
| `todo-organize` (ordena `TODO.json`, siempre) | Tareas: `todo-list`, `todo-add`, `todo-set`, `todo-next` |
| Los `*-commit` y `*-ingest` que invocan esos agentes | `todo-implement` (solo bajo demanda, nunca programado) |
| | DB, secrets y deploy: `migrate*`, `secrets*`, `deploy*`, `db-*`, `migrate-wp-*` |

Instalación del scheduler: `just keywords-schedule-install` (una sola vez por máquina). Si el Mac
está dormido a las 09:30, `launchd` corre el job al despertar. Si está apagado, los otros dos
disparos (inicio de sesión y cada hora) recuperan la corrida de hoy.

### Registro de actividad de los agentes

Cada mes tiene un único archivo, `.agents/logs/YYYY-MM.log` (por ejemplo `2026-10.log`). El primer
evento de un mes nuevo crea el archivo. Lo escribe código (`scripts/log/`), nunca el LLM, así que
el formato no depende de lo que diga un agente. Una línea por evento:

```
YYYY-MM-DD HH:MM | auto|demanda | <actor> | <evento> | <detalle clave=valor ...>
```

- `auto` es la cadena diaria (`keywords-daily`) y `demanda` son las corridas que lanzo yo
  (`todo-implement`, `post-translate-finish`).
- Eventos: `run-start`, `run-end`, `step-done`, `step-failed`, `commit`, `task-done`,
  `task-blocked`, `task-skipped`, `info`.
- Las corridas que no ejecutan nada (antes de las 09:30, ya commiteado, un organize sin cambios) no
  dejan línea, y `--dry-run` nunca escribe.
- Los recipes no commitean el log: queda modificado en el árbol y lo commiteo yo. No lleva secretos
  ni textos de reseñas.

```bash
rg "task-done" .agents/logs/2026-10.log          # qué se completó este mes
rg "step-failed|task-blocked" .agents/logs/      # qué falló o quedó bloqueado
rg "^2026-10-02" .agents/logs/2026-10.log        # un día
```

### Solución de problemas

| Síntoma | Causa y qué hacer |
| :--- | :--- |
| `skip (another run holds the lock)` | Hay un lock en `~/Library/Application Support/malagaeventgear/keywords-daily/lock`. Se descarta solo si su PID murió o tiene más de 3 horas. Si hay un run colgado: verificá el PID del archivo `pid` y borrá esa carpeta |
| No corre nada antes de las 09:30 | Es el comportamiento esperado. `just keywords-daily --force` ignora la hora |
| `offline, will retry at the next trigger` | El guard hace un HEAD a `api.anthropic.com` (5 s). Sin red las etapas con agente esperan. `todo-organize` corre igual |
| `daily attempts used up (3/3)` | Cada run con agentes gasta un intento. El contador está en `attempts-<fecha>` en la misma carpeta del lock. `--force` lo ignora |
| Una tarea quedó `bloqueada` | `just todo-list --estado bloqueada` la lista y su nota está en `TODO.json`. Si fue por traducciones se reabre sola. Si no, `just todo-set '<id>' --estado pendiente` tras corregir la causa |
| `post-translate-check --post-build` dice `NEEDS BUILD` | El build es más viejo que las fuentes. Correr `just build` y repetir. No se da por pasado un check renderizado con un build viejo |
| `post-translate-finish` se niega a correr | Hay archivos en el índice de git. Commitearlos o sacarlos con `git restore --staged` y repetir |

## Agentes

Viven en `.claude/agents/`. Los de la cadena diaria corren aislados (`claude -p` sin settings,
MCP estricto, permisos acotados).

| Agente | Rol | Quién lo lanza | Herramientas |
| :--- | :--- | :--- | :--- |
| `ubersuggest-analyst` | Descubre keywords y mide con Ubersuggest, escribe un lote y commitea local | `just keywords-research`, desde `keywords-daily` | Read, Write, Glob, Bash y las tools del MCP de Ubersuggest |
| `faq-researcher` | Copia preguntas del autocompletado de Google para las keywords del día | `just faq-research`, desde `keywords-daily` | Read, Write, Glob, Bash, `google_suggestions` |
| `content-strategist` | Decide qué sección, FAQ o post conviene, y escribe el plan del día | `just content-plan`, desde `keywords-daily` | Read, Glob, Grep, Write, Bash |
| `todo-implementer` | Orquesta la implementación de una tarea de contenido | `just todo-implement` | Read, Glob, Grep, Bash, Agent |
| `post-writer` | Edita el post inglés (sección o FAQ) | `todo-implementer`, o a mano | Read, Write, Edit, Glob, Grep, Bash |
| `post-translator` | Traduce o actualiza los 12 idiomas de un post | `todo-implementer`, o a mano | Read, Write, Edit, Glob, Grep, Bash |
| `post-verifier` | Verificación independiente, solo lectura (PASS o FAIL) | `todo-implementer`, o a mano | Read, Glob, Grep, Bash |
| `serp-term-researcher` | Lee el SERP real y guarda términos NLP cortos del top 3 orgánico | `todo-implementer`, o a mano | Read, Write, Glob, Bash, WebSearch, WebFetch |

Los agentes SEO globales (`seo-auditor`, `seo-fixer`, `local-content-writer`,
`content-gap-analyst`, `reverse-silo-architect`, `gbp-site-architect`) y los comandos `/seo:*` y
`/local-seo:*` viven en `~/.claude/` y son genéricos para todo cliente. En este repo el bloque
"Instrucciones para agentes globales (overrides del proyecto)" de [CLAUDE.md](CLAUDE.md) tiene
prioridad sobre su propio texto.

## Captura de Leads (formularios a CRM)

Las páginas de paquete (`/packages/[slug]/`) tienen un formulario de contacto orientado a
conversión (CRO) que persiste cada lead en **Cloudflare D1** (esquema normalizado, listo para
el CRM propio), dispara correos transaccionales vía **Resend** (confirmación al lead +
notificación a destinatarios internos), y agenda una secuencia de pedido de reseña de Google
posterior al evento (máx 3 envíos, un día de por medio, con corte automático al hacer clic en el link).

**Pasos de provisioning y deploy** (crear D1, pegar `database_id` en los 2 `wrangler.toml`,
migraciones, verificar dominio en Resend, cargar secrets de Turnstile/Resend, deploy de los
2 targets, y smoke test posterior al deploy con queries de verificación):

**[docs/lead-capture-deployment.md](docs/lead-capture-deployment.md)**

Guías relacionadas:
- **[docs/lead-capture-deployment.md](docs/lead-capture-deployment.md)**: provisioning y deploy (D1, Resend, Turnstile, secrets).
- **[docs/dmarc-hardening.md](docs/dmarc-hardening.md)**: plan por etapas para endurecer DMARC (monitoreo, quarantine, reject).

### Piezas clave

| Pieza | Ruta |
|-------|------|
| Esquema D1 | `migrations/0001_init.sql` |
| Endpoint del formulario | `src/routes/api/leads/+server.ts` (`prerender = false`) |
| Lógica de servidor | `src/lib/server/` (`db`, `leads`, `email/templates`, `reviews/sequence`) |
| Formulario / phone input | `src/lib/components/forms/{LeadForm,PhoneInput}.svelte` |
| Página de agradecimiento (tracking) | `src/routes/(public)/thank-you/+page.svelte` |
| Redirect trackeado de reseña | `src/routes/r/[token]/+server.ts` |
| Worker de cron | `workers/review-reminders/` |
