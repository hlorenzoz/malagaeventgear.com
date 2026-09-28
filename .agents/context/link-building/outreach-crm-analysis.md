# CRM de outreach para link building: análisis

Análisis del 2026-09-28, en una sesión con el usuario. Complementa a `media-and-pr-plan.md`
(la estrategia, las reglas y los medios). Este archivo trata de la HERRAMIENTA para llevar el
control del outreach. Nada de esto está implementado todavía. Todo cambio de código que salga de
acá va con SDD (regla 6 de CLAUDE.md).

## Qué pidió el usuario

Un "CRM" para el link building que controle:
- los medios (sources) con sus metadatos: URL, idioma, país, audiencia, descripción, etc.
- los correos enviados: a quién, contenido y previsualización (Mailpit para pruebas locales).
- las oportunidades.
- el escaneo y el alta de medios nuevos.
- las vías de contacto: email, WhatsApp, etc.
- las cuotas diarias de envío de correo.

## Decisión del usuario (2026-09-28): flujo local, a través de Claude, con git

El usuario descartó un panel web como primera opción. Quiere un proceso MANUAL, hecho a través
de Claude en local (buscar medios, redactar emails y mensajes, buscar oportunidades), y después
subir los cambios con commit y push, igual que con los posts del blog.

Es posible. El diseño acordado en principio:

### Dónde viven los datos

El repo del sitio es PÚBLICO (verificado el 2026-09-28: la API de GitHub responde 200 sin
autenticación para `hlorenzoz/malagaeventgear.com`). Los datos públicos de un medio (URL,
idioma, audiencia) no son un problema, pero el CRM guarda nombres, emails y teléfonos de
periodistas y el texto de los pitches. Eso NO va a un repo público: son datos personales de
terceros (RGPD) y además expone la estrategia.

Opciones:
1. **Repo privado aparte** (por ejemplo `malagaeventgear-outreach`), clonado al lado del sitio.
   Mismo flujo de commit y push. Nada se despliega: son registros, no código. (Recomendada.)
2. Hacer privado el repo del sitio. Workers Builds funciona con repos privados vía la app de
   GitHub, pero cambia la visibilidad de todo el sitio, que puede ser intencional.

**PENDIENTE**: el usuario todavía no eligió entre las dos.

Este archivo sí puede vivir en el repo público: no tiene datos personales ni secretos.

### Estructura propuesta (en el repo de outreach)

| Ruta | Qué guarda |
| :--- | :--- |
| `outlets/<slug>.md` | un medio por archivo. Frontmatter: nombre, URL, idiomas, país, segmento (MICE, congresos, comunidad, prensa local, institución, directorio), audiencia, descripción, si vende patrocinado, si tiene directorio, página de contacto de la redacción, estado (`candidate`, `verified`, `inactive`, `do_not_use`), `last_verified_at`, URL de evidencia. Notas en el cuerpo |
| `contacts/` | personas o secciones de cada medio, con sus canales: `email`, `whatsapp`, `phone`, `form`, `linkedin`, `x`, y cuál es el preferido |
| `opportunities/` | medio + historia (slug de un post `News` del sitio) + idioma + URL de destino en MEG + etapa (`idea`, `pitched`, `follow_up`, `negotiating`, `published`, `declined`) |
| `messages/<fecha>-<medio>-<canal>.md` | cada email o mensaje: canal, destinatario, asunto, idioma, estado (`draft`, `approved`, `sent`), fecha de envío. El cuerpo es el mensaje |
| `backlinks.yaml` | enlaces conseguidos: URL del artículo, URL de destino, anchor, `rel` (`follow`, `nofollow`, `sponsored`, `ugc`), primera vez visto, último chequeo, si sigue vivo |

La tabla "Registro" de `media-and-pr-plan.md` se muda a `backlinks.yaml` cuando exista el repo.
Un dato vive en un solo lugar: el `.md` del sitio guarda la estrategia y las reglas, el repo de
outreach guarda los datos.

### Validación (como los posts)

