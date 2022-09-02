import LanguageFixer from "../../../LanguageFixer";
import { createElement } from "../../utils";
import { FIXER_TAG_NAME } from "../../../../constants";
import { createFixerItem } from "../LanguageItem/LanguageItem";
import css from "./mainContainer.css";
import html from "./mainContiner.html";

export const addFixerContent = (
  fixerContainer: HTMLElement,
  currentInput: HTMLInputElement,
  props: { selectedText: string }
) => {
  const { selectedText } = props;

  const translate = new LanguageFixer().switchToHebrew(selectedText);
  const item = createFixerItem(selectedText, translate);
  item.addEventListener("mousedown", (e) => {
    e.preventDefault();

    // TODO: need to fix text replacement
    if (currentInput.tagName?.toLowerCase() === "input")
      currentInput.value.replaceAll(selectedText, translate);
    else currentInput.innerHTML.replaceAll(selectedText, translate);
    fixerContainer.remove();
  });
  fixerContainer.appendChild(item);
};

export const createFixerContainer = () => {
  return createElement(html.replaceAll("$$TAG$$", FIXER_TAG_NAME), css);
};
