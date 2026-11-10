// Preview interactions. NOTHING here transmits form data anywhere.
// Resolve root-absolute asset paths against the site's public base ("" or "/enlightenment"),
// taken from this script's own src. data-zoom was previously left unprefixed in the
// GitHub Pages build, so the dialog opened with a 404 image.
function siteRoot() {
  const script = document.currentScript || document.querySelector('script[src*="assets/site.js"]');
  if (!script || !script.src) return '/';
  try {
    const path = new URL(script.src, location.href).pathname;
    const cut = path.lastIndexOf('/assets/site.js');
    if (cut === -1) return '/';
    const root = path.slice(0, cut) || '';
    return root.endsWith('/') ? root : root + '/';
  } catch { return '/'; }
}
const SITE_ROOT = siteRoot();
function resolveSiteUrl(u) {
  if (!u || /^(https?:|data:|blob:)/i.test(u)) return u;
  const prefix = SITE_ROOT.replace(/\/$/, '');
  if (u.startsWith('/')) {
    if (prefix && (u === prefix || u.startsWith(prefix + '/'))) return u;
    return prefix + u;
  }
  return u;
}

document.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', () => {
  const d = document.getElementById('zoom');
  if (!d) return;
  const img = d.querySelector('img');
  img.src = resolveSiteUrl(b.dataset.zoom);
  img.alt = (b.querySelector('img') && b.querySelector('img').alt) || '';
  d.showModal();
}));
document.querySelectorAll('dialog [data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
document.querySelectorAll('[data-local-only]').forEach(f => {
  const done = () => {
    const s = f.querySelector('.status');
    s.hidden = false;
    s.textContent = 'Preview only: nothing was sent or saved. This form is disconnected until a provider, privacy notice and consent process are approved.';
    f.querySelectorAll('input,textarea').forEach(i => { if (i.type === 'checkbox') i.checked = false; else i.value = ''; });
  };
  f.querySelector('[data-local-submit]').addEventListener('click', done);
});
