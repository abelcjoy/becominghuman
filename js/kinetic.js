/**
 * The Kinetic Engine (Inertial Scroll)
 * "Movement has weight."
 * 
 * Applies a 3D rotational tilt to interface elements based on scroll velocity.
 * - Scroll Down -> Elements tilt backwards (Top moves back).
 * - Scroll Up -> Elements tilt forwards (Bottom moves back).
 * 
 * Adds a physical sense of "Drag" through the digital medium.
 */

export class KineticEngine {
    constructor() {
        this.targets = document.querySelectorAll('.terminal-box, .stat-card, .glass-panel');
        this.lastScrollY = window.scrollY;
        this.velocity = 0;
        this.tilt = 0;

        // Configuration
        this.maxTilt = 5; // Degrees
        this.friction = 0.9;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.animate();

        // Initial setup
        this.targets.forEach(el => {
            el.style.transformStyle = 'preserve-3d';
            el.style.backfaceVisibility = 'hidden';
            // We use a separate transform property to avoid overwriting others?
            // CSS Transform is tricky. We'll append.
        });
    }

    onScroll() {
        const currentY = window.scrollY;
        const delta = currentY - this.lastScrollY;

        // Calculate velocity (pixels per frame roughly)
        // Clamp it
        this.velocity = Math.max(-50, Math.min(50, delta));

        // Apply to tilt target (inverted: Scroll Down (+) -> Tilt Back (+X rotation))
        // RotateX(+) tilts top away.
        this.tilt = this.velocity * 0.5; // Sensitivity

        this.lastScrollY = currentY;
    }

    animate() {
        if (Math.abs(this.tilt) > 0.01) {
            // Decay
            this.tilt *= this.friction;

            // Limit
            const clamp = Math.max(-this.maxTilt, Math.min(this.maxTilt, this.tilt));

            // Apply
            this.targets.forEach(el => {
                // We assume these elements don't have other critical transforms
                // If they do (like hover:scale), this might conflict.
                // Best practice: Wrap interaction contents in a container that transforms, or use matrix.
                // For now, let's check classList.

                // Safe apply:
                el.style.transform = `perspective(1000px) rotateX(${clamp.toFixed(2)}deg)`;
            });
        } else {
            // Reset to clean state when stopped to avoid blur
            if (this.tilt !== 0) {
                this.tilt = 0;
                this.targets.forEach(el => el.style.transform = '');
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}
