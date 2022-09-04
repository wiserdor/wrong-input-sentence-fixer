import { FC, MouseEvent } from "react";
import styled from "styled-components";

const LanguageItemBox = styled.div`
  letter-spacing: 1px;
  padding: 20px 20px;
  cursor: pointer;
  border-bottom: rgba(3, 102, 214, 0.1) 1px solid;

  &:hover {
    background-color: rgba(3, 102, 214, 0.1);
  }
`;

type LanguageItemProps = {
  selectedText: string;
  toLanguage: string;
  fromLanguage: string;
  translate: string;
  probability: number;
  onClick: (event: MouseEvent, translate: string) => void;
};

const LanguageItem: FC<LanguageItemProps> = (props) => {
  const { translate, fromLanguage, toLanguage, probability, onClick } = props;

  return (
    <LanguageItemBox onClick={(e) => onClick(e, translate)}>
      <span>
        {probability.toFixed(0)} | {translate} |
        <small>
          {fromLanguage} {">>"} {toLanguage}
        </small>
      </span>
    </LanguageItemBox>
  );
};

export default LanguageItem;
