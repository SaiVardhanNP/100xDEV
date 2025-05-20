const express=require("express");


const app=express();


app.get("/sum",(req,res)=>{
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        sum:parseInt(a)+parseInt(b)
    })
})
app.get("/sub",(req,res)=>{
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        difference:parseInt(a)-parseInt(b)
    })
})
app.get("/mul",(req,res)=>{
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        product:parseInt(a)*parseInt(b)
    })
})
app.get("/div",(req,res)=>{
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        division:parseInt(parseInt(a)/parseInt(b))
    })
})

app.listen(3000);