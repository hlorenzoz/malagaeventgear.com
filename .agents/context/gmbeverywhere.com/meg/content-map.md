# Content Map: GBP Categories to Site Silo (Malaga Event Gear)

Source: .agents/context/gmbeverywhere.com/meg/fixed.md (already-resolved GBP category to service mapping, do not re-derive).

## Legend

- `pending`: net-new service, nothing on the site serves this intent yet.
- `covered`: a real existing post already serves this exact intent. Its slug is linked, do not draft a new post.
- `risk`: an existing post is close enough in topic or intent that writing this one needs a deliberate differentiation decision before drafting. See Notes.
- `duplicate`: a real existing post (possibly in a different silo) already IS this product/service. Never a new page - fold in or link, same as `covered`.
- `conflict`: a real, live page already states MEG does NOT offer this. Writing this page would either contradict a published claim or require fabricating a product that page already denied. Needs a business-fact decision (does MEG actually offer this or not) before any drafting, not a content decision.
- `no-grounding` / `blocked-on-equipment-context`: zero presence in `packages.ts` or the equipment page. Not necessarily a permanent no - may mean MEG doesn't offer it, or may mean it's real but never documented in the data layer. User will update the equipment context with real specifics later - do not draft until then, do not fabricate the product to fill the page.
- `no-fit`: not a physical AV equipment/rental service at all for a per-event delivery-only company (e.g. software/SaaS, permanent installation/systems-integration, sales/leasing/repair, photo-video). Different from `conflict`: nothing contradicts it, it just doesn't match this business model. No page.
- `declared`: resolved without its own page because an existing page (often a pillar's "What We Don't Offer" section) already honestly states the scope decision by name.
- `ready`: real grounding confirmed in `packages.ts`/equipment page, a genuine distinct angle exists, not already covered, no contradiction. A real candidate to actually draft as a new supporting post - the goal is to build these out, not leave them marked ready indefinitely.
- This file is the single source of truth for GBP-category content progress. Update `Status` and `Slug` as posts are drafted and published. Flip `pending`/`risk`/`ready` to `covered` once a post ships, and record the shipped slug.

---

## Category: Audio visual equipment hire service (primary)

Pillar: `audio-visual-rental` (existing, target `/`)

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Sound system rental | covered | sound-system-rental | 1 | Published 2026-07-30. |
| 2 | PA system rental | covered | sound-system-rental | 1 | Not a standalone page: SERP research showed "PA system rental" and "sound system rental" are the same intent, and MEG has no distinct PA-only product. Folded in as an FAQ + verbatim phrase on sound-system-rental.svx (2026-07-30). |
| 3 | Portable PA system rental | covered | sound-system-rental | 1 | Business confirmed 2026-07-30: MEG never offers self-collect/battery-powered equipment. Folded in as an honest FAQ on sound-system-rental.svx rather than a standalone page. |
| 4 | Speaker rental | covered | sound-system-rental | 1 | Same intent as sound-system-rental for this site: no bare speakers-only SKU in MEG's catalog. Folded in as an FAQ + phrase reinforcement (2026-07-30). |
| 5 | Microphone rental | covered | sound-system-rental | 1 | No standalone mic SKU (only bundled per package: wired/gooseneck/wireless). Folded in as an FAQ + strengthened Equipment section (2026-07-30). |
| 6 | Wireless microphone rental | covered | sound-system-rental | 1 | Same catalog constraint as #5 — wireless handheld only on Wedding/MICE Pack. Folded in as an FAQ (2026-07-30). |
| 7 | Audio mixer rental | covered | sound-system-rental | 1 | Mixers are technician-operated equipment bundled in packages, not a standalone rental (DJs on Eco Pack bring their own). Folded in as an FAQ (2026-07-30). |
| 8 | Audio interface rental | covered | sound-system-rental | 1 | MEG has no recording/podcasting-style audio interface, only presentation HDMI/USB-C adapters. Folded in as a disambiguation FAQ (2026-07-30). |
| 9 | Projector rental | covered | projector-rental | 1 | Published 2026-07-30. Host page for the projection-screen fold-in. |
| 10 | Projection screen rental | covered | projector-rental | 1 | MEG never sells a screen without a projector (packages.ts bundles them in every package). Folded in as an FAQ + phrase reinforcement on projector-rental.svx (2026-07-30). |
| 11 | LED wall rental | covered | tv-screen-rental | 1 | MEG's catalog has only the MICE Pack's single 60-inch flat LED display, no modular tiled LED wall product. Honest "we don't carry that" FAQ on tv-screen-rental.svx (2026-07-30). |
| 12 | Video wall rental | covered | tv-screen-rental | 1 | Same as #11 — near-synonym of LED wall rental, no multi-monitor array product in MEG's catalog. Folded into the same FAQ. |
| 13 | TV screen rental | covered | tv-screen-rental | 1 | Published 2026-07-30. Standalone host page for the flat-display cluster (#11, #12, #14, #15). Real product: MICE Pack's 60-inch LED display, 490 euros, up to 120 guests. |
| 14 | Display monitor rental | covered | tv-screen-rental | 1 | Pure synonym of TV screen rental (confirmed via competitor SERP). Folded in as a direct FAQ answer (2026-07-30). |
| 15 | Plasma screen rental | covered | tv-screen-rental | 1 | Legacy umbrella term for any flat-panel screen, not real plasma tech (obsolete). Folded in as a direct FAQ answer (2026-07-30). |
| 16 | Camera rental | blocked-on-equipment-context | - | | Zero camera/recording grounding in packages.ts or equipment page; 7 live posts already state MEG doesn't offer cameras. The "event-rental angle" hypothesis didn't survive SERP research either (real intent is professional cinema/broadcast hire, outside business scope). Also found a live contradiction: faq.ts "streaming-recording" FAQ claims multi-camera production services. User will update equipment context with specifics later - revisit this and the faq.ts entry then, don't draft until that happens. |
| 17 | Video equipment rental | blocked-on-equipment-context | video-equipment-rental | | Zero camera/video-production grounding; SERP mixes camera-rental cos and general AV cos. Deferred per Camera rental precedent (row 16). |
| 18 | DJ equipment rental | conflict | - | | music-performances.svx: DJ "brings their own mixing gear" - MEG only supplies PA+mic+lighting around them. |
| 19 | Conference AV rental | duplicate | audio-visual-rental-for-conferences | | Already owned by audio-visual-rental-for-conferences.svx. |
| 20 | Event AV equipment rental | duplicate | audio-visual-rental / audiovisual-equipment-rental-service | | Generic umbrella synonym of the two pillars. |
| 21 | Video conferencing equipment rental | conflict | - | | remote-presentations.svx and virtual-events.svx explicitly deny cameras/webcams/streaming equipment, the core hardware here. |
| 22 | Interactive whiteboard rental | blocked-on-equipment-context | - | | Zero grounding, no denial found either. |
| 23 | Interactive display rental | blocked-on-equipment-context | - | | Zero grounding, distinct from the non-interactive 60 inch LED display MEG stocks. |
| 24 | Tablet rental | conflict | - | | projector-rental.svx: "presenter's own laptop, tablet... not ours," repeated across 8+ posts. |
| 25 | Laptop rental | declared | audiovisual-equipment-rental-service | | Named in the pillar's "What We Don't Offer" list. |
| 26 | Truss system rental | declared | audiovisual-equipment-rental-service | | "We do not stock truss as a separate rental item" already stated. |
| 27 | Stage rental / Stage hire | duplicate | audiovisual-equipment-rental-service | | Real grounding (MICE Pack staging add-on) but already has a dedicated H2 on the pillar. |
| 28 | Video switcher rental | blocked-on-equipment-context | - | | Zero grounding, adjacent to the broadcast-production wall. |
| 29 | Live streaming equipment rental | blocked-on-equipment-context | - | | Zero grounding. Contradicts faq.ts "streaming-recording" entry (see row 16/35 note) - flagged, not resolved. |
| 30 | AV technician hire | **ready** | av-technician-hire | 2 | HOST for the "hiring the person" angle (skill/role, technician-hours by package). User decided 2026-07-31: 2 pages for the 4-keyword technician/support cluster, this is page 1. |
| 31 | Technical support for events | duplicate | technical-support-for-events | 2 | Folds into technical-support-for-events.svx (page 2 of the cluster, see category 3 row 37) as a synonym phrase, not its own page. |
| 32 | Cable and connector rental | blocked-on-equipment-context | - | | No standalone cable SKU, only bundled setup work. |
| 33 | Voting system hire | conflict | - | | audiovisual-equipment-rental-service.svx explicitly denies this. Directly contradicted by faq.ts "translation-voting" entry claiming yes - business-fact decision needed. |
| 34 | Tripod and stand rental | conflict | - | | Tripods explicitly denied; stands only ever bundled, never standalone. |
| 35 | Recording equipment rental | blocked-on-equipment-context | - | | Zero grounding. Same faq.ts streaming-recording contradiction as row 16/29 - confirms the predicted follow-up from the Camera rental analysis. |
| 36 | Green screen rental | blocked-on-equipment-context | - | | Zero grounding, photo-video-adjacent, deferred rather than foreclosed. |
| 37 | Live event production | duplicate | audiovisual-equipment-rental-service | | Overlaps pillar + rows 30/31. Real local competitors market full-service production (decor, artistic booking) beyond MEG's scope. |
| 38 | Event staging services | duplicate | audiovisual-equipment-rental-service | | Same coverage as row 27. |
| 39 | Wireless presentation system rental | blocked-on-equipment-context | - | | Site surfaces for this query without a dedicated page, but every connectivity mention is wired-only (HDMI/USB-C) - no wireless screen-share product grounded yet. |
| 40 | Podcasting equipment rental | conflict | - | | sound-system-rental.svx FAQ: explicit "No, we don't stock recording or podcasting style audio interfaces." |
| 41 | Lecture capture system rental | blocked-on-equipment-context | - | | Zero grounding, same photo-video-adjacent territory as green screen. |
| 42 | Stage monitor rental | blocked-on-equipment-context | - | | Zero grounding, zero mentions anywhere in the blog corpus. |
| 43 | Tour guide system rental | conflict | - | | Same wireless headset hardware category as the already-denied interpretation equipment. |
| 44 | AV installation services | duplicate | do-you-offer-delivery-and-setup-for-sound-equipment-in-malaga-spain | | Resolves the prior `risk` flag: SERP confirms local intent = rental+setup bundle, already covered by 2 existing delivery/setup posts. |

---

## Category: Audiovisual equipment rental service

Pillar: `audiovisual-equipment-rental-service` — **published 2026-07-31**, positioned as "specialized and niche AV equipment" (laser projector tier, RGBW/moving head lighting, wireless/gooseneck mics, 60 inch LED display, fog/haze/confetti effects) with an explicit "What We Don't Offer" section, per content-gap analysis (engram `content-gap/malagaeventgear.com/audiovisual-equipment-rental-service`, obs #2423). NOT a 19-item service index — see per-row resolution below.

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Podium microphone rental | duplicate | sound-system-rental | 1 | Already covered: sound-system-rental.svx lists the gooseneck/podium mic as real package inventory. No separate page. |
| 2 | Headset microphone rental | declared | audiovisual-equipment-rental-service | 1 | Contradicts sound-system-rental.svx FAQ. Now explicitly declared out of scope on the pillar's "What We Don't Offer" section and FAQ. No separate page. |
| 3 | Laser projector rental | duplicate | projector-rental | 1 | Already covered: projector-rental.svx FAQ "Do you offer 4K or laser projectors?" covers the 5000 lumen laser tier. Also covered at pillar level. No separate page. |
| 4 | Up-lighting rental | declared | audiovisual-equipment-rental-service | 1 | Contradicts lighting-ideas-for-wedding-rentals.svx. Now explicitly declared out of scope on the pillar's FAQ. No separate page. |
| 5 | Walkie talkie rental | declared | audiovisual-equipment-rental-service | 1 | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 6 | Pipe and drape rental | declared | audiovisual-equipment-rental-service | 1 | Contradicts unique-wedding-ceremony-rentals.svx and audio-visual-rental-for-press-conferences.svx. Now explicitly declared out of scope on the pillar. No separate page. |
| 7 | Event backdrop rental | declared | audiovisual-equipment-rental-service | 1 | Same as #6, same pillar declaration. |
| 8 | Holiday lighting rental | no-grounding | - | 1 | Zero presence in catalog. Not explicitly named on the pillar (only the 5 most-searched "no" items got a named bullet) - still open if this keyword matters enough to add. |
| 9 | Camera crane rental | declared | audiovisual-equipment-rental-service | 1 | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 10 | Flat screen TV rental | duplicate | tv-screen-rental | 1 | Same product as tv-screen-rental.svx's 60 inch LED display. Also covered at pillar level. No separate page. |
| 11 | Silent disco equipment rental | declared | audiovisual-equipment-rental-service | 1 | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 12 | Stage effects equipment rental | covered | audiovisual-equipment-rental-service | 1 | Real grounding (fog/haze/confetti per equipment page) now covered in the pillar's "Special Effects: Fog, Haze and Confetti" section, honest about which items have a published price. No separate page needed. |
| 13 | Mixing console rental | declared | audiovisual-equipment-rental-service | 1 | Contradicts sound-system-rental.svx FAQ. Now explicitly declared out of scope on the pillar's FAQ. No separate page. |
| 14 | Large screen rental | duplicate | tv-screen-rental | 1 | Same product as tv-screen-rental.svx. |
| 15 | Monitor rental | duplicate | tv-screen-rental | 1 | Same product as tv-screen-rental.svx (display monitor rental already folded in there too). |
| 16 | Tripod rental | declared | audiovisual-equipment-rental-service | | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 17 | Laptop rental for events | declared | audiovisual-equipment-rental-service | | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 18 | AV cable rental | no-grounding | - | | No standalone cable rental SKU. Not explicitly named on the pillar - still open if this keyword matters enough to add. |
| 19 | Interpretation equipment rental | declared | audiovisual-equipment-rental-service | | Contradicts audio-visual-rental-for-religious-events.svx. Real local demand, so named explicitly (not silently omitted) in the pillar's "What We Don't Offer" section and FAQ. No separate page. |

---

## Category: Event technology service

Pillar: `event-technology-service` (new, working title "Event Technology Service in Malaga")

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Event lighting services | **ready** | event-lighting-services | 2 | Grounded in every package + equipment page; only existing coverage is wedding-specific or brief mentions. |
| 2 | Stage design and setup | **ready (thin)** | stage-design-and-setup | 2 | Only grounded as MICE Pack optional staging add-on (+35 euro/sqm) - scope to physical platforms, not scenic design. |
| 3 | Event sound system rental | duplicate | sound-system-rental | | Already exists. |
| 4 | LED video wall rental | conflict | - | | tv-screen-rental.svx: "single 60 inch flat panel, not a modular tiled video wall." |
| 5 | Event registration technology | no-fit | - | | Software/SaaS. |
| 6 | Live event streaming | conflict | - | | virtual-events.svx rules out "cameras, streaming encoders or a recording service," but faq.ts "streaming-recording" entry contradicts this - business-fact decision needed. |
| 7 | Interactive event apps | no-fit | - | | Software/app dev. |
| 8 | Virtual event platform | no-fit | - | | Hosted software product, distinct from MEG's AV-for-remote-speaker angle. |
| 9 | Event wifi solutions | conflict | - | | Two posts explicitly: "internet and wifi are not part of our packages." |
| 10 | RFID attendee tracking | no-fit | - | | Wrong business type. |
| 11 | Hybrid event technology | duplicate | audio-visual-rental-for-virtual-events | | Already covers "virtual AND hybrid." |
| 12 | Event badge printing | no-fit | - | | Software/hardware, wrong business type. |
| 13 | Event audience response systems | conflict | - | | Explicitly "not part of our catalog." |
| 14 | Event live polling services | conflict | - | | Same exclusion, same source. |
| 15 | Simultaneous translation services | conflict | - | | Explicitly "not something we stock" (2 posts). |
| 16 | Event projection mapping | conflict | - | | Explicitly "don't include facade projection or outdoor mapping." |
| 17 | Webcasting services | conflict | - | | Same as row 6 - contradicts faq.ts streaming-recording entry. |
| 18 | Touchscreen kiosk rental | conflict | - | | Same post rules out "interactive touch screens" in the same paragraph as audience response. |
| 19 | Event ticketing solutions | no-fit | - | | Software/SaaS. |
| 20 | Photo booth rental | no-fit | - | | Confirmed exclusion (photo/video). Minor live nit: a stray table row in one post lists "Photo Booths" - not resolved here. |
| 21 | Live event recording | conflict | - | | Same as row 6 - contradicts faq.ts streaming-recording entry. |
| 22 | Conference call solutions | no-fit | - | | Audio-only telephony/bridge product, no grounding. |
| 23 | Video conferencing for events | duplicate | audio-visual-rental-for-remote-presentations / audio-visual-rental-for-virtual-events | | Already covered with a dedicated FAQ. |
| 24 | Event networking platforms | no-fit | - | | Software/SaaS. |
| 25 | Mobile event guides | no-fit | - | | Software/app. |
| 26 | Event lead retrieval systems | no-fit | - | | Software/hardware, wrong business type. |
| 27 | Event management software | no-fit | - | | Explicit software. |
| 28 | Event check-in solutions | no-fit | - | | Software/hardware. |
| 29 | Event analytics and reporting | no-fit | - | | Software. |
| 30 | Breakout session tech support | duplicate | audio-visual-rental-for-conferences | | Already has a full dedicated section. |
| 31 | Live captioning services | no-fit | - | | Software/AI speech-to-text. |
| 32 | Remote interpreting for events | no-fit | - | | Cloud RSI software platform, compounds row 15's exclusion. |
| 33 | Social media event displays | no-fit | - | | Core value is software feed aggregation, not the screen. |
| 34 | Audience engagement platforms | no-fit | - | | Software/SaaS. |
| 35 | Event live chat solutions | no-fit | - | | Software. |
| 36 | Event gamification technology | no-fit | - | | Software/SaaS. |
| 37 | Event technical support | **ready** | technical-support-for-events | 2 | HOST for the "on-site coverage/service" angle (page 2 of the technician/support cluster, decided 2026-07-31). Absorbs row 46 and category 1 row 31 as synonym phrases/FAQ, not separate pages. |
| 38 | Event livestream integration | conflict | - | | Same as row 6 - contradicts faq.ts streaming-recording entry. |
| 39 | Speaker management software | no-fit | - | | Explicit software exclusion. |
| 40 | Event mobile app development | no-fit | - | | Explicitly out of business scope. |
| 41 | Event AR/VR solutions | no-fit | - | | Software/tech platform. |
| 42 | Digital event swag delivery | no-fit | - | | Digital marketing service, not AV at all. |
| 43 | Event networking matchmaking | no-fit | - | | Software/SaaS. |
| 44 | Event drone filming | no-fit | - | | Confirmed exclusion (photo/video). |
| 45 | Sponsor activation tech | no-fit | - | | Dominated by software-heavy interactive booth/AR/social-wall tech. |
| 46 | Onsite tech support for events | duplicate | technical-support-for-events | 2 | Folds into technical-support-for-events.svx (page 2 of the cluster) as a synonym phrase, not its own page. |

---

## Category: Audio visual equipment supplier

Pillar: `audio-visual-equipment-supplier` (new, working title "Audio Visual Equipment Supplier in Malaga")

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | AV equipment installation | no-fit | - | | fixed.md splits event-setup install (primary category) from permanent install (here); zero grounding. |
| 2 | Sound system installation | no-fit | - | | Permanent-install version; event angle owned by sound-system-rental.svx. |
| 3 | Conference room AV solutions | no-fit | - | | Reads as fixed system integration; event angle owned by audio-visual-rental-for-conferences.svx. |
| 4 | Audio equipment sales | no-fit | - | | Delivery-only rental, zero grounding, wrong company type. |
| 5 | Visual display solutions | no-fit | - | | Permanent display/signage design, zero grounding. |
| 6 | Interactive whiteboard installation | no-fit | - | | Whiteboards never appear in the catalog at all. |
| 7 | Digital signage installation | no-fit | - | | Permanent install, zero grounding. |
| 8 | Digital signage rental | duplicate | tv-screen-rental | | tv-screen-rental.svx covers the lobby/reception signage use case already. |
| 9 | Speaker system setup | duplicate | sound-system-rental | | sound-system-rental.svx + package copy already cover this. |
| 10 | AV equipment repairs | no-fit | - | | Delivery-only model, wrong company type (repair shop). |
| 11 | AV system maintenance | no-fit | - | | No permanent systems to maintain. |
| 12 | Hybrid meeting solutions | duplicate | audio-visual-rental-for-virtual-events / tv-screen-rental | | Already covered. |
| 13 | Boardroom AV setup | duplicate | audio-visual-rental-for-corporate-meetings | | Already a dedicated post on exactly this. |
| 14 | Classroom AV solutions | no-fit | - | | Zero grounding, zero "classroom" mentions in 68 posts. |
| 15 | AV system integration | no-fit | - | | Crestron-style integrator service, wrong company type. |
| 16 | Broadcast equipment rental | conflict | - | | 4+ posts explicitly say "no broadcast equipment." |
| 17 | Soundproofing solutions | no-fit | - | | Acoustic construction trade, wrong company type. |
| 18 | Lighting control systems | no-fit | - | | Reads as permanent DMX/building control; equipment-page phrase is marketing copy only. |
| 19 | AV cabling services | no-fit | - | | Only bundled event "aesthetic cabling" exists, not a standalone install service. |
| 20 | Professional audio rigging | blocked-on-equipment-context | - | | Zero grounding (no truss anywhere), plausible future addition. |
| 21 | Interpreter audio systems | conflict | - | | Explicitly ruled out twice; contradicts faq.ts "translation-voting" entry. |
| 22 | Simultaneous translation equipment | conflict | - | | Same as row 21. |
| 23 | Sound engineering services | duplicate | audio-visual-rental-for-weddings / sound-system-rental | | On-site technician "engineering support" already covered. |
| 24 | Hearing loop systems | blocked-on-equipment-context | - | | Zero grounding, not ruled out, plausible addition. |
| 25 | Corporate event AV | duplicate | audio-visual-rental-for-corporate-events / audio-visual-rental-for-corporate-meetings | | Confirms the prior cannibalization flag - resolved as duplicate, not a new page. |
| 26 | Video editing equipment rental | no-fit | - | | No video/photo scope at all, further out than camera rental itself. |
| 27 | AV equipment leasing | no-fit | - | | Long-term B2B financing model, not MEG's short-term rental. |
| 28 | Custom AV solutions | no-fit | - | | Bespoke systems-integration framing, zero distinct grounding. |
| 29 | Event recording services | conflict | - | | Explicitly ruled out; contradicts faq.ts "streaming-recording" entry. |
| 30 | Television rental | duplicate | tv-screen-rental | | Already a dedicated live post. |
| 31 | Presentation equipment rental | duplicate | projector-rental / tv-screen-rental | | Product Presentation Pack + both posts already cover this. |
| 32 | Assistive listening devices | blocked-on-equipment-context | - | | Same as row 24. |
| 33 | Multi-room audio solutions | no-fit | - | | Only "multi-room" mention is booking 2 separate packages, not a zoned system. |
| 34 | Wireless presentation systems | blocked-on-equipment-context | wireless-presentation-systems-supply | | Product Presentation pack uses wired HDMI/USB-C adapters only. Slug intentionally distinct from wireless-presentation-system-rental (primary category, also blocked) to avoid collision if both get documented later. |
| 35 | Mobile AV solutions | duplicate | audio-visual-rental | | Delivery-only model already IS "mobile AV," core messaging everywhere. |
| 36 | Audio booth rental | conflict | - | | Both plausible readings (interpretation/recording booth) already ruled out. |
| 37 | Training on AV equipment | no-fit | - | | Means teaching people to use gear, distinct from -training-sessions.svx (AV rental FOR training events). |
| 38 | Video recording equipment rental | conflict | - | | Matches the Camera rental finding (row 16, primary category): zero grounding, 7 posts say no cameras. |
| 39 | Video camera rental | conflict | - | | Identical to row 38 / Camera rental: zero grounding, 7 posts say no cameras. Do not build. |

---

## Category: Audio visual consultant

Pillar: `audio-visual-consultant` (new, working title "Audio Visual Consultant in Malaga")

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Audio visual system design | no-fit | - | | Umbrella systems-design consulting term, zero grounding, MEG is delivery-only per-event rental. |
| 2 | Smart home integration | no-fit | - | | Zero grounding, residential smart-home is a different business entirely. |
| 3 | Commercial AV solutions | no-fit | - | | Implies permanent office/commercial AV infra design; real corporate-event work already lives elsewhere. |
| 4 | AV system troubleshooting | **ready** | av-system-troubleshooting | 2 | On-site live technician troubleshooting grounded across 5 posts (case studies + how-to guides). |
| 5 | Video conferencing systems | conflict | - | | audio-visual-rental-for-corporate-meetings.svx: "we do not provide video conferencing hardware." |
| 6 | Audio system calibration | **ready** | audio-system-calibration | 2 | "Pre-event calibration of sound and video networks" etc. grounded in 4 posts, no dedicated page. |
| 7 | PA system setup | duplicate | sound-system-rental | | Core subject of sound-system-rental.svx and every package already. |
| 8 | AV project management | no-fit | - | | Zero grounding, implies multi-week integration PM, not single-day delivery model. |
| 9 | Multi-room audio setup | no-fit | - | | Only hit is separate plenary+breakout day-parts, not synced multi-zone audio distribution. |
| 10 | Wireless microphone setup | duplicate | sound-system-rental | | Covered in 42/68 blog files as a core deliverable. |
| 11 | AV control system programming | conflict | - | | Same "no control system" statement (corporate-meetings.svx). |
| 12 | Video wall installation | conflict | - | | tv-screen-rental.svx / audiovisual-equipment-rental-service.svx: "Do you rent a video wall or LED wall? No." |
| 13 | Projection system installation | duplicate | projector-rental | | Already thoroughly covers this. |
| 14 | Sound masking systems | no-fit | - | | Zero grounding, permanent office noise-masking infra. |
| 15 | Live event AV support | duplicate | audio-visual-rental | | Essentially the whole business model already, pervasive. |
| 16 | AV equipment consultations | **ready** | av-equipment-consultations | 2 | Real quote-stage package-matching practice exists, no dedicated post. |
| 17 | Lighting control integration | **ready** | lighting-control-integration | 2 | Real inventory confirmed ("moving head fixtures and control systems," quote-only) but only a passing mention. |
| 18 | Zoom room setup | conflict | - | | Same "no video conferencing hardware" statement; Zoom Room is dedicated conferencing hardware. |
| 19 | Audio conferencing solutions | duplicate | audio-visual-rental-for-remote-presentations | | Already covers the real narrow angle. |
| 20 | Acoustic panel installation | no-fit | - | | Zero grounding, permanent wall/ceiling treatment, construction work. |
| 21 | Unified communications setups | no-fit | - | | Zero grounding, enterprise telephony/UC is IT/telecom scope. |
| 22 | Surround sound installation | no-fit | - | | Zero grounding, permanent home/cinema install. |
| 23 | Interactive whiteboard setup | conflict | - | | audio-visual-rental-for-religious-events.svx: "we do not provide... interactive touch screens." |
| 24 | Video distribution systems | no-fit | - | | Zero grounding, AV-over-IP/matrix distribution is systems-integrator work. |
| 25 | Boardroom AV design | duplicate | audio-visual-rental-for-corporate-meetings | | Dedicated post on exactly this. |
| 26 | Broadcast system design | conflict | - | | 3 posts explicitly: "we do not provide cameras, broadcast feeds/equipment." |
| 27 | Networked AV solutions | no-fit | - | | Zero grounding, AV-over-IP network design is systems-integrator territory. |
| 28 | Crestron system programming | conflict | - | | Zero grounding plus the "no control system" statement; different profession entirely. |
| 29 | Remote AV support | no-fit | - | | Zero grounding, IT-style remote troubleshooting doesn't match the on-site delivery model. |
| 30 | Integrated control systems | conflict | - | | Same "no control system" statement. |
| 31 | Video streaming setup | conflict | - | | 3 posts explicitly deny "a live streaming feed"/"streaming equipment"; contradicts faq.ts streaming-recording entry. |
| 32 | Satellite TV integration | no-fit | - | | Zero grounding, different trade (permanent TV/satellite install). |
| 33 | Huddle room AV solutions | conflict | - | | Same family as rows 5/18, covered by "no video conferencing hardware." |
| 34 | Stage lighting installation | duplicate | stage-lighting-rental | | Resolved 2026-07-31: MEG's model bundles delivery+install+test+collect into every rental (no permanent-install business line exists anywhere on the site), so "installation" isn't a distinct angle from "rental" here the way it might be for a systems-integrator. Folds into category 6's stage-lighting-rental.svx rather than becoming its own page. |
| 35 | Digital classroom solutions | no-fit | - | | Zero grounding, K-12/university classroom AV integration out of scope. |
| 36 | AV system upgrades | no-fit | - | | No real grounding (hits are unrelated wedding-trend content); implies upgrading a client's own permanent system. |
| 37 | AV system training | no-fit | - | | "Training" hits are all about renting equipment FOR training events, not teaching staff to run their own AV. |
| 38 | Sound reinforcement systems | duplicate | sound-system-rental | | Heavily covered already (10 files). |
| 39 | Projection mapping services | conflict | - | | audiovisual-equipment-rental-service.svx: "don't include facade projection or outdoor mapping." |
| 40 | AV cable management | **ready** | av-cable-management | 2 | Real grounding ("modular cable management," "aesthetic cabling," "cable concealment") but never a dedicated post. |
| 41 | Virtual event AV support | duplicate | audio-visual-rental-for-virtual-events / audio-visual-rental-for-remote-presentations | | Already 2 dedicated posts; touches the streaming-recording FAQ contradiction too. |
| 42 | Building-wide AV integration | no-fit | - | | Zero grounding, whole-building permanent integration is systems-integrator work. |
| 43 | Hospitality AV solutions | **ready** | hospitality-av-solutions | 2 | Hotel venues mentioned across many posts, MEG already delivers there, but no dedicated angle exists. |
| 44 | Video production consulting | conflict | - | | 3 posts explicitly deny cameras/video recording; also touches the streaming-recording FAQ contradiction. |
| 45 | Interactive display installation | conflict | - | | Same "no interactive touch screens"/"no video wall" statements; permanent "installation" framing also doesn't fit. |

---

## Category: Stage lighting equipment supplier

Pillar: `stage-lighting-equipment-supplier` (new, working title "Stage Lighting Equipment Supplier in Malaga")

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Stage lighting rental | **ready** | stage-lighting-rental | 2 | Broadest, natural host page for this category (RGBW/moving head/fairy lights all real). |
| 2 | Concert lighting design | no-fit | - | | Design/consultation service, not per-event rental. |
| 3 | Theatrical lighting installation | no-fit | - | | Permanent theatre install, wrong company type. |
| 4 | Event lighting equipment | duplicate | audiovisual-equipment-rental-service | | Already covered at pillar level. |
| 5 | LED stage lighting | duplicate | audiovisual-equipment-rental-service | | Same RGBW/moving head coverage. |
| 6 | Moving head lights | **ready** | moving-head-lights | 2 | Distinct real SKU (Beam/Spot moving heads), underexplored depth beyond the pillar's summary mention. |
| 7 | DMX lighting controllers | blocked-on-equipment-context | - | | Zero current grounding, plausible real gear. |
| 8 | Stage spotlight rental | duplicate | audiovisual-equipment-rental-service | | RGBW spotlight coverage already exists. |
| 9 | Intelligent lighting systems | duplicate | audiovisual-equipment-rental-service | | Industry synonym for moving head - same product. |
| 10 | Lighting truss systems | conflict | - | | "We do not stock truss as a separate rental item." |
| 11 | Stage effects lighting | duplicate | audiovisual-equipment-rental-service | | Covered in the pillar's Special Effects section. |
| 12 | Stage lighting repair | no-fit | - | | Repair shop model, wrong company type. |
| 13 | Stage lighting consultation | no-fit | - | | Design consultation, not per-event rental. |
| 14 | Stage dimmer packs | blocked-on-equipment-context | - | | Zero current grounding, plausible real gear. |
| 15 | Stage flood lights | duplicate | audiovisual-equipment-rental-service | | Wash/flood confirmed as industry-synonymous with RGBW spotlight coverage. |
| 16 | Stage wash lighting | duplicate | audiovisual-equipment-rental-service | | Same synonym collapse as row 15. |
| 17 | Stage uplighting | conflict | - | | "Not offered as a freestanding fixture" (lighting-ideas-for-wedding-rentals.svx + pillar). |
| 18 | Wireless stage lighting | conflict | - | | Confirmed via research: rental-market term for battery uplighting, same rejected fixture as row 17. |
| 19 | Stage lighting for weddings | **ready** | stage-lighting-for-weddings | 2 | Pre-flagged risk, real grounding. Write as a dedicated page and down-link lighting-ideas-for-wedding-rentals.svx into it, mirroring the existing wedding-rentals silo pillar-downlink convention. |
| 20 | Sound and lighting packages | **ready** | sound-and-lighting-packages | 2 | Real - Eco/Wedding/MICE ARE sound+lighting bundles - and no existing post targets this exact phrase. |
| 21 | Stage lighting programming | no-fit | - | | Programming/design service, not per-event rental. |
| 22 | Laser lighting systems | conflict | - | | Distinct from the real laser PROJECTOR tier - don't conflate. Laser light shows explicitly declined. |
| 23 | Follow spotlights | blocked-on-equipment-context | - | | Zero current grounding, plausible real gear. |
| 24 | Stage cold spark machines | blocked-on-equipment-context | - | | Zero current grounding, plausible real gear (adjacent to confirmed confetti/hazers). |
| 25 | Club lighting equipment | no-fit | - | | Nightclub install market, wrong company type. |
| 26 | Stage lighting rigging | conflict | - | | Depends on the already-rejected truss (row 10). |
| 27 | Stage lighting design services | no-fit | - | | Design/consultation, not per-event rental. |
| 28 | Stage lighting fixtures | duplicate | audiovisual-equipment-rental-service | | Generic umbrella for the same real inventory. |
| 29 | Special effects lighting | duplicate | audiovisual-equipment-rental-service | | Covered in the pillar's Special Effects section. |
| 30 | Theatre lighting supplies | no-fit | - | | Sales/supply model, wrong company type. |
| 31 | Fog machines | duplicate | audiovisual-equipment-rental-service | | Already covered (20 euro Eco Pack add-on). |
| 32 | LED par cans | duplicate | audiovisual-equipment-rental-service | | Generic fixture type, same RGBW/moving-head coverage. |
| 33 | Stage lighting sales | no-fit | - | | Sales model, wrong company type. |
| 34 | Stage lighting training | no-fit | - | | Training service, wrong company type. |
| 35 | Stage lighting accessories | no-fit | - | | Sales/accessories model, wrong company type. |
| 36 | Stage production lighting | duplicate | audiovisual-equipment-rental-service | | Generic umbrella for the same real inventory. |
| 37 | Touring lighting systems | no-fit | - | | Touring production company model, wrong company type. |
| 38 | Stage lighting system upgrades | no-fit | - | | Implies upgrading a client's own permanent system. |
| 39 | Stage backdrop lighting | conflict | - | | Depends on rejected uplighting (row 17) + "not a decor provider" stance (no backdrops). |
| 40 | Custom stage lighting | no-fit | - | | Bespoke design service, wrong company type. |
| 41 | Strobe lighting rental | blocked-on-equipment-context | - | | Zero current grounding, plausible real gear. |
| 42 | Stage blacklights | blocked-on-equipment-context | - | | Zero current grounding, plausible real gear. |
| 43 | Automated lighting fixtures | duplicate | audiovisual-equipment-rental-service | | Industry synonym for moving head - same product. |
| 44 | Stage lighting maintenance | no-fit | - | | Maintenance/repair model, wrong company type. |
| 45 | Outdoor event lighting | **ready** | outdoor-event-lighting | 2 | Pre-flagged risk, real grounding. Must stay strictly equipment/technical (lighting rigs for outdoor stages), not event-type, to avoid blurring with the 3 existing outdoor-event-type posts. |
| 46 | Stage lighting control software | no-fit | - | | Software product, wrong company type. |
| 47 | Portable stage lighting | duplicate | audiovisual-equipment-rental-service | | MEG's whole model is delivery/portable by default - same real inventory. |
| 48 | Stage lighting for TV production | no-fit | - | | Photo/video-adjacent, confirmed exclusion on that basis specifically. |
| 49 | Stage haze machines | duplicate | audiovisual-equipment-rental-service | | Hazers already covered in the pillar's Special Effects section. |
| 50 | Stage lighting cables | blocked-on-equipment-context | - | | Same pattern as the open "AV cable rental" item in category 2 - only bundled cabling exists, no standalone lighting-cable SKU documented yet. |
| 51 | Lighting equipment supplier | duplicate | audiovisual-equipment-rental-service | | Generic catch-all, same real inventory the pillar already covers. |

---

## Summary

| Category | Pillar slug | Total | Ready | Covered | Declared | Duplicate | Conflict | No-fit | Blocked-on-equipment |
| -------- | ----------- | ----- | ----- | ------- | -------- | --------- | -------- | ------ | --------------------- |
| Audio visual equipment hire service (primary) | audio-visual-rental (existing) | 44 | 1 | 15 | 2 | 7 | 7 | 0 | 12 |
| Audiovisual equipment rental service | audiovisual-equipment-rental-service (published 2026-07-31) | 19 | 0 | 1 | 11 | 5 | 0 | 0 | 2 (as no-grounding) |
| Event technology service | event-technology-service (not yet written) | 46 | 3 | 0 | 0 | 5 | 11 | 27 | 0 |
| Audio visual equipment supplier | audio-visual-equipment-supplier (not yet written) | 39 | 0 | 0 | 0 | 9 | 7 | 19 | 4 |
| Audio visual consultant | audio-visual-consultant (not yet written) | 45 | 6 | 0 | 0 | 9 | 13 | 17 | 0 |
| Stage lighting equipment supplier | stage-lighting-equipment-supplier (not yet written) | 51 | 5 | 0 | 0 | 16 | 6 | 17 | 7 |
| **Total** | | **244** | **15** | **16** | **13** | **51** | **44** | **80** | **25** |

**Full triage done 2026-07-31** (all 6 categories checked against the live site for conflict/duplicate/no-fit patterns, engram topic_keys `content-gap/malagaeventgear.com/category{1-remaining,3,4,5,6}-triage`). Headline: **80 of 244 services (33%) are `no-fit`** - not physical AV equipment for a per-event rental company at all (software/SaaS event-tech, permanent installation/systems-integration, sales/repair/training, photo-video). **15 services are `ready` to actually draft** as **13 real new supporting posts** (2 pairs consolidated per the decisions below), per the user's explicit direction to build the silo out, not just declare things out of scope:

- Category 1: row 30 AV technician hire (host, page 1 of the technician/support cluster)
- Category 3: row 1 Event lighting services, row 2 Stage design and setup (thin), row 37 Event technical support / technical-support-for-events (host, page 2 of the technician/support cluster, absorbs category 1 row 31 and category 3 row 46 as synonyms)
- Category 5: row 4 AV system troubleshooting, row 6 Audio system calibration, row 16 AV equipment consultations, row 17 Lighting control integration, row 40 AV cable management, row 43 Hospitality AV solutions
- Category 6: row 1 Stage lighting rental (absorbs category 5 row 34 "Stage lighting installation" as a duplicate), row 6 Moving head lights, row 19 Stage lighting for weddings, row 20 Sound and lighting packages, row 45 Outdoor event lighting

**Cross-category decisions resolved 2026-07-31:**
1. **Technician/support cluster**: user chose 2 pages. `av-technician-hire.svx` (category 1 row 30) owns the "hiring the person" angle. `technical-support-for-events.svx` (category 3 row 37) owns the "on-site coverage/service" angle and absorbs category 1 row 31 and category 3 row 46 as synonym phrases/FAQ entries, not separate pages.
2. **Stage lighting installation vs rental**: resolved as a duplicate, not two pages. MEG's model bundles delivery+install+test+collect into every rental (confirmed: no permanent-install business line exists anywhere on the site), so "installation" isn't a distinct angle here. Category 5 row 34 folds into category 6's `stage-lighting-rental.svx`.

**3 live business-fact contradictions found in `src/lib/data/faq.ts`, not resolved (user's call, deferred pending an equipment-context update):**
1. `streaming-recording` entry (line ~218): claims MEG offers live streaming, multi-camera recording, video production - contradicted by 7+ live blog posts.
2. `translation-voting` entry (line ~231): claims MEG offers simultaneous translation and interactive voting/video wall setups - contradicted by `audiovisual-equipment-rental-service.svx` and `audio-visual-rental-for-religious-events.svx`.
3. `what-is-meg` entry: contributes to the same pattern per category 5's triage, not yet isolated to an exact line.

**Category 2 outcome (2026-07-31, superseded reasoning below):** wrote the pillar `audiovisual-equipment-rental-service.svx` positioned as "specialized/niche equipment" with an explicit "What We Don't Offer" section covering 11 of the 19 services by name. 5 services were true duplicates of existing primary-silo posts. Only 2 (holiday lighting, standalone AV cable) remain open pending equipment-context updates.
