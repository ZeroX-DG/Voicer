(function() {
  window.__voicer.addModule("tabs", function(action) {
    const $ = window.jQuery;
    if (action === "new_tab") {
      return function(url) {
        chrome.runtime.sendMessage({ toSay: "Ok Opening a new tab" });
        window.__voicer
          .sendCommand("voicer:new_tab", { url })
          .then(window.__voicer.stop);
      };
    } else if (action === "switch_tab") {
      return function(tab) {
        chrome.runtime.sendMessage({ toSay: "Ok Switching tab" });
        window.__voicer
          .sendCommand("voicer:switch_tab", { tab })
          .then(window.__voicer.stop);
      };
    } else if (action === "close_tab") {
      return function() {
        chrome.runtime.sendMessage({ toSay: "Ok closing tab" });
        window.__voicer
          .sendCommand("voicer:close_current_tab")
          .then(window.__voicer.stop);
      };
    } else if (action === "go_back") {
      return function() {
        chrome.runtime.sendMessage({
          toSay: "Ok doing the Time Warp and going back"
        });
        history.back();
      };
    } else if (action === "go_forward") {
      return function() {
        chrome.runtime.sendMessage({ toSay: "Ok going forward" });
        history.forward();
      };
    } else if (action === "next_tab") {
      return function() {
        chrome.runtime.sendMessage({ toSay: "Ok Opening the next tab" });
        window.__voicer.sendCommand("voicer:next_tab");
      };
    } else if (action === "prev_tab") {
      return function() {
        chrome.runtime.sendMessage({ toSay: "Ok Opening the previous tab" });
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
