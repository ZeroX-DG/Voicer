window.__voicer = (function() {
  const $ = window.jQuery;
  const annyang = window.annyang;
  const modules = {};
  const webActions = {};

  const sendCommand = function(command, data) {
    return new Promise(resolve => {
      chrome.runtime.sendMessage(Object.assign({}, { command }, data), function(
        response
      ) {
        resolve(response);
      });
    });
  };

  const addCommand = function(command) {
    annyang.addCommands(command);
  };

  const addModule = function(moduleName, moduleFn) {
    modules[moduleName] = moduleFn;
  };

  const addWebActions = function(webName, webActionFn) {
    webActions[webName] = webActionFn;
  };

  const start = function() {
    const res = document.createElement("div");
    res.className = "recog-result";
    document.body.appendChild(res);

    if (annyang) {
      annyang.addCallback("result", result => {
        const bestMatch = result[0];
        $(".recog-result").text(bestMatch);
        $(".recog-result").css("display", "block");
        setTimeout(() => $(".recog-result").css("display", "none"), 5000);
      });
      annyang.addCallback("resultMatch", result => {
        const bestMatch = result;
        $(".recog-result").text(bestMatch);
        $(".recog-result").css("display", "block");
        setTimeout(() => $(".recog-result").css("display", "none"), 5000);
      });
      chrome.runtime.onMessage.addListener(function(request) {
        if (request.voiceOn) annyang.start({ continuous: false });
      });
      annyang.start({ continuous: false });
    }
  };

  const stop = function() {
    annyang.abort();
  };

  return {
    start,
    stop,
    addCommand,
    sendCommand,
    addModule,
    addWebActions,
    modules,
    webActions
  };
})();
