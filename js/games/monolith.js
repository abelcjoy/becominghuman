export class Monolith {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.rot = 0;
        this.targetRot = 0;
        this.score = 0;
        this.level = 1;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();

        this.canvas.onmousedown = () => { this.targetRot += Math.PI / 2; this.score += 10; };
        this.canvas.ontouchstart = (e) => { e.preventDefault(); this.targetRot += Math.PI / 2; this.score += 10; };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'monolith-hud';
        hud.style = `position: absolute; top: 20px; right: 20px; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none; text-align: right;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; letter-spacing: 2px; opacity: 0.5;">MONOLITH_ALIGNMENT</div><div id="mono-score" style="font-size: 2rem; font-weight: 800;">0</div><div style="font-size: 0.8rem; color: #00f2ff;">CLICK TO ROTATE AND ALIGN</div>`;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        document.getElementById('monolith-hud')?.remove();
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

        this.ctx.fillStyle = "#0a0a0a";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        this.rot += (this.targetRot - this.rot) * 0.1;
        document.getElementById('mono-score').innerText = this.score;

        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;
        const size = 150;

        // Draw Shadows
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 300, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw Monolith (Fake 3D)
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(this.rot);

        // Sides
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(-size / 2, -size / 2, size, size);

        // Glowing Core
        const grad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2);
        grad.addColorStop(0, "#00f2ff");
        grad.addColorStop(1, "transparent");
        this.ctx.fillStyle = grad;
        this.ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 200) * 0.2;
        this.ctx.fillRect(-size / 4, -size / 4, size / 2, size / 2);
        this.ctx.globalAlpha = 1.0;

        // Overlay Grid
        this.ctx.strokeStyle = "rgba(0, 242, 255, 0.3)";
        this.ctx.lineWidth = 1;
        for (let i = -size / 2; i <= size / 2; i += size / 4) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, -size / 2); this.ctx.lineTo(i, size / 2);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(-size / 2, i); this.ctx.lineTo(size / 2, i);
            this.ctx.stroke();
        }

        this.ctx.restore();

        // Particles orbiting the monolith
        for (let i = 0; i < 3; i++) {
            const angle = Date.now() / 500 + i * (Math.PI * 2 / 3);
            const px = cx + Math.cos(angle) * 200;
            const py = cy + Math.sin(angle) * 200;
            this.ctx.fillStyle = "#00f2ff";
            this.ctx.beginPath();
            this.ctx.arc(px, py, 4, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = "#00f2ff";
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }

        requestAnimationFrame(() => this.loop());
    }
}
