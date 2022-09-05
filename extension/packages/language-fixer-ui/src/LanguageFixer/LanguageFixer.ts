import keyboardMapping from "./keyboardMapping.json";
import BCPMapper from "./BCP47toLanguage.json";
import { ILanguageItem } from "../types";

let availableLanguages: string[] | null = null;

export const getAvailableLanguages = () => {
  if (!availableLanguages) availableLanguages = Object.keys(keyboardMapping);
  return availableLanguages;
};

export const getLanguageFromBCP47 = (language: string): string =>
  (BCPMapper as Record<string, string>)?.[language] || "";

export const translateToAvailableLanguages = (text: string) => {
  const res: Array<ILanguageItem> = [];
  const languages = getAvailableLanguages();

  languages?.forEach((fromLangCode) => {
    languages
      .filter((l) => l !== fromLangCode)
      .forEach((toLangCode) => {
        const translate = translateTo(text, fromLangCode, toLangCode);

        res.push({
          fromLanguage: getLanguageFromBCP47(fromLangCode),
          toLanguage: getLanguageFromBCP47(toLangCode),
          fromLanguageCode: fromLangCode,
          toLanguageCode: toLangCode,
          translate,
          probability: 0,
        });
      });
  });
  return res;
};

export const translateTo = (
  text: string,
  fromLanguage: string,
  toLanguage: string
): string => {
  const mapper = (keyboardMapping as any)?.[toLanguage]?.[fromLanguage];
  if (!mapper) return "";
  return text
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => mapper?.[char] || char)
        .join("")
    )
    .join(" ");
};
