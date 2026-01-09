import { lifeExpectancyData } from './data.js';

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
            ritualStone: document.getElementById('ritual-stone'),
            ritualContent: document.getElementById('ritual-content'),
            ritualHint: document.getElementById('ritual-hint')
        };
        this.init();
    }

    init() {
        this.populateCountries();
        this.elements.startButton.addEventListener('click', () => this.startCountdown());
        this.elements.shareBtn.addEventListener('click', () => this.shareResult());

        this.setupRitual();

        // Load saved state if available
        const savedData = localStorage.getItem('lifeData');
        if (savedData) {
            this.startCountdown(JSON.parse(savedData));
        }
    }

    setupRitual() {
        const stone = this.elements.ritualStone;

        const activate = () => {
            this.elements.ritualContent.classList.add('ritual-active');
            this.elements.ritualHint.style.opacity = '0';
        };

        const deactivate = () => {
            this.elements.ritualContent.classList.remove('ritual-active');
            this.elements.ritualHint.style.opacity = '1';
        };

        stone.addEventListener('mousedown', activate);
        stone.addEventListener('mouseup', deactivate);
        stone.addEventListener('mouseleave', deactivate);

        stone.addEventListener('touchstart', (e) => {
            e.preventDefault();
            activate();
        });
        stone.addEventListener('touchend', deactivate);
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

            this.tick();
            this.interval = setInterval(() => this.tick(), 31);
        }, 500); // Sync with CSS animation duration
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

        const text = `I have ${years} Years and ${days} Days of conscious time remaining.\n\n(Calculated by subtracting sleep from life expectancy)\n\nCheck yours at #BecomingHuman`;

        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.elements.shareBtn.textContent;
            this.elements.shareBtn.textContent = "Copied to Clipboard";
            this.elements.shareBtn.classList.add('text-cyan-400', 'border-cyan-900');
            setTimeout(() => {
                this.elements.shareBtn.textContent = originalText;
                this.elements.shareBtn.classList.remove('text-cyan-400', 'border-cyan-900');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
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
});
