import { FIXER_TAG_NAME, INPUT_ELEMENTS_TAGS, INPUT_TYPES } from "../constants";
import MainContainer from "../fixer/ui/Components/MainContainer/MainContainer";
import { createElementFromJSX } from "../fixer/ui/utils";

const shouldChangeText = (el: HTMLInputElement): boolean =>
  el.attributes.getNamedItem("role")?.value === "textbox" ||
  INPUT_ELEMENTS_TAGS.some((tag) =>
    el.tagName?.toLowerCase() === "input"
      ? INPUT_TYPES.some((attr) => attr === el.getAttribute("type"))
      : tag === el.tagName?.toLowerCase()
  );

document.addEventListener("selectionchange", () => {
  const oldFixerContainer =
    document.getElementsByClassName(FIXER_TAG_NAME)?.[0];
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
      const jsxElement = MainContainer({
        selectedText,
        currentInput,
      });
      const fixerContainer = createElementFromJSX(jsxElement!);

      currentInput.parentElement?.insertBefore(fixerContainer, currentInput);
    }
  }
});
