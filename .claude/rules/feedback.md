---
paths:
  - "website/src/components/Feedback.tsx"
  - "website/src/pages/index.astro"
---

# Feedback form (durable facts)

- **`Feedback.tsx`** is a React island (`client:visible`) in the homepage `#feedback` section.
  Fields: type (Bug/Idea/Other), optional email, message.
- **It is a mailto composer, not a hosted form** (since 2026-08). Submit builds a
  `mailto:tyr@boojy.org` URL with the message prefilled and opens the visitor's own mail app; the
  mail client is the spam gate. The success state tells them to hit send, with a direct
  `mailto:` link as the escape hatch if nothing opened.
- **History:** a Supabase Edge Function + Turnstile backend was live 2026-06-20 → 2026-08, removed
  with the Boojy Cloud drop (the mailto path was originally its fallback). If a hosted backend ever
  returns, the old pattern (server-side Turnstile verify before insert — never a direct client
  insert) is in git history.
- **Email field stays optional** (2026-06 decision): mandatory email kills drive-by bug reports.
