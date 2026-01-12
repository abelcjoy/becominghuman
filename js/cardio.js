/**
 * The Cardio-Pulse (Digital Vitality)
 * "The system is alive."
 * 
 * Implements a rhythmic, subsonic pulsation of the entire interface.
 * Synced to a resting heart rate of 60 BPM (1 beat per second).
 * The expansion is microscopic (1.000 -> 1.002), just enough to be "felt" 
 * by the subconscious without blurring text or causing layout shifts.
 */

export class CardioPulse {
    constructor() {
        this.root = document.getElementById('app-container') || document.body;
        this.active = true;
        this.phase = 0;

        // Settings
        this.bpm = 60;
        this.amplitude = 0.0015; // 0.15% scale increase (Very subtle)

        this.init();
    }

    init() {
        // Optimization: Use separate layer to prevent repaints
        // But applying to body/container forces full repaint.
        // Better strategy: Apply to a specific background layer or "Vignette" overlay.
        // Applying scale to text causes sub-pixel jitter.
        // Let's pulse a "Vignette" shadow index instead.

        this.createVignette();
        this.animate();
    }

    createVignette() {
        this.vignette = document.createElement('div');
        this.vignette.className = 'fixed inset-0 pointer-events-none z-[200] mix-blend-multiply opacity-50';
        this.vignette.style.background = 'radial-gradient(circle, transparent 40%, #000 150%)';
        this.vignette.style.transition = 'transform 0.1s linear'; // Smooth updates
        document.body.appendChild(this.vignette);
    }

    animate() {
        if (!this.active || window.app?.isLowPowerMode) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const time = Date.now() / 1000;
        // Heartbeat algorithm (P-Q-R-S-T wave simulation roughly)
        // Simple sine is too robotic. Heartbeat is "Lub-Dub".
        // Lub (0.0): Strong, Dub (0.3): Weaker.

        const cycle = time % (60 / this.bpm); // 0 to 1
        let scale = 1;

        // Lub
        if (cycle < 0.1) {
            scale = 1 + (Math.sin(cycle * 10 * Math.PI) * this.amplitude);
        }
        // Dub
        else if (cycle > 0.2 && cycle < 0.35) {
            scale = 1 + (Math.sin((cycle - 0.2) * 6.6 * Math.PI) * (this.amplitude * 0.6));
        }

        // Apply to vignette scale (breathing edges)
        this.vignette.style.transform = `scale(${scale})`;

        // Also subtly adjust brightness?
        // document.body.style.filter = `brightness(${scale})`; // Too expensive

        requestAnimationFrame(() => this.animate());
    }
}
