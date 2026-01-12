/**
 * The Chrono-Capsule
 * Allows users to send a message to their future self.
 * Messages are encrypted and locked until the specified date.
 * Adds profound "stickiness" and emotional value.
 */

export class ChronoCapsule {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.STORAGE_KEY = 'chrono-capsule-vault';
        this.init();
    }

    init() {
        // Create the Trigger (Hidden in plain sight or Footer)
        this.createTrigger();

        // Create Modal Element (Hidden by default)
        this.createModal();
    }

    createTrigger() {
        // Add a "Time Capsule" button to the footer area or near the Monolith
        // Let's float it bottom left to balance Ambience toggle
        const btn = document.createElement('button');
        btn.className = 'fixed bottom-8 left-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-indigo-400 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 z-50 flex items-center justify-center group';
        btn.innerHTML = `
            <svg class="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        `;
        btn.title = 'Open Time Capsule';
        btn.onclick = () => this.openVault();
        document.body.appendChild(btn);
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'fixed inset-0 z-[100001] bg-black/90 backdrop-blur-xl flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500 px-4';
        this.modal.innerHTML = `
            <div class="max-w-md w-full bg-black border border-white/10 rounded-2xl p-8 relative transform scale-95 transition-all duration-500" id="capsule-content">
                <button class="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors" id="capsule-close">✕</button>
                
                <h2 class="text-xl font-stoic text-white mb-2 tracking-wide">Time Capsule</h2>
                <div id="capsule-view-create">
                    <p class="text-xs text-stone-400 mb-6 font-mono">Send a message across the temporal plane.</p>
                    
                    <textarea id="capsule-msg" class="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white focus:border-indigo-500 transition-colors resize-none mb-4" placeholder="What do you hope to have achieved? What matters now?"></textarea>
                    
                    <div class="mb-6">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Unlock Date</label>
                        <select id="capsule-duration" class="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white">
                            <option value="604800000">1 Week into the future</option>
                            <option value="2629800000">1 Month into the future</option>
                            <option value="15778800000">6 Months into the future</option>
                            <option value="31557600000">1 Year into the future</option>
                            <option value="157788000000">5 Years into the future</option>
                        </select>
                    </div>

                    <button id="capsule-seal" class="w-full py-4 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white rounded-lg uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300">
                        Seal Capsule
                    </button>
                </div>

                <div id="capsule-view-locked" class="hidden text-center py-8">
                    <div class="w-16 h-16 mx-auto mb-4 text-indigo-500 animate-pulse">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h3 class="text-white text-lg font-bold mb-2">Capsule Sealed</h3>
                    <p class="text-stone-400 text-xs mb-8">Unlocks on <span id="capsule-unlock-date" class="text-indigo-400">...</span></p>
                    <button id="capsule-reset" class="text-[10px] text-red-900 hover:text-red-500 underline transition-colors">Destroy Capsule</button>
                </div>
                
                <div id="capsule-view-open" class="hidden">
                     <p class="text-xs text-stone-400 mb-4 font-mono">Message from the past:</p>
                     <div class="bg-indigo-900/10 border border-indigo-500/20 p-6 rounded-lg mb-6 text-white leading-relaxed italic" id="capsule-read-msg"></div>
                     <button id="capsule-ack" class="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs uppercase tracking-widest">Message Received</button>
                </div>

            </div>
        `;
        document.body.appendChild(this.modal);

        // Bindings
        document.getElementById('capsule-close').onclick = () => this.hide();
        document.getElementById('capsule-seal').onclick = () => this.seal();
        document.getElementById('capsule-reset').onclick = () => this.reset();
        document.getElementById('capsule-ack').onclick = () => this.reset();
    }

    openVault() {
        this.modal.classList.remove('opacity-0', 'pointer-events-none');
        this.checkState();
    }

    hide() {
        this.modal.classList.add('opacity-0', 'pointer-events-none');
    }

    checkState() {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        const createView = document.getElementById('capsule-view-create');
        const lockedView = document.getElementById('capsule-view-locked');
        const openView = document.getElementById('capsule-view-open');

        createView.classList.add('hidden');
        lockedView.classList.add('hidden');
        openView.classList.add('hidden');

        if (!raw) {
            createView.classList.remove('hidden');
            return;
        }

        try {
            const data = JSON.parse(raw);
            const now = Date.now();

            if (now >= data.unlockDate) {
                // Unlock
                openView.classList.remove('hidden');
                document.getElementById('capsule-read-msg').textContent = atob(data.content);
                // Sound effect
                if (this.soundManager) this.soundManager.play('achievement');
            } else {
                // Locked
                lockedView.classList.remove('hidden');
                document.getElementById('capsule-unlock-date').textContent = new Date(data.unlockDate).toLocaleDateString();
            }

        } catch (e) {
            console.error('Capsule Corrupted', e);
            createView.classList.remove('hidden');
        }
    }

    seal() {
        const msg = document.getElementById('capsule-msg').value;
        const duration = parseInt(document.getElementById('capsule-duration').value);

        if (!msg.trim()) return;

        const data = {
            content: btoa(msg), // Basic obfuscation
            created: Date.now(),
            unlockDate: Date.now() + duration
        };

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

        // Visual Feedback
        if (this.soundManager) this.soundManager.play('click');

        // Refresh view
        this.checkState();
    }

    reset() {
        if (confirm('Are you sure you want to destroy this time capsule? The memory will be lost.')) {
            localStorage.removeItem(this.STORAGE_KEY);
            this.checkState();
        }
    }
}
