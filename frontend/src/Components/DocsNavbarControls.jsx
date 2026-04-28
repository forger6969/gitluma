import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { getDocsContent } from "../content/docsContent";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function DocsNavbarControls({ showDivider = false, className = "" }) {
  const { i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const currentLang = i18n.language?.split("-")[0] || "en";
  const docs = getDocsContent(i18n.language);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`.trim()}>
      <div
        className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl"
        style={{
          background: "var(--gl-bg-page)",
          border: "1px solid var(--gl-border-subtle)",
        }}
      >
        {["en", "uz", "ru"].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLang(lang)}
            aria-pressed={currentLang === lang}
            className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase transition-all duration-150"
            style={{
              color: currentLang === lang ? "var(--gl-coral)" : "var(--gl-muted)",
              background: currentLang === lang ? "var(--gl-coral-bg)" : "transparent",
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      <button
        onClick={toggle}
        title={theme === "light" ? docs.common.themeDark : docs.common.themeLight}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
        style={{
          background: "var(--gl-bg-page)",
          border: "1px solid var(--gl-border-subtle)",
          color: "var(--gl-muted)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.color = "var(--gl-coral)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.color = "var(--gl-muted)";
        }}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>

      {showDivider ? (
        <div className="w-px h-5" style={{ background: "var(--gl-border-subtle)" }} />
      ) : null}
    </div>
  );
}
