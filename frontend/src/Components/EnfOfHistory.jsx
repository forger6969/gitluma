import React from 'react'
import history from '../assets/Container.png'

const EnfOfHistory = () => {
  return (
    <div>
        <div className='w-[400px] py-[20px]   my-[60px]  bg-[#31353C99] gap-[20px] flex flex-col items-center bg-base-200/60 border border-base-300 rounded-xl px-4 py-4 mb-4'>
<div className='w-[50px] items-center flex flex-col   rounded-[20%] bg-[#31353C] h-[50px]'>
            <img className='mx-auto my-auto w-[25px]' src={history} alt="icon" />
       </div>

            <h1 className='text-[#DFE2EB] text-[18px] font-bold  '>End of recent history</h1>
            <p className='text-[12px] text-[#474553] font-[400] mx-auto text-center '>You've reached the end of your recent notifications.
Archives older than 30 days are stored in the data
monolith.</p>
            <h3 className='text-[#ADC6FF] text-[14px] font-[600] '>View Full Archives</h3>
        </div>
    </div>
  )
}

export default EnfOfHistory