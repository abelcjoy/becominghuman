/**
 * The Bio-Sync Interface (Circadian Advisor)
 * "Align to your nature."
 * 
 * Analyzes the user's local time to determine their likely Circadian State.
 * Displays a non-intrusive, scientific advisory on the optimal cognitive/biological
 * strategy for the current moment.
 * 
 * - 06-09: Cortisol Awakening (Plan)
 * - 09-12: High Cognition (Work)
 * - 13-15: Energy Nadir (Reflect)
 * - 21-23: Melatonin Onset (Disconnect)
 */

export class BioSyncInterface {
    constructor() {
        this.container = null;
        this.init();

        // Update every 10 min
        setInterval(() => this.update(), 600000);
    }

    init() {
        this.createUI();
        this.update();
    }

    createUI() {
        this.container = document.createElement('div');
        this.container.id = 'bio-sync-status';
        this.container.className = 'fixed top-4 right-4 md:right-8 z-[50] flex flex-col items-end text-right pointer-events-none mix-blend-difference';

        this.container.innerHTML = `
            <div class="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Bio-Sync Status</div>
            <div id="bio-sync-message" class="text-xs font-stoic text-stone-300 max-w-[200px] leading-tight opacity-80">
                Calibrating...
            </div>
        `;

        document.body.appendChild(this.container);
    }

    update() {
        const hour = new Date().getHours();
        let status = "Stabilizing...";
        let color = "text-stone-300";

        if (hour >= 5 && hour < 9) {
            status = "Cortisol Awakening Response Active. // \nStrategic Planning Recommended.";
            color = "text-amber-200";
        } else if (hour >= 9 && hour < 13) {
            status = "Peak Neuro-Cognitive Window. // \nExecute High-Value Tasks.";
            color = "text-emerald-200";
        } else if (hour >= 13 && hour < 15) {
            status = "Circadian Nadir (Post-Prandial). // \nConsolidate Resources.";
            color = "text-stone-400";
        } else if (hour >= 15 && hour < 18) {
            status = "Secondary Alertness Spike. // \nReview and Refine.";
            color = "text-blue-200";
        } else if (hour >= 18 && hour < 21) {
            status = "Biological Dusk. // \nDim Lights. Reduce Input.";
            color = "text-orange-200";
        } else if (hour >= 21 || hour < 5) {
            status = "Melatonin Secretion Detected. // \nSleep Cycle Critical.";
            color = "text-indigo-300";
        }

        const el = document.getElementById('bio-sync-message');
        if (el) {
            el.innerHTML = status.replace('\n', '<br>');
            el.className = `text-xs font-stoic max-w-[200px] leading-tight opacity-80 transition-colors duration-1000 ${color}`;
        }
    }
}
