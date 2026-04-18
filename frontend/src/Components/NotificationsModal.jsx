import { useEffect, useRef, useState } from "react";
import {
  Bell, CheckCheck, X, ChevronDown,
  Info, AlertTriangle, XCircle, CheckCircle, GitCommit
} from "lucide-react";

/* TYPES */
const TYPE = {
  info:    { Icon: Info,          color: "text-blue-600", bg: "bg-blue-100" },
  warning: { Icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100" },
  error:   { Icon: XCircle,       color: "text-red-600", bg: "bg-red-100" },
  success: { Icon: CheckCircle,   color: "text-green-600", bg: "bg-green-100" },
  commit:  { Icon: GitCommit,     color: "text-[#2B3141]", bg: "bg-[#EEF1F7]" },
};

const timeAgo = (d) => {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
};

/* ITEM */
function NotifItem({ n, isUnread }) {
  const [open, setOpen] = useState(false);
  const cfg = TYPE[n?.type] || TYPE.info;
  const { Icon } = cfg;

  const hasExtra = n?.additional_data?.length > 0;

  return (
    <div
      onClick={() => hasExtra && setOpen(p => !p)}
      className={`px-4 py-3 cursor-pointer transition
      ${isUnread ? "bg-[#E8654A]/5" : "hover:bg-[#F4F6FB]"}`}
    >
      <div className="flex gap-3">

        {/* ICON */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cfg.bg}`}>
          <Icon className={`w-4 h-4 ${cfg.color}`} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${isUnread ? "font-semibold text-[#2B3141]" : "text-[#7A8499]"}`}>
            {n.title}
          </p>

          {n.text && (
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
              {n.text}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cfg.bg} ${cfg.color}`}>
              {n.type}
            </span>
            <span className="text-[10px] text-gray-400">
              {timeAgo(n.createdAt)}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {isUnread && <div className="w-2 h-2 bg-[#E8654A] rounded-full" />}
          {hasExtra && (
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition ${open ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </div>

      {/* EXTRA */}
      {open && hasExtra && (
        <div className="mt-3 ml-12 bg-[#F4F6FB] rounded-xl p-3 border border-[#E6E9F2]">
          {n.additional_data.map((item, i) => (
            <div key={i} className="flex justify-between text-xs py-1">
              <span className="text-gray-500">{item.key}</span>
              <span className="text-[#2B3141] font-mono">{item.value}</span>
            </div>
          ))}

          {n.redirect_url && (
            <a
              href={n.redirect_url}
              className="text-xs text-[#E8654A] mt-2 inline-block font-semibold"
            >
              Open →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* MODAL */
export default function NotificationsModal({ notifications = [], loading, onClose }) {
  const ref = useRef();

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const unread = notifications.filter(n => !n?.read);
  const read = notifications.filter(n => n?.read);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 w-[380px] z-50
      bg-white/90 backdrop-blur-xl border border-[#E6E9F2]
      rounded-2xl shadow-xl overflow-hidden"
    >

      <div className="flex items-center justify-between px-4 py-3 border-b border-[#EEF1F7]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#E8654A]" />
          <p className="text-sm font-semibold text-[#2B3141]">Notifications</p>

          {unread.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFE5DA] text-[#E8654A] font-bold">
              {unread.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-[#2B3141] transition">
            <CheckCheck className="w-4 h-4" />
            Mark all
          </button>

          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-400 hover:text-black transition" />
          </button>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto">

        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-gray-400">
            <Bell className="w-6 h-6 mb-2" />
            No notifications
          </div>
        ) : (
          <>
            {unread.length > 0 && (
              <>
                <p className="text-[10px] px-4 pt-4 pb-2 text-gray-400 uppercase font-bold">
                  New
                </p>
                {unread.map((n, i) => (
                  <NotifItem key={n._id || i} n={n} isUnread />
                ))}
              </>
            )}

            {read.length > 0 && (
              <>
                <p className="text-[10px] px-4 pt-4 pb-2 text-gray-400 uppercase font-bold">
                  Earlier
                </p>
                {read.map((n, i) => (
                  <NotifItem key={n._id || i} n={n} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <div className="border-t border-[#EEF1F7] p-3 text-center">
        <button className="text-sm text-[#E8654A] font-semibold hover:underline">
          View all →
        </button>
      </div>
    </div>
  );
}