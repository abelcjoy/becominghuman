/**
 * Omni Tools - Simplified & Optimized
 * Clean, fast, accessible
 */

class OmniTools {
    constructor() {
        this.tools = this.initTools();
        this.currentTool = null;
        this.init();
    }

    init() {
        // Render initial grid
        this.renderGrid();

        // Search handler with debounce
        const search = document.getElementById('search');
        let timeout;
        search.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.renderGrid(e.target.value), 150);
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => this.closeToolView());
    }

    initTools() {
        return {
            wordCounter: {
                name: "Word Counter",
                searchTerms: "word count character letter text",
                description: "Count words, characters, and reading time",
                icon: "📝",
                category: "Text",
                render: () => this.renderWordCounter()
            },
            calculator: {
                name: "Calculator",
                searchTerms: "calc math calculate percentage percent",
                description: "Basic calculator and percentage calculations",
                icon: "🔢",
                category: "Math",
                render: () => this.renderCalculator()
            },
            bmi: {
                name: "BMI Calculator",
                searchTerms: "bmi body mass index health weight",
                description: "Calculate your Body Mass Index",
                icon: "⚖️",
                category: "Health",
                render: () => this.renderBMI()
            },
            caseConverter: {
                name: "Case Converter",
                searchTerms: "uppercase lowercase title case text transform",
                description: "Convert text between different cases",
                icon: "🔠",
                category: "Text",
                render: () => this.renderCaseConverter()
            },
            passwordGenerator: {
                name: "Password Generator",
                searchTerms: "password generator random secure",
                description: "Generate secure random passwords",
                icon: "🔐",
                category: "Security",
                render: () => this.renderPasswordGenerator()
            },
            colorPicker: {
                name: "Color Picker",
                searchTerms: "color picker hex rgb palette",
                description: "Pick and convert colors between formats",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorPicker()
            },
            base64: {
                name: "Base64 Encoder",
                searchTerms: "base64 encode decode convert",
                description: "Encode and decode Base64 strings",
                icon: "💾",
                category: "Developer",
                render: () => this.renderBase64()
            },
            jsonFormatter: {
                name: "JSON Formatter",
                searchTerms: "json format validate pretty print",
                description: "Format and validate JSON data",
                icon: "{ }",
                category: "Developer",
                render: () => this.renderJSON()
            },
            urlEncoder: {
                name: "URL Encoder",
                searchTerms: "url encode decode uri",
                description: "Encode and decode URLs",
                icon: "🔗",
                category: "Developer",
                render: () => this.renderURLEncoder()
            },
            markdown: {
                name: "Markdown Preview",
                searchTerms: "markdown preview md",
                description: "Preview markdown formatting",
                icon: "📄",
                category: "Text",
                render: () => this.renderMarkdown()
            }
        };
    }

    renderGrid(filter = '') {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';

        const f = filter.toLowerCase().trim();
        let count = 0;

        Object.entries(this.tools).forEach(([id, tool]) => {
            // Search logic
            if (f) {
                const searchable = `${tool.name} ${tool.searchTerms} ${tool.description} ${tool.category}`.toLowerCase();
                if (!searchable.includes(f)) return;
            }

            count++;
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => this.openTool(id);

            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <div class="card-category">${tool.category}</div>
                        <div class="card-title">${tool.name}</div>
                    </div>
                    <div class="card-icon">${tool.icon}</div>
                </div>
                <div class="card-desc">${tool.description}</div>
            `;

            grid.appendChild(card);
        });

        if (count === 0) {
            grid.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">No tools found. Try a different search.</p>';
        }
    }

    openTool(id) {
        const tool = this.tools[id];
        if (!tool) return;

        this.currentTool = id;
        document.getElementById('tool-view').classList.add('active');
        document.body.style.overflow = 'hidden';

        try {
            tool.render();
        } catch (error) {
            console.error('Tool render error:', error);
            document.getElementById('tool-content').innerHTML = `
                <div class="result" style="border-color: #f00; color: #f00;">
                    Error loading tool. Please try again.
                </div>
            `;
        }
    }

    closeToolView() {
        document.getElementById('tool-view').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentTool = null;
    }

    // === TOOL RENDERERS ===

    renderWordCounter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Word Counter</h2>
            <textarea id="text-input" rows="10" placeholder="Paste or type your text here..."></textarea>
            <div class="result">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px;">
                    <div>
                        <div style="font-size: 32px; font-weight: bold;" id="word-count">0</div>
                        <div style="font-size: 12px; color: #666;">WORDS</div>
                    </div>
                    <div>
                        <div style="font-size: 32px; font-weight: bold;" id="char-count">0</div>
                        <div style="font-size: 12px; color: #666;">CHARACTERS</div>
                    </div>
                    <div>
                        <div style="font-size: 32px; font-weight: bold;" id="read-time">0</div>
                        <div style="font-size: 12px; color: #666;">MIN READ</div>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('text-input');
        input.addEventListener('input', () => {
            const text = input.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            const readTime = Math.ceil(words / 200);

            document.getElementById('word-count').textContent = words;
            document.getElementById('char-count').textContent = chars;
            document.getElementById('read-time').textContent = readTime;
        });
    }

    renderCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Calculator</h2>
            <div style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 15px;">Percentage Calculator</h3>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <span>What is</span>
                    <input type="number" id="percent" style="width: 100px;" placeholder="10">
                    <span>% of</span>
                    <input type="number" id="value" style="width: 120px;" placeholder="100">
                    <span>?</span>
                </div>
                <div class="result" id="calc-result">0</div>
            </div>
        `;

        const calc = () => {
            const percent = parseFloat(document.getElementById('percent').value) || 0;
            const value = parseFloat(document.getElementById('value').value) || 0;
            const result = (percent / 100) * value;
            document.getElementById('calc-result').textContent = result.toFixed(2);
        };

        document.getElementById('percent').addEventListener('input', calc);
        document.getElementById('value').addEventListener('input', calc);
    }

    renderBMI() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">BMI Calculator</h2>
            <input type="number" id="weight" placeholder="Weight (kg)" step="0.1">
            <input type="number" id="height" placeholder="Height (cm)" step="0.1">
            <button id="calc-bmi">Calculate BMI</button>
            <div class="result" id="bmi-result" style="display: none;"></div>
        `;

        document.getElementById('calc-bmi').addEventListener('click', () => {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;

            if (!weight || !height) {
                alert('Please enter both weight and height');
                return;
            }

            const bmi = weight / (height * height);
            let category = '';

            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';

            const result = document.getElementById('bmi-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;">${bmi.toFixed(1)}</div>
                <div style="font-size: 18px; color: #999;">${category}</div>
            `;
        });
    }

    renderCaseConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Case Converter</h2>
            <textarea id="case-input" rows="6" placeholder="Enter text to convert..."></textarea>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 20px;">
                <button id="upper">UPPERCASE</button>
                <button id="lower">lowercase</button>
                <button id="title">Title Case</button>
                <button id="sentence">Sentence case</button>
            </div>
            <div class="result" id="case-output" style="min-height: 100px; text-align: left;"></div>
        `;

        const input = document.getElementById('case-input');
        const output = document.getElementById('case-output');

        document.getElementById('upper').onclick = () => output.textContent = input.value.toUpperCase();
        document.getElementById('lower').onclick = () => output.textContent = input.value.toLowerCase();
        document.getElementById('title').onclick = () => {
            output.textContent = input.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        };
        document.getElementById('sentence').onclick = () => {
            output.textContent = input.value.toLowerCase().replace(/(^\w|\.\s+\w)/g, l => l.toUpperCase());
        };
    }

    renderPasswordGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Password Generator</h2>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px;">
                    Length: <span id="length-display">16</span>
                    <input type="range" id="length" min="8" max="64" value="16" style="width: 100%; margin-top: 10px;">
                </label>
            </div>
            <button id="generate">Generate Password</button>
            <div class="result" id="password" style="font-family: monospace; font-size: 20px; word-break: break-all; cursor: pointer;" title="Click to copy">
                Click generate
            </div>
        `;

        const lengthSlider = document.getElementById('length');
        const lengthDisplay = document.getElementById('length-display');

        lengthSlider.addEventListener('input', () => {
            lengthDisplay.textContent = lengthSlider.value;
        });

        document.getElementById('generate').addEventListener('click', () => {
            const length = parseInt(lengthSlider.value);
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            let password = '';

            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            const output = document.getElementById('password');
            output.textContent = password;

            output.onclick = () => {
                navigator.clipboard.writeText(password);
                output.style.borderColor = '#0f0';
                setTimeout(() => output.style.borderColor = '#333', 1000);
            };
        });
    }

    renderColorPicker() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Picker</h2>
            <input type="color" id="color" value="#3b82f6" style="width: 100%; height: 100px; cursor: pointer;">
            <div class="result" id="color-values" style="text-align: left;"></div>
        `;

        const updateColor = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            document.getElementById('color-values').innerHTML = `
                <div style="margin-bottom: 10px;"><strong>HEX:</strong> ${hex.toUpperCase()}</div>
                <div style="margin-bottom: 10px;"><strong>RGB:</strong> rgb(${r}, ${g}, ${b})</div>
                <div><strong>HSL:</strong> (calculated from RGB)</div>
            `;
        };

        document.getElementById('color').addEventListener('input', (e) => updateColor(e.target.value));
        updateColor('#3b82f6');
    }

    renderBase64() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Base64 Encoder/Decoder</h2>
            <textarea id="base64-input" rows="5" placeholder="Enter text or Base64..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="encode">Encode</button>
                <button id="decode">Decode</button>
            </div>
            <div class="result" id="base64-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('encode').onclick = () => {
            const input = document.getElementById('base64-input').value;
            try {
                document.getElementById('base64-output').textContent = btoa(input);
            } catch (e) {
                document.getElementById('base64-output').textContent = 'Error: Invalid input';
            }
        };

        document.getElementById('decode').onclick = () => {
            const input = document.getElementById('base64-input').value;
            try {
                document.getElementById('base64-output').textContent = atob(input);
            } catch (e) {
                document.getElementById('base64-output').textContent = 'Error: Invalid Base64';
            }
        };
    }

    renderJSON() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">JSON Formatter</h2>
            <textarea id="json-input" rows="8" placeholder='{"key": "value"}'></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="format">Format</button>
                <button id="minify">Minify</button>
            </div>
            <div class="result" id="json-output" style="min-height: 150px; text-align: left; white-space: pre; font-family: monospace; font-size: 14px; overflow-x: auto;"></div>
        `;

        document.getElementById('format').onclick = () => {
            try {
                const input = document.getElementById('json-input').value;
                const parsed = JSON.parse(input);
                document.getElementById('json-output').textContent = JSON.stringify(parsed, null, 2);
            } catch (e) {
                document.getElementById('json-output').textContent = 'Error: ' + e.message;
            }
        };

        document.getElementById('minify').onclick = () => {
            try {
                const input = document.getElementById('json-input').value;
                const parsed = JSON.parse(input);
                document.getElementById('json-output').textContent = JSON.stringify(parsed);
            } catch (e) {
                document.getElementById('json-output').textContent = 'Error: ' + e.message;
            }
        };
    }

    renderURLEncoder() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">URL Encoder/Decoder</h2>
            <textarea id="url-input" rows="5" placeholder="Enter URL or encoded string..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="url-encode">Encode</button>
                <button id="url-decode">Decode</button>
            </div>
            <div class="result" id="url-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('url-encode').onclick = () => {
            const input = document.getElementById('url-input').value;
            document.getElementById('url-output').textContent = encodeURIComponent(input);
        };

        document.getElementById('url-decode').onclick = () => {
            try {
                const input = document.getElementById('url-input').value;
                document.getElementById('url-output').textContent = decodeURIComponent(input);
            } catch (e) {
                document.getElementById('url-output').textContent = 'Error: Invalid encoded string';
            }
        };
    }

    renderMarkdown() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Markdown Preview</h2>
            <textarea id="md-input" rows="10" placeholder="# Heading\n\n**Bold** and *italic*\n\n- List item"></textarea>
            <div class="result" id="md-output" style="min-height: 200px; text-align: left;"></div>
        `;

        const input = document.getElementById('md-input');
        const output = document.getElementById('md-output');

        const simpleMarkdown = (text) => {
            return text
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/^\- (.*$)/gim, '<li>$1</li>')
                .replace(/\n/gim, '<br>');
        };

        input.addEventListener('input', () => {
            output.innerHTML = simpleMarkdown(input.value);
        });
    }
}

// Initialize
new OmniTools();
