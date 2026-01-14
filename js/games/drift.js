export class Drift {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.car = { x: 0, y: 0, angle: 0, speed: 0, rot: 0, trail: [] };
        this.score = 0;
        this.input = { left: false, right: false, up: false };
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.car.x = this.dims.w / 2;
        this.car.y = this.dims.h / 2;
        this.loop();

        window.onkeydown = (e) => this.handleKey(e, true);
        window.onkeyup = (e) => this.handleKey(e, false);
        this.canvas.onmousedown = (e) => this.handleTouch(e, true);
        this.canvas.onmouseup = () => this.handleTouch(null, false);
    }

    handleKey(e, active) {
        if (e.key === 'ArrowLeft' || e.key === 'a') this.input.left = active;
        if (e.key === 'ArrowRight' || e.key === 'd') this.input.right = active;
        if (e.key === 'ArrowUp' || e.key === 'w') this.input.up = active;
    }

    handleTouch(e, active) {
        if (!active) { this.input.left = false; this.input.right = false; this.input.up = false; return; }
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        if (x < this.dims.w / 3) this.input.left = true;
        else if (x > (this.dims.w * 2) / 3) this.input.right = true;
        else this.input.up = true;
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'drift-hud';
        hud.style = `position: absolute; bottom: 40px; right: 40px; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none; text-align: right;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; letter-spacing: 2px; opacity: 0.5;">DRIFT_ANGLE</div><div id="drift-score" style="font-size: 3rem; font-weight: 800;">0</div><div style="font-size: 0.8rem; color: #00f2ff;">WASD OR TOUCH SIDES TO DRIFT</div>`;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        document.getElementById('drift-hud')?.remove();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.dims = { w: rect.width, h: rect.height };
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Physics
        if (this.input.up) this.car.speed += 0.2;
        this.car.speed *= 0.98;

        if (this.input.left) this.car.angle -= 0.05 * (this.car.speed * 0.2);
        if (this.input.right) this.car.angle += 0.05 * (this.car.speed * 0.2);

        this.car.x += Math.cos(this.car.angle) * this.car.speed;
        this.car.y += Math.sin(this.car.angle) * this.car.speed;

        // Wrap
        if (this.car.x < 0) this.car.x = this.dims.w;
        if (this.car.x > this.dims.w) this.car.x = 0;
        if (this.car.y < 0) this.car.y = this.dims.h;
        if (this.car.y > this.dims.h) this.car.y = 0;

        // Trail
        if (this.car.speed > 2) {
            this.car.trail.push({ x: this.car.x, y: this.car.y, a: this.car.angle });
            if (this.car.trail.length > 50) this.car.trail.shift();
            this.score += Math.floor(this.car.speed);
        } else {
            if (this.car.trail.length > 0) this.car.trail.shift();
        }

        // Draw Trail
        this.ctx.beginPath();
        this.car.trail.forEach((t, i) => {
            this.ctx.strokeStyle = `rgba(0, 242, 255, ${i / 50})`;
            this.ctx.lineWidth = 2;
            if (i === 0) this.ctx.moveTo(t.x, t.y); else this.ctx.lineTo(t.x, t.y);
        });
        this.ctx.stroke();

        // Draw Car
        this.ctx.save();
        this.ctx.translate(this.car.x, this.car.y);
        this.ctx.rotate(this.car.angle);
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = "#00f2ff";
        this.ctx.fillRect(-15, -10, 30, 20);
        this.ctx.restore();

        document.getElementById('drift-score').innerText = this.score;

        requestAnimationFrame(() => this.loop());
    }
}
