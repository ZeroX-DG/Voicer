(function() {
  window.__voicer.addModule("other", function(action) {
    if (action == "help") {
      return function() {
        window.__voicer
          .sendCommand("voicer:new_tab", { url: "help" })
          .then(window.__voicer.stop);
      };
    }
  });
  const modules = window.__voicer.modules;

  window.__voicer.addCommand({
    "show help": modules["other"]("help")
  });
})();
