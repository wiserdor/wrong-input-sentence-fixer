import { FC, useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import LanguageFixer from "../../../LanguageFixer";

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

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentRef = ref?.current;
    if (currentRef) {
      console.error(currentRef);
      currentRef.addEventListener("mousedown", (e) => onClick(e, translated));
    }
    return () => {
      currentRef?.removeEventListener("mousedown", (e) =>
        onClick(e, translated)
      );
    };
  }, [onClick, translated, ref]);

  return (
    <LanguageItemBox ref={ref}>
      <span>
        {translated}
        <small>{language}</small>
      </span>
    </LanguageItemBox>
  );
};

export default LanguageItem;
