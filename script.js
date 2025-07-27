// This script loads posts from posts.js and renders them on index.html.
// It is set up as a module to import postsRaw from posts.js.

import { postsRaw } from './posts.js';

document.addEventListener('DOMContentLoaded', () => {
    const postsListContainer = document.getElementById('posts-list');
    postsListContainer.innerHTML = ''; // Clear loading message

    // Check if postsRaw was successfully imported and is an array
    if (!Array.isArray(postsRaw) || postsRaw.length === 0) {
        postsListContainer.innerHTML = `<p class="text-gray-400 text-center col-span-full">No Clarity for Humans (CFH) moments yet, or posts data could not be loaded. Please ensure 'posts.js' is in the same directory as 'index.html' and contains the 'postsRaw' export, with each post having 'title' and 'content' properties.</p>`;
    } else {
        // Reverse the array to show newest posts first
        const reversedPosts = [...postsRaw].reverse(); 

        reversedPosts.forEach(post => { // 'post' is now an object {title, content}
            const postCard = document.createElement('article');
            postCard.className = 'bg-gray-800 p-6 rounded-lg shadow-lg';
            postCard.innerHTML = `
                <h3 class="text-xl font-bold text-teal-300 mb-2">${post.title}</h3>
                <div class="prose prose-invert max-w-none">
                    ${marked.parse(post.content)}
                </div>
            `;
            postsListContainer.appendChild(postCard);
        });
    }
});
