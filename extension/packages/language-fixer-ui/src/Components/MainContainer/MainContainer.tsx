import { useState, MouseEvent, useEffect, FC } from "react";
import styled from "styled-components";
import LanguageItem from "../LanguageItem/LanguageItem";

const LanguageFixerContainer = styled.div`
  position: absolute;
  background-color: white;
  width: max-content;
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

type MainContainerProps = {
  selectedText: string;
  currentInput: HTMLInputElement;
  closeContainer: () => void;
};

const MainContainer: FC<MainContainerProps> = ({
  selectedText,
  currentInput,
  closeContainer,
}) => {
  const onClickHandler = (event: MouseEvent, translate: string) => {
    if (currentInput.tagName?.toLowerCase() === "input")
      currentInput.value = currentInput.value.replaceAll(
        selectedText,
        translate
      );
    else
      currentInput.innerHTML = currentInput.innerHTML.replaceAll(
        selectedText,
        translate
      );
  };

  return selectedText ? (
    <LanguageFixerContainer id="language-fixer-inner-container">
      {["עברית"].map((lang) => (
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
