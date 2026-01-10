export class VoidMode {
    constructor() {
        this.active = false;
        this.btn = document.getElementById('void-mode-btn');
        this.init();
    }

    init() {
        if (!this.btn) return;
        this.btn.addEventListener('click', () => this.toggle());

        // Escape key to exit
        document.addEventListener('keydown', (e) => {
            if (this.active && e.key === 'Escape') this.toggle();
        });
    }

    toggle() {
        this.active = !this.active;

        // Explicit list of elements to hide/show
        const targets = [
            'header',
            'soul-rank',
            'daily-reflection',
            'via-negativa-section',
            'sim-hub',
            'projection-results',
            'create-wallpaper-btn',
            'life-progress-chart',
            'entropy-canvas',
            'echo-canvas',
            'mirror-btn',
            'focus-btn',
            'protocol-modal-btn' // Assuming protocol button has an ID or we need to add one. Let's use class selector logic instead if ID missing? The list supports IDs or selectors.
        ];

        // Use a more robust selector for the units grid (it's the second grid usually)
        // Or better: rely on the one that DOES NOT have animate-breath
        const grids = document.querySelectorAll('.grid');

        if (this.active) {
            document.body.classList.add('void-state');
            this.btn.textContent = "ESC TO EXIT";

            // Hide Targets
            targets.forEach(id => {
                const el = document.getElementById(id) || document.querySelector(id);
                if (el) el.classList.add('void-hidden');
            });

            // Hide non-breathing grids (Perspective Units)
            grids.forEach(g => {
                if (!g.classList.contains('animate-breath')) g.classList.add('void-hidden');
            });

            if (window.toast) toast.info("Entering the Void. Press ESC to return.", 2000);
        } else {
            document.body.classList.remove('void-state');
            this.btn.textContent = "⬛ Void";

            // Show Targets
            targets.forEach(id => {
                const el = document.getElementById(id) || document.querySelector(id);
                if (el) el.classList.remove('void-hidden');
            });

            grids.forEach(g => g.classList.remove('void-hidden'));
        }
    }
}
