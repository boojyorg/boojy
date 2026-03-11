(async function () {
    const el = document.getElementById('notes-version');
    if (!el) return;
    try {
        const res = await fetch('https://api.github.com/repos/boojyorg/boojy-notes/tags?per_page=1');
        if (!res.ok) return;
        const tags = await res.json();
        if (tags.length > 0) {
            el.textContent = tags[0].name + ' Beta';
        }
    } catch (e) {
        // Silently keep fallback text
    }
})();
