/**
 * Scramble Text Effect
 * Decodes text from random characters to the final message.
 * Matrix-like entry animation.
 */

export class TextScrambler {
    constructor() {
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.targets = document.querySelectorAll('.scramble-target');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.scramble(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.targets.forEach(el => observer.observe(el));
    }

    scramble(el) {
        const oldText = el.innerText;
        const length = oldText.length;
        let frame = 0;

        const queue = [];
        for (let i = 0; i < length; i++) {
            const char = oldText[i];
            queue.push({
                from: this.randomChar(),
                to: char,
                start: Math.floor(Math.random() * 40),
                end: Math.floor(Math.random() * 40) + 40
            });
        }

        if (el.raf) cancelAnimationFrame(el.raf);

        const update = () => {
            let output = '';
            let complete = 0;

            for (let i = 0; i < length; i++) {
                const { from, to, start, end } = queue[i];
                let char = from;

                if (frame >= end) {
                    complete++;
                    char = to;
                } else if (frame >= start) {
                    char = this.randomChar();
                    if (Math.random() < 0.28) char = to;
                }

                output += `<span class="opacity-${frame >= start ? '100' : '0'}">${char}</span>`;
            }

            el.innerHTML = output;

            if (complete === length) {
                el.innerHTML = oldText; // Restore clean text
            } else {
                frame++;
                el.raf = requestAnimationFrame(update);
            }
        };

        update();
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}
