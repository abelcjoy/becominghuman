/**
 * The Knowledge Cost Engine (Selection Insight)
 * Intercepts text selection events.
 * Calculates the "Biological Cost" of reading the selected text.
 * (Avg reading speed: 200wpm ≈ 300ms per word).
 * Displays a subtle tooltip showing the "Life Cost" of that knowledge.
 * "You pay for knowledge with your time."
 */

export class KnowledgeCost {
    constructor() {
        this.tooltip = null;
        this.timeout = null;
        this.init();
    }

    init() {
        this.createTooltip();

        document.addEventListener('selectionchange', () => this.handleSelection());
        document.addEventListener('mousedown', () => this.hide());
        // Handle scroll to update position? 
        // selectionchange usually fires on layout change too, but let's hide on scroll to be clean
        document.addEventListener('scroll', () => this.hide(), { passive: true });
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'fixed z-[100000] bg-black/90 border border-white/20 px-3 py-2 rounded-lg text-white text-[10px] font-mono shadow-2xl pointer-events-none opacity-0 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-full mt-[-10px]';
        // Inner structure
        this.tooltip.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="text-indigo-400">⚡</span>
                <span id="knowledge-cost">0.5s</span>
                <span class="text-stone-500">|</span>
                <span id="knowledge-words" class="text-stone-400">3 words</span>
            </div>
        `;
        document.body.appendChild(this.tooltip);
    }

    handleSelection() {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        // Threshold: Don't show for single characters or huge blocks
        if (text.length < 5 || text.length > 5000) {
            this.hide();
            return;
        }

        // Calculation
        // Avg reading speed: 200 words per minute
        // 1 word = 300ms
        // Or roughly 5 chars per word
        const words = text.split(/\s+/).length;
        const msCost = words * 300;

        let timeString;
        if (msCost < 1000) timeString = `${msCost}ms`;
        else if (msCost < 60000) timeString = `${(msCost / 1000).toFixed(1)}s`;
        else timeString = `${(msCost / 60000).toFixed(1)}m`;

        // Update UI
        document.getElementById('knowledge-cost').textContent = `${timeString} Life Cost`;
        document.getElementById('knowledge-words').textContent = `${words} words`;

        // Position
        try {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Center above selection
            this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
            this.tooltip.style.top = `${rect.top}px`;

            this.show();
        } catch (e) {
            this.hide();
        }
    }

    show() {
        // Debounce slightly 
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltip.classList.remove('opacity-0');
        }, 200);
    }

    hide() {
        clearTimeout(this.timeout);
        this.tooltip.classList.add('opacity-0');
    }
}
