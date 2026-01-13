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
                            <p>For a square matrix A, a scalar λ is an <b>Eigenvalue</b> if there exists a non-zero vector X such that <i>AX = λX</i>.</p>
                            <div class="highlight-box"><b>Characteristic Equation:</b> |A - λI| = 0</div>
                            <p><b>Properties:</b> 1. Sum of Eigenvalues = Trace of A. 2. Product of Eigenvalues = Det(A).</p>
                            <h2>1.2 Cayley-Hamilton Theorem</h2>
                            <p>Every square matrix satisfies its own characteristic equation. If p(λ) = 0 is characteristic eq, then p(A) = 0.</p>
                            <p><b>Inverse Calculation:</b> A⁻¹ = -1/aₙ (Aⁿ⁻¹ + a₁Aⁿ⁻² + ... + aₙ₋₁I)</p>
                            <h2>1.3 Orthogonal Transformation</h2>
                            <p>Reducing a quadratic form to canonical form by orthogonal transformation. Sum of squares is the result.</p>
                        `
                    },
                    {
                        name: 'Unit 2: Differential Calculus',
                        content: `
                            <h2>2.1 Limits and Continuity</h2>
                            <p>A function is continuous at 'a' if lim(x→a) f(x) = f(a).</p>
                            <h2>2.2 Differentiation Rules</h2>
                            <p>Product Rule, Quotient Rule, and Chain Rule. <b>Implicit Differentiation</b> is used when y cannot be explicitly expressed in terms of x.</p>
                            <h2>2.3 Mean Value Theorems</h2>
                            <p><b>Rolle's Theorem:</b> If f(a)=f(b), there exists c in (a,b) such that f'(c)=0.</p>
                            <p><b>Taylor's Series:</b> Expansion of f(x) about a point 'a'.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Functions of Several Variables',
                        content: `
                            <h2>3.1 Partial Derivatives</h2><p>Differentiating with respect to one variable while others are constant.</p>
                            <div class="highlight-box"><b>Euler's Theorem:</b> x(∂z/∂x) + y(∂z/∂y) = nz</div>
                            <h2>3.2 Jacobians</h2><p>Used in transformation of coordinates. J = ∂(u,v)/∂(x,y).</p>
                            <h2>3.3 Maxima and Minima</h2><p>Finding extreme values using Lagrange Multipliers method.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Integral Calculus',
                        content: `
                            <h2>4.1 Integration Techniques</h2><p>Substitution, Integration by Parts, and Partial Fractions.</p>
                            <div class="highlight-box"><b>Bernoulli's Formula:</b> ∫ u dv = uv - u'v₁ + u''v₂ - ...</div>
                            <h2>4.2 Improper Integrals</h2><p>Integrals where limits are infinite or the function becomes infinite within intervals.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Multiple Integrals',
                        content: `
                            <h2>5.1 Double and Triple Integrals</h2><p>Double integrals for Area (∫∫ dA) and Triple integrals for Volume (∫∫∫ dV).</p>
                            <p><b>Change of Order:</b> Crucial for simplifying complex integration limits.</p>
                        `
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Torsional Pendulum and Bending of Beams are mandatory 16-mark questions.</div>
                            <h2>1.1 Torsional Pendulum</h2>
                            <p>Used to find the Rigidity Modulus (n) of a wire.</p>
                            <div class="highlight-box"><b>Period:</b> T = 2π √(I/C)</div>
                            <h2>1.2 Bending of Beams</h2>
                            <p><b>Young's Modulus (E):</b> Determined using Uniform and Non-uniform bending methods.</p>
                            <p><b>I-shaped Girders:</b> Used in construction as they provide maximum support with minimum weight.</p>
                        `
                    },
                    {
                        name: 'Unit 2: Electromagnetic Waves',
                        content: `
                            <h2>2.1 Maxwell's Equations</h2><p>Four fundamental equations that describe electromagnetism in terms of fields and forces.</p>
                            <h2>2.2 Plane Electromagnetic Waves</h2><p>Waves where electric and magnetic vectors are perpendicular to each other and to the direction of propagation.</p>
                            <div class="highlight-box"><b>Poynting Vector:</b> Represents the energy flux density of an EM field.</div>
                        `
                    },
                    {
                        name: 'Unit 3: Oscillations, Optics and Lasers',
                        content: `
                            <h2>3.1 Oscillations</h2><p>Damped and Forced oscillations. Resonance occurs when driving frequency matches natural frequency.</p>
                            <h2>3.2 Lasers</h2><p><b>Characteristics:</b> Monochromaticity, Coherence, Directionality, and Intensity.</p>
                            <p><b>Einstein's Coefficients:</b> A and B coefficients represent spontaneous and stimulated emission.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Basic Quantum Mechanics',
                        content: `
                            <h2>4.1 De-Broglie Hypothesis</h2><p>Wavelength λ = h/p. Matter behaves as both particle and wave.</p>
                            <div class="highlight-box"><b>Heisenberg Uncertainty Principle:</b> Δx.Δp ≥ h/4π</div>
                            <h2>4.2 Schrodinger Equation</h2><p>Time-dependent and Time-independent equations. <b>Particle in a 1D box:</b> Energy is quantized.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Applied Quantum Mechanics',
                        content: `
                            <h2>5.1 Quantum Structures</h2><p>Quantum dots, quantum wires, and quantum wells. These are nanostructures where quantum effects are dominant.</p>
                            <h2>5.2 Electron Tunneling</h2><p>Phenomenon where a particle penetrates a potential barrier that it classical cannot surmount.</p>
                            <div class="highlight-box"><b>Scanning Tunneling Microscope (STM):</b> Uses tunneling current to image surfaces at atomic scale.</div>
                        `
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Building blocks of algorithms and Flowcharts are 13-mark questions.</div>
                            <h2>1.1 Algorithms and Flowcharts</h2>
                            <p><b>Algorithm:</b> Finite set of instructions to solve a problem.</p>
                            <p><b>Flowchart:</b> Diagrammatic representation of an algorithm. (Start/End: Oval, Input/Output: Parallelogram, Process: Rectangle, Decision: Diamond).</p>
                            <h2>1.2 Pseudo-code</h2><p>Informal high-level description of computer program or algorithm.</p>
                        `
                    },
                    {
                        name: 'Unit 2: Data, Expressions, Statements',
                        content: `
                            <h2>2.1 Variables and Types</h2>
                            <p>In Python, memory is allocated automatically. Types: int, float, str, bool.</p>
                            <div class="highlight-box">
                                <b>Statements:</b> Instructions like <pre>x = 10 + 5</pre>
                                <b>Expressions:</b> Combinations of values and operators like <pre>a * b + c</pre>
                            </div>
                        `
                    },
                    {
                        name: 'Unit 3: Control Flow, Functions',
                        content: `
                            <h2>3.1 Conditionals</h2><p>if, if-else, if-elif-else statements. Used for decision making.</p>
                            <h2>3.2 Iteration (Loops)</h2><p><b>while-loop</b> and <b>for-loop</b>. Breaking and continuing loops.</p>
                            <h2>3.3 Functions</h2><p>Reusable blocks of code. <b>Recursion:</b> A function calling itself.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Compound Data Types',
                        content: `
                            <h2>4.1 Lists</h2><p>Mutable sequences. Methods: append, extend, insert, pop, remove.</p>
                            <h2>4.2 Tuples</h2><p>Immutable sequences. Used for data that should not change.</p>
                            <h2>4.3 Dictionaries</h2><p>Key-Value pairs (e.g., {'name': 'Alice', 'age': 20}).</p>
                        `
                    },
                    {
                        name: 'Unit 5: Files, Modules, Packages',
                        content: `
                            <h2>5.1 File Handling</h2><p>Opening, reading, writing, and closing files. <b>Context Managers:</b> <i>with open() as f:</i> ensures file closure.</p>
                            <h2>5.2 Modules and Packages</h2><p>Organizing code into reusable components. Using <i>import</i> statement to use libraries like <i>math</i> or <i>os</i>.</p>
                        `
                    }
                ],
                tags: 'python coding ge3151 programming anna university'
            },
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
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Hardness estimation (EDTA) and Reverse Osmosis (RO) are 16-mark sure-shots.</div>
                            <h2>1.1 Hardness of Water</h2>
                            <p><b>Types:</b> Temporary (Carbonates of Ca, Mg) and Permanent (Chlorides, Sulfates of Ca, Mg).</p>
                            <div class="highlight-box"><b>EDTA Method:</b> A complexometric titration used to find total hardness using EBT indicator.</div>
                            <h2>1.2 Potable Water Treatment</h2><p>Zeolite process, Ion exchange process, and Desalination (Reverse Osmosis).</p>
                        `
                    },
                    {
                        name: 'Unit 2: Nano Chemistry',
                        content: `
                            <h2>2.1 Nanomaterials</h2><p>Materials with at least one dimension in range of 1-100 nm. Properties change at nano-scale due to high surface area to volume ratio.</p>
                            <h2>2.2 Synthesis of Nanomaterials</h2><p><b>Top-Down:</b> Breaking bulk (e.g., ball milling). <b>Bottom-Up:</b> Building atoms (e.g., Sol-gel, Chemical Vapor Deposition).</p>
                        `
                    },
                    {
                        name: 'Unit 3: Phase Rule and Alloys',
                        content: `
                            <h2>3.1 Gibbs Phase Rule</h2><p><b>F = C - P + 2</b>. Describes state of systems at equilibrium.</p>
                            <h2>3.2 Lead-Silver System</h2><p>Used in Pattinson's process for desilverization of lead.</p>
                            <h2>3.3 Alloys</h2><p>Solid solution of two or more metals (e.g., Nichrome, Stainless Steel).</p>
                        `
                    },
                    {
                        name: 'Unit 4: Fuels and Combustion',
                        content: `
                            <h2>4.1 Classification of Fuels</h2><p>Solid (Coal), Liquid (Petroleum), and Gaseous (Natural gas) fuels.</p>
                            <div class="highlight-box"><b>Calorific Value:</b> Amount of heat produced by complete combustion of unit mass of fuel. Measured using Bomb Calorimeter.</div>
                            <h2>4.2 Flue Gas Analysis</h2><p>Determining composition of stack gases using Orsat apparatus.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Energy Sources and Storage Devices',
                        content: `
                            <h2>5.1 Nuclear Energy</h2><p>Nuclear Fission and Fusion. Nuclear reactors use controlled chain reactions.</p>
                            <h2>5.2 Batteries</h2><p><b>Primary Batteries:</b> Non-rechargeable (e.g., Dry cell). <b>Secondary Batteries:</b> Rechargeable (e.g., Lead-acid, Lithium-ion).</p>
                            <div class="highlight-box"><b>Fuel Cells:</b> Galvanic cells that convert chemical energy of fuel (like H₂) directly into electricity (e.g., H₂-O₂ cell).</div>
                        `
                    }
                ],
                tags: 'chemistry cy3151 water tech anna university'
            },
            {
                id: 'au_english_1',
                title: 'HS3151: Professional English I',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Sharing Information', content: `<h2>1.1 Parts of Speech</h2><p>Focus on nouns, verbs, and adjectives in technical context. <b>Wh-Questions:</b> Used for eliciting informations.</p>` },
                    { name: 'Unit 2: Reading & Writing', content: `<h2>2.1 Reading Strategies</h2><p>Skimming and Scanning. <b>Writing:</b> Formal letters and emails.</p>` },
                    { name: 'Unit 3: Grammar & Vocabulary', content: `<h2>3.1 Tenses</h2><p>Present, Past, and Future tenses. Subject-Verb agreement.</p>` },
                    { name: 'Unit 4: Listening', content: `<h2>4.1 Active Listening</h2><p>Note-taking and summarizing conversations.</p>` },
                    { name: 'Unit 5: Speaking', content: `<h2>5.1 Oral Communication</h2><p>Self-introduction and describing everyday objects.</p>` }
                ],
                tags: 'english hs3151 communication'
            },
            {
                id: 'au_tamil_1',
                title: 'GE3152: Heritage of Tamils',
                univ: 'anna',
                dept: 'Common First Year',
                sem: 'Semester 1',
                category: 'Engineering',
                chapters: [
                    { name: 'Unit 1: Language and Literature', content: `<h2>1.1 Sangam Literature</h2><p>Ettuthogai (Eight Anthologies) and Pathupattu (Ten Idylls). 18 Lesser Texts (Pathinenkelkanakku).</p>` },
                    { name: 'Unit 2: Heritage of Tamils', content: `<h2>2.1 Arts and Crafts</h2><p>Sculpture, Architecture, and Fine arts. Temple architecture (Dravidian style).</p>` },
                    { name: 'Unit 3: Music and Dance', content: `<h2>3.1 Folk Arts</h2><p>Isai (Music) and Nadagam (Drama). Traditional folk dances.</p>` }
                ],
                tags: 'tamil heritage ge3152'
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
