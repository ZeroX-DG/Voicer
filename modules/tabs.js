(function() {
  window.__voicer.addModule("tabs", function(action) {
    const $ = window.jQuery;
    if (action === "new_tab") {
      return function(url) {
        window.__voicer
          .sendCommand("voicer:new_tab", { url })
          .then(window.__voicer.stop);
      };
    } else if (action === "switch_tab") {
      return function(tab) {
        window.__voicer
          .sendCommand("voicer:switch_tab", { tab })
          .then(window.__voicer.stop);
      };
    } else if (action === "close_tab") {
      return function() {
        window.__voicer
          .sendCommand("voicer:close_current_tab")
          .then(window.__voicer.stop);
      };
    } else if (action === "go_back") {
      return function() {
        history.back();
      };
    } else if (action === "go_forward") {
      return function() {
        history.forward();
      };
    } else if (action === "next_tab") {
      return function() {
        window.__voicer
          .sendCommand("voicer:next_tab")
          .then(window.__voicer.stop);
      };
    } else if (action === "prev_tab") {
      return function() {
        window.__voicer
          .sendCommand("voicer:prev_tab")
          .then(window.__voicer.stop);
      };
    }
  });

  const modules = window.__voicer.modules;

  window.__voicer.addCommand({
    "new tab *url": modules["tabs"]("new_tab"),
    "switch tab *tab": modules["tabs"]("switch_tab"),
    "close tab": modules["tabs"]("close_tab"),
    "go back": modules["tabs"]("go_back"),
    "go forward": modules["tabs"]("go_forward"),
    "next tab": modules["tabs"]("next_tab"),
    "previous tab": modules["tabs"]("prev_tab")
  });
})();
