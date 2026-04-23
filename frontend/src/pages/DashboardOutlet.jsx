import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { connectSocket } from "../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { useSocketEvents } from "../hooks/useSocketEvents";
import { getProjects } from "../store/slices/projectsSlice";
import { CreateProjectProvider, useCreateProject } from "../context/CreateProjectContext";
import RepoPickerModal from "../Components/RepoPickerModal";

function DashboardLayout() {
  const token = localStorage.getItem("access_token");
  const user = useSelector((state) => state.user.user);
  const [socketReady, setSocketReady] = useState(false);
  const dispatch = useDispatch();
  const { isOpen } = useCreateProject();

  const { mode } = useSelector((s) => s.theme);
  const d = mode === "dark";

  useEffect(() => {
    const userId = user?.user?._id || user?._id || localStorage.getItem("user_id");
    if (!userId) return;
    connectSocket(userId);
    setSocketReady(true);
  }, [user?._id, user?.user?._id]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useSocketEvents(socketReady);

  if (!token) return <Navigate to="/" />;

  return (
    <div className={`flex max-w-full max-h-full ${d ? "bg-[#0B0F19]" : "bg-[#F7F8FC]"}`}>
      <div className="max-h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 w-full max-h-screen overflow-y-auto custom-scroll">
        <Header />
        <Outlet />
      </div>
      {isOpen && <RepoPickerModal />}
    </div>
  );
}

export default function DashboardOutlet() {
  return (
    <CreateProjectProvider>
      <DashboardLayout />
    </CreateProjectProvider>
  );
}
