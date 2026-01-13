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
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> This unit is the foundation of Engineering Math. Master the 16-mark problem which combines finding Eigenvalues, Eigenvectors, and verifying Cayley-Hamilton Theorem.</div>
                            
                            <h2>1.1 Introduction to Eigenvalues and Eigenvectors</h2>
                            <p>For any square matrix <b>A</b> of order <i>n</i>, if there exists a non-zero vector <b>X</b> and a scalar <b>λ</b> such that:</p>
                            <div class="highlight-box"><b>AX = λX</b></div>
                            <p>Then <b>λ</b> is called the <b>Eigenvalue</b> (or characteristic value) and <b>X</b> is the corresponding <b>Eigenvector</b>.</p>
                            
                            <h3>1.1.1 The Characteristic Equation</h3>
                            <p>To find λ, we solve the equation:</p>
                            <div class="highlight-box"><b>|A - λI| = 0</b></div>
                            <p>Where <b>I</b> is the identity matrix. This results in a polynomial in λ of degree <i>n</i>. The roots of this polynomial are the Eigenvalues.</p>
                            
                            <h3>1.1.2 Properties of Eigenvalues (Frequently asked in Part A)</h3>
                            <ul>
                                <li><b>Property 1:</b> The sum of the Eigenvalues of a matrix is equal to the <b>Trace</b> of the matrix (sum of main diagonal elements).</li>
                                <li><b>Property 2:</b> The product of the Eigenvalues is equal to the <b>Determinant</b> of the matrix.</li>
                                <li><b>Property 3:</b> If λ is an Eigenvalue of A, then 1/λ is an Eigenvalue of A⁻¹ (provided |A| ≠ 0).</li>
                                <li><b>Property 4:</b> If λ₁, λ₂... are Eigenvalues of A, then kλ₁, kλ₂... are Eigenvalues of kA.</li>
                            </ul>

                            <h3>1.1.3 Worked Example: 2x2 Matrix</h3>
                            <p><b>Question:</b> Find Eigenvalues for A = [[1, 2], [2, 4]]</p>
                            <p><b>Solution:</b><br>
                                1. Characteristic eq: λ² - (S₁)λ + |A| = 0<br>
                                2. S₁ (Trace) = 1 + 4 = 5<br>
                                3. |A| = (1*4) - (2*2) = 0<br>
                                4. Eq: λ² - 5λ = 0 => λ(λ - 5) = 0<br>
                                5. <b>Eigenvalues: λ = 0, 5</b>
                            </p>

                            <h2>1.2 Cayley-Hamilton Theorem</h2>
                            <p><b>Statement:</b> Every square matrix satisfies its own characteristic equation.</p>
                            <p>If the characteristic equation is λⁿ + c₁λⁿ⁻¹ + ... + cₙ = 0, then:</p>
                            <div class="highlight-box"><b>Aⁿ + c₁Aⁿ⁻¹ + ... + cₙI = 0</b></div>
                            
                            <h3>1.2.1 Applications of Cayley-Hamilton</h3>
                            <p>1. <b>Finding A⁻¹:</b> Multiply the theorem equation by A⁻¹ and solve for A⁻¹I.</p>
                            <p>2. <b>Finding Higher Powers (A⁴, A⁵...):</b> Express higher powers in terms of lower powers using the theorem.</p>

                            <h2>1.3 Quadratic Forms and Canonical Forms</h2>
                            <p>A homogeneous polynomial of degree two is called a <b>Quadratic Form</b>. E.g., Q = ax² + 2hxy + by².</p>
                            <p><b>Reducing to Canonical Form:</b> We use a technique called <i>Orthogonal Transformation</i>. 
                            1. Find Eigenvalues of the symmetric matrix associated with Q. 
                            2. Find normalized Eigenvectors. 
                            3. Construct Modal Matrix <b>N</b>. 
                            4. Canonical form = λ₁y₁² + λ₂y₂² + λ₃y₃².</p>
                        `
                    },
                    {
                        name: 'Unit 2: Differential Calculus',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Master the Curvature and Evolutes. These are the most common 16-mark problems in Semester exams.</div>
                            
                            <h2>2.1 Limits and Continuity</h2>
                            <p>A function <b>f(x)</b> has a limit <b>L</b> as x approaches <b>a</b> if the value of f(x) can be made arbitrarily close to L by taking x sufficiently close to a.</p>
                            <p><b>Continuity:</b> A function is continuous at x=a if:</p>
                            <ol>
                                <li>f(a) is defined.</li>
                                <li>lim (x→a) f(x) exists.</li>
                                <li>lim (x→a) f(x) = f(a).</li>
                            </ol>

                            <h2>2.2 Differentiation Techniques</h2>
                            <p>While basic differentiation (Product, Quotient rules) is expected, focus on <b>Logarithmic Differentiation</b> for complex functions like y = x^x.</p>
                            <div class="highlight-box"><b>Chain Rule:</b> dy/dx = (dy/du) * (du/dx)</div>

                            <h2>2.3 Tangents and Normals</h2>
                            <p>The derivative <b>dy/dx</b> at a point represents the slope (m) of the tangent.</p>
                            <ul>
                                <li><b>Eq. of Tangent:</b> y - y₁ = m(x - x₁)</li>
                                <li><b>Eq. of Normal:</b> y - y₁ = (-1/m)(x - x₁)</li>
                            </ul>

                            <h2>2.4 Curvature</h2>
                            <p>The Curvature (κ) is a measure of how sharply a curve turns. The <b>Radius of Curvature (ρ)</b> is the reciprocal of curvature.</p>
                            <div class="highlight-box"><b>Radius of Curvature Formula:</b> ρ = [1 + (y₁)²]^(3/2) / |y₂|</div>
                            <p>Where y₁ = dy/dx and y₂ = d²y/dx².</p>

                            <h2>2.5 Evolutes and Involutes</h2>
                            <p>The locus of the <b>center of curvature</b> of a given curve is called its <b>Evolute</b>.</p>
                            <p><b>Steps to find Evolutes:</b><br>
                                1. Find x̄ = x - [y₁(1 + y₁²)] / y₂<br>
                                2. Find ȳ = y + [1 + y₁²] / y₂<br>
                                3. Eliminate the parameter (t or θ) between x̄ and ȳ to get the relation between x̄ and ȳ. This is the Evolute.
                            </p>
                        `
                    },
                    {
                        name: 'Unit 3: Functions of Several Variables',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> The Method of Lagrange Multipliers is a guaranteed 16-mark question. Focus on finding the extreme values of f(x,y,z) subject to a constraint g(x,y,z)=0.</div>

                            <h2>3.1 Partial Differentiation</h2>
                            <p>If <b>u = f(x,y)</b>, then the partial derivative of u with respect to x is found by keeping y constant.</p>
                            <div class="highlight-box"><b>Euler's Theorem:</b> If u is a homogeneous function of x and y of degree n, then x(∂u/∂x) + y(∂u/∂y) = nu</div>

                            <h2>3.2 Total Derivatives</h2>
                            <p>If u = f(x,y) where x and y are functions of t, then:<br>
                            <b>du/dt = (∂u/∂x)(dx/dt) + (∂u/∂y)(dy/dt)</b></p>

                            <h2>3.3 Jacobians</h2>
                            <p>If u and v are functions of x and y, the Jacobian <b>J = ∂(u,v)/∂(x,y)</b> is the determinant of the 2x2 matrix of partial derivatives.</p>
                            <p><b>Property:</b> If J₁ is the Jacobian of (u,v) w.r.t (x,y) and J₂ is the Jacobian of (x,y) w.r.t (u,v), then <b>J₁ * J₂ = 1</b>.</p>

                            <h2>3.4 Maxima and Minima for Functions of Two Variables</h2>
                            <p><b>Steps:</b><br>
                                1. Find ∂f/∂x = 0 and ∂f/∂y = 0. Solve for stationary points (a,b).<br>
                                2. Calculate r = ∂²f/∂x², s = ∂²f/∂x∂y, t = ∂²f/∂y².<br>
                                3. If <b>rt - s² > 0</b> and <b>r < 0</b>, it's a <b>Maximum</b>.<br>
                                4. If <b>rt - s² > 0</b> and <b>r > 0</b>, it's a <b>Minimum</b>.<br>
                                5. If <b>rt - s² < 0</b>, it's a <b>Saddle Point</b>.
                            </p>

                            <h2>3.5 Method of Lagrange Multipliers</h2>
                            <p>To find extreme values of f(x,y,z) subject to φ(x,y,z) = 0:<br>
                            Form <b>F(x,y,z,λ) = f + λφ</b>. Solve the system of 4 equations: Fx=0, Fy=0, Fz=0, Fλ=0.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Integral Calculus',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Master the Integration by Parts and Bernoulli's Formula. Most problems in Part B involve these techniques.</div>

                            <h2>4.1 Basic Integration Rules</h2>
                            <p>Integration is the inverse process of differentiation. Focus on the standard forms of algebraic, trigonometric, and exponential functions.</p>

                            <h2>4.2 Methods of Integration</h2>
                            <ul>
                                <li><b>Substitution Method:</b> Substitute u = g(x) to simplify the integrand.</li>
                                <li><b>Partial Fractions:</b> Used for integrating rational functions.</li>
                                <li><b>Integration by Parts:</b> ∫u dv = uv - ∫v du (Use ILATE rule to choose 'u').</li>
                            </ul>
                            <div class="highlight-box"><b>Bernoulli's Formula:</b> ∫ u dv = uv - u'v₁ + u''v₂ - u'''v₃...</div>
                            <p>Where u', u'' are successive derivatives and v₁, v₂ are successive integrals. Use this when 'u' is a polynomial like x² or x³.</p>

                            <h2>4.3 Improper Integrals</h2>
                            <p>Integrals with infinite limits or integrands that become infinite at some point in the interval. We evaluate them using limits.</p>
                            <div class="highlight-box"><b>Comparison Test:</b> Used to check if an improper integral converges or diverges without evaluating it.</div>
                        `
                    },
                    {
                        name: 'Unit 5: Multiple Integrals',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Changing the Order of Integration is the most important topic. It often converts a difficult-to-solve integral into a simple one.</div>

                            <h2>5.1 Double Integrals</h2>
                            <p>Used to find the <b>Area</b> of a plane region. <b>Area = ∫∫ dx dy</b>.</p>
                            <p><b>Steps for Change of Order:</b><br>
                                1. Sketch the region defined by the current limits.<br>
                                2. Draw a strip in the other direction (vertical if it was horizontal, or vice versa).<br>
                                3. Determine the new limits from the sketch.
                            </p>

                            <h2>5.2 Double Integrals in Polar Coordinates</h2>
                            <p>Substitute x = r cosθ, y = r sinθ. The area element <b>dx dy</b> becomes <b>r dr dθ</b>.</p>

                            <h2>5.3 Triple Integrals</h2>
                            <p>Used to find the <b>Volume</b> of a solid. <b>Volume = ∫∫∫ dx dy dz</b>.</p>
                            <p><b>Applications:</b> Finding Volume using Double and Triple integrals is a standard 16-mark problem.</p>
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Torsional Pendulum is a sure-shot 16-mark question. Be prepared to derive the Rigidity Modulus 'n' formula.</div>

                            <h2>1.1 Torsional Pendulum</h2>
                            <p>A rigid body suspended by a thin wire which executes rotational oscillations. When the body is twisted and released, the wire exerts a restoring torque due to its elasticity.</p>
                            <div class="highlight-box"><b>Restoring Torque:</b> τ = -Cθ<br><b>Period of Oscillation:</b> T = 2π √(I/C)</div>
                            <p>Where I is the moment of inertia and C is the couple per unit twist (C = πnr⁴ / 2l).</p>

                            <h2>1.2 Bending of Beams</h2>
                            <p>A beam is a structural member whose length is large compared to its thickness. When it is loaded, it undergoes bending.</p>
                            <ul>
                                <li><b>Neutral Axis:</b> The layer which remains unchanged in length during bending.</li>
                                <li><b>Young's Modulus (E):</b> Measurement of tensile stiffness. Can be determined using <b>Uniform Bending</b> (using a telescope) or <b>Non-uniform Bending</b> (using a pin and microscope).</li>
                            </ul>
                            <div class="highlight-box"><b>Bending Moment:</b> M = EI / R<br>Where R is the radius of curvature.</div>
                        `
                    },
                    {
                        name: 'Unit 2: Electromagnetic Waves',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Expect a problem on calculating the Poynting Vector or the speed of light in a different medium using ε and μ.</div>

                            <h2>2.1 Maxwell's Equations (Differential Form)</h2>
                            <ol>
                                <li><b>Gauss Law (Electrostatics):</b> ∇.D = ρv</li>
                                <li><b>Gauss Law (Magnetostatics):</b> ∇.B = 0</li>
                                <li><b>Faraday's Law:</b> ∇ x E = -∂B/∂t</li>
                                <li><b>Ampere's Law (Modified):</b> ∇ x H = J + ∂D/∂t</li>
                            </ol>

                            <h2>2.2 Displacement Current</h2>
                            <p>Maxwell introduced the concept of <b>Displacement Current</b> (Jd = ∂D/∂t) to explain the continuity of current in a capacitor circuit during charging/discharging.</p>

                            <h2>2.3 Electromagnetic Wave Equations</h2>
                            <p>Maxwell's equations lead to the prediction that EM waves travel in a vacuum at the speed of light <b>c = 1 / √(μ₀ε₀) ≈ 3 x 10⁸ m/s</b>.</p>
                            <div class="highlight-box"><b>Poynting Vector (S):</b> S = E x H<br>It represents the power per unit area carried by the EM wave.</div>
                        `
                    },
                    {
                        name: 'Unit 3: Oscillations, Optics and Lasers',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Einstein's coefficients and Population Inversion are mandatory 16-mark theory questions.</div>

                            <h2>3.1 Oscillations</h2>
                            <p><b>Resonance:</b> When the external force frequency matches the natural frequency of the system, the amplitude becomes maximum.</p>

                            <h2>3.2 Interference and Diffraction</h2>
                            <p><b>Interference:</b> Superposition of two coherent waves. <b>Diffraction:</b> Bending of light around the corners of an obstacle.</p>

                            <h2>3.3 Lasers</h2>
                            <p>Laser stands for "Light Amplification by Stimulated Emission of Radiation".</p>
                            <ul>
                                <li><b>Population Inversion:</b> Achieving more atoms in the higher energy state than the lower energy state. Essential for laser action.</li>
                                <li><b>Einstein's Coefficients:</b> A and B coefficients relate the probabilities of spontaneous emission, stimulated absorption, and stimulated emission.</li>
                            </ul>
                            <div class="highlight-box"><b>Einstein's Relation:</b> B₁₂ = B₂₁ (Prob of absorption = Prob of stimulated emission)</div>
                        `
                    },
                    {
                        name: 'Unit 4: Basic Quantum Mechanics',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> "Particle in a 1D Box" is the most famous derivation. Practice it repeatedly to get the normalization constant right.</div>

                            <h2>4.1 Wave-Particle Duality</h2>
                            <p>Matter has a dual nature. The wave associated with a moving particle is called a <b>Matter Wave</b> or De-Broglie wave.</p>
                            <div class="highlight-box"><b>De-Broglie Wavelength:</b> λ = h / mv = h / √(2mE)</div>

                            <h2>4.2 Schrodinger Wave Equation</h2>
                            <p>The core equation of Quantum Mechanics. The <b>Time-Independent</b> version is:</p>
                            <div class="highlight-box"><b>∇²ψ + (2m/ℏ²)(E - V)ψ = 0</b></div>
                            <p>Where ψ is the wave function, E is total energy, and V is potential energy.</p>

                            <h2>4.3 Particle in a One-Dimensional Box</h2>
                            <p>A particle confined to a 1D potential well of width 'L'. The energy is quantized:<br>
                            <b>En = n²h² / 8mL²</b> where n=1,2,3...</p>
                        `
                    },
                    {
                        name: 'Unit 5: Applied Quantum Mechanics',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Scanning Tunneling Microscope (STM) is a common 16-mark descriptive question.</div>

                            <h2>5.1 Quantum Tunneling</h2>
                            <p>A quantum phenomenon where a particle passes through a potential barrier that it classically could not surmount. This is due to the wave-like property of the particle.</p>

                            <h2>5.2 Quantum Structures</h2>
                            <ul>
                                <li><b>Quantum Well:</b> Particle restricted in 1 dimension (thin film).</li>
                                <li><b>Quantum Wire:</b> Particle restricted in 2 dimensions (nano-wire).</li>
                                <li><b>Quantum Dot:</b> Particle restricted in all 3 dimensions (nano-crystal).</li>
                            </ul>

                            <h2>5.3 Nano-technology Applications</h2>
                            <p><b>Scanning Tunneling Microscope (STM):</b> Uses a fine metal tip to scan a surface at the atomic scale by measuring the tunneling current between the tip and the surface.</p>
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> The differences between Top-Down and Bottom-Up synthesis are a frequent Part B theory question.</div>

                            <h2>2.1 Basics of Nanomaterials</h2>
                            <p>Materials having at least one dimension in the range of 1 to 100 nm. At this scale, the <b>Surface Area to Volume Ratio</b> increases dramatically, changing physical and chemical properties.</p>

                            <h2>2.2 Synthesis of Nanomaterials</h2>
                            <ul>
                                <li><b>Top-Down Approach:</b> Breaking down bulk materials into nano-sized particles (e.g., Ball Milling, Lithography).</li>
                                <li><b>Bottom-Up Approach:</b> Building materials atom-by-atom (e.g., Sol-gel method, Chemical Vapor Deposition, Laser Ablation).</li>
                            </ul>

                            <h2>2.3 Characterization Techniques</h2>
                            <p><b>SEM (Scanning Electron Microscope):</b> Used to study surface morphology.</p>
                            <p><b>TEM (Transmission Electron Microscope):</b> Used to see the internal structure and size distribution.</p>

                            <h2>2.4 Applications</h2>
                            <p>Used in drug delivery, self-cleaning surfaces, and high-efficiency catalysts.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Phase Rule and Alloys',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> The Lead-Silver (Pb-Ag) system and the concept of Eutectic Point are 16-mark sure-shots.</div>

                            <h2>3.1 Gibbs Phase Rule</h2>
                            <div class="highlight-box"><b>F = C - P + 2</b></div>
                            <p>Where F = Degrees of Freedom, C = Components, P = Phases. For a water system (C=1), at the <b>Triple Point</b> (P=3), F = 0.</p>

                            <h2>3.2 One-Component System (Water)</h2>
                            <p>Shows regions, curves (like the boiling and melting curves), and points where phases coexist.</p>

                            <h2>3.3 Two-Component System (Lead-Silver)</h2>
                            <p>Used in the <b>Pattinson's Process</b> for the desilverization of lead. The <b>Eutectic Point</b> is the lowest temperature at which the liquid phase is stable.</p>

                            <h2>3.4 Alloys</h2>
                            <p>Homogeneous mixture of two or more metals. <b>Nichrome</b> (Ni-Cr) is used in heating elements, and <b>Stainless Steel</b> is used for corrosion resistance.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Fuels and Combustion',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Practice numerical problems on calculating the Gross Calorific Value (GCV) and Net Calorific Value (NCV) from Dulong's formula.</div>

                            <h2>4.1 Classification of Fuels</h2>
                            <p>Primary (Coal, Wood) and Secondary (Coke, Gasoline).</p>

                            <h2>4.2 Calorific Value</h2>
                            <p>The total heat produced by the complete combustion of a unit mass of fuel.</p>
                            <div class="highlight-box"><b>GCV:</b> Includes the latent heat of condensation of steam.<br><b>NCV:</b> Excludes it. NCV = GCV - (0.09 * H * 587) cal/g.</div>

                            <h2>4.3 Bomb Calorimeter</h2>
                            <p>Standard apparatus to find the GCV of solid and non-volatile liquid fuels.</p>

                            <h2>4.4 Flue Gas Analysis</h2>
                            <p>To check the efficiency of combustion, the composition of stack gases (CO₂, CO, O₂) is analyzed using <b>Orsat's Apparatus</b>.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Energy Sources and Storage Devices',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Lithium-Ion Batteries and H₂-O₂ Fuel Cells are the most common questions in modern energy storage.</div>

                            <h2>5.1 Nuclear Energy</h2>
                            <ul>
                                <li><b>Nuclear Fission:</b> Heavy nucleus splitting (used in Power Plants). <b>Control Rods</b> (Cadmium/Boron) absorb neutrons.</li>
                                <li><b>Nuclear Fusion:</b> Light nuclei joining (Sun's energy).</li>
                            </ul>

                            <h2>5.2 Batteries (Storage Devices)</h2>
                            <ul>
                                <li><b>Lead-Acid Battery:</b> Secondary battery used in automobiles. Anode: Pb, Cathode: PbO₂, Electrolyte: H₂SO₄.</li>
                                <li><b>Lithium-Ion Battery:</b> Used in smartphones. High energy density and long life.</li>
                            </ul>

                            <h2>5.3 Fuel Cells</h2>
                            <p>Cells that convert chemical energy of a fuel directly into electrical energy. The <b>H₂-O₂ Fuel Cell</b> is clean and efficient, used in space programs.</p>
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
                    {
                        name: 'Unit 1: Sharing Information',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Technical Vocabulary and Wh-Questions are common Part A questions.</div>
                            <h2>1.1 Parts of Speech</h2>
                            <p>Focus on using <b>Nouns</b> (Technical terms), <b>Verbs</b> (Action oriented), and <b>Adjectives</b> (Descriptive) in a technical context.</p>
                            <h2>1.2 Wh-Questions and Yes/No Questions</h2>
                            <p>Used for eliciting specific information. <i>What, Where, When, Why, How.</i></p>
                            <h2>1.3 Prefixes and Suffixes</h2>
                            <p>Understanding word roots to decode technical jargon (e.g., <i>hyper-</i>, <i>-less</i>, <i>-able</i>).</p>
                        `
                    },
                    {
                        name: 'Unit 2: Reading & Writing',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Formal Letter Writing and Scanning/Skimming are high-scoring topics.</div>
                            <h2>2.1 Reading Strategies</h2>
                            <ul>
                                <li><b>Skimming:</b> Reading quickly to get the main idea.</li>
                                <li><b>Scanning:</b> Looking for specific information (dates, names).</li>
                            </ul>
                            <h2>2.2 Writing: Formal Letters and Emails</h2>
                            <p>Structure: Salutation, Reference, Body, Conclusion, Signature. Focus on the <b>Tone</b> (Professional and Polite).</p>
                            <div class="highlight-box"><b>Key phrase:</b> "With reference to your advertisement/letter dated..."</div>
                        `
                    },
                    {
                        name: 'Unit 3: Grammar & Vocabulary',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Subject-Verb Agreement is the most common grammatical error. Practice identifying the true subject in complex sentences.</div>
                            <h2>3.1 Tenses</h2>
                            <p>Mastering the 12 tenses. Technical writing often uses <b>Present Simple</b> for facts and <b>Past Simple</b> for experiments.</p>
                            <h2>3.2 Articles (a, an, the)</h2>
                            <p>Correct usage of definite and indefinite articles.</p>
                            <h2>3.3 Discourse Markers</h2>
                            <p>Words like <i>However</i>, <i>Furthermore</i>, <i>In addition</i> used to connect ideas logically.</p>
                        `
                    },
                    {
                        name: 'Unit 4: Listening',
                        content: `
                            <h2>4.1 Active Listening</h2>
                            <p>Listening for specific details and summarizing. Identifying the <b>speaker's purpose</b> and tone.</p>
                            <h2>4.2 Note-taking</h2>
                            <p>Methodologies like <b>Cornell Notes</b> or Using Abbreviations to capture information during lectures.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Speaking',
                        content: `
                            <h2>5.1 Presentation Skills</h2>
                            <p>Body language, Eye contact, and Voice modulation. Using visual aids like PPT effectively.</p>
                            <h2>5.2 Group Discussions</h2>
                            <p>Entering the discussion, expressing agreement/disagreement, and summarizing the points.</p>
                            <div class="highlight-box"><b>Example phrases:</b><br>"I'd like to add that..."<br>"I see your point, but..."</div>
                        `
                    }
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
                    {
                        name: 'Unit 1: Language and Literature',
                        content: `
                            <h2>1.1 Sangam Literature</h2>
                            <p>The earliest period of Tamil literature. Key works include <b>Ettuthogai</b> (Eight Anthologies) and <b>Pathupattu</b> (Ten Idylls).</p>
                            <h2>1.2 Five Landscapes (Ainthinai)</h2>
                            <p>Tamil poetry classified based on landscapes: Kurinji (Mountains), Mullai (Forest), Marutham (Fields), Neithal (Sea), and Paalai (Desert).</p>
                        `
                    },
                    {
                        name: 'Unit 2: Heritage of Tamils',
                        content: `
                            <h2>2.1 Arts and Crafts</h2>
                            <p>Sculpture, Architecture, and Fine arts. The <b>Dravidian style</b> of temple architecture (e.g., Tanjore Big Temple).</p>
                            <h2>2.2 Traditional Crafts</h2><p>Pottery, Weaving, and Metallurgy.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Music and Dance',
                        content: `
                            <h2>3.1 Folk Arts</h2>
                            <ul>
                                <li><b>Karakattam:</b> Balancing a pot on the head.</li>
                                <li><b>Oyilattam:</b> Dance of Grace.</li>
                                <li><b>Therukoothu:</b> Street Theater.</li>
                            </ul>
                            <h2>3.2 Classical Music</h2><p>Development of Pann and the evolution of Carnatic music.</p>
                        `
                    }
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
