/**
 * The Stardust System (Activity Tracing)
 * "We are all made of starstuff."
 * 
 * Accumlates very faint, sparkling particles on the layout over time (simulating cosmic dust).
 * Interaction (Cursor/Touch) "activates" them, causing them to flare and scatter away.
 * This gamifies "keeping the interface alive".
 */

export class StardustSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'stardust-canvas';
        this.canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[5]'; // Above background, below UI
        document.body.prepend(this.canvas); // Actually, put it behind UI but above bg

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 100; // Keep it clean

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Interaction
        document.addEventListener('mousemove', (e) => this.scatter(e.clientX, e.clientY));
        document.addEventListener('touchmove', (e) => this.scatter(e.touches[0].clientX, e.touches[0].clientY));

        // Accumulate dust
        setInterval(() => this.accumulate(), 2000);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    accumulate() {
        if (this.particles.length >= this.maxParticles) return;

        // Add a particle at random position
        this.particles.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5,
            alpha: 0, // Fade in
            targetAlpha: Math.random() * 0.5 + 0.1,
            excited: false
        });
    }

    scatter(x, y) {
        const radius = 100;
        let scattered = false;

        this.particles.forEach(p => {
            const dx = p.x - x;
            const dy = p.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                // Flare up and move away
                const angle = Math.atan2(dy, dx);
                const force = (radius - dist) / radius;

                p.vx += Math.cos(angle) * force * 5;
                p.vy += Math.sin(angle) * force * 5;
                p.excited = true;
                p.alpha = 1; // Bright flash
                scattered = true;
            }
        });

        // If nothing scattered, maybe spawn a new "excited" particle from the cursor (Magic trail)
        // No, keep it "Stardust Accumulation" logic.
    }

    update(deltaTime, pulse, tilt) {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Biometric Kinetic Gravity
            if (tilt) {
                p.vx += tilt.x * 0.02;
                p.vy += tilt.y * 0.02;
            }

            // Physics
            p.x += p.vx;
            p.y += p.vy;

            // Friction
            p.vx *= 0.95;
            p.vy *= 0.95;

            // Fade logic for excited particles
            if (p.excited) {
                p.opacity -= 0.02; // Fade out excited particles
                if (p.opacity <= 0) {
                    this.particles.splice(i, 1); // Remove scattered dust
                    continue;
                }
            } else {
                // Fade in to target
                if (p.alpha < p.targetAlpha) p.alpha += 0.01 * (deltaTime / 16);

                // Drift slightly
                p.x += (Math.random() - 0.5) * 0.2 * timeScale;
                p.y += (Math.random() - 0.5) * 0.2 * timeScale;
            }

            // Draw
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Sparkle
            if (p.excited && Math.random() > 0.8) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
                this.ctx.fillRect(p.x - p.size * 2, p.y, p.size * 4, 1);
                this.ctx.fillRect(p.x, p.y - p.size * 2, 1, p.size * 4);
            }
        }
    }
}
