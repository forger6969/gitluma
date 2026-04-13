import { Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import NotificationToast from "./NotificationToast";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { userFetch } from "../store/slices/userSlice";
import { reposFetch } from "../store/slices/repoSlices";
import { getNotifications, markAllAsRead } from "../store/slices/notificationSlice";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileModal, setShowProfileModal]   = useState(false)
  const [toasts, setToasts]                       = useState([])

  const prevCountRef = useRef(null)
  const audioRef     = useRef(null)
  const unlockedRef  = useRef(false)

  const { notifications, loading } = useSelector(s => s.notifications)
  const { user, loaded }           = useSelector(s => s.user)
  const repos                      = useSelector(s => s.repos)
  const dispatch                   = useDispatch()

  // null / string larni filter qil
  const safeNotifications = Array.isArray(notifications)
    ? notifications.filter(n => n && typeof n === "object")
    : []

  const unreadCount = safeNotifications.filter(n => !n.read).length

  // Audio unlock
  useEffect(() => {
    audioRef.current = new Audio("/notification.wav")
    audioRef.current.volume = 0.5
    audioRef.current.preload = "auto"

    const unlock = () => {
      if (unlockedRef.current) return
      audioRef.current.play()
        .then(() => {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          unlockedRef.current = true
        })
        .catch(() => {})
      window.removeEventListener("click", unlock)
      window.removeEventListener("keydown", unlock)
    }

    window.addEventListener("click", unlock)
    window.addEventListener("keydown", unlock)
    return () => {
      window.removeEventListener("click", unlock)
      window.removeEventListener("keydown", unlock)
    }
  }, [])

  // Data fetch
  useEffect(() => {
    if (!loaded) dispatch(userFetch())
    if (!repos.loaded) dispatch(reposFetch())
    dispatch(getNotifications())
  }, [loaded, repos.loaded, dispatch])

  // Modal ochilganda mark all read
  useEffect(() => {
    if (showNotifications && safeNotifications.length > 0) {
      dispatch(markAllAsRead())
    }
  }, [showNotifications])

  // Yangi notification — toast stack + ovoz
  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current = safeNotifications.length
      return
    }

    if (safeNotifications.length > prevCountRef.current) {
      const newCount  = safeNotifications.length - prevCountRef.current
      const newToasts = safeNotifications
        .slice(0, newCount)
        .map(n => ({ ...n, toastId: `${Date.now()}-${Math.random()}` }))

      setToasts(prev => [...prev, ...newToasts])

      if (audioRef.current && unlockedRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
    }

    prevCountRef.current = safeNotifications.length
  }, [safeNotifications.length])

  const removeToast = (toastId) =>
    setToasts(prev => prev.filter(t => t.toastId !== toastId))

  if (!user) return null
  const u = user.user

  return (
    <>
      {/* Toast stack — tepadan pastga */}
      <div style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none"
      }}>
        {toasts.map(toast => (
          <div key={toast.toastId} style={{ pointerEvents: "auto" }}>
            <NotificationToast
              notification={toast}
              onClose={() => removeToast(toast.toastId)}
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-[#080b11] px-6 py-3 flex items-center border-b-2 border-b-gray-800 justify-between shadow-md">

        {/* Search */}
        <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-md w-[500px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-5.197-5.197M15 10a5 5 0 11-10 0 5 5 0 0110 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search resources, tasks, or commits..."
            className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-5">

          {/* Bell + Modal */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Bell className="text-gray-400 w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
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

          {/* Avatar + Profile Modal */}
          <div className="relative">
            <div
              onClick={() => setShowProfileModal(prev => !prev)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={u.avatar_url}
                alt="avatar"
                className="w-9 h-9 rounded-full ring-2 ring-gray-700 hover:ring-blue-500 transition-all"
              />
              <p className="text-sm text-white font-medium">{u.username}</p>
            </div>

            {showProfileModal && (
              <ProfileModal onClose={() => setShowProfileModal(false)} />
            )}
          </div>

        </div>
      </div>
    </>
  )
}