require("dotenv").config()
const { default: mongoose } = require("mongoose")
const app = require("./app");
const http = require("http")
const {Server} = require("socket.io");
const {initSocket} = require("./socket");

const server = http.createServer(app)

const io = new Server(server , {
    cors:{
        origin:"*"
    }
})

initSocket(io)

app.set("io" , io)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb successfully connected!");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        console.log("Retrying in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Attempting reconnect...");
});

mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected!");
});

connectDB();

server.listen(process.env.PORT , ()=>{
    console.log("socket and api connected");
})