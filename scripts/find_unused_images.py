import os
import re
import json

def get_all_images(public_dir):
    images = []
    extensions = ('.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico')
    for root, _, files in os.walk(public_dir):
        for file in files:
            if file.lower().endswith(extensions):
                rel_path = os.path.relpath(os.path.join(root, file), public_dir)
                web_path = rel_path.replace(os.sep, '/')
                images.append({
                    'full_path': os.path.join(root, file),
                    'web_path': web_path,
                    'filename': file
                })
    return images

def find_references(search_dirs):
    all_content = ""
    extensions = ('.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json', '.html')
    for search_dir in search_dirs:
        if not os.path.exists(search_dir):
            continue
        for root, _, files in os.walk(search_dir):
            for file in files:
                if file.lower().endswith(extensions):
                    try:
                        with open(os.path.join(root, file), 'r', encoding='utf-8', errors='ignore') as f:
                            all_content += f.read() + "\n"
                    except:
                        pass
    return all_content

def main():
    base_dir = r'd:\canada-recruitment'
    public_dir = os.path.join(base_dir, 'public')
    search_dirs = [
        os.path.join(base_dir, 'src'),
        os.path.join(public_dir, 'assets', 'css'),
        os.path.join(public_dir, 'assets', 'js')
    ]
    
    print(f"Gathering image list from {public_dir}...")
    images = get_all_images(public_dir)
    print(f"Found {len(images)} images.")
    
    print("Scanning codebase for references...")
    codebase_content = find_references(search_dirs)
    
    unused = []
    used_count = 0
    
    protected = ['favicon.ico', 'favicon.png', 'robots.txt', 'sitemap.xml']
    
    for img in images:
        if img['filename'] in protected:
            used_count += 1
            continue
            
        if img['filename'] in codebase_content or img['web_path'] in codebase_content:
            used_count += 1
        else:
            unused.append(img)
            
    print(f"Checked {len(images)} images. {used_count} appear to be used, {len(unused)} appear to be unused.")
    
    dirs_unused = {}
    for img in unused:
        dir_name = os.path.dirname(img['web_path'])
        if not dir_name: dir_name = "(root)"
        if dir_name not in dirs_unused:
            dirs_unused[dir_name] = 0
        dirs_unused[dir_name] += 1
        
    print("\nSummary of potentially unused images by directory:")
    sorted_dirs = sorted(dirs_unused.items(), key=lambda x: x[1], reverse=True)
    for d, count in sorted_dirs[:20]:
        print(f"  {d}: {count} unused files")
        
    if len(sorted_dirs) > 20:
        print(f"  ... and {len(sorted_dirs) - 20} more directories.")

    result_file = os.path.join(base_dir, 'scripts', 'unused_images_list.json')
    with open(result_file, 'w') as f:
        json.dump(unused, f, indent=2)
    print(f"\nDetailed list saved to {result_file}")

if __name__ == "__main__":
    main()
