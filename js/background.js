const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 200; // More particles
const connectionDistance = 140; // Longer connections
const mouseDistance = 250; // Larger interaction radius

let mouse = { x: -1000, y: -1000 };

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.15; // Much slower
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.origAlpha = this.alpha;
        this.color = Math.random() > 0.5 ? '#ffffff' : '#fff9eb'; // Morning Cream Dots
    }

    update() {
        // Natural movement
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > width) this.y = 0;

        // Mouse interaction (Repulsion/Attraction)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;

            // Stronger push away
            const repulsionStrength = 2.0;
            this.vx -= forceDirectionX * force * repulsionStrength * 0.1;
            this.vy -= forceDirectionY * force * repulsionStrength * 0.1;

            // Highlight near mouse
            this.alpha = 1;
            this.size = 4; // Temporarily grow
        } else {
            // Return to original state
            if (this.alpha > this.origAlpha) this.alpha -= 0.05;
            if (this.size > 2.5) this.size -= 0.1;
        }

        // Dampen velocity to prevent chaos
        const maxSpeed = 2.0;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animate();
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Touch support
window.addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

init();
