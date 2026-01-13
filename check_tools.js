const fs = require('fs');
const content = fs.readFileSync('js/omni-simple.js', 'utf8');
const methods = fs.readFileSync('tool_methods.txt', 'utf8').split('\n').map(m => m.trim()).filter(m => m);

const missing = [];
const simulated = [];

methods.forEach(method => {
    const searchStr = `${method}() {`;
    const index = content.indexOf(searchStr);
    if (index === -1) {
        missing.push(method);
    } else {
        // Check for placeholder/incomplete code in the body (first 200 chars after method head)
        const bodyStart = index + searchStr.length;
        const bodySnippet = content.substring(bodyStart, bodyStart + 400);
        if (bodySnippet.includes('simulation') ||
            bodySnippet.includes('placeholder') ||
            bodySnippet.includes('mock') ||
            bodySnippet.includes("alert('") ||
            (bodySnippet.includes('<div') && bodySnippet.length < 300 && !bodySnippet.includes('<input') && !bodySnippet.includes('<button'))) {
            simulated.push(method);
        }
    }
});

console.log('MISSING METHODS:', missing.length);
missing.forEach(m => console.log('MISSING:', m));
console.log('SIMULATED/INCOMPLETE METHODS:', simulated.length);
simulated.forEach(m => console.log('SIMULATED:', m));
