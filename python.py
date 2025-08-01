# manage_posts.py
# This script automates adding new posts to a SPECIFIED HTML file.
# It also automates the creation of basic HTML structure for new pages
# and, crucially, automates updating pagination navigation links across ALL pages.

import os
import re

# --- Configuration ---
POSTS_SECTION_START_MARKER = '<section id="posts-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
POSTS_SECTION_END_MARKER = '</section>'
PAGINATION_NAV_PLACEHOLDER = '<!-- PAGINATION_NAV_PLACEHOLDER -->'

# --- HTML Boilerplate ---
def get_basic_html_structure(page_title="Clarity for Humans (CFH) Page"):
    """Returns a string containing the basic HTML boilerplate for a new page,
    including the navigation placeholder and the Google AdSense code."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{page_title}</title>
    <!-- Your Google AdSense code for site verification and ad serving -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9639641669479788"
     crossorigin="anonymous"></script>
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
                {PAGINATION_NAV_PLACEHOLDER}
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

def read_html_file(filepath):
    """Reads content from an HTML file."""
    if not os.path.exists(filepath):
        return None
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_html_file(filepath, content):
    """Writes content to an HTML file."""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_posts_from_html(html_content):
    """Extracts all <article> post HTML blocks from the posts-list section."""
    start_index = html_content.find(POSTS_SECTION_START_MARKER)
    end_index = html_content.find(POSTS_SECTION_END_MARKER, start_index)

    if start_index == -1 or end_index == -1:
        return [] # No posts section found

    posts_section = html_content[start_index + len(POSTS_SECTION_START_MARKER):end_index]
    
    # Use regex to find all <article> blocks
    return re.findall(r'<article.*?<\/article>', posts_section, re.DOTALL)

def replace_posts_in_html(html_content, new_posts_html):
    """Replaces the content within the posts-list section with new posts HTML."""
    start_index = html_content.find(POSTS_SECTION_START_MARKER)
    end_index = html_content.find(POSTS_SECTION_END_MARKER, start_index)

    if start_index == -1 or end_index == -1:
        print("Error: Posts section markers not found for replacement.")
        return html_content

    # Calculate the position right after the closing '>' of the start marker
    insert_position = start_index + len(POSTS_SECTION_START_MARKER)

    # Insert the new post HTML, maintaining indentation
    # Ensure lines are properly indented within the HTML structure
    indented_posts_html = '\n'.join(['            ' + line for line in new_posts_html.split('\n')])
    
    updated_html_content = (
        html_content[:insert_position] +
        indented_posts_html + '\n' + # Add a newline after posts
        html_content[end_index:]
    )
    return updated_html_content

def update_pagination_nav_for_page(html_content, current_page_file, total_pages):
    """Updates the pagination navigation links in the HTML content for a single page."""
    nav_links = []
    current_page_num = 1
    if current_page_file.lower() != 'index.html':
        try:
            current_page_num = int(re.search(r'page(\d+)\.html', current_page_file, re.IGNORECASE).group(1))
        except (AttributeError, ValueError):
            print(f"Warning: Could not determine page number for {current_page_file}. Skipping pagination links for this page.")
            return html_content # Return original content if page number can't be parsed

    if current_page_num > 1:
        prev_page_file = 'index.html' if current_page_num == 2 else f'page{current_page_num - 1}.html'
        nav_links.append(f'<a href="{prev_page_file}" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">&larr; Page {current_page_num - 1}</a>')
    
    if current_page_num < total_pages:
        next_page_file = f'page{current_page_num + 1}.html'
        nav_links.append(f'<a href="{next_page_file}" class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200">Page {current_page_num + 1} &rarr;</a>')

    pagination_html = '            ' + ' '.join(nav_links) # Indent and join links

    # Replace the placeholder, ensuring it's only replaced once
    return html_content.replace(PAGINATION_NAV_PLACEHOLDER, pagination_html, 1)

def _rebuild_all_pagination_links():
    """
    Scans all existing HTML pages (index.html, page2.html, etc.)
    and updates their pagination navigation links.
    """
    print("\n--- Updating All Pagination Links ---")
    
    existing_pages = []
    page_num = 1
    while True:
        filename = 'index.html' if page_num == 1 else f'page{page_num}.html'
        if os.path.exists(filename):
            existing_pages.append(filename)
            page_num += 1
        else:
            break
    
    if not existing_pages:
        print("No HTML pages found to update pagination links. Please create index.html first.")
        return

    total_pages = len(existing_pages)
    
    for i, filename in enumerate(existing_pages):
        current_page_num = i + 1 # 1-based page number
        html_content = read_html_file(filename)

        if html_content is None:
            print(f"Warning: Could not read '{filename}'. Skipping link update for this page.")
            continue

        # Ensure the placeholder exists for replacement
        if PAGINATION_NAV_PLACEHOLDER not in html_content:
            print(f"Warning: '{PAGINATION_NAV_PLACEHOLDER}' not found in '{filename}'. Adding it.")
            # Simple insertion after the last </a> in the nav for existing pages that might not have it
            nav_end_index = html_content.find('</nav>')
            if nav_end_index != -1:
                html_content = html_content[:nav_end_index] + '\n                ' + PAGINATION_NAV_PLACEHOLDER + '\n            ' + html_content[nav_end_index:]
            else:
                print(f"Error: Could not find </nav> in '{filename}'. Cannot insert pagination placeholder.")
                continue

        updated_html_content = update_pagination_nav_for_page(html_content, filename, total_pages)
        write_html_file(filename, updated_html_content)
        print(f"Updated pagination links for '{filename}'.")

    print("All pagination links updated across all pages.")


# --- Main Logic ---
def manage_posts():
    """
    Main function to add new posts, manage pagination, and update navigation.
    """
    print("\n--- Clarity for Humans (CFH) Post Manager ---")

    # 1. Get new post details
    post_title = input("Enter the title for your new post: ").strip()
    if not post_title:
        print("Error: Post title cannot be empty. Aborting.")
        return

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

    new_post_html = f"""
            <article class="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold text-teal-300 mb-2">{post_title}</h3>
                <div class="prose prose-invert max-w-none">
                    <p>{post_content}</p>
                </div>
            </article>
