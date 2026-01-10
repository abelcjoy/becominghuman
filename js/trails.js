/**
 * Temporal Echoes
 * Creates fading cursor trails that represent the persistence of memory/action.
 * High performance canvas based solution.
 */

export class TemporalEchoes {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'echo-canvas';
        this.canvas.className = 'fixed inset-0 z-[5] pointer-events-none mix-blend-screen opacity-60'; // Z-index 5 puts it under text (z-10) but above bg
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.MAX_POINTS = 50;
        this.mouse = { x: 0, y: 0 };
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.lastX = 0;
        this.lastY = 0;

        document.addEventListener('mousemove', (e) => this.handleMove(e));

        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    handleMove(e) {
        // Only spawn if moved enough
        const dist = Math.hypot(e.clientX - this.lastX, e.clientY - this.lastY);
        if (dist > 5) {
            this.points.push({
                x: e.clientX,
                y: e.clientY,
                age: 0,
                life: 1.0,
                angle: Math.atan2(e.clientY - this.lastY, e.clientX - this.lastX)
            });
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Use 'destination-out' to create fading trails if we wanted continuous lines, 
        // but here we render distinct "Echoes"

        for (let i = this.points.length - 1; i >= 0; i--) {
            const p = this.points[i];
            p.age++;
            p.life -= 0.02; // Fade rate

            if (p.life <= 0) {
                this.points.splice(i, 1);
                continue;
            }

            // Move slightly "back in time" (drift opposite to movement)
            p.x -= Math.cos(p.angle) * 0.5;
            p.y -= Math.sin(p.angle) * 0.5;

            this.ctx.beginPath();
            // Draw a subtle "ghost" cursor or shard
            // this.ctx.arc(p.x, p.y, 2 + (p.age * 0.1), 0, Math.PI * 2);

            // Draw a stylish cross/star
            const size = 3 + (p.age * 0.2);
            this.ctx.moveTo(p.x - size, p.y);
            this.ctx.lineTo(p.x + size, p.y);
            this.ctx.moveTo(p.x, p.y - size);
            this.ctx.lineTo(p.x, p.y + size);

            this.ctx.strokeStyle = `rgba(200, 230, 255, ${p.life * 0.4})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }

        requestAnimationFrame(() => this.animate());
    }
}
