import { Navigate, Outlet, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { connectSocket } from "../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { useSocketEvents } from "../hooks/useSocketEvents";
import { getNotifications } from "../store/slices/notificationSlice";
import api from "../api/api";

const DashboardOutlet = () => {
  const token = localStorage.getItem("access_token");
  const user = useSelector((state) => state.user.user);
  const notifications = useSelector((state)=> state.notifications.notifications)
  const [socketReady, setSocketReady] = useState(false);
  const dispatch = useDispatch()


  useEffect(() => {
    const userId = user?.user?._id || user?._id;
    if (!userId) return;

    connectSocket(userId);
    setSocketReady(true);
  }, [user]);

useEffect(()=>{
  console.log(notifications);
},[notifications])  

useEffect(()=>{
dispatch(getNotifications())
},[])

  useSocketEvents(socketReady);

  if (!token) return <Navigate to="/" />;
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
  );
};

export default DashboardOutlet;