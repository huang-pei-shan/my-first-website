let playlist = [];
let player;

// 取得 URL 的參數 (playlist name)
const urlParams = new URLSearchParams(window.location.search);
const playlistName = urlParams.get("name");

// 在頁面顯示歌單名稱
document.getElementById("playlist-title").innerText = playlistName + " 歌單";

// 讀取 JSON 歌單
fetch(`data/${playlistName}.json`)
  .then(res => res.json())
  .then(data => {
    playlist = data;
    initPlayer();
  });

function initPlayer() {
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: getRandomSong().videoId,
      events: {
        onReady: onPlayerReady
      }
    });
  };
}

function onPlayerReady() {
  updateSongInfo(player.getVideoData().video_id);
  player.playVideo();
}

// 取得隨機歌曲
function getRandomSong() {
  return playlist[Math.floor(Math.random() * playlist.length)];
}

// 下一首歌
function nextSong() {
  const next = getRandomSong();
  player.loadVideoById(next.videoId);
  updateSongInfo(next.videoId);
}

// 顯示歌名與秒數
function updateSongInfo(videoId) {
  const song = playlist.find(s => s.videoId === videoId);
  document.getElementById("song-title").innerText = song.title;

  // 取得長度（需要 YouTube API KEY）
  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=你的API_KEY`)
    .then(res => res.json())
    .then(data => {
      const duration = data.items[0].contentDetails.duration; // ISO 8601 格式
      document.getElementById("song-duration").innerText = "長度：" + isoToSeconds(duration) + " 秒";
    });
}

function isoToSeconds(iso) {
  const match = iso.match(/PT(\d+M)?(\d+S)?/);
  const minutes = match[1] ? parseInt(match[1]) : 0;
  const seconds = match[2] ? parseInt(match[2]) : 0;
  return minutes * 60 + seconds;
}
