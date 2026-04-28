import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userFetch } from '../store/slices/userSlice'
import { reposFetch } from '../store/slices/repoSlices'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const langColors = {
  JavaScript: { text: '#7C4F00', bg: '#FFF3D6', dot: '#F5A623' },
  TypeScript:  { text: '#1A4B8C', bg: '#DAE9FF', dot: '#3B82F6' },
  Python:      { text: '#1C5C3A', bg: '#D4F0E1', dot: '#22C55E' },
  Rust:        { text: '#7A2E10', bg: '#FFE5DA', dot: '#E8654A' },
  Go:          { text: '#0C4A5A', bg: '#CBF0F9', dot: '#06B6D4' },
  Swift:       { text: '#7A2E10', bg: '#FFE5DA', dot: '#F97316' },
}
const defaultLang = { text: '#1A4B8C', bg: '#DAE9FF', dot: '#3B82F6' }

const Skeleton = () => (
  <div className="rounded-md animate-pulse" style={{ background: "var(--gl-border-default)", height: "16px" }} />
)

const SkeletonScreen = () => (
  <div className="min-h-screen p-6 flex flex-col gap-4" style={{ background: "var(--gl-bg-page)" }}>
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2 w-48">
        <Skeleton />
        <Skeleton />
      </div>
      <div className="w-32 h-10 rounded-xl animate-pulse" style={{ background: "var(--gl-border-default)" }} />
    </div>
    <div className="rounded-2xl p-5" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full animate-pulse" style={{ background: "var(--gl-border-default)" }} />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ))}
    </div>
  </div>
)

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user, loaded, loading, error } = useSelector((s) => s.user)
  const repos = useSelector((s) => s.repos)

  useEffect(() => {
    if (!loaded) dispatch(userFetch())
    if (!repos.loaded) dispatch(reposFetch())
  }, [loaded, repos.loaded, dispatch])

  if (loading && !user) return <SkeletonScreen />
  if (error) return (
    <div className="min-h-screen p-6" style={{ background: "var(--gl-bg-page)" }}>
      <p style={{ color: "#C04A2E" }}>{error}</p>
    </div>
  )
  if (!user) return null

  const u = user.user

  return (
    <div className="min-h-screen px-5 py-7 flex flex-col gap-4" style={{ background: "var(--gl-bg-page)" }}>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-xl font-bold tracking-tight m-0" style={{ color: "var(--gl-heading)" }}>
            {t("home_workspace")}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--gl-muted)" }}>
            {repos?.repos?.length} {t("home_repositories")}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard/create")}
          className="text-white text-sm font-semibold px-5 py-2.5 rounded-md cursor-pointer border-none"
          style={{ background: "#E8654A" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#D4553A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8654A"; }}
        >
          {t("create")}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07, duration: 0.4 }}
        className="rounded-lg p-5"
        style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
      >
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={u.avatar_url} alt=""
              className="relative w-18 h-18 rounded-full block border-3 border-[#E8654A]"
            />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold m-0" style={{ color: "var(--gl-heading)" }}>
              {u?.username || u?.login}
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--gl-muted)" }}>
              {u?.bio || t("home_no_bio")}
            </p>
          </div>
          <div className="flex gap-3 ml-auto">
            <div className="text-center px-4 py-2.5 rounded-lg" style={{ background: "#FFE5DA" }}>
              <p className="text-xl font-extrabold tracking-tight m-0" style={{ color: "#E8654A" }}>
                {u.public_repos ?? '—'}
              </p>
              <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--gl-muted)" }}>{t("home_repos")}</p>
            </div>
            <div className="text-center px-4 py-2.5 rounded-lg" style={{ background: "var(--gl-bg-input)" }}>
              <p className="text-xl font-extrabold tracking-tight m-0" style={{ color: "var(--gl-heading)" }}>
                {u.followers ?? '—'}
              </p>
              <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--gl-muted)" }}>{t("home_followers")}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {repos.repos.slice(0, 3).map((repo, i) => {
          const lc = langColors[repo.language] || defaultLang
          return (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.13 + i * 0.07, duration: 0.4 }}
              whileHover={{ y: -2 }}
              className="rounded-lg p-5 flex flex-col"
              style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold m-0" style={{ color: "var(--gl-heading)" }}>{repo.name}</p>
                {repo?.language && (
                  <span
                    className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ color: lc.text, background: lc.bg }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: lc.dot }} />
                    {repo?.language}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed mt-2 flex-1 min-h-[36px]" style={{ color: "var(--gl-muted)" }}>
                {repo?.description || t("home_no_description")}
              </p>
              <div className="mt-3 rounded-md px-3 py-2.5 flex justify-between items-center" style={{ background: "var(--gl-bg-input)" }}>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ color: "#1C5C3A", background: "#D4F0E1" }}>{t("home_active")}</span>
                <motion.a
                  href={repo?.html_url} target="_blank" rel="noreferrer"
                  whileHover={{ x: 2 }}
                  className="text-xs no-underline font-semibold"
                  style={{ color: "#E8654A" }}
                >
                  {t("home_open")}
                </motion.a>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-lg p-5"
          style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-sm" style={{ color: "#E8654A" }}>◈</span>
            <p className="text-[11px] font-bold uppercase tracking-widest m-0" style={{ color: "var(--gl-muted)" }}>
              {t("home_active_tasks")}
            </p>
          </div>
          {repos?.repos?.slice(0, 4).map((repo, i) => (
            <div
              key={repo?.id}
              className="flex justify-between items-center px-2 py-2.5 rounded-md"
              style={{ background: i % 2 !== 0 ? "var(--gl-bg-input)" : "transparent" }}
            >
              <div>
                <p className="text-sm font-medium m-0" style={{ color: "var(--gl-heading)" }}>{repo?.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--gl-muted)" }}>{repo?.language || 'Unknown'}</p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ color: "#7A2E10", background: "#FFE5DA" }}>
                {t("home_in_progress")}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4 }}
          className="rounded-lg p-5"
          style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-sm" style={{ color: "var(--gl-heading)" }}>◈</span>
            <p className="text-[11px] font-bold uppercase tracking-widest m-0" style={{ color: "var(--gl-muted)" }}>
              {t("home_recent_activity")}
            </p>
          </div>
          {[
            { msg: 'Initial commit',      time: '2h ago', dot: '#E8654A' },
            { msg: 'Fixed bug in API',     time: '5h ago', dot: '#22C55E' },
            { msg: 'Improved performance', time: '1d ago', dot: '#F5A623' },
            { msg: 'Updated dependencies', time: '2d ago', dot: 'var(--gl-heading)' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg"
              style={{ background: i % 2 !== 0 ? "var(--gl-bg-input)" : "transparent" }}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.dot }} />
              <p className="text-sm flex-1 m-0" style={{ color: "var(--gl-heading)" }}>{item.msg}</p>
              <span
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ color: "var(--gl-muted)", background: "var(--gl-bg-input)" }}
              >
                {item.time}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home
