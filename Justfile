# Málaga Event Gear (MEG) - comandos del proyecto

# Levanta el servidor de desarrollo de Vite con Bun
dev:
    bun run dev

# Compila el sitio para producción optimizado para Cloudflare Workers (adapter-cloudflare)
build:
    bun run build

# Previsualiza localmente la compilación de producción simulando Cloudflare Edge
preview:
    bun run preview

# Realiza chequeos estáticos de tipos (TypeScript) y validación de componentes de Svelte
check:
    bun run check

# Genera los tipos automáticos de Cloudflare (D1, R2) a partir de wrangler.toml
gen:
    bun run gen

# Instala las dependencias del proyecto usando Bun
install:
    bun install

# Formatea el codigo (ts, js, mjs, svelte, css) con Biome, segun biome.json. No toca markdown, yaml ni .svx (Biome no los soporta)
format *paths:
    bunx biome format --write {{paths}}

# Lista los archivos de codigo que Biome formatearia distinto, sin escribir nada. Acepta rutas
format-check *paths:
    bunx biome format {{paths}}

# Ejecuta las pruebas de integración E2E con Playwright
playwright:
    bunx playwright test

# Ejecuta las pruebas unitarias / de integración con Vitest (lógica de servidor: leads, email, reviews)
test:
    bun run test

# Compila y audita el rendimiento de todas las páginas con Lighthouse CI (.lighthouserc.json)
test-lighthouse: build
	rm -rf .lighthouseci
	bunx @lhci/cli autorun

# ─── Captura de Leads: D1, secrets y deploy ───────────────────────────────────
# Requiere CLI autenticada en la cuenta dueña del sitio (cc26ab18…): `wrangler login`.
# Detalle completo del provisioning en docs/lead-capture-deployment.md

# Aplica las migraciones D1 a la base LOCAL (SQLite/miniflare, para desarrollo)
migrate-local:
    bunx wrangler d1 migrations apply meg-leads --local

# Aplica las migraciones D1 a la base REMOTA (producción) — usar tras cambiar el esquema
migrate:
    bunx wrangler d1 migrations apply meg-leads --remote

# Lista las tablas de la D1 remota (verificación rápida del esquema)
db-tables:
    bunx wrangler d1 execute meg-leads --remote --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"

# Resuelve la ruta del archivo SQLite de la D1 LOCAL y la copia al portapapeles (para abrir en DB Browser / TablePlus)
db-open:
    @path=$(fd -HI -e sqlite . .wrangler/state/v3/d1/miniflare-D1DatabaseObject --exclude metadata.sqlite -a | head -1); \
    if [ -z "$path" ]; then echo "No se encontró la D1 local. Corré 'just migrate-local' y enviá un lead primero."; exit 1; fi; \
    printf '%s' "$path" | pbcopy; \
    echo "📋 Ruta copiada al portapapeles:"; echo "$path"

# Carga los secrets de la app principal (Resend + Turnstile) — pide cada valor de forma interactiva
secrets:
    bunx wrangler secret put RESEND_API_KEY
    bunx wrangler secret put RESEND_FROM
    bunx wrangler secret put TURNSTILE_SECRET_KEY
    bunx wrangler secret put INDEXNOW_KEY

# Carga el secret del worker de recordatorios de reseña (mismo RESEND_API_KEY)
secrets-worker:
    bunx wrangler secret put RESEND_API_KEY --name meg-review-reminders

# Despliega la app principal a Cloudflare (normalmente lo hace la CI por git push)
deploy:
    bun run build
    bunx wrangler deploy

# Despliega el worker de cron de recordatorios de reseña (segundo target de deploy)
deploy-worker:
    cd workers/review-reminders && bunx wrangler deploy

# ─── Blog: authoring helpers y migration ──────────────────────────────────────
# Requiere CLI autenticada en la cuenta correcta para los comandos de R2/deploy.
# Detalle completo del proceso de migración en .agents/WP_MIGRATION.md

