chrome.browserAction.onClicked.addListener(tab => {
  updateIcon();
  chrome.tabs.executeScript(
    tab.ib,
    {
      file: "inject.js"
    },
    () => {
      chrome.contextMenus.create({
        id: "GETSELECTOR_" + details.tabId,
        title: "Get Unique Selector",
        contexts: ["editable"],
        documentUrlPatterns: ["*://*/*"]
      });
    }
  );
});

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

let pressed = false;

function updateIcon() {
  pressed = !pressed;
  console.log(pressed);  
  chrome.browserAction.setIcon({
    path: `icon_128${pressed ? "_pressed" : ""}.png`
  });
}

// chrome.browserAction.onClicked.addListener(updateIcon);
