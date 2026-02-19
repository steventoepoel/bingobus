const CACHE_NAME = "bingo-cache-v2";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "manifest.json",
  "sw.js",

  "icon-192.png",
  "icon-512.png",
  "background.jpg",

  "bingo.mp3",
  "bingo2.mp3",
  "false.mp3",
  "row.mp3",
  "full.mp3",
  "proppen.mp3",
  "bingobus.mp3",
  "beatit.mp3",
  "mammamia.mp3",
  "congratulations.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Navigatie (pagina openen/verversen): probeer netwerk, val terug op cache index.html
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("index.html"))
    );
    return;
  }

  // Overige bestanden: cache-first
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
