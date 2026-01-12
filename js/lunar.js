/**
 * The Lunar Influence (Celestial Tint)
 * Syncs the website's ambient color tint to the actual phase of the moon.
 * 
 * New Moon: Absolute Darkness.
 * Full Moon: Ethereal Silver/Cyan Glow.
 * Waxing/Waning: Subtle shifts.
 * 
 * "As the tides move, so does clarity."
 */

export class LunarInfluence {
    constructor() {
        this.phase = 0; // 0 to 1
        this.init();
    }

    init() {
        this.phase = this.getMoonPhase();
        this.applyTint();

        // Console lore
        const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
        const phaseIndex = Math.floor(this.phase * 8) % 8;
        console.log(`[Lunar] Phase: ${phases[phaseIndex]} (${this.phase.toFixed(2)})`);
    }

    getMoonPhase() {
        // Standard algorithm
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        if (month < 3) {
            year--;
            month += 12;
        }

        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;

        const cycle = 29.53058867; // Days in lunar month
        const daysSinceNew = jd - 2451549.5;
        const newMoons = daysSinceNew / cycle;
        const phase = newMoons - Math.floor(newMoons);

        return phase; // 0.0 to 1.0 (0=New, 0.5=Full)
    }

    applyTint() {
        // Calculate "Illumination" (0 at New, 1 at Full)
        // distance from 0.5 * 2 => inverted
        // 0 -> 0, 0.5 -> 1, 1.0 -> 0
        const illumination = 1 - (Math.abs(this.phase - 0.5) * 2);

        // Base tint color (Silver/Cyan)
        // New Moon (0): #000000 (Void)
        // Full Moon (1): #B0DDE4 (Moonlight)

        // We apply this to the --theme-bg-tint css variable used in styles.css
        // Opacity scales with illumination

        const opacity = 0.02 + (illumination * 0.08); // Range 0.02 to 0.10
        const color = `rgba(176, 221, 228, ${opacity})`; // Cool silver-blue

        document.documentElement.style.setProperty('--theme-bg-tint', color);

        // Also subtle text shadow glow on headers if full moon
        if (illumination > 0.8) {
            document.documentElement.style.setProperty('--moon-glow', '0 0 20px rgba(176, 221, 228, 0.2)');
        } else {
            document.documentElement.style.setProperty('--moon-glow', 'none');
        }
    }
}
