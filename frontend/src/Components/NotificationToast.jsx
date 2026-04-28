import { useEffect, useState } from "react"
import {
  X, ChevronDown, Info, AlertTriangle,
  XCircle, CheckCircle, GitCommit
} from "lucide-react"

const TYPE = {
  info:    { Icon: Info,        bg: "#0c1628", border: "#1e40af", iconBg: "#1e3a8a", iconColor: "#93c5fd", titleColor: "#dbeafe", barColor: "#3b82f6" },
  warning: { Icon: AlertTriangle, bg: "#1c1208", border: "#92400e", iconBg: "#78350f", iconColor: "#fcd34d", titleColor: "#fef3c7", barColor: "#f59e0b" },
  error:   { Icon: XCircle,     bg: "#1a0808", border: "#991b1b", iconBg: "#7f1d1d", iconColor: "#fca5a5", titleColor: "#fee2e2", barColor: "#ef4444" },
  success: { Icon: CheckCircle, bg: "#071a0c", border: "#166534", iconBg: "#14532d", iconColor: "#86efac", titleColor: "#dcfce7", barColor: "#22c55e" },
  commit:  { Icon: GitCommit,   bg: "#120b1f", border: "#6d28d9", iconBg: "#4c1d95", iconColor: "#d8b4fe", titleColor: "#ede9fe", barColor: "#a855f7" },
}

export default function NotificationToast({ notification, onClose }) {
  const [visible, setVisible]           = useState(false)
  const [openAccordion, setOpenAccordion] = useState(false)
  const [progress, setProgress]         = useState(100)

  const cfg = TYPE[notification?.type] || TYPE.info
  const { Icon } = cfg
  const hasAdditional = notification?.additional_data?.length > 0

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) { clearInterval(interval); handleClose(); return 0 }
        return p - 1  
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
      width: 350,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.97)",
      transition: "opacity 0.25s, transform 0.25s"
    }}>



      <div style={{ padding: "14px 14px 14px 14px" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          {/* Icon */}
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: cfg.iconBg, color: cfg.iconColor,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon size={16} color={cfg.iconColor} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: cfg.titleColor, lineHeight: 1.4 }}>
              {notification.title}
            </p>
            {notification.text && (
              <p style={{ margin: "3px 0 6px", fontSize: 11, color: "#9ca3af", lineHeight: 1.5 }}>
                {notification.text}
              </p>
            )}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              marginTop: 4, fontSize: 9, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: ".07em",
              padding: "2px 8px", borderRadius: 999,
              background: cfg.iconBg, color: cfg.iconColor
            }}>
              <Icon size={10} color={cfg.iconColor} />
              {notification.type}
            </span>
          </div>

          {/* Close */}
          <button onClick={handleClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#4b5563", padding: 2, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, transition: "color 0.15s"
          }}>
            <X size={14} />
          </button>
        </div>

        {/* Accordion */}
        {hasAdditional && (
          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => setOpenAccordion(p => !p)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "none", border: "none", cursor: "pointer",
                fontSize: 11, color: "#6b7280", padding: 0, width: "100%"
              }}
            >
              <ChevronDown
                size={13}
                style={{
                  transition: "transform 0.2s",
                  transform: openAccordion ? "rotate(180deg)" : "rotate(0deg)"
                }}
              />
              Qo'shimcha ma'lumotlar ({notification.additional_data.length})
            </button>

            {openAccordion && (
              <div style={{
                marginTop: 8, borderRadius: 8,
                overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)"
              }}>
                {notification.additional_data.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "6px 10px", fontSize: 11,
                    background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent"
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
            display: "inline-flex", marginTop: 10,
            fontSize: 11, color: cfg.iconColor, textDecoration: "none", gap: 4
          }}>
            Ko'rish →
          </a>
        )}
      </div>
    </div>
  )
}