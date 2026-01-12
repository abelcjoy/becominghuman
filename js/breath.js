/**
 * The Respiratory Interface (Living Website)
 * Subtly scales the viewing container to match the rhythm of human breathing 
 * (approx 12-15 breaths/min, ~4-5s per cycle).
 * This creates a subliminal connection between the user's physiology and the digital space.
 */

export class RespiratoryEngine {
    constructor() {
        this.body = document.body;
        this.active = true;
        this.init();
    }

    init() {
        // We use CSS animation for smoothness and GPU offloading
        // Defining the keyframes dynamically to ensure it doesn't conflict
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes site-breathe {
                0%, 100% { transform: scale(1.0); }
                50% { transform: scale(1.003); } /* Extremely subtle expansion */
            }
            
            .vital-breath {
                animation: site-breathe 6s ease-in-out infinite;
                transform-origin: center center;
            }
        `;
        document.head.appendChild(style);

        // Wrap content? 
        // Applying to body might cause scroll issues. 
        // Better to apply to the main app container #app
        const app = document.getElementById('app');
        if (app) {
            app.classList.add('vital-breath');
        }

        // Optimization listeners
        window.addEventListener('flux-optimization', () => this.stop());
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.stop();
            else this.start();
        });
    }

    stop() {
        const app = document.getElementById('app');
        if (app) app.style.animationPlayState = 'paused';
    }

    start() {
        const app = document.getElementById('app');
        if (app) app.style.animationPlayState = 'running';
    }
}
