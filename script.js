// This script loads posts from posts.js and renders them on index.html.
// It is set up as a module to import postsRaw from posts.js.

import { postsRaw } from './posts.js';

document.addEventListener('DOMContentLoaded', () => {
    const postsListContainer = document.getElementById('posts-list');
    postsListContainer.innerHTML = ''; // Clear loading message

    // Check if postsRaw was successfully imported and is an array
    if (!Array.isArray(postsRaw) || postsRaw.length === 0) {
        postsListContainer.innerHTML = `<p class="text-gray-400 text-center col-span-full">No Mindful Moments yet, or posts data could not be loaded. Please ensure 'posts.js' is in the same directory as 'index.html' and contains the 'postsRaw' export.</p>`;
    } else {
        // Reverse the array to show newest posts first
        const reversedPosts = [...postsRaw].reverse(); 

        reversedPosts.forEach(rawPostContent => {
            // Split the raw content into lines
            const lines = rawPostContent.trim().split('\n');
            let title = 'Untitled Post';
            let bodyContent = rawPostContent;

            // Check if the first line is an H1 header
            if (lines.length > 0 && lines[0].startsWith('# ')) {
                title = lines[0].substring(2).trim(); // Remove '# ' and trim
                bodyContent = lines.slice(1).join('\n').trim(); // Rest of the lines are body
            }

            const postCard = document.createElement('article');
            postCard.className = 'bg-gray-800 p-6 rounded-lg shadow-lg';
            postCard.innerHTML = `
                <h3 class="text-xl font-bold text-teal-300 mb-2">${title}</h3>
                <div class="prose prose-invert max-w-none">
                    ${marked.parse(bodyContent)}
                </div>
            `;
            postsListContainer.appendChild(postCard);
        });
    }
});
