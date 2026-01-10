/**
 * Reality Glitch System
 * Randomly applies chromatic aberration and displacement to UI elements.
 * Simulates the instability of the perceived simulation.
 */

export class RealityGlitch {
    constructor() {
        this.elements = [
            '#c-years', '#c-days', '#c-hours', '#c-minutes', '#c-seconds',
            'h1', '#soul-rank', '#attention-equity'
        ];
        this.minInterval = 10000; // 10 seconds
        this.maxInterval = 30000; // 30 seconds
        this.glitchDuration = 200; // ms

        this.scheduleNextGlitch();
    }

    scheduleNextGlitch() {
        const delay = Math.random() * (this.maxInterval - this.minInterval) + this.minInterval;
        setTimeout(() => this.trigger(), delay);
    }

    trigger() {
        // Select random element
        const selector = this.elements[Math.floor(Math.random() * this.elements.length)];
        const el = document.querySelector(selector);

        if (el) {
            el.classList.add('reality-glitch');

            // Play glitch sound if quiet
            // if (window.app && window.app.soundManager) window.app.soundManager.play('click'); 

            setTimeout(() => {
                el.classList.remove('reality-glitch');
                this.scheduleNextGlitch();
            }, this.glitchDuration);
        } else {
            this.scheduleNextGlitch();
        }
    }
}
