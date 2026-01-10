import { lifeExpectancyData } from './data.js';
import { dailyReflections } from './reflections.js';
import { ProjectionEngine } from './projection.js';
import { UI } from './ui.js';

class LifeCountdown {
    constructor() {
        this.ui = new UI();
        this.elements = {
            setupStep: document.getElementById('setup-step'),
            countdownStep: document.getElementById('countdown-step'),
            dobInput: document.getElementById('dob'),
            countrySelect: document.getElementById('country'),
            sleepInput: document.getElementById('sleep'),
            startButton: document.getElementById('start-btn'),
            yearsEl: document.getElementById('c-years'),
            daysEl: document.getElementById('c-days'),
            hoursEl: document.getElementById('c-hours'),
            minutesEl: document.getElementById('c-minutes'),
            secondsEl: document.getElementById('c-seconds'),
            millisecondsEl: document.getElementById('c-milliseconds'),
            shareBtn: document.getElementById('share-btn'),
            progressBar: document.getElementById('life-progress-bar'),
            soulRank: document.getElementById('soul-rank'),
            unitSunsets: document.getElementById('unit-sunsets'),
            unitMoons: document.getElementById('unit-moons'),
            unitSummers: document.getElementById('unit-summers'),
            unitBooks: document.getElementById('unit-books'),
            dailyReflection: document.getElementById('daily-reflection'),
            reflectionTitle: document.getElementById('reflection-title'),
            reflectionContent: document.getElementById('reflection-content'),
            craveBtn: document.getElementById('crave-btn'),
            crisisMode: document.getElementById('crisis-mode'),
            breathingCircle: document.getElementById('breathing-circle'),
            breathingText: document.getElementById('breathing-text'),
            crisisTimer: document.getElementById('crisis-timer'),
            exitCrisis: document.getElementById('exit-crisis'),
            attentionEquity: document.getElementById('attention-equity'),
            burnRate: document.getElementById('burn-rate'),
            recaptureTimer: document.getElementById('recapture-timer'),
            globalSovereigns: document.getElementById('global-sovereigns'),
            simHub: document.getElementById('sim-hub'),
            simAge: document.getElementById('sim-age'),
            simPocketTime: document.getElementById('sim-pocket-time'),
            jobList: document.getElementById('job-list'),
            eduList: document.getElementById('edu-list'),
            simLog: document.getElementById('sim-log')
        };
        this.crisisInterval = null;
        this.breathingTimeout = null;
        this.recaptureStartTime = null;
        this.recaptureInterval = null;
        this.pocketTime = 0;
        this.biologicalAge = 0;
        this.equityMultiplier = 1.0;
        this.init();
    }

    init() {
        this.populateCountries();
        this.elements.startButton.addEventListener('click', () => {
            this.startCountdown();
        });
        this.elements.shareBtn.addEventListener('click', () => this.shareResult());
        this.elements.craveBtn.addEventListener('click', () => this.enterCrisisMode());
        this.elements.exitCrisis.addEventListener('click', () => this.exitCrisisMode());

        // Load saved state if available
        const savedData = localStorage.getItem('lifeData');
        if (savedData) {
            this.startCountdown(JSON.parse(savedData));
        }
    }





