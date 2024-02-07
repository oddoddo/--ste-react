import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system";
import { runIfFn } from "../utils/run-if-fn";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const $bg = cssVar("modal-bg");
const $shadow = cssVar("modal-shadow");

const baseStyleOverlay = defineStyle({
  bg: "blackAlpha.600",
  zIndex: "modal",
});

const baseStyleDialogContainer = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;

  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto",
    overscrollBehaviorY: "none",
  };
});

const baseStyleDialog = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;

  return {
    borderRadius: "md",
    color: "inherit",
    my: isCentered ? "auto" : "auto",
    mx: isCentered ? "auto" : "auto",
    pt: "50px",
    px: "34px",
    pb: "35px",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
    [$bg.variable]: "colors.white",
    [$shadow.variable]: "shadows.lg",
    _dark: {
      [$bg.variable]: "colors.gray.700",
      [$shadow.variable]: "shadows.dark-lg",
    },
    bg: $bg.reference,
    boxShadow: $shadow.reference,
  };
});

const baseStyleHeader = defineStyle({
  px: "0",
  py: "0",
  fontSize: "22px",
  fontWeight: "500",
  textAlign: "center",
});

const baseStyleCloseButton = defineStyle({
  position: "absolute",
  top: "2",
  insetEnd: "3",
});

const baseStyleBody = defineStyle((props) => {
  const { scrollBehavior } = props;
  return {
    px: "0",
    pt: "0",
    pb: "44px",
    flex: "1",
    overflow: scrollBehavior === "inside" ? "auto" : undefined,
    color: "Typo_Sub_3A",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: "Spoqa Han Sans Neo",
    lineHeight: "1.5",
    letterSpacing: "-0.4px",
    ".red": {
      color: "HIGH",
    },
    ".blue": {
      color: "#3AACFF",
    },
  };
});

const baseStyleFooter = defineStyle({
  pt: "0",
  pb: "0",
  px: "0",
  button: {
    position: "static",
    flexGrow: 1,
    height: "58px",
    borderRadius: "6px",
    background: "primary",
    fontSize: "18px",
    fontWeight: "700",
    color: "white",
    "&.btn-gray": {
      flexGrow: 0,
      width: "100px",
      background: "Typo_Sub_B0",
    },
    "&.btn-red": {
      background: "HIGH",
    },
    "&.btn-blue": {
      background: "LOW",
    },
    "&.btn-confirm": {
      background: "P_DARK",
    },
  },
});

const baseStyle = definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: runIfFn(baseStyleDialogContainer, props),
  dialog: runIfFn(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: runIfFn(baseStyleBody, props),
  footer: baseStyleFooter,
}));

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === "full") {
    return definePartsStyle({
      dialog: {
        maxW: "100vw",
        minH: "$100vh",
        my: "0",
        borderRadius: "0",
      },
    });
  }
  return definePartsStyle({
    dialog: { maxW: value },
  });
}

const sizes = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
  xl: getSize("xl"),
  "2xl": getSize("2xl"),
  "3xl": getSize("3xl"),
  "4xl": getSize("4xl"),
  "5xl": getSize("5xl"),
  "6xl": getSize("6xl"),
  full: getSize("full"),
};

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: { size: "md" },
});
