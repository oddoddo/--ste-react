import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "none",
    letterSpacing: "wider",
    textAlign: "start",
  },
  td: {
    textAlign: "start",
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
});

const numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end",
    fontFamily: '"Spoqa Han Sans Neo", "noto sans kr", sans-serif',
  },
});

const variantSimple = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    table: {
      borderTop: "1px",
      borderBottom: "1px",
      borderColor: mode(`Line_Gray_EE`, `Line_Gray_EE`)(props),
    },
    th: {
      color: "Typo_Secondary_666",
      borderRight: "1px solid",
      borderRightColor: "Line_Gray_EE",
      borderBottom: "0px solid",
      borderBottomColor: "Line_Gray_EE",
      bg: "#F7F7F9",
      px: "5px",
      py: "4px",
      fontSize: "10px",
      fontWeight: "400",
      span: {
        color: "#9C9C9C",
      },
      "&:last-child": {
        borderRight: "0",
      },
      ...numericStyles,
      "&:before": {
        content: "''",
        display: "block",
        position: "absolute",
        bottom: "0px",
        left: "0",
        width: "100%",
        height: "1px",
        backgroundColor: "Line_Gray_EE",
        zIndex: "1",
      },
    },
    td: {
      verticalAlign: "middle",
      fontFamily: "Spoqa Han Sans Neo",
      borderRight: "1px solid",
      borderRightColor: "Line_Gray_EE",
      borderBottom: "1px solid",
      borderBottomColor: "Line_Gray_EE",
      color: "Typo_Sub_3A",
      px: "5px",
      py: "4px",
      fontSize: "12px",
      whiteSpace: "nowrap",
      "&:last-child": {
        borderRight: "0",
      },
      button: {
        display: "block",
        mx: "auto",
        bg: "none",
        border: "1px solid",
        borderColor: "Typo_Sub_B0",
        color: "Typo_Secondary_666",
        fontSize: "11px",
        fontWeight: "400",
        fontFamily: "Spoqa Han Sans Neo",
        cursor: "pointer",
        p: "0",
        w: "36px",
        h: "20px",
        textAlign: "center",
        _hover: {
          bg: "back_bg",
        },
      },
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
  };
});

const variantStripe = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    thead: {
      position: "sticky",
      top: "0",
      zIndex: "2",
      h: "40px",
    },
    th: {
      verticalAlign: "middle",
      boxSizing: "border-box",
      textAlign: "center",
      borderRight: "1px solid",
      borderRightColor: "Line_Gray_EE",
      borderBottom: "0px solid",
      borderBottomColor: "Line_Gray_EE",
      bg: "#F7F7F9",
      px: "5px",
      py: "4px",
      color: "#929292",
      fontSize: "12px",
      fontWeight: "500",
      span: {
        color: "#9C9C9C",
      },
      "&:last-child": {
        borderRight: "0",
      },
      ...numericStyles,
      "&:before": {
        content: "''",
        display: "block",
        position: "absolute",
        bottom: "0px",
        left: "0",
        width: "100%",
        height: "1px",
        backgroundColor: "Line_Gray_EE",
        zIndex: "1",
      },
    },
    td: {
      fontFamily: "Spoqa Han Sans Neo",
      borderRight: "1px solid",
      borderRightColor: "Line_Gray_EE",
      borderBottom: "0",
      color: "Typo_Sub_3A",
      fontSize: "11px",
      fontWeight: "400",
      textAlign: "center",
      ...numericStyles,
      background: "#fff",

      "&.img": {
        textAlign: "center",
        verticalAlign: "middle",
        img: {
          m: "0 auto",
        },
      },
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tbody: {
      tr: {
        "&:nth-of-type(even)": {
          td: {
            background: `#F7F7F9`,
          },
        },
        "&:nth-of-type(odd)": {
          td: {
            background: `#fff`,
            borderRight: "1px solid",
            borderRightColor: "Line_Gray_EE",
          },
        },
      },
      // td: {
      //   "&:first-of-type": {
      //     fontWeight: "300",
      //   },
      // },
    },
  };
});

