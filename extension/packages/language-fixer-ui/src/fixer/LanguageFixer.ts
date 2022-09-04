import keyboardMapping from "./keyboardMapping.json";

let availableLanguages: string[] | null = null;

export const getAvailableLanguages = () => {
  if (!availableLanguages) availableLanguages = Object.keys(keyboardMapping);
  return availableLanguages;
};

export const translateToAvailableLanguages = (text: string) => {
  const res: Array<{
    fromLanguage: string;
    toLanguage: string;
    translate: string;
    probability: number;
  }> = [];
  const languages = getAvailableLanguages();
  languages?.forEach((fromLang) => {
    languages
      .filter((l) => l !== fromLang)
      .forEach((toLang) => {
        res.push({
          fromLanguage: fromLang,
          toLanguage: toLang,
          translate: translateTo(text, fromLang, toLang),
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
