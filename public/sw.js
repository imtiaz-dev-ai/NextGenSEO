/*
 * NextGen SEO — service worker
 *
 * Strategy:
 *   - App shell (HTML): network-first with an offline fallback, so a deploy is
 *     picked up immediately but the site still opens with no connection.
 *   - Hashed build assets (/assets/*): cache-first, they are immutable.
 *   - Fonts & images: stale-while-revalidate.
 *
 * This is what makes a *second* visit feel instant: nothing critical is
 * downloaded again.
 */

const VERSION = 'v3';
const SHELL_CACHE = `ngseo-shell-${VERSION}`;
const ASSET_CACHE = `ngseo-assets-${VERSION}`;
const MEDIA_CACHE = `ngseo-media-${VERSION}`;

const SHELL_URLS = ['/', '/index.html'];

const isAsset = (url) =>
  url.pathname.startsWith('/assets/') ||
  /\.(js|css|woff2?|ttf|otf|eot)$/i.test(url.pathname);

const isMedia = (url) => url.pathname.startsWith('/pics/') || /\.(png|jpe?g|webp|gif|svg|ico|avif)$/i.test(url.pathname);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE && k !== MEDIA_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GETs; never touch POSTs or range requests.
  if (req.method !== 'GET') return;
  if (req.headers.has('range')) return;

  const url = new URL(req.url);

  // Ignore serverless function calls and non-GET API traffic.
  if (url.pathname.startsWith('/.netlify/') || url.pathname.startsWith('/api/')) return;
  if (url.origin !== self.location.origin) return;

  // Immutable hashed build output → cache first.
  if (isAsset(url)) {
    event.respondWith(
      caches.match(req).then((hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(ASSET_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
      ),
    );
    return;
  }

  // Images & fonts → stale-while-revalidate.
  if (isMedia(url)) {
    event.respondWith(
      caches.match(req).then((hit) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              const copy = res.clone();
              caches.open(MEDIA_CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => hit);
        return hit || network;
      }),
    );
    return;
  }

  // Navigations → network first, fall back to the cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((c) => c.put('/index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('/index.html').then((hit) => hit || caches.match('/'))),
    );
    return;
  }

  // Everything else → network, cache as we go.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req)),
  );
});