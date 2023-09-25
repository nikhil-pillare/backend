const express= require("express");
const { connection } = require("./db");

const postRouter= require("./routes/post.routes")
require("dotenv").config();
const cors= require("cors");
const PORT= process.env.PORT
const { auth } = require("./middleware/auth.middleware");
const { userRouter } = require("./routes/user.routes");
const app= express();

app.use(express.json());
// app.use(cors)
app.get("/", (req,res)=>{
    res.send("welcome to homepage of socio masai")
})
app.use("/users", userRouter);
app.use("/posts", auth,postRouter)


app.listen(PORT, async()=>{
     try {
        await connection;
        console.log(`port number ${PORT}`)
        console.log("connected to database")
     } catch (error) {
        console.log({"connection error":error})
     }
})
// module.exports=app
