# Roadmap — boojy.org

Ordered intentions for the marketing site. The **current target + live checklist** is in
`dreams.md`; **unscheduled someday** items are in `docs/BACKLOG.md`. This file is the sequence.

Approved 2026-05-31 as the "website audit roadmap." Going slowly, homepage-first; later pages get
ASCII-mockup sign-off before code.

## Phases

- **P0 — Stop the bleeding ✅ (shipped).** Fixed download rot (Notes 404 → build-time fetch of real
  asset URLs via `lib/github-release.ts`; Audio owner `tyrbujac`→`boojyorg` + dynamic version),
  link-checker workflow, aligned legal dates, removed orphaned images.
- **P1 — Homepage ✅ (shipped).** Design-led rebuild on a premium base: Inter, periwinkle-blue
  accent baked as default, cosmic backdrop, unified 2×2 product grid (Audio · Notes · Cloud ·
  Design) driven by `PRODUCT_CARDS` in `site.ts`, release-stage ladder (Early access → Beta → Full
  release), centered "Why Boojy" card, `/news/` content collection (prose monthly notes), and the
  feedback form island. Remaining homepage tails (React-weight, CWV) tracked in `dreams.md`.
- **P2 — Release automation.** CF Pages Deploy Hook POSTed from each app's release workflow so a new
  tag rebuilds boojy.org automatically (baked versions currently only refresh on the next deploy).
- **P3 — Narrative.** Roadmap/updates storytelling beyond `/news/` as the suite matures.
- **P4 — Feedback backend ✅ (shipped 2026-06-20, removed 2026-08).** The `feedback` Edge Function
  (Turnstile verify → `feedback` table) went live, then was removed with the Boojy Cloud drop —
  the form is now a mailto composer (see `.claude/rules/feedback.md`).
- **P5 — Brand / product registry.** A single config-driven product model (extends the
  `STAGE_LABELS` + per-product `stage` work) feeding cards, badges, and meta.
- **P6 — Testing floor.** Baseline ✅ (shipped 2026-06-11, PR #26): vitest unit tests for
  `github-release.ts` + a Playwright smoke suite against the built site, both gating CI. Remaining
  tail: CWV measurement (Lighthouse pass / Cloudflare Web Analytics) — tracked in `dreams.md`.

## Locked decisions (reference)

- **Boojy Cloud is dropped (2026-08, supersedes "free-only" 2026-06-11):** Cloud left the suite
  lineup entirely (see suite `VISION.md` 2026-08 refresh). `/cloud/` and `/account/` are gone
  (301 → `/`), the Supabase/Stripe wiring is removed (the "remove, don't launch" plan of record,
  executed), and the site has no backend.
- **Site map (updated 2026-08; originally locked 2026-06-01):** nav pillars Notes · Audio · Design
  (the suite release order); utility links News · GitHub. `/news/` replaces the old `/updates`
  changelog idea (prose monthly notes, not a blog/RSS). **Dropped:** `/roadmap` page, `/about`,
  and with the Cloud drop `/cloud/`, `/account/`, and the Cloud FAQ.
