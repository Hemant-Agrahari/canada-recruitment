import json
import os

def main():
    json_file = r'd:\canada-recruitment\scripts\unused_uploads_list.json'
    
    if not os.path.exists(json_file):
        print(f"Error: {json_file} not found.")
        return

    try:
        with open(json_file, 'r') as f:
            unused_files = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    print(f"Starting deletion of {len(unused_files)} files from uploads...")
    
    deleted_count = 0
    error_count = 0
    
    for f_info in unused_files:
        path = f_info['full_path']
        if os.path.exists(path):
            try:
                os.remove(path)
                deleted_count += 1
            except Exception as e:
                print(f"Error deleting {path}: {e}")
                error_count += 1
        else:
            # print(f"File not found: {path}")
            pass

    print(f"\nDeletion complete.")
    print(f"Total deleted: {deleted_count}")
    print(f"Errors: {error_count}")

    # Clean up empty directories
    print("\nCleaning up empty directories in public/wp-content/uploads...")
    uploads_dir = r'd:\canada-recruitment\public\wp-content\uploads'
    if os.path.exists(uploads_dir):
        for root, dirs, files in os.walk(uploads_dir, topdown=False):
            for dir_name in dirs:
                dir_path = os.path.join(root, dir_name)
                try:
                    if not os.listdir(dir_path):
                        os.rmdir(dir_path)
                except:
                    pass

if __name__ == "__main__":
    main()
