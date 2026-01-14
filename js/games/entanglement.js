export class Entanglement {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.p1 = { x: 100, y: 100, vx: 0, vy: 0, r: 15 };
        this.p2 = { x: 200, y: 100, vx: 0, vy: 0, r: 15 };
        this.restLength = 100;
        this.k = 0.1; // spring constant
        this.score = 0;
        this.obstacles = [];
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.p1.x = this.dims.w / 2 - 50;
        this.p2.x = this.dims.w / 2 + 50;
        this.p1.y = this.dims.h / 2;
        this.p2.y = this.dims.h / 2;
        this.loop();

        const moveHandler = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            const y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;
            this.p1.x = x;
            this.p1.y = y;
        };

        this.canvas.onmousemove = moveHandler;
        this.canvas.ontouchmove = (e) => { e.preventDefault(); moveHandler(e.touches[0]); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'entangle-hud';
        hud.style = `position: absolute; top: 20px; left: 20px; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; letter-spacing: 2px; color: #ff00ff;">QUANTUM_LINK</div><div id="entangle-score" style="font-size: 2rem; font-weight: 800;">0</div><div style="font-size: 0.8rem; opacity:0.6">DRAG ONE TO PULL THE OTHER THROUGH THE VOID</div>`;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        document.getElementById('entangle-hud')?.remove();
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

        // Spring Logic (P2 follows P1)
        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const f = (dist - this.restLength) * this.k;
        this.p2.vx += (dx / dist) * f;
        this.p2.vy += (dy / dist) * f;

        this.p2.vx *= 0.9;
        this.p2.vy *= 0.9;
        this.p2.x += this.p2.vx;
        this.p2.y += this.p2.vy;

        // Obstacles
        if (Math.random() < 0.02) {
            this.obstacles.push({ x: this.dims.w + 50, y: Math.random() * this.dims.h, r: 20 + Math.random() * 30 });
        }

        this.obstacles.forEach((ob, i) => {
            ob.x -= 4;
            if (ob.x < -100) {
                this.obstacles.splice(i, 1);
                this.score += 10;
                document.getElementById('entangle-score').innerText = this.score;
            }

            // Draw Obstacle
            this.ctx.strokeStyle = "#fff";
            this.ctx.beginPath();
            this.ctx.arc(ob.x, ob.y, ob.r, 0, Math.PI * 2);
            this.ctx.stroke();

            // Collision
            const d1 = Math.sqrt((this.p1.x - ob.x) ** 2 + (this.p1.y - ob.y) ** 2);
            const d2 = Math.sqrt((this.p2.x - ob.x) ** 2 + (this.p2.y - ob.y) ** 2);
            if (d1 < this.p1.r + ob.r || d2 < this.p2.r + ob.r) {
                this.score = 0;
                this.obstacles = [];
                document.getElementById('entangle-score').innerText = "0";
            }
        });

        // Draw Link
        this.ctx.beginPath();
        this.ctx.moveTo(this.p1.x, this.p1.y);
        this.ctx.lineTo(this.p2.x, this.p2.y);
        this.ctx.strokeStyle = "rgba(255, 0, 255, 0.5)";
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw Nodes
        this.ctx.fillStyle = "#00f2ff";
        this.ctx.beginPath();
        this.ctx.arc(this.p1.x, this.p1.y, this.p1.r, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#ff00ff";
        this.ctx.beginPath();
        this.ctx.arc(this.p2.x, this.p2.y, this.p2.r, 0, Math.PI * 2);
        this.ctx.fill();

        requestAnimationFrame(() => this.loop());
    }
}
