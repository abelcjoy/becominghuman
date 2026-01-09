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
        this.vx = (Math.random() - 0.5) * 0.5; // Faster movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2.5 + 1; // Bigger particles
        this.alpha = Math.random() * 0.5 + 0.3; // Higher base opacity
        this.origAlpha = this.alpha;
        this.color = Math.random() > 0.5 ? '#fbbf24' : '#ffffff'; // Amber Gold and White
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

    // Draw connections
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // High contrast connections
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Optimization: Only check nearby particles? No, N^2 is fine for <200
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);

            if (d < connectionDistance) {
                // Brighter lines
                const opacity = (1 - d / connectionDistance) * 0.8;
                ctx.strokeStyle = `rgba(214, 211, 209, ${opacity})`; // Warm Stone lines
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Connect to mouse extremely strongly
        const dMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
        if (dMouse < mouseDistance) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - dMouse / mouseDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }

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
