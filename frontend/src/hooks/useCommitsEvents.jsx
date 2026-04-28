import { useDispatch } from "react-redux";
import { addNewCommit } from "../store/slices/projectCommitsSlice";
import { getSocket } from "../socket/socket";
import { useEffect } from "react";

const useCommitsEvents = (projectId) => {
    const dispatch = useDispatch();
    const socket = getSocket()
  useEffect(() => {
    if (!socket) return;

    const handleNewCommit = (data) => {
      console.log("New commit received for project", projectId, data);
dispatch(addNewCommit(data.commit))
    };

    socket.on("new_commit", handleNewCommit);

    return () => {
      socket.off("new_commit", handleNewCommit);
    };
  }, [socket, projectId]);
};

export default useCommitsEvents;  