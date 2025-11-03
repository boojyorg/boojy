# 🎨 Boojy Suite – Early Preview Design Document

**Version:** 0.1 Preview Phase
**Date:** November 2025 (Week of Nov 3)
**Timeline:** 2-Month Sprint (Weeks 1-10 + analysis)
**Purpose:** Development guide and tester onboarding for Boojy Preview apps

---

## 1) Executive Summary

Boojy Suite is a free, open-source creative ecosystem aimed at hobbyists, students, and indie creators—simple to start, powerful enough to stay. The suite will eventually include:

- **Boojy Audio** — DAW + integrated Score Mode (notation ↔ MIDI round-trip)
- **Boojy Draw** — expressive digital painting/illustration
- **Boojy Design** — approachable photo editing + vector layout
- **Boojy Video** — friendly timeline editor with motion basics (later)
- **Boojy Animate** — 2D frame-by-frame (later)
- **Boojy Cloud** — creative-aware storage, versions, and cross-app handoff

### Why a Preview Phase?

Ship usable, minimal previews fast to validate workflows, test cross-platform builds, prove Cloud sync, and gather feedback that shapes v1.0 priorities.

### Preview cadence (rapid prototypes first, Core after):

- **Weeks 1-2:** Audio Preview (with Score Mode basics)
- **Weeks 3-4:** Draw Preview
- **Weeks 5-6:** Design Preview
- **Weeks 7-8:** Cloud Preview + website
- **Weeks 9-10:** Holistic workflow testing
- **Week 11:** Feedback analysis
- **Week 12:** v1.0 roadmap update

**Note:** A shared Boojy Core Flutter package (theme, shell, panels, file I/O) will be started in parallel, but not block the preview builds.

---

## 2) Preview Philosophy

- **Foundation, not throwaway** — clean architecture; previews evolve into v1.0.
- **Actually usable** — testers should finish a real task in each app.
- **It just works** — GarageBand/iMovie level clarity: 1-click to do the obvious thing.
- **Hobbyist-first** — keep pro features out of Preview unless they remove friction.
- **Privacy-first** — Cloud and analytics are opt-in at first run.

---

## 3) File Types & Interop

### Projects:
- `*.audio` (Audio + Score data)
- `*.draw` (layered raster)
- `*.design` (vector + photo layers)
- `*.animate` (frame stacks; later)

### Interop goals:
- Design opens `.draw` preserving layers.
- Audio exports stems/covers for Design; Score Mode imports/exports MIDI/MusicXML.
- **Exports:** WAV/MP3/FLAC, PNG/JPG/TIFF, SVG/PDF, MIDI/MusicXML.
- **Cloud:** stores projects as-is + metadata + previews.

---

## 4) Boojy Core / Shared UI Engine

**Goal:** Build a unified foundation that all Boojy apps share—think of it as Boojy's skeleton. This is what keeps Adobe's tools feeling like a family. Starting this in Week 1 (parallel to Audio Preview) saves months later and ensures every app feels cohesive.

### Repo & Structure:
- Separate repo: `boojy_core` (Flutter package)
- Each app (Audio, Draw, Design) imports this as a dependency

### What's Inside:
- **App Shell:** consistent window layout (toolbar, side panels, bottom bar, status bar)
- **Shared Theme:** colours, spacing, typography tokens, dark/light modes, accent customisation
- **File Dialogs:** open/save/export with Boojy file type filters (`*.audio`, `*.draw`, `*.design`)
- **Project Autosave:** background save system with conflict resolution
- **File Type Handlers:** recognise and route `.audio`, `.draw`, `.design`, etc.; shared metadata (author, created/modified dates, thumbnails)
- **Common Widgets:** buttons, sliders, colour pickers, panels, modals, tooltips
- **Undo/Redo Framework:** shared history manager for consistent Cmd+Z across apps

### Why This Matters:
- **Consistency:** users learn one UI, work in any app
- **Speed:** don't rebuild menus/dialogs/themes per app
- **Maintainability:** fix a bug once, all apps benefit

### Timeline:
- **Week 1-2:** scaffold shell, basic theme, file dialogs
- **Week 3-4:** autosave system, undo/redo framework
- **Week 5+:** migrate previews to use boojy_core components

---

## 5) Boojy Audio Preview (with Score Mode)

**Goal:** Record a simple multi-track demo, edit MIDI, print a lead sheet.

