
// CACHE KILL SWITCH - V11
console.log("CACHE KILL SWITCH ACTIVATED. PURGING SYSTEM...");

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
            registration.unregister();
            console.log("SW Unregistered.");
        }
    });
}

if ('caches' in window) {
    caches.keys().then(names => {
        for (let name of names) {
            caches.delete(name);
            console.log("Cache Purged:", name);
        }
    });
}

localStorage.removeItem('cfh_cached_posts'); // Clear database cache
console.log("Local Storage Purged.");

alert("SYSTEM INTEGRITY RESET: V.11 PROTOCOL DETECTED.\n\nPlease tap OK to finalize the update.");
location.reload(true);
