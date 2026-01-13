/**
 * CLARITY FOR HUMANS - CYBER BREAKER 🧱
 * Prototype 2: A retro-style brick breaking game with cyberpunk aesthetics.
 */

class CyberBreaker {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;

        // Game State
        this.state = {
            running: false, // Wait for click to start
            score: 0,
            lives: 3,
            level: 1,
            paddle: { x: 0, w: 100, h: 10, speed: 8 },
            ball: { x: 0, y: 0, r: 6, dx: 4, dy: -4, active: false },
            bricks: [],
            particles: []
        };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Input Handling (Mouse & Touch)
        const moveHandler = (x) => {
            this.state.paddle.x = x - this.state.paddle.w / 2;
            // Clamp
            if (this.state.paddle.x < 0) this.state.paddle.x = 0;
            if (this.state.paddle.x + this.state.paddle.w > this.dims.w) this.state.paddle.x = this.dims.w - this.state.paddle.w;
        };

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            moveHandler(x);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            moveHandler(x);
        }, { passive: false });

        this.canvas.addEventListener('click', () => {
            if (!this.state.running && this.state.lives > 0) {
                this.state.running = true;
                this.state.ball.active = true;
            } else if (this.state.lives <= 0) {
                this.restart();
            }
        });

        // Initialize Level
        this.resetLevel();
        this.resetBall();

        // Loop
        requestAnimationFrame((t) => this.loop(t));
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.dims = { w: rect.width, h: rect.height };
    }

    resetBall() {
        this.state.ball.active = false;
        this.state.ball.x = this.dims.w / 2;
        this.state.ball.y = this.dims.h - 40;
        this.state.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        this.state.ball.dy = -4;
        this.state.paddle.x = this.dims.w / 2 - this.state.paddle.w / 2;
    }

    resetLevel() {
        this.state.bricks = [];
        const rows = 5 + this.state.level;
        const cols = 8;
        const padding = 10;
        const w = (this.dims.w - (cols + 1) * padding) / cols;
        const h = 20;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.state.bricks.push({
                    x: padding + c * (w + padding),
                    y: padding + 50 + r * (h + padding),
                    w: w,
                    h: h,
                    status: 1, // 1 = active
                    color: `hsl(${r * 40}, 100%, 50%)`
                });
            }
        }
    }

    loop(time) {
        // Clear
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Header Text
        if (!this.state.ball.active && this.state.lives > 0) {
            this.ctx.fillStyle = '#0f0';
            this.ctx.font = '20px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText("CLICK TO LAUNCH", this.dims.w / 2, this.dims.h / 2);
        }

        // Draw Paddle
        this.ctx.fillStyle = '#0ff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#0ff';
        this.ctx.fillRect(this.state.paddle.x, this.dims.h - 20, this.state.paddle.w, this.state.paddle.h);
        this.ctx.shadowBlur = 0;

        // Draw Ball
        this.ctx.beginPath();
        this.ctx.arc(this.state.ball.x, this.state.ball.y, this.state.ball.r, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.closePath();

        // Draw Bricks
        this.state.bricks.forEach(b => {
            if (b.status === 1) {
                this.ctx.fillStyle = b.color;
                this.ctx.fillRect(b.x, b.y, b.w, b.h);
                // Shine
                this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
                this.ctx.fillRect(b.x, b.y, b.w, b.h / 2);
            }
        });

        // Game Logic
        if (this.state.ball.active) {
            // Move Ball
            this.state.ball.x += this.state.ball.dx;
            this.state.ball.y += this.state.ball.dy;

            // Wall Collision
            if (this.state.ball.x + this.state.ball.dx > this.dims.w - this.state.ball.r || this.state.ball.x + this.state.ball.dx < this.state.ball.r) {
                this.state.ball.dx = -this.state.ball.dx;
            }
            if (this.state.ball.y + this.state.ball.dy < this.state.ball.r) {
                this.state.ball.dy = -this.state.ball.dy;
            }

            // Paddle Collision
            if (this.state.ball.y + this.state.ball.dy > this.dims.h - 20 - this.state.ball.r) {
                if (this.state.ball.x > this.state.paddle.x && this.state.ball.x < this.state.paddle.x + this.state.paddle.w) {
                    this.state.ball.dy = -Math.abs(this.state.ball.dy); // Force up
                    // Add "English" (spin) based on where it hit the paddle
                    const hitPoint = this.state.ball.x - (this.state.paddle.x + this.state.paddle.w / 2);
                    this.state.ball.dx = hitPoint * 0.15;

                    // FX
                    this.spawnParticles(this.state.ball.x, this.dims.h - 20, '#0ff');
                }
            }

            // Floor Collision (Death)
            if (this.state.ball.y + this.state.ball.dy > this.dims.h) {
                this.state.lives--;
                this.updateHUD();
                if (this.state.lives > 0) {
                    this.resetBall();
                } else {
                    this.gameOver();
                }
            }

            // Brick Collision
            this.state.bricks.forEach(b => {
                if (b.status === 1) {
                    if (this.state.ball.x > b.x && this.state.ball.x < b.x + b.w && this.state.ball.y > b.y && this.state.ball.y < b.y + b.h) {
                        this.state.ball.dy = -this.state.ball.dy;
                        b.status = 0;
                        this.state.score += 10;
                        this.updateHUD();
                        this.spawnParticles(b.x + b.w / 2, b.y + b.h / 2, b.color);
                    }
                }
            });

            // Level Clear Check
            if (this.state.bricks.every(b => b.status === 0)) {
                this.state.level++;
                this.resetLevel();
                this.resetBall();
                this.updateHUD();
            }
        }

        // Particles
        this.ctx.globalCompositeOperation = 'lighter';
        this.state.particles.forEach((p, i) => {
            p.life--;
            p.x += p.vx;
            p.y += p.vy;
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life / 20;
            this.ctx.fillRect(p.x, p.y, p.size, p.size);
            if (p.life <= 0) this.state.particles.splice(i, 1);
        });
        this.ctx.globalAlpha = 1.0;
        this.ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame((t) => this.loop(t));
    }

    spawnParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.state.particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 20 + Math.random() * 10,
                color: color,
                size: 2 + Math.random() * 3
            });
        }
    }

    updateHUD() {
        const hEl = document.getElementById('g-health'); // Reusing ID for Lives
        if (hEl) hEl.innerText = this.state.lives;

        const mEl = document.getElementById('g-money'); // Reusing ID for Score
        if (mEl) mEl.innerText = this.state.score;

        const lEl = document.getElementById('g-level');
        if (lEl) lEl.innerText = this.state.level;
    }

    gameOver() {
        this.state.ball.active = false;
        document.getElementById('game-overlay').style.display = 'flex';
        document.getElementById('go-score').innerText = `FINAL SCORE: ${this.state.score}`;
    }

    restart() {
        document.getElementById('game-overlay').style.display = 'none';
        this.state.score = 0;
        this.state.lives = 3;
        this.state.level = 1;
        this.resetLevel();
        this.resetBall();
        this.updateHUD();
    }
}

// Global Launch
window.omni = new CyberBreaker();
