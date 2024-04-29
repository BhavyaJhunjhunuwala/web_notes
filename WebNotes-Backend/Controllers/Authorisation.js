const app=require("express")()
const user=require("../Models/Users")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")

app.get("/auth/user/:token",(req,res)=>{
    try{
    const payload=jwt.verify(req.params.token,process.env.JWT_KEY)
    res.status(200).send({id:payload._id})
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
})

app.post('/register',async (req,res)=>{
    try{
    const data=new user({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        Phone:req.body.Phone,
        Password:req.body.Password,
        Notes:[],
        Todo:[]
    })
    let Aluser=await user.findOne({Phone:req.body.Phone})
    if(Aluser){
        res.status(202).send("User Already Registered")
    }
    else if(req.body.Password!=req.body.cpassword  && req.body.Phone.lenght<=0){
        res.status(202).send("Invalid Details")
    }
    else{
        let newUser=await data.save()
        const token=jwt.sign({_id:newUser._id},process.env.JWT_KEY)
        res.status(200).send({id:newUser._id,token})
    } 
    }catch(err){
        console.log(err)
        res.send("Internall Error").status(500)
    }
})

app.post('/login',async (req,res)=>{
    try{
    let Aluser=await user.findOne({Phone:req.body.Phone})

    if(Aluser){
            if(Aluser.Password===req.body.Password){
                const token=jwt.sign({_id:Aluser._id},process.env.JWT_KEY)
                res.status(200).send({token,id:Aluser._id})
            }
            else{
                res.status(201).send("Invalid Credentials")
            }
        }
    else{
        res.status(202).send("User Not Found")
    }
} catch(e) {
    console.log(e)
    res.send(e).status(500)
}
})

module.exports=app