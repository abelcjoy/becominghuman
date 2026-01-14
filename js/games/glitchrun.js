export class GlitchRun {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.player = { y: 0, vy: 0, r: 20, jumping: false };
        this.obstacles = [];
        this.score = 0;
        this.speed = 5;
        this.glitchTimer = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.player.y = this.dims.h - 100;
        this.loop();
        this.canvas.onmousedown = () => this.jump();
        this.canvas.ontouchstart = (e) => { e.preventDefault(); this.jump(); };
    }

    jump() {
        if (!this.player.jumping) {
            this.player.vy = -15;
            this.player.jumping = true;
        }
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 20px; right: 40px; color: #00ff00; font-family: monospace; pointer-events: none;`;
        hud.innerHTML = `<div style="font-size: 0.8rem;">SYSTEM_DISTORTION</div><div id="glitch-score" style="font-size: 2.5rem; font-weight: bold;">0</div>`;
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

        // Base clear
        this.ctx.fillStyle = "#0a0a0a";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Ground
        this.ctx.strokeStyle = "#00ff00";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.dims.h - 80);
        this.ctx.lineTo(this.dims.w, this.dims.h - 80);
        this.ctx.stroke();

        // Player physics
        this.player.vy += 0.8; // gravity
        this.player.y += this.player.vy;
        if (this.player.y > this.dims.h - 100) {
            this.player.y = this.dims.h - 100;
            this.player.vy = 0;
            this.player.jumping = false;
        }

        // Spawn obstacles
        if (Math.random() < 0.02) {
            this.obstacles.push({ x: this.dims.w + 50, w: 30, h: 40 + Math.random() * 40 });
        }

        // Draw Player with Glitch
        this.ctx.save();
        if (Math.random() < 0.1) this.ctx.translate((Math.random() - 0.5) * 10, 0);
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(100, this.player.y, 40, 40);
        this.ctx.strokeStyle = "#ff00ff";
        this.ctx.strokeRect(100 + (Math.random() - 0.5) * 5, this.player.y, 40, 40);
        this.ctx.restore();

        // Obstacles
        this.obstacles.forEach((ob, i) => {
            ob.x -= this.speed;
            if (ob.x < -100) {
                this.obstacles.splice(i, 1);
                this.score++;
                document.getElementById('glitch-score').innerText = this.score;
                this.speed += 0.05;
            }

            // Collision
            if (ob.x < 140 && ob.x + ob.w > 100 && this.player.y + 40 > this.dims.h - 80 - ob.h) {
                this.score = 0;
                this.speed = 5;
                this.obstacles = [];
                document.getElementById('glitch-score').innerText = "0";
            }

            this.ctx.fillStyle = "#00ff00";
            this.ctx.fillRect(ob.x, this.dims.h - 80 - ob.h, ob.w, ob.h);
        });

        // Global Glitch Effect (Scanlines)
        if (Math.random() < 0.05) {
            this.ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
            for (let i = 0; i < this.dims.h; i += 4) {
                this.ctx.fillRect(0, i, this.dims.w, 1);
            }
        }

        requestAnimationFrame(() => this.loop());
    }
}
