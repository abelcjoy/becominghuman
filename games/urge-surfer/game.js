const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const startOverlay = document.getElementById('game-start-overlay');
const timerDisplay = document.getElementById('timer');

let width, height;
let gameActive = false;
let timeLeft = 120;
let animationId;

// Physics / Game State
let waveOffset = 0;
let surferY = 0;
let surferVelocity = 0;
const gravity = 0.15;
const lift = -4;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.offsetHeight;
    surferY = height / 2;
}

window.addEventListener('resize', resize);
resize();

function handleInput(e) {
    if (!gameActive) return;
    surferVelocity = lift;
    e.preventDefault();
}

canvas.addEventListener('mousedown', handleInput);
canvas.addEventListener('touchstart', handleInput, { passive: false });

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw Wave
    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.01 + waveOffset) * 50 + height / 2;
        ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fill();

    // Draw the "Crest" Line
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.01 + waveOffset) * 50 + height / 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Surfer Physics
    surferVelocity += gravity;
    surferY += surferVelocity;

    // Constrain Surfer
    if (surferY < 0) {
        surferY = 0;
        surferVelocity = 0;
    }
    if (surferY > height) {
        surferY = height;
        surferVelocity = 0;
    }

    // Draw Surfer
    const targetY = Math.sin(width / 2 * 0.01 + waveOffset) * 50 + height / 2;
    const distanceToWave = Math.abs(surferY - targetY);

    // Surfer Glow based on how close to wave
    ctx.beginPath();
    ctx.arc(width / 2, surferY, 10, 0, Math.PI * 2);
    ctx.fillStyle = distanceToWave < 30 ? '#10b981' : '#f8fafc';
    ctx.shadowBlur = 20;
    ctx.shadowColor = ctx.fillStyle;
    ctx.fill();
    ctx.shadowBlur = 0;

    waveOffset += 0.05;

    if (gameActive) {
        animationId = requestAnimationFrame(draw);
    }
}

function startTimer() {
    const interval = setInterval(() => {
        if (!gameActive) {
            clearInterval(interval);
            return;
        }
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            gameActive = false;
            clearInterval(interval);
            completeSession();
        }
    }, 1000);
}

function completeSession() {
    cancelAnimationFrame(animationId);

    // Save Stats
    const currentMins = parseInt(localStorage.getItem('recovery_minutes') || 0);
    const currentSessions = parseInt(localStorage.getItem('recovery_sessions') || 0);
    localStorage.setItem('recovery_minutes', currentMins + 2); // 120s = 2 mins
    localStorage.setItem('recovery_sessions', currentSessions + 1);

    startOverlay.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Session Complete</h2>
        <p style="margin-bottom: 2rem;">The urge has passed. You have reclaimed 2 minutes of your life.</p>
        <button onclick="location.href='../../index.html'" class="btn btn-primary">Return home</button>
    `;
    startOverlay.style.display = 'flex';
}

startBtn.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    gameActive = true;
    timeLeft = 120;
    timerDisplay.textContent = timeLeft;
    startTimer();
    draw();
});
