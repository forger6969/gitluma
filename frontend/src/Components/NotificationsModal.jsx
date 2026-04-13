import React from 'react'

const NotificationsModal = ({notifications}) => {

console.log(notifications);

  return (
    <div>
      
      <div className='bg-white rounded-2xl w-fit p-2'>

{notifications?.map((m)=>{
    
return(
    <div key={Date.now}>
<p className='text-black'>{m}</p>
    </div>
)
})}
      </div>
    </div>
  )
}

export default NotificationsModal
