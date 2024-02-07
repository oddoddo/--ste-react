import { alertAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const $fg = cssVar("alert-fg");
const $bg = cssVar("alert-bg");

const baseStyle = definePartsStyle({
  container: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    w: "auto",
    h: "40px",
    bg: $bg.reference,
    pl: "15px ",
    pr: "20px",
  },
  title: {
    fontSize: "10px",
    fontWeight: "500",
    lineHeight: "6",
    marginEnd: "2",
  },
  description: {
    lineHeight: "6",
  },
  icon: {
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "6",
  },
  spinner: {
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "5",
  },
});

const success = {
  // Success Toast에 대한 스타일 설정
  container: {
    backgroundColor: "green.500",
    color: "white",
  },
};

export const toastTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    success: success,
  },
  defaultProps: {
    variant: "success",
    colorScheme: "blue",
  },
});
