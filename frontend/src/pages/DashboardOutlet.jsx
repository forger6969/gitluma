import { Navigate, Outlet, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { connectSocket } from "../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { useSocketEvents } from "../hooks/useSocketEvents";
import { getNotifications } from "../store/slices/notificationSlice";
import api from "../api/api";
import { getProjects } from "../store/slices/projectsSlice";
import TooManyRequestsModal from "../Components/TooManyRequests"
import RateLimitSkeleton from "../Components/RateLimitSkeleton";
import { userFetch } from "../store/slices/userSlice";
import { reposFetch } from "../store/slices/repoSlices";
const DashboardOutlet = () => {
  const token = localStorage.getItem("access_token");
  const user = useSelector((state) => state.user.user);
  const notifications = useSelector((state) => state.notifications.notifications)
  const [socketReady, setSocketReady] = useState(false);
  const dispatch = useDispatch()

  const { mode } = useSelector((s) => s.theme);
  const d = mode === "dark";
  useEffect(() => {
    const userId = user?.user?._id || user?._id || localStorage.getItem("user_id");
    if (!userId) return;

    connectSocket(userId);
    setSocketReady(true);
  }, [user?._id, user?.user?._id]);

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  const userState = useSelector((s) => s.user)
  const reposState = useSelector((s) => s.repos)
  const notificationsState = useSelector((s) => s.notifications)
  const { active } = useSelector((s) => s.rateLimit)

  useEffect(() => {
    if (active) return
    if (!userState?.loaded && !userState?.loading) dispatch(userFetch())
    if (!reposState?.loaded && !reposState?.loading) dispatch(reposFetch())
    if (!notificationsState?.loaded && !notificationsState?.loading) {
      dispatch(getNotifications())
    }
  }, [
    dispatch,
    userState?.loaded, userState?.loading,
    reposState?.loaded, reposState?.loading,
    notificationsState?.loaded, notificationsState?.loading,
    active
  ])


  useSocketEvents(socketReady);

  if (!token) return <Navigate to="/" />;
  return (
    <div className={`flex max-w-full max-h-full ${d ? 'bg-[#0B0F19]' : 'bg-[#F7F8FC]'}`}>
      <div className="max-h-screen ">
        <Sidebar />
      </div>
      <div className="flex-1 w-full max-h-screen overflow-y-auto custom-scroll">
        <Header />
        <div className="pt-18">
          {active ? (
            <>
              <TooManyRequestsModal />
              <RateLimitSkeleton />
            </>
          ) : (
            <Header/>,
            <Outlet />
          )}
        </div>
      </div>

    </div>
  );
};

export default DashboardOutlet;