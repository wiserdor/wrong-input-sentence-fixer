export const createStyleElement = (style: string) => {
  const css = document.createElement("style");
  css.innerHTML = style;
  return css;
};

export const createElement = (html: string, css?: string) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  const element = template.content.firstElementChild;
  if (element && css) {
    element.appendChild(createStyleElement(css));
  }

  return element as HTMLElement;
};
