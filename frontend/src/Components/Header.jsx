import { Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import NotificationToast from "./NotificationToast";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getNotifications, markAllAsRead } from "../store/slices/notificationSlice";
import { useLocation } from "react-router-dom";
import search from "../assets/search.svg";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const rateLimit = useSelector(s => s.rateLimit);
  const { notifications, loading, loaded } = useSelector(s => s.notifications);
  const { user } = useSelector(s => s.user);
  const mode = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const location = useLocation();

  const prevCountRef = useRef(null);
  const prevRateLimitActiveRef = useRef(false);
  const lastRateLimitToastRef = useRef(null);
  const audioRef = useRef(null);

  const isDark = mode === "dark";

  const safeNotifications = Array.isArray(notifications)
    ? notifications.filter(n => n && typeof n === "object")
    : [];

  const unreadCount = safeNotifications.filter(n => !n.read).length;

  useEffect(() => {
    audioRef.current = new Audio("/notification.wav");
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    if (!loaded && !notifications.length && !rateLimit?.active) {
      dispatch(getNotifications());
    }
  }, [dispatch, loaded, notifications.length, rateLimit?.active]);

  useEffect(() => {
    const wasActive = prevRateLimitActiveRef.current;
    const isActive = !!rateLimit?.active;

    if (wasActive && !isActive && rateLimit?.lastClearedAt) {
      if (lastRateLimitToastRef.current !== rateLimit.lastClearedAt) {
        lastRateLimitToastRef.current = rateLimit.lastClearedAt;

        setToasts(prev => [
          ...prev,
          {
            toastId: `rateLimit-${rateLimit.lastClearedAt}`,
            type: "success",
            title: "Too many requests",
            text: "Rate limit tugadi. Davom etishingiz mumkin.",
          }
        ]);
      }
    }

    prevRateLimitActiveRef.current = isActive;
  }, [rateLimit?.active, rateLimit?.lastClearedAt]);

  useEffect(() => {
    if (showNotifications && safeNotifications.length > 0) {
      dispatch(markAllAsRead());
    }
  }, [showNotifications]);

  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current = safeNotifications.length;
      return;
    }

    const newCount = safeNotifications.length;
    const prevCount = prevCountRef.current;

    if (newCount > prevCount) {
      audioRef.current?.play().catch(() => {});

      const newNotifs = safeNotifications.slice(0, newCount - prevCount);
      const newToasts = newNotifs.map(n => ({
        ...n,
        toastId: `${n.id}-${Date.now()}`
      }));

      setToasts(prev => [...prev, ...newToasts]);
    }

    prevCountRef.current = newCount;
  }, [safeNotifications.length]);

  const removeToast = (toastId) =>
    setToasts(prev => prev.filter(t => t.toastId !== toastId));

  if (!user) return null;
  const u = user.user;

  return (
    <div className="fixed top-0 right-0 w-[83.35%] z-10">

      <div
        className={`
          backdrop-blur-xl border-b px-6 py-[12.6px]
          flex items-center justify-between shadow-sm transition-colors duration-200
          ${isDark
            ? "bg-[#12151E]/95 border-[#2B3141] text-white"
            : "bg-[#FCFCFD]/90 border-[#E4E7F2] text-[#2B3141]"
          }
        `}
      >

        <div
          className={`
            flex items-center gap-3 px-4 py-2.5 rounded-lg w-[420px]
            border transition duration-200
            focus-within:border-[#E8654A]/50 focus-within:shadow-sm
            ${isDark
              ? "bg-[#1E2235] border-[#2B3141] focus-within:bg-[#232942]"
              : "bg-[#F4F6FB] border-transparent focus-within:bg-white"
            }
          `}
        >
          <img width={18} src={search} alt="" className="opacity-50" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className={`
              bg-transparent outline-none text-sm w-full transition-colors
              ${isDark
                ? "placeholder:text-[#7a7d8e] text-[#C8CDD9]"
                : "placeholder:text-gray-400 text-[#2B3141]"
              }
            `}
          />
        </div>

        <div className="flex items-center gap-4">

          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(prev => !prev);
                if (!loaded && !safeNotifications.length && !rateLimit?.active) {
                  dispatch(getNotifications());
                }
              }}
              className={`
                relative p-2.5 rounded-xl transition
                ${isDark
                  ? "bg-[#1E2235] hover:bg-[#2B3141] text-[#9AA0B4] hover:text-[#EEF1F7]"
                  : "bg-[#F4F6FB] hover:bg-[#EEF1F7] text-[#2B3141]"
                }
              `}
            >
              <Bell className="w-5 h-5" />

              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
                  px-1 text-[10px] flex items-center justify-center
                  bg-[#E8654A] text-white rounded-full font-bold shadow"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationsModal
                notifications={safeNotifications}
                loading={loading}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              onClick={() => setShowProfileModal(prev => !prev)}
              className={`
                flex items-center gap-3 cursor-pointer
                px-2 py-1.5 rounded-xl transition
                ${isDark
                  ? "hover:bg-[#1E2235]"
                  : "hover:bg-[#F4F6FB]"
                }
              `}
            >
              <img
                src={u.avatar_url}
                alt="avatar"
                className={`
                  w-9 h-9 rounded-full shadow-sm
                  ${isDark
                    ? "ring-2 ring-[#2B3141]"
                    : "ring-2 ring-white"
                  }
                `}
              />
              <p
                className={`text-sm font-medium ${isDark ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}
              >
                {u.username}
              </p>
            </div>

            {showProfileModal && (
              <ProfileModal user={u} onClose={() => setShowProfileModal(false)} />
            )}
          </div>

        </div>
      </div>

      {!rateLimit?.active && toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-3">
          {toasts.map((t) => (
            <NotificationToast
              key={t.toastId}
              notification={t}
              onClose={() => removeToast(t.toastId)}
            />
          ))}
        </div>
      )}

    </div>
  );
}