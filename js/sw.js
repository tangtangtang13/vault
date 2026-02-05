const CACHE_NAME = "vault-app-v1";
const FILES = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./vault.html",
  "./manifest.json",
  "./js/auth.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
