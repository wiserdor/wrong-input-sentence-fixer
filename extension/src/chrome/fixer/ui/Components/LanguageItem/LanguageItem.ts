import { createElement } from "../../utils";
import html from "./languageItem.html";
import css from "./languageItem.css";

export const createFixerItem = (translate: string, language: string) => {
  return createElement(
    html
      .replaceAll("$$TRANSLATE$$", translate)
      .replaceAll("$$LANGUAGE$$", language),
    css
  );
};
