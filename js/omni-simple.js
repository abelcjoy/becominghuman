/**
 * 💎 Clarity For Humans - STUDENT NOTES PORTAL 💎
 * 
 * This is a direct content repository for Indian students.
 * No external links, no AI tools. Just pure, scrollable academic notes.
 */

class StudentPortal {
    constructor() {
        this.library = this.initLibrary();
        this.currentView = 'home';
        this.init();
    }

    init() {
        this.renderPortal();

        const search = document.getElementById('search');
        if (search) {
            search.placeholder = "Search for a subject (e.g. Physics, Thermodynamics, NCERT)...";
            search.addEventListener('input', (e) => this.renderPortal(e.target.value));
        }

        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.onclick = () => this.closeReader();
        }
    }

    initLibrary() {
        // This will grow into a massive repository
        return {
            anna_physics_1: {
                title: "Engineering Physics (Anna University)",
                board: "Anna University",
                subject: "Physics",
                sem: "1",
                content: `
                    <h2>Unit 1: Mechanics & Properties of Matter</h2>
                    <p><b>Elasticity:</b> The property of a material to regain its original shape after the removal of deforming forces...</p>
                    <h3>Important Questions:</h3>
                    <ul>
                        <li>Explain Hooke's Law (2 Marks)</li>
                        <li>Derive an expression for Torsional Pendulum (16 Marks)</li>
                    </ul>
                `
            }
        };
    }

    renderPortal(filter = '') {
        const grid = document.getElementById('grid');
        if (!grid) return;
        grid.innerHTML = '';

        // For now, we are displaying "Subject Folders"
        const boards = ["Anna University", "NCERT", "CBSE", "VTU", "State Boards"];

        boards.forEach(board => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-category">ACADEMIC BOARD</div>
                    <div class="card-icon">📚</div>
                </div>
                <div class="card-title">${board}</div>
                <div class="card-desc">Full scrollable notes for all subjects under ${board}.</div>
            `;
            card.onclick = () => alert('Loading ' + board + ' Subjects...');
            grid.appendChild(card);
        });
    }

    openReader(subjectId) {
        const view = document.getElementById('tool-view');
        const content = document.getElementById('tool-content');
        const subject = this.library[subjectId];

        if (content && subject) {
            content.innerHTML = `
                <div style="padding:20px; text-align:left;">
                    <h1 style="color:#fff; font-size:2em; border-bottom:2px solid #333; padding-bottom:10px;">${subject.title}</h1>
                    <div style="color:#ccc; line-height:1.8; margin-top:20px;">
                        ${subject.content}
                    </div>
                </div>
            `;
        }

        if (view) view.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeReader() {
        const view = document.getElementById('tool-view');
        if (view) {
            view.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

// Global initialization
window.omni = new StudentPortal();
