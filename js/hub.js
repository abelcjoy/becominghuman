import { CyberBreaker } from './games/cyberbreaker.js';
import { NeonPulse } from './games/neonpulse.js';
import { Vortex } from './games/vortex.js';
import { Atrophy } from './games/atrophy.js';
import { Shift } from './games/shift.js';
import { Aura } from './games/aura.js';
import { Shatter } from './games/shatter.js';
import { GlitchRun } from './games/glitchrun.js';
import { Orbit } from './games/orbit.js';
import { Prism } from './games/prism.js';
import { Flux } from './games/flux.js';
import { Echo } from './games/echo.js';
import { Drift } from './games/drift.js';
import { Entanglement } from './games/entanglement.js';
import { Biosync } from './games/biosync.js';
import { Monolith } from './games/monolith.js';

const games = [
    {
        id: 'cyberbreaker',
        title: 'CYBER BREAKER',
        desc: 'Smash through system walls in this neon-infused block breaker.',
        thumb: 'linear-gradient(135deg, #00f2ff, #0066ff)',
        players: '1P',
        genre: 'ARCADE',
        class: CyberBreaker
    },
    {
        id: 'neonpulse',
        title: 'NEON PULSE',
        desc: 'React to the rhythm of the grid. Extraordinary visuals & sound.',
        thumb: 'linear-gradient(135deg, #ff00ff, #7000ff)',
        players: '1P',
        genre: 'RHYTHM',
        class: NeonPulse
    },
    {
        id: 'vortex',
        title: 'VORTEX',
        desc: 'Navigate the infinite void with hypnotic precision.',
        thumb: 'linear-gradient(135deg, #00ff88, #0088ff)',
        players: '1P',
        genre: 'EVASIVE',
        class: Vortex
    },
    {
        id: 'atrophy',
        title: 'ATROPHY',
        desc: 'Keep the dying star stable. A masterclass in particle gravity.',
        thumb: 'linear-gradient(135deg, #ff3366, #ff0000)',
        players: '1P',
        genre: 'SURVIVAL',
        class: Atrophy
    },
    {
        id: 'shift',
        title: 'SHIFT',
        desc: 'Phase through reality. Match your color to the obstacles.',
        thumb: 'linear-gradient(135deg, #00f2ff, #ff00ff)',
        players: '1P',
        genre: 'PUZZLE',
        class: Shift
    },
    {
        id: 'aura',
        title: 'AURA',
        desc: 'Deploy ripples of light to dissolve the encroaching shadows.',
        thumb: 'linear-gradient(135deg, #00f2ff, #ffffff)',
        players: '1P',
        genre: 'DEFENSE',
        class: Aura
    },
    {
        id: 'shatter',
        title: 'SHATTER',
        desc: 'High-impact physics destruction. Break everything.',
        thumb: 'linear-gradient(135deg, #ffffff, #888888)',
        players: '1P',
        genre: 'PHYSICS',
        class: Shatter
    },
    {
        id: 'glitchrun',
        title: 'GLITCH RUN',
        desc: 'Outrun the system error in this high-speed dash.',
        thumb: 'linear-gradient(135deg, #00ff00, #004400)',
        players: '1P',
        genre: 'RUNNER',
        class: GlitchRun
    },
    {
        id: 'orbit',
        title: 'ORBIT',
        desc: 'Master gravitational slingshots and luminous trails.',
        thumb: 'linear-gradient(135deg, #00f2ff, #ff00ff)',
        players: '1P',
        genre: 'GRAVITY',
        class: Orbit
    },
    {
        id: 'prism',
        title: 'PRISM',
        desc: 'Refract light beams to hit the core in this visual puzzle.',
        thumb: 'linear-gradient(135deg, #ff00ff, #00f2ff)',
        players: '1P',
        genre: 'PUZZLE',
        class: Prism
    },
    {
        id: 'flux',
        title: 'FLUX',
        desc: 'Interact with a hypnotic fluid particle field.',
        thumb: 'linear-gradient(135deg, #00ffff, #008888)',
        players: '1P',
        genre: 'FLUID',
        class: Flux
    },
    {
        id: 'echo',
        title: 'ECHO',
        desc: 'Match vibrational frequencies through visual harmony.',
        thumb: 'linear-gradient(135deg, #ffffff, #ff00ff)',
        players: '1P',
        genre: 'HARMONY',
        class: Echo
    },
    {
        id: 'drift',
        title: 'DRIFT',
        desc: 'Neon-infused top-down drifting simulator.',
        thumb: 'linear-gradient(135deg, #00f2ff, #222222)',
        players: '1P',
        genre: 'DRIVE',
        class: Drift
    },
    {
        id: 'entanglement',
        title: 'ENTANGLEMENT',
        desc: 'Navigate the void with two nodes linked by a quantum thread.',
        thumb: 'linear-gradient(135deg, #ff00ff, #00f2ff)',
        players: '1P',
        genre: 'PHYSICS',
        class: Entanglement
    },
    {
        id: 'biosync',
        title: 'BIOSYNC',
        desc: 'Balance biological rhythms in this organic survival game.',
        thumb: 'linear-gradient(135deg, #ff3366, #00f2ff)',
        players: '1P',
        genre: 'BIO',
        class: Biosync
    },
    {
        id: 'monolith',
        title: 'MONOLITH',
        desc: 'Align the ancient monolith to unlock the path.',
        thumb: 'linear-gradient(135deg, #222222, #00f2ff)',
        players: '1P',
        genre: 'PUZZLE',
        class: Monolith
    }
];

