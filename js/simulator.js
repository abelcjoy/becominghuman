// Life Simulator Engine - The Chronos Protocol
export class LifeSimulator {
    constructor(app) {
        this.app = app;
        this.state = this.loadState() || this.createInitialState();
        this.events = [];
        this.achievements = [];
        this.init();
    }

    createInitialState() {
        return {
            biologicalAge: 0,
            pocketTime: 0,
            equityMultiplier: 1.0,

            // Core Stats
            stats: {
                health: 100,
                happiness: 70,
                intelligence: 50,
                charisma: 50,
                wealth: 0,
                energy: 100
            },

            // Relationships
            relationships: {
                family: { level: 80, lastInteraction: Date.now() },
                friends: { level: 50, lastInteraction: Date.now() },
                romantic: { level: 0, lastInteraction: null, partner: null },
                professional: { level: 30, lastInteraction: Date.now() }
            },

            // Skills
            skills: {
                coding: 0,
                writing: 0,
                fitness: 0,
                cooking: 0,
                music: 0,
                art: 0,
                business: 0,
                meditation: 0
            },

            // Career
            career: {
                currentJob: null,
                experience: 0,
                salary: 0,
                reputation: 0
            },

            // Education
            education: {
                level: 'none', // none, high_school, bachelor, master, phd
                courses: [],
                certifications: []
            },

            // Life Events
            events: [],
            achievements: [],
            decisions: [],
            regrets: [],

            // Phases
            currentPhase: 'childhood', // childhood, adolescence, young_adult, adult, middle_age, senior

            // Legacy
            legacy: {
                impact: 0,
                creations: [],
                peopleHelped: 0,
                knowledgeShared: 0
            }
        };
    }

    init() {
        this.startAgeSimulation();
        this.startEventEngine();
        this.startRelationshipDecay();
        this.render();
    }

    startAgeSimulation() {
        // Age increases based on real time passage
        setInterval(() => {
            const realSecondsPerSimYear = 60; // 1 minute = 1 year in sim
            const increment = 1 / realSecondsPerSimYear;
            this.state.biologicalAge += increment;
            this.updatePhase();
            this.checkMilestones();
            this.saveState();
            this.render();
        }, 1000);
    }

