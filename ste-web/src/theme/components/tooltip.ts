import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { cssVar } from "@chakra-ui/theme-tools";

const $bg = cssVar("tooltip-bg");
const $fg = cssVar("tooltip-fg");
const $arrowBg = cssVar("popper-arrow-bg");

const baseStyle = defineStyle({
  color: $fg.reference,
  [$bg.variable]: "colors.gray.700",
  [$fg.variable]: "colors.whiteAlpha.900",
  _dark: {
    [$bg.variable]: "colors.gray.300",
    [$fg.variable]: "colors.gray.900",
  },
  [$arrowBg.variable]: $bg.reference,
  px: "2",
  py: "0.5",
  boxShadow: "md",
  maxW: "xs",
  zIndex: "tooltip",
  mx: 2,
  bg: "Typo_Sub_3A",
  fontWeight: 400,
  fontSize: 12,
  borderRadius: 3,
});

export const tooltipTheme = defineStyleConfig({
  baseStyle,
});
