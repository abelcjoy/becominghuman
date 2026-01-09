class AudioEngine {
    constructor() {
        this.ctx = null;
        this.isStarted = false;
        this.isPlaying = false;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        this.mainGain = this.ctx.createGain();
        this.mainGain.connect(this.ctx.destination);
        this.mainGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

        // --- THE NEW SOUND: "ETHEREAL VOID" ---
        // Combination of a Brownian Noise (Wind) and Resonant High Tones

        // 1. Procedural Wind (Brown Noise)
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // brown noise is quiet
        }

        this.noiseSource = this.ctx.createBufferSource();
        this.noiseSource.buffer = noiseBuffer;
        this.noiseSource.loop = true;

        this.noiseFilter = this.ctx.createBiquadFilter();
        this.noiseFilter.type = 'lowpass';
        this.noiseFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
        this.noiseFilter.Q.setValueAtTime(0.5, this.ctx.currentTime);

        this.noiseGain = this.ctx.createGain();
        this.noiseGain.gain.setValueAtTime(0.1, this.ctx.currentTime);

        // 2. Resonant High Tone (The "Soul" frequency)
        this.soulOsc = this.ctx.createOscillator();
        this.soulOsc.type = 'sine';
        this.soulOsc.frequency.setValueAtTime(432, this.ctx.currentTime); // 432Hz "Healing" frequency

        this.soulGain = this.ctx.createGain();
        this.soulGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

        // LFO for the Soul Frequency (Breathing effect)
        this.lfo = this.ctx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 10 second cycle
        this.lfoGain = this.ctx.createGain();
        this.lfoGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

        this.lfo.connect(this.lfoGain);
        this.lfoGain.connect(this.soulGain.gain);

        // Connect everything to main
        this.noiseSource.connect(this.noiseFilter);
        this.noiseFilter.connect(this.noiseGain);
        this.noiseGain.connect(this.mainGain);

        this.soulOsc.connect(this.soulGain);
        this.soulGain.connect(this.mainGain);

        this.noiseSource.start();
        this.soulOsc.start();
        this.lfo.start();

        this.isStarted = true;
    }

    play() {
        if (!this.isStarted) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        if (!this.isPlaying) {
            this.mainGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 3);
            this.isPlaying = true;
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
