import { Globe, LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ProfileModal({ onClose }) {

    const navigate = useNavigate()
    const { i18n, t } = useTranslation()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    const changeLanguage = () => {
        const langs = ["en", "uz", "ru"]

        // FIX: en-US muammosi
        const currentLang = i18n.language.split("-")[0]
        const currentIndex = langs.indexOf(currentLang)

        const nextLang = langs[(currentIndex + 1) % langs.length]

        i18n.changeLanguage(nextLang)
        localStorage.setItem("lang", nextLang)
    }

    return (
        <div className="absolute right-0 mt-3 w-64 
            backdrop-blur-xl 
            bg-oq 
            rounded-2xl shadow-xl p-2 z-50"
        >

            {/* Header */}
            <div className="flex items-center gap-3 px-3 py-3 text-orang mb-1">
                <div className="w-8 h-8 rounded-full 
                    flex items-center justify-center text-white"
                >
                    <User className="fill-orang stroke-orang" size={16} />
                </div>
                <div>
                    <p className="text-sm text-orang font-medium">
                        {t("account")}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                        {t("settingsPreferences")}
                    </p>
                </div>
            </div>

            <button
                onClick={changeLanguage}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm 
                text-orang
                rounded-xl transition-all duration-200 
                active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-coral)]"
            >
                <Globe size={16} />
                <span className="flex-1 text-left">
                    {t("changeLanguage")}
                </span>
                <span className="text-xs text-[var(--text-muted)] 
                    bg-[var(--coral-100)] px-2 py-0.5 rounded-md uppercase"
                >
                    {i18n.language}
                </span>
            </button>

            <div className="my-2 border-t border-orang"></div>

            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm 
                text-orang
                hover:bg-red-500/10 
                rounded-xl transition-all duration-200 
                active:scale-[0.98]"
            >
                <LogOut size={16} />
                <span>{t("logout")}</span>
            </button>

        </div>
    )
}