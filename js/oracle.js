/**
 * The Oracle (Neural Command Interface)
 * "Ask and you shall receive."
 * 
 * A premium, keyboard-centric Command Palette for power users.
 * Allows instant navigation, setting toggles, and feature activation.
 * Acts as a centralized "Brain" for the application.
 * 
 * Trigger: CTRL+K (Desktop) or Terminal Icon (Mobile).
 */

export class Oracle {
    constructor() {
        this.isOpen = false;
        this.selectedIndex = 0;
        this.commands = [
            { id: 'nav-sim', icon: '⚡', label: 'Enter Simulation', action: () => this.scrollTo('sim-hub') },
            { id: 'nav-grid', icon: '📅', label: 'View Life Grid', action: () => this.scrollTo('life-grid-section') },
            { id: 'nav-stats', icon: '📊', label: 'Check Projections', action: () => this.scrollTo('projection-results') },
            { id: 'act-sound', icon: '🔊', label: 'Toggle Audio', action: () => window.app.soundManager.toggleMute() },
            { id: 'act-void', icon: '🌑', label: 'Enter Void Mode', action: () => window.VoidMode.toggle() },
            { id: 'act-share', icon: '🔗', label: 'Share Philosophy', action: () => window.app.shareResult() },
            { id: 'nav-top', icon: '⬆️', label: 'Return to Now', action: () => this.scrollTo('top') }
        ];

        this.init();
    }

    init() {
        this.createGUI();
        this.bindEvents();

        // Add Mobile Trigger to Header (if not exists)
        this.addMobileTrigger();
    }

    createGUI() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 z-[10000000] bg-black/80 backdrop-blur-md flex items-start justify-center pt-[20vh] opacity-0 pointer-events-none transition-opacity duration-200';

        this.palette = document.createElement('div');
        this.palette.className = 'w-full max-w-lg bg-[#0a0a0a] border border-stone-800 rounded-xl shadow-2xl transform scale-95 transition-all duration-200 overflow-hidden flex flex-col max-h-[60vh]';

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Search neural commands...';
        this.input.className = 'w-full bg-transparent border-b border-stone-800 p-4 text-white font-mono text-sm focus:outline-none';

        this.list = document.createElement('ul');
        this.list.className = 'overflow-y-auto p-2 scrollbar-hide';

        this.palette.appendChild(this.input);
        this.palette.appendChild(this.list);
        this.overlay.appendChild(this.palette);
        document.body.appendChild(this.overlay);

        this.renderList(this.commands);
    }

    addMobileTrigger() {
        // Find a safe spot in the header/footer
        const footer = document.querySelector('footer');
        if (footer) {
            const btn = document.createElement('button');
            btn.innerHTML = '⌘'; // Command Symbol
            btn.className = 'fixed bottom-6 right-6 z-[9900] w-10 h-10 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-lg md:hidden';
            btn.onclick = () => this.toggle();
            document.body.appendChild(btn);
        }
    }

    bindEvents() {
        // Toggle (Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Click outside
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Input Filter
        this.input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = this.commands.filter(c =>
                c.label.toLowerCase().includes(term)
            );
            this.selectedIndex = 0;
            this.renderList(filtered);
        });

        // Navigation
        this.input.addEventListener('keydown', (e) => {
            const items = this.list.querySelectorAll('li');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % items.length;
                this.highlight(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
                this.highlight(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selected = items[this.selectedIndex];
                if (selected) selected.click();
            }
        });
    }

    renderList(commands) {
        this.list.innerHTML = '';
        commands.forEach((cmd, index) => {
            const li = document.createElement('li');
            li.className = `flex items-center gap-3 p-3 rounded-lg cursor-pointer text-sm text-stone-400 hover:bg-white/5 hover:text-white transition-colors ${index === this.selectedIndex ? 'bg-white/5 text-white' : ''}`;
            li.innerHTML = `
                <span class="text-lg opacity-70">${cmd.icon}</span>
                <span class="flex-1 font-medium">${cmd.label}</span>
                <span class="text-[10px] opacity-30 font-mono">↵</span>
            `;
            li.onclick = () => {
                this.execute(cmd);
            };
            this.list.appendChild(li);
        });
    }

    highlight(items) {
        items.forEach((item, i) => {
            if (i === this.selectedIndex) {
                item.classList.add('bg-white/5', 'text-white');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('bg-white/5', 'text-white');
            }
        });
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    open() {
        this.isOpen = true;
        this.overlay.classList.remove('opacity-0', 'pointer-events-none');
        this.palette.classList.remove('scale-95');
        this.input.value = '';
        this.input.focus();
        this.selectedIndex = 0;
        this.renderList(this.commands);

        // Pause underlying interactions
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.add('opacity-0', 'pointer-events-none');
        this.palette.classList.add('scale-95');
        document.body.style.overflow = '';
    }

    execute(cmd) {
        this.close();
        // Slight delay for animation
        setTimeout(() => {
            cmd.action();
            if (window.toast) toast.success(`Executed: ${cmd.label}`);
        }, 100);
    }

    scrollTo(id) {
        if (id === 'top') {
            window.scrollTo(0, 0);
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
}
