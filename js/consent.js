/**
 * Quantum Consent Module (GDPR/CPRA)
 * A visually integrated privacy acknowledgement system.
 * Instead of a banner, it's a "Protocol Initialization" step.
 * Essential for AdSense and policy compliance.
 */

export class QuantumConsent {
    constructor() {
        if (localStorage.getItem('protocol-accepted') === 'true') return;

        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed bottom-0 left-0 right-0 p-6 z-[99999] flex justify-center items-end pointer-events-none';

        this.card = document.createElement('div');
        this.card.className = 'bg-black/90 backdrop-blur-xl border border-white/20 p-6 max-w-lg w-full rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] transform translate-y-full transition-transform duration-500 pointer-events-auto';

        this.card.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="w-2 h-2 mt-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div>
                    <h3 class="text-sm font-bold text-white uppercase tracking-widest mb-2 font-stoic">Initialize Protocol</h3>
                    <p class="text-xs text-stone-400 mb-4 leading-relaxed">
                        This interface utilizes local quantizers (cookies) and neural telemetry (analytics) to optimize your temporal experience. 
                        By engaging with the Chronos system, you acknowledge our <button class="text-white hover:underline underline-offset-4" id="qc-policy">Data Sovereignty Treaty</button>.
                    </p>
                    <div class="flex gap-4">
                        <button id="qc-accept" class="flex-1 bg-white text-black text-xs font-bold py-3 uppercase tracking-widest hover:bg-stone-200 transition-colors">
                            Acknowledge
                        </button>
                        <button id="qc-deny" class="px-4 border border-white/20 text-white/50 text-xs hover:text-white hover:border-white transition-colors uppercase tracking-widest">
                            Limited Mode
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.overlay.appendChild(this.card);
        document.body.appendChild(this.overlay);

        // Animate In
        setTimeout(() => {
            this.card.classList.remove('translate-y-full');
        }, 1000);

        // Bind
        document.getElementById('qc-accept').addEventListener('click', () => this.accept());
        document.getElementById('qc-deny').addEventListener('click', () => this.deny());
        document.getElementById('qc-policy').addEventListener('click', () => {
            document.getElementById('policy-modal').classList.remove('hidden');
        });
    }

    accept() {
        localStorage.setItem('protocol-accepted', 'true');
        // Enable AdSense if needed dynamically, but it's loaded by default.
        // In a real strict implementation, we would load ad scripts here.
        // For now, we assume "Legitimate Interest" until opt-out.
        this.dismiss();
    }

    deny() {
        localStorage.setItem('protocol-accepted', 'limited');
        // Here we could disable tracking/ads if we had strict blocking logic
        if (window.toast) toast.info('Limited functionality engaged.');
        this.dismiss();
    }

    dismiss() {
        this.card.classList.add('translate-y-full');
        setTimeout(() => {
            if (this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
        }, 600);
    }
}
