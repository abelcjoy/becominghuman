const puppeteer = require('puppeteer');

(async () => {
    // 1. Launch the Browser (Headless: false so you can watch it happen)
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // 2. THE TELEPORTATION HACK
    // We are overriding the browser's permission system to allow Geolocation immediately
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://blinkit.com', ['geolocation']);

    // 3. Set Fake Coordinates (Connaught Place, Delhi)
    // Lat: 28.6304, Long: 77.2177
    await page.setGeolocation({ latitude: 28.6304, longitude: 77.2177 });

    console.log("📍 Teleporting to Delhi...");

    // 4. Go to Blinkit
    await page.goto('https://blinkit.com', { waitUntil: 'networkidle2' });

    console.log("🚀 Arrived at Blinkit. Waiting for location auto-detect...");

    // 5. Search for Amul Butter
    // Note: In a real script, we would click the "Detect Location" button if it pops up.
    // For now, let's just search and see if the prices reflect Delhi.

    // Waiting for the search bar
    try {
        await page.waitForSelector('input[class*="SearchBar"]', { timeout: 10000 });
        await page.type('input[class*="SearchBar"]', 'Amul Butter');
        await page.keyboard.press('Enter');

        console.log("🔍 Searching for Amul Butter...");

        // Wait for results
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        console.log("📸 Taking a screenshot of the prices...");
        await page.screenshot({ path: 'delhi_prices.png' });

        console.log("✅ Done! Check 'delhi_prices.png'.");
    } catch (e) {
        console.log("⚠️ Could not find search bar. You might need to manually click 'Detect Location' in the window.");
    }

    // Keep browser open for 30 seconds so you can see it
    // await browser.close();
})();
