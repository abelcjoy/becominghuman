/**
 * Chart Renderer
 * Lightweight canvas-based visualization (no external libraries)
 */

export class ChartRenderer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.colors = {
            primary: '#ffffff',
            secondary: '#666666',
            accent: '#10b981',
            warning: '#ef4444',
            grid: 'rgba(255, 255, 255, 0.1)'
        };
    }

    createLifeProgressChart(canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';

        this.drawLifeTimeline(data);
    }

    drawLifeTimeline(data) {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const padding = 40;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw grid
        this.drawGrid(width, height, padding);

        // Calculate points
        const maxAge = 90;
        const currentAge = data.currentAge || 25;
        const expectedAge = data.lifeExpectancy || 75;

        // Draw timeline bar
        const barHeight = 40;
        const barY = height / 2 - barHeight / 2;
        const barWidth = width - padding * 2;

        // Background (total life)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(padding, barY, barWidth, barHeight);

        // Lived life (green)
        const livedWidth = (currentAge / maxAge) * barWidth;
        this.ctx.fillStyle = this.colors.accent;
        this.ctx.fillRect(padding, barY, livedWidth, barHeight);

        // Remaining life (gradient)
        const remainingStart = padding + livedWidth;
        const remainingWidth = ((expectedAge - currentAge) / maxAge) * barWidth;

        const gradient = this.ctx.createLinearGradient(remainingStart, 0, remainingStart + remainingWidth, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(remainingStart, barY, remainingWidth, barHeight);

        // Current position marker
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillRect(padding + livedWidth - 2, barY - 10, 4, barHeight + 20);

        // Labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px monospace';
        this.ctx.textAlign = 'center';

        // Birth label
        this.ctx.fillText('Birth', padding, barY - 15);
        this.ctx.fillText('0', padding, barY + barHeight + 25);

        // Current age label
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillText('NOW', padding + livedWidth, barY - 15);
        this.ctx.fillText(Math.floor(currentAge), padding + livedWidth, barY + barHeight + 25);

        // Expected end label
        this.ctx.fillStyle = '#ffffff';
        const expectedX = padding + (expectedAge / maxAge) * barWidth;
        this.ctx.fillText('Expected', expectedX, barY - 15);
        this.ctx.fillText(expectedAge, expectedX, barY + barHeight + 25);

        // Stats text
        this.ctx.textAlign = 'left';
        this.ctx.font = '10px monospace';
        this.ctx.fillStyle = '#999';
        this.ctx.fillText(`Time Lived: ${Math.floor((currentAge / expectedAge) * 100)}%`, padding, height - 10);
        this.ctx.fillText(`Time Remaining: ${Math.floor(((expectedAge - currentAge) / expectedAge) * 100)}%`, width - padding - 150, height - 10);
    }

    drawGrid(width, height, padding) {
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 1;

        // Horizontal lines
        for (let i = 0; i <= 4; i++) {
            const y = padding + (height - padding * 2) * (i / 4);
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();
        }
    }

    createEquityHistoryChart(canvasId, history) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas || !history || history.length === 0) return;

        this.ctx = this.canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';

        this.drawLineChart(history);
    }

    drawLineChart(data) {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const padding = 40;

        this.ctx.clearRect(0, 0, width, height);

        // Draw axes
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, height - padding);
        this.ctx.lineTo(width - padding, height - padding);
        this.ctx.stroke();

        // Draw data line
        if (data.length < 2) return;

        const maxValue = Math.max(...data.map(d => d.value));
        const xStep = (width - padding * 2) / (data.length - 1);
        const yScale = (height - padding * 2) / maxValue;

        this.ctx.strokeStyle = this.colors.accent;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        data.forEach((point, index) => {
            const x = padding + index * xStep;
            const y = height - padding - point.value * yScale;

            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });

        this.ctx.stroke();

        // Draw points
        this.ctx.fillStyle = '#ffffff';
        data.forEach((point, index) => {
            const x = padding + index * xStep;
            const y = height - padding - point.value * yScale;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    createActivityHeatmap(canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';

        const width = this.canvas.width / dpr;
        const height = this.canvas.height / dpr;

        this.ctx.clearRect(0, 0, width, height);

        // Draw 30 days grid (6 cols x 5 rows)
        const cols = 6;
        const rows = 5;
        const cellSize = Math.min((width - 40) / cols, (height - 40) / rows);
        const padding = 5;
        const offsetX = (width - (cols * cellSize)) / 2;
        const offsetY = (height - (rows * cellSize)) / 2;

        data.forEach((day, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = offsetX + col * cellSize;
            const y = offsetY + row * cellSize;

            // Intensity based on focus minutes (0-120m)
            const intensity = Math.min(1, day.focusMinutes / 60);

            this.ctx.fillStyle = intensity > 0
                ? `rgba(16, 185, 129, ${0.2 + intensity * 0.8})` // Green scales
                : 'rgba(255, 255, 255, 0.05)'; // Empty

            // Rounded rect
            this.ctx.beginPath();
            this.ctx.roundRect(x + padding, y + padding, cellSize - padding * 2, cellSize - padding * 2, 4);
            this.ctx.fill();

            // Date text (optional, small)
            if (index === 29) { // Today marker
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        });
    }
}
