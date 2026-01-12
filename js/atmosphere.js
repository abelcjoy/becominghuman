/**
 * The Atmospheric Engine (Environmental Texture)
 * Simulates the scattering of light through the digital atmosphere.
 * Adjusts the "Glassmorphism" blur intensity based on the time of day.
 * 
 * Dawn/Dusk: High scattering (Hazy/Dreamy) -> High Blur
 * Noon: Direct light (Crisp/Clear) -> Low Blur
 * Night: Vacuum (Sharp) -> Medium Blur
 */

export class AtmosphericEngine {
    constructor() {
        this.active = true;
        this.init();

        // Update every 10 minutes
        setInterval(() => this.update(), 600000);
    }

    init() {
        this.update();
    }

    update() {
        if (!this.active) return;

        const now = new Date();
        const hour = now.getHours() + (now.getMinutes() / 60);

        // Blur Curve (px)
        let blur = 10; // Default

        if (hour >= 5 && hour < 9) {
            // Dawn (Foggy/Hazy)
            blur = 15 + ((9 - hour) * 2);
        } else if (hour >= 9 && hour < 17) {
            // Day (Crisp)
            // Peak clarity at noon (12)
            const distFromNoon = Math.abs(12 - hour);
            blur = 5 + (distFromNoon * 1);
        } else if (hour >= 17 && hour < 21) {
            // Dusk (Dreamy)
            blur = 15 + ((hour - 17) * 2);
        } else {
            // Night (Clear but dark)
            blur = 8;
        }

        // Apply to CSS Variable
        document.documentElement.style.setProperty('--glass-blur', `${blur}px`);

        // Also subtle opacity shift
        const opacity = Math.max(0.03, Math.min(0.1, blur / 200));
        document.documentElement.style.setProperty('--glass-opacity', opacity);
    }
}
