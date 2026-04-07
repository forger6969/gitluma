import React from 'react'
import img from '../assets/code.png'
import bgimg from '../assets/bg.png'
const Landing = () => {
  return (
    <div>
 <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] to-[#0d1323] text-white">


<div className="flex items-center justify-between px-10 py-5">
  <h1 className="text-lg font-semibold">GitLuma</h1>

  <div className="flex gap-8 text-gray-400 text-sm">
    <p className="hover:text-white cursor-pointer">Platform</p>
    <p className="hover:text-white cursor-pointer">Documentation</p>
    <p className="hover:text-white cursor-pointer">Changelog</p>
  </div>

  <button className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
    Sign In
  </button>
</div>


<div className="flex flex-col items-center text-center mt-20 px-4">


  <div className="bg-gray-800 text-gray-300 text-xs px-4 py-1 rounded-full mb-6">
    BETA 2.0 NOW LIVE
  </div>

 
  <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
    Manage tasks <br />
    via{" "}
    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      commits
    </span>
  </h1>


  <p className="text-gray-400 mt-6 max-w-xl">
    Just add a task ID to your commit — we'll handle the rest.
    Sync your workflow directly from your terminal to the dashboard.
  </p>


  <div className="flex gap-4 mt-8">
    <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-xl font-medium hover:opacity-90">
      Continue with GitHub
    </button>

    <button className="bg-gray-800 px-6 py-3 rounded-xl hover:bg-gray-700">
      View Documentation
    </button>
  </div>


  <div className="mt-16 bg-[#0a0f1c] border border-gray-800 rounded-xl w-full max-w-2xl text-left p-5 shadow-xl">
    <p className="text-gray-500 text-sm mb-2">zsh • kinetic-cli</p>

 <img src={img} alt="" />
  </div>

</div>
</div>


<div className="bg-[#0b0f19] text-white py-20 px-6">

<div className="max-w-6xl mx-auto">

  
  <div className="mb-12">
    <h2 className="text-3xl font-semibold">How it works</h2>
    <p className="text-gray-400 mt-2">
      The modern workflow for teams who live in the terminal
      and dream in clean UI.
    </p>
  </div>


  <div className="grid md:grid-cols-3 gap-6 mb-10">

  
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition">
      <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-lg mb-4">
        
      </div>
      <p className="text-xs text-gray-400 mb-2">PHASE 01</p>
      <h3 className="text-lg font-semibold mb-2">Create task</h3>
      <p className="text-gray-400 text-sm">
        Define your objective in the dashboard. Every task gets a unique ID.
      </p>
    </div>

   
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition">
      <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-lg mb-4">
        
      </div>
      <p className="text-xs text-gray-400 mb-2">PHASE 02</p>
      <h3 className="text-lg font-semibold mb-2">Commit with ID</h3>
      <p className="text-gray-400 text-sm">
        Prefix commit messages with task ID. Everything syncs automatically.
      </p>
    </div>

    
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition">
      <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-lg mb-4">
       
      </div>
      <p className="text-xs text-gray-400 mb-2">PHASE 03</p>
      <h3 className="text-lg font-semibold mb-2">Team Lead reviews</h3>
      <p className="text-gray-400 text-sm">
        All commits and PRs are visible in one place for review.
      </p>
    </div>

  </div>

  
  <div className="grid md:grid-cols-2 gap-6">

   
    <div className="relative rounded-2xl overflow-hidden border border-gray-800">

      <img
        src={bgimg}
        alt="IDE"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute bottom-6 left-6">
        <h2 className="text-xl font-semibold">
          Integrated IDE Experience
        </h2>
        <p className="text-gray-300 text-sm mt-1">
          Built for developers, by developers.
        </p>
      </div>

    </div>

    
    <div className="bg-[#13233a] rounded-2xl p-6 flex flex-col justify-end border border-blue-500/30 hover:border-blue-400 transition">
      <h2 className="text-xl font-semibold">
        Commit Analytics
      </h2>
      <p className="text-gray-300 text-sm mt-2">
        Track velocity and throughput directly from your git history.
      </p>
    </div>

  </div>

</div>
</div>


<div className="bg-[#0b0f19] text-white">


<div className="text-center py-20 px-6 border-b border-gray-800">
  <h2 className="text-3xl font-semibold mb-6">
    Ready to streamline your commits?
  </h2>

  <button className="bg-gradient-to-r from-purple-400 to-indigo-500 px-8 py-3 rounded-xl font-medium hover:opacity-90">
    Get Started Free
  </button>
</div>


<div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">


  <div>
    <h1 className="text-lg font-semibold mb-4">
      Gitluma
    </h1>
    <p className="text-gray-400 text-sm">
      Automating project management for technical teams.
      Built on the edge of Git and productivity.
    </p>
  </div>

 
  <div>
    <h3 className="text-sm text-gray-400 mb-4">Platform</h3>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-white cursor-pointer">Features</li>
      <li className="hover:text-white cursor-pointer">Integrations</li>
      <li className="hover:text-white cursor-pointer">Pricing</li>
      <li className="hover:text-white cursor-pointer">CLI Tool</li>
    </ul>
  </div>

 
  <div>
    <h3 className="text-sm text-gray-400 mb-4">Company</h3>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-white cursor-pointer">About</li>
      <li className="hover:text-white cursor-pointer">Careers</li>
      <li className="hover:text-white cursor-pointer">Contact</li>
      <li className="hover:text-white cursor-pointer">Privacy</li>
    </ul>
  </div>


  <div>
    <h3 className="text-sm text-gray-400 mb-4">Connect</h3>

  
    <div className="flex gap-3 mb-6">
      <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
      <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
      <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
    </div>

    <p className="text-xs text-gray-500 mb-1">SYSTEM STATUS</p>
    <p className="text-sm text-yellow-400">
      • All Systems Operational
    </p>
  </div>

</div>


<div className="border-t border-gray-800 text-center text-gray-500 text-sm py-6">
  © 2024 Gitluma. All rights reserved.
</div>

</div>

    </div>
  )
}

export default Landing