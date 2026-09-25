# Keyword research: conferences, congresses, corporate and MICE events

Date: 2026-09-25. Repo: malagaeventgear.com (branch feat/i18n).

> Informe del agente de keywords del 2026-09-25, revisado por el orquestador el mismo día: el
> autocompletado de las 6 keywords principales se volvió a consultar y coincide. Resumen y
> prioridades en TODO.txt, sección "Contenido pendiente: congresos y eventos corporativos".

## 1. Method and limits

Sources used:
- Google autocomplete (`suggestqueries.google.com/complete/search`, client=firefox, hl=en), fetched
  directly with curl (not WebFetch, to keep the raw JSON intact). Primary locale gl=es (Spain).
  A spot check with gl=gb and gl=us on four seeds (`conference av equipment rental`, `mice malaga`,
  `corporate event malaga`, `gooseneck microphone rental`) showed no meaningful difference from
  gl=es, so the report does not repeat suggestions per locale.
- WebSearch (Claude's built-in web search) on 8 seed queries to read People Also Ask style content,
  related searches, and classify SERP intent by what actually ranks (guide vs rental-company
  service page vs venue directory vs definitional page).
- Repo files read: all 77 `src/content/blog/*.svx` frontmatter (title, keyword, siloRole,
  targetPage), `TODO.txt` section "Contenido pendiente: congresos y eventos corporativos" (24
  unwritten ideas, dated 2026-09-25, same day as this research), `.agents/context/keywords/
  keyword-silo-map.md` (real GSC data, last updated 2026-09-24), `.agents/context/Equipamiento.csv`
  (real inventory).

What could not be read / is out of scope:
- No paid keyword tool (Ahrefs, SEMrush, Keyword Planner). **No search volume, difficulty or CPC
  numbers anywhere in this report.** Every keyword below carries only the evidence actually
  observed: AC (seen in Google autocomplete), PAA (question surfaced in a WebSearch summary), RS
  (related/alternate suggestion seen alongside the seed), SERP (seen in the titles/snippets of
  ranking pages for a query in this report's WebSearch batch).
- No fresh GSC export exists beyond the 2026-09-23 one already digested into `keyword-silo-map.md`.
  This report treats that file's numbers as given, not re-derived.
- A keyword with zero autocomplete suggestions is recorded as such (evidence: none) rather than
  silently dropped, so a future session does not re-query it expecting different results without
  reason to.

## 2. Content clusters (conferences and corporate first)

### Cluster A: How to plan a congress / MICE event in Malaga

**Pillar: `/blog/event-technology-service/`** (existing pillar, currently 0 supporting posts,
weighted GSC position 33.9 on the MICE cluster per `keyword-silo-map.md`, the worst-performing
pillar in the whole silo map). This is the single highest-priority pillar to reinforce: it is a
sink with no supporting posts feeding it.

Entities/related terms seen in SERPs for this cluster: FYCMA, Palacio de Ferias y Congresos,
Torremolinos Congress and Exhibition Centre, Marbella Adolfo Suarez Congress Centre, DMC,
Convention Bureau, delegate, incentive travel, team building, MICE (Meetings, Incentives,
Conferences, Exhibitions), venue capacity, breakout rooms, run of show, technical rider.

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| how to organize a congress in malaga | informational | AC (`how to organize a conference`, `...checklist`, `...step by step`), SERP (Tagvenue, Eventbrite, Swoogo, Crestline all rank generic "conference planning checklist" guides) | Malaga-specific planning guide: venue (FYCMA etc, named as entities, not endorsed), dates, AV (MEG), group hotel (TGE) | already planned, TODO idea 1 | strong |
| congress malaga / fycma malaga congress center | local/navigational | AC (`congress malaga 2026`, `fycma malaga congress center`, `efort congress malaga`) | Section inside the planning guide naming Malaga's congress venues as context, not a venue-comparison post (MEG does not run a venue) | NEW (as an entity section, not its own post) | medium (needs to stay AV-only, never imply MEG operates the venue) |
| medical congress malaga | local/navigational | AC (`medical congress malaga`, `medical conference malaga`) | Confirms real search demand behind TODO idea 14 (`medical congress satellite symposium av`) | already planned, TODO idea 14 | needs business confirmation (TODO already flags: confirm real MEG experience with medical congresses before writing) |
| incentive trip event planning | informational | none in AC (zero suggestions for both `incentive trip malaga` and `incentive trip event planning checklist`) | Logistics checklist: what to quote and when, AV vs hotel block split with TGE | already planned, TODO idea 2 | strong, but weak external evidence: keep priority behind items with AC hits |
| costa del sol conference / costa del sol convention | local | AC (`costa del sol convention`, `costa del sol convention bureau`) but the bulk of suggestions were AA recovery conventions and a tattoo convention, i.e. mostly noise | Low-value as a keyword target on its own. Usable only as a phrase inside the congress-planning post, not a standalone post | NEW, but do not build a post around it | weak (noise-heavy query) |
| dmc malaga | commercial/navigational | AC (`dmc malaga`, `empresa dmc malaga`, `indigo dmc malaga`) | MEG is not a DMC. Mention DMC/TGE partnership as an entity inside the planning guide, never target this phrase as a page's own keyword | NEW, entity mention only | needs business confirmation (do not imply MEG is a DMC) |
| team building malaga | commercial | AC (`team building malaga`, `team building activities malaga`, `empresas team building malaga`) | MEG does not run team building activities (no inventory for that). At most, "AV for a team building session held at your venue" is a stretch angle | NEW | needs business confirmation (borderline off-catalog. Do not write without confirming MEG actually supplies AV to a team-building style event) |

### Cluster B: Conference technical production and run of show

**Pillar: `/blog/event-technology-service/`** (same pillar, later in the chain after the planning
post).

Entities: technical rehearsal, sound check, run of show / rundown, cue sheet, AV technician,
confidence monitor, stage manager, mixing console.

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| av equipment needed for a conference / av equipment checklist for conference | informational | AC (`av equipment needed for a conference`), SERP (9 competing "AV equipment checklist" guides: Kasetech, Elite Multimedia, Atlanta Pro AV, Huview, VEP, Delco, Trivision, Techtonic, AVR Expos: a saturated but proven-demand pattern) | Malaga-specific AV checklist scoped to what MEG actually stocks (mics, screens, projector, sound, staging). Explicitly excludes cameras/streaming that generic guides list | overlaps existing `audio-visual-rental-for-conferences.svx` (orden not stated): recommend as an FAQ addition to that post rather than a new URL, see section 3 | strong, but must be trimmed vs generic guides (no cameras/streaming/LED wall) |
| run of show for corporate events | informational | AC (`run of show template event`, `what is a run of show for an event`, `run of show template for events free download`) | What a technical run of show looks like for a corporate event AV setup (cue sheet, mic changes, slide advances) | already planned, TODO idea 6 | needs business confirmation (TODO already flags: confirm whether MEG's technician manages slides or only sound) |
| technical rehearsal for corporate events | informational | none in AC (zero suggestions) | When and how long a sound/slide/level check runs before doors open | already planned, TODO idea 5 | needs business confirmation |
| multi day conference technical support | informational/commercial | none in AC (zero suggestions), but real business precedent exists (ProGold Summit 2026, 4 days) | Equipment left set up overnight, technician hours beyond the MICE Pack's included 6h | already planned, TODO idea 8 | needs business confirmation (can equipment stay set up overnight at the venue?) |
| keynote speaker av requirements | informational | none in AC (zero suggestions) for the full phrase. `keynote speaker` alone returns only definitional noise (meaning, synonym, in Spanish) | What a keynote speaker needs: handheld/lavalier/headset mic, podium, screen, stage monitor | already planned, TODO idea 7, links to headset-lavalier-microphone-rental.svx | strong (real inventory), weak external evidence |

### Cluster C: Conference microphone and lectern equipment

**Pillar: `/blog/audiovisual-equipment-rental-service/`** (existing pillar, currently 1 supporting
post: `headset-lavalier-microphone-rental.svx`. This chain continues it.)

Entities: gooseneck mic, cardioid pickup, podium, lectern, panel discussion, Q&A mic, wireless
receiver/channel count.

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| podium microphone rental / gooseneck microphone rental | commercial | AC (`podium microphone rental` exact match, `gooseneck microphone rental`, `podium microphone stand`), SERP (9 rental-company product pages: Elite Events, AA Rental, Diamond Event, BZ Tent, Crossfire Pro AV, AVR Expos: proven rental-intent pattern), PAA (`why two microphones on podium`) | Gooseneck podium mic for a lectern, feedback distance, when to add a wireless handheld too | already planned, TODO idea 16 | strong, real inventory (2x Audix ADX12, 2x ADX212 with K&M base and D-Clip). Note (verified 2026-09-25): Equipamiento.csv lists these 4 units as table microphones, so podium and table use share the same 4 units |
| conference table microphone rental | commercial | none in AC (zero suggestions for the exact phrase), but the closely related `gooseneck microphone rental` and `podium microphone rental` both hit, and PAA (`why two microphones on podium`) points at the same demand | Table mics for a panel or presiding table, same inventory as podium mic post but a different placement | already planned, TODO idea 17 | strong, real inventory, treat as the natural sibling post to idea 16 rather than fully independent |
| wireless handheld microphone rental | commercial | AC (`wireless handheld microphone rental` exact match, `wireless handheld mic rental`, `wireless mic rental price`) | Handheld wireless for audience Q&A at a conference, channel count, how the mic gets passed around the room | already planned, TODO idea 18 | strong, real inventory (2x Audix RAD-360 handheld sets, OM3 capsule) |
| lectern rental | commercial | AC (`lectern rental` exact match, `acrylic lectern rental`, `digital lectern rental`) | Acrylic/methacrylate lectern for Malaga events, sizes, which packages include it | already planned, TODO idea 19 | strong, real inventory + existing CDN photo already referenced in TODO (`blog/1264/methacrylate_lectern_technical_support.webp`) |
| projector lumens for conference room / how many lumens do I need | informational | AC (`how many lumens for conference room projector`), SERP (ProjectorCentral, Epson, Panasonic, ViewSonic, ProjectorScreen.com all publish lumens guides. Consistent guidance: 2,500-3,000 lm for small/medium rooms, 5,000-6,000+ lm for large or bright rooms) | Match Vivitek D5 (3,000 lm) to a medium room and Christie LX505 (5,000 lm) to a large or bright room, tie to the 2x2m screen | already planned, TODO idea 20 (note: TODO flags cannibalization risk vs `projector-rental.svx` - keep the intent on "how many lumens", not "where to rent") | strong, direct inventory match to third-party lumens guidance |

### Cluster D: Staging for conferences

**Pillar: `/blog/event-technology-service/`.**

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| stage platform rental / stage riser rental | commercial | AC (`stage platform rental`, `stage riser rental`, `stage riser rental near me`), SERP (9 rental-company pages: All Occasions, Event Essentials, The One Up Group, ETC Rentals, AVR Expos, all selling modular riser platforms explicitly for conferences and keynote stages) | Modular platform per m2, sizes and heights for a conference stage or panel | already planned, TODO idea 9 | strong, real inventory (`TARIMAS`, modular stage platforms, PRICE_POINTS.stagingPerSqm). TODO flags CONFIRMAR real module sizes/heights before writing |

### Cluster E: Ceremony and closing production

**Pillar: `/blog/event-technology-service/`** (distinct from the existing `audio-visual-rental-for-gala-dinners.svx`, which lives in the audio-visual-rental silo and covers the dinner, not the ceremony).

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| awards ceremony production | commercial/informational | AC (`award show production`) | The ceremony itself: entrance music cue, presenter and recipient mics, stage lighting on the moment of the award | already planned, TODO idea 10 | strong, real inventory (sound, stage mics, Fresnel/uplights) |

### Cluster F: Wedding AV + group hotel (TGE cross-sell)

**Pillar: `/blog/wedding-rentals/`.**

| Keyword | Intent | Evidence | Proposed angle | Overlap check | MEG fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| destination wedding av costa del sol | commercial | none in AC (zero suggestions for the exact phrase), SERP context from `corporate event malaga` search showed `wedding planner malaga spain` / `wedding planner malaga` ranking, confirming real search volume around Malaga + wedding + planner intent even if this exact long-tail has none | AV for destination weddings aimed at wedding planners/agencies, hotel room block via TGE | already planned, TODO idea 22 | strong, and aligned with the TGE tanda-1 work already in progress this session (per git log) |

### Weak / low-evidence items (kept in TODO but deprioritized here)

`hotel in house av vs independent av supplier`, `conference venue technical checklist`,
`sales kickoff event av`, `shareholder meeting av`, `company offsite av`, `simultaneous
interpretation for congresses in malaga` all returned **zero or noise-only** autocomplete
suggestions (e.g. `shareholder meeting av` surfaced Aviva/Avidity/Avio insurance shareholder
meetings, not event AV). They stay valid TODO ideas (real business logic, real inventory in most
cases) but should not be pulled forward ahead of the cluster A-E items above, which all have direct
AC and/or SERP evidence.

## 3. Question keywords (PAA style) for existing-post FAQs

These do not need new URLs. They fit as FAQ entries in posts that are already published.

| Question | Evidence | Target post (already published) |
| :--- | :--- | :--- |
| What AV equipment do you need for a conference? | AC (`av equipment needed for a conference`), SERP (near-universal "AV checklist" pattern across 9 competitors) | `audio-visual-rental-for-conferences.svx` |
| How many lumens do I need for a conference room projector? | AC + SERP (ProjectorCentral, Epson, ViewSonic) | `projector-rental.svx` (until/unless the dedicated lumens post from Cluster C is written, then move it there) |
| What screen size do I need for my conference room? | AC (`conference room screen size calculator`, `meeting room screen size calculator`) | `tv-screen-rental.svx` (`keyword-silo-map.md` shows its 55 inch size FAQ was already added on 2026-09-24, so this is a separate, new FAQ) |
| Why does a podium sometimes have two microphones? | PAA (surfaced alongside `podium microphone rental` in WebSearch) | `headset-lavalier-microphone-rental.svx` (nearest published mic post until the dedicated podium-mic post exists) |
| What is a gooseneck microphone? | RS (`what is a gooseneck microphone`, alongside `gooseneck microphone rental`) | `headset-lavalier-microphone-rental.svx`, same reasoning |
| What is a run of show for a corporate event? | PAA/RS (`what is a run of show for an event`) | `audio-visual-rental-for-corporate-events.svx` |
| How far in advance should I book AV for a congress? | Already answered by the pillar per TODO idea 1's note | `event-technology-service.svx` (its existing "How Far in Advance to Book" section, no new FAQ needed, just confirms the pillar already covers this angle) |

## 4. Discarded keywords and why

| Keyword | Reason discarded |
| :--- | :--- |
| hybrid meeting / hybrid meeting equipment / hybrid meeting setup | Requires cameras and streaming. MEG has no cameras, no streaming equipment (confirmed discard, also matches the explicit "no inventory" rule and the existing `audio-visual-rental-for-virtual-events.svx` / `-for-remote-presentations.svx` posts already state this honestly) |
| conference room AV checklist items involving cameras/streaming (seen inside the "AV equipment checklist" SERP results) | Same reason: no cameras, no streaming gear in `Equipamiento.csv` |
| LED video wall / LED panel for conferences (surfaced inside generic AV-checklist SERP copy) | Already a closed decision in `keyword-silo-map.md`: MEG has one 60-inch flat panel, not a modular wall |
| breakout room / breakout rooms in Teams/Zoom/Google Meet | 100% software meeting-platform intent (Zoom, Teams, Google Meet), not physical AV rental. Off topic entirely |
| keynote speaker (bare term) | Autocomplete is dominated by definitional/translation queries (meaning, synonym, in Spanish, in Hindi/Bengali/Indonesian). No commercial or local intent to target as its own page. Stays only as an angle inside idea 7 |
| lectern (bare term) | Autocomplete is dominated by Minecraft crafting-recipe queries and OSRS (Old School RuneScape). The word alone is contaminated. `lectern rental` (Cluster C) is the clean version to target |
| gala dinner av | Autocomplete returned aviation industry galas (`aviation gala dinner`, `avbob gala dinner`, `avca gala dinner`): false-positive matches on "av" as a prefix, not audio-visual. No usable signal. MEG already has `audio-visual-rental-for-gala-dinners.svx` for the real angle |
| shareholder meeting av | Autocomplete is entirely insurance/investment company AGM controversy noise (Aviva, Avidity, Avio). No event-AV search behavior detected. TODO idea 13 stays valid on business logic alone but should not be prioritized on keyword evidence |
| awards ceremony (bare term) | Autocomplete is dominated by generic pop-culture queries (dress code, music, "awards ceremony tonight", 2026 schedule). `awards ceremony production` (Cluster E) is the version with real production/commercial intent |
| dmc malaga / event company malaga / event planner malaga as standalone target pages | Local-pack/directory intent (wedding planner malaga, party planner malaga, DMC companies) that MEG cannot fulfill as a page topic: MEG rents AV equipment, it is not a DMC, event planning agency, or wedding planning agency. Usable only as entity mentions inside Cluster A's planning guide, not as their own posts. Also `event company malaga` risks cannibalizing the already-published `audio-visual-rental-company.svx` |
| costa del sol conference / costa del sol convention (bare) | Majority of autocomplete volume is unrelated: AA (Alcoholics Anonymous) recovery conventions and a tattoo convention. Real signal is too thin to carry a standalone post |
| incentive trip malaga | Zero autocomplete suggestions at all (empty array). No external evidence. TODO idea 2 proceeds on business logic only, not keyword demand |

## 5. Top 10 recommended next posts, in order

1. **`how to organize a congress in malaga`** (event-technology-service). Strongest combination of
   evidence (AC + a saturated but proven-demand SERP pattern) and business need: this pillar has
   zero supporting posts today and the worst weighted GSC position of any pillar (33.9). This is
   the anchor post the whole cluster is missing.
2. **`podium microphone rental`** (audiovisual-equipment-rental-service). Exact-match AC hit plus
   9 ranking rental-company product pages confirms real commercial intent, and MEG's inventory
   (Audix ADX12/ADX212 gooseneck mics) is a precise match.
3. **`stage platform rental for conferences`** (event-technology-service). AC hits on both
   `stage platform rental` and `stage riser rental`, 9 ranking competitor product pages, real
   inventory and an existing price point (`PRICE_POINTS.stagingPerSqm`) already in the codebase.
4. **`projector lumens for conference room`**. Direct AC hit, consistent third-party guidance
   (2,500-6,000 lm bands) that maps cleanly onto MEG's two real projectors (Vivitek D5 3000 lm,
   Christie LX505 5000 lm). Also closes a live FAQ gap on the already-published
   `projector-rental.svx`.
5. **`wireless handheld microphone rental`**. Exact-match AC hit, real inventory (2x Audix
   RAD-360 handheld sets), natural sibling to the podium mic post for Q&A coverage.
6. **`conference table microphone rental`**. Weaker direct AC evidence but real inventory (Audix
   ADX12/ADX212) and the same demand signature as the podium mic keyword. Ships as the paired post
   right after item 2.
7. **`lectern rental`**. Exact-match AC hit (`lectern rental`, `acrylic lectern rental`), real
   inventory, and a product photo already sitting on the CDN and referenced in TODO.txt, so no new
   asset work is needed.
8. **`av equipment needed for a conference` (as a new FAQ block, not a new post)**. Very strong,
   near-universal SERP pattern (9 competitors run this exact guide), but it overlaps the existing
   `audio-visual-rental-for-conferences.svx`: extending that post's FAQ is lower-risk than opening
   a competing URL inside the same silo.
9. **`awards ceremony production`** (event-technology-service). Moderate AC evidence, clean
   differentiation from the already-published gala-dinners post (ceremony vs dinner), and full
   inventory support (sound, stage mics, Fresnel/uplights).
10. **`destination wedding av costa del sol`** (wedding-rentals). Weak direct AC evidence, but this
    is the post that carries the TGE partner cross-sell already underway this session (per the git
    log: TGE briefing and mention-planning commits), and SERP context confirms real "wedding
    planner malaga" search volume the post can capture from an AV angle.

Everything above stays inside the 5 existing pillars. No new pillar is justified by this research.
