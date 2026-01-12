/**
 * Cinematic Boot Sequence
 * Simulates a biological system startup/BIOS check before revealing the countdown.
 * Builds anticipation and reinforces the "Simulation" aesthetic.
 */

export class BootSequence {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.lines = [
            "INITIALIZING BIOLOGICAL KERNEL...",
            "LOADING DNA SEQUENCES...",
            "CALCULATING TELOMERE LENGTH...",
            "SYNCING CIRCADIAN RHYTHMS...",
            "ANALYZING SLEEP PATTERNS...",
            "MEASURING ATTENTION SPAN...",
            "DETECTING DOPAMINE BASELINE...",
            "QUANTIFYING EXISTENTIAL DREAD...",
            "ESTABLISHING TEMPORAL CONNECTION...",
            "MEMENTO MORI PROTOCOL: ACTIVE.",
            "REALITY CONSTRUCTED."
        ];
        this.overlay = null;
    }

    start() {
        this.createOverlay();
        this.runSequence();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 z-[999] bg-black flex flex-col items-start justify-end p-8 font-mono text-green-500 text-xs md:text-sm';
        this.overlay.style.textShadow = "0 0 5px rgba(0, 255, 0, 0.5)";
        document.body.appendChild(this.overlay);

        // Scanline effect
        const scanline = document.createElement('div');
        scanline.className = 'absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,255,0,0.1),rgba(0,0,0,0))] h-[100px] animate-scan';
        this.overlay.appendChild(scanline);

        // Add style for scanline if not exists
        if (!document.getElementById('boot-style')) {
            const style = document.createElement('style');
            style.id = 'boot-style';
            style.innerHTML = `
                @keyframes scan {
                    0% { top: -100px; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }

    async runSequence() {
        for (let i = 0; i < this.lines.length; i++) {
            await this.typeLine(this.lines[i]);
            await this.wait(Math.random() * 300 + 100); // Random delay
        }

        await this.wait(800);
        this.finish();
    }

    typeLine(text) {
        return new Promise(resolve => {
            const line = document.createElement('div');
            line.className = 'mb-1 opacity-0';
            line.innerHTML = `<span class="opacity-50">[SYSTEM]</span> ${text}`;
            this.overlay.appendChild(line);

            // Reveal
            requestAnimationFrame(() => {
                line.classList.remove('opacity-0');
                if (window.app && window.app.soundManager) window.app.soundManager.play('click');
            });

            // Auto scroll
            window.scrollTo(0, document.body.scrollHeight);

            resolve();
        });
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    finish() {
        this.overlay.style.transition = "opacity 1s ease";
        this.overlay.style.opacity = "0";
        setTimeout(() => {
            if (this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
            this.onComplete();
        }, 1000);
    }
}
