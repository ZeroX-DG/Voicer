(function () {
  window.__voicer.addWebActions("youtube", function(action) {
    const $ = window.jQuery;
    const videoSelector = function () {
      if (location.pathname === "/") {
        return "ytd-grid-video-renderer";
      }
      return "ytd-compact-video-renderer, ytd-compact-radio-renderer";
    }
    const addBorder = function (el) {
      $(el).css("border", "1px solid red");
    }
    const removeBorder = function (el) {
      $(el).css("border", "1px solid transparent");
    }

    const handleNextVideo = function () {
      if (!window.__youtube_index) {
        window.__youtube_index = -1;
      }
      return function() {
        let currentVideo = $(videoSelector())[window.__youtube_index];
        removeBorder(currentVideo);
        window.__youtube_index++;
        currentVideo = $(videoSelector())[window.__youtube_index];
        addBorder(currentVideo);
      };
    }

    const handlePrevVideo = function () {
      if (!window.__youtube_index) {
        window.__youtube_index = -1;
      }
      return function() {
        let currentVideo = $(videoSelector())[window.__youtube_index];
        removeBorder(currentVideo);
        window.__youtube_index--;
        currentVideo = $(videoSelector())[window.__youtube_index];
        addBorder(currentVideo);
      };
    }

    const handleGotoVideo = function () {
      return function() {
        if (!window.__youtube_index || window.__youtube_index === -1) {
          return;
        }
        const currentVideo = $(videoSelector())[window.__youtube_index];
        removeBorder(currentVideo);
        window.__youtube_index = -1;
        currentVideo.querySelector("a").click();
      };
    }

    if (window.location.hostname == "www.youtube.com") {
      if (action === "next_video") {
        return handleNextVideo();
      } else if (action === "go") {
        return handleGotoVideo();
      } else if (action === "prev_video") {
        return handlePrevVideo();
      }
    }
  });

  const webActions = window.__voicer.webActions;

  window.__voicer.addCommand({
    "next video": webActions["youtube"]("next_video"),
    "previous video": webActions["youtube"]("prev_video")
    go: webActions["youtube"]("go")
  });
})();