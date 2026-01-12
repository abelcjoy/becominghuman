/**
 * The Citation Engine
 * Intercepts copy events to append a professional "Memento Mori" citation
 * and a link back to the source. Improves SEO via social sharing loops.
 * "Knowledge shared is time preserved."
 */

export class CitationEngine {
    constructor() {
        document.addEventListener('copy', (e) => this.handleCopy(e));
    }

    handleCopy(e) {
        // Only modify if user selects substantial text (not just a password or code)
        const selection = document.getSelection();
        const text = selection.toString();

        if (text.length < 50) return; // Ignore small snippets

        // Construct Premium Citation
        const citation = `\n\n"${text}"\n\n— Calculated via Clarity For Humans\nhttps://clarityforhumans.com\n(Memento Mori)`;

        // We can't natively modify standard clipboard easily without permissions in some contexts,
        // but the standard 'clipboardData' API works in most 'copy' events.

        if (e.clipboardData) {
            e.preventDefault();
            e.clipboardData.setData('text/plain', text + citation); // Append

            // Visual Feedback
            if (window.toast) toast.info('Copied to clipboard (Citation added)');
        }
    }
}
