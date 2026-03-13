import json, os
try:
    with open(r'd:\canada-recruitment\scripts\unused_images_list.json', 'r') as f:
        data = json.load(f)
    dirs = {}
    for i in data:
        d = os.path.dirname(i['web_path'])
        if not d: d = "(root)"
        dirs[d] = dirs.get(d, 0) + 1
    
    sorted_dirs = sorted(dirs.items(), key=lambda x: x[1], reverse=True)
    with open(r'd:\canada-recruitment\scripts\summary.txt', 'w') as f:
        f.write(f"Total Potentially Unused Images: {len(data)}\n")
        f.write("\nTop Unused Directories (Candidate for removal):\n")
        for d, c in sorted_dirs[:50]:
            f.write(f"  {d}: {c} files\n")
except Exception as e:
    with open(r'd:\canada-recruitment\scripts\summary.txt', 'w') as f:
        f.write(f"Error: {e}")
