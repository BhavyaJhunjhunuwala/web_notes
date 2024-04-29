const app=require("express")()
const user=require("../Models/Users")
app.post('/NewTask/:UserId',async (req,res)=>{
    const data={
        TodoText:req.body.Text,
        Format:req.body.Format,
        Color:"#FFFFFF",
        TodoHeading:req.body.Head,
        Time:req.body.DateTime,
        Status:false
    }
    let result= await user.updateOne({_id:req.params.UserId},{$push:{Todo:data}})
    const Data= await user.findOne({_id:req.params.UserId}) 
    res.status(200).send({Todo:Data.Todo})
})
app.get('/Task/:UserId',async (req,res)=>{
    try{
    const data= await user.findById(req.params.UserId)
    res.send({err:data.Todo})
    }catch(err){
        console.log(err)
    }
    
})
app.put('/TaskComplete/:UserId',async (req,res)=>{
    let r = await user.findById(req.params.UserId)
    var arr=r.Todo
    arr.forEach((e)=>{
        if(e._id==req.body.id){
            e.Status=true
            e.Time=new Date()
        }
    })
    r=await user.updateOne({_id:req.params.UserId},{$set:{Todo:arr}})
    res.send(r)
    
})
app.put('/delTask/:UserId',async (req,res)=>{
    
    let r = await user.findOne({_id:req.params.UserId})
    var arr=r.Todo
    var arr1=[]
    arr.forEach((e)=>{
        if(e._id==req.body.id){
        }
        else{
            arr1.push(e)
        }
    })
    r=await user.updateOne({_id:req.params.UserId},{$set:{Todo:arr1}})
    // console.log(r)
    res.send({array:arr1})
    
})
module.exports=app