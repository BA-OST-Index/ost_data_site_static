// https://bobbyhadz.com/blog/get-youtube-id-from-url-using-javascript
function getYoutubeIDfromURL(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  console.log('The supplied URL is not a valid youtube URL');
  return '';
}

// ref: https://stackoverflow.com/questions/39334400/how-to-split-url-to-get-url-path-in-javascript
// also getYouTubeIDfromURL (defined above)
function getBilibiliIDfromURL(url) {
    const a_element = document.createElement("a");
    a_element.href = url;
    return a_element.pathname.split("/")[2];
}

var resizeAllEmbeddedPlayers = function() {
    var width = document.body.clientWidth;
    var resizeSinglePlayer = function (player, width, height) {
        player.style.width = width + "px";
        player.style.height = height + "px";
    }
    var allEmbeddedPlayers = document.getElementsByClassName("track-video-player");
    var actualWidth, actualHeight;

    /* stupid infobox copied from Wikipedia */
    if (width > 992) {
        actualWidth = width * 0.4;
        actualHeight = actualWidth / 16 * 9;
    }
    else {
        /* the site itself, adaptive web */
        if (width > 960) {
            actualWidth = width * 0.6;
            actualHeight = actualWidth / 16 * 9;
        }
        else {
            /* the site itself, adaptive web */
            if (width > 480) {
                actualWidth = width - 50 * 2;
                actualHeight = actualWidth / 16 * 9;
            }
            /* the site itself, adaptive web */
            else {
                actualWidth = width - 15 * 2;
                actualHeight = actualWidth / 16 * 9;
            }
        }
    }

    for (let i = 0; i < allEmbeddedPlayers.length; i++) {
        resizeSinglePlayer(allEmbeddedPlayers[i], actualWidth, actualHeight);
    }
}

function playEmbeddedVideo(video_url, element_id) {
    document.getElementById(element_id).style.display = "none";
    var container = document.getElementById(element_id + "-container");
    var videoID;
    if (video_url.includes("youtu")) {
        videoID = getYoutubeIDfromURL(video_url);
        container.innerHTML = "<iframe src=\"https://www.youtube-nocookie.com/embed/" + videoID + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen class=\"track-video-player\"></iframe>";
    }
    else {
        if (video_url.includes("bilibili")) {
            videoID = getBilibiliIDfromURL(video_url);
            let videoPageID = getParameterByName("p", video_url);
            if (videoPageID === null) {videoPageID = "1";}
            container.innerHTML = "<iframe src=\"https://player.bilibili.com/player.html?bvid=" + videoID + "&p=" + videoPageID + "\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\" class=\"track-video-player\"> </iframe>";
        }
    }
    resizeAllEmbeddedPlayers();
}

addEventListener('load', function() {resizeAllEmbeddedPlayers();})
addEventListener('resize', function () {resizeAllEmbeddedPlayers();})