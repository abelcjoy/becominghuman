export class CyberBreaker {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;
        this.running = false;

        this.sfx = {
            ctx: null,
            init: () => {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                this.sfx.ctx = new AudioContext();
            },
            play: (type) => {
                if (!this.sfx.ctx) return;
                const osc = this.sfx.ctx.createOscillator();
                const gain = this.sfx.ctx.createGain();
                osc.connect(gain); gain.connect(this.sfx.ctx.destination);
                const now = this.sfx.ctx.currentTime;
                if (type === 'hit') {
                    osc.type = 'square'; osc.frequency.setValueAtTime(400, now);
                    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                    gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                    osc.start(now); osc.stop(now + 0.1);
                } else if (type === 'paddle') {
                    osc.type = 'triangle'; osc.frequency.setValueAtTime(300, now);
                    osc.frequency.linearRampToValueAtTime(600, now + 0.05);
                    gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                    osc.start(now); osc.stop(now + 0.1);
                }
            }
        };

        this.state = {
            score: 0,
            lives: 3,
            level: 1,
            paddle: { x: 0, w: 100, h: 10 },
            balls: [],
            bricks: [],
            particles: [],
            shake: 0
        };
    }

    start() {
        this.running = true;
        this.resize();
        this.setupInput();
        this.resetLevel();
        this.loop();

        // Custom HUD Overlay for this game
        this.injectHUD();
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `
            position: absolute; top: 20px; left: 20px; color: #0ff; 
            font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; pointer-events: none;
            display: flex; gap: 30px; text-shadow: 0 0 10px rgba(0,255,255,0.5);
        `;
        hud.innerHTML = `
            <div>LIVES: <span id="h-lives">3</span></div>
            <div>SCORE: <span id="h-score">0</span></div>
        `;
        document.getElementById('game-container').appendChild(hud);
    }

    stop() {
        this.running = false;
        const hud = document.getElementById('game-hud');
        if (hud) hud.remove();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.dims = { w: rect.width, h: rect.height };
        this.state.paddle.x = this.dims.w / 2 - 50;
    }

    setupInput() {
        const move = (e) => {
            const x = (e.clientX || e.touches?.[0]?.clientX || 0);
            const rect = this.canvas.getBoundingClientRect();
            const relX = (x - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            this.state.paddle.x = relX - this.state.paddle.w / 2;
            if (this.state.paddle.x < 0) this.state.paddle.x = 0;
            if (this.state.paddle.x + this.state.paddle.w > this.dims.w) this.state.paddle.x = this.dims.w - this.state.paddle.w;
        };
        this.canvas.onmousemove = move;
        this.canvas.ontouchmove = (e) => { e.preventDefault(); move(e); };
        this.canvas.onclick = () => {
            if (!this.sfx.ctx) this.sfx.init();
            if (this.state.balls.length === 0) this.spawnBall();
        };
    }

    spawnBall() {
        this.state.balls.push({
            x: this.state.paddle.x + this.state.paddle.w / 2,
            y: this.dims.h - 40,
            r: 6, dx: 4, dy: -4
        });
    }

    resetLevel() {
        this.state.bricks = [];
        const cols = 8;
        const rows = 4;
        const padding = 10;
        const w = (this.dims.w - (cols + 1) * padding) / cols;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.state.bricks.push({
                    x: padding + c * (w + padding),
                    y: 60 + r * (25 + padding),
                    w, h: 20, status: 1,
                    color: `hsl(${r * 40 + 180}, 100%, 50%)`
                });
            }
        }
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = 'rgba(0,0,0,0.2)'; // Motion blur
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Shake
        this.ctx.save();
        if (this.state.shake > 0) {
            this.ctx.translate((Math.random() - 0.5) * this.state.shake, (Math.random() - 0.5) * this.state.shake);
            this.state.shake *= 0.9;
        }

        // Paddle
        this.ctx.fillStyle = '#0ff';
        this.ctx.shadowBlur = 15; this.ctx.shadowColor = '#0ff';
        this.ctx.fillRect(this.state.paddle.x, this.dims.h - 25, this.state.paddle.w, this.state.paddle.h);
        this.ctx.shadowBlur = 0;

        // Balls
        this.state.balls.forEach((b, i) => {
            b.x += b.dx; b.y += b.dy;
            if (b.x < b.r || b.x > this.dims.w - b.r) b.dx *= -1;
            if (b.y < b.r) b.dy *= -1;

            // Paddle bounce
            if (b.y > this.dims.h - 25 - b.r && b.x > this.state.paddle.x && b.x < this.state.paddle.x + this.state.paddle.w) {
                b.dy = -Math.abs(b.dy);
                this.sfx.play('paddle');
            }

            // Death
            if (b.y > this.dims.h) {
                this.state.balls.splice(i, 1);
                if (this.state.balls.length === 0) {
                    this.state.lives--;
                    document.getElementById('h-lives').innerText = this.state.lives;
                    if (this.state.lives <= 0) this.running = false;
                }
            }

            // Bricks
            this.state.bricks.forEach(brick => {
                if (brick.status === 1 && b.x > brick.x && b.x < brick.x + brick.w && b.y > brick.y && b.y < brick.y + brick.h) {
                    brick.status = 0;
                    b.dy *= -1;
                    this.state.score += 100;
                    document.getElementById('h-score').innerText = this.state.score;
                    this.state.shake = 10;
                    this.sfx.play('hit');
                }
            });

            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
        });

        // Bricks
        this.state.bricks.forEach(b => {
            if (b.status === 1) {
                this.ctx.fillStyle = b.color;
                this.ctx.fillRect(b.x, b.y, b.w, b.h);
            }
        });

        this.ctx.restore();
        requestAnimationFrame(() => this.loop());
    }
}
