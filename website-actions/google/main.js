(function () {
  window.__voicer.addWebActions("google", function(action) {
    const $ = window.jQuery;
    if (window.location.hostname == "www.google.com") {
      if (action === "input") {
        return function(text) {
          $(
            "#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input"
          ).val(text);
        };
      } else if (action === "go") {
        return function() {
          $(
            '#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input[type="submit"]:nth-child(1)'
          ).trigger("click");
        };
      }
    }
  });

  const webActions = window.__voicer.webActions;

  window.__voicer.addCommand({
    "input *text": webActions["google"]("input"),
    go: webActions["google"]("go")
  });
})();