export class WallpaperGenerator {
    constructor(app) {
        this.app = app;
        this.btn = document.getElementById('create-wallpaper-btn');
        this.init();
    }

    init() {
        if (!this.btn) return;
        this.btn.addEventListener('click', () => this.generate());
    }

    generate() {
        // Create high-res canvas for mobile wallpaper
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');

        // 1. Fill Background (Void Black)
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Grain Effect (Simulated)
        // Skipping complex grain for performance, using subtle variations

        // 3. Calculate Life Stats
        const now = new Date();
        const target = this.app.targetDate || new Date(now.getFullYear() + 50, 0, 1);
        const msLeft = Math.max(0, target - now);
        const weeks = Math.floor(msLeft / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));

        // 4. Typography
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Big Number
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 240px "Times New Roman", serif';
        ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
        ctx.shadowBlur = 40;
        ctx.fillText(weeks.toLocaleString(), canvas.width / 2, canvas.height / 2 - 100);
        ctx.shadowBlur = 0; // Reset

        // Label
        ctx.fillStyle = '#888888';
        ctx.font = '300 30px "Arial", sans-serif'; // Tracking simulated by spaces? No, simplified.
        ctx.fillText('WEEKS REMAINING', canvas.width / 2, canvas.height / 2 + 80);

        // Memento Mori Quote
        ctx.fillStyle = '#444444';
        ctx.font = 'italic 24px "Times New Roman", serif';
        ctx.fillText('"You could leave life right now."', canvas.width / 2, canvas.height / 2 + 150);

        // Date
        ctx.fillStyle = '#333333';
        ctx.font = '20px monospace';
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        ctx.fillText(`GENERATED ${dateStr.toUpperCase()}`, canvas.width / 2, canvas.height - 150);

        // Branding
        ctx.fillStyle = '#222222';
        ctx.fillText('CLARITYFORHUMANS.COM', canvas.width / 2, canvas.height - 100);

        // 5. Trigger Download
        try {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `memento-mori-${weeks}-weeks.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (window.toast) toast.success('Wallpaper generated. Check your downloads.');
        } catch (e) {
            console.error('Wallpaper gen error', e);
            if (window.toast) toast.error('Could not generate wallpaper.');
        }
    }
}
