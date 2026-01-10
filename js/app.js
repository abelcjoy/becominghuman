import { lifeExpectancyData } from './data.js';
import { dailyReflections } from './reflections.js';
import { ProjectionEngine } from './projection.js';
import { DigitalAtrophy } from './atrophy.js';
import { LifeGrid } from './lifegrid.js';
import { UI } from './ui.js';
import { toast } from './toast.js';
import { KeyboardShortcuts } from './keyboard.js';
import { PWAInstaller } from './pwa.js';
import { SaveManager } from './save.js';
import { SoundManager } from './sound.js';
import { ChartRenderer } from './charts.js';
import { FocusManager } from './focus.js';
import { HabitManager } from './habits.js';

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
        this.lastFrameTime = Date.now();
        this.animationFrame = null;
        this.previousStats = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        this.isPaused = false;
        this.pausedTime = 0;
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

        // Initialize keyboard shortcuts
        this.keyboard = new KeyboardShortcuts(this);

        // Initialize save manager and sound manager
        this.saveManager = new SaveManager(this);
        this.soundManager = new SoundManager();
        this.chartRenderer = new ChartRenderer();
        this.habitManager = new HabitManager(this); // Init before FocusManager to log stats
        this.focusManager = new FocusManager(this);

        // Load saved state if available

        // Load saved state if available
        try {
            const savedData = localStorage.getItem('lifeData');
            if (savedData) {
                this.startCountdown(JSON.parse(savedData));
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
            toast.error('Failed to load saved data. Starting fresh.');
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
                toast.error("Please enter a valid Date of Birth");
                return;
            }
            if (!country) {
                toast.error("Please select your country");
                return;
            }

            try {
                localStorage.setItem('lifeData', JSON.stringify({ dob, country, sleepHours }));
            } catch (error) {
                if (error.name === 'QuotaExceededError') {
                    toast.error('Storage quota exceeded. Please clear some data.');
                } else {
                    toast.error('Failed to save data: ' + error.message);
                }
                console.error('localStorage error:', error);
            }
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

            // Stop any existing intervals
            if (this.interval) clearInterval(this.interval);
            if (this.recaptureInterval) clearInterval(this.recaptureInterval);
            if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

            // Start unified game loop
            this.startGameLoop();

            toast.success('Reality initialized. Your countdown begins now.');

            this.displayDailyReflection();
            this.startRecaptureSession();
            this.initProjection(dob);
            this.initAtrophy();
            this.initLifeGrid(dob);

            // Initialize life chart
            this.initLifeChart(dob, country);

            this.ui.hideLoading();
        }, 1500);
    }

    initLifeChart(dob, country) {
        const currentAge = (new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365.25);
        const lifeExpectancy = lifeExpectancyData[country] || 72.6;

        this.chartRenderer.createLifeProgressChart('life-progress-chart', {
            currentAge: currentAge,
            lifeExpectancy: lifeExpectancy
        });

        // Update stat cards
        const livedPercent = ((currentAge / lifeExpectancy) * 100).toFixed(1);
        const remainingPercent = (100 - livedPercent).toFixed(1);
        const weeksRemaining = Math.floor((lifeExpectancy - currentAge) * 52);

        document.getElementById('time-lived-percent').textContent = livedPercent + '%';
        document.getElementById('time-remaining-percent').textContent = remainingPercent + '%';
        document.getElementById('weeks-remaining').textContent = weeksRemaining.toLocaleString();
    }

    renderHeatmap(data) {
        this.chartRenderer.createActivityHeatmap('activity-heatmap', data);
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

    initAtrophy() {
        if (!window.atrophy) {
            window.atrophy = new DigitalAtrophy(this);
            window.atrophy.init();
        }
        window.atrophy.render();

        const config = [
            { id: 'atrophy-phone', state: 'phoneHours', display: 'phone-val' },
            { id: 'atrophy-desktop', state: 'desktopHours', display: 'desktop-val' },
            { id: 'atrophy-sleep', state: 'sleepHours', display: 'sleep-val' }
        ];

        config.forEach(c => {
            const el = document.getElementById(c.id);
            if (el) {
                el.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    document.getElementById(c.display).innerText = val + 'h';
                    window.atrophy.state[c.state] = val;
                    window.atrophy.render();
                });
            }
        });
    }

    initLifeGrid(dob) {
        if (!window.lifeGrid) {
            window.lifeGrid = new LifeGrid(this);
        }
        window.lifeGrid.init(dob);
    }

    addConnection() {
        const name = document.getElementById('rel-name').value;
        const role = document.getElementById('rel-role').value;
        const age = document.getElementById('rel-age').value;
        const freq = document.getElementById('rel-freq').value;

        if (!name || !age || !freq) {
            toast.error("Please fill in all fields (Name, Age, and Visit Frequency)");
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

        toast.success(`${name} has been anchored to your timeline`);
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

    // Unified Game Loop - consolidates all intervals for better performance
    startGameLoop() {
        this.recaptureStartTime = Date.now();
        this.lastRecaptureUpdate = Date.now();

        const gameLoop = () => {
            // Skip updates if paused
            if (this.isPaused) {
                this.animationFrame = requestAnimationFrame(gameLoop);
                return;
            }

            const now = Date.now();
            const deltaTime = now - this.lastFrameTime;

            // Main countdown tick (~30fps)
            if (deltaTime >= 31) {
                this.tick();
                this.lastFrameTime = now;
            }

            // Recapture timer update (1fps)
            if (now - this.lastRecaptureUpdate >= 1000) {
                this.updateRecaptureTimer();
                this.lastRecaptureUpdate = now;
            }

            this.animationFrame = requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.pausedTime = Date.now();
            toast.info('⏸️ Countdown paused');
            this.soundManager?.play('click');
        } else {
            // Adjust timers for paused duration
            const pauseDuration = Date.now() - this.pausedTime;
            this.recaptureStartTime += pauseDuration;
            this.lastRecaptureUpdate += pauseDuration;
            toast.success('▶️ Countdown resumed');
            this.soundManager?.play('click');
        }

        return this.isPaused;
    }

    updateRecaptureTimer() {
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
        const hours = this.elements.hoursEl.textContent;
        const equity = this.elements.attentionEquity?.textContent || '0';

        // Create formatted message
        const text = `⏳ CLARITY FOR HUMANS

🔴 BIOLOGICAL CAPITAL REMAINING:
   ${years} Years, ${days} Days, ${hours} Hours

💰 ATTENTION EQUITY: $${equity}

This is not motivation. This is biological maintenance.

Recapture your consciousness:
https://clarityforhumans.com

#MementoMori #ClarityForHumans #TimeAwareness`;

        if (navigator.share) {
            navigator.share({
                title: 'Clarity For Humans | Life Countdown',
                text: text,
                url: 'https://clarityforhumans.com'
            }).then(() => {
                toast.success('Shared successfully! Spread awareness.');
            }).catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Share failed:', error);
                    this.fallbackCopy(text);
                }
            });
        } else {
            this.fallbackCopy(text);
        }
    }

    fallbackCopy(text) {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('✅ Copied to clipboard! Paste anywhere to share.');
            this.elements.shareBtn.textContent = "✓ Copied";
            setTimeout(() => {
                this.elements.shareBtn.textContent = "Share Result";
            }, 2000);
        }).catch((err) => {
            console.error('Clipboard failed:', err);
            toast.error('Failed to copy. Please select and copy manually.');
        });
    }

    render(y, d, h, m, s, ms) {
        const fms = (n) => n.toString().padStart(3, '0');

        // Animate stat changes
        this.animateStat(this.elements.yearsEl, this.previousStats.years, y);
        this.animateStat(this.elements.daysEl, this.previousStats.days, d);
        this.animateStat(this.elements.hoursEl, this.previousStats.hours, h);
        this.animateStat(this.elements.minutesEl, this.previousStats.minutes, m);
        this.animateStat(this.elements.secondsEl, this.previousStats.seconds, s);

        this.elements.yearsEl.textContent = this.f(y);
        this.elements.daysEl.textContent = this.f(d);
        this.elements.hoursEl.textContent = this.f(h);
        this.elements.minutesEl.textContent = this.f(m);
        this.elements.secondsEl.textContent = this.f(s);
        this.elements.millisecondsEl.textContent = fms(ms);

        // Update previous stats
        this.previousStats = { years: y, days: d, hours: h, minutes: m, seconds: s };
    }

    animateStat(element, oldValue, newValue) {
        if (!element) return;

        if (newValue > oldValue) {
            // Stat increased (time remaining decreased - bad)
            element.classList.remove('stat-increase');
            element.classList.add('stat-decrease');
            setTimeout(() => element.classList.remove('stat-decrease'), 400);
        } else if (newValue < oldValue) {
            // Stat decreased (shouldn't happen in countdown, but handle it)
            element.classList.remove('stat-decrease');
            element.classList.add('stat-increase');
            setTimeout(() => element.classList.remove('stat-increase'), 400);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new LifeCountdown();

    // Initialize PWA installer
    window.pwaInstaller = new PWAInstaller();

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
