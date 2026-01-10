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
        };
    }

    createMultiTone(frequencies, duration, volume = 0.1) {
        return () => {
            if (!this.enabled) return;

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
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

    isEnabled() {
        return this.enabled;
    }
}
