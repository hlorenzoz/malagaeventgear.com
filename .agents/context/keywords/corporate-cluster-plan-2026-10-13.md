# Clúster de contenido corporativo: análisis previo y plan (2026-10-13)

Tarea #T0085. Es un plan para aprobar, no contenido. Nada de lo que propone está escrito.
Reemplaza el orden de escritura de #T0035, que se armó sin datos de Search Console.

## Lo que recomiendo, en corto

1. Empezar por un lote chico de 5 posts, no por los 20 de #T0035.
2. Tres de equipo concreto, que tienen inventario real y un pilar que ya rankea. Dos de
   planificación y destino, que son los únicos con demanda medida.
3. Antes de sumar posts al pilar `event-technology-service`, resolver #T0030 (su keyword se pisa
   con la del pilar de iluminación en 6 idiomas). Hoy ese pilar casi no tiene tráfico, así que
   cambiarle la keyword ahora es barato. Después de colgarle posts, no.
4. Medir el lote antes de escribir el siguiente.

El motivo de ir despacio está en los dos apartados que siguen.

## Qué datos hay y cuáles no

Fuentes leídas: `.agents/data/keywords.json` después de `just keywords-sync`, los dos exports de
Search Console del 2026-10-13 (3 y 12 meses, carpeta local fuera de git), el inventario de posts
(`just content-inventory`), el CSV de equipo `2026.09.26` y `packages.ts`.

| Dato | Resultado |
| :--- | :--- |
| Keywords corporativas en `keywords.json` | 175: 87 cubiertas, 16 publicadas, 8 planificadas, 44 ideas, 20 rechazadas |
| Ideas con volumen medido | 3 de 44, las tres con 10 búsquedas al mes |
| Ideas sin ningún dato | 41 de 44 |
| FAQs corporativas | 111: 96 respondidas, 15 en idea |
| Prompts de IA corporativos | 92, todos en idea |
| Tier de Avalanche | Level 100 (media 149,5 impresiones diarias). Igual con el export nuevo |

Consecuencia: **Avalanche no se puede aplicar a este clúster.** El tier ordena por volumen, y casi
ninguna keyword corporativa tiene volumen medido. La evidencia de #T0035 es autocompletado de
Google, que prueba que la frase existe, no cuánta gente la busca. Toda keyword de este plan sigue
siendo una propuesta.

Lo único medido es Search Console, y mide lo que el sitio ya recibe, no el mercado.

## Cómo rinde hoy el contenido corporativo que ya existe

Search Console, 12 meses contra los últimos 3. Suma la URL vieja de WordPress y la nueva.

| Post | Clics 12 m | Impresiones 12 m | Impresiones 3 m | Posición 3 m |
| :--- | ---: | ---: | ---: | ---: |
| audio-visual-rental-for-conferences | 8 | 2.629 | 272 | 45,0 |
| audio-visual-rental-for-corporate-meetings | 0 | 2.001 | 24 | 46,4 |
| audio-visual-rental-for-virtual-events | 0 | 1.214 | 16 | 56,1 |
| audio-visual-rental-for-product-launches | 5 | 1.153 | 26 | 17,0 |
| audio-visual-rental-for-seminars | 1 | 1.131 | 6 | 47,5 |
| audio-visual-rental-for-training-sessions | 3 | 955 | 12 | 28,9 |
| audio-visual-rental-for-corporate-events | 1 | 756 | 29 | 36,2 |
| audio-visual-rental-for-press-conferences | 3 | 753 | 33 | 50,0 |
| audiovisual-equipment-rental-service (pilar) | 1 | 75 | 75 | 15,3 |
| event-technology-service (pilar) | 0 | 2 | 2 | 5,5 |

Tres lecturas:

