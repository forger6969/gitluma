import { icons } from "./OnBoardIcons.jsx";
import { Link } from "react-router-dom";

export default function CompleteScreen({ answers }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-8 text-center"
      style={{ animation: "slideInFromRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards" }}
    >
      {/* Success icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "#FCEEE9",
          border: "2px solid rgba(232,101,74,0.3)",
          color: "#E8654A",
          boxShadow: "0 0 0 8px rgba(232,101,74,0.08)",
        }}
      >
        {icons.confetti}
      </div>

      {/* Text */}
      <div>
        <h2
          className="text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: "#181D2A", letterSpacing: "-0.02em" }}
        >
          You're all set!
        </h2>
        <p
          className="text-base max-w-sm leading-relaxed font-normal"
          style={{ color: "#5C648B" }}
        >
          Your workspace is being configured. We'll redirect you momentarily.
        </p>
      </div>

      {/* Answer chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {Object.entries(answers).map(([step, val]) => (
          <span
            key={step}
            className="px-3 py-1 rounded-full text-xs font-semibold font-mono"
            style={{
              background: "#EEF1F7",
              border: "1px solid #C8CDD9",
              color: "#2B3141",
            }}
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
          e.currentTarget.style.background = "#D4512F";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(232,101,74,0.4)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "#E8654A";
          e.currentTarget.style.boxShadow = "0 2px 16px rgba(232,101,74,0.3)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Launch Dashboard
        <span style={{ display: "inline-flex" }}>{icons.arrow_right}</span>
      </Link>
    </div>
  );
}
