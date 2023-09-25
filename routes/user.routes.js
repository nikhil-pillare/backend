const express= require("express");
const UserModel= require("../model/user.model");
const bcrypt= require("bcrypt");
const jwt= require('jsonwebtoken');
require('dotenv').config();


const userRouter= express.Router();

userRouter.post("/register", async(req, res)=>{
    const {email,password}= req.body;

    try {
        const user= await UserModel.findOne({email});
        if(user){
            res.status(200).json({msg:"email already registered!!"})
        }else{
            bcrypt.hash(password, 6, async(err, hash)=>{
                if(hash){
                    const newUser= new UserModel({...req.body, password:hash});
                    await newUser.save();
                    res.status(200).json({msg: "user registered!!"})
                }else{
                    res.status(400).json({msg:"err",err})
                }
            });
        }
    } catch (error) {
        res.status(400).json({msg:"err",error})
    }
});

userRouter.post("/login", async(req,res)=>{
    const {email, password}= req.body;
    try {
        const user= await await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    let token=jwt.sign({ userId: user._id}, process.env.KEY);

                    res.status(200).json({msg:"login successfull", token})
                }else{
                    res.status(400).json({msg: "wrong credentials!!"})
                }
            });
        }
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

module.exports={
    userRouter
}