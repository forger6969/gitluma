import { icons } from "./OnBoardIcons.jsx";

export default function OptionCard({ option, selected, onClick, index }) {
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
        borderColor: selected ? "#E8654A" : "#C8CDD9",
        background: selected
          ? "#FCEEE9"
          : "#FFFFFF",
        boxShadow: selected
          ? "0 0 0 3px rgba(232,101,74,0.08), 0 3px 12px rgba(232,101,74,0.1)"
          : "0 1px 4px rgba(43,49,65,0.06)",
        transition: "border-color 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.55s cubic-bezier(0.22,1,0.36,1), background 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#E8654A";
          e.currentTarget.style.background = "#FDFAF9";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,101,74,0.08), 0 5px 14px rgba(232,101,74,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#C8CDD9";
          e.currentTarget.style.background = "#FFFFFF";
          e.currentTarget.style.boxShadow = "0 1px 4px rgba(43,49,65,0.06)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {/* Selected check badge */}
      {selected && (
        <span
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "#E8654A", animation: "badgeAppear 0.42s cubic-bezier(0.22,1,0.36,1) forwards, badgePulse 1.4s ease-in-out infinite 0.45s" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}

      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-250"
        style={{
          background: selected
            ? "#E8654A"
            : "#EEF1F7",
          color: selected ? "#FFFFFF" : "#5C648B",
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
          style={{
            color: selected ? "#E8654A" : "#181D2A",
            transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {option.label}
        </p>
        <p
          className="text-[11px] tracking-widest uppercase mt-0.5 font-medium"
          style={{
            color: selected ? "rgba(232,101,74,0.65)" : "#9AABB4",
            transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {option.sub}
        </p>
      </div>
    </button>
  );
}
