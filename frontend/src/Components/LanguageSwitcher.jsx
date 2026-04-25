import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => changeLang("uz")}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        UZ
      </button>

      <button
        onClick={() => changeLang("ru")}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        RU
      </button>

      <button
        onClick={() => changeLang("en")}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        EN
      </button>
    </div>
  );
}