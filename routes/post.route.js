const express=require("express")
const {postmodel}=require("../models/post.models")
const postrouter=express.Router()

postrouter.get("/",async(req,res)=>{
    try{
        const posts=await postmodel.find()
        res.send(posts)
    }
    catch(err){
console.log(err)
res.send({"msg":"something went wrong"})
    }
})

postrouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const newpost=new postmodel(payload)
        await newpost.save()
        res.send({"msg":"created post successfully"})
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})

postrouter.get("/top",async(req,res)=>{
    
    try{
        const posts=await postmodel.find()
        res.send(posts)
    }
    catch(err){
console.log(err)
res.send({"msg":"something went wrong"})
    }
})



postrouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post=await postmodel.findOne({"_id":id})
    const userinpost=post.userId
    const useridmakingreq=req.body.userId

    try{
        if(useridmakingreq!==userinpost){
            res.send({"msg":"you are not authorized"})
        }else{
            await postmodel.findByIdAndUpdate({"_id":id},payload)
            res.send("updated the post")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }

})

postrouter.delete("/delete/:id",async(req,res)=>{
    
    const id=req.params.id
    const post=await postmodel.findOne({"_id":id})
    const userinpost=post.userId
    postrouter.get("/",async(req,res)=>{
    try{
        const posts=await postmodel.find()
        res.send(posts)
    }
    catch(err){
console.log(err)
res.send({"msg":"something went wrong"})
    }
})

    try{
        if(useridmakingreq!==userinpost){
            res.send({"msg":"you are not authorized"})
        }else{
            await postmodel.findByIdAndDelete({"_id":id})
            res.send("updated the post")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }

})
module.exports={
    postrouter
}