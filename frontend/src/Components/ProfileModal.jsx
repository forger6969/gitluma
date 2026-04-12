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
        const currentIndex = langs.indexOf(i18n.language)
        const nextLang = langs[(currentIndex + 1) % langs.length]

        i18n.changeLanguage(nextLang)
        localStorage.setItem("lang", nextLang)

        let lang = localStorage.getItem("lang")
        console.log(lang)


    }

    return (
        <div className="absolute right-0 mt-3 w-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-2 z-50">

            <div className="flex items-center gap-3 px-3 py-3 border-b border-white/10 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                    <User size={16} />
                </div>
                <div>
                    <p className="text-sm text-white font-medium">{t("account")}</p>
                    <p className="text-xs text-gray-400">{t("settingsPreferences")}</p>
                </div>
            </div>

            <button
                onClick={changeLanguage}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
                <Globe size={16} />
                <span className="flex-1 text-left">{t("changeLanguage")}</span>
                <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-md uppercase">
                    {i18n.language}
                </span>
            </button>

            <div className="my-2 border-t border-white/10"></div>

            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
            >
                <LogOut size={16} />
                <span>{t("logout")}</span>
            </button>

        </div>
    )
}