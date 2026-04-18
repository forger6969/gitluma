import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  X, ChevronDown, Info, AlertTriangle,
  XCircle, CheckCircle, GitCommit
} from "lucide-react";
import { useSelector } from "react-redux";

/* TYPES (dark + light) */
const TYPE = {
  info: {
    Icon: Info,
    light: {
      bg: "bg-white",
      border: "border-[#E6E9F2]",
      icon: "bg-blue-100 text-blue-600",
      text: "text-[#2B3141]",
      sub: "text-[#7A8499]",
      bar: "from-blue-500 to-blue-400"
    },
    dark: {
      bg: "bg-[#161B27]",
      border: "border-[#2B3141]",
      icon: "bg-blue-900/30 text-blue-400",
      text: "text-[#EEF1F7]",
      sub: "text-[#5C6480]",
      bar: "from-blue-500 to-blue-400"
    }
  },

  warning: {
    Icon: AlertTriangle,
    light: {
      bg: "bg-white",
      border: "border-[#E6E9F2]",
      icon: "bg-yellow-100 text-yellow-600",
      text: "text-[#2B3141]",
      sub: "text-[#7A8499]",
      bar: "from-yellow-500 to-yellow-400"
    },
    dark: {
      bg: "bg-[#161B27]",
      border: "border-[#2B3141]",
      icon: "bg-yellow-900/30 text-yellow-400",
      text: "text-[#EEF1F7]",
      sub: "text-[#5C6480]",
      bar: "from-yellow-500 to-yellow-400"
    }
  },

  error: {
    Icon: XCircle,
    light: {
      bg: "bg-white",
      border: "border-[#E6E9F2]",
      icon: "bg-red-100 text-red-500",
      text: "text-[#2B3141]",
      sub: "text-[#7A8499]",
      bar: "from-red-500 to-red-400"
    },
    dark: {
      bg: "bg-[#161B27]",
      border: "border-[#2B3141]",
      icon: "bg-red-900/30 text-red-400",
      text: "text-[#EEF1F7]",
      sub: "text-[#5C6480]",
      bar: "from-red-500 to-red-400"
    }
  },

  success: {
    Icon: CheckCircle,
    light: {
      bg: "bg-white",
      border: "border-[#E6E9F2]",
      icon: "bg-green-100 text-green-600",
      text: "text-[#2B3141]",
      sub: "text-[#7A8499]",
      bar: "from-green-500 to-green-400"
    },
    dark: {
      bg: "bg-[#161B27]",
      border: "border-[#2B3141]",
      icon: "bg-green-900/30 text-green-400",
      text: "text-[#EEF1F7]",
      sub: "text-[#5C6480]",
      bar: "from-green-500 to-green-400"
    }
  },

  commit: {
    Icon: GitCommit,
    light: {
      bg: "bg-white",
      border: "border-[#E6E9F2]",
      icon: "bg-[#EEF1F7] text-[#2B3141]",
      text: "text-[#2B3141]",
      sub: "text-[#7A8499]",
      bar: "from-[#E8654A] to-[#FF8A65]"
    },
    dark: {
      bg: "bg-[#161B27]",
      border: "border-[#2B3141]",
      icon: "bg-[#2B3141] text-[#C8CDD9]",
      text: "text-[#EEF1F7]",
      sub: "text-[#5C6480]",
      bar: "from-[#E8654A] to-[#FF8A65]"
    }
  }
};

export default function NotificationToast({ notification, onClose }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(100);

  const d = useSelector(s => s.theme.mode) === "dark";

  const cfg = TYPE[notification?.type] || TYPE.info;
  const theme = d ? cfg.dark : cfg.light;
  const { Icon } = cfg;

  const hasExtra = notification?.additional_data?.length > 0;

  useEffect(() => {
    const i = setInterval(() => {
      setProgress(p => {
        if (p <= 0) {
          clearInterval(i);
          handleClose();
          return 0;
        }
        return p - 1;
      });
    }, 80);

    return () => clearInterval(i);
  }, []);

  const handleClose = () => {
    setProgress(0);
    setTimeout(onClose, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={`w-[340px] rounded-2xl border shadow-lg overflow-hidden
        ${theme.bg} ${theme.border}`}
    >

      {/* PROGRESS */}
      <div className={d ? "h-1 bg-[#0E1118]" : "h-1 bg-[#EEF1F7]"}>
        <div
          className={`h-full bg-gradient-to-r ${theme.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4">

        <div className="flex gap-3">

          {/* ICON */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.icon}`}>
            <Icon className="w-5 h-5" />
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${theme.text}`}>
              {notification.title}
            </p>

            {notification.text && (
              <p className={`text-xs mt-1 ${theme.sub} line-clamp-2`}>
                {notification.text}
              </p>
            )}

            <span className={`inline-flex items-center gap-1 mt-2 text-[10px]
              px-2 py-0.5 rounded-full font-semibold ${theme.icon}`}>
              <Icon className="w-3 h-3" />
              {notification.type}
            </span>
          </div>

          <button
            onClick={handleClose}
            className={`transition ${d ? "text-[#5C6480] hover:text-white" : "text-gray-400 hover:text-[#2B3141]"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* EXTRA */}
        {hasExtra && (
          <div className="mt-3">
            <button
              onClick={() => setOpen(p => !p)}
              className={`flex items-center gap-2 text-xs transition
                ${d ? "text-[#5C6480] hover:text-white" : "text-[#7A8499] hover:text-[#2B3141]"}`}
            >
              <ChevronDown
                className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
              />
              Qo'shimcha ({notification.additional_data.length})
            </button>

            {open && (
              <div className={`mt-2 rounded-xl border overflow-hidden
                ${d ? "border-[#2B3141]" : "border-[#E6E9F2]"}`}>
                {notification.additional_data.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between px-3 py-2 text-xs
                      ${d
                        ? i % 2 !== 0 ? "bg-[#0E1118]" : ""
                        : i % 2 !== 0 ? "bg-[#F4F6FB]" : ""}`}
                  >
                    <span className={d ? "text-[#5C6480]" : "text-[#7A8499]"}>
                      {item.key}
                    </span>
                    <span className={`font-mono ${d ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LINK */}
        {notification.redirect_url && (
          <a
            href={notification.redirect_url}
            className="text-xs text-[#E8654A] mt-3 inline-block font-semibold hover:underline"
          >
            Ko‘rish →
          </a>
        )}
      </div>
    </motion.div>
  );
}