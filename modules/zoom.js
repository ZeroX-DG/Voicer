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