# Crea un nuevo post de blog (.svx) de forma interactiva — pide título, categoría y autor
post-new:
    bun scripts/post-new.ts

# Marca un post existente como modificado hoy (actualiza el campo `updatedDate` en el frontmatter)
post-touch slug:
    bun scripts/post-touch.ts {{slug}}

# Optimiza las imágenes de assets/ → WebP+AVIF multi-ancho, las sube a R2 (blog/<id>/),
# persiste refs+metadata en manifest.json y escribe el markup <picture> en assets/_urls.txt.
# Acepta una subcarpeta (just post-images test) o --dry-run (no encodea ni sube, solo muestra).
post-images *ARGS:
    bun scripts/post-images.ts {{ARGS}}

# Tras editar un post en ingles: post-touch, regenera post-faqs.json y post-toc.json y lista las traducciones por actualizar
post-sync slug:
    bun scripts/translate/sync.ts {{slug}}

# Imprime el brief del traductor de un post (base + special/<slug>.md + cola). Acepta --out <ruta>
post-translate-brief slug *args:
    bun scripts/translate/mkbrief.ts {{slug}} {{args}}

# Revisa las 12 traducciones de un post contra el ingles. Acepta --post-build, --strict y --locale fr,de
post-translate-check slug *args:
    bun scripts/translate/check.ts {{slug}} {{args}}

# Cierra la traduccion de un post: checks, tests, build, sitemaps y UN commit LOCAL con el post ingles y sus 12 traducciones (nunca hace push). Acepta --no-commit y --message "feat(blog): <slug> ..."
[positional-arguments]
post-translate-finish slug *args:
    bun scripts/translate/finish.ts "$@"

# Instala (una vez por clon) el guard de pre-commit: un post ingles solo se commitea con sus 12 traducciones
hooks-install:
    bun scripts/translate/install-hook.ts

# Lista que traducciones de posts faltan o estan desactualizadas. Acepta --json
post-translations-status *args:
    bun scripts/translate/status.ts {{args}}

# Agrega las entradas del content map de un post en los 12 idiomas: just post-translate-map <slug> --map <json>
post-translate-map slug *args:
    bun scripts/translate/add-content-map.ts {{slug}} {{args}}

# El id (rehype-slug) que recibe cada encabezado, para los anclajes internos de una traduccion: just post-heading-id "Titulo uno" "Titulo dos"
[positional-arguments]
post-heading-id *args:
    @bun scripts/translate/heading-id.ts "$@"

# Migración WP → mdsvex en modo DRY-RUN (solo lectura — no escribe archivos ni sube a R2)
migrate-wp-dry-run:
    bun scripts/migrate-wp/index.ts --dry-run

# Migración WP → mdsvex REAL (descarga imágenes, sube a R2, emite .svx)
# ⚠ Asegurate de haber corrido primero: just migrate-wp-dry-run
migrate-wp-run:
    bun scripts/migrate-wp/index.ts

# ─── Investigación de keywords (keywords.json) ────────────────────────────────
# Ver CLAUDE.md, sección "Investigación de keywords (`keywords.json`)"

# Regenera .agents/data/keywords.json desde las fuentes estáticas del repo (POP, GSC, Google Ads, GBP, blog, FAQs)
keywords-sync:
    bun scripts/keywords/sync.ts

# Mergea un lote diario de Ubersuggest (.agents/context/keywords/ubersuggest/YYYY-MM-DD.json)
keywords-ingest file:
    bun scripts/keywords/ingest-ubersuggest.ts {{ file }}

# Elige las N semillas del día para el agente de investigación (por defecto 3)
keywords-seeds n='3':
    bun scripts/keywords/next-seeds.ts {{ n }}

