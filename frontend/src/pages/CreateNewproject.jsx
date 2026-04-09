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

const CreateNewproject = () => {
  const dispatch = useDispatch();

  const { repos = [], loading, error } = useSelector(
    (state) => state.repos || {}
  );

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(reposFetch());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      await api.post("/api/project/create", {
        name: projectName,
        description,
        repo: selectedRepo,
      });

      setProjectName("");
      setDescription("");
      setSelectedRepo("");

      alert("Project yaratildi 🚀");

    } catch (err) {
      alert("Xatolik ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] relative overflow-hidden text-white">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px]" />

      <form onSubmit={handleSubmit} className="relative z-10 max-w-6xl mx-auto px-4 py-12">

        <p className="text-xs text-gray-500 tracking-widest mb-6">
          DIRECTORY / PROJECTS /{" "}
          <span className="text-gray-300">INITIALIZE PROJECT</span>
        </p>

        <h1 className="text-4xl font-semibold mb-3">
          Architect New Workspace
        </h1>

        <p className="text-gray-400 mb-10 max-w-2xl">
          Define the core parameters and stack for your next project.
        </p>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            {/* CARD */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 overflow-hidden
              hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]
              hover:scale-[1.02] transition-all duration-300">

              <h2 className="mb-5 text-lg font-semibold">
                ⚙️ Project Identity
              </h2>

              <input
                type="text"
                placeholder="Project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full mb-4 bg-[#0b1220]/80 border border-gray-700 rounded-xl px-4 py-3
                focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
                transition-all"
              />

              <textarea
                rows="4"
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0b1220]/80 border border-gray-700 rounded-xl px-4 py-3
                focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
                transition-all"
              />
            </div>

            {/* TECH */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6
              hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]
              hover:scale-[1.02] transition-all duration-300">

              <h2 className="mb-4 text-lg font-semibold">
                🧩 Tech Stack
              </h2>

              <input
                placeholder="Search tech..."
                className="w-full mb-4 bg-[#0b1220]/80 border border-gray-700 rounded-xl px-4 py-3
                focus:ring-2 focus:ring-indigo-500/40"
              />

              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "PostgreSQL", "Tailwind"].map((t) => (
                  <span key={t}
                    className="px-3 py-1 rounded-lg text-sm border border-gray-700
                    hover:border-indigo-500 hover:bg-indigo-500/20
                    hover:scale-105 transition cursor-pointer">
                    {t} ✕
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* REPO */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6
              hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]
              hover:scale-[1.02] transition-all duration-300">

              <h2 className="mb-4 text-lg font-semibold">
                {"</>"} Integration
              </h2>

              <select
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
                className="w-full bg-[#0b1220]/80 border border-gray-700 rounded-xl px-4 py-3
                focus:ring-2 focus:ring-indigo-500/40"
              >
                <option value="">Select repository...</option>

                {loading && <option disabled>⏳ Fetching...</option>}
                {error && <option disabled>⚠️ Error loading</option>}

                {!loading &&
                  !error &&
                  repos.map((repo) => (
                    <option key={repo.id} value={repo.name}>
                      {repo.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* TEAM */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6
              hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]
              hover:scale-[1.02] transition-all duration-300">

              <h2 className="mb-4 text-lg font-semibold">
                👥 Team
              </h2>

              <div className="space-y-3">
                {[
                  { name: "Erik Draven", role: "Owner" },
                  { name: "Sarah Jenkins", role: "Tech Lead" },
                ].map((u) => (
                  <div key={u.name}
                    className="flex justify-between p-3 rounded-xl bg-[#0b1220]
                    border border-gray-800 hover:border-indigo-500
                    hover:bg-indigo-500/10 transition cursor-pointer">
                    <span>{u.name}</span>
                    <span className="text-xs text-gray-400">{u.role}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 flex justify-between items-center border-t border-white/10 pt-6">

          <button
            type="button"
            onClick={() => {
              setProjectName("");
              setDescription("");
              setSelectedRepo("");
            }}
            className="text-gray-400 hover:text-white transition"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="relative px-8 py-3 rounded-xl font-medium overflow-hidden
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]
            hover:scale-105 active:scale-95
            transition-all duration-300"
          >
            {submitting ? "Creating..." : "Initialize Project →"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateNewproject;
