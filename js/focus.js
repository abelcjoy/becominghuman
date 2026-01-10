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

        // Sound
        if (this.app.soundManager) {
            this.app.soundManager.play('click');
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

        if (show) {
            container.classList.remove('hidden');
            container.classList.add('flex');
        } else {
            container.classList.add('hidden');
            container.classList.remove('flex');
        }
    }
}