Esquemas Zod más `bun test`, que fallan si:
- un anchor no es la marca ("Malaga Event Gear") o la URL.
- un enlace pagado no lleva `rel="sponsored"`.
- una oportunidad cita un post `News` que no existe en el repo del sitio.
- un mensaje promete atención en un idioma que no es inglés o español.

### Flujo de trabajo con Claude

1. **Buscar medios**: Claude investiga y agrega medios como `candidate`. Pasan a `verified`
   solo cuando el usuario los revisa.
2. **Buscar oportunidades**: Claude cruza medios con historias `News` y propone pitches.
3. **Redactar**: Claude escribe el mensaje en el idioma del medio. Un script lo manda a Mailpit
   local para previsualizarlo en `http://localhost:8025`.
4. **Enviar**, dos opciones:
   - **Desde el Gmail del usuario** (recomendada para pitches): las respuestas llegan con su
     hilo, no gasta cuota de Resend y un pitch personal convierte mejor. Claude registra el
     envío.
   - **Por Resend con un script local**: consulta antes la cuota del día (sumando los envíos de
     producción registrados en D1), pide confirmación explícita y registra el envío.
5. **WhatsApp**: Claude genera el enlace `wa.me` con el texto precargado, el usuario envía desde
   su teléfono y Claude lo registra. No se usa la API de WhatsApp Business: un pitch en frío por
   esa API va contra sus políticas (exige consentimiento previo y plantillas aprobadas).
   Teléfono y LinkedIn igual: registro manual.
6. **A pedido**: Claude re-verifica que los medios sigan activos (fecha del último artículo por
   RSS o sitemap, certificado SSL, estado HTTP. Así se detectó mice.es, con el certificado
   vencido) y que los backlinks sigan vivos con el mismo `rel` y anchor.
7. **Respuestas**: llegan al buzón del usuario. El usuario se las pasa a Claude y Claude las
   registra.

**Un push nunca dispara envíos.** Enviar correos desde un deploy es peligroso: un re-deploy
reenvía todo.

## Propuesta anterior (descartada como primera opción): panel web

Se analizó primero un módulo web dentro del sitio, como primer módulo del CRM propio que
CLAUDE.md ya prevé. Queda como referencia si algún día se quiere una interfaz:
- Grupo de rutas `src/routes/(admin)/outreach/`, `prerender = false`, `noindex`, fuera de los
  sitemaps y de `llms.txt`.
- Autenticación con Cloudflare Access (Zero Trust) delante de `/admin/`: login por email sin
  escribir código de auth. better-auth cuando haya más usuarios.
- Tablas D1 nuevas: `outlets`, `contacts`, `contact_channels`, `opportunities`,
  `outreach_messages`, `backlinks`.
- Cron de verificación de medios y monitor de backlinks en un worker propio, como
  `workers/review-reminders/`.
- Respuestas entrantes con Cloudflare Email Routing hacia un Worker.
- Alternativa comprada: BuzzStream o Pitchbox hacen esto. Más rápido, pero con suscripción, los
  datos afuera y sin integración con los posts `News` ni con el CRM de leads.

## Infraestructura existente (verificada el 2026-09-28)

- **D1 `meg-leads`**: tablas `leads`, `lead_events`, `email_messages`, `review_requests`,
  `recipients` (`migrations/0001_init.sql`), más `indexnow_submissions` e `indexnow_requests`.
  `email_messages` está atada a `lead_id`: no sirve tal cual para outreach.
- **Email**: `src/lib/server/email/resend.ts` envía por `fetch` a la API de Resend, sin SDK, con
  un `fetchFn` inyectable. Las plantillas son funciones puras con tests
  (`src/lib/server/email/templates/`).
- **Mailpit** expone `POST /api/v1/send` por HTTP (sin SMTP) y su interfaz en el puerto 8025.
  Un transporte Mailpit por `fetch` es trivial y compatible con Workers. En el repo no hay nada
  de Mailpit todavía.
- **No hay** rutas de admin ni autenticación en el sitio.

