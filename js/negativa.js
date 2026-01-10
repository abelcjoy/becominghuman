export class ViaNegativa {
    constructor() {
        this.items = [];
        this.input = document.getElementById('negativa-input');
        this.addButton = document.getElementById('add-negativa-btn');
        this.list = document.getElementById('negativa-list');
        this.weightDisplay = document.getElementById('weight-lifted');

        this.init();
    }

    init() {
        if (!this.input || !this.addButton) return;

        this.load();

        this.addButton.addEventListener('click', () => this.addItem());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });

        this.render();
    }

    addItem() {
        const text = this.input.value.trim();
        if (!text) return;

        const item = {
            id: Date.now(),
            text: text,
            date: new Date().toISOString()
        };

        this.items.push(item);
        this.input.value = '';
        this.save();
        this.render();

        // Subtle haptic/visual feedback
        if (window.navigator.vibrate) window.navigator.vibrate(10);
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('via-negativa', JSON.stringify(this.items));
    }

    load() {
        const saved = localStorage.getItem('via-negativa');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }
    }

    render() {
        if (!this.list) return;

        this.list.innerHTML = '';

        if (this.items.length === 0) {
            this.list.innerHTML = `
                <li class="text-center text-stone-600 text-xs italic py-4">
                    Nothing removed yet. The heaviest burdens are often invisible.
                </li>
            `;
        } else {
            this.items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center bg-black/40 border border-white/5 rounded p-3 animate-fade-in group hover:border-white/20 transition-colors';
                li.innerHTML = `
                    <span class="text-stone-300 font-mono text-sm line-through decoration-white/30 decoration-2">${item.text}</span>
                    <button class="text-stone-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-2"
                        onclick="window.negativa.removeItem(${item.id})">
                        ×
                    </button>
                `;
                this.list.appendChild(li);
            });
        }

        // Update Weight
        // Arbitrary metric: 7kg per heavy burden
        const weight = this.items.length * 7;
        if (this.weightDisplay) {
            // Animate number
            this.weightDisplay.textContent = weight;
        }
    }
}