# Corre el agente diario de investigación de keywords (Ubersuggest MCP), en la rama y directorio actuales.
# La barrera real son los permisos, no el prompt. --setting-sources "" no carga NINGÚN settings (el
# allow global y el de .claude/settings.json, con cientos de reglas, se sumarían a --allowedTools).
# Por eso el MCP de Ubersuggest se declara con --mcp-config y --strict-mcp-config (el token OAuth
# sale del llavero). --permission-mode default deniega todo lo no permitido (el modo auto del usuario
# lo aprobaría con un clasificador) y --disallowedTools gana siempre. Sin settings el CLI tampoco carga
# los agentes de proyecto: el agente entra por --agents, generado desde su .md (scripts/keywords/agent-json.ts).
keywords-research:
    claude -p --agents "$(bun scripts/keywords/agent-json.ts)" --agent ubersuggest-analyst --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{"ubersuggest":{"type":"http","url":"https://ubersuggest-mcp.neilpatelapi.com/mcp"}}}' --strict-mcp-config --permission-mode default --disallowedTools "Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(rm:*)" --allowedTools "mcp__ubersuggest__user_limits,mcp__ubersuggest__list_projects,mcp__ubersuggest__keyword_suggestions,mcp__ubersuggest__match_keywords,mcp__ubersuggest__keyword_overview,mcp__ubersuggest__serp_analysis,mcp__ubersuggest__content_ideas,mcp__ubersuggest__article_title_suggestions,mcp__ubersuggest__domain_keywords,mcp__ubersuggest__project_position_info,mcp__ubersuggest__seo_opportunities,mcp__ubersuggest__brand_config,mcp__ubersuggest__brand_prompts,mcp__ubersuggest__industry_prompts,mcp__ubersuggest__keyword_metrics,mcp__ubersuggest__location_suggest,mcp__ubersuggest__brand_visibility_overview,mcp__ubersuggest__backlinks_overview,mcp__ubersuggest__backlink_opportunity,mcp__ubersuggest__domain_top_pages,mcp__ubersuggest__domain_overview,mcp__ubersuggest__traffic_value,Read,Glob,Write(.agents/context/keywords/ubersuggest/**),Edit(.agents/context/keywords/ubersuggest/**),Bash(date:*),Bash(just keywords-sync),Bash(just keywords-seeds:*),Bash(just keywords-ingest:*),Bash(just keywords-commit:*)" --max-budget-usd 4 --output-format json "Run today's keyword research."

