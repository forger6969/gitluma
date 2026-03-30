import React from 'react'
import axios from "axios"

const Login = () => {

    const loginWithGithub = async ()=>{
      
         window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
    }

  return (
    <div>
      <button onClick={loginWithGithub} className='bg-black rounded text-white'>Login with github</button>
    </div>
  )
}

export default Login
