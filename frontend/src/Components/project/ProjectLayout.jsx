import React from "react";
import { useC } from "./theme";

export const Section = ({ children }) => {
  const C = useC();
  return (
    <div className="rounded-2xl p-6"
      style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
      {children}
    </div>
  );
};

export const SectionTitle = ({ children, count }) => {
  const C = useC();
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <h2 className="text-base font-semibold" style={{ color: C.heading }}>{children}</h2>
      {count !== undefined && (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: C.inputBg, color: C.muted }}>{count}</span>
      )}
    </div>
  );
};

export const StatCard = ({ title, value, icon }) => {
  const C = useC();
  return (
    <div className="rounded-2xl p-5 flex items-center gap-4"
      style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: C.coralBg }}>{icon}</div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: C.placeholder }}>{title}</p>
        <p className="text-lg font-bold mt-0.5" style={{ color: C.heading }}>{value || "—"}</p>
      </div>
    </div>
  );
};
