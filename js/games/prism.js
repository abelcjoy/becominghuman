export class Prism {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.mirrors = [];
        this.target = { x: 0, y: 0, r: 25 };
        this.pointer = { x: 100, y: 100, angle: 0 };
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.resetLevel();
        this.loop();
        this.canvas.onmousemove = (e) => this.handleMove(e);
        this.canvas.ontouchmove = (e) => { e.preventDefault(); this.handleMove(e.touches[0]); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 20px; left: 20px; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; letter-spacing: 2px;">REFRACTIVE_INDEX</div><div style="font-size: 1.2rem; margin-top: 10px; color: #00f2ff;">HIT THE CORE WITH THE BEAM</div>`;
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

    resetLevel() {
        this.target = { x: this.dims.w - 100, y: this.dims.h - 100, r: 30 };
        this.mirrors = [
            { x1: 200, y1: 100, x2: 300, y2: 400, color: '#fff' },
            { x1: 500, y1: 500, x2: 700, y2: 200, color: '#fff' }
        ];
    }

    handleMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        const my = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;
        this.pointer.angle = Math.atan2(my - this.pointer.y, mx - this.pointer.x);
    }

    loop() {
        if (!this.running) return;
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Target
        const pulse = 1 + Math.sin(Date.now() / 200) * 0.2;
        this.ctx.fillStyle = "rgba(0, 242, 255, 0.2)";
        this.ctx.beginPath();
        this.ctx.arc(this.target.x, this.target.y, this.target.r * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = "#00f2ff";
        this.ctx.stroke();

        // Beam
        let bx = this.pointer.x;
        let by = this.pointer.y;
        let ba = this.pointer.angle;

        this.ctx.beginPath();
        this.ctx.moveTo(bx, by);
        this.ctx.lineWidth = 4;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = "#ff00ff";
        this.ctx.strokeStyle = "#ff00ff";

        for (let step = 0; step < 2000; step += 5) {
            bx += Math.cos(ba) * 5;
            by += Math.sin(ba) * 5;
            this.ctx.lineTo(bx, by);

            // Target Hit
            const tdx = bx - this.target.x;
            const tdy = by - this.target.y;
            if (Math.sqrt(tdx * tdx + tdy * tdy) < this.target.r) {
                this.ctx.shadowColor = "#fff";
                this.ctx.strokeStyle = "#fff";
                break;
            }

            // Wall bounce
            if (bx < 0 || bx > this.dims.w) { ba = Math.PI - ba; break; }
            if (by < 0 || by > this.dims.h) { ba = -ba; break; }
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Pointer
        this.ctx.fillStyle = "#ff00ff";
        this.ctx.beginPath();
        this.ctx.arc(this.pointer.x, this.pointer.y, 10, 0, Math.PI * 2);
        this.ctx.fill();

        requestAnimationFrame(() => this.loop());
    }
}
