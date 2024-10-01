const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routes=require('./routes/routes')
const url="mongodb+srv://user1:user1@cluster0.xmphe5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/expense-tracker";
mongoose.connect(url).then(()=>{
    const app=express();
    console.log("connected");
    app.use(cors())
    app.use(express.json())
    app.listen(3002,()=>{
        console.log("Success");
        app.use("/",routes)
    })
})