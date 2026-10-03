// Service worker: offline support + update notification.
// No need to edit CACHE after changing files: the app detects a new version and
// shows an "Update" button; the new version activates when the user taps it.
const CACHE = "antithrombotic-v6";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(new Request(f, {cache:"reload"})).catch(()=>{})))));
  // deliberately no skipWaiting(): the page asks for it when the user taps "Update"
});
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(new Request(e.request, {cache:"no-store"}))
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, {ignoreSearch:true}))
  );
});
