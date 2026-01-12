/**
 * The Flux Capacitor (Performance Optimizer)
 * Monitors the frame rate (FPS) in real-time.
 * If the device struggles (FPS < 30), it automatically engages 'Low Power Mode',
 * disabling expensive visual effects (Blur, Canvas, Particles) to ensure
 * the interface remains "smooth and premium" on potato devices.
 */

export class FluxOptimizer {
    constructor() {
        this.frameTimes = [];
        this.lastFrameTime = performance.now();
        this.lowPowerMode = false;
        this.violationCount = 0;

        this.startMonitoring();
    }

    startMonitoring() {
        requestAnimationFrame(() => this.loop());
    }

    loop() {
        if (this.lowPowerMode) return; // Stop monitoring if already downgraded

        const now = performance.now();
        const delta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        // Instant FPS
        const fps = 1000 / delta;

        if (fps < 25) { // Threshold for "choppy"
            this.violationCount++;
        } else {
            this.violationCount = Math.max(0, this.violationCount - 1);
        }

        // If sustained lag detected (approx 2-3 seconds of bad frames)
        if (this.violationCount > 120) {
            this.engageLowPowerMode();
        }

        requestAnimationFrame(() => this.loop());
    }

    engageLowPowerMode() {
        this.lowPowerMode = true;
        console.warn('System: Engaging Flux Optimization (Low Power Mode)');

        // Add class for CSS disabling (Blurs, Shadows)
        document.body.classList.add('optimize-performance');

        // Disable Expensive JS Canvases
        // We trigger an event that our modules can listen to
        window.dispatchEvent(new CustomEvent('flux-optimization'));

        if (window.toast) {
            // Optional: minimal notification, or silent. 
            // Silent is more "Neat", so we keep it silent.
        }
    }
}
