import { NavLink } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import logowhite from "../assets/logo.white.svg";

const NAV = [
  { path: "/dashboard",           label: "Dashboard", icon: <FaHome /> },
  { path: "/dashboard/projects",  label: "Projects",  icon: <GoProjectSymlink /> },
  { path: "/dashboard/tasks",     label: "Tasks",     icon: <FaTasks /> },
  { path: "/dashboard/profile",   label: "Profile",   icon: <CgProfile /> },
  { path: "/dashboard/settings",  label: "Settings",  icon: <IoMdSettings /> },
];

export default function Sidebar() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <aside
      className={`
        w-64 min-h-screen flex flex-col shadow-sm
        backdrop-blur-xl border-r transition-colors duration-200
        ${isDark
          ? "bg-[#12151E]/95 border-[#2B3141]"
          : "bg-white/80 border-[#E4E7F2]"
        }
      `}
    >

      <div
        className={`
          px-5 pt-6 pb-4 border-b transition-colors duration-200
          ${isDark ? "border-[#2B3141]" : "border-[#E4E7F2]"}
        `}
      >
        <img className="w-24 opacity-90" src={isDark ? logowhite : logo } alt="GitLuma" />
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
            >
              {({ isActive }) => (
                <div
                  className={`
                    group relative flex items-center gap-3
                    px-4 py-2.5 rounded-md text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? isDark
                        ? "bg-[#E8654A]/10 text-[#F0997B]"
                        : "bg-gradient-to-r from-[#E8654A]/15 to-transparent text-[#E8654A] shadow-sm"
                      : isDark
                        ? "text-[#5C6480] hover:text-[#C8CDD9] hover:bg-[#1E2235]"
                        : "text-[#7A8499] hover:text-[#2B3141] hover:bg-[#F4F6FB]"
                    }
                  `}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <span
                      className={`
                        absolute left-0 top-1/2 -translate-y-1/2
                        w-1 h-5 rounded-r-full
                        ${isDark ? "bg-[#F0997B]" : "bg-[#E8654A]"}
                      `}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={`
                      text-lg transition-transform duration-200
                      ${isActive ? "scale-110" : "group-hover:scale-105"}
                    `}
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">{item.label}</span>

                  {/* Active dot */}
                  {isActive && (
                    <span
                      className={`
                        w-2 h-2 rounded-full
                        ${isDark ? "bg-[#F0997B]" : "bg-[#E8654A]"}
                      `}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── New Task button ── */}
      <div
        className={`
          p-4 border-t transition-colors duration-200
          ${isDark ? "border-[#2B3141]" : "border-[#E4E7F2]"}
        `}
      >
        <button
          className={`
            w-full py-2.5 rounded-md text-sm font-semibold
            transition-all duration-200 active:scale-[0.98]
            ${isDark
              ? "bg-[#E8654A]/90 hover:bg-[#E8654A] text-white shadow-[0_0_16px_#E8654A28]"
              : "bg-gradient-to-r from-[#E8654A] to-[#FF8A65] hover:opacity-90 text-white shadow-md"
            }
          `}
        >
          + New Task
        </button>
      </div>
    </aside>
  );
} 