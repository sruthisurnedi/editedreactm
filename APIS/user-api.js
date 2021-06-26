// //create mini express app
// const exp=require('express')
// const userApi=exp.Router();
// const expressErrorHandler=require("express-async-handler")

// //install body parser
// userApi.use(exp.json());
// const bcryptjs=require('bcryptjs')
// const jwt=require('jsonwebtoken')

// //get mongo client object
// const mc=require("mongodb").MongoClient;
// //kdatabase url
// //const databaseUrl="mongodb+srv://cdb21dx011:cdb21dx011@sruthi.ihliq.mongodb.net/cdb21dx011?retryWrites=true&w=majority"
// //const databaseUrl="mongodb+srv://cdb21dx011:cdb21dx011@srucluster.kyeqr.mongodb.net/cdb21dx011?retryWrites=true&w=majority"
// //const databaseUrl="mongodb://cdb21dx011:cdb21dx011@srucluster-shard-00-00.kyeqr.mongodb.net:27017,srucluster-shard-00-01.kyeqr.mongodb.net:27017,srucluster-shard-00-02.kyeqr.mongodb.net:27017/cdb21dx011?ssl=true&replicaSet=atlas-9vs8m1-shard-0&authSource=admin&retryWrites=true&w=majority"
// const databaseUrl="mongodb+srv://cdb21dx011:cdb21dx011@srucluster.kyeqr.mongodb.net/cdb21dx011db?retryWrites=true&w=majority"

// //connect to db
// mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
//     if(err){
//         console.log("err in db connection",err)
//     }
//     else{
//         //get database object
//         databaseObj=client.db("cdb21dx011db")
//         userCollectionObj=databaseObj.collection("usercollection")
//         console.log("database connected")
//     }
// })


// //get userrs with 3rd version await n aync keys(3rd version)
// userApi.get("/getusers",expressErrorHandler( async(req, res,next) => {
//     let userList=await userCollectionObj.find().toArray()
//     res.send({message:userList})
// }))


// //get user by username with promises(2nd version)
// // userApi.get("/getuser/:username", (req, res, next) => {
//     //het username from url
//     // let un = req.params.username;
//     //search for user
// //     userCollectionObj.findOne({ username: un })
// //         .then(userObj => {
// //             if (userObj === null) {
// //                 res.send({ message: "user not existed" })
// //             }
// //             else {
// //                 res.send({ message: userObj })
// //             }
// //         })
// //         .catch(err => {
// //             console.log(err)
// //             res.send({ message: err.message })
// //         })
// // })


// //create user with existing user logic


// //create user with(3rd version)
// userApi.post("/createusers",expressErrorHandler( async(req,res,next)=>{
//     //get user
//     let newUser=req.body
//     //search for user
//     let user=await userCollectionObj.findOne({username:newUser.username})
//     //if user is null
//     if(user===null){
//         //hash the password
//         let hashedpw=await bcryptjs.hash(newUser.password,7)
//         //replace old pw with hash pw
//         newUser.password=hashedpw
//         //create user
//         await userCollectionObj.insertOne(newUser)
//         res.send({message:"new user created"})
//     }
//     else{
//         res.send({message:"user already existed"})
//     }

// }))
// //update user
// userApi.put("/updateuser/:username", (req, res,next) => {
//     //get modified obj
//     let modifiedUser = req.body;
//     //update
//     databaseObj.collection("usercollection").updateOne({ username: modifiedUser.username },
//         {
//             $set: {
//                 email: modifiedUser.email,
//                 city: modifiedUser.city,
//                 age: modifiedUser.age
//             }
//         }, (err, success) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 res.send({ message: "User updated" })
//             }
//         })
// })

// //delete user(3rd version)
// userApi.delete("/deleteuser/:username",async(req,res,next)=>{
//     let un=req.params.username;
//     let user=await userCollectionObj.findOne({username:un})
//     if(user===null){
//         res.send({message:"User not existed to remove"})
//     }
//     else{
//         res.send({message:"user deleted"})
//     }
// })

