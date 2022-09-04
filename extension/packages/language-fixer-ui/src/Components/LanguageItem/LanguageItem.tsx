import { FC, MouseEvent } from "react";
import styled from "styled-components";
import LanguageFixer from "../../fixer/LanguageFixer";

const LanguageItemBox = styled.div`
  letter-spacing: 1px;
  padding: 20px 20px;
  cursor: pointer;

  &:hover {
    background-color: rgba(3, 102, 214, 0.1);
  }
`;

type LanguageItemProps = {
  selectedText: string;
  language: string;
  onClick: (event: MouseEvent, translate: string) => void;
};

const LanguageItem: FC<LanguageItemProps> = (props) => {
  const { selectedText, language, onClick } = props;
  const translated = new LanguageFixer().switchToHebrew(selectedText);

  return (
    <LanguageItemBox onClick={(e) => onClick(e, translated)}>
      <span>
        {translated}
        <small>{language}</small>
      </span>
    </LanguageItemBox>
  );
};

export default LanguageItem;
