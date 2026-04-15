// import React from "react";


// const CreateNewproject = () => {

//   return (
//     <div>
//       {/* <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center">
//         <div className="w-full max-w-6xl px-6 py-10">
//           <p className="text-xs text-gray-400 mb-4 tracking-wide">
//             DIRECTORY / PROJECTS /{" "}
//             <span className="text-gray-300">INITIALIZE PROJECT</span>
//           </p>

//           <h1 className="text-4xl font-semibold mb-2">
//             Architect New Workspace
//           </h1>

//           <p className="text-gray-400 mb-10 max-w-2xl">
//             Define the core parameters and stack for your next monolith. Team
//             access and repo syncing can be adjusted later.
//           </p>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg">
//               <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
//                 ⚙️ Project Identity
//               </h2>

//               <div className="mb-5">
//                 <label className="text-xs text-gray-400 block mb-2">
//                   PROJECT NAME
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Project Catalyst"
//                   className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs text-gray-400 block mb-2">
//                   DESCRIPTION
//                 </label>
//                 <textarea
//                   rows="4"
//                   placeholder="Briefly describe the objective, scope, and target audience..."
//                   className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 ></textarea>
//               </div>
//             </div>

//             <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg">
//               <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
//                 {"</>"} Integration
//               </h2>

//               <div className="mb-4">
//                 <label className="text-xs text-gray-400 block mb-2">
//                   GITHUB REPOSITORY
//                 </label>

//                 <select className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                   <option>Select a repository...</option>
//                 </select>
//               </div>

//               <div className="bg-[#0b1220] border border-gray-700 rounded-lg p-4 text-sm text-gray-400 flex gap-3">
//                 <span className="text-indigo-400">ℹ️</span>
//                 <p>
//                   Connecting a repository allows Kinetic to sync issue tracking
//                   directly with your branch PRs and commits.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6 mt-6">
//             <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg">
//               <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
//                 🧱 Tech Stack
//               </h2>

//               <div className="mb-4 relative">
//                 <input
//                   type="text"
//                   placeholder="Search languages, frameworks, or tools..."
//                   className="w-full bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3 text-sm pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <span className="absolute left-3 top-3.5 text-gray-500">
//                   🔍
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {["React.js", "TypeScript", "PostgreSQL", "TailwindCSS"].map(
//                   (tech) => (
//                     <span
//                       key={tech}
//                       className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-md text-xs flex items-center gap-2"
//                     >
//                       {tech}
//                       <button className="text-indigo-300 hover:text-red-400">
//                         ×
//                       </button>
//                     </span>
//                   ),
//                 )}

//                 <button className="bg-gray-800 text-gray-400 px-3 py-1 rounded-md text-xs hover:bg-gray-700">
//                   + Add More
//                 </button>
//               </div>
//             </div>

//             <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg">
//               <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
//                 👥 Team Members
//               </h2>

//               <div className="mb-5 flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   className="flex-1 bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <button className="bg-gray-800 border border-gray-700 px-4 rounded-lg hover:bg-gray-700">
//                   ➕
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">
//                       ED
//                     </div>
//                     <div>
//                       <p className="text-sm">Erik Draven (You)</p>
//                       <p className="text-xs text-gray-400">OWNER</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between bg-[#0b1220] border border-gray-700 rounded-lg px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src="https://i.pravatar.cc/40?img=5"
//                       alt="avatar"
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <div>
//                       <p className="text-sm">Sarah Jenkins</p>
//                       <p className="text-xs text-gray-400">TECH LEAD</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//             <button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
//               Initialize Project →
//             </button>

//             <button className="text-gray-400 hover:text-white text-sm">
//               Save as Draft
//             </button>
//           </div>
//         </div>
//       </div> */}


//     </div>
//   );
// };

// export default CreateNewproject;





import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reposFetch } from "../store/slices/repoSlices";
import api from "../api/api";
import { useTranslation } from "react-i18next";

const CreateNewproject = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { repos = [], loading, error } = useSelector(
    (state) => state.repos || {}
  );

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [openRepoModal, setOpenRepoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(reposFetch());
  }, [dispatch]);

  const openModal = () => {
    setOpenRepoModal(true);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setOpenRepoModal(false), 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRepo) {
      alert(t("selectAlert"));
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/api/project/create", {
        fullname: selectedRepo,
        name: projectName,
        description,
      });

      setProjectName("");
      setDescription("");
      setSelectedRepo("");

      alert(t("projectCreated"));
    } catch (err) {
      console.error(err);
      alert(t("error"));
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#EEF1F7] text-[#2B3141] flex justify-center py-14 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#010000]">
              {t("workspace")}
            </h1>
            <p className="text-[#6B7280] mt-1 text-xs">
              {t("setup")}
            </p>
          </div>

          <div className="flex gap-2">
            {["uz", "ru", "en"].map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => i18n.changeLanguage(lng)}
                className="px-2 py-1 text-xs rounded bg-[#2B3141] text-white"
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border space-y-4">
            <h2 className="text-[11px] text-gray-500 tracking-widest">
              {t("project")}
            </h2>

            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2.5 text-sm rounded-md bg-gray-50 border"
              placeholder={t("projectName")}
            />

            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-sm rounded-md bg-gray-50 border"
              placeholder={t("description")}
            />
          </div>

          <div className="bg-white p-5 rounded-xl border space-y-3">
            <h2 className="text-[11px] text-gray-500 tracking-widest">
              {t("repository")}
            </h2>

            {selectedRepo && (
              <div className="flex justify-between bg-gray-100 border rounded px-3 py-2 text-sm">
                <span className="truncate">{selectedRepo}</span>
                <button
                  type="button"
                  onClick={() => setSelectedRepo("")}
                >
                  ✕
                </button>
              </div>
            )}

            <div
              onClick={openModal}
              className="w-full p-2.5 text-sm rounded-md bg-gray-50 border cursor-pointer"
            >
              {selectedRepo ? t("changeRepo") : t("selectRepo")}
            </div>

            <p className="text-[11px] text-gray-400">
              {t("sync")}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={() => {
              setProjectName("");
              setDescription("");
              setSelectedRepo("");
            }}
            className="text-sm text-gray-500"
          >
            {t("reset")}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-sm rounded-md bg-[#E8654A] text-white"
          >
            {submitting ? t("creating") : t("create")}
          </button>
        </div>
      </form>

      {openRepoModal && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-150 ${
            showModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[420px] max-h-[520px] bg-white rounded-xl p-4 transform transition-all duration-150 ${
              showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="flex justify-between mb-3">
              <h2>{t("selectRepository")}</h2>
              <button onClick={closeModal}>✕</button>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border mb-3"
              placeholder={t("search")}
            />

            <div className="space-y-2 max-h-[340px] overflow-y-auto">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepo(repo.full_name);
                    closeModal();
                  }}
                  className="p-2 bg-gray-50 border rounded cursor-pointer"
                >
                  <p className="text-sm">{repo.full_name}</p>
                  <p className="text-xs text-gray-400">
                    {repo.description || t("noDescription")}
                  </p>
                </div>
              ))}

              {loading && <p>Loading...</p>}
              {error && <p>Error...</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewproject;