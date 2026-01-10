export class ProjectionEngine {
    constructor(app) {
        this.app = app;
        this.state = {
            relationships: [], // { name, age, gender, frequency, frequencyUnit }
            futureDate: new Date(),
            currentAge: 0,
            baseLifeExpectancy: 80 // Default, acts as a baseline
        };

        // Load saved state
        this.loadState();
    }

    addRelationship(person) {
        this.state.relationships.push({
            id: Date.now().toString(),
            name: person.name,
            currentAge: parseInt(person.age),
            relation: person.relation, // 'parent', 'partner', 'child', 'friend'
            frequency: parseInt(person.frequency), // visits per year
            gender: person.gender || 'neutral'
        });
        this.saveState();
        this.render();
    }

    removeRelationship(id) {
        this.state.relationships = this.state.relationships.filter(r => r.id !== id);
        this.saveState();
        this.render();
    }

    setFutureDate(date) {
        this.state.futureDate = new Date(date);
        this.render();
    }

    getLifeExpectancy(person) {
        // Simplified actuarial data for projection purposes
        // In a real "million dollar" app, this would use the detailed WHO data per country
        // For now, we use a global average adjusted slightly by relationship type to denote typical age gaps/expectations
        // 0 = You (driven by main app), 1 = Others

        let expectancy = 78; // Global average baseline

        // This is where "The Horror" comes in - realistic caps
        // If they act as a parent, usually older generation
        return expectancy;
    }

    calculateRemainingTime(person) {
        // Person's age today
        const personAgeToday = person.currentAge;
        const yearsProjected = (this.state.futureDate - new Date()) / (1000 * 60 * 60 * 24 * 365.25);

        // Age at the future date
        const ageAtFuture = personAgeToday + yearsProjected;

        // Life Expectancy Cap
        const expectancy = this.getLifeExpectancy(person);
        const yearsLeftTotal = Math.max(0, expectancy - personAgeToday);

        // Events specific logic (Tail End)
        const totalEventsLeft = yearsLeftTotal * person.frequency;

        // How many of those events are AFTER the slider date?
        const yearsLeftAfterFuture = Math.max(0, expectancy - ageAtFuture);
        let eventsLeftAfterFuture = Math.floor(yearsLeftAfterFuture * person.frequency);

        // Status
        let status = 'alive';
        if (ageAtFuture >= expectancy) {
            status = 'deceased';
            eventsLeftAfterFuture = 0;
        }

        return {
            name: person.name,
            ageAtFuture: Math.floor(ageAtFuture),
            status: status,
            totalEventsLeft: Math.floor(totalEventsLeft), // From TODAY
            eventsRemainingFromFuture: eventsLeftAfterFuture, // From SLIDER
            percentageLeft: Math.max(0, Math.min(100, (eventsLeftAfterFuture / totalEventsLeft) * 100))
        };
    }

    generateReport() {
        const futureYear = this.state.futureDate.getFullYear();
        const yearsJump = futureYear - new Date().getFullYear();
        if (yearsJump <= 0) return null;

        let sadCount = 0;
        let urgenyCount = 0; // Relationships with < 20% time left
        const lines = [];

        this.state.relationships.forEach(rel => {
            const data = this.calculateRemainingTime(rel);
            if (data.status === 'deceased') {
                sadCount++;
                lines.push(`• The window for <span class="text-white font-bold">${this.escape(rel.name)}</span> will likely have closed.`);
            } else if (data.percentageLeft < 20) {
                urgenyCount++;
                lines.push(`• You will reach the <span class="text-red-400">Tail End</span> of your time with <span class="text-white font-bold">${this.escape(rel.name)}</span> (${data.percentageLeft.toFixed(0)}% remains).`);
            } else {
                lines.push(`• You will have <span class="text-green-400">${data.eventsRemainingFromFuture}</span> projected interactions left with <span class="text-white font-bold">${this.escape(rel.name)}</span>.`);
            }
        });

        if (lines.length === 0) return null;

        let summary = `In <span class="text-white font-bold text-xl">${futureYear}</span>, you will be traveling through a different world. `;

        if (sadCount > 0) {
            summary += `It is a world where <span class="text-red-400 font-bold">${sadCount}</span> of your anchored connections may no longer be physically present. `;
        } else if (urgenyCount > 0) {
            summary += `It is a world defined by <span class="text-yellow-400">scarcity</span>. Your key relationships will be in their final chapters. `;
        } else {
            summary += `The path ahead is still open, but the cost of inaction increases every day. `;
        }

        return { intro: summary, details: lines };
    }

    render() {
        // This will be called by App to update the DOM
        const container = document.getElementById('projection-results');
        if (!container) return;

        container.innerHTML = '';

        // 1. Render YOU
        const myDob = this.app.dob || new Date(this.app.elements.dobInput.value || Date.now());
        const myAgeToday = (new Date() - myDob) / (1000 * 60 * 60 * 24 * 365.25);
        const yearsProjected = (this.state.futureDate - new Date()) / (1000 * 60 * 60 * 24 * 365.25);
        const myAgeFuture = myAgeToday + yearsProjected;

        // Determine "Era"
        let era = "The Present";
        if (yearsProjected > 1) era = `The Future (+${yearsProjected.toFixed(1)} Years)`;
        if (yearsProjected < 0) era = "The Past";

        // Create main header for the projection
        const headerHtml = `
            <div class="col-span-full mb-8 text-center animate-fade-in">
                <div class="text-[10px] uppercase tracking-[0.5em] text-stone-500 mb-2">${era}</div>
                <div class="text-4xl font-light text-white font-['Cinzel']">
                    ${this.state.futureDate.getFullYear()}
                </div>
                <div class="text-sm font-mono text-stone-400 mt-2">
                    You will be <span class="text-white font-bold">${Math.floor(myAgeFuture)}</span> years old
                </div>
            </div>
        `;

        container.innerHTML += headerHtml;

        // 2. Render Relationships
        if (this.state.relationships.length === 0) {
            container.innerHTML += `
                <div class="col-span-full text-center p-8 border border-dashed border-white/10 rounded-lg">
                    <p class="text-stone-500 italic">No connections anchored. Add people to project your timeline.</p>
                </div>
            `;
        } else {
            const grid = document.createElement('div');
            grid.className = "col-span-full grid grid-cols-1 md:grid-cols-2 gap-4";

            this.state.relationships.forEach(rel => {
                const data = this.calculateRemainingTime(rel);

                // Styling based on status
                let cardClass = "border-white/10 bg-white/5";
                let statusText = `${data.ageAtFuture} years old`;
                let statColor = "text-stone-300";

                if (data.status === 'deceased') {
                    cardClass = "border-red-900/30 bg-red-900/10 grayscale";
                    statusText = "Likely Deceased";
                    statColor = "text-red-500";
                }

                grid.innerHTML += `
                    <div class="p-6 border ${cardClass} rounded-lg backdrop-blur-sm transition-all duration-500">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">${this.escape(data.name)}</h3>
                                <p class="text-xs uppercase tracking-wider text-stone-500">${this.escape(rel.relation)}</p>
                            </div>
                            <button onclick="window.projection.removeRelationship('${rel.id}')" class="text-stone-600 hover:text-red-500 transition-colors">×</button>
                        </div>

                        <div class="flex justify-between items-end mb-4">
                            <div class="text-right">
                                <div class="text-[10px] uppercase tracking-widest text-stone-500">Age in ${this.state.futureDate.getFullYear()}</div>
                                <div class="text-2xl font-mono ${statColor}">${statusText}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-[10px] uppercase tracking-widest text-stone-500">Remaining Visits</div>
                                <div class="text-3xl font-bold text-white">${data.eventsRemainingFromFuture.toLocaleString()}</div>
                            </div>
                        </div>

                        <!-- Progress Bar of Time Left -->
                        <div class="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                            <div class="h-full bg-white transition-all duration-1000" style="width: ${data.percentageLeft}%"></div>
                        </div>
                        <div class="flex justify-between mt-1">
                            <span class="text-[10px] text-stone-600">Event Horizon</span>
                            <span class="text-[10px] text-stone-600">${data.percentageLeft.toFixed(0)}% Opportunity Left</span>
                        </div>
                    </div>
                `;
            });
            container.appendChild(grid);
        }

        // 3. Render Reality Report
        const report = this.generateReport();
        if (report) {
            const reportDiv = document.createElement('div');
            reportDiv.className = "col-span-full mt-8 p-6 border-t border-white/10 animate-fade-in";
            // Use a slight delay or just CSS animation for effect
            reportDiv.innerHTML = `
                <h4 class="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-mono">Generative Insight</h4>
                <p class="text-lg font-light text-stone-300 leading-relaxed mb-6 font-stoic opacity-90">
                    ${report.intro}
                </p>
                <ul class="space-y-3 font-mono text-xs text-stone-500">
                    ${report.details.map(line => `
                        <li class="flex items-start gap-3">
                            <span class="text-white/20 mt-1">Example:</span>
                            <span>${line}</span>
                        </li>
                    `).join('').replace(/Example:/g, '→')} 
                </ul>
                <button onclick="window.projection.copyReport()" class="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path> Copy Reality Check</svg>
                </button>
            `;
            container.appendChild(reportDiv);
        }
    }

    copyReport() {
        const report = this.generateReport();
        if (!report) return;
        // Strip HTML
        const intro = report.intro.replace(/<[^>]*>/g, '');
        const details = report.details.map(d => d.replace(/<[^>]*>/g, '').replace('•', '-'));
        const text = `EVENT HORIZON PROJECT: ${this.state.futureDate.getFullYear()}\n\n${intro}\n\n${details.join('\n')}\n\nAnalyze your timeline at clarityforhumans.com`;

        navigator.clipboard.writeText(text).then(() => {
            // Toast would be better, but alert is fine for now
            alert("Reality Check Copied to Clipboard");
        }).catch(err => console.error('Failed to copy', err));
    }

    saveState() {
        localStorage.setItem('projectionData', JSON.stringify(this.state.relationships));
    }

    loadState() {
        const saved = localStorage.getItem('projectionData');
        if (saved) {
            this.state.relationships = JSON.parse(saved);
        }
    }

    escape(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
