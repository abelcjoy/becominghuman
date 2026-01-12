/**
 * The Aperture System (Focus Dynamics)
 * "Focus is the exclusion of the irrelevant."
 * 
 * When the user interacts with a specific high-value element (Cards, Inputs),
 * the surrounding interface dims slightly to direct attention.
 * Mimics the behavior of the human eye's foveal vision vs peripheral blur.
 */

export class ApertureSystem {
    constructor() {
        this.foci = document.querySelectorAll('.stat-card, .terminal-box, .glass-panel, form');
        this.overlay = null;
        this.active = false;

        this.init();
    }

    init() {
        this.createOverlay();

        this.foci.forEach(el => {
            // Hover (Desktop)
            el.addEventListener('mouseenter', () => this.focus(el));
            el.addEventListener('mouseleave', () => this.blur());

            // Focus (Input)
            el.addEventListener('focusin', () => this.focus(el));
            el.addEventListener('focusout', () => this.blur());
        });
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 bg-black/40 pointer-events-none opacity-0 transition-opacity duration-500 z-[40]'; // Z-Index below UI
        // We need to make sure the Focused element pops ABOVE this overlay.
        // This requires Z-index management.
        // A better approach is to use a large box-shadow on the element itself?
        // No, that's messy.

        // Let's use the overlay, but applying a class to the focused element to raise it.
        document.body.appendChild(this.overlay);
    }

    focus(el) {
        if (window.app?.isLowPowerMode) return;

        this.active = true;
        this.overlay.classList.remove('opacity-0');

        // Elevate element
        el.classList.add('aperture-raised');

        // Add style if not present
        if (!document.getElementById('aperture-style')) {
            const style = document.createElement('style');
            style.id = 'aperture-style';
            style.innerHTML = `
                .aperture-raised {
                    z-index: 50 !important;
                    position: relative;
                    /* Glow */
                    box-shadow: 0 0 50px rgba(0,0,0,0.5) !important;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    transform: scale(1.02);
                }
            `;
            document.head.appendChild(style);
        }
    }

    blur() {
        this.active = false;
        this.overlay.classList.add('opacity-0');

        // Reset all
        document.querySelectorAll('.aperture-raised').forEach(el => {
            el.classList.remove('aperture-raised');
            el.style.transform = '';
        });
    }
}
