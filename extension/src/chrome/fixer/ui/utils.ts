import { renderToStaticMarkup } from "react-dom/server";

export const createStyleElement = (style: string) => {
  const css = document.createElement("style");
  css.innerHTML = style;
  return css;
};

export const createElementFromJSX = (jsxElement: JSX.Element) => {
  const template = document.createElement("template");
  template.innerHTML = renderToStaticMarkup(jsxElement);
  const element = template.content.firstElementChild as HTMLElement;
  return element;
};
