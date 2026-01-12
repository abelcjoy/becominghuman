export class DigitalAtrophy {
    constructor(app) {
        this.app = app;
        this.state = {
            phoneHours: 4,
            desktopHours: 2,
            sleepHours: 8,
            currentAge: 30, // Default, will update from App
            lifeExpectancy: 80
        };
    }

    init() {
        // Grab current age from main app if available
        if (this.app && this.app.biologicalAge) {
            this.state.currentAge = this.app.biologicalAge;
        }

        // Listeners will be attached by App after render
    }

    calculate() {
        const totalDailyScreenTime = this.state.phoneHours + this.state.desktopHours;
        const wakingHours = 24 - this.state.sleepHours;
        const yearsRemaining = this.state.lifeExpectancy - this.state.currentAge;

        // Percentage of conscious life spent on screens
        const screenPercentage = wakingHours > 0 ? (totalDailyScreenTime / wakingHours) * 100 : 0;

        // Total waking years remaining
        const wakingYearsRemaining = yearsRemaining * (wakingHours / 24);

        // Years donated to the algorithm
        const yearsDonated = (screenPercentage / 100) * wakingYearsRemaining;

        return {
            dailyTotal: totalDailyScreenTime,
            percentage: screenPercentage.toFixed(1),
            yearsDonated: yearsDonated.toFixed(1),
            wakingYearsRemaining: wakingYearsRemaining.toFixed(1)
        };
    }

    render() {
        const container = document.getElementById('atrophy-result');
        if (!container) return;

        const data = this.calculate();

        // Severity Color scale
        let severityColor = "text-green-400";
        if (data.percentage > 15) severityColor = "text-yellow-400";
        if (data.percentage > 30) severityColor = "text-red-500";
        if (data.percentage > 50) severityColor = "text-red-700 animate-pulse";

        container.innerHTML = `
            <div class="space-y-6">
                <div class="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500">Daily Burn</div>
                        <div class="text-2xl font-mono text-white">${data.dailyTotal} Hours</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500">Conscious Load</div>
                        <div class="text-2xl font-mono ${severityColor}">${data.percentage}%</div>
                    </div>
                </div>

                <div class="text-center py-4">
                    <p class="text-stone-400 text-xs uppercase tracking-widest mb-2">Cost of the Algorithm</p>
                    <div class="text-5xl font-stoic text-white mb-2">${data.yearsDonated} <span class="text-xl text-stone-600">YEARS</span></div>
                    <p class="text-stone-500 text-sm italic">
                        You are on track to donate <span class="text-white font-bold">${data.yearsDonated} years</span> of your remaining conscious availability to digital interfaces.
                    </p>
                </div>
                
                <!-- Visualization Bar -->
                 <div class="w-full h-2 bg-stone-900 rounded-full overflow-hidden flex">
                    <div class="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" style="width: ${data.percentage}%"></div>
                    <div class="h-full bg-stone-800" style="width: ${100 - data.percentage}%"></div>
                </div>
                <div class="flex justify-between text-[10px] text-stone-600 uppercase tracking-widest">
                    <span>Algorithm</span>
                    <span>Reality</span>
                </div>
            </div>
        `;
    }
}
