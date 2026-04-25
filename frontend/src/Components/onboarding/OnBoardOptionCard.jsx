import { icons } from "./OnBoardIcons.jsx";

export default function OptionCard({ option, selected, onClick, index, isDark = false }) {
  const cardBg = selected
    ? (isDark ? "rgba(232,101,74,0.18)" : "#FCEEE9")
    : (isDark ? "#1A1F2E" : "#FFFFFF");

  const cardBorder = selected ? "#E8654A" : (isDark ? "#2A3050" : "#C8CDD9");

  const cardShadow = selected
    ? "0 0 0 3px rgba(232,101,74,0.12), 0 3px 12px rgba(232,101,74,0.14)"
    : (isDark ? "0 1px 6px rgba(0,0,0,0.3)" : "0 1px 4px rgba(43,49,65,0.06)");

  const iconBg = selected ? "#E8654A" : (isDark ? "#252B3E" : "#EEF1F7");
  const iconColor = selected ? "#FFFFFF" : (isDark ? "#8B97C8" : "#5C648B");

  const labelColor = selected ? "#E8654A" : (isDark ? "#EEF1F7" : "#181D2A");
  const subColor = selected
    ? "rgba(232,101,74,0.65)"
    : (isDark ? "#4A5580" : "#9AABB4");

  const hoverBg    = isDark ? "#1E2436"  : "#FDFAF9";
  const hoverBorder= "#E8654A";
  const hoverShadow= "0 0 0 3px rgba(232,101,74,0.08), 0 5px 14px rgba(232,101,74,0.10)";

  const resetBg    = isDark ? "#1A1F2E"  : "#FFFFFF";
  const resetBorder= isDark ? "#2A3050"  : "#C8CDD9";
  const resetShadow= isDark ? "0 1px 6px rgba(0,0,0,0.3)" : "0 1px 4px rgba(43,49,65,0.06)";

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl text-center"
      style={{
        animationDelay: `${index * 60}ms`,
        animation: selected
          ? "cardReveal 0.5s ease forwards, cardSelectedGlow 1.8s ease-in-out infinite 0.5s, cardFloat 2.8s ease-in-out infinite 0.6s"
          : "cardReveal 0.5s ease forwards, cardIdlePulse 3.2s ease-in-out infinite 0.7s",
        opacity: 0,
        transform: "translateY(14px)",
        border: "2px solid",
        borderColor: cardBorder,
        background: cardBg,
        boxShadow: cardShadow,
        transition: "border-color 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.55s cubic-bezier(0.22,1,0.36,1), background 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = hoverBorder;
          e.currentTarget.style.background  = hoverBg;
          e.currentTarget.style.boxShadow   = hoverShadow;
          e.currentTarget.style.transform   = "translateY(-2px)";
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = resetBorder;
          e.currentTarget.style.background  = resetBg;
          e.currentTarget.style.boxShadow   = resetShadow;
          e.currentTarget.style.transform   = "translateY(0)";
        }
      }}
    >
      {/* Check badge */}
      {selected && (
        <span
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background:"#E8654A", animation:"badgeAppear 0.42s cubic-bezier(0.22,1,0.36,1) forwards, badgePulse 1.4s ease-in-out infinite 0.45s" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: iconBg,
          color: iconColor,
          animation: selected ? "iconSelectedBreath 1.35s ease-in-out infinite" : "none",
          transition: "background-color 0.55s cubic-bezier(0.22,1,0.36,1), color 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {icons[option.icon] || icons.code}
      </div>

      {/* Labels */}
      <div>
        <p
          className="font-semibold text-sm tracking-tight"
          style={{ color: labelColor, transition:"color 0.45s cubic-bezier(0.22,1,0.36,1)" }}
        >
          {option.label}
        </p>
        <p
          className="text-[11px] tracking-widest uppercase mt-0.5 font-medium"
          style={{ color: subColor, transition:"color 0.45s cubic-bezier(0.22,1,0.36,1)" }}
        >
          {option.sub}
        </p>
      </div>
    </button>
  );
}
