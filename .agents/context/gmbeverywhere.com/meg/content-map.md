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
| 16 | Camera rental | no-fit | - | | UPDATED 2026-08-04 (was blocked-on-equipment-context, stale label - the row's own note already said "do not draft"): RE-CONFIRMED closed 2026-07-31 (see "Camera/video equipment history" note below), and confirmed again today - zero mentions of "camera" anywhere in Equipamiento.csv. 7 live posts correctly state MEG doesn't offer cameras; the "event-rental angle" hypothesis didn't survive SERP research either (real intent is professional cinema/broadcast hire, outside business scope). Do not draft. |
| 17 | Video equipment rental | no-fit | - | | UPDATED 2026-08-04 (was blocked-on-equipment-context, stale label): same resolution as row 16 - closed, not offered. |
| 18 | DJ equipment rental | conflict | - | | music-performances.svx: DJ "brings their own mixing gear" - MEG only supplies PA+mic+lighting around them. |
| 19 | Conference AV rental | duplicate | audio-visual-rental-for-conferences | | Already owned by audio-visual-rental-for-conferences.svx. |
| 20 | Event AV equipment rental | duplicate | audio-visual-rental / audiovisual-equipment-rental-service | | Generic umbrella synonym of the two pillars. |
| 21 | Video conferencing equipment rental | conflict | - | | remote-presentations.svx and virtual-events.svx explicitly deny cameras/webcams/streaming equipment, the core hardware here. |
| 22 | Interactive whiteboard rental | no-fit | - | | RESOLVED 2026-08-04: business confirmed directly - MEG does not offer interactive whiteboards. |
| 23 | Interactive display rental | no-fit | - | | RESOLVED 2026-08-04: business confirmed directly - MEG does not offer interactive displays, distinct from the non-interactive 60 inch LED display MEG stocks. |
| 24 | Tablet rental | conflict | - | | projector-rental.svx: "presenter's own laptop, tablet... not ours," repeated across 8+ posts. |
| 25 | Laptop rental | declared | audiovisual-equipment-rental-service | | RE-CONFIRMED 2026-07-31: the laptop was briefly confirmed real, then the equipment CSV was updated and the user confirmed it was retired. Named in the pillar's "What We Don't Offer" list. |
| 26 | Truss system rental | declared | audiovisual-equipment-rental-service | | "We do not stock truss as a separate rental item" already stated. |
| 27 | Stage rental / Stage hire | duplicate | audiovisual-equipment-rental-service | | Real grounding (MICE Pack staging add-on) but already has a dedicated H2 on the pillar. |
| 28 | Video switcher rental | covered | video-switcher-rental | | Published 2026-08-01. Equipment-first treatment of the real Kramer VP-731 9-input scaler, distinct from technical-support-for-events.svx's brief service-phase mention. Central guardrail: explicit, repeated disambiguation from camera/broadcast/streaming switching, which MEG does not offer. |
| 29 | Live streaming equipment rental | no-fit | - | | Resolved 2026-07-31: Equipamiento.csv confirms no streaming encoders or broadcast gear exist. Definitively not offered, not just unblocked. |
| 30 | AV technician hire | covered | av-technician-hire | 2 | Published 2026-07-31. HOST for the "hiring the person" angle (skill/role, technician-hours by package), page 1 of the 2-page technician/support cluster. |
| 31 | Technical support for events | duplicate | technical-support-for-events | 2 | Folds into technical-support-for-events.svx (page 2 of the cluster, see category 3 row 37) as a synonym phrase, not its own page. |
| 32 | Cable and connector rental | duplicate | av-cable-management | | UPDATED 2026-08-04 (was blocked-on-equipment-context, stale - av-cable-management.svx published 2026-08-02 answers this directly): no standalone cable/connector rental SKU exists, cabling is bundled per package ("aesthetic cabling" on 4 of 5 packages) with real stocked lengths documented. |
| 33 | Voting system hire | covered | audiovisual-equipment-rental-service | | RESOLVED 2026-07-31: business confirmed (Sergio, WhatsApp) MEG offers this and simultaneous interpretation, but subcontracted (no own equipment). Pillar's "What We Don't Offer" bullet and faq.ts "translation-voting" entry corrected accordingly. No dedicated page - covered as an arranged/subcontracted service note on the pillar. |
| 34 | Tripod and stand rental | conflict | - | | RE-CONFIRMED 2026-07-31: briefly reconsidered when the camera tripod looked relevant, reverted once the camera itself was confirmed retired. Tripods explicitly denied; stands only ever bundled, never standalone. |
| 35 | Recording equipment rental | duplicate | video-switcher-rental | | UPDATED 2026-08-04 (was ready, briefly; originally no-fit): no-fit re-audit found real grounding the old "zero grounding" note missed - an LG-RH7500 DVD recorder/HDD unit is real inventory, already documented in video-switcher-rental.svx as 1 of the switcher's 3 confirmed sources. But content-gap-analyst confirmed the real SERP intent behind this keyword is professional cinema/broadcast production gear (cameras, lenses, stabilizers) MEG does not offer, and both content-gap-analyst and local-content-writer independently declined to draft a standalone page (duplicates video-switcher-rental.svx with no new angle, even with an honest non-claiming framing). Resolved instead as a new FAQ entry on video-switcher-rental.svx ("Do you rent the DVD recorder, or other recording equipment, separately from the switcher?") that directly disambiguates and denies, added 2026-08-04. |
| 36 | Green screen rental | no-fit | - | | Resolved 2026-07-31: Equipamiento.csv confirms no green screen or chroma key equipment exists, in either version of the file. Definitively not offered, not just unblocked. |
| 37 | Live event production | duplicate | audiovisual-equipment-rental-service | | Overlaps pillar + rows 30/31. Real local competitors market full-service production (decor, artistic booking) beyond MEG's scope. |
| 38 | Event staging services | duplicate | audiovisual-equipment-rental-service | | Same coverage as row 27. |
| 39 | Wireless presentation system rental | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly (business's own standing rule: "brindamos lo que esta en el inventario") - zero wireless presentation product listed, every connectivity mention sitewide is wired-only (HDMI/USB-C). |
| 40 | Podcasting equipment rental | conflict | - | | sound-system-rental.svx FAQ: explicit "No, we don't stock recording or podcasting style audio interfaces." |
| 41 | Lecture capture system rental | no-fit | - | | UPDATED 2026-08-04 (was blocked-on-equipment-context): a lecture capture system is fundamentally a video/audio recording product, same family as camera/video/recording equipment rental (rows 16/17/35), already confirmed not offered. Not a distinct case. |
| 42 | Stage monitor rental | covered | stage-monitor-rental | 3 | Published 2026-08-04. Found real grounding directly in Equipamiento.csv - 8x HK Audio PR:O 10-X, 300W passive stage floor monitor wedges, listed under the ALTAVOCES PASIVOS category, powered by 2x MC2-ETAPA-T-1000 and 1x MC2-T-2000 amplifiers. Honest passive-vs-active framing, stage monitor vs PA speaker distinction, and a "stage monitor" vs "monitor TV" homonym disambiguation FAQ. Not bundled into any package, quote on request. This was the last genuinely open row in the entire 244-item content-map. |
| 43 | Tour guide system rental | conflict | - | | Same wireless headset hardware category as the already-denied interpretation equipment. |
| 44 | AV installation services | duplicate | how-audio-visual-rental-works | | Resolves the prior `risk` flag: SERP confirms local intent = rental+setup bundle. UPDATED 2026-08-04: the original target, a low-quality standalone post (do-you-offer-delivery-and-setup-for-sound-equipment-in-malaga-spain.svx), was retired with a 301 during a sitewide standalone-post cleanup - content-gap-analyst confirmed this exact intent is already fully covered by how-audio-visual-rental-works.svx, the audio-visual-rental pillar's own "Delivery, Setup and Teardown Included" section, and the public /faq/ page. |

---

## Category: Audiovisual equipment rental service

Pillar: `audiovisual-equipment-rental-service` — **published 2026-07-31**, positioned as "specialized and niche AV equipment" (laser projector tier, RGBW spotlights/specialty stage lighting/uplighting, wireless/gooseneck mics, 60 inch LED display, fog/haze/confetti effects) with an explicit "What We Don't Offer" section, per content-gap analysis (engram `content-gap/malagaeventgear.com/audiovisual-equipment-rental-service`, obs #2423). NOT a 19-item service index — see per-row resolution below. NOTE 2026-07-31: "moving head" was corrected site-wide to the real fixtures (Eurolite KLS-200 bar, ADJ Encore FRI50Z Fresnel, ADJ Element H6 Pack uplighting kit) - see the Camera/video and Iluminacion notes near the Summary table.

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Podium microphone rental | duplicate | sound-system-rental | 1 | Already covered: sound-system-rental.svx lists the gooseneck/podium mic as real package inventory. No separate page. |
| 2 | Headset microphone rental | covered | headset-lavalier-microphone-rental | 1 | Published 2026-07-31. First real supporting post for the audiovisual-equipment-rental-service pillar's orphan cluster. Grounded in 2x Audix RAD-360 lavalier sets + 1x Audix HT5 headband mic, explicitly capped at "2 simultaneous lavalier channels," no invented 3rd channel or fitness/dance vertical. |
| 3 | Laser projector rental | duplicate | projector-rental | 1 | Already covered: projector-rental.svx FAQ "Do you offer 4K or laser projectors?" covers the 5000 lumen laser tier. Also covered at pillar level. No separate page. |
| 4 | Up-lighting rental | duplicate | stage-uplighting | 1 | UPDATED 2026-08-05 (was declared/out of scope, stale): the pillar's own FAQ now says "Yes, we rent it" (wireless battery powered uplighting kit, 6 fixtures) and points to a dedicated post, stage-uplighting.svx (category 6 row 17, covered), which also gets a full wedding-specific treatment in stage-lighting-for-weddings.svx. |
| 5 | Walkie talkie rental | declared | audiovisual-equipment-rental-service | 1 | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 6 | Pipe and drape rental | declared | audiovisual-equipment-rental-service | 1 | Contradicts unique-wedding-ceremony-rentals.svx and audio-visual-rental-for-press-conferences.svx. Now explicitly declared out of scope on the pillar. No separate page. |
| 7 | Event backdrop rental | declared | audiovisual-equipment-rental-service | 1 | Same as #6, same pillar declaration. |
| 8 | Holiday lighting rental | no-fit | - | 1 | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero holiday/seasonal lighting product listed. |
| 9 | Camera crane rental | declared | audiovisual-equipment-rental-service | 1 | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 10 | Flat screen TV rental | duplicate | tv-screen-rental | 1 | Same product as tv-screen-rental.svx's 60 inch LED display. Also covered at pillar level. No separate page. |
| 11 | Silent disco equipment rental | declared | audiovisual-equipment-rental-service | 1 | Zero catalog presence. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 12 | Stage effects equipment rental | covered | audiovisual-equipment-rental-service | 1 | Real grounding (fog/haze/confetti per equipment page) now covered in the pillar's "Special Effects: Fog, Haze and Confetti" section, honest about which items have a published price. No separate page needed. |
| 13 | Mixing console rental | declared | audiovisual-equipment-rental-service | 1 | Contradicts sound-system-rental.svx FAQ. Now explicitly declared out of scope on the pillar's FAQ. No separate page. |
| 14 | Large screen rental | duplicate | tv-screen-rental | 1 | Same product as tv-screen-rental.svx. |
| 15 | Monitor rental | duplicate | tv-screen-rental | 1 | Same product as tv-screen-rental.svx (display monitor rental already folded in there too). |
| 16 | Tripod rental | declared | audiovisual-equipment-rental-service | | RE-CONFIRMED 2026-07-31: see "Camera/video equipment history" note below. Zero catalog presence once the camera confirmation was retracted. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 17 | Laptop rental for events | declared | audiovisual-equipment-rental-service | | RE-CONFIRMED 2026-07-31: see "Camera/video equipment history" note below. Zero catalog presence once the laptop confirmation was retracted. Named directly in the pillar's "What We Don't Offer" list. No separate page. |
| 18 | AV cable rental | duplicate | av-cable-management | | UPDATED 2026-08-04 (was no-grounding, stale - av-cable-management.svx published 2026-08-02 answers this directly): no standalone cable rental SKU exists, cabling is bundled per package with real stocked lengths documented. |
| 19 | Interpretation equipment rental | covered | audiovisual-equipment-rental-service | | RESOLVED 2026-07-31: business confirmed (Sergio, WhatsApp) MEG offers this, subcontracted (no own equipment). Pillar's "What We Don't Offer" section, religious-events.svx and event-technology-service.svx corrected to say "not our own equipment, but arranged via a subcontracted partner." No separate page. |

---

## Category: Event technology service

Pillar: `event-technology-service` (new, working title "Event Technology Service in Malaga")

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Event lighting services | covered | event-technology-service | 2 | Published 2026-07-31 as a dedicated H2 section on the event-technology-service pillar (RGBW spotlights + specialty stage lighting + uplighting kit, real pricing where published) - no separate page needed. |
| 2 | Stage design and setup | covered | event-technology-service | 2 | Published 2026-07-31 as a dedicated H2 section on the pillar (MICE Pack modular staging, 35 euro/sqm) - too thin for its own page, covered at pillar depth. |
| 3 | Event sound system rental | duplicate | sound-system-rental | | Already exists. |
| 4 | LED video wall rental | conflict | - | | tv-screen-rental.svx: "single 60 inch flat panel, not a modular tiled video wall." |
| 5 | Event registration technology | no-fit | - | | Software/SaaS. |
| 6 | Live event streaming | no-fit | - | | Resolved 2026-07-31: Equipamiento.csv confirms no streaming encoders or broadcast gear exist. virtual-events.svx and faq.ts now agree: no live streaming feed, though basic on site video recording is real (see category 1 row 16). |
| 7 | Interactive event apps | no-fit | - | | Software/app dev. |
| 8 | Virtual event platform | no-fit | - | | Hosted software product, distinct from MEG's AV-for-remote-speaker angle. |
| 9 | Event wifi solutions | conflict | - | | Two posts explicitly: "internet and wifi are not part of our packages." |
| 10 | RFID attendee tracking | no-fit | - | | Wrong business type. |
| 11 | Hybrid event technology | duplicate | audio-visual-rental-for-virtual-events | | Already covers "virtual AND hybrid." |
| 12 | Event badge printing | no-fit | - | | Software/hardware, wrong business type. |
| 13 | Event audience response systems | duplicate | audiovisual-equipment-rental-service | | UPDATED 2026-08-05 (was conflict, stale - predates the 2026-07-31 interpretation/voting resolution): event-technology-service.svx now states audience response/voting systems are offered as an arranged, subcontracted service, matching category 1 row 33. |
| 14 | Event live polling services | duplicate | audiovisual-equipment-rental-service | | UPDATED 2026-08-05 (was conflict, stale, same resolution as row 13): audiovisual-equipment-rental-service.svx names live polling hardware directly as part of the now-offered arranged service. |
| 15 | Simultaneous translation services | duplicate | audiovisual-equipment-rental-service | | UPDATED 2026-08-05 (was conflict, stale, same resolution as row 13): faq.ts "translation-voting" entry now confirms simultaneous translation is offered, arranged via a subcontracted partner, matching category 1 row 19. |
| 16 | Event projection mapping | conflict | - | | Explicitly "don't include facade projection or outdoor mapping." |
| 17 | Webcasting services | no-fit | - | | Same resolution as row 6 - no streaming encoders exist, faq.ts now agrees. |
| 18 | Touchscreen kiosk rental | conflict | - | | Same post rules out "interactive touch screens" in the same paragraph as audience response. |
| 19 | Event ticketing solutions | no-fit | - | | Software/SaaS. |
| 20 | Photo booth rental | no-fit | - | | Confirmed exclusion (photo/video). Minor live nit: a stray table row in one post lists "Photo Booths" - not resolved here. |
| 21 | Live event recording | conflict | - | | RE-CONFIRMED 2026-07-31: see "Camera/video equipment history" note below. Zero real grounding once the camera confirmation was retracted. |
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
| 37 | Event technical support | covered | technical-support-for-events | 2 | Published 2026-07-31. HOST for the "on-site coverage/service" angle (page 2 of the technician/support cluster). Absorbs row 46 and category 1 row 31 as synonym phrases/FAQ, not separate pages. |
| 38 | Event livestream integration | no-fit | - | | Same resolution as row 6 - no streaming encoders exist, faq.ts now agrees. |
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
| 16 | Broadcast equipment rental | no-fit | - | | Resolved 2026-07-31: Equipamiento.csv confirms no broadcast/encoder gear exists. 4+ posts correctly say no broadcast equipment; basic standalone recording is a separate, real item (see category 1 row 16). |
| 17 | Soundproofing solutions | no-fit | - | | Acoustic construction trade, wrong company type. |
| 18 | Lighting control systems | no-fit | - | | Reads as permanent DMX/building control; equipment-page phrase is marketing copy only. |
| 19 | AV cabling services | no-fit | - | | Only bundled event "aesthetic cabling" exists, not a standalone install service. |
| 20 | Professional audio rigging | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero rigging/truss product listed. |
| 21 | Interpreter audio systems | duplicate | audiovisual-equipment-rental-service | | UPDATED 2026-08-05 (was conflict, stale - this row's own old note already admitted the contradiction with faq.ts and was never reclassified): interpretation equipment is offered, arranged via a subcontracted partner, matching category 1 row 19. |
| 22 | Simultaneous translation equipment | duplicate | audiovisual-equipment-rental-service | | UPDATED 2026-08-05 (was conflict, stale, same resolution as row 21). |
| 23 | Sound engineering services | duplicate | audio-visual-rental-for-weddings / sound-system-rental | | On-site technician "engineering support" already covered. |
| 24 | Hearing loop systems | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero hearing loop/assistive listening product listed. |
| 25 | Corporate event AV | duplicate | audio-visual-rental-for-corporate-events / audio-visual-rental-for-corporate-meetings | | Confirms the prior cannibalization flag - resolved as duplicate, not a new page. |
| 26 | Video editing equipment rental | no-fit | - | | No video/photo scope at all, further out than camera rental itself. |
| 27 | AV equipment leasing | no-fit | - | | Long-term B2B financing model, not MEG's short-term rental. |
| 28 | Custom AV solutions | no-fit | - | | Bespoke systems-integration framing, zero distinct grounding. |
| 29 | Event recording services | conflict | - | | RE-CONFIRMED 2026-07-31: see "Camera/video equipment history" note below. Explicitly ruled out once the camera confirmation was retracted. |
| 30 | Television rental | duplicate | tv-screen-rental | | Already a dedicated live post. |
| 31 | Presentation equipment rental | duplicate | projector-rental / tv-screen-rental | | Product Presentation Pack + both posts already cover this. |
| 32 | Assistive listening devices | no-fit | - | | RESOLVED 2026-08-04: same as row 24 - confirmed against Equipamiento.csv directly, zero product listed. |
| 33 | Multi-room audio solutions | no-fit | - | | Only "multi-room" mention is booking 2 separate packages, not a zoned system. |
| 34 | Wireless presentation systems | no-fit | - | | RESOLVED 2026-08-04: same resolution as category 1 row 39 - confirmed against Equipamiento.csv directly, every connectivity mention sitewide is wired-only (HDMI/USB-C). |
| 35 | Mobile AV solutions | duplicate | audio-visual-rental | | Delivery-only model already IS "mobile AV," core messaging everywhere. |
| 36 | Audio booth rental | conflict | - | | Both plausible readings (interpretation/recording booth) already ruled out. |
| 37 | Training on AV equipment | no-fit | - | | Means teaching people to use gear, distinct from -training-sessions.svx (AV rental FOR training events). |
| 38 | Video recording equipment rental | conflict | - | | RE-CONFIRMED 2026-07-31: see "Camera/video equipment history" note below. Matches the Camera rental finding (row 16, primary category): zero grounding, 7 posts say no cameras. |
| 39 | Video camera rental | conflict | - | | RE-CONFIRMED 2026-07-31: identical to row 38 / Camera rental. Do not build. |

---

## Category: Audio visual consultant

Pillar: `audio-visual-consultant` (new, working title "Audio Visual Consultant in Malaga")

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Audio visual system design | no-fit | - | | Umbrella systems-design consulting term, zero grounding, MEG is delivery-only per-event rental. |
| 2 | Smart home integration | no-fit | - | | Zero grounding, residential smart-home is a different business entirely. |
| 3 | Commercial AV solutions | no-fit | - | | Implies permanent office/commercial AV infra design; real corporate-event work already lives elsewhere. |
| 4 | AV system troubleshooting | covered | av-system-troubleshooting | 2 | Published 2026-08-01, targeting `audio-visual-rental` (TARGET OVERRIDE, category 5 has no pillar yet). Deliberately took the SELF-RUN customer angle (Eco Pack, Product Presentation Pack, Basic MICE Pack without the technician add on) rather than the on-site technician angle already covered by technical-support-for-events.svx and av-technician-hire.svx, avoiding cannibalization. |
| 5 | Video conferencing systems | conflict | - | | audio-visual-rental-for-corporate-meetings.svx: "we do not provide video conferencing hardware." |
| 6 | Audio system calibration | covered | audio-system-calibration | 2 | Published 2026-08-02, targeting `audio-visual-rental` (TARGET OVERRIDE, category 5 has no pillar yet). Took the "process and why" angle (gain staging, venue acoustics) distinct from the phase narrative and self-run troubleshooting already covered by the 2 sibling posts. First page to name the Midas M32R Live + MD16 stage box. |
| 7 | PA system setup | duplicate | sound-system-rental | | Core subject of sound-system-rental.svx and every package already. |
| 8 | AV project management | no-fit | - | | Zero grounding, implies multi-week integration PM, not single-day delivery model. |
| 9 | Multi-room audio setup | no-fit | - | | Only hit is separate plenary+breakout day-parts, not synced multi-zone audio distribution. |
| 10 | Wireless microphone setup | duplicate | sound-system-rental | | Covered in 42/68 blog files as a core deliverable. |
| 11 | AV control system programming | conflict | - | | Same "no control system" statement (corporate-meetings.svx). |
| 12 | Video wall installation | conflict | - | | tv-screen-rental.svx / audiovisual-equipment-rental-service.svx: "Do you rent a video wall or LED wall? No." |
| 13 | Projection system installation | duplicate | projector-rental | | Already thoroughly covers this. |
| 14 | Sound masking systems | no-fit | - | | Zero grounding, permanent office noise-masking infra. |
| 15 | Live event AV support | duplicate | audio-visual-rental | | Essentially the whole business model already, pervasive. |
| 16 | AV equipment consultations | covered | av-equipment-consultations | 2 | Published 2026-08-02, targeting `audio-visual-rental` (TARGET OVERRIDE, category 5 has no pillar yet). The pre-booking package-matching decision, distinct from the other 4 technician-cluster posts (all about post-booking/on-site service). First page to assemble the full package-to-event decision table. |
| 17 | Lighting control integration | no-fit | - | | RESOLVED 2026-07-31: the "moving head fixtures and control systems" grounding this was based on did not survive business confirmation - the real LUMINARIA inventory (Eurolite bar with foot pedal, Fresnel, uplighting kit) has no DMX or lighting control system. "Control integration" as a keyword no longer has real grounding. |
| 18 | Zoom room setup | conflict | - | | Same "no video conferencing hardware" statement; Zoom Room is dedicated conferencing hardware. |
| 19 | Audio conferencing solutions | duplicate | audio-visual-rental-for-remote-presentations | | Already covers the real narrow angle. |
| 20 | Acoustic panel installation | no-fit | - | | Zero grounding, permanent wall/ceiling treatment, construction work. |
| 21 | Unified communications setups | no-fit | - | | Zero grounding, enterprise telephony/UC is IT/telecom scope. |
| 22 | Surround sound installation | no-fit | - | | Zero grounding, permanent home/cinema install. |
| 23 | Interactive whiteboard setup | conflict | - | | audio-visual-rental-for-religious-events.svx: "we do not provide... interactive touch screens." |
| 24 | Video distribution systems | no-fit | - | | Zero grounding, AV-over-IP/matrix distribution is systems-integrator work. |
| 25 | Boardroom AV design | duplicate | audio-visual-rental-for-corporate-meetings | | Dedicated post on exactly this. |
| 26 | Broadcast system design | no-fit | - | | Resolved 2026-07-31: no broadcast gear exists. Also a "design/consulting" framing that doesn't fit MEG's delivery-only model regardless. |
| 27 | Networked AV solutions | no-fit | - | | Zero grounding, AV-over-IP network design is systems-integrator territory. |
| 28 | Crestron system programming | conflict | - | | Zero grounding plus the "no control system" statement; different profession entirely. |
| 29 | Remote AV support | no-fit | - | | Zero grounding, IT-style remote troubleshooting doesn't match the on-site delivery model. |
| 30 | Integrated control systems | conflict | - | | Same "no control system" statement. |
| 31 | Video streaming setup | no-fit | - | | Resolved 2026-07-31: no streaming encoders exist. 3 posts and faq.ts now agree: no live streaming feed, though basic recording is real (category 1 row 16). |
| 32 | Satellite TV integration | no-fit | - | | Zero grounding, different trade (permanent TV/satellite install). |
| 33 | Huddle room AV solutions | conflict | - | | Same family as rows 5/18, covered by "no video conferencing hardware." |
| 34 | Stage lighting installation | duplicate | stage-lighting-rental | | Resolved 2026-07-31: MEG's model bundles delivery+install+test+collect into every rental (no permanent-install business line exists anywhere on the site), so "installation" isn't a distinct angle from "rental" here the way it might be for a systems-integrator. Folds into category 6's stage-lighting-rental.svx rather than becoming its own page. |
| 35 | Digital classroom solutions | no-fit | - | | Zero grounding, K-12/university classroom AV integration out of scope. |
| 36 | AV system upgrades | no-fit | - | | No real grounding (hits are unrelated wedding-trend content); implies upgrading a client's own permanent system. |
| 37 | AV system training | no-fit | - | | "Training" hits are all about renting equipment FOR training events, not teaching staff to run their own AV. |
| 38 | Sound reinforcement systems | duplicate | sound-system-rental | | Heavily covered already (10 files). |
| 39 | Projection mapping services | conflict | - | | audiovisual-equipment-rental-service.svx: "don't include facade projection or outdoor mapping." |
| 40 | AV cable management | covered | av-cable-management | 2 | Published 2026-08-02. Explains "aesthetic cabling" across the 5 packages (honest that Product Presentation Pack has no dedicated cabling line), real cable-run lengths from Equipamiento.csv (VGA 42m, video 30m, Speakon 25m, mic/power extension 20m, sub box/power strip 15m, IEC 1.5m), the honest difficult-site installation complement, and what MEG does not do (no trenching, no cable ramps). |
| 41 | Virtual event AV support | duplicate | audio-visual-rental-for-virtual-events / audio-visual-rental-for-remote-presentations | | Already 2 dedicated posts; the streaming-recording FAQ contradiction is resolved 2026-07-31 (faq.ts corrected to say no, not the reverse). |
| 42 | Building-wide AV integration | no-fit | - | | Zero grounding, whole-building permanent integration is systems-integrator work. |
| 43 | Hospitality AV solutions | no-fit | - | | RESOLVED 2026-08-03: content-gap-analyst found the literal SERP for this keyword is owned entirely by permanent-installation systems integrators (in-room casting, digital signage networks, multi-room control platforms, hotel-infrastructure/PMS integration) - the same forbidden business model as rows 42/44/45. Matching that coverage would require inventing hospitality-tech claims MEG does not offer. The underlying "hotel venues mentioned everywhere, no dedicated angle" observation is real but belongs to a different, rental-intent keyword, not this one; not draftable as scoped. |
| 44 | Video production consulting | conflict | - | | RE-CONFIRMED 2026-07-31: see "Camera/video equipment history" note below. 3 posts explicitly deny cameras/video recording, now confirmed accurate again. |
| 45 | Interactive display installation | conflict | - | | Same "no interactive touch screens"/"no video wall" statements; permanent "installation" framing also doesn't fit. |

---

## Category: Stage lighting equipment supplier

Pillar: `stage-lighting-rental` (published 2026-08-03; the category's original working title/slug `stage-lighting-equipment-supplier` was replaced by the more natural row-1 slug once drafted)

| # | Service | Status | Slug (existing or proposed) | Batch | Notes |
| - | ------- | ------ | ---------------------------- | ----- | ----- |
| 1 | Stage lighting rental | covered | stage-lighting-rental | 2 | Published 2026-08-03 as the category's own pillar (siloRole: pillar, targetPage "/"), absorbing category 5 row 34 "Stage lighting installation" as a folded-in section. Names all 5 real fixtures by brand/model (2x Eurolite LED KLS-200, ADJ Encore FRI50Z, ADJ Element H6 Pack, Eco Pack RGBW bars, Wedding Pack fairy lights), clarifies foot-pedal vs DMX control, lists what MEG does not stock. Deliberately zero outbound /blog/ links (pure sink, see silo-cycle-debt.ts note below). stage-uplighting.svx retargeted to this pillar (was a temporary override to audiovisual-equipment-rental-service.svx). |
| 2 | Concert lighting design | no-fit | - | | Design/consultation service, not per-event rental. |
| 3 | Theatrical lighting installation | no-fit | - | | Permanent theatre install, wrong company type. |
| 4 | Event lighting equipment | duplicate | audiovisual-equipment-rental-service | | Already covered at pillar level. |
| 5 | LED stage lighting | duplicate | audiovisual-equipment-rental-service | | Same RGBW/specialty stage lighting coverage. |
| 6 | Moving head lights | no-fit | - | | RESOLVED 2026-07-31: business confirmed no true moving head (DMX pan/tilt robotic) fixtures exist. The 4 real LUMINARIA items (Eurolite KLS-200 bar, ADJ Encore FRI50Z Fresnel, ADJ Element H6 Pack uplighting) are all already covered on the pillar under their real names. Do not build. |
| 7 | DMX lighting controllers | no-fit | - | | RESOLVED 2026-07-31: full LUMINARIA category reviewed with the business, no DMX controller exists (the Eurolite bar's foot pedal is not a DMX control system). |
| 8 | Stage spotlight rental | duplicate | audiovisual-equipment-rental-service | | RGBW spotlight coverage already exists. |
| 9 | Intelligent lighting systems | no-fit | - | | RESOLVED 2026-07-31: "intelligent lighting" is an industry term specifically for automated/moving fixtures, which are confirmed not real. Not a synonym for anything in the real catalog. |
| 10 | Lighting truss systems | conflict | - | | "We do not stock truss as a separate rental item." |
| 11 | Stage effects lighting | duplicate | audiovisual-equipment-rental-service | | Covered in the pillar's Special Effects section. |
| 12 | Stage lighting repair | no-fit | - | | Repair shop model, wrong company type. |
| 13 | Stage lighting consultation | no-fit | - | | Design consultation, not per-event rental. |
| 14 | Stage dimmer packs | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero dimmer pack product listed. |
| 15 | Stage flood lights | duplicate | audiovisual-equipment-rental-service | | Wash/flood confirmed as industry-synonymous with RGBW spotlight coverage. |
| 16 | Stage wash lighting | duplicate | audiovisual-equipment-rental-service | | Same synonym collapse as row 15. |
| 17 | Stage uplighting | covered | stage-uplighting | 2 | Published 2026-08-01. Second real supporting post for the audiovisual-equipment-rental-service pillar's orphan cluster (TARGET OVERRIDE, see prior note - category 6's own pillar is still not written). Grounded in the one real ADJ Element H6 Pack (6 fixtures), honest "2 to 4 venue features" coverage framing instead of a guest-count formula, no invented battery/IP/DMX specs. |
| 18 | Wireless stage lighting | duplicate | stage-uplighting | | Rental-market synonym for row 17's uplighting kit (battery/wireless), same real fixture. Fold in as an FAQ/phrase, not a second page. |
| 19 | Stage lighting for weddings | covered | stage-lighting-for-weddings | 2 | Published 2026-08-03. Organizes the 5 real fixtures by wedding moment (ceremony, cocktail hour, dance floor, band/DJ/speeches stage) rather than repeating the pillar's roster or lighting-ideas-for-wedding-rentals.svx's venue-structure angle. New: the Eurolite bar and ADJ Fresnel, previously corporate-only framed, work identically for a wedding band/DJ stage. Deliberately omits the unconfirmed MICE-staging-plus-Wedding-Pack combination. lighting-ideas-for-wedding-rentals.svx down-linked into it as planned. Outbound /blog/ links limited to its own pillar only (near-sink, avoids the 60-node debt cluster). |
| 20 | Sound and lighting packages | duplicate | stage-lighting-rental | | RESOLVED 2026-08-03: the original note's claim was wrong - checked packages.ts includeTags directly, MICE Pack has no 'lighting' tag (its visual layer is a 60-inch LED display, not stage lighting). Only Eco Pack and Wedding Pack genuinely bundle sound+lighting. A standalone post would have rehashed stage-lighting-rental.svx's existing package table, so the correction and one FAQ entry were folded into that pillar instead. |
| 21 | Stage lighting programming | no-fit | - | | Programming/design service, not per-event rental. |
| 22 | Laser lighting systems | conflict | - | | Distinct from the real laser PROJECTOR tier - don't conflate. Laser light shows explicitly declined. |
| 23 | Follow spotlights | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero follow spotlight product listed. |
| 24 | Stage cold spark machines | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero cold spark machine listed, distinct from the real confetti/hazer items. |
| 25 | Club lighting equipment | no-fit | - | | Nightclub install market, wrong company type. |
| 26 | Stage lighting rigging | conflict | - | | Depends on the already-rejected truss (row 10). |
| 27 | Stage lighting design services | no-fit | - | | Design/consultation, not per-event rental. |
| 28 | Stage lighting fixtures | duplicate | audiovisual-equipment-rental-service | | Generic umbrella for the same real inventory. |
| 29 | Special effects lighting | duplicate | audiovisual-equipment-rental-service | | Covered in the pillar's Special Effects section. |
| 30 | Theatre lighting supplies | no-fit | - | | Sales/supply model, wrong company type. |
| 31 | Fog machines | duplicate | audiovisual-equipment-rental-service | | Already covered (20 euro Eco Pack add-on). |
| 32 | LED par cans | duplicate | audiovisual-equipment-rental-service | | Generic fixture type, same RGBW/specialty stage lighting coverage. |
| 33 | Stage lighting sales | no-fit | - | | Sales model, wrong company type. |
| 34 | Stage lighting training | no-fit | - | | Training service, wrong company type. |
| 35 | Stage lighting accessories | no-fit | - | | Sales/accessories model, wrong company type. |
| 36 | Stage production lighting | duplicate | audiovisual-equipment-rental-service | | Generic umbrella for the same real inventory. |
| 37 | Touring lighting systems | no-fit | - | | Touring production company model, wrong company type. |
| 38 | Stage lighting system upgrades | no-fit | - | | Implies upgrading a client's own permanent system. |
| 39 | Stage backdrop lighting | conflict | - | | RE-CONFIRMED 2026-07-31: uplighting itself is now real (row 17), but this keyword is specifically about lighting a backdrop/decor structure, which is still out of scope on the independent "not a decor provider" stance (no backdrops, no pipe and drape). |
| 40 | Custom stage lighting | no-fit | - | | Bespoke design service, wrong company type. |
| 41 | Strobe lighting rental | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero strobe product listed. |
| 42 | Stage blacklights | no-fit | - | | RESOLVED 2026-08-04: confirmed against Equipamiento.csv directly - zero UV/blacklight product listed. |
| 43 | Automated lighting fixtures | no-fit | - | | RESOLVED 2026-07-31: "automated lighting" specifically means moving/DMX-automated fixtures, confirmed not real (see row 6 in this same category). Not a synonym for anything in the real catalog. |
| 44 | Stage lighting maintenance | no-fit | - | | Maintenance/repair model, wrong company type. |
| 45 | Outdoor event lighting | duplicate | stage-lighting-rental | | RESOLVED 2026-08-03: confirmed the pre-flagged risk was real - 3 other posts (the pillar's own prior FAQ, stage-uplighting.svx, stage-lighting-for-weddings.svx) already touched outdoor+lighting, so a 4th standalone page would be pure duplication. Genuine gap folded into the pillar instead: a fixture-by-fixture outdoor mounting/power table, 2 real inventory items never mentioned sitewide before (2000W portable electrical panel, power stabilizer), and broadening the "no IP rating confirmed" caveat from 3 specialty fixtures to all 5. |
| 46 | Stage lighting control software | no-fit | - | | Software product, wrong company type. |
| 47 | Portable stage lighting | duplicate | audiovisual-equipment-rental-service | | MEG's whole model is delivery/portable by default - same real inventory. |
| 48 | Stage lighting for TV production | no-fit | - | | Photo/video-adjacent, confirmed exclusion on that basis specifically. |
| 49 | Stage haze machines | duplicate | audiovisual-equipment-rental-service | | Hazers already covered in the pillar's Special Effects section. |
| 50 | Stage lighting cables | duplicate | av-cable-management | | UPDATED 2026-08-04 (was blocked-on-equipment-context, stale - av-cable-management.svx published 2026-08-02 answers this directly): same resolution as category 2 row 18 - only bundled cabling exists, no standalone lighting-cable SKU. |
| 51 | Lighting equipment supplier | duplicate | audiovisual-equipment-rental-service | | Generic catch-all, same real inventory the pillar already covers. |

---

## Summary

| Category | Pillar slug | Total | Ready | Covered | Declared | Duplicate | Conflict | No-fit | Blocked-on-equipment |
| -------- | ----------- | ----- | ----- | ------- | -------- | --------- | -------- | ------ | --------------------- |
| Audio visual equipment hire service (primary) | audio-visual-rental (existing) | 44 | 0 | 19 | 2 | 9 | 6 | 8 | 0 |
| Audiovisual equipment rental service | audiovisual-equipment-rental-service (published 2026-07-31) | 19 | 0 | 3 | 8 | 7 | 0 | 1 | 0 |
| Event technology service | event-technology-service (published 2026-07-31) | 46 | 0 | 3 | 0 | 8 | 5 | 30 | 0 |
| Audio visual equipment supplier | audio-visual-equipment-supplier (not yet written) | 39 | 0 | 0 | 0 | 11 | 4 | 24 | 0 |
| Audio visual consultant | audio-visual-consultant (not yet written) | 45 | 0 | 4 | 0 | 9 | 11 | 21 | 0 |
| Stage lighting equipment supplier | stage-lighting-rental (published 2026-08-03) | 51 | 0 | 3 | 0 | 18 | 4 | 26 | 0 |
| **Total** | | **244** | **0** | **32** | **10** | **62** | **30** | **110** | **0** |

**Full triage done 2026-07-31** (all 6 categories checked against the live site for conflict/duplicate/no-fit patterns, engram topic_keys `content-gap/malagaeventgear.com/category{1-remaining,3,4,5,6}-triage`). Headline: **93 of 244 services (38%) are `no-fit`** - not physical AV equipment for a per-event rental company at all (software/SaaS event-tech, permanent installation/systems-integration, sales/repair/training, photo-video, or confirmed non-offerings like streaming/broadcast gear or non-existent moving head/DMX lighting). Originally 15 services were `ready` to draft as real new supporting posts, per the user's explicit direction to build the silo out, not just declare things out of scope; the equipment re-triage added Video switcher rental (category 1 row 28), Headset/lavalier microphone rental (category 2 row 2) and Stage uplighting (category 6 row 17), and removed Moving head lights (category 6 row 6) and Lighting control integration (category 5 row 17) once "moving head" was confirmed not real - see the Iluminacion note below. **10 are now published** (av-technician-hire.svx, technical-support-for-events.svx, av-system-troubleshooting.svx, audio-system-calibration.svx and av-equipment-consultations.svx now a 5-post technician/support cluster on the primary pillar, each a genuinely distinct angle - hiring the person, phase narrative, self-run troubleshooting, calibration process and why, pre-booking package matching; headset-lavalier-microphone-rental.svx and stage-uplighting.svx as the first 2 real supporting posts for the audiovisual-equipment-rental-service pillar's orphan cluster; video-switcher-rental.svx as the primary pillar's equipment-first treatment of the Kramer VP-731; Event lighting services and Stage design and setup as dedicated H2 sections on the new event-technology-service pillar rather than separate thin pages; av-cable-management.svx as the audio-visual-consultant category's "aesthetic cabling" explainer; stage-lighting-rental.svx as category 6's own pillar, absorbing category 5 row 34; stage-lighting-for-weddings.svx as the pillar's first supporting post, moment-based rather than fixture-based). **Category 5 (Audio visual consultant) is now fully resolved - 0 ready items remain, all triaged to covered/no-fit/conflict/duplicate.** Category 6 row 20 "Sound and lighting packages" resolved as a duplicate/fold-in rather than a standalone post (corrected the original triage note's wrong MICE Pack claim in the process). **2026-08-03: row 45 "Outdoor event lighting" resolved the same way** (duplicate/fold-in into stage-lighting-rental.svx, confirming the pre-flagged duplication risk with the site's 3 other outdoor+lighting posts was real). **The entire original 15-item `ready` queue is now resolved to covered/duplicate/no-fit** (10 published as standalone or fold-in content, 5 resolved as duplicates/fold-ins without a new URL). **Summary table fully recounted 2026-08-03** (mechanical per-category status tally, `grep`-verified against every row's literal status text, not carried-forward arithmetic): found and fixed 2 pre-existing bookkeeping errors predating this session - category 1 (primary pillar) was carrying a stale `Ready: 1` with `Covered: 17` when the real tally is `Ready: 0` / `Covered: 18` (one row's status was updated at some point without the Summary being bumped); category 2 (audiovisual-equipment-rental-service) had `Covered: 2` / `Declared: 10` when the real tally is `Covered: 3` / `Declared: 9`. Categories 3, 4, 5 and 6 were independently re-verified and matched their stated counts exactly, no changes needed there. **`Ready` is now genuinely 0 across the entire document** - no open items remain anywhere in the content-map.

**Reverse-silo cycle warning for the technician/support cluster (2026-08-01/02, RESOLVED 2026-08-03):** as this cluster grew from 2 to 5 posts (av-technician-hire, technical-support-for-events, av-system-troubleshooting, audio-system-calibration, av-equipment-consultations), a new post closing a cycle in the sibling-link graph recurred 4 times, each one caught manually (3 by seo-auditor, 1 by independent link-graph mapping after a seo-auditor session-limit failure): a 3-node triangle, a 4-node ring, a subtler case where a single new reciprocal edge closed 2 cycles through pre-existing one-way links, and av-cable-management.svx's reciprocal edge with audio-visual-rental-for-outdoor-events.svx closing a triangle through a pre-existing `av-system-troubleshooting -> audio-visual-rental-for-outdoor-events` edge. **2026-08-03: both open items from this note are now closed.** (1) `src/lib/data/site-map.ts`'s `validateSiloGraph()` now detects sibling-interlinking cycles automatically (Tarjan strongly-connected-components over a `/blog/<slug>/` link graph extracted from each post's raw body via `extractBlogLinks`; a component of 3+ nodes is a violation, a reciprocal 2-node pair is the expected chain link and is not flagged). (2) The specific pre-existing 3-cycle (`av-system-troubleshooting -> technical-support-for-events -> av-technician-hire -> av-system-troubleshooting`) was fixed by stripping the one-way `av-system-troubleshooting -> technical-support-for-events` link (4 occurrences) to plain text, keeping both legitimate reciprocal pairs (`technical-support-for-events <-> av-technician-hire`, `av-system-troubleshooting <-> av-technician-hire`) intact. **New finding from turning the check on**: the real site has ONE giant pre-existing 60-node strongly-connected component spanning almost the entire primary AV cluster and the whole wedding-rentals cluster - years of loose "related articles" cross-linking that predates the chain discipline this session enforced only for newly-written posts. Remediating that is a full internal-link rewrite, explicitly out of scope for a single fix; it is baselined as known debt in `src/lib/data/silo-cycle-debt.ts` so the new guard only fails on a genuinely NEW cycle, not on this backlog. **Future cleanup candidate, not scheduled**: untangling that 60-node cluster into proper chains.

**Blocked-on-equipment-context resolution (2026-08-04, closed):** the 21-item bucket of keywords blocked pending equipment confirmation (real candidates, but the itemized inventory didn't confirm them one way or the other) was fully resolved. First, 7 rows were found carrying a stale status their own notes already contradicted (camera/recording-family rows already closed by the "Camera/video equipment history" note, and 3 cable-related rows already resolved by `av-cable-management.svx`, published 2026-08-02 after those rows were originally triaged) - reclassified to `no-fit`/`duplicate` accordingly. Of the remaining 14, resolved one at a time per the business's own standing rule ("brindamos lo que esta en el inventario" - check the real inventory before asking): 2 confirmed directly with the business (interactive whiteboard/display rental, not offered), 12 checked directly against `Equipamiento.csv`. 13 close as `no-fit` (zero grounding found). **1 promotes to `ready`**: Stage monitor rental (category 1, row 42) - found real grounding directly in the CSV, 8x HK Audio PR:O 10-X 300W passive stage floor monitor wedges under the ALTAVOCES PASIVOS category, previously mismarked "zero grounding, zero mentions." `blocked-on-equipment-context` is now 0 across the entire document. **2026-08-04: Stage monitor rental published** (`stage-monitor-rental.svx`) - closing the last genuinely open row anywhere in the content-map. All 244 GBP services across all 6 categories are now resolved: `Ready` is 0, every row is `covered`/`duplicate`/`declared`/`conflict`/`no-fit`. Nothing remains to draft under this framework unless a future `Equipamiento.csv` update introduces new real equipment.

**Standalone post cleanup (2026-08-04, closed):** all 9 posts previously tagged `siloRole: standalone` were reviewed and resolved, separate from the Core 30/GBP queue above. 6 were near-duplicate 2024-09-18 "why choose MEG" filler posts sharing one recycled template (one had a fabricated-looking testimonial not found in reviews.json); `do-you-offer-delivery-and-setup-for-sound-equipment-in-malaga-spain.svx` and `how-to-set-up-rented-audio-visual-equipment-for-outdoor-events.svx` were both ~300-600 line AI-generated legacy posts with real fabrications (invented UPS/generator equipment, LED walls contradicting the sitewide denial, USD pricing on a EUR-only site, an invented "1000+ customers" figure, several images from the confirmed camera-contaminated CDN range 1288-1306/1313). All 8 were retired with 301s (both the legacy WP root path and the live `/blog/` path, per this file's established redirect convention) rather than patched or rewritten, after content-gap-analyst (and for the outdoor post, the writer agent independently too) confirmed no genuine non-duplicative angle survived - writing them would have meant reassembling the site's own already-published facts under a new URL. One new real post, `audio-visual-rental-for-private-parties.svx`, was written to fill a genuine confirmed gap (none of MEG's 17 `audio-visual-rental-for-<event-type>` posts addressed private parties, the Eco Pack's own stated core market). The 9th standalone post, `what-renting-av-gear-in-malaga-taught-me-about-smart-business.svx`, was correctly classified and stayed standalone, but was cleaned up on the same pass (contaminated image removed, broken TOC anchors fixed, ASCII violations fixed, an inconsistent narrative voice fixed, 2 paraphrased testimonials replaced with verbatim quotes). Zero `siloRole: standalone` posts with unresolved issues remain.

**Camera/video equipment history (2026-07-31, closed - do not re-litigate without a fresh equipment-context update):** user first confirmed verbatim "El inventario esta vigente. Actualiza el contenido relacionado" - i.e. `Equipamiento.csv` (as it read at that moment) was current, real inventory, including 1 professional Sony full HD video camera, 1 Sanyo Xacty underwater camera and housing, 1 ASUS EeePC laptop, and 1 Manfrotto camera tripod. On that basis, corrections were drafted and briefly published across 7 blog posts, the `event-technology-service.svx` pillar, a new "Basic Video Recording" section on the `audiovisual-equipment-rental-service.svx` pillar, faq.ts, and this file. **Same session, the user then updated `Equipamiento.csv` again** ("las ultimas adquisiciones") and the camera, underwater camera and laptop rows came back blank. Asked directly, the user confirmed: "Se dieron de baja" (they were retired/decommissioned) - the equipment update was a removal, not an addition. All of the above content and this file were reverted back to the original "MEG does not offer cameras/video recording/laptop rental" claims, which are accurate again. **Net real changes that survived this cycle, independent of the camera/laptop finding**: the Kramer VP-731 9-input video scaler is real and unaffected (category 1 row 28, now `ready`); streaming encoders, broadcast gear and green screen equipment were confirmed to have NEVER existed in either version of the CSV, so those rows are now definitively `no-fit` rather than merely `blocked-on-equipment-context`. **Still open, unrelated to this cycle**: the faq.ts `translation-voting` entry and part of `what-is-meg` still claim simultaneous interpretation, interactive voting systems and video wall setups, contradicted by `audiovisual-equipment-rental-service.svx`, `audio-visual-rental-for-religious-events.svx`, and by Equipamiento.csv, which has never listed interpretation/voting/video-wall hardware. Separate, still-open business-fact question for the user - do not resolve this by inference from the camera episode above.

**Interpretation/voting resolution (2026-07-31, separate from the item above, now closed):** the user later confirmed via WhatsApp (Sergio, 12:45) that MEG DOES offer simultaneous interpretation and interactive voting systems for corporate/congress events, but subcontracted (no own equipment) - resolving the "still open" item from the paragraph above for THOSE 2 services specifically. `translation-voting` in faq.ts, the pillar, `audio-visual-rental-for-religious-events.svx` and `event-technology-service.svx` were all corrected to "not our own equipment, arranged via a subcontracted partner." The video-wall part of the same faq.ts entry remains a separate, unrelated false claim and was removed, not reframed (see category 1 row 33 and category 2 row 19, both `covered`).

**Iluminacion real corregida (2026-07-31, closed - do not re-litigate without a fresh equipment-context update):** while auditing candidates for the 2 orphan pillars' supporting-post clusters (user flagged via a silo-viz screenshot that both had 0 supporting posts), a reverse-silo-architect audit found the site-wide "Beam/Spot moving head fixtures and control systems" claim (both pillars, `equipment/+page.svelte` marketing copy, and several other posts) was NOT grounded in the itemized `Equipamiento.csv` LUMINARIA category, which lists only 4 real items: 2x Eurolite LED KLS-200 (4 head bar, hand aimed, foot pedal), 1x ADJ Encore FRI50Z (Fresnel zoom wash, static), 1x ADJ Element H6 Pack (6 fixture wireless battery uplighting kit). The user confirmed directly (after being shown a product photo of the Eurolite bar) that "moving head" was a marketing exaggeration - corrected site-wide to describe the real fixtures. The user separately confirmed the uplighting kit and 2x Audix RAD-360 lavalier + 1x Audix HT5 headband mic sets ARE real and current, reversing several "we don't offer uplighting / headset / lavalier" denials across `audiovisual-equipment-rental-service.svx`, `event-technology-service.svx`, `lighting-ideas-for-wedding-rentals.svx` (whose entire thesis depended on the uplighting denial - corrected to distinguish "not bundled into either wedding package" from "not stocked at all"), `sound-system-rental.svx`, `equipment/+page.svelte`, and 2 minor mentions. **Still open, unresolved (do not assume either way)**: multiple pages claim "Shure wireless microphones," but the only wireless mic brand in the itemized CSV is Audix (RAD-360 series) - flagged for a future business-fact confirmation, not yet touched.

**Cross-category decisions resolved 2026-07-31:**
1. **Technician/support cluster**: user chose 2 pages. `av-technician-hire.svx` (category 1 row 30) owns the "hiring the person" angle. `technical-support-for-events.svx` (category 3 row 37) owns the "on-site coverage/service" angle and absorbs category 1 row 31 and category 3 row 46 as synonym phrases/FAQ entries, not separate pages.
2. **Stage lighting installation vs rental**: resolved as a duplicate, not two pages. MEG's model bundles delivery+install+test+collect into every rental (confirmed: no permanent-install business line exists anywhere on the site), so "installation" isn't a distinct angle here. Category 5 row 34 folds into category 6's `stage-lighting-rental.svx`.

**Business-fact contradictions found in `src/lib/data/faq.ts`:**
1. `streaming-recording` entry - RESOLVED 2026-07-31 (see "Camera/video equipment history" note above): after the camera/laptop equipment was confirmed retired, this entry was rewritten to a plain "No" - no cameras, streaming encoders, multi-camera production or recording service. Matches all 7+ blog posts.
2. `what-is-meg` entry - PARTIALLY RESOLVED 2026-07-31: the "audio and video recording, live video production" phrase was removed (replaced with "live sound reinforcement," which is real). The translation/voting/video-wall phrase is unresolved, see item 3.
3. `translation-voting` entry - RESOLVED 2026-07-31: business confirmed (Sergio, WhatsApp, 2026-07-31 12:45) MEG genuinely offers simultaneous interpretation and interactive voting systems, but subcontracted - no own equipment. faq.ts, the pillar, `audio-visual-rental-for-religious-events.svx` and `event-technology-service.svx` were all corrected to say "not our own equipment, but arranged via a subcontracted partner" rather than a flat no. The video wall part of the same FAQ entry was a SEPARATE, unrelated false claim (already well established elsewhere that the large format display is a single 60 inch panel, not a modular wall) and was removed rather than reframed. See category 1 row 33 and category 2 row 19.

**Category 2 outcome (2026-07-31, superseded reasoning below):** wrote the pillar `audiovisual-equipment-rental-service.svx` positioned as "specialized/niche equipment" with an explicit "What We Don't Offer" section covering 11 of the 19 services by name. 5 services were true duplicates of existing primary-silo posts. Only 2 (holiday lighting, standalone AV cable) remain open pending equipment-context updates.

**PageOptimizer Pro (POP) legacy keyword CSV audit (2026-08-05, in progress):** a separate,
older keyword source at `.agents/context/keywords/pop/PageOptimizer Pro _ Reverse Silo - POP.csv`
(a PageOptimizer Pro reverse-silo export, distinct from the `fixed.md`/Category Finder 2.0 list
this whole document is built from) defines its own two keyword chains for the same 2 pillars
(`audio visual rental`, `wedding rentals`), with an explicit intended sibling-link order per row.
Its own Status column is stale (disconnected from the live site - several rows marked unfinished
already have a real post under a matching slug, e.g. `timeline-for-booking-wedding-rentals`,
`protecting-your-wedding-rental-items`, `managing-last-minute-wedding-rental-changes`,
`weather-considerations-for-outdoor-rentals`). Of 42 nominally unfinished `wedding rentals` rows,
**~30 are pure decor/furniture/tableware/tent/glassware/chairs/centerpiece/linens/arch/bar
keywords** (e.g. "wedding lounge furniture rental," "choosing chairs for wedding rentals,"
"wedding arch rental inspiration") that directly contradict the AV-only business fact already
established and enforced across the entire wedding-rentals silo cleanup (see
`wedding_rentals_silo_cleanup.md` in local memory) - user confirmed 2026-08-05 to skip these
entirely, no content will be drafted for them, they are out of scope by the same standing
business fact as the rest of the silo. The remaining 25 rows (11 ambiguous wedding-rentals keywords plus all 14 `audio visual rental`
keywords) were triaged individually against existing published content (2026-08-05). Outcome:
**20 of 25 need no new page** - 12 already fully covered by an existing post (timing/timeline
booking questions, storage, return, budgeting all answered inside `timeline-for-booking-wedding-
rentals.svx`, `pros-and-cons-of-wedding-rentals.svx`, `tips-for-reducing-wedding-rental-costs.svx`
on the wedding side; package comparison, mic choice, package selection, screen choice, onsite
support, and the pillar's own "audio visual rental services" self-description on the AV side) and
8 are near-duplicates with only a thin, not-worth-a-separate-page angle surviving (2 "near me"
variants risking the same cannibalization a prior fix already corrected once; "common mistakes,"
"luxury on a budget," "best practices for av rental logistics," "how to clean," 2 policy-question
variants). **2 are genuine, clean gaps with no equipment or business-fact risk**: "audio visual
rental safety guidelines" (PUBLISHED 2026-08-05, `audio-visual-rental-safety-guidelines.svx`,
organized around technician-vs-self-run staffing, real TRIPODE stand inventory, and an honest
no-rigging disclosure) and "audio visual rental planning timeline" (PUBLISHED 2026-08-05,
`audio-visual-rental-planning-timeline.svx`, organized around guest count/package capacity, the
real 4-step quote workflow, and the 24 hour minimum notice, deliberately rejecting the
calendar-based lead-time table every competitor result uses). "Common damages with wedding
rentals" and "audio visual rental insurance options" both sit on the exact "unverifiable claim"
pattern already retired once on this project (see `protecting-your-wedding-rental-items.svx`'s
rewrite, commit `78986e7`, which removed a fabricated insurance/deposit clause) - MEG has no
published damage/liability/insurance policy today. User confirmed 2026-08-05: state that plainly
rather than invent one. "Common damages with wedding rentals" RESOLVED as a new FAQ entry on
`protecting-your-wedding-rental-items.svx` (no new page - the honest facts were already
established there, this FAQ just answers the literal search phrase directly). "Audio visual
rental insurance options" RESOLVED the same way (2026-08-05) as a new FAQ entry on
`how-audio-visual-rental-works.svx` - no insurance product or damage deposit policy exists to
publish, stated plainly rather than invented. "Audio visual rental for art exhibitions" (PUBLISHED
2026-08-05, `audio-visual-rental-for-art-exhibitions.svx` - honest about the confirmed gallery
track/picture-lighting gap, covers what's real instead: sound, mic, lit-room-legible screen,
ambient reception lighting) and "...for trade shows" (PUBLISHED 2026-08-05,
`audio-visual-rental-for-trade-shows.svx` - confirmation pass complete: real trade show AV search
intent is exhibit-house content (LED video walls, booth
fabrication/design, rigging/truss, touchscreen/kiosk/laptop rental, a standard multi day rate)
that MEG's catalog does not honestly serve; the page scopes down to AV for a single exhibitor's
own stand demo, sound/mic/screen/lighting matched to a package, states the 4 exclusions plainly,
and cites the real PROGOLD SUMMIT 2026 multi day precedent as evidence multi day work is possible
via custom quote only, never a standard rate) had grounded generic AV equipment but an unverified
specialty angle that needed this confirmation before drafting. **This closes the entire
PageOptimizer Pro legacy CSV audit (2026-08-05)**: all 111 non-decor rows resolved to either
already-covered/near-duplicate (20), published as a new standalone post (4: safety guidelines,
planning timeline, art exhibitions, trade shows), or resolved as a new FAQ entry on an existing
post (2: common damages, insurance options), on top of the ~30 decor/furniture rows already
skipped as out of scope. Nothing remains open from that CSV.

**Google Ads keyword research audit (2026-08-06, closed):** a third, separate keyword source at
`.agents/context/keywords/google-ads/` (14 files: 12 topic-clustered PPC exports - Business &
Company, Event Production, Events & Companies AV, Events & Company Generic, Karaoke, Lighting,
Microphone, Projector/Screen/Conference/Exhibit/Present, Smoke, Speaker, Stage, Wedding - plus 2
noisy broad-match "Keyword Stats"/"Ubersuggest" exports) totaling ~908 raw long-tail phrases was
clustered into real distinct search intents and cross-checked against the live site,
Equipamiento.csv and packages.ts (6 parallel research passes). Headline finding: **the entire
raw keyword set collapses to zero standalone-post gaps** - every real intent (speaker, mic,
stage, lighting, projector/screen, conference, exhibition, wedding AV, "AV rental company"
positioning) is already served by existing pages built during the fixed.md and POP CSV work.
Confirmed no-fit (fabrication risk, correctly avoided): generator, dry ice/snow/punch machine,
disco ball, inflatable screen, LED video wall, stage truss/trailer, studio recording mics,
push-to-talk radio mics, "event production company" as a managed-service business (MEG rents
equipment, does not produce events) - all already declared elsewhere on the site. 4 small,
real action items resolved, all as FAQ/section additions rather than new pages:
1. Wedding smoke/fog machine - business confirmed the Martin Magnum-650 (already an Eco Pack
   add-on) is also available on the Wedding Pack. Added `optional`/`optionalTags` to the Wedding
   Pack entry in `packages.ts` (previously had none) and a matching FAQ on
   `audio-visual-rental-for-weddings.svx`.
2. Karaoke - no dedicated karaoke product exists (no console, no lyrics display), but the Eco
   Pack's real speakers+mic honestly cover the sound half if the host brings their own app/
   backing tracks. Business confirmed this reframe; added as a new FAQ on
   `audio-visual-rental-for-private-parties.svx`.
3. "What is audio visual equipment" - a genuine informational-intent gap (no page explained AV
   equipment in plain language). Added a short explainer FAQ to the primary pillar,
   `audio-visual-rental.svx`.
4. Stage riser/deck/podium terminology - the real GUIL modular stage platform (35 EUR/sqm, MICE
   Pack add-on) was already documented under "staging" only; added the riser/deck/podium
   synonyms to `audiovisual-equipment-rental-service.svx`'s Modular Staging section.

Nothing remains open from the Google Ads keyword source.
