import { alertAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
  StyleFunctionProps,
} from "@chakra-ui/styled-system";
import { transparentize } from "@chakra-ui/theme-tools";

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
    py: "13px",
    bg: $bg.reference,
    pl: "15px ",
    pr: "20px",
    minW: "5px",
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
    display: "none",
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

function getBg(props: StyleFunctionProps) {
  const { theme, colorScheme: c } = props;
  const darkBg = transparentize(`${c}.200`, 0.16)(theme);
  return {
    light: `colors.${c}.100`,
    dark: darkBg,
  };
}

const variantSubtle = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg.variable]: `colors.${c}.600`,
      [$bg.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg.variable]: bg.dark,
      },
    },
  };
});

const variantLeftAccent = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg.variable]: `colors.${c}.600`,
      [$bg.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg.variable]: bg.dark,
      },
      paddingStart: "3",
      borderStartWidth: "4px",
      borderStartColor: $fg.reference,
    },
  };
});

const variantTopAccent = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg.variable]: `colors.${c}.600`,
      [$bg.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg.variable]: bg.dark,
      },
      pt: "2",
      borderTopWidth: "4px",
      borderTopColor: $fg.reference,
    },
  };
});

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      [$fg.variable]: `colors.white`,
      [$bg.variable]: `colors.${c}.600`,
      _dark: {
        [$fg.variable]: `colors.gray.900`,
        [$bg.variable]: `colors.${c}.200`,
      },
      color: $fg.reference,
    },
  };
});

const variantBuy = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      p: "13px 20px 13px 16px",
      bg: "HIGH_t_bg",
      border: "1px solid",
      borderColor: "#F31A41",
      borderRadius: 0,
      color: "#7C000F",
      fontWeight: "500",
      span: {
        display: "none",
      },
    },
    title: {
      fontSize: "12px",
      lineHeight: 1.5,
      paddingRight: 2,
    },
  };
});

const variantSell = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      p: "13px 20px 13px 16px",
      bg: "#DDE8FF",
      border: "1px solid",
      borderColor: "#2073DB",
      color: "#000B6A",
      fontWeight: "500",
      borderRadius: "0px !important",
      span: {
        display: "none",
      },
    },
    title: {
      fontSize: "12px",
      lineHeight: 1.5,
      paddingRight: 2,
    },
  };
});

const variantComplete = definePartsStyle((props) => {
  return {
    container: {
      p: "13px 20px 13px 16px",
      bg: "#F3F2F2",
      border: "1px solid",
      borderColor: "#929292",
      color: "#000000",
      fontWeight: "500",
      borderRadius: "0px !important",
      span: {
        display: "none",
      },
    },
    title: {
      fontSize: "12px",
      lineHeight: 1.5,
      paddingRight: 2,
    },
  };
});
const variantError = definePartsStyle((props) => {
  return {
    container: {
      p: "13px 20px 13px 16px",
      bg: "#FFF8B5",
      border: "1px solid",
      borderColor: "#FCAF17",
      color: "#A13000",
      fontWeight: "500",
      borderRadius: "0px !important",
      span: {
        display: "none",
      },
    },
    title: {
      fontSize: "12px",
      lineHeight: 1.5,
      paddingRight: 2,
    },
  };
});

const variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid,
  buy: variantBuy,
  sell: variantSell,
  complete: variantComplete,
  error: variantError,
};

export const alertTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "subtle",
    colorScheme: "blue",
  },
});
