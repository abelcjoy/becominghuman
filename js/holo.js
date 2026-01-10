/**
 * Holographic 3D Tilt Effect
 * Applies a CSS perspective transform based on mouse position
 * to create a premium, tangible glass-slab feel.
 */

export class HolographicTilt {
    constructor(elementOrId) {
        this.element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
        if (!this.element) return;

        this.maxTilt = 5; // Degrees
        this.perspective = 1000; // Pixels

        // Setup initial 3D styles
        this.element.style.transformStyle = "preserve-3d";
        this.element.style.transition = "transform 0.1s ease-out"; // Smooth but responsive

        // Add a sheen layer if not present
        if (!this.element.querySelector('.holo-sheen')) {
            const sheen = document.createElement('div');
            sheen.className = 'holo-sheen absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-xl z-20 mix-blend-overlay';
            sheen.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)';
            this.element.appendChild(sheen);
            this.sheen = sheen;
        } else {
            this.sheen = this.element.querySelector('.holo-sheen');
        }

        // Bind events
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        this.element.addEventListener('mouseenter', () => this.handleEnter());
        this.element.addEventListener('mouseleave', () => this.handleLeave());
    }

    handleMove(e) {
        if (!this.isActive) return;
        if (window.innerWidth < 768) return; // Disable on mobile to prevent scroll conflict

        const rect = this.element.getBoundingClientRect();

        // Calculate center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Mouse position relative to center (0 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);

        // Clamp
        const clampX = Math.max(-1, Math.min(1, mouseX));
        const clampY = Math.max(-1, Math.min(1, mouseY));

        // Tilt calculation (Inverse mouse movement)
        const rotateX = clampY * -this.maxTilt;
        const rotateY = clampX * this.maxTilt;

        // Apply Transform
        this.element.style.transform = `
            perspective(${this.perspective}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale3d(1.01, 1.01, 1.01)
        `;

        // Update Sheen Position
        if (this.sheen) {
            const sheenX = 50 + (clampX * 20);
            const sheenY = 50 + (clampY * 20);
            this.sheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
        }
    }

    handleEnter() {
        this.isActive = true;
        if (this.sheen) this.sheen.style.opacity = '1';
    }

    handleLeave() {
        this.isActive = false;
        // Reset
        this.element.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        if (this.sheen) this.sheen.style.opacity = '0';
    }
}
