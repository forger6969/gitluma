import { useDispatch } from "react-redux";
import { addNewCommit } from "../store/slices/projectCommitsSlice";
import { getSocket } from "../socket/socket";
import { useEffect } from "react";

const useCommitsEvents = (projectId) => {
    const dispatch = useDispatch();

  useEffect(() => {
    if (!projectId) return;

    const socket = getSocket();
    if (!socket) return;

    const joinRoom = () => {
      socket.emit("project_join", projectId);
      console.log("Joined project room:", projectId);
    };

    // если уже подключён — заходим сразу, иначе ждём connect
    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    const handleNewCommit = (data) => {
      console.log("New commit received:", data);
      dispatch(addNewCommit(data.commit));
    };

    socket.on("new_commit", handleNewCommit);

    return () => {
      socket.off("connect", joinRoom);
      socket.off("new_commit", handleNewCommit);
    };
  }, [projectId]);
};

export default useCommitsEvents;
