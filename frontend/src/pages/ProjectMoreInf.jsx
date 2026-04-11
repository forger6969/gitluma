import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Link, useParams } from 'react-router-dom'
import check from '../assets/check.png'

const ProjectMoreInf = () => {
  const [projectInfo, setProjectInfo] = useState(null)
  const {id} = useParams()


  let func = async () => {

    try {
     let info = await api.get(`/api/project/${id}`)
setProjectInfo(info.data.project.commits)
console.log(info.data);


    } catch (err) {
      console.log(err)
    }
  }
    console.log(projectInfo);

  useEffect(() => {
    func()
  }, [])

  return (
    <div className='w-[95%] max-w-full mx-auto'>
      <h1 className='text-[#DFE2EB] text-[36px] font-[800] my-[20px]'>
        Recent Commits
      </h1>

      <div className='flex flex-col my-[20px] gap-5'>
        {projectInfo && projectInfo.map((item) => (
          <div key={item._id}>
            <div className='w-full bg-[#181C22] flex gap-[50px] items-center border border-base-300 rounded-xl px-4 py-4 mb-4'>
              
              <div className='w-[50px] flex items-center justify-center rounded-[20%] bg-[#9E540033] h-[50px]'>
                <img className='w-[25px]' src={check} alt="icon" />
              </div>

              <div  className=' flex justify-between w-full items-center '>
                <div>
                  <h2 className='text-[16px] text-[#DFE2EB]'>
                  Nickname: {item.author_username}
                </h2>
                <p className='text-[#474553] text-[14px]'>
                  Date: {item.commit_date}
                </p>
                </div>
                <div>
                  <Link
          to={`moreInf/:${item.id}`}
          className='text-blue-400 underline text-sm'
        >
          View details
        </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectMoreInf