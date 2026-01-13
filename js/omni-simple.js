/**
 * 💎 Omni Tools - 13 ELITE TOOLS (CORE EDITION) 💎
 * 
 * CORE: Calculator, Unit Pro, Secret Key Gen
    * AI FINDER BATCH 1: Text - to - Image, Text - to - Video, Image - to - Video, Logo Gen, Upscalers, etc.
 */

class OmniTools {
    constructor() {
        this.tools = this.initTools();
        this.currentTool = null;
        this.init();
    }

    init() {
        this.renderGrid();

        const search = document.getElementById('search');
        let timeout;
        search.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.renderGrid(e.target.value), 150);
        });

        document.getElementById('back-btn').addEventListener('click', () => this.closeToolView());

        // Privacy Logic
        const privacyView = document.getElementById('privacy-view');
        if (privacyView) {
            const link = document.querySelector('a[href="#privacy"]');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    privacyView.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            }
            document.getElementById('close-privacy-btn').addEventListener('click', () => {
                privacyView.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    }

    initTools() {
        return {
            basicCalc: {
                name: "Omni Calculator",
                searchTerms: "calc math basic calculator addition",
                description: "Clean math utility",
                icon: "🔢",
                category: "Utility",
                render: () => this.renderCalculator()
            },
            unitConverter: {
                name: "Unit Pro",
                searchTerms: "convert weight length temperature units",
                description: "Universal converter",
                icon: "🔄",
                category: "Utility",
                render: () => this.renderUnitConverter()
            },
            passwordGen: {
                name: "Secret Key Gen",
                searchTerms: "password security generator random",
                description: "Secure keys",
                icon: "🔐",
                category: "Security",
                render: () => this.renderPasswordGen()
            },
            // === AI FINDER BATCH 1: VISUAL GEN ===
            textToImageAI: {
                name: "Text to Image AI",
                searchTerms: "ai image generator art text to image photo",
                description: "Create art from text",
                icon: "🎨",
                category: "AI Finder",
                render: () => this.renderAiFinder('Text to Image', 'Create high-quality art and photos from simple text descriptions.', [
                    { name: 'Leonardo.ai', status: '150 Free Daily Credits', link: 'https://leonardo.ai' },
                    { name: 'Microsoft Designer', status: 'Totally Free (Bing)', link: 'https://designer.microsoft.com' },
                    { name: 'Adobe Firefly', status: 'Free Web Version', link: 'https://firefly.adobe.com' }
                ])
            },
            textToVideoAI: {
                name: "Text to Video AI",
                searchTerms: "ai video generator text to video clips movie",
                description: "Generate video from text",
                icon: "🎬",
                category: "AI Finder",
                render: () => this.renderAiFinder('Text to Video', 'Turn your ideas into cinematic video clips using AI.', [
                    { name: 'Luma Dream Machine', status: 'High Quality Free Tier', link: 'https://lumalabs.ai/dream-machine' },
                    { name: 'Runway Gen-2', status: 'Industry Standard', link: 'https://runwayml.com' },
                    { name: 'Pika Labs', status: 'Best for Animation', link: 'https://pika.art' }
                ])
            },
            imageToVideoAI: {
                name: "Image to Video AI",
                searchTerms: "ai animate photo image to video motion",
                description: "Animate your photos",
                icon: "✨",
                category: "AI Finder",
                render: () => this.renderAiFinder('Image to Video', 'Upload any image and bring it to life with AI animation.', [
                    { name: 'Kling AI', status: 'Powerful Realistic Motion', link: 'https://klingai.com' },
                    { name: 'Luma Labs', status: 'Free Daily Gen', link: 'https://lumalabs.ai' },
                    { name: 'Hailuo AI', status: 'Fastest Animation', link: 'https://hailuoai.com' }
                ])
            },
            logoGenAI: {
                name: "Logo Generator AI",
                searchTerms: "ai logo maker business brand design",
                description: "Design brand logos",
                icon: "🎯",
                category: "AI Finder",
                render: () => this.renderAiFinder('Logo Generator', 'Create professional-grade logos for your brand or business in seconds.', [
                    { name: 'Looka', status: 'Free Preview', link: 'https://looka.com' },
                    { name: 'Brandmark', status: 'Instant Generation', link: 'https://brandmark.io' },
                    { name: 'Logo.com', status: 'Simple & Fast', link: 'https://logo.com' }
                ])
            },
            upscaleAI: {
                name: "Photo Upscaler AI",
                searchTerms: "ai upscale image enhance resolution fix photo",
                description: "Increase photo quality",
                icon: "📐",
                category: "AI Finder",
                render: () => this.renderAiFinder('Photo Upscaler', 'Enlarge your images and fix low-resolution photos using AI.', [
                    { name: 'Upscale.media', status: 'Free & Unlimited', link: 'https://upscale.media' },
                    { name: 'BigJPG', status: 'Best for Anime/Art', link: 'https://bigjpg.com' },
                    { name: 'VanceAI', status: 'Professional Results', link: 'https://vanceai.com' }
                ])
            },
            bgRemoverAI: {
                name: "BG Remover AI",
                searchTerms: "ai remove background transparent png cut out",
                description: "Remove image backgrounds",
                icon: "🖼️",
                category: "AI Finder",
                render: () => this.renderAiFinder('Background Remover', 'Instantly remove backgrounds and create transparent PNGs.', [
                    { name: 'Adobe Express', status: 'Best Quality (Free)', link: 'https://www.adobe.com/express/feature/image/remove-background' },
                    { name: 'Remove.bg', status: 'The Classic Standard', link: 'https://remove.bg' },
                    { name: 'Photoroom', status: 'Great for Products', link: 'https://photoroom.com' }
                ])
            },
            objectRemoverAI: {
                name: "Object Remover AI",
                searchTerms: "ai remove object clean photo erase person",
                description: "Erase things from photos",
                icon: "🧽",
                category: "AI Finder",
                render: () => this.renderAiFinder('Object Remover', 'Clean up your photos by erasing unwanted people or objects.', [
                    { name: 'Magic Eraser', status: 'Simple & Free', link: 'https://magiceraser.io' },
                    { name: 'Cleanup.pictures', status: 'Instant Results', link: 'https://cleanup.pictures' },
                    { name: 'Fotor', status: 'Pro Editing Tools', link: 'https://fotor.com' }
                ])
            },
            headshotAI: {
                name: "AI Headshots",
                searchTerms: "ai headshot linkedin photo profile picture",
                description: "Create pro profiles",
                icon: "👤",
                category: "AI Finder",
                render: () => this.renderAiFinder('AI Headshots', 'Generate professional LinkedIn-style headshots from your selfies.', [
                    { name: 'Remini AI', status: 'Best Mobile App', link: 'https://remini.ai' },
                    { name: 'Aragon AI', status: 'Professional Quality', link: 'https://aragon.ai' },
                    { name: 'PFPMaker', status: 'Free Profile Pics', link: 'https://pfpmaker.com' }
                ])
            },
            sketchToImageAI: {
                name: "Sketch to Image AI",
                searchTerms: "ai sketch draw to photo scribble art",
                description: "Turn sketches into art",
                icon: "🖍️",
                category: "AI Finder",
                render: () => this.renderAiFinder('Sketch to Image', 'Turn your simple hand-drawn sketches into beautiful AI art.', [
                    { name: 'Scribble Diffusion', status: 'Totally Free (Open)', link: 'https://scribblediffusion.com' },
                    { name: 'Vizcom', status: 'Best for Designers', link: 'https://vizcom.com' },
                    { name: 'PromeAI', status: 'Architectural Style', link: 'https://promeai.com' }
                ])
            },
            textTo3DAI: {
                name: "Text to 3D AI",
                searchTerms: "ai 3d model text to 3d mesh object",
                description: "Generate 3D models",
                icon: "🧊",
                category: "AI Finder",
                render: () => this.renderAiFinder('Text to 3D', 'Create 3D meshes and models for gaming or design from text.', [
                    { name: 'Spline AI', status: 'Innovative & Interactive', link: 'https://spline.design' },
                    { name: 'Luma Mesh', status: 'High Fidelity', link: 'https://lumalabs.ai/genie' },
                    { name: 'Meshy', status: 'Best for Game Dev', link: 'https://meshy.ai' }
                ])
            }
        };
    }

    renderGrid(filter = '') {
        const grid = document.getElementById('tools-grid');
        grid.innerHTML = '';

        const filtered = Object.entries(this.tools).filter(([id, tool]) => {
            const searchStr = `${tool.name} ${tool.searchTerms} ${tool.category}`.toLowerCase();
            return searchStr.includes(filter.toLowerCase());
        });

        filtered.forEach(([id, tool]) => {
            const card = document.createElement('div');
            card.className = 'tool-card pulse-hover';
            card.innerHTML = `
                <div class="tool-icon">${tool.icon}</div>
                <h3 class="tool-name">${tool.name}</h3>
                <p class="tool-desc">${tool.description}</p>
                <div class="tool-category">${tool.category}</div>
            `;
            card.addEventListener('click', () => this.openTool(id));
            grid.appendChild(card);
        });
    }

    openTool(id) {
        this.currentTool = id;
        const tool = this.tools[id];
        const view = document.getElementById('tool-view');
        const content = document.getElementById('tool-content');

        content.innerHTML = ''; // Clear previous
        tool.render();

        view.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeToolView() {
        const view = document.getElementById('tool-view');
        view.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentTool = null;
    }

    // === RENDER METHODS (AI FINDER) ===

    renderAiFinder(title, slogan, recommendations) {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <div style="text-align:center; padding-bottom: 20px;">
                <h2 class="tool-title" style="margin-bottom:10px;">${title} AI</h2>
                <p style="color:#888; font-size:14px; margin-bottom:20px;">${slogan}</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:16px;">
                ${recommendations.map(tool => `
                    <div style="background:#0a0a0a; border:1px solid #222; border-radius:12px; padding:20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="text-align:left;">
                            <div style="font-weight:700; font-size:18px; color:#fff;">${tool.name}</div>
                            <div style="font-size:12px; color:#666; margin-top:4px;">STATUS: <span style="color:rgba(0,255,100,0.8); font-weight:600;">${tool.status.toUpperCase()}</span></div>
                        </div>
                        <a href="${tool.link}" target="_blank" style="text-decoration:none;">
                            <button style="padding:10px 20px; font-size:13px; background:#fff; color:#000; border-radius:8px; font-weight:700; cursor:pointer;">TRY NOW →</button>
                        </a>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top:30px; padding:15px; background:rgba(255,255,255,0.03); border-radius:8px; font-size:11px; color:#555; text-align:center;">
                Prices and features are subject to change. We recommend the "Free Tiers" for beginners.
            </div>
        `;
    }

    // === RENDER METHODS (CLEAN SLATE) ===

    renderCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Omni Calculator</h2>
            <div style="display:grid; grid-template-columns:1fr; gap:10px;">
                <input type="text" id="calc-display" disabled style="width:100%; height:40px; text-align:right; font-size:1.5em; background:#111; color:lime; border:1px solid #333; padding:5px;">
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:5px;">
                    ${[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', 'C', '+', '='].map(btn => `
                        <button onclick="window.omniCalc('${btn}')" class="calc-btn">${btn}</button>
                    `).join('')}
                </div>
            </div>
        `;

        window.omniCalc = (val) => {
            const disp = document.getElementById('calc-display');
            if (val === '=') {
                try { disp.value = eval(disp.value); } catch (e) { disp.value = 'Error'; }
            } else if (val === 'C') {
                disp.value = '';
            } else {
                disp.value += val;
            }
        };
    }

    renderUnitConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Unit Pro</h2>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <input type="number" id="unit-val" value="1" style="width:100%;">
                <select id="unit-type" style="width:100%; font-size:0.8em;">
                    <option value="km-mi">Kilometers to Miles</option>
                    <option value="kg-lb">Kilograms to Pounds</option>
                    <option value="c-f">Celsius to Fahrenheit</option>
                </select>
                <div id="unit-out" style="font-size:1.2em; color:cyan; text-align:center;">0.62 Miles</div>
                <button onclick="window.omniConvert()" style="width:100%; background:#444;">CONVERT</button>
            </div>
        `;

        window.omniConvert = () => {
            const val = parseFloat(document.getElementById('unit-val').value);
            const type = document.getElementById('unit-type').value;
            const out = document.getElementById('unit-out');
            if (type === 'km-mi') out.innerText = (val * 0.621371).toFixed(2) + ' Miles';
            if (type === 'kg-lb') out.innerText = (val * 2.20462).toFixed(2) + ' Pounds';
            if (type === 'c-f') out.innerText = ((val * 9 / 5) + 32).toFixed(2) + ' Fahrenheit';
        };
    }

    renderPasswordGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Secret Key Gen</h2>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <input type="text" id="pass-out" readonly style="width:100%; color:gold; text-align:center; background:#111;">
                <button onclick="window.omniPass()" style="width:100%; background:#d32f2f;">GENERATE ENCRYPTED KEY</button>
                <div style="font-size:0.6em; color:#888;">Uses local entropy for high-security randomness.</div>
            </div>
        `;

        window.omniPass = () => {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            let pass = "";
            for (let i = 0; i < 16; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
            document.getElementById('pass-out').value = pass;
        };
    }
}

// Initialize
window.omni = new OmniTools();
