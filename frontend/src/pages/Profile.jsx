import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fetchProfile } from '../store/slices/userSlice'
import {
  GitCommit, CheckSquare, FolderGit2, GitBranch,
  Mail, User as UserIcon, ExternalLink, Calendar,
} from 'lucide-react'

/* ── Skeleton ─────────────────────────────────────── */
const Sk = ({ className = '', d }) => (
  <div className={`rounded-md animate-pulse ${d ? 'bg-[#2B3141]' : 'bg-[#D8DCE8]'} ${className}`} />
)

const SkeletonScreen = ({ d }) => {
  const card = `rounded-xl border p-5 ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#E6E9F2]'}`
  return (
    <div className="mx-5 my-4 flex flex-col gap-5">
      <div className={`${card} flex items-center gap-5`}>
        <Sk d={d} className="w-20 h-20 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <Sk d={d} className="w-40 h-5" />
          <Sk d={d} className="w-56 h-3" />
          <Sk d={d} className="w-32 h-3" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0,1,2].map(i => <div key={i} className={`${card}`}><Sk d={d} className="w-16 h-8 mb-2" /><Sk d={d} className="w-24 h-3" /></div>)}
      </div>
      <div className={`${card}`}>
        <Sk d={d} className="w-32 h-4 mb-4" />
        {[0,1,2].map(i => <Sk key={i} d={d} className="w-full h-14 mb-2 rounded-xl" />)}
      </div>
    </div>
  )
}

/* ── helpers ─────────────────────────────────────── */
const timeAgo = (date) => {
  if (!date) return ''
  const s = Math.floor((Date.now() - new Date(date)) / 1000)
  if (s < 60)    return `${s}s ago`
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n))

/* ── Role label mapping ──────────────────────────── */
const ROLE_LABELS = {
  frontend: 'Frontend Dev',
  backend:  'Backend Dev',
  fullstack:'Full Stack',
  lead:     'Team Lead',
  designer: 'Designer',
  student:  'Student',
}

const STACK_LABELS = {
  react:   'React',
  vue:     'Vue.js',
  angular: 'Angular',
  svelte:  'Svelte',
  vanilla: 'Vanilla JS',
  node:    'Node.js',
  python:  'Python',
  go:      'Go',
  java:    'Java / Kotlin',
  rust:    'Rust',
  mern:    'MERN',
  nextjs:  'Next.js',
  trpc:    'tRPC + React',
  django:  'Django + React',
  rails:   'Rails',
}

