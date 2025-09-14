# This script automates adding new posts or video links to the top of a specified HTML file.
# It can also create a basic HTML structure if the file is new or empty.

import os

def get_basic_html_structure(page_title="My Website"):
    """Returns a string containing the basic HTML boilerplate for a new page."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{page_title}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts - Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <!-- Custom Styles -->
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-gray-900 text-gray-100 flex flex-col min-h-screen">

    <header class="bg-gray-800 p-4 shadow-md">
        <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <h1 class="text-2xl font-bold text-teal-400 mb-2 sm:mb-0">My Website</h1>
            <nav class="flex space-x-4">
                <a href="index.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Home</a>
                <a href="about.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">About</a>
                <a href="videos.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Videos</a>
                <a href="contact.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Contact</a>
                <a href="privacy.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Privacy</a>
            </nav>
        </div>
    </header>

    <main class="container mx-auto p-6 flex-grow">
        <section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Text posts will be inserted here by the script -->
        </section>
        <section id="links-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <!-- Video links will be inserted here by the script -->
        </section>
    </main>

    <footer class="bg-gray-800 p-4 text-center text-gray-400 text-sm mt-auto">
        <div class="container mx-auto">
            &copy; 2025 My Website. All rights reserved.
        </div>
    </footer>

</body>
</html>"""

def generate_post_html(post_title, post_content):
    """Generates the HTML for a text-based post."""
    return f"""
            <article class="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-teal-400 transition-all duration-300">
                <h3 class="text-xl font-bold text-teal-300 mb-2">{post_title}</h3>
                <div class="prose prose-invert max-w-none">
                    <p>{post_content}</p>
                </div>
            </article>
"""

def generate_link_html(link_title, link_url):
    """Generates the HTML for a video link post."""
    return f"""
            <article class="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-cyan-400 transition-all duration-300">
                <h3 class="text-xl font-bold text-cyan-300 mb-2">{link_title}</h3>
                <div class="prose prose-invert max-w-none">
                    <a href="{link_url}" target="_blank" class="block bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition-colors duration-200">Watch Video</a>
                </div>
            </article>
"""

def insert_content(target_html_file, html_content_to_insert, insertion_marker):
    """Inserts content into the specified HTML file."""
    try:
        if not os.path.exists(target_html_file):
            print(f"'{target_html_file}' does not exist. Creating a new basic HTML file.")
            with open(target_html_file, 'w', encoding='utf-8') as f:
                f.write(get_basic_html_structure(page_title=target_html_file.replace('.html', '').title()))
        
        with open(target_html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        insert_index = html_content.find(insertion_marker)
        if insert_index == -1:
            print(f"Error: Could not find the insertion marker '{insertion_marker}' in '{target_html_file}'.")
            return

        insert_position = insert_index + len(insertion_marker)
        updated_html_content = (
            html_content[:insert_position] +
            html_content_to_insert +
            html_content[insert_position:]
        )
        
        with open(target_html_file, 'w', encoding='utf-8') as f:
            f.write(updated_html_content)

        print(f"\nSuccessfully added content to '{target_html_file}'.")
        print("Remember to commit and push your changes to Git!")

    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    """Main function to run the script."""
    print("\n--- Add New Content ---")
    
    content_type = input("What type of content do you want to add? (1: text post, 2: video link): ").strip()
    
    if content_type == '1':
        target_html_file = input("Enter the HTML file name for the text post (e.g., index.html): ").strip()
        if not target_html_file.lower().endswith('.html'):
            target_html_file += '.html'
        
        post_title = input("Enter the title for your new post: ").strip()
        if not post_title:
            print("Error: Title cannot be empty. Aborting.")
            return

        print("Enter the content for your new post (type 'END' on a new line to finish):")
        post_content_lines = []
        while True:
            line = input()
            if line.strip().upper() == 'END':
                break
            post_content_lines.append(line)
        post_content = " ".join(post_content_lines).strip()
        if not post_content:
            print("Error: Content cannot be empty. Aborting.")
            return
            
        html_to_add = generate_post_html(post_title, post_content)
        insert_content(target_html_file, html_to_add, '<section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">')
    
    elif content_type == '2':
        target_html_file = input("Enter the HTML file name for the video link (e.g., videos.html): ").strip()
        if not target_html_file.lower().endswith('.html'):
            target_html_file += '.html'
            
        link_title = input("Enter a title for the video link: ").strip()
        if not link_title:
            print("Error: Link title cannot be empty. Aborting.")
            return

        link_url = input("Enter the video URL: ").strip()
        if not link_url:
            print("Error: URL cannot be empty. Aborting.")
            return

        html_to_add = generate_link_html(link_title, link_url)
        insert_content(target_html_file, html_to_add, '<section id="links-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">')
    
    else:
        print("Invalid choice. Please enter '1' for a text post or '2' for a video link.")

if __name__ == "__main__":
    main()
