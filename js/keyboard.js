/**
 * Keyboard Shortcuts Manager
 * Provides keyboard navigation and shortcuts for power users
 */

export class KeyboardShortcuts {
    constructor(app) {
        this.app = app;
        this.shortcuts = {
            'r': () => this.reset(),
            'p': () => this.toggleProtocol(),
            's': () => this.share(),
            'c': () => this.enterCrisis(),
            '?': () => this.showHelp(),
            'Escape': () => this.closeModals()
        };
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            const key = e.key;
            if (this.shortcuts[key]) {
                e.preventDefault();
                this.shortcuts[key]();
            }
        });

        // Show hint on first load
        const hasSeenHint = localStorage.getItem('keyboard-hint-seen');
        if (!hasSeenHint) {
            setTimeout(() => {
                if (window.toast) {
                    toast.info("💡 Press '?' for keyboard shortcuts", 5000);
                    localStorage.setItem('keyboard-hint-seen', 'true');
                }
            }, 3000);
        }
    }

    reset() {
        if (confirm('Reset all data and start over?')) {
            localStorage.clear();
            location.reload();
        }
    }

    toggleProtocol() {
        const modal = document.getElementById('protocol-modal');
        if (modal) {
            modal.classList.toggle('hidden');
        }
    }

    share() {
        if (this.app && this.app.shareResult) {
            this.app.shareResult();
        }
    }

    enterCrisis() {
        if (this.app && this.app.enterCrisisMode) {
            this.app.enterCrisisMode();
        }
    }

    closeModals() {
        document.querySelectorAll('.fixed.z-\\[100\\]').forEach(modal => {
            modal.classList.add('hidden');
        });
        const crisisMode = document.getElementById('crisis-mode');
        if (crisisMode && !crisisMode.classList.contains('hidden')) {
            this.app?.exitCrisisMode();
        }
    }

    showHelp() {
        const shortcuts = [
            { key: '?', action: 'Show this help' },
            { key: 'R', action: 'Reset everything' },
            { key: 'P', action: 'Toggle Protocol' },
            { key: 'S', action: 'Share result' },
            { key: 'C', action: 'Crisis mode' },
            { key: 'ESC', action: 'Close modals' }
        ];

        const helpHTML = `
            <div class="text-left space-y-2">
                <h4 class="text-white font-bold text-sm mb-4">⌨️ Keyboard Shortcuts</h4>
                ${shortcuts.map(s => `
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-stone-400">${s.action}</span>
                        <kbd class="px-2 py-1 bg-white/10 rounded font-mono text-white border border-white/20">${s.key}</kbd>
                    </div>
                `).join('')}
            </div>
        `;

        if (window.toast) {
            const toastEl = toast.info(helpHTML, 8000);
            toastEl.querySelector('.text-sm').remove(); // Remove default message, keep HTML
        }
    }
}
