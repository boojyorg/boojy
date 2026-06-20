---
paths:
  - "website/src/components/Feedback.tsx"
  - "website/src/pages/index.astro"
---

# Feedback form (durable facts)

- **`Feedback.tsx`** is a React island (`client:visible`) in the homepage `#feedback` section. Fields:
  type (Bug/Idea/Other), optional email, message, + a **Cloudflare Turnstile** widget. On submit it
  calls `supabase.functions.invoke('feedback', { body: { type, email, message, turnstileToken } })`.
- **Backend is live** (`FEEDBACK_BACKEND_LIVE = true` as of 2026-06-20). The Turnstile widget loads
  on the form; on submit the token is verified server-side by the `feedback` Edge Function in
  `boojy-cloud` before inserting into `public.feedback`. If the Turnstile script is blocked (ad
  blockers), a mailto escape-hatch link shows instead.
- **Email field stays optional** (2026-06 decision): mandatory email kills drive-by bug reports and
  doesn't reduce spam — Turnstile is the spam defense.
- **Anti-spam by design.** A naive public Supabase insert is spammable, so submissions go through an
  Edge Function that **verifies the Turnstile token server-side** before inserting. Don't "simplify"
  this to a direct client insert.
- **Turnstile keys.** The real site key (`0x4AAAAAADoLE2URVx32I0Kn`) is set in `Feedback.tsx`.
  The matching secret key is set as `TURNSTILE_SECRET_KEY` in Supabase secrets. The script is loaded
  explicitly (`render=explicit`) and rendered into a ref.
- **`feedback` Edge Function** lives in the **`boojy-cloud`** repo (like the others — see
  `.claude/rules/supabase.md`): verify Turnstile token → insert into `public.feedback`.
  **Status: live as of 2026-06-20** (deployed from boojy-cloud branch `feedback-function`).
- **Reuse target:** the planned **Cloud paid-tier email waitlist** should reuse this exact pattern
  (Turnstile-verified Edge Function insert), not invent a second anti-spam path.
