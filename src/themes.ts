const colors = {
  black: "#000000",
  white: "#ffffff",
};

interface ThemeColors {
  background: string;
  text: string;
}

const darkThemeColors: ThemeColors = {
  background: colors.black,
  text: colors.white,
};

const lightThemeColors: ThemeColors = {
  background: colors.white,
  text: colors.black,
};

interface ThemeFonts {
  main: string;
}

const themeFont: ThemeFonts = {
  main: "Barlow Semi Condensed",
};

interface Theme {
  colors: ThemeColors;
  fontFamily: ThemeFonts;
}

export const lightTheme: Theme = {
  colors: lightThemeColors,
  fontFamily: themeFont,
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: darkThemeColors,
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
