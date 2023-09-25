const jwt= require("jsonwebtoken");

require("dotenv").config();

const auth=(req,res,next)=>{
    try {
        const token= req.headers.authorization;
        const decoded= jwt.verify(token, process.env.KEY);
        if(decoded){
            req.body.userId= decoded.userId
            next()
        }else{
            res.status(400).json({msg:"plz login"})
        }

       

    } catch (error) {
        res.status(400).json({msg:"plz login",error})
    }
}

module.exports={
    auth
}