import { CSSProperties } from "react";
import keyboardMapping from "../keyboardMapping.json";

const startOnSelection = (keyboardMapping: Record<string, string>) => {
  const INPUT_ELEMENTS_TAGS = ["input", "textarea"];
  const INPUT_TYPES = ["text", "search"];

  const switchToHebrew = (text: string): string =>
    text
      .split(" ")
      .map((word) =>
        word
          .split("")
          .map((char) => keyboardMapping?.[char] || char)
          .join("")
      )
      .join(" ");

  const shouldChangeText = (el: HTMLInputElement): boolean =>
    el.attributes.getNamedItem("role")?.value === "textbox" ||
    INPUT_ELEMENTS_TAGS.some((tag) =>
      el.tagName?.toLowerCase() === "input"
        ? INPUT_TYPES.some((attr) => attr === el.getAttribute("type"))
        : tag === el.tagName?.toLowerCase()
    );

  const createElement = (
    tagName: string,
    attributes?: { style?: CSSProperties; className?: string }
  ) => {
    const containerElement = document.createElement(tagName);

    if (attributes) {
      const { style, className } = attributes;
      if (className) {
        containerElement.className = className;
      }

      if (style) {
        for (const prop in style) {
          containerElement.style[prop] = style[prop];
        }
      }
    }

    return containerElement;
  };

  const createFixerContainer = (fixerTagName: string): HTMLElement => {
    const containerStyle: CSSProperties = {
      position: "absolute",
      backgroundColor: "white",
      width: "fit-content",
      height: "auto",
      display: "grid",
      gridTemplateColumns: "1fr",
      gridAutoRows: "auto",
      boxShadow:
        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      fontSize: "16px",
      fontFamily: "Georgia",
      gap: "20px",
      top: "50px",
      zIndex: "1231241",
      borderRadius: "4px",
      border: " rgba(3, 102, 214, 0.3) 1px solid",
    };
    return createElement(fixerTagName, { style: containerStyle });
  };

  const createFixerItem = (itemTagName: string) => {
    return createElement(itemTagName, { className: "fixer-item" });
  };

  const createStyleElement = (style: string) => {
    const css = createElement("style");
    css.innerHTML = style;
    return css;
  };

  const addFixerContent = (
    fixerContainer: HTMLElement,
    currentInput: HTMLInputElement,
    props: { selectedText: string }
  ) => {
    const { selectedText } = props;
    const css = createStyleElement(`
      language-fixer-container .fixer-item{
        letter-spacing: 1px;
        padding: 20px 20px;
        cursor:pointer;
      }

      language-fixer-container .fixer-item:hover{
        background-color: rgba(3, 102, 214, 0.1);
      }
    `);
    fixerContainer.appendChild(css);
    const item = createFixerItem("div");
    const translated = switchToHebrew(selectedText);
    item.innerHTML = `<span>${translated} <small>עברית</small></span>`;
    item.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (currentInput.tagName?.toLowerCase() === "input")
        currentInput.value = translated;
      else currentInput.innerHTML = translated;
      fixerContainer.remove();
    });
    fixerContainer.appendChild(item);
  };

  document.addEventListener("selectionchange", () => {
    const fixerTagName = "language-fixer-container";
    const oldFixerContainer = document.getElementsByTagName(fixerTagName)?.[0];
    const selection = document.getSelection();
    const selectedText = selection?.toString();

    if (oldFixerContainer) {
      oldFixerContainer.remove();
      if (!selectedText) {
        return;
      }
    }

    const currentInput = document.activeElement as HTMLInputElement;
    if (currentInput && shouldChangeText(currentInput)) {
      if (selectedText) {
        const fixerContainer = createFixerContainer(fixerTagName);

        currentInput.parentElement?.insertBefore(fixerContainer, currentInput);

        addFixerContent(fixerContainer, currentInput, { selectedText });
      }
    }
  });
};

const startEventListener = (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId },
      func: startOnSelection,
      args: [keyboardMapping],
    });
  }
};

chrome.tabs.onUpdated.addListener(startEventListener);
