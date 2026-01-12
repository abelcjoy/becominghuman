const CACHE_NAME = 'clarity-v3-ultra';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/js/app.js',
    '/js/data.js',
    '/js/reflections.js',
    '/js/neural.js',
    '/js/aurora.js',
    '/js/monolith.js',
    '/js/gravity.js',
    '/js/zen.js',
    '/js/navigator.js',
    '/js/helios.js',
    '/js/oracle.js',
    '/js/scanner.js',
    '/js/prism.js',
    '/js/warp.js',
    '/js/harmony.js',
    '/js/ambience.js',
    '/js/haptics.js',
    '/js/scramble.js',
    '/js/guardian.js',
    '/js/relativity.js',
    '/js/optimizer.js',
    '/js/observer.js',
    '/js/vitality.js',
    '/js/breath.js',
    '/js/capsule.js',
    '/js/synapse.js',
    '/js/sentinel.js',
    '/js/legacy.js',
    '/js/dial.js',
    '/js/citation.js',
    '/js/strand.js',
    '/js/shield.js',
    '/js/sync.js',
    '/js/entropy.js',
    '/js/voltaic.js',
    '/js/horizon.js',
    '/js/entanglement.js',
    '/js/knowledge.js',
    '/js/atmosphere.js',
    '/js/stardust.js',
    '/js/magnet.js',
    '/js/velocity.js',
    '/js/glint.js',
    '/js/resonance.js',
    '/js/prism.js',
    '/js/lunar.js',
    '/js/oracle.js',
    '/js/biogrid.js',
    '/js/aural.js',
    '/js/shift.js',
    '/js/cardio.js',
    '/js/kinetic.js',
    '/js/semantic.js',
    '/js/aperture.js',
    '/js/lumina.js',
    '/js/typography.js',
    '/js/biosync.js',
    '/js/veil.js',
    '/js/taptic.js',
    '/favicon.svg',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
