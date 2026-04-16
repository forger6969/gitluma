import { useEffect, useRef, useState } from "react"
import {
  Bell, CheckCheck, X, ChevronDown,
  Info, AlertTriangle, XCircle, CheckCircle, GitCommit
} from "lucide-react"

/* ─── GitLuma palette ─────────────────────────────────────────────────────── */
const TYPE = {
  info:    { Icon: Info,          iconBg: "#DAE9FF", iconColor: "#1A4B8C", badgeBg: "#DAE9FF", badgeColor: "#1A4B8C" },
  warning: { Icon: AlertTriangle, iconBg: "#FFF3D6", iconColor: "#7C4F00", badgeBg: "#FFF3D6", badgeColor: "#7C4F00" },
  error:   { Icon: XCircle,       iconBg: "#FFE5DA", iconColor: "#7A2E10", badgeBg: "#FFE5DA", badgeColor: "#7A2E10" },
  success: { Icon: CheckCircle,   iconBg: "#D4F0E1", iconColor: "#1C5C3A", badgeBg: "#D4F0E1", badgeColor: "#1C5C3A" },
  commit:  { Icon: GitCommit,     iconBg: "#E5E8F0", iconColor: "#2B3141", badgeBg: "#E5E8F0", badgeColor: "#2B3141" },
}

const timeAgo = (d) => {
  if (!d) return ""
  const s = Math.floor((Date.now() - new Date(d)) / 1000)
  if (s < 60) return `${s}s oldin`
  if (s < 3600) return `${Math.floor(s / 60)}m oldin`
  if (s < 86400) return `${Math.floor(s / 3600)}h oldin`
  return `${Math.floor(s / 86400)}k oldin`
}

/* ─── Single notification row ─────────────────────────────────────────────── */
function NotifItem({ n, isUnread }) {
  const [open, setOpen] = useState(false)
  const cfg = TYPE[n?.type] || TYPE.info
  const { Icon } = cfg
  const hasExtra = n?.additional_data?.length > 0

  return (
    <div
      onClick={() => hasExtra && setOpen(p => !p)}
      style={{
        borderBottom: "1px solid #D8DCE8",
        cursor: hasExtra ? "pointer" : "default",
        background: isUnread ? "rgba(232,101,74,0.05)" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <div style={{ display: "flex", gap: 10, padding: "11px 16px", alignItems: "flex-start" }}>

        {/* Icon badge */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: cfg.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={14} color={cfg.iconColor} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0, fontSize: 12, lineHeight: 1.4,
            fontWeight: isUnread ? 600 : 400,
            color: isUnread ? "#2B3141" : "#7A8499",
          }}>
            {n.title}
          </p>
          {n.text && (
            <p style={{ margin: "2px 0 5px", fontSize: 11, color: "#9AA0AE", lineHeight: 1.4 }}>
              {n.text}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em",
              padding: "1px 7px", borderRadius: 999,
              background: cfg.badgeBg, color: cfg.badgeColor,
            }}>
              <Icon size={9} color={cfg.badgeColor} />
              {n.type}
            </span>
            <span style={{ fontSize: 10, color: "#7A8499" }}>{timeAgo(n.createdAt)}</span>
          </div>
        </div>

        {/* Right indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0, marginTop: 2 }}>
          {isUnread && (
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8654A" }} />
          )}
          {hasExtra && (
            <ChevronDown
              size={13}
              color="#7A8499"
              style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          )}
        </div>
      </div>

      {/* Accordion */}
      {open && hasExtra && (
        <div style={{ background: "#EEF1F7", padding: "8px 16px 12px 58px" }}>
          <p style={{
            margin: "0 0 6px", fontSize: 9, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: ".07em", color: "#7A8499",
          }}>
            Qo'shimcha ma'lumotlar
          </p>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #D8DCE8" }}>
            {n.additional_data.map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "6px 10px", fontSize: 11,
                background: i % 2 === 0 ? "#ffffff" : "#EEF1F7",
              }}>
                <span style={{ color: "#7A8499", fontWeight: 500 }}>{item.key}</span>
                <span style={{ color: "#2B3141", marginLeft: 12, fontFamily: "monospace" }}>{item.value}</span>
              </div>
            ))}
          </div>
          {n.redirect_url && (
            <a href={n.redirect_url} style={{
              display: "inline-flex", marginTop: 8, gap: 4,
              fontSize: 11, color: "#E8654A", textDecoration: "none",
            }}>
              Ko'rish →
            </a>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Modal ───────────────────────────────────────────────────────────────── */
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
      width: 370, background: "#ffffff",
      border: "1px solid #D8DCE8",
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 8px 32px rgba(43,49,65,0.12)",
    }}>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", borderBottom: "1px solid #D8DCE8",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell size={15} color="#E8654A" />
          <span style={{ color: "#2B3141", fontWeight: 600, fontSize: 13 }}>Notifications</span>
          {unread.length > 0 && (
            <span style={{
              background: "#FFE5DA", color: "#7A2E10",
              fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
            }}>
              {unread.length}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#7A8499", fontSize: 11,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <CheckCheck size={13} /> Mark all read
          </button>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#7A8499", display: "flex" }}
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
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#D8DCE8", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
                  <div style={{ height: 11, background: "#D8DCE8", borderRadius: 6, width: "70%" }} />
                  <div style={{ height: 11, background: "#D8DCE8", borderRadius: 6, width: "45%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 0", gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", background: "#EEF1F7",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Bell size={18} color="#7A8499" />
            </div>
            <p style={{ color: "#7A8499", fontSize: 13, margin: 0 }}>Hozircha notification yo'q</p>
          </div>
        ) : (
          <>
            {unread.length > 0 && (
              <>
                <p style={{
                  fontSize: 9, fontWeight: 700, color: "#7A8499",
                  textTransform: "uppercase", letterSpacing: ".08em",
                  padding: "14px 16px 6px", margin: 0,
                }}>
                  Yangi
                </p>
                {unread.map((n, i) => <NotifItem key={n._id || i} n={n} isUnread />)}
              </>
            )}
            {read.length > 0 && (
              <>
                <p style={{
                  fontSize: 9, fontWeight: 700, color: "#7A8499",
                  textTransform: "uppercase", letterSpacing: ".08em",
                  padding: "14px 16px 6px", margin: 0,
                }}>
                  Oldingi
                </p>
                {read.map((n, i) => <NotifItem key={n._id || i} n={n} />)}
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #D8DCE8", padding: "10px 16px", textAlign: "center" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#E8654A", fontSize: 11 }}>
          Barchasini ko'rish →
        </button>
      </div>
    </div>
  )
}