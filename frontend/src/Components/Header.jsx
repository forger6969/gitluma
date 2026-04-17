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

  const dispatch = useDispatch();
  const location = useLocation();

  const prevCountRef = useRef(null);
  const prevRateLimitActiveRef = useRef(false);
  const lastRateLimitToastRef = useRef(null);
  const audioRef = useRef(null);

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
      audioRef.current?.play().catch(() => { });

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

      <div className="bg-[#FCFCFD] backdrop-blur-xl border-b border-[#E4E7F2]
        px-6 py-3 flex items-center justify-between shadow-sm">

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl w-[420px]
          bg-[#F4F6FB] focus-within:bg-white border border-transparent
          focus-within:border-[#E8654A]/40 focus-within:shadow-sm transition">

          <img width={18} src={search} alt="" className="opacity-60" />

          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="bg-transparent outline-none text-sm w-full
            placeholder:text-gray-400 text-[#2B3141]"
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
              className="relative p-2.5 rounded-xl bg-[#F4F6FB] hover:bg-[#EEF1F7] transition"
            >
              <Bell className="w-5 h-5 text-[#2B3141]" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
                  px-1 text-[10px] flex items-center justify-center
                  bg-[#E8654A] text-white rounded-full font-bold shadow">
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

          <div className="relative">
            <div
              onClick={() => setShowProfileModal(prev => !prev)}
              className="flex items-center gap-3 cursor-pointer
              px-2 py-1.5 rounded-xl hover:bg-[#F4F6FB] transition"
            >
              <img
                src={u.avatar_url}
                alt="avatar"
                className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
              />

              <p className="text-sm font-medium text-[#2B3141]">
                {u.username}
              </p>
            </div>

            {showProfileModal && (
              <ProfileModal onClose={() => setShowProfileModal(false)} />
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