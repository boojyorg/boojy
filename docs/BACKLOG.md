# Backlog — boojy.org

Unscheduled "someday" items. The **ordered sequence** is `docs/ROADMAP.md`; the **current target**
is `dreams.md`. Pull from here into a milestone when it's time.

## Styling / cleanup (no schedule)

- **Tailwind/shadcn restyle.** The Astro migration was framework-only; a visual restyle is a
  separate future task.
- **Semantic `a→button`** for the 7 `useValidAnchor` sites (the rule is currently off in
  `biome.json`).
- **Single config-driven download island** — replace the two parallel `AudioDownload` /
  `NotesDownload` components with one.
- **404 self-canonical** without trailing slash.

## Deferred features

- ~~Cloud paid-tier email waitlist~~ / ~~FaqAccordion remount~~ — dead with the 2026-08 Boojy
  Cloud drop; both removed from the codebase (git history has them).
