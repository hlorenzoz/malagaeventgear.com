# Málaga Event Gear (MEG) - comandos del proyecto

# Levanta el servidor de desarrollo de Vite con Bun
dev:
    bun run dev

# Compila el sitio para producción optimizado para Cloudflare Pages
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

# Formatea todo el código fuente utilizando Prettier de forma consistente con bunx
format:
    bunx prettier --write .

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
    claude -p --agents "$(bun scripts/keywords/agent-json.ts)" --agent keyword-researcher --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{"ubersuggest":{"type":"http","url":"https://ubersuggest-mcp.neilpatelapi.com/mcp"}}}' --strict-mcp-config --permission-mode default --disallowedTools "Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(rm:*)" --allowedTools "mcp__ubersuggest__user_limits,mcp__ubersuggest__list_projects,mcp__ubersuggest__keyword_suggestions,mcp__ubersuggest__match_keywords,mcp__ubersuggest__google_suggestions,mcp__ubersuggest__keyword_overview,mcp__ubersuggest__serp_analysis,mcp__ubersuggest__content_ideas,mcp__ubersuggest__article_title_suggestions,mcp__ubersuggest__domain_keywords,mcp__ubersuggest__project_position_info,mcp__ubersuggest__seo_opportunities,mcp__ubersuggest__brand_config,mcp__ubersuggest__brand_prompts,mcp__ubersuggest__industry_prompts,mcp__ubersuggest__keyword_metrics,mcp__ubersuggest__location_suggest,Read,Glob,Write(.agents/context/keywords/ubersuggest/**),Edit(.agents/context/keywords/ubersuggest/**),Bash(date:*),Bash(just keywords-sync),Bash(just keywords-seeds:*),Bash(just keywords-ingest:*),Bash(just keywords-commit:*)" --max-budget-usd 4 --output-format json "Run today's keyword research."

# Commitea SOLO .agents/data/keywords.json y el lote del día, después de correr los tests de keywords. Es la única
# puerta de commit del agente. Va con --no-verify a propósito: el hook de pre-commit guarda en stash
# los cambios sin stagear, y pisaría el trabajo de otra sesión que edite el repo al mismo tiempo. La
# validación la hacen los tests de scripts/keywords (schema, guards) antes del commit.
keywords-commit batch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ batch }}" =~ ^\.agents/context/keywords/ubersuggest/[0-9]{4}-[0-9]{2}-[0-9]{2}\.json$ ]] || { echo "lote inválido: {{ batch }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    git add -- .agents/data/keywords.json "{{ batch }}"
    git commit --no-verify -m "chore(keywords): daily Ubersuggest research $(basename "{{ batch }}" .json)" -- .agents/data/keywords.json "{{ batch }}"
    git log -1 --format='%h %s'

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

# Valida el plan, regenera .agents/data/keywords.json (source content-plan y cierre de ideas ya cubiertas) y ordena .agents/data/TODO.txt (tareas del plan incluidas)
content-plan-apply plan:
    bun scripts/keywords/plan-to-todo.ts --check "{{ plan }}"
    bun scripts/keywords/sync.ts
    bun scripts/todo/organize.ts

# Ordena .agents/data/TODO.txt: normaliza tareas nuevas (bloques, entradas a la antigua o texto suelto), suma las tareas del content-strategist,
# cierra las cubiertas en .agents/data/keywords.json y pone las hechas al final. `--dry-run` no escribe, `--needs-priority` imprime el JSON de
# las tareas sin prioridad asignada, `--file <ruta>` apunta a otro archivo. Ver CLAUDE.md, "`TODO.txt`: formato de tareas".
todo-organize *args:
    bun scripts/todo/organize.ts {{ args }}

# Migración única del .agents/data/TODO.txt viejo al formato de bloques. Exige `--out <ruta>` o `--write`.
todo-migrate *args:
    bun scripts/todo/migrate.ts {{ args }}

# Commitea SOLO .agents/data/keywords.json y el plan del día, después de correr los tests de keywords. NUNCA .agents/data/TODO.txt: lleva cambios sin
# commitear de otra sesión. Mismo --no-verify y misma razón que keywords-commit.
content-plan-commit plan:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ plan }}" =~ ^\.agents/context/keywords/content-plan/[0-9]{4}-[0-9]{2}-[0-9]{2}\.json$ ]] || { echo "plan inválido: {{ plan }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    git add -- .agents/data/keywords.json "{{ plan }}"
    git commit --no-verify -m "chore(keywords): daily content plan $(basename "{{ plan }}" .json)" -- .agents/data/keywords.json "{{ plan }}"
    git log -1 --format='%h %s'

# Corre el agente diario de contenido, con el mismo aislamiento que keywords-research: --setting-sources "" (ningún settings),
# --strict-mcp-config con una config MCP VACÍA (no necesita ningún MCP), --permission-mode default y el mismo --disallowedTools.
# El agente entra por --agents, generado desde su .md (scripts/keywords/agent-json.ts content-strategist).
content-plan:
    claude -p --agents "$(bun scripts/keywords/agent-json.ts content-strategist)" --agent content-strategist --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{}}' --strict-mcp-config --permission-mode default --disallowedTools "Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(rm:*)" --allowedTools "Read,Glob,Grep,Write(.agents/context/keywords/content-plan/**),Edit(.agents/context/keywords/content-plan/**),Bash(date:*),Bash(just content-candidates:*),Bash(just keywords-tier),Bash(just content-inventory:*),Bash(just content-plan-apply:*),Bash(just content-plan-commit:*),Bash(just todo-organize:*)" --max-budget-usd 4 --output-format json "Run today's content planning."

# Corrida diaria con control (scripts/keywords/daily-guard.ts). launchd la dispara a las 09:00, al iniciar sesión y cada hora,
# y el guard decide: corre solo lo que falta del día (investigación y plan, cada uno "hecho" si su archivo de hoy está commiteado),
# nada antes de las 09:00, sin red, con otro run en curso (lock) o tras 3 intentos. Días perdidos = una sola corrida hoy.
# `just keywords-daily --dry-run` muestra la decisión sin correr nada. `--force` ignora hora y "hecho", para corridas manuales.
keywords-daily *args:
    bun scripts/keywords/daily-guard.ts {{ args }}

# Instala el scheduler diario (plantilla de launchd) para correr keywords-daily (09:00, al iniciar sesión y cada hora, con guard) y lo arranca ahora
keywords-schedule-install:
    @mkdir -p ~/Library/LaunchAgents; \
    dest=~/Library/LaunchAgents/com.malagaeventgear.keyword-research.plist; \
    cp scripts/keywords/launchd/com.malagaeventgear.keyword-research.plist "$dest"; \
    sd '__REPO_PATH__' "$(pwd)" "$dest"; \
    sd '__CLAUDE_DIR__' "$(dirname "$(which claude)")" "$dest"; \
    sd '__HOME__' "$HOME" "$dest"; \
    launchctl bootstrap gui/$(id -u) "$dest"; \
    echo "Instalado y arrancado: $dest"

