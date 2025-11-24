import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/translations/en.json";
import hi from "@/translations/hi.json";

import { ILanguage } from "./types";

const languageStore = localStorage.getItem(
  "languageStore",
);
const languageFromStore: ILanguage =
  languageStore
    ? JSON.parse(languageStore).state.language
    : "en";

await i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
  },
  lng: languageFromStore,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
