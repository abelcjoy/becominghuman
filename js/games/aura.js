export class Aura {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;

        this.nodes = [];
        this.links = [];
        this.enemies = [];
        this.score = 0;
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();
        this.canvas.onclick = (e) => this.handleClick(e);
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `
            position: absolute; top: 20px; right: 20px; color: #fff; 
            font-family: 'Space Grotesk', sans-serif; pointer-events: none; text-align: right;
        `;
        hud.innerHTML = `
            <div style="font-size: 0.7rem; opacity: 0.5;">CONSCIOUSNESS LEVEL</div>
            <div id="aura-score" style="font-size: 2rem; font-weight: 800;">0</div>
            <div style="font-size: 0.8rem; margin-top: 10px; color: #00f2ff;">CLICK TO DEPLOY NODES</div>
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

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;

        this.nodes.push({ x, y, r: 0, maxR: 40 + Math.random() * 20, life: 1.0 });
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Spawn Enemies (Shadows)
        if (Math.random() < 0.03) {
            const side = Math.floor(Math.random() * 4);
            let x, y;
            if (side === 0) { x = Math.random() * this.dims.w; y = -20; }
            else if (side === 1) { x = this.dims.w + 20; y = Math.random() * this.dims.h; }
            else if (side === 2) { x = Math.random() * this.dims.w; y = this.dims.h + 20; }
            else { x = -20; y = Math.random() * this.dims.h; }

            this.enemies.push({
                x, y,
                vx: (this.dims.w / 2 - x) * 0.005,
                vy: (this.dims.h / 2 - y) * 0.005,
                r: 10
            });
        }

        // Update Nodes
        this.nodes.forEach((n, i) => {
            if (n.r < n.maxR) n.r += 2;
            n.life -= 0.005;
            if (n.life <= 0) this.nodes.splice(i, 1);

            // Draw Node
            const grad = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
            grad.addColorStop(0, `rgba(0, 242, 255, ${n.life})`);
            grad.addColorStop(1, `rgba(0, 242, 255, 0)`);
            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Update Enemies
        this.enemies.forEach((e, ei) => {
            e.x += e.vx; e.y += e.vy;

            // Check collision with nodes
            this.nodes.forEach(n => {
                const dx = n.x - e.x;
                const dy = n.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < n.r + e.r) {
                    this.enemies.splice(ei, 1);
                    this.score += 10;
                    document.getElementById('aura-score').innerText = this.score;
                }
            });

            // Draw Enemy
            this.ctx.strokeStyle = '#ff3366';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            this.ctx.stroke();
        });

        requestAnimationFrame(() => this.loop());
    }
}
