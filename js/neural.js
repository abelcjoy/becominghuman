/**
 * Neural Background
 * Creates a subtle, flowing neural network background effect.
 * Pure canvas implementation for performance and clean aesthetics.
 */

export class NeuralBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.className = 'fixed inset-0 z-[-1] opacity-30 pointer-events-none mix-blend-screen';
        document.body.prepend(this.canvas); // Prepend to be at the very bottom

        this.nodes = [];
        this.resize();
        this.init();

        window.addEventListener('resize', () => this.resize());
    }

    update() {
        // observer: Pause if tab hidden
        if (window.isPageVisible === false) return;

        // optimizer: Disable calculations if low power mode active
        if (document.body.classList.contains('optimize-performance')) return;

        // Respect Global Time Dilation
        const timeScale = window.timeDilation || 1;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.init(); // Re-init nodes on resize
    }

    init() {
        this.nodes = [];
        const count = Math.floor((this.width * this.height) / 25000);

        for (let i = 0; i < count; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }

    update(deltaTime) {
        // observer: Pause if tab hidden handled by LifeEngine

        // optimizer: Disable calculations if low power mode active
        if (document.body.classList.contains('optimize-performance')) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Physics update
        this.nodes.forEach(node => {
            // Apply Kinetic Drift (Tilt)
            if (tilt) {
                node.vx += tilt.x * 0.05;
                node.vy += tilt.y * 0.05;
            }

            node.x += node.vx;
            node.y += node.vy;

            // Constrain
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;

            // Pulsate size based on heartbeat
            const currentSize = node.size * (1 + (pulse * 0.5));

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
            // Pulse glow
            this.ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity + (pulse * 0.2)})`;
            this.ctx.fill();
        });

        // Draw Connections
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distSq = dx * dx + dy * dy; // optimization: use dist squared

                if (distSq < 22500) { // 150*150
                    const dist = Math.sqrt(distSq);
                    this.ctx.globalAlpha = 1 - (dist / 150);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }
}
