export class Liquid {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        // Fluid grid settings
        this.gridSize = 25;
        this.particles = [];
        this.mouse = { x: 0, y: 0, px: 0, py: 0, active: false };
        this.hue = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.initGrid();
        this.loop();

        const setMouse = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = (e.clientX || e.touches?.[0]?.clientX || 0 - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            this.mouse.y = (e.clientY || e.touches?.[0]?.clientY || 0 - rect.top) * (this.canvas.height / rect.height) / this.dpr;
        };

        this.canvas.onmousedown = (e) => { this.mouse.active = true; setMouse(e); };
        this.canvas.onmouseup = () => { this.mouse.active = false; };
        this.canvas.onmousemove = setMouse;
        this.canvas.ontouchstart = (e) => { e.preventDefault(); this.mouse.active = true; setMouse(e.touches[0]); };
        this.canvas.ontouchend = (e) => { e.preventDefault(); this.mouse.active = false; };
        this.canvas.ontouchmove = (e) => { e.preventDefault(); setMouse(e.touches[0]); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; bottom: 40px; width: 100%; text-align: center; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;`;
        hud.innerHTML = `<div style="font-size: 0.7rem; letter-spacing: 3px; opacity: 0.5;">LIQUID_HARMONY</div><div style="font-size: 1rem; margin-top: 10px; font-weight: 200; opacity: 0.8;">SWIPE TO MIX THE PHOTONIC FLUID</div>`;
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
        this.initGrid(); // Re-init on resize
    }

    initGrid() {
        this.particles = [];
        const cols = Math.ceil(this.dims.w / this.gridSize) + 1;
        const rows = Math.ceil(this.dims.h / this.gridSize) + 1;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.particles.push({
                    x: c * this.gridSize,
                    y: r * this.gridSize,
                    ox: c * this.gridSize,
                    oy: r * this.gridSize,
                    vx: 0,
                    vy: 0,
                    color: `hsla(200, 100%, 50%, 0.1)`
                });
            }
        }
    }

    loop() {
        if (!this.running) return;
        this.hue += 0.5;

        this.ctx.fillStyle = "#050508";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        this.ctx.globalCompositeOperation = "lighter";

        this.particles.forEach(p => {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Interaction
            if (dist < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - dist) / 150;

                // Dragging effect
                const mvx = this.mouse.x - this.mouse.px;
                const mvy = this.mouse.y - this.mouse.py;

                p.vx += mvx * force * 0.2;
                p.vy += mvy * force * 0.2;
            }

            // Tension (Spring back to origin)
            const odx = p.ox - p.x;
            const ody = p.oy - p.y;
            p.vx += odx * 0.03;
            p.vy += ody * 0.03;

            // Damping
            p.vx *= 0.92;
            p.vy *= 0.92;

            p.x += p.vx;
            p.y += p.vy;

            // Color based on velocity
            const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const h = (this.hue + vel * 10) % 360;
            const a = Math.min(0.8, vel / 10 + 0.1);

            this.ctx.fillStyle = `hsla(${h}, 100%, 60%, ${a})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 1.5 + vel / 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Connections (Ethereal web)
            if (vel > 2) {
                this.ctx.strokeStyle = `hsla(${h}, 100%, 60%, ${a * 0.2})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
                this.ctx.stroke();
            }
        });

        this.ctx.globalCompositeOperation = "source-over";
        requestAnimationFrame(() => this.loop());
    }
}
