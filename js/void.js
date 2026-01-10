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

        if (this.active) {
            document.body.classList.add('void-state');
            this.btn.textContent = "ESC TO EXIT";
            if (window.toast) toast.info("Entering the Void. Press ESC to return.", 2000);
        } else {
            document.body.classList.remove('void-state');
            this.btn.textContent = "⬛ Void";
        }
    }
}
