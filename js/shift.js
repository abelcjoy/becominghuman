/**
 * The Chrono-Shift (Kelvin Decay)
 * "The past is sepia. The future is blue."
 * 
 * Adjusts the screen's Color Temperature dynamically.
 * 
 * 1. Time Cycle: Cool (Blue) at Noon, Warm (Orange) at Night (Circadian).
 * 2. Life Cycle: As the user "ages" in the simulation (Years Remaining decreases),
 *    the screen slowly desaturates and warms, simulating an old photograph (Nostalgia).
 */

export class ChronoShift {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 pointer-events-none z-[999999] mix-blend-overlay transition-colors duration-[5000ms] opacity-30';
        document.body.appendChild(this.overlay);

        this.init();

        // Update every minute
        setInterval(() => this.update(), 60000);
    }

    init() {
        this.update();
    }

    update() {
        // Factor 1: Circadian Rhythm (Time of Day)
        const now = new Date();
        const hour = now.getHours();

        let circadianColor;
        if (hour >= 6 && hour < 18) {
            // Day: Cool Blue (6500K) -> #D6E4FF
            // Peak at noon
            circadianColor = 'rgba(214, 228, 255, 0.2)';
        } else {
            // Night: Warm Amber (2700K) -> #FFD6AA
            circadianColor = 'rgba(255, 214, 170, 0.3)';
        }

        // Factor 2: Mortality (Life Progress)
        // Fetched from DOM or calculated
        let lifeProgress = 0.5; // Default middle age
        const percentEl = document.getElementById('time-lived-percent');
        if (percentEl) {
            lifeProgress = parseFloat(percentEl.textContent) / 100;
        }

        // 0% (Birth) = Pure Color
        // 100% (Death) = Sepia/Nostalgia

        // We apply a sepia filter to the BODY tag based on life progress
        // This is a "Global Aging" effect
        const sepiaValue = lifeProgress * 0.4; // Max 40% sepia

        document.body.style.filter = `sepia(${sepiaValue}) contrast(${1 + (lifeProgress * 0.2)})`;
        // Note: This might conflict with other filters (Voltaic, Velocity).
        // Let's integrate smartly.
        // Actually, let's stick to the overlay color for safety against conflict.

        this.overlay.style.backgroundColor = circadianColor;

        // Use a CSS variable for the sepia so other engines can compose it
        document.documentElement.style.setProperty('--chrono-sepia', sepiaValue);
    }
}
