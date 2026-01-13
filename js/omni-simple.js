/**
 * CLARITY FOR HUMANS - CYBER BREAKER PRO 🧱💎
 * Features: Synth Audio, Screen Shake, Power-ups, Particles.
 */

// 🎵  MINI SYNTH ENGINE (No external files)
const sfx = {
    ctx: null,
    init: () => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        sfx.ctx = new AudioContext();
    },
    play: (type) => {
        if (!sfx.ctx) return;
        const osc = sfx.ctx.createOscillator();
        const gain = sfx.ctx.createGain();
        osc.connect(gain);
        gain.connect(sfx.ctx.destination);

        const now = sfx.ctx.currentTime;
        if (type === 'hit') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'paddle') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(600, now + 0.05);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'lose') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.5);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } else if (type === 'powerup') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    }
};

class CyberBreaker {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;

        this.state = {
            running: false,
            score: 0,
            lives: 3,
            level: 1,
            paddle: { x: 0, w: 100, h: 10, type: 'normal' },
            balls: [], // Array for multiball
            bricks: [],
            particles: [],
            powerups: [],
            shake: 0
        };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Input
        const moveHandler = (x) => {
            this.state.paddle.x = x - this.state.paddle.w / 2;
            if (this.state.paddle.x < 0) this.state.paddle.x = 0;
            if (this.state.paddle.x + this.state.paddle.w > this.dims.w) this.state.paddle.x = this.dims.w - this.state.paddle.w;
        };

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            moveHandler((e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            moveHandler((e.touches[0].clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr);
        }, { passive: false });

        this.canvas.addEventListener('click', () => {
            if (!sfx.ctx) sfx.init(); // Init audio on first click

            if (!this.state.running && this.state.lives > 0) {
                this.state.running = true;
                this.spawnBall();
                sfx.play('paddle');
            } else if (this.state.lives <= 0) {
                this.restart();
            }
        });

        this.resetLevel();
        requestAnimationFrame((t) => this.loop(t));
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.dims = { w: rect.width, h: rect.height };
        // Center paddle on resize
        if (!this.state.running) this.state.paddle.x = this.dims.w / 2 - this.state.paddle.w / 2;
    }

    spawnBall(x, y, dx, dy) {
        this.state.balls.push({
            x: x || this.dims.w / 2,
            y: y || this.dims.h - 40,
            r: 6,
            dx: dx || 4 * (Math.random() > 0.5 ? 1 : -1),
            dy: dy || -4,
            active: true
        });
    }

