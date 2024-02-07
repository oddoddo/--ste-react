import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";

if (localStorage.getItem("i18nextLng") === null) {
  localStorage.setItem("i18nextLng", "ko");
}

i18n
  .use(Backend)
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: {
      caches: ["localStorage"],
    },
    load: "languageOnly",
    fallbackLng: "ko",
    debug: false,
    preload: ["ko"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
