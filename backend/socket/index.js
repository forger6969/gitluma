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
    })

};

const sendNotifyByID = (userid , data)=>{
console.log(userid , data);

ioInstance.to(userid).emit("notification" , data)

}

module.exports = {initSocket,sendNotifyByID}