import { radioAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { runIfFn } from "../utils/run-if-fn";
import { checkboxTheme } from "./checkbox";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleControl = defineStyle((props) => {
  const controlStyle = runIfFn(checkboxTheme.baseStyle, props)?.control;

  return {
    borderRadius: "full",
    _checked: {
      ...controlStyle?.["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  };
});

const baseStyle = definePartsStyle((props) => ({
  label: {
    m: 0,
  },
  container: {
    pos: "relative",
    h: "47px",
    px: "25px",
    border: "1px solid",
    borderColor: "Line_Gray_BT_DD",
    borderRight: "none",
    fontSize: "17px",
    fontWeight: "500",
    color: "#666",
    backgroundColor: "white",
    "&:last-child": {
      borderRight: "1px solid",
      borderColor: "Line_Gray_BT_DD",
    },
    _checked: {
      color: "primary",
      "&::before": {
        content: `""`,
        pos: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "1px solid",
        borderColor: "primary",
      },
    },
  },
  control: {
    width: "0",
    height: "0",
    border: "none",
    opacity: 0,
  },
}));

const sizes = {
  md: definePartsStyle({
    control: { w: "4", h: "4" },
    label: { fontSize: "md" },
  }),
  lg: definePartsStyle({
    control: { w: "5", h: "5" },
    label: { fontSize: "lg" },
  }),
  sm: definePartsStyle({
    control: { width: "3", height: "3" },
    label: { fontSize: "sm" },
  }),
};

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
});
