/**
 * The Resonant Typography (Living Fonts)
 * "Words that breathe."
 * 
 * Utilizes the Variable Font capability of 'Inter' to animate the
 * font-weight of key numerical data (The Countdown).
 * 
 * Syncs with the CardioPulse (60 BPM).
 * The numbers subtly "thicken" during the systole (beat) and "thin" during diastole (rest).
 * Creates a subconscious link between the data and life itself.
 */

export class ResonantTypography {
    constructor() {
        this.targets = document.querySelectorAll('.stat-value, .time-unit span');
        this.active = true;
        this.baseWeight = 200; // Light/Thin default
        this.pulseAmount = 30; // +30 weight variance

        // Settings
        this.bpm = 60;

        this.init();
    }

    init() {
        if (!this.checkSupport()) return;

        // Re-scan periodically in case of dynamic injection
        setInterval(() => {
            this.targets = document.querySelectorAll('.stat-value, .time-unit span');
        }, 2000);

        this.animate();
    }

    checkSupport() {
        // Technically CSS.supports('font-variation-settings', '"wght" 200')
        return true;
    }

    animate() {
        if (!this.active || window.app?.isLowPowerMode) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const time = Date.now() / 1000;
        const cycle = time % (60 / this.bpm);

        // Heartbeat Curve (Sharp rise, slow fall)
        // 0.0 -> 0.1: Quick Rise
        // 0.1 -> 0.4: Fall
        // 0.4 -> 1.0: Rest

        let multiplier = 0;
        if (cycle < 0.1) {
            multiplier = cycle * 10; // 0 to 1
        } else if (cycle < 0.5) {
            multiplier = 1 - ((cycle - 0.1) * 2.5); // 1 to 0
        }

        multiplier = Math.max(0, multiplier);

        const currentWeight = this.baseWeight + (multiplier * this.pulseAmount); // 200 to 230

        // Apply
        // We use style.setProperty to avoid string parsing overhead if possible,
        // but updating style attribute is fast enough for < 20 elements.
        this.targets.forEach(el => {
            el.style.fontVariationSettings = `'wght' ${currentWeight}`;
        });

        requestAnimationFrame(() => this.animate());
    }
}
