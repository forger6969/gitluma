import { useEffect, useState } from "react";
import { 
  X, ChevronDown, Info, AlertTriangle, 
  XCircle, CheckCircle, GitCommit 
} from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // Добавлен импорт

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
  const [openAccordion, setOpenAccordion] = useState(false);
  const [progress, setProgress] = useState(100);

  const d = useSelector(s => s.theme.mode) === "dark";

  const cfg = TYPE[notification?.type] || TYPE.info;
  const theme = d ? cfg.dark : cfg.light;
  const { Icon } = cfg;

  const hasExtra = notification?.additional_data?.length > 0;

  const handleClose = () => {
    // В Framer Motion onClose лучше вызывать в onAnimationComplete
    onClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) {
          clearInterval(interval);
          handleClose();
          return 0;
        }
        return p - 1;
      });
    }, 50); // Уменьшил интервал для плавности (5000мс всего)

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={`w-[340px] rounded-2xl border shadow-lg overflow-hidden ${theme.bg} ${theme.border}`}
    >
      {/* PROGRESS BAR */}
      <div className={d ? "h-1 bg-[#0E1118]" : "h-1 bg-[#EEF1F7]"}>
        <div
          className={`h-full bg-gradient-to-r transition-all duration-100 ease-linear ${theme.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4"> {/* Добавлен padding */}
        <div className="flex gap-3">
          {/* ICON */}
          <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${theme.icon}`}>
            <Icon className="w-5 h-5" />
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${theme.text} truncate`}>
              {notification.title}
            </p>
            {notification.text && (
              <p className={`text-xs mt-1 ${theme.sub} line-clamp-2`}>
                {notification.text}
              </p>
            )}

            <span className={`inline-flex items-center gap-1 mt-2 text-[10px]
              px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${theme.icon}`}>
              <Icon className="w-3 h-3" />
              {notification.type}
            </span>
          </div>

          <button
            onClick={handleClose}
            className={`shrink-0 transition h-fit ${d ? "text-[#5C6480] hover:text-white" : "text-gray-400 hover:text-[#2B3141]"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* EXTRA DATA */}
        {hasExtra && (
          <div className="mt-3">
            <button
              onClick={() => setOpenAccordion(p => !p)}
              className={`flex items-center gap-2 text-xs font-medium transition
                ${d ? "text-[#5C6480] hover:text-white" : "text-[#7A8499] hover:text-[#2B3141]"}`}
            >
              <ChevronDown
                size={13}
                className="transition-transform duration-200"
                style={{
                  transform: openAccordion ? "rotate(180deg)" : "rotate(0deg)"
                }}
              />
              Qo'shimcha ma'lumotlar ({notification.additional_data.length})
            </button>

            {openAccordion && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className={`mt-2 rounded-xl border overflow-hidden ${d ? "border-[#2B3141]" : "border-[#E6E9F2]"}`}
              >
                {notification.additional_data.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between px-3 py-2 text-[11px]
                      ${d
                        ? i % 2 !== 0 ? "bg-[#0E1118]" : "bg-transparent"
                        : i % 2 !== 0 ? "bg-[#F4F6FB]" : "bg-transparent"}`}
                  >
                    <span className={d ? "text-[#5C6480]" : "text-[#7A8499]"}>
                      {item.key}
                    </span>
                    <span className={`font-mono font-medium ${d ? "text-[#EEF1F7]" : "text-[#2B3141]"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* LINK */}
        {notification.redirect_url && (
          <a 
            href={notification.redirect_url} 
            className={`inline-flex items-center gap-1 mt-3 text-[11px] font-semibold transition-opacity hover:opacity-80 ${d ? "text-blue-400" : "text-blue-600"}`}
          >
            Ko'rish →
          </a>
        )}
      </div>
    </motion.div>
  );
}