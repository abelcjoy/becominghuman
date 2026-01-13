/**
 * CLARITY FOR HUMANS - THE FIREWALL GUARD 🛡️
 * Pivot: Complete transformation to a Cyberpunk Defense Game.
 */

class FirewallGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;

        // Game State
        this.state = {
            running: true,
            health: 100,
            money: 0,
            score: 0,
            entities: [],
            particles: [],
            lastSpawn: 0,
            spawnRate: 2000,
            autoDmg: 0,      // Upgrade 1: Auto Turret
            enemySpeed: 1.5, // Base speed
            slowFactor: 1,   // Upgrade 2: Slow enemies
            level: 1,
            combo: 0
        };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Input Handling
        this.canvas.addEventListener('mousedown', (e) => this.handleClick(e));
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scroll
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }, { passive: false });

        // Upgrades
        this.bindButtons();

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

    bindButtons() {
        const btn1 = document.getElementById('btn-upg-1');
        const btn2 = document.getElementById('btn-upg-2');
        const btn3 = document.getElementById('btn-nuke');
        const restart = document.getElementById('btn-restart');

        if (btn1) btn1.onclick = () => {
            if (this.state.money >= 50) {
                this.state.money -= 50;
                this.state.autoDmg += 1; // More damage per tick
                this.updateHUD();
                this.spawnFloatText("AUTO-PATCH INSTALLED", this.dims.w / 2, this.dims.h - 100, '#0f0');
            }
        };

        if (btn2) btn2.onclick = () => {
            if (this.state.money >= 150) {
                this.state.money -= 150;
                this.state.slowFactor *= 0.8; // Enemies 20% slower
                this.updateHUD();
                this.spawnFloatText("BANDWIDTH OPTIMIZED", this.dims.w / 2, this.dims.h - 100, '#0f0');
            }
        };

        if (btn3) btn3.onclick = () => {
            if (this.state.money >= 500) {
                this.state.money -= 500;
                this.nuke();
                this.updateHUD();
            }
        };

        if (restart) restart.onclick = () => this.restart();
    }

    loop(time) {
        if (!this.state.running) return;

        // Clear with fade for trails
        this.ctx.fillStyle = 'rgba(0, 5, 0, 0.3)';
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);

        // Matrix Rain Effect (Subtle background)
        if (Math.random() > 0.9) {
            this.ctx.fillStyle = 'rgba(0, 50, 0, 0.5)';
            this.ctx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96), Math.random() * this.dims.w, Math.random() * this.dims.h);
        }

        // 1. Spawning Logic
        if (time - this.state.lastSpawn > this.state.spawnRate) {
            this.spawnEnemy();
            this.state.lastSpawn = time;

            // Difficulty Ramp
            if (this.state.spawnRate > 500) this.state.spawnRate -= 20;
            this.state.enemySpeed += 0.05;

            // Level Up logic
            if (this.state.score > this.state.level * 20) {
                this.state.level++;
                this.updateHUD();
                this.spawnFloatText(`SECTOR ${this.state.level} REACHED`, this.dims.w / 2, this.dims.h / 2, '#fff');
            }
        }

        // 2. Auto-Damage Logic (Turret)
        // Auto-patcher fires every 60 frames (approx 1 sec) roughly. 
        // We'll use time check against a local ticker or just random chance based on fire rate.
        // Simplified: Every frame small chance to zap.
        if (this.state.autoDmg > 0 && Math.random() < 0.05 * this.state.autoDmg && this.state.entities.length > 0) {
            const target = this.state.entities[0]; // Target closest/oldest
            this.hitEnemy(target, 5); // Strong zap

            // Laser Visual
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#0ff';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#0ff';
            this.ctx.beginPath();
            this.ctx.moveTo(this.dims.w / 2, this.dims.h);
            this.ctx.lineTo(target.x, target.y);
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }

        // 3. Update Entities
        this.state.entities.forEach((e, i) => {
            e.y += e.speed * this.state.slowFactor;

            // Draw Enemy
            this.ctx.font = `${e.size}px monospace`;
            this.ctx.fillStyle = e.color;
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = e.color;
            this.ctx.fillText(e.text, e.x, e.y);
            this.ctx.shadowBlur = 0;

            // Health Bar logic for bosses
            if (e.maxHp > 1) {
                const w = 40;
                this.ctx.fillStyle = '#333';
                this.ctx.fillRect(e.x, e.y - e.size, w, 4);
                this.ctx.fillStyle = e.color;
                this.ctx.fillRect(e.x, e.y - e.size, w * (e.hp / e.maxHp), 4);
            }

            // Game Over Check
            if (e.y > this.dims.h) {
                this.damageSystem(10);
                this.state.entities.splice(i, 1);
            }
        });

        // 4. Update Particles
        this.state.particles.forEach((p, i) => {
            p.life--;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95; // Friction
            p.vy *= 0.95;

            if (p.type === 'text') {
                this.ctx.font = "14px monospace";
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.life / 60})`;
                this.ctx.fillText(p.text, p.x, p.y);
            } else {
                this.ctx.fillStyle = p.color || `rgba(0, 255, 0, ${p.life / 30})`;
                this.ctx.fillRect(p.x, p.y, p.size, p.size);
            }

            if (p.life <= 0) this.state.particles.splice(i, 1);
        });

        // Clean up dead entities (marked during hit)
        this.state.entities = this.state.entities.filter(e => e.hp > 0);

        requestAnimationFrame((t) => this.loop(t));
    }

    spawnEnemy() {
        const typeRoll = Math.random();
        let type = 'GLITCH';
        let hp = 1;
        let color = '#0f0'; // Matrix Green
        let speed = this.state.enemySpeed;
        let size = 20;

        // Enemy Types
        if (this.state.level > 1 && typeRoll > 0.6) {
            type = 'BUG';
            hp = 3;
            color = '#ff0'; // Warning Yellow
            size = 24;
        }
        if (this.state.level > 3 && typeRoll > 0.8) {
            type = 'TROJAN';
            hp = 5;
            color = '#f0f'; // Neon Purple
            speed *= 1.2;
            size = 28;
        }
        if (this.state.level > 5 && typeRoll > 0.95) {
            type = 'RANSOMWARE';
            hp = 20;
            color = '#f00'; // Critical Red
            speed *= 0.5; // Slow tank
            size = 40;
        }

        // Random Matrix Text characters if basic
        const txt = type === 'GLITCH' ? this.randomHex() : type;

        this.state.entities.push({
            x: Math.random() * (this.dims.w - 100) + 50,
            y: -50,
            text: txt,
            hp: hp,
            maxHp: hp,
            color: color,
            speed: speed,
            size: size
        });
    }

    hitEnemy(e, dmg) {
        e.hp -= dmg;
        e.y -= 5; // Knockback

        // Hit particles
        for (let i = 0; i < 3; i++) {
            this.state.particles.push({
                x: e.x + Math.random() * 20,
                y: e.y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 20,
                size: 2,
                color: e.color
            });
        }

        if (e.hp <= 0) {
            // Kill Reward
            const reward = e.maxHp * 10;
            this.state.money += reward;
            this.state.score += e.maxHp;
            this.updateHUD();

            // Floating text
            this.spawnFloatText(`+${reward}B`, e.x, e.y, '#fff');

            // Sound Effect logic (visual only for now)
            this.flashScreen('rgba(255, 255, 255, 0.1)');
        }
    }

    handleClick(e) {
        if (!this.state.running) return;
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / this.dpr;
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / this.dpr;

        let hit = false;
        // Check hits (reverse order to hit top ones first)
        for (let i = this.state.entities.length - 1; i >= 0; i--) {
            const ent = this.state.entities[i];
            // Simple box collision approximation
            const dist = Math.abs(x - ent.x) + Math.abs(y - ent.y);
            if (dist < 60) { // Click radius
                this.hitEnemy(ent, 1);
                hit = true;
                break; // Only hit one at a time per click
            }
        }

        if (!hit) {
            // Miss particle
            this.state.particles.push({
                x: x, y: y, life: 10, size: 2, vx: 0, vy: 0, color: '#444'
            });
        }
    }

    damageSystem(amount) {
        this.state.health -= amount;
        this.flashScreen('rgba(255, 0, 0, 0.3)');
        this.updateHUD();

        if (this.state.health <= 0) {
            this.gameOver();
        }
    }

    nuke() {
        this.state.entities = []; // Wipe all
        this.flashScreen('#fff');
        this.spawnFloatText("SYSTEM PURGED", this.dims.w / 2, this.dims.h / 2, '#f00');
    }

    flashScreen(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.dims.w, this.dims.h);
    }

    spawnFloatText(text, x, y, color) {
        this.state.particles.push({
            type: 'text',
            text: text,
            x: x,
            y: y,
            vx: 0,
            vy: -1,
            life: 60,
            color: color
        });
    }

    updateHUD() {
        const hEl = document.getElementById('g-health');
        if (hEl) hEl.innerText = this.state.health;

        const mEl = document.getElementById('g-money');
        if (mEl) mEl.innerText = this.state.money;

        const lEl = document.getElementById('g-level');
        if (lEl) lEl.innerText = this.state.level;

        // Button States
        document.getElementById('btn-upg-1').style.opacity = this.state.money >= 50 ? 1 : 0.5;
        document.getElementById('btn-upg-2').style.opacity = this.state.money >= 150 ? 1 : 0.5;
        document.getElementById('btn-nuke').style.opacity = this.state.money >= 500 ? 1 : 0.5;
    }

    randomHex() {
        const hex = "0123456789ABCDEF";
        let out = "";
        for (let i = 0; i < 8; i++) out += hex[Math.floor(Math.random() * 16)];
        return "0x" + out;
    }

    gameOver() {
        this.state.running = false;
        document.getElementById('game-overlay').style.display = 'flex';
        document.getElementById('go-score').innerText = `DATA SECURED: ${this.state.score} PACKETS`;
    }

    restart() {
        document.getElementById('game-overlay').style.display = 'none';
        this.state = {
            running: true,
            health: 100,
            money: 0,
            score: 0,
            entities: [],
            particles: [],
            lastSpawn: 0,
            spawnRate: 2000,
            autoDmg: 0,
            enemySpeed: 1.5,
            slowFactor: 1,
            level: 1,
            combo: 0
        };
        this.updateHUD();
        requestAnimationFrame((t) => this.loop(t));
    }
}

// Global Launch
window.omni = new FirewallGame();
