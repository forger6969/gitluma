import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../store/slices/projectsSlice";

const Projekt = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state)=> state.projects.projects)
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-[91vh] items-center justify-center bg-[var(--color-frost-bg)] text-[var(--color-git-charcoal)]">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[91vh] items-center justify-center bg-[var(--color-frost-bg)] px-6">
        <div className="w-full max-w-md rounded-2xl border border-[color:rgba(232,101,74,0.28)] bg-[color:rgba(232,101,74,0.1)] p-6 text-center text-[var(--color-git-charcoal)]">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[91vh] bg-[var(--color-frost-bg)] px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--color-git-charcoal)]">Projects</h1>
            <p className="mt-2 text-sm text-[var(--color-git-charcoal-soft)]">
              Redux store ichidan kelayotgan barcha loyihalar shu yerda
              render qilindi.
            </p>
          </div>
          <div className="rounded-xl border border-[color:rgba(43,49,65,0.12)] bg-[var(--color-white)] px-4 py-2 text-sm text-[var(--color-git-charcoal)] shadow-[0_10px_30px_rgba(43,49,65,0.08)]">
            Total: {projects?.length || 0}
          </div>
        </div>

        {!projects?.length ? (
          <div className="rounded-3xl border border-dashed border-[color:rgba(43,49,65,0.18)] bg-[var(--color-white)] px-6 py-16 text-center text-[var(--color-git-charcoal-soft)]">
            Hozircha project topilmadi.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-3xl border border-[color:rgba(43,49,65,0.1)] bg-[var(--color-white)] p-6 shadow-[0_18px_48px_rgba(43,49,65,0.12)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(43,49,65,0.2)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--color-git-charcoal)]">
                      {project.repo_name}
                    </h2>
                    <p className="mt-1 break-all text-sm text-[var(--color-git-charcoal-soft)]">
                      {project.repo_fullname}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--color-frost-hover)] px-3 py-1 text-xs font-semibold text-[var(--color-git-charcoal)]">
                    {project.default_branch || "no-branch"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <InfoCard
                    title="Members"
                    value={project.members?.length || 0}
                  />
                  <InfoCard
                    title="Commits"
                    value={project.commits?.length || 0}
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-[var(--color-frost-bg)] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-git-charcoal-muted)]">
                    Repository owner
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--color-git-charcoal)]">
                    {project.repo_owner}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-[var(--color-git-charcoal-soft)]">
                    ID: {project.repo_id}
                  </p>
                  <Link
                    to={`/dashboard/project/${project._id}`}
                    className="rounded-xl bg-[var(--color-luma-coral)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-luma-coral-hover)] active:bg-[var(--color-luma-coral-active)]"
                  >
                    Open
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
    <div className="rounded-2xl bg-[var(--color-frost-bg)] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-git-charcoal-muted)]">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-[var(--color-git-charcoal)]">{value}</p>
    </div>
  );
};

export default Projekt;
