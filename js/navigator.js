/**
 * The Chronos Navigator
 * A specialized cursor attachment that displays the pulse of time (milliseconds)
 * orbiting the user's action point.
 * "Time is in your hand."
 */

export class ChronosNavigator {
    constructor() {
        // Create the ring
        this.ring = document.createElement('div');
        this.ring.className = 'fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 mix-blend-difference hidden md:block';

        // Create the label
        this.label = document.createElement('div');
        this.label.className = 'fixed top-0 left-0 text-[8px] font-mono text-white/70 pointer-events-none z-[9999] hidden md:block tracking-widest';

        document.body.appendChild(this.ring);
        document.body.appendChild(this.label);

        // State
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.currentX = this.mouseX;
        this.currentY = this.mouseY;

        // Bind events
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hide cursor on leaving window
        document.addEventListener('mouseout', () => {
            this.ring.style.opacity = '0';
            this.label.style.opacity = '0';
        });
        document.addEventListener('mouseover', () => {
            this.ring.style.opacity = '1';
            this.label.style.opacity = '1';
        });

        this.animate();
    }

    animate() {
        // Linear interpolation for smooth following
        const lerp = (start, end, factor) => start + (end - start) * factor;

        this.currentX = lerp(this.currentX, this.mouseX, 0.15); // Smooth factor
        this.currentY = lerp(this.currentY, this.mouseY, 0.15);

        // Position Ring (Center)
        this.ring.style.transform = `translate(${this.currentX - 16}px, ${this.currentY - 16}px)`;

        // Position Label (Offset)
        this.label.style.transform = `translate(${this.currentX + 20}px, ${this.currentY}px)`;

        // Update Time Data
        const now = new Date();
        const ms = now.getMilliseconds().toString().padStart(3, '0');
        this.label.textContent = `.${ms}`;

        // Dynamic Ring scaling based on speed/distance
        const dist = Math.hypot(this.mouseX - this.currentX, this.mouseY - this.currentY);
        const scale = 1 + (dist * 0.02);
        this.ring.style.borderWidth = `${Math.max(1, 1 / scale)}px`;
        // this.ring.style.transform += ` scale(${scale})`; // Already setting transform above, complex to merge

        requestAnimationFrame(() => this.animate());
    }
}
