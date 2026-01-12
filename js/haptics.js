/**
 * Tactile Engine (Haptics)
 * Provides physical vibration feedback for interactions on supported mobile devices.
 * "Feel the time passing."
 */

export class TactileEngine {
    constructor() {
        this.enabled = window.navigator && window.navigator.vibrate;
        this.init();
    }

    init() {
        if (!this.enabled) return;

        // Attach to all interactive elements
        const interactables = document.querySelectorAll('button, input[type="range"], a, .terminal-box');

        interactables.forEach(el => {
            el.addEventListener('touchstart', () => this.pulse('soft'));
        });

        // Special heavy feedback for critical actions
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('touchstart', () => this.pulse('heavy'));
        }
    }

    pulse(type) {
        if (!this.enabled) return;

        switch (type) {
            case 'tick':
                window.navigator.vibrate(5); // Micro-tick for seconds (if enabled)
                break;
            case 'soft':
                window.navigator.vibrate(10); // Light tap for UI
                break;
            case 'medium':
                window.navigator.vibrate(20);
                break;
            case 'heavy':
                window.navigator.vibrate([30, 50, 30]); // Thud-thud
                break;
            case 'success':
                window.navigator.vibrate([10, 30, 10, 30]);
                break;
        }
    }

    // Can be called by the Pulse (One second tick)
    tick() {
        // Only if user enables "Physical Time" (optional, kept off by default to avoid annoyance)
        // this.pulse('tick'); 
    }
}
