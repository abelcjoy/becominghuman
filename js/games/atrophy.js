export class Atrophy {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.state = {
            particles: [],
            energy: 100,
            starSize: 50,
            growth: 0,
            collected: 0,
            shake: 0
        };
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();
        this.canvas.onmousemove = (e) => this.handleMouseMove(e);
        this.canvas.ontouchmove = (e) => this.handleMouseMove(e.touches[0]);
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `
            position: absolute; top: 20px; left: 20px; color: #ff3366; 
            font-family: 'Space Grotesk', sans-serif; pointer-events: none;
        `;
        hud.innerHTML = `
            <div style="font-size: 0.8rem; letter-spacing: 2px;">CORE STABILITY</div>
            <div id="stability-bar" style="width: 200px; height: 4px; background: rgba(255,51,102,0.2); margin-top: 10px;">
                <div id="stability-fill" style="width: 100%; height: 100%; background: #ff3366; transition: width 0.1s;"></div>
            </div>
            <div id="score" style="margin-top: 10px; font-size: 1.5rem; font-weight: 800;">0</div>
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
        this.mouse = { x: this.dims.w / 2, y: this.dims.h / 2 };
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        this.mouse.y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;
    }

    spawnParticle() {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(this.dims.w, this.dims.h) * 0.6;
        this.state.particles.push({
            x: this.dims.w / 2 + Math.cos(angle) * dist,
            y: this.dims.h / 2 + Math.sin(angle) * dist,
            vx: -Math.cos(angle) * (2 + Math.random() * 2),
            vy: -Math.sin(angle) * (2 + Math.random() * 2),
            r: 2 + Math.random() * 3,
            color: `hsl(${340 + Math.random() * 40}, 100%, 70%)`
        });
    }

    loop() {
        if (!this.running) return;

        // Background
        this.ctx.fillStyle = 'rgba(5, 0, 10, 0.15)';
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        const cx = this.dims.w / 2;
        const cy = this.dims.h / 2;

        // Spawn
        if (Math.random() < 0.1) this.spawnParticle();

        // Energy Decay
        this.state.energy -= 0.1;
        if (this.state.energy < 0) this.state.energy = 0;

        const stabilityFill = document.getElementById('stability-fill');
        if (stabilityFill) stabilityFill.style.width = this.state.energy + '%';

        // Gravitational Pull towards mouse
        this.state.particles.forEach((p, i) => {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                p.vx += dx * 0.01;
                p.vy += dy * 0.01;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Collision with Core
            const cdx = cx - p.x;
            const cdy = cy - p.y;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

            if (cdist < this.state.starSize / 2) {
                this.state.particles.splice(i, 1);
                this.state.energy = Math.min(100, this.state.energy + 5);
                this.state.collected++;
                this.state.shake = 10;
                document.getElementById('score').innerText = this.state.collected;
            }

            // Draw Particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });

        // Draw Dying Star (Core)
        this.ctx.save();
        if (this.state.shake > 0) {
            this.ctx.translate((Math.random() - 0.5) * this.state.shake, (Math.random() - 0.5) * this.state.shake);
            this.state.shake *= 0.9;
        }

        const pulse = 1 + Math.sin(Date.now() / 200) * 0.1;
        const size = this.state.starSize * pulse * (this.state.energy / 100);

        const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, size);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(0.3, '#ff3366');
        grad.addColorStop(1, 'transparent');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, size, 0, Math.PI * 2);
        this.ctx.fill();

        // Outer Glow
        this.ctx.globalAlpha = 0.2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, size * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ff3366';
        this.ctx.fill();
        this.ctx.restore();

        if (this.state.energy <= 0) {
            this.ctx.fillStyle = '#ff3366';
            this.ctx.font = 'bold 3rem Space Grotesk';
            this.ctx.textAlign = 'center';
            this.ctx.fillText("STAR COLLAPSED", cx, cy);
            setTimeout(() => this.stop(), 2000);
            return;
        }

        requestAnimationFrame(() => this.loop());
    }
}
