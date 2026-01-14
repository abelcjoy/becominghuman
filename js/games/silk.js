export class Silk {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        // Ribbon settings
        this.points = [];
        this.numPoints = 40;
        this.mouse = { x: 0, y: 0 };
        this.nodes = []; // Harmonic nodes to collect
        this.particles = [];
        this.hue = 200;
        this.score = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();

        // Init ribbon points
        for (let i = 0; i < this.numPoints; i++) {
            this.points.push({ x: this.dims.w / 2, y: this.dims.h / 2 });
        }

        this.loop();

        const move = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX || e.touches?.[0]?.clientX || 0 - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            this.mouse.y = (e.clientY || e.touches?.[0]?.clientY || 0 - rect.top) * (this.canvas.height / rect.height) / this.dpr;
        };

        this.canvas.onmousemove = move;
        this.canvas.ontouchmove = (e) => { e.preventDefault(); move(e); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `
            position: absolute; top: 40px; left: 50%; transform: translateX(-50%);
            color: #fff; font-family: 'Space Grotesk', sans-serif; pointer-events: none;
            text-align: center; mix-blend-mode: difference;
        `;
        hud.innerHTML = `
            <div style="font-size: 0.7rem; letter-spacing: 5px; opacity: 0.6;">HARMONIC_RESONANCE</div>
            <div id="silk-score" style="font-size: 1.5rem; font-weight: 300; margin-top: 5px;">0.00</div>
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

    spawnNode() {
        this.nodes.push({
            x: Math.random() * this.dims.w,
            y: Math.random() * this.dims.h,
            r: 0,
            maxR: 20 + Math.random() * 30,
            pulse: 0,
            color: `hsl(${this.hue + (Math.random() - 0.5) * 40}, 100%, 70%)`
        });
    }

    loop() {
        if (!this.running) return;

        // Clear with slight fade for trails
        this.ctx.fillStyle = "rgba(5, 5, 8, 0.15)";
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Update Ribbon
        let head = this.points[0];
        head.x += (this.mouse.x - head.x) * 0.15;
        head.y += (this.mouse.y - head.y) * 0.15;

        for (let i = 1; i < this.numPoints; i++) {
            let p = this.points[i];
            let prev = this.points[i - 1];
            p.x += (prev.x - p.x) * 0.4;
            p.y += (prev.y - p.y) * 0.4;
        }

        // Draw Ribbon
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        // Multi-layered stroke for "glow"
        const drawRibbon = (width, alpha, blur) => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.numPoints; i++) {
                const xc = (this.points[i].x + this.points[i - 1].x) / 2;
                const yc = (this.points[i].y + this.points[i - 1].y) / 2;
                this.ctx.quadraticCurveTo(this.points[i - 1].x, this.points[i - 1].y, xc, yc);
            }
            this.ctx.shadowBlur = blur;
            this.ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${alpha})`;
            this.ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, ${alpha})`;
            this.ctx.lineWidth = width;
            this.ctx.stroke();
        };

        this.ctx.globalCompositeOperation = "lighter";
        drawRibbon(12, 0.1, 30);
        drawRibbon(4, 0.4, 10);
        drawRibbon(1, 0.8, 0);
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.shadowBlur = 0;

        // Update Hue
        this.hue += 0.5;

        // Spawn Nodes
        if (this.nodes.length < 5 && Math.random() < 0.05) this.spawnNode();

        // Draw & Collect Nodes
        this.nodes.forEach((node, ni) => {
            node.pulse += 0.05;
            if (node.r < node.maxR) node.r += 0.5;

            const dx = head.x - node.x;
            const dy = head.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < node.r + 20) {
                // Collect!
                this.score += node.maxR;
                document.getElementById('silk-score').innerText = (this.score / 100).toFixed(2);

                // Burst particles
                for (let i = 0; i < 20; i++) {
                    this.particles.push({
                        x: node.x, y: node.y,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1.0,
                        color: node.color
                    });
                }
                this.nodes.splice(ni, 1);
            }

            // Draw Node with ethereal pulse
            this.ctx.beginPath();
            const r = node.r + Math.sin(node.pulse) * 5;
            const grad = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
            grad.addColorStop(0, node.color);
            grad.addColorStop(1, "transparent");
            this.ctx.fillStyle = grad;
            this.ctx.globalAlpha = 0.3;
            this.ctx.arc(node.x, node.y, r * 1.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        });

        // Particles
        this.particles.forEach((p, pi) => {
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.96; p.vy *= 0.96;
            p.life -= 0.02;
            if (p.life <= 0) this.particles.splice(pi, 1);

            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1.0;

        requestAnimationFrame(() => this.loop());
    }
}
