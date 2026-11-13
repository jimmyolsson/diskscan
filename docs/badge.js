// Version badge text for the latest GitHub release. Pure: no DOM, no network.
// Loaded as a plain browser script (defines a global) and required by the Node tests.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// release: GitHub "latest release" JSON; assetName: the file to report on.
// Returns e.g. "v0.1.0 · 3.2 MB · 12 Nov 2026", or null if anything is missing or malformed.
function renderBadge(release, assetName) {
  if (!release || typeof release !== 'object' || !Array.isArray(release.assets)) return null;
  const { tag_name: tag, published_at: publishedAt } = release;

  const asset = release.assets.find((a) => a && a.name === assetName);
  if (!asset || !Number.isFinite(asset.size) || asset.size < 0) return null;

  if (typeof tag !== 'string') return null;
  const version = tag.replace(/^v/, '');
  if (!version) return null;

  if (typeof publishedAt !== 'string') return null;
  const published = new Date(publishedAt);
  if (Number.isNaN(published.getTime())) return null;

  // GitHub labels sizes in MB but counts 1 MB as 1024 * 1024 bytes.
  const sizeMb = (asset.size / 1048576).toFixed(1);
  const date = `${published.getUTCDate()} ${MONTHS[published.getUTCMonth()]} ${published.getUTCFullYear()}`;
  return `v${version} · ${sizeMb} MB · ${date}`;
}

if (typeof module !== 'undefined') module.exports = { renderBadge };
