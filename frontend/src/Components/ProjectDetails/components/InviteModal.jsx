import React, { useEffect, useRef, useState } from "react";
import api from "../api/api";
import { getInputBase, handleFocus, handleBlur } from "../theme";

const InviteModal = ({ projectId, members = [], onClose, C }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(null);
  const [feedback, setFeedback] = useState({});
  const debounceRef = useRef(null);

  const inputBase = getInputBase(C);
  const onBlur = handleBlur(C);

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
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold" style={{ color: C.heading }}>Invite member</h2>
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

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: C.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={onBlur}
            />
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
                <div
                  key={user._id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                  style={{ border: `1px solid ${C.borderSubtle}` }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.inputBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
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
                    <button
                      onClick={() => handleInvite(user.username)}
                      disabled={sending === user.username}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                      style={{ backgroundColor: C.coral, color: "#fff", opacity: sending === user.username ? 0.5 : 1 }}
                      onMouseEnter={(e) => { if (sending !== user.username) e.currentTarget.style.backgroundColor = C.coralHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.coral; }}
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
    </div>
  );
};

export default InviteModal;
