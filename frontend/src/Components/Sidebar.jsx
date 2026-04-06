import { NavLink } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

export default function Sidebar() {
    const NAV = [
        { 
            path: "/dashboard", 
            label: "Dashboard", 
            icon: <FaHome /> 
        },
        { 
            path: "/dashboard/projects", 
            label: "Projects", 
            icon: <GoProjectSymlink /> 
        },
        { 
            path: "/dashboard/tasks", 
            label: "Tasks", 
            icon: <FaTasks /> 
        },
        { 
            path: "/dashboard/profile", 
            label: "Profile", 
            icon: <CgProfile /> 
        },
        { 
            path: "/dashboard/settings", 
            label: "Settings", 
            icon: <IoMdSettings /> 
        },
    ];

    return (
        <aside className="w-70 min-h-screen bg-[#080b11] border-r-2 border-gray-800 flex flex-col">

            <div className="px-4 pt-5 pb-3">
                <div className="flex items-center gap-3">

                    <div>
                        <p className="text-white font-bold text-sm leading-none">LOGOS</p>
                        <p className="text-[10px] text-white uppercase tracking-widest mt-1 font-mono">
                            Monolith Dev
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-2 space-y-1">
                {NAV.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/dashboard"}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-3 px-3 py-2 rounded-md text-[#8A8D91] text-sm transition ${isActive
                                ? "bg-indigo-500/10 border border-indigo-500/30 text-indigo-300"
                                : "text-[#2e374f] hover:text-gray-300 hover:bg-white/5"
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>

                        <span>{item.label}</span>

                        {({ isActive }) =>
                            isActive && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            )
                        }
                    </NavLink>
                ))}
            </nav>

            <div className="p-3">
                <button className="w-full py-2 rounded-md bg-indigo-500/30 text-white text-sm font-semibold">
                    + New Task
                </button>
            </div>
        </aside>
    );
}