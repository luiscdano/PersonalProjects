const CACHE_NAME = "yeya-demo-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./village.html",
  "./downtown.html",
  "./los-corales.html",
  "./nosotros.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo-yeya.jpg",
  "./assets/avatar-yeya.jpg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/locales/village-brush.svg",
  "./assets/locales/downtown-brush.svg",
  "./assets/locales/los-corales-brush.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
