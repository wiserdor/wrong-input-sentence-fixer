import { useEffect, useRef, useState } from "react";
import MainContainer from "./Components/MainContainer/MainContainer";
import { INPUT_ELEMENTS_TAGS, INPUT_TYPES } from "./constants";

function App() {
  const activeElement = useRef<any>(null);
  const selection = useRef("");
  const isClickedInsideContainer = useRef(false);

  const [active, setActive] = useState(false);

  const shouldChangeText = (el: HTMLInputElement): boolean =>
    el.attributes.getNamedItem("role")?.value === "textbox" ||
    INPUT_ELEMENTS_TAGS.some((tag) =>
      el.tagName?.toLowerCase() === "input" && el.getAttribute("type")
        ? INPUT_TYPES.some((attr) => attr === el.getAttribute("type"))
        : tag === el.tagName?.toLowerCase()
    );

  const onClickHandler = (e: MouseEvent) => {
    const el = document.getElementById("language-fixer-inner-container");
    if (el && el.contains(e.target as Node)) {
      isClickedInsideContainer.current = true;
    } else {
      isClickedInsideContainer.current = false;
    }
  };

  const handleSelection = () => {
    if (isClickedInsideContainer.current) return;
    const el = document.activeElement as HTMLInputElement;
    const text = document.getSelection()?.toString()!;
    selection.current = text;

    if (text) {
      if (!activeElement.current && shouldChangeText(el)) {
        activeElement.current = el;
      }
    } else {
      activeElement.current = null;
    }

    setActive(activeElement.current && selection.current);
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("mousedown", onClickHandler);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      document.addEventListener("mousedown", onClickHandler);
    };
  });

  return active ? (
    <MainContainer
      selectedText={selection.current}
      currentInput={activeElement.current}
      closeContainer={() => setActive(false)}
    />
  ) : (
    <></>
  );
}

export default App;
