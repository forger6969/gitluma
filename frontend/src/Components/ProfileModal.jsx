import { Globe, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../store/slices/themeSlice";

export default function ProfileModal({ onClose, user }) {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const d = mode === "dark";

  const handleLogout = () => {
    const theme = localStorage.getItem("theme");
    const lang = localStorage.getItem("lang");

    localStorage.clear();

    if (theme) localStorage.setItem("theme", theme);
    if (lang) localStorage.setItem("lang", lang);

    navigate("/");
  };

  const changeLanguage = () => {
    const langs = ["en", "uz", "ru"];
    const currentLang = i18n.language.split("-")[0];
    const currentIndex = langs.indexOf(currentLang);
    const nextLang = langs[(currentIndex + 1) % langs.length];

    i18n.changeLanguage(nextLang);
    localStorage.setItem("lang", nextLang);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const email = user?.email ? user.email.slice(0, 15) + "..." : "No email";

  return (
    <div
      ref={modalRef}
      className={`absolute right-0 mt-3 w-64 z-50
        backdrop-blur-xl border rounded-2xl shadow-xl p-2
        ${d
          ? "bg-[#0E1118]/90 border-[#2B3141]"
          : "bg-white/90 border-[#E6E9F2]"}`}
    >

      <div className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-2
        ${d ? "bg-[#161B27]" : "bg-[#F4F6FB]"}`}>

        <div className={`w-9 h-9 rounded-full flex items-center justify-center
          ${d ? "bg-[#2B3141]" : "bg-[#FFE5DA]"}`}>
          <img className="rounded-full" src={user?.avatar_url} alt="" />
        </div>

        <div>
          <p className={`text-sm font-semibold ${d ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}>
            {user?.username}
          </p>
          <p className={`text-xs ${d ? "text-[#5C6480]" : "text-[#7A8499]"}`}>
            {email}
          </p>
        </div>
      </div>

      <button
        onClick={changeLanguage}
        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm
          rounded-xl transition-all duration-200 active:scale-[0.98]
          ${d
            ? "text-[#EEF1F7] hover:bg-[#161B27]"
            : "text-[#2B3141] hover:bg-[#F4F6FB]"}`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center
          ${d ? "bg-[#2B3141]" : "bg-[#EEF1F7]"}`}>
          <Globe size={16} className={d ? "text-[#EEF1F7]" : "text-[#2B3141]"} />
        </div>

        <span className="flex-1 text-left">
          {t("changeLanguage")}
        </span>

        <span className="text-[10px] font-semibold uppercase
          bg-[#FFE5DA] text-[#E8654A]
          px-2 py-0.5 rounded-md">
          {i18n.language.split("-")[0]}
        </span>
      </button>



      <div className={`my-2 border-t ${d ? "border-[#2B3141]" : "border-[#EEF1F7]"}`} />

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm
          rounded-xl transition-all duration-200
          text-red-500 hover:bg-red-500/10 active:scale-[0.98]"
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center
          ${d ? "bg-red-900/20" : "bg-red-50"}`}>
          <LogOut size={16} />
        </div>

        <span>{t("logout")}</span>
      </button>
    </div>
  );
}