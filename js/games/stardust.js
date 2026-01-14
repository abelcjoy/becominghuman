export class Stardust {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.particles = [];
        this.mouse = { x: 0, y: 0, active: false };
        this.time = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.initField();
        this.loop();

        const setMouse = (e) => {
            const rect = this.canvas.getBoundingClientRect();
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
        hud.innerHTML = `<div style="font-size: 0.7rem; letter-spacing: 3px; opacity: 0.5;">SOLAR_FLUX_DENSITY</div><div style="font-size: 1rem; margin-top: 10px; font-weight: 300;">HOLD TO CONCENTRATE ENERGY</div>`;
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

    initField() {
        for (let i = 0; i < 800; i++) {
            this.particles.push({
                x: Math.random() * this.dims.w,
                y: Math.random() * this.dims.h,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                r: Math.random() * 1.5,
                hue: Math.random() * 60 + 10 // Fire/Gold colors
            });
        }
    }

    loop() {
        if (!this.running) return;
        this.time += 0.01;

        // Long trails for "solar flare" effect
        this.ctx.fillStyle = "rgba(5, 2, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        this.ctx.globalCompositeOperation = "lighter";

        const mouseDist = this.mouse.active ? 300 : 150;
        const mouseForce = this.mouse.active ? 0.05 : 0.01;

        this.particles.forEach(p => {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < mouseDist) {
                const angle = Math.atan2(dy, dx);
                // Orbit + Pull
                p.vx += Math.cos(angle + Math.PI / 2) * mouseForce * 2;
                p.vy += Math.sin(angle + Math.PI / 2) * mouseForce * 2;
                p.vx += Math.cos(angle) * mouseForce;
                p.vy += Math.sin(angle) * mouseForce;
            }

            // Central Sun Gravity (always there but slight)
            const sdx = (this.dims.w / 2) - p.x;
            const sdy = (this.dims.h / 2) - p.y;
            const sd = Math.sqrt(sdx * sdx + sdy * sdy);
            p.vx += sdx / sd * 0.01;
            p.vy += sdy / sd * 0.01;

            p.vx *= 0.98;
            p.vy *= 0.98;
            p.x += p.vx;
            p.y += p.vy;

            // Draw
            this.ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, 0.8)`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Center "Sun"
        const grad = this.ctx.createRadialGradient(this.dims.w / 2, this.dims.h / 2, 0, this.dims.w / 2, this.dims.h / 2, 200);
        grad.addColorStop(0, "rgba(255, 100, 0, 0.1)");
        grad.addColorStop(1, "transparent");
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        this.ctx.globalCompositeOperation = "source-over";
        requestAnimationFrame(() => this.loop());
    }
}
