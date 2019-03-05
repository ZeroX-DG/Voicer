const COMMANDS = {
  NEW_TAB: "voicer:new_tab",
  SWITCH_TAB: "voicer:switch_tab",
  CLOSE_CURRENT_TAB: "voicer:close_current_tab",
  NEXT_TAB: "voicer:next_tab",
  PREV_TAB: "voicer:prev_tab"
};

const FUNCTIONS = {
  [COMMANDS.NEW_TAB]: createNewTab,
  [COMMANDS.SWITCH_TAB]: switchTab,
  [COMMANDS.CLOSE_CURRENT_TAB]: closeCurrentTab,
  [COMMANDS.NEXT_TAB]: goToNextTab,
  [COMMANDS.PREV_TAB]: goToPrevTab
};

function goToNextTab(request, sender, sendResponse) {
  sendResponse({ status: "ok" });
  chrome.tabs.query({ active: true }, function(tabs) {
    chrome.tabs.query({ index: tabs[0].index + 1 }, function(nexttabs) {
      chrome.tabs.update(nexttabs[0].id, { active: true });
      chrome.tabs.sendMessage(nexttabs[0].id, { voiceOn: true });
    });
  });
}

function goToPrevTab(request, sender, sendResponse) {
  sendResponse({ status: "ok" });
  chrome.tabs.query({ active: true }, function(tabs) {
    chrome.tabs.query({ index: tabs[0].index - 1 }, function(nexttabs) {
      chrome.tabs.update(nexttabs[0].id, { active: true });
      chrome.tabs.sendMessage(nexttabs[0].id, { voiceOn: true });
    });
  });
}

function createNewTab(request, sender, sendResponse) {
  sendResponse({ status: "ok" });
  chrome.tabs.create({ url: `http://${request.url}` || "chrome://newtab" });
}

function switchTab(request, sender, sendResponse) {
  sendResponse({ status: "ok" });
  const tabIndex = parseInt(request.tab);
  chrome.tabs.query({ index: tabIndex }, function(tabs) {
    chrome.tabs.update(tabs[0].id, { active: true });
    chrome.tabs.sendMessage(tabs[0].id, { voiceOn: true });
  });
}

function closeCurrentTab(request, sender, sendResponse) {
  sendResponse({ status: "ok" });
  chrome.tabs.query({ active: true }, function(tabs) {
    const tab = tabs[0];
    const index = tab.index - 1 >= 0 ? tab.index - 1 : 0;
    chrome.tabs.remove(tab.id, function() {
      chrome.tabs.query({ index }, function(newActiveTabs) {
        chrome.tabs.sendMessage(newActiveTabs[0].id, { voiceOn: true });
      });
    });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (FUNCTIONS[request.command]) {
    const func = FUNCTIONS[request.command];
    func(request, sender, sendResponse);
  }
});
