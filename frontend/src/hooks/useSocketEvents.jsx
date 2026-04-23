import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../socket/socket";
import { addNotification } from "../store/slices/notificationSlice";

export const useSocketEvents = (socketReady) => {
  const user = useSelector((state) => state.user.user);
const dispatch = useDispatch()

  useEffect(() => {
    const socket = getSocket();
    const userId = user?.user?._id || user?._id;
    if (!socket || !userId) return;

    const handleNotification = (data) => {
      dispatch(addNotification(data))
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [user, socketReady, dispatch]);
};