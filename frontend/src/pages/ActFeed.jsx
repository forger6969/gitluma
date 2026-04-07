import React from 'react'
import NavCard from '../components/NavCard';
import EnfOfHistory from '../components/EnfOfHistory';
import NewMember from '../components/NewMember'
import Error from '../components/Error';

const ActFeed = () => {
  return (
    <div className='bg-[#10141A] py-[20px] '>
      <div className='mx-auto w-[90%] max-w-full '>
        <div className='badge text-[#ADC6FF] bg-[#0067D71A] font-[JetBrainsMono] w-fit p-[5px] rounded-[10px] badge-soft badge-info'>
        𝚂𝚢𝚜𝚝𝚎𝚖.𝚕𝚘𝚐𝚜
      </div>
      <h1 className='text-[#DFE2EB] text-[36px] font-[800] '>
       Activity Feed
      </h1>
      <p className=' text-[#C8C4D6] text-[16px] mb-[25px]  font-[600] '>
        Real-time updates across all workspace monoliths and developer streams.
      </p>
      <p className=' text-[#474553] font-[700] my-[20px] '>Today — March 24</p>
      <NavCard/>
      <NewMember/>
      <Error/>

      <p className=' text-[#474553] font-[700] my-[20px] '>Yesterday — March 23</p>
      <NavCard/>
      <Error/>
<div className='w-full items-center flex flex-col gap-[20px]'>
    <EnfOfHistory className='mx-auto'/>

</div>

      </div>
    </div>
    
  );
};



export default ActFeed
