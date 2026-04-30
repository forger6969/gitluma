import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const LANGS = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbek" },
];

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const currentLang = i18n.language?.split("-")[0] || "en";

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "var(--gl-bg-page)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--gl-heading)" }}>
            {t("sidebar_settings")}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--gl-muted)" }}>
            {t("settings_subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {/* Language */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
          >
            <h2 className="font-semibold mb-4" style={{ color: "var(--gl-heading)" }}>
              {t("settings_language")}
            </h2>
            <div className="flex gap-3">
              {LANGS.map((lang) => {
                const active = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLang(lang.code)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                    style={{
                      background: active ? "#E8654A" : "var(--gl-bg-input)",
                      color: active ? "#ffffff" : "var(--gl-body)",
                      border: active ? "1px solid #E8654A" : "1px solid var(--gl-border-subtle)",
                    }}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
          >
            <h2 className="font-semibold mb-4" style={{ color: "var(--gl-heading)" }}>
              {t("settings_theme")}
            </h2>
            <div className="flex gap-3">
              {[
                { key: "light", icon: <SunIcon />, label: t("settings_theme_light") },
                { key: "dark", icon: <MoonIcon />, label: t("settings_theme_dark") },
              ].map((opt) => {
                const active = theme === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => { if (!active) toggle(); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                    style={{
                      background: active ? "#E8654A" : "var(--gl-bg-input)",
                      color: active ? "#ffffff" : "var(--gl-body)",
                      border: active ? "1px solid #E8654A" : "1px solid var(--gl-border-subtle)",
                    }}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
