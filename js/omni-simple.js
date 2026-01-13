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
            // ANNA UNIVERSITY - SEM 1 (REGULATION 2021)
            {
                id: 'au_maths_1',
                title: 'MA3151: Matrices and Calculus',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    {
                        name: 'Unit 1: Matrices',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Cayley-Hamilton Theorem and Finding Eigenvalues/Eigenvectors are 16-mark sure-shots.</div>
                            <h2>1.1 Eigenvalues and Eigenvectors</h2>
                            <p>For a square matrix A, a scalar λ is an <b>Eigenvalue</b> if there exists a non-zero vector X such that <i>AX = λX</i>. The vector X is the <b>Eigenvector</b>.</p>
                            <div class="highlight-box">
                                <b>Characteristic Equation:</b> |A - λI| = 0
                            </div>
                            <h3>Steps to find Eigenvalues:</h3>
                            <ol>
                                <li>Form the characteristic equation |A - λI| = 0.</li>
                                <li>Solve for λ. The roots are the Eigenvalues.</li>
                                <li>Substitute λ back into (A - λI)X = 0 to find the Eigenvectors.</li>
                            </ol>
                            <h2>1.2 Cayley-Hamilton Theorem</h2>
                            <p><b>Statement:</b> Every square matrix satisfies its own characteristic equation.</p>
                            <p><b>Applications:</b> Used to find the inverse of a matrix (A⁻¹) and higher powers of A (A⁴, A⁵ etc.).</p>
                        `
                    },
                    {
                        name: 'Unit 2: Differential Calculus',
                        content: `
                            <h2>2.1 Limits and Continuity</h2>
                            <p>A function f(x) is said to be <b>continuous</b> at x=a if the left-hand limit, right-hand limit, and the value of the function at 'a' are all equal.</p>
                            <div class="highlight-box">
                                <b>Formula:</b> lim(x→a) f(x) = f(a)
                            </div>
                            <h2>2.2 Derivatives</h2>
                            <p>The derivative represents the rate of change of a function. The <b>Mean Value Theorem</b> is a key concept here, stating that for a continuous and differentiable function on [a,b], there's a point 'c' where the tangent is parallel to the secant.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Several Variables',
                        content: `<h2>3.1 Partial Derivatives</h2><p>In functions of more than one variable, we differentiate with respect to one variable while keeping others constant.</p><h3>Euler's Theorem for Homogeneous Functions:</h3><p>If z is a homogeneous function of x and y of degree n, then:<br><b>x(∂z/∂x) + y(∂z/∂y) = nz</b></p>`
                    },
                    {
                        name: 'Unit 4: Integral Calculus',
                        content: `<h2>4.1 Definite Integrals</h2><p>Used to find the area under a curve. Key techniques include Integration by Parts and Substitution.</p><div class="highlight-box"><b>Bernoulli's Formula:</b> ∫ u dv = uv - u'v₁ + u''v₂ - u'''v₃...</div>`
                    }
                ],
                tags: 'maths calculus matrices m1 anna university reg 2021'
            },
            {
                id: 'au_physics_1',
                title: 'PH3151: Engineering Physics',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    {
                        name: 'Unit 1: Mechanics',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Torsional Pendulum and Bending of Beams (Young's Modulus) are mandatory 16-mark questions.</div>
                            <h2>1.1 Torsional Pendulum</h2>
                            <p>A rigid body suspended by a thin wire which executes rotational oscillations. It is used to find the Rigidity Modulus (n) of the wire.</p>
                            <div class="highlight-box">
                                <b>Period of Oscillation:</b> T = 2π √(I/C)
                                <br>Where I = Moment of Inertia, C = Restoring Couple per unit twist.
                            </div>
                            <h2>1.2 Elasticity</h2>
                            <p><b>Young's Modulus (E):</b> Measurement of tensile or compressive stiffness.</p>
                            <p><b>Rigidity Modulus (G):</b> Measurement of shear stiffness.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Quantum Mechanics',
                        content: `<h2>4.1 De-Broglie Hypothesis</h2><p>Matter has a dual nature, acting as both a particle and a wave.</p><div class="highlight-box"><b>Wavelength:</b> λ = h / p = h / mv</div><h2>4.2 Schrodinger Equation</h2><p>Describes how the quantum state of a physical system changes over time. The Time-Independent version is most commonly asked in exams.</p>`
                    }
                ],
                tags: 'physics ph3151 anna university'
            },
            {
                id: 'au_python_1',
                title: 'GE3151: Problem Solving & Python',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    {
                        name: 'Unit 1: Computational Thinking',
                        content: `
                            <h2>1.1 Algorithms</h2>
                            <p>A step-by-step procedure to solve a problem. Characteristics: Finiteness, Definiteness, Input, Output, Effectiveness.</p>
                            <h3>Building Blocks of Algorithms:</h3>
                            <ul>
                                <li><b>Statements:</b> Single instructions.</li>
                                <li><b>State:</b> Values of variables at a given time.</li>
                                <li><b>Control Flow:</b> The order in which instructions are executed.</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 2: Linear Data Structures',
                        content: `
                            <h2>2.1 Python Basics</h2>
                            <p>Python is an interpreted, high-level, general-purpose programming language. Known for readability.</p>
                            <div class="highlight-box">
                                <b>Example Code:</b><br>
                                <pre>x = 10<br>if x > 5:<br>    print("Greater than 5")</pre>
                            </div>
                        `
                    }
                ],
            {
                id: 'au_chem_1',
                title: 'CY3151: Engineering Chemistry',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    {
                        name: 'Unit 1: Water Technology',
                        content: `<h2>1.1 Hardness of Water</h2><p>Hardness is the property of water which prevents the lathering of soap. Types: Temporary (Carbonate) and Permanent (Non-carbonate).</p><div class="highlight-box"><b>EDTA Method:</b> Used to determine the total hardness of a water sample accurately.</div>`
                    }
                ],
                tags: 'chemistry cy3151 water tech anna university'
            },
            {
                id: 'upsc_polity_1',
                title: 'Indian Polity: Constitution',
                category: 'Competitive Exams',
                chapters: [
                    {
                        name: '1. Fundamental Rights',
                        content: `<h2>Fundamental Rights (Art 12-35)</h2><p>Art 14: Equality before law. Art 17: Abolition of untouchability. Art 19: Freedom of speech.</p>`
                    }
                ],
                tags: 'upsc polity constitution'
            },
            {
                id: 'ncert_science_10',
                title: 'Science (Class 10 NCERT)',
                univ: 'ncert',
                dept: 'Class 10',
                sem: 'Semester 1',
                category: 'School Education (K-12)',
                chapters: [
                    { name: 'Ch 1: Chemical Reactions', content: `<h2>1.1 Chemical Equations</h2><p>Symbolic representation of a reaction. A + B -> AB (Combination).</p>` }
                ],
                tags: 'ncert science class 10'
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
