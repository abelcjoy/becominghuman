/**
 * PWA Install Manager
 * Handles Progressive Web App installation prompt
 */

export class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.init();
    }

    init() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Listen for app installed
        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            this.hideInstallButton();
            if (window.toast) {
                toast.success('✅ App installed! Launch from your home screen anytime.');
            }
        });

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('App is running in standalone mode');
        }
    }

    showInstallButton() {
        // Create install button if it doesn't exist
        if (!this.installButton) {
            this.installButton = document.createElement('button');
            this.installButton.id = 'pwa-install-btn';
            this.installButton.className = 'fixed bottom-6 right-6 z-50 bg-white text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center gap-2';
            this.installButton.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a 3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Install App
            `;
            this.installButton.onclick = () => this.promptInstall();
            document.body.appendChild(this.installButton);

            // Animate in
            setTimeout(() => {
                this.installButton.style.animation = 'slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            }, 1000);
        }
    }

    hideInstallButton() {
        if (this.installButton) {
            this.installButton.style.animation = 'slideOutDown 0.3s ease-out';
            setTimeout(() => {
                if (this.installButton && this.installButton.parentNode) {
                    this.installButton.remove();
                }
                this.installButton = null;
            }, 300);
        }
    }

    async promptInstall() {
        if (!this.deferredPrompt) {
            if (window.toast) {
                toast.info('App is already installed or this browser doesn\'t support installation.');
            }
            return;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await this.deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
            if (window.toast) {
                toast.info('You can install this app anytime from your browser menu.');
            }
        }

        // Clear the deferredPrompt
        this.deferredPrompt = null;
        this.hideInstallButton();
    }
}
