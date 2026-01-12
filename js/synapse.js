/**
 * Synaptic Link Engine (The Digital Handshake)
 * Creates physical connections (lines) between the user's presence (cursor)
 * and the interface elements (buttons, inputs) when near.
 * Gives the UI a sense of "anticipation" and intelligence.
 */

export class SynapticEngine {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'synaptic-canvas';
        this.canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[9999]'; // Top layer
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.targets = [];
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.active = window.matchMedia('(min-width: 768px)').matches; // Desktop only for optimal UX

        if (this.active) {
            this.init();
            this.animate();
        }
    }

    init() {
        // Cache targets (buttons, inputs, links)
        this.scanTargets();

        // Re-scan on resize or periodically
        window.addEventListener('resize', () => {
            this.resize();
            this.scanTargets();
        });

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Optimization
        document.addEventListener('visibilitychange', () => {
            this.active = !document.hidden && window.matchMedia('(min-width: 768px)').matches;
        });

        this.resize();
    }

    scanTargets() {
        // We only want prominent interactive elements
        const elements = document.querySelectorAll('button:not(.hidden), input:not([type="hidden"]), a.footer-link');
        this.targets = Array.from(elements).map(el => {
            const rect = el.getBoundingClientRect();
            // Store center point relative to viewport
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                el: el // Keep ref to check visibility if needed
            };
        });
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    animate() {
        if (!this.active) {
            // Check again in a bit
            // requestAnimationFrame(() => this.animate()); 
            // Better to stop and restart? Let's just loop low cost.
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Optimization: if mouse is off screen do nothing
        if (this.mouseX < 0 || this.mouseX > this.width) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const threshold = 150; // px

        this.ctx.lineWidth = 1;

        for (const target of this.targets) {
            // Simple distance check
            const dx = this.mouseX - target.x;
            const dy = this.mouseY - target.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < threshold * threshold) {
                const dist = Math.sqrt(distSq);
                const opacity = 1 - (dist / threshold);

                // Draw Link
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouseX, this.mouseY);
                this.ctx.lineTo(target.x, target.y);

                // Dynamic Color based on Helios? No, standard sci-fi white/cyan is best.
                // Let's use clean white for high contrast premium feel.
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
                this.ctx.stroke();

                // Draw little anchor point on target
                this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
                this.ctx.beginPath();
                this.ctx.arc(target.x, target.y, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}
