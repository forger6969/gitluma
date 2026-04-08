let ioInstance = null

const initSocket = (io)=>{

    ioInstance = io


    io.on("connection" , (socket)=>{
        console.log("User connected:" , socket.id);
         const userId = socket.handshake.query.userId
        socket.join(userId)

        socket.on("disconnect" , ()=>{
            console.log("user disconnected");
        })
    })

};

const sendNotifyByID = (userid , data)=>{
console.log(userid , data);

io.to(userid).emit("notification" , data)

}

module.exports = {initSocket,sendNotifyByID}