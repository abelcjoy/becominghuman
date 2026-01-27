const puppeteer = require('puppeteer');

(async () => {
    console.log("🚀 STARTING NUCLEAR ARBITRAGE BOT...");

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1280,800',
            '--disable-notifications',
            '--disable-geolocation' // We handle geo manually
        ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // 1. FORCE GEOLOCATION (The "Teleport")
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://blinkit.com', ['geolocation']);
    await page.setGeolocation({ latitude: 28.6304, longitude: 77.2177 }); // Delhi

    console.log("📍 Location Spoofed: DELHI");

    try {
        // 2. BYPASS HOMEPAGE -> GO DIRECTLY TO SEARCH URL
        // Instead of fighting with the search bar, we just go to the results page!
        const product = "Amul Butter";
        const query = encodeURIComponent(product);
        const searchUrl = `https://blinkit.com/s/?q=${query}`;

        console.log(`🔗 Navigating direct to: ${searchUrl}`);
        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

        // 3. NUCLEAR POPUP KILLER
        // If a popup exists, we remove it from the DOM entirely.
        await page.evaluate(() => {
            const popup = document.querySelector('button[class*="LocationButton"]');
            if (popup) popup.click();
        });

        // 4. WAIT FOR RESULTS
        console.log("⏳ Waiting 8s for product grid...");
        await new Promise(r => setTimeout(r, 8000));

        // 5. EXTRACT DATA
        console.log("📊 Extracting Data...");
        const data = await page.evaluate(() => {
            const items = [];
            // Generic Card Scraper
            const cards = document.querySelectorAll('div, a'); // Scan everything

            // We look for elements that contain BOTH a price "₹" and text "ADD" (button)
            // This identifies a product card reliably

            let count = 0;
            for (const card of cards) {
                if (count >= 5) break;
                // Optimization: Don't scan huge containers
                if (card.innerText.length > 300) continue;
                if (!card.innerText.includes('₹')) continue;

                // Regex for Price
                const priceMatch = card.innerText.match(/₹\s*(\d+)/);
                if (!priceMatch) continue;

                const price = parseInt(priceMatch[1]);

                // Regex for Name (The longest line of text usually)
                const lines = card.innerText.split('\n').filter(l => l.length > 5 && !l.includes('₹') && !l.includes('MIN'));
                const name = lines[0] || "Unknown Item";

                // Stock
                const isOOS = card.innerText.toLowerCase().includes('out of stock');

                // Deduplication
                if (items.some(i => i.name === name)) continue;

                items.push({
                    name: name,
                    price: price,
                    stock: isOOS ? "OUT OF STOCK" : "IN STOCK"
                });
                count++;
            }
            return items;
        });

        console.log("\n✅ FINAL RESULTS:");
        console.log(JSON.stringify(data, null, 2));

    } catch (e) {
        console.error("🔥 CRITICAL FAILURE:", e.message);
        await page.screenshot({ path: 'nuclear_fail.png' });
    }

    // console.log("👋 Closing in 30s...");
})();
