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
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> This unit is the absolute bedrock of Engineering Mathematics. In the University Examination, Expect one 16-mark big problem that asks you to: (1) Find Eigenvalues/Eigenvectors, (2) Verify Cayley-Hamilton Theorem, and (3) Find A⁻¹ and higher powers of A. Master this sequence and you secure 16 marks instantly.</div>
                            
                            <h2>1.1 Introduction to Linear Algebra & Matrices</h2>
                            <p>Matrices are not just grids of numbers; they represent linear transformations in space. In engineering, we use them to solve systems of structural equations, analyze circuits, and even in computer graphics to rotate objects.</p>

                            <h2>1.2 Eigenvalues and Eigenvectors: The Core Theory</h2>
                            <p>For any square matrix <b>A</b> of order <i>n</i>, a scalar <b>λ</b> is called an <b>Eigenvalue</b> if there exists a non-zero vector <b>X</b> (the <b>Eigenvector</b>) such that:</p>
                            <div class="highlight-box"><b>AX = λX</b></div>
                            <p>This equation can be rewritten as <b>(A - λI)X = 0</b>. For a non-trivial solution (X ≠ 0), the determinant of the coefficient matrix must be zero.</p>

                            <h3>1.2.1 The Characteristic Equation</h3>
                            <p>The equation <b>|A - λI| = 0</b> is the <b>Characteristic Equation</b> of matrix A. Solving this polynomial gives the Eigenvalues.</p>
                            <ul>
                                <li><b>For a 2x2 Matrix:</b> λ² - (S₁)λ + |A| = 0 (Where S₁ = Trace = Sum of main diagonal).</li>
                                <li><b>For a 3x3 Matrix:</b> λ³ - (S₁)λ² + (S₂)λ - |A| = 0 
                                    <br>Where S₁ = Sum of main diagonal, S₂ = Sum of minors of main diagonal elements, and |A| is the determinant.</li>
                            </ul>

                            <h3>1.2.2 Exhaustive Properties of Eigenvalues (Critical for Part A)</h3>
                            <div class="highlight-box">
                                <ol>
                                    <li><b>Sum Rule:</b> λ₁ + λ₂ + ... + λₙ = Trace(A).</li>
                                    <li><b>Product Rule:</b> λ₁ * λ₂ * ... * λₙ = Det(A).</li>
                                    <li><b>Inverse Rule:</b> If λ is an eigenvalue of A, then 1/λ is an eigenvalue of A⁻¹ (if |A|≠0).</li>
                                    <li><b>Power Rule:</b> If λ is an eigenvalue of A, then λᵏ is an eigenvalue of Aᵏ.</li>
                                    <li><b>Transpose Rule:</b> A and Aᵀ have the same eigenvalues.</li>
                                    <li><b>Symmetric Matrix Rule:</b> The eigenvalues of a real symmetric matrix are always real.</li>
                                    <li><b>Orthogonal Matrix Rule:</b> The eigenvalues of an orthogonal matrix have absolute value 1 (|λ| = 1).</li>
                                </ol>
                            </div>

                            <h3>1.2.3 Solving for Eigenvectors: The Methodology</h3>
                            <p>Once you have λ, substitute it into <b>(A - λI)X = 0</b> to get a system of linear equations.</p>
                            <ul>
                                <li><b>Case 1: Non-repeated Eigenvalues:</b> Use the cross-multiplication method or simple substitution to find X₁, X₂, X₃.</li>
                                <li><b>Case 2: Repeated Eigenvalues:</b> If λ₁ = λ₂, you must find two linearly independent vectors. If the matrix is symmetric, the eigenvectors belonging to distinct eigenvalues are always orthogonal.</li>
                            </ul>

                            <h2>1.3 Cayley-Hamilton Theorem: Deep Dive</h2>
                            <p><b>Statement:</b> Every square matrix satisfies its own characteristic equation.</p>
                            <p>If the characteristic equation is p(λ) = λⁿ + c₁λⁿ⁻¹ + ... + cₙ = 0, then the matrix equation is:</p>
                            <div class="highlight-box"><b>Aⁿ + c₁Aⁿ⁻¹ + ... + cₙI = 0</b></div>

                            <h3>1.3.1 Verification Process</h3>
                            <ol>
                                <li>Find the characteristic equation |A - λI| = 0.</li>
                                <li>Calculate the powers of A (A², A³...).</li>
                                <li>Substitute these matrices into the characteristic equation.</li>
                                <li>The result must be a <b>Null Matrix (O)</b>.</li>
                            </ol>

                            <h3>1.3.2 Crucial Applications</h3>
                            <p><b>1. Finding A⁻¹:</b> Multiply the theorem equation by A⁻¹. 
                            <br>Example: A² - 5A + 7I = 0 => A - 5I + 7A⁻¹ = 0 => <b>A⁻¹ = 1/7(5I - A)</b>.</p>
                            <p><b>2. Finding Higher Powers:</b> If you need A⁴, express it as a linear combination of A, A², and I using the theorem. This is significantly faster than direct multiplication.</p>

                            <h2>1.4 Similarity and Diagonalization</h2>
                            <p>A matrix A is <b>diagonalizable</b> if there exists an invertible matrix <b>M</b> (Modal Matrix) such that <b>D = M⁻¹AM</b>, where D is a diagonal matrix containing the eigenvalues.</p>
                            <ul>
                                <li><b>Modal Matrix (M):</b> Formed by placing eigenvectors as columns.</li>
                                <li><b>Symmetric Matrices:</b> Can be diagonalized by <b>Orthogonal Transformation</b> (D = NᵀAN).</li>
                            </ul>

                            <h2>1.5 Quadratic Forms and Canonical Transformation</h2>
                            <p>A <b>Quadratic Form</b> is a homogeneous polynomial of degree 2. E.g., 2x₁² + 3x₂² - 4x₁x₂. It can be represented in matrix form as <b>XᵀAX</b> (where A is a symmetric matrix).</p>
                            <p><b>Canonical Form Transformation:</b></p>
                            <ol>
                                <li>Write the symmetric matrix A.</li>
                                <li>Find eigenvalues λ₁, λ₂, λ₃.</li>
                                <li>The Canonical form is simply <b>λ₁y₁² + λ₂y₂² + λ₃y₃²</b>.</li>
                                <li><b>Nature of QF:</b> 
                                    <ul>
                                        <li><b>Positive Definite:</b> All λ > 0.</li>
                                        <li><b>Negative Definite:</b> All λ < 0.</li>
                                        <li><b>Indefinite:</b> Some λ > 0 and some λ < 0.</li>
                                        <li><b>Positive/Negative Semi-definite:</b> One or more λ = 0, and others are > 0 or < 0.</li>
                                    </ul>
                                </li>
                                <li><b>Rank:</b> Number of non-zero eigenvalues.</li>
                                <li><b>Index:</b> Number of positive eigenvalues.</li>
                                <li><b>Signature:</b> (Number of positive λ) - (Number of negative λ).</li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 2: Differential Calculus',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> The Radius of Curvature (ρ) and the equation of the Evolute are standard 16-mark problems. Be careful with the algebraic simplification when eliminating parameters in Evolute problems.</div>
                            
                            <h2>2.1 Limits and Continuity</h2>
                            <p>Limits describe the behavior of a function as the input approaches a specific value. A limit exists if the Left-Hand Limit (LHL) equals the Right-Hand Limit (RHL).</p>
                            <ul>
                                <li><b>Indeterminate Forms:</b> 0/0, ∞/∞, 0*∞, 1^∞, ∞-∞.</li>
                                <li><b>L'Hopital's Rule:</b> If lim f(x)/g(x) results in 0/0 or ∞/∞, then lim f(x)/g(x) = lim f'(x)/g'(x). This rule can be applied repeatedly until a finite value is obtained.</li>
                            </ul>

                            <h2>2.2 Differentiation Techniques</h2>
                            <ul>
                                <li><b>Chain Rule:</b> For a composite function f(g(x)), the derivative is f'(g(x)) * g'(x).</li>
                                <li><b>Logarithmic Differentiation:</b> Essential for functions like y = [f(x)]^g(x). Taking 'ln' on both sides simplifies the power into a product.</li>
                                <li><b>Implicit Differentiation:</b> Used when y cannot be easily isolated (e.g., x³ + y³ = 3axy). We differentiate both sides w.r.t x and solve for dy/dx.</li>
                            </ul>

                            <h2>2.3 Tangents and Normals</h2>
                            <p>At any point (x₁, y₁), the slope of the tangent is <b>m = (dy/dx)</b> at that point.</p>
                            <div class="highlight-box">
                                <b>Tangent Equation:</b> y - y₁ = m(x - x₁)<br>
                                <b>Normal Equation:</b> y - y₁ = (-1/m)(x - x₁)
                            </div>

                            <h2>2.4 Curvature and Radius of Curvature</h2>
                            <p>Curvature measures how fast the tangent to the curve is rotating. The Radius of Curvature (ρ) is inversely proportional to curvature.</p>
                            
                            <h3>2.4.1 Cartesian Form</h3>
                            <div class="highlight-box"><b>ρ = [1 + (y₁)²]^(3/2) / |y₂|</b></div>
                            <p>Where y₁ = dy/dx and y₂ = d²y/dx².</p>
                            
                            <h3>2.4.2 Parametric Form</h3>
                            <p>For x = f(t), y = g(t):</p>
                            <div class="highlight-box"><b>ρ = [ẋ² + ẏ²]^(3/2) / |ẋÿ - ẏẍ|</b></div>
                            <p>Where ẋ = dx/dt and ẍ = d²x/dt².</p>

                            <h2>2.5 Evolutes and Involutes</h2>
                            <p>The <b>Evolute</b> is the locus of the center of curvature (x̄, ȳ) for a given curve. The original curve is called the <b>Involute</b> of its evolute.</p>
                            <p><b>Working Procedure:</b></p>
                            <ol>
                                <li>Find the coordinates of the center of curvature:<br>
                                    x̄ = x - [y₁(1 + y₁²)] / y₂<br>
                                    ȳ = y + [1 + y₁²] / y₂</li>
                                <li>If the curve is parametric, express x̄ and ȳ in terms of 't'.</li>
                                <li>Eliminate 't' between x̄ and ȳ to find the Cartesian equation f(x̄, ȳ) = 0. This is the Evolute.</li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 3: Functions of Several Variables',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Maxima/Minima and Lagrange Multipliers are the mathematical tools used for "Optimization" in engineering. Expect one long problem combining stationary points and the rt-s² test.</div>

                            <h2>3.1 Partial Differentiation</h2>
                            <p>Partial differentiation involves differentiating with respect to one variable while treating all others as constants.</p>
                            <p><b>Notation:</b> ∂f/∂x = fx, ∂f/∂y = fy. <b>Mixed Partials:</b> fxy and fyx are equal if the function is smooth.</p>

                            <h3>3.1.1 Euler's Theorem for Homogeneous Functions</h3>
                            <p>A function is homogeneous of degree <i>n</i> if f(tx, ty) = tⁿf(x,y).</p>
                            <div class="highlight-box"><b>Statement: x(∂u/∂x) + y(∂u/∂y) = nu</b></div>
                            <p>Successive application: x²(∂²u/∂x²) + 2xy(∂²u/∂x∂y) + y²(∂²u/∂y²) = n(n-1)u.</p>

                            <h2>3.2 Taylor Series for Two Variables</h2>
                            <p>Used to approximate a function f(x,y) near a point (a,b).</p>
                            <p><b>Formula:</b> f(x,y) = f(a,b) + [h.fx(a,b) + k.fy(a,b)] + (1/2!)[h².fxx + 2hk.fxy + k².fyy] + ...<br>
                            Where h = (x-a) and k = (y-b).</p>

                            <h2>3.3 Jacobians: Transformation of Variables</h2>
                            <p>Used when changing coordinate systems (e.g., from Cartesian to Polar).</p>
                            <div class="highlight-box"><b>J = ∂(u,v)/∂(x,y) = Det | [ux, uy], [vx, vy] |</b></div>
                            <p><b>Properties:</b><br>
                                1. J(u,v/x,y) * J(x,y/u,v) = 1 (Reciprocal property).<br>
                                2. Chain rule for Jacobians: J(u,v/r,θ) = J(u,v/x,y) * J(x,y/r,θ).
                            </p>

                            <h2>3.4 Maxima and Minima (Stationary Points)</h2>
                            <p>To find the local extrema of f(x,y):</p>
                            <ol>
                                <li>Solve <b>fx = 0</b> and <b>fy = 0</b> to find stationary points (a,b).</li>
                                <li>Calculate: <b>r = fxx, s = fxy, t = fyy</b> at (a,b).</li>
                                <li><b>Delta Test (Δ = rt - s²):</b>
                                    <ul>
                                        <li>If Δ > 0 and r > 0, then f is a <b>Local Minimum</b>.</li>
                                        <li>If Δ > 0 and r < 0, then f is a <b>Local Maximum</b>.</li>
                                        <li>If Δ < 0, then f is a <b>Saddle Point</b> (neither max nor min).</li>
                                        <li>If Δ = 0, the test is inconclusive.</li>
                                    </ul>
                                </li>
                            </ol>

                            <h2>3.5 Lagrange Multipliers (Constrained Optimization)</h2>
                            <p>Used to find max/min of f(x,y,z) subject to a constraint g(x,y,z) = 0.</p>
                            <ol>
                                <li>Form the Lagrangian: <b>L = f + λg</b> (where λ is the multiplier).</li>
                                <li>Set partials to zero: Lx = 0, Ly = 0, Lz = 0, Lλ = 0.</li>
                                <li>Solve the resulting system of equations to find the critical values.</li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 4: Integral Calculus',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Bernoulli’s Formula is the fastest way to solve Integration by Parts for polynomials. Also, the properties of Definite Integrals often simplify complex-looking Part A questions.</div>

                            <h2>4.1 Fundamentals of Integration</h2>
                            <p>Integration is the process of finding the anti-derivative. It represents the area under a curve.</p>
                            
                            <h3>4.1.1 Methods of Integration</h3>
                            <ul>
                                <li><b>Substitution Method:</b> Used when the integrand contains a function and its derivative. Let u = g(x).</li>
                                <li><b>Integration by Parts:</b> Based on the product rule of differentiation. ∫u dv = uv - ∫v du. Choose 'u' using the **ILATE** rule (Inverse, Log, Algebraic, Trig, Expo).</li>
                                <li><b>Bernoulli's Formula:</b> An extension of integration by parts for ∫ xⁿ f(x) dx.<br>
                                    <b>∫ u dv = uv₁ - u'v₂ + u''v₃ - u'''v₄ + ...</b> (where u′,u″ are derivatives and v₁,v₂ are integrals).</li>
                            </ul>

                            <h2>4.2 Definite Integrals and Properties</h2>
                            <p>Definite integrals have upper and lower limits. Key properties:</p>
                            <ul>
                                <li>∫ₐᵇ f(x) dx = ∫ₐᵇ f(a+b-x) dx.</li>
                                <li>If f(x) is even: ∫₋ₐᵃ f(x) dx = 2 ∫₀ᵃ f(x) dx.</li>
                                <li>If f(x) is odd: ∫₋ₐᵃ f(x) dx = 0.</li>
                            </ul>

                            <h2>4.3 Improper Integrals</h2>
                            <p>Integrals where the interval is semi-infinite or the function is unbounded.</p>
                            <ul>
                                <li><b>Type I:</b> Infinite limits (e.g., ∫₁᪴ 1/x² dx).</li>
                                <li><b>Type II:</b> Discontinuous integrand (e.g., ∫₀¹ 1/√x dx).</li>
                                <li><b>Convergence:</b> Use the <b>Comparison Test</b> or <b>Limit Comparison Test</b> to determine if the integral has a finite value.</li>
                            </ul>

                            <h2>4.4 Special Functions: Beta and Gamma</h2>
                            <p>These functions are powerful tools for evaluating certain definite integrals.</p>
                            <div class="highlight-box">
                                <b>Gamma Function:</b> Γ(n) = ∫₀᪴ xⁿ⁻¹ e⁻ˣ dx. (Note: Γ(n) = (n-1)! for integers).<br>
                                <b>Beta Function:</b> B(m,n) = ∫₀¹ xᵐ⁻¹ (1-x)ⁿ⁻¹ dx.<br>
                                <b>Relation:</b> B(m,n) = [Γ(m)Γ(n)] / Γ(m+n).
                            </div>
                        `
                    },
                    {
                        name: 'Unit 5: Multiple Integrals',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> "Change of Order of Integration" is a 100% guaranteed 16-mark problem. Practice sketching the regions; if the sketch is correct, the limits are easy.</div>

                            <h2>5.1 Double Integrals</h2>
                            <p>Used to calculate the volume under a surface f(x,y) over a region R in the xy-plane.</p>
                            
                            <h3>5.1.1 Change of Order of Integration</h3>
                            <p>Sometimes an integral is difficult in the order dy dx. We change it to dx dy by:</p>
                            <ol>
                                <li>Identifying the region from the given limits.</li>
                                <li>Sketching the region.</li>
                                <li>Drawing a horizontal strip instead of a vertical one (or vice versa).</li>
                                <li>Finding the new limits for x and y from the diagram.</li>
                            </ol>

                            <h3>5.1.2 Double Integrals in Polar Coordinates</h3>
                            <p>Substitute <b>x = r cos θ</b> and <b>y = r sin θ</b>. The area element <b>dA = dx dy</b> becomes <b>r dr dθ</b>. This is extremely useful for circular or cardiod regions.</p>

                            <h2>5.2 Applications of Double Integrals</h2>
                            <ul>
                                <li><b>Area:</b> ∫∫ᵣ dx dy.</li>
                                <li><b>Volume:</b> ∫∫ᵣ z dx dy (where z = f(x,y) is the surface height).</li>
                            </ul>

                            <h2>5.3 Triple Integrals</h2>
                            <p>Evaluation of ∫∫∫ᵥ f(x,y,z) dx dy dz over a solid volume V. Used to find <b>Volume</b> by setting f(x,y,z) = 1.</p>
                            
                            <h3>5.3.1 Change of Variables using Jacobians</h3>
                            <p>To transform an integral from (x,y,z) to new coordinates (u,v,w):</p>
                            <div class="highlight-box">
                                <b>∫∫∫ dx dy dz = ∫∫∫ |J| du dv dw</b>
                            </div>
                            <p>Where J is the Jacobian ∂(x,y,z)/∂(u,v,w).</p>
                        `
                    },
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> This unit carries a guaranteed 16-mark derivation. You must be able to derive the expression for (1) The Rigidity Modulus using a Torsional Pendulum or (2) The Young's Modulus using Uniform/Non-uniform bending. Practice the diagrams; they are worth 4-5 marks alone.</div>

                            <h2>1.1 Theory of Elasticity: The Fundamentals</h2>
                            <p>All materials deform under external loads. <b>Elasticity</b> is the property by which a body regains its original shape and size after the removal of deforming forces.</p>
                            <ul>
                                <li><b>Stress:</b> Internal restoring force per unit area (Force/Area).</li>
                                <li><b>Strain:</b> The change in dimension per unit original dimension (Change/Original).</li>
                                <li><b>Hooke's Law:</b> Within the elastic limit, Stress is directly proportional to Strain.</li>
                            </ul>
                            
                            <h3>1.1.1 The Three Moduli</h3>
                            <div class="highlight-box">
                                <ol>
                                    <li><b>Young's Modulus (Y):</b> Longitudinal Stress / Longitudinal Strain. (Relates to stretching).</li>
                                    <li><b>Bulk Modulus (K):</b> Bulk Stress / Bulk Strain. (Relates to volume change).</li>
                                    <li><b>Rigidity Modulus (n):</b> Shearing Stress / Shearing Strain. (Relates to shape change/twist).</li>
                                </ol>
                            </div>

                            <h2>1.2 Torsional Pendulum: Rigorous Analysis</h2>
                            <p>A torsional pendulum consists of a thin metallic wire suspended from a rigid support, with a heavy disc attached to its lower end.</p>
                            <p><b>Working Principle:</b> When the disc is rotated in a horizontal plane, the wire gets twisted. A restoring couple is produced in the wire which tends to bring the disc back to its original position.</p>
                            
                            <h3>1.2.1 Derivation of Rigidity Modulus (n)</h3>
                            <ol>
                                <li>Let 'l' be the length and 'r' be the radius of the wire.</li>
                                <li>The Restoring Couple per unit twist (C) is given by: <b>C = πnr⁴ / 2l</b>.</li>
                                <li>The Equation of Motion is: <b>I (d²θ/dt²) = -Cθ</b> (where I is the Moment of Inertia).</li>
                                <li>This is the form of Simple Harmonic Motion. Comparing with d²θ/dt² = -ω²θ, we get ω = √(C/I).</li>
                                <li><b>Period of Oscillation (T):</b> T = 2π / ω = <b>2π √(I/C)</b>.</li>
                                <li>Squaring and substituting C: T² = 4π²I / (πnr⁴ / 2l) => <b>n = 8πIl / T²r⁴</b>.</li>
                            </ol>

                            <h2>1.3 Bending of Beams: Theory and Application</h2>
                            <p>A beam is defined as a metallic rod whose length is much larger than its cross-sectional area. When it is fixed at one end and loaded at the other (Cantilever), or supported at ends and loaded in the middle, it bends.</p>

                            <h3>1.3.1 Expressing the Internal Bending Moment</h3>
                            <p>When a beam is bent into a circular arc of radius R, the internal stresses create a <b>Bending Moment (M)</b>:</p>
                            <div class="highlight-box"><b>M = Y * I / R</b></div>
                            <p>Where <b>Y</b> is Young's Modulus and <b>I</b> is the Geometric Moment of Inertia of the cross-section.</p>
                            <ul>
                                <li>For a Rectangular beam: I = bd³ / 12.</li>
                                <li>For a Circular beam: I = πr⁴ / 4.</li>
                            </ul>

                            <h2>1.4 Experimental Determination of Young's Modulus</h2>
                            
                            <h3>1.4.1 Non-Uniform Bending (Point Load at Center)</h3>
                            <p>The beam is supported on two knife edges and a weight is hung from the center.</p>
                            <ul>
                                <li><b>Depression (y):</b> y = Wl³ / 48YI.</li>
                                <li>Substituting for rectangular beam: <b>Y = gl³M / 4bd³y</b>.</li>
                            </ul>

                            <h3>1.4.2 Uniform Bending (Equal Loads at Ends)</h3>
                            <p>The beam is supported on two knife edges and equal weights are hung from the two ends overhanging the supports. The beam bends into an arc of a circle.</p>
                            <ul>
                                <li><b>Elevation (y):</b> y = Wla² / 2YI.</li>
                                <li>Substituting for rectangular beam: <b>Y = 3glMa² / bd³y</b>. (Where 'a' is the distance between the load and the nearest support).</li>
                            </ul>

                            <h2>1.5 Engineering Applications: I-Shaped Girders</h2>
                            <p>In construction, beams are designed in the shape of the letter 'I'. Why?</p>
                            <ol>
                                <li>Maximum bending stress occurs at the top and bottom surfaces. The 'I' shape puts the most material where it is needed most.</li>
                                <li>It provides a high <b>Geometric Moment of Inertia (I)</b> with minimum weight.</li>
                                <li>It reduces the "depression" (sagging) of the beam under its own weight.</li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 2: Electromagnetic Waves',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Review the derivation of the EM Wave Equation for free space. It is a recurring 16-mark derivation. Also, be ready for numericals on calculating the intensity of radiation using the Poynting Vector.</div>

                            <h2>2.1 The Foundations: Maxwell's Equations</h2>
                            <p>James Clerk Maxwell unified electricity and magnetism into a single theory. These four equations describe how electric and magnetic fields are generated and altered by each other and by charges and currents.</p>
                            
                            <h3>2.1.1 The Four Equations in Differential Form</h3>
                            <div class="highlight-box">
                                <ol>
                                    <li><b>Gauss's Law for Electricity (∇·D = ρ):</b> Electric flux through a closed surface is proportional to the enclosed charge.</li>
                                    <li><b>Gauss's Law for Magnetism (∇·B = 0):</b> Magnetic monopoles do not exist. Magnetic field lines are continuous loops.</li>
                                    <li><b>Faraday's Law of Induction (∇×E = -∂B/∂t):</b> A time-varying magnetic field induces an electromotive force (electric field).</li>
                                    <li><b>Ampere-Maxwell Law (∇×H = J + ∂D/∂t):</b> Magnetic fields are generated by electric currents and by time-varying electric fields (Displacement Current).</li>
                                </ol>
                            </div>

                            <h2>2.2 Displacement Current (J_d)</h2>
                            <p>Maxwell noticed an inconsistency in Ampere's Law when applied to a charging capacitor. He introduced the <b>Displacement Current</b> to maintain the continuity of current in broken circuits.</p>
                            <ul>
                                <li><b>Definition:</b> J_d = ∂D/∂t = ε₀(∂E/∂t).</li>
                                <li><b>Significance:</b> It proves that a changing electric field produces a magnetic field, even in a vacuum where no actual charges move.</li>
                            </ul>

                            <h2>2.3 Derivation of EM Wave Equation in Free Space</h2>
                            <p>By taking the curl of Faraday's and Ampere's laws in a region with no charges (ρ=0) and no currents (J=0):</p>
                            <ol>
                                <li>∇ × (∇ × E) = ∇ × (-∂B/∂t)</li>
                                <li>Using vector identity ∇ × (∇ × A) = ∇(∇·A) - ∇²A:</li>
                                <li>-∇²E = -μ₀ε₀(∂²E/∂t²) (since ∇·E = 0 in free space).</li>
                            </ol>
                            <div class="highlight-box"><b>Resulting Wave Equation:</b> ∇²E = (1/c²)(∂²E/∂t²)</div>
                            <p>Where <b>c = 1 / √(μ₀ε₀) ≈ 3 × 10⁸ m/s</b>. This proved that light is an electromagnetic wave!</p>

                            <h2>2.4 Properties of EM Waves</h2>
                            <ul>
                                <li>EM waves are <b>Transverse</b> in nature (E and B are perpendicular to each other and to the direction of propagation).</li>
                                <li>They do not require a medium to travel.</li>
                                <li>In a vacuum, they always travel at speed 'c'.</li>
                                <li>The ratio of the amplitudes of E and B is constant: <b>E₀/B₀ = c</b>.</li>
                            </ul>

                            <h2>2.5 The Poynting Vector and Energy Flow</h2>
                            <p>Electromagnetic waves carry energy as they propagate. The rate of energy flow per unit area is given by the <b>Poynting Vector (S)</b>.</p>
                            <div class="highlight-box"><b>S = E × H</b></div>
                            <ul>
                                <li><b>Unit:</b> Watts per square meter (W/m²).</li>
                                <li><b>Direction:</b> Points in the direction of wave propagation.</li>
                                <li><b>Average Intensity (I):</b> The time-average of the Poynting vector magnitude, I = <S> = (1/2)cε₀E₀².</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 3: Oscillations, Optics and Lasers',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Einstein's coefficients relations (A/B ratio) and the derivation for the thickness of a thin wire using the Air Wedge experiment are frequent 16-mark questions. Lasers are almost always a major part of the paper.</div>

                            <h2>3.1 Oscillations: The Physics of Vibration</h2>
                            <ul>
                                <li><b>Simple Harmonic Motion (SHM):</b> Periodic motion where the restoring force is proportional to the displacement.</li>
                                <li><b>Damped Oscillations:</b> Motion where energy is lost due to friction (air resistance), leading to decreasing amplitude.</li>
                                <li><b>Forced Oscillations:</b> Motion under the influence of an external periodic force.</li>
                                <li><b>Resonance:</b> A condition where the driving frequency matches the natural frequency, resulting in maximum energy transfer and amplitude.</li>
                            </ul>

                            <h2>3.2 Interference and Optical Instruments</h2>
                            <p>Interference occurs when two coherent light waves superimpose. </p>
                            <ul>
                                <li><b>Air Wedge:</b> Two glass plates held at a small angle. It produces dark and bright fringes. Used to calculate the <b>Thickness of a thin wire (t = λL / 2β)</b>.</li>
                                <li><b>Newton's Rings:</b> Produced by interference in a thin air film between a lens and a plate. Used to find the <b>Radius of Curvature (R)</b> of a lens.</li>
                            </ul>

                            <h2>3.3 Lasers: Focused Energy</h2>
                            <p>A LASER is highly monochromatic, coherent, and directional compared to ordinary light.</p>
                            
                            <h3>3.3.1 Principle of Action</h3>
                            <ol>
                                <li><b>Absorption:</b> Atom jumps to a higher state by absorbing a photon.</li>
                                <li><b>Spontaneous Emission:</b> Atom drops back randomly, emitting a photon in any direction.</li>
                                <li><b>Stimulated Emission:</b> An incoming photon triggers an excited atom to drop, emitting an <i>identical</i> photon (same phase, direction).</li>
                                <li><b>Population Inversion:</b> Creating a state where more atoms are in the excited state than the ground state. Requires a <b>Metastable State</b>.</li>
                            </ol>

                            <h3>3.3.2 Einstein's Coefficients</h3>
                            <p>Einstein derived the relationship between the probability of spontaneous emission (A) and stimulated emission (B). Ratio: <b>A₂₁ / B₂₁ = 8πhν³ / c³</b>. This shows that at higher frequencies, spontaneous emission dominates.</p>

                            <h3>3.3.3 Common Laser Types</h3>
                            <ul>
                                <li><b>He-Ne Laser:</b> Gas laser producing a continuous red light. Uses helium to pump neon atoms through collisions.</li>
                                <li><b>Nd:YAG Laser:</b> Solid-state laser used for surgical and industrial applications.</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 4: Basic Quantum Mechanics',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> The "Particle in a 1D Box" derivation is a 16-mark "sure-shot". Always draw the graphs for ψ and ψ²; they explain the probability of finding the particle.</div>

                            <h2>4.1 The Wave Nature of Matter</h2>
                            <p>De-Broglie suggested that if waves can behave like particles (photons), then particles should behave like waves. These are <b>Matter Waves</b>.</p>
                            <div class="highlight-box"><b>Wavelength (λ):</b> λ = h/p = h/√(2mE).</div>

                            <h2>4.2 The Wave Function (ψ)</h2>
                            <p>In quantum mechanics, a particle is described by a wave function ψ. While ψ has no direct physical meaning, its square magnitude <b>|ψ|²</b> represents the <b>Probability Density</b> of finding the particle.</p>
                            <ul>
                                <li><b>Normalization:</b> The total probability of finding the particle in all space must be 1.</li>
                            </ul>

                            <h2>4.3 Schrodinger Wave Equation</h2>
                            <p>The "Newton's Second Law" of the quantum world. The <b>Time-Independent</b> form is used for steady states:</p>
                            <div class="highlight-box"><b>( -ℏ²/2m ) ∇²ψ + Vψ = Eψ</b></div>

                            <h2>4.4 Particle in a One-Dimensional Box</h2>
                            <p>For a particle restricted to a region 0 < x < L with infinite potential walls (V=∞ at edges):</p>
                            <ol>
                                <li><b>Energy Eigenvalues:</b> Eₙ = n²h² / 8mL². (Energy is discrete or "quantized").</li>
                                <li><b>Wave Function:</b> ψₙ = √(2/L) sin(nπx/L).</li>
                                <li><b>Conclusion:</b> The particle can never be at rest (n cannot be 0). The lowest energy (n=1) is the <b>Zero-Point Energy</b>.</li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 5: Applied Quantum Mechanics',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Expect a descriptive question on the Scanning Tunneling Microscope (STM) or the classification of Quantum Structures.</div>

                            <h2>5.1 Quantum Tunneling</h2>
                            <p>Classically, if a particle's energy is less than a barrier height, it is reflected. In quantum mechanics, because the wave function extends into the barrier, there is a finite probability the particle will <b>tunnel</b> through.</p>
                            <p><b>Applications:</b> Alpha decay in radioactive nuclei and the working of tunnel diodes.</p>

                            <h2>5.2 Quantum Structures (Low-Dimensional Solids)</h2>
                            <p>When the dimensions of a material are reduced to the nanometer scale, quantum effects become dominant.</p>
                            <ul>
                                <li><b>Quantum Well (2D):</b> Electrons restricted in 1 dimension (thickness), free in 2 dimensions.</li>
                                <li><b>Quantum Wire (1D):</b> Electrons restricted in 2 dimensions.</li>
                                <li><b>Quantum Dot (0D):</b> Electrons restricted in all 3 dimensions. Known as "Artificial Atoms".</li>
                            </ul>

                            <h2>5.3 Scanning Tunneling Microscope (STM)</h2>
                            <p><b>Working Principle:</b> Based on quantum tunneling. A sharp metallic tip is brought very close to a conducting surface. A small voltage is applied, and electrons "tunnel" through the vacuum gap, creating a current.</p>
                            <p><b>Output:</b> By scanning the tip and maintaining a constant current, the microscope maps the <b>topography</b> of the surface at the atomic scale.</p>
                        `
                    },
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Expect a question on "Building Blocks of Algorithms" or a comparison between "Algorithm vs. Flowchart vs. Pseudocode". The 4 pillars of Computational Thinking are also high-yield for Part A.</div>

                            <h2>1.1 Introduction to Computational Thinking</h2>
                            <p>Computational thinking is a problem-solving process that engineers use to tackle complex challenges. It involves breaking down a problem into parts that a computer can understand and execute.</p>
                            
                            <h3>1.1.1 The Four Pillars</h3>
                            <ul>
                                <li><b>Decomposition:</b> Breaking down a complex problem into smaller, manageable parts.</li>
                                <li><b>Pattern Recognition:</b> Looking for similarities among and within problems.</li>
                                <li><b>Abstraction:</b> Focusing on the important information only, ignoring irrelevant details.</li>
                                <li><b>Algorithms:</b> Developing a step-by-step solution to the problem.</li>
                            </ul>

                            <h2>1.2 Building Blocks of Algorithms</h2>
                            <p>Every algorithm is built using four fundamental structures:</p>
                            <ol>
                                <li><b>Statements:</b> Simple instructions executed one after another.</li>
                                <li><b>State:</b> The condition or value of variables at a given time.</li>
                                <li><b>Control Flow:</b> The order in which individual statements are executed (Sequential, Selection, Iteration).</li>
                                <li><b>Functions:</b> Blocks of code that perform specific tasks and can be reused.</li>
                            </ol>

                            <h2>1.3 Tools for Algorithm Representation</h2>
                            
                            <h3>1.3.1 Flowcharts: The Visual Guide</h3>
                            <p>A flowchart is a diagram that represents an algorithm using standard symbols:</p>
                            <div class="highlight-box">
                                <b>Oval:</b> Start/Terminal<br>
                                <b>Parallelogram:</b> Input/Output (e.g., Read A, Print B)<br>
                                <b>Rectangle:</b> Process/Calculation (e.g., C = A + B)<br>
                                <b>Diamond:</b> Decision (e.g., Is A > B?)<br>
                                <b>Arrows:</b> Flow of logic
                            </div>

                            <h3>1.3.2 Pseudo-code: The Human-Readable Logic</h3>
                            <p>Pseudo-code is a middle ground between natural language and actual code. It doesn't follow strict syntax but captures the logic perfectly.</p>
                            <p><b>Example:</b><br>
                            BEGIN<br>
                            &nbsp;&nbsp;READ number1, number2<br>
                            &nbsp;&nbsp;IF number1 > number2 THEN<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;PRINT number1 "is greater"<br>
                            &nbsp;&nbsp;ELSE<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;PRINT number2 "is greater"<br>
                            END</p>
                        `
                    },
                    {
                        name: 'Unit 2: Data, Expressions, Statements',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Python's dynamic typing and operator precedence are favorite topics for Part A. Be sure to understand the difference between '/' and '//' operators.</div>

                            <h2>2.1 The Python Environment</h2>
                            <p>Python is an <b>Interpreted</b> language. The interpreter reads the code line-by-line and executes it immediately. This makes debugging much faster compared to compiled languages like C++.</p>

                            <h2>2.2 Variables and Data Types</h2>
                            <p>In Python, you don't need to declare a variable's type. This is called <b>Dynamic Typing</b>.</p>
                            <ul>
                                <li><b>Integer (int):</b> Whole numbers like 10, -5.</li>
                                <li><b>Float (float):</b> Decimal numbers like 3.14, 2.0.</li>
                                <li><b>String (str):</b> Text enclosed in quotes like "Hello".</li>
                                <li><b>Boolean (bool):</b> True or False values.</li>
                            </ul>

                            <h2>2.3 Operators and Precedence</h2>
                            <p>When multiple operators appear in an expression, Python uses <b>PEMDAS</b> (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction) rules.</p>
                            <div class="highlight-box">
                                <b>Arithmetic Operators:</b> +, -, *, /, // (floor division), % (modulus), ** (exponent).<br>
                                <b>Logical Operators:</b> and, or, not.
                            </div>

                            <h2>2.4 Statements and Expressions</h2>
                            <ul>
                                <li><b>Expression:</b> A combination of values, variables, and operators that evaluates to a value (e.g., 2 + 3).</li>
                                <li><b>Statement:</b> An instruction that the Python interpreter can execute (e.g., x = 5).</li>
                            </ul>

                            <h2>2.5 Input and Output</h2>
                            <p><b>input():</b> Always returns a string. Use <i>int()</i> or <i>float()</i> to convert it for calculations.</p>
                            <p><b>print():</b> Outputs data to the console. You can use 'f-strings' for formatted output: <i>print(f"Result is {x}")</i>.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Control Flow, Functions',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> The "recursion" topic is a guaranteed long question. Practice drawing the "recursion tree" for a Fibonacci or Factorial call; it helps explain the logic to the examiner.</div>

                            <h2>3.1 Boolean Expressions and Logic</h2>
                            <p>All control flow depends on <b>Boolean Expressions</b> that evaluate to <i>True</i> or <i>False</i>.</p>
                            <ul>
                                <li><b>Comparison Operators:</b> ==, !=, >, <, >=, <=.</li>
                                <li><b>Logical Operators:</b> <i>and</i> (True if both are true), <i>or</i> (True if either is true), <i>not</i> (reverses the boolean value).</li>
                            </ul>

                            <h2>3.2 Conditional Execution (Selection)</h2>
                            <p>Conditionals allow us to branch the code based on data.</p>
                            <ul>
                                <li><b>if statement:</b> Executes a block if a condition is true.</li>
                                <li><b>if-elif-else:</b> Used for multiple mutually exclusive conditions.</li>
                                <li><b>Nested Conditionals:</b> An 'if' inside another 'if'. While powerful, these should be used sparingly to maintain readability.</li>
                            </ul>

                            <h2>3.3 Iteration (Loops)</h2>
                            <p>Loops are used to repeat a block of code multiple times.</p>
                            
                            <h3>3.3.1 While Loops</h3>
                            <p>Executes as long as a condition remains True. If the condition is always True, it becomes an <b>Infinite Loop</b>.</p>
                            
                            <h3>3.3.2 For Loops and range()</h3>
                            <p>Used specifically for iterating over a sequence (list, string, or range).</p>
                            <div class="highlight-box"><b>range(stop):</b> 0 to stop-1<br><b>range(start, stop, step):</b> Generates a sequence from start to stop-1.</div>
                            
                            <h3>3.3.3 Loop Control Statements</h3>
                            <ul>
                                <li><b>break:</b> Immediately exits the loop.</li>
                                <li><b>continue:</b> Skips the rest of the current iteration and jumps to the next one.</li>
                            </ul>

                            <h2>3.4 Functions: Modular Programming</h2>
                            <p>A function is a block of organized, reusable code. It helps in <b>Decomposition</b>.</p>
                            <ul>
                                <li><b>Parameters:</b> Variables listed in the function definition.</li>
                                <li><b>Arguments:</b> The actual values passed to the function when it is called.</li>
                                <li><b>Return Statement:</b> Passes a value back to the caller. A function without a return statement is called a <b>void function</b>.</li>
                            </ul>

                            <h3>3.4.1 Scope of Variables</h3>
                            <p><b>Local Variables:</b> Defined inside a function; cannot be accessed outside. <b>Global Variables:</b> Defined in the main body; accessible everywhere.</p>

                            <h2>3.5 Recursion: Functions that call themselves</h2>
                            <p>Recursion is a technique where a large problem is solved by breaking it down into smaller instances of the same problem.</p>
                            <div class="highlight-box">
                                <b>The Two Rules of Recursion:</b>
                                <ol>
                                    <li><b>Base Case:</b> A condition that stops the recursion.</li>
                                    <li><b>Recursive Step:</b> The part where the function calls itself with a modified argument.</li>
                                </ol>
                            </div>
                            <p><b>Classic Example (Factorial):</b><br>
                            def fact(n):<br>
                            &nbsp;&nbsp;if n == 0: return 1 # Base case<br>
                            &nbsp;&nbsp;return n * fact(n-1) # Recursive call</p>
                        `
                    },
                    {
                        name: 'Unit 4: Compound Data Types',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Expect a problem on "List Comprehension" or "Dictionary Operations". Be clear on the difference between <b>Mutable</b> (Lists, Dicts) and <b>Immutable</b> (Tuples, Strings) types.</div>

                            <h2>4.1 Lists: Versatile Sequences</h2>
                            <p>A list is an ordered collection of items. Lists are <b>mutable</b>, meaning they can be changed after creation.</p>
                            <ul>
                                <li><b>Indexing and Slicing:</b> Accessing elements using <i>list[index]</i> or ranges <i>list[start:stop]</i>.</li>
                                <li><b>Basic Operations:</b> concatenating (+), repeating (*), and checking membership (in).</li>
                                <li><b>Methods:</b> <i>append()</i>, <i>extend()</i>, <i>insert()</i>, <i>pop()</i>, <i>remove()</i>, <i>sort()</i>.</li>
                            </ul>
                            <div class="highlight-box"><b>List Comprehension:</b> A concise way to create lists. E.g., <i>squares = [x**2 for x in range(10)]</i>.</div>

                            <h2>4.2 Tuples: Fixed Sequences</h2>
                            <p>Tuples are <b>immutable</b>. Once created, their elements cannot be changed. This makes them faster and safer for fixed data.</p>
                            <ul>
                                <li><b>Tuple Assignment:</b> <i>(x, y) = (10, 20)</i>. Useful for swapping variables: <i>a, b = b, a</i>.</li>
                                <li><b>Tuples as Return Values:</b> A function can return multiple values by returning a tuple.</li>
                            </ul>

                            <h2>4.3 Dictionaries: Key-Value Pairs</h2>
                            <p>A dictionary is an unordered collection of items where each item is a pair consisting of a <b>Key</b> and a <b>Value</b>.</p>
                            <ul>
                                <li><b>Operations:</b> Accessing values using keys <i>dict["key"]</i>, adding/updating pairs, and deleting.</li>
                                <li><b>Methods:</b> <i>keys()</i>, <i>values()</i>, <i>items()</i>, <i>get()</i>.</li>
                            </ul>

                            <h2>4.4 Sets and Strings</h2>
                            <ul>
                                <li><b>Strings:</b> Sequences of characters. Strings are <b>immutable</b>. Useful methods: <i>split()</i>, <i>join()</i>, <i>find()</i>, <i>replace()</i>.</li>
                                <li><b>Sets:</b> Unordered collection of unique elements. Useful for removing duplicates and mathematical operations (union, intersection).</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 5: Files, Modules, Packages',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Expect a question on "Exception Handling" or "File Reading/Writing". Always emphasize the importance of closing a file or using the <b>with</b> statement.</div>

                            <h2>5.1 File Handling</h2>
                            <p>Files allow us to store data permanently on the disk.</p>
                            <ol>
                                <li><b>Opening a File:</b> <i>f = open("data.txt", "r")</i> (modes: 'r' for read, 'w' for write, 'a' for append).</li>
                                <li><b>Reading:</b> <i>f.read()</i>, <i>f.readline()</i>, or iterating through the file object.</li>
                                <li><b>Writing:</b> <i>f.write("text")</i>.</li>
                                <li><b>Closing:</b> <i>f.close()</i>.</li>
                            </ol>
                            <div class="highlight-box"><b>Modern Best Practice:</b> Use the <b>with</b> statement. It automatically closes the file: <i>with open('file.txt') as f:</i></div>

                            <h2>5.2 Errors and Exception Handling</h2>
                            <p>Exceptions are errors detected during execution. We use <b>Try-Except</b> blocks to handle them gracefully without crashing the program.</p>
                            <div class="highlight-box">
                                <b>Structure:</b><br>
                                <b>try:</b> code that might fail<br>
                                <b>except ValueError:</b> code to handle specific error<br>
                                <b>finally:</b> code that ALWAYS runs (e.g., closing a connection).
                            </div>

                            <h2>5.3 Modules: Organizing Code</h2>
                            <p>A module is a file containing Python definitions and statements. It allows for <b>Code Reusability</b>.</p>
                            <ul>
                                <li><b>Standard Library:</b> Python comes with many built-in modules like <i>math</i>, <i>random</i>, <i>os</i>, <i>sys</i>, and <i>datetime</i>.</li>
                                <li><b>Importing:</b> <i>import module</i> or <i>from module import function</i>.</li>
                            </ul>

                            <h2>5.4 Packages</h2>
                            <p>A package is a way of organizing related modules into a directory hierarchy using <b>dotted module names</b>. A directory must contain an <i>__init__.py</i> file to be treated as a package.</p>
                        `
                    },
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Estimation of Hardness by EDTA method and the Ion-Exchange process are 16-mark "must-study" topics. Part A often asks for the conversion factors between different units of hardness.</div>

                            <h2>1.1 Introduction: Water as an Engineering Material</h2>
                            <p>Water is the most important natural resource used in industries, primarily as a coolant and for steam generation in boilers. However, natural water contains various impurities (suspended, dissolved, and biological) that must be removed.</p>
                            
                            <h2>1.2 Hardness of Water</h2>
                            <p>Hardness is the property of water that prevents the lathering of soap. It is caused by the presence of dissolved salts of Calcium and Magnesium.</p>
                            <ul>
                                <li><b>Temporary Hardness (Carbonate):</b> Caused by bicarbonates of Ca and Mg. Removed easily by boiling.</li>
                                <li><b>Permanent Hardness (Non-carbonate):</b> Caused by chlorides and sulfates of Ca and Mg. Cannot be removed by boiling.</li>
                            </ul>

                            <h3>1.2.1 Units of Hardness & Conversions</h3>
                            <div class="highlight-box">
                                <b>1 ppm = 1 mg/L = 0.07 °Cl (Clarke) = 0.1 °Fr (French)</b>
                            </div>

                            <h2>1.3 Estimation of Hardness: The EDTA Method</h2>
                            <p>EDTA (Ethylenediamine tetraacetic acid) is a complexometric reagent that forms stable complexes with Ca²⁺ and Mg²⁺ ions.</p>
                            <ol>
                                <li><b>Principle:</b> Erio-T-Chrome Black T (EBT) is used as an indicator. At pH 10 (maintained by NH₄OH + NH₄Cl buffer), EBT forms a wine-red complex with metal ions.</li>
                                <li><b>Titration:</b> When EDTA is added, it displaces EBT from the metal-EBT complex and forms a stable metal-EDTA complex.</li>
                                <li><b>End Point:</b> The color changes from <b>Wine Red to Steel Blue</b>.</li>
                            </ol>

                            <h2>1.4 Internal Conditioning vs External Treatment</h2>
                            <p>Water treatment is categorized into two types:</p>
                            <ul>
                                <li><b>Internal Treatment:</b> Adding chemicals directly into the boiler to prevent scale formation (e.g., Calgon conditioning, Phosphate conditioning).</li>
                                <li><b>External Treatment:</b> Removing hardness-producing salts before the water enters the boiler.</li>
                            </ul>

                            <h3>1.4.1 Zeolite (Permutit) Process</h3>
                            <p>Zeolites are hydrated sodium alumino-silicates (Na₂Z). Hard water is passed through a bed of zeolite where Ca²⁺ and Mg²⁺ ions are exchanged for Na⁺ ions.</p>
                            <div class="highlight-box"><b>Reaction:</b> Na₂Z + Ca²⁺ → CaZ + 2Na⁺</div>
                            <p><b>Regeneration:</b> Once the zeolite is exhausted, it is regenerated using a 10% Brine solution (NaCl).</p>

                            <h3>1.4.2 Ion-Exchange (Demineralization) Process</h3>
                            <p>This process uses synthetic resins to remove ALL ions (both cations and anions), resulting in pure deionized water.</p>
                            <ul>
                                <li><b>Cation Exchanger:</b> Replaces metal ions with H⁺ ions.</li>
                                <li><b>Anion Exchanger:</b> Replaces acidic ions (Cl⁻, SO₄²⁻) with OH⁻ ions.</li>
                                <li>The H⁺ and OH⁻ ions combine to form water (H₂O).</li>
                            </ul>

                            <h2>1.5 Potable Water Treatment</h2>
                            <p>Water intended for drinking must be free from pathogens and harmful chemicals.</p>
                            <ol>
                                <li><b>Sedimentation & Coagulation:</b> Using Alum to settle suspended particles.</li>
                                <li><b>Filtration:</b> Passing through sand filters.</li>
                                <li><b>Disinfection:</b> Killing bacteria.
                                    <ul>
                                        <li><b>Chlorination:</b> Adding Chlorine. <b>Breakpoint Chlorination</b> is the point where enough chlorine is added to oxidize all impurities and leave a residual for future protection.</li>
                                        <li><b>Reverse Osmosis (RO):</b> Applying pressure higher than osmotic pressure to force water through a semi-permeable membrane, leaving salts behind.</li>
                                    </ul>
                                </li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 2: Nano Chemistry',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Sol-Gel synthesis and the working principles of SEM/TEM are the most common 13-mark and 16-mark questions. Be able to compare Top-Down and Bottom-Up approaches clearly.</div>

                            <h2>2.1 Introduction to Nanoscience</h2>
                            <p>Nanoscience is the study of phenomena and manipulation of materials at atomic, molecular, and macromolecular scales. Nanotechnology is the application of these materials.</p>
                            
                            <h3>2.1.1 Classification of Nanomaterials</h3>
                            <ul>
                                <li><b>0-Dimension (0D):</b> Nanoparticles, Quantum Dots (all dimensions < 100nm).</li>
                                <li><b>1-Dimension (1D):</b> Nanowires, Nanotubes (two dimensions < 100nm).</li>
                                <li><b>2-Dimension (2D):</b> Nanofilms, Graphene sheets (one dimension < 100nm).</li>
                                <li><b>3-Dimension (3D):</b> Bulk materials made of nano-sized building blocks.</li>
                            </ul>

                            <h2>2.2 Unique Properties of Nano-sized Materials</h2>
                            <p>When materials are reduced to the nano-scale, two factors change their behavior:</p>
                            <ol>
                                <li><b>Large Surface-to-Volume Ratio:</b> Makes them highly reactive and efficient catalysts.</li>
                                <li><b>Quantum Confinement Effect:</b> Changes the optical and electronic properties (e.g., Gold nanoparticles appear red or purple).</li>
                            </ol>

                            <h2>2.3 Synthesis of Nanomaterials</h2>
                            
                            <h3>2.3.1 Top-Down Approach: "Bulk to Nano"</h3>
                            <p>Involves breaking down larger pieces using physical methods.</p>
                            <ul>
                                <li><b>Ball Milling:</b> High-energy mechanical grinding of bulk powders into nano-sized particles.</li>
                                <li><b>Lithography:</b> Etching patterns onto a surface (used in microchip manufacturing).</li>
                            </ul>

                            <h3>2.3.2 Bottom-Up Approach: "Atom to Nano"</h3>
                            <p>Involves building the material atom-by-atom or molecule-by-molecule.</p>
                            <ul>
                                <li><b>Sol-Gel Method:</b> Formation of a colloidal suspension (Sol) and then a network structure (Gel). It is preferred for thin films and high-purity powders.</li>
                                <li><b>Chemical Vapor Deposition (CVD):</b> Chemical reaction of gaseous precursors on a substrate. Essential for producing Carbon Nanotubes (CNTs).</li>
                                <li><b>Laser Ablation:</b> Vaporizing a solid target using a high-power laser beam.</li>
                            </ul>

                            <h2>2.4 Characterization Techniques (Visualizing the Nano-world)</h2>
                            
                            <h3>2.4.1 Scanning Electron Microscope (SEM)</h3>
                            <p><b>Principle:</b> A beam of electrons scans the surface. Secondary electrons emitted from the surface are detected to create a 3D-like image of the <b>morphology</b>.</p>

                            <h3>2.4.2 Transmission Electron Microscope (TEM)</h3>
                            <p><b>Principle:</b> Electrons pass <i>through</i> a very thin sample. It provides information about the <b>internal structure, crystal lattice, and particle size</b> at much higher resolutions than SEM.</p>

                            <h2>2.5 Engineering Applications of Nanotechnology</h2>
                            <ol>
                                <li><b>Medicine:</b> Targeted drug delivery to cancer cells using nano-carriers.</li>
                                <li><b>Environment:</b> Nano-membranes for effective water desalination and purification.</li>
                                <li><b>Energy:</b> High-efficiency solar cells and improved battery capacity using nano-electrodes.</li>
                                <li><b>Cosmetics:</b> ZnO and TiO₂ nanoparticles in sunscreens for UV protection.</li>
                            </ol>
                        `
                    },
                    {
                        name: 'Unit 3: Phase Rule and Alloys',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> The Lead-Silver (Pb-Ag) system and the concept of Eutectic Point are 16-mark sure-shots. For Phase Rule, memorize the Water System triple point values: T = 0.0098°C, P = 4.58 mm Hg.</div>

                            <h2>3.1 Gibbs Phase Rule</h2>
                            <p>For a heterogeneous system in equilibrium, the relationship between the number of phases (P), components (C), and degrees of freedom (F) is:</p>
                            <div class="highlight-box"><b>F = C - P + 2</b></div>
                            
                            <h3>3.1.1 One-Component System (The Water System)</h3>
                            <p>Water exists in three phases: Ice (S), Water (L), and Steam (V). </p>
                            <ul>
                                <li><b>Curves (P=2, F=1):</b> Coexistence of two phases along boundary lines.</li>
                                <li><b>Triple Point (P=3, F=0):</b> The unique point where all three phases coexist in equilibrium.</li>
                            </ul>

                            <h2>3.2 Two-Component System (Lead-Silver)</h2>
                            <p>Since pressure remains constant in metallurgical systems, we use the **Reduced Phase Rule: F' = C - P + 1**.</p>
                            <ul>
                                <li><b>Eutectic Point:</b> The lowest temperature at which the entire liquid mixture solidifies. For Pb-Ag, it is 303°C at 2.6% Ag.</li>
                                <li><b>Pattinson's Process:</b> An industrial application for the desilverization of lead by selectively crystalizing lead from the molten alloy.</li>
                            </ul>

                            <h2>3.3 Alloys and Heat Treatment</h2>
                            <p>An alloy is a solid solution of two or more metals. Objectives: To increase hardness, corrosion resistance, and lower the melting point.</p>
                            <ul>
                                <li><b>Ferrous Alloys:</b> Stainless Steel (Fe-Cr-Ni) used for surgical tools and cutlery.</li>
                                <li><b>Non-Ferrous Alloys:</b> Nichrome (Ni-Cr) used as a heating element due to its high resistance and melting point.</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 4: Fuels and Combustion',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> Practice numerical problems on calculating the Gross Calorific Value (GCV) and Net Calorific Value (NCV) from Dulong's formula. Also, expect a descriptive question on Orsat's Apparatus.</div>

                            <h2>4.1 Calorific Value: Measuring Energy</h2>
                            <p>Calorific value is the total heat produced by the complete combustion of a unit mass of fuel.</p>
                            <ul>
                                <li><b>Gross Calorific Value (GCV):</b> Total heat including the latent heat of condensation of water.</li>
                                <li><b>Net Calorific Value (NCV):</b> Heat available in actual use (Latent heat is not recovered).</li>
                            </ul>

                            <h2>4.2 Analysis of Coal</h2>
                            <p>Coal quality is determined by two types of analysis:</p>
                            <ul>
                                <li><b>Proximate Analysis:</b> Estimates Moisture, Volatile matter, Ash content, and Fixed carbon. Higher fixed carbon means better quality.</li>
                                <li><b>Ultimate Analysis:</b> Estimates the percentage of C, H, N, O, and S. High Nitrogen and Sulfur are undesirable as they cause pollution.</li>
                            </ul>

                            <h2>4.3 Liquid Fuels: Petroleum</h2>
                            <p>Petroleum is refined via <b>Fractional Distillation</b> to yield gasoline, kerosene, and diesel.</p>
                            <ul>
                                <li><b>Knocking:</b> Premature ignition in engines causing metallic sounds.</li>
                                <li><b>Octane Number:</b> Measures the anti-knock property of gasoline (Iso-octane = 100).</li>
                                <li><b>Cetane Number:</b> Measures the ignition delay of diesel (Hexadecane/Cetane = 100).</li>
                            </ul>

                            <h2>4.4 Flue Gas Analysis (Orsat's Apparatus)</h2>
                            <p>The exit gases from a combustion chamber (CO₂, CO, O₂) are analyzed to determine combustion efficiency. Excess CO₂ indicates complete combustion, while CO indicates incomplete combustion.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Energy Sources and Storage Devices',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Lithium-Ion Batteries and H₂-O₂ Fuel Cells are the most common questions in modern energy storage. Always draw the diagram showing electron flow for batteries.</div>

                            <h2>5.1 Nuclear Energy</h2>
                            <ul>
                                <li><b>Fission:</b> The splitting of a heavy nucleus (U-235). Used in nuclear power plants.</li>
                                <li><b>Moderators (D₂O / Graphite):</b> Slow down fast neutrons to maintain the chain reaction.</li>
                                <li><b>Control Rods (Cd / B):</b> Absorb excess neutrons to control the rate of fission.</li>
                            </ul>

                            <h2>5.2 Solar Energy (Photovoltaic Cells)</h2>
                            <p>PV cells convert solar energy directly into electricity using the <b>Photoelectric Effect</b>. Usually made of doped Silicon (P-N junction).</p>

                            <h2>5.3 Batteries and Fuel Cells</h2>
                            <ul>
                                <li><b>Lead-Acid Battery:</b> Rechargeable battery used in cars. Uses Lead (Anode), Lead Dioxide (Cathode), and H₂SO₄ (Electrolyte).</li>
                                <li><b>Lithium-Ion Battery:</b> Modern battery with high energy density. Lithium ions move between the graphite anode and lithium cobalt oxide cathode.</li>
                                <li><b>H₂-O₂ Fuel Cell:</b> Converts the chemical energy of Hydrogen and Oxygen into water and electricity. <b>Efficiency is very high (~70%)</b> and it is pollution-free.</li>
                            </ul>
                        `
                    },
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Technical vocabulary and Wh-Questions are almost certain to appear in Part A. Practice converting simple sentences into technical ones.</div>
                            
                            <h2>1.1 Parts of Speech in Technical Context</h2>
                            <p>Effective technical communication relies on precise word choices.</p>
                            <ul>
                                <li><b>Nouns:</b> Use specific technical terms (e.g., "Semiconductor" instead of "material").</li>
                                <li><b>Verbs:</b> Use strong action verbs (e.g., "Analyze", "Optimize", "Implement").</li>
                                <li><b>Adjectives:</b> Be quantitative where possible (e.g., "High-performance", "Corrosion-resistant").</li>
                            </ul>

                            <h2>1.2 Framing Questions</h2>
                            <p><b>Wh-Questions:</b> Used for gathering specific data. <i>What is the tolerance? How does the cooling system work?</i><br>
                            <b>Yes/No Questions:</b> Used for confirmation. <i>Is the circuit grounded?</i></p>

                            <h2>1.3 Vocabulary Building</h2>
                            <ul>
                                <li><b>Prefixes/Suffixes:</b> Understand roots to decode scientific terms (e.g., <i>nano-</i> for 10⁻⁹, <i>-logy</i> for study of).</li>
                                <li><b>Synonyms/Antonyms:</b> Use varied vocabulary to avoid repetition in technical reports.</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 2: Reading & Writing (Academic Skills)',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Formal Letter Writing and Email Etiquette are high-scoring Part B questions. Scanning and Skimming are essential for the reading comprehension passage.</div>

                            <h2>2.1 Reading Strategies</h2>
                            <ul>
                                <li><b>Skimming:</b> Quickly reviewing the text to grasp the <b>main idea</b> or "gist".</li>
                                <li><b>Scanning:</b> Searching for <b>specific details</b> like dates, numbers, or technical specifications.</li>
                                <li><b>Critical Reading:</b> Evaluating the author's argument and technical validity.</li>
                            </ul>

                            <h2>2.2 Writing: Formal Letters and Emails</h2>
                            <p>Technical professionals must communicate clearly with vendors, clients, and management.</p>
                            <div class="highlight-box">
                                <b>Formal Letter Structure:</b>
                                <ol>
                                    <li>Sender’s Address & Date</li>
                                    <li>Receiver’s Address</li>
                                    <li>Salutation (Dear Sir/Madam)</li>
                                    <li>Subject Line (Clear and Concise)</li>
                                    <li>Body (Introduction, Details, Request/Action)</li>
                                    <li>Closing (Yours faithfully/sincerely)</li>
                                </ol>
                            </div>

                            <h2>2.3 Note-making</h2>
                            <p>Condensing long lectures or documents into structured notes using the Cornell method or Mind-maps.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Grammar & Vocabulary',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> The Passive Voice is the "Gold Standard" for technical writing. It shifts the focus from the person to the process. <i>"The sample was heated"</i> instead of <i>"I heated the sample."</i></div>

                            <h2>3.1 The 12 Tenses in Technical Writing</h2>
                            <ul>
                                <li><b>Present Simple:</b> For universal facts and definitions (e.g., "Water boils at 100°C").</li>
                                <li><b>Past Simple:</b> For reporting experimental procedures and results.</li>
                                <li><b>Present Perfect:</b> For actions completed recently with current relevance.</li>
                            </ul>

                            <h2>3.2 Active vs Passive Voice</h2>
                            <p><b>Active:</b> "The engineer designed the bridge." (Focus on person).<br>
                            <b>Passive:</b> "The bridge was designed by the engineer." (Focus on object). Essential for formal technical reports.</p>

                            <h2>3.3 Discourse Markers</h2>
                            <p>Words used to link ideas and show relationships:</p>
                            <ul>
                                <li><b>Addition:</b> Furthermore, Moreover, In addition.</li>
                                <li><b>Contrast:</b> However, Nevertheless, Conversely.</li>
                                <li><b>Cause/Effect:</b> Consequently, Therefore, As a result.</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 4: Listening Skills',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Expect tasks involving "Listening for Gist" or "Gap-filling" based on an audio clip (simulated in exams through transcripts).</div>

                            <h2>4.1 Types of Listening</h2>
                            <ul>
                                <li><b>Comprehensive Listening:</b> To understand the overall message.</li>
                                <li><b>Critical Listening:</b> To analyze and evaluate the information.</li>
                                <li><b>Empathetic Listening:</b> To understand the speaker's perspective.</li>
                            </ul>

                            <h2>4.2 Listening for Specific Information</h2>
                            <p>Focusing on keywords, numbers, and technical instructions during a briefing or lecture.</p>

                            <h2>4.3 Interpreting Non-Verbal Cues</h2>
                            <p>Understanding tone, pitch, and pauses which often signal important points or shifts in the topic.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Speaking Skills (Professional Performance)',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Group Discussion (GD) and Presentation Skills are high-yield Part B questions. Practice identifying your role in a GD (Initiator, Moderator, or Summarizer).</div>

                            <h2>5.1 Presentation Skills</h2>
                            <ul>
                                <li><b>Visual Aids:</b> Using PPTs effectively—limit text, use high-quality diagrams.</li>
                                <li><b>Body Language:</b> Maintain eye contact, stand confidently, and use natural gestures.</li>
                                <li><b>Voice Modulation:</b> Varying pitch and pace to keep the audience engaged.</li>
                            </ul>

                            <h2>5.2 Group Discussion (GD)</h2>
                            <p>A tool used by companies to assess communication and teamwork.</p>
                            <div class="highlight-box">
                                <b>Key GD Strategies:</b>
                                <ul>
                                    <li><b>Listen:</b> Do not interrupt others.</li>
                                    <li><b>Contribute:</b> Add value with facts and logical reasoning.</li>
                                    <li><b>Be Courteous:</b> Disagree politely. ("I appreciate your point, however...")</li>
                                </ul>
                            </div>

                            <h2>5.3 Interview Skills</h2>
                            <p>Preparing for "Tell me about yourself", standard technical questions, and situational (STAR method) answers.</p>
                        `
                    },
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
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> The classification of Ainthinai (Five Landscapes) and the significance of 'Tholkappiyam' are common Part B questions.</div>

                            <h2>1.1 Language: The Classical Status</h2>
                            <p>Tamil is one of the oldest classical languages in the world, with a continuous literary history of over 2000 years. Its independence from other language families and its rich grammar make it unique.</p>
                            
                            <h2>1.2 Sangam Literature: The Golden Age</h2>
                            <p>The Sangam period (300 BCE – 300 CE) produced monumental works:</p>
                            <ul>
                                <li><b>Ettuthogai (Eight Anthologies):</b> Includes Aingurunuru, Purananuru (Heroism/Social life), and Akananuru (Love).</li>
                                <li><b>Pathupattu (Ten Idylls):</b> Detailed descriptions of the landscape, kings, and people.</li>
                                <li><b>Tholkappiyam:</b> The earliest available work on Tamil grammar and poetics, which also provides insight into the social life of ancient Tamils.</li>
                            </ul>

                            <h2>1.3 The Five Landscapes (Ainthinai)</h2>
                            <p>Ancient Tamils classified life and love based on the geography:</p>
                            <div class="highlight-box">
                                <ul>
                                    <li><b>Kurinji (Mountains):</b> Theme - Union of lovers. God - Murugan.</li>
                                    <li><b>Mullai (Forest):</b> Theme - Waiting. God - Thirumal.</li>
                                    <li><b>Marutham (Agricultural Land):</b> Theme - Lovers' quarrel. God - Indhiran.</li>
                                    <li><b>Neithal (Seashore):</b> Theme - Lamenting. God - Varunan.</li>
                                    <li><b>Paalai (Wasteland):</b> Theme - Separation. God - Kotravai.</li>
                                </ul>
                            </div>
                        `
                    },
                    {
                        name: 'Unit 2: Heritage - Arts, Sculpture and Architecture',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Be prepared to describe the Dravidian style of architecture, particularly the features of the Great Living Chola Temples.</div>

                            <h2>2.1 Dravidian Architecture</h2>
                            <p>Characterized by pyramid-shaped towers (Vimanas), large gatehouses (Gopurams), and pillared halls (Mandapams).</p>
                            <ul>
                                <li><b>Rock-cut Temples:</b> Exemplified by the Five Rathas at Mamallapuram (Pallava Period).</li>
                                <li><b>Structural Temples:</b> The Shore Temple at Mamallapuram.</li>
                                <li><b>Chola Architecture:</b> The Brihadisvara Temple (Tanjore Big Temple), a UNESCO World Heritage site, famous for its massive Vimana and single-stone monolithic Kalasam.</li>
                            </ul>

                            <h2>2.2 Sculpture and Bronze Casting</h2>
                            <p>The <b>Lost Wax Process</b> (Cire perdue) reached its zenith under the Cholas. The <b>Nataraja</b> bronze is considered a masterpiece of world art, representing the cosmic dance of creation and destruction.</p>

                            <h2>2.3 Traditional Crafts</h2>
                            <p>Pottery, Weaving (Kanchipuram Silk), and Metallurgy (Swamimalai Bronzes) have been passed down through generations, maintaining the cultural identity of Tamils.</p>
                        `
                    },
                    {
                        name: 'Unit 3: Folk and Martial Arts',
                        content: `
                            <div class="exam-tip">🎯 <b>EXAM FOCUS:</b> Silambam and various folk dances like Karakattam are favorite topics. Describe the cultural significance of these arts in Tamil festivals.</div>

                            <h2>3.1 Popular Folk Arts</h2>
                            <ul>
                                <li><b>Karakattam:</b> An ancient folk dance performed with a decorated pot on the head, honoring the rain goddess Mariamman.</li>
                                <li><b>Oyilattam:</b> The "Dance of Grace," performed by men in a row with rhythmic steps and waving kerchiefs.</li>
                                <li><b>Therukoothu:</b> Traditional street theatre, usually depicting stories from the Mahabharata and Ramayana.</li>
                                <li><b>Thappattam:</b> A powerful percussive dance involving the 'Thappu' drum.</li>
                            </ul>

                            <h2>3.2 Martial Arts: The Spirit of Valor</h2>
                            <ul>
                                <li><b>Silambam:</b> Using a bamboo staff. It involves complex patterns of footwork and strikes. It is one of the oldest martial arts in the world.</li>
                                <li><b>Adimurai/Kuthu Varisai:</b> Unarmed combat techniques.</li>
                                <li><b>Jallikattu:</b> The traditional bull-taming sport, symbolizing the bravery of the youth and the importance of native cattle breeds.</li>
                            </ul>
                        `
                    },
                    {
                        name: 'Unit 4: Industrial Heritage and Agriculture',
                        content: `
                            <div class="exam-tip">🎯 <b>BEYOND THE BASICS:</b> The "Grand Anicut" (Kallanai) is a prime example of ancient engineering excellence. Explain its construction and purpose.</div>

                            <h2>4.1 Ancient Irrigation Systems</h2>
                            <p>Ancient Tamils were masters of water management. </p>
                            <ul>
                                <li><b>Kallanai (Grand Anicut):</b> Built by King Karikala Chola in the 2nd Century CE over the River Kaveri. It is the world's oldest functional dam still in use.</li>
                                <li><b>Kuraichi (System of Canals):</b> An intricate network used to distribute water to fields from massive tanks (Eris).</li>
                            </ul>

                            <h2>4.2 Navigational Greatness</h2>
                            <p>The Chola navy was one of the strongest in the world. They expanded their influence to Southeast Asia (Sumatra, Java, Malaysia). Ships were built using advanced techniques for wood-joining and waterproofing.</p>

                            <h2>4.3 Textiles and Metallurgy</h2>
                            <p>Tamil Nadu has been a hub for high-quality cotton and silk since ancient times. Exports of iron and steel (Wootz steel) from this region to the Roman Empire are well-documented.</p>
                        `
                    },
                    {
                        name: 'Unit 5: Social Heritage and Values',
                        content: `
                            <h2>5.1 Social Structure and Values</h2>
                            <p>Ancient Tamil society was organized with a focus on 'Aram' (Virtue/Righeousness). The <b>Thirukkural</b> provides a comprehensive code of ethics for all aspects of life.</p>
                            
                            <h2>5.2 Education and Knowledge</h2>
                            <p>Equality in education (as preached by Avvaiyar: "Katrathu Kaiman Alavu") and the Gurukula system. Libraries like those in the Saraswathi Mahal indicate a deep love for learning.</p>

                            <h2>5.3 Festivals and Traditions</h2>
                            <ul>
                                <li><b>Pongal:</b> The harvest festival, expressing gratitude to Nature and Cattle.</li>
                                <li><b>Tamil New Year:</b> Celebrating the solar cycle.</li>
                                <li><b>Customs:</b> Hospitaly (Virunthinar), respecting elders, and community living.</li>
                            </ul>
                        `
                    },
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
