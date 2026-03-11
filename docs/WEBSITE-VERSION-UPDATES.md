# Website Version Updates

How version and release info flows from app repos to boojy.org.

---

## Boojy Notes (boojy.org/notes)

**Automatic** — no manual website update needed after a release.

The Notes page fetches the latest version from the GitHub API on page load:

1. `website/js/notes.js` calls `https://api.github.com/repos/boojyorg/boojy-notes/tags?per_page=1`
2. Extracts the tag name (e.g. `v0.1.2`) from the first result
3. Makes a second call to the tag's commit URL to get the commit date
4. Updates `#notes-version` with the formatted string, e.g. `v0.1.2 Beta · 11 March 2026`

**Fallback:** If the API call fails, the static text in `website/notes/index.html` is shown. Update the fallback text when releasing so it doesn't look too stale.

### Release checklist (boojy-notes repo)

1. Bump version in `package.json`
2. Update `CHANGELOG.md`
3. Commit, tag with `git tag v0.x.x`, push tag
4. Website auto-updates — no changes needed in the `boojy` repo
5. (Optional) Update the fallback text in `website/notes/index.html` and push

---

## Boojy Audio (boojy.org/audio)

**Manual** — update `website/js/audio.js` after each release.

Audio's version is hardcoded in `DOWNLOAD_CONFIG` at the top of `website/js/audio.js`:

```javascript
const DOWNLOAD_CONFIG = {
    version: '0.1.0',
    versionDisplay: 'v0.1.0',
    releaseDate: 'Jan 2026',
    baseUrl: 'https://github.com/tyrbujac/boojy-audio/releases/latest/download/',
    ...
};
```

### Release checklist (boojy repo, after publishing the Audio release)

1. Edit `website/js/audio.js`
2. Update `version`, `versionDisplay`, and `releaseDate` in `DOWNLOAD_CONFIG`
3. Commit and push — Cloudflare Pages auto-deploys

### Future improvement

Audio could be migrated to the same dynamic approach as Notes — fetch from `https://api.github.com/repos/tyrbujac/boojy-audio/tags?per_page=1` and display the tag name + commit date. This would remove the manual step.

---

## How deployment works

Both apps' website pages live in the `boojy` repo (`website/` directory). Cloudflare Pages auto-deploys from the `master` branch on push. No build step — it's plain HTML/CSS/JS.
