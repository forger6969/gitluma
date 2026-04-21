// socket.js
import { io } from "socket.io-client"

let socket;
let isConnecting = false; // 👈 флаг

export const connectSocket = (userId) => {
    if (socket?.connected || isConnecting) return; // 👈 блокируем повторный вызов
    
    isConnecting = true;

    socket = io(import.meta.env.VITE_API_URL, {
        query: { userId }
    });

    socket.on("connect", () => {
        isConnecting = false;
        console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
        isConnecting = false;
        console.log("Socket connection error:", err.message);
    });
}


export const getSocket = () => socket;