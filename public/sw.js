// public/sw.js
//
// Minimal, hand-written service worker for MEC Hub.
//
// Why hand-written instead of a library (next-pwa, etc.):
// Next.js 16 changed how the build pipeline and config are validated,
// and PWA libraries like next-pwa wrap next.config.ts in ways that
// stop resolving cleanly on 16 (mixed CJS/ESM export, missing/broken
// peer deps). A plain file in /public needs none of that — Next serves
// anything under /public verbatim at the same path, so /sw.js "just
// works" with zero config changes and nothing to go out of date.
//
// Strategy:
// - Pre-cache the app shell (home page + manifest + icons) on install,
//   so the installed app has something to show immediately.
// - Navigations (clicking around the site): network-first, falling
//   back to the cached shell when offline. This site's whole purpose
//   is pointing students at the latest Drive links, so fresh data
//   always wins when there's a connection.
// - Other same-origin GET requests (css/js/images): cache-first, with
//   the network response cached for next time.
// - Anything cross-origin (Google Drive links, fonts, etc.) is left
//   completely alone — this SW never intercepts or caches those.

const CACHE_NAME = "mec-hub-v1";

const APP_SHELL = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png", "/logo.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      // Activate this SW immediately instead of waiting for all tabs
      // of the old one to close.
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only ever handle simple same-origin GETs. Anything else (POST,
  // cross-origin Drive/font/analytics requests) passes straight
  // through untouched.
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        () => caches.match(request).then((cached) => cached || caches.match("/"))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Only cache successful, basic (same-origin) responses.
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
