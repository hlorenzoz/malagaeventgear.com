---
title: Local SEO, ranking the Google Business Profile (Caleb Ulku method, checked against Google)
description: Agent reference for local business sites. How a local site supports its Google Business Profile in the map pack (GBP completeness, GBP landing page consistency signals, Core 30 content, editorial links, FAQ to supporting page pattern, rank grid and the top 3 percent metric, GBP operations, citations, local links), synthesized from four Caleb Ulku videos, with every point that conflicts with Google's documentation flagged and resolved in Google's favour.
topic: local-seo
sources:
  - "Caleb Ulku (YouTube): The BEST SEO Tutorial for Businesses 2026 (Full Guide)"
  - "Caleb Ulku (YouTube): How to Use Content to Rank Your Local Business #1 on Google (10 Years of SEO Experience)"
  - "Caleb Ulku (YouTube): Outrank 99% of Local Businesses in 14 Days"
  - "Caleb Ulku (YouTube): OUTRANK 99% of Local Businesses with THESE 5 AI Hacks"
  - "Transcripts: the video IDs are not in the file names. The .srt transcripts are in caleb-ulku/, next to this file (the en-US variant is the clean one)"
  - .agents/context/seo/search/docs/essentials/spam-policies.md
  - .agents/context/seo/search/docs/crawling-indexing/qualify-outbound-links.md
  - .agents/context/seo/search/docs/appearance/structured-data/local-business.md
  - .agents/context/seo/search/docs/appearance/structured-data/review-snippet.md
  - .agents/context/seo/search/docs/fundamentals/creating-helpful-content.md
  - .agents/context/seo/search/docs/fundamentals/using-gen-ai-content.md
  - ~/.agents/context/google-eeat-guideline/searchqualityevaluatorguidelines.pdf (4.6.5 to 4.6.7)
last_updated: 2026-10-04
---

# Local SEO: ranking the Google Business Profile

## Overview

Use this file when the site belongs to a LOCAL business (one with a Google Business Profile that
serves customers in a defined area). It complements `.agents/context/pop/reverse-silo-topical-authority.md`
(the reverse silo and the Core 30 tree), and it does not replace it.

**This is the project copy for Malaga Event Gear.** The canonical, client agnostic version is
`~/.agents/context/seo/local-seo-gbp-first.md`, used by the global agents. This copy exists
because MEG's headless agents cannot read outside the repo. Keep the two in sync, and read the
section "How MEG applies it" at the end before acting: it overrides the generic method.

The source is Caleb Ulku, a local SEO agency owner (four videos, 2025 and 2026). He is a
practitioner and a seller: he owns the link service he recommends, and the GBP management and
rank tracking tools he names are affiliate links. His claims are field experience, not Google
statements. Where he contradicts Google's documentation or the Quality Rater Guidelines,
**Google wins**, and the section "Where this source conflicts with Google" says how each
conflict is resolved. Never apply a tactic from this file without reading that section.

## Core Concepts

### 1. The ranking target is the GBP, not the URL

- For a local query ("plumber near me", "plumber Houston") Google shows the map pack: three
  Google Business Profiles. Caleb's figure, unverified: 60 to 70 percent of clicks and calls go
  to those three. Position 4 is effectively page two.
- In local SEO the site exists to make Google trust and understand the GBP. A page that brings
  national informational traffic and no local customers does not move the map pack.
- Google weighs three factors. Google Business Profile Help names them relevance, distance and
  prominence (that help page is not in the local `.agents/context/seo/` copy, so fetch it before
  quoting it). Caleb calls them proximity, relevance and authority. Proximity cannot be
  controlled. Relevance is built with content. Authority is built with links and reputation.
- **Blended algorithm**: organic strength feeds the map ranking. A site buried in organic results
  will struggle to lift its GBP, so organic work is not optional.

### 2. GBP completeness

- **Categories**: one primary plus several relevant secondary categories (Google allows up to 10,
  Caleb targets 3 to 5). Choose them from a real category list or from what competitors use
  (tools such as GMB Everywhere show it). AI models invent category names that do not exist, so
  give the model the real list and make it choose from it.
- **Services**: 20 or more, each filed under the category it semantically belongs to. A service
  that does not match its category confuses the signal.
