/**
 * Relativity Engine (Time Dilation)
 * Simulates the physics of Time Dilation (Special Relativity).
 * When the user interacts rapidly (high-velocity input), the background universe slows down.
 * When static, time flows normally.
 */

export class RelativityEngine {
    constructor() {
        this.velocity = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.lastTime = Date.now();
        this.factor = 1.0; // 1.0 = Normal Time, 0.1 = Slow Motion

        // Expose globally for other engines
        window.timeDilation = 1.0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.calculateMomentum(e));
        document.addEventListener('touchmove', (e) => this.calculateMomentum(e.touches[0]));

        // Decay loop
        this.animate();
    }

    calculateMomentum(e) {
        const now = Date.now();
        const dt = now - this.lastTime;
        if (dt === 0) return;

        const dx = Math.abs(e.clientX - this.lastX);
        const dy = Math.abs(e.clientY - this.lastY);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Immediate velocity
        this.velocity = dist / dt;

        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.lastTime = now;
    }

    animate() {
        // Smoothly interpolate the time factor based on velocity
        // High velocity -> Low Factor (Time Slows Down)
        // Max velocity typically around 5-10 px/ms

        const targetFactor = Math.max(0.1, 1.0 - (this.velocity * 0.2));

        // Lerp towards target (Smooth transition)
        this.factor += (targetFactor - this.factor) * 0.1;

        // Decay velocity (friction)
        this.velocity *= 0.95;

        // Update Global
        window.timeDilation = this.factor;

        // Update CSS Variables for CSS Animations
        // Inverse because animation-duration needs to be HIGHER to be SLOWER
        // So if factor is 0.1 (slow), duration multiplier should be 10x
        const cssMultiplier = 1 / Math.max(0.1, this.factor);
        document.body.style.setProperty('--time-dilation', `${cssMultiplier}s`);

        requestAnimationFrame(() => this.animate());
    }
}
