import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  fontSize: "16px",
  fontWeight: "500",
  marginEnd: "3",
  mb: "0",
  transitionProperty: "common",
  transitionDuration: "normal",
  color: "Typo_Secondary_666",
  opacity: 1,
  _disabled: {
    opacity: 0.4,
  },
  _focus: {
    color: "primary_b",
  },
  _invalid: {
    color: "Dark_Red",
  },
});

export const formLabelTheme = defineStyleConfig({
  baseStyle,
});
