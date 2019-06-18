(function() {
  window.__voicer.addWebActions("google", function(action) {
    const $ = window.jQuery;
    const searchBoxSelector =
      "#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input";
    const searchButtonSelector1 =
      '#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input[type="submit"]:nth-child(1)';
    const searchButtonSelector2 =
      "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > button";
    const searchResultSelector1 = ".g:not(.kno-kp):not(.g-blk)";
    const searchResultSelector2 = ".kp-blk";
    const addBorder = function(el) {
      $(el).css("border", "1px solid red");
    };
    const removeBorder = function(el) {
      $(el).css("border", "1px solid transparent");
    };

    if (window.location.hostname == "www.google.com") {
      if (action === "input") {
        return function(text) {
	      chrome.runtime.sendMessage({toSay: "Ok we will type that for you now"});
          $(searchBoxSelector).val(text);
        };
      } else if (action === "find") {
        return function() {
		chrome.runtime.sendMessage({toSay: "Ok we will search that for you now"});
          $(searchButtonSelector1).trigger("click");
          $(searchButtonSelector2).trigger("click");
        };
      } else if (action === "next_result") {
        if (!window.__google_index) {
          window.__google_index = -1;
        }
        return function() {
		  chrome.runtime.sendMessage({toSay: "Ok selecting next result"});
          const result1 = Array.prototype.slice.call(
            document.querySelectorAll(searchResultSelector1)
          );
          const result2 = [document.querySelector(searchResultSelector2)];
          const allResults = [].concat(result2, result1);
          let currentResult = allResults[window.__google_index];
          removeBorder(currentResult);
          window.__google_index++;
          if (window.__google_index === allResults.length) {
            window.__google_index = allResults.length - 1;
          }
          currentResult = allResults[window.__google_index];
          addBorder(currentResult);
        };
      } else if (action === "prev_result") {
        if (!window.__google_index) {
          window.__google_index = -1;
        }
        return function() {
		  chrome.runtime.sendMessage({toSay: "Ok selecting previous result"});
          const result1 = Array.prototype.slice.call(
            document.querySelectorAll(searchResultSelector1)
          );
          const result2 = [document.querySelector(searchResultSelector2)];
          const allResults = [].concat(result2, result1);
          let currentResult = allResults[window.__google_index];
          removeBorder(currentResult);
          window.__google_index--;
          if (window.__google_index === -1) {
            window.__google_index = 0;
          }
          currentResult = allResults[window.__google_index];
          addBorder(currentResult);
        };
      } else if (action === "go") {
        return function() {
		  chrome.runtime.sendMessage({toSay: "Ok Lets Go."});
          const result1 = Array.prototype.slice.call(
            document.querySelectorAll(searchResultSelector1)
          );
          const result2 = [document.querySelector(searchResultSelector2)];
          const allResults = [].concat(result2, result1);
          const currentResult = allResults[window.__google_index];
          const link = currentResult.querySelector("a");
          window.location.href = link.href;
        };
      }
    }
  });

  const webActions = window.__voicer.webActions;

  window.__voicer.addCommand({
    "input *text": webActions["google"]("input"),
    "next result": webActions["google"]("next_result"),
    "previous result": webActions["google"]("prev_result"),
    "find it": webActions["google"]("find"),
    go: webActions["google"]("go")
  });
})();
