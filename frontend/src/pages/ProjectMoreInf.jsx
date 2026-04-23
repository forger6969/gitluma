import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { closestCorners, DndContext, DragOverlay, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import api from "../api/api";
import {
  getCompletionDefaultOwnerId,
  getProjectTaskCommits,
  getTaskEditErrorMessage,
  normalizeTaskDeadline,
  updateTaskRequest,
  updateTaskStatusRequest,
} from "../api/task";
import useCommitsEvents from "../hooks/useCommitsEvents";
import useTaskEvents from "../hooks/useTaskEvents";
import { useSelector, useDispatch } from "react-redux";
import { clearCommits } from "../store/slices/projectCommitsSlice";
import { getTasks, addTask, putTask } from "../store/slices/taskSlice";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const getC = (dark = false) => ({
  coral:        "#E8654A",
  coralHover:   "#D4512F",
  coralActive:  "#C04020",
  coralBg:      dark ? "rgba(232,101,74,0.15)" : "#FCEDE9",
  coralSubtle:  dark ? "rgba(232,101,74,0.12)" : "rgba(232,101,74,0.1)",
  charcoal:     dark ? "#0F121A" : "#2B3141",
  pageBg:       dark ? "#0B0F19" : "#EEF1F7",
  cardBg:       dark ? "#141824" : "#FFFFFF",
  inputBg:      dark ? "#1E2235" : "#F4F6FB",
  heading:      dark ? "#EEF1F7" : "#181D2A",
  body:         dark ? "#C8CDD9" : "#2B3141",
  muted:        dark ? "#8892A8" : "#5C6480",
  placeholder:  dark ? "#5C6480" : "#9AA0B4",
  borderSubtle: dark ? "#2B3141" : "#E2E5EE",
  borderDef:    dark ? "#3B4258" : "#C8CDD9",
  success:      "#22B07D",
  successBg:    dark ? "rgba(34,176,125,0.15)" : "rgba(34,176,125,0.1)",
  warning:      "#D4890A",
  warningBg:    dark ? "rgba(212,137,10,0.15)" : "rgba(245,166,35,0.1)",
  danger:       "#E03D3D",
  dangerBg:     dark ? "rgba(224,61,61,0.15)" : "rgba(224,61,61,0.1)",
  info:         "#3A7EE8",
  infoBg:       dark ? "rgba(58,126,232,0.15)" : "rgba(58,126,232,0.1)",
});

// Context so sub-components can read tokens without prop drilling
const CCtx = createContext(getC(false));
const useC = () => useContext(CCtx);

/* ── Shared input helpers (call inside component with current C) ── */
const makeInputBase = (C) => ({
  backgroundColor: C.inputBg,
  border: `1.5px solid ${C.borderDef}`,
  color: C.heading,
  borderRadius: "12px",
  fontFamily: "inherit",
});
const makeFocus = (C) => (e) => {
  e.target.style.borderColor = C.coral;
  e.target.style.boxShadow = "0 0 0 3px rgba(232,101,74,0.12)";
};
const makeBlur = (C) => (e) => {
  e.target.style.borderColor = C.borderDef;
  e.target.style.boxShadow = "none";
};

/* ─────────────────────────────────────────────────────────────
   RoleDropdown – custom animated pill selector
   ───────────────────────────────────────────────────────────── */
const ROLE_OPTIONS = [
  {
    value: "member",
    label: "Member",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    value: "owner",
    label: "Owner",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const RoleDropdown = ({ value, onChange }) => {
  const C = useC();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = ROLE_OPTIONS.find((o) => o.value === value) || ROLE_OPTIONS[0];
  const isOwner = value === "owner";

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg select-none"
        style={{
          backgroundColor: isOwner ? C.coralSubtle : C.inputBg,
          color: isOwner ? C.coral : C.muted,
          border: `1px solid ${isOwner ? "rgba(232,101,74,0.3)" : C.borderSubtle}`,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.96)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
      >
        <span style={{ color: isOwner ? C.coral : C.muted }}>{current.icon}</span>
        {current.label}
        <svg
          className="w-3 h-3 opacity-50"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-30"
          style={{
            backgroundColor: C.cardBg,
            border: `1px solid ${C.borderDef}`,
            boxShadow: "0 8px 24px rgba(43,49,65,0.14)",
            minWidth: "130px",
          }}
        >
          {ROLE_OPTIONS.map((opt) => {
            const active = opt.value === value;
            const optIsOwner = opt.value === "owner";
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-left"
                style={{
                  backgroundColor: active ? (optIsOwner ? C.coralBg : C.inputBg) : "transparent",
                  color: optIsOwner ? C.coral : C.muted,
                  transition: "background-color 0.1s",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = C.inputBg; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span style={{ color: optIsOwner ? C.coral : C.muted }}>{opt.icon}</span>
                {opt.label}
                {active && (
                  <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   InviteModal
   ───────────────────────────────────────────────────────────── */
const InviteModal = ({ projectId, members = [], onClose }) => {
  const C = useC();
  const inputBase = makeInputBase(C);
  const handleFocus = makeFocus(C);
  const handleBlur = makeBlur(C);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(null);
  const [feedback, setFeedback] = useState({});
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await api.get(`/api/search/users/${encodeURIComponent(query)}`);
        setResults(res.data.users || []);
      } catch { setResults([]); }
      finally { setSearching(false); }
    }, 350);
  }, [query]);

  const handleInvite = async (username) => {
    setSending(username);
    try {
      await api.post("/api/invite/send", { username, projectId, role: "member" });
      setFeedback((p) => ({ ...p, [username]: "sent" }));
    } catch (err) {
      setFeedback((p) => ({ ...p, [username]: err?.response?.data?.message || "Error" }));
    } finally { setSending(null); }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(43,49,65,0.75)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderDef}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: C.borderSubtle, backgroundColor: C.inputBg }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.coralBg }}>
              <svg className="w-3.5 h-3.5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold" style={{ color: C.heading }}>Invite member</h2>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: C.muted }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: C.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input autoFocus type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {searching && (
              <div className="flex items-center justify-center py-8 gap-2" style={{ color: C.placeholder }}>
                <div className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: C.coral, borderTopColor: "transparent" }} />
                <span className="text-sm">Searching…</span>
              </div>
            )}
            {!searching && query.length >= 2 && results.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: C.placeholder }}>No users found</p>
            )}
            {results.map((user) => {
              const isMember = members.some((m) => m.user?.username === user.username);
              const isInvited = feedback[user.username] === "sent" || isMember;
              const hasError = feedback[user.username] && !isInvited;
              return (
                <div key={user._id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                  style={{ border: `1px solid ${C.borderSubtle}` }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <img src={user.avatar_url} alt={user.username} className="w-8 h-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: C.heading }}>{user.username}</p>
                    {user.email && <p className="text-xs truncate" style={{ color: C.placeholder }}>{user.email}</p>}
                  </div>
                  {isInvited ? (
                    <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ backgroundColor: C.inputBg, color: C.placeholder }}>
                      {isMember && feedback[user.username] !== "sent" ? "Member" : "Invited ✓"}
                    </span>
                  ) : hasError ? (
                    <span className="text-xs font-medium" style={{ color: C.danger }}>{feedback[user.username]}</span>
                  ) : (
                    <button onClick={() => handleInvite(user.username)} disabled={sending === user.username}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                      style={{ backgroundColor: C.coral, color: "#fff", opacity: sending === user.username ? 0.5 : 1 }}
                      onMouseEnter={(e) => { if (sending !== user.username) e.currentTarget.style.backgroundColor = C.coralHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.coral; }}>
                      {sending === user.username ? "…" : "Invite"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Toast
   ───────────────────────────────────────────────────────────── */
const TOAST_ICONS = {
  commit: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" />
    </svg>
  ),
  task: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const Toast = ({ toast, onDismiss }) => {
  const C = useC();
  const TOAST_ACCENT = {
    commit: { border: C.coral,   bg: C.coralBg,   icon: C.coral,   bar: C.coral   },
    task:   { border: C.success, bg: C.successBg, icon: C.success, bar: C.success },
  };
  const [visible, setVisible] = useState(false);
  const accent = TOAST_ACCENT[toast.type] || TOAST_ACCENT.commit;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300); }, 4500);
    return () => clearTimeout(t);
  }, [onDismiss, toast.id]);

  return (
    <div
      style={{
        backgroundColor: C.cardBg,
        border: `1px solid ${accent.border}`,
        borderRadius: "14px",
        boxShadow: "0 8px 28px rgba(43,49,65,0.16)",
        padding: "12px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        minWidth: "300px",
        maxWidth: "360px",
        position: "relative",
        overflow: "hidden",
        transition: "opacity 0.3s, transform 0.3s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
      }}
    >
      <div style={{
        width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
        backgroundColor: accent.bg, color: accent.icon,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {TOAST_ICONS[toast.type]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: C.heading, marginBottom: "2px" }}>{toast.title}</p>
        <p style={{ fontSize: "11px", color: C.muted, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{toast.body}</p>
      </div>
      <button onClick={() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300); }}
        style={{ color: C.placeholder, flexShrink: 0, lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: "3px", width: "100%", backgroundColor: accent.bar, opacity: 0.35, borderRadius: "0 0 14px 14px",
      }} />
    </div>
  );
};

const ToastContainer = ({ toasts, onDismiss }) => (
  <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
    {toasts.map((t) => <Toast key={t.id} toast={t} onDismiss={onDismiss} />)}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Task Completion Modal
   ───────────────────────────────────────────────────────────── */
const TaskCompletionModal = ({ project, modalState, onClose, onSubmit }) => {
  const C = useC();
  const inputBase = makeInputBase(C);
  const handleFocus = makeFocus(C);
  const handleBlur = makeBlur(C);
  const task = modalState?.task;
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [completedBy, setCompletedBy] = useState("");
  const [selectedCommitId, setSelectedCommitId] = useState("");

  useEffect(() => {
    if (!modalState || !project?._id) return;

    let ignore = false;
    const fallbackOwnerId = getCompletionDefaultOwnerId(project);
    setCompletedBy(modalState.completedBy || fallbackOwnerId);
    setSelectedCommitId(modalState.commitId || task?.linked_commit?._id || "");
    setError("");
    setLoading(true);

    getProjectTaskCommits(project._id)
      .then((data) => {
        if (ignore) return;
        setCommits(data.commits || []);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err?.response?.data?.message || "Commitlarni yuklab bo'lmadi");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [modalState, project, task]);

  if (!modalState || !task) return null;

  const members = project?.members || [];
  const availableCommits = commits.filter((commit) => !commit.task || commit.task?._id === task._id);
  const linkedCommits = commits.filter((commit) => commit.task && commit.task?._id !== task._id);

  const handleSubmit = async (skipCommit = false) => {
    setSubmitting(true);
    setError("");

    try {
      await onSubmit({
        ...modalState,
        completedBy: completedBy || getCompletionDefaultOwnerId(project),
        commitId: skipCommit ? "" : selectedCommitId,
      });
    } catch (err) {
      setError(err?.message || "Task completion saqlanmadi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(43,49,65,0.78)" }} onClick={onClose}>
      <div className="rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderDef}` }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: C.borderSubtle, backgroundColor: C.inputBg }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.placeholder }}>Task completion</p>
            <h2 className="text-sm font-semibold" style={{ color: C.heading }}>
              {task.task_name} {"->"} {modalState.nextStatus.replace("_", " ")}
            </h2>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: C.muted }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Kim bajardi?
            </label>
            <select
              value={completedBy}
              onChange={(e) => setCompletedBy(e.target.value)}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {members.map((member) => (
                <option key={member._id || member.user?._id} value={member.user?._id}>
                  {member.user?.username} {member.role === "owner" ? "(owner)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: C.inputBg, border: `1px solid ${C.borderSubtle}` }}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.placeholder }}>Qaysi commit?</p>
                <p className="text-sm" style={{ color: C.muted }}>Commit tanlashingiz yoki o‘tkazib yuborishingiz mumkin.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={submitting}
                className="text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                style={{ backgroundColor: C.cardBg, color: C.muted, border: `1px solid ${C.borderSubtle}`, opacity: submitting ? 0.6 : 1 }}
              >
                O'tkazib yuborish
              </button>
            </div>

            {loading ? (
              <p className="text-sm" style={{ color: C.placeholder }}>Commitlar yuklanmoqda…</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: C.placeholder }}>Mavjud commitlar</p>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {availableCommits.length === 0 ? (
                      <p className="text-sm" style={{ color: C.placeholder }}>Bo'sh commit yo'q</p>
                    ) : availableCommits.map((commit) => {
                      const active = selectedCommitId === commit._id;
                      return (
                        <button
                          key={commit._id}
                          type="button"
                          onClick={() => setSelectedCommitId(commit._id)}
                          className="w-full text-left rounded-xl p-3 transition-all"
                          style={{
                            backgroundColor: active ? C.coralBg : C.cardBg,
                            border: `1px solid ${active ? "rgba(232,101,74,0.35)" : C.borderSubtle}`,
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate" style={{ color: C.heading }}>{commit.commit_message}</p>
                              <p className="text-xs mt-1" style={{ color: C.placeholder }}>
                                {commit.author_username} · {new Date(commit.commit_date || commit.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <span className="text-xs font-mono px-2 py-1 rounded-lg"
                              style={{ backgroundColor: C.inputBg, color: C.placeholder }}>
                              {commit.commit_id?.slice(0, 7)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {linkedCommits.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: C.placeholder }}>Band commitlar</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {linkedCommits.map((commit) => (
                        <div key={commit._id} className="rounded-xl p-3"
                          style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, opacity: 0.8 }}>
                          <p className="text-sm font-medium" style={{ color: C.heading }}>{commit.commit_message}</p>
                          <p className="text-xs mt-1" style={{ color: C.placeholder }}>
                            {commit.author_username} · {commit.task?.key || "Linked task"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
              style={{ backgroundColor: C.dangerBg, color: C.danger, border: "1px solid rgba(224,61,61,0.2)" }}>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.inputBg, color: C.muted, border: `1px solid ${C.borderSubtle}` }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={submitting || loading}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.coral, color: "#fff", opacity: submitting || loading ? 0.6 : 1 }}
            >
              {submitting ? "Saving..." : "Save completion"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   TaskDetailModal
   ───────────────────────────────────────────────────────────── */
const TaskDetailModal = ({ task, onClose, onUpdated, onRequireCompletion }) => {
  const C = useC();
  const inputBase = makeInputBase(C);
  const handleFocus = makeFocus(C);
  const handleBlur = makeBlur(C);
  const dispatch = useDispatch();
  const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const col = KANBAN_COLUMNS.find((c) => c.key === task.status);
  const deadline = task.task_deadline ? new Date(task.task_deadline) : null;
  const isOverdue = task.status === "overdue";
  const completedBy = task.completedAt_user?.user?.username || task.completedAt_user?.github_username;
  const initialForm = {
    task_name: task.task_name || "",
    task_describe: task.task_describe || "",
    priority: task.priority || "medium",
    task_deadline: normalizeTaskDeadline(task.task_deadline),
    status: task.status || "todo",
  };
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      task_name: task.task_name || "",
      task_describe: task.task_describe || "",
      priority: task.priority || "medium",
      task_deadline: normalizeTaskDeadline(task.task_deadline),
      status: task.status || "todo",
    });
    setError("");
  }, [task]);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (COMPLETION_STATUSES.includes(form.status) && form.status !== task.status) {
        onRequireCompletion?.({
          task,
          nextStatus: form.status,
          nextValues: form,
          previousTask: task,
          source: "edit",
        });
        onClose();
        return;
      }

      const res = await updateTaskRequest(task._id, task, form);

      if (res.skipped) {
        onClose();
        return;
      }

      if (res.success && res.task) {
        dispatch(putTask(res.task));
        onUpdated?.(res.task);
        onClose();
      }
    } catch (err) {
      setError(getTaskEditErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(43,49,65,0.75)" }} onClick={onClose}>
      <div className="rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderDef}` }}
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: C.borderSubtle, backgroundColor: C.inputBg }}>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: C.coralBg, color: C.coral }}>{task.key}</span>
            <h2 className="text-sm font-semibold truncate" style={{ color: C.heading }}>{task.task_name}</h2>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: C.muted }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: pri.bg, color: pri.color }}>{pri.label} priority</span>
            {col && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: col.bgColor || C.inputBg, color: col.color }}>
                {col.icon}{col.label}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Task name
            </label>
            <input
              required
              value={form.task_name}
              onChange={set("task_name")}
              className="w-full px-4 py-2.5 text-sm outline-none transition-all"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Description
            </label>
            <textarea
              rows={4}
              value={form.task_describe}
              onChange={set("task_describe")}
              className="w-full px-4 py-2.5 text-sm outline-none transition-all resize-none"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ backgroundColor: C.inputBg }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: C.placeholder }}>Assigned to</p>
              {task.assigned_user ? (
                <div className="flex items-center gap-2">
                  <img src={task.assigned_user.avatar_url} alt="" className="w-7 h-7 rounded-lg object-cover" />
                  <p className="text-sm font-medium truncate" style={{ color: C.heading }}>{task.assigned_user.username}</p>
                </div>
              ) : <p className="text-sm" style={{ color: C.placeholder }}>—</p>}
            </div>

            <div className="rounded-xl p-3" style={{ backgroundColor: C.inputBg }}>
              <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: C.placeholder }}>
                Deadline
              </label>
              <input
                type="date"
                value={form.task_deadline}
                onChange={set("task_deadline")}
                className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                style={inputBase}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Priority
            </label>
            <select
              value={form.priority}
              onChange={set("priority")}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Status
            </label>
            <select
              value={form.status}
              onChange={set("status")}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {KANBAN_COLUMNS.map((status) => (
                <option key={status.key} value={status.key}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Completed info */}
          {task.completedAt && (
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
              style={{ backgroundColor: C.successBg, border: `1px solid rgba(34,176,125,0.2)` }}>
              <svg className="w-4 h-4 shrink-0" style={{ color: C.success }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <p className="text-xs font-semibold" style={{ color: C.success }}>
                  Completed {new Date(task.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  {completedBy && ` by ${completedBy}`}
                </p>
                {task.linked_commit?.commit_message && (
                  <p className="text-xs mt-1" style={{ color: C.muted }}>
                    Commit: {task.linked_commit.commit_message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Created */}
          <p className="text-xs" style={{ color: C.placeholder }}>
            Created {new Date(task.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </p>

          {deadline && !form.task_deadline && (
            <p className="text-xs" style={{ color: isOverdue ? C.danger : C.placeholder }}>
              Current deadline: {deadline.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          )}

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
              style={{ backgroundColor: C.dangerBg, color: C.danger, border: "1px solid rgba(224,61,61,0.2)" }}>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.inputBg, color: C.muted, border: `1px solid ${C.borderSubtle}` }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.coral, color: "#fff", opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   AssignTaskModal
   ───────────────────────────────────────────────────────────── */
const PRIORITIES = ["low", "medium", "high"];

const AssignTaskModal = ({ projectId, members = [], onClose, onAssigned }) => {
  const C = useC();
  const inputBase = makeInputBase(C);
  const handleFocus = makeFocus(C);
  const handleBlur = makeBlur(C);
  const [form, setForm] = useState({
    task_name: "", task_describe: "", task_deadline: "", assigned_user: "", priority: "medium",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const nonOwnerMembers = members.filter((m) => m.role !== "owner");

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if (!form.assigned_user) { setError("Please select a member to assign"); return; }
    setSubmitting(true);
    try {
      const res = await api.post("/api/task/assign", { ...form, project_id: projectId });
      onAssigned(res.data.task); onClose();
    } catch (err) { setError(err?.response?.data?.message || "Error assigning task"); }
    finally { setSubmitting(false); }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(43,49,65,0.75)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderDef}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: C.borderSubtle, backgroundColor: C.inputBg }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.coralBg }}>
              <svg className="w-3.5 h-3.5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold" style={{ color: C.heading }}>Assign Task</h2>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: C.muted }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
              Task name <span style={{ color: C.coral }}>*</span>
            </label>
            <input required value={form.task_name} onChange={set("task_name")} placeholder="Fix login bug"
              className="w-full px-4 py-2.5 text-sm outline-none transition-all"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
              Description <span style={{ color: C.coral }}>*</span>
            </label>
            <textarea required rows={3} value={form.task_describe} onChange={set("task_describe")}
              placeholder="Describe what needs to be done…"
              className="w-full px-4 py-2.5 text-sm outline-none transition-all resize-none"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
                Deadline <span style={{ color: C.coral }}>*</span>
              </label>
              <input required type="datetime-local" value={form.task_deadline} onChange={set("task_deadline")}
                className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>Priority</label>
              <select value={form.priority} onChange={set("priority")}
                className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
                style={inputBase} onFocus={handleFocus} onBlur={handleBlur}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
              Assign to <span style={{ color: C.coral }}>*</span>
            </label>
            <select value={form.assigned_user} onChange={set("assigned_user")}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur}>
              <option value="">— Select member —</option>
              {nonOwnerMembers.map((m) => (
                <option key={m._id} value={m.user?._id}>{m.user?.username}</option>
              ))}
            </select>
          </div>
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
              style={{ backgroundColor: C.dangerBg, color: C.danger, border: "1px solid rgba(224,61,61,0.2)" }}>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
          <button type="submit" disabled={submitting}
            className="w-full font-semibold py-2.5 rounded-xl transition-all text-sm"
            style={{ backgroundColor: C.coral, color: "#fff", opacity: submitting ? 0.5 : 1 }}
            onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = C.coralHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.coral; }}>
            {submitting ? "Assigning…" : "Assign Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Kanban config
   ───────────────────────────────────────────────────────────── */
const _CL = getC(false);
const KANBAN_COLUMNS = [
  {
    key: "todo", label: "To Do",
    color: _CL.muted, bgColor: "#F0F2F7", borderColor: _CL.borderDef,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    key: "in_progress", label: "In Progress",
    color: _CL.info, bgColor: "rgba(58,126,232,0.05)", borderColor: "rgba(58,126,232,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-.49-4.5" />
      </svg>
    ),
  },
  {
    key: "done", label: "Done",
    color: _CL.success, bgColor: "rgba(34,176,125,0.05)", borderColor: "rgba(34,176,125,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    key: "verified", label: "Verified",
    color: _CL.coral, bgColor: "rgba(232,101,74,0.05)", borderColor: "rgba(232,101,74,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    key: "overdue", label: "Overdue",
    color: _CL.danger, bgColor: "rgba(224,61,61,0.05)", borderColor: "rgba(224,61,61,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const PRIORITY_CONFIG = {
  high:   { color: _CL.danger,   bg: _CL.dangerBg,   label: "High" },
  medium: { color: _CL.warning,  bg: _CL.warningBg,  label: "Med" },
  low:    { color: _CL.success,  bg: _CL.successBg,  label: "Low" },
};
const COMPLETION_STATUSES = ["done", "verified"];

const isColumnKey = (value) => KANBAN_COLUMNS.some((column) => column.key === value);

const getTaskColumnKey = (overId, tasks) => {
  if (!overId) return null;
  if (isColumnKey(overId)) return overId;

  const task = tasks.find((item) => item._id === overId);
  return task?.status || null;
};

/* ── KanbanCard ── */
const KanbanCard = ({ task, onClick, dragHandleProps = {}, isDragging = false }) => {
  const C = useC();
  const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const isOverdue = task.status === "overdue";
  const deadline = task.task_deadline ? new Date(task.task_deadline) : null;
  const deadlineStr = deadline
    ? deadline.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;
  const completedBy = task.completedAt_user?.user?.username || task.completedAt_user?.github_username;

  return (
    <div
      className="rounded-xl p-3"
      onClick={onClick}
      style={{
        backgroundColor: C.cardBg,
        border: `1px solid ${isOverdue ? "rgba(224,61,61,0.25)" : C.borderSubtle}`,
        boxShadow: isDragging ? "0 10px 24px rgba(43,49,65,0.18)" : "0 1px 3px rgba(43,49,65,0.05)",
        transition: "box-shadow 0.15s, transform 0.15s, opacity 0.15s",
        cursor: "pointer",
        opacity: isDragging ? 0.78 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(43,49,65,0.12)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(43,49,65,0.05)";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Key + priority */}
      <div className="flex items-center justify-between mb-2 gap-1">
        <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded shrink-0"
          style={{ backgroundColor: C.inputBg, color: C.placeholder }}>
          {task.key}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: pri.bg, color: pri.color }}>
            {pri.label}
          </span>
          <button
            type="button"
            {...dragHandleProps}
            onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-md flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: C.inputBg, color: C.placeholder, touchAction: "none" }}
            aria-label="Drag task"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="6" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="18" r="1" />
              <circle cx="15" cy="6" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="18" r="1" />
            </svg>
          </button>
        </div>
      </div>
      {/* Title */}
      <p className="text-sm font-semibold leading-snug mb-1" style={{ color: C.heading }}>
        {task.task_name}
      </p>
      {/* Description */}
      {task.task_describe && (
        <p className="text-xs leading-relaxed line-clamp-2 mb-2" style={{ color: C.muted }}>
          {task.task_describe}
        </p>
      )}
      {/* Deadline */}
      {deadlineStr && (
        <div className="flex items-center gap-1 pt-2" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
          <svg className="w-3 h-3 shrink-0" style={{ color: isOverdue ? C.danger : C.placeholder }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xs" style={{ color: isOverdue ? C.danger : C.placeholder }}>
            {deadlineStr}
          </span>
        </div>
      )}
      {(completedBy || task.linked_commit?.commit_message) && (
        <div className="pt-2 mt-2 space-y-1" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
          {completedBy && (
            <p className="text-[11px] truncate" style={{ color: C.muted }}>
              Done by {completedBy}
            </p>
          )}
          {task.linked_commit?.commit_message && (
            <p className="text-[11px] truncate" style={{ color: C.placeholder }}>
              {task.linked_commit.commit_message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const DraggableTask = ({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
    data: { type: "task", task },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <KanbanCard
        task={task}
        onClick={onClick}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

const DroppableColumn = ({ column, tasks, onTaskClick }) => {
  const C = useC();
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
    data: { type: "column", columnKey: column.key },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${column.borderColor}`,
        backgroundColor: isOver ? C.cardBg : column.bgColor,
        minHeight: "300px",
        boxShadow: isOver ? "inset 0 0 0 2px rgba(232,101,74,0.18)" : "none",
        transition: "background-color 0.15s, box-shadow 0.15s",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 shrink-0"
        style={{ borderBottom: `1px solid ${column.borderColor}` }}>
        <div className="flex items-center justify-center shrink-0" style={{ color: column.color }}>
          {column.icon}
        </div>
        <span className="text-xs font-bold flex-1 truncate" style={{ color: column.color }}>
          {column.label}
        </span>
        <span
          className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.8)", color: column.color }}>
          {tasks.length}
        </span>
      </div>

      <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto" style={{ maxHeight: "400px" }}>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 opacity-50">
              <div style={{ color: column.color }}>{column.icon}</div>
              <p className="text-xs mt-2 font-medium" style={{ color: column.color }}>Empty</p>
            </div>
          ) : (
            tasks.map((task) => (
              <DraggableTask key={task._id} task={task} onClick={() => onTaskClick(task)} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

const KanbanContext = ({ tasks, onTaskClick, onTaskMove }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );
  const [activeTaskId, setActiveTaskId] = useState(null);
  const grouped = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.key] = tasks.filter((task) => task.status === col.key);
    return acc;
  }, {});
  const activeTask = tasks.find((task) => task._id === activeTaskId) || null;

  const handleDragStart = (event) => {
    setActiveTaskId(event.active.id);
  };

  const handleDragCancel = () => {
    setActiveTaskId(null);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTaskId(null);

    if (!over) return;

    const task = tasks.find((item) => item._id === active.id);
    if (!task) return;

    const nextStatus = getTaskColumnKey(over.id, tasks);
    if (!nextStatus || nextStatus === task.status) return;

    await onTaskMove(task, nextStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-5 gap-3">
        {KANBAN_COLUMNS.map((column) => (
          <DroppableColumn
            key={column.key}
            column={column}
            tasks={grouped[column.key] || []}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};

/* ── KanbanBoard ── */
const KanbanBoard = ({ tasks, onAssign, isCurrOwner, onTaskClick, onTaskMove }) => {
  const C = useC();
  return (
    <div className="rounded-2xl p-6"
      style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.coralBg }}>
            <svg className="w-3.5 h-3.5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="18" rx="1" /><rect x="14" y="3" width="7" height="11" rx="1" />
            </svg>
          </div>
          <h2 className="text-base font-semibold" style={{ color: C.heading }}>Kanban Board</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: C.inputBg, color: C.muted }}>{tasks.length} tasks</span>
        </div>
        {isCurrOwner && (
          <button onClick={onAssign}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: C.coral, color: "#fff" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.coralHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.coral}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Assign Task
          </button>
        )}
      </div>

      <KanbanContext tasks={tasks} onTaskClick={onTaskClick} onTaskMove={onTaskMove} />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Shared layout primitives
   ───────────────────────────────────────────────────────────── */
const Section = ({ children }) => {
  const C = useC();
  return (
    <div className="rounded-2xl p-6"
      style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
      {children}
    </div>
  );
};

const SectionTitle = ({ children, count }) => {
  const C = useC();
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <h2 className="text-base font-semibold" style={{ color: C.heading }}>{children}</h2>
      {count !== undefined && (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: C.inputBg, color: C.muted }}>{count}</span>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  const C = useC();
  return (
    <div className="rounded-2xl p-5 flex items-center gap-4"
      style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: C.coralBg }}>{icon}</div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: C.placeholder }}>{title}</p>
        <p className="text-lg font-bold mt-0.5" style={{ color: C.heading }}>{value || "—"}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────────────────────── */
const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
  { key: "verified", label: "Verified" },
  { key: "overdue", label: "Overdue" },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskFilter, setTaskFilter] = useState("all");
  const [toasts, setToasts] = useState([]);
  const [dragError, setDragError] = useState("");
  const [completionModal, setCompletionModal] = useState(null);
  const toastIdRef = useRef(0);
  const prevCommitCountRef = useRef(0);

  const dispatch = useDispatch();
  const isDark = useSelector((s) => s.theme.mode) === "dark";
  const C = getC(isDark);
  const currentUser = useSelector((s) => s.user.user);
  const currentUserId = currentUser?.user?._id || currentUser?._id;
  const socketCommits = useSelector((s) => s.projectcommits.commits);
  const tasks = useSelector((state) => state.tasks.tasks);

  const addToast = (type, title, body) => {
    const toast = { id: ++toastIdRef.current, type, title, body };
    setToasts((prev) => [...prev, toast]);
  };
  const dismissToast = (toastId) => setToasts((prev) => prev.filter((t) => t.id !== toastId));

  useCommitsEvents(project?._id);
  useTaskEvents(project?._id, (task) => {
    addToast("task", `Task ${task.key} updated`, `"${task.task_name}" is now ${task.status.replace("_", " ")}`);
  });

  useEffect(() => {
    if (socketCommits.length > prevCommitCountRef.current && prevCommitCountRef.current > 0) {
      const latest = socketCommits[0];
      addToast("commit", "New commit pushed", latest?.commit_message || "No message");
    }
    prevCommitCountRef.current = socketCommits.length;
  }, [socketCommits]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/project/${id}`);
        setProject(res.data.project);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchInvites = async () => {
      try {
        const res = await api.get(`/api/invite/invites?projectId=${id}`);
        setInvites(res.data.invites || []);
      } catch (err) {
        console.error(err);
      }
    };

    dispatch(clearCommits());
    fetchProject();
    fetchInvites();
    dispatch(getTasks(id));
    return () => dispatch(clearCommits());
  }, [dispatch, id]);

  const handleRoleChange = async (memberId, role) => {
    try {
      await api.patch(`/api/project/${id}/members/${memberId}/role`, { role });
      setProject((p) => ({ ...p, members: p.members.map((m) => m._id === memberId ? { ...m, role } : m) }));
    } catch (err) { console.error(err); }
  };
  const handleRemoveMember = async (memberId) => {
    try {
      await api.delete(`/api/project/${id}/members/${memberId}`);
      setProject((p) => ({ ...p, members: p.members.filter((m) => m._id !== memberId) }));
    } catch (err) { console.error(err); }
  };

  const openCompletionModal = (payload) => {
    setCompletionModal(payload);
  };

  const closeCompletionModal = () => {
    setCompletionModal(null);
  };

  const submitCompletionModal = async (payload) => {
    const {
      task,
      nextStatus,
      nextValues,
      previousTask = task,
      completedBy,
      commitId,
    } = payload;

    const optimisticTask = {
      ...task,
      ...nextValues,
      status: nextStatus,
      completedAt_user: completedBy
        ? {
            user: project?.members?.find((member) => member.user?._id === completedBy)?.user || task.completedAt_user?.user || null,
            github_username: null,
          }
        : task.completedAt_user,
    };

    dispatch(putTask(optimisticTask));
    if (selectedTask?._id === optimisticTask._id) {
      setSelectedTask(optimisticTask);
    }

    try {
      const res = await updateTaskRequest(task._id, task, nextValues || { status: nextStatus }, {
        status: nextStatus,
        completed_by: completedBy || getCompletionDefaultOwnerId(project),
        ...(commitId ? { commit_id: commitId } : { commit_id: "" }),
      });

      if (res?.success && res.task) {
        dispatch(putTask(res.task));
        if (selectedTask?._id === res.task._id) {
          setSelectedTask(res.task);
        }
        setCompletionModal(null);
      }
    } catch (err) {
      dispatch(putTask(previousTask));
      if (selectedTask?._id === previousTask._id) {
        setSelectedTask(previousTask);
      }

      if (err?.response?.status === 403) {
        setDragError("Sizda ruxsat yo'q");
        addToast("task", "Permission denied", "Sizda ruxsat yo'q");
      }

      throw new Error(err?.response?.data?.message || "Task completion saqlanmadi");
    }
  };

  const handleTaskMove = async (task, nextStatus) => {
    const previousTask = { ...task };
    setDragError("");

    if (COMPLETION_STATUSES.includes(nextStatus) && nextStatus !== task.status) {
      openCompletionModal({
        task,
        nextStatus,
        nextValues: { ...task, status: nextStatus },
        previousTask,
        source: "drag",
      });
      return;
    }

    const optimisticTask = { ...task, status: nextStatus };
    dispatch(putTask(optimisticTask));

    try {
      const res = await updateTaskStatusRequest(task._id, nextStatus);

      if (res?.success && res.task) {
        dispatch(putTask(res.task));
        if (selectedTask?._id === res.task._id) {
          setSelectedTask(res.task);
        }
      }
    } catch (err) {
      dispatch(putTask(previousTask));

      if (selectedTask?._id === previousTask._id) {
        setSelectedTask(previousTask);
      }

      if (err?.response?.status === 403) {
        setDragError("Sizda ruxsat yo'q");
        addToast("task", "Permission denied", "Sizda ruxsat yo'q");
        return;
      }

      setDragError(err?.response?.data?.message || "Taskni ko'chirishda xatolik yuz berdi");
    }
  };

  if (loading) return (
    <CCtx.Provider value={C}>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.pageBg }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: C.coral, borderTopColor: "transparent" }} />
          <p className="text-sm font-medium" style={{ color: C.muted }}>Loading project…</p>
        </div>
      </div>
    </CCtx.Provider>
  );

  if (!project) return (
    <CCtx.Provider value={C}>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.pageBg }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: C.dangerBg }}>
            <svg className="w-6 h-6" style={{ color: C.danger }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="font-semibold" style={{ color: C.heading }}>Project not found</p>
          <p className="text-sm mt-1" style={{ color: C.placeholder }}>This project doesn't exist or you don't have access.</p>
        </div>
      </div>
    </CCtx.Provider>
  );

  const isCurrOwner = project.members?.some((m) => m.user?._id === currentUserId && m.role === "owner");
  const isOwner = project.repo_owner_user?._id === currentUserId
    || project.repo_owner_user?.toString() === currentUserId;
  const allCommits = [...socketCommits, ...[...(project.commits || [])].reverse()];

  const filteredTasks = taskFilter === "all" ? tasks : tasks.filter((t) => t.status === taskFilter);

  return (
    <CCtx.Provider value={C}>
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: C.pageBg }}>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      {inviteOpen && (
        <InviteModal projectId={project._id} members={project.members} onClose={() => setInviteOpen(false)} />
      )}
      {assignOpen && (
        <AssignTaskModal
          projectId={project._id} members={project.members}
          onClose={() => setAssignOpen(false)}
          onAssigned={(task) => dispatch(addTask(task))}
        />
      )}
      {completionModal && (
        <TaskCompletionModal
          project={project}
          modalState={completionModal}
          onClose={closeCompletionModal}
          onSubmit={submitCompletionModal}
        />
      )}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdated={(updatedTask) => setSelectedTask(updatedTask)}
          onRequireCompletion={openCompletionModal}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-5">
        {dragError && (
          <div className="px-4 py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: C.dangerBg, color: C.danger, border: "1px solid rgba(224,61,61,0.18)" }}>
            {dragError}
          </div>
        )}

        {/* ── Hero Header ── */}
        <div className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: C.charcoal, boxShadow: "0 4px 24px rgba(43,49,65,0.18)" }}>
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${C.coral} 0%, #F5A87A 100%)` }} />
          <div className="flex items-center gap-5 px-6 py-5">
            <div className="relative shrink-0">
              <img src={project.repo_owner_user?.avatar_url} alt="avatar"
                className="w-14 h-14 rounded-xl object-cover"
                style={{ border: "2px solid rgba(232,101,74,0.4)" }} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                style={{ backgroundColor: C.success, borderColor: C.charcoal }} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold truncate" style={{ color: "#fff" }}>{project.repo_name}</h1>
              <p className="text-sm mt-0.5 truncate" style={{ color: C.placeholder }}>{project.repo_full_name}</p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              {isCurrOwner && (
                <button onClick={() => setAssignOpen(true)}
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Assign Task
                </button>
              )}
              <button onClick={() => setInviteOpen(true)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                style={{ backgroundColor: C.coral, color: "#fff" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.coralHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.coral}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                Invite
              </button>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Branch" value={project.default_branch}
            icon={<svg className="w-5 h-5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>} />
          <StatCard title="Commits" value={allCommits.length}
            icon={<svg className="w-5 h-5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" /></svg>} />
          <StatCard title="Visibility" value={project.visibility}
            icon={<svg className="w-5 h-5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>} />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid md:grid-cols-5 gap-5">

          {/* Left: Owner + Members + Invites */}
          <div className="md:col-span-2 space-y-5">

            {/* Owner */}
            <Section>
              <SectionTitle>Owner</SectionTitle>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: C.inputBg }}>
                <img src={project.repo_owner_user?.avatar_url} alt="" className="w-11 h-11 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: C.heading }}>{project.repo_owner_user?.username}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: C.placeholder }}>{project.repo_owner_user?.email}</p>
                </div>
                <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg shrink-0"
                  style={{ backgroundColor: C.coralSubtle, color: C.coral }}>Owner</span>
              </div>
            </Section>

            {/* Members */}
            <Section>
              <SectionTitle count={project.members?.length}>Members</SectionTitle>
              <div className="space-y-2">
                {project.members?.map((member) => {
                  const isSelf = member.user?._id === currentUserId;
                  return (
                    <div key={member._id}
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                      style={{ border: `1px solid ${C.borderSubtle}` }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                      <img src={member.user?.avatar_url} alt="avatar" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: C.heading }}>
                          {member.user?.username || "Unknown"}
                        </p>
                      </div>
                      {isOwner && !isSelf ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* ← Custom role dropdown */}
                          <RoleDropdown
                            value={member.role}
                            onChange={(role) => handleRoleChange(member._id, role)}
                          />
                          <button
                            onClick={() => handleRemoveMember(member._id)}
                            className="text-xs px-2 py-1.5 rounded-lg font-semibold transition-colors"
                            style={{ backgroundColor: C.dangerBg, color: C.danger }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(224,61,61,0.18)"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.dangerBg}>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold px-2 py-1 rounded-lg shrink-0"
                          style={member.role === "owner"
                            ? { backgroundColor: C.coralSubtle, color: C.coral }
                            : { backgroundColor: C.inputBg, color: C.placeholder }}>
                          {member.role}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Invites */}
            <Section>
              <SectionTitle count={invites.length}>Invites</SectionTitle>
              {invites.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: C.inputBg }}>
                    <svg className="w-4 h-4" style={{ color: C.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: C.placeholder }}>No invites yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {invites.map((invite) => {
                    const ss = invite.status === "accepted"
                      ? { bg: C.successBg, color: C.success }
                      : invite.status === "rejected"
                      ? { bg: C.dangerBg, color: C.danger }
                      : { bg: C.warningBg, color: C.warning };
                    return (
                      <div key={invite._id} className="flex items-center gap-2.5 p-2.5 rounded-xl"
                        style={{ border: `1px solid ${C.borderSubtle}` }}>
                        <img src={invite.invitedUser?.avatar_url} alt={invite.invitedUser?.username}
                          className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: C.heading }}>
                            {invite.invitedUser?.username || "Unknown"}
                          </p>
                          <p className="text-xs truncate" style={{ color: C.placeholder }}>
                            by {invite.inviteBy?.username} · {new Date(invite.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={{ backgroundColor: ss.bg, color: ss.color }}>
                          {invite.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>
          </div>

          {/* Right: Commits + Tasks list */}
          <div className="md:col-span-3 space-y-5">

            {/* Commits */}
            <Section>
              <SectionTitle count={allCommits.length}>Commits</SectionTitle>
              <div className="space-y-2 max-h-80 overflow-y-auto -mr-1 pr-1">
                {allCommits.length === 0 ? (
                  <p className="text-sm text-center py-6" style={{ color: C.placeholder }}>No commits yet</p>
                ) : allCommits.map((commit, index) => {
                  const isNew = index < socketCommits.length;
                  return (
                    <div key={commit._id || index} className="p-3.5 rounded-xl transition-colors"
                      style={isNew
                        ? { backgroundColor: "rgba(232,101,74,0.06)", border: "1px solid rgba(232,101,74,0.2)" }
                        : { backgroundColor: C.inputBg, border: "1px solid transparent" }}>
                      {isNew && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.coral }} />
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.coral }}>New</span>
                        </div>
                      )}
                      <p className="text-sm font-medium" style={{ color: C.body }}>
                        {commit.commit_message || "No message"}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs" style={{ color: C.placeholder }}>
                          {new Date(commit.createdAt).toLocaleString()}
                        </span>
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg"
                          style={{ backgroundColor: C.coralSubtle, color: C.coral }}>#{index + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Tasks list */}
            <Section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-semibold" style={{ color: C.heading }}>Tasks</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: C.inputBg, color: C.muted }}>{tasks.length}</span>
                </div>
                {isCurrOwner && (
                  <button onClick={() => setAssignOpen(true)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                    style={{ backgroundColor: C.coral, color: "#fff" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.coralHover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.coral}>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Assign Task
                  </button>
                )}
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1.5 flex-wrap mb-4">
                {STATUS_FILTERS.map((f) => {
                  const count = f.key === "all" ? tasks.length : tasks.filter((t) => t.status === f.key).length;
                  const active = taskFilter === f.key;
                  return (
                    <button key={f.key} onClick={() => setTaskFilter(f.key)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg transition-all"
                      style={{
                        backgroundColor: active ? C.coral : C.inputBg,
                        color: active ? "#fff" : C.muted,
                        border: `1px solid ${active ? C.coral : C.borderSubtle}`,
                      }}>
                      {f.label} {count > 0 && <span style={{ opacity: active ? 0.8 : 0.6 }}>·{count}</span>}
                    </button>
                  );
                })}
              </div>

              {filteredTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5"
                    style={{ backgroundColor: C.inputBg }}>
                    <svg className="w-5 h-5" style={{ color: C.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium" style={{ color: C.muted }}>
                    {taskFilter === "all" ? "No tasks yet" : `No ${taskFilter.replace("_", " ")} tasks`}
                  </p>
                  {taskFilter === "all" && <p className="text-xs mt-0.5" style={{ color: C.placeholder }}>Assign a task to get started</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((task) => {
                    const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
                    const col = KANBAN_COLUMNS.find((c) => c.key === task.status);
                    const completedBy = task.completedAt_user?.user?.username || task.completedAt_user?.github_username;
                    return (
                      <div key={task._id} className="p-3.5 rounded-xl transition-colors"
                        style={{ border: `1px solid ${C.borderSubtle}`, cursor: "pointer" }}
                        onClick={() => setSelectedTask(task)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: C.coralSubtle, color: C.coral }}>{task.key}</span>
                              <p className="text-sm font-semibold truncate" style={{ color: C.heading }}>{task.task_name}</p>
                            </div>
                            {task.task_describe && (
                              <p className="text-xs mt-1 line-clamp-2" style={{ color: C.muted }}>{task.task_describe}</p>
                            )}
                            <div className="flex items-center gap-1.5 mt-2">
                              <svg className="w-3 h-3" style={{ color: C.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              <span className="text-xs" style={{ color: C.placeholder }}>
                                Due {new Date(task.task_deadline).toLocaleDateString()}
                              </span>
                            </div>
                            {(completedBy || task.linked_commit?.commit_message) && (
                              <div className="mt-2 space-y-1">
                                {completedBy && (
                                  <p className="text-xs" style={{ color: C.muted }}>
                                    Completed by {completedBy}
                                  </p>
                                )}
                                {task.linked_commit?.commit_message && (
                                  <p className="text-xs truncate" style={{ color: C.placeholder }}>
                                    Commit: {task.linked_commit.commit_message}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: pri.bg, color: pri.color }}>{pri.label}</span>
                            {col && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: col.bgColor, color: col.color }}>{col.label}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>
          </div>
        </div>

        {/* ── Kanban Board (full width) ── */}
        <KanbanBoard
          tasks={tasks}
          onAssign={() => setAssignOpen(true)}
          isCurrOwner={isCurrOwner}
          onTaskClick={setSelectedTask}
          onTaskMove={handleTaskMove}
        />

      </div>
    </div>
    </CCtx.Provider>
  );
};

export default ProjectDetails;
