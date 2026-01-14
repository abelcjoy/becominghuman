export class Shatter {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.shapes = [];
        this.particles = [];
        this.score = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();
        this.canvas.onmousedown = (e) => this.shockwave(e);
        this.canvas.ontouchstart = (e) => { e.preventDefault(); this.shockwave(e.touches[0]); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none; text-align: center;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; opacity: 0.5; letter-spacing: 4px;">SHATTER</div><div id="shatter-score" style="font-size: 3rem; font-weight: 800;">0</div>`;
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
    }

    shockwave(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, 100, 0, Math.PI * 2);
        this.ctx.strokeStyle = "rgba(255,255,255,0.5)";
        this.ctx.stroke();
        this.ctx.restore();

        this.shapes.forEach((s, si) => {
            const dx = s.x - x;
            const dy = s.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                this.shatter(s);
                this.shapes.splice(si, 1);
                this.score += 10;
                document.getElementById('shatter-score').innerText = this.score;
            }
        });
    }

    shatter(s) {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: s.x, y: s.y,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
                r: Math.random() * 4,
                life: 1.0,
                color: s.color
            });
        }
    }

    loop() {
        if (!this.running) return;
        this.ctx.fillStyle = "rgba(10,10,10,0.2)";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        if (Math.random() < 0.03) {
            this.shapes.push({
                x: Math.random() * this.dims.w,
                y: -50,
                vy: 2 + Math.random() * 3,
                size: 30 + Math.random() * 20,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                rot: 0,
                vrot: (Math.random() - 0.5) * 0.1
            });
        }

        this.shapes.forEach((s, i) => {
            s.y += s.vy;
            s.rot += s.vrot;
            if (s.y > this.dims.h + 50) this.shapes.splice(i, 1);

            this.ctx.save();
            this.ctx.translate(s.x, s.y);
            this.ctx.rotate(s.rot);
            this.ctx.strokeStyle = s.color;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = s.color;
            this.ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
            this.ctx.restore();
        });

        this.particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.2; // gravity
            p.life -= 0.02;
            if (p.life <= 0) this.particles.splice(i, 1);

            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1.0;

        requestAnimationFrame(() => this.loop());
    }
}
