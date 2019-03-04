(function () {
  window.__voicer.addModule("zoom", function(direction) {
    const $ = window.jQuery;
    if (direction === "in") {
      return function() {
        const currentZoom = parseFloat($("body").css("zoom"));
        $("body").animate({ zoom: currentZoom * 2 }, 800);
      };
    } else if (direction === "out") {
      return function() {
        const currentZoom = parseFloat($("body").css("zoom"));
        $("body").animate({ zoom: currentZoom / 2 }, 800);
      };
    }
  });

  const modules = window.__voicer.modules;

  window.__voicer.addCommand({
    "zoom in": modules["zoom"]("in"),
    "zoom out": modules["zoom"]("out")
  });
})()