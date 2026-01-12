/**
 * Chronos Favicon
 * Dynamically updates the browser tab icon to show a ticking clock or progress ring.
 * "Time ticks even in the background."
 */

export class ChronosFavicon {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 32;
        this.canvas.height = 32;
        this.ctx = this.canvas.getContext('2d');
        this.link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        this.link.type = 'image/x-icon';
        this.link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(this.link);

        this.start();
    }

    start() {
        setInterval(() => this.update(), 1000);
        this.update();
    }

    update() {
        this.ctx.clearRect(0, 0, 32, 32);

        // Background
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(16, 16, 16, 0, Math.PI * 2);
        this.ctx.fill();

        // Progress Arc (Seconds)
        const now = new Date();
        const seconds = now.getSeconds();
        const angle = (Math.PI * 2 * seconds) / 60;

        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 4;
        this.ctx.lineCap = 'round';

        this.ctx.beginPath();
        this.ctx.arc(16, 16, 12, -Math.PI / 2, -Math.PI / 2 + angle);
        this.ctx.stroke();

        // Core Pulse
        this.ctx.fillStyle = seconds % 2 === 0 ? '#ff0000' : '#333333';
        this.ctx.beginPath();
        this.ctx.arc(16, 16, 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Update Link
        this.link.href = this.canvas.toDataURL('image/png');
    }
}
