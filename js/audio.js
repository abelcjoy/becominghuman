class AudioEngine {
    constructor() {
        this.ctx = null;
        this.oscillator = null;
        this.gainNode = null;
        this.isStarted = false;
        this.isPlaying = false;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);

        // Start with a tiny non-zero value so exponential ramps work
        this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);

        // --- Oscillators for a Rich Zen Drone ---

        // 1. Fundamental Deep Note (55Hz - Low A)
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

        // 2. First Harmonic (110Hz - Audibility on Laptops)
        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'sine';
        this.osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

        // 3. Perfect Fifth Harmonic (165Hz - Stability)
        this.osc3 = this.ctx.createOscillator();
        this.osc3.type = 'triangle';
        this.osc3.frequency.setValueAtTime(165, this.ctx.currentTime);

        // --- Processing Stack ---

        // Low Pass Filter (Removes sharpness, keeps it 'muffled' and cozy)
        const lpf = this.ctx.createBiquadFilter();
        lpf.type = 'lowpass';
        lpf.frequency.setValueAtTime(400, this.ctx.currentTime);
        lpf.Q.setValueAtTime(1, this.ctx.currentTime);

        this.osc1.connect(lpf);
        this.osc2.connect(lpf);
        this.osc3.connect(lpf);
        lpf.connect(this.gainNode);

        this.osc1.start();
        this.osc2.start();
        this.osc3.start();
        this.isStarted = true;
    }

    toggle() {
        if (!this.isStarted) this.init();

        // Always attempt to resume the context (Browser state management)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.isPlaying) {
            // Fade Out
            this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
            this.isPlaying = false;
        } else {
            // Fade In (0.08 is clearly audible but still background)
            this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);
            this.isPlaying = true;
        }
        return this.isPlaying;
    }
}

export const audioEngine = new AudioEngine();
