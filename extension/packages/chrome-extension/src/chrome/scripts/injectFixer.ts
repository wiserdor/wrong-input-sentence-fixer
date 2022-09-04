import { FIXER_TAG_ID, INPUT_ELEMENTS_TAGS, INPUT_TYPES } from "../constants";

const shouldChangeText = (el: HTMLInputElement): boolean =>
  el.attributes.getNamedItem("role")?.value === "textbox" ||
  INPUT_ELEMENTS_TAGS.some((tag) =>
    el.tagName?.toLowerCase() === "input"
      ? INPUT_TYPES.some((attr) => attr === el.getAttribute("type"))
      : tag === el.tagName?.toLowerCase()
  );

document.addEventListener("selectionchange", () => {
  const oldFixerContainer = document.getElementById(FIXER_TAG_ID)?.[0];
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
      const fixerContainer = document.createElement("div");
      fixerContainer.id = FIXER_TAG_ID;
      const script = document.createElement("script");
      script.innerHTML = ``;
      fixerContainer.appendChild(script);

      currentInput.parentElement?.insertBefore(fixerContainer, currentInput);
    }
  }
});
