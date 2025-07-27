# add_post_smart.py
# This script automates adding new posts to the top of a specified HTML file.
# It can also create a basic HTML structure if the file is new or empty.
# It does NOT automate page creation or navigation link updates for pagination.
# You will manually manage creating new HTML pages (e.g., page2.html, page3.html)
# and updating the "Next/Previous Page" links between them.

import os

def get_basic_html_structure(page_title="Clarity for Humans (CFH) Page"):
    """Returns a string containing the basic HTML boilerplate for a new page."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{page_title}</title>
    <!-- Tailwind CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!-- Google Fonts - Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <!-- Custom Styles -->
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-gray-900 text-gray-100 flex flex-col min-h-screen">

    <header class="bg-gray-800 p-4 shadow-md">
        <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <h1 class="text-2xl font-bold text-teal-400 mb-2 sm:mb-0">Clarity for Humans (CFH)</h1>
            <nav class="flex space-x-4">
                <a href="index.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Home</a>
                <a href="about.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">About</a>
                <a href="contact.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Contact</a>
                <a href="privacy.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Privacy</a>
                <!-- Add pagination links here manually (e.g., <a href="page2.html">Next Page</a>) -->
            </nav>
        </div>
    </header>

    <main class="container mx-auto p-6 flex-grow">
        <section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Posts will be inserted here by the script -->
        </section>
    </main>

    <footer class="bg-gray-800 p-4 text-center text-gray-400 text-sm mt-auto">
        <div class="container mx-auto">
            &copy; 2025 Clarity for Humans. All rights reserved.
        </div>
    </footer>

</body>
</html>"""

def add_new_post_smart():
    """
    Prompts the user for the target HTML file, checks/creates basic structure,
    then prompts for new post's title and content, and inserts it.
    """
    print("\n--- Add New Clarity for Humans (CFH) Post ---")

    # 1. Get target HTML file from user
    target_html_file = input("Enter the HTML file name (e.g., index.html, page2.html): ").strip()
    if not target_html_file.lower().endswith('.html'):
        target_html_file += '.html' # Ensure .html extension

    html_content = ""
    file_exists = os.path.exists(target_html_file)
    needs_structure_creation = False

    if file_exists:
        with open(target_html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Check for essential tags to determine if basic structure is present
        if not all(tag in html_content for tag in ['<html', '<head', '<body', '<section id="posts-list"']):
            print(f"Warning: '{target_html_file}' exists but seems to be missing a basic HTML structure (e.g., <html, <head, <body, or <section id=\"posts-list\">).")
            create_choice = input("Do you want to overwrite it with a basic HTML structure? (yes/no): ").strip().lower()
            if create_choice == 'yes':
                needs_structure_creation = True
            else:
                print("Aborting. Please ensure the file has the correct structure manually if you chose not to overwrite.")
                return
    else:
        print(f"'{target_html_file}' does not exist.")
        create_choice = input("Do you want to create it with a basic HTML structure? (yes/no): ").strip().lower()
        if create_choice == 'yes':
            needs_structure_creation = True
        else:
            print("Aborting. File not created.")
            return

    if needs_structure_creation:
        print(f"Creating basic HTML structure for '{target_html_file}'...")
        # Extract a title for the HTML page from the filename, e.g., "Page2" for page2.html
        page_base_name = os.path.splitext(os.path.basename(target_html_file))[0]
        page_title_for_html = f"Clarity for Humans (CFH) - {page_base_name.replace('-', ' ').title()}"
        html_content = get_basic_html_structure(page_title=page_title_for_html)
        # Write the basic structure immediately so we can insert into it
        with open(target_html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print("Basic structure created.")


    # 2. Get title from user
    post_title = input("Enter the title for your new post: ").strip()
    if not post_title:
        print("Error: Post title cannot be empty. Aborting.")
        return

    # 3. Get content from user (multiline input)
    print("Enter the content for your new post (type 'END' on a new line to finish):")
    post_content_lines = []
    while True:
        line = input()
        if line.strip().upper() == 'END':
            break
        post_content_lines.append(line)
    post_content = " ".join(post_content_lines).strip() # Join with space for single paragraph

    if not post_content:
        print("Error: Post content cannot be empty. Aborting.")
        return

    # Generate the HTML for the new post
    # Note: We are using simple <p> tags for content, assuming no Markdown parsing on the client side
    post_html = f"""
            <article class="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold text-teal-300 mb-2">{post_title}</h3>
                <div class="prose prose-invert max-w-none">
                    <p>{post_content}</p>
                </div>
            </article>
"""
    # Clean up indentation for insertion
    post_html_lines = [line.strip() for line in post_html.split('\n') if line.strip()]
    post_html = '\n            ' + '\n            '.join(post_html_lines) + '\n'

    try:
        # Read the (potentially newly created or updated) HTML content
        with open(target_html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Find the insertion point: right after <section id="posts-list">
        insertion_marker = '<section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
        
        # Find the index of the insertion marker
        insert_index = html_content.find(insertion_marker)

        if insert_index == -1:
            print(f"Error: Could not find the insertion marker '{insertion_marker}' in '{target_html_file}'.")
            print("This should not happen if basic structure was created or confirmed. Please check the file manually.")
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
        print("\n--- MANUAL PAGINATION STEP REMINDER ---")
        print("If you are implementing horizontal pagination, you will still need to manually:")
        print("1. Move older posts from one page to the next when a page gets 'full'.")
        print("2. Add/update 'Next Page' and 'Previous Page' navigation links on all affected HTML files.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    add_new_post_smart()
