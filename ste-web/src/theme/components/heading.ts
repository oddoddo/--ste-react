import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const brandPrimary = defineStyle({
  wordBreak: "keep-all",
  color: "blue.500",
  // let's also provide dark mode alternatives
  _dark: {
    color: "blue.300",
  },
});

const hd435 = defineStyle({
  fontSize: "43px",
  fontWeight: "500",
  lineHeight: "1.3",
  letterSpacing: "-1.3px",
});
const hd385 = defineStyle({
  fontSize: "38px",
  fontWeight: "500",
  lineHeight: "1.3",
  letterSpacing: "-1.14px",
});
const hd355 = defineStyle({
  fontSize: "35px",
  fontWeight: "500",
  letterSpacing: "-1px",
});
const hd325 = defineStyle({
  fontSize: "32px",
  fontWeight: "500",
});
const hd285 = defineStyle({
  fontSize: "28px",
  fontWeight: "500",
});
const hd225 = defineStyle({
  fontSize: "22px",
  fontWeight: "500",
});
const hd205 = defineStyle({
  fontSize: "20px",
  fontWeight: "500",
});

export const headingTheme = defineStyleConfig({
  variants: {
    brand: brandPrimary,
    hd435: hd435,
    hd385: hd385,
    hd355: hd355,
    hd325: hd325,
    hd285: hd285,
    hd225: hd225,
    hd205: hd205,
  },
});
