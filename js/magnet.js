/**
 * The Magnetic Core (Tactile Interface)
 * "Attraction is the precursor to action."
 * 
 * Applies a subtle gravitational field to interactive elements.
 * When the cursor draws near, the element gently moves *towards* the cursor,
 * creating a feeling of "weight" and magnetic connection.
 * Increases click confidence (Fitts's Law enhancement).
 */

export class MagneticCore {
    constructor() {
        this.targets = document.querySelectorAll('button, .glass-panel, .stat-card, input, select');
        this.isDesktop = window.matchMedia('(pointer: fine)').matches;

        if (this.isDesktop) {
            this.init();
        }
    }

    init() {
        this.targets.forEach(el => {
            el.addEventListener('mousemove', (e) => this.magnetize(e, el));
            el.addEventListener('mouseleave', () => this.reset(el));
        });
    }

    magnetize(e, el) {
        const rect = el.getBoundingClientRect();

        // Calculate center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Distance from cursor to center
        const distY = e.clientY - centerY;
        const distX = e.clientX - centerX;

        // Strength of the magnet (Low for subtle premium feel)
        // Divide by 5 or 10.
        const pull = 8;

        const x = distX / pull;
        const y = distY / pull;

        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.transition = 'transform 0.1s ease-out';
    }

    reset(el) {
        el.style.transform = 'translate(0px, 0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'; // Elastic bounce back
    }
}
