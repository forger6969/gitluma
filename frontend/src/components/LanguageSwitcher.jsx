import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] || "en";

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => changeLang("uz")}
        className="px-3 py-1 border rounded transition-colors"
        style={{
          backgroundColor: currentLang === "uz" ? "#E8654A" : "#FFFFFF",
          borderColor: currentLang === "uz" ? "#E8654A" : "#D1D5DB",
          color: currentLang === "uz" ? "#FFFFFF" : "#111827",
        }}
      >
        UZ
      </button>

      <button
        onClick={() => changeLang("ru")}
        className="px-3 py-1 border rounded transition-colors"
        style={{
          backgroundColor: currentLang === "ru" ? "#E8654A" : "#FFFFFF",
          borderColor: currentLang === "ru" ? "#E8654A" : "#D1D5DB",
          color: currentLang === "ru" ? "#FFFFFF" : "#111827",
        }}
      >
        RU
      </button>

      <button
        onClick={() => changeLang("en")}
        className="px-3 py-1 border rounded transition-colors"
        style={{
          backgroundColor: currentLang === "en" ? "#E8654A" : "#FFFFFF",
          borderColor: currentLang === "en" ? "#E8654A" : "#D1D5DB",
          color: currentLang === "en" ? "#FFFFFF" : "#111827",
        }}
      >
        EN
      </button>
    </div>
  );
}
