// 🛡️ GUARDIAN AXIOM: Always verify exports before importing. Maintain class structure.
// Register all visual modules as Hooks in the LifeEngine (js/engine.js).
// All biometric data MUST be encrypted via IronVault (js/vault.js) before storage.

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
import { ViaNegativa } from './negativa.js';
import { WallpaperGenerator } from './wallpaper.js';
import { SubliminalAxioms } from './axioms.js';
import { MirrorEffect } from './mirror.js';
import { ParticleSystem } from './particles.js';
import { VoidMode } from './void.js';
import { TextScramble } from './textfx.js';
import { HolographicTilt } from './holo.js';
import { RealityGlitch } from './glitch.js';
import { TemporalEchoes } from './trails.js';
import { BootSequence } from './boot.js';
import { RippleEffect } from './ripple.js';
import { NeuralBackground } from './neural.js';
import { Monolith } from './monolith.js';
import { AuroraEffect } from './aurora.js';
import { GravityButtons } from './gravity.js';
import { ZenBreathing } from './zen.js';
import { ChronosNavigator } from './navigator.js';
import { HeliosEngine } from './helios.js';
import { Oracle } from './oracle.js';
import { InertialWarp } from './warp.js';
import { HarmonyEngine } from './harmony.js';
import { BioScanner } from './scanner.js';
import { PrismEngine } from './prism.js';
import { AmbienceEngine } from './ambience.js';
import { TactileEngine } from './haptics.js';
import { TextScrambler } from './scramble.js';
import { QuantumConsent } from './consent.js';
import { ChronosFavicon } from './favicon.js';
import { Guardian } from './guardian.js';
import { RelativityEngine } from './relativity.js';
import { FluxOptimizer } from './optimizer.js';
import { SchrodingerState } from './observer.js';
import { VitalityEngine } from './vitality.js';
import { ParallaxEngine } from './parallax.js';
import { RespiratoryEngine } from './breath.js';
import { ChronoCapsule } from './capsule.js';
import { SynapticEngine } from './synapse.js';
import { ConnectionSentinel } from './sentinel.js';
import { LegacySky } from './legacy.js';
import { SolarDial } from './dial.js';
import { CitationEngine } from './citation.js';
import { FocusShield } from './shield.js';
import { ChronoSync } from './sync.js';
import { EntropyLens } from './entropy.js';
import { VoltaicInterface } from './voltaic.js';
import { HorizonLine } from './horizon.js';
import { QuantumEntanglement } from './entanglement.js';
import { KnowledgeCost } from './knowledge.js';
import { AtmosphericEngine } from './atmosphere.js';
import { StardustSystem } from './stardust.js';
import { MagneticCore } from './magnet.js';
import { VelocityGovernor } from './velocity.js';
import { GlintSystem } from './glint.js';
import { ResonanceField } from './resonance.js';
import { LunarInfluence } from './lunar.js';
import { BioMetricGrid } from './biogrid.js';
import { AuralHorizon } from './aural.js';
import { ChronoShift } from './shift.js';
import { CardioPulse } from './cardio.js';
import { KineticEngine } from './kinetic.js';
import { SemanticEngine } from './semantic.js';
import { ApertureSystem } from './aperture.js';
import { LuminaInterface } from './lumina.js';
import { ResonantTypography } from './typography.js';
import { BioSyncInterface } from './biosync.js';
import { EncryptionVeil } from './veil.js';
import { TapticEngine } from './taptic.js';
// Biometric Security & Features
import { LifeEngine } from './engine.js';
import { IronVault } from './vault.js';
import { OmniProtocol } from './omni.js';

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
            shareBtn: document.getElementById('share-btn-secondary'),
            progressBar: document.getElementById('life-progress-bar'),
            soulRank: document.getElementById('soul-rank'),
            unitSunsets: document.getElementById('unit-sunsets'),
            unitSummers: document.getElementById('unit-summers'),
            unitBooks: document.getElementById('unit-books'),
            unitMeals: document.getElementById('unit-meals'),
            dailyReflection: document.getElementById('daily-reflection'),
            reflectionTitle: document.getElementById('reflection-title'),
            reflectionContent: document.getElementById('reflection-content'),
            craveBtn: document.getElementById('crave-btn'),
            crisisMode: document.getElementById('crisis-mode'),
            breathingCircle: document.getElementById('breathing-circle'),
            breathingText: document.getElementById('breathing-text'),
            crisisTimer: document.getElementById('crisis-timer'),
            exitCrisis: document.getElementById('exit-crisis'),
            recaptureTimer: document.getElementById('recapture-timer'), // Note: Timer element was inside the removed box. We need to check if we kept it or moved it.
            // Removed equity elements
            globalSovereigns: document.getElementById('global-sovereigns'),
            simHub: document.getElementById('sim-hub'),
            simAge: document.getElementById('sim-age'),
            simPocketTime: document.getElementById('sim-pocket-time'),
            jobList: document.getElementById('job-list'),
            eduList: document.getElementById('edu-list'),
            simLog: document.getElementById('sim-log'),

            // New Control Buttons
            pauseBtn: document.getElementById('pause-btn'),
            focusBtn: document.getElementById('focus-btn'),
            soundBtn: document.getElementById('sound-btn'),
            exportBtn: document.getElementById('export-btn'),
            importBtn: document.getElementById('import-btn')
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

        // Initialize Security & Novelty
        this.vault = new IronVault();
        this.entropyLens = new EntropyLens();
        this.mortalStrand = new MortalStrand(this);
        this.omni = new OmniProtocol(this);

        this.isGhostMode = false;
        this.realTargetDate = null;
        this.decoyTargetDate = new Date();

        // Initialize Engine First
        this.engine = new LifeEngine(this);

        // Register Hooks
        this.engine.addHook(this.entropyLens);
        this.engine.addHook(this.mortalStrand);

        this.init();
    }

    init() {
        this.populateCountries();
        this.omni.renderGrid();

        // --- Omni Navigation Logic ---
        const navExistence = document.getElementById('nav-existence');
        const navOmni = document.getElementById('nav-omni');
        const existenceView = document.getElementById('setup-step');
        const omniView = document.getElementById('omni-grid-view');

        const switchView = (mode) => {
            if (mode === 'omni') {
                existenceView.classList.add('hidden');
                omniView.classList.remove('hidden');
                navOmni.className = "text-[11px] uppercase tracking-[0.4em] text-white border-b border-white pb-1";
                navExistence.className = "text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors";
                this.omni.closeTool(); // Reset tool view if open
            } else {
                existenceView.classList.remove('hidden');
                omniView.classList.add('hidden');
                navExistence.className = "text-[11px] uppercase tracking-[0.4em] text-white border-b border-white pb-1";
                navOmni.className = "text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors";
            }
            if (this.soundManager) this.soundManager.play('click');
        };

        navExistence?.addEventListener('click', () => switchView('existence'));
        navOmni?.addEventListener('click', () => switchView('omni'));

        document.getElementById('close-tool')?.addEventListener('click', () => this.omni.closeTool());

        // --- Core Event Listeners ---
        if (this.elements.startButton) {
            this.elements.startButton.addEventListener('click', () => this.startCountdown());
        }

        // Crisis Mode
        if (this.elements.craveBtn) {
            this.elements.craveBtn.addEventListener('click', () => this.enterCrisisMode());
        }
        if (this.elements.exitCrisis) {
            this.elements.exitCrisis.addEventListener('click', () => this.exitCrisisMode());
        }

        // Initialize Core Visuals Only
        this.chartRenderer = new ChartRenderer();
        try { this.keyboard = new KeyboardShortcuts(this); } catch (e) { console.warn('Shortcuts disabled'); }

        // Initialize Novelty (Via Negativa)
        window.negativa = new ViaNegativa();
        window.wallpaper = new WallpaperGenerator(this);
        new SubliminalAxioms();
        new VoidMode();
        // Initialize Visuals
        this.neuralBackground = new NeuralBackground();
        this.particles = new StardustSystem(); // Note: Search result shows StardustSystem used for particles
        this.prism = new PrismEngine();
        // Taptic Engine (Haptic Feedback)
        this.haptics = new TapticEngine();

        // Register Engine Hooks
        this.engine.addHook(this.neuralBackground);
        this.engine.addHook(this.particles);
        this.engine.addHook(this.prism);

        // --- Sovereign Menu Logic ---
        const toggle = document.getElementById('sovereign-toggle');
        const menu = document.getElementById('sovereign-menu');
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                const isOpen = menu.classList.contains('opacity-100');
                if (isOpen) {
                    menu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                    menu.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                    toggle.querySelector('span').innerText = '✧';
                } else {
                    menu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
                    menu.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                    toggle.querySelector('span').innerText = '×';
                    this.soundManager?.play('click');
                    // Auto-request sensors on menu open if possible
                    this.engine.requestSensorPermission();
                }
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                    menu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                    menu.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                    toggle.querySelector('span').innerText = '✧';
                }
            });
        }

        // Initialize Managers
        this.soundManager = new SoundManager();
        this.habitManager = new HabitManager(this);
        this.focusManager = new FocusManager(this);

        // Text FX
        document.querySelectorAll('.stat-number').forEach(el => {
            const fx = new TextScramble(el);
            el.addEventListener('mouseenter', () => {
                fx.scramble();
                this.soundManager?.play('tick');
            });
        });

        // 3D Tilt Effect
        const statsGrid = document.querySelector('.animate-breath'); // The main stats grid
        if (statsGrid) new HolographicTilt(statsGrid);

        // Reality Glitch
        new RealityGlitch();

        // Temporal Echoes
        new TemporalEchoes();

        // Ripple Effect
        new RippleEffect();

        // The Monolith (Idle Event)
        new Monolith(this.soundManager);

        // Aurora
        new AuroraEffect();

        // Magnetic Gravity Buttons
        new GravityButtons();

        // Subconscious Zen Guide
        new ZenBreathing();

        // Chronos Navigator (Cursor)
        new ChronosNavigator();

        // Helios (Circadian Lighting)
        new HeliosEngine();

        // The Oracle (Philosophical Insights)
        new Oracle();

        // Kinetic Inertia
        new InertialWarp();

        // Musical UI
        new HarmonyEngine(this.soundManager);

        // Secure Vault Access (Visual)
        if (localStorage.getItem('lifeData')) {
            new BioScanner();
        }

        // Chromatic Aberration (Optical Lens)
        // this.prism = new PrismEngine(); // Moved up

        // Deep Focus Audio (Pink/Brown Noise)
        new AmbienceEngine();

        // Physical Feedback (Mobile)
        // this.haptics = new TactileEngine(); // Moved up and assigned to this.haptics

        // Text Matrix Effect
        new TextScrambler();

        // Privacy Protocol (GDPR)
        new QuantumConsent();

        // Dynamic Tab Icon
        new ChronosFavicon();

        // System Integrity Guardian (Self-Healing)
        new Guardian();

        // Einsteinian Time Dilation (Physics)
        new RelativityEngine();

        // Performance Manager (Flux Capacitor)
        new FluxOptimizer();

        // Tab Visibility Handler (Observer Effect)
        new SchrodingerState();

        // Global Life Sream (Birth/Death Viz)
        new VitalityEngine();

        // Depth/Gyroscope Effect
        new ParallaxEngine();

        // Living Interface (Breathing Scale)
        new RespiratoryEngine();

        // Time Capsule (Future Message)
        new ChronoCapsule(this.soundManager);

        // Synaptic Cursor (Desktop Lines)
        new SynapticEngine();

        // Connectivity Guardian (Offline Mode)
        new ConnectionSentinel();

        // Retention Galaxy (Visit History)
        new LegacySky();

        // Solar Dial (Real Shadow Physics)
        new SolarDial();

        // Citation Manager (Professional Sharing)
        new CitationEngine();

        // The Mortal Strand (Global Progress Line)
        // Handled in constructor as this.mortalStrand

        // Focus Shield (Idle Dimming)
        new FocusShield();

        // Temporal Synchronization (Server Time)
        new ChronoSync();

        // Visual Age Texturing (Entropy)
        // Handled in constructor as this.entropyLens

        // Bio-Digital Energy Sync (Battery)
        new VoltaicInterface();

        // Custom Scroll Visualizer
        new HorizonLine();

        // Single Tab Enforcer (Singularity)
        new QuantumEntanglement();

        // Selection Cost Analyzer (Knowledge Price)
        new KnowledgeCost();

        // Atmospheric Texture (Time-based Blur)
        new AtmosphericEngine();

        // Stardust Accumulation (Idle Particles)
        // new StardustSystem(); // Moved up and assigned to this.particles

        // Magnetic UI (Tactile Feel)
        new MagneticCore();

        // Anti-Doomscroll Mechanism (Mindfulness)
        new VelocityGovernor();

        // Holographic Glint (Materiality)
        new GlintSystem();

        // Input Resonance (Typing Feedback)
        new ResonanceField();

        // Chromatic Aberration (Impact/Speed FX)
        // new PrismEngine(); // Redundant, already initialized as this.prism

        // Celestial Tint (Moon Phase Sync)
        new LunarInfluence();

        // The Oracle (Logic Loop)
        // Already initialized above
        // new Oracle();

        // Bio-Metric Grid (Infinity Floor)
        new BioMetricGrid();

        // Aural Horizon (Binaural Audio)
        new AuralHorizon();

        // Chrono-Shift (Visual Aging)
        new ChronoShift();

        // Cardio-Pulse (Subconscious Heartbeat)
        new CardioPulse();

        // Kinetic Engine (Scroll Physics)
        new KineticEngine();

        // Semantic SEO (AI-Ready)
        new SemanticEngine();

        // Aperture System (Visual Focus)
        new ApertureSystem();

        // Lumina Interface (Perfect Contrast)
        new LuminaInterface();

        // Resonant Typography (Living Fonts)
        new ResonantTypography();

        // Bio-Sync (Circadian Advisor)
        new BioSyncInterface();

        // Encryption Veil (Privacy Theater)
        new EncryptionVeil();

        // Taptic Engine (Haptic Feedback)
        // new TapticEngine(); // Moved up and assigned to this.haptics

        // Bind Focus Button
        if (this.elements.focusBtn) {
            this.elements.focusBtn.addEventListener('click', () => {
                // Default 25m session
                this.focusManager.startSession(25);
            });
        }

        // Saved data loading is now handled in DOMContentLoaded to support async decryption. 
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
            // Default sleepHours to 0 to prevent NaN if missing in old saves
            ({ dob, country, sleepHours = 0 } = data);

            // Validate loaded data
            const dobDate = new Date(dob);
            if (isNaN(dobDate.getTime()) || !country) {
                console.warn('Corrupted save data detected');
                localStorage.removeItem('lifeData');
                if (window.toast) toast.error('Saved data corrupted. Please re-enter details.');
                return;
            }
        } else {
            const rawDob = this.elements.dobInput.value;
            const rawSleep = this.elements.sleepInput.value;

            dob = new Date(rawDob);
            country = this.elements.countrySelect.value;
            sleepHours = parseFloat(rawSleep);

            // Critical NaN Prevention
            if (isNaN(sleepHours)) sleepHours = 8;
            sleepHours = Math.max(0, Math.min(24, sleepHours));

            if (!rawDob || isNaN(dob.getTime())) {
                toast.error("Reality Check: Enter a valid Date of Birth");
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

        // Ensure sleepHours is a valid number
        const safeSleepHours = isNaN(sleepHours) ? 8 : Math.min(24, Math.max(0, sleepHours));

        // Add remaining fractional year in days
        const fractionalYear = lifeExpectancyYears % 1;
        deathDate.setDate(deathDate.getDate() + (fractionalYear * 365));

        this.targetDate = deathDate;
        this.dob = dob; // Store for other modules
        this.sleepRatio = (24 - safeSleepHours) / 24;
        if (isNaN(this.sleepRatio)) this.sleepRatio = 0.66; // Fallback to 16h waking if something exploded

        // Cinematic Transition
        this.elements.setupStep.classList.add('view-exit');

        // Use Boot Sequence mainly for manual starts or dramatic effect
        // If data is passed (auto-load), we might want to skip, but for now let's enforce the mood 
        // unless it's a refresh. Actually, let's always show it for the vibe.

        // Hide loading since BootSequence handles its own UI
        // this.ui.showLoading("Constructing Existence..."); 

        const onComplete = () => {
            try {
                // Securely Save Data (Iron Vault)
                this.secureSave('lifeData', data);

                // Hide Setup, Show Countdown
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

                this.displayDailyReflection();

                // Initialize modules safely
                try { this.initProjection(dob); } catch (e) { console.error('Projection Error', e); }
                try { this.initAtrophy(); } catch (e) { console.error('Atrophy Error', e); }
                try { this.initLifeGrid(dob); } catch (e) { console.error('LifeGrid Error', e); }

                // Initialize life chart
                try { this.initLifeChart(dob, country); } catch (e) { console.error('LifeChart Error', e); }

                toast.success('Reality initialized. Your countdown begins now.');

                // Trigger PWA Install Prompt (if deferred)
                if (window.pwaInstaller) window.pwaInstaller.showInstallButton();
            } catch (error) {
                console.error("Initialization Critical Error:", error);
                if (window.toast) toast.error("Reality Glitch: " + error.message);
            } finally {
                this.ui.hideLoading();
            }
        };

        // If loading from save (data exists), skip boot for speed, else show boot
        if (data) {
            this.ui.showLoading("Restoring Timeline...");
            setTimeout(onComplete, 1000);
        } else {
            new BootSequence(onComplete).start();
        }
    }

    initLifeChart(dob, country) {
        const currentAge = (new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365.25);
        const lifeExpectancy = lifeExpectancyData[country] || 72.6;

        this.chartRenderer.createLifeProgressChart('life-progress-chart', {
            currentAge: currentAge,
            lifeExpectancy: lifeExpectancy
        });

        // Update stat cards
        const livedPercent = (lifeExpectancy > 0 ? (currentAge / lifeExpectancy) * 100 : 0).toFixed(1);
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
                this.updateGlobalSovereigns();
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
        if (!this.recaptureStartTime) this.recaptureStartTime = Date.now();
        const elapsed = Date.now() - this.recaptureStartTime;
        const h = Math.floor(elapsed / 3600000);
        const m = Math.floor((elapsed % 3600000) / 60000);
        const s = Math.floor((elapsed % 60000) / 1000);
        if (this.elements.recaptureTimer) {
            this.elements.recaptureTimer.textContent = `${this.f(h)}:${this.f(m)}:${this.f(s)}`;
        }
    }

    updateGlobalSovereigns() {
        if (!this.elements.globalSovereigns) return;

        // Pulse Global Sovereigns
        if (Math.random() > 0.95) {
            const raw = this.elements.globalSovereigns.textContent || "0";
            const count = parseInt(raw.replace(/,/g, ''));
            if (!isNaN(count)) {
                const newCount = count + (Math.random() > 0.5 ? 1 : -1);
                this.elements.globalSovereigns.textContent = newCount.toLocaleString();
            }
        }
    }

    // startRecaptureSession removed (Redundant)



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
        const displayYears = this.isGhostMode ? 120 : years;
        const rankElement = this.elements.soulRank;
        if (!rankElement) return;

        let level = "Mortal";
        if (displayYears > 40) level = "Sentinel";
        if (displayYears > 60) level = "Sovereign";
        if (displayYears > 80) level = "Eternal";
        if (this.isGhostMode) level = "PHANTOM";

        if (rankElement.textContent !== level) {
            rankElement.textContent = level;
        }

        // Triple Tap Detection for Ghost Mode
        // Attach listener only once
        if (!rankElement._hasGhostModeListener) {
            rankElement._hasGhostModeListener = true;
            rankElement.addEventListener('click', () => {
                const now = Date.now();
                if (now - this.lastSoulTap < 500) { // Taps within 500ms
                    this.soulTaps++;
                    if (this.soulTaps >= 2) { // 3 taps (initial + 2 quick ones)
                        this.toggleGhostMode();
                        this.soulTaps = 0;
                    }
                } else {
                    this.soulTaps = 0; // Reset if too slow
                }
                this.lastSoulTap = now;
            });
        }
    }

    toggleGhostMode() {
        this.isGhostMode = !this.isGhostMode;
        if (this.isGhostMode) {
            this.realTargetDate = this.targetDate;
            // Set decoy: Current date + 120 years
            const decoy = new Date();
            decoy.setFullYear(decoy.getFullYear() + 120);
            this.targetDate = decoy;
            toast.info('GHOST PROTOCOL ACTIVE');
        } else {
            this.targetDate = this.realTargetDate;
            toast.success('REALITY RESTORED');
        }
    }

    tick() {
        // ChronoSync: Use synchronized server time if available
        const now = window.getTrueTime ? window.getTrueTime() : new Date();

        if (!this.targetDate || isNaN(this.targetDate.getTime())) {
            this.render(0, 0, 0, 0, 0, 0);
            return;
        }

        const totalRemainingMs = this.targetDate - now;

        if (totalRemainingMs <= 0 || isNaN(totalRemainingMs)) {
            this.render(0, 0, 0, 0, 0, 0);
            if (this.interval) clearInterval(this.interval);
            return;
        }

        // Apply Sleep Ratio (Conscious Time)
        const safeSleepRatio = isNaN(this.sleepRatio) ? 0.66 : this.sleepRatio;
        const consciousMs = totalRemainingMs * safeSleepRatio;

        if (isNaN(consciousMs)) {
            this.render(0, 0, 0, 0, 0, 0);
            return;
        }

        const years = Math.floor(consciousMs / (1000 * 60 * 60 * 24 * 365.25));
        const days = Math.floor((consciousMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((consciousMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((consciousMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((consciousMs % (1000 * 60)) / 1000);
        const ms = Math.floor(consciousMs % 1000);

        // Update Progress Bar
        const percentage = Math.max(0, Math.min(100, (consciousMs / (1000 * 60 * 60 * 24 * 365.25 * 100)) * 100));
        if (this.elements.progressBar) this.elements.progressBar.style.width = isNaN(percentage) ? '0%' : `${percentage}%`;

        this.updateBiologicalCapital(consciousMs);
        this.updateSoulRank(years);
        this.render(years, days, hours, minutes, seconds, ms);

        // Update Simulator Game Loop
        if (window.simulator) {
            window.simulator.update(Date.now());
        }
    }

    updateBiologicalCapital(ms) {
        // Feature removed per user request for cleanliness.
        // Logic de-activated.
    }

    f(n) { return n.toString().padStart(2, '0'); }

    // --- SECURITY VAULT ---
    async secureSave(key, data) {
        try {
            const encrypted = await this.vault.encrypt(data);
            localStorage.setItem(key, encrypted);
        } catch (e) {
            console.error('Vault Save Failed', e);
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    async secureLoad(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        try {
            // Try to decrypt (New Iron Vault Format)
            const decrypted = await this.vault.decrypt(raw);
            if (decrypted) return decrypted;

            // Fallback to legacy
            return JSON.parse(decodeURIComponent(escape(atob(raw))));
        } catch (e) {
            try { return JSON.parse(raw); } catch (err) { return null; }
        }
    }
    // -----------------------

    shareResult() {
        const years = this.elements.yearsEl.textContent;
        const days = this.elements.daysEl.textContent;
        const hours = this.elements.hoursEl.textContent;
        const equity = this.elements.attentionEquity?.textContent || '0';

        // Create formatted message
        const text = `⏳ CLARITY FOR HUMANS

🔴 BIOLOGICAL CAPITAL REMAINING:
   ${years} Years, ${days} Days, ${hours} Hours

💰 BIOLOGICAL ASSETS PRESERVED

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

        // Broadcast to Ecosystem
        // Used by: Mortal Strand, etc.
        if (window.app?.dob) {
            const now = new Date();
            const lifeMs = now - new Date(window.app.dob);
            const lifeYearMs = 1000 * 60 * 60 * 24 * 365.25;
            const yearPercent = (lifeMs % lifeYearMs) / lifeYearMs; // Percent through current year

            // We reuse the existing percentage math from above if possible or recalc
            window.dispatchEvent(new CustomEvent('life-tick', {
                detail: {
                    years: y, days: d, hours: h, minutes: m, seconds: s, milliseconds: ms,
                    yearPercent: yearPercent
                    // Add more if needed
                }
            }));
        }

        // Update Perspective Units
        if (this.elements.unitSunsets) this.elements.unitSunsets.textContent = (d + (y * 365)).toLocaleString();
        if (this.elements.unitSummers) this.elements.unitSummers.textContent = y;
        if (this.elements.unitBooks) this.elements.unitBooks.textContent = (y * 5).toLocaleString(); // 5 books/year
        if (this.elements.unitMeals) this.elements.unitMeals.textContent = ((d + (y * 365)) * 3).toLocaleString();

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

document.addEventListener('DOMContentLoaded', async () => {
    window.app = new LifeCountdown();

    // Initialize the Iron Vault before loading
    await window.app.vault.init();

    // Attempt to load saved state
    const savedData = await window.app.secureLoad('lifeData');
    if (savedData) {
        window.app.startCountdown(savedData);
    }

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
