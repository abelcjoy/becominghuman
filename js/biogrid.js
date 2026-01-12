/**
 * The Bio-Metric Grid (Infinity Floor)
 * "The path forward is infinite."
 * 
 * Renders a 3D perspective grid in the background that moves endlessly forward.
 * The lines are incredibly faint (opacity 0.03) to simulate a "Holodeck" or "Simulation" feel.
 * Optimized via OffscreenCanvas where possible, or just smart rendering.
 */

export class BioMetricGrid {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'bio-grid';
        this.canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[-5]'; // Deep background
        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.offset = 0;
        this.speed = 0.5;

        this.active = true;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    animate() {
        if (!this.active || window.app?.isLowPowerMode) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Time Dilation
        const timeScale = window.timeDilation || 1;
        this.offset = (this.offset + this.speed * timeScale) % 40; // Grid size 40

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 1;

        // Perspective Horizon
        const horizonY = this.height * 0.4; // 40% down
        const fov = 300; // Field of view

        this.ctx.beginPath();

        // Horizontal Lines (Moving forward)
        // We draw from Z=near to Z=far
        // Z goes from 1 to infinity
        // Y screen pos = horizonY + (fov / z)

        // Simplified: Just draw horizontal lines accelerating towards horizon?
        // Let's do a pseudo-3D plain floor

        for (let z = 10; z < 1000; z += 40) {
            // Apply movement offset to Z
            const d = z - this.offset;
            if (d < 1) continue;

            // Project
            const scale = fov / (d);
            const y = horizonY + (100 * scale);

            if (y > this.height) continue;

            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }

        // Vertical Lines (Cone perspective)
        const centerX = this.width / 2;
        for (let x = -1000; x <= 1000; x += 40) {
            // Line from center (horizon) to outward bottom
            // Vanishing point is (centerX, horizonY)

            // Need to project x based on z
            // x_screen = centerX + (x * scale)

            // We draw a ray from vanishing point
            // x_bottom = centerX + (x * (fov / nearZ)) roughly

            // Let's just draw radial lines from vanishing point
            const radX = centerX + (x * 2); // Spread at bottom

            this.ctx.moveTo(centerX, horizonY);
            this.ctx.lineTo(radX, this.height);
        }

        this.ctx.stroke();

        // Fog Mask (Fade out near horizon)
        const grad = this.ctx.createLinearGradient(0, horizonY, 0, this.height);
        grad.addColorStop(0, 'rgba(0,0,0,1)'); // Full mask at horizon
        grad.addColorStop(0.2, 'rgba(0,0,0,0)'); // Transparent below

        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, horizonY, this.width, this.height - horizonY);

        requestAnimationFrame(() => this.animate());
    }
}
