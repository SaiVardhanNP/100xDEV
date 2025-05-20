const express=require("express");

const app=express();

function sumOfNNumbers(n){
    let sum=0;
    for(i=1;i<=n;i++){
        sum=sum+i;
    }
    return sum;
}

app.get("/",(req,res)=>{
    const n=req.query.n;
    const ans=sumOfNNumbers(n);
    res.send(`<h1>sum of ${n} natural numbers is ${ans}</h1>`);
    
})

app.use("/home",(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});

app.listen(443,()=>{
    console.log(`listening on port 443`)
})
