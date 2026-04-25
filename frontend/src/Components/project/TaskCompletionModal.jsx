import React, { useState, useEffect } from "react";
import { useC, makeInputBase, makeFocus, makeBlur } from "./theme";
import { getCompletionDefaultOwnerId, getProjectTaskCommits } from "../../api/task";

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

    return () => { ignore = true; };
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
            <select value={completedBy} onChange={(e) => setCompletedBy(e.target.value)}
              className="w-full px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
              style={inputBase} onFocus={handleFocus} onBlur={handleBlur}>
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
                <p className="text-sm" style={{ color: C.muted }}>Commit tanlashingiz yoki o'tkazib yuborishingiz mumkin.</p>
              </div>
              <button type="button" onClick={() => handleSubmit(true)} disabled={submitting}
                className="text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                style={{ backgroundColor: C.cardBg, color: C.muted, border: `1px solid ${C.borderSubtle}`, opacity: submitting ? 0.6 : 1 }}>
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
                        <button key={commit._id} type="button" onClick={() => setSelectedCommitId(commit._id)}
                          className="w-full text-left rounded-xl p-3 transition-all"
                          style={{ backgroundColor: active ? C.coralBg : C.cardBg, border: `1px solid ${active ? "rgba(232,101,74,0.35)" : C.borderSubtle}` }}>
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
            <button type="button" onClick={onClose}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.inputBg, color: C.muted, border: `1px solid ${C.borderSubtle}` }}>
              Cancel
            </button>
            <button type="button" onClick={() => handleSubmit(false)} disabled={submitting || loading}
              className="flex-1 font-semibold py-2.5 rounded-xl transition-all text-sm"
              style={{ backgroundColor: C.coral, color: "#fff", opacity: submitting || loading ? 0.6 : 1 }}>
              {submitting ? "Saving..." : "Save completion"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionModal;
