import os
import re
import json

def get_all_files(target_dir):
    files_list = []
    for root, _, files in os.walk(target_dir):
        for file in files:
            rel_path = os.path.relpath(os.path.join(root, file), r'd:\canada-recruitment\public')
            web_path = rel_path.replace(os.sep, '/')
            files_list.append({
                'full_path': os.path.join(root, file),
                'web_path': web_path,
                'filename': file
            })
    return files_list

def find_references(search_dirs):
    all_content = ""
    # Include all common text-based source files
    extensions = ('.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json', '.html', '.xml')
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
    uploads_dir = os.path.join(base_dir, 'public', 'wp-content', 'uploads')
    search_dirs = [
        os.path.join(base_dir, 'src'),
        os.path.join(base_dir, 'public', 'assets'), # check assets too in case they reference uploads
        os.path.join(base_dir, 'public', 'wp-content') # excluding the uploads dir content itself but checking others
    ]
    
    print(f"Gathering all files from {uploads_dir}...")
    all_files = get_all_files(uploads_dir)
    print(f"Found {len(all_files)} files in uploads folder.")
    
    print("Scanning codebase for references...")
    codebase_content = find_references(search_dirs)
    
    unused = []
    used_count = 0
    
    for f_info in all_files:
        # Check if filename or web path is in codebase
        # We also check for the path starting with /wp-content/uploads/
        web_path = f_info['web_path']
        if not web_path.startswith('/'):
            web_path = '/' + web_path
            
        if f_info['filename'] in codebase_content or f_info['web_path'] in codebase_content or web_path in codebase_content:
            used_count += 1
        else:
            unused.append(f_info)
            
    print(f"Checked {len(all_files)} files. {used_count} appear to be used, {len(unused)} appear to be unused.")
    
    result_file = os.path.join(base_dir, 'scripts', 'unused_uploads_list.json')
    with open(result_file, 'w') as f:
        json.dump(unused, f, indent=2)
    print(f"Summary saved to {result_file}")

if __name__ == "__main__":
    main()
