/**
 * The Parallax Engine (Gyroscope)
 * Uses device orientation to create a physical depth effect on mobile devices.
 * When users tilt their phone, the background and UI layers shift slightly,
 * creating a window-into-another-world effect.
 */

export class ParallaxEngine {
    constructor() {
        this.active = false;
        this.mx = 0; // Mouse X
        this.my = 0; // Mouse Y
        this.tx = 0; // Tilt X
        this.ty = 0; // Tilt Y

        // Multipliers
        this.bgDeep = 15;
        this.bgMid = 30;

        this.init();
    }

    init() {
        // Desktop: Mouse Parallax
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            this.applyParallax(x, y);
        });

        // Mobile: Gyroscope
        // Permission is required on iOS 13+, this handles the "if available" gracefully
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.handleOrientation(e);
            });
        }
    }

    handleOrientation(e) {
        if (!e.gamma || !e.beta) return;

        // Limit tilt range to avoid extreme shifts
        // Gamma: Left/Right tilt (-90 to 90)
        // Beta: Front/Back tilt (-180 to 180)

        const x = Math.min(20, Math.max(-20, e.gamma)) / 2;
        const y = Math.min(20, Math.max(-20, e.beta - 45)) / 2; // subtract 45 for natural holding angle

        this.applyParallax(x, y);
    }

    applyParallax(x, y) {
        // Apply to key layers if they exist
        const neural = document.getElementById('neural-canvas');
        const aurora = document.getElementById('aurora-canvas');
        const vitality = document.getElementById('vitality-canvas');

        // requestAnimationFrame for smoothness is handled by the browser's transform optimization usually,
        // but let's just set styles directly for responsiveness.

        if (neural) neural.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
        if (vitality) vitality.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        if (aurora) aurora.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
    }
}
