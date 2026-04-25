import { NavLink } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import logowhite from "../assets/logo.white.svg";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  const { t } = useTranslation();

  const NAV = [ 
    { path: "/dashboard",          label: t("dashboard"),  icon: <FaHome /> },
    { path: "/dashboard/projects", label: t("projects"),   icon: <GoProjectSymlink /> },
    { path: "/dashboard/tasks",    label: t("tasks"),      icon: <FaTasks /> },
    { path: "/dashboard/profile",  label: t("profile"),    icon: <CgProfile /> },
    { path: "/dashboard/settings", label: t("settings"),   icon: <IoMdSettings /> },
  ]; 

  return (
    <aside
      className={`
        group/sidebar
        w-14 hover:w-64
        min-h-screen flex flex-col
        border-r overflow-hidden flex-shrink-0
        transition-[width] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isDark
          ? "bg-[#12151E]/97 border-[#2B3141]"
          : "bg-white/90 border-[#E4E7F2] shadow-sm"
        }
      `}
    >
<div
  className={`
    px-[14px] pt-[18px] pb-[14px] min-h-[60px]
    flex items-center gap-3
    transition-colors duration-200
    ${isDark ? "border-[#2B3141]" : "border-[#E4E7F2]"}
  `}
>
  <img
    className={`
      object-contain flex-shrink-0
      transition-all duration-500
      w-6 h-6
      group-hover/sidebar:w-24 group-hover/sidebar:h-auto
    `}
    src={isDark ? logowhite : logo}
    alt="GitLuma"
  />
</div>


      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className="relative"
          >
            {({ isActive }) => (

              <>
                <div
                  className={`
                    group/item relative flex items-center gap-3
                    px-[10px] py-[10px] rounded-lg text-sm font-medium
                    whitespace-nowrap overflow-hidden
                    transition-all duration-200
                    ${isActive
                      ? isDark
                        ? "bg-[#E8654A]/10 text-[#F0997B]"
                        : "bg-[#E8654A]/10 text-[#E8654A]"
                      : isDark
                        ? "text-[#5C6480] hover:text-[#C8CDD9] hover:bg-[#1E2235]"
                        : "text-[#7A8499] hover:text-[#2B3141] hover:bg-[#F4F6FB]"
                    }
                  `}
                >
                  {isActive && (
                    <span
                      className={`
                        absolute left-0 top-1/2 -translate-y-1/2
                        w-[3px] h-[18px] rounded-r-full
                        ${isDark ? "bg-[#F0997B]" : "bg-[#E8654A]"}
                      `}
                    />
                  )}

                  <span
                    className={`
                      text-[17px] w-5 text-center flex-shrink-0
                      transition-transform duration-200
                      ${isActive ? "scale-110" : "group-hover/item:scale-105"}
                    `}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`
                      flex-1
                      opacity-0 group-hover/sidebar:opacity-100
                      transition-opacity duration-150 delay-75
                    `}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <span
                      className={`
                        w-[6px] h-[6px] rounded-full flex-shrink-0
                        opacity-0 group-hover/sidebar:opacity-100
                        transition-opacity duration-150 delay-75
                        ${isDark ? "bg-[#F0997B]" : "bg-[#E8654A]"}
                      `}
                    />
                  )}
                </div>

                <div
                  className={`
                    pointer-events-none
                    absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2
                    px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap z-50
                    opacity-0
                    group-hover/sidebar:hidden
                    group-hover/item:not-[:is(.group\/sidebar:hover_*)]:opacity-100
                    ${isDark
                      ? "bg-[#1E2235] text-[#C8CDD9] border border-[#2B3141]"
                      : "bg-white text-[#2B3141] border border-[#E4E7F2] shadow-md"
                    }
                  `}
                  style={{ transition: "opacity 0.1s ease" }}
                >
                  <span
                    className={`
                      absolute right-full top-1/2 -translate-y-1/2
                      border-[5px] border-transparent
                      ${isDark ? "border-r-[#2B3141]" : "border-r-[#E4E7F2]"}
                    `}
                  />
                  {item.label}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div
        className={`
          p-2 border-t transition-colors duration-200
          ${isDark ? "border-[#2B3141]" : "border-[#E4E7F2]"}
        `}
      >
        <button
          className={`
            w-full py-2.5 rounded-lg text-sm font-semibold
            flex items-center justify-center gap-2
            transition-all duration-200 active:scale-[0.97]
            overflow-hidden whitespace-nowrap
            ${isDark
              ? "bg-[#E8654A]/90 hover:bg-[#E8654A] text-white shadow-[0_0_16px_#E8654A28]"
              : "bg-gradient-to-r from-[#E8654A] to-[#FF8A65] hover:opacity-90 text-white shadow-md"
            }
          `}
        >
          <span className="text-base leading-none pb-0.5 pl-1.5">＋</span>
          <span
            className={`
              opacity-0 group-hover/sidebar:opacity-100 text-[0px]
              group-hover/sidebar:text-sm
              transition-all duration-150 delay-75
            `}
          >
            {t("newTask")}
          </span>
        </button>
      </div>
    </aside>
  );
}