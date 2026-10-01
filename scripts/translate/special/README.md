# Per post facts for the translator brief

`bun scripts/translate/mkbrief.ts <slug>` (or `just post-translate-brief <slug>`) builds the brief
of one post: `../brief-base.md` with `{slug}` and `{today}` filled in, then this folder's
`<slug>.md` when it exists, then a standard tail (structure guard, repo etiquette, today's date).

## The convention

`scripts/translate/special/<slug>.md` holds the facts of ONE post that must stay verbatim in the
12 translations and that the base brief cannot know. It is optional: a post with nothing special
needs no file. The file is plain Markdown that gets appended to the brief as is, so write it as
instructions to the translator, one bullet per topic, each bullet starting with `- `.

What belongs in it:

- The role of the post in the silo (supporting, pillar, news, standalone) and its `targetPage`.
- How to build the locale keyword for this topic, and which sibling keywords it must not contain
  or be contained in.
- Facts and numbers that stay exactly (prices, capacities, package contents, honest negations
  with their hedge).
- Quoted reviews: who, in which language, and the exact markup (reviews are never translated).
- Images: id, the English alt and caption, and any rule (stock photo, "province" and not the city).
- Structure that must survive: script imports, component placement, table shape, in-page anchors.

What does NOT belong in it: general lessons (they go in `../brief-base.md`) and anything that
contradicts CLAUDE.md. Never invent a fact, copy it from the English post or from CLAUDE.md.
Facts of the business come from CLAUDE.md ("Lo que este proyecto declara").

Rule 12 applies to this file too: ASCII punctuation, no semicolons in prose.

## Template

```
- SPECIAL FOR THIS POST (`<slug>`): a <supporting|pillar|news|standalone> post whose targetPage is <url or none>. English keyword "<keyword>". Build each locale keyword as <how>, distinct from every other keyword in the content map (neither contains nor is contained in another, in Chinese watch substrings). Existing translated posts may link here: grep `/blog/<slug>/` in the locale and align to the head term those anchors use.
- Facts that stay exactly: <prices, capacities, package contents, honest negations and their hedges>.
- Review: <author> is quoted <inline|in a blockquote> in <language>: keep the quotation VERBATIM with `lang="<xx>"`, translate only <the attribution words>.
- Images: (<id>) alt "<English alt>" caption "<English caption>" (<real photo of ... | STOCK PHOTO, the caption must keep saying it is illustrative>).
- Structure: <script imports, where InlineCTA and ImageMarquee sit, table shape, table of contents>.
- In-page anchors: compute every `#fragment` with github-slugger on your translated heading (by script) and rewrite every in-page link. Links to other posts and packages stay in English form.
```

## Examples

Real files written for earlier posts, kept as references (not used by `mkbrief.ts`, which only
reads `special/<slug>.md`):

- `_examples/supporting-post.md`: a supporting post with an inline Spanish review and one image.
- `_examples/supporting-post-with-package-table.md`: a supporting post with a package comparison
  table, a nested table of contents and several component placements.
- `_examples/standalone-opinion-post.md`: a standalone first person post with two reviews in two
  languages and eight images, some of them stock photos.
