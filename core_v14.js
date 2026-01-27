// THE FOUNDATION ENGINE (V.21-EDU)
// A Linear Progression Matrix for English Learning.

let currentLevel = 1;

// DATA MATRICES
const subjects = ["I", "You", "We", "They", "He", "She", "The Man", "The Woman", "It"];
const verbs = ["eat", "see", "want", "have", "need", "like", "find", "take", "make", "know"];
const objects = ["water", "food", "home", "work", "time", "money", "books", "cars", "friends", "ideas"];
const adjectives = ["good", "bad", "fast", "slow", "happy", "sad", "new", "old", "big", "small"];
const times = ["now", "today", "tomorrow", "soon", "later", "always", "never", "often", "rarely"];

document.addEventListener('DOMContentLoaded', () => {
    console.log("Foundation Engine Loaded.");

    // Resume Progress from LocalStorage
    const savedLevel = localStorage.getItem('foundation_level');
    if (savedLevel) {
        currentLevel = parseInt(savedLevel);
    }

    // Initial Render
    renderLevel();
});

function generateSentence(level) {
    // Deterministic Generation based on Level ID
    // This ensures Level 542 is ALWAYS the same sentence for everyone.

    // Phase 1: Simple SV (Subject Verb) - Levels 1-50
    if (level <= 50) {
        const s = subjects[(level % subjects.length)];
        const v = verbs[(level % verbs.length)];
        return `${s} ${v}.`;
    }

    // Phase 2: SVO (Subject Verb Object) - Levels 51-200
    if (level <= 200) {
        const s = subjects[(level % subjects.length)];
        const v = verbs[(level % verbs.length)];
        const o = objects[(level % objects.length)];
        return `${s} ${v} ${o}.`;
    }

    // Phase 3: SVAO (Subject Verb Adjective Object) - Levels 201-500
    if (level <= 500) {
        const s = subjects[(level % subjects.length)];
        const v = verbs[(level % verbs.length)];
        const a = adjectives[(level % adjectives.length)];
        const o = objects[(level % objects.length)];
        return `${s} ${v} ${a} ${o}.`;
    }

    // Phase 4: Complex Time - Levels 501+
    const s = subjects[(level % subjects.length)];
    const v = verbs[(level % verbs.length)];
    const a = adjectives[(level % adjectives.length)];
    const o = objects[(level % objects.length)];
    const t = times[(level % times.length)];
    return `${s} ${v} ${a} ${o} ${t}.`;
}

function renderLevel() {
    document.getElementById('level-indicator').innerText = currentLevel;

    const sentence = generateSentence(currentLevel);
    document.getElementById('lesson-content').innerText = sentence;

    // Meta tag explains the structure
    let structure = "[ Subject + Verb ]";
    if (currentLevel > 50) structure = "[ Subject + Verb + Object ]";
    if (currentLevel > 200) structure = "[ Subject + Verb + Adjective + Object ]";

    document.getElementById('lesson-meta').innerText = structure;
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
