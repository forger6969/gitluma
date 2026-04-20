import { Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import NotificationToast from "./NotificationToast";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { userFetch } from "../store/slices/userSlice";
import { reposFetch } from "../store/slices/repoSlices";
import { getNotifications, markAllAsRead } from "../store/slices/notificationSlice";
import { useLocation } from "react-router-dom";
import search from "../assets/search.svg";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Refs
  const audioRef = useRef(null);
  const prevCountRef = useRef(null);

  const rateLimit = useSelector(s => s.rateLimit);
  const { notifications, loading, loaded: notifLoaded } = useSelector(s => s.notifications);
  const mode = useSelector((state) => state.theme.mode);
  const { user, loaded: userLoaded } = useSelector(s => s.user);
  const repos = useSelector(s => s.repos);
  
  const dispatch = useDispatch();
  const location = useLocation();
  const isDark = mode === "dark";

  const safeNotifications = Array.isArray(notifications)
    ? notifications.filter(n => n && typeof n === "object")
    : [];

  const unreadCount = safeNotifications.filter(n => !n.read).length;

  // Инициализация звука
  useEffect(() => {
    audioRef.current = new Audio("/notification.wav");
    audioRef.current.volume = 0.5;
  }, []);

  // Загрузка данных
  useEffect(() => {
    if (location.pathname === "/too-many-requests") return;

    if (!userLoaded) dispatch(userFetch());
    if (!repos.loaded) dispatch(reposFetch());
    if (!notifLoaded) dispatch(getNotifications());
  }, [location.pathname, userLoaded, repos.loaded, dispatch]);

  // Пометка как прочитанное
  useEffect(() => {
    if (showNotifications && unreadCount > 0) {
      dispatch(markAllAsRead());
    }
  }, [showNotifications, unreadCount, dispatch]);

  // Логика появления тостов
  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current = safeNotifications.length;
      return;
    }

    const newCount = safeNotifications.length;
    if (newCount > prevCountRef.current) {
      audioRef.current?.play().catch(() => {});
      
      const newNotifs = safeNotifications.slice(0, newCount - prevCountRef.current);
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

  if (!user?.user) return null;
  const u = user.user;

  return (
    <>
      <header
        className={`
          sticky top-0 w-full z-40 border-b transition-colors duration-200 px-6 py-3
          flex items-center justify-between backdrop-blur-md
          ${isDark 
            ? "bg-[#12151E]/95 border-[#2B3141] text-white" 
            : "bg-white/90 border-[#E4E7F2] text-[#2B3141]"
          }
        `}
      >
        {/* Search Bar */}
        <div
          className={`
            flex items-center gap-3 px-4 py-2 rounded-lg w-full max-w-[420px]
            border transition duration-200 focus-within:ring-2 focus-within:ring-[#E8654A]/20
            ${isDark 
              ? "bg-[#1E2235] border-[#2B3141] focus-within:border-[#E8654A]/50" 
              : "bg-[#F4F6FB] border-transparent focus-within:bg-white focus-within:border-[#E8654A]/50"
            }
          `}
        >
          <img width={18} src={search} alt="search" className="opacity-50" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Bell / Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`
                relative p-2.5 rounded-xl transition
                ${isDark 
                  ? "bg-[#1E2235] hover:bg-[#2B3141] text-[#9AA0B4]" 
                  : "bg-[#F4F6FB] hover:bg-[#EEF1F7] text-[#2B3141]"
                }
              `}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center bg-[#E8654A] text-white rounded-full font-bold shadow-sm">
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

          {/* User Profile */}
          <div className="relative">
            <div
              onClick={() => setShowProfileModal(!showProfileModal)}
              className={`
                flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-xl transition
                ${isDark ? "hover:bg-[#1E2235]" : "hover:bg-[#F4F6FB]"}
              `}
            >
              <img
                src={u.avatar_url}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent hover:ring-[#E8654A] transition-all"
              />
              <p className={`text-sm font-medium hidden sm:block ${isDark ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}>
                {u.username}
              </p>
            </div>

            {showProfileModal && (
              <ProfileModal user={u} onClose={() => setShowProfileModal(false)} />
            )}
          </div>
        </div>
      </header>

      {/* Toast Notifications Container */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        {toasts.map(toast => (
          <NotificationToast
            key={toast.toastId}
            notification={toast}
            onClose={() => removeToast(toast.toastId)}
          />
        ))}
      </div>
    </>
  );
}