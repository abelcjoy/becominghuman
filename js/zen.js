/**
 * Zen Breathing Guide
 * A minimalist, always-available breathing guide that sits quietly in the corner.
 * Pulsates rhythmically (4-7-8 technique) to ground the user subconsciously.
 */

export class ZenBreathing {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'zen-breathing';
        this.container.className = 'fixed bottom-8 left-8 w-12 h-12 z-[100] cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-500';
        this.container.title = 'Sync your breath';

        // The breathing circle
        this.circle = document.createElement('div');
        this.circle.className = 'w-full h-full border border-white/30 rounded-full bg-white/5 backdrop-blur-sm';

        // Inner core
        this.core = document.createElement('div');
        this.core.className = 'absolute top-1/2 left-1/2 w-4 h-4 bg-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300';

        this.container.appendChild(this.circle);
        this.container.appendChild(this.core);
        document.body.appendChild(this.container);

        // Styles
        if (!document.getElementById('zen-style')) {
            const style = document.createElement('style');
            style.id = 'zen-style';
            style.innerHTML = `
                @keyframes zenBreathe {
                    0%, 100% { transform: scale(1); opacity: 0.3; border-color: rgba(255,255,255,0.2); }
                    40% { transform: scale(1.5); opacity: 0.8; border-color: rgba(255,255,255,0.6); } /* Inhale (4s) */
                    50% { transform: scale(1.5); opacity: 0.8; border-color: rgba(255,255,255,0.6); } /* Hold (1s - shortened for visual flow) */
                    90% { transform: scale(1); opacity: 0.3; border-color: rgba(255,255,255,0.2); } /* Exhale */
                }
                .zen-active {
                    animation: zenBreathe 10s infinite ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }

        this.start();

        // Interactivity
        this.container.addEventListener('click', () => {
            // Visual feedback for interaction
            this.core.style.transform = 'translate(-50%, -50%) scale(2)';
            setTimeout(() => {
                this.core.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
    }

    start() {
        this.circle.classList.add('zen-active');
    }
}
