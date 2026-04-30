import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const NAV = [
    { path: "/dashboard",          label: t("sidebar_dashboard"), icon: <FaHome />           },
    { path: "/dashboard/projects", label: t("sidebar_projects"),  icon: <GoProjectSymlink /> },
    { path: "/dashboard/tasks",    label: t("sidebar_tasks"),     icon: <FaTasks />          },
    { path: "/dashboard/profile",  label: t("sidebar_profile"),   icon: <CgProfile />        },
    { path: "/dashboard/settings", label: t("sidebar_settings"),  icon: <IoMdSettings />     },
  ];

  return (
    <aside
      className="w-64 min-h-screen flex flex-col"
      style={{ background: "var(--gl-bg-card)", borderRight: "1px solid var(--gl-border-subtle)" }}
    >
      <div className="px-5 pt-6 pb-4" style={{ borderBottom: "1px solid var(--gl-border-subtle)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E8654A] flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm leading-none">G</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-none tracking-wide" style={{ color: "var(--gl-heading)" }}>
              GitLuma
            </p>
            <p className="text-[10px] uppercase tracking-widest mt-0.5 font-mono" style={{ color: "var(--gl-muted)" }}>
              Monolith Dev
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === "/dashboard"}>
            {({ isActive }) => (
              <span
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                style={{
                  display: "flex",
                  background: isActive ? "rgba(232,101,74,0.10)" : "transparent",
                  border: isActive ? "1px solid rgba(232,101,74,0.25)" : "1px solid transparent",
                  color: isActive ? "#E8654A" : "var(--gl-muted)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--gl-heading)";
                    e.currentTarget.style.background = "var(--gl-sec-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--gl-muted)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E8654A] shrink-0" />}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3" style={{ borderTop: "1px solid var(--gl-border-subtle)" }}>
        <button
          onClick={() => navigate("/dashboard/create")}
          className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-colors cursor-pointer border-none"
          style={{ background: "#E8654A" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#D4553A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8654A"; }}
        >
          + {t("sidebar_newTask")}
        </button>
      </div>
    </aside>
  );
}