### Feature set (Preview):
- **Record & Playback:** mic input, import WAV/MP3/FLAC, loop, metronome, waveform zoom.
- **Tracks:** 4-8 audio tracks; per-track mute/solo, pan, fader; colour & naming.
- **MIDI:** basic piano roll (quantize, velocity), record from MIDI keyboard; 2-3 GM-style instruments.
- **FX:** simple per-track chain (EQ-3, compressor, delay/reverb); plugin hosting if stable (toggle off if flaky).
- **Score Mode (integrated):** MIDI ↔ notation (single staff/lead sheet), tempo/keys, quick print/export PDF/MusicXML.
- **Mixdown:** export WAV/MP3 with bitrate/sample-rate options.
- **Project:** save `*.audio`; autosave; Cloud save (opt-in).

**Out of scope (Preview):** buses, advanced automation, time-stretch, deep CC lanes, video sync.

**Success:** record 3-minute demo + basic MIDI + print a simple score; export clean audio; no crashes.

---

## 6) Boojy Draw Preview

**Goal:** Create a finished illustration with natural brushes and simple editing.

### Feature set (Preview):
- **Canvas:** presets (A4, square, HD), custom sizes up to 5000×5000; zoom/pan/rotate.
- **Brushes (5):** pencil, pen, marker, airbrush, eraser; size/opacity; pressure curves; eyedropper; HSV wheel; recent swatches.
- **Layers:** unlimited (RAM-limited); opacity; essential blends (Normal/Multiply/Screen/Overlay/Add); show/hide/lock/merge/reorder.
- **Select & Transform:** rect/lasso/wand (tolerance); move/scale/rotate/flip; feather.
- **History:** undo/redo; compact history list.
- **Project:** save `*.draw`; autosave; Cloud save (opt-in); export PNG/JPG with transparency.

**Out of scope (Preview):** custom brush editor, masks, text, symmetry, filters, animation.

**Success:** artists finish a piece; pressure feels right with stylus; mouse drawing usable with stabilisation; layers feel obvious.

---

## 7) Boojy Design Preview

**Goal:** Edit a photo and design a simple poster/logo with text & vector shapes.

### Feature set (Preview):
- **Photo basics:** import JPG/PNG/TIFF/WEBP; crop/rotate/resize/flip; exposure/contrast/saturation/temperature/vibrance/hue.
- **Layers:** image, shape, text; opacity; blend modes; groups; simple effects (shadow, stroke).
- **Vector:** rectangles (rounded), ellipse, polygon/star, line; pen tool (add/remove points, convert corners/curves); stroke/fill/gradients; snapping/alignment/distribute.
- **Text:** system fonts, size/weight/align, tracking/leading, fill/stroke.
- **Arrange:** move/scale/rotate; bring/send; lock; multi-select.
- **Artboards:** multiple pages/artboards; export PDF/SVG/PNG/JPG (by artboard or whole).
- **Project:** save `*.design`; autosave; Cloud save (opt-in).

**Out of scope (Preview):** masks/adjustment layers, clone/heal, curves/levels, gradient mesh, text on path.

**Success:** poster/logo in <15 minutes; photo edit + text overlay; SVG/PDF export clean; pen tool feels learnable.

---

## 8) Boojy Cloud Preview

**Goal:** Invisible, reliable sync with simple web dashboard.

### Feature set (Preview):
- **Storage:** 1 GB free for testers.
- **Sync:** background sync with optimistic local saves; offline queue; version history; conflict resolution (keep both + label).
- **Web dashboard:** grid/list, thumbnails, filters (Audio/Draw/Design), search, rename, delete/restore (30-day trash), download, share link.
- **Account & Privacy:** email/password, optional 2FA, opt-in analytics toggle.

**Tech (Preview):** Firebase Auth/Firestore/Storage/Functions; Netlify site.

**Out of scope (Preview):** real-time co-edit, comments/annotations, 3rd-party drives, mobile apps.

---

## 9) Testing Plan

**Recruit (10-20):** musicians, illustrators, photographers/designers; mixed Windows/macOS; a few stylus users; a few mouse-only.

### Method:
- **App quick tests (Weeks 2/4/6/8):** 5-10 min silent tasks; note friction.
- **Holistic flow (Weeks 9-10):** "Song + Cover" workflow (Audio→Cloud→Draw→Cloud→Design), multi-device sync, version restore.
- **Feedback:** observation notes, Google Form, GitHub Issues; short follow-ups with engaged testers.

### Success Thresholds:

#### User Experience:
- Avg ≥4/5 rating per app
- ≥70% say they'd use or switch
- ≥80% task completion without help
- **Red flags:** <3/5, frequent crashes, repeated missing-feature requests → promote to v1.0 must-have

#### Technical Metrics:
- ≥99% crash-free rate (zero critical data-loss bugs)
- ≥95% Cloud sync success
- <3s sync latency for typical project sizes (<50 MB)
- Offline mode: queue persists, syncs on reconnect without conflicts
- Startup time: <2s on recommended spec (8 GB RAM, SSD)

