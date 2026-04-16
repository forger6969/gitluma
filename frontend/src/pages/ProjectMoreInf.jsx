import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import useCommitsEvents from "../hooks/useCommitsEvents";
import { useSelector } from "react-redux";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const commit = useCommitsEvents(project?._id)
  const commits = useSelector((state)=> state.projectcommits.commits)
  

  const fetchProject = async () => {
    try {
      const res = await api.get(`/api/project/${id}`);
      console.log(res.data);
      
      setProject(res.data.project);
    } catch (err) {
      console.error(err);
    setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

useEffect(()=>{
console.log( "new commit", commits);

},[commits])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF1F7] text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF1F7] text-[#E8654A]">
        Project not found
      </div>
    );
  }

  return (
    <div className="bg-[#EEF1F7] min-h-screen text-[#E8654A] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔹 Header */}
        <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow flex items-center gap-4">
          <img
            src={project.repo_owner_user?.avatar_url}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-indigo-500"
          />
          <div>
            <h1 className="text-2xl font-bold">{project.repo_name}</h1>
            <p className="text-[#181D2A] text-sm">
              {project.repo_full_name}
            </p>
          </div>
        </div>

        {/* 🔹 Info */}
        <div className="grid  md:grid-cols-3 gap-4">
          <Card className="text-[#181D2A]" title="Branch" value={project.default_branch} />
          <Card className="text-[#181D2A]" title="Commits" value={project.commits?.length} />
          <Card className="text-[#181D2A]" title="Visibility" value={project.visibility} />
        </div>

        {/* 🔹 Owner */}
        <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow">
          <h2 className="text-xl mb-4 font-semibold">Owner</h2>

          <div className="flex items-center gap-4">
            <img
              src={project.repo_owner_user?.avatar_url}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">
                {project.repo_owner_user?.username}
              </p>
              <p className="text-gray-400 text-sm">
                {project.repo_owner_user?.email}
              </p>
            </div>
          </div>
        </div>

       {/* 🔹 Commits */}
<div className="bg-[#FFFFFF] rounded-2xl p-6 shadow">
  <h2 className="text-xl font-semibold mb-4">
    Commits ({project.commits?.length})
  </h2>

  <div className="space-y-3 max-h-[400px] hover:text-[#F4F6FB] overflow-y-auto">
    {[...(project.commits || [])].reverse().map((commit, index) => (
      <div
        key={index}
        className="bg-[#F4F6FB] p-4 rounded-xl  hover:bg-[#c8cad0] transition"
      >
        <p className="text-sm text-[#9AA0B4]  font-medium">
          {commit.commit_message || "No message"}
        </p>

        <div className="flex justify-between text-xs  text-gray-400 mt-2">
          <span>
            {new Date(commit.createdAt).toLocaleString()}
          </span>
          <span className="text-indigo-400">
            #{index + 1}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
            {/* 🔹 Members */}
<div className="bg-[#FFFFFF] rounded-2xl p-6 shadow">
  <h2 className="text-xl font-semibold mb-4">
    Members ({project.members?.length})
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-4">
    {project.members?.map((member, index) => (
      <div
        key={index}
        className="flex items-center  gap-3 bg-[#F4F6FB] p-3 rounded-xl hover:bg-[#c8cad0] transition"
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
          <p className="text-xs text-gray-400">
            {member.role}
          </p>
        </div>

        {/* Role badge */}
        <span
          className={`text-xs px-2 py-1  rounded-full ${
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
  <div className="bg-[#FFFFFF] p-4 rounded-2xl shadow">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-lg font-semibold">{value || "N/A"}</p>
  </div>
);

export default ProjectDetails;