- **Every field filled**: description (up to 750 characters), hours, attributes (answer every
  attribute, yes or no), products, photos (20 or more, real ones), posts.
- These are GBP settings, not site content. A site agent can only recommend them.

### 3. The GBP landing page and its consistency signals

The GBP landing page is the URL in the GBP website field (the homepage for a single location
business, one landing page per GBP for multiple locations). Google checks that the site and the
GBP belong to the same business. Caleb's 7 signals plus one:

1. Title tag with the primary GBP category and the city (never "Home" or the brand alone).
2. H1 with the primary category and the city. The same phrase appears in the first paragraph.
3. An embedded Google Map of the GBP location.
4. The secondary categories (and the core services) as H2 subheadings.
5. Google reviews shown on the page, as visible content only (see the conflicts section about
   review markup).
6. The address identical to the GBP, character for character.
7. The phone identical to the GBP, character for character.
8. `LocalBusiness` structured data that matches the GBP character for character.

### 4. Core 30 content structure

The tree is defined in `.agents/context/pop/reverse-silo-topical-authority.md` and enforced by `gbp-site-architect`.
What this source adds:

- **Homepage**: each secondary category gets an H2 with 50 to 100 words (what it is, why the
  customer needs it, what services fall under it) and an in body link to the category page.
- **Category page**: target "category + city" in title and H1. Each relevant service gets an H2
  with 50 to 100 words and an in body link to its service page.
- **Service page**: target "service + city" in title, H1 and first paragraph. Specific to this
  service in this area: why it is needed, what it includes, the process, how long it takes,
  pricing posture, area served, a call to action. Not generic advice.
- Volume: 1 homepage, 3 to 5 category pages, 20 to 30 service pages, about 30 pages.

### 5. Editorial links over navigation links

Caleb's claim: links inside the body copy carry the endorsement, while menu, footer and
breadcrumb links read as site structure. Google's documentation does not quantify this, but it
does say anchor text and surrounding context help Google understand the target
(`crawling-indexing/links-crawlable.md`). Practical rule: every parent to child relationship of
the Core 30 tree has an in body link with a descriptive anchor. A breadcrumb or a menu entry
never replaces it.

### 6. FAQ to supporting page pattern

- Collect real questions about the target topic: the People Also Ask box for the keyword (without
  the city), and local forums such as Reddit.
- Put each question on the Core 30 page it belongs to (general questions on the homepage or the
  primary category page, specific ones on their service page).
- Answer it briefly there (a couple of sentences), then link in the answer to a supporting page
  that answers it in depth.
- This adds value to the main page without a wall of text and creates in body links from the
  Core 30 pages to the supporting pages.
- Write the question the way this business's customers ask it, in the business's own words.
  Never paste a list of PAA questions verbatim, and never reword to disguise anything (see
  conflicts).

### 7. Rank grid and the "top 3 percent" decision

- A local rank grid (Caleb uses 169 points over the city) shows the GBP position at each point.
  Green is positions 1 to 3, the only positions that count.
- **Top 3 percent** = share of the grid in positions 1 to 3, for the target keyword.
- Benchmark: run the grid for the 3 or 4 leaders. Caleb's examples: a small market leader at 94
  percent, a big city leader at 28.5 percent. The threshold is 25 to 50 percent of the leader's
  figure.
- **Below the threshold**: Google does not yet trust the business on the topic. Build topical
  relevance: more supporting content (section 6).
- **At or above it**: expand geographically. Target the grid areas at positions 4 to 6 with
  content that is genuinely about that area (subject to the doorway guard in the conflicts
  section).
- Repeat monthly. This needs real grid data. Without it, say the decision ran without data and
  default to topical relevance, which carries no doorway risk.

### 8. GBP operations

- Weekly GBP posts (offers, seasonal local events, specific services). They can be drafted in
  bulk and scheduled.
- Regular real photos.
- A reply to every review.
- Review requests: the GBP "ask for review" link, sent by text message from the phone number the
  customer already knows. Caleb reports over 50 percent response against under 5 percent by email
  (his figure). Never offer an incentive for a review and never filter who gets asked by expected
  sentiment.

### 9. Citations and local links

- Citations: directory and social profiles with name, address and phone identical to the GBP.
  Prefer creating correct new listings over chasing old ones only when the old ones cannot be
  fixed. Quality directories only.
