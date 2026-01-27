// THE FOUNDATION ENGINE (V.21-EDU)
// A Linear Progression Matrix for English Learning.

let currentLevel = 1;

// DATA MATRICES
// EXPANDED DATA MATRICES (50+ Items each for Variation)
const subjects = [
    "I", "You", "We", "They", "He", "She", "It", "The Man", "The Woman", "The Doctor",
    "The Teacher", "The Driver", "The Boss", "The Client", "The Manager", "Nobody", "Everybody",
    "The System", "The Machine", "My Friend", "Your Brother", "The Government", "The Artist",
    "The Engineer", "The Pilot", "The Chef", "The Actor", "The Writer", "The Soldier", "The Lawyer",
    "Someone", "The Team", "The Group", "The Company", "The Brand", "The User", "The Admin"
];
const verbs = [
    "eat", "see", "want", "have", "need", "like", "find", "take", "make", "know",
    "call", "try", "ask", "feel", "become", "leave", "put", "mean", "keep", "let",
    "begin", "seem", "help", "talk", "turn", "start", "show", "hear", "play", "run",
    "move", "live", "believe", "hold", "bring", "happen", "must", "write", "provide", "sit",
    "stand", "lose", "pay", "meet", "include", "continue", "set", "learn", "change", "lead"
];
const objects = [
    "water", "food", "home", "work", "time", "money", "books", "cars", "friends", "ideas",
    "power", "results", "solutions", "answers", "questions", "history", "stories", "games",
    "systems", "programs", "data", "music", "art", "code", "files", "phones", "keys",
    "rules", "laws", "goals", "plans", "projects", "contracts", "papers", "reports", "numbers",
    "sales", "growth", "value", "stocks", "markets", "clients", "products", "services", "skills"
];
const adjectives = [
    "good", "bad", "fast", "slow", "happy", "sad", "new", "old", "big", "small",
    "great", "little", "own", "other", "right", "left", "high", "low", "long", "short",
    "large", "young", "different", "important", "public", "private", "clean", "dirty", "cheap",
    "expensive", "busy", "free", "rich", "poor", "hard", "soft", "loud", "quiet", "strong",
    "weak", "safe", "dangerous", "easy", "difficult", "true", "false", "bright", "dark"
];
const times = [
    "now", "today", "tomorrow", "soon", "later", "always", "never", "often", "rarely",
    "yesterday", "tonight", "this morning", "last week", "next month", "once", "twice",
    "eventually", "immediately", "recently", "currently", "formerly", "frequently", "occasionally"
];

document.addEventListener('DOMContentLoaded', () => {
    console.log("Foundation Engine Loaded.");

    // Resume Progress from LocalStorage
    const savedLevel = localStorage.getItem('foundation_level');
    if (savedLevel) {
        currentLevel = parseInt(savedLevel);
    }

    // Initial Render
    renderLevel();

    // REVEAL INTERFACE
    document.getElementById('main-discovery-feed').style.display = 'block';
});

// RANK DEFINITIONS
function getRank(level) {
    if (level <= 50) return "BEGINNER";
    if (level <= 150) return "PRIMARY";
    if (level <= 500) return "JUNIOR";
    if (level <= 2000) return "INTERMEDIATE";
    return "SENIOR";
}

function generateLesson(level) {
    // Returns { text: "Sentence", rule: "Grammar Explanation" }

    // SECTOR 1: BEGINNER (Survival)
    if (level <= 50) {
        const s = subjects[(level % subjects.length)];
        const v = verbs[(level % verbs.length)];
        return {
            text: `${s} ${v}.`,
            rule: "RULE: Subject + Verb. The simplest form of action."
        };
    }

    // SECTOR 2: PRIMARY (Description)
    if (level <= 150) {
        const s = subjects[(level % subjects.length)];
        const v = verbs[(level % verbs.length)];
        const a = adjectives[(level % adjectives.length)];
        const o = objects[(level % objects.length)];
        return {
            text: `${s} ${v} ${a} ${o}.`,
            rule: "RULE: Adjectives always describe the Object (Noun)."
        };
    }

    // SECTOR 3: JUNIOR (Tense & Time)
    if (level <= 500) {
        const s = subjects[(level % subjects.length)];
        const v = verbs[(level % verbs.length)];
        const t = times[(level % times.length)];
        return {
            text: `${s} will ${v} ${t}.`,
            rule: "RULE: Future Tense. 'Will' projects action forward."
        };
    }

    // SECTOR 4: INTERMEDIATE (Management)
    if (level <= 2000) {
        return {
            text: `Therefore, we must ${verbs[level % verbs.length]} the ${objects[level % objects.length]}.`,
            rule: "RULE: Logic Connectors. 'Therefore' implies consequence."
        };
    }

    // SECTOR 5: SENIOR (Abstraction)
    return {
        text: `The optimization of ${objects[level % objects.length]} is paramount.`,
        rule: "RULE: Passive Voice & Abstraction. CEO Language."
    };
}

function renderLevel() {
    document.getElementById('level-indicator').innerText = currentLevel;

    // Update Rank Display
    const rank = getRank(currentLevel);

    // Using lesson-meta to show both Rank and Rule for now
    const lesson = generateLesson(currentLevel);
    document.getElementById('lesson-content').innerText = lesson.text;
    document.getElementById('lesson-meta').innerText = `[${rank}] ${lesson.rule}`;
}

function nextLevel() {
    // Visual Feedback
    const card = document.getElementById('lesson-card');
    card.style.transform = "scale(0.95)";
    setTimeout(() => card.style.transform = "scale(1)", 100);

    // PAYWALL CHECK
    const hasClearance = localStorage.getItem('cfh_clearance_token');
    if (currentLevel >= 50 && !hasClearance) {
        document.getElementById('paywall-screen').style.display = 'flex';
        return;
    }

    // Advance
    currentLevel++;
    localStorage.setItem('foundation_level', currentLevel);
    renderLevel();
}

// Payment/Unlock Helper (retained from old code)
function initiateClearance() {
    // Dummy Success for now (or integrate Razorpay here)
    // alert("Redirecting to Secure Gateway...");

    // SIMULATED SUCCESS:
    localStorage.setItem('cfh_clearance_token', 'ACCESS_GRANTED_V21');
    document.getElementById('paywall-screen').style.display = 'none';
    alert("ACCESS GRANTED. The Continuum is open.");
}
