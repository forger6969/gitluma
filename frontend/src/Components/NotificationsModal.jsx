import { useEffect, useRef, useState } from "react"
import {
  Bell, CheckCheck, X, ChevronDown,
  Info, AlertTriangle, XCircle, CheckCircle, GitCommit
} from "lucide-react"

const TYPE = {
  info:    { Icon: Info,          iconBg: "#1e3a8a", iconColor: "#93c5fd", badgeBg: "#1e3a8a", badgeColor: "#93c5fd" },
  warning: { Icon: AlertTriangle, iconBg: "#78350f", iconColor: "#fcd34d", badgeBg: "#78350f", badgeColor: "#fcd34d" },
  error:   { Icon: XCircle,       iconBg: "#7f1d1d", iconColor: "#fca5a5", badgeBg: "#7f1d1d", badgeColor: "#fca5a5" },
  success: { Icon: CheckCircle,   iconBg: "#14532d", iconColor: "#86efac", badgeBg: "#14532d", badgeColor: "#86efac" },
  commit:  { Icon: GitCommit,     iconBg: "#4c1d95", iconColor: "#d8b4fe", badgeBg: "#4c1d95", badgeColor: "#d8b4fe" },
}

const timeAgo = (d) => {
  if (!d) return ""
  const s = Math.floor((Date.now() - new Date(d)) / 1000)
  if (s < 60) return `${s}s oldin`
  if (s < 3600) return `${Math.floor(s / 60)}m oldin`
  if (s < 86400) return `${Math.floor(s / 3600)}h oldin`
  return `${Math.floor(s / 86400)}k oldin`
}

function NotifItem({ n, isUnread }) {
  const [open, setOpen] = useState(false)
  const cfg = TYPE[n?.type] || TYPE.info
  const { Icon } = cfg
  const hasExtra = n?.additional_data?.length > 0

  return (
    <div
      onClick={() => hasExtra && setOpen(p => !p)}
      style={{
        borderBottom: "1px solid #0f172a",
        cursor: hasExtra ? "pointer" : "default",
        background: isUnread ? "rgba(59,130,246,0.05)" : "transparent",
        transition: "background 0.15s"
      }}
    >
      <div style={{ display: "flex", gap: 10, padding: "11px 16px", alignItems: "flex-start" }}>
        {/* Icon */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: cfg.iconBg, color: cfg.iconColor,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon size={14} color={cfg.iconColor} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0, fontSize: 12, lineHeight: 1.4,
            fontWeight: isUnread ? 600 : 400,
            color: isUnread ? "#f1f5f9" : "#94a3b8"
          }}>
            {n.title}
          </p>
          {n.text && (
            <p style={{ margin: "2px 0 5px", fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>
              {n.text}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em",
              padding: "1px 7px", borderRadius: 999,
              background: cfg.badgeBg, color: cfg.badgeColor
            }}>
              <Icon size={9} color={cfg.badgeColor} />
              {n.type}
            </span>
            <span style={{ fontSize: 10, color: "#374151" }}>{timeAgo(n.createdAt)}</span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0, marginTop: 2 }}>
          {isUnread && (
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
          )}
          {hasExtra && (
            <ChevronDown
              size={13}
              color="#4b5563"
              style={{
                transition: "transform 0.2s",
                transform: open ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          )}
        </div>
      </div>

      {/* Accordion */}
      {open && hasExtra && (
        <div style={{ background: "#080d18", padding: "8px 16px 12px 58px" }}>
          <p style={{
            margin: "0 0 6px", fontSize: 9, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: ".07em", color: "#374151"
          }}>
            Qo'shimcha ma'lumotlar
          </p>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
            {n.additional_data.map((item, i) => (
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
          {n.redirect_url && (
            <a href={n.redirect_url} style={{
              display: "inline-flex", marginTop: 8, gap: 4,
              fontSize: 11, color: cfg.iconColor, textDecoration: "none"
            }}>
              Ko'rish →
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function NotificationsModal({ notifications = [], loading, onClose }) {
  const ref = useRef()

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [onClose])

  const unread = notifications.filter(n => n && !n.read)
  const read   = notifications.filter(n => n && n.read)

  return (
    <div ref={ref} style={{
      position: "absolute", right: 0, top: 48, zIndex: 50,
      width: 370, background: "#0f1724",
      border: "1px solid #1e293b",
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", borderBottom: "1px solid #1e293b"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell size={15} color="#60a5fa" />
          <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 13 }}>Notifications</span>
          {unread.length > 0 && (
            <span style={{
              background: "#1d4ed8", color: "#bfdbfe",
              fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999
            }}>
              {unread.length}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#6b7280", fontSize: 11,
            display: "flex", alignItems: "center", gap: 4
          }}>
            <CheckCheck size={13} /> Mark all read
          </button>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex" }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ maxHeight: 440, overflowY: "auto" }}>
        {loading ? (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1f2937", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
                  <div style={{ height: 11, background: "#1f2937", borderRadius: 6, width: "70%" }} />
                  <div style={{ height: 11, background: "#1f2937", borderRadius: 6, width: "45%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 0", gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", background: "#1f2937",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Bell size={18} color="#6b7280" />
            </div>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>Hozircha notification yo'q</p>
          </div>
        ) : (
          <>
            {unread.length > 0 && (
              <>
                <p style={{ fontSize: 9, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: ".08em", padding: "14px 16px 6px", margin: 0 }}>
                  Yangi
                </p>
                {unread.map((n, i) => <NotifItem key={n._id || i} n={n} isUnread />)}
              </>
            )}
            {read.length > 0 && (
              <>
                <p style={{ fontSize: 9, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: ".08em", padding: "14px 16px 6px", margin: 0 }}>
                  Oldingi
                </p>
                {read.map((n, i) => <NotifItem key={n._id || i} n={n} />)}
              </>
            )}
          </>
        )}
      </div>

      <div style={{ borderTop: "1px solid #1e293b", padding: "10px 16px", textAlign: "center" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#60a5fa", fontSize: 11 }}>
          Barchasini ko'rish →
        </button>
      </div>
    </div>
  )
}