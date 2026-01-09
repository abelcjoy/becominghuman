const CACHE_NAME = 'clarity-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/js/app.js',
    '/js/data.js',
    '/js/reflections.js',
    '/favicon.svg',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
