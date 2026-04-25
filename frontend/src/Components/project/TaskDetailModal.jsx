import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useC, makeInputBase, makeFocus, makeBlur } from "./theme";
import { KANBAN_COLUMNS, PRIORITY_CONFIG, PRIORITIES, COMPLETION_STATUSES } from "./kanbanConfig";
import { normalizeTaskDeadline, updateTaskRequest, getTaskEditErrorMessage } from "../../api/task";
import { putTask } from "../../store/slices/taskSlice";

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

  const [form, setForm] = useState({
    task_name: task.task_name || "",
    task_describe: task.task_describe || "",
    priority: task.priority || "medium",
    task_deadline: normalizeTaskDeadline(task.task_deadline),
    status: task.status || "todo",
  });
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
        onRequireCompletion?.({ task, nextStatus: form.status, nextValues: form, previousTask: task, source: "edit" });
        onClose();
        return;
      }

      const res = await updateTaskRequest(task._id, task, form);

      if (res.skipped) { onClose(); return; }

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

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Task name
            </label>
            <input required value={form.task_name} onChange={set("task_name")}
              className="w-full px-4 py-2.5 text-sm outline-none transition-all"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Description
            </label>
            <textarea rows={4} value={form.task_describe} onChange={set("task_describe")}
              className="w-full px-4 py-2.5 text-sm outline-none transition-all resize-none"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

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
              <input type="date" value={form.task_deadline} onChange={set("task_deadline")}
                className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: C.placeholder }}>
              Priority
            </label>
            <select value={form.priority} onChange={set("priority")}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur}>
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
            <select value={form.status} onChange={set("status")}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur}>
              {KANBAN_COLUMNS.map((status) => (
                <option key={status.key} value={status.key}>{status.label}</option>
              ))}
            </select>
          </div>

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
            <button type="button" onClick={onClose}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.inputBg, color: C.muted, border: `1px solid ${C.borderSubtle}` }}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.coral, color: "#fff", opacity: submitting ? 0.6 : 1 }}>
              {submitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailModal;
