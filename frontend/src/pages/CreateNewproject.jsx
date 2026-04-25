import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reposFetch } from "../store/slices/repoSlices";
import api from "../api/api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CreateNewproject = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { repos = [], loading, error } = useSelector((state) => state.repos || {});

  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

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
      const payload = {
        fullname: selectedRepo,
        name: projectName,
        description: description,
      };
      const res = await api.post("/api/project/create", payload);
      const projectId = res?.data?.id || res?.data?._id;
      if (!projectId) {
        setFormError("Project ID не вернулся с сервера");
        return;
      }
      setFormSuccess(t("projectCreated") || "Created!");
      setProjectName("");
      setDescription("");
      setSelectedRepo("");
      navigate(`/dashboard/project/${projectId}`);
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Unknown error";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRepos = (repos || []).filter((repo) =>
    repo?.full_name?.toLowerCase?.().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex justify-center items-start py-14 px-6 transition-colors duration-300 ${
        isDark ? "bg-[#0E1117]" : "bg-[#F4F6FB]"
      }`}
    >
      <div className="w-full max-w-xl flex flex-col gap-6">

        {/* ERROR */}
        {formError && (
          <div
            className={`flex justify-between items-center gap-3 px-4 py-3 rounded-2xl text-sm border ${
              isDark
                ? "bg-red-950/40 border-red-800/50 text-red-400"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            <span>{formError}</span>
            <button
              type="button"
              onClick={() => setFormError("")}
              className="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* SUCCESS */}
        {formSuccess && (
          <div
            className={`flex justify-between items-center gap-3 px-4 py-3 rounded-2xl text-sm border ${
              isDark
                ? "bg-green-950/40 border-green-800/50 text-green-400"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            <span>{formSuccess}</span>
            <button
              type="button"
              onClick={() => setFormSuccess("")}
              className="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* HEADER */}
        <div>
          <h1
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-[#1A1F2E]"
            }`}
          >
            {t("workspace")}
          </h1>
          <p
            className={`text-xs mt-1 ${
              isDark ? "text-[#4A5168]" : "text-[#8A93A8]"
            }`}
          >
            {t("setup")}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* CARD */}
          <div
            className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
              isDark
                ? "bg-[#141820] border-[#2B3141]"
                : "bg-white border-[#E4E8F0] shadow-sm"
            }`}
          >
            {/* Project details section */}
            <div
              className={`p-7 flex flex-col gap-3 transition-colors duration-300 ${
                isDark ? "bg-[#141820]" : "bg-white"
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                  isDark ? "text-[#3D4460]" : "text-[#C0C4D8]"
                }`}
              >
                {t("project")}
                <span className={`flex-1 h-px ${isDark ? "bg-[#2B3141]" : "bg-[#F0F1F8]"}`} />
              </p>

              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all ${
                  isDark
                    ? "bg-[#1C2130] border-[#2B3141] text-white placeholder-[#3D4460] focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10"
                    : "bg-[#F8F9FC] border-[#E4E8F0] text-[#1A1F2E] placeholder-[#8A93A8] focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white"
                }`}
                placeholder={t("projectName")}
              />

              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all resize-none ${
                  isDark
                    ? "bg-[#1C2130] border-[#2B3141] text-white placeholder-[#3D4460] focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10"
                    : "bg-[#F8F9FC] border-[#E4E8F0] text-[#1A1F2E] placeholder-[#8A93A8] focus:border-[#E8654A] focus:ring-2 focus:ring-[#E8654A]/10 focus:bg-white"
                }`}
                placeholder={t("description")}
              />
            </div>

            {/* Divider */}
            <div className={`h-px ${isDark ? "bg-[#2B3141]" : "bg-[#F0F1F8]"}`} />

            {/* Repository section */}
            <div
              className={`p-7 flex flex-col gap-3 transition-colors duration-300 ${
                isDark ? "bg-[#12151E]" : "bg-[#FAFBFF]"
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                  isDark ? "text-[#3D4460]" : "text-[#C0C4D8]"
                }`}
              >
                Repository
                <span className={`flex-1 h-px ${isDark ? "bg-[#2B3141]" : "bg-[#F0F1F8]"}`} />
              </p>

              {selectedRepo && (
                <div
                  className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border ${
                    isDark
                      ? "bg-blue-950/40 border-blue-800/40"
                      : "bg-[#EEF1FF] border-[#C7D1FF]"
                  }`}
                >
                  <span
                    className={`truncate font-mono text-xs font-medium ${
                      isDark ? "text-blue-400" : "text-[#4B63E0]"
                    }`}
                  >
                    {selectedRepo}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedRepo("")}
                    className={`flex-shrink-0 text-sm transition-colors ${
                      isDark
                        ? "text-[#3D4460] hover:text-red-400"
                        : "text-[#B0B5CC] hover:text-red-500"
                    }`}
                  >
                    ✕
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={openModal}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-dashed text-sm transition-all duration-200 ${
                  isDark
                    ? "bg-transparent border-[#2B3141] text-[#3D4460] hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/5"
                    : "bg-white border-[#DDE1F0] text-[#9499B2] hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50"
                }`}
              >
                <svg
                  width="15" height="15" fill="none"
                  stroke="currentColor" strokeWidth="1.8"
                  viewBox="0 0 24 24" className="flex-shrink-0"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                {selectedRepo ? t("changeRepo") : t("selectRepo")}
              </button>

              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-[#3D4460]" : "text-[#B8BDD4]"
                }`}
              >
                {t("sync")}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setProjectName("");
                setDescription("");
                setSelectedRepo("");
                setFormError("");
                setFormSuccess("");
              }}
              className={`text-sm transition-colors ${
                isDark
                  ? "text-[#3D4460] hover:text-white"
                  : "text-[#B0B5CC] hover:text-[#1A1F2E]"
              }`}
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
      </div>

      {/* MODAL */}
      {openRepoModal && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 backdrop-blur-sm ${
            showModal ? "bg-black/40" : "bg-black/0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[460px] max-h-[560px] rounded-2xl flex flex-col border shadow-2xl transition-all duration-200 overflow-hidden ${
              showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
            } ${
              isDark
                ? "bg-[#141820] border-[#2B3141]"
                : "bg-white border-[#E4E8F0]"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex justify-between items-center px-6 py-4 border-b flex-shrink-0 ${
                isDark ? "border-[#2B3141]" : "border-[#F0F1F8]"
              }`}
            >
              <h2
                className={`font-semibold text-base ${
                  isDark ? "text-white" : "text-[#141826]"
                }`}
              >
                {t("selectRepository")}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                  isDark
                    ? "text-[#3D4460] hover:bg-[#1C2130] hover:text-white"
                    : "text-[#9499B2] hover:bg-[#F4F5FB] hover:text-[#141826]"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div
              className={`px-5 py-3.5 border-b flex-shrink-0 ${
                isDark ? "border-[#2B3141]" : "border-[#F0F1F8]"
              }`}
            >
              <div className="relative">
                <svg
                  className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? "text-[#3D4460]" : "text-[#C4C8DC]"
                  }`}
                  width="14" height="14" fill="none"
                  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  placeholder={t("search")}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all ${
                    isDark
                      ? "bg-[#1C2130] border-[#2B3141] text-white placeholder-[#3D4460] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                      : "bg-[#FAFBFF] border-[#EAECF5] text-[#141826] placeholder-[#C4C8DC] focus:border-violet-400 focus:ring-2 focus:ring-violet-400/10"
                  }`}
                />
              </div>
            </div>

            {/* Repo list */}
            <div className="flex-1 overflow-y-auto p-3">
              {loading && (
                <p className={`text-sm text-center py-6 ${isDark ? "text-[#3D4460]" : "text-[#C4C8DC]"}`}>
                  {t("loading")}
                </p>
              )}
              {error && (
                <p className="text-sm text-red-500 text-center py-6">
                  {t("error")}
                </p>
              )}
              {!loading && filteredRepos.length === 0 && (
                <p className={`text-sm text-center py-6 ${isDark ? "text-[#3D4460]" : "text-[#C4C8DC]"}`}>
                  {t("noDescription")}
                </p>
              )}
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepo(repo.full_name);
                    closeModal();
                  }}
                  className={`px-4 py-3 rounded-xl cursor-pointer border border-transparent transition-all mb-1 ${
                    isDark
                      ? "hover:bg-violet-500/10 hover:border-violet-500/20"
                      : "hover:bg-violet-50 hover:border-violet-200/60"
                  }`}
                >
                  <p className={`text-xs font-mono font-medium ${isDark ? "text-blue-400" : "text-[#4B63E0]"}`}>
                    {repo.full_name}
                  </p>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#3D4460]" : "text-[#B0B5CC]"}`}>
                    {repo.description || t("noDescription")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewproject;
