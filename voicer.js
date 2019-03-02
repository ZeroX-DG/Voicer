(function() {
  const modules = window.__voicer.modules;
  const webActions = window.__voicer.webActions;
  // BEGIN INIT DEFAULT COMMANDS
  // ============================
  // Scroll actions
  window.__voicer.addCommand({
    "scroll up": modules["scroll"]("up"),
    "scroll down": modules["scroll"]("down")
  });
  // ============================
  // Zoom actions
  window.__voicer.addCommand({
    "zoom in": modules["zoom"]("in"),
    "zoom out": modules["zoom"]("out")
  });
  // ============================
  // Tabs actions
  window.__voicer.addCommand({
    "new tab *url": modules["tabs"]("new_tab"),
    "switch tab *tab": modules["tabs"]("switch_tab"),
    "close tab": modules["tabs"]("close_tab"),
    "go back": modules["tabs"]("go_back"),
    "go forward": modules["tabs"]("go_forward")
  });

  // BEGIN INIT WEBSITE-SPECIFIC COMMANDS
  // ============================
  // Google
  window.__voicer.addCommand({
    "input *text": webActions["google"]("input"),
    go: webActions["google"]("go")
  });

  window.__voicer.start();
})();
