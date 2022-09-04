import { FIXER_TAG_ID, INPUT_ELEMENTS_TAGS, INPUT_TYPES } from "../constants";

const shouldChangeText = (el: HTMLInputElement): boolean =>
  el.attributes.getNamedItem("role")?.value === "textbox" ||
  INPUT_ELEMENTS_TAGS.some((tag) =>
    el.tagName?.toLowerCase() === "input" && el.getAttribute("type")
      ? INPUT_TYPES.some((attr) => attr === el.getAttribute("type"))
      : tag === el.tagName?.toLowerCase()
  );

document.addEventListener("selectionchange", () => {
  const selection = document.getSelection();
  const selectedText = selection?.toString();
  if (!selectedText) {
    return;
  }

  const currentInput = document.activeElement as HTMLInputElement;
  if (currentInput && shouldChangeText(currentInput)) {
    if (selectedText) {
      const fixerContainer = document.getElementById(
        FIXER_TAG_ID
      ) as HTMLDivElement;
    }
  }
});
