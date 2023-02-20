const express=require("express")

const {connection}=require("./configs/db")
const {userrouter}=require("./routes/user.route")
const {postrouter}=require("./routes/post.route")
const {authenticate}=require("./middleware/Authentication.middleware")
require("dotenv").config()
const cors=require("cors")

const app=express()
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userrouter)
app.use(authenticate)
app.use("/posts",postrouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log("coonection failed")
        console.log(err)
    }
})