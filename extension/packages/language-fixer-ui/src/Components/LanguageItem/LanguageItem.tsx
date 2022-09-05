import { FC, MouseEvent } from "react";
import styled from "styled-components";
import { ILanguageItem } from "../../types";

const LanguageItemBox = styled.div`
  padding: 20px 20px;
  cursor: pointer;
  border-bottom: rgba(3, 102, 214, 0.1) 1px solid;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  text-align: center;

  &:hover {
    background-color: rgba(3, 102, 214, 0.1);
  }
`;

const Translate = styled.div`
  max-width: 27ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #303655;
  letter-spacing: 2px;
`;

type LanguageItemProps = {
  selectedText: string;
  onClick: (event: MouseEvent, translate: string) => void;
} & ILanguageItem;

const LanguageItem: FC<LanguageItemProps> = (props) => {
  const { translate, fromLanguage, toLanguage, probability, onClick } = props;

  return (
    <LanguageItemBox onClick={(e) => onClick(e, translate)}>
      <Translate>{translate}</Translate>
      <div style={{ fontSize: "13px", color: "#6f90af" }}>
        <small>
          <div>{fromLanguage}</div>
          <div>{"↓"}</div>
          <div style={{ marginLeft: "10px" }}>{toLanguage}</div>
        </small>
      </div>
    </LanguageItemBox>
  );
};

export default LanguageItem;