## Estado de Resend (verificado el 2026-09-28)

- **Sitio (worker `malagaeventgear`)**: funciona. Tiene `RESEND_API_KEY` como secret y
  `RESEND_FROM = "Malaga Event Gear <contact@malagaeventgear.com>"` en `wrangler.toml`. D1
  registra 15 confirmaciones y 15 notificaciones con estado `sent`, del 2026-06-14 al
  2026-09-21.
- **Cron de reseñas (worker `meg-review-reminders`)**: ROTO desde el primer día. Desplegado el
  2026-06-02, pero `wrangler secret list` devuelve `[]`: no tiene `RESEND_API_KEY`. D1 registra
  57 envíos `review_reminder`, los 57 en `failed`, del 2026-06-17 al 2026-09-28. Ningún cliente
  recibió nunca el pedido de reseña de Google.
- **Gotcha del cron**: `workers/review-reminders/src/index.ts` (líneas 94 a 125) registra el
  fallo pero no avanza `send_count`, así que reintenta todos los días sin fin (57 fallos sobre
  20 `review_requests`). Al cargar la clave saldrían TODOS los pendientes juntos, incluidos
  pedidos de reseña de eventos de junio y, si los hay, leads de prueba.
- **Recomendación (pendiente de decisión del usuario)**: antes de cargar la clave, cerrar como
  vencidos los `review_requests` de eventos de hace más de 14 días, así solo salen los recientes.
  Revisar también el reintento infinito.

## Cuotas de Resend

De la documentación de Resend (Account quotas and limits):
- Plan gratis: 100 emails por día y 3.000 por mes. Los emails recibidos también cuentan.
- Planes pagos: sin tope diario, solo el mensual del plan. Excedentes hasta 5 veces la cuota.
- API: 10 peticiones por segundo por equipo (no por clave ni por dominio). Cabeceras de rate
  limit según el estándar de la IETF.
- Pausa de envíos si los rebotes superan el 4 % o las denuncias de spam el 0,08 %.

**CONFIRMAR en el dashboard de Resend en qué plan está MEG.** Si es el gratis, el outreach y los
emails de leads comparten los 100 diarios.

Control de cuotas propuesto:
1. Contar todos los envíos por día y por mes, de los dos workers y del outreach, porque la cuota
   es por equipo.
2. Reservar cuota para los emails transaccionales: el outreach tiene un tope propio (por ejemplo
   el 70 % de la diaria) y se bloquea al llegar, así una confirmación de lead nunca se queda sin
   salir.
3. Manejar el error 429 y leer las cabeceras de rate limit.
4. Webhooks de Resend (`email.bounced`, `email.complained`) para medir rebotes y denuncias y
   marcar un canal como inválido. En el flujo local, el script de envío consulta la cuota antes
   de mandar.

Si los pitches salen desde el Gmail del usuario, no consumen cuota de Resend.

## Entregabilidad

- Si alguna vez el outreach sale por Resend, usar un subdominio de envío propio (por ejemplo
  `press.malagaeventgear.com`), para que una denuncia de spam de un pitch no afecte a los emails
  de confirmación de leads.
- Siempre uno a uno, con confirmación humana por mensaje. Nada de envíos masivos ni secuencias
  automáticas.
- Cada email lleva una línea para darse de baja. Se guardan solo los datos mínimos del contacto.

## Decisiones pendientes

1. Repo privado aparte o repo del sitio privado.
2. Qué hacer con los `review_requests` vencidos antes de arreglar el cron.
3. En qué plan de Resend está MEG.
4. Desde dónde salen los pitches: Gmail o Resend.

## Sources

- [Mailpit: API v1](https://mailpit.axllent.org/docs/api-v1/)
- [Mailpit: Sending mail](https://mailpit.axllent.org/docs/usage/sending-messages/)
- [DeepWiki: Mailpit REST API](https://deepwiki.com/axllent/mailpit/2.3-rest-api)
- [Resend: Account quotas and limits](https://resend.com/docs/knowledge-base/account-quotas-and-limits)
