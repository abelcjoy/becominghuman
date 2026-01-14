export class PopupSlayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.dpr = window.devicePixelRatio || 1;
        this.popups = [];
        this.score = 0;
        this.memes = [
            "YOU WON $1,000,000!",
            "HOT SINGLES IN YOUR AREA",
            "CLICK FOR FREE RAM",
            "DOWNLOAD_TROJAN.EXE",
            "VIRUS DETECTED!!!",
            "CONGRATS 1M VISITOR",
            "CHEAP BITCOIN HERE",
            "I KNOW WHERE YOU LIVE"
        ];
    }

    start() {
        this.running = true;
        this.resize();
        this.injectHUD();
        this.loop();

        const click = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches?.[0]?.clientX || 0 - rect.left) * (this.canvas.width / rect.width) / this.dpr;
            const y = (e.clientY || e.touches?.[0]?.clientY || 0 - rect.top) * (this.canvas.height / rect.height) / this.dpr;

            for (let i = this.popups.length - 1; i >= 0; i--) {
                const p = this.popups[i];
                // Check 'X' button or just the popup
                if (x > p.x && x < p.x + p.w && y > p.y && y < p.y + p.h) {
                    this.popups.splice(i, 1);
                    this.score += 100;
                    document.getElementById('popup-score').innerText = this.score;
                    return;
                }
            }
        };

        this.canvas.onmousedown = click;
        this.canvas.ontouchstart = (e) => { e.preventDefault(); click(e); };
    }

    injectHUD() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style = `position: absolute; top: 10px; right: 10px; color: #f0f; font-family: 'VT323', monospace; text-align: right; pointer-events: none;`;
        hud.innerHTML = `<div>POPUP_KILL_COUNT</div><div id="popup-score" style="font-size: 3rem;">0</div>`;
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

    spawnPopup() {
        const w = 150 + Math.random() * 100;
        const h = 100 + Math.random() * 50;
        this.popups.push({
            x: Math.random() * (this.dims.w - w),
            y: Math.random() * (this.dims.h - h),
            w: w,
            h: h,
            text: this.memes[Math.floor(Math.random() * this.memes.length)],
            color: `hsl(${Math.random() * 360}, 50%, 50%)`
        });
    }

    loop() {
        if (!this.running) return;

        this.ctx.fillStyle = "#008080"; // Teal Win95 bg
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        if (Math.random() < 0.05) this.spawnPopup();

        this.popups.forEach(p => {
            // Shadow
            this.ctx.fillStyle = "rgba(0,0,0,0.5)";
            this.ctx.fillRect(p.x + 5, p.y + 5, p.w, p.h);

            // Window
            this.ctx.fillStyle = "#c0c0c0";
            this.ctx.fillRect(p.x, p.y, p.w, p.h);
            this.ctx.strokeStyle = "#fff";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(p.x, p.y, p.w, p.h);

            // Title bar
            this.ctx.fillStyle = "#000080";
            this.ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, 15);

            // Text
            this.ctx.fillStyle = "#000";
            this.ctx.font = "14px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText(p.text, p.x + p.w / 2, p.y + p.h / 2);

            // Fake [X]
            this.ctx.fillStyle = "#c0c0c0";
            this.ctx.fillRect(p.x + p.w - 14, p.y + 2, 12, 12);
            this.ctx.strokeStyle = "#000";
            this.ctx.strokeRect(p.x + p.w - 14, p.y + 2, 12, 12);
            this.ctx.fillStyle = "#000";
            this.ctx.fillText("x", p.x + p.w - 8, p.y + 11);
        });

        requestAnimationFrame(() => this.loop());
    }
}
