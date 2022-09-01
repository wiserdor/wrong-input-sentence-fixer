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
        if (textSelected) {
          const changeInputEl = document.createElement("div");
          changeInputEl.innerHTML = "Hi all";
          changeInputEl.style.position = "absolute";
          changeInputEl.style.bottom = `${currentInput.offsetHeight + 120}px`;
          /**
           * For future container
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 2147483647;
              position: absolute;
              pointer-events: none;
           */

          currentInput.parentElement?.insertBefore(changeInputEl, currentInput);
        }
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
