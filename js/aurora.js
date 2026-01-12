/**
 * Aurora Borealis Effect
 * A subtle, shifting light curtain in the header/background.
 * Adds an ethereal, "northern lights" feel to the void.
 */

export class AuroraEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.className = 'fixed top-0 left-0 w-full h-[30vh] z-[-1] pointer-events-none opacity-40 mix-blend-screen';
        this.canvas.style.maskImage = 'linear-gradient(to bottom, black, transparent)';
        this.canvas.style.webkitMaskImage = 'linear-gradient(to bottom, black, transparent)';
        document.body.appendChild(this.canvas);

        this.t = 0;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight * 0.3;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    animate() {
        if (window.isPageVisible === false) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        if (document.body.classList.contains('optimize-performance')) {
            // Just clear once and stop processing
            this.ctx.clearRect(0, 0, this.width, this.height);
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Time Dilation
        const timeScale = window.timeDilation || 1;
        this.t += 0.005 * timeScale;

        // Create Gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);

        // Ethereal colors (Teal, Purple, Blue)
        gradient.addColorStop(0, `hsla(180, 80%, 50%, ${Math.abs(Math.sin(this.t)) * 0.2})`);
        gradient.addColorStop(0.5, `hsla(260, 80%, 60%, ${Math.abs(Math.cos(this.t * 0.5)) * 0.2})`);
        gradient.addColorStop(1, `hsla(200, 80%, 50%, ${Math.abs(Math.sin(this.t * 0.7)) * 0.2})`);

        this.ctx.fillStyle = gradient;

        // Draw waves
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);

        for (let x = 0; x <= this.width; x += 10) {
            const y = Math.sin(x * 0.003 + this.t) * 50 +
                Math.sin(x * 0.01 + this.t * 2) * 20 +
                this.height * 0.5;
            this.ctx.lineTo(x, y);
        }

        this.ctx.lineTo(this.width, 0);
        this.ctx.lineTo(0, 0);
        this.ctx.fill();

        requestAnimationFrame(() => this.animate());
    }
}
