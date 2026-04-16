import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userFetch } from '../store/slices/userSlice'
import { reposFetch } from '../store/slices/repoSlices'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'




const langColors = {
  JavaScript: { text: 'text-[#7C4F00]', bg: 'bg-[#FFF3D6]',  dot: 'bg-[#F5A623]' },
  TypeScript:  { text: 'text-[#1A4B8C]', bg: 'bg-[#DAE9FF]',  dot: 'bg-[#3B82F6]' },
  Python:      { text: 'text-[#1C5C3A]', bg: 'bg-[#D4F0E1]',  dot: 'bg-[#22C55E]' },
  Rust:        { text: 'text-[#7A2E10]', bg: 'bg-[#FFE5DA]',  dot: 'bg-orang' },
  Go:          { text: 'text-[#0C4A5A]', bg: 'bg-[#CBF0F9]',  dot: 'bg-[#06B6D4]' },
  Swift:       { text: 'text-[#7A2E10]', bg: 'bg-[#FFE5DA]',  dot: 'bg-[#F97316]' },
}
const defaultLang = { text: 'text-[#1A4B8C]', bg: 'bg-[#DAE9FF]', dot: 'bg-[#3B82F6]' }

const Skeleton = ({ className = '' }) => (
  <div className={`rounded-md animate-pulse bg-[#D8DCE8] ${className}`} />
)

const SkeletonScreen = () => (
  <div className="bg-[#EEF1F7] min-h-screen p-6 flex flex-col gap-4 font-sans">
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-44 h-5" />
        <Skeleton className="w-24 h-3" />
      </div>
      <Skeleton className="w-32 h-10 rounded-xl" />
    </div>
    <div className="bg-white rounded-2xl p-5 border border-[#D8DCE8]">
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
        <div key={i} className="bg-white rounded-2xl p-5 flex flex-col gap-2 border border-[#D8DCE8]">
          <Skeleton className="w-3/5 h-4" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-4/5 h-3" />
        </div>
      ))}
    </div>
  </div>
)

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
    <div className="bg-[#EEF1F7] min-h-screen p-6 font-sans">
      <p className="text-[#C04A2E]">{error}</p>
    </div>
  )
  if (!user) return null

  const u = user.user

  return (
    <div className="bg-[#EEF1F7]  px-5 py-7 flex flex-col gap-4 font-sans">

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-sini text-xl font-bold tracking-tight m-0">Workspace</h1>
          <p className="text-seri text-sm mt-1">{repos?.repos?.length} repositories</p>
        </div>
     <Link to={'/dashboard/create'}>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="bg-orang hover:bg-[#D4553A] active:bg-[#BF4A31]
                     transition-colors text-white text-sm font-semibold
                     px-5 py-2.5 rounded-md cursor-pointer border-none"
        >
          Create Project  
        </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07, duration: 0.4 }}
        className="bg-white rounded-lg p-5 border border-[#D8DCE8]"
      >
        <div className="flex items-center gap-4">

          <div className="relative shrink-0">

            <img
              src={u.avatar_url} alt=""
              className="relative w-18 h-18 rounded-full block border-3 border-orang"
            />
          </div>

          <div className="flex-1">
            <p className="text-sini text-base font-bold m-0">{u?.username || u?.login}</p>
            <p className="text-seri text-sm mt-1">{u?.bio || 'No bio available'}</p>
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="text-center bg-[#FFE5DA] px-4 py-2.5 rounded-lg">
              <p className="text-orang text-xl font-extrabold tracking-tight m-0">{u.public_repos ?? '—'}</p>
              <p className="text-seri text-[10px] uppercase tracking-widest mt-0.5">Repos</p>
            </div>
            <div className="text-center bg-[#E5E8F0] px-4 py-2.5 rounded-lg">
              <p className="text-sini text-xl font-extrabold tracking-tight m-0">{u.followers ?? '—'}</p>
              <p className="text-seri text-[10px] uppercase tracking-widest mt-0.5">Followers</p>
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
              className="bg-white rounded-lg p-5 flex flex-col border border-[#D8DCE8]"
            >
              <div className="flex justify-between items-start">
                <p className="text-sini text-sm font-bold m-0">{repo.name}</p>
                {repo?.language && (
                  <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${lc.text} ${lc.bg} px-2.5 py-0.5 rounded-full`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
                    {repo?.language}
                  </span>
                )}
              </div>
              <p className="text-seri text-xs leading-relaxed mt-2 flex-1 min-h-[36px]">
                {repo?.description || 'No description provided'}
              </p>
              <div className="mt-3 bg-[#EEF1F7] rounded-md px-3 py-2.5 flex justify-between items-center">
                <span className="text-[11px] font-bold text-[#1C5C3A] bg-[#D4F0E1] px-2.5 py-0.5 rounded-full">Active</span>
                <motion.a
                  href={repo?.html_url} target="_blank" rel="noreferrer"
                  whileHover={{ x: 2 }}
                  className="text-xs text-orang no-underline font-semibold"
                >
                  Open →
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
          className="bg-white rounded-lg p-5 border border-[#D8DCE8]"
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-orang text-sm">◈</span>
            <p className="text-seri text-[11px] font-bold uppercase tracking-widest m-0">Active Tasks</p>
          </div>
          {repos?.repos?.slice(0, 4).map((repo, i) => (
            <div
              key={repo?.id}
              className={`flex justify-between items-center px-2 py-2.5 rounded- md${i % 2 !== 0 ? 'bg-[#EEF1F7]' : ''}`}
            >
              <div>
                <p className="text-sini text-sm font-medium m-0">{repo?.name}</p>
                <p className="text-seri text-[11px] mt-0.5">{repo?.language || 'Unknown'}</p>
              </div>
              <span className="text-[11px] font-bold text-[#7A2E10] bg-[#FFE5DA] px-2.5 py-0.5 rounded-full">
                In Progress
              </span>
            </div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4 }}
          className="bg-white rounded-lg p-5 border border-[#D8DCE8]"
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-sini text-sm">◈</span>
            <p className="text-seri text-[11px] font-bold uppercase tracking-widest m-0">Recent Activity</p>
          </div>
          {[
            { msg: 'Initial commit',      time: '2h ago', dot: 'bg-orang', glow: '#E8654A' },
            { msg: 'Fixed bug in API',     time: '5h ago', dot: 'bg-[#22C55E]', glow: '#22C55E' },
            { msg: 'Improved performance', time: '1d ago', dot: 'bg-[#F5A623]', glow: '#F5A623' },
            { msg: 'Updated dependencies', time: '2d ago', dot: 'bg-sini', glow: '#2B3141' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-lg ${i % 2 !== 0 ? 'bg-[#EEF1F7]' : ''}`}
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${item.dot}`}
                style={{ boxShadow: `0 0 6px ${item.glow}80` }}
              />
              <p className="text-sini text-sm flex-1 m-0">{item.msg}</p>
              <span className="text-[11px] text-seri bg-[#EEF1F7] px-2 py-0.5 rounded-full">{item.time}</span>
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



