(function() {
  window.__voicer.addModule("scroll", function(direction) {
    const $ = window.jQuery;
    if (direction === "up") {
      return function() {
        chrome.runtime.sendMessage({ toSay: "Ok scrolling Up" });
        chrome.storage.sync.get(["Scroll_amount", "Scroll_Speed"], function(
          data
        ) {
          const scrollAmount = parseInt(data.Scroll_amount);
          const scrollSpeed = parseInt(data.Scroll_Speed);
          $("body,html").animate(
            { scrollTop: $("html").scrollTop() - scrollAmount },
            scrollSpeed
          );
        });
      };
    } else if (direction === "down") {
      return function() {
        chrome.runtime.sendMessage({ toSay: "Ok scrolling Down" });
        chrome.storage.sync.get(["Scroll_amount", "Scroll_Speed"], function(
          data
        ) {
          const scrollAmount = parseInt(data.Scroll_amount);
          const scrollSpeed = parseInt(data.Scroll_Speed);

          $("body,html").animate(
            { scrollTop: $("html").scrollTop() + scrollAmount },
            scrollSpeed
          );
        });
      };
    }
  });

  const modules = window.__voicer.modules;

  window.__voicer.addCommand({
    "scroll up": modules["scroll"]("up"),
    "scroll down": modules["scroll"]("down")
  });
})();
