importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCiJbxoviq2H7AkxrVIXmxwPLNeIwWJOXM",
    authDomain: "cfh-protocol.firebaseapp.com",
    projectId: "cfh-protocol",
    storageBucket: "cfh-protocol.firebasestorage.app",
    messagingSenderId: "576464528755",
    appId: "1:576464528755:web:6aba2a06731c3dbb68d106"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const CACHE_NAME = 'cfh-v5';
const ASSETS = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'manifest.json',
    'assets/icon.svg',
    'assets/social_preview.png'
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

// Notification Click: Open the app
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});
