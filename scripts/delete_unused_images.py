import json
import os

def main():
    json_file = r'd:\canada-recruitment\scripts\unused_images_list.json'
    
    if not os.path.exists(json_file):
        print(f"Error: {json_file} not found.")
        return

    try:
        with open(json_file, 'r') as f:
            unused_images = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    print(f"Starting deletion of {len(unused_images)} files...")
    
    deleted_count = 0
    error_count = 0
    
    for img in unused_images:
        path = img['full_path']
        if os.path.exists(path):
            try:
                os.remove(path)
                deleted_count += 1
                if deleted_count % 500 == 0:
                    print(f"Deleted {deleted_count} files...")
            except Exception as e:
                print(f"Error deleting {path}: {e}")
                error_count += 1
        else:
            # print(f"File not found: {path}")
            pass

    print(f"\nDeletion complete.")
    print(f"Total deleted: {deleted_count}")
    print(f"Errors: {error_count}")

    # Optional: Clean up empty directories
    print("\nCleaning up empty directories in public/wp-content and public/assets...")
    cleanup_dirs = [
        r'd:\canada-recruitment\public\wp-content',
        r'd:\canada-recruitment\public\assets'
    ]
    
    for top_dir in cleanup_dirs:
        for root, dirs, files in os.walk(top_dir, topdown=False):
            for dir_name in dirs:
                dir_path = os.path.join(root, dir_name)
                try:
                    if not os.listdir(dir_path):
                        os.rmdir(dir_path)
                except:
                    pass

if __name__ == "__main__":
    main()
