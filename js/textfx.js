/**
 * Hyper-Kinetic Typography
 * Decrypts text/numbers by cycling through random characters.
 * Adds a "Cyberpunk/Simulation" feel to the data.
 */

export class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    // Scramble in place without changing final value (for hover effects)
    scramble() {
        if (this.isScrambling) return;
        this.isScrambling = true;

        const originalText = this.el.innerText;
        this.queue = [];

        for (let i = 0; i < originalText.length; i++) {
            const char = originalText[i];
            if (char === ' ' || char === ':' || char === ',') {
                this.queue.push({ from: char, to: char, start: 0, end: 0 }); // Skip formatting chars
            } else {
                const start = 0;
                const end = 10 + Math.floor(Math.random() * 10);
                this.queue.push({ from: char, to: char, start, end, char });
            }
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    output += this.chars[Math.floor(Math.random() * this.chars.length)];
                } else {
                    output += to;
                }
            } else {
                output += from;
            }
        }

        this.el.innerText = output;

        if (complete === this.queue.length) {
            this.resolve && this.resolve();
            this.isScrambling = false;
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}
