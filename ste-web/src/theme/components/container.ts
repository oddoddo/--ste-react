import { defineStyleConfig, defineStyle } from "@chakra-ui/react";

const baseStyle = {
  pos: "relative",
  // display: "flex",
  // flexDirection: { base: "column", lg: "row" },
  maxW: "1400px",
  minH: { base: "calc(100vh - 60px - 70px)", lg: "calc(100vh - 60px)" },
  margin: "0 auto",
  h: "100%",
  w: "100%",
  mx: "0",
  px: { base: "25px", lg: "0" },
  py: { base: "26px", lg: "50px" },
  boxSizing: "border-box",
};

const regi = {
  ...baseStyle,
  display: "flex",
  flexDirection: { base: "column", lg: "row" },
  maxW: "500px",
  py: { base: "26px", lg: "60px" },
};

const scrollY = {
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    bg: "gray.300",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-track": {
    bg: "gray.50",
  },
};

export const containerTheme = {
  baseStyle,
  variants: {
    scrollY,
    regi,
  },
};
