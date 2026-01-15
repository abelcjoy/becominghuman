document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('CFH Protocol PWA Active'))
            .catch(err => console.log('PWA Failed', err));
    }

    // PWA Install Prompt Logic
    let deferredPrompt;
    const installBtn = document.getElementById('install-btn');

    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Button visibility is now handled in the 'enter-cfh' click listener
    });

    if (installBtn) {
        // If it's iOS, update the label to show it's a guide
        if (isIOS) {
            installBtn.textContent = 'ADD TO HOME +';
        }

        installBtn.addEventListener('click', (e) => {
            if (isIOS) {
                alert('To install on iPhone: \n1. Tap the Share button at the bottom center. \n2. Scroll down and select "Add to Home Screen".');
                return;
            }

            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        installBtn.style.display = 'none';
                    }
                    deferredPrompt = null;
                });
            } else {
                alert('Please wait a moment for the browser to enable the installation protocol, or use your browser\'s manual "Add to Home Screen" option.');
            }
        });
    }

    // Basic Navigation
    const enterBtn = document.getElementById('enter-cfh');
    const entryScreen = document.getElementById('entry-screen');
    const selection = document.getElementById('selection-screen');
    const backBtn = document.getElementById('back-home');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            entryScreen.classList.add('hidden');
            selection.style.display = 'flex';

            // Show the install button explicitly when entering CFH
            // Hide it only if the app is already installed
            const isInstalled = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
            if (installBtn && !isInstalled) {
                installBtn.style.display = 'block';
            }
        });
    }

    const selector = document.getElementById('protocol-selector');
    const detailView = document.getElementById('protocol-detail');
    const backToSelect = document.getElementById('back-to-selection');

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            entryScreen.classList.remove('hidden');
            selection.style.display = 'none';
            selector.classList.remove('hidden');
            detailView.classList.add('hidden');
        });
    }

    if (backToSelect) {
        backToSelect.addEventListener('click', () => {
            selector.classList.remove('hidden');
            detailView.classList.add('hidden');
        });
    }

    window.openProtocol = (category) => {
        selector.classList.add('hidden');
        detailView.classList.remove('hidden');
        renderFeed(category);
    };

    // Secret Calculator Logic
    const trigger = document.getElementById('secret-trigger');
    const gate = document.getElementById('calculator-gate');
    const screen = document.getElementById('calc-screen');
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
            const res = eval(currentInput);
            if (res === SECRET_ANSWER) {
                adminPanel.style.display = 'flex';
                gate.style.display = 'none';
                clearCalc();
                return;
            }
            currentInput = res.toString();
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

    // Admin Advice Logic
    const saveBtn = document.getElementById('save-advice');
    const adviceText = document.getElementById('advice-text');
    const adviceDate = document.getElementById('advice-date');
    const adviceLink = document.getElementById('advice-link');
    const adviceCategory = document.getElementById('advice-category');
    const feed = document.getElementById('advice-feed');

    function saveAdvice() {
        const advice = {
            category: adviceCategory.value,
            text: adviceText.value,
            date: adviceDate.value || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            link: adviceLink.value,
            timestamp: new Date().getTime()
        };

        let advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
        advices.unshift(advice); // Add to top
        localStorage.setItem('cfh_advices', JSON.stringify(advices));

        renderFeed();
        adminPanel.style.display = 'none';
        adviceText.value = '';
        adviceDate.value = '';
        adviceLink.value = '';
    }

    function renderFeed(filterCategory = null) {
        const advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
        feed.innerHTML = '';
        const adminFeed = document.getElementById('admin-posts-list');
        if (adminFeed) adminFeed.innerHTML = '';

        advices.forEach((item, index) => {
            // Filter logic for public view
            if (!filterCategory || item.category === filterCategory) {
                const card = document.createElement('div');
                card.className = 'advice-card';
                card.innerHTML = `
                    <div style="font-size:0.6rem; color:#888; text-transform:uppercase; letter-spacing:0.1em;">${item.date || ''}</div>
                    <div style="font-size:0.95rem; line-height:1.6; color: #000; font-weight: 400; overflow-wrap: break-word;">${item.text}</div>
                    ${item.link ? `<a href="${item.link}" target="_blank" class="link-preview">VIEW_EXTERNAL_RESOURCE</a>` : ''}
                `;
                feed.appendChild(card);
            }

            // Admin Management List (Always show all for admin)
            if (adminFeed) {
                const adminItem = document.createElement('div');
                adminItem.style.cssText = 'padding:1rem; border:1px solid #eee; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;';
                adminItem.innerHTML = `
                    <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:70%;">[${item.category}] ${item.text.substring(0, 30)}...</div>
                    <button onclick="deleteAdvice(${index})" style="background:#ff000011; border:1px solid #ff0000; color:#ff0000; padding:0.25rem 0.75rem; cursor:pointer; font-size:0.6rem; text-transform:uppercase;">DELETE</button>
                `;
                adminFeed.appendChild(adminItem);
            }
        });
    }

    window.deleteAdvice = (index) => {
        if (confirm('Permanently delete this advice from the live feed?')) {
            let advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
            advices.splice(index, 1);
            localStorage.setItem('cfh_advices', JSON.stringify(advices));
            renderFeed();
        }
    };

    if (saveBtn) saveBtn.addEventListener('click', saveAdvice);
    renderFeed();
});
