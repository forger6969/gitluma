import { useSelector , useDispatch } from "react-redux";
import { getSocket } from "../socket/socket";
import { useEffect } from "react";

export const useSocketEvents = ()=>{

    const socket = getSocket()
    const user = useSelector((state) => state.user.user)

  
    
    console.log(user);
    

    useEffect(()=>{

          if (!socket) {
        return
    }

     socket.on("notification", (data)=>{
console.log(data);
     })

    },[])

}
