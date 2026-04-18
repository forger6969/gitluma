import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import useCommitsEvents from "../hooks/useCommitsEvents";
import { useSelector, useDispatch } from "react-redux";
import { clearCommits } from "../store/slices/projectCommitsSlice";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  coral:        "#E8654A",
  coralHover:   "#D4512F",
  coralActive:  "#C04020",
  coralBg:      "#FCEDE9",
  coralSubtle:  "rgba(232,101,74,0.1)",
  charcoal:     "#2B3141",
  pageBg:       "#EEF1F7",
  cardBg:       "#FFFFFF",
  inputBg:      "#F4F6FB",
  heading:      "#181D2A",
  body:         "#2B3141",
  muted:        "#5C6480",
  placeholder:  "#9AA0B4",
  borderSubtle: "#E2E5EE",
  borderDef:    "#C8CDD9",
  success:      "#22B07D",
  successBg:    "rgba(34,176,125,0.1)",
  warning:      "#D4890A",
  warningBg:    "rgba(245,166,35,0.1)",
  danger:       "#E03D3D",
  dangerBg:     "rgba(224,61,61,0.1)",
  info:         "#3A7EE8",
  infoBg:       "rgba(58,126,232,0.1)",
};

/* ── Shared input helpers ── */
const inputBase = {
  backgroundColor: C.inputBg,
  border: `1.5px solid ${C.borderDef}`,
  color: C.heading,
  borderRadius: "12px",
  fontFamily: "inherit",
};
const handleFocus = (e) => {
  e.target.style.borderColor = C.coral;
  e.target.style.boxShadow = "0 0 0 3px rgba(232,101,74,0.12)";
};
const handleBlur = (e) => {
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
   AssignTaskModal
   ───────────────────────────────────────────────────────────── */
const PRIORITIES = ["low", "medium", "high"];

const AssignTaskModal = ({ projectId, members = [], onClose, onAssigned }) => {
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
const KANBAN_COLUMNS = [
  {
    key: "todo", label: "To Do",
    color: C.muted, bgColor: "#F0F2F7", borderColor: C.borderDef,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    key: "in_progress", label: "In Progress",
    color: C.info, bgColor: "rgba(58,126,232,0.05)", borderColor: "rgba(58,126,232,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-.49-4.5" />
      </svg>
    ),
  },
  {
    key: "done", label: "Done",
    color: C.success, bgColor: "rgba(34,176,125,0.05)", borderColor: "rgba(34,176,125,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    key: "verified", label: "Verified",
    color: C.coral, bgColor: "rgba(232,101,74,0.05)", borderColor: "rgba(232,101,74,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    key: "overdue", label: "Overdue",
    color: C.danger, bgColor: "rgba(224,61,61,0.05)", borderColor: "rgba(224,61,61,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const PRIORITY_CONFIG = {
  high:   { color: C.danger,   bg: C.dangerBg,   label: "High" },
  medium: { color: C.warning,  bg: C.warningBg,  label: "Med" },
  low:    { color: C.success,  bg: C.successBg,  label: "Low" },
};

/* ── KanbanCard ── */
const KanbanCard = ({ task }) => {
  const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const isOverdue = task.status === "overdue";
  const deadline = task.task_deadline ? new Date(task.task_deadline) : null;
  const deadlineStr = deadline
    ? deadline.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;

  return (
    <div
      className="rounded-xl p-3"
      style={{
        backgroundColor: C.cardBg,
        border: `1px solid ${isOverdue ? "rgba(224,61,61,0.25)" : C.borderSubtle}`,
        boxShadow: "0 1px 3px rgba(43,49,65,0.05)",
        transition: "box-shadow 0.15s, transform 0.15s",
        cursor: "default",
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
        <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: pri.bg, color: pri.color }}>
          {pri.label}
        </span>
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
    </div>
  );
};

/* ── KanbanBoard ── */
const KanbanBoard = ({ tasks, onAssign, isCurrOwner }) => {
  const grouped = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.key] = tasks.filter((t) => t.status === col.key);
    return acc;
  }, {});

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

      {/* Column grid */}
      <div className="grid grid-cols-5 gap-3">
        {KANBAN_COLUMNS.map((col) => {
          const colTasks = grouped[col.key] || [];
          return (
            <div key={col.key} className="flex flex-col rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${col.borderColor}`,
                backgroundColor: col.bgColor,
                minHeight: "300px",
              }}>
              {/* Column header */}
              <div className="flex items-center gap-2 px-3 py-2.5 shrink-0"
                style={{ borderBottom: `1px solid ${col.borderColor}` }}>
                <div className="flex items-center justify-center shrink-0" style={{ color: col.color }}>
                  {col.icon}
                </div>
                <span className="text-xs font-bold flex-1 truncate" style={{ color: col.color }}>
                  {col.label}
                </span>
                <span
                  className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", color: col.color }}>
                  {colTasks.length}
                </span>
              </div>
              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto" style={{ maxHeight: "400px" }}>
                {colTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-8 opacity-50">
                    <div style={{ color: col.color }}>{col.icon}</div>
                    <p className="text-xs mt-2 font-medium" style={{ color: col.color }}>Empty</p>
                  </div>
                ) : (
                  colTasks.map((task) => <KanbanCard key={task._id} task={task} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Shared layout primitives
   ───────────────────────────────────────────────────────────── */
const Section = ({ children }) => (
  <div className="rounded-2xl p-6"
    style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
    {children}
  </div>
);

const SectionTitle = ({ children, count }) => (
  <div className="flex items-center gap-2.5 mb-5">
    <h2 className="text-base font-semibold" style={{ color: C.heading }}>{children}</h2>
    {count !== undefined && (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: C.inputBg, color: C.muted }}>{count}</span>
    )}
  </div>
);

const StatCard = ({ title, value, icon }) => (
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

/* ─────────────────────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────────────────────── */
const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.user.user);
  const currentUserId = currentUser?.user?._id || currentUser?._id;
  const socketCommits = useSelector((s) => s.projectcommits.commits);
  useCommitsEvents(project?._id);

  const fetchProject = async () => {
    try { const res = await api.get(`/api/project/${id}`); setProject(res.data.project); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };
  const fetchInvites = async () => {
    try { const res = await api.get(`/api/invite/invites?projectId=${id}`); setInvites(res.data.invites || []); }
    catch (err) { console.error(err); }
  };
  const fetchTasks = async () => {
    try { const res = await api.get(`/api/task/project/${id}`); setTasks(res.data.tasks || []); }
    catch { /* silent */ }
  };

  useEffect(() => {
    dispatch(clearCommits());
    fetchProject(); fetchInvites(); fetchTasks();
    return () => dispatch(clearCommits());
  }, [id]);

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.pageBg }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: C.coral, borderTopColor: "transparent" }} />
        <p className="text-sm font-medium" style={{ color: C.muted }}>Loading project…</p>
      </div>
    </div>
  );

  if (!project) return (
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
  );

  const isCurrOwner = project.members?.some((m) => m.user?._id === currentUserId && m.role === "owner");
  const isOwner = project.repo_owner_user?._id === currentUserId
    || project.repo_owner_user?.toString() === currentUserId;
  const allCommits = [...socketCommits, ...[...(project.commits || [])].reverse()];

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: C.pageBg }}>
      {inviteOpen && (
        <InviteModal projectId={project._id} members={project.members} onClose={() => setInviteOpen(false)} />
      )}
      {assignOpen && (
        <AssignTaskModal
          projectId={project._id} members={project.members}
          onClose={() => setAssignOpen(false)}
          onAssigned={(task) => setTasks((prev) => [task, ...prev])}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-5">

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
              <div className="flex items-center justify-between mb-5">
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
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5"
                    style={{ backgroundColor: C.inputBg }}>
                    <svg className="w-5 h-5" style={{ color: C.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium" style={{ color: C.muted }}>No tasks yet</p>
                  <p className="text-xs mt-0.5" style={{ color: C.placeholder }}>Assign a task to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tasks.map((task) => {
                    const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
                    const col = KANBAN_COLUMNS.find((c) => c.key === task.status);
                    return (
                      <div key={task._id} className="p-3.5 rounded-xl transition-colors"
                        style={{ border: `1px solid ${C.borderSubtle}` }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: C.inputBg, color: C.placeholder }}>{task.key}</span>
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
        />

      </div>
    </div>
  );
};

export default ProjectDetails;