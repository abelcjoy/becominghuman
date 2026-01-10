export class LifeGrid {
    constructor(app) {
        this.app = app;
        this.canvas = null;
        this.ctx = null;
        this.width = 0;
        this.height = 0;
        this.weeksPerYear = 52;
        this.totalYears = 90; // Standard view
        this.dob = null;
    }

    init(dob) {
        this.dob = new Date(dob);
        this.canvas = document.getElementById('life-grid-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        // Animation props
        this.pulse = 0;
        this.isHovering = false;
        this.animationFrame = null;

        // Handle resizing
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        });

        // Interactive tooltip
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleHover(e);
            this.isHovering = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            const info = document.getElementById('grid-info');
            if (info) info.innerText = 'Hover to inspect time';
            this.isHovering = false;
        });

        this.startAnimation();
    }

    startAnimation() {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

        const loop = () => {
            this.pulse = (Math.sin(Date.now() / 200) + 1) / 2; // 0 to 1 oscillation
            this.draw();
            this.animationFrame = requestAnimationFrame(loop);
        };
        loop();
    }

    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = Math.min(600, this.totalYears * 7); // Aspect ratio management
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    draw() {
        if (!this.ctx || !this.dob) return;

        // Clear
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Dimensions
        const boxWidth = (this.width - 20) / this.weeksPerYear;
        const boxHeight = (this.height - 20) / this.totalYears;
        const boxSize = Math.min(boxWidth, boxHeight) * 0.8;
        const gap = boxSize * 0.2;

        // Calculate age
        const now = new Date();
        const diffTime = Math.abs(now - this.dob);
        const weeksLived = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

        for (let year = 0; year < this.totalYears; year++) {
            for (let week = 0; week < this.weeksPerYear; week++) {
                const absoluteWeekIndex = (year * 52) + week;
                const x = 10 + (week * (boxSize + gap));
                const y = 10 + (year * (boxSize + gap));

                // Color Logic
                if (absoluteWeekIndex < weeksLived) {
                    // Past
                    // Subtle "Memory Flicker": occasionally dim a random square for a frame
                    const isFlickering = Math.random() > 0.9995;
                    this.ctx.fillStyle = isFlickering ? '#aaaaaa' : '#ffffff';
                    this.ctx.globalAlpha = isFlickering ? 0.7 : 1.0;
                    this.ctx.fillRect(x, y, boxSize, boxSize);

                } else if (absoluteWeekIndex === weeksLived) {
                    // Current Week - LIVING PULSE
                    this.ctx.fillStyle = '#ef4444';

                    // Pulse Scale & Opacity
                    const pulseScale = 1 + (this.pulse * 0.3); // 1.0 to 1.3
                    const offset = (boxSize * pulseScale - boxSize) / 2;

                    this.ctx.globalAlpha = 0.6 + (this.pulse * 0.4); // 0.6 to 1.0
                    this.ctx.fillRect(x - offset, y - offset, boxSize * pulseScale, boxSize * pulseScale);

                    // Glow Effect
                    this.ctx.shadowBlur = 10 * this.pulse;
                    this.ctx.shadowColor = 'red';
                    this.ctx.fillRect(x, y, boxSize, boxSize); // Draw solid core
                    this.ctx.shadowBlur = 0; // Reset

                } else {
                    // Future - Quantum Probabilistic Shimmer
                    this.ctx.fillStyle = '#ffffff';

                    // Creates a wave that moves across the grid representing uncertainty
                    const shimmer = (Math.sin((Date.now() / 500) + (absoluteWeekIndex / 100)) + 1) / 2;

                    this.ctx.globalAlpha = 0.05 + (shimmer * 0.08); // Vary between 0.05 and 0.13
                    this.ctx.fillRect(x, y, boxSize, boxSize);
                }
            }
        }
    }

    handleHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const boxWidth = (this.width - 20) / this.weeksPerYear;
        const boxHeight = (this.height - 20) / this.totalYears;
        const boxSize = Math.min(boxWidth, boxHeight) * 0.8;
        const gap = boxSize * 0.2;

        const weekIdx = Math.floor((mouseX - 10) / (boxSize + gap));
        const yearIdx = Math.floor((mouseY - 10) / (boxSize + gap));

        if (weekIdx >= 0 && weekIdx < 52 && yearIdx >= 0 && yearIdx < this.totalYears) {
            const age = yearIdx;
            const boxDate = new Date(this.dob);
            boxDate.setDate(boxDate.getDate() + ((yearIdx * 52) + weekIdx) * 7);

            // Highlight hover
            const x = 10 + (weekIdx * (boxSize + gap));
            const y = 10 + (yearIdx * (boxSize + gap));

            this.ctx.strokeStyle = '#3b82f6'; // Blue highlight
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = 1.0;
            this.ctx.strokeRect(x - 1, y - 1, boxSize + 2, boxSize + 2);

            const info = document.getElementById('grid-info');
            if (info) {
                const isPast = boxDate < new Date();
                const status = isPast ? 'Lived' : 'Remaining';
                info.innerText = `Age ${age} | ${boxDate.toLocaleDateString()} (${status})`;
            }
        }
    }
}
