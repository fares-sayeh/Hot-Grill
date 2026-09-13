const CACHE = 'nexus-shell-v4';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.svg', './icons/icon-512.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  // Prefer fresh app files so a deployment is not trapped behind an older cached UI.
  event.respondWith(
    fetch(request).then((response) => {
      if (response.ok && new URL(request.url).origin === self.location.origin) {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, clone));
      }
      return response;
    }).catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
  );
});
