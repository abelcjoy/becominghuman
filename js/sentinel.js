/**
 * The Connection Sentinel
 * Monitors the "Umbilical Cord" to the global network.
 * If severed, transforms the UI into "Autonomous Mode".
 * Ensures the user feels secure even when offline.
 */

export class ConnectionSentinel {
    constructor() {
        this.statusEl = null;
        this.init();
    }

    init() {
        // Create Status Indicator (Hidden)
        this.createIndicator();

        // Listeners
        window.addEventListener('online', () => this.handleStatus(true));
        window.addEventListener('offline', () => this.handleStatus(false));

        // Initial Check
        if (!navigator.onLine) this.handleStatus(false);
    }

    createIndicator() {
        this.statusEl = document.createElement('div');
        this.statusEl.className = 'fixed top-0 left-0 w-full h-1 bg-red-500 transform -translate-y-full transition-transform duration-500 z-[100000]';

        // Add text label
        const label = document.createElement('div');
        label.className = 'absolute top-1 left-1/2 -translate-x-1/2 bg-red-500 text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-b-lg shadow-lg';
        label.innerText = 'OFFLINE // LOCAL SIMULATION ACTIVE';
        this.statusEl.appendChild(label);

        document.body.appendChild(this.statusEl);
    }

    handleStatus(isOnline) {
        if (isOnline) {
            this.statusEl.classList.add('-translate-y-full');
            document.body.style.filter = '';

            if (window.toast) toast.success('Network Link Re-established');

        } else {
            this.statusEl.classList.remove('-translate-y-full');

            // Visual Desaturation Effect for "Offline Mode"
            document.body.style.filter = 'grayscale(0.8) contrast(1.2)';
            document.body.style.transition = 'filter 1s ease';

            if (window.toast) toast.info('Network Lost. Proceeding autonomously.');
        }
    }
}
