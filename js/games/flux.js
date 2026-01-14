export class Flux {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.particles = [];
        this.mouse = { x: 0, y: 0, active: false };
        this.score = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.initParticles();
        this.loop();

        const setMouse = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            this.mouse.y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;
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
        hud.style = `position: absolute; top: 20px; left: 20px; color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;`;
        hud.innerHTML = `<div style="font-size: 0.8rem; letter-spacing: 2px; color: #00f2ff;">FLUX_STATE</div><div id="flux-score" style="font-size: 2rem; font-weight: 800;">0</div><div style="font-size: 0.8rem; opacity:0.6">DRAG TO PERTURB THE FIELD</div>`;
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

    initParticles() {
        for (let i = 0; i < 300; i++) {
            this.particles.push({
                x: Math.random() * this.dims.w,
                y: Math.random() * this.dims.h,
                vx: 0,
                vy: 0,
                color: `hsl(${180 + Math.random() * 40}, 100%, 50%)`
            });
        }
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "rgba(0,0,0,0.15)";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        this.particles.forEach((p, i) => {
            // Field flow
            const nx = p.x / 100;
            const ny = p.y / 100;
            const angle = Math.sin(nx) + Math.cos(ny) + Math.sin(Date.now() / 1000);
            p.vx += Math.cos(angle) * 0.1;
            p.vy += Math.sin(angle) * 0.1;

            // Mouse interaction
            if (this.mouse.active) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 1000;
                    p.vx += dx * force;
                    p.vy += dy * force;
                    this.score++;
                }
            }

            // Friction
            p.vx *= 0.98;
            p.vy *= 0.98;

            p.x += p.vx;
            p.y += p.vy;

            // Wrap
            if (p.x < 0) p.x = this.dims.w;
            if (p.x > this.dims.w) p.x = 0;
            if (p.y < 0) p.y = this.dims.h;
            if (p.y > this.dims.h) p.y = 0;

            // Draw
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
        });

        document.getElementById('flux-score').innerText = Math.floor(this.score / 100);

        requestAnimationFrame(() => this.loop());
    }
}
