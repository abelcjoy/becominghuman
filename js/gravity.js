/**
 * Gravity Button Effect
 * Buttons that magnetically pull the cursor towards them when nearby.
 * Adds a premium, fluid feel to interactions.
 */

export class GravityButtons {
    constructor() {
        this.buttons = document.querySelectorAll('button');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.magnetize(e, btn));
            btn.addEventListener('mouseleave', () => this.reset(btn));
        });
    }

    magnetize(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Pull strength
        const strength = 0.3;

        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }

    reset(btn) {
        btn.style.transform = `translate(0px, 0px)`;
        // Add smooth return
        btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
            btn.style.transition = ''; // clear transition to allow instant movement on next hover
        }, 300);
    }
}
