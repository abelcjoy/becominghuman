/**
 * The Semantic Engine (AI-Optimized Presence)
 * "To be found is to be understood."
 * 
 * Dynamically injects rich JSON-LD Structured Data to ensure
 * Google and AI Search Engines (Perplexity, ChatGPT) understand
 * the philosophical purpose of the application.
 * 
 * Updates in real-time as the user progresses to reflect "App State".
 */

export class SemanticEngine {
    constructor() {
        this.init();
    }

    init() {
        this.injectBaseSchema();
        this.injectBreadcrumbs();

        // Listen for progression
        document.addEventListener('life-tick', (e) => this.updateLiveStats(e.detail));
    }

    injectBaseSchema() {
        // SoftwareApplication Schema
        const software = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Clarity For Humans",
            "url": "https://clarityforhumans.com",
            "description": "A philosophical life extension simulator and memento mori visualization tool.",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "featureList": "Life Countdown, Stoic Reflections, Biological Capital Visualization",
            "author": {
                "@type": "Person",
                "name": "Abel C"
            }
        };

        this.embed('schema-app', software);

        // Organization Schema
        const org = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Clarity For Humans",
            "url": "https://clarityforhumans.com",
            "logo": "https://clarityforhumans.com/favicon.svg",
            "slogan": "The code you write is the life you live."
        };

        this.embed('schema-org', org);
    }

    injectBreadcrumbs() {
        const crumbs = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Simulation",
                "item": "https://clarityforhumans.com"
            }]
        };
        this.embed('schema-crumbs', crumbs);
    }

    updateLiveStats(stats) {
        // Dynamic "Game" State for SEO
        // This tells search engines this is a "Live" app with changing states
        const state = {
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "Current User Timeline",
            "description": "Real-time biological capital projection.",
            "variableMeasured": [
                { "@type": "PropertyValue", "name": "Years Remaining", "value": stats.years },
                { "@type": "PropertyValue", "name": "Percentage Lived", "value": stats.livedPercent }
            ]
        };

        // Debounce update to avoid thrashing
        if (!this.lastUpdate || Date.now() - this.lastUpdate > 60000) {
            this.embed('schema-live', state);
            this.lastUpdate = Date.now();
        }
    }

    embed(id, data) {
        let script = document.getElementById(id);
        if (!script) {
            script = document.createElement('script');
            script.id = id;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(data, null, 2);
    }
}
