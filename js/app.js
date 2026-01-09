import { lifeExpectancyData } from './data.js';
import { dailyReflections } from './reflections.js';

class LifeCountdown {
    constructor() {
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
            exitCrisis: document.getElementById('exit-crisis')
        };
        this.crisisInterval = null;
        this.breathingTimeout = null;
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
                alert("Please enter a valid Date of Birth");
                return;
            }
            if (!country) {
                alert("Please select your country");
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

        setTimeout(() => {
            this.elements.setupStep.classList.add('hidden');
            this.elements.setupStep.classList.remove('view-exit');

            this.elements.countdownStep.classList.remove('hidden');
            this.elements.countdownStep.classList.add('view-enter');

            if (this.interval) clearInterval(this.interval);
            this.tick();
            this.interval = setInterval(() => this.tick(), 31);

            this.displayDailyReflection();
        }, 500); // Sync with CSS animation duration
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
            clearInterval(this.interval);
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

        // Update Progress Bar (Percentage of life remaining)
        // Assume max life is 100 for percentage purposes
        const percentage = Math.min(100, (consciousMs / (1000 * 60 * 60 * 24 * 365 * 100)) * 100);
        this.elements.progressBar.style.width = `${percentage}%`;

        this.updateSoulRank(years);
        this.updateExperientialUnits(consciousMs);
        this.render(years, days, hours, minutes, seconds, ms);
    }

    updateExperientialUnits(ms) {
        const days = ms / (1000 * 60 * 60 * 24);
        const years = days / 365;

        // Calculations
        const sunsets = Math.floor(days);
        const fullMoons = Math.floor(days / 29.53);
        const summers = Math.floor(years);
        const books = Math.floor(years * 6); // Assuming 1 book every 2 months

        this.elements.unitSunsets.textContent = sunsets.toLocaleString();
        this.elements.unitMoons.textContent = fullMoons.toLocaleString();
        this.elements.unitSummers.textContent = summers.toLocaleString();
        this.elements.unitBooks.textContent = books.toLocaleString();
    }

    shareResult() {
        const years = this.elements.yearsEl.textContent;
        const days = this.elements.daysEl.textContent;

        const text = `I have exactly ${years} Years and ${days} Days of conscious life left. This is my map of existence. Calculate yours: https://clarityforhumans.com\n\n#MementoMori #ClarityForHumans`;

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
        // Helper to format with leading zeros
        const f = (n) => n.toString().padStart(2, '0');
        const fms = (n) => n.toString().padStart(3, '0');

        this.elements.yearsEl.textContent = f(y);
        this.elements.daysEl.textContent = f(d);
        this.elements.hoursEl.textContent = f(h);
        this.elements.minutesEl.textContent = f(m);
        this.elements.secondsEl.textContent = f(s);
        this.elements.millisecondsEl.textContent = fms(ms);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LifeCountdown();

    // PWA Service Worker Registration
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
