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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b2330] via-[#121b29] to-[#0c141e] text-white flex justify-center py-14 px-6">

      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">

        {/* HEADER + LANGUAGE SWITCH */}
        <div className="flex items-start justify-between">

          {/* LEFT TEXT */}
          <div>
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {t("workspace")}
            </h1>
            <p className="text-gray-400 mt-1 text-xs">
              {t("setup")}
            </p>
          </div>

          {/* RIGHT LANGUAGE SWITCH */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("uz")}
              className="px-2 py-1 text-xs rounded bg-[#1f2937] hover:bg-[#374151]"
            >
              UZ
            </button>

            <button
              type="button"
              onClick={() => i18n.changeLanguage("ru")}
              className="px-2 py-1 text-xs rounded bg-[#1f2937] hover:bg-[#374151]"
            >
              RU
            </button>

            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className="px-2 py-1 text-xs rounded bg-[#1f2937] hover:bg-[#374151]"
            >
              EN
            </button>
          </div>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* LEFT */}
          <div className="bg-[#111827]/70 p-5 rounded-xl border border-gray-800 space-y-4">

            <h2 className="text-[11px] text-gray-400 tracking-widest">
              {t("project")}
            </h2>

            <input
              type="text"
              placeholder={t("projectName")}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2.5 text-sm rounded-md bg-[#0c141e] border border-gray-700"
            />

            <textarea
              rows="3"
              placeholder={t("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-sm rounded-md bg-[#0c141e] border border-gray-700 resize-none"
            />
          </div>

          {/* RIGHT */}
          <div className="bg-[#111827]/70 p-5 rounded-xl border border-gray-800 space-y-3">

            <h2 className="text-[11px] text-gray-400 tracking-widest">
              {t("repository")}
            </h2>

            {/* SELECTED CHIP */}
            {selectedRepo && (
              <div className="flex items-center justify-between bg-[#1f2937] border border-gray-700 rounded-md px-3 py-2 text-sm">
                <span className="truncate">{selectedRepo}</span>

                <button
                  type="button"
                  onClick={() => setSelectedRepo("")}
                  className="ml-3 text-gray-400 hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            )}

            {/* SELECT BUTTON */}
            <div
              onClick={openModal}
              className="w-full p-2.5 text-sm rounded-md bg-[#0c141e] border border-gray-700 hover:border-purple-500 cursor-pointer transition"
            >
              {selectedRepo ? t("changeRepo") : t("selectRepo")}
            </div>

            <p className="text-[11px] text-gray-500">
              {t("sync")}
            </p>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-2">

          <button
            type="button"
            onClick={() => {
              setProjectName("");
              setDescription("");
              setSelectedRepo("");
            }}
            className="text-gray-400 text-sm hover:text-white"
          >
            {t("reset")}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-sm rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 disabled:opacity-50"
          >
            {submitting ? t("creating") : t("create")}
          </button>

        </div>

      </form>

      {/* MODAL */}
      {openRepoModal && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-150 ${
            showModal ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"
          }`}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[420px] max-h-[520px] bg-[#0f172a] border border-gray-800 rounded-xl p-4 transform transition-all duration-150 ${
              showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold">
                {t("selectRepository")}
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* SEARCH */}
            <input
              type="text"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 text-sm rounded-md bg-[#0c141e] border border-gray-700 mb-3"
            />

            {/* LIST */}
            <div className="space-y-1.5 max-h-[340px] overflow-y-auto">

              {loading && (
                <p className="text-gray-400 text-sm">{t("loading")}</p>
              )}

              {error && (
                <p className="text-red-400 text-sm">{t("error")}</p>
              )}

              {repos
                .filter((repo) =>
                  repo.full_name.toLowerCase().includes(search.toLowerCase())
                )
                .map((repo) => (
                  <div
                    key={repo.id}
                    onClick={() => {
                      setSelectedRepo(repo.full_name);
                      closeModal();
                    }}
                    className="p-2 rounded-md bg-[#111827] hover:bg-[#1f2937] border border-gray-800 cursor-pointer"
                  >
                    <p className="text-sm truncate">{repo.full_name}</p>
                    <p className="text-[11px] text-gray-500 truncate">
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