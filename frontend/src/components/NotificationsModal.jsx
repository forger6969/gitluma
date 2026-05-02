import { useEffect, useRef, useState } from "react"
import {
  Bell, CheckCheck, X, ChevronDown,
  Info, AlertTriangle, XCircle, CheckCircle, GitCommit
} from "lucide-react";
import { useSelector } from "react-redux";

/* TYPES (dark + light) */
const TYPE = {
  info: {
    Icon: Info,
    light: { color: "text-blue-600", bg: "bg-blue-100" },
    dark: { color: "text-blue-400", bg: "bg-blue-900/30" }
  },
  warning: {
    Icon: AlertTriangle,
    light: { color: "text-yellow-600", bg: "bg-yellow-100" },
    dark: { color: "text-yellow-400", bg: "bg-yellow-900/30" }
  },
  error: {
    Icon: XCircle,
    light: { color: "text-red-600", bg: "bg-red-100" },
    dark: { color: "text-red-400", bg: "bg-red-900/30" }
  },
  success: {
    Icon: CheckCircle,
    light: { color: "text-green-600", bg: "bg-green-100" },
    dark: { color: "text-green-400", bg: "bg-green-900/30" }
  },
  commit: {
    Icon: GitCommit,
    light: { color: "text-[#2B3141]", bg: "bg-[#EEF1F7]" },
    dark: { color: "text-[#C8CDD9]", bg: "bg-[#2B3141]" }
  }
};

/* TIME */
const timeAgo = (d) => {
  if (!d) return ""
  const s = Math.floor((Date.now() - new Date(d)) / 1000)
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

/* ITEM */
function NotifItem({ n, isUnread, d }) {
  const [open, setOpen] = useState(false);

  const cfg = TYPE[n?.type] || TYPE.info;
  const theme = d ? cfg.dark : cfg.light;
  const { Icon } = cfg;

  const hasExtra = n?.additional_data?.length > 0;

  return (
    <div
      onClick={() => hasExtra && setOpen(p => !p)}
      className={`px-4 py-3 cursor-pointer transition
        ${isUnread
          ? (d ? "bg-[#E8654A]/10" : "bg-[#E8654A]/5")
          : (d ? "hover:bg-[#161B27]" : "hover:bg-[#F4F6FB]")}`}
    >
      <div className="flex gap-3">

        {/* ICON */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.bg}`}>
          <Icon className={`w-4 h-4 ${theme.color}`} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${isUnread
              ? (d ? "text-[#EEF1F7] font-semibold" : "text-[#2B3141] font-semibold")
              : (d ? "text-[#5C6480]" : "text-[#7A8499]")}`}>
            {n.title}
          </p>
          {n.text && (
            <p className={`text-xs mt-0.5 line-clamp-2 ${d ? "text-[#5C6480]" : "text-gray-400"}`}>
              {n.text}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${theme.bg} ${theme.color}`}>
              {n.type}
            </span>

            <span className={`text-[10px] ${d ? "text-[#5C6480]" : "text-gray-400"}`}>
              {timeAgo(n.createdAt)}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0, marginTop: 2 }}>
          {isUnread && (
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
          )}
          {hasExtra && (
            <ChevronDown
              className={`w-4 h-4 ${d ? "text-[#5C6480]" : "text-gray-400"} transition ${open ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </div>

      {/* Accordion */}
      {open && hasExtra && (
        <div className={`mt-3 ml-12 rounded-xl p-3 border
          ${d ? "bg-[#0E1118] border-[#2B3141]" : "bg-[#F4F6FB] border-[#E6E9F2]"}`}>

          {n.additional_data.map((item, i) => (
            <div key={i} className="flex justify-between text-xs py-1">
              <span className={d ? "text-[#5C6480]" : "text-gray-500"}>
                {item.key}
              </span>
              <span className={`font-mono ${d ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}>
                {item.value}
              </span>
            </div>
          ))}

          {n.redirect_url && (() => {
            try {
              const url = new URL(n.redirect_url, window.location.origin);
              const safe = url.origin === window.location.origin ? url.href : null;
              return safe ? (
                <a href={safe} style={{
                  display: "inline-flex", marginTop: 8, gap: 4,
                  fontSize: 11, color: theme.color, textDecoration: "none"
                }}>
                  View →
                </a>
              ) : null;
            } catch {
              return null;
            }
          })()}
        </div>
      )}
    </div>
  )
}

export default function NotificationsModal({ notifications = [], loading, onClose }) {
  const ref = useRef();
  const d = useSelector(s => s.theme.mode) === "dark";

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [onClose])

  const unread = notifications.filter(n => n && !n.read)
  const read   = notifications.filter(n => n && n.read)

  return (
    <div
      ref={ref}
      className={`absolute right-0 top-12 w-[380px] z-50
        backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden
        ${d
          ? "bg-[#0E1118]/90 border-[#2B3141]"
          : "bg-white/90 border-[#E6E9F2]"}`}
    >

      {/* HEADER */}
      <div className={`flex items-center justify-between px-4 py-3 border-b
        ${d ? "border-[#2B3141]" : "border-[#EEF1F7]"}`}>

        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#E8654A]" />
          <p className={`text-sm font-semibold ${d ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}>
            Notifications
          </p>

          {unread.length > 0 && (
            <span style={{
              background: "#1d4ed8", color: "#bfdbfe",
              fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999
            }}>
              {unread.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className={`text-xs flex items-center gap-1 transition
            ${d ? "text-[#5C6480] hover:text-white" : "text-gray-500 hover:text-[#2B3141]"}`}>
            <CheckCheck className="w-4 h-4" />
            Mark all
          </button>

          <button onClick={onClose}>
            <X className={`w-4 h-4 transition ${d ? "text-[#5C6480] hover:text-white" : "text-gray-400 hover:text-black"}`} />
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="max-h-[420px] overflow-y-auto">

        {loading ? (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className={`w-9 h-9 rounded-xl ${d ? "bg-[#2B3141]" : "bg-gray-200"}`} />
                <div className="flex-1 space-y-2">
                  <div className={`h-3 rounded w-2/3 ${d ? "bg-[#2B3141]" : "bg-gray-200"}`} />
                  <div className={`h-3 rounded w-1/2 ${d ? "bg-[#2B3141]" : "bg-gray-200"}`} />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className={`flex flex-col items-center py-12 ${d ? "text-[#5C6480]" : "text-gray-400"}`}>
            <Bell className="w-6 h-6 mb-2" />
            No notifications
          </div>
        ) : (
          <>
            {unread.length > 0 && (
              <>
                <p style={{ fontSize: 9, fontWeight: 700, color: d ? "#5C6480" : "#9AA3BA", textTransform: "uppercase", letterSpacing: ".08em", padding: "14px 16px 6px", margin: 0 }}>
                  New
                </p>
                {unread.map((n, i) => (
                  <NotifItem key={n._id || i} n={n} isUnread d={d} />
                ))}
              </>
            )}
            {read.length > 0 && (
              <>
                <p style={{ fontSize: 9, fontWeight: 700, color: d ? "#5C6480" : "#9AA3BA", textTransform: "uppercase", letterSpacing: ".08em", padding: "14px 16px 6px", margin: 0 }}>
                  Earlier
                </p>
                {read.map((n, i) => (
                  <NotifItem key={n._id || i} n={n} d={d} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className={`border-t p-3 text-center ${d ? "border-[#2B3141]" : "border-[#EEF1F7]"}`}>
        <button className="text-sm text-[#E8654A] font-semibold hover:underline">
          View all →
        </button>
      </div>
    </div>
  )
}