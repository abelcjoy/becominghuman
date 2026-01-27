// THE CORPORATE TRANSLATOR ENGINE (V.20-SAFE)
// Core Logic for sanitizing workplace rage.

document.addEventListener('DOMContentLoaded', () => {
    console.log("Translation Engine Loaded.");
    // REVEAL INTERFACE (Was previously hidden for Auth)
    document.getElementById('main-discovery-feed').style.display = 'block';
});


// THE DICTIONARY (Rage -> Corporate)
const dictionary = [
    { regex: /stupid|idiot|dumb|moron/gi, replacement: "misaligned with our strategic vision" },
    { regex: /shut up|stop talking/gi, replacement: "let's take this offline to preserve bandwidth" },
    { regex: /i don't care|do not care/gi, replacement: "i appreciate the context, but we must prioritize critical path items" },
    { regex: /waste of time|useless/gi, replacement: "an opportunity to optimize our meeting cadence" },
    { regex: /hate|loathe/gi, replacement: "have concerns regarding the current direction" },
    { regex: /bullshit|nonsense/gi, replacement: "information that requires further verification" },
    { regex: /do it yourself/gi, replacement: "i encourage you to take ownership of this initiative" },
    { regex: /late|slow/gi, replacement: "experiencing latency in deliverables" },
    { regex: /fuck off|go away/gi, replacement: "let's circle back when we have more clarity" },
    { regex: /you are wrong/gi, replacement: "i believe there may be a disconnect in our understanding" },
    { regex: /boring/gi, replacement: "straightforward and procedural" },
    { regex: /pay me more/gi, replacement: "i would like to discuss the calibration of my compensation package relative to market value" },
    { regex: /fire him|fire her/gi, replacement: "evaluate their long-term fit within the organization" },
    { regex: /stop emailing me/gi, replacement: "please condense future updates into a single weekly digest" }
];

// FALLBACK GENERATOR (If no keywords match)
const fallbacks = [
    "Thank you for your input. I will review this and align with the team.",
    "Let's synchronize on this to ensure we are all driving towards the same OKRs.",
    "This is an interesting perspective; let's parking-lot this for now.",
    "I hear what you're saying. Let's pivot to a more scalable approach."
];

function runTranslation() {
    const input = document.getElementById('rage-input').value.trim();
    const outputDiv = document.getElementById('safe-output');
    const outputContainer = document.getElementById('output-container');

    if (!input) {
        alert("Please enter your grievance.");
        return;
    }

    let translation = input;
    let matchFound = false;

    // 1. Keyword Replacement
    dictionary.forEach(rule => {
        if (translation.match(rule.regex)) {
            translation = translation.replace(rule.regex, rule.replacement);
            matchFound = true;
        }
    });

    // 2. Formatting & Fallback
    if (!matchFound) {
        // If nothing matches, append a generic corporate closer
        const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        translation = `Regarding your recent point: ${randomFallback}`;
    } else {
        // Polish the sentence
        translation = translation.charAt(0).toUpperCase() + translation.slice(1);
        if (!translation.endsWith('.')) translation += '.';
        translation = `Per our discussion, ${translation} Please advise if this aligns with your expectations.`;
    }

    // 3. Render
    outputDiv.innerText = translation;
    outputContainer.style.display = 'block';

    // Scroll to result
    outputContainer.scrollIntoView({ behavior: 'smooth' });
}

function copyOutput() {
    const text = document.getElementById('safe-output').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("COPIED TO CLIPBOARD. SAFE TO SEND.");
    });
}
