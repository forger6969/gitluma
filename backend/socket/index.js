let ioInstance = null

const initSocket = (io)=>{

    ioInstance = io

    io.on("connection" , (socket)=>{
        const userId = socket.handshake.query.userId
        socket.join(userId)

        socket.on("disconnect" , ()=>{
            console.log("user disconnected:", socket.id);
        })

        socket.on("project_join" , (projectid)=>{
            socket.join(projectid)
            console.log(`socket ${socket.id} joined project room: ${projectid}`)
        })
    })

};

const sendNotifyByID = (userid , data)=>{
    ioInstance.to(userid).emit("notification" , data)
}

const sendCommitToPorjectRoom = (projectid , data)=>{
    ioInstance.to(projectid).emit("new_commit" , data)
}

const putTask = (projectid , data)=>{

    ioInstance.to(projectid).emit("put_task" , data)

}

module.exports = {initSocket,sendNotifyByID,sendCommitToPorjectRoom,putTask}
