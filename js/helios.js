/**
 * Helios Engine
 * A circadian rhythm lighting system that aligns the interface's biological
 * color temperature with the user's local time.
 * Promotes sleep hygiene at night (Red shift) and alertness in the day (Blue shift).
 */

export class HeliosEngine {
    constructor() {
        this.root = document.documentElement;
        this.init();
        // Check every minute
        setInterval(() => this.update(), 60000);
    }

    init() {
        this.update();
        this.injectStyles();
    }

    injectStyles() {
        // Add transition to make shifts imperceptible
        this.root.style.transition = '--theme-accent 5s ease, --theme-glow 5s ease';
    }

    update() {
        const hour = new Date().getHours();
        let config = this.getPhase(hour);

        // Apply CSS Variables
        this.root.style.setProperty('--theme-accent', config.accent);
        this.root.style.setProperty('--theme-glow', config.glow);
        this.root.style.setProperty('--theme-bg-tint', config.tint);

        // Update Aurora colors if they exist
        // This is handled by CSS vars usually
    }

    getPhase(hour) {
        // Deep Night (11PM - 5AM) - Melatonin Preservation (Red/Amber)
        if (hour >= 23 || hour < 5) {
            return {
                accent: '#ef4444', // Red-500
                glow: 'rgba(239, 68, 68, 0.4)',
                tint: 'rgba(50, 0, 0, 0.2)'
            };
        }
        // Dawn (5AM - 8AM) - Awakening (Cool Teal/Blue)
        if (hour >= 5 && hour < 8) {
            return {
                accent: '#2dd4bf', // Teal-400
                glow: 'rgba(45, 212, 191, 0.4)',
                tint: 'rgba(0, 30, 30, 0.2)'
            };
        }
        // Day (8AM - 5PM) - Focus (Pure White/Cyan)
        if (hour >= 8 && hour < 17) {
            return {
                accent: '#ffffff',
                glow: 'rgba(255, 255, 255, 0.3)',
                tint: 'rgba(255, 255, 255, 0.05)'
            };
        }
        // Dusk (5PM - 8PM) - Reflection (Violet/Purple)
        if (hour >= 17 && hour < 20) {
            return {
                accent: '#c084fc', // Purple-400
                glow: 'rgba(192, 132, 252, 0.4)',
                tint: 'rgba(30, 0, 30, 0.2)'
            };
        }
        // Evening (8PM - 11PM) - Winding Down (Warm Orange)
        if (hour >= 20 && hour < 23) {
            return {
                accent: '#fb923c', // Orange-400
                glow: 'rgba(251, 146, 60, 0.4)',
                tint: 'rgba(40, 20, 0, 0.2)'
            };
        }
    }
}
