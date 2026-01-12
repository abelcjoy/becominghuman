/**
 * The Taptic Engine (Haptic Symbiosis)
 * "Feel the digital pulse."
 * 
 * Uses the Vibration API to provide subtle haptic feedback on mobile devices.
 * - Tiny click (5ms) on interaction.
 * - Medium pulse (10ms) on toggle.
 * - Double pulse (10ms, 50ms, 10ms) on success.
 * 
 * Enhances the "Premium App-like" feel without being an app.
 */

export class TapticEngine {
    constructor() {
        this.supported = 'vibrate' in navigator;
        this.init();
    }

    init() {
        if (!this.supported) return;

        // Attach to all interactive elements
        const targets = document.querySelectorAll('button, input, select, .sim-interact');

        targets.forEach(el => {
            el.addEventListener('click', () => this.pulse('light'));
        });

        // Listen for global events
        document.addEventListener('success', () => this.pulse('success'));
        document.addEventListener('warning', () => this.pulse('medium'));
    }

    pulse(type) {
        if (!this.supported || window.app?.isLowPowerMode) return;

        try {
            switch (type) {
                case 'light':
                    navigator.vibrate(5); // Micro-tick
                    break;
                case 'medium':
                    navigator.vibrate(15);
                    break;
                case 'heavy':
                    navigator.vibrate(30);
                    break;
                case 'success':
                    navigator.vibrate([10, 30, 10]); // Da-da
                    break;
                case 'error':
                    navigator.vibrate([50, 50, 50]); // Buzz-buzz
                    break;
            }
        } catch (e) {
            // Some browsers block vibration without user gesture history
        }
    }
}
