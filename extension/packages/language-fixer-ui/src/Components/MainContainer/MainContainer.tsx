import LanguageDetect from "languagedetect";
import { FC, MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { translateToAvailableLanguages } from "../../fixer/LanguageFixer";
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

type ITranslation = Array<{
  fromLanguage: string;
  toLanguage: string;
  translate: string;
  probability: number;
}>;

const MainContainer: FC<MainContainerProps> = ({
  selectedText,
  currentInput,
}) => {
  const [translations, setTranslations] = useState<ITranslation>([]);

  useEffect(() => {
    const languageDetect = new LanguageDetect();

    const allTranslations = translateToAvailableLanguages(selectedText);
    console.error(allTranslations);

    const allTranslationsWithProbability = allTranslations
      .map((translation) => {
        if (!translation?.translate) return translation;
        const detection = languageDetect.detect(translation.translate, 1)[0];
        return { ...translation, probability: detection?.[1] * 100 || 0 };
      })
      .sort((t) => t.probability);

    setTranslations(allTranslationsWithProbability as ITranslation);
  }, [selectedText]);

  const onClickHandler = (event: MouseEvent, translate: string) => {
    // index of the first selected character
    const start = currentInput.selectionStart;
    // index of the last selected character
    const finish = currentInput.selectionEnd;
    if (start != null && finish != null) {
      if (currentInput.tagName?.toLowerCase() === "input") {
        const inputText = currentInput.value;
        currentInput.value = `${inputText.substring(
          0,
          start
        )}${translate}${inputText.substring(finish, inputText.length)}`;
      } else {
        const inputText = currentInput.innerHTML;
        currentInput.innerHTML = `${inputText.substring(
          0,
          start
        )}${translate}${inputText.substring(finish, inputText.length)}`;
      }
    }
  };

  return selectedText ? (
    <LanguageFixerContainer id="language-fixer-inner-container">
      {translations?.map((languageProp) => (
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
