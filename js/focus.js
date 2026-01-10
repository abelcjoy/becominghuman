/**
 * Focus Manager
 * Deep work timer that converts time into Attention Equity
 */

export class FocusManager {
    constructor(app) {
        this.app = app;
        this.isActive = false;
        this.startTime = null;
        this.duration = 25 * 60 * 1000; // Default 25m
        this.elapsed = 0;
        this.interval = null;
        this.sessionCount = parseInt(localStorage.getItem('totalFocusSessions')) || 0;
        this.totalFocusMinutes = parseInt(localStorage.getItem('totalFocusMinutes')) || 0;

        // Neuro-Audio (40Hz Gamma: 200Hz Left, 240Hz Right)
        this.binaural = null;
        this.audioEnabled = true; // Default for session
    }

    startSession(minutes = 25) {
        if (this.isActive) return;

        this.isActive = true;
        this.duration = minutes * 60 * 1000;
        this.startTime = Date.now();
        this.elapsed = 0;

        // UI Updates
        document.body.classList.add('focus-mode-active');
        this.updateUI();

        // Sound: Click + Neuro-Audio
        if (this.app.soundManager) {
            this.app.soundManager.play('click');

            if (this.audioEnabled && this.app.soundManager.enabled) {
                // 40Hz Gamma at 0.05 volume (subtle background)
                this.binaural = this.app.soundManager.createBinauralBeat(200, 40, 0.05);
                this.binaural.start();
            }
        }

        this.interval = setInterval(() => this.tick(), 1000);

        if (window.toast) {
            toast.success(`🔍 Focus session started (${minutes}m). Distractions eliminated.`);
        }
    }

    tick() {
        if (!this.isActive) return;

        const now = Date.now();
        this.elapsed = now - this.startTime;
        const remaining = this.duration - this.elapsed;

        if (remaining <= 0) {
            this.completeSession();
        } else {
            this.updateTitle(remaining);
            this.updateDisplay(remaining);
        }
    }

    cancelSession() {
        this.cleanup();
        if (window.toast) toast.info('Focus session cancelled.');
    }

    completeSession() {
        this.cleanup();

        // Save Stats
        this.sessionCount++;
        const minutesCompleted = Math.floor(this.duration / 60000);
        this.totalFocusMinutes += minutesCompleted;

        localStorage.setItem('totalFocusSessions', this.sessionCount);
        localStorage.setItem('totalFocusMinutes', this.totalFocusMinutes);

        // Calculate Equity Earned (Assume $25/hr value)
        const equityEarned = (minutesCompleted / 60) * 25;

        // Log to Habit Manager
        if (this.app.habitManager) {
            this.app.habitManager.logActivity('focus', minutesCompleted);
        }

        // Sound
        if (this.app.soundManager) {
            this.app.soundManager.play('achievement');
        }

        // Notification
        if (window.toast) {
            toast.success(`🎉 Session Complete! +$${equityEarned.toFixed(2)} Equity earned.`);
        }

        // Trigger celebration animation in app
        if (this.app.triggerConfetti) { // If we add this later
            this.app.triggerConfetti();
        }
    }

    cleanup() {
        this.isActive = false;
        clearInterval(this.interval);

        if (this.binaural) {
            this.binaural.stop();
            this.binaural = null;
        }

        document.body.classList.remove('focus-mode-active');
        document.title = "Clarity For Humans"; // Reset title
        this.updateUI(false);
    }

    updateTitle(ms) {
        const m = Math.floor(ms / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        document.title = `🎯 ${m}:${s.toString().padStart(2, '0')} - Focusing`;
    }

    updateDisplay(ms) {
        const timerEl = document.getElementById('focus-timer-display');
        const progressEl = document.getElementById('focus-progress-bar');

        if (timerEl) {
            const m = Math.floor(ms / 60000);
            const s = Math.floor((ms % 60000) / 1000);
            timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        }

        if (progressEl) {
            const percent = (this.elapsed / this.duration) * 100;
            progressEl.style.width = `${percent}%`;
        }
    }

    updateUI(show = true) {
        const container = document.getElementById('focus-overlay');
        if (!container) return;

        // Inject Audio Toggle if missing
        if (!document.getElementById('neuro-audio-toggle')) {
            const btnContainer = container.querySelector('.flex.gap-6');
            if (btnContainer) {
                const toggle = document.createElement('button');
                toggle.id = 'neuro-audio-toggle';
                toggle.className = 'px-8 py-4 border border-white/20 hover:bg-white/10 rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2';
                toggle.innerHTML = '<span>🔊 Neuro-Audio: ON</span>';
                toggle.onclick = () => {
                    this.audioEnabled = !this.audioEnabled;
                    toggle.innerHTML = this.audioEnabled ? '<span>🔊 Neuro-Audio: ON</span>' : '<span>🔇 Neuro-Audio: OFF</span>';
                    toggle.classList.toggle('opacity-50', !this.audioEnabled);

                    if (this.isActive) {
                        if (this.audioEnabled && !this.binaural) {
                            if (this.app.soundManager && this.app.soundManager.enabled) {
                                this.binaural = this.app.soundManager.createBinauralBeat(200, 40, 0.05);
                                this.binaural.start();
                            }
                        } else if (!this.audioEnabled && this.binaural) {
                            this.binaural.stop();
                            this.binaural = null;
                        }
                    }
                };
                btnContainer.prepend(toggle); // Add before abort button
            }
        }

        if (show) {
            container.classList.remove('hidden');
            container.classList.add('flex');
            this.startVisualizer();
        } else {
            container.classList.add('hidden');
            container.classList.remove('flex');
            this.stopVisualizer();
        }
    }

    startVisualizer() {
        // Find or create canvas
        let canvas = document.getElementById('focus-visualizer');
        if (!canvas) {
            const container = document.getElementById('focus-overlay');
            canvas = document.createElement('canvas');
            canvas.id = 'focus-visualizer';
            canvas.className = 'absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen';
            // Insert behind content but above background
            container.insertBefore(canvas, container.firstChild.nextSibling);
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const draw = () => {
            if (!this.isActive) return;

            this.visualizerFrame = requestAnimationFrame(draw);

            // Clear with trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (this.binaural && this.audioEnabled && this.binaural.getAudioData) {
                const data = this.binaural.getAudioData();
                if (!data) return;

                // Circular Waveform Visualization
                const radius = 220; // Slightly larger than timer
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(100, 200, 255, 0.4)';

                const sliceAngle = (Math.PI * 2) / data.length;
                let x, y;

                for (let i = 0; i < data.length; i++) {
                    const v = data[i] / 128.0;
                    const r = radius + (v * 40);

                    const angle = i * sliceAngle;
                    x = centerX + Math.cos(angle) * r;
                    y = centerY + Math.sin(angle) * r;

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                ctx.closePath();
                ctx.stroke();

                // Inner Breathing Glow
                const avg = data.reduce((a, b) => a + b, 0) / data.length;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius * 0.9 + (avg / 10), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(50, 100, 255, ${avg / 255 * 0.15})`;
                ctx.fill();
            } else {
                // Fallback "Breathing" animation if audio disabled
                const time = Date.now() / 2000;
                const r = 220 + Math.sin(time) * 10;
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        draw();
    }

    stopVisualizer() {
        if (this.visualizerFrame) {
            cancelAnimationFrame(this.visualizerFrame);
            this.visualizerFrame = null;
        }
    }
}