#### Per-App KPIs:
- **Audio:** complete 3-track demo in <20 min; MIDI editing feels intuitive; export quality matches source
- **Draw:** finish illustration in one session; pressure/stabilisation rated ≥4/5; layer ops feel obvious
- **Design:** poster/logo in <15 min; pen tool learnable within 5 min; export formats work first try

#### Engagement:
- **Daily Active Testers (DAT):** ≥50% of cohort during active weeks
- **Session length:** avg ≥15 min (indicates real work, not just poking around)
- **Repeat usage:** ≥60% return within 7 days

#### Decision Gates:
- **Green-light to v1.0:** hit ≥4 of 5 success thresholds above + zero blockers
- **Iterate (4 weeks):** 2-3 thresholds, clear fixes identified
- **Pivot:** <2 thresholds, fundamental workflow issues

---

## 10) Week-by-Week (Preview)

### Parallel Track: Boojy Core (Weeks 1-6)
- **W1-2:** shell scaffold, theme tokens, file dialogs
- **W3-4:** autosave framework, undo/redo system
- **W5-6:** migrate previews to boojy_core components

### App Previews:
- **W1-2 (Audio):** recording engine, 4-8 tracks, EQ/comp/reverb, basic MIDI + Score Mode (lead sheet), export, Cloud save.
- **W3-4 (Draw):** canvas, brushes + pressure/stabilisation, layers + blends, selection/transform, export, Cloud save.
- **W5-6 (Design):** photo tools, vector shapes + pen tool, text, artboards, export SVG/PDF, Cloud save.
- **W7-8 (Cloud + Site):** React+Vite+Tailwind site; auth/signup/sign-in; dashboard (thumbs, search, filters, versions); preview downloads page; full flow test.
- **W9-10 (Testing):** recruit, observe, collect forms, triage issues, measure sync success.
- **W11 (Analysis):** cluster feedback, top 5 per app, cost check, risk register.
- **W12 (Roadmap):** lock v1.0 scope, adjust timelines, publish preview report.

---

## 11) After Preview

### If green-lit:
- **Audio v1.0 (Months 3-5):** stability, more automation, better MIDI tools, Score Mode polish, top user requests.
- **Draw v1.0 (Months 6-7):** custom brush editor, masks, symmetry, text, basic filters.
- **Cloud v1.0 (Month 8-9):** paid tiers (Plus 10 GB/£2, Pro 100 GB/£5, Max 1 TB/£15), consider Supabase + Backblaze B2 migration.
- **Design v1.0 (Months 10-12):** masks, curves/levels, clone/heal, better pen ergonomics, export presets.

### If not ready:
4-week iteration on top 3 pain points, re-test, or pivot to the strongest app.

---

## 12) Technical Stack & Architecture

**Apps:** Flutter (desktop first: Windows 10/11, macOS 12+ Intel/Apple Silicon).

### Flutter Details:
- **Version:** Flutter 3.24+ stable (migrate to 3.27+ if released during Preview)
- **Desktop targets:** Windows (x64), macOS (Intel + Apple Silicon universal binary)
- **Target platforms:** Win 10+, macOS 12+ (Monterey)
- **UI framework:** Material 3 with custom Boojy theme via boojy_core

### Audio-Specific:
- **Packages:** flutter_sound, just_audio, dart_midi (or ffi bridges)
- **Native bridges:** PortAudio (cross-platform) or miniaudio for low-latency recording/playback
- **MIDI:** platform MIDI APIs (CoreMIDI on macOS, Windows MIDI on Win)
- **Score rendering:** custom canvas or MusicXML → SVG → Flutter rendering

### Draw-Specific:
- **Custom painting:** Flutter CustomPainter for canvas + brush strokes
- **Stylus input:** pointer events with pressure, tilt (Windows Ink, macOS tablet APIs)
- **Stroke stabilisation:** Kalman filter or weighted averaging
- **Layer compositing:** isolates for large canvas rendering; GPU acceleration via Skia

### Design-Specific:
- **Vector rendering:** custom or flutter_svg for SVG editing/export
- **PDF export:** pdf package (Dart) for multi-artboard layouts
- **Photo adjustments:** GLSL shaders or Dart image manipulation (image package)
- **Pen tool:** Bézier curve editing with Flutter gestures

### File Formats (Internal Structure):
- **Container:** JSON metadata + binary blobs (compressed with gzip or zstd)
- **Example .audio:** `{"version": "0.1", "tracks": [...], "tempo": 120}` + WAV blobs
- **Example .draw:** `{"layers": [...], "canvas": {...}}` + PNG layer data
- **Thumbnails:** embedded 512×512 PNG for Cloud preview
- **Version:** semantic versioning for migration path to v1.0

