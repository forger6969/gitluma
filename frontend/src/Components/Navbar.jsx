import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3z" />
  </svg>
);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const isDark = theme === "dark";

  // 🔥 HAMMA RANGLAR BIR JOYDA
  const UI = {
    nav: isDark
      ? "bg-[#12151E]/95 border-b border-[#2B3141] text-white"
      : "bg-[#FCFCFD]/90 border-b border-[#E4E7F2] text-[#2B3141]",

    switchBg: isDark ? "#1A1F2B" : "var(--gl-bg-page)",
    border: isDark ? "#2B3141" : "var(--gl-border-subtle)",
    textMuted: isDark ? "#9CA3AF" : "var(--gl-muted)",
  };

  const NAV_LINKS = [{ label: t("platform") }];

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-8 py-3.5 transition-all duration-300 ${UI.nav}`}
      style={{
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 select-none">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center">
          ⚡
        </div>
        <span className="font-bold">GitLuma</span>
      </div>

      {/* Center */}
      <div className="hidden md:flex gap-2">
        {NAV_LINKS.map((link, i) => (
          <button key={i}>{link.label}</button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">

        {/* 🌍 LANG */}
        <div
          className="flex gap-1 px-1.5 py-1 rounded-lg"
          style={{
            background: UI.switchBg,
            border: `1px solid ${UI.border}`,
          }}
        >
          {["en", "uz", "ru"].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLang(lng)}
              style={{
                color: i18n.language === lng ? "#E8654A" : UI.textMuted,
              }}
            >
              {lng}
            </button>
          ))}
        </div>

        {/* 🌙 THEME */}
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg"
          style={{
            background: UI.switchBg,
            border: `1px solid ${UI.border}`,
            color: UI.textMuted,
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;