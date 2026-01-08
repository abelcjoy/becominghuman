const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 150; // Balanced for performance and visuals
const connectionDistance = 100;
const mouseDistance = 200;

let mouse = { x: -1000, y: -1000 };

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2; // Slow natural drift
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.origAlpha = this.alpha;
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

            // Gentle push away
            const repulsionStrength = 0.8;
            this.vx -= forceDirectionX * force * repulsionStrength * 0.05;
            this.vy -= forceDirectionY * force * repulsionStrength * 0.05;

            // Brighten near mouse
            this.alpha = Math.min(1, this.origAlpha + force * 0.5);
        } else {
            // Return to original transparency
            if (this.alpha > this.origAlpha) {
                this.alpha -= 0.01;
            }
        }

        // Dampen velocity to prevent chaos
        const maxSpeed = 1.5;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 252, ${this.alpha})`; // Cyan-ish white
        ctx.fill();
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

    // Draw connections first (behind particles)
    // Optional: Only connect near mouse for "flashlight" effect? 
    // Let's connect all neighbors for structure
    ctx.lineWidth = 0.5;

    particles.forEach(p => {
        p.update();
        p.draw();

        // Connect particles near mouse
        /* 
        // This block is optional - enabling it makes a "web" near the mouse. 
        // Disabling for a cleaner "dust" look, or keeping it subtle.
        // Let's keep it very connected but subtle.
        */
    });

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Check mouse distance for this particle
        const dMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);

        // Only form heavy connections near mouse
        if (dMouse < mouseDistance * 1.2) {
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                if (d < connectionDistance) {
                    const opacity = (1 - d / connectionDistance) * (1 - dMouse / (mouseDistance * 1.2)) * 0.5;
                    ctx.strokeStyle = `rgba(103, 232, 249, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
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
