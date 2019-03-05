(function() {
  window.__voicer.addWebActions("youtube", function(action) {
    const $ = window.jQuery;
    const searchBoxSelector = "#search input";
    const searchButtonSelector = "#search-icon-legacy";
    const videoSelector = function() {
      if (window.location.pathname === "/") {
        return "ytd-grid-video-renderer";
      }
      return "ytd-compact-video-renderer, ytd-compact-radio-renderer, ytd-video-renderer";
    };
    const addBorder = function(el) {
      $(el).css("border", "1px solid red");
    };
    const removeBorder = function(el) {
      $(el).css("border", "1px solid transparent");
    };

    const handleNextVideo = function() {
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
    };

    const handlePrevVideo = function() {
      if (!window.__youtube_index) {
        window.__youtube_index = -1;
      }
      return function() {
        let currentVideo = $(videoSelector())[window.__youtube_index];
        removeBorder(currentVideo);
        window.__youtube_index--;
        if (window.__youtube_index < 0) {
          window.__youtube_index = 0;
        }
        currentVideo = $(videoSelector())[window.__youtube_index];
        addBorder(currentVideo);
      };
    };

    const handleGotoVideo = function() {
      return function() {
        if (
          window.__youtube_index === undefined ||
          window.__youtube_index === -1
        ) {
          return;
        }
        const currentVideo = $(videoSelector())[window.__youtube_index];
        removeBorder(currentVideo);
        window.__youtube_index = -1;
        const link = currentVideo.querySelector("a");
        // prevent client side redirection
        window.location.href = link.href;
      };
    };

    const handleSearchInput = function() {
      return function(text) {
        $(searchBoxSelector).val(text);
      };
    };

    const handleSearchGo = function() {
      return function() {
        $(searchButtonSelector).trigger("click");
      };
    };

    if (window.location.hostname == "www.youtube.com") {
      if (action === "next_video") {
        return handleNextVideo();
      } else if (action === "go") {
        return handleGotoVideo();
      } else if (action === "prev_video") {
        return handlePrevVideo();
      } else if (action === "search_input") {
        return handleSearchInput();
      } else if (action === "search_go") {
        return handleSearchGo();
      }
    }
  });

  const webActions = window.__voicer.webActions;

  window.__voicer.addCommand({
    "next video": webActions["youtube"]("next_video"),
    "previous video": webActions["youtube"]("prev_video"),
    "enter *text": webActions["youtube"]("search_input"),
    "find it": webActions["youtube"]("search_go"),
    go: webActions["youtube"]("go")
  });
})();
