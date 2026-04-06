import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userFetch } from '../store/slices/userSlice'
import api from '../api/api'
import { motion, AnimatePresence } from 'framer-motion'
import { reposFetch } from '../store/slices/repoSlices'

const Home = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector(state => state.user)
  const repos = useSelector((state)=> state.repos)

  // Получаем данные пользователя
  useEffect(() => {
    dispatch(userFetch())
    dispatch(reposFetch())
  }, [dispatch])


  const handleCreateProject = () => {
    alert('Функция создания проекта пока не реализована')
  }

  if (loading) return <LoadingDark message="Загрузка профиля..." />
  if (error) return <div className="text-red-400 p-10 text-center">hato</div>
  if (!user) return null

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 space-y-6">
      {/* Профиль пользователя */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <img
          src={user.avatar_url}
          alt={user.username}
          className="w-24 h-24 rounded-full border-2 border-gray-700"
        />
        <div className="flex-1 space-y-1">
          <h1 className="text-2xl font-bold">{user.name || user.username}</h1>
          <p className="text-gray-300">{user.bio || "Описание отсутствует"}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
        <button
          onClick={handleCreateProject}
          className="ml-auto bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded text-white font-medium"
        >
          Создать проект
        </button>
      </motion.div>

      {/* Репозитории */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Ваши репозитории</h2>

        {repos.loading ? (
          <LoadingDark message="Загрузка репозиториев..." />
        ) : repos.repos.length === 0 ? (
          <p className="text-gray-400">Репозитории не найдены</p>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence>
              {repos.repos.map(repo => (
                <motion.li
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 border border-gray-700 rounded hover:bg-gray-700 flex justify-between items-center transition"
                >
                  <div>
                    <h3 className="font-medium">{repo.name}</h3>
                    <p className="text-gray-400 text-sm">{repo.description || "Описание отсутствует"}</p>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Открыть
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  )
}

// Компонент спиннера для загрузки
const LoadingDark = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-300">{}</p>
  </div>
)

export default Home