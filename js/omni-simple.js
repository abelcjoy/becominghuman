/**
 * 💎 Clarity For Humans - NATIONAL STUDENT LIBRARY 🇮🇳 💎
 * 
 * Objective: The #1 Direct-Access Repository for Indian Students.
 * Features: Category-First UI, Real-time Global Search, Scrollable Notes.
 */

class StudentLibrary {
    constructor() {
        this.categories = this.initCategories();
        this.subjects = this.initSubjects();
        this.currentView = 'home'; // 'home', 'category', 'reader'
        this.init();
    }

    init() {
        this.renderHome();

        const search = document.getElementById('search');
        if (search) {
            search.placeholder = "Type anything: 'Anna Univ Physics', 'UPSC Polity', 'NCERT Science'...";
            search.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    this.renderSearchResults(query);
                } else {
                    this.renderHome();
                }
            });
        }

        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.onclick = () => this.handleBack();
        }
    }

    handleBack() {
        if (this.currentView === 'reader') {
            this.currentView = 'home'; // Or back to category if we track history
            const view = document.getElementById('tool-view');
            if (view) view.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            this.renderHome();
        }
    }

    initCategories() {
        return [
            { id: 'comp', name: 'Competitive Exams (INDIA)', icon: '🚀', desc: 'JEE, NEET, UPSC, GATE, SSC, Bank Exams' },
            { id: 'eng', name: 'Engineering & Technology', icon: '👷', desc: 'Anna Univ, VTU, JNTU, AKTU, Mumbai Univ' },
            { id: 'school', name: 'School Education (K-12)', icon: '🎒', desc: 'NCERT, CBSE, ICSE & All State Boards' },
            { id: 'medical', name: 'Medical & Health Sciences', icon: '🩺', desc: 'MBBS, Dental, Nursing, Pharmacy Council' },
            { id: 'arts', name: 'Arts, Science & Commerce', icon: '🎨', desc: 'UGC-CBCS, DU, Madras Univ, Calcutta Univ' },
            { id: 'distance', name: 'Distance & Open Learning', icon: '📚', desc: 'IGNOU Study Material, NIOS Resources' }
        ];
    }

    initSubjects() {
        return [
            {
                id: 'anna_phys_1',
                title: "Engineering Physics (Anna University)",
                board: "Anna University",
                category: "Engineering",
                tags: "physics sem 1 engineering mechanics anna university regulation 2021",
                content: `
                    <div class="notes-container">
                        <h2>Unit 1: Mechanics & Properties of Matter</h2>
                        <p class="exam-tip">🎯 <b>EXAM TIP:</b> Hooke's Law is a frequent 2-mark question. Be sure to mention "within elastic limit."</p>
                        
                        <h3>1.1 Elasticity</h3>
                        <p>Elasticity is the property of a body by virtue of which it tends to regain its original shape and size when the external deforming forces are removed.</p>
                        
                        <div class="highlight-box">
                            <b>Hooke's Law:</b> Within elastic limits, stress is directly proportional to strain. 
                            <br><i>Stress ∝ Strain ⇒ Stress = E × Strain</i>
                        </div>

                        <h3>1.2 Torsional Pendulum</h3>
                        <p>A torsional pendulum is a rigid body suspended by a thin wire which executes rotational oscillations. It is used to determine the moment of inertia of the body or the rigidity modulus of the wire.</p>
                        
                        <h3>Important Academic Questions:</h3>
                        <ul>
                            <li><b>2 Marks:</b> Define Poisson's Ratio.</li>
                            <li><b>16 Marks:</b> Derive the expression for the period of oscillation of a torsional pendulum. Include the derivation for rigidity modulus 'n'.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'upsc_polity_1',
                title: "Fundamental Rights (UPSC Polity)",
                board: "UPSC / Civil Services",
                category: "Competitive Exams",
                tags: "upsc polity constitution fundamental rights ssc cgl current affairs",
                content: `
                    <div class="notes-container">
                        <h2>Fundamental Rights (Part III, Art 12-35)</h2>
                        <p class="exam-tip">🎯 <b>UPSC TIP:</b> Concentrate on the 'Exceptions' to each Right. UPSC loves tricky questions on Art 14-18.</p>

                        <h3>The 6 Core Rights:</h3>
                        <ol>
                            <li>Right to Equality (Art 14-18)</li>
                            <li>Right to Freedom (Art 19-22)</li>
                            <li>Right against Exploitation (Art 23-24)</li>
                            <li>Right to Freedom of Religion (Art 25-28)</li>
                            <li>Cultural and Educational Rights (Art 29-30)</li>
                            <li>Right to Constitutional Remedies (Art 32) - "The Heart and Soul" - Dr. Ambedkar</li>
                        </ol>

                        <div class="highlight-box">
                            <b>Article 32:</b> Power of Supreme Court to issue Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo-Warranto.
                        </div>
                    </div>
                `
            }
        ];
    }

    renderHome() {
        const grid = document.getElementById('grid');
        if (!grid) return;
        this.currentView = 'home';
        grid.innerHTML = '';

        this.categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-category">CATEGORY</div>
                    <div class="card-icon">${cat.icon}</div>
                </div>
                <div class="card-title">${cat.name}</div>
                <div class="card-desc">${cat.desc}</div>
            `;
            card.onclick = () => this.renderCategoryView(cat);
            grid.appendChild(card);
        });
    }

    renderCategoryView(cat) {
        const grid = document.getElementById('grid');
        if (!grid) return;
        this.currentView = 'category';
        grid.innerHTML = `
            <div style="grid-column: 1/-1; padding: 20px; text-align: center;">
                <h2 style="color: #fff;">${cat.icon} ${cat.name}</h2>
                <p style="color: #888;">Select a Subject or University below</p>
                <button onclick="window.omni.renderHome()" style="background: #222; margin-top: 10px; font-size: 12px; padding: 8px 16px;">← Back to Categories</button>
            </div>
        `;

        const filteredSubjs = this.subjects.filter(s => s.category.toLowerCase().includes(cat.name.split(' ')[0].toLowerCase()) || s.category === cat.name);

        if (filteredSubjs.length === 0) {
            grid.innerHTML += `<div style="grid-column: 1/-1; text-align: center; color: #555; padding: 40px;">Coming Soon: Digital repository being populated...</div>`;
            return;
        }

        filteredSubjs.forEach(subj => this.createSubjectCard(subj, grid));
    }

    renderSearchResults(query) {
        const grid = document.getElementById('grid');
        if (!grid) return;
        grid.innerHTML = '';

        const results = this.subjects.filter(subj => {
            const searchStr = `${subj.title} ${subj.board} ${subj.tags} ${subj.category}`.toLowerCase();
            return searchStr.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <div style="font-size: 3em; margin-bottom: 10px;">🔍</div>
                    <div style="color: #fff; font-size: 1.2em;">No exact matches found</div>
                    <div style="color: #666; margin-top: 5px;">Try searching for generic terms like "Physics" or "Anna"</div>
                </div>
            `;
            return;
        }

        results.forEach(subj => this.createSubjectCard(subj, grid));
    }

    createSubjectCard(subj, grid) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-category">${subj.category}</div>
                <div class="card-icon">📖</div>
            </div>
            <div class="card-title">${subj.title}</div>
            <div class="card-desc">Board: ${subj.board}</div>
        `;
        card.onclick = () => this.openReader(subj.id);
        grid.appendChild(card);
    }

    openReader(subjectId) {
        this.currentView = 'reader';
        const subj = this.subjects.find(s => s.id === subjectId);
        const view = document.getElementById('tool-view');
        const content = document.getElementById('tool-content');

        if (content && subj) {
            content.innerHTML = `
                <div style="padding: 10px;">
                    <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                        ${subj.category} ❯ ${subj.board}
                    </div>
                    <h1 style="color: #fff; font-size: 2.2em; line-height: 1.2; margin-bottom: 20px;">${subj.title}</h1>
                    <div class="scrollable-notes">
                        ${subj.content}
                    </div>
                </div>
                <style>
                    .scrollable-notes { color: #ddd; line-height: 1.8; font-size: 17px; }
                    .scrollable-notes h2 { color: #fff; margin-top: 30px; border-bottom: 1px solid #333; padding-bottom: 10px; }
                    .scrollable-notes h3 { color: cyan; margin-top: 25px; font-size: 1.2em; }
                    .scrollable-notes p { margin-bottom: 15px; }
                    .scrollable-notes .highlight-box { background: rgba(0, 255, 255, 0.05); border-left: 4px solid cyan; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .notes-container { max-width: 800px; margin: 0 auto; }
                    .exam-tip { background: rgba(255, 255, 0, 0.1); border: 1px dashed yellow; color: yellow; padding: 10px; border-radius: 4px; font-size: 14px; margin: 15px 0; }
                </style>
            `;
            view.classList.add('active');
            document.body.style.overflow = 'hidden';
            view.scrollTop = 0;
        }
    }
}

// Global initialization
window.omni = new StudentLibrary();
