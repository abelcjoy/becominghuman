
const CACHE_NAME = 'cfh-v13-KILL-SWITCH';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log("SW Install: Kill Switch Active");
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log("SW Activate: Deleting Cache", cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            console.log("SW Activate: All Caches Cleared. Claiming Clients.");
            return self.clients.claim();
        }).then(() => {
            // Force reload all open tabs
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => client.navigate(client.url));
            });
        })
    );
});

// Fetch listener that bypasses everything
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
