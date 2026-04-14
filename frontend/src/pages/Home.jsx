import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userFetch } from '../store/slices/userSlice'
import { reposFetch } from '../store/slices/repoSlices'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'



const langColors = {
  JavaScript: { text: 'text-yellow-300', bg: 'bg-yellow-300/10', dot: 'bg-yellow-300' },
  TypeScript:  { text: 'text-blue-400',  bg: 'bg-blue-400/10',  dot: 'bg-blue-400'  },
  Python:      { text: 'text-blue-500',  bg: 'bg-blue-500/10',  dot: 'bg-blue-500'  },
  Rust:        { text: 'text-orange-300',bg: 'bg-orange-300/10',dot: 'bg-orange-300' },
  Go:          { text: 'text-cyan-400',  bg: 'bg-cyan-400/10',  dot: 'bg-cyan-400'  },
  Swift:       { text: 'text-orange-400',bg: 'bg-orange-400/10',dot: 'bg-orange-400' },
}
const defaultLang = { text: 'text-blue-400', bg: 'bg-blue-400/10', dot: 'bg-blue-400' }

/* ── Skeleton ── */
const Skeleton = ({ className = '' }) => (
  <div className={`rounded-md animate-pulse bg-[#141b2d] ${className}`} />
)

const SkeletonScreen = () => (
  <div className="bg-[#0a0e17] min-h-screen p-6 flex flex-col gap-4 font-sans">
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-44 h-5" />
        <Skeleton className="w-24 h-3" />
      </div>
      <Skeleton className="w-32 h-10 rounded-xl" />
    </div>
    <div className="bg-[#0f1420] rounded-2xl p-5">
      <div className="flex items-center gap-4">
        <Skeleton className="w-14 h-14 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-2/5 h-4" />
          
          <Skeleton className="w-3/5 h-3" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-[#0f1420] rounded-2xl p-5 flex flex-col gap-2">
          <Skeleton className="w-3/5 h-4" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-4/5 h-3" />
        </div>
      ))}
    </div>
  </div>
)

/* ── Main ── */
const Home = () => {
  const dispatch = useDispatch()
  const { user, loaded, loading, error } = useSelector(s => s.user)
  const repos = useSelector(s => s.repos)

  useEffect(() => {
    if (!loaded) dispatch(userFetch())
    if (!repos.loaded) dispatch(reposFetch())
  }, [loaded, repos.loaded, dispatch])

  if (loading && !user) return <SkeletonScreen />
  if (error) return (
    <div className="bg-[#0a0e17] min-h-screen p-6 font-sans">
      <p className="text-red-400">{error}</p>
    </div>
  )
  if (!user) return null

  const u = user.user

  return (
    <div className="bg-[#0a0e17] min-h-screen px-5 py-7 flex flex-col gap-4 font-sans">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-[#e2e8f0] text-xl font-bold tracking-tight m-0">Workspace</h1>
          <p className="text-[#3d5068] text-sm mt-1">{repos.repos.length} repositories</p>
        </div>
     <Link to={'/dashboard/create'}>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="bg-blue-500  transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer border-none hover:bg-black hover:border-blue-500 border-2"
        >
          Create Project  
        </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07, duration: 0.4 }}
        className="bg-[#0f1420] rounded-2xl p-5"
      >
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div
              className="absolute inset-[-2px] rounded-full"
              style={{
                background: 'conic-gradient(#4f8bff, #9b6dff, #4f8bff)',
                animation: 'spin 5s linear infinite',
              }}
            />
            <img
              src={u.avatar_url} alt=""
              className="relative w-14 h-14 rounded-full block"
            />
          </div>

          <div className="flex-1">
            <p className="text-[#e2e8f0] text-base font-bold m-0">{u.name || u.login}</p>
            <p className="text-[#3d5068] text-sm mt-1">{u.bio || 'No bio available'}</p>
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="text-center bg-blue-500/10 px-4 py-2.5 rounded-xl">
              <p className="text-blue-400 text-xl font-extrabold tracking-tight m-0">{u.public_repos ?? '—'}</p>
              <p className="text-[#3d5068] text-[10px] uppercase tracking-widest mt-0.5">Repos</p>
            </div>
            <div className="text-center bg-purple-500/10 px-4 py-2.5 rounded-xl">
              <p className="text-purple-400 text-xl font-extrabold tracking-tight m-0">{u.followers ?? '—'}</p>
              <p className="text-[#3d5068] text-[10px] uppercase tracking-widest mt-0.5">Followers</p>
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
              className="bg-[#0f1420] rounded-2xl p-5 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <p className="text-[#e2e8f0] text-sm font-bold m-0">{repo.name}</p>
                {repo.language && (
                  <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${lc.text} ${lc.bg} px-2.5 py-0.5 rounded-full`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="text-[#3d5068] text-xs leading-relaxed mt-2 flex-1 min-h-[36px]">
                {repo.description || 'No description provided'}
              </p>
              <div className="mt-3 bg-[#141b2d] rounded-lg px-3 py-2.5 flex justify-between items-center">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full"> Active</span>
                <motion.a
                  href={repo.html_url} target="_blank" rel="noreferrer"
                  whileHover={{ x: 2 }}
                  className="text-xs text-blue-400 no-underline font-semibold"
                >
                  Open →
                </motion.a>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Active Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#0f1420] rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-purple-400 text-sm">◈</span>
            <p className="text-[#3d5068] text-[11px] font-bold uppercase tracking-widest m-0">Active Tasks</p>
          </div>
          {repos.repos.slice(0, 4).map((repo, i) => (
            <div
              key={repo.id}
              className={`flex justify-between items-center px-2 py-2.5 rounded-lg ${i % 2 !== 0 ? 'bg-[#141b2d]' : ''}`}
            >
              <div>
                <p className="text-[#e2e8f0] text-sm font-medium m-0">{repo.name}</p>
                <p className="text-[#3d5068] text-[11px] mt-0.5">{repo.language || 'Unknown'}</p>
              </div>
              <span className="text-[11px] font-bold text-blue-400 bg-blue-400/10 px-2.5 py-0.5 rounded-full">
                In Progress
              </span>
            </div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4 }}
          className="bg-[#0f1420] rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-emerald-400 text-sm">◈</span>
            <p className="text-[#3d5068] text-[11px] font-bold uppercase tracking-widest m-0">Recent Activity</p>
          </div>
          {[
            { msg: 'Initial commit',       time: '2h ago', glow: 'shadow-blue-400',   dot: 'bg-blue-400'    },
            { msg: 'Fixed bug in API',      time: '5h ago', glow: 'shadow-emerald-400',dot: 'bg-emerald-400' },
            { msg: 'Improved performance',  time: '1d ago', glow: 'shadow-yellow-400', dot: 'bg-yellow-400'  },
            { msg: 'Updated dependencies',  time: '2d ago', glow: 'shadow-red-400',    dot: 'bg-red-400'     },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-lg ${i % 2 !== 0 ? 'bg-[#141b2d]' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${item.dot} shadow-[0_0_7px] ${item.glow}`} />
              <p className="text-[#e2e8f0] text-sm flex-1 m-0">{item.msg}</p>
              <span className="text-[11px] text-[#3d5068] bg-[#141b2d] px-2 py-0.5 rounded-full">{item.time}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}

export default Home



