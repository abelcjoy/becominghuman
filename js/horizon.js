/**
 * The Horizon Line (Scroll Progress Timeline)
 * Replaces the generic browser scrollbar with a custom canvas visualizer
 * that represents the user's journey through the content as a journey through time.
 * "A line drawn in the sand of the digital infinite."
 */

export class HorizonLine {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'horizon-canvas';
        this.canvas.className = 'fixed right-0 top-0 w-[4px] h-full z-[1000000] pointer-events-none opacity-0 transition-opacity duration-300';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.active = false;

        this.resize();
        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('scroll', () => {
            if (!this.active) {
                this.active = true;
                this.canvas.classList.remove('opacity-0');
            }
            this.draw();

            // Auto-hide after inactivity
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(() => {
                this.active = false;
                this.canvas.classList.add('opacity-0');
            }, 1000); // Hide 1s after stop
        });
    }

    resize() {
        this.width = 4; // Slim
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    draw() {
        if (!this.active) return;

        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const progress = scrollTop / docHeight;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Track (Dim)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Thumb (Glow)
        const thumbHeight = Math.max(20, (window.innerHeight / document.body.scrollHeight) * this.height);
        const thumbY = progress * (this.height - thumbHeight);

        // Dynamic Color: White -> Blue -> Purple based on depth
        // This is "The Horizon" shifting colors
        this.ctx.fillStyle = '#ffffff';

        // Soft gradient effect
        const grad = this.ctx.createLinearGradient(0, thumbY, 0, thumbY + thumbHeight);
        grad.addColorStop(0, 'rgba(255,255,255,0.8)');
        grad.addColorStop(0.5, 'rgba(255,255,255,1)');
        grad.addColorStop(1, 'rgba(255,255,255,0.8)');

        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, thumbY, this.width, thumbHeight);

        // Little "Spark" at the leading edge
        this.ctx.fillStyle = '#fff';
        this.ctx.shadowColor = '#fff';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(0, thumbY + thumbHeight - 2, this.width, 2);
        this.ctx.shadowBlur = 0;
    }
}
