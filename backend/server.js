require("dotenv").config()
const { default: mongoose } = require("mongoose")
const app = require("./app");
const http = require("http")
const {Server} = require("socket.io")

const server = http.createServer(app)

const io = new Server(server , {
    cors:{
        origin:"*"
    }
})

io.on("connection", (socket)=>{
console.log("User connected" , socket.id);

socket.on("disconnect" , ()=>{
console.log("user disconnected" , socket.id);
})

})

app.set("io" , io)

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("mongodb succesfuly connected!");
})

server.listen(process.env.PORT , ()=>{
    console.log("socket and api connected");
})