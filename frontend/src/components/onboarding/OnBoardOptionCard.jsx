import { icons } from "./OnBoardIcons.jsx";

export default function OptionCard({ option, selected, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl
        border transition-all duration-300 cursor-pointer text-center
        ${selected
          ? "border-violet-500 bg-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          : "border-white/10 bg-white/5 hover:border-violet-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        }
      `}
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "cardReveal 0.5s ease forwards",
        opacity: 0,
        transform: "translateY(16px)",
      }}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
      )}

      <div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
          ${selected
            ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            : "bg-white/10 text-slate-400 group-hover:bg-violet-500/20 group-hover:text-violet-300"
          }
        `}
      >
        {icons[option.icon] || icons.code}
      </div>

      <div>
        <p className={`font-semibold text-sm tracking-wide transition-colors duration-300 ${selected ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
          {option.label}
        </p>
        <p className="text-[11px] tracking-widest uppercase mt-0.5 text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
          {option.sub}
        </p>
      </div>
    </button>
  );
}