"""
    # Clean up indentation for insertion
    new_post_html_lines = [line.strip() for line in new_post_html.split('\n') if line.strip()]
    new_post_html = '\n'.join(new_post_html_lines) # No leading indent here, handled by replace_posts_in_html


    # 2. Get target HTML file from user and handle basic structure
    target_html_file = input("Enter the HTML file name to add the post to (e.g., index.html, page2.html): ").strip()
    if not target_html_file.lower().endswith('.html'):
        target_html_file += '.html' # Ensure .html extension

    html_content = ""
    file_exists = os.path.exists(target_html_file)
    needs_structure_creation = False

    if file_exists:
        with open(target_html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Check for essential tags to determine if basic structure is present
        if not all(tag in html_content for tag in ['<html', '<head', '<body', POSTS_SECTION_START_MARKER, PAGINATION_NAV_PLACEHOLDER]):
            print(f"Warning: '{target_html_file}' exists but seems to be missing a basic HTML structure or pagination placeholder.")
            create_choice = input(f"Do you want to overwrite '{target_html_file}' with a basic HTML structure? (yes/no): ").strip().lower()
            if create_choice == 'yes':
                needs_structure_creation = True
            else:
                print("Aborting. Please ensure the file has the correct structure and PAGINATION_NAV_PLACEHOLDER manually if you chose not to overwrite.")
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
        page_base_name = os.path.splitext(os.path.basename(target_html_file))[0]
        page_title_for_html = f"Clarity for Humans (CFH) - {page_base_name.replace('-', ' ').title()}"
        html_content = get_basic_html_structure(page_title=page_title_for_html)
        write_html_file(target_html_file, html_content) # Write immediately to prepare for post insertion
        print("Basic structure created.")


    # 3. Read the (potentially newly created or updated) HTML content for insertion
    html_content = read_html_file(target_html_file)
    if html_content is None: # Should not happen if previous steps were successful
        print(f"Error: Could not read '{target_html_file}' for post insertion. Aborting.")
        return

    # Find the insertion point: right after <section id="posts-list">
    insert_index = html_content.find(POSTS_SECTION_START_MARKER)
    if insert_index == -1:
        print(f"Error: Could not find the insertion marker '{POSTS_SECTION_START_MARKER}' in '{target_html_file}'.")
        print("Please ensure your HTML file has the exact <section id=\"posts-list\"...> tag.")
        return

    # Extract existing posts from the target file to re-insert after the new one
    existing_posts_on_page = extract_posts_from_html(html_content)
    
    # Calculate the position right after the closing '>' of the marker
    insert_position = insert_index + len(POSTS_SECTION_START_MARKER)

    # Insert the new post HTML at the top of the posts-list section
    # followed by the existing posts on that page
    all_posts_for_this_page = [new_post_html] + existing_posts_on_page
    posts_html_for_this_page = '\n'.join(all_posts_for_this_page)

    updated_html_content = replace_posts_in_html(html_content, posts_html_for_this_page)

    # Write the updated content back to the HTML file (before pagination links are touched)
    write_html_file(target_html_file, updated_html_content)
    print(f"\nSuccessfully added '{post_title}' to '{target_html_file}'.")


    # 4. Prompt for full pagination links update
    update_nav_choice = input("Do you want to update pagination links across ALL pages now? (yes/no): ").strip().lower()

    if update_nav_choice == 'yes':
        _rebuild_all_pagination_links()
    else:
        print("Pagination links not updated. Remember to run the script and choose 'yes' to update them later.")

    print("Remember to commit ALL modified and newly created HTML files to GitHub for your website to update!")

if __name__ == "__main__":
    manage_posts()
