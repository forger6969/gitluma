import React, { useState } from 'react'
import NavCard from '../components/NavCard';
import EnfOfHistory from '../components/EnfOfHistory';
import NewMember from '../components/NewMember'
import Error from '../components/Error';

const ActFeed = () => {
  let today = new Date();
  let options = { month: 'long', day: 'numeric' };
  let formattedDate = today.toLocaleDateString('en-US', options);
  let [name, setName] = useState('');
  let [taskNumber, setTaskNumber] = useState('');
  let [info, setInfo] = useState('');

let [activities, setActivities] = useState([]);

let btnClick = () => {
  if (name && taskNumber && info) {
    const newActivity = {
      name,
      taskNumber,
      info
    };

    setActivities([...activities, newActivity]);

    setName('');
    setTaskNumber('');
    setInfo('');
  } else {
    alert('Please fill all the fields');
  }
}
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
      {activities.map((item, index) => (
  <NavCard
    key={index}
    name={item.name}
    taskNumber={item.taskNumber}
    info={item.info}
  />
))}
      <NewMember/>
      <Error/>

      <p className=' text-[#474553] font-[700] my-[20px] '>Yesterday — March 23</p>
      <Error/>
       <NewMember/>

<div className='w-full items-center flex flex-col gap-[20px]'>
    <EnfOfHistory className='mx-auto'/>

</div>
<h1 className='text-[#DFE2EB] text-[26px] my-[50px] font-[800] '>
       Add New Activity
      </h1>
<div className='flex flex-col gap-1 '>
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title font-semibold">Enter Your Name</div>
  <div className="collapse-content text-sm">
    <input onChange={(e) => setName(e.target.value)} className='input input-primary' placeholder='Enter Your Name' type="text" />
  </div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">Task number</div>
  <div className="collapse-content text-sm">
    <input onChange={(e) => setTaskNumber(e.target.value)} className='input input-primary' type="text" placeholder="Enter task number" />
  </div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div  className="collapse-title font-semibold">Input Description</div>
  <div className="collapse-content text-sm">
    <input onChange={(e) => setInfo(e.target.value)} className='input input-primary' type="text" placeholder="Enter your info" />
  </div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">Send</div>
  <div className="collapse-content text-sm"><button onClick={btnClick} className='btn btn-primary'>Send</button></div>
</div>
</div>
      </div>
      
    </div>
    
  );
};



export default ActFeed
