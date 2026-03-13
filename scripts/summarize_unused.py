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
    print(f"Total Potentially Unused Images: {len(data)}")
    print("\nTop Unused Directories:")
    for d, c in sorted_dirs[:40]:
        print(f"  {d}: {c} files")
except Exception as e:
    print(f"Error: {e}")
