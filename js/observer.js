/**
 * The Schrodinger State (Observer Effect)
 * "The website only exists when you observe it."
 * 1. Pauses all heavy rendering when the tab is hidden (Battery/CPU Saver).
 * 2. Morph the title to communicate with the user's focus.
 * 3. Adds a "Welcome Back" micro-interaction.
 */

export class SchrodingerState {
    constructor() {
        this.originalTitle = document.title;
        this.hiddenTitle = "Time is slipping away...";
        this.titles = [
            "Are you there?",
            "The clock ticks...",
            "Existence pauses...",
            "Come back to reality.",
            "I'm waiting."
        ];

        this.init();
    }

    init() {
        document.addEventListener('visibilitychange', () => this.handleVisibility());
    }

    handleVisibility() {
        if (document.hidden) {
            // User left: Save resources & Change Title
            this.toggleEngines(false);

            // Random eerie title
            const random = this.titles[Math.floor(Math.random() * this.titles.length)];
            document.title = random;

        } else {
            // User returned: Restore
            document.title = this.originalTitle;
            this.toggleEngines(true);

            // Subtle flash to acknowledge "collapsing wave function"
            // We can emit a custom event or just do a quick effect
            document.body.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                document.body.style.transition = 'filter 0.5s ease-out';
                document.body.style.filter = 'brightness(1)';
                setTimeout(() => { document.body.style.transition = ''; }, 500);
            }, 50);
        }
    }

    toggleEngines(active) {
        // We set a global flag that animation loops check
        window.isPageVisible = active;

        // Also pause/resume audio context (Ambience) if active
        // Only if it was already playing
        // (Handled internally by AmbienceEngine ideally, but we can signal)
    }
}
