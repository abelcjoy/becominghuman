/**
 * The Vitality Engine (Global Lifestream)
 * Visualizes the heartbeat of humanity in real-time.
 * Uses WHO statistics to simulate births (approx 4.3/sec) and deaths (1.8/sec)
 * as distinct, beautiful particles in the background.
 * connecting the user's finite time to the collective stream.
 */

export class VitalityEngine {
    constructor() {
        this.ctx = null;
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-50';
        this.canvas.id = 'vitality-canvas';
        document.body.prepend(this.canvas); // Behind everything

        this.particles = [];
        this.birthRate = 1000 / 4.3; // ms per birth
        this.deathRate = 1000 / 1.8; // ms per death

        this.lastBirth = 0;
        this.lastDeath = 0;

        this.active = true;

        this.init();
        this.animate();

        // Listeners for optimization
        window.addEventListener('flux-optimization', () => { this.active = false; this.ctx.clearRect(0, 0, this.width, this.height); });
        document.addEventListener('visibilitychange', () => { this.active = !document.hidden; });
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createParticle(type) {
        // Type: 'birth' (Life) or 'death' (Void)
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;

        this.particles.push({
            x, y,
            type,
            age: 0,
            life: 100 + Math.random() * 50,
            color: type === 'birth' ? '16, 185, 129' : '255, 255, 255', // Emerald or White
            size: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    updateAndDraw() {
        if (!this.active) return;

        // Clear with fade effect for trails? No, keep it clean.
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Simulation Clock
        const now = performance.now();

        // Time Dilation influence
        const timeScale = window.timeDilation || 1;

        if (now - this.lastBirth > (this.birthRate / timeScale)) {
            this.createParticle('birth');
            this.lastBirth = now;
        }

        if (now - this.lastDeath > (this.deathRate / timeScale)) {
            this.createParticle('death');
            this.lastDeath = now;
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.age += timeScale;

            p.x += p.vx * timeScale;
            p.y += p.vy * timeScale;

            p.life -= 0.5 * timeScale; // Fade speed

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw
            const alpha = Math.min(1, p.life / 50) * 0.4; // Max opacity 0.4
            this.ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
            this.ctx.beginPath();

            if (p.type === 'birth') {
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            } else {
                // Death is a tiny cross or diamond
                this.ctx.rect(p.x, p.y, p.size, p.size);
            }

            this.ctx.fill();
        }
    }

    animate() {
        if (this.active) {
            this.updateAndDraw();
        }
        requestAnimationFrame(() => this.animate());
    }
}
