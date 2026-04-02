import React from 'react'
import alex from "../assets/Alex Monolith.png"

const Profile = () => {
  return (
    <div>
      <div className='flex  '>
        <img width={160} src={alex} alt="img" />

        <div id="texts">
          <div>
            <p className='font-extrabold text-[48px] text-[#DFE2EB] '>Alex Monolith</p>
            <div>
              <p className='text-[#ADC6FF] font-normal text-[10px] w-[89px] border-dashed border-[2px] '>Lead Architect</p>
            </div>
          </div>
        </div>

        <div>
          <button></button>
          <button></button>
        </div>

      </div>
    </div>
  )
}

export default Profile