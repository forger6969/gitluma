import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getProjects } from "../store/slices/projectsSlice";

const Projekt = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const projects = useSelector((state)=> state.projects.projects)
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-[91vh] bg-[#0F1115] flex items-center justify-center text-[#DFE2EB]">
        {t("proj_loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[91vh] bg-[#0F1115] flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[91vh] bg-[#0F1115] px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#DFE2EB]">{t("proj_title")}</h1>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#DFE2EB]">
            {t("proj_total")}: {projects?.length || 0}
          </div>
        </div>

        {!projects?.length ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-16 text-center text-[#98A2B3]">
            {t("proj_empty")}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-3xl border border-white/10 bg-[#171A21] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#F5F7FA]">
                      {project.repo_name}
                    </h2>
                    <p className="mt-1 break-all text-sm text-[#98A2B3]">
                      {project.repo_fullname}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#C4B5FD]">
                    {project.default_branch || "no-branch"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <InfoCard
                    title={t("proj_members")}
                    value={project.members?.length || 0}
                  />
                  <InfoCard
                    title={t("commits")}
                    value={project.commits?.length || 0}
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#667085]">
                    {t("proj_repo_owner")}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#E4E7EC]">
                    {project.repo_owner}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-[#98A2B3]">
                    ID: {project.repo_id}
                  </p>
                  <Link
                    to={`/dashboard/project/${project._id}`}
                    className="rounded-xl bg-[#A78BFA] px-4 py-2 text-sm font-semibold text-[#1F1147] transition hover:bg-[#C4B5FD]"
                  >
                    {t("proj_open")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-[#667085]">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default Projekt;
