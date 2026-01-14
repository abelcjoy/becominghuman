export class NeonPulse {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;
        this.running = false;

        this.state = {
            pulses: [],
            score: 0,
            combo: 0,
            bgIntensity: 0,
            lastSpawn: 0,
            speed: 3
        };

        this.sfx = {
            ctx: null,
            init: () => {
                this.sfx.ctx = new (window.AudioContext || window.webkitAudioContext)();
            },
            play: (freq, dur, type = 'sine') => {
                if (!this.sfx.ctx) return;
                const osc = this.sfx.ctx.createOscillator();
                const gain = this.sfx.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.sfx.ctx.currentTime);
                gain.gain.setValueAtTime(0.1, this.sfx.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.sfx.ctx.currentTime + dur);
                osc.connect(gain); gain.connect(this.sfx.ctx.destination);
                osc.start(); osc.stop(this.sfx.ctx.currentTime + dur);
            }
        };
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.setupInput();
        this.loop(0);
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `
            position: absolute; inset: 0; display: flex; flex-direction: column;
            align-items: center; justify-content: center; pointer-events: none;
            color: #fff; font-family: 'Space Grotesk', sans-serif;
        `;
        hud.innerHTML = `
            <div id="combo-meter" style="font-size: 5rem; font-weight: 800; opacity: 0.1; transition: transform 0.1s">0</div>
            <div id="score-meter" style="font-size: 1.5rem; margin-top: 20px;">SCORE: 0</div>
            <div style="position: absolute; bottom: 40px; color: rgba(255,255,255,0.3)">CLICK WHEN THE CIRCLE HITS THE CENTER</div>
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

    setupInput() {
        const check = () => {
            if (!this.sfx.ctx) this.sfx.init();

            // Find closest pulse
            let hit = false;
            this.state.pulses.forEach((p, i) => {
                if (p.r < 50 && p.r > 20) {
                    hit = true;
                    this.state.pulses.splice(i, 1);
                    this.state.score += 100 * (this.state.combo + 1);
                    this.state.combo++;
                    this.state.bgIntensity = 1.0;
                    this.sfx.play(440 + this.state.combo * 20, 0.2, 'square');
                }
            });

            if (!hit) {
                this.state.combo = 0;
                this.state.bgIntensity = 0.5;
                this.sfx.play(100, 0.3, 'sawtooth');
            }

            document.getElementById('combo-meter').innerText = this.state.combo;
            document.getElementById('score-meter').innerText = `SCORE: ${this.state.score}`;
            document.getElementById('combo-meter').style.transform = 'scale(1.2)';
            setTimeout(() => {
                const el = document.getElementById('combo-meter');
                if (el) el.style.transform = 'scale(1)';
            }, 100);
        };

        this.canvas.onmousedown = check;
        this.canvas.ontouchstart = (e) => { e.preventDefault(); check(); };
    }

    loop(t) {
        if (!this.running) return;

        // Background Pulse
        this.ctx.fillStyle = `rgba(${this.state.bgIntensity * 50}, 0, ${this.state.bgIntensity * 100}, 0.1)`;
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);
        this.state.bgIntensity *= 0.95;

        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        // Spawn
        if (t - this.state.lastSpawn > 1000 - Math.min(this.state.score / 10, 500)) {
            this.state.pulses.push({ r: Math.max(this.dims.w, this.dims.h) / 2 });
            this.state.lastSpawn = t;
        }

        // Draw Target Zone
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + this.state.bgIntensity})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();

        // Update & Draw Pulses
        this.state.pulses.forEach((p, i) => {
            p.r -= this.state.speed;

            this.ctx.beginPath();
            this.ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
            this.ctx.strokeStyle = `hsl(${(t / 10) % 360}, 100%, 50%)`;
            this.ctx.lineWidth = 4;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = this.ctx.strokeStyle;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;

            if (p.r < 10) {
                this.state.pulses.splice(i, 1);
                this.state.combo = 0;
                document.getElementById('combo-meter').innerText = "0";
            }
        });

        requestAnimationFrame((nt) => this.loop(nt));
    }
}
