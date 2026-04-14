import { useDispatch } from "react-redux";
import { addNewCommit } from "../store/slices/projectCommitsSlice";
import { getSocket } from "../socket/socket";
import { useEffect } from "react";

const logger = (message, data) => {
    console.log(`[useCommitsEvents] ${message}`, data);
};

const useCommitsEvents = (projectId) => {
        const dispatch = useDispatch();
        const socket = getSocket();
        
        useEffect(() => {
            if (!socket) {
                logger("Socket not available", null);
                return;
            }

            const handleNewCommit = (data) => {
                logger("New commit received", { projectId, commit: data.commit });
                dispatch(addNewCommit(data.commit));
            };

            logger("Joining project", projectId);
            socket.emit("project_join", projectId);
            socket.on("new_commit", handleNewCommit);

            return () => {
                logger("Cleaning up listener", null);
                socket.off("new_commit", handleNewCommit);
            };
        }, [socket, projectId, dispatch]);
};

export default useCommitsEvents;