export class Biosync {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.state = {
            heart: 1.0,
            breath: 1.0,
            nerve: 1.0,
            score: 0,
            time: 0
        };
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();

        this.canvas.onmousedown = (e) => this.handleClick(e);
        this.canvas.ontouchstart = (e) => { e.preventDefault(); this.handleClick(e.touches[0]); };
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        if (x < this.dims.w / 3) this.state.heart = Math.min(1.0, this.state.heart + 0.15);
        else if (x > (this.dims.w * 2) / 3) this.state.nerve = Math.min(1.0, this.state.nerve + 0.15);
        else this.state.breath = Math.min(1.0, this.state.breath + 0.15);
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'biosync-hud';
        hud.style = `position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 50px; pointer-events: none; color: #fff; font-family: 'Space Grotesk', sans-serif;`;
        hud.innerHTML = `
            <div style="display: flex; gap: 40px; margin-bottom: 20px;">
                <div style="text-align: center;"><div style="font-size: 0.7rem; opacity: 0.5;">HEART</div><div id="h-bar" style="width: 60px; height: 4px; background: #ff3366;"></div></div>
                <div style="text-align: center;"><div style="font-size: 0.7rem; opacity: 0.5;">BREATH</div><div id="b-bar" style="width: 60px; height: 4px; background: #00f2ff;"></div></div>
                <div style="text-align: center;"><div style="font-size: 0.7rem; opacity: 0.5;">NERVE</div><div id="n-bar" style="width: 60px; height: 4px; background: #f2ff00;"></div></div>
            </div>
            <div id="bio-score" style="font-size: 2rem; font-weight: 800;">0</div>
            <div style="font-size: 0.8rem; margin-top: 10px; opacity: 0.5;">SYNC ALL THREE TO SURVIVE</div>
        `;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        document.getElementById('biosync-hud')?.remove();
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

        this.state.time += 0.01;
        this.state.heart -= 0.003;
        this.state.breath -= 0.004;
        this.state.nerve -= 0.002;

        if (this.state.heart <= 0 || this.state.breath <= 0 || this.state.nerve <= 0) {
            this.state.score = 0;
            this.state.heart = 1.0;
            this.state.breath = 1.0;
            this.state.nerve = 1.0;
        }

        this.state.score++;
        document.getElementById('bio-score').innerText = Math.floor(this.state.score / 10);
        document.getElementById('h-bar').style.width = this.state.heart * 60 + 'px';
        document.getElementById('b-bar').style.width = this.state.breath * 60 + 'px';
        document.getElementById('n-bar').style.width = this.state.nerve * 60 + 'px';

        // Visuals
        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        // Pulse Circle
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 100 + Math.sin(this.state.time * 5) * 10 * this.state.heart, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(255, 51, 102, ${this.state.heart})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Breath Wave
        this.ctx.beginPath();
        for (let i = 0; i < this.dims.w; i += 5) {
            const y = cy + Math.sin(i * 0.02 + this.state.time * 2) * 50 * this.state.breath;
            if (i === 0) this.ctx.moveTo(i, y); else this.ctx.lineTo(i, y);
        }
        this.ctx.strokeStyle = `rgba(0, 242, 255, ${this.state.breath})`;
        this.ctx.stroke();

        requestAnimationFrame(() => this.loop());
    }
}
