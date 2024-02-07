import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { mode, transparentize } from "@chakra-ui/theme-tools";
import { runIfFn } from "../utils/run-if-fn";

const baseStyle = defineStyle({
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "400",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
});

const variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
      _hover: {
        bg: "none",
        color: mode(`#4C4D9D`, `whiteAlpha.900`)(props),
      },
      _active: {
        bg: "none",
        color: mode(`gray.500`, `whiteAlpha.300`)(props),
      },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "none",
    _hover: {
      bg: "none",
      color: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: "none",
      color: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
});

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    minW: "0",
    w: "auto",
    h: "auto",
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "5px",
    border: "1px solid",
    borderColor: "#d2d2d2",
    py: "6px",
    ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)":
      { marginEnd: "-1px" },
    ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)":
      { marginBottom: "-1px" },
    ...runIfFn(variantGhost, props),
    bg: "white",
    _hover: {
      bg: "#E7E7EB",
    },
  };
});

const variantOutline2 = defineStyle((props) => {
  return {
    ...variantOutline(props),
    borderRadius: "0",
    py: "7px",
    borderColor: "Line_Gray_BT_DD",
  };
});

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
};

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  if (c === "gray") {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      bg,
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    };
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  const background = mode(bg, `${c}.200`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
});

const variantLink = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
});

const variantUnstyled = defineStyle({
  bg: "none",
  color: "inherit",
  display: "inline-block !important",
  lineHeight: "inherit",
  border: "unset !important",
  m: "0 !important",
  p: "0 !important",
  minW: "10px !important",
  minH: "10px !important",
  _hover: {
    bg: "none !important",
  },
});

const variantBuy = defineStyle({
  w: "100%",
  h: "46px",
  minW: "10",
  mt: "2",
  px: "4",
  borderRadius: "6px",
  fontSize: "17px",
  fontWeight: "700",
  color: "white",
  bg: "HIGH",
  _hover: {
    bg: "#FF8291",
  },
});

const variantNormal = defineStyle({
  w: "100%",
  h: "46px",
  minW: "10",
  mt: "2",
  px: "4",
  borderRadius: "6px",
  fontSize: "17px",
  fontWeight: "700",
  color: "NORMAL",
  bg: "Typo_Sub_B02",
  _hover: {
    bg: "#FF8291",
  },
});

const variantModalNormal = defineStyle({
  w: "100%",
  bg: "P_DARK !important",
  _hover: {
    bg: "P_DARK_H",
  },
  _active: {
    bg: "P_DARK_A",
  },
});

const variantSell = defineStyle({
  w: "100%",
  h: "46px",
  minW: "10",
  mt: "2",
  px: "4",
  borderRadius: "6px",
  fontSize: "17px",
  fontWeight: "700",
  color: "white",
  bg: "LOW",
  _hover: {
    bg: "#73A3DE",
  },
});

const variantGr = defineStyle({
  bg: "Green",
  color: "white",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  px: "7px",
  h: "23px",
  fontFamily: "Noto Sans KR",
  fontSize: "11px",
  fontWeight: "500",
  borderRadius: "4px",
  _disabled: {
    bg: "white",
    color: "Typo_Sub_B0",
    border: "1px solid",
    borderColor: "Typo_Sub_B0",
    _hover: {
      bg: "#E7E7EB",
    },
  },
  _hover: {
    bg: "#87CCCC",
  },
});

const variantGrOff = defineStyle({
  bg: "white",
  color: "Typo_Sub_B0",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  px: "7px",
  h: "23px",
  fontFamily: "Noto Sans KR",
  fontSize: "11px",
  fontWeight: "500",
  borderRadius: "4px",
  border: "1px solid",
  borderColor: "Typo_Sub_B0",
  _hover: {
    bg: "#E7E7EB",
  },
});

const variantOutlinePlus = defineStyle({
  color: "text_default",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  fontFamily: "Noto Sans KR",
  fontSize: "10px",
  fontWeight: "700",
  borderRadius: "3px",
  border: "1px solid",
  borderColor: "Line_Gray_BT_DD",
  minW: "0",
  w: "20px",
  h: "20px",
  _hover: {
    bg: "#E7E7EB",
  },
});

