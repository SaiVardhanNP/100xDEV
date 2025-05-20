const express=require("express");
const app=express();

function ticketCheck(req,res,next){
    if(req.query.age>18){
        next();
    }
    else{
        res.json({Error:"Failed!"})
    }
}

app.get("/ride1",ticketCheck,(req,res)=>{
    res.json({
        msg:"successfully riden ride 1!"
    })


})

app.get("/ride2",ticketCheck,(req,res)=>{
    res.json({
        msg:"successfully riden ride 2!"
    })
})



app.listen(3000,()=>{
    console.log("listening on port 3000")
})