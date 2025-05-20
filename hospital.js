const express=require("express");

let app=express();

let users=[
    {
        name:"keer",
        kidneys:[
            {
                healthy:true
            }
        ]
    }
]

    app.use(express.json());

    app.get("/",(req,res)=>{
        let noOfKidneys=users[0].kidneys.length;
        let noOfHealthyKidneys=0;
        for(i=0;i<noOfKidneys;i++){
            if(users[0].kidneys[i].healthy){
                noOfHealthyKidneys+=1;
            }
        }
        noOfUnhealthyKidneys=noOfKidneys-noOfHealthyKidneys;
        res.json({
            "noOfKidneys":noOfKidneys,
            "noOfHealthyKidneys":noOfHealthyKidneys,
            "noOfUnhealthyKidneys":noOfUnhealthyKidneys
        })
    })


    app.post("/",(req,res)=>{
        const kidney=req.body.kidney;
        users[0].kidneys.push({
            "healthy":false
        })

        res.json({
            msg:"success!"
        })
    })

    app.put("/",(req,res)=>{
        for(let i=0;i<users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy=true;
        }

        res.json({
            msg:"successful!"
        })
    })

    app.delete("/",(req,res)=>{
        users[0].kidneys.pop();
        res.json({
            msg:"Deleted successfully!"
        })
    })





app.listen(3000,()=>{
    console.log("listening on port 3000!")
})