# Commitea SOLO .agents/data/keywords.json y el lote del día, después de correr los tests de keywords. Es la única
# puerta de commit del agente. Va con --no-verify a propósito: el hook de pre-commit guarda en stash
# los cambios sin stagear, y pisaría el trabajo de otra sesión que edite el repo al mismo tiempo. La
# validación la hacen los tests de scripts/keywords (schema, guards) antes del commit.
keywords-commit batch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ batch }}" =~ ^\.agents/context/keywords/ubersuggest/[0-9]{4}-[0-9]{2}-[0-9]{2}\.json$ ]] || { echo "lote inválido: {{ batch }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    bun scripts/keywords/write-report-log.ts || echo "no se pudo generar ubersuggest.json, se commitea sin él" >&2
    git add -- .agents/data/keywords.json .agents/data/ubersuggest.json "{{ batch }}"
    git commit --no-verify -m "chore(keywords): daily Ubersuggest research $(basename "{{ batch }}" .json)" -- .agents/data/keywords.json .agents/data/ubersuggest.json "{{ batch }}"
    git log -1 --format='%h %s'
    bun scripts/log/agent-log.ts --mode "${AGENT_LOG_MODE:-auto}" --actor ubersuggest-analyst --event commit --last-commit --detail "file={{ batch }}" || true

# Regenera .agents/data/ubersuggest.json (el registro fechado de reportes) desde los lotes commiteados. `--stdout` no escribe
keywords-report-log *args:
    @bun scripts/keywords/write-report-log.ts {{ args }}

# ─── Agente de FAQs (faq-researcher) ──────────────────────────────────────────
# Ver CLAUDE.md, "El agente de FAQs (faq-researcher)". Corre después del analista de Ubersuggest, antes del plan de contenido.

# Las 10 keywords del día para el agente de FAQs (las menos consultadas primero). JSON
faq-seeds n='10':
    @bun scripts/keywords/faq-seeds.ts {{ n }}

# Mergea un lote diario de FAQs (.agents/context/keywords/faqs/YYYY-MM-DD.json)
faqs-ingest file:
    bun scripts/keywords/ingest-faqs.ts {{ file }}

# Commitea SOLO .agents/data/keywords.json y el lote de FAQs del día, después de correr los tests de keywords. Mismo --no-verify
# y misma razón que keywords-commit.
faqs-commit batch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ batch }}" =~ ^\.agents/context/keywords/faqs/[0-9]{4}-[0-9]{2}-[0-9]{2}\.json$ ]] || { echo "lote inválido: {{ batch }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    git add -- .agents/data/keywords.json "{{ batch }}"
    git commit --no-verify -m "chore(keywords): daily FAQ research $(basename "{{ batch }}" .json)" -- .agents/data/keywords.json "{{ batch }}"
    git log -1 --format='%h %s'
    bun scripts/log/agent-log.ts --mode "${AGENT_LOG_MODE:-auto}" --actor faq-researcher --event commit --last-commit --detail "file={{ batch }}" || true

# Corre el agente diario de FAQs (autocompletado de Google vía el MCP de Ubersuggest, no gasta reports). Mismo aislamiento que
# keywords-research: --setting-sources "", --strict-mcp-config, --permission-mode default y el mismo --disallowedTools.
faq-research:
    claude -p --agents "$(bun scripts/keywords/agent-json.ts faq-researcher)" --agent faq-researcher --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{"ubersuggest":{"type":"http","url":"https://ubersuggest-mcp.neilpatelapi.com/mcp"}}}' --strict-mcp-config --permission-mode default --disallowedTools "Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(rm:*)" --allowedTools "mcp__ubersuggest__google_suggestions,Read,Glob,Write(.agents/context/keywords/faqs/**),Edit(.agents/context/keywords/faqs/**),Bash(date:*),Bash(just faq-seeds:*),Bash(just faqs-ingest:*),Bash(just faqs-commit:*)" --max-budget-usd 2 --output-format json "Run today's FAQ research."

# FAQs de keywords.json filtradas, sin abrir el archivo. `--keyword <id>`, `--status idea`, `--source google-autocomplete`, `--since YYYY-MM-DD`
faqs *args:
    @bun scripts/keywords/faqs-query.ts {{ args }}

# ─── Agente de contenido (content-strategist) ─────────────────────────────────
# Ver CLAUDE.md, "El agente de contenido (content-strategist)". Corre después del investigador de keywords.

# Traffic tier de Avalanche (POP): impresiones diarias del último export de GSC, (máximo + mínimo) / 2, y su nivel. JSON
keywords-tier:
    @bun scripts/keywords/traffic-tier.ts

# Candidatas de contenido del día (keywords idea sin plan, con tier y ajuste Avalanche, dentro del tier primero). Entrada del agente: nunca abre .agents/data/keywords.json
content-candidates n='20':
    @bun scripts/keywords/opportunities.ts --limit {{ n }}

# Inventario del blog inglés (posts, H2/H3, FAQs). Sin argumento, todo. Con `--cluster <cluster>` o solo `<cluster>`, un clúster
content-inventory *args:
    @bun scripts/keywords/content-inventory.ts {{ args }}

# Valida el plan, regenera .agents/data/keywords.json (source content-plan y cierre de ideas ya cubiertas) y ordena .agents/data/TODO.json (tareas del plan incluidas)
content-plan-apply plan:
    bun scripts/keywords/plan-to-todo.ts --check "{{ plan }}"
    bun scripts/keywords/sync.ts
    bun scripts/todo/organize.ts

