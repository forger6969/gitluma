import { useEffect, useRef } from "react"
import { Bell, Check, CheckCheck, Info, AlertTriangle, GitCommit, X } from "lucide-react"

const iconMap = {
  info: <Info className="w-4 h-4 text-blue-400" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
  commit: <GitCommit className="w-4 h-4 text-green-400" />,
  default: <Bell className="w-4 h-4 text-gray-400" />,
}

const timeAgo = (dateStr) => {
  if (!dateStr) return ""
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function NotificationsModal({ notifications = [], loading, onClose }) {
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  const unread = notifications.filter(n => !n.read)
  const read = notifications.filter(n => n.read)

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-50 w-[380px] bg-[#0f1724] border border-gray-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700/50">

        <button className="text-gray-400 hover:text-blue-400 text-xs flex items-center gap-1 transition-colors">
          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
        </button>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">
        {loading ? (
          <div className="flex flex-col gap-3 p-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-700 rounded-full shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-gray-500 text-sm">No notifications yet</p>
          </div>
        ) : (
          <>
            {unread.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 pt-4 pb-2">
                  New
                </p>
                {unread.map((n, i) => (
                  <NotificationItem key={n._id || i} n={n} isUnread />
                ))}
              </div>
            )}

            {read.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 pt-4 pb-2">
                  Earlier
                </p>
                {read.map((n, i) => (
                  <NotificationItem key={n._id || i} n={n} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="border-t border-gray-700/50 px-5 py-3 text-center">
        <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
          View all notifications →
        </button>
      </div>
    </div>
  )
}

function NotificationItem({ n, isUnread }) {
  return (
    <div className={`flex items-center justify-between gap-3 px-5 py-3.5 cursor-pointer transition-colors hover:bg-white/5 ${isUnread ? "bg-blue-500/5" : ""}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUnread ? "bg-blue-500/15" : "bg-gray-800"}`}>
          {iconMap[n.type] || iconMap.default}
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className={`text-sm leading-snug ${isUnread ? "text-white font-medium" : "text-gray-300"}`}>
            {n}
          </p>
          {n.description && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">{n.description}</p>
          )}
          <p className="text-[11px] text-gray-600 mt-1">{timeAgo(n.createdAt)}</p>
        </div>
      </div>

      {isUnread && (
        <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />
      )}
    </div>
  )
}