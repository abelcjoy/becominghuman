/**
 * Mirror of Reality
 * Uses the webcam to project the user's face behind the numbers.
 * A memento mori tool: "Look at the face of the one who is running out of time."
 */

export class MirrorEffect {
    constructor() {
        this.video = null;
        this.stream = null;
        this.isActive = false;
        this.init();
    }

    init() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.warn('Mirror not supported');
            return;
        }

        // Create hidden video element
        this.video = document.createElement('video');
        this.video.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(-1.1, 1.1); /* Mirror flip & zoom */
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            object-fit: cover;
            z-index: -1;
            opacity: 0;
            transition: opacity 2s ease;
            filter: grayscale(100%) contrast(1.2) brightness(0.6) blur(2px);
            pointer-events: none;
        `;
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.playsInline = true;
        document.body.prepend(this.video);

        // Add Toggle Button
        this.addToggleControl();
    }

    addToggleControl() {
        const btnContainer = document.querySelector('.mt-8.flex.items-center.justify-center.gap-4');
        if (btnContainer) {
            const btn = document.createElement('button');
            btn.id = 'mirror-btn';
            btn.className = 'px-6 py-3 bg-white/10 text-white text-[10px] uppercase tracking-[0.4em] hover:bg-white/20 transition-all duration-300 border border-white/20 rounded';
            btn.innerHTML = '🪞 Reflect';
            btn.onclick = () => this.toggle();
            btnContainer.insertBefore(btn, btnContainer.firstChild); // First button
        }
    }

    async toggle() {
        if (this.isActive) {
            this.stop();
        } else {
            await this.start();
        }
    }

    async start() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            this.video.srcObject = this.stream;

            // Wait for load
            this.video.onloadedmetadata = () => {
                this.isActive = true;
                this.video.style.opacity = '0.4'; // Subtle ghostly visibility
                this.updateButton(true);

                if (window.toast) toast.success("Mirror Active. Face the reality.");
            };

        } catch (e) {
            console.error('Mirror access denied:', e);
            if (window.toast) toast.error("Camera access required for reflection.");
        }
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.video.srcObject = null;
        this.video.style.opacity = '0';
        this.isActive = false;
        this.updateButton(false);
    }

    updateButton(active) {
        const btn = document.getElementById('mirror-btn');
        if (btn) {
            btn.innerHTML = active ? '🪞 Hide' : '🪞 Reflect';
            btn.classList.toggle('bg-white/30', active);
        }
    }
}
