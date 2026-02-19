const CACHE_NAME = "bingo-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "bingo.html",

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

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
