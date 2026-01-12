/**
 * The Legacy Sky (Retention & Consistency Visualizer)
 * Tracks the user's visits over time (without login) and generates a unique
 * "Star" in the background for each day they return to face their mortality.
 * Over time, this builds a personal "Galaxy of Stoicism".
 * 
 * "Consistency creates the cosmos."
 */

export class LegacySky {
    constructor() {
        this.ctx = null;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'legacy-canvas';
        this.canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[-2]'; // Deep background
        document.body.prepend(this.canvas);

        this.stars = [];
        this.initData();
        this.initCanvas();

        // Listeners
        window.addEventListener('resize', () => this.resize());

        // Render once (static background mostly, maybe subtle twinkle)
        this.animate();
    }

    initData() {
        const historyRaw = localStorage.getItem('chrono-legacy');
        let history = historyRaw ? JSON.parse(historyRaw) : [];

        const today = new Date().toDateString();
        const lastVisit = history.length > 0 ? history[history.length - 1] : null;

        if (lastVisit !== today) {
            history.push(today);
            localStorage.setItem('chrono-legacy', JSON.stringify(history));
        }

        this.generateGalaxy(history.length);
    }

    generateGalaxy(count) {
        // Golden Spiral Distribution
        // x = r * cos(theta), y = r * sin(theta)
        // r = a * theta

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const spacing = 15; // Spread

        for (let i = 0; i < count; i++) {
            const angle = i * 0.5; // Radians
            const radius = spacing * Math.sqrt(i);

            // Add some organic noise
            const x = cx + radius * Math.cos(angle) + (Math.random() - 0.5) * 10;
            const y = cy + radius * Math.sin(angle) + (Math.random() - 0.5) * 10;

            this.stars.push({
                x, y,
                size: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.2, // Base brightness
                pulse: Math.random() * 0.02
            });
        }
    }

    initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // Re-center galaxy? No, keep it persistent or it shifts. 
        // Ideally we would regenerate coordinates relative to center.
        // For now, let's just clear and redraw frames.
        this.stars = [];
        const history = JSON.parse(localStorage.getItem('chrono-legacy') || '[]');
        this.generateGalaxy(history.length);
    }

    animate() {
        // Optimization: Stop if hidden or low power
        if (window.isPageVisible === false) { requestAnimationFrame(() => this.animate()); return; }

        this.ctx.clearRect(0, 0, this.width, this.height);

        const time = Date.now() * 0.001;
        const timeScale = window.timeDilation || 1;

        this.ctx.fillStyle = '#ffffff';

        for (const star of this.stars) {
            // Twinkle effect
            const alpha = star.alpha + Math.sin(time + star.x) * 0.2 * timeScale;
            this.ctx.globalAlpha = Math.max(0.1, Math.min(0.8, alpha));

            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;

        // Draw connections for streaks? No, keep it as points of light.

        requestAnimationFrame(() => this.animate());
    }
}
