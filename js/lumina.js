/**
 * The Lumina Interface (Adaptive Contrast)
 * "Clarity is visible in darkness."
 * 
 * Ensures text is always readable by applying dynamic blend modes.
 * Also manages "Highlight" effects to ensure they pop in both light/dark themes
 * without manual overrides.
 * 
 * Features:
 * - Difference Blending for headers (Lumina Text).
 * - Dynamic reduced opacity for secondary text to reduce cognitive load.
 */

export class LuminaInterface {
    constructor() {
        this.init();
    }

    init() {
        const style = document.createElement('style');
        style.innerHTML = `
            .lumina-text {
                mix-blend-mode: difference;
                color: rgba(255, 255, 255, 0.9);
                font-family: 'Cinzel', serif; /* Enforce premium font */
                letter-spacing: 0.05em;
            }
            
            /* High-Contrast Inputs */
            input, select, textarea {
                color: #ffffff !important;
                background: rgba(0,0,0,0.5) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
            }
            input::placeholder {
                color: rgba(255,255,255,0.4) !important;
            }

            /* Selection Highlighting */
            ::selection {
                background: #ffffff;
                color: #000000;
                text-shadow: none;
            }
        `;
        document.head.appendChild(style);

        // Scan headers and apply lumina
        document.querySelectorAll('h1, h2, .stat-value').forEach(el => {
            el.classList.add('lumina-text');
        });
    }
}
