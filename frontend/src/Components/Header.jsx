import { Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userFetch } from "../store/slices/userSlice";
import { reposFetch } from "../store/slices/repoSlices";
import { getNotifications } from "../store/slices/notificationSlice";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)

  const { notifications, loading } = useSelector((state) => state.notifications)
  const dispatch = useDispatch()
  const { user, loaded } = useSelector(s => s.user)
  const repos = useSelector(s => s.repos)

  useEffect(() => {
    if (!loaded) dispatch(userFetch())
    if (!repos.loaded) dispatch(reposFetch())
    dispatch(getNotifications()) 
  }, [loaded, repos.loaded, dispatch])

  if (!user) return null
  const u = user.user
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="w-full bg-[#080b11] px-6 py-3 flex items-center border-b-2 border-b-gray-800 justify-between shadow-md">
      <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-md w-[500px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-5.197-5.197M15 10a5 5 0 11-10 0 5 5 0 0110 0z" />
        </svg>
        <input type="text" placeholder="Search resources, tasks, or commits..."
          className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500" />
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Bell className="text-gray-400 w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <NotificationsModal
              notifications={notifications}
              loading={loading}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <img src={u.avatar_url} alt="avatar" className="w-9 h-9 rounded-full ring-2 ring-gray-700" />
          <p className="text-sm text-white font-medium">{u.username}</p>
        </div>
      </div>
    </div>
  )
}