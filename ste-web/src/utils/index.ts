import i18n from "../i18n";
import Hanwha from "../assets/images/members/Hanwha.svg";
import IBK from "../assets/images/members/IBK.svg";
import KB from "../assets/images/members/KB.svg";
import NH from "../assets/images/members/NH.svg";
import SC from "../assets/images/members/SC.svg";
import EBest from "../assets/images/members/ebest.svg";
import { useMemo } from "react";
import { DA_CCLS_CODE } from "../types/CommonCodes";
import { useTranslation } from "react-i18next";
import { compare } from "semver";

export function getGUID(): string {
  function leftPad(num: number, digit: number): string {
    return (num + "").padStart(digit, "0");
  }
  function generateUniqSerial(): string {
    return "xxxx-xxxx-xxxx".replace(/[x]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      return r.toString(16);
    });
  }
  const d = new Date();
  const microMiniDate =
    d.getFullYear() +
    leftPad(d.getMonth() + 1, 2) +
    leftPad(d.getDate(), 2) +
    leftPad(d.getHours(), 2) +
    leftPad(d.getMinutes(), 2) +
    leftPad(d.getSeconds(), 2) +
    leftPad(d.getMilliseconds(), 3); //17

  return microMiniDate + "-" + generateUniqSerial();
}

export function formatDate(inputDate: string): string {
  inputDate = inputDate.trim();
  if (inputDate.length !== 8) {
    return "";
  }
  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(4, 6);
  const day = inputDate.slice(6, 8);
  return `${year}.${month}.${day}`;
}

export function formatTime(inputTime: string): string {
  inputTime = inputTime.trim();
  if (inputTime.length !== 6) {
    return "";
  }
  const time = inputTime.slice(0, 2);
  const minute = inputTime.slice(2, 4);
  const second = inputTime.slice(4, 6);
  return `${time}:${minute}:${second}`;
}

export function formatDateTimeforDate(inputTime: string): string {
  inputTime = inputTime.trim();
  if (inputTime.length !== 17) {
    return "";
  }

  const year = inputTime.slice(0, 4);
  const month = inputTime.slice(4, 6);
  const day = inputTime.slice(6, 8);

  const formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
}
export function formatDateTimeforTime(inputTime: string): string {
  inputTime = inputTime.trim();
  if (inputTime.length !== 17) {
    return "";
  }

  const hours = inputTime.slice(8, 10);
  const minutes = inputTime.slice(10, 12);

  const formattedDate = `${hours}:${minutes}`;

  return formattedDate;
}

export function formatTimeforFullTime(inputTime: string): string {
  inputTime = inputTime.trim();
  if (inputTime.length !== 9) {
    return "";
  }

  const hours = inputTime.slice(0, 2);
  const minutes = inputTime.slice(2, 4);

  const formattedDate = `${hours}:${minutes}`;

  return formattedDate;
}

// 백만단위 변환기
export function millionFormatAmt(amt: number) {
  let formatedAmt = "";
  if (Number(amt) > 999999) {
    formatedAmt = i18n.t("format.number", { value: Math.floor(amt / 1000000) });
    formatedAmt += Number(amt) > 999999 ? i18n.t("Million") : "";
  } else {
    formatedAmt = i18n.t("format.number", { value: amt });
  }
  return formatedAmt;
}

export function formatPrice(price: number, decimalPlaces: number = 2) {
  if (isNaN(price)) return null;
  let strPrice = price + "";
  if (strPrice.indexOf(".") > 0) {
    strPrice = price.toFixed(decimalPlaces);
    // return strPrice;
  }
  const regExp = new RegExp(`\\B(?=(\\d{3})+(?!\\d))`, "g");
  return strPrice.replace(regExp, ",");
}

// 현재날짜 기준으로 과거 일주일 1w,1개월 1m 을 입력받아 YYYYMMDD 형식으로 반환
export function calculatePastDates(duration: string): string {
  const currentDate = new Date();

  // 정규표현식을 사용하여 인자에서 숫자와 단위를 추출
  const match = duration.match(/^(\d+)([wm])$/);

  if (!match) {
    return "Invalid input";
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  const pastDate = new Date(currentDate);

  if (unit === "w") {
    pastDate.setDate(currentDate.getDate() - value * 7 + 1);
  } else if (unit === "m") {
    pastDate.setDate(pastDate.getDate() - value * 30);
  }

  // YYYYMMDD 형식으로 변환
  const year = pastDate.getFullYear();
  const month = (pastDate.getMonth() + 1).toString().padStart(2, "0");
  const day = pastDate.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

export function getNowDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}` as string;
}

// Timestamp를 YYYY.MM.DD HH:MM:SS 로 변환
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

export function getMemberIcon(index?: number) {
  const idx = index ? index : Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  switch (idx) {
    case 1:
      return Hanwha;
    case 2:
      return IBK;
    case 3:
      return KB;
    case 4:
      return NH;
    case 5:
      return SC;
    case 6:
      return EBest;
    default:
      return Hanwha;
  }
}

// 매수 매도 색상
export const getTradeColor = (code: string) => {
  switch (code) {
    case DA_CCLS_CODE.BUY:
      return "BUY";
    case DA_CCLS_CODE.SELL:
      return "SELL";
  }
};

export const getUpDownColor = (value: string = "0") => {
  const valueInt = Number(value);
  if (valueInt > 0) {
    return "HIGH";
  } else if (valueInt < 0) {
    return "LOW";
  } else {
    return "NORMAL";
  }
};

export const ifDifferentApply = (origin: any, target: any, key?: string) => {
  if (key) {
    if (origin[key] !== target[key]) origin[key] = target[key];
  } else {
    if (origin) {
      for (const key in origin) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          if (origin[key] !== target[key]) origin[key] = target[key];
        }
      }
    } else {
      origin = { ...target };
    }
  }
};

/**
 * 한글 초성 목록
 */
const hangul: string[] = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

/**
 * 입력값을 초성변환한다
 * @param str 초성으로 변환할 문자
 */
export const getInitials = (str: string): string => {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 44032 && code <= 55203) {
        // 한글 범위 내의 문자인 경우
        const initialIndex = Math.floor((code - 44032) / 588);
        return hangul[initialIndex];
      } else {
        // 한글이 아닌 경우
        return char;
      }
    })
    .join("");
};
/**
 * 입력값이 초성으로 구성되어있는지 확인
 * @param char
 */
const isChosung = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code >= 12593 && code <= 12622;
};

/**
 * 타겟이 초성쿼리에 속하는지 체크
 * @param target
 * @param query
 */
export const searchByInitials = (target: string, query: string): boolean => {
  const targetInitials = getInitials(target);
  const queryInitials = getInitials(query);
  return targetInitials.includes(queryInitials);
};
