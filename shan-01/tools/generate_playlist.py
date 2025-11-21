import json

playlists = {
    "chill": [
        "https://www.youtube.com/watch?v=5qap5aO4i9A",
        "https://www.youtube.com/watch?v=DWcJFNfaw9c"
    ],
    "rock": [
        "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        "https://www.youtube.com/watch?v=ktvTqknDobU"
    ],
    "lofi": [
        "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        "https://www.youtube.com/watch?v=kgx4WGK0oNU"
    ]
}

# 把 YouTube URL 轉成影片ID
def extract_id(url):
    import re
    match = re.search(r"v=([A-Za-z0-9_-]+)", url)
    return match.group(1) if match else None

playlist_processed = {
    name: [extract_id(url) for url in urls]
    for name, urls in playlists.items()
}

with open("../playlists/playlist.json", "w") as f:
    json.dump(playlist_processed, f, indent=4)

print("playlist.json 已建立！")
