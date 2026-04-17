import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import useCommitsEvents from "../hooks/useCommitsEvents";
import { useSelector, useDispatch } from "react-redux";
import { clearCommits } from "../store/slices/projectCommitsSlice";

/* ─────────── Invite Modal ─────────── */
const InviteModal = ({ projectId, onClose }) => {
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
          {results.map((user) => (
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
              {feedback[user.username] === "sent" ? (
                <span className="text-xs text-green-400 font-medium shrink-0">Invited!</span>
              ) : feedback[user.username] ? (
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
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────── Main Page ─────────── */
const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(clearCommits());
    fetchProject();
    return () => dispatch(clearCommits());
  }, [id]);

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
        <InviteModal projectId={project._id} onClose={() => setInviteOpen(false)} />
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
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">
            Members ({project.members?.length})
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.members?.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#0f172a] p-3 rounded-xl hover:bg-[#334155] transition"
              >
                <img
                  src={member.user?.avatar_url}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {member.user?.username || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    member.role === "owner"
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {member.role}
                </span>
              </div>
            ))}
          </div>
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
