class AudioEngine {
    constructor() {
        this.ctx = null;
        this.isStarted = false;
        this.isPlaying = false;
        this.birdInterval = null;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        this.mainGain = this.ctx.createGain();
        this.mainGain.connect(this.ctx.destination);
        this.mainGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

        // 1. "Morning Warmth" - Gentle background hum
        this.morningOsc = this.ctx.createOscillator();
        this.morningOsc.type = 'sine';
        this.morningOsc.frequency.setValueAtTime(220, this.ctx.currentTime); // Warm A3

        this.morningGain = this.ctx.createGain();
        this.morningGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

        this.morningOsc.connect(this.morningGain);
        this.morningGain.connect(this.mainGain);
        this.morningOsc.start();

        this.isStarted = true;
    }

    // Procedural Bird Chirp Synthesis
    createChirp() {
        if (!this.isPlaying) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Random Bird Character
        const freq = 2500 + Math.random() * 2000;
        const duration = 0.05 + Math.random() * 0.1;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        // The "Chirp" effect - rapid pitch drop
        osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + duration);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.01);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc.connect(gain);
        gain.connect(this.mainGain);

        osc.start(now);
        osc.stop(now + duration);

        // Schedule next chirp randomly (morning vibe density)
        const nextIn = 500 + Math.random() * 3000;
        setTimeout(() => this.createChirp(), nextIn);
    }

    play() {
        if (!this.isStarted) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        if (!this.isPlaying) {
            this.mainGain.gain.exponentialRampToValueAtTime(0.3, this.ctx.currentTime + 2);
            this.isPlaying = true;
            // Kick off the bird sequence
            this.createChirp();
            // Occasional double chirps
            setTimeout(() => this.createChirp(), 200);
        }
    }

    stop() {
        if (this.isPlaying) {
            this.mainGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
            this.isPlaying = false;
        }
    }

    toggle() {
        if (this.isPlaying) this.stop();
        else this.play();
        return this.isPlaying;
    }
}

export const audioEngine = new AudioEngine();
