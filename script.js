// script.js
// This file handles the dynamic rendering of posts onto the webpage.
import { posts } from './posts.js'; // Import the posts array from posts.js

/**
 * Dynamically creates and appends post elements to the DOM.
 * Each post is styled as a card with a title and content.
 */
function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) {
        console.error("Error: 'posts-container' element not found.");
        return;
    }

    postsContainer.innerHTML = ''; // Clear any existing posts before rendering

    // Iterate over each post in the imported 'posts' array
    posts.forEach(post => {
        // Create a new div element for each post
        const postElement = document.createElement('div');
        // Apply Tailwind CSS classes for consistent styling of the post card
        postElement.className = 'bg-white p-6 rounded-xl shadow-lg border border-gray-200';

        // Create and append the post title
        const titleElement = document.createElement('h2');
        titleElement.className = 'text-2xl font-semibold text-gray-800 mb-3';
        titleElement.textContent = post.title;

        // Create and append the post content
        const contentElement = document.createElement('p');
        contentElement.className = 'text-gray-700 leading-relaxed';
        contentElement.textContent = post.content;

        // Assemble the post element
        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);

        // Add the complete post element to the main container
        postsContainer.appendChild(postElement);
    });
}

// Ensure the DOM is fully loaded before attempting to render posts.
// This prevents errors if the script tries to access elements that aren't yet available.
window.addEventListener('load', renderPosts);
