import { Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import NotificationToast from "./NotificationToast";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getNotifications, markAllAsRead } from "../store/slices/notificationSlice";
import { useLocation } from "react-router-dom";
import search from "../assets/search.svg"

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [toasts, setToasts] = useState([])
  const rateLimit = useSelector(s => s.rateLimit)

  const prevCountRef = useRef(null)
  const prevRateLimitActiveRef = useRef(false)
  const lastRateLimitToastRef = useRef(null)

  const audioRef = useRef(null)

  const location = useLocation()

  const { notifications, loading, loaded } = useSelector(s => s.notifications)
  const { user } = useSelector(s => s.user)
  const dispatch = useDispatch()

  const safeNotifications = Array.isArray(notifications)
    ? notifications.filter(n => n && typeof n === "object")
    : []

  const unreadCount = safeNotifications.filter(n => !n.read).length

  useEffect(() => {
    audioRef.current = new Audio("/notification.wav")
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    if (!loaded && !notifications.length && !rateLimit?.active) {
      dispatch(getNotifications())
    }
    }, [dispatch, loaded, notifications.length, rateLimit?.active])


  useEffect(() => {
    const wasActive = prevRateLimitActiveRef.current
    const isActive = !!rateLimit?.active
    // When rate-limit ends, show a toast once.
    if (wasActive && !isActive && rateLimit?.lastClearedAt) {
      if (lastRateLimitToastRef.current !== rateLimit.lastClearedAt) {
        lastRateLimitToastRef.current = rateLimit.lastClearedAt
        setToasts(prev => ([
          ...prev,
          {
            toastId: `rateLimit-${rateLimit.lastClearedAt}`,
            type: "success",
            title: "Too many requests",
            text: "Rate limit tugadi. Davom etishingiz mumkin.",
          }
        ]))
      }
    }
    prevRateLimitActiveRef.current = isActive
  }, [rateLimit?.active, rateLimit?.lastClearedAt])

  useEffect(() => {
    if (showNotifications && safeNotifications.length > 0) {
      dispatch(markAllAsRead())
    }
  }, [showNotifications])

  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current = safeNotifications.length
      return
    }

    const newCount = safeNotifications.length
    const prevCount = prevCountRef.current

    if (newCount > prevCount) {
      audioRef.current?.play().catch(() => { })

      const newNotifs = safeNotifications.slice(0, newCount - prevCount)
      const newToasts = newNotifs.map(n => ({
        ...n,
        toastId: `${n.id}-${Date.now()}`
      }))
      setToasts(prev => [...prev, ...newToasts])
    }

    prevCountRef.current = newCount
  }, [safeNotifications.length])

  const removeToast = (toastId) =>
    setToasts(prev => prev.filter(t => t.toastId !== toastId))

  if (!user) return null
  const u = user.user

  return (
    <div className="fixed z-100 w-[82.6%]">
      <div className="  w-full z-50 bg-white px-6 py-[15px] flex items-center justify-between  shadow-sm">

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg w-[500px] border-2 border-orang focus-within:border-orang transition">

          <img className="mt-0.5" width={20} src={search} alt="" />

          <input
            type="text"
            placeholder="Search resources, tasks, or commits..."
            className="bg-transparent outline-none text-sm text-sini font-sans  w-full placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-5">

          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(prev => !prev)
                if (!loaded && !safeNotifications.length && !rateLimit?.active) {
                  dispatch(getNotifications())
                }
              }}
              className="relative p-2 rounded-full hover:bg-oq transition"
            >
              <Bell className="text-sini w-5 h-5" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center bg-(--color-primary) text-white rounded-full font-bold">
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
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={u.avatar_url}
                alt="avatar"
                className="w-9 h-9 rounded-full ring-2 ring-oq hover:ring-orang transition"
              />

              <p className="text-sm text-orang font-medium">
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
        <div
          className="fixed top-4 right-4 z-[1000] flex flex-col gap-3"
          style={{ pointerEvents: "none" }}
        >
          {toasts.map((t) => (
            <div key={t.toastId} style={{ pointerEvents: "auto" }}>
              <NotificationToast
                notification={t}
                onClose={() => removeToast(t.toastId)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}