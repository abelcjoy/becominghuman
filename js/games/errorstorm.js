export class ErrorStorm {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.errors = [];
        this.score = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 10px; left: 10px; color: yellow; font-family: 'VT323', monospace; pointer-events: none;`;
        hud.innerHTML = `<div>SYSTEM_CRITICAL_LEVEL:</div><div id="error-score" style="font-size: 3rem;">0</div>`;
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

        // Visual glitch: Don't clear fully
        this.ctx.fillStyle = "rgba(0,0,128,0.1)"; // Blue Screen of Death color
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        if (Math.random() < 0.1) {
            this.errors.push({
                x: Math.random() * this.dims.w,
                y: Math.random() * this.dims.h,
                text: "FATAL ERROR AT 0x" + Math.floor(Math.random() * 999999).toString(16),
                life: 1.0
            });
            this.score++;
            document.getElementById('error-score').innerText = this.score;
        }

        this.errors.forEach((e, i) => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${e.life})`;
            this.ctx.font = "20px 'VT323'";
            this.ctx.fillText(e.text, e.x, e.y);
            e.life -= 0.01;
            if (e.life <= 0) this.errors.splice(i, 1);
        });

        requestAnimationFrame(() => this.loop());
    }
}
