import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import useCommitsEvents from "../hooks/useCommitsEvents";
import { useSelector, useDispatch } from "react-redux";
import { clearCommits } from "../store/slices/projectCommitsSlice";

/* ─────────── Invite Modal ─────────── */
const InviteModal = ({ projectId, members = [], onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(null);
  const [feedback, setFeedback] = useState({});
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await api.get(`/api/search/users/${encodeURIComponent(query)}`);
        setResults(res.data.users || []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
  }, [query]);

  const handleInvite = async (username) => {
    setSending(username);
    try {
      await api.post("/api/invite/send", {
        username,
        projectId,
        role: "member",
      });
      setFeedback((prev) => ({ ...prev, [username]: "sent" }));
    } catch (err) {
      const msg = err?.response?.data?.message || "Error";
      setFeedback((prev) => ({ ...prev, [username]: msg }));
    } finally {
      setSending(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Invite member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Search input */}
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by username..."
          className="w-full bg-[#0f172a] text-white placeholder-gray-500 border border-[#334155] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition"
        />

        {/* Results */}
        <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
          {searching && (
            <p className="text-gray-400 text-sm text-center py-4">Searching…</p>
          )}
          {!searching && query.length >= 2 && results.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No users found</p>
          )}
          {results.map((user) => {
            const isMember = members.some(
              (m) => m.user?.username === user.username
            );
            const isInvited = feedback[user.username] === "sent" || isMember;
            const hasError = feedback[user.username] && !isInvited;

            return (
              <div
                key={user._id}
                className="flex items-center gap-3 bg-[#0f172a] rounded-xl px-3 py-2"
              >
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-9 h-9 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.username}</p>
                  {user.email && (
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  )}
                </div>
                {isInvited ? (
                  <button
                    disabled
                    className="shrink-0 text-xs bg-gray-700/50 text-gray-500 px-3 py-1.5 rounded-lg cursor-not-allowed opacity-60"
                  >
                    {isMember && feedback[user.username] !== "sent" ? "Member" : "Invited"}
                  </button>
                ) : hasError ? (
                  <span className="text-xs text-red-400 font-medium shrink-0 max-w-[100px] text-right">
                    {feedback[user.username]}
                  </span>
                ) : (
                  <button
                    onClick={() => handleInvite(user.username)}
                    disabled={sending === user.username}
                    className="shrink-0 text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition"
                  >
                    {sending === user.username ? "…" : "Invite"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─────────── Assign Task Modal ─────────── */
const PRIORITIES = ["low", "medium", "high"];

const AssignTaskModal = ({ projectId, members = [], onClose, onAssigned }) => {
  const [form, setForm] = useState({
    task_name: "",
    task_describe: "",
    task_deadline: "",
    assigned_user: "",
    priority: "medium",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.assigned_user) {
      setError("Please select a member to assign");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post("/api/task/assign", {
        ...form,
        project_id: projectId,
      });
      onAssigned(res.data.task);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Error assigning task");
    } finally {
      setSubmitting(false);
    }
  };

  const nonOwnerMembers = members.filter((m) => m.role !== "owner");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Assign Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Task name *</label>
            <input
              required
              value={form.task_name}
              onChange={set("task_name")}
              placeholder="Fix login bug"
              className="w-full bg-[#0f172a] text-white placeholder-gray-500 border border-[#334155] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Description *</label>
            <textarea
              required
              rows={3}
              value={form.task_describe}
              onChange={set("task_describe")}
              placeholder="Describe what needs to be done…"
              className="w-full bg-[#0f172a] text-white placeholder-gray-500 border border-[#334155] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Deadline *</label>
              <input
                required
                type="datetime-local"
                value={form.task_deadline}
                onChange={set("task_deadline")}
                className="w-full bg-[#0f172a] text-white border border-[#334155] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Priority</label>
              <select
                value={form.priority}
                onChange={set("priority")}
                className="w-full bg-[#0f172a] text-white border border-[#334155] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Assign to *</label>
            <select
              value={form.assigned_user}
              onChange={set("assigned_user")}
              className="w-full bg-[#0f172a] text-white border border-[#334155] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="">— Select member —</option>
              {nonOwnerMembers.map((m) => (
                <option key={m._id} value={m.user?._id}>
                  {m.user?.username}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition text-sm"
          >
            {submitting ? "Assigning…" : "Assign Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

const PRIORITY_STYLES = {
  high: "bg-red-500/15 text-red-400",
  medium: "bg-yellow-500/15 text-yellow-400",
  low: "bg-green-500/15 text-green-400",
};

const STATUS_STYLES = {
  todo: "bg-gray-500/15 text-gray-400",
  in_progress: "bg-blue-500/15 text-blue-400",
  done: "bg-green-500/15 text-green-400",
  verified: "bg-indigo-500/15 text-indigo-400",
  overdue: "bg-red-500/15 text-red-400",
};

/* ─────────── Main Page ─────────── */
const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?.user?._id || currentUser?._id;
  const socketCommits = useSelector((state) => state.projectcommits.commits);
  useCommitsEvents(project?._id);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/api/project/${id}`);
      setProject(res.data.project);
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvites = async () => {
    try {
      const res = await api.get(`/api/invite/invites?projectId=${id}`);
      setInvites(res.data.invites || []);
    } catch (err) {
      console.error("fetchInvites error:", err?.response?.data || err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/api/task/project/${id}`);
      setTasks(res.data.tasks || []);
    } catch {
      // endpoint may not exist yet — silently ignore
    }
  };

  useEffect(() => {
    dispatch(clearCommits());
    fetchProject();
    fetchInvites();
    fetchTasks();
    return () => dispatch(clearCommits());
  }, [id]);

  const handleRoleChange = async (memberId, role) => {
    try {
      await api.patch(`/api/project/${id}/members/${memberId}/role`, { role });
      setProject((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m._id === memberId ? { ...m, role } : m
        ),
      }));
    } catch (err) {
      console.error(err?.response?.data?.message || err);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await api.delete(`/api/project/${id}/members/${memberId}`);
      setProject((prev) => ({
        ...prev,
        members: prev.members.filter((m) => m._id !== memberId),
      }));
    } catch (err) {
      console.error(err?.response?.data?.message || err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-red-400">
        Project not found
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      {inviteOpen && (
        <InviteModal projectId={project._id} members={project.members} onClose={() => setInviteOpen(false)} />
      )}
      {assignOpen && (
        <AssignTaskModal
          projectId={project._id}
          members={project.members}
          onClose={() => setAssignOpen(false)}
          onAssigned={(task) => setTasks((prev) => [task, ...prev])}
        />
      )}

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow flex items-center gap-4">
          <img
            src={project.repo_owner_user?.avatar_url}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-indigo-500"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{project.repo_name}</h1>
            <p className="text-gray-400 text-sm">{project.repo_full_name}</p>
          </div>
          <div className="flex items-center gap-2">
            {(() => {
              const isCurrOwner = project.members?.some(
                (m) => m.user?._id === currentUserId && m.role === "owner"
              );
              return isCurrOwner ? (
                <button
                  onClick={() => setAssignOpen(true)}
                  className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] transition text-white text-sm font-semibold px-4 py-2 rounded-xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  Assign Task
                </button>
              ) : null;
            })()}
            <button
              onClick={() => setInviteOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition text-white text-sm font-semibold px-4 py-2 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Invite
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Branch" value={project.default_branch} />
          <Card title="Commits" value={project.commits?.length} />
          <Card title="Visibility" value={project.visibility} />
        </div>

        {/* Owner */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow">
          <h2 className="text-xl mb-4 font-semibold">Owner</h2>
          <div className="flex items-center gap-4">
            <img
              src={project.repo_owner_user?.avatar_url}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{project.repo_owner_user?.username}</p>
              <p className="text-gray-400 text-sm">{project.repo_owner_user?.email}</p>
            </div>
          </div>
        </div>

        {/* Commits */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow">
          {(() => {
            const allCommits = [
              ...socketCommits,
              ...[...(project.commits || [])].reverse(),
            ];
            return (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Commits ({allCommits.length})
                </h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {allCommits.map((commit, index) => (
                    <div
                      key={commit._id || index}
                      className={`p-4 rounded-xl transition ${
                        index < socketCommits.length
                          ? "bg-indigo-900/30 border border-indigo-500/30 hover:bg-indigo-900/50"
                          : "bg-[#0f172a] hover:bg-[#1e293b]"
                      }`}
                    >
                      {index < socketCommits.length && (
                        <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-1 block">
                          New
                        </span>
                      )}
                      <p className="text-sm font-medium">
                        {commit.commit_message || "No message"}
                      </p>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{new Date(commit.createdAt).toLocaleString()}</span>
                        <span className="text-indigo-400">#{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* Members */}
        {(() => {
          const isOwner = project.repo_owner_user?._id === currentUserId ||
                          project.repo_owner_user?.toString() === currentUserId;
          return (
            <div className="bg-[#1e293b] rounded-2xl p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Members ({project.members?.length})
              </h2>
              <div className="space-y-2">
                {project.members?.map((member) => {
                  const isSelf = member.user?._id === currentUserId;
                  return (
                    <div
                      key={member._id}
                      className="flex items-center gap-3 bg-[#0f172a] px-4 py-3 rounded-xl"
                    >
                      <img
                        src={member.user?.avatar_url}
                        alt="avatar"
                        className="w-10 h-10 rounded-full shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {member.user?.username || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>

                      {isOwner && !isSelf ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={member.role}
                            onChange={(e) => handleRoleChange(member._id, e.target.value)}
                            className="text-xs bg-[#1e293b] border border-[#334155] text-gray-300 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-indigo-500 transition"
                          >
                            <option value="member">member</option>
                            <option value="owner">owner</option>
                          </select>
                          <button
                            onClick={() => handleRemoveMember(member._id)}
                            className="text-xs bg-red-500/10 hover:bg-red-500/25 text-red-400 px-2.5 py-1 rounded-lg transition"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                            member.role === "owner"
                              ? "bg-indigo-500/20 text-indigo-400"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {member.role}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Invites */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Invites ({invites.length})
            </h2>
            {invites.length === 0 ? (
              <p className="text-gray-500 text-sm">No invites yet</p>
            ) : (
            <div className="space-y-2">
              {invites.map((invite) => (
                <div
                  key={invite._id}
                  className="flex items-center gap-3 bg-[#0f172a] px-4 py-3 rounded-xl"
                >
                  <img
                    src={invite.invitedUser?.avatar_url}
                    alt={invite.invitedUser?.username}
                    className="w-9 h-9 rounded-full shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {invite.invitedUser?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-400">
                      invited by {invite.inviteBy?.username} · {new Date(invite.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                      invite.status === "accepted"
                        ? "bg-green-500/15 text-green-400"
                        : invite.status === "rejected"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-yellow-500/15 text-yellow-400"
                    }`}
                  >
                    {invite.status}
                  </span>
                </div>
              ))}
            </div>
            )}
        </div>

        {/* Tasks */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tasks ({tasks.length})</h2>
            {(() => {
              const isCurrOwner = project.members?.some(
                (m) => m.user?._id === currentUserId && m.role === "owner"
              );
              return isCurrOwner ? (
                <button
                  onClick={() => setAssignOpen(true)}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition"
                >
                  + Assign Task
                </button>
              ) : null;
            })()}
          </div>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks yet</p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-[#0f172a] px-4 py-3 rounded-xl flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-gray-500">{task.key}</span>
                      <p className="text-sm font-medium text-white truncate">{task.task_name}</p>
                    </div>
                    {task.task_describe && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{task.task_describe}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(task.task_deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[task.priority] || ""}`}>
                      {task.priority}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[task.status] || ""}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-[#1e293b] p-4 rounded-2xl shadow">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-lg font-semibold">{value || "N/A"}</p>
  </div>
);

export default ProjectDetails;
