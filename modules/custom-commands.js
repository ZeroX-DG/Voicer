(function() {
  window.__voicer.addModule("custom-commands", function(action) {
    if (action.toLowerCase() == "open") {
      return function(url) {
        return function() {
          window.__voicer
            .sendCommand("voicer:new_tab", { url })
            .then(window.__voicer.stop);
        };
      };
    }
  });
  const modules = window.__voicer.modules;
  const voicer = window.__voicer;
  const actions = {};
  chrome.storage.sync.get(["customCommands"], function(data) {
    const commands = data.customCommands;
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command.action.toLowerCase() == "open") {
        actions[command.command] = modules["custom-commands"](command.action)(
          command.value
        );
      }
    }
    voicer.addCommand(actions);
  });
})();
