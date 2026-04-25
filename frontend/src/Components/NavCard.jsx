import React from 'react'
import check from '../assets/check.png'

const NavCard = ({ name, taskNumber, info }) => {
  return (
    <div className='w-[100%] bg-[#181C22] flex gap-[50px] items-center bg-base-200/60 border border-base-300 rounded-xl px-4 py-4 mb-4'>
       <div className='w-[50px] items-center flex flex-col rounded-[20%] bg-[#9E540033] h-[50px]'>
            <img className='mx-auto w-[25px] my-auto' src={check} alt="icon" />
       </div>

       <div className='w-[90%]'>
        <div className='flex items-center gap-[30px]'>
         <h1 className='text-[16px] text-[#DFE2EB] font-[600]'>
           {name} finished
         </h1>

         <div className="badge badge-soft text-[#ADC6FF] bg-[#0067D71A] w-fit p-[5px] rounded-[10px] badge-info">
           TASK-{taskNumber}
         </div>
       </div>

        <p className='text-[#474553] text-[14px] font-[400]'>
          {info}
        </p>
       </div>
    </div>
  )
}

export default NavCard