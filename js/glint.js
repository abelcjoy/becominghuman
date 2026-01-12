/**
 * The Glint System (Holographic Materiality)
 * "Every surface reflects the observer."
 * 
 * Adds a physical light reflection to glass surfaces.
 * The "shimmer" moves based on the user's mouse position or device tilt.
 * Makes digital cards feel like physical glass objects.
 */

export class GlintSystem {
    constructor() {
        this.cards = document.querySelectorAll('.terminal-box, .stat-card, .glass-panel, button.sim-btn');
        this.init();
    }

    init() {
        if (!window.matchMedia('(pointer: fine)').matches) {
            // Mobile: Use Gyro or simplified auto-sweep?
            // Let's use simplified auto-sweep for "Novelty" without demanding sensors perm.
            this.cards.forEach(card => card.classList.add('glint-auto'));
            return;
        }

        document.addEventListener('mousemove', (e) => this.update(e));

        // Add CSS dynamic style
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .glint-effect {
                position: relative;
                overflow: hidden !important; /* Contain the light */
            }
            .glint-effect::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(
                    800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                    rgba(255, 255, 255, 0.06), 
                    transparent 40%
                );
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
                z-index: 2;
                mix-blend-mode: overlay;
            }
            .glint-effect:hover::after {
                opacity: 1;
            }
            
            /* Mobile Auto Sweep */
            @keyframes glint-sweep {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            .glint-auto {
                position: relative;
            }
            .glint-auto::after {
                 content: '';
                 position: absolute;
                 top: 0; left: 0; right: 0; bottom: 0;
                 background: linear-gradient(
                    120deg,
                    transparent 30%,
                    rgba(255,255,255,0.05) 50%,
                    transparent 70%
                 );
                 background-size: 200% 100%;
                 animation: glint-sweep 6s infinite linear;
                 pointer-events: none;
            }
        `;
        document.head.appendChild(style);

        this.cards.forEach(card => card.classList.add('glint-effect'));
    }

    update(e) {
        this.cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }
}
