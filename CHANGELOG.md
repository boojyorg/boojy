# Changelog — boojy.org

Changes to the marketing site. Entries under `## Unreleased` as work lands; the suite-wide
convention is in the suite root's `AGENTS.md`.

## Unreleased

### Bug Fixes
- **Privacy page no longer mentions unsubscribing from emails.** The line came from the retired
  Mailchimp newsletter; the site sends no emails. "Last updated" bumped to 2026-09-07.

### Improvements
- **Planning files pruned.** `dreams.md` (a June to-do list) and `docs/ROADMAP.md` are gone; their
  unfinished items and locked decisions live in `docs/BACKLOG.md`, now the one planning file. The
  stale `session-metrics` skill from the Astro migration is removed.
- **Contribution policy simplified** (`CONTRIBUTING.md`, `README.md`): personal project, no
  external code contributions, feedback and bug reports by email to tyr@boojy.org.
- **News removed.** The `/news/` archive, its one post (which still described the retired Boojy
  Cloud sync), the content collection, the homepage "Latest" card, and the nav/footer links are
  gone. `/news` and `/news/*` 301 to `/`.
- **Feedback form replaced by a plain line.** The homepage `#feedback` section now reads "You can
  email me at tyr@boojy.org" with a `mailto:` link. The anchor is kept so app pages and every
  repo's `CONTRIBUTING.md` still land. The React island, its rule file and form styles are removed.
- **Newsletter leftover removed.** `/subscribed/`, the confirmation page from the old Mailchimp
  signup (form removed months ago), is deleted; `/subscribed`, `/subscribed/` and
  `/subscribed.html` 301 to `/`. The site has no account, sign-in or newsletter functionality.
- **Boojy Design labelled "Preview".** Card badge and `/design/` copy say it's a working preview
  that isn't in active development (new off-ladder `preview` flag in `site.ts`).
- **"Why Boojy" copy:** "Open source, once it's ready" → "Open source — every app's code is public
  on GitHub, under GPLv3."