const variantStripeList = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      position: "relative",
      h: "38px",
      p: "0 15px",
      lineHeight: "38px",
      color: "white",
      borderRight: "1px",
      borderColor: "#D1D0DC",
      // borderColor: "red",
      background: "#D1D0DC",
      fontSize: "13px",
      fontWeight: "500",
      textAlign: "center",
      "&:last-child": {
        borderRight: "0",
      },
      svg: {
        position: "absolute",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        fontSize: "10px",
        color: "Line_Gray_EE",
      },
      ...numericStyles,
    },
    td: {
      minH: "42px",
      p: "9px 15px 8px",
      borderBottom: "1px solid",
      borderRight: "1px solid",
      borderColor: "#E9E9E9",
      color: "black",
      fontSize: "15px",
      fontWeight: "400",
      textAlign: "right",
      "&:first-of-type": {
        fontSize: "17px",
        textAlign: "left",
      },
      "&:last-of-type": {
        borderRight: "0",
      },
      span: {
        color: "Typo_Sub_B0",
      },
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tbody: {
      tr: {
        "&:nth-of-type(even)": {
          td: {
            background: mode(`#F7F7F9`, `#fff`)(props),
          },
        },
        _hover: {
          bg: "#F7F7F9",
        },
      },
    },
  };
});

const variantAccount = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    th: {
      position: "relative",
      h: "38px",
      p: "0 15px",
      lineHeight: "38px",
      color: "white",
      borderRight: "1px",
      borderColor: "#D1D0DC",
      background: "#D1D0DC",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
      "&:last-child": {
        borderRight: "0",
      },
      svg: {
        position: "absolute",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        fontSize: "10px",
        color: "Line_Gray_EE",
      },
      ...numericStyles,
    },
    td: {
      minH: "42px",
      p: "9px 15px 8px",
      borderBottom: "1px solid",
      borderRight: "1px solid",
      borderColor: "#E9E9E9",
      color: "black",
      fontSize: "15px",
      fontWeight: "400",
      "&:last-of-type": {
        borderRight: "0",
      },
      span: {
        color: "Typo_Sub_B0",
      },
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tbody: {
      tr: {
        _hover: {
          bg: "#F7F7F9",
        },
      },
    },
  };
});

const variantModal = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    table: {
      borderBottom: "1px",
      borderColor: mode(`Line_Gray_EE`, `Line_Gray_EE`)(props),
    },
    th: {
      fontFamily: "Spoqa Han Sans Neo",
      borderBottom: "0px solid",
      borderBottomColor: "Line_Gray_EE",
      px: "5px",
      pt: "6px",
      pb: "4px",
      fontSize: "11px",
      fontWeight: "400",
      color: "Typo_Sub_B0",
      textAlign: "center",
      span: {
        color: "#9C9C9C",
      },
      "&:last-child": {
        borderRight: "0",
      },
      ...numericStyles,
      "&:before": {
        content: "''",
        display: "block",
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "1px",
        backgroundColor: "Line_Gray_EE",
        zIndex: "1",
      },
    },
    tbody: {
      maxH: "300px",
      overflowY: "auto",
      tr: {
        "&:first-of-type": {
          td: {
            pt: "8px",
          },
        },
      },
    },
    td: {
      verticalAlign: "middle",
      fontFamily: "Spoqa Han Sans Neo",
      color: "Typo_Sub_3A",
      px: "5px",
      py: "4px",
      fontSize: "12px",
      fontWeight: "400",
      whiteSpace: "nowrap",
      "&:last-child": {
        borderRight: "0",
      },
      button: {
        display: "block",
        mx: "auto",
        // bg: "none",
        //   border: "1px solid",
        //   borderColor: "Typo_Sub_B0",
        //   color: "Typo_Secondary_666",
        fontSize: "11px",
        fontWeight: "400",
        fontFamily: "Spoqa Han Sans Neo",
        cursor: "pointer",
        p: "0",
        w: "33px",
        h: "20px",
        //   textAlign: "center",
        //   _hover: {
        //     bg: "back_bg",
        //   },
      },
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
  };
});

const variants = {
  simple: variantSimple,
  striped: variantStripe,
  stripedlist: variantStripeList,
  unstyled: defineStyle({}),
  modal: variantModal,
  account: variantAccount,
};

const sizes = {
  sm: definePartsStyle({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4",
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs",
    },
  }),
  md: definePartsStyle({
    th: {
      px: "6",
      py: "2",
      lineHeight: "4",
      fontSize: "12px",
      fontWeight: "500",
    },
    td: {
      px: "6",
      py: "5px",
      lineHeight: "5",
      fontSize: "12px",
      fontWeight: "400",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm",
    },
  }),
  lg: definePartsStyle({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm",
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md",
    },
  }),
};

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray",
  },
});
