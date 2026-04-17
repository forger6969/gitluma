import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const GH_PATH = "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [btnHover,   setBtnHover]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const NAV_LINKS = [
    { label: t("platform") },
    { label: t("documentation") },
    { label: t("changelog") },
  ];

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-3.5 transition-all duration-300"
      style={{
        background:    "var(--gl-bg-card)",
        borderBottom:  `1px solid ${scrolled ? "var(--gl-border-subtle)" : "var(--gl-border-subtle)"}`,
        boxShadow:     scrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 select-none">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-110"
          style={{ background: "rgba(232,101,74,0.12)" }}
        >
          <span className="text-sm">⚡</span>
        </div>
        <span className="text-[17px] font-bold tracking-tight" style={{ color: "var(--gl-heading)" }}>
          GitLuma
        </span>
        <span
          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-0.5"
          style={{ background: "var(--gl-coral-bg)", color: "var(--gl-coral)" }}
        >
          BETA
        </span>
      </div>

      {/* Center nav links */}
      <div className="hidden md:flex items-center gap-0.5">
        {NAV_LINKS.map((link, i) => (
          <button
            key={i}
            className="relative px-3.5 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium"
            style={{
              color:      activeLink === i ? "var(--gl-coral)"     : "var(--gl-muted)",
              background: activeLink === i ? "var(--gl-coral-bg)"  : "transparent",
            }}
            onMouseEnter={() => setActiveLink(i)}
            onMouseLeave={() => setActiveLink(null)}
          >
            {link.label}
            {activeLink === i && (
              <span
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                style={{ background: "var(--gl-coral)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5">
        {/* Language switcher */}
        <div
          className="flex gap-0.5 px-1.5 py-1 rounded-lg"
          style={{
            background: "var(--gl-bg-page)",
            border: "1px solid var(--gl-border-subtle)",
          }}
        >
          {["en", "uz", "ru"].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLang(lng)}
              className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase transition-all duration-150"
              style={{
                color:      i18n.language === lng ? "var(--gl-coral)"    : "var(--gl-muted)",
                background: i18n.language === lng ? "var(--gl-coral-bg)" : "transparent",
              }}
            >
              {lng}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={theme === "light" ? "Dark mode" : "Light mode"}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
          style={{
            background: "var(--gl-bg-page)",
            border:     "1px solid var(--gl-border-subtle)",
            color:      "var(--gl-muted)",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--gl-coral)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--gl-muted)"}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: "var(--gl-border-subtle)" }} />

        {/* CTA — Get Started */}
        <button
          className="hidden sm:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all duration-200"
          style={{
            background:  btnHover ? "#D4512F" : "#E8654A",
            boxShadow:   btnHover ? "0 4px 16px rgba(232,101,74,0.4)" : "0 2px 8px rgba(232,101,74,0.25)",
            transform:   btnHover ? "translateY(-1px)" : "translateY(0)",
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d={GH_PATH} />
          </svg>
          {t("hero_github", "Get Started")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
