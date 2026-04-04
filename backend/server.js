require("dotenv").config()
const { default: mongoose } = require("mongoose")
const app = require("./app");

mongoose.connect(process.env.MONGODB_URI).then(()=>{

    console.log("mongodb succesfuly connected!");
    app.listen(process.env.PORT , ()=>{
        console.log(`✅your server successfuly run in http://localhost:${process.env.PORT}`);
        
    })
})