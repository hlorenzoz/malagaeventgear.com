# Mapa de keywords por silo

Documento **vivo**. Cada cluster de demanda real se mapea a UN silo y a UNA página objetivo, o
se marca explícitamente como no perseguible con el motivo. La segunda mitad es la que más vale:
evita que una sesión futura vuelva a "descubrir" un cluster de 1.500 impresiones y escriba
contenido deshonesto para perseguirlo.

- **Última actualización**: 2026-09-24
- **Fuente de esta pasada**: `google-search-console-gsc/malagaeventgear.com-Performance-on-Search-2026-09-23/` (últimos 3 meses, 486 consultas, 218 páginas)
- **Fuentes ya agotadas** (no volver a auditarlas sin datos nuevos, ver `keyword_reaudit_2026-09-06` en engram): GBP `fixed.md` (244 filas), PageOptimizer Pro CSV (106), Google Ads / Ubersuggest (908 en 14 ficheros)

## Cómo añadir a este mapa

1. Nuevo export de GSC a `google-search-console-gsc/<dominio>-Performance-on-Search-<YYYY-MM-DD>/`.
2. Diff contra el export anterior para aislar consultas **nuevas**, no re-leer las de siempre.
3. Cada cluster nuevo va a una de las dos tablas de abajo. Si va a la segunda, **el motivo es obligatorio**.
4. Antes de mapear un cluster a un silo, confirmar respaldo real en `.agents/context/Equipamiento.csv` o en `src/lib/data/packages.ts`. Sin respaldo, va a la tabla de no perseguibles.

## Salud global de esta pasada

| Métrica | Valor | Lectura |
| :--- | ---: | :--- |
| Impresiones | 5.922 | |
| Clics | 12 | |
| CTR global | 0,20% | **No es un problema de títulos** |
| **Posición media ponderada** | **34,4** | La causa real |

Reparto por banda de posición:

| Banda | Consultas | Impresiones | Clics | CTR |
| :--- | ---: | ---: | ---: | ---: |
| 1-3 | 28 | 41 | 0 | 0% |
| **4-10** | 94 | **631** | 9 | 1,43% |
| 11-20 | 90 | 1.010 | 2 | 0,20% |
| 21-50 | 132 | 2.337 | 1 | 0,04% |
| 51-200 | 126 | 1.692 | 0 | 0% |

**El 68% de las impresiones cae en posición 21 o peor**, donde el clic no existe. Por eso el CTR
global es bajo, y por eso reescribir títulos no mueve la aguja. Solo las 631 impresiones de la
banda 4-10 son accionables hoy.

## Clusters mapeados a un silo

| Cluster | Impr. | Silo / pilar | Página objetivo | Estado |
| :--- | ---: | :--- | :--- | :--- |
| AV genérico (`audio visual rental services`, `av equipment hire`, `audiovisual services for events`) | 1.427 | audio visual rental | `/blog/audio-visual-rental/` | Cubierto |
| Sonido (`sound equipment rental`, `speaker and microphone rental`, `hire speakers for party`) | 606 | audio visual rental | `/blog/sound-system-rental/` | Cubierto |
| Pantallas y proyección (`rent tv screen`, `tv screen hire`, `55 inch screen hire`, `hire tv screens for exhibitions`) | 598 | audio visual rental | `/blog/tv-screen-rental/` | **Actualizar**, ver abajo |
| Iluminación (`stage lighting`, `uplighting`, `rent lighting equipment near me`) | 238 | stage lighting equipment supplier | `/blog/stage-lighting-rental/` | Cubierto |
| Humo y niebla (`hire smoke machine`, `party smoke machine hire`) | incluido arriba | stage lighting equipment supplier | `/blog/smoke-machine-rental/` | Cubierto desde 2026-09-23 |
| Wedding AV (`wedding rental trends`, `how to find wedding rentals`, `audiovisual wedding`) | 220 | wedding rentals | `/blog/wedding-rentals/` | Cubierto |
| MICE y congresos (`mice events malaga`, `event av spain`) | ~160 | event technology service | `/blog/event-technology-service/` | Cubierto |
| Ferias y stands (`hire tv screens for exhibitions`) | ~7 | audio visual rental | `/blog/audio-visual-rental-for-trade-shows/` | Cubierto, reforzado con la noticia de ECOC 2026 |

### Única actualización con evidencia en esta pasada

**`/blog/tv-screen-rental/`**. En la banda clicable 4-10 hay ~124 impresiones de pantallas con
**0 clics**: `rent tv screen` (58, pos 7,97), `tv rentals for events` (18), `tv screen hire` (9,
pos 5,11), `flat screen tv rental` (9), `rent 55 inch screen` (8), `big screen tv hire` (8),
`tv monitor rental` (7, pos 4,43), `hire tv screens for exhibitions` (7).

Dos huecos concretos que el post no responde hoy:

1. **El tamaño**. Tres consultas piden **55 pulgadas** (`rent 55 inch screen`, `55 inch screen hire`, `55 inch tv rental`). MEG stockea **un panel de 60 pulgadas**. Hoy la página no conecta las dos cosas, así que quien busca 55 no sabe si le sirve.
2. **Ferias**. `hire tv screens for exhibitions` ya existe como demanda, y desde ECOC 2026 hay un trabajo real de pantallas en stands que respalda ese ángulo.

**Estado: hecho el 2026-09-24.** Nueva FAQ `Do you rent a 55 inch screen?` que explica que el panel de 60 es MAYOR que un 55 y pide medidas de sala en vez del diagonal, la FAQ de tamaños ahora niega explícitamente 50/55/65, y la de múltiples pantallas pasa a citar ECOC 2026 (varios stands con más de una pantalla, uno con cinco en fila) como evidencia más fuerte que el caso de Bmotion.

