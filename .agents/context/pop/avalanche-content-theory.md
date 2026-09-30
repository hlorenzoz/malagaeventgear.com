---
title: Avalanche Content Theory and How it Fits in With Your Reverse Silo
description: Agent reference on the Avalanche Theory traffic tiers (Chris Carter, Builder's Society) as PageOptimizer Pro applies them to pick the supporting keywords of a reverse silo, plus how to compute MEG's tier from the local Search Console export.
topic: avalanche-content-theory
sources:
  - https://www.youtube.com/watch?v=aPKxmz6jBaA (sources/youtube-aPKxmz6jBaA.txt)
  - https://www.youtube.com/watch?v=1LIUCsRGP0Q (sources/youtube-1LIUCsRGP0Q.txt)
  - sources/kyle-roof-reverse-silo-and-avalanche-slides.pdf (slides 3 and 4)
  - https://academy.pageoptimizer.pro/lessons/avalanche-content-theory-and-how-it-fits-in-with-your-reverse-silo/ (course page, content behind login)
  - https://academy.pageoptimizer.pro/topics/how-to-find-your-traffic-tier/ (course page, content behind login)
last_updated: 2026-09-29
---

# Avalanche Content Theory and How it Fits in With Your Reverse Silo

## Overview

Avalanche Theory comes from Chris Carter (Builder's Society). Kyle Roof (PageOptimizer Pro, POP)
uses it to decide WHICH keywords the supporting posts of a reverse silo should target. The
reverse silo (`reverse-silo-topical-authority.md`, same folder) decides how pages link. Avalanche
decides which supporting keywords are worth writing now.

The premise, in Kyle's words (`sources/youtube-aPKxmz6jBaA.txt`): "every website sits within a
traffic tier", based on "how much traffic your website generates on average over a period of
time". "The more traffic your website is generating on average the higher your traffic tier and
the easier it is to rank for higher traffic keywords."

The goal: "we don't waste time creating articles for keywords that will [n]ever see the light of
day in Google, we focus only on what is likely to generate quick wins."

## The traffic tier

### How to compute it (current method, impressions)

1. In Google Search Console, take the daily Performance data of the last 3 months.
2. Find the day with the HIGHEST and the day with the LOWEST value.
3. Average those two numbers: `(highest + lowest) / 2`.
4. Find that number in the tier chart below. That row is the site's traffic tier.

**Impressions, not clicks.** Kyle's first video (2023-12-19) used clicks. The update
(2024-03-21, `sources/youtube-1LIUCsRGP0Q.txt`): "we have improved the process a little bit by
getting away from clicks to inform our tier to using impressions". "Everything else remains the
same", and the chart is "essentially the same chart" with impressions instead of clicks. The
slide "Identify Your Tier" in the PDF still shows the older clicks graph, with the low and high
days marked.

### The tier chart (slide 4 of the PDF, "Avalanche Theory: Chris Carter, Builder's Society")

| Level | Range | Level | Range |
| :--- | :--- | :--- | :--- |
| 0 | 0 to 10 | 2,000 | 2,000 to 3,000 |
| 10 | 10 to 20 | 3,000 | 3,000 to 4,000 |
| 20 | 20 to 50 | 4,000 | 4,000 to 5,000 |
| 50 | 50 to 100 | 5,000 | 5,000 to 7,500 |
| 100 | 100 to 200 | 7,500 | 7,500 to 10,000 |
| 200 | 200 to 500 | 10,000 | 10,000 to 12,500 |
| 500 | 500 to 1,000 | 12,500 | 12,500 to 15,000 |
| 1,000 | 1,000 to 1,500 | 15,000 | 15,000 to 25,000 |
| 1,500 | 1,500 to 2,000 | 25,000 | 25,000 to 50,000 |

The slide labels the column "Qualified Traffic". Per the update video, the value compared against
it is now the daily impressions average from step 3.

### What the tier is used for

"You'll want to find keywords with a monthly volume in that range." A site in Level 100 targets
supporting keywords with 100 to 200 monthly searches.

"As the Avalanche content matures and starts generating impression and traffic your site will
graduate to the next traffic tier where you can start creating content around more competitive
and higher traffic keywords."

Kyle's argument for why it is safe: it uses "your website's naturally recognized Authority
rather than quick SEO boosts like links", so the traffic "won't be taken away during Google
updates".

### How MEG uses it: order, never a filter (user decision, 2026-09-29)

In this project the tier only decides the ORDER of the work and the priority of each task in
`.agents/data/TODO.txt`: in-tier keywords first (`alta`), then below the tier and without measured volume
(`media`), then above the tier (`baja`). It never decides whether content exists. Every keyword
that is relevant for the site ends up as content, created or updated, whatever its volume.
`just content-candidates` lists above-tier keywords too, as the last group.

## How it fits the reverse silo

- The **target page** (the pillar) keeps its competitive head keyword. Avalanche does not change
  it.
- The **supporting posts** are where Avalanche applies: their keywords are chosen inside the
  site's current tier, so they rank quickly, earn impressions, and pass their equity down to the
  target through the reverse silo links.
- As supporting posts rank, the site's impressions grow, the tier goes up, and the next batch of
  supporting posts can target higher volume keywords. That compounding is the "avalanche".
- Kyle builds "around 15 supporting pages for each target page", "in sets of five"
  (`sources/youtube-5OYCQL0Q38A.txt`). The tier tells you which keywords go into the next set.

## MEG's tier (computed 2026-09-29 from the local GSC exports)

Source: `Gráfico.csv` inside the zips in `.agents/context/keywords/google-search-console-gsc/`
(daily `Fecha, Clics, Impresiones, CTR, Posición`, Web search, 3 months).

| Export | Period | Daily impressions low / high | Average | Tier |
| :--- | :--- | :--- | :--- | :--- |
| 2026-09-23 | 2026-06-22 to 2026-09-21 | 8 / 291 | 149.5 | **Level 100** (100 to 200) |
| 2026-08-06 | 2026-05-05 to 2026-08-04 | 78 / 499 | 288.5 | Level 200 (200 to 500) |

With clicks (the old method) both periods would be Level 0 (averages 4.5 and 5.5). The tier fell
one level between the two exports. Recompute it with every new GSC export, never reuse this table
as current.

## Honest limits of this reference

- The POP Academy lessons (including Maria's video on "how to filter your keywords") are behind a
  login and were NOT read. Anything they add about filtering (difficulty, search intent, what to
  do with keywords below the tier) is not in this file.
- Kyle does not say which volume source to use. In this repo the monthly volume of a keyword is
  `sources["google-ads"].stats.avgMonthlySearches` or `sources.ubersuggest.stats.volume` in
  `.agents/data/keywords.json` (see CLAUDE.md, "Investigación de keywords"). Say which one you used.
- Avalanche is POP's heuristic, not Google's guidance. Google's documentation in
  `.agents/context/seo/` still decides whether a piece of content should exist at all (people
  first, no scaled content, no doorway pages). A keyword inside the tier is a candidate, never a
  reason to write by itself.
