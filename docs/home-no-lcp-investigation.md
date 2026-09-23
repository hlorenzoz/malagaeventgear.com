# Home `NO_LCP`: Investigación y resolución

> Página afectada: `/` (home). Síntoma: PageSpeed Insights **mobile** marcaba
> **`Largest Contentful Paint: Error! NO_LCP`** (y `Total Blocking Time: NO_LCP` en
> cascada), colapsando el score de Performance a error. FCP/Speed Index/CLS estaban sanos.
> Estado: **RESUELTO** (commit `882eaf5`). La home pasó de *siempre NO_LCP* a **~93**.

## TL;DR para agentes (leé esto primero)

- **Causa raíz:** la home no tenía **ninguna imagen `<img>` real above-the-fold**. Su backdrop
  era full-viewport (primero un `<img>` 161% del viewport, luego CSS `background-image`, luego un
  gradiente). El Chrome de PageSpeed **excluye los elementos full-viewport de la candidatura de
  LCP** pero igual retienen el slot de "largest paint", **suprimiendo la emisión de todo candidato
  más chico** → cero candidatos → `NO_LCP`.
- **El fix:** poner la foto del hero como un **`<img>` real, acotado (no full-viewport), `eager` +
  `fetchpriority="high"`, above-the-fold**. Es el patrón EXACTO por el que `/packages/` puntúa 93
  (su LCP es el `<img>` de la primera package card, en un contenedor `h-44`). Una imagen real,
  eager y acotada es el elemento que **toda** versión de Chrome registra de forma robusta.
- **No pierdas tiempo con:** Bot Fight Mode (ver abajo), `font-display`, animaciones de opacity,
  el CSS crítico. Todos fueron descartados con evidencia.
- **Causa residual (intermitente):** un carrusel que se vuelve scrolleable antes del LCP corta el
  registro de LCP. Se arregló con `afterLcp` (ver "Causa residual" más abajo).
- **Cómo diagnosticar LCP acá (método que funcionó):** Lighthouse completo (no el trace `autoStop`
  de chrome-devtools, que es ruidoso/intermitente) y mirá `audits.metrics.details.items[0].lcpLoadDuration`:
  **`>0` = el LCP es una imagen, `None`/`0` = el LCP es texto.**

## Por qué local nunca lo reproduce (clave)

El **Lighthouse local (Chrome actual)** SIEMPRE da un LCP válido sobre el MISMO contenido que PSI
llama `NO_LCP`. Se confirmó midiendo la URL `*.workers.dev` (Worker sin proxy naranja → sin nada
del edge de Cloudflare): PSI = `NO_LCP`, Lighthouse local = LCP válido. Conclusión: es una
diferencia entre el **Chrome fijado/más estricto de PSI** y el Chrome actual en cómo decide la
candidatura de LCP. Implicancia práctica: **no se puede iterar el fix con Lighthouse local**
(siempre pasa). Hay que validar con PSI sobre producción, y razonar estructuralmente.

## Hipótesis DESCARTADAS (con evidencia: no las repitas)

1. **Cloudflare Bot Fight Mode / `challenge-platform/jsd/main.js`**: la causa documentada del hit de
   score en `/blog/` y `/packages/` (ver `docs/forced-reflow-investigation.md` y `TODO.txt`). **NO es
   la causa del home NO_LCP:** con BFM **OFF** el `NO_LCP` persistía, y la URL `*.workers.dev` (sin
   edge) también daba `NO_LCP`.
2. **Imagen full-viewport (CSS background o `<img>`)**: al quitarla (gradiente) el `NO_LCP` seguía,
   pero eso fue porque el LCP pasó a ser texto con otro problema. La lección real: el backdrop
   full-viewport **suprime** candidatos. La solución no es quitarlo sino **dar un `<img>` elegible**.
3. **`font-display: optional` en el `<h1>`** (cuando el LCP era texto): se cambió a `swap` y el
   `NO_LCP` siguió. No era el gatillo.
4. **Scroll-snap de carruseles** (auto-scroll en el load que "para" el registro de LCP): se probó
   `snap-proximity` (38c91da) y diferir el overflow hasta `onMount` (3b67a8c). Ninguno lo arregló del todo (ver "Causa residual").
5. **Animaciones `.reveal` (opacity 0→1)**: los `.reveal` del home se renderizan en SSR con
   `active is-revealed` (opacity:1), no animan. El hero no tiene `.reveal`.
6. **CSS crítico inline**: 94KB raw pero **solo 14.5KB gzip**, Tailwind v4 legítimo, sin grasa.
   Externalizar (bajar `inlineStyleThreshold`) es neutro para el score en carga fría de PSI.

## El fix (commit `882eaf5`, mejorado en `cd22d3e`)

`src/routes/(public)/+page.svelte`: hero ahora es **texto + foto acotada**:
```svelte
<picture>
  <source media="(min-width: 768px)" srcset="/hero-stage.webp" width="1024" height="768" />
  <img src="/hero-stage-mobile.webp" alt="…" width="800" height="600"
       loading="eager" fetchpriority="high" decoding="async"
       class="w-full aspect-4/3 object-cover rounded-2xl …" />
</picture>
```
- `<img>` real, **acotado** (`aspect-4/3 object-cover`, NO full-viewport, las fuentes cuadradas
  con object-cover desbordaban al 161% → exclusión). `eager` + `fetchpriority="high"` + `<link
  rel="preload">` para ambas variantes. `order-1` en mobile para que quede above-the-fold = LCP ahí.
