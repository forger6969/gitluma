let ioInstance = null

const initSocket = (io)=>{

    ioInstance = io


    io.on("connection" , (socket)=>{
        const userId = socket.handshake.query.userId
        console.log("User connected:" , socket.id, "userId:", userId);
        socket.join(userId)

        socket.on("disconnect" , ()=>{
            console.log("user disconnected:", socket.id);
        })

        socket.on("project_join" , (projectid)=>{
console.log("User" , userId , "joined" , projectid , "room");

            
            socket.join(projectid)
        })
    })

};

const sendNotifyByID = (userid , data)=>{
console.log(userid , data);

ioInstance.to(userid).emit("notification" , data)

}

const sendCommitToPorjectRoom = (projectid , data)=>{
    ioInstance.to(projectid).emit("new_commit" , data)
}

module.exports = {initSocket,sendNotifyByID,sendCommitToPorjectRoom}