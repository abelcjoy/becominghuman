/**
 * Ambience Engine
 * Generates procedural colored noise (Brown/Pink) for deep focus.
 * This is "Sound used inside the website" for utility.
 */

export class AmbienceEngine {
    constructor(soundManager) {
        this.enabled = false;
        this.ctx = null;
        this.source = null;
        this.node = null;

        // Create Toggle UI
        this.createUI();
    }

    createUI() {
        this.btn = document.createElement('button');
        this.btn.className = 'fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 z-50 flex items-center justify-center';
        this.btn.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
        `;
        this.btn.title = 'Deep Focus Noise';

        // Add indicator
        this.indicator = document.createElement('div');
        this.indicator.className = 'absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full opacity-0 transition-opacity';
        this.btn.appendChild(this.indicator);

        this.btn.addEventListener('click', () => this.toggle());
        document.body.appendChild(this.btn);
    }

    toggle() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        this.enabled = !this.enabled;

        if (this.enabled) {
            this.startNoise();
            this.btn.classList.add('scale-110', 'text-emerald-400', 'border-emerald-500/30');
            this.indicator.style.opacity = '1';
        } else {
            this.stopNoise();
            this.btn.classList.remove('scale-110', 'text-emerald-400', 'border-emerald-500/30');
            this.indicator.style.opacity = '0';
        }
    }

    startNoise() {
        // Brown Noise Buffer
        const bufferSize = this.ctx.sampleRate * 2; // 2 seconds
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Brown noise filter (leak integration)
            lastOut = (lastOut + (0.02 * white)) / 1.02;
            lastOut *= 3.5; // Compensate gain
            data[i] = lastOut;
        }

        this.source = this.ctx.createBufferSource();
        this.source.buffer = buffer;
        this.source.loop = true;

        this.gain = this.ctx.createGain();
        this.gain.gain.value = 0.05; // Low ambient volume

        // Lowpass to make it softer
        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 800;

        this.source.connect(this.filter);
        this.filter.connect(this.gain);
        this.gain.connect(this.ctx.destination);

        this.source.start();

        // Fade in
        this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2);
    }

    stopNoise() {
        if (this.gain) {
            // Fade out
            this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
            setTimeout(() => {
                if (this.source) {
                    this.source.stop();
                    this.source.disconnect();
                }
            }, 1000);
        }
    }
}
