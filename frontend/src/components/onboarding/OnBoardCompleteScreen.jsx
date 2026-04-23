import { useTranslation } from "react-i18next";
import { icons } from "./OnBoardIcons.jsx";
import { Link } from "react-router-dom";

export default function CompleteScreen({ answers, isDark = false }) {
  const { t } = useTranslation();

  const chipBg     = isDark ? "#1A1F2E" : "#EEF1F7";
  const chipBorder = isDark ? "#2A3050" : "#C8CDD9";
  const chipText   = isDark ? "#C8D0E8" : "#2B3141";
  const descColor  = isDark ? "#8B97C8" : "#5C648B";
  const titleColor = isDark ? "#EEF1F7" : "#181D2A";

  return (
    <div
      className="flex flex-col items-center justify-center gap-8 text-center"
      style={{ animation:"slideInFromRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards" }}
    >
      {/* Success icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: isDark ? "rgba(232,101,74,0.15)" : "#FCEEE9",
          border: "2px solid rgba(232,101,74,0.3)",
          color: "#E8654A",
          boxShadow: "0 0 0 8px rgba(232,101,74,0.08)",
        }}
      >
        {icons.confetti}
      </div>

      <div>
        <h2
          className="text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: titleColor, letterSpacing:"-0.02em" }}
        >
          {t("ob_complete_title")}
        </h2>
        <p className="text-base max-w-sm leading-relaxed font-normal" style={{ color: descColor }}>
          {t("ob_complete_desc")}
        </p>
      </div>

      {/* Answer chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {Object.entries(answers).map(([step, val]) => (
          <span
            key={step}
            className="px-3 py-1 rounded-full text-xs font-semibold font-mono"
            style={{ background: chipBg, border:`1px solid ${chipBorder}`, color: chipText }}
          >
            {val}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/dashboard"
        className="px-8 py-3 rounded-xl text-white font-semibold text-sm tracking-wide flex items-center gap-2"
        style={{
          background: "#E8654A",
          boxShadow: "0 2px 16px rgba(232,101,74,0.3)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background  = "#D4512F";
          e.currentTarget.style.boxShadow   = "0 4px 24px rgba(232,101,74,0.4)";
          e.currentTarget.style.transform   = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background  = "#E8654A";
          e.currentTarget.style.boxShadow   = "0 2px 16px rgba(232,101,74,0.3)";
          e.currentTarget.style.transform   = "translateY(0)";
        }}
      >
        {t("ob_launch")}
        <span style={{ display:"inline-flex" }}>{icons.arrow_right}</span>
      </Link>
    </div>
  );
}
