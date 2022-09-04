export const startEventListener = (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["./static/js/injectFixer.js"],
    });
  }
};

chrome.tabs.onUpdated.addListener(startEventListener);