## Clusters deliberadamente NO perseguidos

Esta tabla existe para no volver a discutirlo. Todos tienen volumen alto y **ninguno** se puede
servir con honestidad.

| Cluster | Impr. | Por qué NO |
| :--- | ---: | :--- |
| `spain wedding packages all inclusive` y variantes (`spain wedding packages`, `wedding packages spain`, `spanish wedding packages`) | ~1.350 | **Intent de wedding planner, no de alquiler AV.** Quien busca esto quiere finca, catering y fotógrafo. MEG vende equipo audiovisual. Posiciones 31-60 con 0 clics: Google muestra la página y nadie hace clic porque no es lo que buscaban. Escribir para esto obliga a insinuar un servicio que no existe, justo lo que la limpieza del silo de bodas corrigió. |
| `all inclusive barcelona wedding packages` | 38 | Barcelona. MEG opera en Málaga y Granada. |
| `hiring tents for weddings` | 90 | **Sin respaldo en inventario.** Cero carpas en `Equipamiento.csv`. `outdoor-wedding-tent-rental-care.svx` ya se retiró por no tener ángulo AV honesto. |
| `alquiler mobiliario bodas malaga` | 20 | Mobiliario. Cero mesas, sillas o mantelería en inventario. |
| `alquiler pantalla led en feria malaga` | 47 | **LED wall.** MEG tiene un panel plano de 60 pulgadas, no un muro modular. Negación ya documentada en `AGENTS.md`. |
| `gender reveal smoke machine` | bajo | Humo **de color** es pirotecnia, no una máquina de glicol. Ya respondido honestamente en `/blog/smoke-machine-rental/` ofreciendo el wash RGBW como alternativa real. |
| `eventraciones malaga`, `dispositivos espectaculos andalucia`, `10 juin 2027`, `in arabic` | ~60 | Ruido. `eventración` es un término **médico** (hernia), no de eventos. |
| `rent cdj 3000 near me`, `base dj malaga`, `dj equipment near me` | ~10 | Equipo de DJ. No está en inventario. |

## Idiomas distintos del inglés: traducidos, NO cubiertos en español

**Decisión del usuario (2026-09-24): el sitio NO dará soporte al español.** El soporte de nuevos
idiomas se tratará aparte, cuando el trabajo de contenido esté terminado.

Lo que sí se hizo: tomar las **52 consultas no inglesas** (640 impresiones, 0 clics), traducirlas
estrictamente al inglés y comprobar si ese contenido inglés existe. Resultado:

| Cluster no inglés | Traducción estricta | Mejor posición EN hoy | Veredicto |
| :--- | :--- | ---: | :--- |
| `alquiler iluminacion eventos malaga` (65) | `lighting hire` / `event lighting` | **1** | Ya cubierto |
| `mice events malaga` (55) | `mice sound system` | **2** | Ya cubierto |
| `alquiler de equipos ... para congresos` (49) | `conference equipment rental` | **3** | Ya cubierto |
| `alquiler de equipos ... para bodas` (72) | `wedding equipment hire` | **4** | Ya cubierto |
| `alquiler material audiovisual malaga` (86) | `audio visual equipment on rent` | 8,2 | Ya cubierto |
| `alquiler sonido malaga` (14) | `sound equipment rental` | **19,9** | Cubierto pero débil |
| `alquiler pantalla led en feria` (47) | `LED wall rental` | - | No perseguible, sin inventario |
| `alquiler mobiliario bodas` (34) | `wedding furniture rental` | - | No perseguible, sin inventario |

**Conclusión: la traducción al inglés de cada cluster no inglés YA existe, y casi toda rankea
entre la posición 1 y la 12.** No hay contenido nuevo que crear por esta vía. Las 640 impresiones
en español sin un solo clic son un artefacto de enrutado de idioma, no demanda insatisfecha.

El único punto flojo que revela el ejercicio no es de idioma: **el silo de sonido rankea en
posición 18-25** mientras iluminación está en 1-4 y conferencias en 3-4,5. `sound equipment rental`
son 137 impresiones en posición 19,91, la consulta inglesa no nupcial más grande del sitio. Es
dificultad competitiva con el pilar ya escrito, no ausencia de contenido.

## Contexto histórico: el hueco de español (cerrado por decisión)

| Métrica | Valor |
| :--- | ---: |
| Consultas en español | 35 |
| Impresiones | 510 (8,6% del total) |
| **Clics** | **0** |

Top: `alquiler iluminacion eventos malaga` (65, pos 36), `iluminacion eventos malaga` (50, **pos 13,3**),
`alquiler de material audiovisual malaga` (25, pos 20,2), `alquiler material audiovisual malaga` (19, pos 20,7),
`alquiler de iluminacion malaga` (8, **pos 6,1**).

**No es un hueco de contenido, es de arquitectura.** El sitio es una sola URL en inglés con i18n
de cliente y sin hreflang (documentado en `AGENTS.md`). Google no tiene título ni descripción en
español que mostrar, así que un usuario hispanohablante ve un snippet en inglés y no hace clic.
Escribir posts en español sin resolver el enrutado no arregla esto.

Detectado en la auditoría del 2026-08-06, diferido entonces y **cerrado por decisión del usuario el
2026-09-24**: no se dará soporte al español. Se conserva aquí cuantificado para cuando se retome
el tema de idiomas, no como tarea pendiente.
