import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const brandPrimary = defineStyle({
  color: "blue.500",
  // let's also provide dark mode alternatives
  _dark: {
    color: "blue.300",
  },
});

const txt687 = defineStyle({
  fontSize: "68px",
  fontWeight: "700",
  lineHeight: "1.1",
  color: "White",
  textAlign: "left",
});

const txt445 = defineStyle({
  fontSize: "44px",
  fontWeight: "500",
  lineHeight: "1.1",
  color: "White",
  textAlign: "right",
});

const txt435 = defineStyle({
  fontSize: "43px",
  fontWeight: "500",
  lineHeight: "1.1",
});

const txt355 = defineStyle({
  fontSize: "35px",
  fontWeight: "500",
  lineHeight: "42px",
});

const txt325 = defineStyle({
  fontSize: "32px",
  fontWeight: "500",
  color: "White",
});

const txt306 = defineStyle({
  fontSize: "30px",
  fontWeight: "600",
});

const txt305 = defineStyle({
  fontSize: "30px",
  fontWeight: "500",
});

const txt286 = defineStyle({
  fontSize: "28px",
  fontWeight: "600",
});

const txt285 = defineStyle({
  fontSize: "28px",
  fontWeight: "500",
});

const txt284 = defineStyle({
  fontSize: "28px",
  fontWeight: "400",
});

const txt246 = defineStyle({
  fontSize: "24px",
  fontWeight: "600",
});
const txt245 = defineStyle({
  fontSize: "24px",
  fontWeight: "500",
});
const txt244 = defineStyle({
  fontSize: "24px",
  fontWeight: "400",
});

const txt226 = defineStyle({
  fontSize: "22px",
  fontWeight: "600",
});

const txt225 = defineStyle({
  fontSize: "22px",
  fontWeight: "500",
});

const txt224 = defineStyle({
  fontSize: "22px",
  fontWeight: "400",
});

const txt216 = defineStyle({
  fontSize: "21px",
  fontWeight: "600",
});
const txt214 = defineStyle({
  fontSize: "21px",
  fontWeight: "400",
});

const txt206 = defineStyle({
  fontSize: "20px",
  fontWeight: "600",
});

const txt205 = defineStyle({
  fontSize: "20px",
  fontWeight: "500",
});

const txt194 = defineStyle({
  fontSize: "19px",
  fontWeight: "400",
});

const txt187 = defineStyle({
  fontSize: "18px",
  fontWeight: "700",
});
const txt185 = defineStyle({
  fontSize: "18px",
  fontWeight: "500",
});
const txt184 = defineStyle({
  fontSize: "18px",
  fontWeight: "400",
});

const txt177 = defineStyle({
  fontSize: "17px",
  fontWeight: "700",
});

const txt176 = defineStyle({
  fontSize: "17px",
  fontWeight: "600",
});
const txt175 = defineStyle({
  fontSize: "17px",
  fontWeight: "500",
});

const txt174 = defineStyle({
  fontSize: "17px",
  fontWeight: "400",
});
const txt172 = defineStyle({
  fontSize: "17px",
  fontWeight: "200",
});

const txt167 = defineStyle({
  fontSize: "16px",
  fontWeight: "700",
});

const txt166 = defineStyle({
  fontSize: "16px",
  fontWeight: "600",
});

const txt165 = defineStyle({
  fontSize: "16px",
  fontWeight: "500",
});

const txt164 = defineStyle({
  fontSize: "16px",
  fontWeight: "400",
});
const txt157 = defineStyle({
  fontSize: "15px",
  fontWeight: "700",
});
const txt156 = defineStyle({
  fontSize: "15px",
  fontWeight: "600",
});
const txt155 = defineStyle({
  fontSize: "15px",
  fontWeight: "500",
});
const txt154 = defineStyle({
  fontSize: "15px",
  fontWeight: "400",
});
const txt147 = defineStyle({
  fontSize: "14px",
  fontWeight: "700",
});
const txt146 = defineStyle({
  fontSize: "14px",
  fontWeight: "600",
});
const txt145 = defineStyle({
  fontSize: "14px",
  fontWeight: "500",
});
const txt144 = defineStyle({
  fontSize: "14px",
  fontWeight: "400",
});
const txt137 = defineStyle({
  fontSize: "13px",
  fontWeight: "700",
});
const txt136 = defineStyle({
  fontSize: "13px",
  fontWeight: "600",
});
const txt135 = defineStyle({
  fontSize: "13px",
  fontWeight: "500",
});
const txt134 = defineStyle({
  fontSize: "13px",
  fontWeight: "400",
});
const txt126 = defineStyle({
  fontSize: "12px",
  fontWeight: "600",
});
const txt125 = defineStyle({
  fontSize: "12px",
  fontWeight: "500",
});
const txt124 = defineStyle({
  fontSize: "12px",
  fontWeight: "400",
});
const txt115 = defineStyle({
  fontSize: "11px",
  fontWeight: "500",
});
const txt114 = defineStyle({
  fontSize: "11px",
  fontWeight: "400",
});
const txt113 = defineStyle({
  fontSize: "11px",
  fontWeight: "300",
});
const txt105 = defineStyle({
  fontSize: "10px",
  fontWeight: "500",
});
const txt104 = defineStyle({
  fontSize: "10px",
  fontWeight: "400",
});
const error = defineStyle({
  position: "absolute",
  bottom: "2px",
  left: "0",
  color: "Dark_Red",
  fontSize: "16px",
  fontWeight: "400",
});

const fontS = defineStyle({
  fontFamily: "Spoqa Han Sans Neo",
});

export const textTheme = defineStyleConfig({
  variants: {
    brand: brandPrimary,
    txt687: txt687,
    txt445: txt445,
    txt435: txt435,
    txt355: txt355,
    txt325: txt325,
    txt306: txt306,
    txt305: txt305,
    txt286: txt286,
    txt285: txt285,
    txt284: txt284,
    txt246: txt246,
    txt245: txt245,
    txt244: txt244,
    txt226: txt226,
    txt224: txt224,
    txt225: txt225,
    txt216: txt216,
    txt214: txt214,
    txt206: txt206,
    txt205: txt205,
    txt194: txt194,
    txt187: txt187,
    txt185: txt185,
    txt184: txt184,
    txt177: txt177,
    txt176: txt176,
    txt175: txt175,
    txt174: txt174,
    txt172: txt172,
    txt167: txt167,
    txt166: txt166,
    txt165: txt165,
    txt164: txt164,
    txt157: txt157,
    txt156: txt156,
    txt155: txt155,
    txt154: txt154,
    txt147: txt147,
    txt146: txt146,
    txt145: txt145,
    txt144: txt144,
    txt137: txt137,
    txt136: txt136,
    txt135: txt135,
    txt134: txt134,
    txt126: txt126,
    txt125: txt125,
    txt124: txt124,
    txt115: txt115,
    txt114: txt114,
    txt113: txt113,
    txt105: txt105,
    txt104: txt104,
    error: error,
    fontS: fontS,
  },
});
