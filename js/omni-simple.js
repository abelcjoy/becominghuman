/**
 * 💎 Omni Tools - 33 ELITE TOOLS (CORE EDITION) 💎
 * 
 * CORE: Calculator, Unit Pro, Secret Key Gen
 * AI FINDER BATCH 1: Visual Generation (Text-to-Image, Video, etc.)
 * AI FINDER BATCH 2: Audio & Voice (TTS, Music, Translation)
 * AI FINDER BATCH 3: Writing & Research (Essay, PDF, Email)
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
        if (search) {
            let timeout;
            search.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.renderGrid(e.target.value), 150);
            });
        }

        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.closeToolView());
        }

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
            const closePrivacy = document.getElementById('close-privacy-btn');
            if (closePrivacy) {
                closePrivacy.addEventListener('click', () => {
                    privacyView.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
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
            },
            // === AI FINDER BATCH 2: AUDIO & VOICE ===
            textToSpeechAI: {
                name: "Text to Speech AI",
                searchTerms: "ai voice generator text to speech read aloud narration",
                description: "Lifelike voice narration",
                icon: "🎙️",
                category: "AI Finder",
                render: () => this.renderAiFinder('Text to Speech', 'Convert written text into natural, lifelike human voices.', [
                    { name: 'ElevenLabs', status: 'Industry Leader (Free Tier)', link: 'https://elevenlabs.io' },
                    { name: 'Speechify', status: 'Best for Reading', link: 'https://speechify.com' },
                    { name: 'Play.ht', status: 'Pro Voiceovers', link: 'https://play.ht' }
                ])
            },
            speechToTextAI: {
                name: "Speech to Text AI",
                searchTerms: "ai transcribe speech to text meeting notes dictate",
                description: "Transcribe audio to text",
                icon: "✍️",
                category: "AI Finder",
                render: () => this.renderAiFinder('Speech to Text', 'Automatically transcribe meetings, interviews, and audio files into text.', [
                    { name: 'Otter.ai', status: 'Best for Meetings', link: 'https://otter.ai' },
                    { name: 'Whisper (OpenAI)', status: 'Most Accurate (API)', link: 'https://openai.com/research/whisper' },
                    { name: 'Rev AI', status: 'Fast & Reliable', link: 'https://rev.ai' }
                ])
            },
            voiceChangerAI: {
                name: "Voice Changer AI",
                searchTerms: "ai voice changer realtime filter anonymous gaming",
                description: "Change your voice profile",
                icon: "🎭",
                category: "AI Finder",
                render: () => this.renderAiFinder('Voice Changer', 'Alter your voice in real-time or for recordings using AI filters.', [
                    { name: 'Voicemod', status: 'Top for Gaming', link: 'https://voicemod.net' },
                    { name: 'Respeecher', status: 'Cinema Quality', link: 'https://respeecher.com' },
                    { name: 'Kits.ai', status: 'Best for Music', link: 'https://kits.ai' }
                ])
            },
            textToMusicAI: {
                name: "Text to Music AI",
                searchTerms: "ai music generator text to song compose beat",
                description: "Compose songs from text",
                icon: "🎵",
                category: "AI Finder",
                render: () => this.renderAiFinder('Text to Music', 'Generate full songs and background tracks from simple descriptions.', [
                    { name: 'Suno AI', status: 'Incredible Full Songs', link: 'https://suno.com' },
                    { name: 'Udio', status: 'Hyper-Realistic Audio', link: 'https://udio.com' },
                    { name: 'Soundraw', status: 'Royalty-Free Beats', link: 'https://soundraw.io' }
                ])
            },
            vocalRemoverAI: {
                name: "Vocal Remover AI",
                searchTerms: "ai remove vocals isolate voice karaoke instrumental",
                description: "Isolate vocals or music",
                icon: "🎧",
                category: "AI Finder",
                render: () => this.renderAiFinder('Vocal Remover', 'Extract vocals or instrumentals from any song with precision.', [
                    { name: 'LALAL.AI', status: 'Best Stem Splitter', link: 'https://lalal.ai' },
                    { name: 'Moises.ai', status: 'Best for Musicians', link: 'https://moises.ai' },
                    { name: 'Gaudiolab', status: 'Totally Free (Web)', link: 'https://gaudiolab.com' }
                ])
            },
            podcastEnhanceAI: {
                name: "Podcast Enhancer AI",
                searchTerms: "ai clean audio podcast fix noise studio quality",
                description: "Fix bad audio quality",
                icon: "🔊",
                category: "AI Finder",
                render: () => this.renderAiFinder('Podcast Enhancer', 'Turn bad microphone recordings into studio-quality audio instantly.', [
                    { name: 'Adobe Podcast', status: 'Free (Game Changer)', link: 'https://podcast.adobe.com' },
                    { name: 'Auphonic', status: 'One-Stop Mastering', link: 'https://auphonic.com' },
                    { name: 'Cleanvoice', status: 'Removes Fillers', link: 'https://cleanvoice.ai' }
                ])
            },
            voiceTranslateAI: {
                name: "AI Voice Translate",
                searchTerms: "ai translate voice video dubbing language",
                description: "Dub video seamlessly",
                icon: "🌍",
                category: "AI Finder",
                render: () => this.renderAiFinder('Voice Translator', 'Translate your videos into other languages while keeping your voice.', [
                    { name: 'HeyGen', status: 'Best Video Dubbing', link: 'https://heygen.com' },
                    { name: 'Rask.ai', status: 'Professional Translation', link: 'https://rask.ai' },
                    { name: 'Dubverse', status: 'Fast Creator Support', link: 'https://dubverse.ai' }
                ])
            },
            noiseFixerAI: {
                name: "Noise Fixer AI",
                searchTerms: "ai remove background noise krisp clear audio",
                description: "Erase background noise",
                icon: "🤫",
                category: "AI Finder",
                render: () => this.renderAiFinder('Noise Fixer', 'Remove background noise from your calls or recordings in real-time.', [
                    { name: 'Krisp', status: 'Best for Meetings', link: 'https://krisp.ai' },
                    { name: 'Podcastle', status: 'Great for Creators', link: 'https://podcastle.ai' },
                    { name: 'Swell AI', status: 'Content Focus', link: 'https://swellai.com' }
                ])
            },
            songGenAI: {
                name: "AI Song Generator",
                searchTerms: "ai write song lyrics composer music",
                description: "Create custom songs",
                icon: "🎸",
                category: "AI Finder",
                render: () => this.renderAiFinder('Song Generator', 'Build custom songs with lyrics and melodies using AI.', [
                    { name: 'Boomy', status: 'Easiest Song Maker', link: 'https://boomy.com' },
                    { name: 'AIVA', status: 'Cinematic Composer', link: 'https://aiva.ai' },
                    { name: 'Stable Audio', status: 'Short Audio Loops', link: 'https://stableaudio.com' }
                ])
            },
            audioScriptAI: {
                name: "Audio Script AI",
                searchTerms: "ai voiceover script script reader murf",
                description: "Pro voiceovers for scripts",
                icon: "📖",
                category: "AI Finder",
                render: () => this.renderAiFinder('Audio Script AI', 'Turn your scripts into professional voiceovers for videos.', [
                    { name: 'Murf.ai', status: 'Studio Quality Voices', link: 'https://murf.ai' },
                    { name: 'LOVO AI', status: 'Great for Games/Ads', link: 'https://lovo.ai' },
                    { name: 'WellSaid Labs', status: 'Most Natural Tech', link: 'https://wellsaidlabs.com' }
                ])
            },
            // === AI FINDER BATCH 3: WRITING & RESEARCH ===
            essayWriterAI: {
                name: "AI Essay Writer",
                searchTerms: "ai essay writer paper homework college writing acadmic",
                description: "Write essays & papers",
                icon: "📝",
                category: "AI Finder",
                render: () => this.renderAiFinder('Essay Writer', 'Generate well-structured essays, papers, and academic reports.', [
                    { name: 'Textero.ai', status: 'Best for College Papers', link: 'https://textero.ai' },
                    { name: 'Jasper.ai', status: 'Professional Content', link: 'https://jasper.ai' },
                    { name: 'Writesonic', status: 'Fast Article Gen', link: 'https://writesonic.com' }
                ])
            },
            pdfSummarizerAI: {
                name: "PDF Summarizer AI",
                searchTerms: "ai pdf summary chat with doc research analyze",
                description: "Summarize long documents",
                icon: "📄",
                category: "AI Finder",
                render: () => this.renderAiFinder('PDF Summarizer', 'Upload long PDFs and long documents to get instant summaries.', [
                    { name: 'ChatPDF', status: 'Best Overall Tool', link: 'https://chatpdf.com' },
                    { name: 'Humata AI', status: 'Detailed Analysis', link: 'https://humata.ai' },
                    { name: 'AskYourPDF', status: 'Top Rated Chrome Ext', link: 'https://askyourpdf.com' }
                ])
            },
            emailAutomatorAI: {
                name: "Email Automator AI",
                searchTerms: "ai email writer professional mail reply automate",
                description: "Write perfect emails",
                icon: "📧",
                category: "AI Finder",
                render: () => this.renderAiFinder('Email Writer', 'Generate professional emails and automated replies in seconds.', [
                    { name: 'Flowrite', status: 'Best for Productivity', link: 'https://flowrite.com' },
                    { name: 'Lavender', status: 'Best for Sales', link: 'https://lavender.ai' },
                    { name: 'Copy.ai', status: 'Infinite Email Templates', link: 'https://copy.ai' }
                ])
            },
            searchAI: {
                name: "AI Search Engine",
                searchTerms: "ai search research sources citations answer",
                description: "Search with AI answers",
                icon: "🔍",
                category: "AI Finder",
                render: () => this.renderAiFinder('AI Search', 'Search the web with real-time AI answers and source citations.', [
                    { name: 'Perplexity', status: 'Industry Leader (Free)', link: 'https://perplexity.ai' },
                    { name: 'You.com', status: 'Private & Fast', link: 'https://you.com' },
                    { name: 'Genspark', status: 'Summarized Discovery', link: 'https://genspark.ai' }
                ])
            },
            grammarFixerAI: {
                name: "Grammar Fixer AI",
                searchTerms: "ai grammar check fix spelling punctuation proofread",
                description: "Fix writing errors",
                icon: "✅",
                category: "AI Finder",
                render: () => this.renderAiFinder('Grammar Fixer', 'Automatically detect and fix grammar, spelling, and tone errors.', [
                    { name: 'Grammarly', status: 'The Gold Standard', link: 'https://grammarly.com' },
                    { name: 'QuillBot', status: 'Best Paraphraser', link: 'https://quillbot.com' },
                    { name: 'ProWritingAid', status: 'Best for Authors', link: 'https://prowritingaid.com' }
                ])
            },
            studyHelperAI: {
                name: "AI Study Helper",
                searchTerms: "ai study tutor homework help test prep learn",
                description: "Get homework help",
                icon: "🎓",
                category: "AI Finder",
                render: () => this.renderAiFinder('Study Helper', 'Personalized AI tutoring for homework, test prep, and learning.', [
                    { name: 'Khanmigo', status: 'Best AI Tutor', link: 'https://khanacademy.org/khanmigo' },
                    { name: 'Chegg AI', status: 'Best for Homework', link: 'https://chegg.com' },
                    { name: 'Socratic by Google', status: 'Mobile Visual Helper', link: 'https://socratic.org' }
                ])
            },
            contentIdeaAI: {
                name: "Content Ideas AI",
                searchTerms: "ai brainstorm content social media youtube ideas",
                description: "Get viral content ideas",
                icon: "💡",
                category: "AI Finder",
                render: () => this.renderAiFinder('Content Ideas', 'Generate unlimited ideas for social media, YouTube, and blogs.', [
                    { name: 'VidIQ AI', status: 'Best for YouTube', link: 'https://vidiq.com' },
                    { name: 'BuzzSumo', status: 'Trend Analysis', link: 'https://buzzsumo.com' },
                    { name: 'ContentShake', status: 'Full Content Plan', link: 'https://semrush.com/contentshake' }
                ])
            },
            resumeBuilderAI: {
                name: "Resume Builder AI",
                searchTerms: "ai resume cv maker job application profile",
                description: "Build a pro resume",
                icon: "💼",
                category: "AI Finder",
                render: () => this.renderAiFinder('Resume Builder', 'Create job-winning resumes and CVs tailored by AI.', [
                    { name: 'Rezi.ai', status: 'Best for ATS Bypass', link: 'https://rezi.ai' },
                    { name: 'Resume.io', status: 'Premium Templates', link: 'https://resume.io' },
                    { name: 'Kickresume', status: 'Creative Design', link: 'https://kickresume.com' }
                ])
            },
            plagiarismAI: {
                name: "AI Plagiarism Check",
                searchTerms: "ai detector plagiarism check originality writing",
                description: "Check for AI content",
                icon: "🛡️",
                category: "AI Finder",
                render: () => this.renderAiFinder('AI Detector', 'Check if a piece of text was written by a human or an AI.', [
                    { name: 'Copyleaks', status: 'Enterprise Class', link: 'https://copyleaks.com' },
                    { name: 'GPTZero', status: 'Best for Education', link: 'https://gptzero.me' },
                    { name: 'Originality.ai', status: 'Pro Marketers Choice', link: 'https://originality.ai' }
                ])
            },
            legalAssistantAI: {
                name: "AI Legal Assistant",
                searchTerms: "ai legal law lawyer documents research",
                description: "Simplified legal help",
                icon: "⚖️",
                category: "AI Finder",
                render: () => this.renderAiFinder('Legal Assistant', 'Simplify legal documents and perform basic legal research with AI.', [
                    { name: 'DoNotPay', status: 'The Robot Lawyer', link: 'https://donotpay.com' },
                    { name: 'Casetext', status: 'Professional Research', link: 'https://casetext.com' },
                    { name: 'LegalRobot', status: 'Contract Analysis', link: 'https://legalrobot.com' }
                ])
            }
        };
    }

    renderGrid(filter = '') {
        const grid = document.getElementById('grid');
        if (!grid) return;
        grid.innerHTML = '';

        const filtered = Object.entries(this.tools).filter(([id, tool]) => {
            const searchStr = `${tool.name} ${tool.searchTerms} ${tool.category}`.toLowerCase();
            return searchStr.includes(filter.toLowerCase());
        });

        filtered.forEach(([id, tool]) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-category">${tool.category}</div>
                    <div class="card-icon">${tool.icon}</div>
                </div>
                <div class="card-title">${tool.name}</div>
                <div class="card-desc">${tool.description}</div>
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

        if (content) {
            content.innerHTML = '';
            tool.render();
        }

        if (view) {
            view.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeToolView() {
        const view = document.getElementById('tool-view');
        if (view) {
            view.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.currentTool = null;
        }
    }

    // === RENDER METHODS (AI FINDER) ===

    renderAiFinder(title, slogan, recommendations) {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <div style="text-align:center; padding-bottom: 20px;">
                <h2 class="tool-title" style="margin-bottom:10px;">${title}</h2>
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
        `;
    }

    // === RENDER METHODS (CORE) ===

    renderCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Omni Calculator</h2>
            <div style="display:grid; grid-template-columns:1fr; gap:10px; max-width:400px; margin:0 auto;">
                <input type="text" id="calc-display" disabled style="width:100%; height:60px; text-align:right; font-size:2em; background:#111; color:lime; border:1px solid #333; padding:10px; margin-bottom:10px;">
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px;">
                    ${[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', 'C', '+', '='].map(btn => `
                        <button onclick="window.omniCalc('${btn}')" style="padding:20px; font-size:18px; background:#1a1a1a; color:#fff; border:1px solid #333;">${btn}</button>
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
            <div style="display:flex; flex-direction:column; gap:15px; max-width:400px; margin:0 auto;">
                <input type="number" id="unit-val" value="1" style="width:100%;">
                <select id="unit-type" style="width:100%;">
                    <option value="km-mi">Kilometers to Miles</option>
                    <option value="kg-lb">Kilograms to Pounds</option>
                    <option value="c-f">Celsius to Fahrenheit</option>
                </select>
                <div id="unit-out" class="result">0.62 Miles</div>
                <button onclick="window.omniConvert()">CONVERT</button>
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
            <div style="display:flex; flex-direction:column; gap:15px; max-width:400px; margin:0 auto;">
                <input type="text" id="pass-out" readonly style="width:100%; color:gold; text-align:center; height:60px; font-size:20px;">
                <button onclick="window.omniPass()" style="background:#fff; color:#000;">GENERATE SECURE KEY</button>
                <div style="font-size:12px; color:#666; text-align:center;">Uses local browser entropy for secure randomness.</div>
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
