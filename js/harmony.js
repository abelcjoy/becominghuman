/**
 * Harmonic Interaction Engine
 * Turns the UI into a musical instrument.
 * Hovering interactive elements plays notes from a C Minor Pentatonic Scale.
 */

export class HarmonyEngine {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.scale = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25]; // C4, Eb4, F4, G4, Bb4, C5
        this.interactables = document.querySelectorAll('button, input, a, .terminal-box');

        this.init();
    }

    init() {
        this.interactables.forEach(el => {
            el.addEventListener('mouseenter', () => this.playNote());
        });
    }

    playNote() {
        if (!this.soundManager || !this.soundManager.enabled) return;

        // Pick a random note from the scale
        const note = this.scale[Math.floor(Math.random() * this.scale.length)];

        // Use SoundManager to synthesize it
        const playTone = this.soundManager.createTone(note, 0.15, 'sine', 0.03); // Low volume, sine wave
        playTone();
    }
}
