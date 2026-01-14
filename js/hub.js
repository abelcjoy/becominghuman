import { Vortex } from './games/vortex.js';
import { Aura } from './games/aura.js';
import { Orbit } from './games/orbit.js';
import { Prism } from './games/prism.js';
import { Flux } from './games/flux.js';
import { Echo } from './games/echo.js';
import { Drift } from './games/drift.js';
import { Entanglement } from './games/entanglement.js';
import { Monolith } from './games/monolith.js';
import { Silk } from './games/silk.js';
import { Stardust } from './games/stardust.js';
import { Liquid } from './games/liquid.js';

const games = [
    {
        id: 'silk',
        title: 'SILK',
        desc: 'A physical meditation in light. Weave through harmonic resonance nodes.',
        thumb: 'linear-gradient(135deg, #4400ff, #00f2ff)',
        players: 'SENSORY',
        genre: 'ASMR',
        class: Silk
    },
    {
        id: 'liquid',
        title: 'LIQUID',
        desc: 'Interact with a pool of photonic fluid. Mix colors and feel the tension.',
        thumb: 'linear-gradient(135deg, #00ff88, #4400ff)',
        players: 'SENSORY',
        genre: 'FLUID',
        class: Liquid
    },
    {
        id: 'stardust',
        title: 'STARDUST',
        desc: 'Command a solar storm. Manipulate thousands of star particles.',
        thumb: 'linear-gradient(135deg, #ff6600, #ffcc00)',
        players: 'SENSORY',
        genre: 'SIM',
        class: Stardust
    },
    {
        id: 'flux',
        title: 'FLUX',
        desc: 'A hypnotic fluid particle field. High visual elegance and smooth motion.',
        thumb: 'linear-gradient(135deg, #00ffff, #008888)',
        players: 'SENSORY',
        genre: 'AESTHETIC',
        class: Flux
    },
    {
        id: 'echo',
        title: 'ECHO',
        desc: 'Match vibrational frequencies through visual harmony.',
        thumb: 'linear-gradient(135deg, #ffffff, #ff00ff)',
        players: 'SENSORY',
        genre: 'HARMONY',
        class: Echo
    },
    {
        id: 'vortex',
        title: 'VORTEX',
        desc: 'Navigate the infinite void with hypnotic precision.',
        thumb: 'linear-gradient(135deg, #00ff88, #0088ff)',
        players: 'SENSORY',
        genre: 'EVASIVE',
        class: Vortex
    },
    {
        id: 'aura',
        title: 'AURA',
        desc: 'Deploy ripples of light to dissolve the encroaching shadows.',
        thumb: 'linear-gradient(135deg, #00f2ff, #ffffff)',
        players: 'SENSORY',
        genre: 'DEFENSE',
        class: Aura
    },
    {
        id: 'monolith',
        title: 'MONOLITH',
        desc: 'Align the ancient monolith to unlock the path.',
        thumb: 'linear-gradient(135deg, #222222, #00f2ff)',
        players: 'SENSORY',
        genre: 'PUZZLE',
        class: Monolith
    },
    {
        id: 'entanglement',
        title: 'ENTANGLEMENT',
        desc: 'Navigate the void with two nodes linked by a quantum thread.',
        thumb: 'linear-gradient(135deg, #ff00ff, #00f2ff)',
        players: 'SENSORY',
        genre: 'PHYSICS',
        class: Entanglement
    }
];

class GameHub {
    constructor() {
        this.grid = document.getElementById('main-grid');
        this.gameView = document.getElementById('game-view');
        this.canvas = document.getElementById('game-canvas');
        this.activeGame = null;
        this.totalGamesElem = document.querySelector('.stat-item:first-child span');

        this.init();
    }

    init() {
        this.renderGrid();
        this.updateStats();

        document.getElementById('quit-game').onclick = () => this.exitGame();
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.exitGame();
        });
    }

    updateStats() {
        if (this.totalGamesElem) {
            this.totalGamesElem.innerText = games.length;
        }
    }

    renderGrid() {
        this.grid.innerHTML = '';
        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="card-thumb" style="background: ${game.thumb}">
                    <div style="font-size: 3rem; opacity: 0.2; font-weight: 800;">${game.title[0]}</div>
                </div>
                <div class="card-info">
                    <div class="card-title">${game.title}</div>
                    <div class="card-meta">
                        <span>${game.genre}</span>
                        <span>${game.players}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: #888; margin-top: 8px;">${game.desc}</p>
                </div>
            `;
            card.onclick = () => this.launchGame(game.id);
            this.grid.appendChild(card);
        });
    }

    launchGame(id) {
        const gameData = games.find(g => g.id === id);
        if (!gameData) return;

        this.gameView.classList.add('active');
        document.getElementById('active-game-title').innerText = gameData.title;

        // Disable scrolling on body
        document.body.style.overflow = 'hidden';

        this.activeGame = new gameData.class(this.canvas);
        this.activeGame.start();

        // Handle Resize
        this.resizeHandler = () => this.activeGame.resize();
        window.addEventListener('resize', this.resizeHandler);
    }

    exitGame() {
        if (!this.activeGame) return;

        this.activeGame.stop();
        this.activeGame = null;
        this.gameView.classList.remove('active');
        document.body.style.overflow = 'auto';

        window.removeEventListener('resize', this.resizeHandler);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GameHub();
});
