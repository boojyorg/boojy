# Backlog — boojy.org

The one planning file for the site: the decisions that shape it, what's next, and unscheduled
items. Shipped work leaves here for `CHANGELOG.md`. How the site works lives in `AGENTS.md` and
`.claude/rules/`.

## Decisions

- **Boojy Cloud is not on the site.** It left the lineup in 2026-08: `/cloud/` and `/account/` 301
  to `/`, the Supabase/Stripe wiring is gone, and the site has no backend. The suite position on
  Cloud (a future possibility) is in the suite root's `VISION.md` §7; the site doesn't mention it.
- **Site map (2026-09; first locked 2026-06-01):** nav pillars Notes · Audio · Design (the suite
  release order) and one utility link, GitHub. Dropped over time: `/roadmap`, `/about`, `/cloud/`,
  `/account/`, the Cloud FAQ, `/news/` (its one post went stale and wrong), the old newsletter
  confirmation page, and the homepage feedback form (now a mailto line under the kept `#feedback`
  anchor). Design is labelled **Preview** via the off-ladder `preview` flag in `site.ts`.
- **Static-first, no SSR, never Vercel.** See `AGENTS.md`.

## Next: homepage polish (brainstormed 2026-09-07, not yet planned)

Needs one to three reference sites and the UI intake before any plan. Items raised so far:

- Wordmarks are black PNGs on a dark ground (Boojy in the hero; Notes, Audio, Design on the cards),
  so the brand is the lowest-contrast thing on the page. Ship them as SVG inked with `currentColor`,
  keeping the coloured glyph. (Also the June review's "wordmark dark-on-dark legibility" item.)
- Notes card: outdated logo and a web-build screenshot. Recapture, and use one screenshot recipe
  for all three cards (same window size, aspect, theme, real-looking content).
- Stage pills over the screenshots read as warning stickers. Move status into the card body as a
  quiet line (version can come from the existing build-time fetch); calm the three solid buttons.
- Fold the Feedback section into Why Boojy as a closing line, keeping the `#feedback` id on it.
- "Always free" wording must survive a possible paid hosted-storage option: say "every app and
  every editing feature", never "every feature".
- Why Boojy: two columns on desktop (story left, promises right) as the card data already
  describes; tighten the story line.
- Hero: the one expressive motion moment (parallax on the starfield, the orbit mark's moon
  becoming the three app glyphs on hover, glow following the hovered card). Keep everything else
  quiet.
- Tighten the vertical rhythm between hero, cards and Why Boojy.

## Unscheduled

- **Auto-rebuild on app release.** A Cloudflare Pages Deploy Hook POSTed from each app's release
  workflow so a new tag rebuilds the site; today baked versions refresh on the next deploy.
  Deliberately deferred while releases are rare.
- **Core Web Vitals not measured.** Run a Lighthouse pass for real LCP / CLS / INP and add the
  Cloudflare Web Analytics beacon (free CWV data).
- **Drop React from the homepage.** The feedback form island is gone, so `Starfield` is the last
  React island on `/`; making it `is:inline` vanilla JS removes React from the homepage entirely.
- **Privacy and terms freshness check.** Carried from June and still real: the privacy page has an
  "Unsubscribe" line from the newsletter era.
- **CSS consolidation** 4 → 1 product stylesheets (June site review, rec #9).
- **Google Search Console (reassess).** A domain property was being verified in June; check whether
  it completed and whether `https://boojy.org/sitemap-index.xml` was submitted. The June list of
  URLs to index included `/cloud/`, which no longer exists.
- **Tailwind/shadcn restyle.** The Astro migration was framework-only; a visual restyle is a
  separate future task.
- **Semantic `a→button`** for the 7 `useValidAnchor` sites (the rule is currently off in
  `biome.json`).
- **Single config-driven download island** — replace the two parallel `AudioDownload` /
  `NotesDownload` components with one.
- **404 self-canonical** without trailing slash.

## Dropped

- The old roadmap's "P3 narrative" (updates storytelling beyond news) and "P5 product registry" —
  News is gone, and `PRODUCT_CARDS` + `STAGE_LABELS` in `site.ts` already are the product model.
