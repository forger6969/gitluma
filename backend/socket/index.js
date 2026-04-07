const initSocket = (io)=>{

    io.on("connection" , (socket)=>{
        console.log("User connected" , socket.id);
         const userId = socket.handshake.query.userId
        socket.join(userId)

        socket.on("disconnect" , ()=>{
            console.log("user disconnected");
        })
    })

};

module.exports = initSocket