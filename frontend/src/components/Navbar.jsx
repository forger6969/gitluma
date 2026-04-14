import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-[#EEF1F7] text-[#2B3141]">
      <h1 className="text-lg font-semibold">GitLuma</h1>

      <div className="flex items-center gap-8 text-[#5b6275] text-sm">
        <p className="hover:text-[#E8654A] cursor-pointer transition">{t("platform")}</p>
        <p className="hover:text-[#E8654A] cursor-pointer transition">{t("documentation")}</p>
        <p className="hover:text-[#E8654A] cursor-pointer transition">{t("changelog")}</p>

        <div className="flex gap-2 bg-white border border-gray-200 px-2 py-1 rounded-lg text-xs">
          <button onClick={() => changeLang("en")} className="hover:text-[#E8654A]">EN</button>
          <button onClick={() => changeLang("uz")} className="hover:text-[#E8654A]">UZ</button>
          <button onClick={() => changeLang("ru")} className="hover:text-[#E8654A]">RU</button>
        </div>

        <div className="">
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;