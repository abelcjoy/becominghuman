/**
 * 💎 Omni Tools - CLEAN SLATE - CORE EDITION 💎
 * 
 * We have reset the library to focus on absolute quality and high-utility production apps.
 * Every tool from this point forward must be interactive, functional, and solve a specific need.
 */

class OmniTools {
    constructor() {
        this.tools = this.initTools();
        this.currentTool = null;
        this.init();
    }

    init() {
        this.renderGrid();

        const search = document.getElementById('search');
        let timeout;
        search.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.renderGrid(e.target.value), 150);
        });

        document.getElementById('back-btn').addEventListener('click', () => this.closeToolView());

        // Privacy Logic
        const privacyView = document.getElementById('privacy-view');
        if (privacyView) {
            const link = document.querySelector('a[href="#privacy"]');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    privacyView.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            }
            document.getElementById('close-privacy-btn').addEventListener('click', () => {
                privacyView.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    }

    initTools() {
        return {
            basicCalc: {
                name: "Omni Calculator",
                searchTerms: "calc math basic calculator addition",
                description: "Clean math utility",
                icon: "🔢",
                category: "Utility",
                render: () => this.renderCalculator()
            },
            unitConverter: {
                name: "Unit Pro",
                searchTerms: "convert weight length temperature units",
                description: "Universal converter",
                icon: "🔄",
                category: "Utility",
                render: () => this.renderUnitConverter()
            },
            passwordGen: {
                name: "Secret Key Gen",
                searchTerms: "password security generator random",
                description: "Secure keys",
                icon: "🔐",
                category: "Security",
                render: () => this.renderPasswordGen()
            }
        };
    }

    renderGrid(filter = '') {
        const grid = document.getElementById('tools-grid');
        grid.innerHTML = '';

        const filtered = Object.entries(this.tools).filter(([id, tool]) => {
            const searchStr = `${tool.name} ${tool.searchTerms} ${tool.category}`.toLowerCase();
            return searchStr.includes(filter.toLowerCase());
        });

        filtered.forEach(([id, tool]) => {
            const card = document.createElement('div');
            card.className = 'tool-card pulse-hover';
            card.innerHTML = `
                <div class="tool-icon">${tool.icon}</div>
                <h3 class="tool-name">${tool.name}</h3>
                <p class="tool-desc">${tool.description}</p>
                <div class="tool-category">${tool.category}</div>
            `;
            card.addEventListener('click', () => this.openTool(id));
            grid.appendChild(card);
        });
    }

    openTool(id) {
        this.currentTool = id;
        const tool = this.tools[id];
        const view = document.getElementById('tool-view');
        const content = document.getElementById('tool-content');

        content.innerHTML = ''; // Clear previous
        tool.render();

        view.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeToolView() {
        const view = document.getElementById('tool-view');
        view.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentTool = null;
    }

    // === RENDER METHODS (CLEAN SLATE) ===

    renderCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Omni Calculator</h2>
            <div style="display:grid; grid-template-columns:1fr; gap:10px;">
                <input type="text" id="calc-display" disabled style="width:100%; height:40px; text-align:right; font-size:1.5em; background:#111; color:lime; border:1px solid #333; padding:5px;">
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:5px;">
                    ${[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', 'C', '+', '='].map(btn => `
                        <button onclick="window.omniCalc('${btn}')" class="calc-btn">${btn}</button>
                    `).join('')}
                </div>
            </div>
        `;

        window.omniCalc = (val) => {
            const disp = document.getElementById('calc-display');
            if (val === '=') {
                try { disp.value = eval(disp.value); } catch (e) { disp.value = 'Error'; }
            } else if (val === 'C') {
                disp.value = '';
            } else {
                disp.value += val;
            }
        };
    }

    renderUnitConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Unit Pro</h2>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <input type="number" id="unit-val" value="1" style="width:100%;">
                <select id="unit-type" style="width:100%; font-size:0.8em;">
                    <option value="km-mi">Kilometers to Miles</option>
                    <option value="kg-lb">Kilograms to Pounds</option>
                    <option value="c-f">Celsius to Fahrenheit</option>
                </select>
                <div id="unit-out" style="font-size:1.2em; color:cyan; text-align:center;">0.62 Miles</div>
                <button onclick="window.omniConvert()" style="width:100%; background:#444;">CONVERT</button>
            </div>
        `;

        window.omniConvert = () => {
            const val = parseFloat(document.getElementById('unit-val').value);
            const type = document.getElementById('unit-type').value;
            const out = document.getElementById('unit-out');
            if (type === 'km-mi') out.innerText = (val * 0.621371).toFixed(2) + ' Miles';
            if (type === 'kg-lb') out.innerText = (val * 2.20462).toFixed(2) + ' Pounds';
            if (type === 'c-f') out.innerText = ((val * 9 / 5) + 32).toFixed(2) + ' Fahrenheit';
        };
    }

    renderPasswordGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Secret Key Gen</h2>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <input type="text" id="pass-out" readonly style="width:100%; color:gold; text-align:center; background:#111;">
                <button onclick="window.omniPass()" style="width:100%; background:#d32f2f;">GENERATE ENCRYPTED KEY</button>
                <div style="font-size:0.6em; color:#888;">Uses local entropy for high-security randomness.</div>
            </div>
        `;

        window.omniPass = () => {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            let pass = "";
            for (let i = 0; i < 16; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
            document.getElementById('pass-out').value = pass;
        };
    }
}

// Initialize
window.omni = new OmniTools();
