import os
import shutil

def delete_caches(directory="."):
    for root, dirs, files in os.walk(directory):
        if "__pycache__" in dirs:
            cache_dir = os.path.join(root, "__pycache__")
            print(f"Deleting: {cache_dir}")
            shutil.rmtree(cache_dir)
        for file in files:
            if file.endswith(".pyc"):
                pyc_file = os.path.join(root, file)
                print(f"Deleting: {pyc_file}")
                os.remove(pyc_file)

delete_caches()
