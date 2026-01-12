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
        if (isNaN(this.dob.getTime())) this.dob = new Date(); // Fallback to now

        this.canvas = document.getElementById('life-grid-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        // Animation props
        this.pulse = 0;
        this.isHovering = false;

        // Handle resizing
        this.resize();
        window.addEventListener('resize', () => this.resize());

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

        // Register with LifeEngine if available
        if (window.app && window.app.engine) {
            window.app.engine.addHook(this);
        }
    }

    update(deltaTime, pulse, tilt) {
        this.draw(pulse);
    }

    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = Math.min(600, this.totalYears * 7); // Aspect ratio management
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    draw(pulse) {
        if (!this.ctx || !this.dob) return;

        // Clear
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Dimensions
        const boxWidth = (this.width - 20) / this.weeksPerYear;
        const boxHeight = (this.height - 20) / this.totalYears;
        const boxSize = Math.min(boxWidth, boxHeight) * 0.8;
        const gap = boxSize * 0.2;

        const now = new Date();
        const diffTime = Math.abs(now - this.dob);
        const weeksLived = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

        for (let year = 0; year < this.totalYears; year++) {
            for (let week = 0; week < this.weeksPerYear; week++) {
                const absoluteWeekIndex = (year * 52) + week;
                const x = 10 + (week * (boxSize + gap));
                const y = 10 + (year * (boxSize + gap));

                // 1. Determine Life Phase Style
                let phaseColor = '#ffffff';
                let opacity = 0.05;

                if (year < 18) {
                    // Childhood: Nostalgic White
                    phaseColor = '#ffffff';
                    opacity = 0.1;
                } else if (year < 65) {
                    // Prime: Industrial Gray
                    phaseColor = '#888888';
                    opacity = 0.05;
                } else {
                    // Tail End: Golden Sunset
                    phaseColor = '#fbbf24'; // Amber-400
                    opacity = 0.15;
                }

                // 2. Color Logic for Lived vs Future
                if (absoluteWeekIndex < weeksLived) {
                    // Lived (Past)
                    this.ctx.fillStyle = phaseColor;
                    this.ctx.globalAlpha = 0.6;
                    this.ctx.fillRect(x, y, boxSize, boxSize);
                } else if (absoluteWeekIndex === weeksLived) {
                    // CURRENT MOMENT (Pulsing Heart)
                    this.ctx.fillStyle = '#ef4444';
                    this.ctx.globalAlpha = 0.6 + (pulse * 0.4);

                    const scale = 1 + (pulse * 0.4);
                    const offset = (boxSize * scale - boxSize) / 2;
                    this.ctx.fillRect(x - offset, y - offset, boxSize * scale, boxSize * scale);

                    // Shadow for focus
                    this.ctx.shadowBlur = 15 * pulse;
                    this.ctx.shadowColor = 'red';
                    this.ctx.fillRect(x, y, boxSize, boxSize);
                    this.ctx.shadowBlur = 0;

                } else {
                    // Future (Uncertainty)
                    const shimmer = (Math.sin((Date.now() / 1000) + (absoluteWeekIndex / 50)) + 1) / 2;
                    this.ctx.fillStyle = phaseColor;
                    this.ctx.globalAlpha = (opacity * 0.5) + (shimmer * opacity);
                    this.ctx.fillRect(x, y, boxSize, boxSize);

                    // The "Last 1000 Weeks" Border
                    const weeksTotal = this.totalYears * 52;
                    if (absoluteWeekIndex > weeksTotal - 1000) {
                        this.ctx.strokeStyle = '#fbbf24';
                        this.ctx.lineWidth = 0.5;
                        this.ctx.globalAlpha = 0.1;
                        this.ctx.strokeRect(x - 1, y - 1, boxSize + 2, boxSize + 2);
                    }
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
