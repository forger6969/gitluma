import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'

const CommitDetails = () => {
  const {  id } = useParams()
  const [commit, setCommit] = useState(null)

  useEffect(() => {
    const fetchCommit = async () => {
      try {
        const res = await api.get(`/api/project/commits/${id}`)
        setCommit(res.data.project.commits)
        console.log(commit);
        
      } catch (err) {
        console.error(err)
      }
    }
    fetchCommit()
  }, [ index])

  if (!commit) return <p className='text-[#DFE2EB]'>Loading commit details...</p>

  return (
    <div className='w-[90%] mx-auto text-[#DFE2EB]'>
      <h1 className='text-[28px] font-[800] my-[20px]'>
        Commit Details
      </h1>
      <p><strong>Author:</strong> {commit.author_username}</p>
      <p><strong>Date:</strong> {commit.commit_date}</p>
      <p><strong>Message:</strong> {commit.message}</p>

    </div>
  )
}

export default CommitDetails