/* ── Main Component ──────────────────────────────── */
const Profile = () => {
  const dispatch = useDispatch()
  const d = useSelector(s => s.theme.mode) === 'dark'
  const { profile, profileLoading, profileError } = useSelector(s => s.user)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  const card   = `rounded-xl border shadow-sm transition-colors duration-200 ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#E6E9F2]'}`
  const h      = d ? 'text-[#EEF1F7]' : 'text-[#2B3141]'
  const m      = d ? 'text-[#5C6480]' : 'text-[#7A8499]'
  const divider = `border-b last:border-none ${d ? 'border-[#2B3141]' : 'border-[#EEF1F7]'}`

  if (profileLoading || !profile) return <SkeletonScreen d={d} />

  if (profileError) return (
    <div className="mx-5 my-4">
      <div className={`${card} p-5`}>
        <p className={d ? 'text-[#F0997B]' : 'text-[#C04A2E]'}>
          {typeof profileError === 'string' ? profileError : 'Failed to load profile.'}
        </p>
      </div>
    </div>
  )

  const { user, stats, recentCommits } = profile
  const role  = ROLE_LABELS[user?.onboarding?.role]  || user?.onboarding?.role  || null
  const stack = STACK_LABELS[user?.onboarding?.stack] || user?.onboarding?.stack || null

  return (
    <div className="mx-5 my-4 flex flex-col gap-5 font-sans">

      {/* ── Hero card ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className={`${card} p-6`}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#E8654A]/20"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className={`text-xl font-bold ${h}`}>{user.name || user.username}</h1>
                {role && (
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${d ? 'bg-[#E8654A]/10 text-[#F0997B]' : 'bg-[#FFF3EE] text-[#E8654A]'}`}>
                    {role}
                  </span>
                )}
                {stack && (
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${d ? 'bg-[#2B3141] text-[#C8CDD9]' : 'bg-[#EEF1F7] text-[#5C6480]'}`}>
                    {stack}
                  </span>
                )}
              </div>

              <div className={`flex flex-wrap gap-3 text-sm ${m}`}>
                <span className="flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5" />
                  @{user.username}
                </span>
                {user.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </span>
                )}
                <a
                  href={`https://github.com/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 hover:text-[#E8654A] transition-colors`}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  github.com/{user.username}
                </a>
              </div>

              {user.bio && (
                <p className={`text-sm mt-0.5 max-w-md ${m}`}>{user.bio}</p>
              )}
            </div>
          </div>

          <a
            href={`https://github.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
              ${d ? 'bg-[#1E2235] hover:bg-[#2B3141] text-[#C8CDD9]' : 'bg-[#F4F6FB] hover:bg-[#EEF1F7] text-[#2B3141]'}`}
          >
            <GitBranch className="w-4 h-4" />
            GitHub
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: <CheckSquare className="w-5 h-5" />,
            value: fmt(stats.tasksCompleted),
            label: 'Tasks Completed',
            color: d ? 'text-[#22C55E]' : 'text-[#16A34A]',
            bg:    d ? 'bg-[#22C55E]/10' : 'bg-[#DCFCE7]',
          },
          {
            icon: <GitCommit className="w-5 h-5" />,
            value: fmt(stats.totalCommits),
            label: 'Total Commits',
            color: d ? 'text-[#F0997B]' : 'text-[#E8654A]',
            bg:    d ? 'bg-[#E8654A]/10' : 'bg-[#FFF3EE]',
          },
          {
            icon: <FolderGit2 className="w-5 h-5" />,
            value: String(stats.projectsCount),
            label: 'Projects',
            color: d ? 'text-[#85B7EB]' : 'text-[#3A7EE8]',
            bg:    d ? 'bg-[#3A7EE8]/10' : 'bg-[#EFF6FF]',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.07 }}
            className={`${card} p-5`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold ${h}`}>{stat.value}</p>
            <p className={`text-sm mt-0.5 ${m}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Onboarding info row ── */}
      {user.onboarding?.completed && (
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className={`${card} p-5`}
        >
          <p className={`text-xs font-semibold mb-4 uppercase tracking-wider ${m}`}>Workspace Profile</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Role',      value: ROLE_LABELS[user.onboarding.role]  || user.onboarding.role },
              { label: 'Stack',     value: STACK_LABELS[user.onboarding.stack] || user.onboarding.stack },
              { label: 'Experience',value: user.onboarding.experience },
              { label: 'Goal',      value: user.onboarding.goal },
            ].filter(f => f.value).map(field => (
              <div
                key={field.label}
                className={`rounded-lg p-3 ${d ? 'bg-[#0E1118]' : 'bg-[#F4F6FB]'}`}
              >
                <p className={`text-[10px] uppercase tracking-wider mb-1 ${m}`}>{field.label}</p>
                <p className={`text-sm font-medium capitalize ${h}`}>{field.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Recent commits ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className={`${card} p-5`}
      >
        <div className="flex items-center justify-between mb-4">
          <p className={`text-xs font-semibold uppercase tracking-wider ${m}`}>Recent Commits</p>
          <GitCommit className={`w-4 h-4 ${m}`} />
        </div>

        {recentCommits && recentCommits.length > 0 ? (
          <div>
            {recentCommits.map((commit, i) => (
              <div key={commit._id || i} className={`flex items-start gap-3 py-3 ${divider}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${d ? 'bg-[#E8654A]/10' : 'bg-[#FFF3EE]'}`}>
                  <GitCommit className="w-3.5 h-3.5 text-[#E8654A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${h}`}>{commit.commit_message}</p>
                  <div className={`flex items-center gap-2 mt-0.5 text-xs ${m}`}>
                    {commit.project?.repo_name && (
                      <span className="flex items-center gap-1">
                        <FolderGit2 className="w-3 h-3" />
                        {commit.project.repo_name}
                      </span>
                    )}
                    {commit.repo_fullname && !commit.project?.repo_name && (
                      <span>{commit.repo_fullname}</span>
                    )}
                  </div>
                </div>
                <span className={`text-xs shrink-0 flex items-center gap-1 ${m}`}>
                  <Calendar className="w-3 h-3" />
                  {timeAgo(commit.commit_date)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className={`flex flex-col items-center py-8 gap-2 ${m}`}>
            <GitCommit className="w-6 h-6 opacity-40" />
            <p className="text-sm">No commits yet</p>
            <p className="text-xs opacity-60">Push code linked to a project to see commits here</p>
          </div>
        )}
      </motion.div>

    </div>
  )
}

export default Profile