- Local trust links: chamber of commerce membership, local associations, sponsorship of local
  teams, charities and community events. Real community ties, qualified as the conflicts section
  requires when money is involved.

## Method

1. Diagnose: GBP facts (categories, services, fields), the GBP landing page against the 8
   signals, the Core 30 tree, NAP consistency, and rank grid data if the project has it.
2. Fix the GBP (recommendations to the owner) and the landing page.
3. Build or complete the Core 30 tree with in body links.
4. Add the FAQ to supporting page layer for topical relevance.
5. Earn links that Google accepts (see conflicts).
6. Keep the GBP active (posts, photos, review replies, review requests).
7. Measure monthly with the grid when available, then choose topical or geographic work.

## Actionable Checklist

- [ ] GBP landing page title and H1 hold primary category + city, and the first paragraph repeats it
- [ ] Secondary categories are H2s on the landing page, each with an in body link to its page
- [ ] Google Map embed of the GBP location on the landing page (or the contact page as a minimum)
- [ ] Address and phone identical to the GBP everywhere on the site, character for character
- [ ] One `LocalBusiness` node matching the GBP, referenced by `@id` elsewhere
- [ ] Reviews shown as visible content, with no self serving `Review` or `AggregateRating` markup
- [ ] Every Core 30 parent links to its children inside the body copy
- [ ] FAQ answers on Core 30 pages link to their in depth supporting page
- [ ] No page exists only because a town or landmark name was swapped
- [ ] No paid link without `rel="sponsored"` (or `nofollow`)
- [ ] Grid based decisions say whether real grid data existed

## Common Pitfalls

- Treating national blog traffic as local success.
- A homepage titled "Home" or with the brand alone.
- One GBP category and no services.
- NAP that differs by a character between site, GBP and directories.
- Services that only exist as homepage anchors, not as pages.
- Building location pages before the topic is proven, or as name swaps.
- Publishing AI drafts unedited, as walls of text without real photos, tables or formatting.
- Copying a competitor's FAQ list or the PAA box verbatim.

## Where this source conflicts with Google

Paths are relative to `.agents/context/seo/search/docs/` (the project copy of Google Search Central) unless stated.

| Caleb says | Google says | Resolution |
| :--- | :--- | :--- |
| Buy "not AI slop" links at about 35 USD each, one per page | Link spam includes "Buying or selling links for ranking purposes", including "Exchanging money for links, or posts that contain links" (`essentials/spam-policies.md`) | Never buy links for ranking. Never recommend a link vendor. Links are earned (real relationships, real coverage, real citations) |
| Chamber of commerce memberships and sponsorships are "buying great links" | Paid links must be marked: `rel="sponsored"` is for "advertisements or paid placements (commonly called paid links)" (`crawling-indexing/qualify-outbound-links.md`). "Low-quality directory or bookmark site links" are link spam | Join or sponsor only for real community and business value. If the link exists because money changed hands, it should carry `sponsored` or `nofollow`. The site owner cannot force that on the third party, so never count such a link as a ranking lever and never require it |
| 40 pages in one afternoon, "90% of the work was done by AI" | Scaled content abuse is "when many pages are generated for the primary purpose of manipulating search rankings and not helping users ... no matter how it's created" (`essentials/spam-policies.md`, PDF 4.6.5) | AI may draft. Every page needs first hand business evidence and a real human edit before publishing. Pages are added because a customer needs them, not to hit 30 or 40 |
| Reword PAA questions so Google does not notice the copying | Paraphrased content with no added value is rated Lowest (PDF 4.6.6, 4.6.7) | Answer real customer questions with the business's own knowledge. Rewording to disguise is not a technique to use or to teach |
| Pages per neighborhood, park or intersection ("plumber Maple Leaf Gardens Houston") | Doorway abuse includes "pages targeted at specific regions or cities that funnel users to one page" and "substantially similar pages" (`essentials/spam-policies.md`) | A geographic page exists only if it is genuinely unique and useful for people in that area (specific conditions, real jobs done there), and only with rank grid evidence. A name swap is always a defect. A project may forbid geographic pages entirely |
| Local business schema goes on exactly one URL | No such rule in `appearance/structured-data/local-business.md` | Emit ONE `LocalBusiness` node and reference it by `@id` from other pages. Where it is emitted is a project decision |
| A review widget on the homepage | Self serving review markup is not eligible (`appearance/structured-data/review-snippet.md`, section on self serving reviews) | Show the reviews as visible content. Never wrap them in `Review` or `AggregateRating` markup about the business itself |
| Weekly geotagged photos rank better | Caleb himself says Google strips the metadata | Anecdote. Upload real photos regularly. Do not invent geotags or present this as a ranking factor |
| Blog posts do not help local businesses | Google ranks helpful, people first content (`fundamentals/creating-helpful-content.md`) | His point is that random informational posts do not move the map pack. Content that supports the Core 30 tree (the FAQ to supporting page layer) is fine. A project may run a blog for other reasons |
| Ranking figures (17.5 to 2.35 in 14 days, 60 to 70 percent of clicks, over 50 percent review response) | Not Google statements | Quote them as his reported results, never as facts |