class GameHub {
    constructor() {
        this.grid = document.getElementById('main-grid');
        this.view = document.getElementById('game-view');
        this.canvas = document.getElementById('game-canvas');
        this.activeGame = null;

        this.init();
    }

    init() {
        this.renderGrid();
        this.setupEvents();
    }

    renderGrid() {
        // Update stats
        const gameCountEl = document.querySelector('.stat-item span');
        if (gameCountEl) gameCountEl.innerText = games.length;

        this.grid.innerHTML = games.map(game => `
            <div class="game-card" data-id="${game.id}">
                <div class="card-thumb" style="background: ${game.thumb}">
                    <div style="color:#fff; font-weight:800; font-size:2rem; opacity:0.3">${game.title.split(' ')[0]}</div>
                </div>
                <div class="card-info">
                    <div class="card-title">${game.title}</div>
                    <div class="card-meta">
                        <span>${game.genre}</span>
                        <span>${game.players}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add placeholders for "ton of games" effect
        for (let i = 0; i < 6; i++) {
            this.grid.innerHTML += `
                <div class="game-card" style="opacity: 0.3; filter: grayscale(1); cursor: default;">
                    <div class="card-thumb" style="background: #111"></div>
                    <div class="card-info">
                        <div class="card-title">LOCKED</div>
                        <div class="card-meta"><span>???</span></div>
                    </div>
                </div>
            `;
        }
    }

    setupEvents() {
        this.grid.addEventListener('click', (e) => {
            const card = e.target.closest('.game-card');
            if (card && card.dataset.id) {
                this.launchGame(card.dataset.id);
            }
        });

        document.getElementById('quit-game').addEventListener('click', () => this.exitGame());

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.exitGame();
        });
    }

    launchGame(id) {
        const gameData = games.find(g => g.id === id);
        if (!gameData || !gameData.class) return;

        this.view.classList.add('active');
        document.getElementById('active-game-title').innerText = gameData.title;

        // Hide body scroll
        document.body.style.overflow = 'hidden';

        // Instantiate game
        this.activeGame = new gameData.class(this.canvas);
        this.activeGame.start();
    }

    exitGame() {
        if (this.activeGame) {
            this.activeGame.stop();
            this.activeGame = null;
        }
        this.view.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.hub = new GameHub();