// //user login
// userApi.post("/loginuser",expressErrorHandler( async(req,res,next)=>{
//     //get user  credentials
//     let user=req.body;

//     //check for username
//     let dbuser=await userCollectionObj.findOne({username:user.username})

//     //if user not found
//     if(dbuser===null){
//         res.send({message:"Invalid username"})
//     }
//     else{
//         //compare passwords
//         let pwstatus =await bcryptjs.compare(user.password, dbuser.password)
//         console.log("status is",status)
//         //if password not matched
//         if(pwstatus===false){
//             res.send({message:"Invalid Password"})
//         }
//         else{
//             //create and send token
//             let token= await jwt.sign({username:user.username},'abcdef',{expiresIn:120})
//             //send token to client
//             res.send({message:"Login success",token:token,username:user.username})
//         }
//     }
// }))






// module.exports=userApi;

/////////////////
//create mini express app
const exp=require('express')
const userApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const checkToken=require("./middlewares/verifyToken");
const multerObj=require('./middlewares/fileUpload')
require('dotenv').config()

//install body parser
userApi.use(exp.json());

//get users using ASYNC AND AWAIT-------------------------------------------------------------

userApi.get("/getusers", expressErrorHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userList=await userCollectionObj.find().toArray()
    res.send({message:userList})
}))

//get user by username using ASYNC AND AWAIT-------------------------------------------
userApi.get("/getuser/:username", expressErrorHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let un=req.params.username;
    let userObj=await userCollectionObj.findOne({username:un})
    if(userObj===null){
        res.send({message:"No user found"})
    }
    else{
        res.send({message:userObj})
    }
}))

//create user using ASYNC AND AWAIT--------------------------------------------
userApi.post("/createuser",multerObj.single('photo'), expressErrorHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //getuser
    let newUser=JSON.parse(req.body.userObj);
    //search for user
    let user= await userCollectionObj.findOne({username:newUser.username})
    //if user is null
    if(user===null){
        //hash the password
        let hashedPw=await bcryptjs.hash(newUser.password,7)
        //replace the plain password with hashed password
        newUser.password=hashedPw;
        newUser.profileImage=req.file.path;
        //create user
        await userCollectionObj.insertOne(newUser)
        res.send({message:"New user created"})
    }
    else{
        res.send({message:"User already existed"})
    }
}))

//update user using ASYNC AND AWAIT-----------------------------------------
userApi.put("/updateuser/:username", expressErrorHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //get modified obj
    let modifiedUser=req.body;

     //hash the password
     let hashedPw=await bcryptjs.hash(modifiedUser.password,7)
     //replace the plain password with hashed password
     modifiedUser.password=hashedPw;

    await userCollectionObj.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})

    res.send({message:"User updated"})
}))

//delete username using ASYNC AND AWAIT------------------------------------------------------
userApi.delete("/deleteuser/:username", expressErrorHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let un=req.params.username;
    //delete
    let user=await userCollectionObj.findOne({username:un})
    if(user===null){
        res.send({message:"User not existed to delete"})
    }
    else{
        await userCollectionObj.deleteOne({username:un})
        res.send({message:"User deleted"})
    }
}))


//user login
userApi.post("/login", expressErrorHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //get user  credentials
    let credentials=req.body;

    //check for username
    let user=await userCollectionObj.findOne({username:credentials.username})

    //if user not found
    if(user===null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare passwords
        let status =await bcryptjs.compare(credentials.password, user.password)
        console.log("status is",status)
        //if password not matched
        if(status===false){
            res.send({message:"Invalid Password"})
        }
        else{
            //create and send token
            let token= await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn: 10 })
            //send token to client
            res.send({message:"Login success",token:token,username:credentials.username})
        }
    }
}))


//testing route
userApi.get('/testing', checkToken, (req,res,next)=>{

    res.send({message:"Private Data"})
})

//export
module.exports=userApi;