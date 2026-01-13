/**
 * 💎 Clarity For Humans - NATIONAL STUDENT LIBRARY 🇮🇳 💎
 * 
 * Objective: The #1 Direct-Access Repository for Indian Students.
 * Features: Level-Drill Navigation (Univ -> Dept -> Sem -> Subj -> Chp), Real-time Search.
 */

class StudentLibrary {
    constructor() {
        this.categories = this.initCategories();
        this.universities = this.initUniversities();
        this.subjects = this.initSubjects();

        // Navigation State
        this.navStack = [{ type: 'home' }];
        this.currentView = 'home';

        this.init();
    }

    init() {
        this.renderFromStack();

        const search = document.getElementById('search');
        if (search) {
            search.placeholder = "Search 'Anna Univ', 'Python', 'Matrices', 'UPSC'...";
            search.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    this.renderSearchResults(query);
                } else {
                    this.renderFromStack();
                }
            });
        }

        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.onclick = () => this.handleBack();
        }
    }

    // --- DATA INITIALIZATION ---

    initCategories() {
        return [
            { id: 'eng', name: 'Engineering & Technology', icon: '👷', desc: 'University-wise notes for all Indian Engineering hubs.' },
            { id: 'comp', name: 'Competitive Exams (INDIA)', icon: '🚀', desc: 'JEE, NEET, UPSC, GATE, SSC & Bank Exams.' },
            { id: 'school', name: 'School Education (K-12)', icon: '🎒', desc: 'NCERT, CBSE & All State Boards.' },
            { id: 'medical', name: 'Medical & Health Sciences', icon: '🩺', desc: 'MBBS, BDS, Nursing & Pharmacy.' },
            { id: 'arts', name: 'Arts, Science & Commerce', icon: '🎨', desc: 'UGC-CBCS, DU, Madras Univ & more.' },
            { id: 'distance', name: 'Distance & Open Learning', icon: '📚', desc: 'IGNOU & NIOS Resources.' }
        ];
    }

    initUniversities() {
        return {
            'eng': [
                {
                    id: 'anna',
                    name: 'Anna University (TN)',
                    depts: ['Common First Year', 'Computer Science (CSE)', 'Information Tech (IT)', 'Electronics (ECE)', 'Electrical (EEE)', 'Mechanical Eng', 'Civil Eng']
                },
                {
                    id: 'vtu',
                    name: 'Visvesvaraya Tech Univ (VTU)',
                    depts: ['1st Year Cycle', 'Computer Science (CSE)', 'Electronics (ECE)', 'Mechanical Eng']
                }
            ],
            // Add other categories similarly as needed
        };
    }

    initSubjects() {
        return [
            // ANNA UNIVERSITY - SEM 1
            {
                id: 'au_maths_1',
                title: 'MA3151: Matrices and Calculus',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Matrices', content: `<h2>Unit 1: Matrices</h2><p>Characteristic equation, Eigenvalues and Eigenvectors of a real matrix. Cayley-Hamilton theorem...</p>` },
                    { name: 'Unit 2: Differential Calculus', content: `<h2>Unit 2: Differential Calculus</h2><p>Representation of functions, Limit of a function, Continuity...</p>` }
                ],
                tags: 'maths calculus matrices m1 anna university'
            },
            {
                id: 'au_physics_1',
                title: 'PH3151: Engineering Physics',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Mechanics', content: `<h2>Unit 1: Mechanics</h2><p>Multiparticle systems, Center of mass, rigid body rotation...</p>` }
                ],
                tags: 'physics ph3151'
            }
        ];
    }

    // --- NAVIGATION LOGIC ---

    renderHome() {
        this.navStack = [{ type: 'home' }];
        this.renderFromStack();
    }

    renderFromStack() {
        const current = this.navStack[this.navStack.length - 1];
        const grid = document.getElementById('grid');
        if (!grid) return;
        grid.innerHTML = '';
        this.currentView = current.type;

        if (current.type === 'home') {
            this.categories.forEach(cat => this.createCard(cat.name, cat.desc, cat.icon, 'CATEGORY', () => this.pushNav({ type: 'category', data: cat }), grid));
        }
        else if (current.type === 'category') {
            const cat = current.data;
            this.renderHeader(`${cat.icon} ${cat.name}`, 'Select your University or Board', grid);
            if (this.universities[cat.id]) {
                this.universities[cat.id].forEach(univ => {
                    this.createCard(univ.name, `Access all departments of ${univ.name}`, '🏛️', 'UNIVERSITY', () => this.pushNav({ type: 'university', data: univ }), grid);
                });
            }
        }
        else if (current.type === 'university') {
            const univ = current.data;
            this.renderHeader(`🏛️ ${univ.name}`, 'Select Department', grid);
            univ.depts.forEach(dept => {
                this.createCard(dept, `Select semester for ${dept}`, '📁', 'DEPARTMENT', () => this.pushNav({ type: 'dept', univId: univ.id, deptName: dept }), grid);
            });
        }
        else if (current.type === 'dept') {
            const deptName = current.deptName;
            this.renderHeader(`📁 ${deptName}`, 'Select Semester', grid);

            let sems = [];
            if (deptName.includes('First Year') || deptName.includes('Cycle')) {
                sems = ['Semester 1', 'Semester 2'];
            } else {
                sems = ['Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
            }

            sems.forEach(sem => {
                this.createCard(sem, `Subject notes for ${sem}`, '⏳', 'SEMESTER', () => this.pushNav({ type: 'semester', univId: current.univId, deptName: deptName, semName: sem }), grid);
            });
        }
        else if (current.type === 'semester') {
            const { univId, deptName, semName } = current;
            this.renderHeader(`⏳ ${semName}`, `Subjects in ${deptName}`, grid);
            const filtered = this.subjects.filter(s => s.univ === univId && s.dept === deptName && s.sem === semName);
            this.renderSubjects(filtered, grid);
        }
        else if (current.type === 'subject') {
            const subject = current.data;
            this.renderHeader(`📖 ${subject.title}`, 'Select Chapter to Read', grid);
            subject.chapters.forEach((chapter, index) => {
                this.createCard(chapter.name, `Read the full detailed notes for ${chapter.name}`, '📄', 'CHAPTER', () => this.openReader(subject.id, index), grid);
            });
        }
    }

    pushNav(item) {
        this.navStack.push(item);
        this.renderFromStack();
    }

    handleBack() {
        const view = document.getElementById('tool-view');
        if (view && view.classList.contains('active')) {
            view.classList.remove('active');
            document.body.style.overflow = 'auto';
            return;
        }

        if (this.navStack.length > 1) {
            this.navStack.pop();
            this.renderFromStack();
        } else {
            this.renderHome();
        }
    }

    // --- RENDER HELPERS ---

    renderHeader(title, subtitle, grid) {
        const header = document.createElement('div');
        header.style.cssText = 'grid-column: 1/-1; padding: 20px; text-align: center;';
        header.innerHTML = `
            <h1 style="color: #fff; margin-bottom:5px; font-size: 1.8em;">${title}</h1>
            <p style="color: #666; font-size:14px;">${subtitle}</p>
            <button onclick="window.omni.handleBack()" style="background: #111; border:1px solid #333; color:#fff; margin-top:15px; font-size: 11px; padding: 8px 20px; border-radius:30px; cursor:pointer;">← GO BACK</button>
        `;
        grid.appendChild(header);
    }

    createCard(title, desc, icon, label, onClick, grid) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-category">${label}</div>
                <div class="card-icon">${icon}</div>
            </div>
            <div class="card-title">${title}</div>
            <div class="card-desc">${desc}</div>
        `;
        card.onclick = onClick;
        grid.appendChild(card);
    }

    renderSubjects(list, grid) {
        if (list.length === 0) {
            grid.innerHTML += `<div style="grid-column: 1/-1; text-align: center; color: #444; padding: 40px;">No subjects found for this selection yet. Update in progress!</div>`;
            return;
        }
        list.forEach(subj => {
            this.createCard(subj.title, `Code: ${subj.id.split('_')[1].toUpperCase()}`, '📖', 'SUBJECT', () => this.pushNav({ type: 'subject', data: subj }), grid);
        });
    }

    renderSearchResults(query) {
        const grid = document.getElementById('grid');
        if (!grid) return;
        grid.innerHTML = `<div style="grid-column:1/-1; padding:20px; text-align:center;"><h2 style="color:#666;">SEARCH RESULTS FOR "${query.toUpperCase()}"</h2></div>`;

        const results = this.subjects.filter(subj => {
            const searchStr = `${subj.title} ${subj.univ} ${subj.dept} ${subj.tags} ${subj.category}`.toLowerCase();
            return searchStr.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            grid.innerHTML += `<div style="grid-column: 1/-1; text-align: center; color: #555; padding: 40px;">No results found.</div>`;
            return;
        }

        results.forEach(subj => this.createCard(subj.title, `${subj.univ ? subj.univ.toUpperCase() : ''} ❯ ${subj.dept}`, '📖', 'RESULT', () => this.pushNav({ type: 'subject', data: subj }), grid));
    }

    openReader(subjectId, chapterIndex) {
        const subj = this.subjects.find(s => s.id === subjectId);
        const chapter = subj.chapters[chapterIndex];
        const view = document.getElementById('tool-view');
        const content = document.getElementById('tool-content');

        if (content && subj && chapter) {
            content.innerHTML = `
                <div class="notes-wrapper">
                    <div class="notes-breadcrumb">${subj.univ.toUpperCase()} ❯ ${subj.dept} ❯ ${subj.title}</div>
                    <h1 class="notes-title">${chapter.name}</h1>
                    <div class="notes-body">${chapter.content}</div>
                    <div style="margin-top:50px; border-top:1px solid #222; padding-top:20px; text-align:center;">
                        <button onclick="window.omni.handleBack()" style="background:#fff; color:#000; padding:15px 30px; font-weight:700; border-radius:8px;">DONE READING</button>
                    </div>
                </div>
            `;
            view.classList.add('active');
            view.scrollTop = 0;
            document.body.style.overflow = 'hidden';

            // Highlight styling
            const style = document.createElement('style');
            style.innerHTML = `
                .notes-wrapper { max-width: 800px; margin: 0 auto; padding: 20px; }
                .notes-breadcrumb { color: cyan; font-size: 12px; margin-bottom: 10px; text-transform: uppercase; }
                .notes-title { color: #fff; font-size: 2.5em; margin-bottom: 20px; }
                .notes-body { color: #ccc; line-height: 1.8; font-size: 1.1em; }
                .notes-body h2 { color: #fff; margin-top: 30px; border-bottom: 1px solid #333; padding-bottom: 10px; }
            `;
            content.appendChild(style);
        }
    }
}

// Global initialization
window.omni = new StudentLibrary();
