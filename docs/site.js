// DiskScan landing page script. No dependencies, no tracking.
// REPO must match the static download href in index.html (kept so the page works with
// scripts disabled) and the asset name in the release workflow.
const REPO = { owner: 'jimmyolsson', name: 'diskscan', asset: 'diskscan-windows-x86_64.zip' };

function downloadUrl(repo) {
  return `https://github.com/${repo.owner}/${repo.name}/releases/latest/download/${repo.asset}`;
}

// True when the page is served over http(s), not opened from a file:// path.
function isServedOverHttp() {
  return /^https?:$/.test(location.protocol);
}

// og:image and og:url must be absolute; resolve them against wherever the page is served
// (GitHub Pages subpath or a domain root). The static values in index.html are the fallback.
function absolutiseMeta() {
  if (!isServedOverHttp()) return;
  const page = new URL('./', location.href);
  const set = (property, url) => {
    const tag = document.querySelector(`meta[property="${property}"]`);
    if (tag) tag.setAttribute('content', url);
  };
  set('og:url', page.href);
  set('og:image', new URL('screenshots/overview.png', page).href);
}

// Fill the version badge from the GitHub API. Any failure (offline, 404 before the first
// release, rate limit, missing asset, bad JSON) leaves the badge hidden and the page as is.
function showReleaseBadge() {
  const badge = document.getElementById('release-badge');
  if (!badge || typeof renderBadge !== 'function') return;
  if (!isServedOverHttp() || typeof fetch !== 'function') return;
  fetch(`https://api.github.com/repos/${REPO.owner}/${REPO.name}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((response) => (response.ok ? response.json() : null))
    .then((release) => {
      const text = renderBadge(release, REPO.asset);
      if (text === null) return;
      badge.textContent = text;
      badge.hidden = false;
    })
    .catch(() => {});
}

function init() {
  const button = document.getElementById('download');
  if (button) button.href = downloadUrl(REPO);
  absolutiseMeta();
  showReleaseBadge();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
