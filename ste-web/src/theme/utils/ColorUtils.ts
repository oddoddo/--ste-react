interface Theme {
  [key: string]: {
    _light: string;
    _dark: string;
  };
}

export const generateThemeColors = (
  lightTheme: Record<string, string>,
  darkTheme: Record<string, string>
): Theme => {
  const colors: Theme = {};
  for (const key in lightTheme) {
    if (Object.hasOwnProperty.call(lightTheme, key)) {
      colors[key] = {
        _light: lightTheme[key],
        _dark: darkTheme[key],
      };
    }
  }
  return colors;
};
