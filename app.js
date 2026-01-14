const ANCHOR_DATE = new Date('2026-01-01T00:00:00Z');

const elements = {
    dayCounter: document.getElementById('day-counter'),
    question: document.getElementById('question'),
    dateDisplay: document.getElementById('date-display'),
    btnYes: document.getElementById('btn-yes'),
    btnNo: document.getElementById('btn-no'),
    votedMsg: document.getElementById('voted-msg'),
    docsTrigger: document.getElementById('docs-trigger'),
    docsOverlay: document.getElementById('docs-overlay'),
    docsClose: document.getElementById('docs-close')
};

let currentDay = 1;
let questions = {};

async function init() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
    } catch (e) {
        console.error("Critical: Question database inaccessible.");
    }

    updateTemporalState();
    setupEventListeners();
    renderDay();
}

function updateTemporalState() {
    const now = new Date();
    const diff = now - ANCHOR_DATE;
    currentDay = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

    // Safety check for pre-study access or edge cases
    if (currentDay < 1) currentDay = 1;

    elements.dateDisplay.innerText = now.toISOString().split('T')[0].replace(/-/g, '.');
}

function renderDay() {
    elements.dayCounter.innerText = `Observational Interval: Day ${currentDay}`;
    const qText = questions[currentDay] || "The sequence has concluded or is pending data injection.";
    elements.question.innerText = qText;

    const recordedChoice = localStorage.getItem(`choice_day_${currentDay}`);
    if (recordedChoice) {
        disableControls(recordedChoice);
    }
}

function setupEventListeners() {
    elements.btnYes.onclick = () => recordChoice('YES');
    elements.btnNo.onclick = () => recordChoice('NO');

    elements.docsTrigger.onclick = () => {
        elements.docsOverlay.style.display = 'block';
    };

    elements.docsClose.onclick = () => {
        elements.docsOverlay.style.display = 'none';
    };
}

function recordChoice(val) {
    localStorage.setItem(`choice_day_${currentDay}`, val);
    disableControls(val);

    // Minimalistic feedback action
    elements.question.style.opacity = '0.5';
}

function disableControls(val) {
    elements.btnYes.disabled = true;
    elements.btnNo.disabled = true;
    elements.votedMsg.style.display = 'block';

    if (val === 'YES') {
        elements.btnYes.style.background = '#000';
        elements.btnYes.style.color = '#fff';
    } else {
        elements.btnNo.style.background = '#000';
        elements.btnNo.style.color = '#fff';
    }
}

// Initial cycle
init();
setInterval(updateTemporalState, 60000); // Check for day rollover every minute