- Se removieron las 3 bento cards del hero (el "At a Glance" de abajo cubre esos value props).
- Variantes 4:3 recortadas y bien dimensionadas: `static/hero-stage.webp` (1024×768, ~61KB vs 82KB
  cuadrada) y `static/hero-stage-mobile.webp` (700×525). El `og:image`/`twitter:image` siguen usando
  la cuadrada `premium_event_stage.webp`.
- `src/routes/(public)/+page.ts` (nuevo): `export const prerender = true`: la home es estática de
  build y servirla prerenderizada baja el TTFB. Es seguro (el layout solo carga categorías estáticas).

## Causa residual: la intermitencia SÍ era un bug (2026-09-23)

Después del fix del hero, PSI seguía dando resultados **intermitentes** sobre la misma home (NO_LCP
vs 94 entre corridas). Se había atribuido a varianza del laboratorio de PSI. **No lo era.**

**Evidencia (40 corridas de Lighthouse mobile contra producción, con `--save-assets`):** en 3 de 40
el trace no tiene **ningún** evento `largestContentfulPaint::Candidate`. Lighthouse local lo tapa con
una estimación de Lantern (por eso "local nunca lo reproduce"), pero
`largest-contentful-paint-element` queda sin elemento: es la misma señal que PSI reporta como
`NO_LCP`. En las 3 corridas hay un `PaintTiming::NotifyScroll` programático sobre el MISMO nodo, el
track del carrusel de paquetes (`data-testid="packages-carousel-track"`), **antes del FCP** (entre
536 y 1900 ms antes). En las 37 corridas sanas ese scroll cae junto al FCP o después, y se registran
los 2 candidatos esperados (h1 y luego la foto del hero).

**Mecanismo:** el carrusel pasa de `overflow-x-hidden` a `overflow-x-auto` en un `$effect` al montar
(3b67a8c). Ese cambio hace que el navegador ajuste el scroll del contenedor snap, y un scroll antes
del primer candidato corta el registro de LCP. El fix de 3b67a8c asumía que "montado" implica
"después del FCP", pero el montaje sigue el reloj del JS (descarga, parseo, hidratación) y el FCP el
del paint. Con latencia de red real, a veces el JS gana. Por eso bajó la frecuencia pero no la
eliminó.

**Fix:** `src/lib/utils/after-lcp.ts` (`afterLcp`). Los carruseles se vuelven scrolleables recién
cuando el documento cargó Y un `PerformanceObserver('largest-contentful-paint')` ya vio una entrada
(más un frame). Atajos: primer input del usuario (el registro de LCP ya se corta solo con el input),
navegador sin soporte de LCP (alcanza con `load`) y un timeout de seguridad de 10 s. Aplicado al
carrusel de paquetes (`+page.svelte`) y a `LatestPostsRow.svelte`, que tenía el mismo patrón.
Las flechas funcionan mientras tanto: `scrollBy` también desplaza un contenedor `overflow:hidden`.
`Testimonials.svelte` es scrolleable desde el SSR, pero vive dentro de un `LazyMount` que no lo
monta durante la carga, así que no participa.

**Confianza y límites de la evidencia (medido el mismo día, con el fix en local):**
- 40 corridas de Lighthouse contra `bun run preview`: 0 de 40 sin candidato de LCP, y el LCP final
  fue la foto del hero en las 40. Pero localhost NO reproduce la carrera (no hay variación de red
  real), así que eso confirma el orden garantizado por el código, no una tasa antes y después.
- `PaintTiming::NotifyScroll` no trae referencia al elemento. La atribución al carrusel salió de la
  coincidencia temporal con el snapshot de su capa de scroll, no de una referencia directa.
- Con el fix, 5 de 20 corridas muestran igual un scroll programático antes del primer candidato,
  anterior a `loadEventEnd` (no puede ser el carrusel), y aun así se registró el LCP. Un scroll antes
  del candidato no alcanza por sí solo para suprimirlo.
- Conclusión: causa **probable**, no probada. Validar con PSI en producción, varias corridas. Si el
  `NO_LCP` reaparece, el siguiente sospechoso es ese scroll temprano no atribuido.
- `largest-contentful-paint-element` sale `null` en cualquier corrida con `--only-categories=performance`,
  sana o no: no sirve como señal de falla.

**Regla para el futuro:** ningún contenedor scrolleable above the fold ni montado en la carga puede
volverse scrolleable (ni hacer `scrollTo`/`scrollIntoView`) antes del LCP. Usá `afterLcp`, nunca
`onMount`/`$effect` solos.

## Gotchas operativos (para no romper el entorno)

- **Nunca** uses un loop infinito de `queueMicrotask` en un `initScript` de chrome-devtools-mcp:
  congela el renderer y rompe la red del browser para toda la sesión.
- Demasiados requests automatizados al apex *proxied* (`malagaeventgear.com`) → Cloudflare puede
  **rate-limitear tu IP** temporalmente (curl da timeout, google/github responden OK). La URL
  `*.workers.dev` NO pasa por ese proxy y queda exenta, útil para medir sin tocar el apex.

## Verificación

- Local (estructural): `bun run build` → la home prerenderizada (`.svelte-kit/output/prerendered/pages/index.html`)
  debe contener el `<img>` acotado eager con `fetchpriority="high"`. (Lighthouse local SIEMPRE pasa,
  así que no sirve para confirmar el fix de PSI.)
- Producción: PageSpeed mobile en `https://malagaeventgear.com/` → Performance computa (sin `NO_LCP`),
  ~93. Comparar con `/packages/` (mismo patrón de `<img>` LCP).
