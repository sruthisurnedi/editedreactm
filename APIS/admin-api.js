const exp=require('express')
const adminApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')

//install body parser
adminApi.use(exp.json());

adminApi.post("/login",expressErrorHandler( async(req,res,next)=>{
    
    let adminCollectionObj=req.app.get("adminCollectionObj")
    
    let credentials=req.body;

    //check for username
    let user=await adminCollectionObj.findOne({username:credentials.username})
    //if user not found
    if(user===null)
    {
        res.send({message:"Invalid username"})
    }
    else if(user.password!==credentials.password){
        res.send({message:"Invalid Password"})
    }
    else{
        //create and send token
        let token= await jwt.sign({username:credentials.username},'abcdef',{expiresIn: 120 })
         //send token to client
         res.send({message:"Login success",token:token,username:credentials.username})
    }

}))


//export 
module.exports=adminApi