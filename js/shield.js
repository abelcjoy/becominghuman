/**
 * The Focus Shield (Tunnel Vision)
 * Automatically dims the interface when the user stops moving the mouse for >10s.
 * Spotlights the central countdown.
 * "Focus on the time you have left."
 */

export class FocusShield {
    constructor() {
        this.timeout = null;
        this.active = false;

        // CSS Transition helper
        const style = document.createElement('style');
        style.innerHTML = `
            .focus-shield-dim {
                opacity: 0.1 !important;
                filter: blur(2px) grayscale(100%);
                transition: opacity 2s ease, filter 2s ease;
            }
            .focus-shield-highlight {
                z-index: 50;
                transform: scale(1.05); /* Very subtle pop */
                text-shadow: 0 0 30px rgba(255,255,255,0.2);
                transition: transform 2s ease, text-shadow 2s ease;
            }
        `;
        document.head.appendChild(style);

        this.init();
    }

    init() {
        // Reset timer on any activity
        ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach(evt =>
            document.addEventListener(evt, () => this.reset())
        );

        this.reset();
    }

    reset() {
        if (this.active) this.deactivate();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.activate(), 10000); // 10 seconds idle
    }

    activate() {
        this.active = true;

        // Elements to DIM (Noise)
        const dims = document.querySelectorAll('header, footer, nav, .codex-content, #sim-hub, #life-grid-section, .unit-card');
        dims.forEach(el => el.classList.add('focus-shield-dim'));

        // Elements to HIGHLIGHT (Signal)
        const main = document.querySelector('#time-display');
        if (main) main.classList.add('focus-shield-highlight');

        // Optional: Hide cursor
        document.body.style.cursor = 'none';
    }

    deactivate() {
        this.active = false;

        // Restore
        const dims = document.querySelectorAll('.focus-shield-dim');
        dims.forEach(el => el.classList.remove('focus-shield-dim'));

        const main = document.querySelector('#time-display');
        if (main) main.classList.remove('focus-shield-highlight');

        document.body.style.cursor = 'default';
    }
}
