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

# Regenera keywords.json desde las fuentes estáticas del repo (POP, GSC, Google Ads, GBP, blog, FAQs)
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
# lo aprobaría con un clasificador) y --disallowedTools gana siempre.
keywords-research:
    claude -p --agent keyword-researcher --model sonnet --setting-sources "" --mcp-config '{"mcpServers":{"ubersuggest":{"type":"http","url":"https://ubersuggest-mcp.neilpatelapi.com/mcp"}}}' --strict-mcp-config --permission-mode default --disallowedTools "Bash(git push:*),Bash(git reset:*),Bash(git checkout:*),Bash(git stash:*),Bash(git restore:*),Bash(rm:*)" --allowedTools "mcp__ubersuggest__user_limits,mcp__ubersuggest__list_projects,mcp__ubersuggest__keyword_suggestions,mcp__ubersuggest__match_keywords,mcp__ubersuggest__google_suggestions,mcp__ubersuggest__keyword_overview,mcp__ubersuggest__serp_analysis,mcp__ubersuggest__content_ideas,mcp__ubersuggest__article_title_suggestions,mcp__ubersuggest__domain_keywords,mcp__ubersuggest__project_position_info,mcp__ubersuggest__seo_opportunities,mcp__ubersuggest__brand_config,mcp__ubersuggest__brand_prompts,mcp__ubersuggest__industry_prompts,mcp__ubersuggest__keyword_metrics,mcp__ubersuggest__location_suggest,Read,Glob,Write(.agents/context/keywords/ubersuggest/**),Edit(.agents/context/keywords/ubersuggest/**),Bash(date:*),Bash(just keywords-sync),Bash(just keywords-seeds:*),Bash(just keywords-ingest:*),Bash(just keywords-commit:*)" --max-budget-usd 4 --output-format json "Run today's keyword research."

# Commitea SOLO keywords.json y el lote del día, después de correr los tests de keywords. Es la única
# puerta de commit del agente. Va con --no-verify a propósito: el hook de pre-commit guarda en stash
# los cambios sin stagear, y pisaría el trabajo de otra sesión que edite el repo al mismo tiempo. La
# validación la hacen los tests de scripts/keywords (schema, guards) antes del commit.
keywords-commit batch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "{{ batch }}" =~ ^\.agents/context/keywords/ubersuggest/[0-9]{4}-[0-9]{2}-[0-9]{2}\.json$ ]] || { echo "lote inválido: {{ batch }}" >&2; exit 1; }
    bunx vitest run scripts/keywords
    git add -- keywords.json "{{ batch }}"
    git commit --no-verify -m "chore(keywords): daily Ubersuggest research $(basename "{{ batch }}" .json)" -- keywords.json "{{ batch }}"
    git log -1 --format='%h %s'

# Instala el scheduler diario (plantilla de launchd) para correr keywords-research a las 09:00 y lo arranca ahora
keywords-schedule-install:
    @mkdir -p ~/Library/LaunchAgents; \
    dest=~/Library/LaunchAgents/com.malagaeventgear.keyword-research.plist; \
    cp scripts/keywords/launchd/com.malagaeventgear.keyword-research.plist "$dest"; \
    sd '__REPO_PATH__' "$(pwd)" "$dest"; \
    sd '__CLAUDE_DIR__' "$(dirname "$(which claude)")" "$dest"; \
    sd '__HOME__' "$HOME" "$dest"; \
    launchctl bootstrap gui/$(id -u) "$dest"; \
    echo "Instalado y arrancado: $dest"

