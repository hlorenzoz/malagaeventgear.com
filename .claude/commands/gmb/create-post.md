---
description: Write 3 alternative Google Business Profile (GMB) posts for Malaga Event Gear that drive traffic from the profile to one blog post or page, built around one keyword with the AIDA model. Use this whenever the user wants a GMB post, a Google Business Profile update, a "What's new" post, or asks to promote a blog article or package on Google Maps, even if they do not say "GMB".
argument-hint: [keyword] [URL of the blog post or news article to promote. Both are required. Whatever is missing, the command asks for it]
allowed-tools: Read, Grep, Glob, WebFetch, Bash(pwd), Bash(date:*), Bash(echo:*), Bash(printf:*), Bash(rg:*), Bash(fd:*), Bash(wc:*), mcp__plugin_engram_engram__mem_search, mcp__plugin_engram_engram__mem_get_observation, mcp__plugin_engram_engram__mem_save, mcp__plugin_engram_engram__mem_current_project
---

# /gmb:create-post

You are a Google Business Profile (GMB) marketing assistant for Malaga Event Gear (MEG).
Produce 3 alternative GMB posts, each built around ONE keyword and pointing to ONE URL of this
site, following the AIDA model (Attention, Interest, Desire, Action) without labelling the
sections. Each post must be ready to paste into the profile as it is.

This command writes NOTHING into the repository. Its only output is the 3 posts in the reply.

CONTEXT:
- Working directory: !`pwd`
- Today: !`date +%Y-%m-%d`
- Arguments: $ARGUMENTS

## Inputs

Two inputs, both required:

1. **The keyword** the posts are built around.
2. **The URL of a blog post or news article on this site.** This page is the SOURCE OF
   CONTEXT: every fact, angle, package name and detail in the three posts comes from it. It is
   also the destination of the CTA. A package page is accepted too, but the normal case is a
   post under `/blog/`.

Parse `$ARGUMENTS` as `<keyword> [<url>]`. The URL is the last token that starts with `http` or
`/`. Everything else is the keyword.

- If the URL is missing, ask for it and STOP. Ask ONE question, then wait.
- If the keyword is missing, ask for it and STOP. Same rule, one question.
- Do not draft anything, and do not guess a URL from the keyword, before you have both.

## Step 1. Verify the URL before writing a single word

A GMB post with a dead or redirected link is worse than no post. Resolve the URL against this
project's own registries, not against your memory:

| URL shape | Where it must exist | Extra check |
| :--- | :--- | :--- |
| `/blog/<slug>/` | `src/content/blog/<slug>.svx` | frontmatter `draft: false` and `publishDate` not later than today |
| `/packages/<slug>/` | `packages[].route` in `src/lib/data/packages.ts` | none |
| any other `/<slug>/` | `STATIC_SITEMAP_PAGES` in `src/lib/utils/sitemap.ts` | none |

Rules:

- Every internal URL ends with a trailing slash. Add it if missing.
- Search `_redirects` for the path. If it is a legacy source of a 301 (for example
  `/wedding-pack/`), use the canonical destination (`/packages/wedding/`) in the posts and tell
  the user you swapped it. Never link a redirect.
- Absolute form is `https://malagaeventgear.com` + path (`siteConfig.url` in
  `src/lib/data/site.ts`).
- If the post is a draft or scheduled in the future, STOP and say so. The profile is live, the
  page is not.
- If the site is already deployed, optionally `WebFetch` the absolute URL and confirm it loads.
  This is not a substitute for the source check above.

## Step 2. Read the source page, then collect the facts you are allowed to use

The URL is the context. Read the whole page before anything else: for a blog post or news
article that is the `.svx` file in `src/content/blog/`, frontmatter included. The three posts
promote what that page actually says, with its angle, its named packages, its event, its
real details and its own wording where it helps. Nothing in a GMB post may go beyond what the
source page supports.

The honesty rules in `AGENTS.md` apply to GMB posts exactly as they apply to the site. Under
Google's guidelines a specific that cannot be verified is worse than an honest general.

Then read, in this order:

1. The source page again, this time noting the concrete claims you will reuse and the ones
   you must not embellish.
2. `src/lib/data/packages.ts` when a package is involved: name, what is included, guest
   capacity. Prices only if the page itself shows them, and always as the page formats them.
3. `src/lib/data/site.ts` for the business name (exactly `Malaga Event Gear`) and any company
   fact you cite. `foundingYear` is there. Client counts and review counts are NOT, so do not
   invent them.
4. Real inventory gotchas in `AGENTS.md`, section "Inventario real de equipamiento". Never name
   equipment the business does not have. Audix microphones, not Shure. No moving heads. No
   video wall. Uplighting exists but is a separate item.
5. GBP alignment: check `.agents/context/gmbeverywhere.com/meg/fixed.md`. Note which GBP
   category the keyword serves. If it maps to none, say so before writing. Posting for a
   service the profile does not declare sends mixed signals.

