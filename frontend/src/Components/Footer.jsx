import { useState } from "react";
import { useTranslation } from "react-i18next";

const GH_PATH = "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

const FooterLink = ({ children }) => {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <span
        className="text-sm cursor-pointer transition-all duration-150"
        style={{
          color:     hov ? "var(--gl-coral)" : "var(--gl-muted)",
          transform: hov ? "translateX(3px)" : "translateX(0)",
          display:   "inline-block",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {children}
      </span>
    </li>
  );
};

const Footer = () => {
  const { t }         = useTranslation();
  const [ghHov, setGhHov] = useState(false);

  const COLUMNS = [
    {
      title: "Product",
      links: ["Features", "Integrations",  "Changelog", "Roadmap"],
    },
    {
      title: "Developers",
      links: ["Documentation", "GitHub App",],
    },
    {
      title: t("company"),
      links: ["About",],
    },
  ];

  return (
    <footer
      style={{
        background:  "var(--gl-bg-card)",
        color:       "var(--gl-muted)",
        borderTop:   "1px solid var(--gl-border-subtle)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(232,101,74,0.12)" }}
              >
                <span className="text-base">⚡</span>
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ color: "var(--gl-heading)" }}>
                GitLuma
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--gl-muted)" }}>
              {t("footer_desc")}
            </p>

            {/* GitHub button */}
            <button
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 text-white"
              style={{
                background: ghHov ? "#3a4155" : "var(--gl-body)",
                transform:  ghHov ? "translateY(-1px)" : "translateY(0)",
                boxShadow:  ghHov ? "0 4px 16px rgba(43,49,65,0.3)" : "none",
              }}
              onMouseEnter={() => setGhHov(true)}
              onMouseLeave={() => setGhHov(false)}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d={GH_PATH} />
              </svg>
              {t("hero_github", "Get Started")}
            </button>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col, ci) => (
            <div key={ci}>
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--gl-heading)" }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link, li) => (
                  <FooterLink key={li}>{link}</FooterLink>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: "1px solid var(--gl-border-subtle)" }}
        >
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--gl-muted)" }}>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#22B07D" }}
              />
              <span style={{ color: "#22B07D" }} className="font-medium">
                {t("operational")}
              </span>
            </div>
            <span>·</span>
            <span>© 2024 GitLuma. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5 text-xs" style={{ color: "var(--gl-muted)" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
              <span
                key={i}
                className="cursor-pointer transition-colors duration-150 hover:text-current"
                style={{ color: "var(--gl-muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--gl-coral)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--gl-muted)"}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
