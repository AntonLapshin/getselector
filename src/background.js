//let initialized = false;
chrome.pageAction.onClicked.addListener(tab => {
	console.log(tab);
  //if (!initialized) {
    chrome.tabs.executeScript(tab.ib, {
      file: 'inject.js'
    });
  //} else {
    chrome.tabs.executeScript(tab.ib, {
      file: 'toggle.js'
    });
  //}
  //chrome.pageAction.setIcon({ path: 'icon_pressed.png'});
  //initialized = true;
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // When a page contains a <video> tag...
          new chrome.declarativeContent.PageStateMatcher({
            css: ['body']
          })
        ],
        // ... show the page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });

  // chrome.declarativeContent.onPageChanged.addListener(
  // 	function(tabId, changeInfo, tab) {
  // 		//chrome.browserAction.setIcon({ path: 'icon.png'});
  // 		initialized = false;
  // 	}
  // );
});
