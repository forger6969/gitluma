import React, { useState, useEffect, useRef } from "react";
import { useC } from "./theme";

const ROLE_OPTIONS = [
  {
    value: "member",
    label: "Member",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    value: "owner",
    label: "Owner",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const RoleDropdown = ({ value, onChange }) => {
  const C = useC();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = ROLE_OPTIONS.find((o) => o.value === value) || ROLE_OPTIONS[0];
  const isOwner = value === "owner";

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg select-none"
        style={{
          backgroundColor: isOwner ? C.coralSubtle : C.inputBg,
          color: isOwner ? C.coral : C.muted,
          border: `1px solid ${isOwner ? "rgba(232,101,74,0.3)" : C.borderSubtle}`,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.96)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
      >
        <span style={{ color: isOwner ? C.coral : C.muted }}>{current.icon}</span>
        {current.label}
        <svg
          className="w-3 h-3 opacity-50"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-30"
          style={{
            backgroundColor: C.cardBg,
            border: `1px solid ${C.borderDef}`,
            boxShadow: "0 8px 24px rgba(43,49,65,0.14)",
            minWidth: "130px",
          }}
        >
          {ROLE_OPTIONS.map((opt) => {
            const active = opt.value === value;
            const optIsOwner = opt.value === "owner";
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-left"
                style={{
                  backgroundColor: active ? (optIsOwner ? C.coralBg : C.inputBg) : "transparent",
                  color: optIsOwner ? C.coral : C.muted,
                  transition: "background-color 0.1s",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = C.inputBg; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span style={{ color: optIsOwner ? C.coral : C.muted }}>{opt.icon}</span>
                {opt.label}
                {active && (
                  <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
