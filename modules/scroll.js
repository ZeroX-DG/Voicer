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
