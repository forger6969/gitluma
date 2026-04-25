import { Bell, Search, Moon, Sun } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import NotificationToast from "./NotificationToast";
import ProfileModal from "./ProfileModal";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { userFetch } from "../store/slices/userSlice";
import { reposFetch } from "../store/slices/repoSlices";
import { toggleTheme } from "../store/slices/themeSlice";

const SOUND_MAP = {
  default: "/notification.wav",
  chime:   "/sounds/chime.wav",
  pulse:   "/sounds/pulse.wav",
  soft:    "/sounds/soft.wav",
}

const getAudio = () => {
  const id   = localStorage.getItem("gl-sound-id") || "default"
  const file = SOUND_MAP[id] || SOUND_MAP.default
  const audio = new Audio(file)
  audio.volume = 0.1
  return audio
}

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal,  setShowProfileModal]  = useState(false);
  const [toasts, setToasts] = useState([]);

  const prevCountRef = useRef(null);
  const audioRef     = useRef(null);
  const unlockedRef  = useRef(false);

  const dispatch = useDispatch();

  const { notifications, loading } = useSelector((s) => s.notifications);
  const { user, loaded }           = useSelector((s) => s.user);
  const repos                      = useSelector((s) => s.repos);

  const mode   = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const safeNotifications = Array.isArray(notifications)
    ? notifications.filter(Boolean)
    : [];

  useEffect(() => {
    if (!loaded)       dispatch(userFetch());
    if (!repos.loaded) dispatch(reposFetch());
  }, [loaded, repos.loaded]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    audioRef.current = getAudio();

    const unlock = () => {
      if (unlockedRef.current) return;
      audioRef.current.play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          unlockedRef.current = true;
        })
        .catch(() => {});
    };

    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);

  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current = safeNotifications.length;
      return;
    }

    if (safeNotifications.length > prevCountRef.current) {
      const diff = safeNotifications.length - prevCountRef.current;

      const newToasts = safeNotifications.slice(0, diff).map((n) => ({
        ...n,
        toastId: Date.now() + Math.random(),
      }));
      setToasts((p) => [...p, ...newToasts]);

      const soundEnabled = localStorage.getItem("gl-sound") !== "false";
      const pushEnabled  = localStorage.getItem("gl-push")  !== "false";

      if (soundEnabled && pushEnabled && unlockedRef.current) {
        const freshAudio = getAudio();
        freshAudio.play().catch(() => {});
      }
    }

    prevCountRef.current = safeNotifications.length;
  }, [safeNotifications.length]);

  const removeToast = (id) =>
    setToasts((p) => p.filter((t) => t.toastId !== id));

  if (!user) return null;
  const u = user.user;

  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        flex items-center justify-end
        px-6 py-3 border-b backdrop-blur-xl
        transition-all duration-300
        ${isDark
          ? "bg-[#0F121A]/90 border-[#2B3141] text-white"
          : "bg-white/80 border-[#E4E7F2] text-[#2B3141]"
        }
      `}
    >
      <div className="flex items-center gap-3">



        <div className="relative">
          <button
            onClick={() => setShowNotifications((p) => !p)}
            className={`
              p-2 rounded-lg relative transition
              ${isDark ? "hover:bg-[#1E2235]" : "hover:bg-[#F4F6FB]"}
            `}
          >
            <Bell className="w-5 h-5 text-[#E8654A]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E8654A] rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-4 right-0 z-50">
              <NotificationsModal
                notifications={safeNotifications}
                loading={loading}
                onClose={() => setShowNotifications(false)}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <div
            onClick={() => setShowProfileModal((p) => !p)}
            className={`
              flex items-center gap-3 cursor-pointer
              px-3 py-1.5 rounded-lg transition
              ${isDark ? "hover:bg-[#1E2235]" : "hover:bg-[#F4F6FB]"}
            `}
          >
            <img src={u.avatar_url} className="w-9 h-9 rounded-full object-cover" />
            <p className="text-sm font-medium hidden sm:block">{u.username}</p>
          </div>

          {showProfileModal && (
            <div className="absolute right-0 mt-2 z-50">
              <ProfileModal user={u} onClose={() => setShowProfileModal(false)} />
            </div>
          )}
        </div>
      </div>

      <div className="fixed right-6 top-4 flex flex-col gap-3">
        {toasts.map((t) => (
          <NotificationToast
            key={t.toastId}
            notification={t}
            onClose={() => removeToast(t.toastId)}
          />
        ))}
      </div>
    </header>
  );
}