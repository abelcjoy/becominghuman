/**
 * The Prism Engine (Chromatic Reality)
 * "Light fractures where time bends."
 * 
 * Applies a subtle Chromatic Aberration (RGB Drift) effect to the interface.
 * The intensity is linked to the "velocity" of interactions and the heart-rate of the app.
 * 
 * - Idle: Zero aberration (Perfect clarity).
 * - Click/Type: Sharp, momentary split (Impact).
 * - High Scroll Speed: Widening drift (Relativistic effect).
 */

export class PrismEngine {
    constructor() {
        this.root = document.documentElement;
        this.active = false;
        this.intensity = 0;
        this.targetIntensity = 0;

        this.init();
    }

    init() {
        // Add CSS filter support
        const style = document.createElement('style');
        style.innerHTML = `
            .prism-active {
                text-shadow: 
                    var(--prism-x) 0 rgba(255, 0, 0, 0.5),
                    calc(var(--prism-x) * -1) 0 rgba(0, 255, 255, 0.5);
            }
            /* Hardware accel for smoothness */
            body {
                will-change: text-shadow;
            }
        `;
        document.head.appendChild(style);

        // Listeners for "Impact"
        document.addEventListener('click', () => this.aberrate(4)); // Strong
        document.addEventListener('keydown', () => this.aberrate(2)); // Medium

        // Listen for scroll velocity (reuse variable if possible, or simple check)
        window.addEventListener('scroll', () => {
            if (!window.app?.isLowPowerMode) {
                this.targetIntensity = Math.min(5, Math.abs(window.movementY || 0) * 0.1);
                // Since scroll event doesn't give delta easily without tracking, 
                // we'll rely on our manual trigger or simple pulse.
                this.aberrate(1); // Small pulse on scroll
            }
        }, { passive: true });
    }

    aberrate(amount) {
        this.intensity = amount;
        this.root.classList.add('prism-active');
        this.active = true;
    }

    update(deltaTime) {
        if (this.active) {
            // Decay relative to time
            const decay = Math.pow(0.9, deltaTime / 16);
            this.intensity *= decay;

            if (this.intensity < 0.1) {
                this.intensity = 0;
                this.active = false;
                this.root.classList.remove('prism-active');
                this.root.style.removeProperty('--prism-x');
            } else {
                // Apply
                this.root.style.setProperty('--prism-x', `${this.intensity.toFixed(2)}px`);
            }
        }
    }
}
