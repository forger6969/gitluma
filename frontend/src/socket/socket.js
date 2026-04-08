import {io} from "socket.io-client"

let socket;


export const connectSocket = async (userId)=>{

    socket = io(import.meta.env.VITE_API_URL , {
        query:{
            userId
        }
    })

}

export const getSocket = ()=> socket