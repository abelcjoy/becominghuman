export class Echo {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.targetFreq = 0.5;
        this.currentFreq = 0.1;
        this.score = 0;
        this.hue = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();

        const setFreq = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;
            this.currentFreq = 1 - (y / this.dims.h);
        };

        this.canvas.onmousemove = setFreq;
        this.canvas.ontouchmove = (e) => { e.preventDefault(); setFreq(e.touches[0]); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'echo-hud';
        hud.style = `position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none; text-align: center;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; letter-spacing: 4px; opacity: 0.5;">RESONANCE</div><div id="echo-score" style="font-size: 3rem; font-weight: 800;">0</div><div style="font-size: 0.8rem; color: #ff00ff;">MATCH THE VIBRATION FREQUENCY</div>`;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        document.getElementById('echo-hud')?.remove();
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

        this.hue += 1;
        const time = Date.now() / 1000;
        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        // Draw Target Wave
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255,255,255,0.1)";
        this.ctx.lineWidth = 10;
        for (let i = 0; i < this.dims.w; i += 5) {
            const y = cy + Math.sin(i * 0.02 + time * this.targetFreq * 10) * 100;
            if (i === 0) this.ctx.moveTo(i, y); else this.ctx.lineTo(i, y);
        }
        this.ctx.stroke();

        // Draw User Wave
        this.ctx.beginPath();
        this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        this.ctx.lineWidth = 5;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.ctx.strokeStyle;
        for (let i = 0; i < this.dims.w; i += 5) {
            const y = cy + Math.sin(i * 0.02 + time * this.currentFreq * 10) * 100;
            if (i === 0) this.ctx.moveTo(i, y); else this.ctx.lineTo(i, y);
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Scoring
        const diff = Math.abs(this.currentFreq - this.targetFreq);
        if (diff < 0.05) {
            this.score += 1;
            document.getElementById('echo-score').innerText = Math.floor(this.score / 10);
            if (Math.random() < 0.01) {
                this.targetFreq = 0.2 + Math.random() * 0.6;
            }
        }

        requestAnimationFrame(() => this.loop());
    }
}