const variantRegister = defineStyle({
  display: "flex",
  w: "100%",
  maxW: "500px",
  height: "68px",
  minH: "68px",
  bg: "primary",
  color: "white",
  fontWeight: "500",
  borderRadius: "8px",
  // boxSize: "border-box",
  fontFamily: "Noto Sans KR",
  fontSize: "18px",
  letterSpacing: "-0.02em",
  textAlign: "center",
  _hover: {
    bg: "#332F62",
    color: "#D6D5E0",
    _disabled: {
      bg: "#CFD0E0",
      color: "white",
    },
  },
  _active: {
    bg: "#080530",
    color: "#B5B4C1",
  },
  _disabled: {
    bg: "#CFD0E0",
    color: "white",
    _hover: {
      bg: "#CFD0E0",
    },
  },
});

const register62 = defineStyle({
  ...variantRegister,
  minH: "62px",
  height: "62px",
});

const variantOutlineLg = defineStyle({
  w: "100%",
  h: "68px",
  maxW: "500px",
  border: "1px solid",
  borderColor: "primary",
  borderRadius: "8px",
  fontSize: "18px",
  fontWeight: "500",
  fontFamily: "Noto Sans KR",
  color: "primary",
  bg: "white",
  _hover: {
    bg: "#d6d6ee",
    color: "#32317c",
    borderColor: "#4c4b9c",
  },
  _active: {
    bg: "#aeaed4",
    color: "primary",
    borderColor: "#aeaed4",
  },
  _disabled: {
    opacity: 0.3,
    bg: "#fff",
    color: "primary",
    borderColor: "#4c4b9c",
  },
});

const variantBtnLine = defineStyle({
  h: "42px",
  minW: "10",
  display: "inline-block",
  marginStart: "0 !important",
  px: "28px",
  fontSize: "15px",
  fontWeight: "500",
  fontFamily: "Noto Sans KR",
  color: "Typo_Secondary_666",
  bg: "transparent",
  whiteSpace: "nowrap",
  border: "1px solid",
  borderColor: "Line_Gray_BT_DD",
  "&.active": {
    bg: "primary",
    color: "white",
    borderColor: "primary",
  },
  _hover: {
    bg: "primary",
    color: "white",
  },
});

const variantGhostSm = defineStyle({
  h: "30px",
  minW: "10",
  px: "3",
  fontSize: "18px",
  fontWeight: "500",
  fontFamily: "Noto Sans KR",
  color: "#666",
  bg: "transparent",
});

const variantUnderline = defineStyle({
  bg: "transparent",
  color: "primary_bb",
  display: "inline",
  lineHeight: "inherit",
  textDecoration: "underline",
  m: "0",
  fontSize: "18px",
  fontWeight: "500",
  fontFamily: "Noto Sans KR",
  minW: "0",
});

const variantPageNav = defineStyle({
  h: "30px",
  minW: "35px",
  px: "2",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Spoqa Han Sans Neo",
  color: "grayc",
  bg: "transparent",
  borderRadius: "4px",
  _hover: {
    color: "primary",
  },
});

const variantPageNavOn = defineStyle({
  h: "30px",
  minW: "35px",
  px: "2",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Spoqa Han Sans Neo",
  color: "primary",
  bg: "transparent",
  borderRadius: "4px",
});

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  outline2: variantOutline2,
  solid: variantSolid,
  link: variantLink,
  unStyled: variantUnstyled,
  gr: variantGr,
  grOff: variantGrOff,
  outlinePlus: variantOutlinePlus,
  buy: variantBuy,
  sell: variantSell,
  normal: variantNormal,
  register: variantRegister,
  register62: register62,
  modal01: variantModalNormal,
  outlineLg: variantOutlineLg,
  ghostSm: variantGhostSm,
  underline: variantUnderline,
  btnLine: variantBtnLine,
  pageNav: variantPageNav,
  pageNavOn: variantPageNavOn,
};

const sizes = {
  lg: defineStyle({
    h: "46px",
    minW: "10",
    px: "4",
    borderRadius: "6px",
    fontSize: "17px",
    fontWeight: "700",
    color: "white",
  }),
  md: defineStyle({
    h: "10",
    minW: "10",
    fontSize: "md",
    px: "4",
  }),
  sm: defineStyle({
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3",
  }),
  xs: defineStyle({
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2",
  }),
};

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
});
