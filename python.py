# add_post.py
# This script automates adding new posts to the top of your index.html file.
# It requires no JavaScript or Netlify configuration changes.

import os

def add_new_post():
    """
    Prompts the user for a new post's title and content,
    then inserts it as an HTML article at the beginning of the posts-list section in index.html.
    """
    print("\n--- Add New Clarity for Humans (CFH) Post ---")

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
    post_html = '\n'.join([line.strip() for line in post_html.split('\n') if line.strip()]) + '\n'
    post_html = '            ' + post_html.replace('\n', '\n            ').strip() # Re-indent for HTML structure

    # Define the path to index.html
    index_html_path = 'index.html'

    # Check if index.html exists
    if not os.path.exists(index_html_path):
        print(f"Error: '{index_html_path}' not found in the current directory. Make sure the script is in the same folder as index.html.")
        return

    try:
        # Read the existing index.html content
        with open(index_html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Find the insertion point: right after <section id="posts-list">
        # We need to be careful with indentation, so we look for the exact tag
        insertion_marker = '<section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
        
        # Find the index of the insertion marker
        insert_index = html_content.find(insertion_marker)

        if insert_index == -1:
            print(f"Error: Could not find the insertion marker '{insertion_marker}' in '{index_html_path}'.")
            print("Please ensure your index.html has the exact <section id=\"posts-list\"...> tag.")
            return

        # Calculate the position right after the closing '>' of the marker
        insert_position = insert_index + len(insertion_marker)

        # Insert the new post HTML
        updated_html_content = (
            html_content[:insert_position] +
            post_html +
            html_content[insert_position:]
        )

        # Write the updated content back to index.html
        with open(index_html_path, 'w', encoding='utf-8') as f:
            f.write(updated_html_content)

        print(f"\nSuccessfully added '{post_title}' to '{index_html_path}'.")
        print("Remember to commit and push your changes to GitHub for your website to update!")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    add_new_post()