- **Los posts "audio visual rental for <tipo de evento>" perdieron casi toda su visibilidad.**
  Corporate meetings pasó de 2.001 impresiones en el año a 24 en el último trimestre. Es parte de
  la caída general (#T0128), no algo propio de este clúster.
- **El clúster corporativo casi nunca dio clics.** Las 216 consultas corporativas o de AV del año
  suman 7.045 impresiones y 5 clics.
- **El pilar `event-technology-service` es invisible**: 2 impresiones en 12 meses. Colgarle 15
  posts no le transfiere una autoridad que todavía no tiene. El pilar de equipo, en cambio, está
  en posición 15.

## Qué busca la gente que ya llega

Consultas corporativas con más impresiones en 12 meses (entre paréntesis, los últimos 3):

| Consulta | Impresiones | Posición | Lectura |
| :--- | ---: | ---: | :--- |
| event av spain | 391 (96) | 9,7 | Alcance país. La mejor posicionada del grupo |
| audiovisual events spain | 366 (81) | 15,3 | Igual |
| mice events malaga | 214 (58) | 41,9 | Destino MICE. Encaja con la Parte 3 |
| meeting services malaga | 108 | 35,6 | Servicios, no equipo |
| event agency malaga | 94 | 41,7 | MEG no es agencia |
| convention services malaga | 91 | 36,3 | Servicios, no equipo |
| event logistics malaga | 87 (13) | 36,2 | Encaja con "soluciones integrales" |
| conference av rentals | 69 | 51,4 | Ya la cubre el post de conferencias |
| event organizer malaga | 39 | 41,6 | MEG no organiza |

El resto de la demanda es alquiler de AV genérico ("hire av equipment" 607, "av hire" 437), que es
de la home y del pilar principal, no de este clúster.

Dos cosas que cambian respecto de #T0035:

- **"mice events malaga" tiene demanda medida y ningún post la atiende.** Es el mejor candidato
  para el contenido de destino.
- **"meeting services", "convention services" y "event logistics" en Málaga** se habían descartado
  por chocar con el modelo de negocio (engram 2498). Con el posicionamiento de soluciones
  integrales ya no chocan del todo: MEG resuelve lo que el evento necesita buscando proveedores.
  Sí chocan "event agency" y "event organizer": MEG no es ninguna de las dos cosas.

## Estructura propuesta

No hace falta un pilar nuevo ni una categoría nueva. Dos silos que ya existen.

### Lote 1 (5 posts)

| Orden | Slug | Keyword | Silo (pilar) | Respaldo |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `lectern-rental` | lectern rental | audiovisual-equipment-rental-service | 2 atriles de metacrilato en el CSV, extra de 50 euros en `packages.ts`, foto real `blog/1264`, caso News de Bmotion en Benahavís |
| 2 | `wireless-handheld-microphone-rental` | wireless handheld microphone rental | audiovisual-equipment-rental-service | 2 sets Audix RAD-360 de mano y 4 Audix OM5 y OM2 inalámbricos en el CSV |
| 3 | `stage-platform-rental` | stage platform rental | audiovisual-equipment-rental-service | Tarimas Guil de 2x1 en el CSV, extra por metro cuadrado en `packages.ts`. Cantidad y alturas sin confirmar |
| 4 | `mice-events-in-malaga` | mice events malaga | event-technology-service | 214 impresiones medidas. Es el contenido de destino de la Parte 3 |
| 5 | `how-to-organize-a-congress-in-malaga` | how to organize a congress in malaga | event-technology-service | Autocompletado y SERP. Ancla del clúster de planificación |

Cambios respecto de #T0035:

- **Las tarimas pasan al silo de equipo.** #T0035 las ponía en `event-technology-service`, pero su
  propia regla de reparto dice que un equipo concreto va al silo de equipo.
- **Entra un post que #T0035 no tenía**, `mice-events-in-malaga`, por la demanda medida.
- **Sale del lote `projector lumens for conference room`.** Pisa la intención de
  `projector-rental`, que ya tiene 56 impresiones. Es mejor una sección ahí que un post.
- **Las ideas 16 y 17 ya están hechas**: `conference-table-microphone-rental` (2026-10-13).

Cadena del silo de equipo después del lote, en orden de entrada:
`headset-lavalier-microphone-rental` <-> `conference-table-microphone-rental` <-> `lectern-rental`
<-> `wireless-handheld-microphone-rental` <-> `stage-platform-rental`. El enlace único del pilar
se mueve al último en cada alta, así que el pilar cambia en los 13 idiomas con cada post nuevo.

Cadena del silo de tecnología para eventos: `mice-events-in-malaga` <->
`how-to-organize-a-congress-in-malaga`. El pilar recibe su primer enlace hacia el silo.

### Lo que queda para después de medir el lote 1

- Con evidencia y sin dato pendiente: `awards-ceremony-production`,
  `keynote-speaker-av-requirements`.
- Sección o FAQ en un post existente, no post nuevo: `projector lumens for conference room` (en
  `projector-rental`), las 15 FAQs en idea, y los prompts de IA que no dependen de #T0087.
- Esperan un dato del negocio: ensayo técnico, escaleta, visita técnica previa, equipo montado de
  noche, congresos médicos, convención comercial.
- Para decidir: un post de "servicios para eventos en Málaga" que atienda "meeting services",
  "convention services" y "event logistics" (unas 290 impresiones al año entre las tres).

### Lo que sigue descartado

Eventos híbridos y streaming, LED wall, sistemas de votación como post propio, otro "audio visual
rental for <evento>", registro y acreditaciones, páginas por localidad, variantes "near me", y
"event agency", "event organizer" y "dmc malaga" como páginas propias.

## Parte 3: por qué hacer eventos corporativos en Málaga

Va en `mice-events-in-malaga`, no en un post aparte. Dos posts sobre el mismo tema competirían.

- **Enfoque**: lo que necesita saber quien organiza un evento en Málaga y va a contratar AV. No
  una guía turística.
- **Temas**: acceso (aeropuerto, AVE, puerto), sedes (FYCMA, palacios de congresos de Torremolinos
  y Marbella, hoteles), clima y temporada, y qué resuelve MEG y qué resuelve un socio.
- **Cada cifra con su fuente oficial, citada y enlazada**: AENA para el aeropuerto, AEMET para el
  clima, la web de FYCMA para aforos, Turismo y Planificación Costa del Sol o el Convention Bureau
  para el sector. Esas fuentes hay que abrirlas al escribir. Este documento no cita ninguna cifra
  porque no se abrió ninguna.
- **Experience solo de los posts News**: ECOC 2026 en FYCMA, PROGOLD SUMMIT 2026 en Torremolinos,
  Bmotion en Marbella y Benahavís, Billie Jean King Cup 2024.
- **TGE** para el alojamiento de grupos, como en los posts que ya lo nombran.

## Costo y ritmo

- Cada post nuevo es inglés más 12 traducciones en un commit, más el cambio del pilar y del
  hermano anterior en los 13 idiomas. El de micrófonos de mesa llevó unas 2 horas de agentes.
- Cupo: 1 o 2 posts nuevos por día. El lote 1 son 3 a 5 días de trabajo.
- Portadas: hay fotos reales para atril y micrófonos. Para tarimas y para el post de destino hay
  que elegir entre las fotos de los posts News. No se usan fotos de banco como experiencia real.

## Decisiones que son tuyas

1. **Aprobar el lote 1** tal cual, o cambiar posts u orden.
2. **Tarimas en el silo de equipo** (propuesta) o en `event-technology-service` (lo que decía #T0035).
3. **Resolver #T0030 antes del post 4**: cambiar la keyword y el slug de `event-technology-service`
   en 6 idiomas, con redirects.
4. **Post de "servicios para eventos en Málaga"**: sí, no, o después de medir.
5. **Datos del negocio para el lote 1**: cantidad y alturas de las tarimas, y medidas del atril.
   Sin ellos los posts salen igual, sin esas cifras.

## Lo que este análisis no verificó

- Volumen de búsqueda de casi ninguna keyword. No hay herramienta con cuota para medirlo hoy.
- La SERP actual de cada keyword del lote. Se lee al escribir cada post.
- Las cifras de destino de la Parte 3. No se abrió ninguna fuente oficial.
- Que las tarimas, los atriles y los micrófonos del CSV sigan en el inventario. Vale el CSV más
  reciente, por decisión del usuario del 2026-10-11.
- Si la caída general de tráfico (#T0128) va a afectar igual a los posts nuevos.
