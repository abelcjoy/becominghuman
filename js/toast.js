/**
 * Toast Notification System
 * Replaces browser alerts with styled, non-blocking notifications
 */

export class Toast {
    constructor() {
        this.container = this.createContainer();
        this.toasts = [];
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-4 right-4 z-[150] flex flex-col gap-3 pointer-events-none';
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('toast-show'), 10);

        // Auto dismiss
        setTimeout(() => this.dismiss(toast), duration);

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} pointer-events-auto`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ⓘ'
        };

        const colors = {
            success: 'bg-green-900/90 border-green-500',
            error: 'bg-red-900/90 border-red-500',
            warning: 'bg-yellow-900/90 border-yellow-500',
            info: 'bg-blue-900/90 border-blue-500'
        };

        toast.innerHTML = `
            <div class="${colors[type]} border-l-4 backdrop-blur-xl px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px] max-w-[500px]">
                <span class="text-2xl flex-shrink-0">${icons[type]}</span>
                <p class="text-white text-sm font-medium flex-1">${message}</p>
                <button onclick="this.closest('.toast').dispatchEvent(new Event('dismiss'))" 
                        class="text-white/60 hover:text-white transition-colors text-xl leading-none flex-shrink-0">×</button>
            </div>
        `;

        toast.addEventListener('dismiss', () => this.dismiss(toast));

        return toast;
    }

    dismiss(toast) {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        }, 300);
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Export singleton instance
export const toast = new Toast();
