import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./components/tabs";
import { tableTheme } from "./components/table";
import { containerTheme } from "./components/container";
import { buttonTheme } from "./components/button";
import { textTheme } from "./components/Text";
import { numberInputTheme } from "./components/number-input";
import { inputTheme } from "./components/input";
import { tooltipTheme } from "./components/tooltip";
import { radioTheme } from "./components/radio";
import { modalTheme } from "./components/modal";
import { alertTheme } from "./components/alert";
import { toastTheme } from "./components/toast";
import { dark, light } from "./Colors";
import { generateThemeColors } from "./utils/ColorUtils";
import { headingTheme } from "./components/heading";
import { formTheme } from "./components/form-control";
import { formLabelTheme } from "./components/form-label";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Container: containerTheme,
    Tabs: tabsTheme,
    Table: tableTheme,
    Button: buttonTheme,
    Text: textTheme,
    Input: inputTheme,
    NumberInput: numberInputTheme,
    Tooltip: tooltipTheme,
    Radio: radioTheme,
    Modal: modalTheme,
    Alert: alertTheme,
    Toast: toastTheme,
    Heading: headingTheme,
    FormTheme: formTheme,
    FormLabel: formLabelTheme,
  },
  breakpoints: {
    sm: "480px",
    md: "720px",
    lg: "1400px",
  },
  fonts: {
    body: "'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', 'sans-serif'",
    heading: "'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', 'sans-serif'",
  },
  fontSizes: {
    xs: "12px",
    sm: "13px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "22px",
    "4xl": "24px",
    "5xl": "26px",
    "6xl": "28px",
    "7xl": "30px",
    "8xl": "32px",
    "9xl": "34px",
  },
  styles: {
    global: {
      "*": {
        boxSize: "border-box",
        margin: 0,
        padding: 0,
        wordBreak: "keep-all !important",
      },
      html: {
        width: "100%",
        height: "100%",
      },
      body: {
        // bg: "white",
        fontSize: "16px",
        fontWeight: "400",
        fontFamily:
          "'Noto Sans KR' , 'Malgun Gothic', '맑은 고딕', 'sans-serif'",
        lineHeight: 1.5,
        color: "Typo_Sub_3A",
        letterSpacing: "-0.5px",
      },
      "#root": {
        // opacity: " 0.8",
      },
      a: {
        color: "black",
        _hover: {
          textDecoration: "none !important",
        },
      },
      "caption, legend, .blind": {
        overflow: "hidden",
        position: "absolute",
        width: 0,
        height: 0,
        lineHeight: 0,
        textIndent: "-9999px",
      },
      ".tooltip-icon": {
        color: "Typo_Sub_B0",
        fontSize: "13px",
        marginLeft: "5px",
      },
      ".scrollbar": {
        height: "100%",
        overflowY: "auto !important",
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "scrollbarBG",
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
      },
      ".chakra-toast__inner": {
        minWidth: "unset !important",
        maxWidth: "unset !important",
        margin: "5px !important",
        ".chakra-alert": {
          borderRadius: "0 !important",
          width: "100%",
        },
        width: "100%",
      },
    },
  },
  semanticTokens: {
    colors: generateThemeColors(light, dark),
  },
});

export default theme;
