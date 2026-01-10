export class SubliminalAxioms {
    constructor() {
        this.words = ["MEMENTO MORI", "TEMPUS FUGIT", "URGENCY", "ACTION", "VOID", "LEGACY", "NOW", "DECAY", "LIFE", "DEATH"];
        this.container = null;
        this.init();
    }

    init() {
        // Create background container
        this.container = document.createElement('div');
        this.container.className = "fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden mix-blend-overlay select-none";
        this.container.innerHTML = `<h1 id="axiom-text" class="text-[15vw] font-black text-white decoration-double tracking-tighter transition-all duration-[3000ms] opacity-0 blur-sm"></h1>`;
        document.body.prepend(this.container); // Prepend to sit behind

        this.textEl = document.getElementById('axiom-text');
        this.currentIndex = 0;

        // Start cycle
        this.cycle();
        setInterval(() => this.cycle(), 10000);
    }

    cycle() {
        if (!this.textEl) return;

        // Fade Out
        this.textEl.style.opacity = '0';
        this.textEl.style.transform = 'scale(0.95) rotate(-2deg)';
        this.textEl.style.filter = 'blur(10px)';

        setTimeout(() => {
            // Change Text
            this.textEl.textContent = this.words[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % this.words.length;

            // Fade In (Subliminal Level)
            this.textEl.style.opacity = '0.03'; // Extremely subtle
            this.textEl.style.transform = 'scale(1) rotate(0deg)';
            this.textEl.style.filter = 'blur(0px)';
        }, 3000); // Slow transition
    }
}