# Ordena .agents/data/TODO.json: valida el archivo, suma las tareas del content-strategist, cierra las cubiertas en
# .agents/data/keywords.json, bloquea las de contenido mientras falten traducciones y ordena por prioridad (hechas al final).
# `--dry-run` no escribe, `--needs-priority` imprime el JSON de las tareas sin prioridad asignada, `--file <ruta>` apunta a otro archivo.
# Ver CLAUDE.md, "`TODO.json`: formato de tareas".
todo-organize *args:
    bun scripts/todo/organize.ts {{ args }}

# Lista las tareas: `just todo-list --prioridad alta --tipo contenido`. Filtros: --estado, --prioridad, --tipo, --origen, --texto.
[positional-arguments]
todo-list *args:
    @bun scripts/todo/todo.ts list "$@"

# Agrega una tarea: `just todo-add --titulo "..." --prioridad alta --tipo negocio --desc-file ruta.txt`. Opciones: --desc, --desc-file.
[positional-arguments]
todo-add *args:
    @bun scripts/todo/todo.ts add "$@"

# Cambia una tarea: `just todo-set #T0007 --estado hecha`. Opciones: --estado, --prioridad, --tipo, --add-nota.
[positional-arguments]
todo-set *args:
    @bun scripts/todo/todo.ts set "$@"

# ─── Agentes de implementación (todo-implementer) ─────────────────────────────
# Ver CLAUDE.md, "Agentes de implementación (todo-implementer)". Solo bajo demanda, nunca programado.

# La próxima tarea implementable de TODO.json (pendiente, contenido, sección H2/H3 o pregunta FAQ de un plan). JSON.
# `--task #T0036` elige una, `--max N` lista N. Los `Post nuevo` y las tareas escritas a mano salen en `skipped`. No escribe nada.
[positional-arguments]
todo-next *args:
    @bun scripts/todo/next-task.ts "$@"

