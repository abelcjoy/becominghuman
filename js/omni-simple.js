/**
 * Omni Tools - Clean & Working
 * 30 fully functional tools
 * - 10 Original tools
 * - 8 Calculators (Tip, Loan, Age, Discount, Compound Interest, Percentage Change, Tax, Mortgage)
 * - 6 Converters (Temperature, Length, Weight, Currency, Time Zone, Speed)
 * - 6 Text Tools (Reverse, Sort, Find/Replace, Duplicate Remover, Line Counter, Text Diff)
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
            },
            // === CALCULATORS (8) ===
            tipCalculator: {
                name: "Tip Calculator",
                searchTerms: "tip gratuity restaurant bill split",
                description: "Calculate tips and split bills",
                icon: "💰",
                category: "Calculator",
                render: () => this.renderTipCalculator()
            },
            loanCalculator: {
                name: "Loan Calculator",
                searchTerms: "loan payment interest monthly emi",
                description: "Calculate loan payments and interest",
                icon: "🏦",
                category: "Calculator",
                render: () => this.renderLoanCalculator()
            },
            ageCalculator: {
                name: "Age Calculator",
                searchTerms: "age birthday years old date",
                description: "Calculate exact age from birthdate",
                icon: "🎂",
                category: "Calculator",
                render: () => this.renderAgeCalculator()
            },
            discountCalculator: {
                name: "Discount Calculator",
                searchTerms: "discount sale price savings percentage",
                description: "Calculate discounted prices",
                icon: "🏷️",
                category: "Calculator",
                render: () => this.renderDiscountCalculator()
            },
            compoundInterest: {
                name: "Compound Interest",
                searchTerms: "compound interest investment savings growth",
                description: "Calculate compound interest growth",
                icon: "📈",
                category: "Calculator",
                render: () => this.renderCompoundInterest()
            },
            percentageChange: {
                name: "Percentage Change",
                searchTerms: "percentage change increase decrease difference",
                description: "Calculate percentage increase/decrease",
                icon: "📊",
                category: "Calculator",
                render: () => this.renderPercentageChange()
            },
            taxCalculator: {
                name: "Tax Calculator",
                searchTerms: "tax vat gst sales calculate",
                description: "Calculate tax on amounts",
                icon: "🧾",
                category: "Calculator",
                render: () => this.renderTaxCalculator()
            },
            mortgageCalculator: {
                name: "Mortgage Calculator",
                searchTerms: "mortgage home loan payment monthly",
                description: "Calculate mortgage payments",
                icon: "🏠",
                category: "Calculator",
                render: () => this.renderMortgageCalculator()
            },
            // === CONVERTERS (6) ===
            temperatureConverter: {
                name: "Temperature Converter",
                searchTerms: "temperature celsius fahrenheit kelvin convert",
                description: "Convert between temperature units",
                icon: "🌡️",
                category: "Converter",
                render: () => this.renderTemperatureConverter()
            },
            lengthConverter: {
                name: "Length Converter",
                searchTerms: "length distance meter feet inch cm convert",
                description: "Convert between length units",
                icon: "📏",
                category: "Converter",
                render: () => this.renderLengthConverter()
            },
            weightConverter: {
                name: "Weight Converter",
                searchTerms: "weight mass kg pound gram convert",
                description: "Convert between weight units",
                icon: "⚖️",
                category: "Converter",
                render: () => this.renderWeightConverter()
            },
            currencyConverter: {
                name: "Currency Converter",
                searchTerms: "currency money exchange rate convert usd eur",
                description: "Convert between currencies",
                icon: "💱",
                category: "Converter",
                render: () => this.renderCurrencyConverter()
            },
            timeZoneConverter: {
                name: "Time Zone Converter",
                searchTerms: "time zone timezone convert world clock",
                description: "Convert between time zones",
                icon: "🌍",
                category: "Converter",
                render: () => this.renderTimeZoneConverter()
            },
            speedConverter: {
                name: "Speed Converter",
                searchTerms: "speed velocity kmh mph convert",
                description: "Convert between speed units",
                icon: "🚀",
                category: "Converter",
                render: () => this.renderSpeedConverter()
            },
            // === TEXT TOOLS (6) ===
            textReverse: {
                name: "Text Reverser",
                searchTerms: "reverse text backwards flip",
                description: "Reverse text or words",
                icon: "🔄",
                category: "Text",
                render: () => this.renderTextReverse()
            },
            textSort: {
                name: "Text Sorter",
                searchTerms: "sort lines alphabetical order text",
                description: "Sort lines alphabetically",
                icon: "🔤",
                category: "Text",
                render: () => this.renderTextSort()
            },
            findReplace: {
                name: "Find & Replace",
                searchTerms: "find replace search text substitute",
                description: "Find and replace text",
                icon: "🔍",
                category: "Text",
                render: () => this.renderFindReplace()
            },
            duplicateRemover: {
                name: "Duplicate Remover",
                searchTerms: "duplicate remove unique lines filter",
                description: "Remove duplicate lines",
                icon: "🗑️",
                category: "Text",
                render: () => this.renderDuplicateRemover()
            },
            lineCounter: {
                name: "Line Counter",
                searchTerms: "line count number text rows",
                description: "Count lines and analyze text",
                icon: "🔢",
                category: "Text",
                render: () => this.renderLineCounter()
            },
            textDiff: {
                name: "Text Diff",
                searchTerms: "diff compare difference text changes",
                description: "Compare two texts",
                icon: "⚡",
                category: "Text",
                render: () => this.renderTextDiff()
            }
        };
    }

    renderGrid(filter = '') {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';

        const f = filter.toLowerCase().trim();
        let count = 0;

        Object.entries(this.tools).forEach(([id, tool]) => {
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

    // === CALCULATOR RENDERERS ===

    renderTipCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Tip Calculator</h2>
            <input type="number" id="bill-amount" placeholder="Bill Amount" step="0.01">
            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 10px;">
                    Tip Percentage: <span id="tip-percent-display">15</span>%
                    <input type="range" id="tip-percent" min="0" max="30" value="15" style="width: 100%; margin-top: 10px;">
                </label>
            </div>
            <input type="number" id="split-people" placeholder="Split between (people)" min="1" value="1">
            <div class="result" id="tip-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">TIP AMOUNT</div>
                    <div style="font-size: 28px; font-weight: bold;" id="tip-amount">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">TOTAL</div>
                    <div style="font-size: 28px; font-weight: bold;" id="total-amount">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">PER PERSON</div>
                    <div style="font-size: 28px; font-weight: bold;" id="per-person">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const bill = parseFloat(document.getElementById('bill-amount').value) || 0;
            const tipPercent = parseFloat(document.getElementById('tip-percent').value);
            const people = parseInt(document.getElementById('split-people').value) || 1;

            const tipAmount = bill * (tipPercent / 100);
            const total = bill + tipAmount;
            const perPerson = total / people;

            document.getElementById('tip-amount').textContent = `$${tipAmount.toFixed(2)}`;
            document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
            document.getElementById('per-person').textContent = `$${perPerson.toFixed(2)}`;
        };

        document.getElementById('tip-percent').addEventListener('input', (e) => {
            document.getElementById('tip-percent-display').textContent = e.target.value;
            calculate();
        });
        document.getElementById('bill-amount').addEventListener('input', calculate);
        document.getElementById('split-people').addEventListener('input', calculate);
    }

    renderLoanCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Loan Calculator</h2>
            <input type="number" id="loan-amount" placeholder="Loan Amount" step="1000">
            <input type="number" id="interest-rate" placeholder="Annual Interest Rate (%)" step="0.1">
            <input type="number" id="loan-term" placeholder="Loan Term (years)" step="1">
            <button id="calc-loan">Calculate</button>
            <div class="result" id="loan-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-loan').addEventListener('click', () => {
            const principal = parseFloat(document.getElementById('loan-amount').value);
            const annualRate = parseFloat(document.getElementById('interest-rate').value);
            const years = parseFloat(document.getElementById('loan-term').value);

            if (!principal || !annualRate || !years) {
                alert('Please fill all fields');
                return;
            }

            const monthlyRate = annualRate / 100 / 12;
            const numPayments = years * 12;
            const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - principal;

            const result = document.getElementById('loan-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Payment:</strong> $${totalPayment.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Interest:</strong> $${totalInterest.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Based on ${numPayments} monthly payments
                </div>
            `;
        });
    }

    renderAgeCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Age Calculator</h2>
            <input type="date" id="birthdate" placeholder="Birthdate">
            <button id="calc-age">Calculate Age</button>
            <div class="result" id="age-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-age').addEventListener('click', () => {
            const birthdate = document.getElementById('birthdate').value;
            if (!birthdate) {
                alert('Please select a birthdate');
                return;
            }

            const birth = new Date(birthdate);
            const today = new Date();

            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            let days = today.getDate() - birth.getDate();

            if (days < 0) {
                months--;
                days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
            const totalWeeks = Math.floor(totalDays / 7);
            const totalMonths = years * 12 + months;

            const result = document.getElementById('age-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
                    ${years} years, ${months} months, ${days} days
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px;">
                    <div>
                        <div style="font-size: 20px; font-weight: bold;">${totalMonths}</div>
                        <div style="font-size: 12px; color: #666;">Total Months</div>
                    </div>
                    <div>
                        <div style="font-size: 20px; font-weight: bold;">${totalWeeks}</div>
                        <div style="font-size: 12px; color: #666;">Total Weeks</div>
                    </div>
                    <div>
                        <div style="font-size: 20px; font-weight: bold;">${totalDays}</div>
                        <div style="font-size: 12px; color: #666;">Total Days</div>
                    </div>
                </div>
            `;
        });
    }

    renderDiscountCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Discount Calculator</h2>
            <input type="number" id="original-price" placeholder="Original Price" step="0.01">
            <input type="number" id="discount-percent" placeholder="Discount (%)" step="1">
            <div class="result" id="discount-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">FINAL PRICE</div>
                    <div style="font-size: 32px; font-weight: bold; color: #0f0;" id="final-price">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">YOU SAVE</div>
                    <div style="font-size: 32px; font-weight: bold;" id="savings">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const original = parseFloat(document.getElementById('original-price').value) || 0;
            const discount = parseFloat(document.getElementById('discount-percent').value) || 0;

            const savings = original * (discount / 100);
            const finalPrice = original - savings;

            document.getElementById('final-price').textContent = `$${finalPrice.toFixed(2)}`;
            document.getElementById('savings').textContent = `$${savings.toFixed(2)}`;
        };

        document.getElementById('original-price').addEventListener('input', calculate);
        document.getElementById('discount-percent').addEventListener('input', calculate);
    }

    renderCompoundInterest() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Compound Interest Calculator</h2>
            <input type="number" id="principal" placeholder="Initial Investment" step="100">
            <input type="number" id="rate" placeholder="Annual Interest Rate (%)" step="0.1">
            <input type="number" id="time" placeholder="Time Period (years)" step="1">
            <input type="number" id="compound-freq" placeholder="Compounds per Year" value="12">
            <button id="calc-compound">Calculate</button>
            <div class="result" id="compound-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-compound').addEventListener('click', () => {
            const P = parseFloat(document.getElementById('principal').value);
            const r = parseFloat(document.getElementById('rate').value) / 100;
            const t = parseFloat(document.getElementById('time').value);
            const n = parseFloat(document.getElementById('compound-freq').value);

            if (!P || !r || !t || !n) {
                alert('Please fill all fields');
                return;
            }

            const A = P * Math.pow((1 + r / n), n * t);
            const interest = A - P;

            const result = document.getElementById('compound-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Final Amount:</strong> $${A.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Interest Earned:</strong> $${interest.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Initial: $${P.toFixed(2)} | Rate: ${(r * 100).toFixed(2)}% | Time: ${t} years
                </div>
            `;
        });
    }

    renderPercentageChange() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Percentage Change Calculator</h2>
            <input type="number" id="old-value" placeholder="Original Value" step="0.01">
            <input type="number" id="new-value" placeholder="New Value" step="0.01">
            <div class="result" id="change-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">CHANGE</div>
                    <div style="font-size: 32px; font-weight: bold;" id="change-percent">0%</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">DIFFERENCE</div>
                    <div style="font-size: 32px; font-weight: bold;" id="change-diff">0</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const oldVal = parseFloat(document.getElementById('old-value').value) || 0;
            const newVal = parseFloat(document.getElementById('new-value').value) || 0;

            if (oldVal === 0) {
                document.getElementById('change-percent').textContent = 'N/A';
                document.getElementById('change-diff').textContent = '0';
                return;
            }

            const diff = newVal - oldVal;
            const percentChange = (diff / oldVal) * 100;

            const changeEl = document.getElementById('change-percent');
            changeEl.textContent = `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`;
            changeEl.style.color = percentChange > 0 ? '#0f0' : percentChange < 0 ? '#f00' : '#fff';

            document.getElementById('change-diff').textContent = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}`;
        };

        document.getElementById('old-value').addEventListener('input', calculate);
        document.getElementById('new-value').addEventListener('input', calculate);
    }

    renderTaxCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Tax Calculator</h2>
            <input type="number" id="amount" placeholder="Amount" step="0.01">
            <input type="number" id="tax-rate" placeholder="Tax Rate (%)" step="0.1" value="10">
            <div style="margin: 20px 0;">
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="tax-included">
                    <span>Tax is already included in amount</span>
                </label>
            </div>
            <div class="result" id="tax-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">TAX AMOUNT</div>
                    <div style="font-size: 28px; font-weight: bold;" id="tax-amount">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">TOTAL</div>
                    <div style="font-size: 28px; font-weight: bold;" id="tax-total">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const amount = parseFloat(document.getElementById('amount').value) || 0;
            const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
            const included = document.getElementById('tax-included').checked;

            let taxAmount, total;

            if (included) {
                // Tax is included, extract it
                taxAmount = amount - (amount / (1 + taxRate / 100));
                total = amount;
            } else {
                // Add tax to amount
                taxAmount = amount * (taxRate / 100);
                total = amount + taxAmount;
            }

            document.getElementById('tax-amount').textContent = `$${taxAmount.toFixed(2)}`;
            document.getElementById('tax-total').textContent = `$${total.toFixed(2)}`;
        };

        document.getElementById('amount').addEventListener('input', calculate);
        document.getElementById('tax-rate').addEventListener('input', calculate);
        document.getElementById('tax-included').addEventListener('change', calculate);
    }

    renderMortgageCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Mortgage Calculator</h2>
            <input type="number" id="home-price" placeholder="Home Price" step="1000">
            <input type="number" id="down-payment" placeholder="Down Payment" step="1000">
            <input type="number" id="mortgage-rate" placeholder="Interest Rate (%)" step="0.1">
            <input type="number" id="mortgage-term" placeholder="Loan Term (years)" value="30">
            <button id="calc-mortgage">Calculate</button>
            <div class="result" id="mortgage-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-mortgage').addEventListener('click', () => {
            const homePrice = parseFloat(document.getElementById('home-price').value);
            const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
            const annualRate = parseFloat(document.getElementById('mortgage-rate').value);
            const years = parseFloat(document.getElementById('mortgage-term').value);

            if (!homePrice || !annualRate || !years) {
                alert('Please fill required fields');
                return;
            }

            const principal = homePrice - downPayment;
            const monthlyRate = annualRate / 100 / 12;
            const numPayments = years * 12;
            const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - principal;

            const result = document.getElementById('mortgage-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Loan Amount:</strong> $${principal.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Interest:</strong> $${totalInterest.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Payment:</strong> $${totalPayment.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    ${numPayments} monthly payments at ${annualRate}% APR
                </div>
            `;
        });
    }

    // === CONVERTER RENDERERS ===

    renderTemperatureConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Temperature Converter</h2>
            <input type="number" id="temp-input" placeholder="Enter temperature" step="0.1">
            <select id="temp-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
            </select>
            <div class="result" id="temp-result" style="text-align: left;">
                <div style="margin-bottom: 10px;"><strong>Celsius:</strong> <span id="celsius">0</span> °C</div>
                <div style="margin-bottom: 10px;"><strong>Fahrenheit:</strong> <span id="fahrenheit">32</span> °F</div>
                <div><strong>Kelvin:</strong> <span id="kelvin">273.15</span> K</div>
            </div>
        `;

        const convert = () => {
            const value = parseFloat(document.getElementById('temp-input').value) || 0;
            const from = document.getElementById('temp-from').value;

            let celsius, fahrenheit, kelvin;

            if (from === 'celsius') {
                celsius = value;
                fahrenheit = (celsius * 9 / 5) + 32;
                kelvin = celsius + 273.15;
            } else if (from === 'fahrenheit') {
                fahrenheit = value;
                celsius = (fahrenheit - 32) * 5 / 9;
                kelvin = celsius + 273.15;
            } else {
                kelvin = value;
                celsius = kelvin - 273.15;
                fahrenheit = (celsius * 9 / 5) + 32;
            }

            document.getElementById('celsius').textContent = celsius.toFixed(2);
            document.getElementById('fahrenheit').textContent = fahrenheit.toFixed(2);
            document.getElementById('kelvin').textContent = kelvin.toFixed(2);
        };

        document.getElementById('temp-input').addEventListener('input', convert);
        document.getElementById('temp-from').addEventListener('change', convert);
    }

    renderLengthConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Length Converter</h2>
            <input type="number" id="length-input" placeholder="Enter length" step="0.01">
            <select id="length-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="meters">Meters</option>
                <option value="kilometers">Kilometers</option>
                <option value="centimeters">Centimeters</option>
                <option value="feet">Feet</option>
                <option value="inches">Inches</option>
                <option value="miles">Miles</option>
            </select>
            <div class="result" id="length-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Meters:</strong> <span id="meters">0</span></div>
                <div><strong>Kilometers:</strong> <span id="kilometers">0</span></div>
                <div><strong>Centimeters:</strong> <span id="centimeters">0</span></div>
                <div><strong>Feet:</strong> <span id="feet">0</span></div>
                <div><strong>Inches:</strong> <span id="inches">0</span></div>
                <div><strong>Miles:</strong> <span id="miles">0</span></div>
            </div>
        `;

        const conversions = {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            feet: 3.28084,
            inches: 39.3701,
            miles: 0.000621371
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('length-input').value) || 0;
            const from = document.getElementById('length-from').value;

            const meters = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = meters * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('length-input').addEventListener('input', convert);
        document.getElementById('length-from').addEventListener('change', convert);
    }

    renderWeightConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Weight Converter</h2>
            <input type="number" id="weight-input" placeholder="Enter weight" step="0.01">
            <select id="weight-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="kilograms">Kilograms</option>
                <option value="grams">Grams</option>
                <option value="pounds">Pounds</option>
                <option value="ounces">Ounces</option>
                <option value="tons">Metric Tons</option>
            </select>
            <div class="result" id="weight-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Kilograms:</strong> <span id="kilograms">0</span></div>
                <div><strong>Grams:</strong> <span id="grams">0</span></div>
                <div><strong>Pounds:</strong> <span id="pounds">0</span></div>
                <div><strong>Ounces:</strong> <span id="ounces">0</span></div>
                <div><strong>Metric Tons:</strong> <span id="tons">0</span></div>
            </div>
        `;

        const conversions = {
            kilograms: 1,
            grams: 1000,
            pounds: 2.20462,
            ounces: 35.274,
            tons: 0.001
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('weight-input').value) || 0;
            const from = document.getElementById('weight-from').value;

            const kilograms = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = kilograms * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('weight-input').addEventListener('input', convert);
        document.getElementById('weight-from').addEventListener('change', convert);
    }

    renderCurrencyConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Currency Converter</h2>
            <input type="number" id="currency-input" placeholder="Enter amount" step="0.01">
            <select id="currency-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
            </select>
            <select id="currency-to" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR" selected>EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
            </select>
            <div class="result" id="currency-result">
                <div style="font-size: 36px; font-weight: bold;" id="converted-amount">0.00</div>
                <div style="font-size: 12px; color: #666; margin-top: 10px;">
                    Using approximate exchange rates
                </div>
            </div>
        `;

        // Approximate rates relative to USD
        const rates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 149.50,
            INR: 83.12,
            CAD: 1.35,
            AUD: 1.52
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('currency-input').value) || 0;
            const from = document.getElementById('currency-from').value;
            const to = document.getElementById('currency-to').value;

            const usdValue = value / rates[from];
            const converted = usdValue * rates[to];

            document.getElementById('converted-amount').textContent =
                `${converted.toFixed(2)} ${to}`;
        };

        document.getElementById('currency-input').addEventListener('input', convert);
        document.getElementById('currency-from').addEventListener('change', convert);
        document.getElementById('currency-to').addEventListener('change', convert);
    }

    renderTimeZoneConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Time Zone Converter</h2>
            <input type="time" id="time-input" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
            <select id="tz-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="0">UTC (GMT+0)</option>
                <option value="-5">EST (GMT-5)</option>
                <option value="-8">PST (GMT-8)</option>
                <option value="1">CET (GMT+1)</option>
                <option value="5.5">IST (GMT+5:30)</option>
                <option value="8">CST (GMT+8)</option>
                <option value="9">JST (GMT+9)</option>
                <option value="10">AEST (GMT+10)</option>
            </select>
            <select id="tz-to" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="0">UTC (GMT+0)</option>
                <option value="-5">EST (GMT-5)</option>
                <option value="-8">PST (GMT-8)</option>
                <option value="1">CET (GMT+1)</option>
                <option value="5.5" selected>IST (GMT+5:30)</option>
                <option value="8">CST (GMT+8)</option>
                <option value="9">JST (GMT+9)</option>
                <option value="10">AEST (GMT+10)</option>
            </select>
            <div class="result" id="tz-result">
                <div style="font-size: 48px; font-weight: bold;" id="converted-time">--:--</div>
            </div>
        `;

        const convert = () => {
            const timeValue = document.getElementById('time-input').value;
            if (!timeValue) return;

            const [hours, minutes] = timeValue.split(':').map(Number);
            const fromTz = parseFloat(document.getElementById('tz-from').value);
            const toTz = parseFloat(document.getElementById('tz-to').value);

            const diff = toTz - fromTz;
            let newHours = hours + diff;
            let newMinutes = minutes;

            // Handle fractional timezone offsets (like IST +5:30)
            const fracHours = Math.floor(diff);
            const fracMinutes = (diff - fracHours) * 60;
            newMinutes += fracMinutes;

            if (newMinutes >= 60) {
                newHours += 1;
                newMinutes -= 60;
            } else if (newMinutes < 0) {
                newHours -= 1;
                newMinutes += 60;
            }

            if (newHours >= 24) newHours -= 24;
            if (newHours < 0) newHours += 24;

            const formatted = `${String(Math.floor(newHours)).padStart(2, '0')}:${String(Math.floor(newMinutes)).padStart(2, '0')}`;
            document.getElementById('converted-time').textContent = formatted;
        };

        document.getElementById('time-input').addEventListener('input', convert);
        document.getElementById('tz-from').addEventListener('change', convert);
        document.getElementById('tz-to').addEventListener('change', convert);

        // Set current time
        const now = new Date();
        document.getElementById('time-input').value =
            `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        convert();
    }

    renderSpeedConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Speed Converter</h2>
            <input type="number" id="speed-input" placeholder="Enter speed" step="0.01">
            <select id="speed-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="kmh">Kilometers per Hour (km/h)</option>
                <option value="mph">Miles per Hour (mph)</option>
                <option value="ms">Meters per Second (m/s)</option>
                <option value="knots">Knots</option>
            </select>
            <div class="result" id="speed-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>km/h:</strong> <span id="kmh">0</span></div>
                <div><strong>mph:</strong> <span id="mph">0</span></div>
                <div><strong>m/s:</strong> <span id="ms">0</span></div>
                <div><strong>Knots:</strong> <span id="knots">0</span></div>
            </div>
        `;

        const conversions = {
            kmh: 1,
            mph: 0.621371,
            ms: 0.277778,
            knots: 0.539957
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('speed-input').value) || 0;
            const from = document.getElementById('speed-from').value;

            const kmh = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = kmh * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('speed-input').addEventListener('input', convert);
        document.getElementById('speed-from').addEventListener('change', convert);
    }

    // === TEXT TOOL RENDERERS ===

    renderTextReverse() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Reverser</h2>
            <textarea id="reverse-input" rows="6" placeholder="Enter text to reverse..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="reverse-chars">Reverse Characters</button>
                <button id="reverse-words">Reverse Words</button>
            </div>
            <div class="result" id="reverse-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('reverse-chars').onclick = () => {
            const input = document.getElementById('reverse-input').value;
            document.getElementById('reverse-output').textContent = input.split('').reverse().join('');
        };

        document.getElementById('reverse-words').onclick = () => {
            const input = document.getElementById('reverse-input').value;
            document.getElementById('reverse-output').textContent = input.split(' ').reverse().join(' ');
        };
    }

    renderTextSort() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Sorter</h2>
            <textarea id="sort-input" rows="10" placeholder="Enter lines to sort (one per line)..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="sort-asc">Sort A-Z</button>
                <button id="sort-desc">Sort Z-A</button>
                <button id="sort-length">By Length</button>
            </div>
            <div class="result" id="sort-output" style="min-height: 150px; text-align: left; white-space: pre-wrap;"></div>
        `;

        document.getElementById('sort-asc').onclick = () => {
            const input = document.getElementById('sort-input').value;
            const lines = input.split('\n').filter(l => l.trim());
            document.getElementById('sort-output').textContent = lines.sort().join('\n');
        };

        document.getElementById('sort-desc').onclick = () => {
            const input = document.getElementById('sort-input').value;
            const lines = input.split('\n').filter(l => l.trim());
            document.getElementById('sort-output').textContent = lines.sort().reverse().join('\n');
        };

        document.getElementById('sort-length').onclick = () => {
            const input = document.getElementById('sort-input').value;
            const lines = input.split('\n').filter(l => l.trim());
            document.getElementById('sort-output').textContent =
                lines.sort((a, b) => a.length - b.length).join('\n');
        };
    }

    renderFindReplace() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Find & Replace</h2>
            <textarea id="fr-input" rows="6" placeholder="Enter text..."></textarea>
            <input type="text" id="find-text" placeholder="Find">
            <input type="text" id="replace-text" placeholder="Replace with">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="replace-first">Replace First</button>
                <button id="replace-all">Replace All</button>
            </div>
            <div class="result" id="fr-output" style="min-height: 100px; text-align: left; white-space: pre-wrap;"></div>
        `;

        document.getElementById('replace-first').onclick = () => {
            const input = document.getElementById('fr-input').value;
            const find = document.getElementById('find-text').value;
            const replace = document.getElementById('replace-text').value;

            if (!find) {
                alert('Please enter text to find');
                return;
            }

            document.getElementById('fr-output').textContent = input.replace(find, replace);
        };

        document.getElementById('replace-all').onclick = () => {
            const input = document.getElementById('fr-input').value;
            const find = document.getElementById('find-text').value;
            const replace = document.getElementById('replace-text').value;

            if (!find) {
                alert('Please enter text to find');
                return;
            }

            const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            document.getElementById('fr-output').textContent = input.replace(regex, replace);
        };
    }

    renderDuplicateRemover() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Duplicate Remover</h2>
            <textarea id="dup-input" rows="10" placeholder="Enter lines (duplicates will be removed)..."></textarea>
            <button id="remove-dups">Remove Duplicates</button>
            <div class="result" id="dup-output" style="min-height: 150px; text-align: left; white-space: pre-wrap;"></div>
            <div style="margin-top: 15px; font-size: 14px; color: #666;" id="dup-stats"></div>
        `;

        document.getElementById('remove-dups').onclick = () => {
            const input = document.getElementById('dup-input').value;
            const lines = input.split('\n');
            const originalCount = lines.length;
            const unique = [...new Set(lines)];
            const removed = originalCount - unique.length;

            document.getElementById('dup-output').textContent = unique.join('\n');
            document.getElementById('dup-stats').textContent =
                `Original: ${originalCount} lines | Unique: ${unique.length} lines | Removed: ${removed} duplicates`;
        };
    }

    renderLineCounter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Line Counter</h2>
            <textarea id="line-input" rows="10" placeholder="Enter or paste text..."></textarea>
            <div class="result" id="line-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="line-count">0</div>
                    <div style="font-size: 12px; color: #666;">LINES</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="non-empty">0</div>
                    <div style="font-size: 12px; color: #666;">NON-EMPTY</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="empty-lines">0</div>
                    <div style="font-size: 12px; color: #666;">EMPTY</div>
                </div>
            </div>
        `;

        const count = () => {
            const input = document.getElementById('line-input').value;
            const lines = input.split('\n');
            const totalLines = lines.length;
            const nonEmpty = lines.filter(l => l.trim()).length;
            const empty = totalLines - nonEmpty;

            document.getElementById('line-count').textContent = totalLines;
            document.getElementById('non-empty').textContent = nonEmpty;
            document.getElementById('empty-lines').textContent = empty;
        };

        document.getElementById('line-input').addEventListener('input', count);
    }

    renderTextDiff() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Diff</h2>
            <textarea id="diff-text1" rows="6" placeholder="Enter first text..."></textarea>
            <textarea id="diff-text2" rows="6" placeholder="Enter second text..."></textarea>
            <button id="compare-texts">Compare</button>
            <div class="result" id="diff-output" style="min-height: 100px; text-align: left;"></div>
        `;

        document.getElementById('compare-texts').onclick = () => {
            const text1 = document.getElementById('diff-text1').value;
            const text2 = document.getElementById('diff-text2').value;

            const lines1 = text1.split('\n');
            const lines2 = text2.split('\n');

            let diff = '';
            const maxLines = Math.max(lines1.length, lines2.length);

            for (let i = 0; i < maxLines; i++) {
                const line1 = lines1[i] || '';
                const line2 = lines2[i] || '';

                if (line1 === line2) {
                    diff += `  ${line1}\n`;
                } else {
                    if (line1) diff += `- ${line1}\n`;
                    if (line2) diff += `+ ${line2}\n`;
                }
            }

            const output = document.getElementById('diff-output');
            output.style.whiteSpace = 'pre-wrap';
            output.style.fontFamily = 'monospace';
            output.textContent = diff || 'Texts are identical';
        };
    }
}

// Initialize
new OmniTools();
