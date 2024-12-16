import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import kaJSON from "./locale/ka.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      ...enJSON,
    },
    ka: {
      ...kaJSON,
    },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
});
