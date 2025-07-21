// script.js
import { posts } from './posts.js';

const postsContainer = document.getElementById('posts-container');
let unseenPosts = [];
let seenQuoteIds = new Set(); // Using a Set for efficient lookup and uniqueness
let loadedCount = 0;
const postsPerLoad = 3; // Number of posts to load per scroll
let isLoading = false; // To prevent multiple simultaneous loads

// --- Local Storage Management for Seen Quotes ---

const SEEN_QUOTES_KEY = 'seenQuotes';
const LAST_VISIT_DATE_KEY = 'lastVisitDate';

/**
 * Loads seen quote IDs from localStorage.
 * Resets if it's a new day to allow users to see all quotes again.
 */
function loadSeenQuotes() {
    const storedSeenQuotes = localStorage.getItem(SEEN_QUOTES_KEY);
    const storedLastVisitDate = localStorage.getItem(LAST_VISIT_DATE_KEY);
    const today = new Date().toDateString(); // e.g., "Mon Jul 21 2025"

    if (storedLastVisitDate !== today) {
        // It's a new day, reset seen quotes
        console.log("New day detected. Resetting seen quotes.");
        seenQuoteIds.clear();
        localStorage.setItem(LAST_VISIT_DATE_KEY, today);
        localStorage.removeItem(SEEN_QUOTES_KEY); // Clear old seen quotes
    } else if (storedSeenQuotes) {
        try {
            const parsedIds = JSON.parse(storedSeenQuotes);
            seenQuoteIds = new Set(parsedIds);
        } catch (e) {
            console.error("Error parsing seen quotes from localStorage:", e);
            seenQuoteIds.clear(); // Clear corrupted data
        }
    }
}

/**
 * Saves the current list of seen quote IDs to localStorage.
 */
function saveSeenQuotes() {
    localStorage.setItem(SEEN_QUOTES_KEY, JSON.stringify(Array.from(seenQuoteIds)));
}

// --- Post Rendering and Loading Logic ---

/**
 * Shuffles an array in place (Fisher-Yates algorithm).
 * @param {Array} array The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Creates and appends a single post element to the container.
 * Marks the post as seen in localStorage.
 * @param {Object} post The post object {title, content, originalIndex}.
 */
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in';
    postElement.innerHTML = `
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">${post.title}</h2>
        <p class="text-gray-700 leading-relaxed">${post.content}</p>
    `;
    postsContainer.appendChild(postElement);

    // Mark post as seen
    seenQuoteIds.add(post.originalIndex);
    saveSeenQuotes();
}

/**
 * Loads a batch of unseen posts and displays them.
 */
function loadMorePosts() {
    if (isLoading) return; // Prevent multiple calls
    isLoading = true;

    const remainingPosts = unseenPosts.slice(loadedCount);

    if (remainingPosts.length === 0) {
        displayNoMorePostsMessage();
        isLoading = false;
        return;
    }

    const postsToLoad = remainingPosts.slice(0, postsPerLoad);

    postsToLoad.forEach(post => {
        displayPost(post);
    });

    loadedCount += postsToLoad.length;
    isLoading = false;

    // If after loading, there are still no more unseen posts, show message
    if (loadedCount >= unseenPosts.length) {
        displayNoMorePostsMessage();
    }
}

/**
 * Displays a message when all available unseen posts have been displayed.
 */
function displayNoMorePostsMessage() {
    // Clear any existing posts if this is the only thing to show
    if (postsContainer.children.length === 0 || (postsContainer.children.length > 0 && postsContainer.lastChild.id !== 'no-more-posts-message')) {
        const messageElement = document.createElement('div');
        messageElement.id = 'no-more-posts-message';
        messageElement.className = 'bg-white p-6 rounded-xl shadow-lg text-center text-gray-600 italic mt-8';
        messageElement.textContent = "You have seen everything for now, come back tomorrow!";
        postsContainer.appendChild(messageElement);
    }
}

// --- Event Listeners and Initial Setup ---

/**
 * Initializes the application on page load.
 */
function initializeApp() {
    loadSeenQuotes();

    // Filter posts to get only unseen ones and add original index
    unseenPosts = posts
        .map((post, index) => ({ ...post, originalIndex: index })) // Add original index
        .filter(post => !seenQuoteIds.has(post.originalIndex));

    shuffleArray(unseenPosts); // Shuffle unseen posts for variety

    if (unseenPosts.length === 0) {
        displayNoMorePostsMessage();
    } else {
        loadMorePosts(); // Load initial batch of posts
    }

    // Infinite scroll event listener with a simple throttle
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Check if user is near the bottom of the page (e.g., within 200px)
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                loadMorePosts();
            }
        }, 100); // Throttle to 100ms
    });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

