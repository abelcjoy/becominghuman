/**
 * The Omni-Protocol Manager
 * Handles the logic for various browser-based utilities
 * 100% Client-Side, 0% Server.
 */

export class OmniProtocol {
    constructor(app) {
        this.app = app;
        this.tools = {
            wordCounter: {
                name: "Lexicon Auditor",
                description: "Real-time word and character frequency analysis.",
                icon: "🖋️",
                category: "Utility",
                volume: "High",
                render: () => this.renderWordCounter()
            },
            percentageCalc: {
                name: "Ratio Engine",
                description: "Solve any percentage relationship instantly.",
                icon: "📊",
                category: "Math",
                volume: "Extreme",
                render: () => this.renderPercentageCalc()
            },
            bmiCalc: {
                name: "Bio-Mass Index",
                description: "Actuarial health assessment based on WHO standards.",
                icon: "⚖️",
                category: "Health",
                volume: "Very High",
                render: () => this.renderBMICalc()
            },
            emiCalc: {
                name: "Debt Horizon",
                description: "Visualize loan interest and repayment timelines.",
                icon: "🏦",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderEMICalc()
            },
            caseConverter: {
                name: "Syntax Shifter",
                description: "Uppercase, lowercase, titlecase, and camelCase conversion.",
                icon: "🔠",
                category: "Utility",
                volume: "High",
                render: () => this.renderCaseConverter()
            },
            passwordGen: {
                name: "Entropy Forge",
                description: "Cryptographically secure password generation protocol.",
                icon: "🔐",
                category: "Security",
                volume: "High",
                render: () => this.renderPasswordGen()
            },
            countdownTimer: {
                name: "Temporal Anchor",
                description: "Precise countdown for mission-critical tasks.",
                icon: "⏱️",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderTimer()
            }
        };
    }

    init() {
        // Initialization if needed
    }

    renderGrid() {
        const container = document.getElementById('omni-grid');
        if (!container) return;

        container.innerHTML = '';
        Object.keys(this.tools).forEach(id => {
            const tool = this.tools[id];
            const card = document.createElement('div');
            card.className = "group relative p-8 bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden";
            card.onclick = () => this.openTool(id);

            card.innerHTML = `
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity text-4xl">${tool.icon}</div>
                <div class="relative z-10">
                    <div class="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-4 font-mono">${tool.category}</div>
                    <h3 class="text-xl font-bold text-white mb-2 font-['Cinzel']">${tool.name}</h3>
                    <p class="text-sm text-stone-400 font-light leading-relaxed mb-6">${tool.description}</p>
                    <div class="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        <span>Initialize Protocol</span>
                        <span class="transform group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                </div>
                <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            `;
            container.appendChild(card);
        });
    }

    openTool(id) {
        const tool = this.tools[id];
        if (!tool) return;

        // Hide grid, show tool container
        document.getElementById('omni-grid-view').classList.add('hidden');
        const view = document.getElementById('omni-tool-view');
        view.classList.remove('hidden');

        // Render specific tool
        tool.render();

        if (this.app.haptics) this.app.haptics.impact('light');
        if (this.app.soundManager) this.app.soundManager.play('click');
    }

    closeTool() {
        document.getElementById('omni-grid-view').classList.remove('hidden');
        document.getElementById('omni-tool-view').classList.add('hidden');
    }

    // --- Tool Renderers ---

    renderWordCounter() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-8 text-center tracking-widest">Lexicon Auditor</h2>
                <textarea id="word-input" placeholder="Paste your transmission here..." class="w-full h-64 bg-black border border-white/10 rounded-lg p-6 text-stone-300 focus:border-white focus:outline-none transition-colors mb-8 font-mono"></textarea>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="word-count" class="text-3xl font-bold font-mono">0</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Words</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="char-count" class="text-3xl font-bold font-mono">0</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Characters</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="reading-time" class="text-3xl font-bold font-mono">0<span class="text-xs">m</span></div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Read Time</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="para-count" class="text-3xl font-bold font-mono">0</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Paragraphs</div>
                    </div>
                </div>
            </div>
        `;

        const textarea = document.getElementById('word-input');
        textarea.addEventListener('input', () => {
            const text = textarea.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            const paragraphs = text ? text.split(/\n+/).length : 0;
            const readTime = Math.ceil(words / 200);

            document.getElementById('word-count').innerText = words;
            document.getElementById('char-count').innerText = chars;
            document.getElementById('para-count').innerText = paragraphs;
            document.getElementById('reading-time').innerHTML = `${readTime}<span class="text-xs">m</span>`;
        });
    }

    renderPercentageCalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Ratio Engine</h2>
                <div class="space-y-12">
                    <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-light">
                        <span>What is</span>
                        <input type="number" id="perc-1" class="w-24 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="10">
                        <span>% of</span>
                        <input type="number" id="val-1" class="w-32 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="100">
                        <span>?</span>
                        <span class="text-white font-bold ml-4">=</span>
                        <span id="res-1" class="text-green-400 font-bold font-mono ml-4 text-3xl">0</span>
                    </div>

                    <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-light">
                        <input type="number" id="val-2a" class="w-24 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="20">
                        <span>is what % of</span>
                        <input type="number" id="val-2b" class="w-32 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="100">
                        <span>?</span>
                        <span class="text-white font-bold ml-4">=</span>
                        <span id="res-2" class="text-green-400 font-bold font-mono ml-4 text-3xl">0%</span>
                    </div>
                </div>
            </div>
        `;

