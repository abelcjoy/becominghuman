/**
 * Save/Load Manager
 * Handles exporting and importing user data
 */

export class SaveManager {
    constructor(app) {
        this.app = app;
    }

    exportData() {
        const data = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            userData: {
                dob: localStorage.getItem('lifeData'),
                relationships: localStorage.getItem('relationships') || '[]',
                preferences: localStorage.getItem('preferences') || '{}',
                // New Data (Round 6/7)
                activityLog: localStorage.getItem('activityLog') || '{}',
                currentStreak: localStorage.getItem('currentStreak') || '0',
                totalXP: localStorage.getItem('totalXP') || '0',
                totalFocusSessions: localStorage.getItem('totalFocusSessions') || '0',
                totalFocusMinutes: localStorage.getItem('totalFocusMinutes') || '0',
                soundEnabled: localStorage.getItem('soundEnabled') || 'true',

                stats: {
                    totalTimeViewed: this.calculateTotalTime(),
                    firstVisit: localStorage.getItem('firstVisit') || new Date().toISOString()
                }
            }
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `clarity-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        if (window.toast) {
            toast.success('✅ Data exported successfully! Keep this file safe.');
        }
    }

    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    // Validate data structure
                    if (!data.version || !data.userData) {
                        throw new Error('Invalid backup file format');
                    }

                    // Restore data
                    if (data.userData.dob) localStorage.setItem('lifeData', data.userData.dob);
                    if (data.userData.relationships) localStorage.setItem('relationships', data.userData.relationships);
                    if (data.userData.preferences) localStorage.setItem('preferences', data.userData.preferences);

                    // Restore New Data (Round 6/7)
                    if (data.userData.activityLog) localStorage.setItem('activityLog', data.userData.activityLog);
                    if (data.userData.currentStreak) localStorage.setItem('currentStreak', data.userData.currentStreak);
                    if (data.userData.totalXP) localStorage.setItem('totalXP', data.userData.totalXP);
                    if (data.userData.totalFocusSessions) localStorage.setItem('totalFocusSessions', data.userData.totalFocusSessions);
                    if (data.userData.totalFocusMinutes) localStorage.setItem('totalFocusMinutes', data.userData.totalFocusMinutes);
                    if (data.userData.soundEnabled) localStorage.setItem('soundEnabled', data.userData.soundEnabled);

                    if (window.toast) {
                        toast.success('✅ Data imported! Reloading page...');
                    }

                    // Reload page after 1 second
                    setTimeout(() => {
                        location.reload();
                    }, 1000);

                    resolve(data);
                } catch (error) {
                    if (window.toast) {
                        toast.error('❌ Failed to import: ' + error.message);
                    }
                    reject(error);
                }
            };

            reader.onerror = () => {
                const error = new Error('Failed to read file');
                if (window.toast) {
                    toast.error('❌ Failed to read file');
                }
                reject(error);
            };

            reader.readAsText(file);
        });
    }

    calculateTotalTime() {
        const firstVisit = localStorage.getItem('firstVisit');
        if (!firstVisit) {
            localStorage.setItem('firstVisit', new Date().toISOString());
            return 0;
        }
        const elapsed = new Date() - new Date(firstVisit);
        if (isNaN(elapsed)) {
            localStorage.setItem('firstVisit', new Date().toISOString());
            return 0;
        }
        return Math.floor(elapsed / 1000 / 60); // minutes
    }

    showImportDialog() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importData(file);
            }
        };
        input.click();
    }
}
