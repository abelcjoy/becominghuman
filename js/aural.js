/**
 * The Aural Horizon (Binaural Architecture)
 * "The sound of time passing."
 * 
 * Generates real-time Binaural Beats using the Web Audio API (Pure Math, no MP3s).
 * Creates a psychoacoustic effect to induce specific brain states:
 * - Default: Theta Waves (4Hz) -> Deep Relaxation / Introspection.
 * - Focus Mode: Gamma Waves (40Hz) -> Peak Concentration.
 * 
 * "Neat and clean audio."
 */

export class AuralHorizon {
    constructor() {
        this.ctx = null;
        this.oscillators = [];
        this.gainNode = null;
        this.isPlaying = false;
        this.volume = 0.02; // Very subtle background hum

        // Listen for global audio toggle
        document.addEventListener('toggle-audio', () => this.toggle());
        document.addEventListener('enter-focus', () => this.setMode('focus'));
        document.addEventListener('exit-focus', () => this.setMode('relax'));
    }

    init() {
        if (this.ctx) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();

            // Master Gain
            this.gainNode = this.ctx.createGain();
            this.gainNode.gain.value = 0; // Start silent
            this.gainNode.connect(this.ctx.destination);

        } catch (e) {
            console.warn('[Aural] Not supported');
        }
    }

    toggle() {
        if (this.isPlaying) this.stop();
        else this.start();
    }

    start() {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        this.isPlaying = true;

        // Fade in
        this.gainNode.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 2);

        // Create Binaural Pair (Theta 4Hz)
        // Base: 200Hz (Left), 204Hz (Right)
        this.createOscillator(200, -1); // Left Pan
        this.createOscillator(204, 1);  // Right Pan
    }

    stop() {
        if (!this.isPlaying) return;
        this.isPlaying = false;

        // Fade out
        this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 1);

        setTimeout(() => {
            this.oscillators.forEach(o => o.stop());
            this.oscillators = [];
        }, 1100);
    }

    createOscillator(freq, pan) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const panner = this.ctx.createStereoPanner();
        panner.pan.value = pan;

        osc.connect(panner);
        panner.connect(this.gainNode);

        osc.start();
        this.oscillators.push(osc);
    }

    setMode(mode) {
        if (!this.isPlaying) return;

        // Smooth transition of frequencies
        // Theta (4Hz): 200 / 204
        // Gamma (40Hz): 200 / 240

        const targetDiff = mode === 'focus' ? 40 : 4;
        const base = 200;

        // We assume [0] is Left (Base), [1] is Right (Base + Diff)
        if (this.oscillators.length >= 2) {
            const rightOsc = this.oscillators[1];
            rightOsc.frequency.setTargetAtTime(base + targetDiff, this.ctx.currentTime, 1);
        }

        if (window.toast) toast.info(`Brainwave Sync: ${mode.toUpperCase()} (${targetDiff}Hz)`);
    }
}
