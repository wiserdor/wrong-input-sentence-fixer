import LanguageDetect from "languagedetect";
import { FC, MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { translateToAvailableLanguages } from "../../LanguageFixer/LanguageFixer";
import { ILanguageItem } from "../../types";
import LanguageItem from "../LanguageItem/LanguageItem";

const LanguageFixerContainer = styled.div<{ top: string; left: string }>`
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
  z-index: 1231241;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  border-radius: 8px;
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
}) => {
  const [translations, setTranslations] = useState<Array<ILanguageItem>>([]);

  useEffect(() => {
    const languageDetect = new LanguageDetect();

    const allTranslations = translateToAvailableLanguages(selectedText);
    const userLanguages = navigator.languages;

    const allTranslationsWithProbability = allTranslations
      .map((translation) => {
        if (!translation?.translate) return translation;
        if (userLanguages.some((l) => l === translation.toLanguageCode)) {
          return { ...translation, probability: 100 };
        }
        const detection = languageDetect.detect(translation.translate, 1)[0];
        return { ...translation, probability: detection?.[1] || 0 };
      })
      .sort((t) => t.probability);

    setTranslations(allTranslationsWithProbability);
  }, [selectedText]);

  const onClickHandler = (event: MouseEvent, translate: string) => {
    // index of the first selected character
    const startOffset = currentInput.selectionStart;
    // index of the last selected character
    const endOffset = currentInput.selectionEnd;
    if (startOffset != null && endOffset != null) {
      if (
        currentInput.tagName?.toLowerCase() === "input" ||
        currentInput.tagName?.toLowerCase() === "textarea"
      ) {
        const inputText = currentInput.value;
        currentInput.value = `${inputText.substring(
          0,
          startOffset
        )}${translate}${inputText.substring(endOffset, inputText.length)}`;
      } else {
        const inputText = currentInput.innerHTML;
        currentInput.innerHTML = `${inputText.substring(
          0,
          startOffset
        )}${translate}${inputText.substring(endOffset, inputText.length)}`;
      }

      // Select text again for further change
      currentInput.focus();
      currentInput.selectionStart = startOffset;
      currentInput.selectionEnd = endOffset;
    }
  };

  return selectedText ? (
    <LanguageFixerContainer
      id="language-fixer-inner-container"
      top={`${
        window.scrollY +
        currentInput.getBoundingClientRect().top +
        currentInput.getBoundingClientRect().height +
        10
      }px`}
      left={`${window.scrollX + currentInput.getBoundingClientRect().left}px`}
    >
      {translations
        ?.filter((t) => t.translate)
        .map((languageProp) => (
          <LanguageItem
            {...languageProp}
            selectedText={selectedText}
            onClick={onClickHandler}
          />
        ))}
    </LanguageFixerContainer>
  ) : null;
};

export default MainContainer;
