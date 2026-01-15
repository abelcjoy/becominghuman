document.addEventListener('DOMContentLoaded', () => {
    // Basic Navigation
    const enterBtn = document.getElementById('enter-cfh');
    const entryScreen = document.getElementById('entry-screen');
    const selection = document.getElementById('selection-screen');
    const backBtn = document.getElementById('back-home');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            entryScreen.classList.add('hidden');
            selection.style.display = 'flex';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            entryScreen.classList.remove('hidden');
            selection.style.display = 'none';
        });
    }

    // Secret Calculator Logic
    const trigger = document.getElementById('secret-trigger');
    const gate = document.getElementById('calculator-gate');
    const screen = document.getElementById('calc-screen');
    const specialAdd = document.getElementById('special-add');
    const adminPanel = document.getElementById('admin-panel');

    let currentInput = '';
    const SECRET_ANSWER = 370.9219; // Result of 25.68790 + 345.234

    trigger.addEventListener('click', () => {
        gate.style.display = 'flex';
    });

    window.press = (val) => {
        currentInput += val;
        screen.textContent = currentInput;
    };

    window.clearCalc = () => {
        currentInput = '';
        screen.textContent = '0';
    };

    window.compute = () => {
        try {
            currentInput = eval(currentInput).toString();
            screen.textContent = currentInput;
        } catch {
            screen.textContent = 'ERROR';
            currentInput = '';
        }
    };

    window.closeCalc = () => {
        gate.style.display = 'none';
        clearCalc();
    };

    specialAdd.addEventListener('click', () => {
        // Evaluate and check against the secret
        try {
            const res = parseFloat(eval(currentInput));
            if (res === SECRET_ANSWER) {
                adminPanel.style.display = 'flex';
                gate.style.display = 'none';
                clearCalc();
            } else {
                alert('ACCESS_DENIED: Result does not match security protocol.');
            }
        } catch {
            alert('INPUT_ERROR');
        }
    });

    // Admin Advice Logic
    const saveBtn = document.getElementById('save-advice');
    const adviceText = document.getElementById('advice-text');
    const adviceLink = document.getElementById('advice-link');
    const adviceCategory = document.getElementById('advice-category');
    const feed = document.getElementById('advice-feed');

    function saveAdvice() {
        const advice = {
            category: adviceCategory.value,
            text: adviceText.value,
            link: adviceLink.value,
            timestamp: new Date().getTime()
        };

        let advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
        advices.unshift(advice); // Add to top
        localStorage.setItem('cfh_advices', JSON.stringify(advices));

        renderFeed();
        adminPanel.style.display = 'none';
        adviceText.value = '';
        adviceLink.value = '';
    }

    function renderFeed() {
        const advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
        feed.innerHTML = '';

        advices.forEach(item => {
            const card = document.createElement('div');
            card.className = 'advice-card';
            card.innerHTML = `
                <div style="font-size:0.6rem; color:#888; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.1em;">Advice for ${item.category}</div>
                <div style="font-size:0.95rem; line-height:1.6;">${item.text}</div>
                ${item.link ? `<a href="${item.link}" target="_blank" class="link-preview">VIEW_EXTERNAL_RESOURCE</a>` : ''}
            `;
            feed.appendChild(card);
        });
    }

    if (saveBtn) saveBtn.addEventListener('click', saveAdvice);
    renderFeed();
});
