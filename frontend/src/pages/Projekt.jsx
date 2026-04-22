import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../store/slices/projectsSlice";
import { toggleTheme } from "../store/slices/themeSlice";

const Projekt = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === "dark";
  const projects = useSelector((state)=> state.projects.projects)
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  const theme = isDarkMode
    ? {
        pageBg: "#16181d",
        panelBg: "#20242c",
        softBg: "#2a303a",
        cardBorder: "rgba(154, 160, 180, 0.18)",
        dashedBorder: "rgba(154, 160, 180, 0.24)",
        heading: "#f5f7fb",
        text: "#d7dceb",
        muted: "#9aa3ba",
        pillBg: "#2f3642",
        shadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
        hoverShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
        errorBorder: "rgba(232,101,74,0.34)",
        errorBg: "rgba(232,101,74,0.14)",
      }
    : {
        pageBg: "var(--color-frost-bg)",
        panelBg: "var(--color-white)",
        softBg: "var(--color-frost-bg)",
        cardBorder: "rgba(43,49,65,0.1)",
        dashedBorder: "rgba(43,49,65,0.18)",
        heading: "var(--color-git-charcoal)",
        text: "var(--color-git-charcoal)",
        muted: "var(--color-git-charcoal-soft)",
        pillBg: "var(--color-frost-hover)",
        shadow: "0 18px 48px rgba(43,49,65,0.12)",
        hoverShadow: "0 24px 60px rgba(43,49,65,0.2)",
        errorBorder: "rgba(232,101,74,0.28)",
        errorBg: "rgba(232,101,74,0.1)",
      };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        className="flex min-h-[91vh] items-center justify-center"
        style={{ backgroundColor: theme.pageBg, color: theme.text }}
      >
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex min-h-[91vh] items-center justify-center px-6"
        style={{ backgroundColor: theme.pageBg }}
      >
        <div
          className="w-full max-w-md rounded-2xl border p-6 text-center"
          style={{
            borderColor: theme.errorBorder,
            backgroundColor: theme.errorBg,
            color: theme.text,
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[91vh] px-6 py-8 transition-colors duration-300 md:px-10"
      style={{ backgroundColor: theme.pageBg }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black" style={{ color: theme.heading }}>
              Projects
            </h1>
            <p className="mt-2 text-sm" style={{ color: theme.muted }}>
              Redux store ichidan kelayotgan barcha loyihalar shu yerda
              render qilindi.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className="rounded-xl px-4 py-2 text-sm font-semibold transition"
              style={{
                backgroundColor: theme.panelBg,
                color: theme.text,
                border: `1px solid ${theme.cardBorder}`,
                boxShadow: "0 10px 30px rgba(43,49,65,0.08)",
              }}
            >
              {isDarkMode ? "Light mode" : "Dark mode"}
            </button>
            <div
              className="rounded-xl px-4 py-2 text-sm"
              style={{
                border: `1px solid ${theme.cardBorder}`,
                backgroundColor: theme.panelBg,
                color: theme.text,
                boxShadow: "0 10px 30px rgba(43,49,65,0.08)",
              }}
            >
              Total: {projects?.length || 0}
            </div>
          </div>
        </div>

        {!projects?.length ? (
          <div
            className="rounded-3xl border border-dashed px-6 py-16 text-center"
            style={{
              borderColor: theme.dashedBorder,
              backgroundColor: theme.panelBg,
              color: theme.muted,
            }}
          >
            Hozircha project topilmadi.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-3xl border p-6 transition-shadow duration-300"
                style={{
                  borderColor: theme.cardBorder,
                  backgroundColor: theme.panelBg,
                  boxShadow: theme.shadow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme.hoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme.shadow;
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: theme.heading }}>
                      {project.repo_name}
                    </h2>
                    <p className="mt-1 break-all text-sm" style={{ color: theme.muted }}>
                      {project.repo_fullname}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: theme.pillBg, color: theme.text }}
                  >
                    {project.default_branch || "no-branch"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <InfoCard
                    title="Members"
                    value={project.members?.length || 0}
                    theme={theme}
                  />
                  <InfoCard
                    title="Commits"
                    value={project.commits?.length || 0}
                    theme={theme}
                  />
                </div>

                <div
                  className="mt-5 rounded-2xl p-4"
                  style={{ backgroundColor: theme.softBg }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: theme.muted }}
                  >
                    Repository owner
                  </p>
                  <p className="mt-2 text-sm font-medium" style={{ color: theme.text }}>
                    {project.repo_owner}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs" style={{ color: theme.muted }}>
                    ID: {project.repo_id}
                  </p>
                  <Link
                    to={`/dashboard/project/${project._id}`}
                    className="rounded-xl bg-[var(--color-luma-coral)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-luma-coral-hover)] active:bg-[var(--color-luma-coral-active)]"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, theme }) => {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ backgroundColor: theme.softBg }}
    >
      <p
        className="text-xs uppercase tracking-[0.2em]"
        style={{ color: theme.muted }}
      >
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold" style={{ color: theme.heading }}>
        {value}
      </p>
    </div>
  );
};

export default Projekt;
