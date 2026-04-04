import { Navigate, Outlet } from "react-router-dom";

const DashboardOutlet = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return <Navigate to="/" />;

  return (
    <div>
      <Outlet />
    </div>

  )

};

export default DashboardOutlet
