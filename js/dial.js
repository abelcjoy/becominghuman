/**
 * The Solar Dial (Shadow Engine)
 * Casts realistic, dynamic shadows on primary interface elements based on the
 * actual local time of the user. Simulates the sun's position to create deeper realism.
 * "As the sun moves, so do the shadows of your digital existence."
 */

export class SolarDial {
    constructor() {
        this.targets = document.querySelectorAll('.terminal-box, .stat-card, input, select, button');
        this.active = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

        if (this.active) {
            this.init();
            // Update every minute is enough for shadows
            setInterval(() => this.update(), 60000);
        }
    }

    init() {
        this.update();
    }

    update() {
        // Calculate Sun Position
        // 00:00 = Bottom (Moon)
        // 06:00 = Left (Rise)
        // 12:00 = Top (Noon)
        // 18:00 = Right (Set)

        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        const dayProgress = totalMinutes / 1440; // 0 to 1

        // Angle in radians (0 at top, clockwise)
        // We want shadow to be OPPOSITE the sun.
        // Sun at 12 (Top) -> Shadow at Bottom (Positive Y)

        // Map progress to angle:
        // Noon (0.5) should be shadow down (90deg? No, CSS shadow x y)
        // Sun moves clockwise. Shadow moves clockwise.

        const angle = (dayProgress * Math.PI * 2) - (Math.PI / 2); // Start at -90 (Top)

        // Shadow Length moves with "Height" of sun
        // Shortest at Noon, Longest at Sunrise/Sunset
        // Sine wave peaking at 0.5
        const sunHeight = Math.sin(dayProgress * Math.PI); // 0 at midnight, 1 at noon? No.
        // We need 0 at 6am, 1 at 12pm, 0 at 6pm.

        // Let's simplify:
        // Constant rotation, varying length?
        // Let's keep length subtle and constant for "Neat" design.
        const distance = 8; // px

        const x = Math.cos(angle) * distance * -1; // Invert for shadow
        const y = Math.sin(angle) * distance * -1;

        // Apply to targets
        const shadow = `${x}px ${y}px 25px rgba(0,0,0,0.5)`;

        // We use a CSS variable for performance
        document.body.style.setProperty('--solar-shadow', shadow);
    }
}
