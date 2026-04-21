import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./en.json"
import uz from "./uz.json"
import ru from "./ru.json"

const savedLang = localStorage.getItem("lang")


const lang = savedLang || "en"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uz: { translation: uz },
      ru: { translation: ru },
    },
    lng: lang,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n