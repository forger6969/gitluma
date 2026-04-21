import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reposFetch } from "../store/slices/repoSlices";
import api from "../api/api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CreateNewproject = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { repos = [], loading, error } = useSelector(
    (state) => state.repos || {}
  );

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [openRepoModal, setOpenRepoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ 
  useEffect(() => {
    dispatch(reposFetch());
  }, [dispatch]);

  const openModal = () => {
    setOpenRepoModal(true);
    setTimeout(() => setShowModal(true), 0);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setOpenRepoModal(false), 150);
    setSearch("");
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setFormError("");
    setFormSuccess("");

    // ❗ 
    if (!selectedRepo) {
      setFormError(t("selectAlert") || "Repo tanlanmagan");
      return;
    }

    try {
      setSubmitting(true);

      // 🔥 
      const payload = {
        fullname: selectedRepo,
        name: projectName,
        description: description,
      };

      console.log("SEND PAYLOAD:", payload);

      const res = await api.post("/api/project/create", payload);

      const projectId = res?.data?.id || res?.data?._id;

      if (!projectId) {
        setFormError("Project ID backenddan qaytmadi");
        return;
      }

      setFormSuccess(t("projectCreated") || "Created!");

      // reset
      setProjectName("");
      setDescription("");
      setSelectedRepo("");

      // 🚀 
      navigate(`/dashboard/project/${projectId}`);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unknown error";

      console.error("CREATE ERROR:", err);
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRepos = (repos || []).filter((repo) =>
    repo?.full_name?.toLowerCase?.().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-[#1A1F2E] flex justify-center py-14 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">

        {/* ERROR */}
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex justify-between items-center shadow-sm">
            <span>{formError}</span>
            <button
              type="button"
              onClick={() => setFormError("")}
              className="ml-3 opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* SUCCESS */}
        {formSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex justify-between items-center shadow-sm">
            <span>{formSuccess}</span>
            <button
              type="button"
              onClick={() => setFormSuccess("")}
              className="ml-3 opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
            >
              ✕
            </button>
          </div>
        )}

       
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1F2E]">
              {t("workspace")}
            </h1>
            <p className="text-[#8A93A8] text-xs mt-1">{t("setup")}</p>
          </div>

          {/* <div className="flex gap-2">
            {["uz", "ru", "en"].map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => i18n.changeLanguage(lng)}
                className="px-3 py-1.5 text-xs rounded-lg bg-[#1A1F2E] text-white font-medium hover:bg-[#2B3141] transition-colors"
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div> */}
        </div>

        
        <div className="grid md:grid-cols-2 gap-4">

          {/* LEFT */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4E8F0] shadow-sm hover:shadow-md hover:border-[#C8D0E0] transition-all space-y-4">
            <p className="text-[10px] font-bold text-[#8A93A8] uppercase tracking-widest">
              Project Info
            </p>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#6B7280]">
                {t("projectName")}
              </label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#1A1F2E] placeholder-[#B0B8C8] outline-none focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white transition-all"
                placeholder={t("projectName")}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#6B7280]">
                {t("description")}
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#1A1F2E] placeholder-[#B0B8C8] outline-none focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white transition-all resize-none"
                placeholder={t("description")}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4E8F0] shadow-sm hover:shadow-md hover:border-[#C8D0E0] transition-all space-y-4">
            <p className="text-[10px] font-bold text-[#8A93A8] uppercase tracking-widest">
              Repository
            </p>

            {selectedRepo && (
              <div className="flex justify-between items-center bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-3.5 py-2.5 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="13" height="13" fill="none" stroke="#3B7DD8" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span className="truncate text-[#3B7DD8] font-mono text-xs font-medium">
                    {selectedRepo}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRepo("")}
                  className="text-[#8A93A8] hover:text-red-400 transition-colors flex-shrink-0 text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={openModal}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F8F9FC] border border-[#E4E8F0] text-[#8A93A8] cursor-pointer hover:border-[#E8654A]/40 hover:bg-[#FFF2EF] hover:text-[#E8654A] transition-all flex items-center gap-2 font-medium"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              {selectedRepo ? t("changeRepo") || "Change repo" : t("selectRepo") || "Select repo"}
            </button>

            <div className="bg-[#F8F9FC] rounded-xl p-3.5 border border-[#E4E8F0]">
              <p className="text-[11px] text-[#8A93A8] leading-relaxed">
                🔗 Connect a GitHub repository to link commits and pull requests directly to your project tasks.
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-1">
          <button
            type="button"
            onClick={() => {
              setProjectName("");
              setDescription("");
              setSelectedRepo("");
              setFormError("");
              setFormSuccess("");
            }}
            className="text-sm text-[#8A93A8] hover:text-[#1A1F2E] transition-colors flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            {t("reset") || "Reset"}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-7 py-2.5 text-sm rounded-xl bg-[#E8654A] text-white font-semibold shadow-[0_4px_14px_rgba(232,101,74,0.35)] hover:shadow-[0_6px_20px_rgba(232,101,74,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {t("creating") || "Creating..."}
              </>
            ) : (
              <>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {t("create") || "Create"}
              </>
            )}
          </button>
        </div>
      </form>

      {/* MODAL */}
      {openRepoModal && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-150 backdrop-blur-sm ${
            showModal ? "bg-black/25" : "bg-black/0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[460px] max-h-[560px] bg-white rounded-2xl border border-[#E4E8F0] shadow-2xl transition-all duration-150 flex flex-col overflow-hidden ${
              showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#E4E8F0]">
              <div className="flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#E8654A" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <h2 className="font-semibold text-[#1A1F2E] text-sm">
                  {t("selectRepository") || "Select Repository"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#8A93A8] hover:text-[#1A1F2E] hover:bg-[#F4F6FB] transition-all text-base"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-[#E4E8F0]">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A93A8]" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#1A1F2E] placeholder-[#B0B8C8] outline-none focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white transition-all"
                  placeholder={t("search") || "Search repos..."}
                />
              </div>
            </div>

            {/* Repo List */}
            <div className="overflow-y-auto flex-1 p-3 space-y-1.5">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepo(repo.full_name);
                    closeModal();
                  }}
                  className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#FFF2EF] hover:border-[#E8654A]/20 border border-transparent transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F4F6FB] border border-[#E4E8F0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFE8E2] group-hover:border-[#E8654A]/20 transition-all">
                    <svg width="13" height="13" fill="none" stroke="#8A93A8" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:stroke-[#E8654A] transition-colors">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono font-semibold text-[#3B7DD8] group-hover:text-[#E8654A] transition-colors truncate">
                      {repo.full_name}
                    </p>
                    <p className="text-xs text-[#8A93A8] mt-0.5 truncate">
                      {repo.description || t("noDescription") || "No description"}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center justify-center gap-2 py-8 text-[#8A93A8]">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span className="text-sm">Loading repos...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center gap-2 py-8 text-red-400">
                  <span className="text-sm">Error loading repos</span>
                </div>
              )}

              {!loading && !error && filteredRepos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-[#8A93A8]">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-2 opacity-40">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <span className="text-sm">No repos found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewproject;



