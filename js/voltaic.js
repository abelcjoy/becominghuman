/**
 * The Voltaic Interface (Bio-Digital Symbiosis)
 * connects the user's physical device energy (Battery) to the 
 * simulation's visual vitality.
 * 
 * 100% Battery = Maximum Brightness & Bloom
 * < 20% Battery = Dim, Red-Shifted, "Power Saving" aesthetics.
 * Charging = Rhythmic pulsing of the energy signals.
 * 
 * "Your time is finite. So is your power."
 */

export class VoltaicInterface {
    constructor() {
        this.battery = null;
        this.active = false;

        // Check API Support
        if ('getBattery' in navigator) {
            this.init();
        }
    }

    async init() {
        try {
            this.battery = await navigator.getBattery();
            this.active = true;

            // Initial sync
            this.update();

            // Listeners
            this.battery.addEventListener('levelchange', () => this.update());
            this.battery.addEventListener('chargingchange', () => this.update());

        } catch (e) {
            console.warn('[Voltaic] Battery API not accessible.');
        }
    }

    update() {
        if (!this.active || !this.battery) return;

        const level = this.battery.level; // 0.0 to 1.0
        const isCharging = this.battery.charging;

        // Visual Mapping
        // Level controls global saturation/opacity of "Extras"
        // We use CSS variables to control the theme intensity

        // Saturation: 0.2 (at 0%) to 1.0 (at 100%)
        const saturation = 0.2 + (level * 0.8);

        // Brightness: 0.5 (at 0%) to 1.0 (at 100%)
        const brightness = 0.5 + (level * 0.5);

        const root = document.documentElement;

        // Update Theme vars
        root.style.setProperty('--voltaic-saturation', saturation);
        root.style.setProperty('--voltaic-brightness', brightness);

        // Handle "Critical State" (< 20%)
        if (level < 0.20 && !isCharging) {
            document.body.classList.add('voltaic-critical');
            if (window.toast && !this.warned) {
                toast.info('Energy Low. Simulation fading...');
                this.warned = true;
            }
        } else {
            document.body.classList.remove('voltaic-critical');
            this.warned = false; // Reset warning capability if they charge up
        }

        // Handle Charging Pulse
        if (isCharging) {
            document.body.classList.add('voltaic-charging');
        } else {
            document.body.classList.remove('voltaic-charging');
        }
    }
}