## How MEG applies it (user decision, 2026-10-04)

The generic method above is adopted for Malaga Event Gear with these overrides. On any conflict:
Google's documentation and the Quality Rater PDF, then CLAUDE.md, then this section, then the
generic method.

1. **GBP landing page**: the English homepage `/` (single location). Primary GBP category and
   city: the first entry of `siteConfig.categories` in `src/lib/data/site.ts` plus Malaga, with
   the "Malaga, Spain" first mention rule of CLAUDE.md. Each locale's homepage carries the same
   signals in its own language. The NAP is never translated. The Google Maps embed already
   exists (`GoogleEmbedSection.svelte`, used on the homepage and `/contact/`). The `/map` route
   is the internal site graph, not a Google Map.
2. **NAP**: the exact strings of `src/lib/data/site.ts`. They are also hardcoded in other files,
   the Maps embed URL among them, so any NAP check or change greps the whole repo.
3. **The blog stays.** Caleb's "blogs do not help local businesses" does not apply as a rule:
   MEG's audience is mostly foreign, the site ships in 13 locales, and its supporting posts are
   the FAQ to supporting page layer of a reverse silo. The pattern of section 6 maps onto it: a
   short answer on the pillar or service page, an in body link to the supporting post. Turning
   the site into a strict Core 30 tree is a user decision, never an agent's.
4. **No location, town or landmark pages.** Already the content-strategist rule (doorway abuse).
   Geography appears inside genuinely relevant content: venues and towns of real events, told
   only with what MEG's `News` posts confirm (FYCMA, Marbella, Benahavis, Torremolinos...).
5. **No rank grid data today.** No grid tool and no grid export exist in the repo. Every "top 3
   percent" decision says it ran without data and defaults to topical relevance.
6. **Links**: nothing is bought for ranking. Chamber of commerce memberships, associations and
   sponsorships follow `.agents/context/link-building/media-and-pr-plan.md` (rule 4: a paid
   link carries `sponsored`, rule 2: the anchor is the brand or the URL, rule 5: no link as a
   contract condition). Every link obtained is recorded in that file.
7. **Schema**: one `#organization` `LocalBusiness` node emitted by the public layout
   (`buildLocalBusinessSchema` in `src/lib/utils/schema.ts`), referenced by `@id` everywhere
   else. Caleb's "schema on one URL only" does not apply.
8. **Reviews**: the real Google reviews of `src/lib/data/reviews.json`, shown in their original
   language and never translated, without `Review` or `AggregateRating` markup about MEG.
9. **GBP operations**: GBP posts go through the `gmb:create-post` skill. GBP categories and
   services are resolved in `.agents/context/google-business-profile/gmbeverywhere.com/meg/`
   (`content-map.md`). Changing the live GBP is the business's action, never an agent's.
10. **Content rules still apply**: the 13 locale rule, no Spanish content, own inventory versus
    what MEG sources through suppliers, Experience only from `News` posts, and the typography
    rule 12.
11. **Caleb's numbers** (ranking jumps, click shares, review response rates) are never published
    or quoted as facts.

## Sources

- Four Caleb Ulku videos (see frontmatter). The full tutorial is the most complete. The other
  three repeat and illustrate parts of it.
- Google's documentation listed in the frontmatter, which wins on every conflict.