# Implementa por prioridad las tareas abiertas de TODO.json, de punta a punta: edita el post ingles, lo commitea, traduce a los 12 idiomas,
# lo verifica con un agente independiente y commitea LOCAL. Nunca hace push. TODO.json se commitea solo con `just todo-commit`
# (decision del usuario, 2026-10-02). Solo bajo demanda.
#   just todo-implement                      la proxima tarea (una)
#   just todo-implement --task '#T0036'      una tarea concreta
#   just todo-implement --max 2              hasta 2 tareas, una tras otra
#   just todo-implement --dry-run [...]      NO llama a Claude: corre `just todo-next` e imprime el comando
# Tope de gasto: 30 USD por tarea (`--max N` lo multiplica), o el valor de TODO_IMPLEMENT_BUDGET.
# Mismo aislamiento que content-plan: --setting-sources "" (ningun settings), --strict-mcp-config con config MCP VACIA,
# --permission-mode default y --disallowedTools. Los 5 agentes (orquestador, escritor, traductor, verificador e investigador de SERP) entran
# juntos por --agents desde sus .md (scripts/keywords/agent-json.ts), y el orquestador delega con la herramienta Agent. Los permisos son de
# TODA la sesion: Write y Edit solo en el blog, sus datos generados, el content map y el changelog (mas Write en nlp-terms/ para el
# investigador), y Bash solo para los comandos listados. WebSearch y WebFetch estan permitidos en la sesion, pero el campo `tools` de cada
# agente limita quien puede usarlos: solo serp-term-researcher los lista (lo exige scripts/keywords/agent-json.test.ts).
# Deja sus lineas en .agents/logs/YYYY-MM.log (scripts/log, modo demanda: run-start, task-done|blocked|skipped, run-end con costo y commits).
# El log lo escribe codigo, nunca el LLM. `--dry-run` no escribe nada.
[positional-arguments]
todo-implement *args:
    #!/usr/bin/env bash
    set -euo pipefail
    dry=0; max=1; prev=""; rest=()
    for a in "$@"; do
        if [[ "$a" == "--dry-run" ]]; then dry=1; continue; fi
        if [[ "$prev" == "--max" ]]; then max="$a"; fi
        rest+=("$a"); prev="$a"
    done
    [[ "$max" =~ ^[0-9]+$ && "$max" -ge 1 ]] || { echo "--max necesita un entero de 1 o mas" >&2; exit 2; }
    DENIED="Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(git rebase:*),Bash(git clean:*),Bash(git commit --amend:*),Bash(rm:*)"
    ALLOWED_TOOLS="Read,Glob,Grep,Agent,WebSearch,WebFetch,Write(.agents/context/keywords/nlp-terms/**),Edit(.agents/context/keywords/nlp-terms/**),Write(src/content/blog/**),Edit(src/content/blog/**),Write(src/lib/data/post-faqs.json),Edit(src/lib/data/post-faqs.json),Write(src/lib/data/post-toc.json),Edit(src/lib/data/post-toc.json),Write(src/lib/i18n/content-map/**),Edit(src/lib/i18n/content-map/**),Write(.agents/CHANGELOG.md),Edit(.agents/CHANGELOG.md),Bash(date:*),Bash(rg:*),Bash(git status:*),Bash(git diff:*),Bash(git log:*),Bash(git show:*),Bash(git add:*),Bash(git commit:*),Bash(just todo-next:*),Bash(just todo-list:*),Bash(just todo-set:*),Bash(just todo-organize:*),Bash(just content-inventory:*),Bash(just post-sync:*),Bash(just post-heading-id:*),Bash(just post-translate-brief:*),Bash(just post-translate-check:*),Bash(just post-translate-map:*),Bash(just post-translate-finish:*),Bash(just post-translations-status:*),Bash(just keywords-sync),Bash(just nlp-terms-check:*),Bash(just todo-commit:*),Bash(just todo-implement-commit:*),Bash(bunx vitest run:*)"
    BUDGET="${TODO_IMPLEMENT_BUDGET:-$((30 * max))}"
    AGENTS_CMD="bun scripts/keywords/agent-json.ts todo-implementer post-writer post-translator post-verifier serp-term-researcher"
    PROMPT="Implement the open content tasks of TODO.json by priority, following your procedure. Arguments: ${rest[*]:-none}"
    cmd=(claude -p --agents "$($AGENTS_CMD)" --agent todo-implementer --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{}}' --strict-mcp-config --permission-mode default --disallowedTools "$DENIED" --allowedTools "$ALLOWED_TOOLS" --max-budget-usd "$BUDGET" --output-format json "$PROMPT")
    if [[ "$dry" == 1 ]]; then
        echo "== just todo-next ${rest[*]:-}"
        just todo-next ${rest[@]+"${rest[@]}"}
        echo "== command that would run (dry run, Claude is NOT called)"
        prev=""
        for el in "${cmd[@]}"; do
            if [[ "$prev" == "--agents" ]]; then printf '%s ' "\"\$($AGENTS_CMD)\""; else printf '%q ' "$el"; fi
            prev="$el"
        done
        echo
        exit 0
    fi
    # Registro de actividad (scripts/log, modo demanda): lo escribe codigo, nunca el LLM. Nunca cambia la salida ni el exit code.
    export AGENT_LOG_MODE=demanda
    # Bash mueve al segundo plano todo comando que pase de 600 s, y `claude -p` mata las tareas en segundo plano en cuanto el turno
    # termina. `post-translate-finish` (checks, tests, build, commit) llega a pasar de 10 minutos, asi que se sube el tope a 30
    # minutos. Medido con haiku el 2026-10-02: un comando de 700 s completa en primer plano con estas variables, y sin ellas se va
    # al fondo a los 600 s (tarea #T0052: el gate quedo sin commitear y la tarea en curso).
    export BASH_DEFAULT_TIMEOUT_MS=1800000 BASH_MAX_TIMEOUT_MS=1800000
    start_head="$(git rev-parse HEAD)"
    next_json="$(mktemp)"; claude_json="$(mktemp)"
    trap 'rm -f "$next_json" "$claude_json"' EXIT
    just todo-next ${rest[@]+"${rest[@]}"} > "$next_json" 2>/dev/null || true
    bun scripts/log/todo-implement-log.ts start --next "$next_json" --budget "$BUDGET" -- ${rest[@]+"${rest[@]}"} || true
    started=$SECONDS
    code=0
    "${cmd[@]}" > "$claude_json" || code=$?
    cat "$claude_json"
    bun scripts/log/todo-implement-log.ts end --next "$next_json" --out "$claude_json" --exit "$code" --start-head "$start_head" --seconds "$((SECONDS - started))" -- ${rest[@]+"${rest[@]}"} || true
    exit "$code"

