const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGOBASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const Notes=require("./Controllers/Notes")
app.use("/",Notes)
const Todo=require("./Controllers/Todo")
app.use("/",Todo)
const Authorisation=require("./Controllers/Authorisation")
app.use("/",Authorisation)

app.listen(3001,()=>{
    console.log("server running")
})

