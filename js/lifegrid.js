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

        // Handle resizing
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
            this.draw();
        });

        // Interactive tooltip
        this.canvas.addEventListener('mousemove', (e) => this.handleHover(e));
        this.canvas.addEventListener('mouseleave', () => {
            this.app.ui.hideTooltip(); // Assuming UI has this, or I'll implement local logic
            this.draw(); // Redraw to clear highlight
        });

        this.draw();
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

        this.ctx.fillStyle = '#000000'; // Default

        for (let year = 0; year < this.totalYears; year++) {
            for (let week = 0; week < this.weeksPerYear; week++) {
                const absoluteWeekIndex = (year * 52) + week;
                const x = 10 + (week * (boxSize + gap));
                const y = 10 + (year * (boxSize + gap));

                // Color Logic
                if (absoluteWeekIndex < weeksLived) {
                    // Past
                    this.ctx.fillStyle = '#ffffff'; // White for lived
                    this.ctx.globalAlpha = 1.0;
                } else if (absoluteWeekIndex === weeksLived) {
                    // Current Week
                    this.ctx.fillStyle = '#ef4444'; // Red pulse
                    this.ctx.globalAlpha = 1.0;
                } else {
                    // Future
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.globalAlpha = 0.1; // Faint future
                }

                this.ctx.fillRect(x, y, boxSize, boxSize);
            }
        }
    }

    handleHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Reverse map coordinate to week
        // (Similar logic to draw dimensioning)
        const boxWidth = (this.width - 20) / this.weeksPerYear;
        const boxHeight = (this.height - 20) / this.totalYears;
        const boxSize = Math.min(boxWidth, boxHeight) * 0.8;
        const gap = boxSize * 0.2;

        const weekIdx = Math.floor((mouseX - 10) / (boxSize + gap));
        const yearIdx = Math.floor((mouseY - 10) / (boxSize + gap));

        if (weekIdx >= 0 && weekIdx < 52 && yearIdx >= 0 && yearIdx < this.totalYears) {
            // Valid hover
            const age = yearIdx;

            // Calculate date of that box
            const boxDate = new Date(this.dob);
            boxDate.setDate(boxDate.getDate() + ((yearIdx * 52) + weekIdx) * 7);

            // Show Tooltip logic here (I'll stick to simple title updates or custom overlay)
            // For now, let's update a DOM element if I create one
            const info = document.getElementById('grid-info');
            if (info) {
                info.innerText = `Age ${age} | ${boxDate.toLocaleDateString()}`;
            }
        }
    }
}
