const express=require("express");
const jwt=require("jsonwebtoken");
const JWTSECRETKEY="auth";

const app=express();

app.use(express.json());

let users=[];

function auth(req,res,next){
    const token=req.headers.token;
    const decodedinfo=jwt.verify(token,JWTSECRETKEY);

    const username=decodedinfo.username;
    if(username){
        req.username=username;
        next();
    }
    else{
        res.json({
            Error:"you are not logged in!"
        })
    }
}

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        msg:"you got signed up!"
    })

    console.log(users);

})

app.post("/signin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    let user=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            user=users[i];
            
        }
    }
    if(user){
        const token=jwt.sign({
                username:user.username
            },JWTSECRETKEY);

            res.json({
                token:token
            })
    }
    else{
        res.status(411).send("invalid user!")
    }
})

app.get("/me",auth,(req,res)=>{


    let userfound=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username===req.username){
            userfound=users[i];
        }
    }
    if(userfound){
        res.json({
            username:userfound.username,
            password:userfound.password
        })
    }
    else{
        res.status(411).send("Invalid token!")
    }
})


app.listen(3000);
