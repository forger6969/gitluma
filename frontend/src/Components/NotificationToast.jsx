import { useEffect, useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"

const TYPE = {
  info:    { icon: "ℹ",  bg: "#0c1628", border: "#1d4ed8", iconBg: "#1e3a8a", iconColor: "#93c5fd", titleColor: "#dbeafe", barColor: "#3b82f6" },
  warning: { icon: "⚠",  bg: "#1c1208", border: "#b45309", iconBg: "#78350f", iconColor: "#fcd34d", titleColor: "#fef3c7", barColor: "#f59e0b" },
  error:   { icon: "✕",  bg: "#1a0808", border: "#b91c1c", iconBg: "#7f1d1d", iconColor: "#fca5a5", titleColor: "#fee2e2", barColor: "#ef4444" },
  success: { icon: "✓",  bg: "#071a0c", border: "#15803d", iconBg: "#14532d", iconColor: "#86efac", titleColor: "#dcfce7", barColor: "#22c55e" },
  commit:  { icon: "⬡",  bg: "#120b1f", border: "#7c3aed", iconBg: "#4c1d95", iconColor: "#d8b4fe", titleColor: "#ede9fe", barColor: "#a855f7" },
}

export default function NotificationToast({ notification, onClose }) {
  const [visible, setVisible] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(false)
  const [progress, setProgress] = useState(100)

  const cfg = TYPE[notification?.type] || TYPE.info
  const hasAdditional = notification?.additional_data?.length > 0

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) { clearInterval(interval); onClose(); return 0 }
        return p - 2
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      zIndex: 9999,
      width: 360,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 14,
      boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-16px)",
      transition: "opacity 0.3s, transform 0.3s"
    }}>

      <div style={{ height: 3, background: "rgba(255,255,255,0.1)" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: cfg.barColor, transition: "width 0.1s" }} />
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: cfg.iconBg, color: cfg.iconColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, flexShrink: 0
          }}>
            {cfg.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: cfg.titleColor, lineHeight: 1.4 }}>
              {notification.title}
            </p>
            {notification.text && (
              <p style={{ margin: "3px 0 0", fontSize: 11, color: "#9ca3af", lineHeight: 1.5 }}>
                {notification.text}
              </p>
            )}
            <span style={{
              display: "inline-block", marginTop: 6,
              fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em",
              padding: "2px 8px", borderRadius: 999,
              background: cfg.iconBg, color: cfg.iconColor
            }}>
              {notification.type}
            </span>
          </div>

          <button onClick={handleClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#6b7280", fontSize: 14, flexShrink: 0, marginTop: 2, padding: 0
          }}>✕</button>
        </div>

        {hasAdditional && (
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setOpenAccordion(p => !p)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, color: "#9ca3af", padding: 0, width: "100%"
              }}
            >
              <span style={{ transition: "transform .2s", display: "inline-block", transform: openAccordion ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
              Qo'shimcha ma'lumotlar ({notification.additional_data.length})
            </button>

            {openAccordion && (
              <div style={{ marginTop: 8, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                {notification.additional_data.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "6px 12px", fontSize: 11,
                    background: i % 2 === 0 ? "rgba(255,255,255,0.05)" : "transparent"
                  }}>
                    <span style={{ color: "#9ca3af", fontWeight: 500 }}>{item.key}</span>
                    <span style={{ color: "#e2e8f0", marginLeft: 12, fontFamily: "monospace" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {notification.redirect_url && (
          <a href={notification.redirect_url} style={{
            display: "inline-flex", marginTop: 10, fontSize: 11,
            color: cfg.iconColor, textDecoration: "none", gap: 4
          }}>
            Ko'rish →
          </a>
        )}
      </div>
    </div>
  )
}