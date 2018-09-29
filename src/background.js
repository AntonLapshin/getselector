const getState = tabId => 
  new Promise(resolve => {
    chrome.tabs.executeScript(
      tabId,
      {
        code: "window.__gs && window.__gs.state"
      },
      result => resolve(result[0])
    );
  });

const updateIcon = isPressed => chrome.browserAction.setIcon({
  path: `icon_128${isPressed ? "_pressed" : ""}.png`
});

!(() => {
  chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.executeScript(
      tab.ib,
      {
        file: "inject.js"
      },
      async () => {
        const state = await getState(tab.id);
        updateIcon(state);
        // chrome.contextMenus.create({
        //   id: "GETSELECTOR_" + tab.id,
        //   title: "Get Unique Selector",
        //   contexts: ["editable"],
        //   documentUrlPatterns: ["*://*/*"]
        // });
      }
    );
  });

  chrome.tabs.onActivated.addListener(async tab => {
    const state = await getState(tab.id);
    updateIcon(state);    
  })
})();

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   chrome.tabs.sendMessage(tab.id, { info });
// });

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             css: ["body"]
//           })
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//       }
//     ]);
//   });
// });

// chrome.browserAction.onClicked.addListener(updateIcon);
