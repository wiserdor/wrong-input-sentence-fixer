import keyboardMapping from "./keyboardMapping.json";

export default class LanguageFixer {
  switchToHebrew(text: string): string {
    return text
      .split(" ")
      .map((word) =>
        word
          .split("")
          .map((char) => keyboardMapping?.[char] || char)
          .join("")
      )
      .join(" ");
  }
}
