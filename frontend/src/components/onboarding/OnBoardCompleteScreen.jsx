import { icons } from "./OnBoardIcons.jsx";
import { Link } from "react-router-dom";

export default function CompleteScreen({ answers }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center"
      style={{ animation: "slideInFromRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards" }}>
      <div className="w-20 h-20 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
        {icons.confetti}
      </div>
      <div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-3">You're all set!</h2>
        <p className="text-slate-400 text-base max-w-sm">
          Your workspace is being configured. We'll redirect you momentarily.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {Object.entries(answers).map(([step, val]) => (
          <span key={step} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-slate-300 font-mono">
            {val}
          </span>
        ))}
      </div>
      <Link
        to="/dashboard"
        className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center gap-2"
      >
        Launch Dashboard
        <span>{icons.arrow_right}</span>
      </Link>
    </div>
  );
}
