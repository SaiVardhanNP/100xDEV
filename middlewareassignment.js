const express=require("express");
const app=express();

const middlewareLogger=(req,res,next)=>{
    const method=req.method;
    const url=req.url;
    const timestamp=new Date().toISOString();
    console.log(url);
    console.log(timestamp);
    console.log(method);


     next();
}

app.use(middlewareLogger);

app.get("/home",(req,res)=>{
    console.log(`Hello World!`)
    res.send("Hello from Express!")
})

app.listen(3001);