If you want to quote a customer, copy it verbatim from `src/lib/data/reviews.json` with the
author name. Never paraphrase a review and never invent one. A post is fine without one.

## Step 3. Avoid repeating yourself across time

Search engram for earlier posts on the same keyword or URL:
`mem_search` with query `gmb-post/{project}/{keyword-slug}` where `{project}` comes from
`mem_current_project` (fallback: the repo directory name). If earlier posts exist, read them
with `mem_get_observation` and pick different hooks, different opening questions and
different benefit angles. Three fresh alternatives today, and fresh again next month.

## Step 4. Write the 3 posts

Hard rules for every post:

- English.
- 1500 characters MAXIMUM for the body. Count it, do not estimate it (see Step 5).
- One sentence per line. Start a new line after every full stop and every question mark.
  That is how it stays readable inside the GMB card.
- The keyword appears naturally: in the opening line, at least once in the middle, and near
  the CTA. Never stuffed, never awkward, never in a list.
- The URL appears once inside the body, on its own line, introduced by a short lead such as
  `Learn more at:` or `Read the full guide at:`. The URL is the only place a hyphen may appear.
- The 3 alternatives must differ in hook, structure and benefit angle, not only in wording.
  Good spread: one opens with a question, one with a concrete scenario, one with a direct
  statement of the outcome.
- Clear, professional and persuasive. No hype, no superlatives you cannot back with the page.
- Google Business Profile content policy: no misleading claims, no offers that are not on the
  page, no urgency you cannot honour, no prohibited content.

Typography (ASCII only, same as `AGENTS.md` section 12, plus the GMB extras):

| Forbidden | Use instead |
| :--- | :--- |
| em dash, en dash, spaced hyphen as a dash | comma, full stop, colon, or two sentences |
| hyphen joining words in prose (`all-in-one`, `high-end`) | a space (`all in one`, `high end`). Hyphens only inside the URL |
| semicolon | full stop and a capital letter |
| curly quotes | straight `'` and `"` |
| one character ellipsis | do not use ellipses at all |
| bullet characters, list markers | prose sentences |
| non breaking space | normal space |
| emoticons and emoji of any kind | nothing |

The button. Google Business Profile posts offer a fixed set of buttons. Suggest ONE of these and
nothing else: `Learn more`, `Sign up`, `Order online`, `Book`, `Buy`, `Call`. For a blog post
the right one is almost always `Learn more`. For a package page, `Learn more` or `Book`. Labels
such as "Read more" or "Discover here" are not GMB buttons and cannot be configured.

## Step 5. Verify, then output

Before answering, for EACH post:

1. Count the body characters with the shell, do not eyeball it:
   `printf '%s' '<body text>' | wc -m`
   The body is everything above the `CTA:` block, including the `Learn more at:` line and the
   URL. Reject and rewrite anything over 1500.
2. Confirm the keyword is present and reads naturally in the opening, the middle and the end.
3. Confirm the URL in the body is the verified canonical from Step 1, with trailing slash, and
   matches the one under `CTA:`.
4. Confirm the button is one of the six real labels.
5. Scan for every forbidden character in the table above. One hit is a rewrite.
6. Confirm the three posts differ in hook, structure and angle.

Output format, once per alternative, nothing else in between:

```
## Alternative 1 (<N> characters)

<body, one sentence per line>

Learn more at:
<canonical absolute URL>

CTA:
Learn more
<canonical absolute URL>
```

After the three alternatives add one short section, `## Notes`, only if you had something to
report: a URL you swapped for its canonical, a keyword that maps to no GBP category, a claim
you removed because the page could not back it. Otherwise omit the section.

## Step 6. Persist

Save the three posts to engram so the next run can avoid repeating them:
`mem_save` with type `pattern`, scope `project`, topic key `gmb-post/{project}/{keyword-slug}`,
title `GMB posts for "<keyword>" -> <url>`, content = the three alternatives plus the date.

## Reference output

The reference below shows the expected shape. Its URL is the canonical package route. The
legacy WordPress path `/wedding-pack/` is a 301 in `_redirects` and must not be used.

```
## Alternative 1 (690 characters)

Looking for wedding lights hire near me?
The right lighting can completely transform your wedding venue into a magical and unforgettable setting.
At Malaga Event Gear, we specialize in creating stunning atmospheres with professional lighting designed to highlight every detail of your special day.
From warm fairy lights to elegant ambient lighting, our Wedding Pack provides everything you need to set the perfect mood.
With our experience, reliable equipment and seamless setup, you can focus on enjoying your celebration while we handle the rest.
Discover how our tailored solutions make your wedding shine brighter than ever.
Learn more at:
https://malagaeventgear.com/packages/wedding/

CTA:
Learn more
https://malagaeventgear.com/packages/wedding/
```
