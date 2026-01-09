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
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

        // Deep Drone Oscillator
        this.oscillator = this.ctx.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A note

        // Add a second oscillator for richness
        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'triangle';
        this.osc2.frequency.setValueAtTime(55.5, this.ctx.currentTime); // Slight detune for chorus effect

        // Low Pass Filter to keep it 'relaxing' and 'muffled'
        const lpf = this.ctx.createBiquadFilter();
        lpf.type = 'lowpass';
        lpf.frequency.setValueAtTime(150, this.ctx.currentTime);

        this.oscillator.connect(lpf);
        this.osc2.connect(lpf);
        lpf.connect(this.gainNode);

        this.oscillator.start();
        this.osc2.start();
        this.isStarted = true;
    }

    toggle() {
        if (!this.isStarted) this.init();

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.isPlaying) {
            this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
            this.isPlaying = false;
        } else {
            this.gainNode.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 2);
            this.isPlaying = true;
        }
        return this.isPlaying;
    }
}

export const audioEngine = new AudioEngine();
