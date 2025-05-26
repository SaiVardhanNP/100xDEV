const express=require("express");
const mongoose=require("mongoose");
const {TodoModel}=require("./model");

const app=express();

app.use(express.json());


app.post("/todo",async(req,res)=>{
        const {title,description,done}=req.body;

        try{
        const todo= await TodoModel.create({
            title:title,
            description:description,
            done:done

        })
        }
        catch(err){
            res.send("failed to submit todo");
        }

        res.json({
            msg:"submitted todo successfully!"
        })
})

app.get("/todos",async(req,res)=>{

    
    const todos=await TodoModel.find();
    
    res.json(todos);
})

app.put("/todo",async(req,res)=>{
        const id=req.body.id;
        const done=req.body.done;

        try{
             await TodoModel.updateOne(
                { _id:id},
                {$set:{done:done}}
            )
            console.log("updated!")
            res.send("updated todo successfully!")

        }
        catch(e){
            res.send("failed to update!");
        }

})






async function run(){
    app.listen(3000,()=>{
        console.log("listening on port "+3000);
    });
    await mongoose.connect("mongodb+srv://saivardhannp:saivardhan11@mydatabase.vzet070.mongodb.net/todo-application")
}

run();