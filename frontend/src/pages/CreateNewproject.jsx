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

  // ✅ FIXED PART (IMPORTANT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setFormError("");
    setFormSuccess("");

    if (!selectedRepo) {
      setFormError(t("selectAlert"));
      return;
    }

    try {
      setSubmitting(true);

      const res = await api.post("/api/project/create", {
        fullname: selectedRepo,
      });

      // 🔥 FIX: support both id and _id
      const projectId = res?.data?.id || res?.data?._id;

      setProjectName("");
      setDescription("");
      setSelectedRepo("");



      setFormSuccess(t("projectCreated"));

      if (projectId) {
        // 🚀 instant redirect (no delay)
        navigate(`/dashboard/project/${projectId}`);
      } else {
        setFormError("Project ID not returned from backend");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Unknown error";
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
              className="opacity-50 hover:opacity-100 transition-opacity ml-3 flex-shrink-0"
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
              className="opacity-50 hover:opacity-100 transition-opacity ml-3 flex-shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1F2E]">
              {t("workspace")}
            </h1>
            <p className="text-[#8A93A8] mt-1 text-xs">{t("setup")}</p>
          </div>

          <div className="flex gap-2">
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
          </div>
        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* LEFT */}
          <div className="bg-white p-5 rounded-2xl border border-[#E4E8F0] shadow-sm hover:shadow-md hover:border-[#C8D0E0] transition-all space-y-3">
            <p className="text-[10px] font-bold text-[#8A93A8] uppercase tracking-widest">
              Project Info
            </p>

            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#1A1F2E] placeholder-[#8A93A8] outline-none focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white transition-all"
              placeholder={t("projectName")}
            />

            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#1A1F2E] placeholder-[#8A93A8] outline-none focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white transition-all resize-none"
              placeholder={t("description")}
            />
          </div>

          {/* RIGHT */}
          <div className="bg-white p-5 rounded-2xl border border-[#E4E8F0] shadow-sm hover:shadow-md hover:border-[#C8D0E0] transition-all space-y-3">
            <p className="text-[10px] font-bold text-[#8A93A8] uppercase tracking-widest">
              Repository
            </p>

            {selectedRepo && (
              <div className="flex justify-between items-center bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-3.5 py-2.5 gap-2">
                <span className="truncate text-[#3B7DD8] font-mono text-xs font-medium">
                  {selectedRepo}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRepo("")}
                  className="text-[#8A93A8] hover:text-red-500 transition-colors flex-shrink-0 text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            <div
              onClick={openModal}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#8A93A8] cursor-pointer hover:border-[#C8D0E0] hover:bg-white hover:text-[#1A1F2E] transition-all flex items-center gap-2"
            >
              <svg
                width="14" height="14" fill="none"
                stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" className="flex-shrink-0"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              {selectedRepo ? t("changeRepo") : t("selectRepo")}
            </div>

            <p className="text-[11px] text-[#8A93A8] leading-relaxed">
              Connect a GitHub repository to link commits and pull requests to your tasks.
            </p>
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
            className="text-sm text-[#8A93A8] hover:text-[#1A1F2E] transition-colors"
          >
            {t("reset")}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm rounded-lg bg-[#E8654A] text-white font-semibold shadow-[0_4px_14px_rgba(232,101,74,0.35)] hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {submitting ? t("creating") : t("create")}
          </button>
        </div>
      </form>

      {/* MODAL */}
      {openRepoModal && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-150 backdrop-blur-sm ${showModal ? "bg-black/30" : "bg-black/0"
            }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[440px] max-h-[540px] bg-white rounded-2xl p-5 border border-[#E4E8F0] shadow-2xl transition-all duration-150 flex flex-col ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-[#1A1F2E] text-base">
                {t("selectRepository")}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-[#8A93A8] hover:text-[#1A1F2E] text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8F9FC] border border-[#E4E8F0] text-[#1A1F2E] placeholder-[#8A93A8] outline-none focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white transition-all mb-3"
              placeholder={t("search")}
            />

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepo(repo.full_name);
                    closeModal();
                  }}
                  className="p-3 bg-[#F8F9FC] border border-[#E4E8F0] rounded-xl cursor-pointer hover:bg-[#FFF2EF] hover:border-[#E8654A]/30 transition-all"
                >
                  <p className="text-xs font-mono text-[#3B7DD8] font-medium">
                    {repo.full_name}
                  </p>
                  <p className="text-xs text-[#8A93A8] mt-0.5">
                    {repo.description || t("noDescription")}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="flex justify-center h-screen items-center">
                  <span className="loading loading-dots loading-xl"></span>
                </div>
              )}
              {error && (
                <p className="text-sm text-red-500 text-center py-4">Error loading repos</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewproject;