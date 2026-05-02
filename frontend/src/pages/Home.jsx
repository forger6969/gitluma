import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCreateProject } from '../context/CreateProjectContext'




const langColors = {
  JavaScript: { text: 'text-[#7C4F00]', bg: 'bg-[#FFF3D6]', dot: 'bg-[#F5A623]', darkText: 'text-[#EF9F27]', darkBg: 'bg-[#3D2A00]' },
  TypeScript: { text: 'text-[#1A4B8C]', bg: 'bg-[#DAE9FF]', dot: 'bg-[#3B82F6]', darkText: 'text-[#85B7EB]', darkBg: 'bg-[#0D1F3D]' },
  Python: { text: 'text-[#1C5C3A]', bg: 'bg-[#D4F0E1]', dot: 'bg-[#22C55E]', darkText: 'text-[#5DCAA5]', darkBg: 'bg-[#0D3D2A]' },
  Rust: { text: 'text-[#7A2E10]', bg: 'bg-[#FFE5DA]', dot: 'bg-[#F97316]', darkText: 'text-[#F0997B]', darkBg: 'bg-[#3D1A0D]' },
  Go: { text: 'text-[#0C4A5A]', bg: 'bg-[#CBF0F9]', dot: 'bg-[#06B6D4]', darkText: 'text-[#67D4E8]', darkBg: 'bg-[#0D2D3D]' },
  Swift: { text: 'text-[#7A2E10]', bg: 'bg-[#FFE5DA]', dot: 'bg-[#F97316]', darkText: 'text-[#F0997B]', darkBg: 'bg-[#3D1A0D]' },
}
const defaultLang = { text: 'text-[#1A4B8C]', bg: 'bg-[#DAE9FF]', dot: 'bg-[#3B82F6]', darkText: 'text-[#85B7EB]', darkBg: 'bg-[#0D1F3D]' }

const Sk = ({ className = '', d }) => (
  <div className={`rounded-md animate-pulse ${d ? 'bg-[#2B3141]' : 'bg-[#D8DCE8]'} ${className}`} />
)

