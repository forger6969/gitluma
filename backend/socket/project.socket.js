const projectSocket = (socket , io)=>{

    socket.on("join_project" , (projectId)=>{
        socket.join(projectId)
    })

}

module.exports = projectSocket