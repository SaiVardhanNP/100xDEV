const express=require("express");
const mongooose=require("mongoose");
const jwt=require("jsonwebtoken");
const {UserModel, TodoModel}=require("./db.js");
const { default: mongoose } = require("mongoose");

const app=express();

const JWTSECRETKEY="123112";

mongoose.connect("mongodb+srv://saivardhannp:saivardhan11@mydatabase.vzet070.mongodb.net/Todo-app-database")

app.use(express.json());
    
    app.post("/signup", async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    try{

    await UserModel.create({
        email:email,
        password:password,
        name:name
    })

    res.json({
        msg:"Signed in successfully!"
    })
    }
    catch(err){
        res.status(411).send(err.message)
    }
})

app.post("/signin",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{

    const user=await UserModel.findOne({
        email:email,
        password:password
    })
    }
    catch(err){
        res.send(err.message);
    }
    if(user){
    let token=jwt.sign(
        { id: user._id.toString()},JWTSECRETKEY)

         res.json({
        token:token
    })
    }
    else{
        res.status(403).json({
            Error:"Invalid credentials!"
        })
    }
   

})


function auth(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWTSECRETKEY);
    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.status(403).send("Invalid token!")
    }
}

app.post("/todo",auth,async (req,res)=>{

    const title=req.body.title;
    const userId=req.userId;
    const done=req.body.done;
    try{
    await TodoModel.create({
        title:title,
        done:done,
        userId:userId
    })
    res.send("Todo created!")
    }
    catch(err){
        res.status(403).send("Invalid");
    }

})

app.get("/todos",auth,async (req,res)=>{
    const userId=req.userId;

    try{
    const todo=await TodoModel.find({
        userId:userId
    })
    }
    catch{
        res.status(403).send("Invalid credentials!")
    }

    if(todo){
        res.json({
            todo
        })

        console.log(todo);
    }
    else{
        res.status(403).send("you are unauthorized!")
    }
})




app.listen(3000);