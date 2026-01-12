/**
 * The Mortal Strand
 * A peripheral 1-pixel timeline showing "Now" relative to the total lifespan.
 */

export class MortalStrand {
    constructor(app) {
        this.app = app;
        this.dot = document.getElementById('strand-dot');
    }

    update(deltaTime) {
        if (!this.app || !this.app.dob || !this.app.targetDate) return;

        const birth = new Date(this.app.dob);
        const death = new Date(this.app.targetDate);
        const now = new Date();

        const totalLifespanMs = death - birth;
        const livedMs = now - birth;

        const progress = Math.max(0, Math.min(100, (livedMs / totalLifespanMs) * 100));

        if (this.dot) {
            this.dot.style.left = `${progress}%`;
        }
    }
}
