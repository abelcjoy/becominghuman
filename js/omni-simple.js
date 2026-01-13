/**
 * 💎 Clarity For Humans - NATIONAL STUDENT LIBRARY 🇮🇳 💎
 * 
 * Objective: The #1 Direct-Access Repository for Indian Students.
 * Features: Level-Drill Navigation, Chapter-wise Reading, Real-time Search.
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
                { id: 'anna', name: 'Anna University (TN)', depts: ['Semester 1 (Common)', 'Semester 2 (Common)', 'Computer Science (CSE)', 'Information Tech (IT)', 'Electronics (ECE)', 'Electrical (EEE)', 'Mechanical Eng', 'Civil Eng'] },
                { id: 'vtu', name: 'Visvesvaraya Tech Univ (VTU)', depts: ['Physics Cycle', 'Chemistry Cycle', 'CSE', 'ISE', 'ECE', 'ME'] },
                { id: 'aktu', name: 'AKTU (Uttar Pradesh)', depts: ['First Year', 'CSE', 'IT', 'ECE', 'ME', 'CE'] },
                { id: 'mu', name: 'Mumbai University (MU)', depts: ['First Year', 'Computer Eng', 'IT', 'EXTC', 'Mechanical'] },
                { id: 'jntuh', name: 'JNTU Hyderabad', depts: ['R22 Regular', 'CSE', 'IT', 'ECE', 'EEE'] },
                { id: 'ktu', name: 'APJ Abdul Kalam Tech Univ (KTU)', depts: ['S1 & S2', 'CSE', 'ECE', 'ME'] }
            ],
            'school': [
                { id: 'ncert', name: 'NCERT / CBSE (National)', depts: ['Class 12', 'Class 11', 'Class 10', 'Class 9', 'Class 8'] },
                { id: 'icse', name: 'ICSE / ISC', depts: ['Class 12 (ISC)', 'Class 10 (ICSE)'] },
                { id: 'tn_state', name: 'Tamil Nadu State Board', depts: ['Class 12', 'Class 11', 'Class 10'] },
                { id: 'up_state', name: 'UP Board', depts: ['Intermediate (12th)', 'High School (10th)'] },
                { id: 'mh_state', name: 'Maharashtra State Board', depts: ['HSC (12th)', 'SSC (10th)'] }
            ],
            'medical': [
                { id: 'mgr', name: 'Dr. MGR Medical Univ (TN)', depts: ['MBBS Phase 1', 'MBBS Phase 2', 'BDS', 'Nursing', 'Pharmacy'] },
                { id: 'rguhs', name: 'RGUHS (Karnataka)', depts: ['MBBS', 'Dental', 'Ayush'] },
                { id: 'muhs', name: 'MUHS (Maharashtra)', depts: ['MBBS', 'BDS', 'BAMS'] }
            ],
            'arts': [
                { id: 'du', name: 'University of Delhi (DU)', depts: ['B.A. Programme', 'B.Sc. Honours', 'B.Com'] },
                { id: 'unom', name: 'University of Madras', depts: ['B.Sc IT', 'B.A English', 'B.Com General'] },
                { id: 'cu', name: 'University of Calcutta', depts: ['Arts', 'Science', 'Commerce'] }
            ],
            'distance': [
                { id: 'ignou', name: 'IGNOU', depts: ['BCA', 'MCA', 'B.A.', 'M.A.'] },
                { id: 'nios', name: 'NIOS (National Open School)', depts: ['Secondary (10th)', 'Sr. Secondary (12th)'] }
            ]
        };
    }

    initSubjects() {
        return [
            // ANNA UNIVERSITY - SEM 1
            {
                id: 'au_maths_1',
                title: 'MA3151: Matrices and Calculus',
                univ: 'anna',
                dept: 'Semester 1 (Common)',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Matrices', content: `<h2>Unit 1: Matrices</h2><p>Characteristic equation, Eigenvalues and Eigenvectors of a real matrix. Cayley-Hamilton theorem...</p>` },
                    { name: 'Unit 2: Differential Calculus', content: `<h2>Unit 2: Differential Calculus</h2><p>Representation of functions, Limit of a function, Continuity...</p>` },
                    { name: 'Unit 3: Functions of Several Variables', content: `<h2>Unit 3: Functions of Several Variables</h2><p>Partial differentiation, Homogeneous functions and Euler's theorem...</p>` },
                    { name: 'Unit 4: Integral Calculus', content: `<h2>Unit 4: Integral Calculus</h2><p>Definite and Indefinite integrals, Substitution rule, Techniques of Integration...</p>` },
                    { name: 'Unit 5: Multiple Integrals', content: `<h2>Unit 5: Multiple Integrals</h2><p>Double integrals, Change of order of integration, Area enclosed by plane curves...</p>` }
                ],
                tags: 'maths calculus matrices m1 anna university reg 2021'
            },
            {
                id: 'au_physics_1',
                title: 'PH3151: Engineering Physics',
                univ: 'anna',
                dept: 'Semester 1 (Common)',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Mechanics', content: `<h2>Unit 1: Mechanics</h2><p>Multiparticle systems, Center of mass, rigid body rotation...</p>` },
                    { name: 'Unit 2: Electromagnetic Waves', content: `<h2>Unit 2: Electromagnetic Waves</h2><p>Maxwell's equations, Polarisation, Properties of laser...</p>` },
                    { name: 'Unit 3: Oscillations, Optics and Lasers', content: `<h2>Unit 3: Oscillations, Optics and Lasers</h2><p>Simple harmonic motion, Forced oscillations, Interference, Diffraction...</p>` },
                    { name: 'Unit 4: Basic Quantum Mechanics', content: `<h2>Unit 4: Basic Quantum Mechanics</h2><p>Photons and light waves, De Broglie waves, Schrodinger equation...</p>` },
                    { name: 'Unit 5: Applied Quantum Mechanics', content: `<h2>Unit 5: Applied Quantum Mechanics</h2><p>Free electron theory, Density of states, Quantum structures...</p>` }
                ],
                tags: 'physics ph3151 mechanics anna university'
            },
            {
                id: 'au_python_1',
                title: 'GE3151: Problem Solving & Python',
                univ: 'anna',
                dept: 'Semester 1 (Common)',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Computational Thinking', content: `<h2>Unit 1: Computational Thinking</h2><p>Algorithms, building blocks of algorithms, notation (pseudo code, flow chart, programming language)...</p>` },
                    { name: 'Unit 2: Data, Expressions, Statements', content: `<h2>Unit 2: Data, Expressions, Statements</h2><p>Python interpreter and interactive mode, values and types, variables, expressions, statements...</p>` },
                    { name: 'Unit 3: Control Flow, Functions', content: `<h2>Unit 3: Control Flow, Functions</h2><p>Conditionals, iteration, fruitfulness, recursion...</p>` },
                    { name: 'Unit 4: Lists, Tuples, Dictionaries', content: `<h2>Unit 4: Lists, Tuples, Dictionaries</h2><p>Lists, list operations, list slices, list methods, list loop...</p>` },
                    { name: 'Unit 5: Files, Modules, Packages', content: `<h2>Unit 5: Files, Modules, Packages</h2><p>Files and exception, text files, reading and writing files, format operator...</p>` }
                ],
                tags: 'python coding ge3151 programming anna university'
            },

            // COMPETITIVE
            {
                id: 'upsc_polity_1',
                title: 'Indian Polity: Constitution',
                category: 'Competitive Exams',
                chapters: [
                    { name: 'Fundamental Rights (Art 12-35)', content: `<h2>Fundamental Rights</h2><p>Articles 12 to 35, Part III of the Constitution...</p>` },
                    { name: 'Directive Principles (DPSP)', content: `<h2>Directive Principles of State Policy</h2><p>Part IV, Articles 36 to 51...</p>` },
                    { name: 'Fundamental Duties', content: `<h2>Fundamental Duties</h2><p>Article 51A, Part IVA...</p>` }
                ],
                tags: 'upsc polity civil services constitution'
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
                    this.createCard(univ.name, `Access all departments of ${univ.name}`, '🏛️', 'UNIVERSITY', () => this.pushNav({ type: 'university', data: univ, catId: cat.id }), grid);
                });
            } else {
                this.renderSubjects(this.subjects.filter(s => s.category.includes(cat.name.split(' ')[0])), grid);
            }
        }
        else if (current.type === 'university') {
            const univ = current.data;
            this.renderHeader(`🏛️ ${univ.name}`, 'Select Department or Semester', grid);
            univ.depts.forEach(dept => {
                this.createCard(dept, `Detailed notes for ${dept} students.`, '📁', 'DEPARTMENT', () => this.pushNav({ type: 'dept', data: dept, univId: univ.id }), grid);
            });
        }
        else if (current.type === 'dept') {
            const dept = current.data;
            const univId = current.univId;
            this.renderHeader(`📁 ${dept}`, 'Available Subjects', grid);
            const filtered = this.subjects.filter(s => s.univ === univId && s.dept === dept);
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
            this.currentView = this.navStack[this.navStack.length - 1].type;
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
            <h2 style="color: #fff; margin-bottom:5px;">${title}</h2>
            <p style="color: #666; font-size:14px;">${subtitle}</p>
            <button onclick="window.omni.handleBack()" style="background: #111; border:1px solid #333; color:#888; margin-top:15px; font-size: 11px; padding: 6px 14px; border-radius:20px; cursor:pointer;">← Go Back</button>
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
            grid.innerHTML += `<div style="grid-column: 1/-1; text-align: center; color: #444; padding: 40px;">Library is being updated. Coming soon!</div>`;
            return;
        }
        list.forEach(subj => {
            this.createCard(subj.title, `University: ${subj.univ ? subj.univ.toUpperCase() : 'National'}`, '📖', 'SUBJECT', () => this.pushNav({ type: 'subject', data: subj }), grid);
        });
    }

    renderSearchResults(query) {
        const grid = document.getElementById('grid');
        if (!grid) return;
        grid.innerHTML = `
            <div style="grid-column:1/-1; padding:10px 20px; color:#666; font-size:13px; border-bottom:1px solid #222;">
                SEARCH RESULTS FOR: <span style="color:#fff;">"${query.toUpperCase()}"</span>
                <button onclick="window.omni.renderFromStack()" style="float:right; background:none; border:none; color:cyan; cursor:pointer;">CLEAR</button>
            </div>
        `;

        const results = this.subjects.filter(subj => {
            const searchStr = `${subj.title} ${subj.univ} ${subj.dept} ${subj.tags} ${subj.category}`.toLowerCase();
            return searchStr.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            grid.innerHTML += `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color:#555;">No subjects found for "${query}"</div>`;
            return;
        }

        results.forEach(subj => this.createCard(subj.title, `${subj.univ ? subj.univ.toUpperCase() : subj.category} - ${subj.dept || ''}`, '📖', 'RESULT', () => this.pushNav({ type: 'subject', data: subj }), grid));
    }

    openReader(subjectId, chapterIndex) {
        this.currentView = 'reader';
        const subj = this.subjects.find(s => s.id === subjectId);
        const chapter = subj.chapters[chapterIndex];
        const view = document.getElementById('tool-view');
        const content = document.getElementById('tool-content');

        if (content && subj && chapter) {
            content.innerHTML = `
                <div class="notes-wrapper">
                    <div class="notes-breadcrumb">${subj.univ ? subj.univ.toUpperCase() : subj.category} ❯ ${subj.dept || ''} ❯ ${subj.title}</div>
                    <h1 class="notes-title">${chapter.name}</h1>
                    <div class="notes-body">${chapter.content}</div>
                </div>
                <style>
                    .notes-wrapper { max-width: 850px; margin: 0 auto; color: #ddd; font-family: 'Inter', sans-serif; padding-top:20px;}
                    .notes-breadcrumb { color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
                    .notes-title { color: #fff; font-size: 2.5em; line-height: 1.2; margin-bottom: 30px; border-left: 5px solid cyan; padding-left: 20px; }
                    .notes-body { line-height: 1.8; font-size: 18px; }
                    .notes-body h2 { color: #fff; margin-top: 40px; border-bottom: 1px solid #222; padding-bottom: 10px; }
                    .notes-body p { margin-bottom: 20px; }
                </style>
            `;
            view.classList.add('active');
            view.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        }
    }
}

// Initialize the Portal
window.omni = new StudentLibrary();
