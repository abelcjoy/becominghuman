/**
 * The Encryption Veil (Visual Security)
 * "Your reality is private."
 * 
 * Automatically encrypts (scrambles) sensitive data on the screen
 * when the user switches tabs or minimizes the window.
 * Decrypts (unscrambles) with a "digital rain" effect when focus returns.
 * 
 * Demonstrates a commitment to privacy and security theater.
 */

export class EncryptionVeil {
    constructor() {
        this.targets = '.stat-value, .time-unit span';
        this.chars = 'ABCDEF0123456789';
        this.intervals = new Map();
        this.originalValues = new Map();
        this.isBlurred = false;

        this.init();
    }

    init() {
        document.addEventListener('visibilitychange', () => this.handleVisibility());
        window.addEventListener('blur', () => this.encrypt());
        window.addEventListener('focus', () => this.decrypt());
    }

    handleVisibility() {
        if (document.hidden) {
            this.encrypt();
        } else {
            this.decrypt();
        }
    }

    encrypt() {
        if (this.isBlurred) return;
        this.isBlurred = true;

        const elements = document.querySelectorAll(this.targets);

        elements.forEach(el => {
            // Store original if not already stored (static data)
            // For live counters, we don't care about restoring exact value
            // because the tick loop will overwrite it anyway. 
            // We just want to mask it while blurred.

            // Start scrambling loop
            this.startScramble(el);
        });

        document.title = "Encrypted Connection // Clarity";
    }

    decrypt() {
        if (!this.isBlurred) return;
        this.isBlurred = false;

        const elements = document.querySelectorAll(this.targets);
        elements.forEach(el => {
            this.stopScramble(el);
            // The main tick loop will naturally update the numbers instantly,
            // so we don't need to manually restore.
        });

        document.title = "Clarity For Humans";
    }

    startScramble(el) {
        // Clear existing
        if (this.intervals.has(el)) clearInterval(this.intervals.get(el));

        // Preserve width to prevent layout shift
        const width = el.offsetWidth;
        el.style.display = 'inline-block';
        el.style.width = `${width}px`;
        el.style.textAlign = 'center';

        const interval = setInterval(() => {
            el.textContent = this.randomString(el.textContent.length || 2);
        }, 100);

        this.intervals.set(el, interval);
        el.classList.add('encrypted-text');
    }

    stopScramble(el) {
        if (this.intervals.has(el)) {
            clearInterval(this.intervals.get(el));
            this.intervals.delete(el);
        }
        el.style.width = '';
        el.style.textAlign = '';
        el.classList.remove('encrypted-text');
    }

    randomString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        }
        return result;
    }
}
