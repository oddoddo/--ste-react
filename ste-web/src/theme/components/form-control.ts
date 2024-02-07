import { formAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const $fg = cssVar("form-control-color");

const baseStyleRequiredIndicator = defineStyle({
  marginStart: "1",
  [$fg.variable]: "colors.red.500",
  _dark: {
    [$fg.variable]: "colors.red.300",
  },
  color: $fg.reference,
});

const baseStyleHelperText = defineStyle({
  position: "absolute",
  bottom: "-20px",
  left: "0",
  mt: "6px",
  [$fg.variable]: "colors.gray.600",
  _dark: {
    [$fg.variable]: "colors.whiteAlpha.600",
  },
  color: "Dark_Red",
  lineHeight: "normal",
  fontSize: "15px",
  fontWeight: "400",
});

const baseStyle = definePartsStyle({
  container: {
    width: "100%",
    position: "relative",
  },
  requiredIndicator: baseStyleRequiredIndicator,
  helperText: baseStyleHelperText,
});

export const formTheme = defineMultiStyleConfig({
  baseStyle,
});
