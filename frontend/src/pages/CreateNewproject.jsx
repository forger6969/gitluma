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

  if (!selectedRepo) {
    alert("Repo tanlang");
    return;
  }

  try {
    setSubmitting(true);

    console.log(selectedRepo);
    
    await api.post("/api/project/create", {
      fullname: selectedRepo,
    });

    setSelectedRepo("");

    alert("Project created 🚀");
  } catch (err) {
    console.error(err);
    alert("Error ❌");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b2330] via-[#121b29] to-[#0c141e] text-white flex justify-center py-14 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">

        
        <div>
          <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Architect New Workspace
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Define the core parameters and stack for your next monolith.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#111827]/70 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/40 transition duration-300 space-y-5 shadow-xl">
            <h2 className="text-xs text-gray-400 tracking-widest">
              PROJECT IDENTITY
            </h2>

            <input
              type="text"
              placeholder="e.g. Project Catalyst"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0c141e] border border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition-all duration-200
              hover:border-gray-500"
            />

            <textarea
              rows="4"
              placeholder="Briefly describe the objective..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0c141e] border border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition-all duration-200
              hover:border-gray-500 resize-none"
            />
          </div>

        
          <div className="bg-[#111827]/70 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 hover:border-purple-500/40 transition duration-300 space-y-5 shadow-xl">
            <h2 className="text-xs text-gray-400 tracking-widest">
              INTEGRATION
            </h2>

            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0c141e] border border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-purple-500 
              focus:border-purple-500 transition-all duration-200
              hover:border-gray-500 cursor-pointer"
            >
              <option value="">Select a repository...</option>

              {loading && <option disabled>Loading...</option>}
              {error && <option disabled>Error loading</option>}

              {!loading &&
                !error &&
                repos.map((repo) => (
                  <option key={repo.id} value={repo.full_name}>
                    {repo.full_name}
                  </option>
                ))}
            </select>

            <p className="text-xs text-gray-500 leading-relaxed">
              Connecting a repository allows live sync with your codebase.
            </p>
          </div>

        </div>

        
        <div className="flex justify-between items-center pt-4">

          <button
            type="button"
            onClick={() => {
              setProjectName("");
              setDescription("");
              setSelectedRepo("");
            }}
            className="text-gray-400 hover:text-white transition duration-200"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-7 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-indigo-500 hover:to-purple-500 active:scale-95
            transition-all duration-200 shadow-lg shadow-indigo-600/30
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default CreateNewproject;