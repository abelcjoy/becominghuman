/**
 * The Entropy Lens
 * Simulates the slow decay of reality. 
 * As the user stays on the page, the interface slowly blurs and shifts sepia.
 */

export class EntropyLens {
    constructor() {
        this.entropy = 0;
        this.maxEntropy = 5; // Pixels of blur
        this.decayRate = 0.00001; // Per ms
    }

    update(deltaTime) {
        // Slowly increase entropy
        this.entropy = Math.min(this.maxEntropy, this.entropy + (this.decayRate * deltaTime));

        // Apply to body
        const sepia = (this.entropy / this.maxEntropy) * 0.3;
        const blur = this.entropy;

        document.body.style.setProperty('--chrono-sepia', sepia);
        document.body.style.setProperty('--entropy-blur', `${blur}px`);
    }

    reset() {
        // "Recapture" action resets the entropy
        this.entropy = 0;
        document.body.style.setProperty('--chrono-sepia', 0);
        document.body.style.setProperty('--entropy-blur', '0px');
    }
}
