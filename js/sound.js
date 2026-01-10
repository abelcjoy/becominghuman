/**
 * Sound Manager
 * Handles optional audio feedback
 */

export class SoundManager {
    constructor() {
        this.enabled = localStorage.getItem('soundEnabled') === 'true';
        this.sounds = {
            tick: this.createTone(800, 0.05, 'sine', 0.1),
            achievement: this.createTone(600, 0.2, 'square', 0.2),
            click: this.createTone(400, 0.05, 'sine', 0.15),
            milestone: this.createMultiTone([523, 659, 784], 0.3, 0.2)
        };
    }

    createTone(frequency, duration, type = 'sine', volume = 0.1) {
        return () => {
            if (!this.enabled) return;

            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = type;
                gainNode.gain.value = volume;

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {
                console.warn('Audio play failed', e);
            }
        };
    }

    createMultiTone(frequencies, duration, volume = 0.1) {
        return () => {
            if (!this.enabled) return;

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    try {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();

                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);

                        oscillator.frequency.value = freq;
                        oscillator.type = 'sine';
                        gainNode.gain.value = volume;

                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.1);
                    } catch (e) {
                        console.warn('Audio play failed', e);
                    }
                }, index * 100);
            });
        };
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);

        if (window.toast) {
            toast.info(this.enabled ? '🔊 Sound effects enabled' : '🔇 Sound effects disabled');
        }

        return this.enabled;
    }

    createBinauralBeat(baseFreq, beatFreq, volume = 0.1) {
        return new BinauralBeatGenerator(this.enabled, baseFreq, beatFreq, volume);
    }

    isEnabled() {
        return this.enabled;
    }
}

class BinauralBeatGenerator {
    constructor(enabled, baseFreq, beatFreq, maxVolume) {
        this.enabled = enabled;
        this.baseFreq = baseFreq;
        this.beatFreq = beatFreq;
        this.maxVolume = maxVolume;
        this.ctx = null;
        this.oscillators = [];
        this.gains = [];
        this.isPlaying = false;
    }

    start() {
        if (!this.enabled || this.isPlaying) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();

            // Create Master Gain for Fade In
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0;

            // Create Audio Analyser for Visualization
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 256;
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);

            // Expose for visualizers
            window.audioAnalyser = this.analyser;

            // Left Channel
            const oscL = this.ctx.createOscillator();
            const pannerL = this.ctx.createStereoPanner();
            oscL.frequency.value = this.baseFreq;
            pannerL.pan.value = -1;
            oscL.connect(pannerL);
            pannerL.connect(this.masterGain);

            // Right Channel
            const oscR = this.ctx.createOscillator();
            const pannerR = this.ctx.createStereoPanner();
            oscR.frequency.value = this.baseFreq + this.beatFreq;
            pannerR.pan.value = 1;
            oscR.connect(pannerR);
            pannerR.connect(this.masterGain);

            // Start
            const now = this.ctx.currentTime;
            oscL.start(now);
            oscR.start(now);

            this.oscillators = [oscL, oscR];
            this.isPlaying = true;

            // Fade In
            this.masterGain.gain.linearRampToValueAtTime(this.maxVolume, now + 5);

        } catch (e) {
            console.warn('Binaural beat failed:', e);
        }
    }

    getAudioData() {
        if (!this.analyser) return null;
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(data);
        return data;
    }

    stop() {
        if (!this.isPlaying || !this.ctx) return;

        const now = this.ctx.currentTime;
        // Fade Out
        this.masterGain.gain.linearRampToValueAtTime(0, now + 2);

        setTimeout(() => {
            this.oscillators.forEach(osc => {
                try { osc.stop(); } catch (e) { }
            });
            this.oscillators = [];
            this.ctx.close();
            this.ctx = null;
            this.isPlaying = false;
        }, 2100);
    }
}
