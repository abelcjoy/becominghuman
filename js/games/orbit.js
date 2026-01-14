export class Orbit {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.player = { x: 0, y: 0, vx: 5, vy: 0, r: 8, trail: [] };
        this.center = { x: 0, y: 0 };
        this.gathering = false;
        this.collectibles = [];
        this.score = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.player.x = this.dims.w / 2;
        this.player.y = 100;
        this.loop();

        const startAction = () => { this.gathering = true; };
        const endAction = () => { this.gathering = false; };

        this.canvas.onmousedown = startAction;
        this.canvas.onmouseup = endAction;
        this.canvas.ontouchstart = (e) => { e.preventDefault(); startAction(); };
        this.canvas.ontouchend = (e) => { e.preventDefault(); endAction(); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 40px; left: 40px; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;`;
        hud.innerHTML = `<div style="font-size: 0.7rem; opacity: 0.4; letter-spacing: 2px;">ORBITAL_VELOCITY</div><div id="orbit-score" style="font-size: 3rem; font-weight: 800;">0</div><div style="font-size: 0.8rem; color: #ff00ff;">HOLD TO PULL TO CENTER</div>`;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        document.getElementById('game-hud')?.remove();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.dims = { w: rect.width, h: rect.height };
        this.center = { x: this.dims.w / 2, y: this.dims.h / 2 };
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "rgba(5, 5, 10, 0.2)";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Gravity
        if (this.gathering) {
            const dx = this.center.x - this.player.x;
            const dy = this.center.y - this.player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            this.player.vx += dx / dist * 0.8;
            this.player.vy += dy / dist * 0.8;

            // Central glow
            const grad = this.ctx.createRadialGradient(this.center.x, this.center.y, 0, this.center.x, this.center.y, 50);
            grad.addColorStop(0, "rgba(255, 0, 255, 0.2)");
            grad.addColorStop(1, "transparent");
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);
        }

        // Velocity limit
        const speed = Math.sqrt(this.player.vx ** 2 + this.player.vy ** 2);
        if (speed > 12) {
            this.player.vx = (this.player.vx / speed) * 12;
            this.player.vy = (this.player.vy / speed) * 12;
        }

        this.player.x += this.player.vx;
        this.player.y += this.player.vy;

        // Bounce off walls
        if (this.player.x < 0 || this.player.x > this.dims.w) this.player.vx *= -0.8;
        if (this.player.y < 0 || this.player.y > this.dims.h) this.player.vy *= -0.8;

        // Collectibles
        if (Math.random() < 0.05) {
            this.collectibles.push({ x: Math.random() * this.dims.w, y: Math.random() * this.dims.h, r: 5 });
        }

        this.collectibles.forEach((c, i) => {
            const dx = this.player.x - c.x;
            const dy = this.player.y - c.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 20) {
                this.collectibles.splice(i, 1);
                this.score += 100;
                document.getElementById('orbit-score').innerText = this.score;
            }
            this.ctx.fillStyle = "#ff00ff";
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Trail
        this.player.trail.push({ x: this.player.x, y: this.player.y });
        if (this.player.trail.length > 30) this.player.trail.shift();

        this.ctx.beginPath();
        this.player.trail.forEach((t, i) => {
            if (i === 0) this.ctx.moveTo(t.x, t.y);
            else this.ctx.lineTo(t.x, t.y);
        });
        this.ctx.strokeStyle = "rgba(0, 242, 255, 0.5)";
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Player
        this.ctx.fillStyle = "#00f2ff";
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.r, 0, Math.PI * 2);
        this.ctx.fill();

        requestAnimationFrame(() => this.loop());
    }
}
