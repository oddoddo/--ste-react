import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system";
import { getColor } from "@chakra-ui/theme-tools";

const $fg = cssVar("tabs-color");
const $bg = cssVar("tabs-bg");
const $border = cssVar("tabs-border-color");

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleRoot = defineStyle((props) => {
  const { orientation } = props;
  return {
    display: orientation === "vertical" ? "flex" : "block",
  };
});

const baseStyleTab = defineStyle((props) => {
  const { isFitted } = props;

  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: "common",
    transi7tionDuration: "normal",
    _focusVisible: {
      zIndex: 1,
      boxShadow: "outline",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4,
    },
  };
});

const baseStyleTablist = defineStyle((props) => {
  const { align = "start", orientation } = props;

  const alignments: Record<string, string> = {
    end: "flex-end",
    center: "center",
    start: "flex-start",
  };

  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row",
  };
});

const baseStyleTabpanel = defineStyle({
  p: 3,
});

const baseStyle = definePartsStyle((props) => ({
  root: baseStyleRoot(props),
  tab: baseStyleTab(props),
  tablist: baseStyleTablist(props),
  tabpanel: baseStyleTabpanel,
}));

const sizes = {
  sm: definePartsStyle({
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm",
    },
  }),
  md: definePartsStyle({
    tab: {
      fontSize: "md",
      py: 2.5,
      px: 4,
    },
  }),
  lg: definePartsStyle({
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4,
    },
  }),
};

const variantLine = definePartsStyle((props) => {
  const { colorScheme: c, orientation } = props;
  const isVertical = orientation === "vertical";
  const borderProp = isVertical ? "borderStart" : "borderBottom";
  const marginProp = isVertical ? "marginStart" : "marginBottom";

  return {
    tablist: {
      [borderProp]: "1px solid",
      borderColor: "#D1D1D1",
    },
    tab: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      [marginProp]: "0",
      fontSize: "14px",
      fontWeight: "400",
      _selected: {
        color: "#413FA0",
        fontWeight: "500",
        backgroundColor: "#F7F6FF",
        [borderProp]: "2px solid",
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`,
        },
        borderColor: "red",
      },
      _active: {
        [$bg.variable]: "colors.gray.200",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.300",
        },
      },
      _disabled: {
        _active: { bg: "none" },
      },
      color: "#3A3A3A",
      bg: $bg.reference,
    },
  };
});

const variantEnclosed = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      [$border.variable]: "transparent",
      _selected: {
        [$fg.variable]: `colors.${c}.600`,
        [$border.variable]: `colors.white`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`,
          [$border.variable]: `colors.gray.800`,
        },
        borderColor: "inherit",
        borderBottomColor: $border.reference,
      },
      color: $fg.reference,
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  };
});

const variantEnclosedColored = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      [$bg.variable]: "colors.gray.50",
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.50",
      },
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px",
      },
      _selected: {
        [$bg.variable]: "colors.white",
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$bg.variable]: "colors.gray.800",
          [$fg.variable]: `colors.${c}.300`,
        },
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
      },
      color: $fg.reference,
      bg: $bg.reference,
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  };
});

const variantSoftRounded = definePartsStyle((props) => {
  const { colorScheme: c, theme } = props;
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      h: "100%",
    },
    tablist: {
      display: "inline-flex",
      w: "auto",
      mx: "auto",
      border: "1px solid",
      borderColor: "#68678C",
      borderRadius: "4px",
    },
    tab: {
      w: "78px",
      px: "0",
      py: "5px",
      borderRadius: "0",
      border: "none",
      color: "#68678C",
      fontSize: "12px",
      fontWeight: "500",
      _selected: {
        color: "white",
        bg: "#68678C",
      },
    },
    tabpanel: {
      px: 0,
      py: "4px",
    },
  };
});

const variantSolidRounded = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      [$fg.variable]: "colors.gray.600",
      _dark: {
        [$fg.variable]: "inherit",
      },
      _selected: {
        [$fg.variable]: "colors.white",
        [$bg.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: "colors.gray.800",
          [$bg.variable]: `colors.${c}.300`,
        },
      },
      color: $fg.reference,
      bg: $bg.reference,
    },
  };
});

const variantUnstyled = definePartsStyle(() => {
  return {
    tab: {
      p: "9px 10px 5px",
      whiteSpace: "nowrap",
      color: "Typo_Sub_B0",
      fontSize: "12px",
      fontWeight: "400",
      _selected: {
        color: "black",
        fontWeight: "500",
        borderBottom: "2px solid",
        borderColor: "black",
      },
    },
    tablist: {
      mb: "-2px",
      borderBottom: "1px solid",
      borderColor: "Line_Gray_EE",
    },
    tabpanel: {
      p: "0",
    },
  };
});
const variantTnb = definePartsStyle((props) => {
  return {
    root: {
      width: "1400px",
      mx: "auto",
    },
    tablist: {
      bg: "white",
    },
    tab: {
      px: "70px",
      pt: "20px",
      pb: "14px",
      color: "Typo_Sub_B0",
      fontSize: "18px",
      fontWeight: "500",
      borderBottom: "2px solid",
      borderColor: "white",
      _selected: {
        borderBottom: "2px solid",
        borderColor: "primary_b",
        color: "primary_b",
        fontWeight: "700",
      },
    },
    tabpanel: {
      p: "0",
      bg: "back_bg",
    },
  };
});

const variants = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled,
  tnb: variantTnb,
};

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "blue",
  },
});
