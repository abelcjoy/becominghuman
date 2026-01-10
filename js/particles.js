/**
 * Time Dust Particle System
 * Represents the entropy of time slipping away.
 * Particles slowly fall like hourglass sand and react to cursor movement.
 */

export class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 150; // Performance friendly count
        this.width = 0;
        this.height = 0;
        this.mouse = { x: -1000, y: -1000 };
        this.isRunning = false;

        this.init();
    }

    init() {
        // Create Canvas if it doesn't exist
        this.canvas = document.getElementById('entropy-canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'entropy-canvas';
            this.canvas.className = 'fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen';
            document.body.prepend(this.canvas);
        }

        this.ctx = this.canvas.getContext('2d');

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse interaction
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Create initial particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }

        this.start();
    }

    createParticle() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.5 + 0.2, // Fall speed
            speedX: (Math.random() - 0.5) * 0.2, // Drift
            opacity: Math.random() * 0.5 + 0.1,
            life: 1.0 // For eventual death if needed (not used now for perf)
        };
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    animate() {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Audio Reaction
        let audioMod = 0;
        if (window.audioAnalyser) {
            try {
                const data = new Uint8Array(window.audioAnalyser.frequencyBinCount);
                window.audioAnalyser.getByteFrequencyData(data);
                const avg = data.reduce((a, b) => a + b) / data.length;
                audioMod = avg / 50; // Normalize 0-255 to approx 0-5
            } catch (e) {
                audioMod = 0;
            }
        }

        this.particles.forEach(p => {
            // Physics
            p.y += p.speedY + (audioMod * 0.5);
            p.x += p.speedX;

            // Mouse Interaction (Push away)
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Audio expands interaction radius
            if (dist < 100 + (audioMod * 20)) {
                const force = (100 - dist) / 100;
                const angle = Math.atan2(dy, dx);
                p.x += Math.cos(angle) * force * 5;
                p.y += Math.sin(angle) * force * 5;
            }

            // Wrap around
            if (p.y > this.height) {
                p.y = -10;
                p.x = Math.random() * this.width;
            }
            if (p.x > this.width) p.x = 0;
            if (p.x < 0) p.x = this.width;

            // Render
            this.ctx.beginPath();
            const size = p.size + (audioMod * p.size); // Pulse size
            this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity + (audioMod * 0.1)})`;
            this.ctx.fill();

            // Connect nearby particles (Constellation Effect)
            for (let j = 0; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist2 < 80 + (audioMod * 50)) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist2 / (80 + audioMod * 50))})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}
