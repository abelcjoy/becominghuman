export class Shift {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.state = {
            player: { x: 100, y: 100, r: 15, color: '#00f2ff', mode: 'cyan' },
            obstacles: [],
            score: 0,
            shiftPulse: 0
        };
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.setupInput();
        this.loop();
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `
            position: absolute; bottom: 40px; left: 0; width: 100%; 
            display: flex; justify-content: center; gap: 40px;
            color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;
        `;
        hud.innerHTML = `
            <div style="text-align:center">
                <div style="font-size: 0.7rem; opacity: 0.5;">CURRENT MODE</div>
                <div id="mode-display" style="font-size: 1.5rem; font-weight: 800; color: #00f2ff;">CYAN</div>
            </div>
            <div style="text-align:center">
                <div style="font-size: 0.7rem; opacity: 0.5;">SCORE</div>
                <div id="shift-score" style="font-size: 1.5rem; font-weight: 800;">0</div>
            </div>
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
        this.state.player.y = this.dims.h / 2;
    }

    setupInput() {
        const shift = () => {
            if (this.state.player.mode === 'cyan') {
                this.state.player.mode = 'magenta';
                this.state.player.color = '#ff00ff';
            } else {
                this.state.player.mode = 'cyan';
                this.state.player.color = '#00f2ff';
            }
            this.state.shiftPulse = 1.0;
            const modeEl = document.getElementById('mode-display');
            if (modeEl) {
                modeEl.innerText = this.state.player.mode.toUpperCase();
                modeEl.style.color = this.state.player.color;
            }
        };

        this.canvas.onmousedown = (e) => shift();
        this.canvas.ontouchstart = (e) => { e.preventDefault(); shift(); };
        window.onkeydown = (e) => { if (e.code === 'Space') shift(); };
    }

    spawnObstacle() {
        const mode = Math.random() > 0.5 ? 'cyan' : 'magenta';
        this.state.obstacles.push({
            x: this.dims.w + 50,
            y: 0,
            w: 40,
            h: this.dims.h,
            mode: mode,
            color: mode === 'cyan' ? '#00f2ff' : '#ff00ff'
        });
    }

    loop() {
        if (!this.running) return;

        // Visual Polish: Background based on shift pulse
        const bgB = this.state.shiftPulse * 30;
        this.ctx.fillStyle = `rgb(${bgB / 2}, 0, ${bgB})`;
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Spawn
        if (Math.random() < 0.02) this.spawnObstacle();

        // Update Obstacles
        this.state.obstacles.forEach((ob, i) => {
            ob.x -= 5;

            // Collision
            if (ob.x < this.state.player.x + this.state.player.r && ob.x + ob.w > this.state.player.x - this.state.player.r) {
                if (ob.mode !== this.state.player.mode) {
                    // Fail!
                    this.state.score = 0;
                    this.state.obstacles = [];
                    const scoreEl = document.getElementById('shift-score');
                    if (scoreEl) scoreEl.innerText = "0";
                } else {
                    // Pass through successfully (could add points here but usually we add per pass)
                }
            }

            if (ob.x + ob.w < 0) {
                this.state.obstacles.splice(i, 1);
                this.state.score += 10;
                const scoreEl = document.getElementById('shift-score');
                if (scoreEl) scoreEl.innerText = this.state.score;
            }

            // Draw Obstacle
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = ob.color;
            this.ctx.fillRect(ob.x, ob.y, ob.w, ob.h);

            // Draw "Solid" edges
            this.ctx.globalAlpha = 1.0;
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = ob.color;
            this.ctx.strokeRect(ob.x, ob.y, ob.w, ob.h);
        });

        // Update Pulse
        this.state.shiftPulse *= 0.9;

        // Player
        this.ctx.save();
        this.ctx.shadowBlur = 20 * this.state.shiftPulse + 10;
        this.ctx.shadowColor = this.state.player.color;
        this.ctx.fillStyle = this.state.player.color;
        this.ctx.beginPath();
        this.ctx.arc(this.state.player.x, this.state.player.y, this.state.player.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        requestAnimationFrame(() => this.loop());
    }
}
