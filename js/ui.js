export class UI {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    toast(message, type = 'info', duration = 3000) {
        const toastEl = document.createElement('div');
        toastEl.className = `toast ${type}`;

        // Icon based on type
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        if (type === 'warning') icon = '⚠️';

        toastEl.innerHTML = `
            <span class="flex items-center gap-3">
                <span class="text-lg">${icon}</span>
                <span>${message}</span>
            </span>
            <button class="ml-4 text-white/50 hover:text-white">&times;</button>
        `;

        // Close button
        const closeBtn = toastEl.querySelector('button');
        closeBtn.onclick = () => this.removeToast(toastEl);

        this.container.appendChild(toastEl);

        // Auto remove
        setTimeout(() => {
            this.removeToast(toastEl);
        }, duration);
    }

    removeToast(el) {
        el.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        el.addEventListener('animationend', () => {
            if (el.parentElement) el.remove();
        });
    }

    // Helper to set tooltip on validation failure or disabled state
    setTooltip(element, message) {
        element.setAttribute('data-tooltip', message);
    }

    showLoading(message = 'Initializing Reality...') {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="spinner"></div>
            <div class="loading-text">${message}</div>
        `;
        document.body.appendChild(overlay);
        this.loadingOverlay = overlay;
    }

    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (this.loadingOverlay && this.loadingOverlay.parentElement) {
                    this.loadingOverlay.remove();
                }
                this.loadingOverlay = null;
            }, 300);
        }
    }
}
