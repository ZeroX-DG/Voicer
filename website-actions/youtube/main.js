window.__voicer.addWebActions("youtube", function(action) {
  const $ = window.jQuery;
  if (window.location.hostname == "www.youtube.com") {
    if (action === "next_video") {
      if (!window.__youtube_index) {
        window.__youtube_index = -1;
      }
      return function() {
        const currentVideo = $(
          "ytd-compact-video-renderer, ytd-compact-radio-renderer"
        )[window.__youtube_index];
        $(currentVideo).css("border", "1px solid transparent");
        window.__youtube_index++;
        const nextVideo = $(
          "ytd-compact-video-renderer, ytd-compact-radio-renderer"
        )[window.__youtube_index];
        $(nextVideo).css("border", "1px solid red");
      };
    } else if (action === "go") {
      return function() {
        const currentVideo = $(
          "ytd-compact-video-renderer, ytd-compact-radio-renderer"
        )[window.__youtube_index];
        $(currentVideo).css("border", "1px solid transparent");
        window.__youtube_index = -1;
        currentVideo.querySelector("a").click();
      };
    }
  }
});
