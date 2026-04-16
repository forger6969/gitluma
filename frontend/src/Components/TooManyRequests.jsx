import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { userFetch } from "../store/slices/userSlice"
import { reposFetch } from "../store/slices/repoSlices"
import { getNotifications } from "../store/slices/notificationSlice"
import { useEffect, useState } from "react"
import { clearRateLimit } from "../store/slices/rateLimitSlice"

export default function TooManyRequestsToast() {
  const dispatch = useDispatch()
  const { until } = useSelector((s) => s.rateLimit)

  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const remainingSec = until
    ? Math.max(0, Math.ceil((until - now) / 1000))
    : 0

  // ⛔ avtomatik yopilish
  useEffect(() => {
    if (remainingSec === 0 && until) {
      dispatch(clearRateLimit())
    }
  }, [remainingSec, until])

  const handleRetry = () => {
    dispatch(clearRateLimit())
    dispatch(userFetch())
    dispatch(reposFetch())
    dispatch(getNotifications())
  }

  return (
    <AnimatePresence>
      {until && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 right-5 z-[999]"
        >
          <div className="bg-white shadow-lg rounded-xl p-4 w-[300px] border border-gray-200">
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFE5DA] flex items-center justify-center">
                ⚠️
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-sini">
                  Too many requests
                </p>

                <p className="text-xs text-seri mt-1">
                  Serverga juda ko‘p so‘rov yuborildi
                </p>

                {remainingSec > 0 && (
                  <p className="text-[11px] mt-1 text-gray-400">
                    {remainingSec}s dan keyin qayta urinib ko‘ring
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => dispatch(clearRateLimit())}
                className="text-xs px-3 py-1 rounded-md bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleRetry}
                className="text-xs px-3 py-1 rounded-md bg-orang text-white"
              >
                Retry
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}