const express= require("express");

const PostModel= require("../model/post.model");

const postRouter= express.Router();

postRouter.get("/", async(req,res)=>{
   
    try {
        const query={}
        const {device}= req.query;

        if(device){
            query.device= device
        }
        
        const posts= await PostModel.find(query);
        res.status(200).json(posts)
        


    } catch (error) {
        res.status(400).json({msg:"error", error})
    }
})

postRouter.post("/add", async(req,res)=>{
   const payload= req.body;

    try {
         const newPost= new PostModel(payload);
         await newPost.save();
         res.status(200).json({msg:"post added successfully"})
    } catch (error) {
        res.status(400).json({msg:"something went wrong", error})
    }
})


postRouter.patch("/update/:id", async(req,res)=>{
    const payload= req.body;
    const id= req.params.id;
    const post= await PostModel.findOne({_id:id});

     try {
          if(post.userId!==req.body.userId){
            res.status(400).json({msg:"unauthorized"})
          }else{
            await PostModel.findOneAndUpdate({_id:id, payload});
            res.status(200).json({msg:"update successfull"})
          }
     } catch (error) {
         res.status(400).json({msg:"something went wrong", error})
     }
 })

 postRouter.delete("/delete/:id", async(req,res)=>{
   
    const id= req.params.id;
    const post= await PostModel.findOne({_id:id});

     try {
          if(post.userId!==req.body.userId){
            res.status(400).json({msg:"unauthorized"})
          }else{
            await PostModel.findOneAndDelete({_id:id});
            res.status(200).json({msg:"post deleted"})
          }
     } catch (error) {
         res.status(400).json({msg:"something went wrong", error})
     }
 })

 module.exports=
    postRouter
 