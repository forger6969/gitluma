import { NavLink } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

const NAV = [
  { path: "/dashboard",          label: "Dashboard", icon: <FaHome />           },
  { path: "/dashboard/projects", label: "Projects",  icon: <GoProjectSymlink /> },
  { path: "/dashboard/tasks",    label: "Tasks",     icon: <FaTasks />          },
  { path: "/dashboard/profile",  label: "Profile",   icon: <CgProfile />        },
  { path: "/dashboard/settings", label: "Settings",  icon: <IoMdSettings />     },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#D8DCE8] flex flex-col">

      <div className="px-5 pt-6 pb-4 border-b border-[#D8DCE8]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E8654A] flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm leading-none">G</span>
          </div>
          <div>
            <p className="text-[#2B3141] font-bold text-sm leading-none tracking-wide">GitLuma</p>
            <p className="text-[10px] text-[#7A8499] uppercase tracking-widest mt-0.5 font-mono">
              Monolith Dev
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
          >
            {({ isActive }) => (
              <span
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${isActive
                    ? "bg-[#E8654A]/10 border border-[#E8654A]/25 text-[#E8654A]"
                    : "text-[#7A8499] hover:text-[#2B3141] hover:bg-[#EEF1F7] border border-transparent"
                  }`}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8654A] shrink-0" />
                )}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom CTA ── */}
      <div className="p-3 border-t border-[#D8DCE8]">
        <button
          className="w-full py-2.5 rounded-lg bg-[#E8654A] hover:bg-[#D4553A] active:bg-[#BF4A31]
                     text-white text-sm font-semibold transition-colors cursor-pointer border-none"
        >
          + New Task
        </button>
      </div>
    </aside>
  );
}