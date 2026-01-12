/**
 * The Velocity Governor (Mindfulness Enforcer)
 * "Speed is the enemy of clarity."
 * 
 * Monitors the user's scroll velocity.
 * If they scroll frantically (doom-scrolling behavior), the interface
 * adds friction and blurs slightly to discourage haste.
 * Encourages a measured, stoic pace of consumption.
 */

export class VelocityGovernor {
    constructor() {
        this.lastScrollY = window.scrollY;
        this.lastTime = Date.now();
        this.velocity = 0;
        this.threshold = 100; // px per frame~ish

        this.indicator = this.createIndicator();
        this.active = false;

        window.addEventListener('scroll', () => this.checkVelocity(), { passive: true });
    }

    createIndicator() {
        const el = document.createElement('div');
        el.className = 'fixed right-4 top-1/2 -translate-y-1/2 bg-red-500/10 backdrop-blur-md border-r-2 border-red-500 text-red-400 text-[10px] uppercase writing-vertical py-4 px-1 rounded-l opacity-0 transition-opacity duration-300 pointer-events-none z-[50]';
        el.style.writingMode = 'vertical-rl';
        el.innerText = 'DECELERATE';
        document.body.appendChild(el);
        return el;
    }

    checkVelocity() {
        const now = Date.now();
        const currentY = window.scrollY;
        const dt = now - this.lastTime;

        if (dt > 10) { // Throttle slightly
            const dy = Math.abs(currentY - this.lastScrollY);
            const v = (dy / dt) * 1000; // px per second

            // Normalize for frame
            this.velocity = v;

            if (this.velocity > 2500) { // High speed (~2.5 full screens per sec)
                this.activate();
            } else {
                this.deactivate();
            }

            this.lastScrollY = currentY;
            this.lastTime = now;
        }
    }

    activate() {
        if (this.active) return;
        this.active = true;

        // Visuals
        document.body.style.filter = 'blur(2px) grayscale(0.5)';
        document.body.style.transition = 'filter 0.2s ease';

        this.indicator.classList.remove('opacity-0');

        if (window.toast && Math.random() > 0.95) {
            toast.info("Observation requires patience.");
        }
    }

    deactivate() {
        if (!this.active) return;

        // Debounce deactivation to prevent flickering
        clearTimeout(this.coolDown);
        this.coolDown = setTimeout(() => {
            this.active = false;

            document.body.style.filter = 'none'; // Will trigger app.js filter reset if needed? 
            // Better to remove style property so we don't override other filters (Voltaic, Atmosphere)
            document.body.style.removeProperty('filter');

            this.indicator.classList.add('opacity-0');
        }, 300);
    }
}
