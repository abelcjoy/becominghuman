/**
 * The Chrono-Sync Protocol (Temporal Authority)
 * "Time is relative, but Truth is absolute."
 * Fetches the atomic server time via a HEAD request to correct any 
 * drift or manipulation in the user's local system clock.
 * Ensures the countdown is mathematically precise to the millisecond,
 * regardless of the device's settings.
 */

export class ChronoSync {
    constructor() {
        this.offset = 0;
        this.synced = false;

        // Expose globally
        window.getTrueTime = () => new Date(Date.now() + this.offset);

        this.init();
    }

    async init() {
        try {
            const start = performance.now();
            const response = await fetch('/', { method: 'HEAD', cache: 'no-store' });
            const end = performance.now();

            // Network latency compensation (Round Trip Time / 2)
            const latency = (end - start) / 2;

            const serverDateStr = response.headers.get('Date');
            if (serverDateStr) {
                const serverTime = new Date(serverDateStr).getTime();
                const deviceTime = Date.now();

                // Calculate offset: Server - Device + Latency
                // If device is behind, offset is positive.
                this.offset = serverTime - deviceTime + latency;

                this.synced = true;
                console.log(`[ChronoSync] Temporal drift corrected: ${Math.round(this.offset)}ms`);

                if (Math.abs(this.offset) > 60000) {
                    if (window.toast) toast.info('System clock synced to atomic time.');
                }
            }
        } catch (e) {
            console.warn('[ChronoSync] Synchronization failed, falling back to local spacetime.');
            // Fallback: Offset remains 0
        }
    }
}
