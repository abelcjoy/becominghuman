export class HexPulse {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.player = { angle: 0, r: 60 };
        this.walls = [];
        this.score = 0;
        this.frame = 0;
        this.speed = 3;
        this.gameOver = false;
        this.mousePos = 0;
    }

    start() {
        this.running = true;
        this.gameOver = false;
        this.score = 0;
        this.frame = 0;
        this.speed = 3;
        this.walls = [];
        this.resize();
        this.injectHUD();
        this.loop();

        const move = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches?.[0]?.clientX || 0 - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            this.player.angle = (x / this.dims.w) * Math.PI * 2;
        };

        this.canvas.onmousemove = move;
        this.canvas.ontouchmove = (e) => { e.preventDefault(); move(e.touches[0]); };
        this.canvas.onmousedown = () => { if (this.gameOver) this.start(); };
    }

    injectHUD() {
        document.getElementById('game-hud')?.remove();
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 10px; left: 10px; color: #ff0; font-family: 'VT323', monospace; pointer-events: none;`;
        hud.innerHTML = `
            <div style="font-size: 1.5rem;">UPTIME: <span id="hex-score">00</span>s</div>
            <div id="game-msg" style="font-size: 1rem; color: #0ff;">SLIDE TO FIND THE GAP</div>
        `;
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

    spawnWall() {
        const gapAngle = Math.random() * Math.PI * 2;
        this.walls.push({ r: this.dims.w, gap: gapAngle, gapSize: 0.8 });
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        if (!this.gameOver) {
            this.frame++;
            if (this.frame % 60 === 0) {
                this.score++;
                document.getElementById('hex-score').innerText = this.score;
                this.spawnWall();
                this.speed += 0.1;
            }

            this.walls.forEach((w, i) => {
                w.r -= this.speed;
                if (w.r < 10) this.walls.splice(i, 1);

                // Collision
                if (Math.abs(w.r - this.player.r) < 10) {
                    let diff = Math.abs(this.player.angle - w.gap) % (Math.PI * 2);
                    if (diff > Math.PI) diff = Math.PI * 2 - diff;
                    if (diff > w.gapSize / 2) {
                        this.gameOver = true;
                        document.getElementById('game-msg').innerText = "CONNECTION_LOST: REBOOT REQUIRED";
                        document.getElementById('game-msg').style.color = "red";
                    }
                }
            });
        }

        // Draw Walls
        this.ctx.lineWidth = 15;
        this.walls.forEach(w => {
            this.ctx.strokeStyle = "rgba(255, 255, 0, 0.3)";
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, w.r, w.gap + w.gapSize / 2, w.gap - w.gapSize / 2 + Math.PI * 2);
            this.ctx.stroke();
        });

        // Draw Player Line
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(this.player.angle);
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = "#0ff";
        this.ctx.beginPath();
        this.ctx.arc(this.player.r, 0, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Center Pulsing Hex (Visual only)
        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + this.frame * 0.02;
            const px = cx + Math.cos(a) * 30;
            const py = cy + Math.sin(a) * 30;
            if (i === 0) this.ctx.moveTo(px, py); else this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
        this.ctx.stroke();

        requestAnimationFrame(() => this.loop());
    }
}