        const update1 = () => {
            const p = parseFloat(document.getElementById('perc-1').value) || 0;
            const v = parseFloat(document.getElementById('val-1').value) || 0;
            document.getElementById('res-1').innerText = ((p / 100) * v).toFixed(2).replace(/\.00$/, '');
        };

        const update2 = () => {
            const a = parseFloat(document.getElementById('val-2a').value) || 0;
            const b = parseFloat(document.getElementById('val-2b').value) || 0;
            const res = b ? (a / b) * 100 : 0;
            document.getElementById('res-2').innerText = res.toFixed(2).replace(/\.00$/, '') + '%';
        };

        document.getElementById('perc-1').addEventListener('input', update1);
        document.getElementById('val-1').addEventListener('input', update1);
        document.getElementById('val-2a').addEventListener('input', update2);
        document.getElementById('val-2b').addEventListener('input', update2);
    }

    renderBMICalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Bio-Mass Index</h2>
                <div class="space-y-8">
                    <div class="group">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Height (cm)</label>
                        <input type="number" id="bmi-height" class="w-full bg-black border border-white/10 p-4 rounded-lg focus:border-white focus:outline-none text-center text-2xl font-mono">
                    </div>
                    <div class="group">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Weight (kg)</label>
                        <input type="number" id="bmi-weight" class="w-full bg-black border border-white/10 p-4 rounded-lg focus:border-white focus:outline-none text-center text-2xl font-mono">
                    </div>
                    <div class="pt-8">
                        <div id="bmi-result" class="text-6xl font-bold font-mono mb-2">0.0</div>
                        <div id="bmi-status" class="text-xs uppercase tracking-[0.5em] text-stone-500">Awaiting Data</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const h = parseFloat(document.getElementById('bmi-height').value) / 100;
            const w = parseFloat(document.getElementById('bmi-weight').value);
            if (h > 0 && w > 0) {
                const bmi = w / (h * h);
                document.getElementById('bmi-result').innerText = bmi.toFixed(1);
                let status = "Normal";
                let color = "text-green-400";
                if (bmi < 18.5) { status = "Underweight"; color = "text-yellow-400"; }
                else if (bmi >= 25 && bmi < 30) { status = "Overweight"; color = "text-yellow-400"; }
                else if (bmi >= 30) { status = "Obese"; color = "text-red-500"; }

                const statusEl = document.getElementById('bmi-status');
                statusEl.innerText = status;
                statusEl.className = `text-xs uppercase tracking-[0.5em] ${color}`;
            }
        };

        document.getElementById('bmi-height').addEventListener('input', update);
        document.getElementById('bmi-weight').addEventListener('input', update);
    }

    renderEMICalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
             <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Debt Horizon</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Principal Amount ($)</label>
                        <input type="number" id="emi-p" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Annual Interest (%)</label>
                        <input type="number" id="emi-r" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Tenure (Years)</label>
                        <input type="number" id="emi-t" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Monthly Installment</div>
                        <div id="emi-res" class="text-5xl font-bold font-mono text-white">$0.00</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Total Interest Payable</div>
                        <div id="emi-interest" class="text-xl font-mono text-stone-400">$0.00</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const p = parseFloat(document.getElementById('emi-p').value) || 0;
            const r = (parseFloat(document.getElementById('emi-r').value) || 0) / 12 / 100;
            const n = (parseFloat(document.getElementById('emi-t').value) || 0) * 12;

            if (p > 0 && r > 0 && n > 0) {
                const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
                const total = emi * n;
                const interest = total - p;

                document.getElementById('emi-res').innerText = `$${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                document.getElementById('emi-interest').innerText = `$${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
        };

        ['emi-p', 'emi-r', 'emi-t'].forEach(id => document.getElementById(id).addEventListener('input', update));
    }

    renderPasswordGen() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Entropy Forge</h2>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg mb-8">
                    <div id="pass-display" class="text-2xl font-mono text-green-400 break-all mb-4">Click Generate</div>
                    <button id="pass-copy" class="text-[10px] uppercase tracking-widest text-stone-500 hover:text-white transition-colors">Copy to Clipboard</button>
                </div>
                <div class="space-y-4">
                    <input type="range" id="pass-length" min="8" max="64" value="16" class="w-full accent-white">
                    <div class="flex justify-between text-[10px] uppercase tracking-widest text-stone-500">
                        <span>Length</span>
                        <span id="len-label">16</span>
                    </div>
                    <button id="pass-gen-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-all">Generate Protocol</button>
                </div>
            </div>
        `;

        const generate = () => {
            const length = document.getElementById('pass-length').value;
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
            let retVal = "";
            const values = new Uint32Array(length);
            window.crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                retVal += charset.charAt(values[i] % charset.length);
            }
            document.getElementById('pass-display').innerText = retVal;
            document.getElementById('len-label').innerText = length;
        };

        document.getElementById('pass-gen-btn').onclick = generate;
        document.getElementById('pass-length').oninput = (e) => { document.getElementById('len-label').innerText = e.target.value; };
        document.getElementById('pass-copy').onclick = () => {
            navigator.clipboard.writeText(document.getElementById('pass-display').innerText);
            if (window.toast) toast.success("Entropy copied to clipboard.");
        };
    }

    renderTimer() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Temporal Anchor</h2>
                <div id="timer-display" class="text-8xl font-bold font-mono text-white mb-12">00:00:00</div>
                <div class="flex gap-4 justify-center mb-8">
                    <input type="number" id="timer-m" placeholder="Min" class="w-20 bg-black border border-white/10 p-2 text-center text-xl font-mono focus:border-white focus:outline-none">
                    <input type="number" id="timer-s" placeholder="Sec" class="w-20 bg-black border border-white/10 p-2 text-center text-xl font-mono focus:border-white focus:outline-none">
                </div>
                <div class="flex gap-4">
                    <button id="timer-start" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Start</button>
                    <button id="timer-stop" class="flex-1 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-lg">Reset</button>
                </div>
            </div>
        `;

        let interval;
        let totalSec = 0;

        const updateDisplay = () => {
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            const s = totalSec % 60;
            document.getElementById('timer-display').innerText =
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        document.getElementById('timer-start').onclick = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
                document.getElementById('timer-start').innerText = "Start";
                return;
            }
            const min = parseInt(document.getElementById('timer-m').value) || 0;
            const sec = parseInt(document.getElementById('timer-s').value) || 0;
            if (totalSec === 0) totalSec = (min * 60) + sec;

            if (totalSec > 0) {
                document.getElementById('timer-start').innerText = "Pause";
                interval = setInterval(() => {
                    totalSec--;
                    updateDisplay();
                    if (totalSec <= 0) {
                        clearInterval(interval);
                        interval = null;
                        document.getElementById('timer-start').innerText = "Start";
                        if (this.app.soundManager) this.app.soundManager.play('achievement');
                    }
                }, 1000);
            }
        };

        document.getElementById('timer-stop').onclick = () => {
            clearInterval(interval);
            interval = null;
            totalSec = 0;
            updateDisplay();
            document.getElementById('timer-start').innerText = "Start";
        };
    }

    renderCaseConverter() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-8 text-center tracking-widest">Syntax Shifter</h2>
                <textarea id="case-input" placeholder="Enter text to transform..." class="w-full h-48 bg-black border border-white/10 rounded-lg p-6 text-stone-300 focus:border-white focus:outline-none transition-colors mb-8 font-mono"></textarea>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button id="case-upper" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">UPPERCASE</button>
                    <button id="case-lower" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">lowercase</button>
                    <button id="case-title" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">Title Case</button>
                    <button id="case-sentence" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">Sentence case</button>
                </div>
            </div>
        `;

        const input = document.getElementById('case-input');

        document.getElementById('case-upper').onclick = () => { input.value = input.value.toUpperCase(); };
        document.getElementById('case-lower').onclick = () => { input.value = input.value.toLowerCase(); };
        document.getElementById('case-title').onclick = () => {
            input.value = input.value.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        };
        document.getElementById('case-sentence').onclick = () => {
            input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
        };
    }
}
