/**
 * Inertial Warp Engine
 * Applies subtle kinetic distortion to the interface based on mouse velocity.
 * Creates a feeling that the UI has physical mass and inertia.
 */

export class InertialWarp {
    constructor() {
        this.root = document.documentElement;
        this.lastX = 0;
        this.lastY = 0;
        this.timeout = null;
        this.active = window.matchMedia('(min-width: 768px)').matches; // Desktop only for performance

        if (this.active) {
            document.addEventListener('mousemove', (e) => this.handleMove(e));
        }
    }

    handleMove(e) {
        // Calculate velocity
        const velocityX = e.clientX - this.lastX;

        this.lastX = e.clientX;
        this.lastY = e.clientY;

        // Apply slight skew based on horizontal velocity
        // Clamp to avoid extreme distortion (Max 1.5 degrees)
        const skew = Math.max(-1.5, Math.min(1.5, velocityX * 0.05));

        // Apply to body body for global feeling
        // heavily damped for smoothness
        document.body.style.transform = `skewX(${skew * -1}deg)`;
        document.body.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        // Reset
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            document.body.style.transform = `skewX(0deg)`;
            document.body.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
    }
}
