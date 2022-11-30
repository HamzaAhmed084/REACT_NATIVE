const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute");
const toDoRoutes = require("./routes/toDoRoute"); 

app.use(bodyParser.json());
app.use(express.json());

const db = require("./config/db.config");

//create table if not exist
db.sequelize.sync();

app.get("/",(req,res,next)=>{
res.send("Hello")
})
//create a new user
app.use("/user",userRoutes)
//todo 

app.use("/toDo",toDoRoutes)


const server = app.listen(4000,()=>{
    console.log("server is running on 4000");
});

//unhandled Promise Rejections

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled Promise  Rejection");
    server.close(()=>{
        process.exit();
    })
})