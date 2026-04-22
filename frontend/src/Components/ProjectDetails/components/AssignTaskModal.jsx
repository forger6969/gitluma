import React, { useState } from "react";
import api from "../api/api";
import { getInputBase, handleFocus, handleBlur, PRIORITIES } from "../theme";

const AssignTaskModal = ({ projectId, members = [], onClose, onAssigned, C }) => {
  const [form, setForm] = useState({
    task_name: "", task_describe: "", task_deadline: "", assigned_user: "", priority: "medium",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const nonOwnerMembers = members.filter((m) => m.role !== "owner");
  const inputBase = getInputBase(C);
  const onBlur = handleBlur(C);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.assigned_user) { setError("Please select a member to assign"); return; }
    setSubmitting(true);
    try {
      const res = await api.post("/api/task/assign", { ...form, project_id: projectId });
      onAssigned(res.data.task);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Error assigning task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderDef}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: C.borderSubtle, backgroundColor: C.inputBg }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.coralBg }}>
              <svg className="w-3.5 h-3.5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold" style={{ color: C.heading }}>Assign Task</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: C.muted }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
              Task name <span style={{ color: C.coral }}>*</span>
            </label>
            <input
              required value={form.task_name} onChange={set("task_name")} placeholder="Fix login bug"
              className="w-full px-4 py-2.5 text-sm outline-none transition-all"
              style={inputBase} onFocus={handleFocus} onBlur={onBlur}
            />
          </div>

          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
              Description <span style={{ color: C.coral }}>*</span>
            </label>
            <textarea
              required rows={3} value={form.task_describe} onChange={set("task_describe")}
              placeholder="Describe what needs to be done…"
              className="w-full px-4 py-2.5 text-sm outline-none transition-all resize-none"
              style={inputBase} onFocus={handleFocus} onBlur={onBlur}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
                Deadline <span style={{ color: C.coral }}>*</span>
              </label>
              <input
                required type="datetime-local" value={form.task_deadline} onChange={set("task_deadline")}
                className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                style={{ ...inputBase, colorScheme: "dark" }} onFocus={handleFocus} onBlur={onBlur}
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>Priority</label>
              <select
                value={form.priority} onChange={set("priority")}
                className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
                style={inputBase} onFocus={handleFocus} onBlur={onBlur}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} style={{ backgroundColor: C.inputBg, color: C.heading }}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>
              Assign to <span style={{ color: C.coral }}>*</span>
            </label>
            <select
              value={form.assigned_user} onChange={set("assigned_user")}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase} onFocus={handleFocus} onBlur={onBlur}
            >
              <option value="" style={{ backgroundColor: C.inputBg, color: C.heading }}>— Select member —</option>
              {nonOwnerMembers.map((m) => (
                <option key={m._id} value={m.user?._id} style={{ backgroundColor: C.inputBg, color: C.heading }}>
                  {m.user?.username}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
              style={{ backgroundColor: C.dangerBg, color: C.danger, border: "1px solid rgba(224,61,61,0.2)" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={submitting}
            className="w-full font-semibold py-2.5 rounded-xl transition-all text-sm"
            style={{ backgroundColor: C.coral, color: "#fff", opacity: submitting ? 0.5 : 1 }}
            onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = C.coralHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.coral; }}
          >
            {submitting ? "Assigning…" : "Assign Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskModal;