    startEventEngine() {
        // Random events occur
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 10 seconds
                this.triggerRandomEvent();
            }
        }, 10000);
    }

    startRelationshipDecay() {
        // Relationships decay over time if not maintained
        setInterval(() => {
            Object.keys(this.state.relationships).forEach(rel => {
                const relationship = this.state.relationships[rel];
                if (relationship.lastInteraction) {
                    const daysSinceInteraction = (Date.now() - relationship.lastInteraction) / (1000 * 60 * 60 * 24);
                    if (daysSinceInteraction > 7) {
                        relationship.level = Math.max(0, relationship.level - 1);
                    }
                }
            });
            this.saveState();
        }, 60000); // Check every minute
    }

    updatePhase() {
        const age = this.state.biologicalAge;
        let newPhase = this.state.currentPhase;

        if (age < 13) newPhase = 'childhood';
        else if (age < 18) newPhase = 'adolescence';
        else if (age < 30) newPhase = 'young_adult';
        else if (age < 50) newPhase = 'adult';
        else if (age < 65) newPhase = 'middle_age';
        else newPhase = 'senior';

        if (newPhase !== this.state.currentPhase) {
            this.state.currentPhase = newPhase;
            this.logEvent(`Entered ${newPhase.replace('_', ' ')} phase`, 'milestone');
        }
    }

    checkMilestones() {
        const age = Math.floor(this.state.biologicalAge);
        const milestones = [18, 21, 25, 30, 40, 50, 60, 70, 80];

        if (milestones.includes(age) && !this.state.achievements.includes(`age_${age}`)) {
            this.unlockAchievement(`age_${age}`, `Reached ${age} years old`);
        }

        // Skill milestones
        Object.entries(this.state.skills).forEach(([skill, level]) => {
            if (level >= 100 && !this.state.achievements.includes(`master_${skill}`)) {
                this.unlockAchievement(`master_${skill}`, `Mastered ${skill}`);
            }
        });
    }

    triggerRandomEvent() {
        const events = this.getAvailableEvents();
        if (events.length === 0) return;

        const event = events[Math.floor(Math.random() * events.length)];
        this.applyEvent(event);
        this.logEvent(event.description, event.type);
    }

    getAvailableEvents() {
        const age = this.state.biologicalAge;
        const phase = this.state.currentPhase;

        const allEvents = [
            // Childhood events
            {
                phase: 'childhood',
                description: 'Made a new friend at school',
                type: 'positive',
                effects: { 'relationships.friends.level': 10, 'stats.happiness': 5 }
            },
            {
                phase: 'childhood',
                description: 'Got sick and missed school',
                type: 'negative',
                effects: { 'stats.health': -10, 'stats.energy': -15 }
            },

            // Adolescence events
            {
                phase: 'adolescence',
                description: 'First romantic interest',
                type: 'positive',
                effects: { 'relationships.romantic.level': 20, 'stats.happiness': 15 }
            },
            {
                phase: 'adolescence',
                description: 'Failed an important exam',
                type: 'negative',
                effects: { 'stats.happiness': -10, 'stats.intelligence': -5 }
            },

            // Young adult events
            {
                phase: 'young_adult',
                description: 'Got first job offer',
                type: 'positive',
                effects: { 'career.experience': 10, 'stats.happiness': 20, 'career.salary': 30000 }
            },
            {
                phase: 'young_adult',
                description: 'Heartbreak - relationship ended',
                type: 'negative',
                effects: { 'relationships.romantic.level': -50, 'stats.happiness': -25 }
            },

            // Adult events
            {
                phase: 'adult',
                description: 'Received a promotion',
                type: 'positive',
                effects: { 'career.reputation': 15, 'career.salary': 10000, 'stats.happiness': 15 }
            },
            {
                phase: 'adult',
                description: 'Health scare - need to focus on wellness',
                type: 'negative',
                effects: { 'stats.health': -20, 'stats.happiness': -15 }
            },

            // Universal events
            {
                phase: 'any',
                description: 'Random act of kindness brightened your day',
                type: 'positive',
                effects: { 'stats.happiness': 10, 'legacy.peopleHelped': 1 }
            },
            {
                phase: 'any',
                description: 'Unexpected expense drained savings',
                type: 'negative',
                effects: { 'stats.wealth': -500, 'stats.happiness': -5 }
            }
        ];

        return allEvents.filter(e => e.phase === phase || e.phase === 'any');
    }

    applyEvent(event) {
        Object.entries(event.effects).forEach(([path, value]) => {
            this.modifyStat(path, value);
        });
    }

    modifyStat(path, delta) {
        const keys = path.split('.');
        let obj = this.state;

        for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]];
        }

        const lastKey = keys[keys.length - 1];
        obj[lastKey] = Math.max(0, (obj[lastKey] || 0) + delta);
    }

    // Actions
    workJob(jobName, timeCost, reward) {
        if (this.state.stats.energy < 20) {
            this.logEvent('Too tired to work. Rest first.', 'warning');
            return;
        }

        this.app.targetDate = new Date(this.app.targetDate.getTime() - (timeCost * 60 * 60 * 1000));
        this.state.pocketTime += reward;
        this.state.stats.energy -= 20;
        this.state.career.experience += 5;
        this.state.stats.wealth += reward * 10;

        this.logEvent(`Worked as ${jobName}. Earned ${reward}h pocket time.`, 'work');
        this.saveState();
        this.render();
    }

    studyCourse(courseName, cost, rewardModifier) {
        if (this.state.pocketTime < cost) {
            this.logEvent('Not enough pocket time.', 'warning');
            return;
        }

        this.state.pocketTime -= cost;
        this.state.equityMultiplier += rewardModifier;
        this.state.stats.intelligence += 10;
        this.state.education.courses.push(courseName);

        this.logEvent(`Completed ${courseName}. Intelligence +10, Equity +${(rewardModifier * 100).toFixed(0)}%`, 'education');
        this.saveState();
        this.render();
    }

    trainSkill(skillName, timeCost) {
        if (this.state.pocketTime < timeCost) {
            this.logEvent('Not enough pocket time.', 'warning');
            return;
        }

        this.state.pocketTime -= timeCost;
        this.state.skills[skillName] = Math.min(100, (this.state.skills[skillName] || 0) + 5);
        this.state.stats.energy -= 10;

        this.logEvent(`Trained ${skillName}. Skill level: ${this.state.skills[skillName]}`, 'skill');
        this.saveState();
        this.render();
    }

    nurtureRelationship(relType) {
        const cost = 2; // 2 hours
        if (this.state.pocketTime < cost) {
            this.logEvent('Not enough pocket time.', 'warning');
            return;
        }

        this.state.pocketTime -= cost;
        this.state.relationships[relType].level = Math.min(100, this.state.relationships[relType].level + 10);
        this.state.relationships[relType].lastInteraction = Date.now();
        this.state.stats.happiness += 5;

        this.logEvent(`Spent quality time with ${relType}. Relationship +10`, 'relationship');
        this.saveState();
        this.render();
    }

    rest() {
        this.state.stats.energy = Math.min(100, this.state.stats.energy + 30);
        this.state.stats.health = Math.min(100, this.state.stats.health + 5);
        this.logEvent('Rested and recovered energy.', 'health');
        this.saveState();
        this.render();
    }

    exercise() {
        const cost = 1;
        if (this.state.pocketTime < cost || this.state.stats.energy < 15) {
            this.logEvent('Not enough time or energy.', 'warning');
            return;
        }

        this.state.pocketTime -= cost;
        this.state.stats.energy -= 15;
        this.state.stats.health = Math.min(100, this.state.stats.health + 10);
        this.state.skills.fitness = Math.min(100, (this.state.skills.fitness || 0) + 3);

        this.logEvent('Exercised. Health +10, Fitness +3', 'health');
        this.saveState();
        this.render();
    }

    meditate() {
        const cost = 0.5;
        if (this.state.pocketTime < cost) {
            this.logEvent('Not enough pocket time.', 'warning');
            return;
        }

        this.state.pocketTime -= cost;
        this.state.stats.happiness = Math.min(100, this.state.stats.happiness + 8);
        this.state.skills.meditation = Math.min(100, (this.state.skills.meditation || 0) + 4);
        this.state.stats.energy = Math.min(100, this.state.stats.energy + 10);

        this.logEvent('Meditated. Happiness +8, Energy +10', 'health');
        this.saveState();
        this.render();
    }

    createSomething(type) {
        const cost = 5;
        if (this.state.pocketTime < cost) {
            this.logEvent('Not enough pocket time.', 'warning');
            return;
        }

        this.state.pocketTime -= cost;
        this.state.legacy.creations.push({ type, timestamp: Date.now() });
        this.state.legacy.impact += 10;
        this.state.stats.happiness += 15;

        this.logEvent(`Created something (${type}). Legacy impact +10`, 'legacy');
        this.saveState();
        this.render();
    }

    unlockAchievement(id, description) {
        if (!this.state.achievements.includes(id)) {
            this.state.achievements.push(id);
            this.logEvent(`🏆 Achievement Unlocked: ${description}`, 'achievement');
            this.saveState();
        }
    }

    logEvent(message, type = 'info') {
        const event = {
            message,
            type,
            timestamp: Date.now(),
            age: this.state.biologicalAge.toFixed(2)
        };

        this.state.events.unshift(event);
        if (this.state.events.length > 50) {
            this.state.events = this.state.events.slice(0, 50);
        }

        this.updateEventLog();
    }

    updateEventLog() {
        const logEl = document.getElementById('sim-log');
        if (!logEl) return;

        const recentEvents = this.state.events.slice(0, 3);
        logEl.innerHTML = recentEvents.map(e => {
            const color = {
                'positive': 'text-green-500',
                'negative': 'text-red-500',
                'milestone': 'text-yellow-500',
                'achievement': 'text-purple-500',
                'warning': 'text-orange-500'
            }[e.type] || 'text-white/40';

            return `<div class="${color}">[Age ${e.age}] ${e.message}</div>`;
        }).join('');
    }

    render() {
        // Update age display
        const ageEl = document.getElementById('sim-age');
        if (ageEl) ageEl.textContent = this.state.biologicalAge.toFixed(2);

        // Update life phase
        const phaseEl = document.getElementById('sim-phase');
        if (phaseEl) {
            const phaseNames = {
                'childhood': 'Childhood',
                'adolescence': 'Adolescence',
                'young_adult': 'Young Adult',
                'adult': 'Adult',
                'middle_age': 'Middle Age',
                'senior': 'Senior'
            };
            phaseEl.textContent = phaseNames[this.state.currentPhase] || 'Unknown';
        }

        // Update pocket time
        const pocketEl = document.getElementById('sim-pocket-time');
        if (pocketEl) pocketEl.textContent = `${this.state.pocketTime.toFixed(1)} HRS`;

        // Update stats
        this.renderStats();
        this.renderRelationships();
        this.renderSkills();
        this.renderActions();
        this.updateEventLog();
    }

    renderStats() {
        const statsContainer = document.getElementById('sim-stats');
        if (!statsContainer) return;

        statsContainer.innerHTML = Object.entries(this.state.stats).map(([stat, value]) => `
            <div class="stat-item">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[9px] uppercase tracking-wider text-white/60">${stat}</span>
                    <span class="text-[10px] font-bold text-white">${Math.round(value)}</span>
                </div>
                <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-white transition-all duration-500" style="width: ${value}%"></div>
                </div>
            </div>
        `).join('');
    }

    renderRelationships() {
        const relContainer = document.getElementById('sim-relationships');
        if (!relContainer) return;

        relContainer.innerHTML = Object.entries(this.state.relationships).map(([rel, data]) => `
            <div class="relationship-item p-3 border border-white/10 bg-white/5">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] uppercase tracking-wider text-white">${rel}</span>
                    <span class="text-[10px] font-bold ${data.level > 70 ? 'text-green-500' : data.level > 40 ? 'text-yellow-500' : 'text-red-500'}">${Math.round(data.level)}</span>
                </div>
                <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full transition-all duration-500 ${data.level > 70 ? 'bg-green-500' : data.level > 40 ? 'bg-yellow-500' : 'bg-red-500'}" style="width: ${data.level}%"></div>
                </div>
                <button onclick="window.simulator.nurtureRelationship('${rel}')" class="mt-2 text-[8px] uppercase tracking-wider text-white/60 hover:text-white transition-colors">Nurture (-2h)</button>
            </div>
        `).join('');
    }

    renderSkills() {
        const skillsContainer = document.getElementById('sim-skills');
        if (!skillsContainer) return;

        const topSkills = Object.entries(this.state.skills)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        skillsContainer.innerHTML = topSkills.map(([skill, level]) => `
            <div class="skill-item p-2 border border-white/10 bg-white/5">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[9px] uppercase tracking-wider text-white/80">${skill}</span>
                    <span class="text-[9px] font-bold text-white">${Math.round(level)}/100</span>
                </div>
                <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 transition-all duration-500" style="width: ${level}%"></div>
                </div>
                <button onclick="window.simulator.trainSkill('${skill}', 1)" class="mt-1 text-[8px] uppercase tracking-wider text-white/60 hover:text-white transition-colors">Train (-1h)</button>
            </div>
        `).join('');
    }

    renderActions() {
        // Actions are rendered via the main app
        this.app.renderSimMarket();
    }

    saveState() {
        localStorage.setItem('simulatorState', JSON.stringify(this.state));
    }

    loadState() {
        const saved = localStorage.getItem('simulatorState');
        return saved ? JSON.parse(saved) : null;
    }

    reset() {
        localStorage.removeItem('simulatorState');
        this.state = this.createInitialState();
        this.render();
    }
}
