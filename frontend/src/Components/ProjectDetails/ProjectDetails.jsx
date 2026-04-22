import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import {
  getCompletionDefaultOwnerId,
  updateTaskRequest,
  updateTaskStatusRequest,
} from "../api/task";
import useCommitsEvents from "../hooks/useCommitsEvents";
import useTaskEvents from "../hooks/useTaskEvents";
import { clearCommits } from "../store/slices/projectCommitsSlice";
import { getTasks, addTask, putTask } from "../store/slices/taskSlice";

import { getColors, KANBAN_COLUMNS_CONFIG, PRIORITY_CONFIG, COMPLETION_STATUSES, STATUS_FILTERS } from "./theme";
import { Section, SectionTitle, StatCard } from "./components/Layout";
import RoleDropdown from "./components/RoleDropdown";
import { ToastContainer } from "./components/Toast";
import InviteModal from "./components/InviteModal";
import AssignTaskModal from "./components/AssignTaskModal";
import TaskCompletionModal from "./components/TaskCompletionModal";
import TaskDetailModal from "./components/TaskDetailModal";
import KanbanBoard from "./components/KanbanBoard";

const ProjectDetails = () => {
  const { id } = useParams();

  // ── Theme ──────────────────────────────────────────────────────────────────
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  const C = getColors(isDark);

  // ── Redux ──────────────────────────────────────────────────────────────────
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.user.user);
  const currentUserId = currentUser?.user?._id || currentUser?._id;
  const socketCommits = useSelector((s) => s.projectcommits.commits);
  const tasks = useSelector((state) => state.tasks.tasks);

  // ── Local state ────────────────────────────────────────────────────────────
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

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addToast = (type, title, body) =>
    setToasts((prev) => [...prev, { id: ++toastIdRef.current, type, title, body }]);
  const dismissToast = (toastId) =>
    setToasts((prev) => prev.filter((t) => t.id !== toastId));

  // ── Socket events ──────────────────────────────────────────────────────────
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

  // ── Data fetching ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/project/${id}`);
        setProject(res.data.project);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    const fetchInvites = async () => {
      try {
        const res = await api.get(`/api/invite/invites?projectId=${id}`);
        setInvites(res.data.invites || []);
      } catch (err) { console.error(err); }
    };

    dispatch(clearCommits());
    fetchProject();
    fetchInvites();
    dispatch(getTasks(id));
    return () => dispatch(clearCommits());
  }, [dispatch, id]);

  // ── Member actions ─────────────────────────────────────────────────────────
  const handleRoleChange = async (memberId, role) => {
    try {
      await api.patch(`/api/project/${id}/members/${memberId}/role`, { role });
      setProject((p) => ({
        ...p,
        members: p.members.map((m) => m._id === memberId ? { ...m, role } : m),
      }));
    } catch (err) { console.error(err); }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await api.delete(`/api/project/${id}/members/${memberId}`);
      setProject((p) => ({
        ...p,
        members: p.members.filter((m) => m._id !== memberId),
      }));
    } catch (err) { console.error(err); }
  };

  // ── Task completion ────────────────────────────────────────────────────────
  const submitCompletionModal = async (payload) => {
    const { task, nextStatus, nextValues, previousTask = task, completedBy, commitId } = payload;

    const optimisticTask = {
      ...task,
      ...nextValues,
      status: nextStatus,
      completedAt_user: completedBy
        ? {
            user: project?.members?.find((m) => m.user?._id === completedBy)?.user || task.completedAt_user?.user || null,
            github_username: null,
          }
        : task.completedAt_user,
    };

    dispatch(putTask(optimisticTask));
    if (selectedTask?._id === optimisticTask._id) setSelectedTask(optimisticTask);

    try {
      const res = await updateTaskRequest(task._id, task, nextValues || { status: nextStatus }, {
        status: nextStatus,
        completed_by: completedBy || getCompletionDefaultOwnerId(project),
        ...(commitId ? { commit_id: commitId } : { commit_id: "" }),
      });

      if (res?.success && res.task) {
        dispatch(putTask(res.task));
        if (selectedTask?._id === res.task._id) setSelectedTask(res.task);
        setCompletionModal(null);
      }
    } catch (err) {
      dispatch(putTask(previousTask));
      if (selectedTask?._id === previousTask._id) setSelectedTask(previousTask);

      if (err?.response?.status === 403) {
        setDragError("Sizda ruxsat yo'q");
        addToast("task", "Permission denied", "Sizda ruxsat yo'q");
      }
      throw new Error(err?.response?.data?.message || "Task completion saqlanmadi");
    }
  };

  // ── Kanban drag ────────────────────────────────────────────────────────────
  const handleTaskMove = async (task, nextStatus) => {
    const previousTask = { ...task };
    setDragError("");

    if (COMPLETION_STATUSES.includes(nextStatus) && nextStatus !== task.status) {
      setCompletionModal({ task, nextStatus, nextValues: { ...task, status: nextStatus }, previousTask, source: "drag" });
      return;
    }

    dispatch(putTask({ ...task, status: nextStatus }));

    try {
      const res = await updateTaskStatusRequest(task._id, nextStatus);
      if (res?.success && res.task) {
        dispatch(putTask(res.task));
        if (selectedTask?._id === res.task._id) setSelectedTask(res.task);
      }
    } catch (err) {
      dispatch(putTask(previousTask));
      if (selectedTask?._id === previousTask._id) setSelectedTask(previousTask);
      if (err?.response?.status === 403) {
        setDragError("Sizda ruxsat yo'q");
        addToast("task", "Permission denied", "Sizda ruxsat yo'q");
        return;
      }
      setDragError(err?.response?.data?.message || "Taskni ko'chirishda xatolik yuz berdi");
    }
  };

  // ── Loading / not found ────────────────────────────────────────────────────
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

  // ── Derived values ─────────────────────────────────────────────────────────
  const isCurrOwner = project.members?.some((m) => m.user?._id === currentUserId && m.role === "owner");
  const isOwner = project.repo_owner_user?._id === currentUserId
    || project.repo_owner_user?.toString() === currentUserId;
  const allCommits = [...socketCommits, ...[...(project.commits || [])].reverse()];
  const filteredTasks = taskFilter === "all" ? tasks : tasks.filter((t) => t.status === taskFilter);
  const KANBAN_COLUMNS = KANBAN_COLUMNS_CONFIG(C);
  const priConfig = PRIORITY_CONFIG(C);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: C.pageBg }}>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} C={C} />

      {/* Modals */}
      {inviteOpen && (
        <InviteModal projectId={project._id} members={project.members} onClose={() => setInviteOpen(false)} C={C} />
      )}
      {assignOpen && (
        <AssignTaskModal
          projectId={project._id} members={project.members}
          onClose={() => setAssignOpen(false)}
          onAssigned={(task) => dispatch(addTask(task))}
          C={C}
        />
      )}
      {completionModal && (
        <TaskCompletionModal
          project={project}
          modalState={completionModal}
          onClose={() => setCompletionModal(null)}
          onSubmit={submitCompletionModal}
          C={C}
        />
      )}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdated={(updatedTask) => setSelectedTask(updatedTask)}
          onRequireCompletion={setCompletionModal}
          C={C}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-5">

        {/* Drag error banner */}
        {dragError && (
          <div className="px-4 py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: C.dangerBg, color: C.danger, border: "1px solid rgba(224,61,61,0.18)" }}>
            {dragError}
          </div>
        )}

        {/* ── Hero Header ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: isDark ? "#0D1117" : "#2B3141",
            border: isDark ? `1px solid ${C.borderDef}` : "none",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${C.coral} 0%, #F5A87A 100%)` }} />
          <div className="flex items-center gap-5 px-6 py-5">
            <div className="relative shrink-0">
              <img src={project.repo_owner_user?.avatar_url} alt="avatar"
                className="w-14 h-14 rounded-xl object-cover"
                style={{ border: "2px solid rgba(232,101,74,0.4)" }} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                style={{ backgroundColor: C.success, borderColor: isDark ? "#0D1117" : "#2B3141" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold truncate" style={{ color: isDark ? C.heading : "#fff" }}>
                {project.repo_name}
              </h1>
              <p className="text-sm mt-0.5 truncate" style={{ color: isDark ? C.muted : C.placeholder }}>
                {project.repo_full_name}
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              {isCurrOwner && (
                <button
                  onClick={() => setAssignOpen(true)}
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  style={{
                    backgroundColor: isDark ? C.inputBg : "rgba(255,255,255,0.08)",
                    color: isDark ? C.body : "#fff",
                    border: `1px solid ${isDark ? C.borderDef : "rgba(255,255,255,0.12)"}`,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? C.borderDef : "rgba(255,255,255,0.14)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDark ? C.inputBg : "rgba(255,255,255,0.08)"}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Assign Task
                </button>
              )}
              <button
                onClick={() => setInviteOpen(true)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                style={{ backgroundColor: C.coral, color: "#fff" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.coralHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.coral}
              >
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
          <StatCard title="Branch" value={project.default_branch} C={C}
            icon={<svg className="w-5 h-5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>}
          />
          <StatCard title="Commits" value={allCommits.length} C={C}
            icon={<svg className="w-5 h-5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" /></svg>}
          />
          <StatCard title="Visibility" value={project.visibility} C={C}
            icon={<svg className="w-5 h-5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
          />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid md:grid-cols-5 gap-5">

          {/* Left column */}
          <div className="md:col-span-2 space-y-5">

            {/* Owner */}
            <Section C={C}>
              <SectionTitle C={C}>Owner</SectionTitle>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: C.inputBg }}>
                <img src={project.repo_owner_user?.avatar_url} alt="" className="w-11 h-11 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: C.heading }}>
                    {project.repo_owner_user?.username}
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: C.placeholder }}>
                    {project.repo_owner_user?.email}
                  </p>
                </div>
                <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg shrink-0"
                  style={{ backgroundColor: C.coralSubtle, color: C.coral }}>Owner</span>
              </div>
            </Section>

            {/* Members */}
            <Section C={C}>
              <SectionTitle count={project.members?.length} C={C}>Members</SectionTitle>
              <div className="space-y-2">
                {project.members?.map((member) => {
                  const isSelf = member.user?._id === currentUserId;
                  return (
                    <div key={member._id}
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                      style={{ border: `1px solid ${C.borderSubtle}` }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <img src={member.user?.avatar_url} alt="avatar" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: C.heading }}>
                          {member.user?.username || "Unknown"}
                        </p>
                      </div>
                      {isOwner && !isSelf ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <RoleDropdown value={member.role} onChange={(role) => handleRoleChange(member._id, role)} C={C} />
                          <button
                            onClick={() => handleRemoveMember(member._id)}
                            className="text-xs px-2 py-1.5 rounded-lg font-semibold transition-colors"
                            style={{ backgroundColor: C.dangerBg, color: C.danger }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(224,61,61,0.18)"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.dangerBg}
                          >
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
            <Section C={C}>
              <SectionTitle count={invites.length} C={C}>Invites</SectionTitle>
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

          {/* Right column */}
          <div className="md:col-span-3 space-y-5">

            {/* Commits */}
            <Section C={C}>
              <SectionTitle count={allCommits.length} C={C}>Commits</SectionTitle>
              <div className="space-y-2 max-h-80 overflow-y-auto -mr-1 pr-1">
                {allCommits.length === 0 ? (
                  <p className="text-sm text-center py-6" style={{ color: C.placeholder }}>No commits yet</p>
                ) : allCommits.map((commit, index) => {
                  const isNew = index < socketCommits.length;
                  return (
                    <div key={commit._id || index} className="p-3.5 rounded-xl transition-colors"
                      style={isNew
                        ? { backgroundColor: "rgba(232,101,74,0.08)", border: "1px solid rgba(232,101,74,0.2)" }
                        : { backgroundColor: C.inputBg, border: `1px solid ${C.borderSubtle}` }}>
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
            <Section C={C}>
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
                  {taskFilter === "all" && (
                    <p className="text-xs mt-0.5" style={{ color: C.placeholder }}>Assign a task to get started</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((task) => {
                    const pri = priConfig[task.priority] || priConfig.medium;
                    const col = KANBAN_COLUMNS.find((c) => c.key === task.status);
                    const completedBy = task.completedAt_user?.user?.username || task.completedAt_user?.github_username;
                    return (
                      <div key={task._id}
                        className="p-3.5 rounded-xl transition-colors"
                        style={{ border: `1px solid ${C.borderSubtle}`, cursor: "pointer" }}
                        onClick={() => setSelectedTask(task)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
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
                                  <p className="text-xs" style={{ color: C.muted }}>Completed by {completedBy}</p>
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

        {/* ── Kanban Board ── */}
        <KanbanBoard
          tasks={tasks}
          onAssign={() => setAssignOpen(true)}
          isCurrOwner={isCurrOwner}
          onTaskClick={setSelectedTask}
          onTaskMove={handleTaskMove}
          C={C}
        />

      </div>
    </div>
  );
};

export default ProjectDetails;