import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reposFetch } from "../store/slices/repoSlices";
import { getProjects } from "../store/slices/projectsSlice";
import api from "../api/api";
import { useCreateProject } from "../context/CreateProjectContext";
import { API_URL } from "../config/runtime";

export default function RepoPickerModal() {
  const { close } = useCreateProject();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const overlayRef = useRef(null);

  const { repos = [], loading: reposLoading } = useSelector((s) => s.repos || {});
  const mode = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const [search, setSearch] = useState("");
  const [submittingRepo, setSubmittingRepo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(reposFetch());
    setTimeout(() => searchRef.current?.focus(), 50);
  }, [dispatch]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  const filtered = repos.filter((r) =>
    r?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = async (repo) => {
    if (submittingRepo) return;
    setError("");
    setSubmittingRepo(repo.id);
    try {
      const res = await api.post("/api/project/create", { fullname: repo.full_name });
      const projectId = res?.data?.id || res?.data?._id;
      dispatch(getProjects());
      close();
      if (projectId) navigate(`/dashboard/project/${projectId}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create project");
      setSubmittingRepo(null);
    }
  };

  const bg = isDark ? "#141824" : "#ffffff";
  const border = isDark ? "#2B3141" : "#E4E7F2";
  const textMain = isDark ? "#EEF1F7" : "#1A1F2E";
  const textMuted = isDark ? "#5C6480" : "#7A8499";
  const rowHover = isDark ? "#1E2235" : "#F4F6FB";
  const rowActive = isDark ? "#E8654A15" : "#FFF3EE";

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) close();
      }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        {/* Search bar */}
        <div style={{ borderBottom: `1px solid ${border}`, padding: "14px 16px" }}>
          <div className="flex items-center gap-3">
            <svg
              width="16" height="16" fill="none"
              stroke={textMuted} strokeWidth="2" viewBox="0 0 24 24"
              className="flex-shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are we going to deploy today?"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: textMain }}
            />
            <button
              onClick={close}
              className="text-[10px] px-1.5 py-0.5 rounded border transition-colors"
              style={{ color: textMuted, borderColor: border }}
            >
              ESC
            </button>
          </div>
        </div>

        {/* Configure GitHub App link */}
        <div style={{ borderBottom: `1px solid ${border}`, padding: "10px 16px" }}>
          <a
            href={`${API_URL}/api/auth/github`}
            className="flex items-center gap-2.5 text-sm transition-colors"
            style={{ color: textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = textMain)}
            onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Configure GitHub App
          </a>
        </div>

        {/* Repository list */}
        <div className="overflow-y-auto" style={{ maxHeight: "360px" }}>
          {error && (
            <div
              className="px-4 py-2 text-xs text-red-400 bg-red-500/10 border-b"
              style={{ borderColor: border }}
            >
              {error}
            </div>
          )}

          {reposLoading && !repos.length ? (
            <div className="py-10 text-center text-sm" style={{ color: textMuted }}>
              Loading repositories...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-sm" style={{ color: textMuted }}>
              No repositories found
            </div>
          ) : (
            filtered.map((repo) => {
              const [owner, repoName] = (repo.full_name || "").split("/");
              const isLoading = submittingRepo === repo.id;
              return (
                <button
                  key={repo.id}
                  onClick={() => handleSelect(repo)}
                  disabled={!!submittingRepo}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors disabled:cursor-not-allowed"
                  style={{ background: isLoading ? rowActive : "transparent" }}
                  onMouseEnter={(e) => {
                    if (!isLoading) e.currentTarget.style.background = rowHover;
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {isLoading ? (
                    <svg
                      className="w-4 h-4 animate-spin flex-shrink-0"
                      style={{ color: "#E8654A" }}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16" height="16" viewBox="0 0 24 24"
                      fill={textMuted} className="flex-shrink-0"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  )}
                  <span className="flex-1 min-w-0 text-sm">
                    <span style={{ color: textMuted }}>{owner} / </span>
                    <span className="font-semibold" style={{ color: textMain }}>
                      {repoName}
                    </span>
                  </span>
                  {repo.private && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: isDark ? "#2B3141" : "#E4E7F2",
                        color: textMuted,
                      }}
                    >
                      private
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
