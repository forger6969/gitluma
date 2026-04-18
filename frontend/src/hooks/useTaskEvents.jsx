import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSocket } from "../socket/socket";
import { putTask } from "../store/slices/taskSlice";

const useTaskEvents = (projectId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!projectId) return;

    const socket = getSocket();
    if (!socket) return;

    const handlePutTask = (data) => {
      dispatch(putTask(data));
    };

    if (socket.connected) {
      socket.on("put_task", handlePutTask);
    } else {
      const onConnect = () => socket.on("put_task", handlePutTask);
      socket.once("connect", onConnect);
      return () => {
        socket.off("connect", onConnect);
        socket.off("put_task", handlePutTask);
      };
    }

    return () => {
      socket.off("put_task", handlePutTask);
    };
  }, [projectId]);
};

export default useTaskEvents;
