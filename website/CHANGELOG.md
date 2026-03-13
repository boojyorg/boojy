# Changelog

## 2026-03-13

### Added
- **Favicon** — SVG + PNG fallback + Apple touch icon on all pages
- **OG images** — `og:image` and `og:url` meta tags on all 9 pages; full OG tag set added to privacy, terms, subscribed, and 404 pages
- **Theme-color** — `<meta name="theme-color" content="#13151C">` on all pages for mobile browser chrome
- **`css/legal.css`** — shared stylesheet for privacy and terms pages with `legal-` prefixed classes
- **Nav/footer partials** — `partials/nav.html`, `partials/footer.html`, and `sync-partials.py` for keeping nav/footer consistent across pages

### Changed
- **`privacy.html`** — replaced all inline `style=""` attributes with `legal.css` classes
- **`terms.html`** — replaced all inline `style=""` attributes with `legal.css` classes
- **Cloud card CSS dedup** — extracted shared `.product-cloud-*` classes into `shared.css`, removed ~170 lines of duplicated styles from `audio.css`, `notes.css`, and `hub.css`
- **Lazy loading** — added `loading="lazy"` to 13 below-fold images across hub, audio, notes, and subscribed pages
- **Supabase anon key** — added comments in `cloud/index.html` and `js/account.js` documenting the key is intentionally public (RLS-protected)
- **Cache busting** — created `bump-cache.py` to auto-replace `?v=` strings with git commit hash; all pages now use `?v=89a0dc2`
- **Linux detection** — `detectPlatform()` now recognises Linux and shows Tux icon + "Linux coming soon" with a disabled download button
