import { Silk } from './games/silk.js';
import { Stardust } from './games/stardust.js';
import { Liquid } from './games/liquid.js';
import { Vortex } from './games/vortex.js';
import { PopupSlayer } from './games/popupslayer.js';
import { ErrorStorm } from './games/errorstorm.js';

const artifacts = [
    {
        id: 'popupslayer',
        title: 'POPUP_SLAYER.exe',
        desc: 'Slay the scams. Close the fake popups before they eat your RAM.',
        thumb: '#ff00ff',
        genre: 'SARCASM',
        class: PopupSlayer
    },
    {
        id: 'errorstorm',
        title: 'CRITICAL_CRASH.bat',
        desc: 'Experience the pure bliss of a 1995 system failure.',
        thumb: '#000080',
        genre: 'MEME',
        class: ErrorStorm
    },
    {
        id: 'silk',
        title: 'SILK.scr',
        desc: 'A screensaver from a timeline where computers had feelings.',
        thumb: '#00ff00',
        genre: 'SENSORY',
        class: Silk
    },
    {
        id: 'stardust',
        title: 'STAR_FIELD.exe',
        desc: 'Loading 10,000 real stars into your RAM... please wait.',
        thumb: '#ff6600',
        genre: 'EXPLORER',
        class: Stardust
    },
    {
        id: 'liquid',
        title: 'LAVA_LAMP_98.exe',
        desc: 'Premium desktop accessory for the ultimate browsing experience.',
        thumb: '#00ff88',
        genre: 'RETRO',
        class: Liquid
    },
    {
        id: 'vortex',
        title: 'INTERNET_HIGHWAY.sim',
        desc: 'How the 90s thought the internet looked. Pure speed.',
        thumb: '#0088ff',
        genre: 'HISTORY',
        class: Vortex
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
        this.grid.innerHTML = '';
        artifacts.forEach(item => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="card-thumb" style="background: ${item.thumb}; color: white; display:flex; align-items:center; justify-content:center; text-align:center; padding: 10px; font-weight: bold; border: 4px inset #fff;">
                    ${item.title}
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-meta">
                    <span>${item.genre}</span>
                    <span>v1.0</span>
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

        // Disable scroll
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
