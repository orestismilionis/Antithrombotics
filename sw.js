// Service worker: makes the app work offline and keeps it up to date.
// You no longer need to change CACHE when you edit files — the app checks the
// network on every launch and reloads itself when a new version is found.
const CACHE = "antithrombotic-v5";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(new Request(f, {cache:"reload"})).catch(()=>{})))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first, bypassing HTTP caches; fall back to the stored copy when offline.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(new Request(e.request, {cache:"no-store"}))
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, {ignoreSearch:true}))
  );
});
