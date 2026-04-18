import { Globe, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

export default function ProfileModal({ onClose, user }) {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const handleLogout = () => {
        localStorage.clear();
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

    let emails = user?.email.slice(0, 15)

    return (
        <div ref={modalRef}
            className="absolute right-0 mt-3 w-64 z-50
      bg-white/90 backdrop-blur-xl
      border border-[#E6E9F2]
      rounded-2xl shadow-xl p-2"
        >

            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#F4F6FB] mb-2">
                <div className="w-9 h-9 rounded-full bg-[#FFE5DA]
          flex items-center justify-center">
                    <img className="rounded-full" src={user?.avatar_url} alt="" />
                </div>

                <div>
                    <p className="text-sm font-semibold text-[#2B3141]">
                        {user?.username}
                    </p>
                    <p className="text-xs text-[#7A8499]">
                        {emails + " ..." || "No email"}
                    </p>
                </div>
            </div>

            <button
                onClick={changeLanguage}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm
        rounded-xl transition-all duration-200
        text-[#2B3141]
        hover:bg-[#F4F6FB]
        active:scale-[0.98]"
            >
                <div className="w-8 h-8 rounded-lg bg-[#EEF1F7]
          flex items-center justify-center">
                    <Globe size={16} className="text-[#2B3141]" />
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

            <div className="my-2 border-t border-[#EEF1F7]" />

            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm
        rounded-xl transition-all duration-200
        text-red-500 hover:bg-red-500/10
        active:scale-[0.98]"
            >
                <div className="w-8 h-8 rounded-lg bg-red-50
          flex items-center justify-center">
                    <LogOut size={16} />
                </div>

                <span>{t("logout")}</span>
            </button>

        </div>
    );
}