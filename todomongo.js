const express=require("express");
const bcrypt=require("bcrypt");
const mongooose=require("mongoose");
const jwt=require("jsonwebtoken");
const {z}=require("zod");

const {UserModel, TodoModel}=require("./db.js");
const mongoose = require("mongoose");

const app=express();

const JWTSECRETKEY="123112";

mongoose.connect("mongodb+srv://saivardhannp:saivardhan11@mydatabase.vzet070.mongodb.net/Todo-app-database")

app.use(express.json());
    
    app.post("/signup", async (req,res)=>{

        const requiredBody=z.object({
            email:z.string().min(7).max(50).email(),
            password:z.string().min(5).max(50),
            name:z.string().min(5).max(50)
        })

        const parsedBody=requiredBody.safeParse(req.body);

        if(!parsedBody.success){
            res.json({
                msg:"Incorrect format!",
                error: parsedBody.error
            })
            return
        }

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    let errorThrown=false;

    try{

        const hashed= await bcrypt.hash(password,5);

    await UserModel.create({
        email:email,
        password:hashed,
        name:name
    })
    }
    catch(err){
        res.status(411).send(err.message)
        errorThrown=true;
    }

    if(!errorThrown){
        res.json({
        msg:"Signed in successfully!"
    })
}
    
    
})

app.post("/signin",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{

    const response=await UserModel.findOne({
        email:email
    })

    if(!response){
        res.status(403).send("user not found!")
    }
    const passwordMatch= await bcrypt.compare(password,response.password)

    
    if(passwordMatch){
    let token=jwt.sign(
        { id: response._id.toString()},JWTSECRETKEY)

         res.json({
        token:token
    })
    }
    else{
        res.status(403).json({
            Error:"Invalid credentials!"
        })
    }
   

}

    catch(err){
        res.send(err.message);
    }
}
)



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

    if(todo){
        res.json({
            todo
        })

        console.log(todo);
    }
    else{
        res.status(403).send("you are unauthorized!")
    }
}   
    catch(e){
        res.json("Invalid Login details!")
    }
}
)
app.put("/todo",auth,async(req,res)=>{
    const todoId=req.body.todoId;
    const title=req.body.title;
    const done=req.body.done;
    const userId=req.userId;
    const todo= await TodoModel.findOne({
        _id:todoId,
        userId:userId
    })

    if(!todo){
        res.send("Error!")
        return
    }
    todo.title=title;
    todo.done=done;

    await todo.save();

    res.json({
        msg:"todo updated!"
    })

})

app.delete("/todo",auth,async(req,res)=>{
    const userId=req.userId;
    const todoId=req.body.todoId;
    const todo=await TodoModel.findOne({
        userId:userId,
        _id:todoId
    })
    if(!todo){
        res.json({
            msg:"Todo not found!"
        })
        return;
    }
    await TodoModel.deleteOne({
        _id:todoId,
        userId:userId
    })

    res.json({
        msg:"todo deleted successfully!"
    })
})




app.listen(3000);