export class CoreBreaker {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.core = { rot: 0, speed: 0.05, r: 40 };
        this.needles = [];
        this.score = 0;
        this.gameOver = false;
    }

    start() {
        this.running = true;
        this.gameOver = false;
        this.score = 0;
        this.needles = [];
        this.core.speed = 0.03;
        this.resize();
        this.injectHUD();
        this.loop();

        const action = () => {
            if (this.gameOver) {
                this.start();
                return;
            }
            this.shootNeedle();
        };

        this.canvas.onmousedown = action;
        this.canvas.ontouchstart = (e) => { e.preventDefault(); action(); };
    }

    injectHUD() {
        document.getElementById('game-hud')?.remove();
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; bottom: 40px; width: 100%; text-align: center; color: #0ff; font-family: 'VT323', monospace; pointer-events: none;`;
        hud.innerHTML = `
            <div style="font-size: 1.5rem;">CORES_PUNCTURED: <span id="core-score">00</span></div>
            <div id="game-msg" style="font-size: 1rem; color: #f0f;">CLICK TO SHOOT DATA_SPIKE</div>
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

    shootNeedle() {
        // Check collision with existing needles on the core
        const newAngle = -Math.PI / 2; // Fixed start angle (pointing up)

        // In this variant, we add a needle to the list. It starts moving toward core.
        this.needles.push({ angle: 0, active: false, y: this.dims.h - 50 });
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "#0a0a0a";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        this.core.rot += this.core.speed;

        // Draw Core
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(this.core.rot);

        // The pulsing core
        const pulse = 1 + Math.sin(Date.now() / 200) * 0.1;
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#0ff";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.core.r * pulse, 0, Math.PI * 2);
        this.ctx.fill();

        // Attached needles
        this.needles.forEach(n => {
            if (n.active) {
                this.ctx.save();
                this.ctx.rotate(n.angle);
                this.ctx.strokeStyle = "#0ff";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(0, this.core.r);
                this.ctx.lineTo(0, this.core.r + 60);
                this.ctx.stroke();
                this.ctx.restore();
            }
        });
        this.ctx.restore();
        this.ctx.shadowBlur = 0;

        // Flying needles & Collision
        if (!this.gameOver) {
            this.needles.forEach((n, i) => {
                if (!n.active) {
                    n.y -= 15;
                    if (n.y < cy + this.core.r) {
                        // Impact!
                        const hitAngle = -this.core.rot - Math.PI / 2;

                        // Check if hit another needle
                        let overlap = false;
                        this.needles.forEach(other => {
                            if (other.active) {
                                let diff = Math.abs(other.angle - hitAngle) % (Math.PI * 2);
                                if (diff > Math.PI) diff = Math.PI * 2 - diff;
                                if (diff < 0.2) overlap = true;
                            }
                        });

                        if (overlap) {
                            this.gameOver = true;
                            document.getElementById('game-msg').innerText = "DATA_COLLISION! SYSTEM_HALT";
                            document.getElementById('game-msg').style.color = "red";
                        } else {
                            n.active = true;
                            n.angle = hitAngle;
                            this.score++;
                            document.getElementById('core-score').innerText = this.score.toString().padStart(2, '0');
                            this.core.speed += 0.002;
                        }
                    }
                }
            });
        }

        // Draw needle pouch (ready to shoot)
        if (!this.gameOver) {
            this.ctx.fillStyle = "#fff";
            this.ctx.beginPath();
            this.ctx.moveTo(cx, this.dims.h - 80);
            this.ctx.lineTo(cx, this.dims.h - 20);
            this.ctx.strokeStyle = "#0ff";
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }

        // Flying needles (visual)
        this.needles.forEach(n => {
            if (!n.active) {
                this.ctx.strokeStyle = "#fff";
                this.ctx.beginPath();
                this.ctx.moveTo(cx, n.y);
                this.ctx.lineTo(cx, n.y + 40);
                this.ctx.stroke();
            }
        });

        requestAnimationFrame(() => this.loop());
    }
}
