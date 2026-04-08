import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useEffect } from "react";
import { connectSocket } from "../socket/socket";
import { useSelector } from "react-redux";
import { useSocketEvents } from "../hooks/useSocketEvents";

const DashboardOutlet = () => {
  const token = localStorage.getItem("access_token");
  

  if (!token) return <Navigate to="/" />;
  const user = useSelector((state) => state.user.user)
useSocketEvents()

  useEffect(()=>{

    if (!user || user === undefined) {
      return 
    }

connectSocket(user._id)
  },[user])

  return (
    <div className="flex bg-bg-gray-950 max-w-full max-h-full">
      <div className="max-h-screen ">
        <Sidebar />
      </div>
      <div className="flex-1 w-full max-h-screen overflow-y-auto custom-scroll">
        <Header />
        <Outlet />
      </div>
    </div>

  )

};

export default DashboardOutlet
