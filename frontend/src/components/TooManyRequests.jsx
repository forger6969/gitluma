import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../store/slices/userSlice";
import { reposFetch } from "../store/slices/repoSlices";
import { getNotifications } from "../store/slices/notificationSlice";
import { useEffect, useState } from "react";
import { clearRateLimit } from "../store/slices/rateLimitSlice";
import { AlertTriangle } from "lucide-react";

export default function TooManyRequestsToast() {
  const dispatch = useDispatch();
  const { until } = useSelector((s) => s.rateLimit);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const total = until ? Math.max(1, until - (until - 10000)) : 1; // ~10s fallback
  const remaining = until ? Math.max(0, until - now) : 0;
  const remainingSec = Math.ceil(remaining / 1000);

  const progress = Math.max(0, Math.min(100, (remaining / total) * 100));

  useEffect(() => {
    if (remainingSec === 0 && until) {
      dispatch(clearRateLimit());
    }
  }, [remainingSec, until]);

  const handleRetry = () => {
    dispatch(clearRateLimit());
    dispatch(userFetch());
    dispatch(reposFetch());
    dispatch(getNotifications());
  };

  return (
    <AnimatePresence>
      {until && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 20, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed top-5 right-5 z-[999]"
        >
          <div className="w-[320px] bg-white/90 backdrop-blur-xl
            border border-[#E6E9F2] rounded-2xl shadow-xl overflow-hidden">

            <div className="h-1 bg-[#F1F3F9]">
              <div
                className="h-full bg-gradient-to-r from-[#E8654A] to-[#FF8A65] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-4 flex gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#FFE5DA]
                flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#E8654A]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2B3141]">
                  Too many requests
                </p>

                <p className="text-xs text-[#7A8499] mt-1">
                  Serverga juda ko‘p so‘rov yuborildi
                </p>

                {remainingSec > 0 && (
                  <p className="text-[11px] mt-1 text-gray-400">
                    {remainingSec}s dan keyin urinib ko‘ring
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 px-4 pb-3">
              <button
                onClick={() => dispatch(clearRateLimit())}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#F4F6FB]
                hover:bg-[#EEF1F7] transition"
              >
                Cancel
              </button>

              <button
                onClick={handleRetry}
                className="text-xs px-3 py-1.5 rounded-lg
                bg-gradient-to-r from-[#E8654A] to-[#FF8A65]
                text-white font-semibold hover:opacity-90 transition"
              >
                Retry
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}