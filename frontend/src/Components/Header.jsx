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
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const prevCountRef = useRef(null);
  const audioRef = useRef(null);

  const location = useLocation();
  const { theme, toggle } = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] || "en";

  const { notifications, loading } = useSelector((s) => s.notifications);
  const { user, loaded } = useSelector((s) => s.user);
  const repos = useSelector((s) => s.repos);
  const dispatch = useDispatch();

  const safeNotifications = Array.isArray(notifications)
    ? notifications.filter((n) => n && typeof n === "object")
    : [];

  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    audioRef.current = new Audio("/notification.wav");
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    if (location.pathname === "/too-many-requests") return;
    if (!loaded) dispatch(userFetch());
    if (!repos.loaded) dispatch(reposFetch());
    if (!notifications.length) dispatch(getNotifications());
  }, [location.pathname, loaded, repos.loaded]);

  useEffect(() => {
    if (showNotifications && safeNotifications.length > 0) dispatch(markAllAsRead());
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
      const newToasts = newNotifs.map((n) => ({ ...n, toastId: `${n.id}-${Date.now()}` }));
      setToasts((prev) => [...prev, ...newToasts]);
    }
    prevCountRef.current = newCount;
  }, [safeNotifications.length]);

  const removeToast = (toastId) => setToasts((prev) => prev.filter((t) => t.toastId !== toastId));

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  if (!user) return null;
  const u = user.user;

  return (
    <>
    <div
      className="w-full z-50 px-6 py-[15px] flex items-center justify-between shadow-sm"
      style={{ background: "var(--gl-bg-card)", borderBottom: "1px solid var(--gl-border-subtle)" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-2 rounded-lg w-[500px] border-2 focus-within:border-[#E8654A] transition"
        style={{ borderColor: "#E8654A", background: "var(--gl-bg-input)" }}
      >
        <img className="mt-0.5" width={20} src={search} alt="" />
        <input
          type="text"
          placeholder={t("header_search")}
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: "var(--gl-body)" }}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Lang switcher */}
        <div
          className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl"
          style={{ background: "var(--gl-bg-page)", border: "1px solid var(--gl-border-subtle)" }}
        >
          {["en", "uz", "ru"].map((lang) => (
            <button
              key={lang}
              onClick={() => changeLang(lang)}
              className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase transition-all duration-150"
              style={{
                color: currentLang === lang ? "#E8654A" : "var(--gl-muted)",
                background: currentLang === lang ? "var(--gl-coral-bg)" : "transparent",
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
          style={{
            background: "var(--gl-bg-page)",
            border: "1px solid var(--gl-border-subtle)",
            color: "var(--gl-muted)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#E8654A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gl-muted)"; }}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev);
              if (!safeNotifications.length) dispatch(getNotifications());
            }}
            className="relative p-2 rounded-full transition"
            style={{ color: "var(--gl-body)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gl-sec-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center bg-[#E8654A] text-white rounded-full font-bold">
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

        {/* Avatar */}
        <div className="relative">
          <div onClick={() => setShowProfileModal((prev) => !prev)} className="flex items-center gap-3 cursor-pointer">
            <img src={u.avatar_url} alt="avatar" className="w-9 h-9 rounded-full ring-2 ring-[#E8654A] hover:ring-[#D4553A] transition" />
            <p className="text-sm font-medium" style={{ color: "#E8654A" }}>{u.username}</p>
          </div>
          {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
        </div>
      </div>

    </div>

    {toasts.length > 0 && (
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.toastId} className="pointer-events-auto">
            <NotificationToast notification={toast} onClose={() => removeToast(toast.toastId)} />
          </div>
        ))}
      </div>
    )}
  </>
  );
}
