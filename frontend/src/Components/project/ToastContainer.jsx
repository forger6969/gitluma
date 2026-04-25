import React, { useState, useEffect } from "react";
import { useC } from "./theme";

const TOAST_ICONS = {
  commit: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" />
    </svg>
  ),
  task: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

export const Toast = ({ toast, onDismiss }) => {
  const C = useC();
  const TOAST_ACCENT = {
    commit: { border: C.coral,   bg: C.coralBg,   icon: C.coral,   bar: C.coral   },
    task:   { border: C.success, bg: C.successBg, icon: C.success, bar: C.success },
  };
  const [visible, setVisible] = useState(false);
  const accent = TOAST_ACCENT[toast.type] || TOAST_ACCENT.commit;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300); }, 4500);
    return () => clearTimeout(t);
  }, [onDismiss, toast.id]);

  return (
    <div
      style={{
        backgroundColor: C.cardBg,
        border: `1px solid ${accent.border}`,
        borderRadius: "14px",
        boxShadow: "0 8px 28px rgba(43,49,65,0.16)",
        padding: "12px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        minWidth: "300px",
        maxWidth: "360px",
        position: "relative",
        overflow: "hidden",
        transition: "opacity 0.3s, transform 0.3s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
      }}
    >
      <div style={{
        width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
        backgroundColor: accent.bg, color: accent.icon,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {TOAST_ICONS[toast.type]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: C.heading, marginBottom: "2px" }}>{toast.title}</p>
        <p style={{ fontSize: "11px", color: C.muted, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{toast.body}</p>
      </div>
      <button onClick={() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300); }}
        style={{ color: C.placeholder, flexShrink: 0, lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: "3px", width: "100%", backgroundColor: accent.bar, opacity: 0.35, borderRadius: "0 0 14px 14px",
      }} />
    </div>
  );
};

const ToastContainer = ({ toasts, onDismiss }) => (
  <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
    {toasts.map((t) => <Toast key={t.id} toast={t} onDismiss={onDismiss} />)}
  </div>
);

export default ToastContainer;
