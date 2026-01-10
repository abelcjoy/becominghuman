/**
 * Habit & Gamification Manager
 * Tracks streaks, XP, and activity history
 */

export class HabitManager {
    constructor(app) {
        this.app = app;
        this.activityLog = JSON.parse(localStorage.getItem('activityLog')) || {};
        this.streak = parseInt(localStorage.getItem('currentStreak')) || 0;
        this.lastLoginRequest = localStorage.getItem('lastLoginDate');
        this.totalXP = parseInt(localStorage.getItem('totalXP')) || 0;

        // Ranks
        this.ranks = [
            { name: 'Sleepwalker', xp: 0 },
            { name: 'Observer', xp: 100 },
            { name: 'Awakened', xp: 300 },
            { name: 'Intentional', xp: 600 },
            { name: 'Architect', xp: 1000 },
            { name: 'Time Sovereign', xp: 2000 },
            { name: 'Transcendent', xp: 5000 }
        ];

        this.checkStreak();
    }

    logActivity(type, value = 1) {
        const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

        // Init today's log if needed
        if (!this.activityLog[today]) {
            this.activityLog[today] = { focusMinutes: 0, actions: 0, xpEarned: 0 };
        }

        let xpGain = 0;

        // Log based on type
        switch (type) {
            case 'focus':
                this.activityLog[today].focusMinutes += value;
                xpGain = value * 2; // 2 XP per minute focused
                break;
            case 'reflection':
                this.activityLog[today].actions += 1;
                xpGain = 10;
                break;
            case 'visit':
                this.activityLog[today].actions += 1;
                xpGain = 5;
                break;
        }

        this.activityLog[today].xpEarned += xpGain;
        this.addXP(xpGain);
        this.save();
    }

    checkStreak() {
        const today = new Date().toLocaleDateString('en-CA');

        if (this.lastLoginRequest !== today) {
            // New day
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toLocaleDateString('en-CA');

            if (this.lastLoginRequest === yesterdayStr) {
                // Streak continues
                this.streak++;
                if (window.toast) toast.success(`🔥 ${this.streak} Day Streak!`);
            } else if (this.lastLoginRequest) {
                // Streak broken (unless it's the very first login)
                if (new Date(this.lastLoginRequest) < yesterday) {
                    this.streak = 1; // Reset to 1
                }
            } else {
                this.streak = 1; // First time
            }

            this.lastLoginRequest = today;
            this.logActivity('visit');
            this.save();
        }
    }

    addXP(amount) {
        const oldRank = this.getRank().name;
        this.totalXP += amount;
        const newRank = this.getRank().name;

        if (oldRank !== newRank) {
            if (window.toast) toast.success(`🆙 Level Up! You are now a "${newRank}"`);
            if (this.app.soundManager) this.app.soundManager.play('milestone');
        }
    }

    getRank() {
        // Find highest rank with xp <= totalXP
        return [...this.ranks].reverse().find(r => this.totalXP >= r.xp) || this.ranks[0];
    }

    getNextRank() {
        return this.ranks.find(r => r.xp > this.totalXP) || { name: 'Max Level', xp: this.totalXP };
    }

    getProgressToNextLevel() {
        const currentRank = this.getRank();
        const nextRank = this.getNextRank();
        if (nextRank.name === 'Max Level') return 100;

        const prevXP = currentRank.xp;
        const dist = nextRank.xp - prevXP;
        const prof = this.totalXP - prevXP;

        return Math.min(100, Math.max(0, (prof / dist) * 100));
    }

    getLast30DaysActivity() {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('en-CA');
            const log = this.activityLog[dateStr] || { focusMinutes: 0, xpEarned: 0 };
            days.push({ date: dateStr, ...log });
        }
        return days;
    }

    save() {
        localStorage.setItem('activityLog', JSON.stringify(this.activityLog));
        localStorage.setItem('currentStreak', this.streak);
        localStorage.setItem('lastLoginDate', this.lastLoginRequest);
        localStorage.setItem('totalXP', this.totalXP);

        // Update UI if it exists
        this.updateStatsUI();
    }

    updateStatsUI() {
        // Update Rank Display
        const rankEl = document.getElementById('user-rank');
        const xpBarEl = document.getElementById('xp-progress-bar');
        const streakEl = document.getElementById('streak-counter');
        const nextRankEl = document.getElementById('next-rank-xp');

        if (rankEl) rankEl.textContent = this.getRank().name;
        if (streakEl) streakEl.textContent = `${this.streak} Day Streak`;

        if (xpBarEl) {
            xpBarEl.style.width = `${this.getProgressToNextLevel()}%`;
        }

        if (nextRankEl) {
            const next = this.getNextRank();
            nextRankEl.textContent = `${Math.floor(this.totalXP)} / ${next.xp} XP`;
        }

        // Render Heatmap if chart exists
        if (this.app.renderHeatmap) {
            this.app.renderHeatmap(this.getLast30DaysActivity());
        }
    }
}