    resetLevel() {
        this.state.bricks = [];
        this.state.balls = [];
        this.state.powerups = [];
        this.state.paddle.w = 100;

        const rows = 5 + this.state.level;
        const cols = 9;
        const padding = 8;
        const w = (this.dims.w - (cols + 1) * padding) / cols;
        const h = 20;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.state.bricks.push({
                    x: padding + c * (w + padding),
                    y: padding + 60 + r * (h + padding),
                    w: w, h: h,
                    status: 1, // 1 = active
                    color: `hsl(${r * 40}, 100%, 50%)`,
                    type: Math.random() > 0.9 ? 'power' : 'normal' // 10% chance for powerup brick
                });
            }
        }
    }

    loop() {
        // 1. Screen Shake Transform
        this.ctx.save();
        if (this.state.shake > 0) {
            const dx = (Math.random() - 0.5) * this.state.shake;
            const dy = (Math.random() - 0.5) * this.state.shake;
            this.ctx.translate(dx, dy);
            this.state.shake *= 0.9; // Decay
            if (this.state.shake < 0.5) this.state.shake = 0;
        }

        // Clear
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Header
        if (!this.state.running && this.state.lives > 0) {
            this.ctx.fillStyle = '#0f0';
            this.ctx.font = '20px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText("TAP TO START", this.dims.w / 2, this.dims.h / 2);
            if (!sfx.ctx) this.ctx.fillText("(Audio will enable)", this.dims.w / 2, this.dims.h / 2 + 30);
        }

        // Draw Paddle
        this.ctx.fillStyle = '#0ff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#0ff';
        this.ctx.fillRect(this.state.paddle.x, this.dims.h - 20, this.state.paddle.w, this.state.paddle.h);
        this.ctx.shadowBlur = 0;

        // Update Balls
        if (this.state.running) {
            this.state.balls.forEach((b, bi) => {
                if (!b.active) return;

                b.x += b.dx;
                b.y += b.dy;

                // Walls
                if (b.x > this.dims.w - b.r || b.x < b.r) { b.dx = -b.dx; sfx.play('hit'); }
                if (b.y < b.r) { b.dy = -b.dy; sfx.play('hit'); }

                // Paddle
                if (b.y + b.dy > this.dims.h - 20 - b.r && b.y < this.dims.h - 10) {
                    if (b.x > this.state.paddle.x && b.x < this.state.paddle.x + this.state.paddle.w) {
                        b.dy = -Math.abs(b.dy);
                        b.dx = ((b.x - (this.state.paddle.x + this.state.paddle.w / 2)) / (this.state.paddle.w / 2)) * 6;
                        sfx.play('paddle');
                        this.spawnParticles(b.x, this.dims.h - 20, '#0ff', 5);
                    }
                }

                // Floor
                if (b.y > this.dims.h) {
                    b.active = false;
                    this.state.balls.splice(bi, 1);
                    if (this.state.balls.length === 0) {
                        this.loseLife();
                    }
                }

                // Bricks
                this.state.bricks.forEach(brick => {
                    if (brick.status === 1) {
                        if (b.x > brick.x && b.x < brick.x + brick.w && b.y > brick.y && b.y < brick.y + brick.h) {
                            b.dy = -b.dy;
                            brick.status = 0;
                            this.state.score += 10;
                            this.updateHUD();
                            sfx.play('hit');
                            this.state.shake = 5; // JUICE
                            this.spawnParticles(brick.x + brick.w / 2, brick.y + brick.h / 2, brick.color, 8);

                            // Spawn Powerup
                            if (brick.type === 'power') {
                                this.spawnPowerup(brick.x + brick.w / 2, brick.y);
                            }
                        }
                    }
                });

                // Draw Ball
                this.ctx.beginPath();
                this.ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                this.ctx.fillStyle = '#fff';
                this.ctx.fill();
            });
        }

        // Draw Bricks
        this.state.bricks.forEach(b => {
            if (b.status === 1) {
                this.ctx.fillStyle = b.color;
                this.ctx.fillRect(b.x, b.y, b.w, b.h);
                if (b.type === 'power') {
                    this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
                    this.ctx.fillRect(b.x + b.w / 2 - 2, b.y, 4, b.h);
                }
            }
        });

        // Update Powerups
        this.ctx.font = '12px monospace';
        this.state.powerups.forEach((p, i) => {
            p.y += 2;
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(p.type, p.x, p.y);

            // Collect
            if (p.y > this.dims.h - 20 && p.y < this.dims.h && p.x > this.state.paddle.x && p.x < this.state.paddle.x + this.state.paddle.w) {
                this.activatePower(p.type);
                this.state.powerups.splice(i, 1);
            } else if (p.y > this.dims.h) {
                this.state.powerups.splice(i, 1);
            }
        });

        // Update Particles
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

        // Level Clear
        if (this.state.bricks.every(b => b.status === 0)) {
            this.state.level++;
            sfx.play('powerup');
            this.resetLevel();
            this.spawnBall();
            this.updateHUD();
        }

        this.ctx.restore();
        requestAnimationFrame(() => this.loop());
    }

    spawnPowerup(x, y) {
        const types = ['WIDE', 'MULTI', 'LIFE'];
        const type = types[Math.floor(Math.random() * types.length)];
        this.state.powerups.push({ x, y, type });
    }

    activatePower(type) {
        sfx.play('powerup');
        this.state.score += 50;
        // this.spawnFloatText(type, this.state.paddle.x + this.state.paddle.w/2, this.dims.h - 50); // Removed float text for now

        if (type === 'WIDE') {
            this.state.paddle.w = 150;
            setTimeout(() => this.state.paddle.w = 100, 10000);
        } else if (type === 'MULTI') {
            // Split every existing ball into 2
            const newBalls = [];
            this.state.balls.forEach(b => {
                newBalls.push({ ...b, dx: -b.dx });
                newBalls.push({ ...b, dx: b.dx * 1.2 });
            });
            this.state.balls.push(...newBalls);
        } else if (type === 'LIFE') {
            this.state.lives++;
        }
        this.updateHUD();
    }

    loseLife() {
        this.state.lives--;
        sfx.play('lose');
        this.state.shake = 20; // Big shake
        this.updateHUD();

        if (this.state.lives > 0) {
            this.state.running = false;
        } else {
            document.getElementById('game-overlay').style.display = 'flex';
            document.getElementById('go-score').innerText = `FINAL SCORE: ${this.state.score}`;
        }
    }

    spawnParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.state.particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 20 + Math.random() * 10,
                color: color,
                size: 2 + Math.random() * 3
            });
        }
    }

    // spawnFloatText(text, x, y) { // Removed float text for now
    //     // Simple visual hack using particles array
    //     this.state.particles.push({
    //         x, y, vx:0, vy:-1, life:60, color:'#fff', size:0, // skip rect draw
    //         custom: true, text: text
    //     });
    // }

    updateHUD() {
        const hEl = document.getElementById('g-health'); if (hEl) hEl.innerText = this.state.lives;
        const mEl = document.getElementById('g-money'); if (mEl) mEl.innerText = this.state.score;
        const lEl = document.getElementById('g-level'); if (lEl) lEl.innerText = this.state.level;
    }

    restart() {
        document.getElementById('game-overlay').style.display = 'none';
        this.state.score = 0;
        this.state.lives = 3;
        this.state.level = 1;
        this.resetLevel();
        this.state.running = false;
        this.updateHUD();
    }
}

// Global Launch
window.omni = new CyberBreaker();
