/**
 * The Monolith (2001: A Space Odyssey Homage)
 * A mysterious interactive object that appears when the user is idle or upon key-press.
 * Touching it triggers deep philosophical auditory hallucinations (quotes).
 */

export class Monolith {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.active = false;
        this.idleTimer = null;

        this.element = document.createElement('div');
        this.element.id = 'monolith';
        this.element.className = 'fixed top-1/2 left-1/2 w-[60px] h-[160px] bg-black border border-stone-800 shadow-[0_0_50px_rgba(0,0,0,1)] z-[500] opacity-0 pointer-events-none transition-all duration-[3000ms] ease-in-out transform -translate-x-1/2 -translate-y-1/2 scale-0';
        document.body.appendChild(this.element);

        this.quotes = [
            "We are made of starstuff.",
            "Time is the substance I am made of.",
            "The universe is not outside of you.",
            "Wake up.",
            "This is just a ride.",
            "Entropy is the price of structure."
        ];

        this.init();
    }

    init() {
        // Monolith Styling
        // Aspect ratio 1:4:9 (The squares of the first 3 integers)
        this.element.style.width = '40px';
        this.element.style.height = '360px';
        this.element.style.boxShadow = "0 0 100px rgba(0,0,0, 0.9)";

        // Idle Detection
        document.addEventListener('mousemove', () => this.resetIdle());
        document.addEventListener('click', () => this.resetIdle());
        document.addEventListener('keydown', () => this.resetIdle());

        this.resetIdle();
    }

    resetIdle() {
        if (this.active) this.despawn();
        clearTimeout(this.idleTimer);
        // Appear after 30 seconds of inactivity to mesmerize the user
        this.idleTimer = setTimeout(() => this.spawn(), 30000);
    }

    spawn() {
        if (this.active) return;
        this.active = true;

        this.element.classList.remove('opacity-0', 'scale-0', 'pointer-events-none');
        this.element.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');

        // Add specific event for the monolith
        this.element.onclick = (e) => {
            e.stopPropagation();
            this.interact();
        };

        // Ambient sound
        if (this.soundManager) this.soundManager.play('binaural'); // Reusing binaural or add a hum later
    }

    despawn() {
        this.active = false;
        this.element.classList.add('opacity-0', 'scale-0', 'pointer-events-none');
        this.element.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    }

    interact() {
        // Flash of insight
        const flash = document.createElement('div');
        flash.className = 'fixed inset-0 bg-white z-[600] transition-opacity duration-1000 pointer-events-none';
        document.body.appendChild(flash);

        // Play sound
        if (this.soundManager) this.soundManager.play('tick');

        // Show Text
        const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        const text = document.createElement('div');
        text.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-black text-2xl md:text-5xl uppercase tracking-[0.5em] z-[610] text-center opacity-0 transition-opacity duration-1000';
        text.innerText = quote;
        document.body.appendChild(text);

        // Animate
        requestAnimationFrame(() => {
            flash.style.opacity = '0';
            text.style.opacity = '1';
        });

        setTimeout(() => {
            text.style.opacity = '0';
            setTimeout(() => {
                if (flash.parentNode) flash.parentNode.removeChild(flash);
                if (text.parentNode) text.parentNode.removeChild(text);
                this.despawn();
            }, 1000);
        }, 4000);
    }
}
