import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const DashboardOutlet = () => {
  const token = localStorage.getItem("access_token");
  

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

  )

};

export default DashboardOutlet
