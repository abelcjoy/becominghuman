/**
 * The Quantum Entanglement (Singularity Enforcer)
 * "You can only live one life at a time."
 * 
 * Uses the BroadcastChannel API to ensure only ONE tab of the website is active.
 * If a new tab is opened, older tabs acknowledge the "Transfer of Consciousness"
 * and deactivate themselves (blur/dim/mute). 
 * Prevents resource hogging and reinforces the "Focus" philosophy.
 */

export class QuantumEntanglement {
    constructor() {
        this.channel = new BroadcastChannel('clarity-quantum-link');
        this.isMaster = true;
        this.id = Date.now().toString();

        this.init();
    }

    init() {
        // Announce our arrival
        this.channel.postMessage({ type: 'new-observer', id: this.id });

        // Listen for others
        this.channel.onmessage = (e) => {
            if (e.data.type === 'new-observer' && e.data.id !== this.id) {
                // Another tab opened. We are no longer the "Present".
                this.collapseWaveFunction();
            }
        };

        // If we become visible again, maybe reclaim? 
        // No, that creates fighting. We accept our fate as a background timeline.
    }

    collapseWaveFunction() {
        this.isMaster = false;

        // 1. Mute Audio
        if (window.app && window.app.soundManager) {
            window.app.soundManager.stopAll();
        }

        // 2. Pause Simulation Loops via optimization flags
        document.body.classList.add('optimize-performance'); // Re-use Flux flag

        // 3. Visual Feedback
        this.showParadoxOverlay();

        // 4. Update Title
        document.title = "Timeline Closed // Clarity";
    }

    showParadoxOverlay() {
        // Check if one exists
        if (document.getElementById('paradox-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'paradox-overlay';
        overlay.className = 'fixed inset-0 z-[9999999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 opacity-0 transition-opacity duration-1000';

        overlay.innerHTML = `
            <div class="max-w-md">
                <div class="text-indigo-500 mb-4 animate-pulse">
                    <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h2 class="text-2xl font-stoic text-white mb-2">Consciousness Transferred</h2>
                <p class="text-sm text-stone-400 font-mono leading-relaxed">
                    You have opened a new portal in another tab. <br>
                    This timeline is now dormant to preserve entropy.
                </p>
                <div class="mt-8">
                    <button id="reclaim-timeline" class="px-6 py-2 border border-white/20 hover:border-white text-white/60 hover:text-white text-xs uppercase tracking-widest transition-all">
                        Reclaim This Timeline
                    </button>
                    <p class="mt-4 text-[10px] text-stone-600">Only one observer can exist at a time.</p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Force reflow
        overlay.offsetHeight;
        overlay.classList.remove('opacity-0');

        document.getElementById('reclaim-timeline').addEventListener('click', () => {
            this.reclaim();
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.remove(), 1000);
        });
    }

    reclaim() {
        this.isMaster = true;
        document.title = "Clarity For Humans";
        document.body.classList.remove('optimize-performance');

        // Signal others to close
        this.channel.postMessage({ type: 'new-observer', id: this.id });

        if (window.toast) toast.success("Timeline Restored");
    }
}
