const CACHE_NAME = 'cfh-v1';
const ASSETS = [
    'index.html',
    'style.css',
    'app.js',
    'about.html',
    'privacy.html',
    'terms.html'
];

// Install: Cache core assets (Initial setup)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
        })
    );
});

// Fetch: NETWORK-FIRST Strategy
// This ensures the user ALWAYS sees your latest advice if they have internet.
// If offline, it falls back to the local cache.
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
