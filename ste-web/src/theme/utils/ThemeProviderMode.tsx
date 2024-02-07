import React, { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import { dark, light, space } from "../Colors";
import { ThemeProvider } from "styled-components";

type ThemeProviderProps = {
  children: JSX.Element[];
};
const ThemeProviderMode: React.FC<ThemeProviderProps> = ({ children }) => {
  const { colorMode } = useColorMode();
  const [colors, setColors] = useState<any>({
    colors: light,
  });
  useEffect(() => {
    if (colorMode === "light") {
      setColors({ colors: light, space });
    } else {
      setColors({ colors: dark, space });
    }
  }, [colorMode]);

  return <ThemeProvider theme={colors}>{children}</ThemeProvider>;
};

export default ThemeProviderMode;
