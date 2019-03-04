(function () {
  window.__voicer.addModule("scroll", function(direction) {
    const $ = window.jQuery;
    if (direction === "up") {
      return function() {
        $("body,html").animate({ scrollTop: $("html").scrollTop() - 500 }, 800);
      };
    } else if (direction === "down") {
      return function() {
        $("body,html").animate({ scrollTop: $("html").scrollTop() + 500 }, 800);
      };
    }
  });

  const modules = window.__voicer.modules;

  window.__voicer.addCommand({
    "scroll up": modules["scroll"]("up"),
    "scroll down": modules["scroll"]("down")
  });
})();