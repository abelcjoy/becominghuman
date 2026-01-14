export class Vortex {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.angle = 0;
        this.speed = 0.05;
        this.segments = [];
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        for (let i = 0; i < 20; i++) this.segments.push({ z: i * 50, color: `hsl(${i * 20}, 80%, 50%)` });
        this.loop();
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = 'position:absolute; bottom:20px; width:100%; text-align:center; color:#fff; font-family:sans-serif; pointer-events:none; opacity:0.5';
        hud.innerHTML = 'MOVE MOUSE TO STEER THROUGH THE VOID';
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

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        this.angle += 0.01;

        this.segments.forEach(s => {
            s.z -= 2;
            if (s.z <= 0) s.z = 1000;

            const scale = 400 / s.z;
            const x = cx + Math.sin(this.angle + s.z / 100) * 100 * scale;
            const y = cy + Math.cos(this.angle + s.z / 100) * 100 * scale;
            const r = 50 * scale;

            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.strokeStyle = s.color;
            this.ctx.lineWidth = 2 * scale;
            this.ctx.stroke();

            // Glow
            this.ctx.globalAlpha = 0.2;
            this.ctx.lineWidth = 10 * scale;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1.0;
        });

        requestAnimationFrame(() => this.loop());
    }
}