const SkeletonScreen = ({ d }) => (
  <div className="mx-5 my-4 flex flex-col gap-4 font-sans">
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Sk d={d} className="w-36 h-5" />
        <Sk d={d} className="w-20 h-3" />
      </div>
      <Sk d={d} className="w-32 h-10 rounded-md" />
    </div>

    <div className={`rounded-lg p-5 border ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#D8DCE8]'}`}>
      <div className="flex items-center gap-4">
        <Sk d={d} className="w-[72px] h-[72px] rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Sk d={d} className="w-2/5 h-4" />
          <Sk d={d} className="w-3/5 h-3" />
        </div>
        <div className="flex gap-3 ml-auto">
          <div className={`px-4 py-2.5 rounded-lg flex flex-col items-center gap-1.5 ${d ? 'bg-[#E8654A]/10' : 'bg-[#FFE5DA]'}`}>
            <Sk d={d} className="w-10 h-6" /><Sk d={d} className="w-8 h-2" />
          </div>
          <div className={`px-4 py-2.5 rounded-lg flex flex-col items-center gap-1.5 ${d ? 'bg-[#2B3141]' : 'bg-[#E5E8F0]'}`}>
            <Sk d={d} className="w-10 h-6" /><Sk d={d} className="w-10 h-2" />
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`rounded-lg p-5 flex flex-col border ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#D8DCE8]'}`}>
          <div className="flex justify-between items-start">
            <Sk d={d} className="w-2/5 h-4" /><Sk d={d} className="w-16 h-5 rounded-full" />
          </div>
          <div className="flex flex-col gap-1.5 mt-2 flex-1 min-h-[36px]">
            <Sk d={d} className="w-full h-3" /><Sk d={d} className="w-4/5 h-3" />
          </div>
          <div className={`mt-3 rounded-md px-3 py-2.5 flex justify-between items-center ${d ? 'bg-[#0E1118]' : 'bg-[#EEF1F7]'}`}>
            <Sk d={d} className="w-12 h-5 rounded-full" /><Sk d={d} className="w-12 h-3 rounded-full" />
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[0, 1].map(i => (
        <div key={i} className={`rounded-lg p-5 border ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#D8DCE8]'}`}>
          <div className="flex items-center gap-2 mb-3.5">
            <Sk d={d} className="w-3 h-3 rounded-sm" /><Sk d={d} className="w-24 h-3" />
          </div>
          {[...Array(4)].map((_, j) => (
            <div key={j} className={`flex justify-between items-center px-2 py-2.5 rounded-md ${j % 2 !== 0 ? (d ? 'bg-[#0E1118]' : 'bg-[#EEF1F7]') : ''}`}>
              <div className="flex flex-col gap-1.5">
                <Sk d={d} className="w-28 h-3.5" /><Sk d={d} className="w-16 h-2.5" />
              </div>
              <Sk d={d} className="w-20 h-5 rounded-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)

const Home = () => {
  const dispatch = useDispatch()
  const { user, loaded, loading, error } = useSelector(s => s.user)
  const repos = useSelector(s => s.repos)
  const projects = useSelector(s => s.projects.projects)
  const d = useSelector(s => s.theme.mode) === 'dark'
  const { open } = useCreateProject()

  if (loading || !user) return <SkeletonScreen d={d} />

  if (error) return (
    <div className="p-6 font-sans">
      <p className={d ? 'text-[#F0997B]' : 'text-[#C04A2E]'}>
        {typeof error === 'string' ? error : (error?.message || JSON.stringify(error))}
      </p>
    </div>
  )

  const u = user.user

  const card = `rounded-xl p-5 border shadow-sm transition-colors duration-200 ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#E6E9F2]'}`
  const divider = `border-b last:border-none ${d ? 'border-[#2B3141]' : 'border-[#EEF1F7]'}`
  const h = d ? 'text-[#EEF1F7]' : 'text-[#2B3141]'
  const m = d ? 'text-[#5C6480]' : 'text-[#7A8499]'
  const b = d ? 'text-[#C8CDD9]' : 'text-[#2B3141]'

  return (
      <div className="mx-5 my-4 flex flex-col gap-5 font-sans">

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${h}`}>Workspace</h1>
            <p className={`text-sm mt-1 ${m}`}>{repos?.repos?.length} repositories</p>
          </div>

          <motion.button
            onClick={open}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className={`text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-md transition
      ${d ? 'bg-[#E8654A]/90 hover:bg-[#E8654A]' : 'bg-gradient-to-r from-[#E8654A] to-[#FF8A65] hover:opacity-90'}`}
          >
            + New Project
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className={`backdrop-blur-xl rounded-xl p-6 border shadow-sm transition-colors duration-200
    ${d ? 'bg-[#161B27]/80 border-[#2B3141]' : 'bg-white/80 border-[#E6E9F2]'}`}
        >
          <div className="flex items-center gap-5">
            <img src={u.avatar_url} alt={u?.username || "avatar"} className="w-20 h-20 rounded-full ring-4 ring-[#E8654A]/20" onError={(e) => { e.currentTarget.style.display = "none"; }} />

            <div className="flex-1">
              <p className={`text-lg font-bold ${h}`}>{u?.username || u?.login}</p>
              <p className={`text-sm mt-1 ${m}`}>{u?.bio || 'No bio available'}</p>
            </div>

            <div className="flex gap-3">
              <div className={`px-5 py-3 rounded-lg text-center ${d ? 'bg-[#E8654A]/10' : 'bg-[#FFF3EE]'}`}>
                <p className={`text-xl font-bold ${d ? 'text-[#F0997B]' : 'text-[#E8654A]'}`}>{repos?.repos?.length ?? '—'}</p>
                <p className={`text-[10px] uppercase tracking-wider ${m}`}>Repos</p>
              </div>
              <div className={`px-5 py-3 rounded-lg text-center ${d ? 'bg-[#2B3141]' : 'bg-[#F1F3F9]'}`}>
                <p className={`text-xl font-bold ${h}`}>{u.followers ?? '—'}</p>
                <p className={`text-[10px] uppercase tracking-wider ${m}`}>Followers</p>
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
                transition={{ delay: 0.1 + i * 0.07 }} whileHover={{ y: -4 }}
                className={`${card} hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-semibold ${h}`}>{repo.name}</p>
                  {repo.language && (
                    <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full
              ${d ? `${lc.darkText} ${lc.darkBg}` : `${lc.text} ${lc.bg}`}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className={`text-xs mt-2 line-clamp-2 ${m}`}>{repo.description || 'No description provided'}</p>

                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold
            ${d ? 'bg-[#0D3D2A] text-[#5DCAA5]' : 'bg-[#E8F7EE] text-[#1C5C3A]'}`}>
                    Active
                  </span>
                  <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }}
                    className={`text-sm font-semibold ${d ? 'text-[#F0997B]' : 'text-[#E8654A]'}`}>
                    Open →
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className={card}
          >
            <p className={`text-xs font-semibold mb-4 uppercase tracking-wider ${m}`}>Your Projects</p>
            {projects && projects.length > 0 ? (
              projects.slice(0, 4).map((project) => (
                <div key={project._id} className={`flex justify-between items-center py-2 ${divider}`}>
                  <div>
                    <p className={`text-sm font-medium ${b}`}>{project.repo_name}</p>
                    <p className={`text-[11px] ${m}`}>{project.default_branch || 'main'}</p>
                  </div>
                  <Link
                    to={`/dashboard/project/${project._id}`}
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold transition-colors
                      ${d ? 'bg-[#E8654A]/10 text-[#F0997B] hover:bg-[#E8654A]/20' : 'bg-[#FFF3EE] text-[#E8654A] hover:bg-[#FFEAE3]'}`}
                  >
                    Open →
                  </Link>
                </div>
              ))
            ) : (
              <div className={`py-6 text-center ${m}`}>
                <p className="text-sm">No projects yet</p>
                <button
                  onClick={open}
                  className={`mt-2 text-xs font-semibold ${d ? 'text-[#F0997B]' : 'text-[#E8654A]'}`}
                >
                  + Create your first project
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className={card}
          >
            <p className={`text-xs font-semibold mb-4 uppercase tracking-wider ${m}`}>Recent Projects</p>
            {projects && projects.length > 0 ? (
              projects.slice(0, 4).map((project) => (
                <Link
                  key={project._id}
                  to={`/dashboard/project/${project._id}`}
                  className={`flex items-center gap-3 py-2 ${divider}`}
                >
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#E8654A' }} />
                  <p className={`text-sm flex-1 truncate ${b}`}>{project.repo_name}</p>
                  <span className={`text-[11px] shrink-0 ${m}`}>{project.default_branch || 'main'}</span>
                </Link>
              ))
            ) : (
              <div className={`py-6 text-center ${m}`}>
                <p className="text-sm">No projects yet</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
  )
}

export default Home



