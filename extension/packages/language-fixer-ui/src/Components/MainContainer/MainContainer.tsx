import { useState, MouseEvent } from "react";
import styled from "styled-components";
import LanguageItem from "../LanguageItem/LanguageItem";

const LanguageFixerContainer = styled.div`
  position: absolute;
  background-color: white;
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  font-size: 16px;
  font-family: Georgia;
  gap: 20px;
  top: 50px;
  z-index: 1231241;
  border-radius: 4px;
  border: rgba(3, 102, 214, 0.3) 1px solid;
`;

const MainContainer = () => {
  const [isSelectedText, setIsSelectedText] = useState(true);
  const selectedText = document.getSelection()!.toString();

  const onClickHandler = (event: MouseEvent, translate: string) => {
    const currentInput = document.activeElement as HTMLInputElement;
    event.preventDefault();
    console.error(translate);
    if (currentInput.tagName?.toLowerCase() === "input")
      currentInput.value = translate;
    else currentInput.innerHTML.replaceAll(selectedText, translate);
    setIsSelectedText(false);
  };

  return isSelectedText ? (
    <LanguageFixerContainer className="language-fixer-container">
      {["Hebrew"].map((lang) => (
        <LanguageItem
          language={lang}
          selectedText={selectedText}
          onClick={onClickHandler}
        />
      ))}
    </LanguageFixerContainer>
  ) : null;
};

export default MainContainer;
