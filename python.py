# add_post_to_page.py
# This script automates adding new posts to the top of a SPECIFIED HTML file.
# It does NOT automate page creation or navigation link updates for pagination.
# You will manually manage creating new HTML pages (e.g., page2.html, page3.html)
# and updating the "Next/Previous Page" links between them.

import os

def add_new_post_to_page():
    """
    Prompts the user for the target HTML file, new post's title and content,
    then inserts it as an HTML article at the beginning of the posts-list section.
    """
    print("\n--- Add New Clarity for Humans (CFH) Post to Specific Page ---")

    # Get target HTML file from user
    target_html_file = input("Enter the HTML file name to add the post to (e.g., index.html, page2.html): ").strip()
    if not target_html_file.lower().endswith('.html'):
        target_html_file += '.html' # Ensure .html extension

    if not os.path.exists(target_html_file):
        print(f"Error: '{target_html_file}' not found. Please ensure the file exists in the current directory.")
        return

    # Get title from user
    post_title = input("Enter the title for your new post: ").strip()
    if not post_title:
        print("Error: Post title cannot be empty. Aborting.")
        return

    # Get content from user (multiline input)
    print("Enter the content for your new post (type 'END' on a new line to finish):")
    post_content_lines = []
    while True:
        line = input()
        if line.strip().upper() == 'END':
            break
        post_content_lines.append(line)
    post_content = "\n".join(post_content_lines).strip()

    if not post_content:
        print("Error: Post content cannot be empty. Aborting.")
        return

    # Generate the HTML for the new post
    # Note: We are using simple <p> tags for content as Markdown parsing is removed with script.js
    post_html = f"""
            <article class="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold text-teal-300 mb-2">{post_title}</h3>
                <div class="prose prose-invert max-w-none">
                    <p>{post_content}</p>
                </div>
            </article>
"""
    # Ensure consistent indentation and newlines for clean HTML
    # This part is crucial for maintaining readable HTML structure
    post_html_lines = [line.strip() for line in post_html.split('\n') if line.strip()]
    post_html = '\n            ' + '\n            '.join(post_html_lines) + '\n'


    try:
        # Read the existing HTML content
        with open(target_html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Find the insertion point: right after <section id="posts-list">
        insertion_marker = '<section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
        
        # Find the index of the insertion marker
        insert_index = html_content.find(insertion_marker)

        if insert_index == -1:
            print(f"Error: Could not find the insertion marker '{insertion_marker}' in '{target_html_file}'.")
            print("Please ensure your HTML file has the exact <section id=\"posts-list\"...> tag.")
            return

        # Calculate the position right after the closing '>' of the marker
        insert_position = insert_index + len(insertion_marker)

        # Insert the new post HTML
        updated_html_content = (
            html_content[:insert_position] +
            post_html +
            html_content[insert_position:]
        )

        # Write the updated content back to the HTML file
        with open(target_html_file, 'w', encoding='utf-8') as f:
            f.write(updated_html_content)

        print(f"\nSuccessfully added '{post_title}' to '{target_html_file}'.")
        print("Remember to commit and push your changes to GitHub for your website to update!")
        print("\n--- MANUAL PAGINATION STEP REQUIRED ---")
        print("If this page is now 'full', you will need to:")
        print("1. Manually create a new HTML file (e.g., 'page2.html') by copying content from this file.")
        print("2. Manually remove the oldest posts from this file.")
        print("3. Manually add 'Next Page' and 'Previous Page' navigation links to all affected HTML files.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    add_new_post_to_page()
