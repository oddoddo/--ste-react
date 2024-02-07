import { Global } from "@emotion/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const Fonts = () => <Global styles={``} />;

const fontS = defineStyle({
  fontFamily: "Spoqa Han Sans Neo",
});

export const fontTheme = defineStyleConfig({
  variants: {
    fontS: fontS,
  },
});

export default Fonts;
