/**
 * The Resonance Field (Input Harmonizer)
 * "Your actions echo in eternity."
 * 
 * Adds visual and auditory resonance to user inputs.
 * When typing or interacting, the UI "ripples" with energy.
 * Implements a Pentatonic Audio Feedback system for satisfying data entry.
 */

export class ResonanceField {
    constructor() {
        this.inputs = document.querySelectorAll('input, textarea, select');

        // Simple synth context (if allowed)
        this.ctx = null;
        this.initialized = false;

        this.init();
    }

    init() {
        // Visuals
        this.inputs.forEach(el => {
            el.addEventListener('input', () => this.pulse(el));
            el.addEventListener('focus', () => this.prepareAudio());
        });

        // CSS
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes resonance-ripple {
                0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); border-color: rgba(255,255,255,0.8); }
                100% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); border-color: rgba(255,255,255,0.2); }
            }
            .resonance-active {
                animation: resonance-ripple 0.4s cubic-bezier(0, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
    }

    prepareAudio() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
                this.initialized = true;
            }
        } catch (e) {
            console.warn('[Resonance] Audio not supported');
        }
    }

    pulse(el) {
        // Visual Trigger
        // Remove class and re-add to restart animation
        el.classList.remove('resonance-active');
        void el.offsetWidth; // Force reflow
        el.classList.add('resonance-active');

        // Audio Trigger
        this.playTone();
    }

    playTone() {
        if (!this.ctx || document.hidden || window.app?.isMuted) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Pentatonic Scale (C Minor Pentatonic)
        // C4, Eb4, F4, G4, Bb4
        const notes = [261.63, 311.13, 349.23, 392.00, 466.16];
        const freq = notes[Math.floor(Math.random() * notes.length)];

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime); // Very quiet
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }
}
