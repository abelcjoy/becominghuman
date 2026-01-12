/**
 * Bio-Metric Identity Scrambler (The "Security" Visual)
 * A mesmerizing canvas animation that simulates a high-tech biometric scan
 * of the user's cursor behavior to "authenticate" them as a sovereign human.
 * Adds a layer of narrative security and premium feel.
 */

export class BioScanner {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 z-[100000] bg-black flex items-center justify-center pointer-events-auto transition-opacity duration-1000';
        this.overlay.id = 'bio-scanner-overlay';

        this.canvas = document.createElement('canvas');
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d');

        this.statusText = document.createElement('div');
        this.statusText.className = 'absolute mt-40 font-mono text-xs text-emerald-500 uppercase tracking-[0.3em] animate-pulse';
        this.statusText.innerText = "Verifying Quantum Signature...";

        this.container = document.createElement('div');
        this.container.className = 'relative flex flex-col items-center justify-center';

        this.container.appendChild(this.canvas);
        this.container.appendChild(this.statusText);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);

        this.scanProgress = 0;
        this.particles = [];

        this.initParticles();
        this.animate();
    }

    initParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: 150,
                y: 150,
                angle: Math.random() * Math.PI * 2,
                radius: Math.random() * 100 + 20,
                speed: Math.random() * 0.05 + 0.02
            });
        }
    }

    animate() {
        if (this.scanProgress > 100) {
            this.complete();
            return;
        }

        this.ctx.clearRect(0, 0, 300, 300);
        this.scanProgress += 0.5;

        const center = 150;

        // Draw Rings
        this.ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 + (this.scanProgress / 200)})`; // Emerald
        this.ctx.lineWidth = 1;

        this.particles.forEach(p => {
            p.angle += p.speed;
            const x = center + Math.cos(p.angle) * p.radius;
            const y = center + Math.sin(p.angle) * p.radius;

            this.ctx.beginPath();
            this.ctx.moveTo(center, center);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();

            // Draw Node
            this.ctx.fillStyle = '#10b981';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 1, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw Central Core
        this.ctx.beginPath();
        this.ctx.arc(center, center, 20 + Math.sin(this.scanProgress * 0.2) * 5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(16, 185, 129, ${0.5 + Math.random() * 0.5})`;
        this.ctx.fill();

        // Scan Line
        const scanY = (this.scanProgress / 100) * 300;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#10b981';
        this.ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
        this.ctx.fillRect(0, scanY, 300, 2);
        this.ctx.shadowBlur = 0;

        requestAnimationFrame(() => this.animate());
    }

    complete() {
        this.statusText.innerText = "Identity Verified: Sovereign Human";
        this.statusText.classList.remove('animate-pulse');
        this.statusText.classList.add('text-white');

        // Success Sound (if manager exists in scope, otherwise silent)
        // Fade out
        setTimeout(() => {
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                if (this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
            }, 1000);
        }, 800);
    }
}