    populateCountries() {
        const countries = Object.keys(lifeExpectancyData).sort();

        // Add Default "Select" Option
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select Your Country";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        this.elements.countrySelect.appendChild(defaultOption);

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            this.elements.countrySelect.appendChild(option);
        });
    }

    startCountdown(data = null) {
        let dob, country, sleepHours;

        if (data) {
            ({ dob, country, sleepHours } = data);
        } else {
            dob = new Date(this.elements.dobInput.value);
            country = this.elements.countrySelect.value;
            sleepHours = parseFloat(this.elements.sleepInput.value) || 0;

            if (isNaN(dob.getTime())) {
                this.ui.toast("Please enter a valid Date of Birth", "error");
                return;
            }
            if (!country) {
                this.ui.toast("Please select your country", "error");
                return;
            }

            localStorage.setItem('lifeData', JSON.stringify({ dob, country, sleepHours }));
        }

        const lifeExpectancyYears = lifeExpectancyData[country] || 72.6;
        const deathDate = new Date(dob);
        deathDate.setFullYear(deathDate.getFullYear() + Math.floor(lifeExpectancyYears));
        // Add remaining fractional year in days
        const fractionalYear = lifeExpectancyYears % 1;
        deathDate.setDate(deathDate.getDate() + (fractionalYear * 365));

        this.targetDate = deathDate;
        this.sleepRatio = (24 - sleepHours) / 24;

        // Cinematic Transition
        this.elements.setupStep.classList.add('view-exit');
        this.ui.showLoading("Constructing Existence...");

        setTimeout(() => {
            this.elements.setupStep.classList.add('hidden');
            this.elements.setupStep.classList.remove('view-exit');

            this.elements.countdownStep.classList.remove('hidden');
            this.elements.countdownStep.classList.add('view-enter');

            if (this.interval) clearInterval(this.interval);
            this.tick();
            this.interval = setInterval(() => this.tick(), 31);

            this.displayDailyReflection();
            this.startRecaptureSession();
            this.initProjection(dob);

            this.ui.hideLoading();
        }, 1500);
    }

    initProjection(dob) {
        this.elements.simHub.classList.remove('hidden');

        if (!window.projection) {
            window.projection = new ProjectionEngine(this);
        }

        window.projection.render();

        const slider = document.getElementById('time-slider');
        const display = document.getElementById('slider-year-display');

        if (slider && display) {
            slider.addEventListener('input', (e) => {
                display.innerText = e.target.value;

                // Add tactile pulse effect
                display.classList.remove('animate-pulse-fast');
                void display.offsetWidth; // Trigger reflow
                display.classList.add('animate-pulse-fast');

                window.projection.setFutureDate(new Date(e.target.value, 0, 1));
            });
        }
    }

    addConnection() {
        const name = document.getElementById('rel-name').value;
        const role = document.getElementById('rel-role').value;
        const age = document.getElementById('rel-age').value;
        const freq = document.getElementById('rel-freq').value;

        if (!name || !age || !freq) {
            alert("Please fill in all fields.");
            return;
        }

        window.projection.addRelationship({
            name,
            relation: role,
            age,
            frequency: freq
        });

        document.getElementById('rel-name').value = '';
        document.getElementById('rel-age').value = '';
        document.getElementById('rel-freq').value = '';
    }

    updateSimState(dob) {
        const now = new Date();
        const diffMs = now - new Date(dob);
        this.biologicalAge = diffMs / (1000 * 60 * 60 * 24 * 365.25);
        this.elements.simAge.textContent = this.biologicalAge.toFixed(2);

        // Pocket Time logic
        if (this.biologicalAge < 18) {
            // Give 2 hours of pocket time for every "Real Day" lived in simulation context
            this.pocketTime = Math.max(0, (18 - this.biologicalAge) * 10);
        }
        this.elements.simPocketTime.textContent = `${this.pocketTime.toFixed(1)} HRS`;
    }

    renderSimMarket() {
        const biologicalAge = window.simulator ? window.simulator.state.biologicalAge : this.biologicalAge;
        const pocketTime = window.simulator ? window.simulator.state.pocketTime : this.pocketTime;

        const jobs = [
            { name: "Dishwasher", minAge: 14, timeCostHours: 8, rewardHours: 4, desc: "Commit 8h life -> +4h Pocket" },
            { name: "Lawn Mower", minAge: 12, timeCostHours: 4, rewardHours: 2.5, desc: "Commit 4h life -> +2.5h Pocket" },
            { name: "Dog Walker", minAge: 10, timeCostHours: 2, rewardHours: 1.5, desc: "Commit 2h life -> +1.5h Pocket" },
            { name: "Grocery Bagger", minAge: 16, timeCostHours: 6, rewardHours: 3.5, desc: "Commit 6h life -> +3.5h Pocket" }
        ];

        const edus = [
            { name: "Self-Study Path", costHours: 5, reward: 0.05, desc: "Spend 5h Pocket -> +5% Equity" },
            { name: "Deep Tech Course", costHours: 20, reward: 0.25, desc: "Spend 20h Pocket -> +25% Equity" },
            { name: "Terminal Training", costHours: 50, reward: 0.60, desc: "Spend 50h Pocket -> +60% Equity" }
        ];

        this.elements.jobList.innerHTML = jobs.map(j => {
            const isDisabled = biologicalAge < j.minAge;
            const tooltip = isDisabled ? `Requires Age ${j.minAge}` : j.desc;
            return `
            <button class="sim-btn" 
                ${isDisabled ? 'disabled' : ''} 
                data-tooltip="${tooltip}"
                onclick="window.app.commitJob('${j.name}', ${j.timeCostHours}, ${j.rewardHours})">
                <span>${j.name} <br><small class="opacity-50">${j.desc}</small></span>
                <span class="cost">-${j.timeCostHours}H</span>
            </button>
        `}).join('');

        this.elements.eduList.innerHTML = edus.map(e => {
            const isDisabled = pocketTime < e.costHours;
            const tooltip = isDisabled ? `Requires ${e.costHours}H Pocket Time` : e.desc;
            return `
            <button class="sim-btn" 
                ${isDisabled ? 'disabled' : ''} 
                data-tooltip="${tooltip}"
                onclick="window.app.commitEdu('${e.name}', ${e.costHours}, ${e.reward})">
                <span>${e.name} <br><small class="opacity-50">${e.desc}</small></span>
                <span class="reward">+${(e.reward * 100).toFixed(0)}%</span>
            </button>
        `}).join('');
    }

    commitJob(name, cost, reward) {
        if (window.simulator) {
            window.simulator.workJob(name, cost, reward);
        }
    }

    commitEdu(name, cost, rewardModifier) {
        if (window.simulator) {
            window.simulator.studyCourse(name, cost, rewardModifier);
        }
    }

    logSim(msg) {
        const div = document.createElement('div');
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        this.elements.simLog.prepend(div);
    }

    startRecaptureSession() {
        this.recaptureStartTime = Date.now();
        this.recaptureInterval = setInterval(() => {
            const elapsed = Date.now() - this.recaptureStartTime;
            const h = Math.floor(elapsed / 3600000);
            const m = Math.floor((elapsed % 3600000) / 60000);
            const s = Math.floor((elapsed % 60000) / 1000);
            this.elements.recaptureTimer.textContent = `${this.f(h)}:${this.f(m)}:${this.f(s)}`;

            // Pulse Global Sovereigns
            if (Math.random() > 0.95) {
                const count = parseInt(this.elements.globalSovereigns.textContent.replace(',', ''));
                const newCount = count + (Math.random() > 0.5 ? 1 : -1);
                this.elements.globalSovereigns.textContent = newCount.toLocaleString();
            }
        }, 1000);
    }



    enterCrisisMode() {
        this.elements.crisisMode.classList.remove('hidden');
        this.startCrisisTimer(900); // 15 Minutes
        this.startBreathingCycle();
    }

    exitCrisisMode() {
        this.elements.crisisMode.classList.add('hidden');
        clearInterval(this.crisisInterval);
        clearTimeout(this.breathingTimeout);
        this.elements.breathingCircle.className = 'w-32 h-32 border-2 border-white rounded-full flex items-center justify-center mb-12';
    }

    startCrisisTimer(seconds) {
        let timeLeft = seconds;
        const updateTimer = () => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            this.elements.crisisTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(this.crisisInterval);
                this.exitCrisisMode();
            }
            timeLeft--;
        };
        updateTimer();
        this.crisisInterval = setInterval(updateTimer, 1000);
    }

    startBreathingCycle() {
        const cycle = () => {
            // Inhale
            this.elements.breathingText.textContent = "Inhale";
            this.elements.breathingCircle.className = 'w-32 h-32 border-2 border-white rounded-full flex items-center justify-center mb-12 inhale';

            this.breathingTimeout = setTimeout(() => {
                // Hold
                this.elements.breathingText.textContent = "Hold";

                this.breathingTimeout = setTimeout(() => {
                    // Exhale
                    this.elements.breathingText.textContent = "Exhale";
                    this.elements.breathingCircle.classList.remove('inhale');
                    this.elements.breathingCircle.classList.add('exhale');

                    this.breathingTimeout = setTimeout(() => {
                        this.elements.breathingCircle.classList.remove('exhale');
                        cycle();
                    }, 6000);
                }, 2000);
            }, 4000);
        };
        cycle();
    }

    displayDailyReflection() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const index = dayOfYear % dailyReflections.length;
        const reflection = dailyReflections[index];

        this.elements.reflectionTitle.textContent = reflection.title;
        this.elements.reflectionContent.textContent = reflection.content;

        setTimeout(() => {
            this.elements.dailyReflection.classList.remove('opacity-0');
        }, 1000);
    }

    updateSoulRank(years) {
        let rank = "";
        const y = parseInt(years);
        if (y >= 60) rank = "The Eternal Dreamer";
        else if (y >= 40) rank = "The Boundless Seeker";
        else if (y >= 25) rank = "The Timeless Watcher";
        else if (y >= 10) rank = "The Conscious Soul";
        else rank = "The Pure Presence";

        if (this.elements.soulRank.textContent !== rank) {
            this.elements.soulRank.textContent = rank;
        }
    }

    tick() {
        const now = new Date();
        const totalRemainingMs = this.targetDate - now;

        if (totalRemainingMs <= 0) {
            this.render(0, 0, 0, 0, 0, 0);
            if (this.interval) clearInterval(this.interval);
            return;
        }

        // Apply Sleep Ratio (Conscious Time)
        const consciousMs = totalRemainingMs * this.sleepRatio;

        const years = Math.floor(consciousMs / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((consciousMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((consciousMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((consciousMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((consciousMs % (1000 * 60)) / 1000);
        const ms = Math.floor(consciousMs % 1000);

        // Update Progress Bar
        const percentage = Math.min(100, (consciousMs / (1000 * 60 * 60 * 24 * 365 * 100)) * 100);
        if (this.elements.progressBar) this.elements.progressBar.style.width = `${percentage}%`;

        this.updateBiologicalCapital(consciousMs);
        this.updateSoulRank(years);
        this.render(years, days, hours, minutes, seconds, ms);

        // Update Simulator Game Loop
        if (window.simulator) {
            window.simulator.update(Date.now());
        }
    }

    updateBiologicalCapital(ms) {
        // Market Value: $450,000 for full lifespan (~75 years)
        const totalConsciousHoursRemaining = ms / (1000 * 60 * 60);
        // Apply Education Multiplier from simulator if available
        const multiplier = window.simulator ? window.simulator.state.equityMultiplier : this.equityMultiplier;
        const equity = totalConsciousHoursRemaining * 25 * multiplier;
        if (this.elements.attentionEquity) this.elements.attentionEquity.textContent = Math.floor(equity).toLocaleString();

        const dailyBurn = 3 * 25;
        if (this.elements.burnRate) this.elements.burnRate.textContent = dailyBurn.toFixed(2);
    }

    f(n) { return n.toString().padStart(2, '0'); }

    shareResult() {
        const years = this.elements.yearsEl.textContent;
        const days = this.elements.daysEl.textContent;

        const text = `I have exactly ${years} Years and ${days} Days of conscious life left. This is my biological capital. Recapture yours: https://clarityforhumans.com\n\n#MementoMori #ClarityForHumans`;

        if (navigator.share) {
            navigator.share({
                title: 'Clarity For Humans',
                text: text,
                url: 'https://clarityforhumans.com'
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.elements.shareBtn.textContent;
                this.elements.shareBtn.textContent = "Copied to Clipboard";
                setTimeout(() => {
                    this.elements.shareBtn.textContent = originalText;
                }, 2000);
            });
        }
    }

    render(y, d, h, m, s, ms) {
        const fms = (n) => n.toString().padStart(3, '0');

        this.elements.yearsEl.textContent = this.f(y);
        this.elements.daysEl.textContent = this.f(d);
        this.elements.hoursEl.textContent = this.f(h);
        this.elements.minutesEl.textContent = this.f(m);
        this.elements.secondsEl.textContent = this.f(s);
        this.elements.millisecondsEl.textContent = fms(ms);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new LifeCountdown();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('SW registered:', reg);
            }).catch(err => {
                console.log('SW registration failed:', err);
            });
        });
    }
});