# Valida el archivo de terminos NLP del investigador de SERP (.agents/context/keywords/nlp-terms/YYYY-MM-DD-T####.json) e imprime el
# resumen compacto que el orquestador le pasa a post-writer. Sale con error y la lista de problemas si el archivo es invalido.
nlp-terms-check file:
    @bun scripts/keywords/nlp-terms-check.ts {{ file }}

# Commitea SOLO .agents/data/TODO.json (decisión del usuario, 2026-10-02: los agentes y las recetas sí lo commitean). Solo si cambió y
# SOLO si valida contra su schema (`todo.ts list` lo carga con Zod): un archivo a medio editar a mano no se commitea y sale con error.
# Mismo --no-verify y misma razón que keywords-commit. Lo encadenan content-plan-commit, todo-implement-commit y el paso organize del guard.
# Un cambio a mano que ya estuviera en el archivo se commitea junto con el resto. Uso: just todo-commit "chore(todo): <qué>"
[positional-arguments]
todo-commit message='chore(todo): sync TODO.json':
    #!/usr/bin/env bash
    set -euo pipefail
    msg="$1"
    [[ "$msg" =~ ^chore\(todo\):\ [^\"\`\$\\]+$ ]] || { echo "mensaje inválido (debe empezar por 'chore(todo): ' y no llevar comillas, backticks, \$ ni \\): $msg" >&2; exit 1; }
    git diff --quiet -- .agents/data/TODO.json && { echo "TODO.json sin cambios, nada que commitear"; exit 0; }
    bun scripts/todo/todo.ts list > /dev/null || { echo "TODO.json no valida contra su schema: NO se commitea. Corregilo y volvé a correr just todo-commit" >&2; exit 1; }
    git add -- .agents/data/TODO.json
    git commit --no-verify -m "$msg" -- .agents/data/TODO.json
    git log -1 --format='%h %s'
    bun scripts/log/agent-log.ts --mode "${AGENT_LOG_MODE:-auto}" --actor todo-commit --event commit --last-commit --detail "file=.agents/data/TODO.json" || true

# Commitea .agents/data/keywords.json tras implementar una tarea, después de correr los tests de keywords, y después TODO.json con
# `just todo-commit` (aunque keywords.json no haya cambiado). Mismo --no-verify y misma razón que content-plan-commit.
# Uso: just todo-implement-commit '#T0036' <slug>
todo-implement-commit task slug:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ task }}" =~ ^#T[0-9]{4}$ ]] || { echo "tarea inválida: {{ task }}" >&2; exit 1; }
    [[ "{{ slug }}" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || { echo "slug inválido: {{ slug }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    if git diff --quiet -- .agents/data/keywords.json; then
        echo "keywords.json sin cambios, nada que commitear"
    else
        git add -- .agents/data/keywords.json
        git commit --no-verify -m "chore(keywords): sync after {{ task }} {{ slug }}" -- .agents/data/keywords.json
        git log -1 --format='%h %s'
        bun scripts/log/agent-log.ts --mode "${AGENT_LOG_MODE:-demanda}" --actor todo-implementer --event commit --last-commit --detail "task={{ task }} slug={{ slug }}" || true
    fi
    just todo-commit "chore(todo): close {{ task }} {{ slug }}"

# Commitea .agents/data/keywords.json y el plan del día, después de correr los tests de keywords, y después TODO.json con `just todo-commit`
# (las tareas que el plan acaba de generar). Mismo --no-verify y misma razón que keywords-commit.
content-plan-commit plan:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ plan }}" =~ ^\.agents/context/keywords/content-plan/[0-9]{4}-[0-9]{2}-[0-9]{2}\.json$ ]] || { echo "plan inválido: {{ plan }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    git add -- .agents/data/keywords.json "{{ plan }}"
    git commit --no-verify -m "chore(keywords): daily content plan $(basename "{{ plan }}" .json)" -- .agents/data/keywords.json "{{ plan }}"
    git log -1 --format='%h %s'
    bun scripts/log/agent-log.ts --mode "${AGENT_LOG_MODE:-auto}" --actor content-strategist --event commit --last-commit --detail "file={{ plan }}" || true
    just todo-commit "chore(todo): add tasks from the content plan $(basename "{{ plan }}" .json)"

# Corre el agente diario de contenido, con el mismo aislamiento que keywords-research: --setting-sources "" (ningún settings),
# --strict-mcp-config con una config MCP VACÍA (no necesita ningún MCP), --permission-mode default y el mismo --disallowedTools.
# El agente entra por --agents, generado desde su .md (scripts/keywords/agent-json.ts content-strategist).
content-plan:
    claude -p --agents "$(bun scripts/keywords/agent-json.ts content-strategist)" --agent content-strategist --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{}}' --strict-mcp-config --permission-mode default --disallowedTools "Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(rm:*)" --allowedTools "Read,Glob,Grep,Write(.agents/context/keywords/content-plan/**),Edit(.agents/context/keywords/content-plan/**),Bash(date:*),Bash(just content-candidates:*),Bash(just keywords-tier),Bash(just content-inventory:*),Bash(just content-plan-apply:*),Bash(just content-plan-commit:*),Bash(just todo-organize:*)" --max-budget-usd 10 --output-format json "Run today's content planning."

# Corrida diaria con control (scripts/keywords/daily-guard.ts). launchd la dispara a las 09:30, al iniciar sesión y cada hora,
# y el guard decide: corre solo lo que falta del día (investigación, FAQs y plan, cada uno "hecho" si su archivo de hoy está commiteado; las etapas son independientes y `todo-organize` corre siempre),
# nada antes de las 09:30, sin red, con otro run en curso (lock) o tras 3 intentos. Días perdidos = una sola corrida hoy.
# `just keywords-daily --dry-run` muestra la decisión sin correr nada. `--force` ignora hora y "hecho", para corridas manuales.
keywords-daily *args:
    bun scripts/keywords/daily-guard.ts {{ args }}

# Instala el scheduler diario (plantilla de launchd) para correr keywords-daily (09:30, al iniciar sesión y cada hora, con guard) y lo arranca ahora
keywords-schedule-install:
    @mkdir -p ~/Library/LaunchAgents; \
    dest=~/Library/LaunchAgents/com.malagaeventgear.keyword-research.plist; \
    cp scripts/keywords/launchd/com.malagaeventgear.keyword-research.plist "$dest"; \
    sd '__REPO_PATH__' "$(pwd)" "$dest"; \
    sd '__CLAUDE_DIR__' "$(dirname "$(which claude)")" "$dest"; \
    sd '__HOME__' "$HOME" "$dest"; \
    launchctl bootstrap gui/$(id -u) "$dest"; \
    echo "Instalado y arrancado: $dest"

