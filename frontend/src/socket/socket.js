import {io} from "socket.io-client"

let socket;

export const connectSocket = (userId)=>{
    if (socket?.connected) return;

    socket = io(import.meta.env.VITE_API_URL , {
        query:{
            userId
        }
    })

    socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.log("Socket connection error:", err.message);
    });
}

export const getSocket = ()=> socket