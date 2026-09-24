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
| Humo y niebla | **0 en este export** | stage lighting equipment supplier | `/blog/smoke-machine-rental/` | Cubierto desde 2026-09-23. Demanda viene del CSV de Google Ads, NO de GSC: ninguna de las 486 consultas de este export menciona smoke ni fog |
| Wedding AV (`wedding rental trends`, `how to find wedding rentals`, `audiovisual wedding`) | 220 | wedding rentals | `/blog/wedding-rentals/` | Cubierto |
| MICE y congresos (`mice events malaga`, `event av spain`) | ~160 | event technology service | `/blog/event-technology-service/` | Cubierto |
| Ferias y stands | 0 propias | audio visual rental | `/blog/audio-visual-rental-for-trade-shows/` | Cubierto y reforzado con ECOC 2026. **Sin consultas propias**: `hire tv screens for exhibitions` (7 impr) ya se cuenta en la fila de pantallas y no se duplica acá |

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
| `gender reveal smoke machine` | 0 en GSC, viene de Google Ads | Humo **de color** es pirotecnia, no una máquina de glicol. Ya respondido honestamente en `/blog/smoke-machine-rental/` ofreciendo el wash RGBW como alternativa real. |
| `eventraciones malaga`, `dispositivos espectaculos andalucia`, `10 juin 2027`, `in arabic` | ~60 | Ruido. `eventración` es un término **médico** (hernia), no de eventos. |
| `rent cdj 3000 near me`, `base dj malaga`, `dj equipment near me` | ~10 | Equipo de DJ. No está en inventario. |

## Idiomas distintos del inglés: traducidos, y el resultado NO fue el que parecía

**Decisión del usuario (2026-09-24, tarde): el sitio NO dará soporte al español.** Esa misma
mañana se había decidido sumarlo con `/es/` (junto con otros 12 idiomas) y se revirtió. El sitio se
publica en inglés y 12 idiomas más, ninguno español. Ver `CLAUDE.md`, sección "Idiomas soportados".

Lo que sí se hizo: tomar las consultas no inglesas, traducirlas estrictamente al inglés y
comprobar si ese contenido inglés ya existe y, sobre todo, **si rankea**.

> **Corrección metodológica (2026-09-24).** La primera versión de esta tabla daba por "cubierto"
> cada cluster citando su MEJOR posición. Eso era inválido: `conference equipment rental` estaba
> en posición 3 **con 1 sola impresión**, y cerraba un cluster de 49. Una posición promediada
> sobre una impresión no es una señal, es ruido. La tabla de abajo usa **posición ponderada por
> impresiones** sobre todo el cluster, y muestra el tamaño de muestra al lado de cada veredicto,
> para que un veredicto no pueda mentir sin que se vea.

| Cluster inglés equivalente | Consultas | Impresiones | Pos. ponderada | Mejor pos. (impr.) | Veredicto |
| :--- | ---: | ---: | ---: | :--- | :--- |
| pantallas (`screen`, `tv`, `monitor`) | 44 | 533 | **20,3** | 4,43 (7 impr) | Existe, rankea hondo |
| sonido (`sound`) | 30 | 584 | **24,3** | 18,1 (24 impr) | Existe, rankea hondo |
| audiovisual equipment | 19 | 317 | **22,4** | 8,2 (24 impr) | Existe, rankea hondo |
| iluminación (`light`) | 31 | 238 | **20,3** | 1 (7 impr) | Existe, rankea hondo |
| bodas AV | 27 | 237 | **20,4** | 4 (1 impr) | Existe, rankea hondo |
| MICE | 4 | 62 | **33,9** | 2 (3 impr) | Existe, rankea hondo |
| conferencias / congresos | 7 | 15 | **38,3** | 3 (1 impr) | Muestra demasiado chica para concluir |

**Conclusión corregida: el contenido inglés existe, pero NINGÚN cluster rankea bien.** Todos caen
en posición ponderada 20-38, que es la misma banda muerta que describe la tabla de salud de
arriba. No es un problema de idioma ni de cobertura: es de posicionamiento, y es transversal.

Eso reordena la prioridad. Escribir más contenido no mueve un cluster que ya tiene su página y
está en posición 22. Lo que queda por decidir es si se ataca el posicionamiento de lo existente,
y contra qué competencia, o no se hace nada.

### Consultas no inglesas: qué son realmente

| Cluster | Impresiones | Traducción | Estado |
| :--- | ---: | :--- | :--- |
| `alquiler ... iluminación ...` | ~157 | lighting rental for events | Traducción cubierta, rankea en 20,3 |
| `alquiler ... material audiovisual ...` | ~86 | audiovisual equipment rental | Traducción cubierta, rankea en 22,4 |
| `alquiler ... para bodas ...` | ~72 | AV equipment rental for weddings | Traducción cubierta, rankea en 20,4 |
| `alquiler ... para congresos ...` | ~49 | equipment rental for congresses | Traducción cubierta, muestra chica |
| `alquiler sonido malaga` | ~14 | sound rental Malaga | Traducción cubierta, rankea en 24,3 |
| `alquiler pantalla led en feria malaga` | 47 | LED wall rental at trade fair | **No perseguible**, sin inventario |
| `alquiler mobiliario bodas malaga` | ~34 | wedding furniture rental | **No perseguible**, sin inventario |
| `eventraciones malaga`, `dispositivos espectaculos andalucia`, `puerto de malaga` | ~50 | - | Ruido. `eventración` es un término médico |

Las impresiones en español sin un solo clic siguen siendo un artefacto de enrutado de idioma.
Lo que cambia respecto a la primera versión es que **su traducción inglesa tampoco convierte**,
así que resolver el idioma no habría bastado por sí solo.

### Un gap inglés que la primera versión enterró

`mice events malaga` son **55 impresiones en posición 37,04**, y es una consulta **en inglés**, no
española. En la primera versión quedó mal clasificada como no inglesa y se dio por cerrada citando
`mice sound system` (3 impresiones, pos 2). Con la métrica correcta, el cluster MICE entero está en
**posición ponderada 33,9 sobre 62 impresiones**. Es el candidato más concreto si se decide atacar
posicionamiento, y `/blog/event-technology-service/` es su página.

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
de cliente y sin hreflang (documentado en `CLAUDE.md`). Google no tiene título ni descripción en
español que mostrar, así que un usuario hispanohablante ve un snippet en inglés y no hace clic.
Escribir posts en español sin resolver el enrutado no arregla esto.

Detectado en la auditoría del 2026-08-06 y diferido entonces. El 2026-09-24 se abrió (URLs `/es/`)
y se volvió a cerrar el mismo día por decisión del usuario: el sitio no tendrá versión en español.
Se conserva cuantificado como contexto, no como tarea pendiente.
