import { GravityDash } from './games/gravitydash.js';
import { CoreBreaker } from './games/corebreaker.js';
import { HexPulse } from './games/hexpulse.js';

const artifacts = [
    {
        id: 'gravitydash',
        title: 'GRAVITY_DASH.exe',
        desc: 'Flip gravity, dodge lethal light. One touch is all you need for 100% CPU usage.',
        thumb: 'linear-gradient(135deg, #00ffff, #0000ff)',
        genre: 'REFLEX',
        class: GravityDash
    },
    {
        id: 'corebreaker',
        title: 'CORE_BREAKER.bat',
        desc: 'Shatter the central data core. Stress-testing your timing in 16-bit neon.',
        thumb: 'linear-gradient(135deg, #ff00ff, #00ffff)',
        genre: 'TIMEOUT',
        class: CoreBreaker
    },
    {
        id: 'hexpulse',
        title: 'HEX_PULSE.scr',
        desc: 'Navigate the geometric collapse. A study in rhythmic survival and system logic.',
        thumb: 'linear-gradient(135deg, #ffff00, #ff00ff)',
        genre: 'SURVIVE',
        class: HexPulse
    }
];

class GameHub {
    constructor() {
        this.grid = document.getElementById('main-grid');
        this.gameView = document.getElementById('game-view');
        this.canvas = document.getElementById('game-canvas');
        this.activeGame = null;

        this.init();
    }

    init() {
        this.renderGrid();
        document.getElementById('game-count').innerText = artifacts.length;
        document.getElementById('quit-game').onclick = () => this.exitGame();

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.exitGame();
        });
    }

    renderGrid() {
        if (!this.grid) return;
        this.grid.innerHTML = '';
        artifacts.forEach(item => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="card-thumb" style="background: ${item.thumb}; color: white; display:flex; align-items:center; justify-content:center; text-align:center; padding: 10px; font-weight: bold; border: 4px inset #fff;">
                    ${item.title.split('.')[0]}
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-meta">
                    <span>${item.genre}</span>
                    <span>v2.0_RETRO</span>
                </div>
                <p style="margin-top: 10px; color: #333; font-size: 0.9rem;">${item.desc}</p>
            `;
            card.onclick = () => this.launchGame(item.id);
            this.grid.appendChild(card);
        });
    }

    launchGame(id) {
        const data = artifacts.find(a => a.id === id);
        if (!data) return;

        this.gameView.classList.add('active');
        document.getElementById('active-game-title').innerText = data.title;

        document.body.style.overflow = 'hidden';

        this.activeGame = new data.class(this.canvas);
        this.activeGame.start();

        this.resizeHandler = () => this.activeGame.resize();
        window.addEventListener('resize', this.resizeHandler);
    }

    exitGame() {
        if (this.activeGame) {
            this.activeGame.stop();
            this.activeGame = null;
        }
        this.gameView.classList.remove('active');
        document.body.style.overflow = 'auto';
        window.removeEventListener('resize', this.resizeHandler);
    }
}

document.addEventListener('DOMContentLoaded', () => new GameHub());
