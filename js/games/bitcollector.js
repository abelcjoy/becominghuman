export class BitCollector {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.player = { x: 0, w: 60, h: 10 };
        this.items = [];
        this.score = 0;
        this.gameOver = false;
        this.speed = 4;
    }

    start() {
        this.running = true;
        this.gameOver = false;
        this.score = 0;
        this.items = [];
        this.speed = 4;
        this.resize();
        this.injectHUD();
        this.player.x = this.dims.w / 2;
        this.loop();

        const move = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches?.[0]?.clientX || 0 - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            this.player.x = x;
        };

        this.canvas.onmousemove = move;
        this.canvas.ontouchmove = (e) => { e.preventDefault(); move(e.touches[0]); };
        this.canvas.onmousedown = () => { if (this.gameOver) this.start(); };
    }

    injectHUD() {
        document.getElementById('game-hud')?.remove();
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 10px; left: 10px; color: #0f0; font-family: 'VT323', monospace; pointer-events: none;`;
        hud.innerHTML = `
            <div style="font-size: 1.5rem;">CASH_COLLECTED: $<span id="bit-score">000</span></div>
            <div id="game-msg" style="font-size: 1rem; color: #f0f;">CATCH THE GREEN_BITS. Avoid the RED_ERRORS.</div>
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

    spawnItem() {
        const isError = Math.random() < 0.3;
        this.items.push({
            x: Math.random() * this.dims.w,
            y: -20,
            type: isError ? 'error' : 'bit',
            vy: this.speed + Math.random() * 2
        });
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "#000080"; // Classic Blue
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        if (!this.gameOver) {
            if (Math.random() < 0.05) this.spawnItem();
            this.speed += 0.001;

            this.items.forEach((it, i) => {
                it.y += it.vy;
                if (it.y > this.dims.h) this.items.splice(i, 1);

                // Collision
                if (it.y > this.dims.h - 40 && it.y < this.dims.h - 20) {
                    if (Math.abs(it.x - this.player.x) < this.player.w / 2) {
                        if (it.type === 'bit') {
                            this.score += 10;
                            this.items.splice(i, 1);
                            document.getElementById('bit-score').innerText = this.score;
                        } else {
                            this.gameOver = true;
                            document.getElementById('game-msg').innerText = "FATAL_ERROR: YOUR ACCOUNT WAS HACKED. CLICK TO TRY AGAIN.";
                            document.getElementById('game-msg').style.color = "red";
                        }
                    }
                }
            });
        }

        // Draw Player (The "Catch" Bar)
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(this.player.x - this.player.w / 2, this.dims.h - 40, this.player.w, this.player.h);
        this.ctx.strokeStyle = "#000";
        this.ctx.strokeRect(this.player.x - this.player.w / 2, this.dims.h - 40, this.player.w, this.player.h);

        // Draw Items
        this.items.forEach(it => {
            this.ctx.fillStyle = it.type === 'bit' ? "#0f0" : "#f00";
            this.ctx.font = "20px 'VT323'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(it.type === 'bit' ? "$" : "!", it.x, it.y);
        });

        requestAnimationFrame(() => this.loop());
    }
}
