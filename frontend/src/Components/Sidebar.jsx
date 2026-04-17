import { NavLink } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import logo from "../assets/logo.png";

const NAV = [
  { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  { path: "/dashboard/projects", label: "Projects", icon: <GoProjectSymlink /> },
  { path: "/dashboard/tasks", label: "Tasks", icon: <FaTasks /> },
  { path: "/dashboard/profile", label: "Profile", icon: <CgProfile /> },
  { path: "/dashboard/settings", label: "Settings", icon: <IoMdSettings /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen  bg-white/80 backdrop-blur-xl border-r border-[#E4E7F2] flex flex-col shadow-sm">

      <div className="px-5 pt-6 pb-4 border-b border-[#E4E7F2]">
        <img className="w-24 opacity-90" src={logo} alt="" />
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === "/dashboard"}>
            {({ isActive }) => (
              <div
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                ${isActive
                    ? "bg-gradient-to-r from-[#E8654A]/15 to-transparent text-[#E8654A] shadow-sm"
                    : "text-[#7A8499] hover:text-[#2B3141] hover:bg-[#F4F6FB]"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E8654A] rounded-r-full" />
                )}

                <span
                  className={`text-lg transition-transform duration-200
                  ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                >
                  {item.icon}
                </span>

                <span className="flex-1">{item.label}</span>

                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#E8654A]" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E4E7F2]">
        <button
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E8654A] to-[#FF8A65]
          hover:opacity-90 active:scale-[0.98] text-white text-sm font-semibold
          transition-all shadow-md"
        >
          + New Task
        </button>
      </div>
    </aside>
  );
}