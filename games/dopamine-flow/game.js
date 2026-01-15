const canvas = document.getElementById('flowCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const startOverlay = document.getElementById('start-overlay');
const progressBar = document.getElementById('progress-bar');

let width, height;
let particles = [];
let gameActive = false;
let flowStability = 0;
let mouse = { x: 0, y: 0, active: false };

const COLORS = {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#8b5cf6'
};

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.5);
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 5 + 3;
        const colorKeys = Object.keys(COLORS);
        this.colorType = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        this.color = COLORS[this.colorType];
        this.sorted = false;
    }

    update() {
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                this.vx += dx * 0.01;
                this.vy += dy * 0.01;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0) this.vy *= -1;

        // Zone Detection
        if (this.y > height * 0.8) {
            const zoneWidth = width / 3;
            const zoneIndex = Math.floor(this.x / zoneWidth);
            const targetColor = Object.keys(COLORS)[zoneIndex];

            if (this.colorType === targetColor) {
                if (!this.sorted) {
                    this.sorted = true;
                    flowStability += 1;
                    if (RecoveryAudio) RecoveryAudio.playSuccess();
                    this.reset();
                }
            } else {
                this.vy *= -1.5; // Repel if wrong zone
                this.y = height * 0.79;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resize);
resize();

function initParticles() {
    particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }
}

function updateMouse(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
}

canvas.addEventListener('mousedown', (e) => { mouse.active = true; updateMouse(e); });
canvas.addEventListener('mousemove', (e) => { updateMouse(e); });
window.addEventListener('mouseup', () => { mouse.active = false; });
canvas.addEventListener('touchstart', (e) => { mouse.active = true; updateMouse(e); e.preventDefault(); }, { passive: false });
canvas.addEventListener('touchmove', (e) => { updateMouse(e); e.preventDefault(); }, { passive: false });
window.addEventListener('touchend', () => { mouse.active = false; });

function drawZones() {
    const zoneWidth = width / 3;
    const colorKeys = Object.keys(COLORS);

    colorKeys.forEach((key, i) => {
        ctx.fillStyle = COLORS[key] + '33'; // Low opacity
        ctx.fillRect(i * zoneWidth, height * 0.8, zoneWidth, height * 0.2);

        ctx.strokeStyle = COLORS[key];
        ctx.lineWidth = 2;
        ctx.strokeRect(i * zoneWidth, height * 0.8, zoneWidth, height * 0.2);
    });
}

function loop() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, width, height);

    drawZones();

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    const displayPct = Math.min(100, Math.floor(flowStability / 2));
    if (progressBar) progressBar.style.width = displayPct + '%';

    if (displayPct >= 100) {
        gameActive = false;
        completeSession();
    } else {
        requestAnimationFrame(loop);
    }
}

function completeSession() {
    const currentMins = parseInt(localStorage.getItem('recovery_minutes') || 0);
    const currentSessions = parseInt(localStorage.getItem('recovery_sessions') || 0);
    localStorage.setItem('recovery_minutes', currentMins + 3); // Sorting takes longer, credit 3 mins
    localStorage.setItem('recovery_sessions', currentSessions + 1);

    startOverlay.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Flow Stabilized</h2>
        <p style="margin-bottom: 2rem;">Your neuro-rhythm is reset. You have reclaimed 3 minutes.</p>
        <button onclick="location.href='../../index.html'" class="btn btn-primary">Return home</button>
    `;
    startOverlay.style.display = 'flex';
}

startBtn.addEventListener('click', () => {
    RecoveryAudio.init();
    startOverlay.style.display = 'none';
    gameActive = true;
    flowStability = 0;
    initParticles();
    loop();
});
