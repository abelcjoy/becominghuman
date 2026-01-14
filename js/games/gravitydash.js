export class GravityDash {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.player = { y: 0, targetY: 0, x: 100, side: 1, r: 10, trail: [] };
        this.obstacles = [];
        this.score = 0;
        this.speed = 5;
        this.frame = 0;
        this.gameOver = false;
    }

    start() {
        this.running = true;
        this.gameOver = false;
        this.score = 0;
        this.speed = 7;
        this.obstacles = [];
        this.resize();
        this.injectHUD();

        this.player.y = this.dims.h / 2 - 50;
        this.player.targetY = this.dims.h / 2 - 50;
        this.player.side = 1; // 1 = Top rail, 2 = Bottom rail

        this.loop();

        const action = () => {
            if (this.gameOver) {
                this.start();
                return;
            }
            this.player.side = this.player.side === 1 ? 2 : 1;
            const railY = this.dims.h / 2;
            this.player.targetY = this.player.side === 1 ? railY - 60 : railY + 60;
        };

        this.canvas.onmousedown = action;
        this.canvas.ontouchstart = (e) => { e.preventDefault(); action(); };
    }

    injectHUD() {
        document.getElementById('game-hud')?.remove();
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 10px; width: 100%; text-align: center; color: #0f0; font-family: 'VT323', monospace; pointer-events: none;`;
        hud.innerHTML = `
            <div style="font-size: 1.5rem;">DISTANCE_REACHED: <span id="dash-score">0000</span></div>
            <div id="game-msg" style="font-size: 1rem; color: #f0f;">CLICK TO FLIP GRAVITY</div>
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

    spawnObstacle() {
        const railY = this.dims.h / 2;
        const side = Math.random() < 0.5 ? 1 : 2;
        const y = side === 1 ? railY - 60 : railY + 60;
        this.obstacles.push({ x: this.dims.w + 50, y: y, side: side, w: 20, h: 40 });
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "rgba(0, 0, 40, 0.2)";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        const railY = this.dims.h / 2;

        // Draw Rails
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, railY - 60); this.ctx.lineTo(this.dims.w, railY - 60);
        this.ctx.moveTo(0, railY + 60); this.ctx.lineTo(this.dims.w, railY + 60);
        this.ctx.stroke();

        if (!this.gameOver) {
            this.frame++;
            this.score += 1;
            this.speed += 0.001;
            document.getElementById('dash-score').innerText = Math.floor(this.score).toString().padStart(4, '0');

            if (this.frame % 60 === 0) this.spawnObstacle();

            // Player Animation
            this.player.y += (this.player.targetY - this.player.y) * 0.2;

            // Trail
            this.player.trail.push({ x: this.player.x, y: this.player.y });
            if (this.player.trail.length > 20) this.player.trail.shift();

            // Collision
            this.obstacles.forEach((ob, i) => {
                ob.x -= this.speed;
                if (ob.x < -50) this.obstacles.splice(i, 1);

                if (Math.abs(ob.x - this.player.x) < 20 && Math.abs(ob.y - this.player.y) < 20) {
                    this.gameOver = true;
                    document.getElementById('game-msg').innerHTML = "SYSTEM_FAILURE: CLICK TO REBOOT.exe";
                    document.getElementById('game-msg').style.color = "red";
                }
            });
        }

        // Draw Trail
        this.ctx.beginPath();
        this.player.trail.forEach((t, i) => {
            this.ctx.lineTo(t.x - (20 - i) * this.speed * 0.2, t.y);
        });
        this.ctx.strokeStyle = "#0ff";
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Draw Obstacles
        this.ctx.fillStyle = "#f0f";
        this.obstacles.forEach(ob => {
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = "#f0f";
            this.ctx.fillRect(ob.x - ob.w / 2, ob.y - ob.h / 2, ob.w, ob.h);
        });
        this.ctx.shadowBlur = 0;

        // Draw Player
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = "#0ff";
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        requestAnimationFrame(() => this.loop());
    }
}
