const startOnSelection = () => {
  const INPUT_ELEMENTS_TAGS = ["input", "textarea"];
  const INPUT_TYPES = ["text", "search"];

  const shouldChangeText = (el: HTMLInputElement): boolean =>
    INPUT_ELEMENTS_TAGS.some((tag) =>
      el.tagName?.toLowerCase() === "input"
        ? INPUT_TYPES.some((attr) => attr === el.getAttribute("type"))
        : tag === el.tagName?.toLowerCase()
    );

  document.addEventListener("selectionchange", () => {
    const selection = document.getSelection();
    if (selection) {
      const currentInput = document.activeElement as HTMLInputElement;
      if (currentInput && shouldChangeText(currentInput)) {
        const textSelected = selection.toString();
        if (textSelected === "wow") currentInput.value = "bla";
      }
    }
  });
};

const startEventListener = (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  chrome.scripting.executeScript({
    target: { tabId },
    func: startOnSelection,
  });
};

chrome.tabs.onUpdated.addListener(startEventListener);

export {};