### Cloud & Backend:
- **Preview:** Firebase Auth, Firestore (metadata), Cloud Storage (files), Cloud Functions (thumbnails, webhooks)
- **Post-preview migration:** evaluate Supabase (Postgres) + Backblaze B2 (cheaper storage) for v1.0
- **Analytics:** opt-in telemetry via PostHog or Mixpanel (privacy-first)

### Website:
- **Stack:** React 18 + Vite, Tailwind CSS, React Router
- **Hosting:** Netlify (CI/CD from GitHub)
- **Forms:** Netlify Forms or HubSpot (email capture)

### Build & CI/CD:
- **GitHub Actions:** build Windows (MSIX), macOS (DMG/PKG) on push to main
- **Code signing:** Apple Developer certs, Windows code-signing cert (budget £100-200/year)
- **Distribution:** GitHub Releases (Preview), later website + auto-update (Sparkle on macOS, Squirrel on Windows)

### Performance Targets:
- **Startup time:** <2s on recommended spec (8 GB RAM, SSD), <4s on minimum (4 GB RAM)
- **Memory usage:** <500 MB idle per app, <2 GB with large project open
- **File size:** `*.audio` <100 MB (10 min, 4 tracks), `*.draw` <200 MB (5000×5000, 20 layers), `*.design` <50 MB (poster)
- **Export time:** realtime or faster (3 min audio exports in <3 min, 4K canvas to PNG in <5s)

### Minimum Spec:
- **OS:** Windows 10 (1809+), macOS 12+
- **CPU:** dual-core 2 GHz+
- **RAM:** 4 GB (8 GB recommended)
- **GPU:** integrated graphics with OpenGL 3.3+ / Metal 2+
- **Display:** 1280×720 minimum, 1920×1080 recommended
- **Storage:** ~500 MB per app, ~1 GB for all three previews
- **Internet:** required for Cloud sync (offline mode available)

### Privacy & Compliance:
- **Cloud + analytics:** opt-in at first run (no silent tracking)
- **GDPR/CCPA:** user data export, deletion requests (Cloud dashboard + email)
- **Local-first:** all projects stored locally; Cloud is backup/sync, not required

---

## 13) Risk Register

### Technical Risks:
- **Audio latency issues on Windows** → mitigation: ASIO driver support, test early
- **Stylus pressure unreliable** → mitigation: test on multiple devices (Wacom, Surface, iPad via sidecar), fallback to size-only
- **Cross-platform file format inconsistencies** → mitigation: strict schema validation, versioned migrations
- **Firebase costs spike with tester load** → mitigation: cap storage at 1 GB, monitor usage, budget £50/month buffer
- **Packaging/code-signing failures** → mitigation: GitHub Actions matrix testing, early cert setup

### Schedule Risks:
- **Boojy Core delays block app previews** → mitigation: Core is parallel track; apps can start with basic UI, migrate later
- **Tester recruitment falls short** → mitigation: recruit 2× target (20-40), incentivise with free Cloud storage
- **Scope creep (feature requests during Preview)** → mitigation: strict "Preview scope lock" after W6; park requests for v1.0
- **Week 9-10 testing reveals showstoppers** → mitigation: W11 is flex week; can extend to W13 if needed

### Product Risks:
- **Low engagement (testers don't return)** → mitigation: weekly check-ins, Discord community, spotlight their work
- **Competing tools too entrenched (GarageBand, Krita free)** → mitigation: emphasise cross-app workflow (Audio→Draw→Design), Cloud sync, open-source ethos
- **Boojy Cloud adoption too low** → mitigation: make sync frictionless (1-click enable), highlight version history, offer more free storage

### Financial Risks:
- **Infrastructure costs exceed budget** → mitigation: Firebase free tier covers ~100 users; budget £100-200/month for Preview
- **No revenue model for v1.0** → mitigation: validate paid Cloud tiers in Preview survey; consider donation/sponsor model

### Community Risks:
- **GitHub contributors don't materialise** → mitigation: clear CONTRIBUTING.md, label "good first issues", weekly office hours
- **Negative feedback/trolling** → mitigation: CoC enforcement, private tester group first, public launch after polish

---

## 14) First-Run Prompts

- "Back up to Boojy Cloud automatically?" `[Enable / Not now]`
- "Share anonymous usage analytics to improve Boojy?" `[Enable / Not now]`

---

## 15) Boojy Market (Roadmap Teaser)

A community space to share brushes, templates, textures, presets, with optional creator tips. Not in Preview; add a "Coming Soon" card on the website/roadmap.

---

## Appendices

### A) Observation Template & Google Form
(Keep your existing templates; they're solid.)

---

## Positioning (for website footer/about)

**Boojy** — Free, open-source creative tools.
Simple enough for hobbyists, powerful enough for professionals.
