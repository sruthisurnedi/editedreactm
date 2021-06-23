const exp=require('express')
const productApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
//const bcryptjs=require('bcryptjs')
//const jwt=require('jsonwebtoken')
const checkToken=require("./middlewares/verifyToken");
const multerObj=require('./middlewares/fileUpload')

//install body parser
productApi.use(exp.json());



// //get users using ASYNC AND AWAIT-------------------------------------------------------------

productApi.get("/getproducts", expressErrorHandler( async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj")
    let productList=await productCollectionObj.find().toArray()
    res.send({message:productList})
}))

//get user by username using ASYNC AND AWAIT-------------------------------------------
productApi.get("/getproduct/:productname", expressErrorHandler( async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj")
    let pn=req.params.productname;
    let productObj=await productCollectionObj.findOne({productname:pn})
    if(productObj===null){
        res.send({message:"No product found"})
    }
    else{
        res.send({message:productObj})
    }
}))

//create user using ASYNC AND AWAIT--------------------------------------------
productApi.post("/createproduct",multerObj.single('pic'), expressErrorHandler( async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj")
    //getuser
    let newProduct=JSON.parse(req.body.productObj);
    //search for user
    let Product= await productCollectionObj.findOne({productname:newProduct.productname})
    //if user is null
    if(Product===null){
        //hash the password
        // let hashedPw=await bcryptjs.hash(newProduct.password,7)
        // //replace the plain password with hashed password
        // newUser.password=hashedPw;
        newProduct.profileImage=req.file.path;
        //create user
        await productCollectionObj.insertOne(newProduct)
        res.send({message:"New Product created"})
    }
    else{
        res.send({message:"Product already existed"})
    }
}))

// //update user using ASYNC AND AWAIT-----------------------------------------
// productApi.put("/updateproduct/:productname", expressErrorHandler( async(req,res,next)=>{
 //   let productCollectionObj=req.app.get("productCollectionObj")
//     //get modified obj
//     let modifiedProduct=req.body;

//      //hash the password
//     //  let hashedPw=await bcryptjs.hash(modifiedUser.password,7)
//     //  //replace the plain password with hashed password
//     //  modifiedProduct.password=hashedPw;

//     await productCollectionObj.updateOne({productname:modifiedProduct.productname},{$set:{...modifiedProduct}})

//     res.send({message:"Product updated"})
// }))

// //delete productname using ASYNC AND AWAIT------------------------------------------------------
// productApi.delete("/deleteproduct/:productname", expressErrorHandler( async(req,res,next)=>{
  //  let productCollectionObj=req.app.get("productCollectionObj")
//     let pn=req.params.productname;
//     //delete
//     let product=await productCollectionObj.findOne({productname:pn})
//     if(product===null){
//         res.send({message:"Product not existed to delete"})
//     }
//     else{
//         await productCollectionObj.deleteOne({productname:pn})
//         res.send({message:"Product deleted"})
//     }
// }))


//user login
// userApi.post("/loginuser", expressErrorHandler( async(req,res,next)=>{
//    let productCollectionObj=req.app.get("productCollectionObj")
//     //get user  credentials
//     let credentials=req.body;

//     //check for username
//     let user=await userCollectionObj.findOne({username:credentials.username})

//     //if user not found
//     if(user===null){
//         res.send({message:"Invalid username"})
//     }
//     else{
//         //compare passwords
//         let status =await bcryptjs.compare(credentials.password, user.password)
//         console.log("status is",status)
//         //if password not matched
//         if(status===false){
//             res.send({message:"Invalid Password"})
//         }
//         else{
//             //create and send token
//             let token= await jwt.sign({username:credentials.username},'abcdef',{expiresIn: 10 })
//             //send token to client
//             res.send({message:"Login success",token:token,username:credentials.username})
//         }
//     }
// }))


//testing route
productApi.get('/testing', checkToken, (req,res,next)=>{

    res.send({message:"Private Data"})
})

//export
module.exports=productApi;