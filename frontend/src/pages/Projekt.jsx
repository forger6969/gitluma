import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
const Projekt = () => {

const projects = useSelector((state)=> state.projects.projects)
const loading = useSelector((state)=> state.projects.loading)

useEffect(()=>{
console.log(projects);

},[projects])

    return (
        <div className='flex-1 h-[91%] bg-gray-950 flex justify-center items-center '>

            laskjdlaksd
        </div>
    )
}

export default Projekt