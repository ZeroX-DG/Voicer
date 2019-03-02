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
  }
});
